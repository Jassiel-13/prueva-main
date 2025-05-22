// ── Datos de productos con stock y mínimos ────────────────────────────
const productos = [
  { id: 1, nombre: "Hamburguesa Clásica", imagen: "img/CLASICA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Carne" , "Catsup" , "Pan"], stock: 10, minStock: 3 },
  { id: 2, nombre: "Hamburguesa BBQ", imagen: "img/BBQ.png", ingredientes: ["Bacon", "Lechuga", "Tomate", "Cebolla" , "Carne" , "Cebolla caramelizada", "Salsa BBQ" , "Pan"], stock: 5, minStock: 2 },
  { id: 3, nombre: "Hamburguesa Hawaiana", imagen: "img/HAWAIANA.png", ingredientes: ["Bacon", "Queso", "Cebolla caramelizada", "Salsa BBQ" , "Lechuga", "Tomate", "Cebolla" , "Carne" , "Pan"], stock: 5, minStock: 2 },
  { id: 4, nombre: "Hamburguesa Doble", imagen: "img/DOBLE.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Carne x2" , "Catsup" , "Pan"], stock: 5, minStock: 2 },
  { id: 5, nombre: "Hamburguesa Mixta", imagen: "img/MIXTA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Carne" , "Pollo" , "Catsup" , "Pan"], stock: 5, minStock: 2 },
  { id: 6, nombre: "Hamburguesa de pollo", imagen: "img/POLLO.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Pollo" , "Catsup" , "Pan"], stock: 5, minStock: 2 },
  { id: 7, nombre: "Hamburguesa de Vegetariana", imagen: "img/VEGETARIANA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Hongo" , "Mantequilla" , "Pan"], stock: 5, minStock: 2 },
  { id: 8, nombre: "Banderia", imagen: "img/ban.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Hongo" , "Mantequilla" , "Pan"], stock: 5, minStock: 2 },
  { id: 9, nombre: "Hot dog", imagen: "img/HOT DOG.png", ingredientes: ["Cebolla", "Tomate", "Catsup", "Mostaza" , "Salchica" , "Pan"], stock: 5, minStock: 2 },
  { id: 10, nombre: "Salchipapas", imagen: "img/SALCHI.png", ingredientes: ["Sazonador", "Papas", "Salchicha"], stock: 5, minStock: 2 },
  { id: 11, nombre: "Orden de papas", imagen: "img/PAPAS.png", ingredientes: ["Sazonador", "Papas"], stock: 5, minStock: 2 },


  { id: 12, nombre: "Coca-Cola", imagen: "img/COCA.png", ingredientes: [], stock: 20, minStock: 5 },
  { id: 13, nombre: "Sprite", imagen: "img/SPRITE.png", ingredientes: [], stock: 15, minStock: 5 },
  { id: 14, nombre: "Fanta Naranja", imagen: "img/FANTA.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 15, nombre: "Pepsi", imagen: "img/PEPSI.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 16, nombre: "Manzanita", imagen: "img/MANZANITA.png", ingredientes: [], stock: 10, minStock: 3 },

  // ── Aguas frescas ──
  { id: 17, nombre: "Agua de Horchata", imagen: "img/HORCHATA.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 18, nombre: "Agua de Jamaica", imagen: "img/JAMAICA.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 19, nombre: "Agua de Limón", imagen: "img/LIMON.png", ingredientes: [], stock: 10, minStock: 3 }
];

function getHistorial() { return JSON.parse(localStorage.getItem('historialPedidos')) || []; }
function setHistorial(historial) { localStorage.setItem('historialPedidos', JSON.stringify(historial)); }
// ── Helpers LocalStorage ───────────────────────────────────────────────
function getPedido() { return JSON.parse(localStorage.getItem("pedido")) || []; }
function setPedido(p) { localStorage.setItem("pedido", JSON.stringify(p)); }
function getKitchen() { return JSON.parse(localStorage.getItem("kitchenOrders")) || []; }
function setKitchen(k) { localStorage.setItem("kitchenOrders", JSON.stringify(k)); }

