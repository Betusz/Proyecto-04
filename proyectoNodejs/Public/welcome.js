document.addEventListener('DOMContentLoaded', () => {
    //token de la cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); 
        document.getElementById('welcome-message').innerText += ` ${payload.username}`;
    }

    document.getElementById('logout-button').addEventListener('click', () => {
        
        document.cookie = 'token=; Max-Age=0';
        window.location.href = '/login';
    });
});
