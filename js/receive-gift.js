// ==========================================
// GLOBAL GIFT EXCHANGE - RECEIVE GIFT
// Gift claiming and redemption
// ==========================================

let giftData = null;
let selectedRedemption = null;

document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading gift data
    // In production, this would fetch from server using gift code/ID from URL
    loadGiftData();
});

async function loadGiftData() {
    const loadingState = document.getElementById('loadingState');
    const giftDisplay = document.getElementById('giftDisplay');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo, create a mock gift or load from sent gifts
    const sentGifts = window.GiftExchange.Storage.get('sentGifts') || [];

    if (sentGifts.length > 0) {
        // Use the most recent sent gift as demo
        const sentGift = sentGifts[sentGifts.length - 1];
        giftData = sentGift;
    } else {
        // Create demo gift
        giftData = {
            gift: {
                id: 'demo-gift',
                name: 'Premium Gift Package',
                price: 299.99,
                currency: 'USD',
                image: 'images/gifts/ps5.png',
                description: 'An amazing gift for someone special'
            },
            recipient: {
                name: 'You',
                email: 'you@example.com'
            },
            message: 'Hope you enjoy this gift! Merry Christmas! 🎄',
            anonymous: false,
            sender: {
                fullName: 'Demo Sender'
            },
            total: 299.99
        };
    }

    // Display gift
    displayGift(giftData);

    // Hide loading, show gift
    loadingState.style.display = 'none';
    giftDisplay.style.display = 'block';
}

function displayGift(data) {
    // Update gift image
    document.getElementById('giftImage').src = data.gift.image;
    document.getElementById('giftImage').alt = data.gift.name;

    // Update gift name
    document.getElementById('giftName').textContent = data.gift.name;

    // Update gift value
    const value = data.total || data.gift.price;
    document.getElementById('giftValue').textContent = window.GiftExchange.formatCurrency(value, data.gift.currency);

    // Update sender name
    const senderName = data.anonymous ? 'An Anonymous Friend' : data.sender.fullName;
    document.getElementById('senderName').textContent = senderName;

    // Show message if exists
    if (data.message && data.message.trim()) {
        document.getElementById('messageSection').style.display = 'block';
        document.getElementById('messageText').textContent = data.message;
    }

    // Update amounts in forms
    document.getElementById('cashAmount').textContent = window.GiftExchange.formatCurrency(value, data.gift.currency);
    document.getElementById('cryptoAmount').textContent = window.GiftExchange.formatCurrency(value, data.gift.currency);
    document.getElementById('donateAmount').textContent = window.GiftExchange.formatCurrency(value, data.gift.currency);
}

// ==========================================
// REDEMPTION SELECTION
// ==========================================

