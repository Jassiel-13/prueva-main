// ── Datos y sincronización con localStorage ──────────────────────────────
let productos = cargarProductos();
if (productos.length === 0) {
  productos = [
    { id: 1, nombre: "Hamburguesa Clásica", imagen: "img/CLASICA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla", "Carne", "Catsup", "Pan"], stock: 10, minStock: 3 },
    { id: 2, nombre: "Hamburguesa BBQ", imagen: "img/BBQ.png", ingredientes: ["Bacon", "Lechuga", "Tomate", "Cebolla", "Carne", "Cebolla caramelizada", "Salsa BBQ", "Pan"], stock: 5, minStock: 2 },
    { id: 3, nombre: "Hamburguesa Hawaiana", imagen: "img/HAWAIANA.png", ingredientes: ["Bacon", "Queso", "Cebolla caramelizada", "Salsa BBQ", "Lechuga", "Tomate", "Cebolla", "Carne", "Pan"], stock: 5, minStock: 2 },
    { id: 4, nombre: "Hamburguesa Doble", imagen: "img/DOBLE.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla", "Carne x2", "Catsup", "Pan"], stock: 5, minStock: 2 },
    { id: 5, nombre: "Hamburguesa Mixta", imagen: "img/MIXTA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla", "Carne", "Pollo", "Catsup", "Pan"], stock: 5, minStock: 2 },
    { id: 6, nombre: "Hamburguesa de pollo", imagen: "img/POLLO.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla", "Pollo", "Catsup", "Pan"], stock: 5, minStock: 2 },
    { id: 7, nombre: "Hamburguesa de Vegetariana", imagen: "img/VEGETARIANA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla", "Hongo", "Mantequilla", "Pan"], stock: 5, minStock: 2 },
    { id: 8, nombre: "Banderilla", imagen: "img/ban.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla", "Hongo", "Mantequilla", "Pan"], stock: 5, minStock: 2 },
    { id: 9, nombre: "Hot dog", imagen: "img/HOT DOG.png", ingredientes: ["Cebolla", "Tomate", "Catsup", "Mostaza", "Salchica", "Pan"], stock: 5, minStock: 2 },
    { id: 10, nombre: "Salchipapas", imagen: "img/SALCHI.png", ingredientes: ["Sazonador", "Papas", "Salchicha"], stock: 5, minStock: 2 },
    { id: 11, nombre: "Orden de papas", imagen: "img/PAPAS.png", ingredientes: ["Sazonador", "Papas"], stock: 5, minStock: 2 },
    // puedes agregar más productos aquí
  ];
  guardarProductos();
}

function cargarProductos() {
  const datos = localStorage.getItem("productos");
  return datos ? JSON.parse(datos) : [];
}

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// ── Renderizado del menú ────────────────────────────────────────────────
function renderMenu() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const disabled = p.stock <= 0 ? "disabled" : "";
    contenedor.innerHTML += `
      <div class="col-md-4 mb-3">
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
                </div>`).join("")}
            </div>
            <div class="mb-3">
              <label class="form-label">Agregar ingrediente extra (opcional):</label>
              <input type="text" class="form-control" id="extra-${p.id}" placeholder="Ej: Jalapeños">
            </div>
            <button class="btn btn-success mt-auto" onclick="agregarAlPedido(${p.id})" ${disabled}>Agregar al pedido</button>
            <p class="mt-2">Stock disponible: ${p.stock}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// ── Agregar producto al pedido descontando stock ─────────────────────────
function agregarAlPedido(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    alert("Producto no encontrado.");
    return;
  }
  if (producto.stock <= 0) {
    alert("No hay stock disponible para este producto.");
    return;
  }

  producto.stock -= 1;
  guardarProductos();

  if (producto.stock <= producto.minStock) {
    mostrarAlertaStockMinimo(producto.nombre);
  }

  const pedido = getPedido();

  const ingredientesSeleccionados = producto.ingredientes.filter(ingrediente => {
    const checkbox = document.getElementById(`check-${id}-${ingrediente}`);
    return checkbox && checkbox.checked;
  });

  const extraInput = document.getElementById(`extra-${id}`);
  if (extraInput && extraInput.value.trim() !== "") {
    ingredientesSeleccionados.push(extraInput.value.trim());
  }

  pedido.push({
    id: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    ingredientes: ingredientesSeleccionados
  });

  setPedido(pedido);

  actualizarContador();
  renderMenu();

  alert(`"${producto.nombre}" agregado al pedido.`);
}

// ── Contador de pedidos ────────────────────────────────────────────────
function actualizarContador() {
  const contador = document.getElementById("contadorOrden");
  if (contador) {
    const pedido = getPedido();
    contador.textContent = pedido.length;
  }
}

function getPedido() {
  return JSON.parse(localStorage.getItem("pedido")) || [];
}

function setPedido(pedido) {
  localStorage.setItem("pedido", JSON.stringify(pedido));
}

// ── Mostrar alerta de stock mínimo ──────────────────────────────────────
function mostrarAlertaStockMinimo(nombreProducto) {
  const alerta = document.createElement("div");
  alerta.className = "alert alert-warning alert-dismissible fade show mt-3";
  alerta.role = "alert";
  alerta.innerHTML = `
    <strong>⚠️ Stock bajo:</strong> El producto <strong>${nombreProducto}</strong> tiene stock mínimo.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `;
  document.body.prepend(alerta);

  setTimeout(() => {
    alerta.classList.remove("show");
    alerta.classList.add("fade");
    setTimeout(() => alerta.remove(), 500);
  }, 5000);
}

// ── Inicialización al cargar la página ───────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  actualizarContador();
});
