// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Calculate and display total
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('checkoutTotal').textContent = `Rs. ${total.toLocaleString()}`;
}

// Handle payment method selection
function initPaymentMethodSelection() {
    const paymentCards = document.querySelectorAll('.payment-method-card');
    let selectedMethod = null;

    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selection from all cards
            paymentCards.forEach(c => c.classList.remove('selected'));
            // Add selection to clicked card
            card.classList.add('selected');
            selectedMethod = card.dataset.method;
        });
    });

    return () => selectedMethod; // Return function to get selected method
}

// Form validation and submission
function initCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    const getSelectedMethod = initPaymentMethodSelection();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const selectedMethod = getSelectedMethod();
        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }

        // Collect form data
        const orderData = {
            customer: {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            },
            paymentMethod: selectedMethod,
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };

        // In a real application, this would be sent to a backend server
        console.log('Order submitted:', orderData);
        
        // Clear cart and redirect to success page
        localStorage.removeItem('cart');
        window.location.href = 'loading.html';
    });
}

// Initialize the checkout page
document.addEventListener('DOMContentLoaded', () => {
    updateTotal();
    initCheckoutForm();
});