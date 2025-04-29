// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total;
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
});
