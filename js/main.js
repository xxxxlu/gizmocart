// Product data will be loaded from products.json
let products = [];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the navbar
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Display products on the page
function displayProducts() {
    const productList = document.getElementById('productList');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-6 col-md-4 col-lg-3';
        productCard.innerHTML = `
            <div class="card product-card h-100 position-relative">
                ${product.onSale ? `<div class="product-discount">${product.discount}</div>` : ''}
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title product-title text-capitalize">${product.name}</h5>
                    <p class="text-muted small mb-2">${product.description}</p>
                    <div class="mt-auto">
                        ${product.onSale ? `
                            <div class="d-flex align-items-center mb-2">
                                <span class="product-original-price">Rs. ${product.originalPrice.toLocaleString()}</span>
                                <span class="product-price">Rs. ${product.price.toLocaleString()}</span>
                            </div>
                            <p class="product-save mb-3">${product.saveAmount}</p>
                        ` : `
                            <p class="product-price mb-3">Rs. ${product.price.toLocaleString()}</p>
                        `}
                        <button class="btn btn-primary w-100 btn-add-to-cart" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Load products from JSON file
async function loadProducts() {
    try {
        const response = await fetch('./js/products.json');
        const data = await response.json();
        products = data.map((item, index) => {
            // Extract price from saveAmount
            const saveMatch = item.saveAmount.match(/Rs\. (\d+,?\d*)/i);
            const saveAmount = saveMatch ? parseInt(saveMatch[1].replace(',', '')) : 0;
            
            // Extract discount percentage
            const discountMatch = item.discount.match(/(\d+)%/i);
            const discountPercentage = discountMatch ? parseInt(discountMatch[1]) : 0;
            
            // Calculate original price
            const originalPrice = saveAmount ? Math.round(saveAmount / (discountPercentage / 100)) : 0;
            
            return {
                id: index + 1,
                name: item.name,
                price: originalPrice - saveAmount,
                originalPrice: originalPrice,
                discount: item.discount,
                saveAmount: item.saveAmount,
                onSale: item.onSale,
                image: item.imageUrl,
                description: item.name.split(' ').slice(0, -1).join(' ')
            };
        });
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});