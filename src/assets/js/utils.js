// Función para verificar si el token es válido
async function verificarToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "login.html";  // Redirigir a login si no hay token
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/verificar-token', {
            method: 'POST',
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();

        if (!data.success) {
            window.location.href = "login.html";  // Redirigir si el token no es válido
        }
    } catch (error) {
        console.error('Error de verificación de token:', error);
        window.location.href = "login.html";  // Redirigir en caso de error
    }
}

// Ejecutar la verificación de token al cargar la página
window.onload = function() {
    verificarToken();
};
