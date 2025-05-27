
    // Cargar mesas ocupadas desde localStorage
    document.addEventListener("DOMContentLoaded", function () {
      const mesasOcupadas = JSON.parse(localStorage.getItem("mesasOcupadas")) || [];
      mesasOcupadas.forEach(function (mesa) {
        const option = document.querySelector(`#mesa option[value="${mesa}"]`);
        if (option) option.disabled = true;
      });
    });

    function validarFormulario() {
      const nombre = document.getElementById("nombre").value.trim();
      const mesa = document.getElementById("mesa").value;

      if (!nombre) {
        alert("Por favor, ingresa tu nombre.");
        return false;
      }
      if (!mesa) {
        alert("Por favor, selecciona una mesa.");
        return false;
      }

      let mesasOcupadas = JSON.parse(localStorage.getItem("mesasOcupadas")) || [];
      mesasOcupadas.push(mesa);
      localStorage.setItem("mesasOcupadas", JSON.stringify(mesasOcupadas));
      localStorage.setItem("usuario", nombre);
      localStorage.setItem("mesa", mesa);
      localStorage.removeItem("producto");
      window.location.href = "menu.html";
      
      return false;
    }

function liberarMesa(mesaLiberada) {
  // Obtener las mesas ocupadas desde localStorage
  let mesasOcupadas = JSON.parse(localStorage.getItem("mesasOcupadas")) || [];

  // Filtrar la mesa a liberar
  mesasOcupadas = mesasOcupadas.filter(mesa => mesa !== mesaLiberada);

  // Guardar el nuevo arreglo en localStorage
  localStorage.setItem("mesasOcupadas", JSON.stringify(mesasOcupadas));

  // Habilitar visualmente la opción en el <select>
  const option = document.querySelector(`#mesa option[value="${mesaLiberada}"]`);
  if (option) option.disabled = false;

  alert(`Mesa ${mesaLiberada} ha sido liberada.`);
}


    // Función para borrar todos los datos
    function borrarLocalStorage() {
      if (confirm("¿Deseas borrar todos los datos guardados (mesas, usuario, etc.)?")) {
        localStorage.removeItem("mesasOcupadas");
        localStorage.removeItem("usuario");
        localStorage.removeItem("mesa");
        localStorage.removeItem("producto");

        location.reload();
      }
    }
