// ../JS/cart.js

// Load cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Event listener for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        saveCart();
        updateCart();
    });
});

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCart() {
    if (cartItemsContainer && cartTotal) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            li.innerHTML = `
                ${item.name} x ${item.quantity}
                <div>
                    ₹${(item.price * item.quantity).toFixed(2)}
                    <button class="btn btn-danger btn-sm ms-2 remove-item" data-index="${index}">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                cart.splice(index, 1);
                saveCart();
                updateCart();
            });
        });
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

// Initialize cart on page load
updateCart();