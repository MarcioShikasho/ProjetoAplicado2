// Variável para guardar o card da reserva a ser cancelado
let reservaParaCancelar = null;

// Adicionar evento de clique para os botões de Cancelar Reserva
document.querySelectorAll('.btn-danger').forEach(button => {
    button.addEventListener('click', function () {
        // Guardar o card da reserva que será cancelada
        reservaParaCancelar = button.closest('.card');

        // Mostrar o modal de confirmação
        const cancelModal = new bootstrap.Modal(document.getElementById('cancelModal'));
        cancelModal.show();
    });
});

// Adicionar evento de clique ao botão de confirmação no modal
document.getElementById('confirmCancel').addEventListener('click', function () {
    // Se houver uma reserva para cancelar
    if (reservaParaCancelar) {
        // Remover o card da reserva
        reservaParaCancelar.remove();

        // Fechar o modal após a confirmação
        const cancelModal = new bootstrap.Modal(document.getElementById('cancelModal'));
        cancelModal.hide();
    }
});
