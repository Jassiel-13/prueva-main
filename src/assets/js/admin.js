
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


document.getElementById('btnPDF').addEventListener('click', () => {


  html2pdf().from(contenido).save();


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


























//version 2




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

  
// Llenar selector de fechas únicas
function llenarSelectorFechas() {
  const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
  const selector = document.getElementById('selectorFecha');
  const fechasUnicas = [...new Set(historial.map(p => p.fecha))];

  selector.innerHTML = '<option value="todas">Todas</option>'; // Opción por defecto
  fechasUnicas.forEach(fecha => {
    const opt = document.createElement('option');
    opt.value = fecha;
    opt.textContent = fecha;
    selector.appendChild(opt);
  });
}

// Mostrar historial filtrado
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
  const listaHistorial = document.getElementById('listaHistorial');
  const totalRecaudado = document.getElementById('totalRecaudado');
  const filtro = document.getElementById('selectorFecha').value;
  let total = 0;

  const pedidosFiltrados = filtro === 'todas' ? historial : historial.filter(p => p.fecha === filtro);

  listaHistorial.innerHTML = '';
  pedidosFiltrados.forEach((pedido, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `#${index + 1} | Mesa ${pedido.mesa} | ${pedido.producto} x${pedido.cantidad} = $${pedido.total.toFixed(2)} | ${pedido.fecha}`;
    listaHistorial.appendChild(li);
    total += pedido.total;
  });

  totalRecaudado.textContent = total.toFixed(2);
  llenarSelectorFechas();
}

// Al cambiar fecha, actualiza historial
document.getElementById('selectorFecha').addEventListener('change', mostrarHistorial);

document.getElementById("btnPDF").addEventListener("click", function () {
  const seccion = document.getElementById("seccionPDF");

  // Generar PDF
  html2pdf().from(seccion).save("historial.pdf");

 
});

  document.getElementById("btnXML").addEventListener("click", function () {
    // Ejemplo: obtener datos ficticios
    const pedidos = document.querySelectorAll("#listaHistorial li");
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<pedidos>\n`;

    pedidos.forEach(pedido => {
      const texto = pedido.textContent.trim();
      xmlContent += `  <pedido>${texto}</pedido>\n`;
    });

    xmlContent += `</pedidos>`;

    // Crear archivo y descargarlo
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pedidos.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });



function generarYDescargarXML() {
  const historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<HistorialPedidos>\n`;

  historial.forEach((pedido, index) => {
    xml += `  <Pedido id="${index + 1}">\n`;
    xml += `    <Fecha>${pedido.fecha}</Fecha>\n`;
    xml += `    <Producto>${pedido.producto}</Producto>\n`;
    xml += `    <Cantidad>${pedido.cantidad}</Cantidad>\n`;
    xml += `    <Precio>${pedido.precio}</Precio>\n`;
    xml += `    <Total>${pedido.total}</Total>\n`;
    xml += `  </Pedido>\n`;
  });

  xml += `</HistorialPedidos>`;

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "historial.xml";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}


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
