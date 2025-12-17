// ==========================================
// GLOBAL GIFT EXCHANGE - ANIMATIONS
// Scroll-based animations and effects
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // PARALLAX SCROLLING
    // ==========================================

    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // ==========================================
    // GIFT CARD HOVER EFFECTS
    // ==========================================

    const giftCards = document.querySelectorAll('.gift-card');

    giftCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ==========================================
    // FLOATING ANIMATION FOR ICONS
    // ==========================================

    const floatingElements = document.querySelectorAll('.step-icon, .feature-icon');

    floatingElements.forEach((element, index) => {
        element.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });

    // ==========================================
    // SHIMMER EFFECT ON BUTTONS
    // ==========================================

    const buttons = document.querySelectorAll('.btn-primary, .btn-gold');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.classList.add('shimmer');
        });

        button.addEventListener('mouseleave', function () {
            this.classList.remove('shimmer');
        });
    });

    // ==========================================
    // LOADING ANIMATION FOR IMAGES
    // ==========================================

    const images = document.querySelectorAll('img');

    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';

            img.addEventListener('load', function () {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            });
        }
    });

    // ==========================================
    // STAGGER ANIMATION FOR LISTS
    // ==========================================

    function staggerAnimation(selector, animationClass, delay = 100) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }

    // Apply stagger animations
    setTimeout(() => {
        staggerAnimation('.featured-gifts-grid .gift-card', 'fade-in-up', 150);
        staggerAnimation('.features-grid .feature-card', 'fade-in-up', 150);
    }, 100);

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = 'var(--shadow-lg)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // CONFETTI EFFECT (for success pages)
    // ==========================================

    window.confetti = function () {
        const colors = ['#C41E3A', '#0F5132', '#D4AF37', '#FF6B7A', '#4ADE80'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    };

    // ==========================================
    // SMOOTH SCROLL TO TOP
    // ==========================================

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--ruby-red);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-xl);
  `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });

    // ==========================================
    // PAGE TRANSITION
    // ==========================================

    document.body.classList.add('page-transition');

    // ==========================================
    // INTERSECTION OBSERVER FOR COUNTING STATS
    // ==========================================

    const statNumbers = document.querySelectorAll('.stat-number');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');

                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, 30);

                target.dataset.counted = 'true';
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        countObserver.observe(stat);
    });
});

// Export animation functions
window.GiftExchangeAnimations = {
    confetti: window.confetti
};
