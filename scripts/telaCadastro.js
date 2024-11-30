// Evento de cadastro - quando o formulário de cadastro for submetido
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById('Nome').value;
    const sobrenome = document.getElementById('Sobrenome').value;
    const cpf = document.getElementById('Cpf').value;
    const celular = document.getElementById('Celular').value;
    const email = document.getElementById('inputEmail4').value;
    const senha = document.getElementById('inputPassword4').value;
    const confirmSenha = document.getElementById('inputConfirmPassword').value;

    // Cria um objeto com os dados do usuário
    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        celular: celular,
        email: email,
        senha: senha // Em um ambiente real, a senha nunca deve ser armazenada em texto simples
    };

    // Salva os dados no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Confirmação e redirecionamento após cadastro bem-sucedido
    alert("Cadastro realizado com sucesso!");
    window.location.href = "./telaAcomodacoes.html"; // Redireciona para a página de login
});