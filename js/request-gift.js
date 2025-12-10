// ==========================================
// GLOBAL GIFT EXCHANGE - REQUEST GIFT
// Request gift functionality
// ==========================================

let currentGift = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Load gift from storage
    currentGift = window.GiftExchange.Storage.get('giftToRequest');

    if (!currentGift) {
        window.GiftExchange.showToast('No gift selected', 'error');
        setTimeout(() => {
            window.location.href = 'marketplace.html';
        }, 1500);
        return;
    }

    // Display gift information
    displayGiftInfo();

    // Initialize form
    initializeForm();
});

// ==========================================
// DISPLAY GIFT INFORMATION
// ==========================================

function displayGiftInfo() {
    const giftDisplay = document.getElementById('giftDisplay');

    if (!giftDisplay || !currentGift) return;

    giftDisplay.innerHTML = `
        <img src="${currentGift.image}" alt="${currentGift.name}" class="gift-display-image">
        <div class="gift-display-info">
            <span class="badge badge-red gift-display-category">${currentGift.category}</span>
            <h2 class="gift-display-title">${currentGift.name}</h2>
            <div class="gift-display-price">${window.GiftExchange.formatCurrency(currentGift.price, currentGift.currency)}</div>
            <p class="gift-display-description">${truncateText(currentGift.description, 150)}</p>
        </div>
    `;

    // Update page title
    document.title = `Request ${currentGift.name} - Global Gift Exchange`;
}

// ==========================================
// FORM INITIALIZATION
// ==========================================

function initializeForm() {
    const form = document.getElementById('requestGiftForm');

    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Add input validation
    const nameInput = document.getElementById('requestFromName');
    const emailInput = document.getElementById('requestFromEmail');
    const messageInput = document.getElementById('requestMessage');

    if (nameInput) {
        nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError', 'Name is required'));
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmail(emailInput, 'emailError'));
    }

    if (messageInput) {
        messageInput.addEventListener('blur', () => validateField(messageInput, 'messageError', 'Message is required'));
    }
}

// ==========================================
// FORM VALIDATION
// ==========================================

function validateField(inputElement, errorElementId, errorMessage) {
    const errorElement = document.getElementById(errorElementId);

    if (!inputElement.value.trim()) {
        errorElement.textContent = errorMessage;
        inputElement.classList.add('error');
        return false;
    }

    errorElement.textContent = '';
    inputElement.classList.remove('error');
    return true;
}

function validateEmail(emailInput, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput.value.trim()) {
        errorElement.textContent = 'Email is required';
        emailInput.classList.add('error');
        return false;
    }

    if (!emailRegex.test(emailInput.value)) {
        errorElement.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        return false;
    }

    errorElement.textContent = '';
    emailInput.classList.remove('error');
    return true;
}

function validateForm() {
    const nameInput = document.getElementById('requestFromName');
    const emailInput = document.getElementById('requestFromEmail');
    const messageInput = document.getElementById('requestMessage');

    const isNameValid = validateField(nameInput, 'nameError', 'Name is required');
    const isEmailValid = validateEmail(emailInput, 'emailError');
    const isMessageValid = validateField(messageInput, 'messageError', 'Message is required');

    return isNameValid && isEmailValid && isMessageValid;
}

// ==========================================
// FORM SUBMISSION
// ==========================================

async function handleFormSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
        window.GiftExchange.showToast('Please fill in all required fields correctly', 'error');
        return;
    }

    // Check if user is logged in
    const currentUser = window.GiftExchange.getCurrentUser();
    if (!currentUser) {
        window.GiftExchange.showToast('Please login to request gifts', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    // Get form data
    const fromName = document.getElementById('requestFromName').value.trim();
    const fromEmail = document.getElementById('requestFromEmail').value.trim();
    const occasion = document.getElementById('requestOccasion').value;
    const message = document.getElementById('requestMessage').value.trim();

    // Create request object
    const request = {
        id: 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        giftId: currentGift.id,
        giftName: currentGift.name,
        giftImage: currentGift.image,
        giftPrice: currentGift.price,
        giftCurrency: currentGift.currency,
        giftCategory: currentGift.category,
        requestedBy: {
            name: currentUser.fullName,
            email: currentUser.email
        },
        requestedFrom: {
            name: fromName,
            email: fromEmail
        },
        occasion: occasion,
        message: message,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // Get existing requests
    let giftRequests = window.GiftExchange.Storage.get('giftRequests') || [];

    // Add new request
    giftRequests.push(request);
    window.GiftExchange.Storage.set('giftRequests', giftRequests);

    // Clear the stored gift data
    window.GiftExchange.Storage.remove('giftToRequest');

    // Show success message
    window.GiftExchange.showToast('Gift request sent successfully! 🎁', 'success');

    // Redirect to marketplace after a short delay
    setTimeout(() => {
        window.location.href = 'marketplace.html';
    }, 1500);
}

// ==========================================
// CANCEL REQUEST
// ==========================================

function cancelRequest() {
    // Clear stored gift data
    window.GiftExchange.Storage.remove('giftToRequest');

    // Go back to the previous page or marketplace
    if (document.referrer && document.referrer.includes('gift-detail.html')) {
        window.history.back();
    } else {
        window.location.href = 'marketplace.html';
    }
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
