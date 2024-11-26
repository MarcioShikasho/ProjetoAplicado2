function setMinDate() {
    const hoje = new Date();

    // Formatar a data como YYYY-MM-DD
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = `${ano}-${mes}-${dia}`;

    // Definir o valor mínimo para o campo de check-in
    document.getElementById('dataCheckin').setAttribute('min', dataFormatada);

    //atribui a data atual
    const checkinField = document.getElementById('dataCheckin');
    if (!checkinField.value) {
        checkinField.value = dataFormatada;  // Preenche o check-in com a data de hoje
    }

    // Definir o valor mínimo para o campo de check-out
    document.getElementById('dataCheckout').setAttribute('min', dataFormatada);

    // Configurar a data de check-out como 3 dias após o check-in
    ajustarCheckout();
}

// Função para ajustar a data de check-out para ser 3 dias após o check-in
function ajustarCheckout() {
    const dataCheckin = document.getElementById('dataCheckin').value;

    const checkinDate = new Date(dataCheckin);

    // Adicionar 3 dias à data de check-in
    checkinDate.setDate(checkinDate.getDate() + 3);

    // Formatar a data como YYYY-MM-DD
    const dia = String(checkinDate.getDate()).padStart(2, '0');
    const mes = String(checkinDate.getMonth() + 1).padStart(2, '0');
    const ano = checkinDate.getFullYear();

    const dataFormatadaCheckout = `${ano}-${mes}-${dia}`;

    // Atualizar o campo de Check-out, limitando a data mínima e passando o valor automaticamente
    document.getElementById('dataCheckout').setAttribute('min', dataFormatadaCheckout);
    document.getElementById('dataCheckout').value = dataFormatadaCheckout;
}

//Função de setar data mínima quando abrir o modal
document.addEventListener('DOMContentLoaded', function () {
    var modalElement = document.getElementById('modalReservaDomo');
    modalElement.addEventListener('shown.bs.modal', function () {
        setMinDate();
    });

    // Quando o usuário selecionar a data de Check-in, automaticamente ajusta a data de checkout
    document.getElementById('dataCheckin').addEventListener('change', ajustarCheckout);
});
