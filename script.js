// Assurez-vous que ce script est inclus dans votre fichier HTML.

// Fonction pour mettre à jour le total
define function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;

    items.forEach(item => {
        const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.item-quantity').value);
        total += price * quantity;
    });

    document.querySelector('#total-price').textContent = `$${total.toFixed(2)}`;
}

// Gestion des boutons + et -
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-plus')) {
        const quantityInput = event.target.closest('.cart-item').querySelector('.item-quantity');
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotal();
    } else if (event.target.classList.contains('btn-minus')) {
        const quantityInput = event.target.closest('.cart-item').querySelector('.item-quantity');
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateTotal();
        }
    }
});

// Gestion de la suppression des articles
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remove')) {
        const item = event.target.closest('.cart-item');
        item.remove();
        updateTotal();
    }
});

// Gestion du bouton "cœur" pour aimer les articles
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-heart')) {
        event.target.classList.toggle('liked');
    }
});
