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
        <p><strong>${i}. ${item.nombre}</strong></p>
        <p>🧂 Ingredientes actuales: ${listaIngredientes}</p>
        <p style="color:green;">➕ Agregados: ${agregados}</p>
        <p style="color:red;">➖ Quitados: ${quitados}</p>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
        <button class="btn btn-sm btn-warning" onclick="editarProducto(${i})">Editar</button> <!-- Botón de editar -->
      </div>
    `;
  });
}

function editarProducto(index) {
  const pedido = getPedido();
  const item = pedido[index];

  // Mostrar un modal con el nombre y los ingredientes actuales
  const modalContent = document.getElementById("modalEditarContenido");
  
  // Crear una lista de checkboxes con los ingredientes actuales
  modalContent.innerHTML = `
    <h5>Editar ${item.nombre}</h5>
    <div>
      <strong>Ingredientes actuales:</strong>
      <ul id="ingredientesLista">
        ${item.ingredientes.map((ingrediente, i) => `
          
            <input type="checkbox" id="ingrediente${i}" ${item.ingredientes.includes(ingrediente) ? 'checked' : ''}>
            <label for="ingrediente${i}">${ingrediente}</label><br>
          `).join("")}
      </ul>
      <label for="nuevoIngrediente">Nuevo ingrediente:</label>
      <input type="text" id="nuevoIngrediente" class="form-control" placeholder="Ej: Jalapeños">
      <button class="btn btn-success mt-2" onclick="guardarEdicion(${index})">Guardar cambios</button>
    </div>
  `;
  
  // Mostrar el modal de edición
  const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
  modal.show();
}

function guardarEdicion(index) {
  const pedido = getPedido();
  const item = pedido[index];
  
  // Obtener la lista de checkboxes y actualizar los ingredientes según las casillas seleccionadas
  const checkboxes = document.querySelectorAll('#ingredientesLista input[type="checkbox"]');
  const ingredientesEditados = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      ingredientesEditados.push(checkbox.nextElementSibling.textContent); // El ingrediente es el texto del label
    }
  });

  // Si el campo "Nuevo ingrediente" no está vacío, añadirlo a la lista
  const nuevoIngrediente = document.getElementById('nuevoIngrediente').value.trim();
  if (nuevoIngrediente !== "") {
    ingredientesEditados.push(nuevoIngrediente);
  }

  // Actualizar los ingredientes en el pedido
  item.ingredientes = ingredientesEditados;

  // Guardar el carrito actualizado en localStorage
  setPedido(pedido);

  // Cerrar el modal después de guardar
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
  if (modal) modal.hide();

  // Redibujar el modal de la orden con los cambios
  renderOrdenModal();

  // Actualizar el contador del carrito
  actualizarContador();
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

// ================= ADMIN =====================

// Inventario: mostrar y editar
function renderInventarioAdmin() {
  const tbody = document.getElementById("inventarioAdmin");
  if (!tbody) return;
  tbody.innerHTML = "";

  productos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td><input type="number" id="stk-${p.id}" value="${p.stock}" class="form-control form-control-sm"/></td>
      <td><input type="number" id="min-${p.id}" value="${p.minStock}" class="form-control form-control-sm"/></td>
      <td><button class="btn btn-sm btn-primary" onclick="updateStock(${p.id})">Guardar</button></td>
    `;
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

// Historial de pedidos (simple por nombre y fecha)
function getHistorial() {
  return JSON.parse(localStorage.getItem('historialPedidos')) || [];
}

function renderHistorialPedidos() {
  const historial = getHistorial();
  const lista = document.getElementById("listaHistorial");
  const totalSpan = document.getElementById("totalRecaudado");

  let total = 0;
  lista.innerHTML = "";

  historial.forEach((pedido, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `#${i + 1} | ${pedido.fecha} | ${pedido.nombre}`;
    lista.appendChild(li);
    total += 100; // Precio fijo por producto
  });

  totalSpan.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  renderHistorialPedidos();

  const btnPDF = document.getElementById("btnPDF");
  if (btnPDF) {
    btnPDF.addEventListener("click", () => {
      const contenido = document.getElementById("contenidoHistorial");
      if (!contenido || contenido.innerHTML.trim() === "") {
        alert("No hay contenido para exportar.");
        return;
      }

      const opciones = {
        margin: 0.5,
        filename: 'historial_pedidos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opciones).from(contenido).save();
    });
  }
});


// Descargar PDF del historial
function descargarHistorialPDF() {
  const contenido = document.getElementById("contenidoHistorial");
  const opciones = {
    margin: 0.5,
    filename: 'historial_pedidos.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opciones).from(contenido).save();
}

// Ventas por día (usando kitchenCompleted)
function renderReportes() {
  const cont = document.getElementById("reportes");
  if (!cont) return;

  const comp = JSON.parse(localStorage.getItem("kitchenCompleted")) || [];
  if (!comp.length) {
    cont.innerHTML = "<p>No hay ventas.</p>";
    return;
  }

  const porDia = comp.reduce((a, p) => {
    const d = new Date(p.timestamp).toLocaleDateString();
    a[d] = a[d] || {};
    p.items.forEach(i => {
      a[d][i.nombre] = (a[d][i.nombre] || 0) + 1;
    });
    return a;
  }, {});

  cont.innerHTML = Object.entries(porDia).map(([fecha, items]) => `
    <div class="card mb-3">
      <div class="card-header">${fecha}</div>
      <table class="table">
        <thead><tr><th>Producto</th><th>Cantidad</th></tr></thead>
        <tbody>
          ${Object.entries(items).map(([prod, cant]) => `
            <tr><td>${prod}</td><td>${cant}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `).join('');
}

// Inicializar admin
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("inventarioAdmin")) renderInventarioAdmin();
  if (document.getElementById("listaHistorial")) renderHistorialPedidos();
  if (document.getElementById("reportes")) renderReportes();

  const btnPDF = document.getElementById("btnPDF");
  if (btnPDF) btnPDF.addEventListener("click", descargarHistorialPDF);
});


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



