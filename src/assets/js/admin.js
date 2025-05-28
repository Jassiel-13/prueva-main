// --- Usuarios base ---
function inicializarUsuariosBase() {
  const usuarios = getUsuarios();
  const base = [
    { usuario: 'mesero', contrasena: '1234', rol: 'mesero' },
    { usuario: 'admin', contrasena: 'admin123', rol: 'admin' }
  ];
  base.forEach(baseUser => {
    if (!usuarios.find(u => u.usuario === baseUser.usuario)) {
      usuarios.push(baseUser);
    }
  });
  setUsuarios(usuarios);
}

// --- Obtener y guardar usuarios ---
function getUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios;
}

function setUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// --- Variables para estado ---
let usuariosFiltrados = [];
let paginaActual = 1;
const usuariosPorPagina = 5;
let papeleraUsuarios = [];

// --- Renderizar usuarios con paginación y búsqueda ---
function renderUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  const filtroInput = document.getElementById("filtroUsuario");
  const filtro = filtroInput ? filtroInput.value.toLowerCase() : "";
  const usuarios = getUsuarios();

  // Filtrar usuarios por nombre o rol
  usuariosFiltrados = usuarios.filter(u => 
    u.usuario.toLowerCase().includes(filtro) || u.rol.toLowerCase().includes(filtro)
  );

  // Paginación
  const inicio = (paginaActual - 1) * usuariosPorPagina;
  const fin = inicio + usuariosPorPagina;
  const usuariosPagina = usuariosFiltrados.slice(inicio, fin);

  lista.innerHTML = "";

  usuariosPagina.forEach((u, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.usuario}</td>
      <td>
        <select class="form-select form-select-sm" onchange="cambiarRolUsuario(${inicio + i}, this.value)">
          <option value="mesero" ${u.rol === "mesero" ? "selected" : ""}>Mesero</option>
          <option value="admin" ${u.rol === "admin" ? "selected" : ""}>Admin</option>
        </select>
      </td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarUsuario(${inicio + i})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="confirmarEliminarUsuario(${inicio + i})">Eliminar</button>
      </td>
    `;
    lista.appendChild(tr);
  });

  renderPaginacion();
}

// --- Renderizar paginación ---
function renderPaginacion() {
  const paginacion = document.getElementById("paginacionUsuarios");
  if (!paginacion) return;

  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  paginacion.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.className = "btn btn-sm me-1 " + (i === paginaActual ? "btn-primary" : "btn-outline-primary");
    btn.textContent = i;
    btn.onclick = () => {
      paginaActual = i;
      renderUsuarios();
    };
    paginacion.appendChild(btn);
  }
}

// --- Cambiar rol usuario directamente ---
function cambiarRolUsuario(index, nuevoRol) {
  const usuarios = getUsuarios();
  usuarios[index].rol = nuevoRol;
  setUsuarios(usuarios);
  mostrarAlertaBootstrap(`Rol cambiado a ${nuevoRol} para ${usuarios[index].usuario}`, "success");
}

// --- Agregar usuario con validación ---
function agregarUsuario() {
  const nombre = document.getElementById("nuevoUsuario").value.trim();
  const contrasena = document.getElementById("nuevaContrasena").value.trim();
  const rol = document.getElementById("rolUsuario").value;

  if (!nombre || !contrasena) {
    mostrarAlertaBootstrap("Completa todos los campos.", "warning");
    return;
  }

  const usuarios = getUsuarios();
  if (usuarios.find(u => u.usuario === nombre)) {
    mostrarAlertaBootstrap("Ese usuario ya existe.", "danger");
    return;
  }

  usuarios.push({ usuario: nombre, contrasena, rol });
  setUsuarios(usuarios);
  renderUsuarios();
  mostrarAlertaBootstrap("Usuario agregado correctamente.", "success");
  limpiarFormularioUsuario();
}

function limpiarFormularioUsuario() {
  document.getElementById("nuevoUsuario").value = "";
  document.getElementById("nuevaContrasena").value = "";
  document.getElementById("rolUsuario").value = "mesero";
}

// --- Editar usuario (nombre y contraseña) ---
function editarUsuario(index) {
  const usuarios = getUsuarios();
  const usuario = usuarios[index];

  const nuevoNombre = prompt("Editar nombre de usuario:", usuario.usuario);
  if (!nuevoNombre) return;

  const nuevaContrasena = prompt("Editar contraseña:", usuario.contrasena);
  if (!nuevaContrasena) return;

  // Validar que nuevoNombre no esté repetido salvo el actual
  if (usuarios.some((u, i) => u.usuario === nuevoNombre && i !== index)) {
    mostrarAlertaBootstrap("Ese nombre de usuario ya está en uso.", "danger");
    return;
  }

  usuarios[index].usuario = nuevoNombre;
  usuarios[index].contrasena = nuevaContrasena;
  setUsuarios(usuarios);
  renderUsuarios();
  mostrarAlertaBootstrap("Usuario editado correctamente.", "success");
}

// --- Confirmar eliminación con modal ---
function confirmarEliminarUsuario(index) {
  const usuario = getUsuarios()[index];
  const modalEl = document.getElementById("modalConfirmEliminar");
  if (!modalEl) {
    // Crear modal dinámico si no existe
    crearModalConfirmacion(() => eliminarUsuario(index), `¿Eliminar usuario "${usuario.usuario}"?`);
  } else {
    // Reutilizar modal existente
    document.getElementById("modalConfirmMsg").textContent = `¿Eliminar usuario "${usuario.usuario}"?`;
    document.getElementById("modalConfirmBtn").onclick = () => eliminarUsuario(index);
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

function crearModalConfirmacion(callback, mensaje) {
  const modalHTML = `
    <div class="modal fade" id="modalConfirmEliminar" tabindex="-1" aria-labelledby="modalConfirmEliminarLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalConfirmEliminarLabel">Confirmación</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body" id="modalConfirmMsg">${mensaje}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="modalConfirmBtn">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  const modalEl = document.getElementById("modalConfirmEliminar");
  document.getElementById("modalConfirmBtn").onclick = () => {
    callback();
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// --- Eliminar usuario y mandar a papelera ---
function eliminarUsuario(index) {
  const usuarios = getUsuarios();
  const eliminado = usuarios.splice(index, 1)[0];
  papeleraUsuarios.push(eliminado);
  setUsuarios(usuarios);
  renderUsuarios();
  mostrarAlertaBootstrap(`Usuario "${eliminado.usuario}" eliminado.`, "warning");
  renderBotonRestaurar();
}

// --- Restaurar usuario eliminado ---
function restaurarUsuario() {
  if (papeleraUsuarios.length === 0) {
    mostrarAlertaBootstrap("No hay usuarios para restaurar.", "info");
    return;
  }
  const usuarios = getUsuarios();
  const restaurado = papeleraUsuarios.pop();
  usuarios.push(restaurado);
  setUsuarios(usuarios);
  renderUsuarios();
  mostrarAlertaBootstrap(`Usuario "${restaurado.usuario}" restaurado.`, "success");
  renderBotonRestaurar();
}

// --- Renderizar botón restaurar ---
function renderBotonRestaurar() {
  const contenedor = document.getElementById("contenedorRestaurar");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  if (papeleraUsuarios.length > 0) {
    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-outline-success";
    btn.textContent = `Restaurar usuario eliminado (${papeleraUsuarios.length})`;
    btn.onclick = restaurarUsuario;
    contenedor.appendChild(btn);
  }
}

// --- Buscar usuarios (input oninput) ---
function buscarUsuarios() {
  paginaActual = 1; // reiniciar página al buscar
  renderUsuarios();
}

// --- Exportar usuarios a CSV ---
function exportarUsuariosCSV() {
  const usuarios = getUsuarios();
  if (usuarios.length === 0) {
    mostrarAlertaBootstrap("No hay usuarios para exportar.", "info");
    return;
  }
  const csvRows = [];
  csvRows.push("Usuario,Rol");
  usuarios.forEach(u => {
    csvRows.push(`"${u.usuario}","${u.rol}"`);
  });
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "usuarios.csv";
  a.click();
  URL.revokeObjectURL(url);
  mostrarAlertaBootstrap("Usuarios exportados a CSV.", "success");
}

// --- Mostrar alertas Bootstrap ---
function mostrarAlertaBootstrap(mensaje, tipo = "info") {
  const contenedorAlertas = document.getElementById("alertasAdmin");
  if (!contenedorAlertas) return;

  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
  alerta.role = "alert";
  alerta.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `;
  contenedorAlertas.appendChild(alerta);

  setTimeout(() => {
    alerta.classList.remove("show");
    alerta.classList.add("fade");
    setTimeout(() => alerta.remove(), 500);
  }, 5000);
}

// --- Inicializar ---
document.addEventListener("DOMContentLoaded", () => {
  inicializarUsuariosBase();
  renderUsuarios();
  renderBotonRestaurar();

  // Vincular evento búsqueda
  const filtroInput = document.getElementById("filtroUsuario");
  if (filtroInput) filtroInput.addEventListener("input", buscarUsuarios);
});
