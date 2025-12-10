// ==========================================
// GLOBAL GIFT EXCHANGE - SEND GIFT
// Multi-step gift sending form
// ==========================================

let currentStep = 1;
const totalSteps = 4;
let giftData = null;
let selectedPaymentMethod = null;

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!window.GiftExchange.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Load gift data
    giftData = window.GiftExchange.Storage.get('giftToSend');

    if (!giftData) {
        window.GiftExchange.showToast('No gift selected', 'error');
        setTimeout(() => {
            window.location.href = 'marketplace.html';
        }, 1500);
        return;
    }

    // Display gift summary
    displayGiftSummary();

    // Initialize event listeners
    initializeEventListeners();

    // Set minimum date for delivery date
    const deliveryDate = document.getElementById('deliveryDate');
    if (deliveryDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDate.min = tomorrow.toISOString().split('T')[0];
    }
});

function initializeEventListeners() {
    // Message character counter
    const giftMessage = document.getElementById('giftMessage');
    const messageCount = document.getElementById('messageCount');

    if (giftMessage && messageCount) {
        giftMessage.addEventListener('input', () => {
            const count = giftMessage.value.length;
            messageCount.textContent = `${count}/500 characters`;
        });
    }

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Card expiry formatting
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
}

function displayGiftSummary() {
    const giftSummary = document.getElementById('giftSummary');

    if (!giftSummary || !giftData) return;

    const quantity = giftData.quantity || 1;
    const totalPrice = giftData.price * quantity;

    giftSummary.innerHTML = `
    <img src="${giftData.image}" alt="${giftData.name}" class="gift-summary-image">
    <div class="gift-summary-info">
      <div class="gift-summary-title">${giftData.name}</div>
      <div class="text-secondary mb-sm">Quantity: ${quantity}</div>
      <div class="gift-summary-price">${window.GiftExchange.formatCurrency(totalPrice, giftData.currency)}</div>
    </div>
  `;
}

// ==========================================
// STEP NAVIGATION
// ==========================================

window.nextStep = function () {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();

        // Update review section when reaching step 4
        if (currentStep === 4) {
            updateReviewSection();
        }
    } else {
        // Final step - submit form
        submitGift();
    }
};

window.previousStep = function () {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
};

function updateStepDisplay() {
    // Update progress steps
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');

        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });

    // Update progress line
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressLine').style.width = progress + '%';

    // Update form sections
    document.querySelectorAll('.form-section').forEach((section, index) => {
        section.classList.remove('active');
        if (index + 1 === currentStep) {
            section.classList.add('active');
        }
    });

    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (currentStep === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.flex = '1';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.flex = '1';
    }

    // Update next button text
    if (currentStep === totalSteps) {
        nextBtn.innerHTML = '🎁 Send Gift Now';
    } else {
        nextBtn.innerHTML = 'Next Step →';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// PAYMENT METHOD SELECTION
// ==========================================

window.selectPaymentMethod = function (method) {
    selectedPaymentMethod = method;

    // Update UI
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });

    document.querySelector(`[data-method="${method}"]`)?.classList.add('selected');

    // Show/hide card form
    const cardForm = document.getElementById('cardPaymentForm');
    if (cardForm) {
        cardForm.style.display = method === 'card' ? 'block' : 'none';
    }
};

// ==========================================
// VALIDATION
// ==========================================

function validateStep(step) {
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input, .form-select').forEach(el => {
        el.classList.remove('error');
    });

    let isValid = true;

    if (step === 1) {
        // Validate recipient details
        const name = document.getElementById('recipientName').value.trim();
        const email = document.getElementById('recipientEmail').value.trim();
        const country = document.getElementById('recipientCountry').value;

        if (!name || name.length < 2) {
            showError('recipientNameError', 'recipientName', 'Please enter recipient name');
            isValid = false;
        }

        if (!window.GiftExchange.validateEmail(email)) {
            showError('recipientEmailError', 'recipientEmail', 'Please enter a valid email');
            isValid = false;
        }

        if (!country) {
            showError('recipientCountryError', 'recipientCountry', 'Please select a country');
            isValid = false;
        }
    }

    if (step === 3) {
        // Validate payment method selection
        if (!selectedPaymentMethod) {
            window.GiftExchange.showToast('Please select a payment method', 'error');
            isValid = false;
        }

        // If card payment, validate card fields
        if (selectedPaymentMethod === 'card') {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVV = document.getElementById('cardCVV').value;

            if (!cardNumber || cardNumber.length < 13) {
                window.GiftExchange.showToast('Please enter a valid card number', 'error');
                isValid = false;
            }

            if (!cardExpiry || cardExpiry.length < 5) {
                window.GiftExchange.showToast('Please enter card expiry date', 'error');
                isValid = false;
            }

            if (!cardCVV || cardCVV.length < 3) {
                window.GiftExchange.showToast('Please enter CVV', 'error');
                isValid = false;
            }
        }
    }

    return isValid;
}

