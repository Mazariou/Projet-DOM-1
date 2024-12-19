// Fonction pour mettre à jour le total
function updateTotal() {
    let total = 0;
    const products = document.querySelectorAll('.card-body');

    products.forEach(product => {
        const unitPrice = parseFloat(product.querySelector('.unit-price').textContent.replace(' $', ''));
        const quantity = parseInt(product.querySelector('.quantity').textContent);
        total += unitPrice * quantity;
    });

    // Met à jour le total dans l'élément HTML
    document.querySelector('.total').textContent = `${total} $`;
}

// Gestion des événements pour les clics
document.addEventListener('click', (event) => {
    // Clic sur le bouton plus (+)
    if (event.target.classList.contains('fa-plus-circle')) {
        const quantityElement = event.target.closest('.card-body').querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
        updateTotal();
    }

    // Clic sur le bouton moins (-)
    if (event.target.classList.contains('fa-minus-circle')) {
        const quantityElement = event.target.closest('.card-body').querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantityElement.textContent = quantity - 1;
            updateTotal();
        }
    }

    // Clic sur l'icône poubelle (supprimer l'article)
    if (event.target.classList.contains('fa-trash-alt')) {
        const productElement = event.target.closest('.card-body').parentNode; // Sélectionner l'élément entier du produit
        productElement.remove(); // Supprimer le produit du panier
        updateTotal();
    }

    // Clic sur l'icône cœur (changer la couleur en rouge)
    if (event.target.classList.contains('fa-heart')) {
        event.target.classList.toggle('liked'); // Toggle la classe 'liked' pour changer la couleur
    }
});
