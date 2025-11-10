// ========================================
// GLOBAL VARIABLES
// ========================================
let cart = [];
let currentFilter = 'all';

// Products Database
const products = [
    {
        id: 1,
        name: 'Blusa Elegante Seda',
        category: 'formal',
        price: 89000,
        originalPrice: 120000,
        icon: '👗',
        badge: 'Nuevo',
        rating: 5,
        reviews: 24,
        description: 'Blusa de seda de alta calidad, perfecta para eventos formales'
    },
    {
        id: 2,
        name: 'Vestido Casual Verano',
        category: 'casual',
        price: 125000,
        originalPrice: 160000,
        icon: '👚',
        badge: 'Popular',
        rating: 5,
        reviews: 45,
        description: 'Vestido fresco y cómodo, ideal para el día a día'
    },
    {
        id: 3,
        name: 'Conjunto Deportivo Premium',
        category: 'deportiva',
        price: 98000,
        originalPrice: null,
        icon: '🏃‍♀️',
        badge: null,
        rating: 5,
        reviews: 32,
        description: 'Conjunto deportivo de alta tecnología para tu rutina'
    },
    {
        id: 4,
        name: 'Pantalón Formal Ejecutivo',
        category: 'formal',
        price: 115000,
        originalPrice: 145000,
        icon: '👖',
        badge: null,
        rating: 5,
        reviews: 18,
        description: 'Pantalón de corte perfecto para look profesional'
    },
    {
        id: 5,
        name: 'Camiseta Casual Básica',
        category: 'casual',
        price: 45000,
        originalPrice: 60000,
        icon: '👕',
        badge: 'Oferta',
        rating: 4,
        reviews: 67,
        description: 'Camiseta versátil para cualquier ocasión'
    },
    {
        id: 6,
        name: 'Leggings Deportivos',
        category: 'deportiva',
        price: 55000,
        originalPrice: null,
        icon: '🧘‍♀️',
        badge: null,
        rating: 5,
        reviews: 41,
        description: 'Leggings con tecnología de compresión'
    },
    {
        id: 7,
        name: 'Blazer Ejecutivo Premium',
        category: 'formal',
        price: 185000,
        originalPrice: 230000,
        icon: '🧥',
        badge: 'Nuevo',
        rating: 5,
        reviews: 15,
        description: 'Blazer de corte impecable para ocasiones especiales'
    },
    {
        id: 8,
        name: 'Falda Casual Midi',
        category: 'casual',
        price: 72000,
        originalPrice: null,
        icon: '👗',
        badge: null,
        rating: 4,
        reviews: 28,
        description: 'Falda midi elegante y cómoda'
    },
    {
        id: 9,
        name: 'Top Deportivo Cruzado',
        category: 'deportiva',
        price: 48000,
        originalPrice: null,
        icon: '💪',
        badge: 'Popular',
        rating: 5,
        reviews: 53,
        description: 'Top con soporte ideal para entrenamientos intensos'
    },
    {
        id: 10,
        name: 'Vestido de Noche Elegante',
        category: 'formal',
        price: 220000,
        originalPrice: 280000,
        icon: '✨',
        badge: 'Nuevo',
        rating: 5,
        reviews: 12,
        description: 'Vestido deslumbrante para eventos nocturnos'
    },
    {
        id: 11,
        name: 'Jean Clásico Ajustado',
        category: 'casual',
        price: 95000,
        originalPrice: 120000,
        icon: '👖',
        badge: null,
        rating: 5,
        reviews: 89,
        description: 'Jean de mezclilla premium con ajuste perfecto'
    },
    {
        id: 12,
        name: 'Chaqueta Deportiva Térmica',
        category: 'deportiva',
        price: 135000,
        originalPrice: null,
        icon: '🧥',
        badge: null,
        rating: 4,
        reviews: 22,
        description: 'Chaqueta térmica para entrenamientos al aire libre'
    }
];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Hide Loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);

    // Load Products
    displayProducts('all');

    // Setup Event Listeners
    setupEventListeners();

    // Navbar Scroll Effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Load Cart from LocalStorage (if available)
    loadCartFromStorage();
});

// ========================================
// EVENT LISTENERS SETUP
// ========================================
function setupEventListeners() {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Nav Links Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);

            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ========================================
