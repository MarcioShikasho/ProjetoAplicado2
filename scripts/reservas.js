document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de cancelar
    const cancelButtons = document.querySelectorAll('.btn-danger');
    const confirmButton = document.getElementById('confirmCancel');
    let currentReservaId = null; // Para rastrear qual reserva será cancelada

    // Adiciona evento para abrir o modal de confirmação
    cancelButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            currentReservaId = event.target.closest('.col-12').id; // Obtém o ID da reserva
            const cancelModal = new bootstrap.Modal(document.getElementById('cancelModal'));
            cancelModal.show();
        });
    });

    // Confirma o cancelamento
    confirmButton.addEventListener('click', () => {
        if (currentReservaId) {
            const reservaElement = document.getElementById(currentReservaId);
            if (reservaElement) {
                reservaElement.classList.add('d-none'); 
            }
        }
    });
});