// ── MENÚ ──────────────────────────────────────────────────────────────
function renderMenu() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-3");
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.nombre}</h5>
          <strong>Ingredientes:</strong>
          <div class="mb-2">
            ${p.ingredientes.map(ingrediente => `
              <div class="form-check">
                <input class="form-check-input" type="checkbox" checked value="${ingrediente}" id="check-${p.id}-${ingrediente}">
                <label class="form-check-label" for="check-${p.id}-${ingrediente}">${ingrediente}</label>
              </div>
            `).join("")}
          </div>
          <div class="mb-3">
            <label class="form-label">Agregar ingrediente extra (opcional):</label>
            <input type="text" class="form-control" id="extra-${p.id}" placeholder="Ej: Jalapeños">
          </div>
          <button class="btn btn-success mt-auto" onclick="agregarAlPedido(${p.id})">Agregar al pedido</button>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}

// ── AGREGAR EL PEDIDO ────────────────────────────────────────────────────
function agregarAlPedido(id) {
  const pedido = getPedido();
  const producto = productos.find(p => p.id === id);

  const ingredientesQuitados = producto.ingredientes.filter(ingrediente => {
    const checkbox = document.getElementById(`check-${id}-${ingrediente}`);
    return checkbox && !checkbox.checked;
  });

  const ingredientesSeleccionados = producto.ingredientes.filter(ingrediente => {
    const checkbox = document.getElementById(`check-${id}-${ingrediente}`);
    return checkbox && checkbox.checked;
  });

  const extraInput = document.getElementById(`extra-${id}`);
  const ingredientesAgregados = [];
  if (extraInput && extraInput.value.trim() !== "") {
    ingredientesAgregados.push(extraInput.value.trim());
    ingredientesSeleccionados.push(extraInput.value.trim());
  }

  const pedidoFinal = {
    id: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    ingredientes: ingredientesSeleccionados,
    agregados: ingredientesAgregados,
    quitados: ingredientesQuitados
  };

  pedido.push(pedidoFinal);
  setPedido(pedido);
  actualizarContador();
  alert(`"${producto.nombre}" agregado al pedido.`);
}

// ── CONTADOR ICONO ────────────────────────────────────────────────────
function actualizarContador() {
  const c = document.getElementById("contadorOrden");
  if (c) c.textContent = getPedido().length;
}