function showError(errorId, inputId, message) {
    const errorEl = document.getElementById(errorId);
    const inputEl = document.getElementById(inputId);

    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.add('error');
}

// ==========================================
// REVIEW SECTION
// ==========================================

function updateReviewSection() {
    if (!giftData) return;

    const quantity = giftData.quantity || 1;
    const subtotal = giftData.price * quantity;
    const serviceFee = subtotal * 0.05; // 5% service fee
    const total = subtotal + serviceFee;

    // Update order summary
    document.getElementById('summaryGiftName').textContent = giftData.name;
    document.getElementById('summaryQuantity').textContent = quantity;
    document.getElementById('summarySubtotal').textContent = window.GiftExchange.formatCurrency(subtotal, giftData.currency);
    document.getElementById('summaryFee').textContent = window.GiftExchange.formatCurrency(serviceFee, giftData.currency);
    document.getElementById('summaryTotal').textContent = window.GiftExchange.formatCurrency(total, giftData.currency);

    // Update recipient details
    const recipientName = document.getElementById('recipientName').value;
    const recipientEmail = document.getElementById('recipientEmail').value;
    const recipientCountry = document.getElementById('recipientCountry').options[
        document.getElementById('recipientCountry').selectedIndex
    ].text;

    document.getElementById('summaryRecipient').textContent =
        `${recipientName} (${recipientEmail}), ${recipientCountry}`;

    // Update message if provided
    const message = document.getElementById('giftMessage').value.trim();
    const summaryMessage = document.getElementById('summaryMessage');
    const summaryMessageText = document.getElementById('summaryMessageText');

    if (message) {
        summaryMessage.style.display = 'block';
        summaryMessageText.textContent = message;
    } else {
        summaryMessage.style.display = 'none';
    }
}

// ==========================================
// SUBMIT GIFT
// ==========================================

async function submitGift() {
    const nextBtn = document.getElementById('nextBtn');
    const originalText = nextBtn.innerHTML;

    // Show loading
    nextBtn.disabled = true;
    nextBtn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create gift transaction
    const giftTransaction = {
        id: 'gift-' + Date.now(),
        gift: giftData,
        recipient: {
            name: document.getElementById('recipientName').value,
            email: document.getElementById('recipientEmail').value,
            country: document.getElementById('recipientCountry').value
        },
        message: document.getElementById('giftMessage').value,
        deliveryDate: document.getElementById('deliveryDate').value || 'Immediate',
        anonymous: document.getElementById('anonymousGift').checked,
        paymentMethod: selectedPaymentMethod,
        quantity: giftData.quantity || 1,
        subtotal: giftData.price * (giftData.quantity || 1),
        serviceFee: giftData.price * (giftData.quantity || 1) * 0.05,
        total: (giftData.price * (giftData.quantity || 1)) * 1.05,
        status: 'pending',
        sentAt: new Date().toISOString(),
        sender: window.GiftExchange.getCurrentUser()
    };

    // Save to sent gifts
    let sentGifts = window.GiftExchange.Storage.get('sentGifts') || [];
    sentGifts.push(giftTransaction);
    window.GiftExchange.Storage.set('sentGifts', sentGifts);

    // Clear gift to send
    window.GiftExchange.Storage.remove('giftToSend');

    // Show success and trigger confetti
    window.GiftExchange.showToast('Gift sent successfully! 🎉', 'success');

    if (window.GiftExchangeAnimations && window.GiftExchangeAnimations.confetti) {
        window.GiftExchangeAnimations.confetti();
    }

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}
