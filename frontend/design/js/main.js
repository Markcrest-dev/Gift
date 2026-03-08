// ==========================================
// GLOBAL GIFT EXCHANGE - MAIN JAVASCRIPT
// Core functionality and utilities
// ==========================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (mobileMenuToggle && navMenu && mobileOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileOverlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Dashboard Sidebar Toggle for Mobile
    const mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
    const sidebar = document.getElementById('sidebar');

    if (mobileSidebarBtn && sidebar) {
        const overlay = document.getElementById('mobileOverlay') || createOverlay();

        mobileSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });

        // Close sidebar when clicking on a link (for better UX)
        const sidebarLinks = sidebar.querySelectorAll('.sidebar-menu-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                }
            });
        });
    }

    // Helper function to create overlay if it doesn't exist
    function createOverlay() {
        let overlay = document.querySelector('.mobile-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-overlay';
            overlay.id = 'mobileOverlay';
            document.body.appendChild(overlay);
        }
        return overlay;
    }

    // Christmas Countdown Timer
    const countdown = document.getElementById('christmasCountdown');
    if (countdown) {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        function updateCountdown() {
            const now = new Date();
            const currentYear = now.getFullYear();
            const christmas = new Date(currentYear, 11, 25); // December 25

            // If Christmas has passed this year, count to next year
            if (now > christmas) {
                christmas.setFullYear(currentYear + 1);
            }

            const difference = christmas - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Show Toast Notification
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';

    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';

    toast.innerHTML = `
    <span style="font-size: 1.5rem;">${icon}</span>
    <span>${message}</span>
  `;

    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show Loading Spinner
function showLoading(target) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'loading-spinner';

    if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) element.appendChild(spinner);
    } else if (target instanceof HTMLElement) {
        target.appendChild(spinner);
    } else {
        document.body.appendChild(spinner);
    }

    return spinner;
}

// Hide Loading Spinner
function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.remove();
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password);
}

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { score: 'weak', color: '#C41E3A' };
    if (strength <= 4) return { score: 'medium', color: '#D4AF37' };
    return { score: 'strong', color: '#0F5132' };
}

// Local Storage Helpers
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// Check if user is logged in
function isLoggedIn() {
    return Storage.get('user') !== null;
}

// Get current user
function getCurrentUser() {
    return Storage.get('user');
}

// Logout function
function logout() {
    Storage.remove('user');
    Storage.remove('authToken');
    window.location.href = 'index.html';
}

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Debounce function for search
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

// Update navigation for logged in users
function updateNavigation() {
    const user = getCurrentUser();
    const navActions = document.querySelector('.navbar-actions');

    if (user && navActions) {
        navActions.innerHTML = `
      <a href="dashboard.html" class="btn btn-outline">Dashboard</a>
      <button onclick="logout()" class="btn btn-primary">Logout</button>
    `;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});

// Export functions for use in other scripts
window.GiftExchange = {
    showToast,
    showLoading,
    hideLoading,
    validateEmail,
    validatePassword,
    getPasswordStrength,
    Storage,
    isLoggedIn,
    getCurrentUser,
    logout,
    formatCurrency,
    formatDate,
    debounce,
    updateNavigation,

    // ==========================================
    // ADVANCED FEATURES
    // ==========================================

    // Social sharing
    shareGift(gift, platform) {
        const url = `${window.location.origin}/gift-detail.html?id=${gift.id}`;
        const text = `Check out this amazing gift: ${gift.name}!`;

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
            email: `mailto:?subject=${encodeURIComponent('Gift Recommendation')}&body=${encodeURIComponent(text + '\n\n' + url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
            this.showToast(`Sharing via ${platform}!`, 'success');
        }
    },

    // Copy gift link to clipboard
    copyGiftLink(gift) {
        const url = `${window.location.origin}/gift-detail.html?id=${gift.id}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('Gift link copied to clipboard!', 'success');
            }).catch(() => {
                this.showToast('Failed to copy link', 'error');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showToast('Gift link copied to clipboard!', 'success');
            } catch (err) {
                this.showToast('Failed to copy link', 'error');
            }
            document.body.removeChild(textArea);
        }
    },

    // Email notification simulation
    sendNotificationEmail(type, data) {
        // Simulate email sending
        const notifications = this.Storage.get('notifications') || [];

        const notification = {
            id: Date.now(),
            type: type,
            data: data,
            sentAt: new Date().toISOString(),
            read: false
        };

        notifications.push(notification);
        this.Storage.set('notifications', notifications);

        // Create email templates
        const templates = {
            'gift-sent': {
                subject: `Gift Sent Successfully! 🎁`,
                message: `Your gift "${data.giftName}" has been sent to ${data.recipientName}.`
            },
            'gift-received': {
                subject: `You've Received a Gift! 🎉`,
                message: `${data.senderName} sent you ${data.giftName}. Claim it now!`
            },
            'gift-claimed': {
                subject: `Gift Claimed Successfully! ✅`,
                message: `Your gift has been claimed and will be processed shortly.`
            },
            'welcome': {
                subject: `Welcome to Global Gift Exchange! 🎄`,
                message: `Thank you for joining us! Start spreading joy by sending gifts.`
            }
        };

        const template = templates[type];

        if (template) {
            console.log(`📧 EMAIL SENT: ${template.subject}`);
            console.log(`📧 MESSAGE: ${template.message}`);

            // Show toast notification
            this.showToast(`Email notification sent: ${template.subject}`, 'success');
        }

        return notification;
    },

    // Get unread notifications count
    getUnreadNotificationsCount() {
        const notifications = this.Storage.get('notifications') || [];
        return notifications.filter(n => !n.read).length;
    },

    // Mark notification as read
    markNotificationRead(notificationId) {
        const notifications = this.Storage.get('notifications') || [];
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.Storage.set('notifications', notifications);
        }
    },

    // Gift recommendations based on browsing history
    getRecommendations(currentGift, allGifts, limit = 4) {
        // Get browsing history
        let viewedGifts = this.Storage.get('viewedGifts') || [];

        // Add current gift to history if not already there
        if (currentGift && !viewedGifts.includes(currentGift.id)) {
            viewedGifts.push(currentGift.id);
            // Keep only last 10 viewed gifts
            if (viewedGifts.length > 10) {
                viewedGifts = viewedGifts.slice(-10);
            }
            this.Storage.set('viewedGifts', viewedGifts);
        }

        if (!currentGift) {
            // If no current gift, recommend popular items
            return allGifts
                .sort((a, b) => b.rating - a.rating)
                .slice(0, limit);
        }

        // Recommend based on category and price range
        const priceRange = currentGift.price * 0.3; // ±30%

        const recommendations = allGifts
            .filter(gift => {
                // Exclude current gift
                if (gift.id === currentGift.id) return false;

                // Same category gets priority
                const sameCategory = gift.category === currentGift.category;

                // Similar price range
                const similarPrice = Math.abs(gift.price - currentGift.price) <= priceRange;

                // Same gender suitability
                const sameGender = gift.gender.some(g => currentGift.gender.includes(g));

                return sameCategory || similarPrice || sameGender;
            })
            .sort((a, b) => {
                // Prioritize same category
                if (a.category === currentGift.category && b.category !== currentGift.category) return -1;
                if (b.category === currentGift.category && a.category !== currentGift.category) return 1;

                // Then by rating
                return b.rating - a.rating;
            })
            .slice(0, limit);

        return recommendations;
    }
};