window.selectRedemption = function (type) {
    selectedRedemption = type;

    // Update UI
    document.querySelectorAll('.redemption-card').forEach(card => {
        card.classList.remove('selected');
    });

    event.currentTarget.classList.add('selected');

    // Hide all forms
    document.querySelectorAll('.claim-form').forEach(form => {
        form.classList.remove('active');
    });

    // Show selected form
    const formMap = {
        'physical': 'physicalForm',
        'cash': 'cashForm',
        'crypto': 'cryptoForm',
        'donate': 'donateForm'
    };

    const formId = formMap[type];
    if (formId) {
        document.getElementById(formId).classList.add('active');

        // Scroll to form
        setTimeout(() => {
            document.getElementById(formId).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
};

// ==========================================
// CLAIM GIFT
// ==========================================

window.claimGift = async function () {
    if (!selectedRedemption) {
        window.GiftExchange.showToast('Please select a redemption option', 'error');
        return;
    }

    // Validate form based on redemption type
    if (!validateClaimForm()) {
        return;
    }

    // Get the button that was clicked
    const activeForm = document.querySelector('.claim-form.active');
    const button = activeForm.querySelector('button');
    const originalText = button.innerHTML;

    // Show loading
    button.disabled = true;
    button.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create claim record
    const claimData = {
        id: 'claim-' + Date.now(),
        giftId: giftData.gift.id,
        redemptionType: selectedRedemption,
        claimedAt: new Date().toISOString(),
        status: 'processing'
    };

    // Add type-specific data
    switch (selectedRedemption) {
        case 'physical':
            claimData.shipping = {
                name: document.getElementById('fullName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                zipCode: document.getElementById('zipCode').value,
                phone: document.getElementById('phone').value
            };
            break;
        case 'cash':
            claimData.banking = {
                accountHolderName: document.getElementById('accountHolderName').value,
                bankName: document.getElementById('bankName').value,
                accountNumber: document.getElementById('accountNumber').value.replace(/\d(?=\d{4})/g, '*'),
                routingNumber: document.getElementById('routingNumber').value,
                accountType: document.getElementById('accountType').value
            };
            break;
        case 'crypto':
            claimData.crypto = {
                currency: document.getElementById('cryptoCurrency').value,
                walletAddress: document.getElementById('walletAddress').value,
                amount: giftData.total || giftData.gift.price
            };
            break;
        case 'donate':
            claimData.donation = {
                charity: document.getElementById('charity').value,
                donorName: document.getElementById('donorName').value,
                amount: giftData.total || giftData.gift.price
            };
            break;
    }

    // Save claim record
    let claims = window.GiftExchange.Storage.get('giftClaims') || [];
    claims.push(claimData);
    window.GiftExchange.Storage.set('giftClaims', claims);

    // Show success message
    showSuccessMessage();

    // Trigger confetti
    if (window.GiftExchangeAnimations && window.GiftExchangeAnimations.confetti) {
        window.GiftExchangeAnimations.confetti();
    }
};

function validateClaimForm() {
    let isValid = true;

    switch (selectedRedemption) {
        case 'physical':
            const fullName = document.getElementById('fullName').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const zipCode = document.getElementById('zipCode').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (!fullName || !address || !city || !zipCode || !phone) {
                window.GiftExchange.showToast('Please fill in all shipping details', 'error');
                isValid = false;
            }
            break;

        case 'cash':
            const accountHolderName = document.getElementById('accountHolderName').value.trim();
            const bankName = document.getElementById('bankName').value.trim();
            const accountNumber = document.getElementById('accountNumber').value.trim();
            const routingNumber = document.getElementById('routingNumber').value.trim();
            const accountType = document.getElementById('accountType').value;

            if (!accountHolderName || !bankName || !accountNumber || !routingNumber || !accountType) {
                window.GiftExchange.showToast('Please fill in all banking details', 'error');
                isValid = false;
            }
            break;

        case 'crypto':
            const cryptoCurrency = document.getElementById('cryptoCurrency').value;
            const walletAddress = document.getElementById('walletAddress').value.trim();

            if (!cryptoCurrency || !walletAddress) {
                window.GiftExchange.showToast('Please fill in all crypto details', 'error');
                isValid = false;
            }
            break;

        case 'donate':
            const charity = document.getElementById('charity').value;

            if (!charity) {
                window.GiftExchange.showToast('Please select a charity', 'error');
                isValid = false;
            }
            break;
    }

    return isValid;
}

function showSuccessMessage() {
    // Hide gift display
    document.getElementById('giftDisplay').style.display = 'none';

    // Show success message
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    // Customize message based on redemption type
    const messages = {
        'physical': 'Your gift will be shipped to your address within 5-7 business days.',
        'cash': 'The cash value will be transferred to your bank account within 3-5 business days.',
        'crypto': 'Cryptocurrency will be sent to your wallet within 24 hours.',
        'donate': 'Your donation has been sent to the charity. Thank you for your generosity!'
    };

    successText.textContent = messages[selectedRedemption] || 'Your gift will be processed shortly.';
    successMessage.classList.add('active');

    // Show toast
    window.GiftExchange.showToast('Gift claimed successfully! 🎉', 'success');
}
