// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
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

// Track WhatsApp clicks for Google Ads conversion
function trackWhatsAppClick(buttonId) {
    // Google Ads Conversion Tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-17854498384/CcybCOjBo90bENCM2MFC',
            'event_callback': function() {
                console.log('Conversion tracked: WhatsApp click from ' + buttonId);
            }
        });
    }
    
    // Google Analytics Event Tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'WhatsApp',
            'event_label': buttonId,
            'value': 1
        });
    }
}

// Add tracking to all WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    
    whatsappButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const buttonId = this.id || 'whatsapp-button-' + (index + 1);
            trackWhatsAppClick(buttonId);
        });
    });
});

// Form submission handler (if you add forms later)
function sendWhatsAppMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    const whatsappMessage = `Hola, soy ${name}. Mi teléfono es ${phone}. ${message}`;
    const whatsappURL = `https://wa.me/573222363192?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Track conversion before redirect
    trackWhatsAppClick('contact-form');
    
    // Small delay to ensure tracking fires
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 300);
}