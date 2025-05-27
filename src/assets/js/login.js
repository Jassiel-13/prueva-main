
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

      // Guarda la lista actualizada en localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      return usuarios;
    }

    function iniciarSesion() {
      const usuario = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();
      const mensajeError = document.getElementById("mensajeError");
      const usuarios = getUsuarios();

      const encontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

      if (!encontrado) {
        mensajeError.textContent = "Usuario o contraseña incorrectos";
        return;
      }

      // Guardamos sesión (simple)
      localStorage.setItem("usuarioActivo", JSON.stringify(encontrado));

      // Redirigir según rol
      if (encontrado.rol === "admin") {
        window.location.href = "admin.html";
      } else if (encontrado.rol === "mesero") {
        window.location.href = "mesero.html";
      }
    }
