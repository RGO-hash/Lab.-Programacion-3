// =============================================================================
// BANCO SUAREZ WEBSITE - JAVASCRIPT PRINCIPAL
// =============================================================================

// Variables globales
let currentContent = 'conoce-mas';
let isMenuOpen = false;

// =============================================================================
// FUNCIONES PRINCIPALES DE NAVEGACIÓN
// =============================================================================

/**
 * Función principal para mostrar contenido dinámico
 * @param {string} contentId - ID del contenido a mostrar
 */
function showContent(contentId) {
    // Ocultar todas las secciones de contenido
    const contentSections = document.querySelectorAll('.content-display');
    contentSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    // Mostrar el contenido seleccionado
    const targetContent = document.getElementById(`content-${contentId}`);
    if (targetContent) {
        targetContent.style.display = 'block';
        setTimeout(() => {
            targetContent.classList.add('active');
        }, 10);
        
        // Scroll suave hacia el contenido
        targetContent.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });

        // Actualizar contenido actual
        currentContent = contentId;
        
        // Guardar preferencia del usuario
        saveUserPreference('lastContent', contentId);
        
        // Tracking de analytics
        trackEvent('Content', 'View', contentId);
    }

    // Cerrar menú móvil si está abierto
    closeMobileMenu();
}

/**
 * Toggle del menú móvil
 */
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu) {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = '#1e3c72';
            navMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            mobileMenuBtn.innerHTML = '✕';
        } else {
            navMenu.style.display = 'none';
            mobileMenuBtn.innerHTML = '☰';
        }
    }
}

/**
 * Cerrar menú móvil
 */
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (isMenuOpen && navMenu && mobileMenuBtn) {
        navMenu.style.display = 'none';
        mobileMenuBtn.innerHTML = '☰';
        isMenuOpen = false;
    }
}

// =============================================================================
// FUNCIONES DE INICIALIZACIÓN
// =============================================================================

/**
 * Inicializar la aplicación cuando el DOM está listo
 */
function initializeApp() {
    console.log('🏦 Inicializando Banco Suarez Website...');
    
    // Mostrar contenido por defecto
    const savedContent = getUserPreference('lastContent') || 'conoce-mas';
    showContent(savedContent);
    
    // Configurar menú móvil
    setupMobileMenu();
    
    // Configurar animaciones de scroll
    setupScrollAnimations();
    
    // Configurar smooth scrolling
    setupSmoothScrolling();
    
    // Configurar tracking de eventos
    setupEventTracking();
    
    // Configurar loading animation
    setupLoadingAnimation();
    
    console.log('✅ Banco Suarez Website inicializado correctamente');
}

/**
 * Configurar menú móvil
 */
function setupMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    
    // Crear botón de menú móvil si no existe
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.onclick = toggleMobileMenu;
        
        // Estilos del botón móvil
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background 0.3s ease;
        `;
        
        navContainer.appendChild(mobileMenuBtn);
    }
    
    // Mostrar/ocultar botón según tamaño de pantalla
    function handleResize() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            if (!isMenuOpen) {
                navMenu.style.display = 'none';
            }
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.position = 'static';
            navMenu.style.flexDirection = 'row';
            navMenu.style.backgroundColor = 'transparent';
            navMenu.style.boxShadow = 'none';
            isMenuOpen = false;
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar inmediatamente
}

/**
 * Configurar animaciones de scroll
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos a animar
    const elementsToAnimate = document.querySelectorAll('.service-card, .content-display');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Configurar smooth scrolling para enlaces anchor
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Configurar tracking de eventos
 */
function setupEventTracking() {
    // Tracking de navegación
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const text = this.textContent.trim();
            trackEvent('Navigation', 'Click', text);
        });
    });
    
    // Tracking de botones CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('CTA', 'Click', 'Conoce Más');
        });
    });
    
    // Tracking de service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            trackEvent('Service', 'Click', title);
        });
    });
}

/**
 * Configurar animación de carga
 */
function setupLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            
            // Agregar clase loaded para animaciones adicionales
            document.body.classList.add('loaded');
        }, 100);
    });
}

// =============================================================================
// FUNCIONES AUXILIARES
// =============================================================================

/**
 * Función de tracking de eventos (preparada para Analytics)
 * @param {string} category - Categoría del evento
 * @param {string} action - Acción del evento
 * @param {string} label - Etiqueta del evento
 */
function trackEvent(category, action, label) {
    console.log(`📊 Event tracked: ${category} - ${action} - ${label}`);
    
    // Integración con Google Analytics (descomenta si usas GA)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
    
    // Integración con Facebook Pixel (descomenta si usas FB)
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'ViewContent', {
    //         content_category: category,
    //         content_name: label
    //     });
    // }
}

/**
 * Guardar preferencias del usuario en localStorage
 * @param {string} key - Clave de la preferencia
 * @param {any} value - Valor a guardar
 */
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`bancosuarez_${key}`, JSON.stringify(value));
    } catch (e) {
        console.warn('Local storage not available:', e);
    }
}

/**
 * Obtener preferencias del usuario desde localStorage
 * @param {string} key - Clave de la preferencia
 * @returns {any} - Valor guardado o null
 */
function getUserPreference(key) {
    try {
        const item = localStorage.getItem(`bancosuarez_${key}`);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.warn('Local storage not available:', e);
        return null;
    }
}

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validar teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - True si es válido
 */
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

/**
 * Formatear moneda dominicana
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP'
    }).format(amount);
}

/**
 * Función debounce para optimizar eventos
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Buscar contenido en el sitio
 * @param {string} query - Término de búsqueda
 * @returns {Array} - Array de IDs de contenido que coinciden
 */
function searchContent(query) {
    const contentSections = document.querySelectorAll('.content-display');
    const results = [];
    
    contentSections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push(section.id.replace('content-', ''));
        }
    });
    
    return results;
}

/**
 * Mostrar notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: success, error, info
 */
function showToast(message, type = 'info') {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Estilos del toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ECDC4' : type === 'error' ? '#FF6B6B' : '#2a5298'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// =============================================================================
// FUNCIONES DE PERFORMANCE Y SEO
// =============================================================================

/**
 * Lazy loading de imágenes
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Service Worker para PWA (si se implementa)
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// =============================================================================
// EVENT LISTENERS PRINCIPALES
// =============================================================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error global capturado:', e.error);
    trackEvent('Error', 'JavaScript', e.error.message);
});

// Manejo de clicks fuera del menú móvil
document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (isMenuOpen && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Manejo de tecla ESC para cerrar menú
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
    }
});

// =============================================================================
// FUNCIONES ADICIONALES PARA FUTURAS MEJORAS
// =============================================================================

/**
 * Función para futuro formulario de contacto
 */
function handleContactForm(formData) {
    // Validaciones
    if (!validateEmail(formData.email)) {
        showToast('Email inválido', 'error');
        return false;
    }
    
    if (!validatePhone(formData.phone)) {
        showToast('Teléfono inválido', 'error');
        return false;
    }
    
    // Simular envío
    showToast('Mensaje enviado correctamente', 'success');
    trackEvent('Form', 'Submit', 'Contact');
    
    return true;
}

/**
 * Calculadora de préstamos (función base)
 */
function calculateLoan(amount, rate, years) {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    return {
        monthlyPayment: monthlyPayment,
        totalPayment: monthlyPayment * months,
        totalInterest: (monthlyPayment * months) - amount
    };
}

/**
 * Toggle tema oscuro/claro (para futura implementación)
 */
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        saveUserPreference('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        saveUserPreference('theme', 'dark');
    }
    
    trackEvent('Theme', 'Toggle', isDark ? 'Light' : 'Dark');
}

// Aplicar tema guardado
function applyTheme() {
    const savedTheme = getUserPreference('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// =============================================================================
// EXPORT PARA TESTING (si se implementan pruebas)
// =============================================================================

// Si estamos en entorno de testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showContent,
        validateEmail,
        validatePhone,
        formatCurrency,
        calculateLoan,
        searchContent
    };
}

// =============================================================================
// INICIALIZACIÓN FINAL
// =============================================================================

console.log('💳 Banco Suarez Website JavaScript cargado correctamente');
console.log('🔧 Versión: 1.0.0');
console.log('📅 Última actualización:', new Date().toLocaleDateString());