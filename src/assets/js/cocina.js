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

function agregarAlPedido(id) {
  const pedido = getPedido();
  const producto = productos.find(p => p.id === id);

  const ingredientesSeleccionados = producto.ingredientes.filter(ingrediente => {
    const checkbox = document.getElementById(`check-${id}-${ingrediente}`);
    return checkbox && checkbox.checked;
  });

  const extraInput = document.getElementById(`extra-${id}`);
  if (extraInput && extraInput.value.trim() !== "") {
    ingredientesSeleccionados.push(extraInput.value.trim());
  }

  const pedidoFinal = {
    id: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    ingredientes: ingredientesSeleccionados
  };

  pedido.push(pedidoFinal);
  setPedido(pedido);
  actualizarContador();
  alert(`"${producto.nombre}" agregado al pedido.`);
}

// ── CONTADOR ICONO ────────────────────────────────────────────────────
function actualizarContador() {
  const c = document.getElementById("contadorOrden");
  if (c) c.textContent = getPedido().length;  // Actualiza el contador del pedido
}

function agregarAlCarrito(producto, ingredientes) {
  // Verifica si el producto ya está en el carrito
  const pedido = getPedido();
  if (pedido.some(item => item.id === producto.id)) {
    return alert("Este producto ya está en el carrito.");
  }

  // Agregar al carrito
  pedido.push({ ...producto, ingredientes });
  setPedido(pedido);
  actualizarContador(); // Actualiza el contador de productos
}


// Función para login del mesero
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

// ── MESERO ────────────────────────────────────────────────────────────
function renderPedidoMesero() {
  const cont = document.getElementById("pedidoMesero");
  if (!cont) return;
  const saludo = document.getElementById("saludoMesero");
  if (saludo) saludo.textContent = `Hola, ${localStorage.getItem("usuario")} — Mesa ${localStorage.getItem("mesa")}`;
  const pedido = getPedido(); cont.innerHTML = "";
  if (!pedido.length) {
    cont.innerHTML = "<p>No hay productos.</p>";
    return;
  }
  const tbl = document.createElement("table"); tbl.className = "table";
  tbl.innerHTML = `<thead><tr><th>Producto</th><th>Acción</th></tr></thead>`;
  const tb = document.createElement("tbody");
  pedido.forEach((it, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${it.nombre}</td><td>
      <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
    </td>`;
    tb.appendChild(tr);
  });
  tbl.appendChild(tb); cont.appendChild(tbl);
}

/*function eliminarProducto(i) {
  const pd = getPedido(); pd.splice(i, 1); setPedido(pd); renderPedidoMesero(); actualizarContador();
}*/
function eliminarProducto(boton) {
  const item = boton.parentElement;
  item.remove();

  // Verifica si quedan productos
  const lista = document.getElementById("detalleOrden");
  if (lista.children.length === 0) {
    document.getElementById("mensajeVacio").style.display = "block";
  }
}

function vaciarPedido() {
  if (confirm("Vaciar pedido?")) {
    setPedido([]); renderPedidoMesero(); actualizarContador();
  }
}

function enviarACocina() {
  const pd = getPedido();
  if (!pd.length) return alert("No hay nada.");

  const k = getKitchen();
  k.push({
    mesa: localStorage.getItem("mesa"),
    usuario: localStorage.getItem("usuario"),
    items: pd,
    timestamp: Date.now()
  });
  setKitchen(k);
  setPedido([]);  // Limpia el carrito después de enviar
  renderPedidoMesero();
  actualizarContador();  // Actualiza el contador en el frontend
  alert("Pedido enviado a cocina");
}

function enviarAlMesero() {
  const pd = getPedido();
  if (!pd.length) return alert("No hay nada.");

  const m = getMesero();
  m.push({
    mesa: localStorage.getItem("mesa"),
    usuario: localStorage.getItem("usuario"),
    items: pd,
    timestamp: Date.now()
  });
  setMesero(m);
  setPedido([]);  // Limpia el carrito
  alert("Pedido enviado al mesero");
}



// ── COCINA ────────────────────────────────────────────────────────────
function renderPedidosCocina() {
  const cont = document.getElementById("pedidosCocina");
  if (!cont) return;

  const pedidos = getKitchen(); // Obtener pedidos almacenados
  cont.innerHTML = ""; // Limpiar contenido anterior

  if (!pedidos.length) {
    cont.innerHTML = "<p>No hay pedidos.</p>";
    return;
  }

  // Contenedor general en formato grid
  const grid = document.createElement("div");
  grid.className = "grid";

  pedidos.forEach((pedido, i) => {
    // Crear tarjeta contenedora del pedido
    const card = document.createElement("div");
    card.className = "order status-pending"; // Clase de estado fija: 'pendiente'

    // Encabezado con número de mesa y usuario
    const header = document.createElement("div");
    header.className = "order-header";
    header.textContent = `Mesa ${pedido.mesa} - ${pedido.usuario}`;
    card.appendChild(header);

    // Cuerpo con la lista de productos
    const body = document.createElement("div");
    body.className = "order-body";

    const ul = document.createElement("ul");
    pedido.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.cantidad || 1} ${item.nombre}`;
      ul.appendChild(li);
    });

    body.appendChild(ul);
    card.appendChild(body);

    // Botón para marcar pedido como completado
    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-success";
    btn.textContent = "Listo";
    btn.onclick = () => completarPedido(i);
    card.appendChild(btn);

    // Agregar tarjeta al grid
    grid.appendChild(card);
  });

  // Insertar el grid en el contenedor
  cont.appendChild(grid);
}
function completarPedido(i) {
  const kitchen = getKitchen(); // Obtiene todos los pedidos actuales
  const pedidoCompleto = kitchen.splice(i, 1)[0]; // Elimina el pedido completado

  // Guarda los pedidos actualizados
  setKitchen(kitchen);

  // Guarda el pedido como completado
  const completados = JSON.parse(localStorage.getItem("kitchenCompleted")) || [];
  completados.push(pedidoCompleto);
  localStorage.setItem("kitchenCompleted", JSON.stringify(completados));

  // Vuelve a renderizar los pedidos
  renderPedidosCocina();
}

