document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("Nome").value;
    const sobrenome = document.getElementById("Sobrenome").value;
    const cpf = document.getElementById("Cpf").value;
    const telefone = document.getElementById("Celular").value;
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;

    fetch("http://localhost:3000/api/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          cpf,
          telefone,
          email,
          senha
        })
      })
      .then(response => response.json()) // Processar a resposta da API
      .then(data => {
        alert(data.message); // Exibe a mensagem recebida da API
        if (data.message === "Cadastro realizado com sucesso!") {
          document.getElementById("formCadastro").reset(); // Reseta o formulário
        }
      })
      .catch(error => {
        console.error("Erro ao enviar dados:", error);
        alert("Erro ao enviar dados.");
      });
    });