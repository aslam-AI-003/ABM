// Restaurant Billing Application - Main JavaScript

// Default Menu Items with Images - Arabian Bismi Mandi Menu
const defaultMenuItems = [
    {
        id: 1,
        name: 'Chicken Mandi',
        category: 'Chicken',
        size: 'Single',
        price: 250,
        image: 'images/single_chicken.jpg'
    },
    {
        id: 2,
        name: 'Chicken Mandi',
        category: 'Chicken',
        size: 'Couples',
        price: 550,
        image: 'images/half_chicken.webp'
    },
    {
        id: 3,
        name: 'Chicken Mandi',
        category: 'Chicken',
        size: 'Family',
        price: 1100,
        image: 'images/chicken_mandi_full.webp'
    },
    {
        id: 4,
        name: 'Mutton Mandi',
        category: 'Mutton',
        size: 'Single',
        price: 400,
        image: 'images/mutton_single.png'
    },
    {
        id: 5,
        name: 'Mutton Mandi',
        category: 'Mutton',
        size: 'Couples',
        price: 800,
        image: 'images/mutton_half.webp'
    },
    {
        id: 6,
        name: 'Mutton Mandi',
        category: 'Mutton',
        size: 'Family',
        price: 1600,
        image: 'images/muttonfull.jpg'
    },
    {
        id: 7,
        name: 'Beef Mandi',
        category: 'Beef',
        size: 'Single',
        price: 350,
        image: 'images/beef_single.webp'
    },
    {
        id: 8,
        name: 'Beef Mandi',
        category: 'Beef',
        size: 'Couples',
        price: 700,
        image: 'images/beef_half.webp'
    },
    {
        id: 9,
        name: 'Beef Mandi',
        category: 'Beef',
        size: 'Family',
        price: 1400,
        image: 'images/beef_full.jpg'
    },
    {
        id: 10,
        name: 'Chicken Extra',
        category: 'Chicken',
        size: 'Half',
        price: 230,
        image: 'images/half_chicken.webp'
    },
    {
        id: 11,
        name: 'Chicken Extra',
        category: 'Chicken',
        size: 'Full',
        price: 450,
        image: 'images/chicken_mandi_full.webp'
    }
];

// Initialize menu items in localStorage if not exists
function initializeMenu() {
    // Force reset menu to get updated images and prices
    const storedVersion = localStorage.getItem('menuVersion');
    const currentVersion = '4.0'; // Update this to force refresh
    
    if (!localStorage.getItem('menuItems') || storedVersion !== currentVersion) {
        localStorage.setItem('menuItems', JSON.stringify(defaultMenuItems));
        localStorage.setItem('menuVersion', currentVersion);
    }
}

// Get menu items (from Firebase or localStorage)
function getMenuItems() {
    initializeMenu();
    return JSON.parse(localStorage.getItem('menuItems')) || [];
}

// Get menu items async from Firebase
async function getMenuItemsAsync() {
    if (window.FireDB) {
        try {
            const items = await FireDB.getMenuItems();
            localStorage.setItem('menuItems', JSON.stringify(items));
            return items;
        } catch (e) {
            return getMenuItems();
        }
    }
    return getMenuItems();
}

// Save menu items (to both Firebase and localStorage)
function saveMenuItems(items) {
    localStorage.setItem('menuItems', JSON.stringify(items));
    if (window.FireDB) {
        FireDB.saveAllMenuItems(items);
    }
}

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get sales from localStorage
function getSales() {
    return JSON.parse(localStorage.getItem('sales')) || [];
}

// Get sales async from Firebase
async function getSalesAsync() {
    if (window.FireDB) {
        try {
            const sales = await FireDB.getSales();
            localStorage.setItem('sales', JSON.stringify(sales));
            return sales;
        } catch (e) {
            return getSales();
        }
    }
    return getSales();
}

// Save sales to localStorage and Firebase
function saveSales(sales) {
    localStorage.setItem('sales', JSON.stringify(sales));
}

// Add a single sale to Firebase
async function addSaleToFirebase(sale) {
    if (window.FireDB) {
        await FireDB.addSale(sale);
    }
}

// Generate unique ID
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Generate bill number
function generateBillNo() {
    const sales = getSales();
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    const todaySales = sales.filter(s => s.billNo.startsWith(`MH${dateStr}`));
    const num = (todaySales.length + 1).toString().padStart(4, '0');
    return `MH${dateStr}${num}`;
}

// Show toast notification
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.remove('error');
        if (isError) {
            toast.classList.add('error');
        }
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Format currency
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

// Cart functionality
let cart = getCart();

// Add item to cart
function addToCart(itemId) {
    const menuItems = getMenuItems();
    const item = menuItems.find(i => i.id === itemId);
    
    if (!item) return;
    
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartDisplay();
    showToast(`${item.name} (${item.size}) added to cart`);
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    saveCart(cart);
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart(cart);
            updateCartDisplay();
        }
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart(cart);
    updateCartDisplay();
    showToast('Cart cleared');
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name} (${item.size})</h4>
                    <span class="cart-item-price">${formatCurrency(item.price)} × ${item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="decrease-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('');
    }
    
    cartTotalElement.textContent = formatCurrency(getCartTotal());
}

