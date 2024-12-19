// Function to update the total price
function updateTotal() {
    let total = 0;
    const products = document.querySelectorAll('.card-body');

    products.forEach(product => {
        const unitPrice = parseFloat(product.querySelector('.unit-price').textContent.replace(' $', ''));
        const quantity = parseInt(product.querySelector('.quantity').textContent);
        total += unitPrice * quantity;
    });

    // Update the total price in the DOM
    document.querySelector('.total').textContent = `${total} $`;
}

// Event listener for the plus and minus buttons to increase/decrease quantity
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-plus-circle')) {
        const quantityElement = event.target.closest('.card-body').querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
        updateTotal();
    }

    if (event.target.classList.contains('fa-minus-circle')) {
        const quantityElement = event.target.closest('.card-body').querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantityElement.textContent = quantity - 1;
            updateTotal();
        }
    }

    // Event listener for the trash icon to remove an item from the cart
    if (event.target.classList.contains('fa-trash-alt')) {
        const productElement = event.target.closest('.card-body');
        productElement.remove();
        updateTotal();
    }
});