// PRODUCTS DISPLAY
// ========================================
function displayProducts(filter) {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = filter === 'all' || filter === 'nuevos' 
        ? products 
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-aos="fade-up" data-category="${product.category}">
            <div class="product-image">
                ${product.icon}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-actions-overlay">
                    <button class="action-btn" onclick="quickView(${product.id})" title="Vista rápida">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="addToWishlist(${product.id})" title="Agregar a favoritos">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toLocaleString('es-CO')}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toLocaleString('es-CO')}</span>` : ''}
                </div>
                <div class="product-buttons">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Agregar</span>
                    </button>
                    <button class="btn-whatsapp" onclick="consultWhatsApp('${product.name}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Re-initialize AOS for new elements
    AOS.refresh();
}

// ========================================
// FILTER PRODUCTS
// ========================================
function filterProducts(category) {
    currentFilter = category;
    
    if (category === 'nuevos') {
        // Show only products with "Nuevo" badge
        const newProducts = products.filter(p => p.badge === 'Nuevo');
        displayFilteredProducts(newProducts);
    } else {
        displayProducts(category);
    }

    // Scroll to products section
    document.getElementById('coleccion').scrollIntoView({ behavior: 'smooth' });
}

function displayFilteredProducts(filteredProducts) {
    const grid = document.getElementById('productsGrid');
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-aos="fade-up" data-category="${product.category}">
            <div class="product-image">
                ${product.icon}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-actions-overlay">
                    <button class="action-btn" onclick="quickView(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="addToWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toLocaleString('es-CO')}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toLocaleString('es-CO')}</span>` : ''}
                </div>
                <div class="product-buttons">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Agregar</span>
                    </button>
                    <button class="btn-whatsapp" onclick="consultWhatsApp('${product.name}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    AOS.refresh();
}

// ========================================
// CART FUNCTIONS
// ========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    saveCartToStorage();
    showNotification('Producto agregado al carrito', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
    showNotification('Producto eliminado del carrito', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
        saveCartToStorage();
    }
}

function updateCart() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos para empezar a comprar</p>
            </div>
        `;
        cartTotal.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${item.icon}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString('es-CO')}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString('es-CO');
    }
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }

    // Create WhatsApp message
    let message = '¡Hola! Me gustaría realizar un pedido:%0A%0A';
    
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}%0A`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0ATotal: $${total.toLocaleString('es-CO')}`;

    // Open WhatsApp
    window.open(`https://wa.me/573001234567?text=${message}`, '_blank');
}

// ========================================
// STORAGE FUNCTIONS
// ========================================
function saveCartToStorage() {
    try {
        // Using in-memory storage only as per requirements
        // No localStorage/sessionStorage
    } catch (error) {
        console.log('Storage not available');
    }
}

function loadCartFromStorage() {
    try {
        // Using in-memory storage only
        updateCart();
    } catch (error) {
        console.log('Storage not available');
    }
}

// ========================================
// WHATSAPP FUNCTIONS
// ========================================
function openWhatsApp() {
    const message = '¡Hola! Me gustaría obtener más información sobre sus productos.';
    window.open(`https://wa.me/573001234567?text=${encodeURIComponent(message)}`, '_blank');
}

function consultWhatsApp(productName) {
    const message = `Hola, estoy interesada en: ${productName}. ¿Podrían darme más información?`;
    window.open(`https://wa.me/573001234567?text=${encodeURIComponent(message)}`, '_blank');
}

// ========================================
// QUICK VIEW MODAL
// ========================================
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');

    content.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; padding: 3rem;">
            <div style="display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #FAF8F3 0%, #F5F5F5 100%); border-radius: 20px; height: 500px; font-size: 10rem;">
                ${product.icon}
            </div>
            <div>
                <span style="color: var(--gold-primary); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">${product.category}</span>
                <h2 style="font-family: var(--font-heading); font-size: 2.5rem; margin: 1rem 0;">${product.name}</h2>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="color: var(--gold-primary);">
                        ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                    </div>
                    <span style="color: var(--gray-medium);">(${product.reviews} reseñas)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <span style="font-size: 2.5rem; font-weight: 700; color: var(--gold-primary);">$${product.price.toLocaleString('es-CO')}</span>
                    ${product.originalPrice ? `<span style="font-size: 1.5rem; color: var(--gray-medium); text-decoration: line-through;">$${product.originalPrice.toLocaleString('es-CO')}</span>` : ''}
                </div>
                <p style="color: var(--gray-medium); line-height: 1.8; margin-bottom: 2rem;">${product.description}</p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary btn-large" onclick="addToCart(${product.id}); closeQuickView();" style="flex: 1;">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Agregar al Carrito</span>
                    </button>
                    <button class="btn btn-outline" onclick="consultWhatsApp('${product.name}')" style="padding: 1.2rem;">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

// ========================================
// WISHLIST FUNCTION
// ========================================
function addToWishlist(productId) {
    showNotification('Producto agregado a favoritos', 'success');
}

// ========================================
// LOAD MORE PRODUCTS
// ========================================
function loadMoreProducts() {
    showNotification('Cargando más productos...', 'info');
    // In a real application, this would load more products from the server
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);