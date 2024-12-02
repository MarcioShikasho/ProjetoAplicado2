import { insertHospedePessoa } from "./back-end";
// Verifica o estado de login
function checarEstadoLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('userId');

    if (isLoggedIn === 'true') {
        document.getElementById('loginButton').classList.add('d-none');
        document.getElementById('profileDropdown').classList.remove('d-none');
    } else {
        document.getElementById('loginButton').classList.remove('d-none');
        document.getElementById('profileDropdown').classList.add('d-none');
    }
}

// Executa a função checkLoginState ao carregar qualquer página
window.addEventListener('load', checarEstadoLogin);

// Evento de login - quando o formulário de login for submetido
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    // Pegue os valores do formulário de login
    const nome = document.getElementById('Nome').value;
    const sobrenome = document.getElementById('Sobrenome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('Celular').value;
    const data_nasc = document.getElementById()
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword4').value;

    // Validação simples - Verifica se os campos não estão vazios
    if (email && password) {
        // Salva o estado de login no localStorage
        try {
            const logon = insertHospedePessoa(email, password);

        } catch (error) {
            
        }
        localStorage.setItem('isLoggedIn', 'true');

        // Redireciona para a página de acomodações
        window.location.href = "./telaAcomodacoes.html";
    } else {
        alert("Por favor, preencha os campos de login.");
    }
});

// Logout
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');

    // Redireciona o usuário para a página inicial de login
    window.location.href = "./index.html";
});

checarEstadoLogin();
