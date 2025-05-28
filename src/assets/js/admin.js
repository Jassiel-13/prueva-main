// Inicializa usuarios base si no existen
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

// Obtener usuarios desde localStorage y añadir base si no existen
function getUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const base = [
    { usuario: 'mesero', contrasena: '1234', rol: 'mesero' },
    { usuario: 'admin', contrasena: 'admin123', rol: 'admin' }
  ];
  base.forEach(baseUser => {
    if (!usuarios.some(u => u.usuario === baseUser.usuario)) {
      usuarios.push(baseUser);
    }
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  return usuarios;
}

function setUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function agregarUsuario() {
  const nombre = document.getElementById("nuevoUsuario").value.trim();
  const contrasena = document.getElementById("nuevaContrasena").value.trim();
  const rol = document.getElementById("rolUsuario").value;

  if (!nombre || !contrasena) {
    alert("Completa todos los campos.");
    return;
  }

  const usuarios = getUsuarios();
  if (usuarios.find(u => u.usuario === nombre)) {
    alert("Ese usuario ya existe.");
    return;
  }

  usuarios.push({ usuario: nombre, contrasena, rol });
  setUsuarios(usuarios);
  renderUsuarios();
  alert("Usuario agregado correctamente.");
}

function renderUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  const usuarios = getUsuarios();
  lista.innerHTML = '';

  usuarios.forEach((u, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.usuario}</td>
      <td><span class="badge bg-secondary">${u.rol}</span></td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarUsuario(${i})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${i})">Eliminar</button>
      </td>
    `;
    lista.appendChild(tr);
  });
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
    alert("Usuario editado correctamente.");
  }
}

function eliminarUsuario(index) {
  if (!confirm("¿Eliminar este usuario?")) return;
  const usuarios = getUsuarios();
  usuarios.splice(index, 1);
  setUsuarios(usuarios);
  renderUsuarios();
  alert("Usuario eliminado correctamente.");
}

function visualizarListaUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  renderUsuarios(); // actualizar contenido
  lista.classList.remove("d-none"); // mostrar lista
}

function ocultarListaUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.classList.add("d-none");
}

// Historial de pedidos
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
  const listaHistorial = document.getElementById('listaHistorial');
  const totalRecaudado = document.getElementById('totalRecaudado');
  let total = 0;

  listaHistorial.innerHTML = '';
  historial.forEach((pedido, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `#${index + 1} | Mesa ${pedido.mesa} | ${pedido.producto} x${pedido.cantidad} = $${pedido.total.toFixed(2)} | ${pedido.fecha}`;
    listaHistorial.appendChild(li);
    total += pedido.total;
  });
  totalRecaudado.textContent = total.toFixed(2);
}

function descargarHistorialPDF() {
  const contenido = document.getElementById('contenidoHistorial');
  if (!contenido) {
    alert("No hay contenido para exportar.");
    return;
  }
  html2pdf().from(contenido).save('historial_pedidos.pdf');
}

document.getElementById('btnPDF').addEventListener('click', descargarHistorialPDF);

// Pedidos completados
function renderPedidosCompletados() {
  const cont = document.getElementById("pedidosCompletados");
  const completados = JSON.parse(localStorage.getItem("kitchenCompleted")) || [];
  if (!cont) return;
  if (!completados.length) {
    cont.innerHTML = "<p>No hay pedidos completados.</p>";
    return;
  }
  cont.innerHTML = completados.map((p, i) => `
    <div class="card mb-2">
      <div class="card-header">
        #${i + 1} - Mesa ${p.mesa} - ${p.usuario} - ${new Date(p.timestamp).toLocaleString()}
      </div>
      <ul class="list-group list-group-flush">
        ${p.items.map(item => `<li class="list-group-item">${item.nombre}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Iniciar usuarios base al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  inicializarUsuariosBase();
  renderUsuarios();
  mostrarHistorial();
  renderPedidosCompletados();
});
