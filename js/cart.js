// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the navbar
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Calculate and update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `Rs. ${total.toLocaleString()}`;
    
    // Enable/disable checkout button based on cart items
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.length === 0;
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
        updateCartTotal();
    }
}

// Remove item from cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
    updateCartTotal();
}

// Display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item row align-items-center">
            <div class="col-md-2">
                <img src="${item.image}" alt="${item.name}" class="img-fluid">
            </div>
            <div class="col-md-4">
                <h5>${item.name}</h5>
                <p class="text-muted">${item.description}</p>
            </div>
            <div class="col-md-2">
                <p class="mb-0">Rs. ${item.price.toLocaleString()}</p>
            </div>
            <div class="col-md-2">
                <div class="input-group">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="input-group-text">${item.quantity}</span>
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="col-md-2 text-end">
                <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize the cart page
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
    updateCartTotal();
});