// Função para definir a data para a data atual e não permitir agendamentos em datas passadas
function setMinDate(modal) {
    const hoje = new Date();

    // Formata a data como YYYY-MM-DD
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = `${ano}-${mes}-${dia}`;

    // Define o valor mínimo para o campo de check-in dentro do modal
    const checkinField = modal.querySelector('.dataCheckin');
    if (checkinField) {
        checkinField.setAttribute('min', dataFormatada);
        if (!checkinField.value) {
            checkinField.value = dataFormatada; 
        }
    }

    // Define o valor mínimo para o campo de check-out dentro do modal
    const checkoutField = modal.querySelector('.dataCheckout');
    if (checkoutField) {
        checkoutField.setAttribute('min', dataFormatada);
        ajustarCheckout(modal); 
    }
}

// Função para ajustar a data de check-out para ser 3 dias após o check-in
function ajustarCheckout(modal) {
    const checkinField = modal.querySelector('.dataCheckin');
    const checkoutField = modal.querySelector('.dataCheckout');

    if (checkinField && checkoutField) {
        const dataCheckin = checkinField.value;
        const checkinDate = new Date(dataCheckin);

        // Adiciona 3 dias à data de check-in
        checkinDate.setDate(checkinDate.getDate() + 3);

        // Formata a data como YYYY-MM-DD
        const dia = String(checkinDate.getDate()).padStart(2, '0');
        const mes = String(checkinDate.getMonth() + 1).padStart(2, '0');
        const ano = checkinDate.getFullYear();

        const dataFormatadaCheckout = `${ano}-${mes}-${dia}`;

        // Atualiza o campo de Check-out, limitando a data mínima e passando o valor automaticamente
        checkoutField.setAttribute('min', dataFormatadaCheckout);
        checkoutField.value = dataFormatadaCheckout;
    }
}

// Função para configurar os eventos de modais e campos de data
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os modais com a classe .modalAcomod
    var modais = document.querySelectorAll('.modalAcomod');

    // Para cada modal, adiciona o evento 'shown.bs.modal'
    modais.forEach(function (modal) {
        modal.addEventListener('shown.bs.modal', function () {
            setMinDate(modal);
        });

        // Troca a data do Checkout toda vez que o Checkin for alterado
        const checkinField = modal.querySelector('.dataCheckin');
        if (checkinField) {
            checkinField.addEventListener('change', function () {
                ajustarCheckout(modal);
            });
        }
    });
});
