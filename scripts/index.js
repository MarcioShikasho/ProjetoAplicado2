// Variáveis para os elementos da navbar
const loginButton = document.getElementById('loginButton');  // Botão de login
const profileDropdown = document.getElementById('profileDropdown');  // Menu "Meu Perfil"
const logoutButton = document.getElementById('logoutButton');  // Botão de logout
const loginButtonForm = document.getElementById('loginButtonForm');  // Botão de login no modal

// Função para simular o login (pode adicionar validação real)
function login(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Pegue o email e a senha do formulário
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    // Simula um login bem-sucedido
    if (email && password) {
        // Salva no localStorage que o usuário está logado
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email); // Podemos salvar o e-mail ou outras informações
    }

    // Atualiza a navbar e redireciona para a página de acomodações
    updateNavbar();
    window.location.href = './telaAcomodacoes.html'; // Redireciona para a página de acomodações
}

function logout() {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');

    // Atualiza a navbar
    updateNavbar();
    window.location.href = "./index.html";
}

// Função para atualizar a navbar com base no estado do login
function updateNavbar() {
    // Verifica se o usuário está logado
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Se estiver logado, escondemos o botão de login na navbar e mostramos o perfil
        loginButton.style.display = 'none'; // Esconde o botão de login
        profileDropdown.classList.remove('d-none'); // Mostra o "Meu Perfil" (Remove a classe 'd-none')
    } else {
        // Caso contrário, mostramos o botão de login novamente e escondemos o perfil
        loginButton.style.display = 'block'; // Exibe o botão de login
        profileDropdown.classList.add('d-none'); // Esconde o "Meu Perfil" (Adiciona a classe 'd-none')
    }
}

// Quando a página carregar, verificar o estado de login
window.addEventListener('DOMContentLoaded', updateNavbar);

// Adiciona o evento de submit no formulário de login
loginButtonForm.addEventListener('click', login);

// Adiciona o evento de logout
logoutButton.addEventListener('click', logout);

