// // Fonction pour mettre à jour le total
// function updateTotal() {
//     let total = 0;
//     const products = document.querySelectorAll('.card-body');

//     products.forEach(product => {
//         const unitPrice = parseFloat(product.querySelector('.unit-price').textContent.replace(' $', ''));
//         const quantity = parseInt(product.querySelector('.quantity').textContent);
//         total += unitPrice * quantity;
//     });

//     // Met à jour le total dans l'élément HTML
//     document.querySelector('.total').textContent = `${total} $`;
// }

// // Gestion des événements pour les clics
// document.addEventListener('click', (event) => {
//     // Clic sur le bouton plus (+)
//     if (event.target.classList.contains('fa-plus-circle')) {
//         const quantityElement = event.target.closest('.card-body').querySelector('.quantity');
//         let quantity = parseInt(quantityElement.textContent);
//         quantityElement.textContent = quantity + 1;
//         updateTotal();
//     }

//     // Clic sur le bouton moins (-)
//     if (event.target.classList.contains('fa-minus-circle')) {
//         const quantityElement = event.target.closest('.card-body').querySelector('.quantity');
//         let quantity = parseInt(quantityElement.textContent);
//         if (quantity > 0) {
//             quantityElement.textContent = quantity - 1;
//             updateTotal();
//         }
//     }

//     // Clic sur l'icône poubelle (supprimer l'article)
//     if (event.target.classList.contains('fa-trash-alt')) {
//         const productElement = event.target.closest('.card-body').parentNode; // Sélectionner l'élément entier du produit
//         productElement.remove(); // Supprimer le produit du panier
//         updateTotal();
//     }

//     // Clic sur l'icône cœur (changer la couleur en rouge)
//     if (event.target.classList.contains('fa-heart')) {
//         event.target.classList.toggle('liked'); // Toggle la classe 'liked' pour changer la couleur
//     }
// });
class Product {
    constructor(name, price, imageSrc) {
        this.name = name;
        this.price = price;
        this.imageSrc = imageSrc;
    }
}

class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    updateQuantity(amount) {
        this.quantity += amount;
        if (this.quantity < 0) this.quantity = 0; // Ne pas permettre une quantité négative
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.name === product.name);
        if (existingItem) {
            existingItem.updateQuantity(quantity);
        } else {
            const newItem = new CartItem(product, quantity);
            this.items.push(newItem);
        }
    }

    removeItem(productName) {
        this.items = this.items.filter(item => item.product.name !== productName);
    }

    updateTotal() {
        let total = 0;
        this.items.forEach(item => {
            total += item.getTotalPrice();
        });
        document.querySelector('.total').textContent = `${total} $`;
    }

    renderCart() {
        const cartContainer = document.querySelector('.list-products');
        cartContainer.innerHTML = ''; // Vider l'ancien panier

        this.items.forEach(item => {
            const productElement = this.createProductElement(item);
            cartContainer.appendChild(productElement);
        });
        this.updateTotal();
    }

    createProductElement(cartItem) {
        const productElement = document.createElement('div');
        productElement.classList.add('card-body');
        productElement.innerHTML = `
            <div class="card" style="width: 18rem">
                <img src="${cartItem.product.imageSrc}" class="card-img-top" alt="${cartItem.product.name}">
                <div class="card-body">
                    <h5 class="card-title">${cartItem.product.name}</h5>
                    <p class="card-text">This is a ${cartItem.product.name}</p>
                    <h4 class="unit-price">${cartItem.product.price} $</h4>
                    <div>
                        <i class="fas fa-plus-circle"></i>
                        <span class="quantity">${cartItem.quantity}</span>
                        <i class="fas fa-minus-circle"></i>
                    </div>
                    <div>
                        <i class="fas fa-trash-alt"></i>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>
        `;
        return productElement;
    }
}

// Initialisation du panier
const cart = new ShoppingCart();

// Définition des produits
const basket = new Product('Baskets', 100, 'assets/baskets.png');
const socks = new Product('Socks', 20, 'assets/socks.png');
const bag = new Product('Bag', 50, 'assets/bag.png');

// Ajouter les produits au panier (exemple)
cart.addItem(basket, 1);
cart.addItem(socks, 2);
cart.addItem(bag, 1);

// Afficher le panier
cart.renderCart();

// Gestion des événements sur les éléments du panier
document.addEventListener('click', (event) => {
    // Clic sur le bouton plus (+)
    if (event.target.classList.contains('fa-plus-circle')) {
        const productName = event.target.closest('.card-body').querySelector('.card-title').textContent;
        const product = cart.items.find(item => item.product.name === productName);
        cart.addItem(product.product, 1);
        cart.renderCart();
    }

    // Clic sur le bouton moins (-)
    if (event.target.classList.contains('fa-minus-circle')) {
        const productName = event.target.closest('.card-body').querySelector('.card-title').textContent;
        const product = cart.items.find(item => item.product.name === productName);
        cart.addItem(product.product, -1);
        cart.renderCart();
    }

    // Clic sur l'icône poubelle (supprimer l'article)
    if (event.target.classList.contains('fa-trash-alt')) {
        const productName = event.target.closest('.card-body').querySelector('.card-title').textContent;
        cart.removeItem(productName);
        cart.renderCart();
    }

    // Clic sur l'icône cœur (changer la couleur en rouge)
    if (event.target.classList.contains('fa-heart')) {
        event.target.classList.toggle('liked'); // Toggle la classe 'liked' pour changer la couleur
    }
});
