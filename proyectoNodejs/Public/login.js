document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); //Envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Login successful', result);
            alert('Login exitoso!');
            //usuario a la página de bienvenida
            window.location.href = '/welcome';
        } else {
            const errorMessage = await response.text();
            console.error('Login failed', errorMessage);
            alert('Login fallido: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la conexión');
    }
});