// Render menu items
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    const menuItems = getMenuItems();
    
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-item" onclick="addToCart(${item.id})">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'">
            <div class="menu-item-info">
                <h3>${item.name}</h3>
                <p class="size">${item.size}</p>
                <p class="price">${formatCurrency(item.price)}</p>
            </div>
        </div>
    `).join('');
}

// Print bill
function printBill() {
    if (cart.length === 0) {
        showToast('Cart is empty!', true);
        return;
    }
    
    const billNo = generateBillNo();
    const now = new Date();
    const date = now.toLocaleDateString('en-IN');
    const time = now.toLocaleTimeString('en-IN');
    
    // Update print template
    document.getElementById('billNo').textContent = billNo;
    document.getElementById('billDate').textContent = date;
    document.getElementById('billTime').textContent = time;
    
    document.getElementById('billItems').innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${cart.map(item => `
                    <tr>
                        <td>${item.name} (${item.size})</td>
                        <td>${item.quantity}</td>
                        <td>${formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('billTotal').textContent = formatCurrency(getCartTotal());
    
    // Print
    window.print();
}

// Show payment modal (choose method)
function showPaymentModal() {
    if (cart.length === 0) {
        showToast('Cart is empty!', true);
        return;
    }
    
    const modal = document.getElementById('paymentModal');
    const paymentAmount = document.getElementById('paymentAmount');
    
    if (!modal || !paymentAmount) return;
    
    const total = getCartTotal();
    paymentAmount.textContent = formatCurrency(total);
    
    modal.classList.add('active');
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Show QR payment modal
function showQrPaymentModal() {
    closePaymentModal();
    
    const modal = document.getElementById('qrPaymentModal');
    const qrPaymentAmount = document.getElementById('qrPaymentAmount');
    
    if (!modal || !qrPaymentAmount) return;
    
    const total = getCartTotal();
    qrPaymentAmount.textContent = formatCurrency(total);
    
    modal.classList.add('active');
}

// Close QR payment modal
function closeQrPaymentModal() {
    const modal = document.getElementById('qrPaymentModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Show cash payment modal
function showCashPaymentModal() {
    closePaymentModal();
    
    const modal = document.getElementById('cashPaymentModal');
    const cashPaymentAmount = document.getElementById('cashPaymentAmount');
    
    if (!modal || !cashPaymentAmount) return;
    
    const total = getCartTotal();
    cashPaymentAmount.textContent = formatCurrency(total);
    
    modal.classList.add('active');
}

// Close cash payment modal
function closeCashPaymentModal() {
    const modal = document.getElementById('cashPaymentModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Confirm payment and save sale
function confirmPayment(method) {
    const billNo = generateBillNo();
    const now = new Date();
    
    const sale = {
        billNo: billNo,
        date: now.toISOString(),
        items: [...cart],
        total: getCartTotal(),
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        paymentMethod: method || 'cash'
    };
    
    const sales = getSales();
    sales.push(sale);
    saveSales(sales);
    
    // Save to Firebase
    addSaleToFirebase(sale);
    
    // Clear cart
    clearCart();
    closeQrPaymentModal();
    closeCashPaymentModal();
    closePaymentModal();
    
    showToast(`Payment successful! Bill No: ${billNo}`);
}

// Initialize page
function initializePage() {
    // Initialize menu
    initializeMenu();
    
    // Render menu if on order page
    if (document.getElementById('menuGrid')) {
        renderMenu();
        updateCartDisplay();
    }
    
    // Event listeners
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    const printBillBtn = document.getElementById('printBillBtn');
    if (printBillBtn) {
        printBillBtn.addEventListener('click', printBill);
    }
    
    const payNowBtn = document.getElementById('payNowBtn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', showPaymentModal);
    }
    
    const closePaymentModalBtn = document.getElementById('closePaymentModal');
    if (closePaymentModalBtn) {
        closePaymentModalBtn.addEventListener('click', closePaymentModal);
    }
    
    // Payment option buttons
    const cashOptionBtn = document.getElementById('cashOptionBtn');
    if (cashOptionBtn) {
        cashOptionBtn.addEventListener('click', showCashPaymentModal);
    }
    
    const qrOptionBtn = document.getElementById('qrOptionBtn');
    if (qrOptionBtn) {
        qrOptionBtn.addEventListener('click', showQrPaymentModal);
    }
    
    // QR Payment modal
    const closeQrModalBtn = document.getElementById('closeQrModal');
    if (closeQrModalBtn) {
        closeQrModalBtn.addEventListener('click', closeQrPaymentModal);
    }
    
    const confirmQrPaymentBtn = document.getElementById('confirmQrPaymentBtn');
    if (confirmQrPaymentBtn) {
        confirmQrPaymentBtn.addEventListener('click', () => confirmPayment('upi'));
    }
    
    // Cash Payment modal
    const closeCashModalBtn = document.getElementById('closeCashModal');
    if (closeCashModalBtn) {
        closeCashModalBtn.addEventListener('click', closeCashPaymentModal);
    }
    
    const confirmCashPaymentBtn = document.getElementById('confirmCashPaymentBtn');
    if (confirmCashPaymentBtn) {
        confirmCashPaymentBtn.addEventListener('click', () => confirmPayment('cash'));
    }
    
    // Close modals on outside click
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                closePaymentModal();
            }
        });
    }
    
    const qrPaymentModal = document.getElementById('qrPaymentModal');
    if (qrPaymentModal) {
        qrPaymentModal.addEventListener('click', (e) => {
            if (e.target === qrPaymentModal) {
                closeQrPaymentModal();
            }
        });
    }
    
    const cashPaymentModal = document.getElementById('cashPaymentModal');
    if (cashPaymentModal) {
        cashPaymentModal.addEventListener('click', (e) => {
            if (e.target === cashPaymentModal) {
                closeCashPaymentModal();
            }
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializePage);

// Export functions for use in other scripts
window.MandiApp = {
    getMenuItems,
    saveMenuItems,
    getSales,
    saveSales,
    showToast,
    formatCurrency,
    generateId
};
