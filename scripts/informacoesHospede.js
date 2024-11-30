document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input');
    const editButton = document.getElementById('editButton');
    const login =  localStorage.getItem('userId');


    
    // Quando clicar no botão 'Editar'vai habilitar os campos e trocar o botão para salvar
    editButton.addEventListener('click', function () {
        if (editButton.textContent === 'Editar') {
            inputs.forEach(input => input.disabled = false);

            editButton.textContent = 'Salvar';
            editButton.classList.remove('btn-primary');
            editButton.classList.add('btn-success');
        } else {
            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();
        }
    });

    // Alerta de alteração, desabilita os campos e troca do botão salvar para editar
    document.getElementById('confirmEdit').addEventListener('click', function () {

        inputs.forEach(input => input.disabled = true);

        editButton.textContent = 'Editar';
        editButton.classList.remove('btn-success');
        editButton.classList.add('btn-primary');
    });
});
