const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const publicContent = document.getElementById('publicContent');
const privateContent = document.getElementById('privateContent');

//login
loginButton.addEventListener('click', (event) => {
    loginButton.classList.add('d-none'); // Esconde botão de login
    dropdownMenuLink.classList.remove('d-none'); // Mostra botão de logout
});

// logout
logoutButton.addEventListener('click', (event) => {

    dropdownMenuLink.classList.add('d-none'); // Esconde botão de logout
    loginButton.classList.remove('d-none'); // Mostra botão de login
});