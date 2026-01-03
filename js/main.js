document.addEventListener('DOMContentLoaded', function() {
    // Load navbar and footer
    loadInclude('navbar-placeholder', 'includes/nav.html');
    loadInclude('footer-placeholder', 'includes/footer.html');

    // Mobile menu toggle
    setTimeout(() => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }, 100);

    // Mixed Media Carousel (videos + images)
    const mediaItems = [
        { type: 'video', src: 'assets/Video1.mp4', alt: 'Consultorio dental moderno' },
        { type: 'video', src: 'assets/Video2.mp4', alt: 'Equipo odontológico' },
        { type: 'image', src: 'assets/i1.jpg' },
        { type: 'image', src: 'assets/i2.jpg' },
        { type: 'image', src: 'assets/i3.jpg' },
    ];

    const carousel = document.getElementById('videoCarousel');
    if (carousel) {
        // Generate carousel items dynamically
        mediaItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'carousel-item';
            itemDiv.dataset.index = index;
            
            if (item.type === 'video') {
                const videoElement = document.createElement('video');
                videoElement.autoplay = true;
                videoElement.muted = true;
                videoElement.loop = true;
                
                const source = document.createElement('source');
                source.src = item.src;
                source.type = 'video/mp4';
                
                videoElement.appendChild(source);
                itemDiv.appendChild(videoElement);
            } else {
                const imgElement = document.createElement('img');
                imgElement.src = item.src;
                imgElement.alt = item.alt;
                itemDiv.appendChild(imgElement);
            }
            
            carousel.appendChild(itemDiv);
        });

        // Carousel functionality
        const carouselItems = document.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        
        function updateCarousel() {
            // Remove all classes first
            carouselItems.forEach(item => {
                item.classList.remove('prev', 'active', 'next');
                item.style.display = 'none';
            });
            
            // Calculate previous and next indices with circular logic
            const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            const nextIndex = (currentIndex + 1) % carouselItems.length;
            
            // Assign corresponding classes
            carouselItems[prevIndex].classList.add('prev');
            carouselItems[currentIndex].classList.add('active');
            carouselItems[nextIndex].classList.add('next');
            
            // Show only the three relevant elements
            carouselItems[prevIndex].style.display = 'block';
            carouselItems[currentIndex].style.display = 'block';
            carouselItems[nextIndex].style.display = 'block';
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                updateCarousel();
            });
        }
        
        // Auto-rotate carousel (every 5 seconds)
        const autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        }, 5000);
        
        // Pause auto-rotation on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        // Initialize carousel
        if (carouselItems.length > 0) {
            updateCarousel();
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Function to load includes
function loadInclude(elementId, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        })
        .catch(error => console.log('Error loading include:', error));
}

// WhatsApp Form Handler
function sendWhatsAppMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const whatsappNumber = "573103851118";
    const whatsappMessage = `Hola, soy ${name}. Mi número de contacto es ${phone}. Mensaje: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    document.getElementById('whatsappForm').reset();
}