// ── MESERO ────────────────────────────────────────────────────────────
function renderPedidoMesero() {
  const cont = document.getElementById("pedidoMesero");
  if (!cont) return;

  const usuario = localStorage.getItem("usuario");
  const mesa = localStorage.getItem("mesa");
  const pedido = getPedido();

  cont.innerHTML = "";

  if (!pedido.length) {
    cont.innerHTML = "<p>No hay productos.</p>";
    return;
  }

  cont.innerHTML += `
    <p><strong>Cliente:</strong> ${usuario}</p>
    <p><strong>Mesa:</strong> ${mesa}</p>
    <h4>Productos:</h4>
  `;

  pedido.forEach((item, i) => {
    const listaIngredientes = item.ingredientes?.length
      ? item.ingredientes.join(", ")
      : "Sin ingredientes";

    const agregados = item.agregados?.length
      ? item.agregados.join(", ")
      : "Ninguno";

    const quitados = item.quitados?.length
      ? item.quitados.join(", ")
      : "Ninguno";

    cont.innerHTML += `
      <div class="producto">
        <p><strong>${i + 1}. ${item.nombre}</strong></p>
        <p>🧂 Ingredientes actuales: ${listaIngredientes}</p>
        <p style="color:green;">➕ Agregados: ${agregados}</p>
        <p style="color:red;">➖ Quitados: ${quitados}</p>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
      </div>
    `;
  });
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
function eliminarProducto(i) {
  const pd = getPedido(); pd.splice(i, 1); setPedido(pd); renderPedidoMesero(); actualizarContador();
}

function vaciarPedido() {
  if (confirm("Vaciar pedido?")) {
    setPedido([]); renderPedidoMesero(); actualizarContador();
  }
}

function enviarACocina() {
  const pd = getPedido();
  if (!pd.length) return alert("No hay nada.");

  const mesa = localStorage.getItem("mesa");
  const usuario = localStorage.getItem("usuario");
  const timestamp = Date.now();

  // Guardar en cocina
  const k = getKitchen();
  k.push({ mesa, usuario, items: pd, timestamp });
  setKitchen(k);

  // Guardar en historial
  const historial = getHistorial();
  historial.push(...pd.map(p => ({
    id: p.id,
    nombre: p.nombre,
    fecha: new Date().toISOString().split("T")[0] // YYYY-MM-DD
  })));
  setHistorial(historial);

  setPedido([]);
  renderPedidoMesero();
  actualizarContador();
  alert("Enviado a cocina");
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
// ── COCINA ────────────────────────────────────────────────────────────
function renderPedidosCocina() {
  const cont = document.getElementById("pedidosCocina"); if (!cont) return;
  const k = getKitchen(); cont.innerHTML = "";
  if (!k.length) {
    cont.innerHTML = "<p>No hay pedidos.</p>";
    return;
  }
  const tbl = document.createElement("table"); tbl.className = "table";
  tbl.innerHTML = `<thead><tr><th>Mesa</th><th>Usuario</th><th>Productos</th><th>Acción</th></tr></thead>`;
  const tb = document.createElement("tbody");
  k.forEach((pd, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${pd.mesa}</td><td>${pd.usuario}</td><td><ul>${pd.items.map(x => `<li>${x.nombre}</li>`).join("")}</ul></td>
      <td><button class="btn btn-sm btn-success" onclick="completarPedido(${i})">Listo</button></td>`;
    tb.appendChild(tr);
  });
  tbl.appendChild(tb); cont.appendChild(tbl);
}

function completarPedido(i) {
  const k = getKitchen(), done = k.splice(i, 1)[0]; setKitchen(k);
  const c = JSON.parse(localStorage.getItem("kitchenCompleted")) || []; c.push(done); localStorage.setItem("kitchenCompleted", JSON.stringify(c));
  renderPedidosCocina();
}

// ── ADMIN ─────────────────────────────────────────────────────────────
function renderInventarioAdmin() {
  const tbody = document.getElementById("inventarioAdmin"); if (!tbody) return; tbody.innerHTML = "";
  productos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.nombre}</td>
      <td><input type="number" id="stk-${p.id}" value="${p.stock}" class="form-control form-control-sm"/></td>
      <td><input type="number" id="min-${p.id}" value="${p.minStock}" class="form-control form-control-sm"/></td>
      <td><button class="btn btn-sm btn-primary" onclick="updateStock(${p.id})">Guardar</button></td>`;
    if (p.stock <= p.minStock) tr.classList.add("table-warning");
    tbody.appendChild(tr);
  });
}

function updateStock(id) {
  const p = productos.find(x => x.id === id);
  p.stock = parseInt(document.getElementById(`stk-${id}`).value, 10);
  p.minStock = parseInt(document.getElementById(`min-${id}`).value, 10);
  renderInventarioAdmin();
}

// ── REPORTES ──────────────────────────────────────────────────────────
function renderReportes() {
  const cont = document.getElementById("reportes");
  if (!cont) return;

  const comp = JSON.parse(localStorage.getItem("kitchenCompleted")) || [];
  if (!comp.length) {
    cont.innerHTML = "<p>No hay ventas.</p>";
    return;
  }

  // Agrupar ventas por día y por producto
  const ventasPorDia = {};

  comp.forEach(pedido => {
    const dia = new Date(pedido.timestamp).toLocaleDateString();

    if (!ventasPorDia[dia]) ventasPorDia[dia] = {};

    pedido.items.forEach(item => {
      if (!ventasPorDia[dia][item.nombre]) ventasPorDia[dia][item.nombre] = 0;
      ventasPorDia[dia][item.nombre]++;
    });
  });

  // Construir el HTML con tablas por día
  cont.innerHTML = "";

  Object.entries(ventasPorDia).forEach(([dia, productos]) => {
    const card = document.createElement("div");
    card.className = "card mb-3";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.textContent = `Ventas del día ${dia}`;

    const table = document.createElement("table");
    table.className = "table table-striped";

    const thead = document.createElement("thead");
    thead.innerHTML = `<tr><th>Producto</th><th>Cantidad vendida</th></tr>`;

    const tbody = document.createElement("tbody");

    Object.entries(productos).forEach(([producto, cantidad]) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${producto}</td><td>${cantidad}</td>`;
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    card.appendChild(cardHeader);
    card.appendChild(table);
    cont.appendChild(card);
  });
}

// ── Inicialización ────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("contenedor-productos")) renderMenu();
  actualizarContador();
  if (document.getElementById("pedidoMesero")) renderPedidoMesero();
  if (document.getElementById("pedidosCocina")) renderPedidosCocina();
  if (document.getElementById("inventarioAdmin")) renderInventarioAdmin();
  if (document.getElementById("reportes")) renderReportes();
});


// Modal: Detalle de la orden
const ordenModal = document.getElementById("modalOrden");
const btnEnviar = document.getElementById("btnEnviarMesero");
if (ordenModal && btnEnviar) {
  ordenModal.addEventListener("show.bs.modal", renderOrdenModal);
  btnEnviar.addEventListener("click", enviarAlMesero);
}


function renderOrdenModal() {
  const lista = document.getElementById("detalleOrden");
  const mensaje = document.getElementById("mensajeVacio");
  const pedido = getPedido();

  lista.innerHTML = "";
  if (!pedido.length) {
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
    pedido.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = item.nombre + (item.ingredientes.length ? ` (${item.ingredientes.join(", ")})` : "");
      lista.appendChild(li);
    });
  }
}

function enviarAlMesero() {
  const pedido = getPedido();
  if (!pd.length) return alert("No hay nada.");

  const m = JSON.parse(localStorage.getItem("ordenesMesero")) || [];
  m.push({
    mesa: localStorage.getItem("mesa"),
    usuario: localStorage.getItem("usuario"),
    items: pd,
    timestamp: Date.now()
  });
  localStorage.setItem("ordenesMesero", JSON.stringify(m));
  localStorage.setItem("ordenParaMesero", JSON.stringify(pedido)); // Guarda la orden en el localStorage
  setPedido([]);  // Limpia el carrito
  renderPedidoMesero();
  actualizarContador();
  alert("Pedido enviado al mesero");
}



function enviarOrden() {
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];

  if (productos.length === 0) {
    alert("No hay productos en la orden.");
    return;
  }

  const orden = productos.map(p => `${p.nombre} x${p.cantidad}`).join(", ");
  localStorage.setItem("ordenParaMesero", orden);
  localStorage.removeItem("carrito"); // Limpia el carrito

  alert("¡Orden enviada al mesero!");
  // Cierra el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalOrden'));
  modal.hide();
}

//------------log
function iniciarSesion() {
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(u =>
        u.usuario === usuario && u.contrasena === 1234
    );

    if (usuarioEncontrado) {
        localStorage.setItem("usuario", usuario);
        mensajeError.textContent = "";
        window.location.href = "menu.html"; // Cambia a tu página principal
    } else {
        mensajeError.textContent = "Usuario o contraseña incorrectos.";
    }
}


function iniciarSesion() {
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const mensajeError = document.getElementById('mensajeError');

  if (usuario === "mesero" && contrasena === "1234") {
      window.location.href = "mesero.html";
  } else {
      mensajeError.textContent = "Usuario o contraseña incorrectos.";
  }
}

function cerrarSesion() {
  window.location.href = "login.html";
}

async function iniciarSesion() {
        const usuario = document.getElementById('usuario').value.trim().toLowerCase();
        const contrasena = document.getElementById('contrasena').value.trim();
        const mensajeError = document.getElementById('mensajeError');

        try {
            const respuesta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, contrasena })
            });

            const data = await respuesta.json();

            if (data.success) {
                alert(`¡Inicio de sesión exitoso como ${data.rol}!`);
                localStorage.setItem('usuario', data.rol);
                window.location.href = data.rol === 'admin' ? 'admin.html' : 'mesero.html';
            } else {
                mensajeError.textContent = data.mensaje;
            }
        } catch (error) {
            mensajeError.textContent = 'Error de conexión con el servidor';
        }
    }

//------GENERAR REPORTE-------------------------------------------------
function generarReporteVentas() {
  const historial = getHistorial();
  if (!historial.length) return alert("No hay historial de ventas.");

  const conteo = {};

  historial.forEach(item => {
    const clave = `${item.fecha} - ${item.nombre}`;
    conteo[clave] = (conteo[clave] || 0) + 1;
  });

  // Crear tabla
  let html = `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Producto</th>
          <th>Cantidad Vendida</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const clave in conteo) {
    const [fecha, nombre] = clave.split(" - ");
    html += `
      <tr>
        <td>${fecha}</td>
        <td>${nombre}</td>
        <td>${conteo[clave]}</td>
      </tr>
    `;
  }

  html += `</tbody></table>`;

  const cont = document.getElementById("reporteVentas");
  cont.innerHTML = html;

  // Opción para descargar como archivo de texto o Excel
  const btn = document.createElement("button");
  btn.textContent = "Descargar reporte";
  btn.className = "btn btn-primary my-2";
  btn.onclick = () => descargarReporteComoCSV(conteo);
  cont.appendChild(btn);
}

function descargarReporteComoCSV(data) {
  let csv = "Fecha,Producto,Cantidad\n";
  for (const clave in data) {
    const [fecha, producto] = clave.split(" - ");
    csv += `${fecha},${producto},${data[clave]}\n`;
  }

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "reporte_ventas.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function generarResumenPorDia() {
  const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
  const resumen = {}; // {fecha: {producto: cantidad}}

  historial.forEach(pedido => {
    const fecha = pedido.fecha;
    const producto = pedido.producto;
    const cantidad = pedido.cantidad;

    if (!resumen[fecha]) resumen[fecha] = {};
    if (!resumen[fecha][producto]) resumen[fecha][producto] = 0;

    resumen[fecha][producto] += cantidad;
  });

  // Mostrar tabla resumen
  const tablaResumen = document.getElementById('tablaResumen');
  tablaResumen.innerHTML = '';

  const fechasOrdenadas = Object.keys(resumen).sort();
  fechasOrdenadas.forEach(fecha => {
    for (const producto in resumen[fecha]) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${fecha}</td>
        <td>${producto}</td>
        <td>${resumen[fecha][producto]}</td>
      `;
      tablaResumen.appendChild(fila);
    }
  });

  // Generar gráfica
  graficarResumen(resumen);
}
function graficarResumen(resumen) {
  const datosPorFecha = {};

  for (const fecha in resumen) {
    let totalPorFecha = 0;
    for (const producto in resumen[fecha]) {
      totalPorFecha += resumen[fecha][producto];
    }
    datosPorFecha[fecha] = totalPorFecha;
  }

  const fechas = Object.keys(datosPorFecha).sort();
  const cantidades = fechas.map(f => datosPorFecha[f]);

  const ctx = document.getElementById('graficaResumen').getContext('2d');

  // Destruir gráfica anterior si ya existe
  if (window.grafica) window.grafica.destroy();

  window.grafica = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: fechas,
      datasets: [{
        label: 'Productos vendidos por día',
        data: cantidades,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      }
    }
  });
}
function descargarResumenCSV() {
  const tabla = document.getElementById("tablaResumen");
  const filas = tabla.querySelectorAll("tr");
  let csv = "Fecha,Producto,Cantidad\n";

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll("td");
    if (celdas.length > 0) {
      csv += `${celdas[0].innerText},${celdas[1].innerText},${celdas[2].innerText}\n`;
    }
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "resumen_ventas.csv";
  enlace.click();
}


