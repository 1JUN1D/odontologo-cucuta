// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});

// Smooth scroll for anchor links
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

// Enhanced WhatsApp Click Tracking
function trackWhatsAppClick(buttonId) {
    try {
        // Google Ads Conversion Tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-17854498384/CcybCOjBo90bENCM2MFC',
                'event_callback': function() {
                    console.log('✅ Conversión registrada: ' + buttonId);
                }
            });
            
            // Google Analytics 4 Event
            gtag('event', 'generate_lead', {
                'event_category': 'WhatsApp',
                'event_label': buttonId,
                'value': 1,
                'currency': 'COP'
            });
        }
    } catch (error) {
        console.error('Error en tracking:', error);
    }
}

// Track WhatsApp floating button clicks
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    
    whatsappButtons.forEach((button, index) => {
        // Solo agregar listener si NO tiene onclick definido
        if (!button.hasAttribute('onclick')) {
            button.addEventListener('click', function(e) {
                const buttonId = this.id || 'whatsapp-button-' + (index + 1);
                trackWhatsAppClick(buttonId);
            });
        }
    });
});

// Form submission handler
function sendWhatsAppMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    const whatsappMessage = `Hola, soy ${name}. Mi teléfono es ${phone}. ${message}`;
    const whatsappURL = `https://wa.me/573222363192?text=${encodeURIComponent(whatsappMessage)}`;
    
    trackWhatsAppClick('contact-form');
    
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 300);
}