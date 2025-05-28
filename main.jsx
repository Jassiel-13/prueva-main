import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


    function validarFormulario() {
      const nombre = document.getElementById("nombre").value.trim();
      const mesa = document.getElementById("mesa").value;
      if (!nombre) { alert("Por favor, ingresa tu nombre."); return false; }
      if (!mesa) { alert("Por favor, selecciona una mesa."); return false; }
      localStorage.setItem("usuario", nombre);
      localStorage.setItem("mesa", mesa);
      window.location.href = "menu.html";
      return false;
    }