// Animation utility classes and hooks

// Scroll-triggered animation observer
export const setupScrollAnimations = () => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with 'reveal' class
    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    return () => observer.disconnect();
};

// Confetti animation (for success messages)
export const triggerConfetti = () => {
    if (typeof window === 'undefined') return;

    const colors = ['#C41E3A', '#FFD700', '#0F5132', '#FFFFFF'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background-color: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      opacity: ${Math.random()};
      animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
      z-index: 10000;
    `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
};

// Add keyframes for confetti if not exists
export const addConfettiStyles = () => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('confetti-styles')) return;

    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
    @keyframes confetti-fall {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    .animate-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `;
    document.head.appendChild(style);
};

// Smooth scroll to element
export const smoothScrollTo = (elementId: string) => {
    if (typeof window === 'undefined') return;

    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Toast notification animation
export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (typeof window === 'undefined') return;

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };

    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`;
    toast.textContent = message;
    toast.style.animation = 'slideInRight 0.3s ease-out';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Add toast animation styles
export const addToastStyles = () => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('toast-styles')) return;

    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);
};

// Initialize all animation styles
export const initializeAnimations = () => {
    addConfettiStyles();
    addToastStyles();
    setupScrollAnimations();
};
