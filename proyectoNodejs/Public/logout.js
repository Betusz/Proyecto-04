document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    window.location.href = '/'; //Al cerrar sesion, lo dirige. 
                } else {
                    console.error('Error al cerrar sesión');
                    alert('Error al cerrar sesión');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error en la conexión');
            }
        });
    } else {
        console.error('Botón de cierre de sesión no encontrado');
    }
});
