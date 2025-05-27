// Inicialización de usuarios base
function inicializarUsuariosBase() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const base = [
    { usuario: 'mesero', contrasena: '1234', rol: 'mesero' },
    { usuario: 'admin', contrasena: 'admin123', rol: 'admin' }
  ];

  let nuevos = false;

  base.forEach(baseUser => {
    if (!usuarios.some(u => u.usuario === baseUser.usuario)) {
      usuarios.push(baseUser);
      nuevos = true;
    }
  });

  if (nuevos) localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function setUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function renderUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  const usuarios = getUsuarios();

  lista.innerHTML = '';

  usuarios.forEach((u, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${u.usuario}</td>
      <td><span class="badge bg-${u.rol === 'admin' ? 'primary' : 'secondary'}">${u.rol}</span></td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarUsuario(${i})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${i})">Eliminar</button>
      </td>
    `;

    lista.appendChild(tr);
  });
}

function agregarUsuario() {
  const nombre = document.getElementById("nuevoUsuario").value.trim();
  const contrasena = document.getElementById("nuevaContrasena").value.trim();
  const rol = document.getElementById("rolUsuario").value;

  if (!nombre || !contrasena) return alert("Completa todos los campos.");

  const usuarios = getUsuarios();
  if (usuarios.find(u => u.usuario === nombre)) return alert("Ese usuario ya existe.");

  usuarios.push({ usuario: nombre, contrasena, rol });
  setUsuarios(usuarios);
  renderUsuarios();

  // Limpiar campos
  document.getElementById("nuevoUsuario").value = '';
  document.getElementById("nuevaContrasena").value = '';
  document.getElementById("rolUsuario").value = 'mesero';
}

function editarUsuario(index) {
  const usuarios = getUsuarios();
  const usuario = usuarios[index];

  const nuevoNombre = prompt("Editar nombre de usuario:", usuario.usuario);
  const nuevaContrasena = prompt("Editar contraseña:", usuario.contrasena);

  if (nuevoNombre && nuevaContrasena) {
    usuarios[index] = { usuario: nuevoNombre, contrasena: nuevaContrasena, rol: usuario.rol };
    setUsuarios(usuarios);
    renderUsuarios();
  }
}

function eliminarUsuario(index) {
  const usuarios = getUsuarios();
  const usuario = usuarios[index];
  if (usuario.usuario === 'admin') return alert("No puedes eliminar al usuario administrador.");
  usuarios.splice(index, 1);
  setUsuarios(usuarios);
  renderUsuarios();
}

// Visualización de lista
function visualizarListaUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  renderUsuarios(); // Actualiza contenido
  lista.classList.remove("d-none");
}

function ocultarListaUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.classList.add("d-none");
}

// Al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  inicializarUsuariosBase();
  renderInventarioAdmin();
  mostrarHistorial();
  renderPedidosCompletados();
  renderUsuarios();
});