function getOrderStatus(pedido) {
  const estados = pedido.items.map(item => item.estado);

  if (estados.every(e => e === "listo")) return "completed";
  if (estados.some(e => e === "en proceso")) return "inprocess";
  return "pending";
}
// Función para actualizar la hora cada segundo
setInterval(() => {
  const now = new Date(); // Obtiene la hora actual
  const hours = now.getHours(); // Hora en formato 24h
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Asegura que los minutos tengan 2 dígitos
  const ampm = hours >= 12 ? 'pm' : 'am'; // Determina si es am o pm
  const hour12 = hours % 12 || 12; // Convierte a formato de 12h

  // Actualiza el contenido del elemento con id="time"
  document.getElementById("time").textContent = `${hour12}:${minutes} ${ampm}`;
}, 1000); // Ejecuta esta función cada 1000 ms (1 segundo)

// ── ADMIN ─────────────────────────────────────────────────────────────
function renderInventarioAdmin() {
  const tbody = document.getElementById("tablaInventario");
  tbody.innerHTML = "";  // Limpia la tabla actual
  productos.forEach(producto => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${producto.nombre}</td>
      <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px;"></td>
      <td><input type="number" id="stk-${producto.id}" value="${producto.stock}" min="0"></td>
      <td><input type="number" id="min-${producto.id}" value="${producto.minStock}" min="0"></td>
      <td><button onclick="updateStock(${producto.id})">Actualizar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function updateStock(id) {
  const producto = productos.find(p => p.id === id);
  const nuevoStock = parseInt(document.getElementById(`stk-${id}`).value, 10);
  const nuevoMinStock = parseInt(document.getElementById(`min-${id}`).value, 10);

  if (!isNaN(nuevoStock) && !isNaN(nuevoMinStock)) {
    producto.stock = nuevoStock;
    producto.minStock = nuevoMinStock;
    renderInventarioAdmin();  // Vuelve a renderizar la tabla
    alert("Inventario actualizado");
  } else {
    alert("Por favor, ingresa valores válidos.");
  }
}


// ── REPORTES ──────────────────────────────────────────────────────────
function renderReportes() {
  const cont = document.getElementById("reportes"); if (!cont) return;
  const comp = JSON.parse(localStorage.getItem("kitchenCompleted")) || [];
  if (!comp.length) {
    cont.innerHTML = "<p>No hay ventas.</p>";
    return;
  }
  const porDia = comp.reduce((a, p) => {
    const d = new Date(p.timestamp).toLocaleDateString();
    a[d] = a[d] || { total: 0, items: [] };
    a[d].total += p.items.length * 100;
    a[d].items.push(...p.items);
    return a;
  }, {});
  cont.innerHTML = Object.entries(porDia).map(([d, inf]) => `
    <div class="card mb-3"><div class="card-header">${d} — $${inf.total}</div>
      <ul class="list-group list-group-flush">${inf.items.map(i => `<li class="list-group-item">${i.nombre}</li>`).join("")}</ul>
    </div>`).join("");
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

  lista.innerHTML = "";  // Limpia el contenido actual del modal
  if (!pedido.length) {
    mensaje.style.display = "block";  // Muestra mensaje si no hay productos
  } else {
    mensaje.style.display = "none";  // Oculta mensaje si hay productos
    pedido.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = item.nombre + (item.ingredientes.length ? ` (${item.ingredientes.join(", ")})` : "");
      lista.appendChild(li);
    });
  }
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
