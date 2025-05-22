(async function verificarAutenticacion() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/verificar-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!data.success) {
            localStorage.clear();
            window.location.href = 'login.html';
        }
    } catch (error) {
        localStorage.clear();
        window.location.href = 'login.html';
    }
})();
