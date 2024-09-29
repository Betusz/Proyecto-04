document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //lógica de inicio de sesión
    console.log(`Usuario: ${username}, Contraseña: ${password}`);
});
