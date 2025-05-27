
function inicializarUsuariosBase() {
  const usuarios = getUsuarios();
  const base = [
    { usuario: 'mesero', contrasena: '1234', rol: 'mesero' },
    { usuario: 'admin', contrasena: 'admin123', rol: 'admin' }
  ];

  // Solo agregar si no existen
  base.forEach(baseUser => {
    if (!usuarios.find(u => u.usuario === baseUser.usuario)) {
      usuarios.push(baseUser);
    }
  });

  setUsuarios(usuarios);
}



    function visualizarListaUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  renderUsuarios(); // Actualiza contenido por si acaso
  lista.classList.remove("d-none"); // Muestra la lista si estaba oculta
}
function ocultarListaUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.classList.add("d-none");
}



    function renderUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  const usuarios = getUsuarios();

  // Limpiar el contenido antes de renderizar la lista
  lista.innerHTML = '';

  // Mostrar la lista de usuarios
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














    document.addEventListener("DOMContentLoaded", () => {
      renderInventarioAdmin();
      mostrarHistorial();
      renderPedidosCompletados();
      renderUsuarios();
    });

    // Historial
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

    // PDF
    document.getElementById('btnPDF').addEventListener('click', () => {
      const contenido = document.getElementById('contenidoHistorial');
      html2pdf().set({
        margin: 0.5,
        filename: 'historial_pedidos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).from(contenido).save();
    });

    // Pedidos Completados
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

    // Usuarios
function getUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const base = [
    { usuario: 'mesero', contrasena: '1234', rol: 'mesero' },
    { usuario: 'admin', contrasena: 'admin123', rol: 'admin' }
  ];

  // Agrega los usuarios base si no existen
  base.forEach(baseUser => {
    if (!usuarios.some(u => u.usuario === baseUser.usuario)) {
      usuarios.push(baseUser);
    }
  });

  // Guarda la lista actualizada en localStorage si se modificó
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

      if (!nombre || !contrasena) return alert("Completa todos los campos.");
      const usuarios = getUsuarios();
      if (usuarios.find(u => u.usuario === nombre)) return alert("Ese usuario ya existe.");

      usuarios.push({ usuario: nombre, contrasena, rol });
      setUsuarios(usuarios);
      renderUsuarios();
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
      usuarios.splice(index, 1);
      setUsuarios(usuarios);
      renderUsuarios();
    }

 

    // Función de cierre de sesión
    function cerrarSesion() {
      localStorage.clear();
      window.location.href = "login.html";
    }
