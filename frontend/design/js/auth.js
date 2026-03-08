// ==========================================
// GLOBAL GIFT EXCHANGE - AUTHENTICATION
// Signup, Login, and Verification Logic
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // SIGNUP FORM HANDLING
    // ==========================================

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const strengthBar = document.getElementById('strengthBar');
        const passwordToggle = document.getElementById('passwordToggle');
        const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');

        // Password visibility toggle
        if (passwordToggle && passwordInput) {
            passwordToggle.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                passwordToggle.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }

        if (confirmPasswordToggle && confirmPasswordInput) {
            confirmPasswordToggle.addEventListener('click', () => {
                const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
                confirmPasswordInput.type = type;
                confirmPasswordToggle.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }

        // Password strength meter
        if (passwordInput && strengthBar) {
            passwordInput.addEventListener('input', () => {
                const password = passwordInput.value;
                const strength = window.GiftExchange.getPasswordStrength(password);

                let width = 0;
                if (strength.score === 'weak') width = 33;
                if (strength.score === 'medium') width = 66;
                if (strength.score === 'strong') width = 100;

                strengthBar.style.width = width + '%';
                strengthBar.style.backgroundColor = strength.color;
            });
        }

        // Form submission
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
            document.querySelectorAll('.form-input, .form-select').forEach(el => el.classList.remove('error'));

            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const country = document.getElementById('country').value;
            const gender = document.getElementById('gender').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('terms').checked;

            // Validation
            let isValid = true;

            if (!fullName || fullName.length < 2) {
                showError('nameError', 'fullName', 'Please enter your full name');
                isValid = false;
            }

            if (!window.GiftExchange.validateEmail(email)) {
                showError('emailError', 'email', 'Please enter a valid email address');
                isValid = false;
            }

            if (!country) {
                showError('countryError', 'country', 'Please select your country');
                isValid = false;
            }

            if (!window.GiftExchange.validatePassword(password)) {
                showError('passwordError', 'password', 'Password must be at least 8 characters with uppercase, lowercase, and number');
                isValid = false;
            }

            if (password !== confirmPassword) {
                showError('confirmPasswordError', 'confirmPassword', 'Passwords do not match');
                isValid = false;
            }

            if (!termsAccepted) {
                showError('termsError', 'terms', 'You must accept the Terms of Service');
                isValid = false;
            }

            if (!isValid) return;

            // Show loading
            const signupBtn = document.getElementById('signupBtn');
            const originalText = signupBtn.textContent;
            signupBtn.disabled = true;
            signupBtn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store user data
            const user = {
                id: Date.now(),
                fullName,
                email,
                country,
                gender,
                createdAt: new Date().toISOString(),
                verified: false
            };

            window.GiftExchange.Storage.set('pendingUser', user);
            window.GiftExchange.Storage.set('userEmail', email);

            // Redirect to verification
            window.location.href = 'verify-email.html';
        });
    }

    // ==========================================
    // LOGIN FORM HANDLING
    // ==========================================

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordInput = document.getElementById('password');

        // Password visibility toggle
        if (passwordToggle && passwordInput) {
            passwordToggle.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                passwordToggle.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }

        // Form submission
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
            document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Validation
            let isValid = true;

            if (!window.GiftExchange.validateEmail(email)) {
                showError('emailError', 'email', 'Please enter a valid email address');
                isValid = false;
            }

            if (!password) {
                showError('passwordError', 'password', 'Please enter your password');
                isValid = false;
            }

            if (!isValid) return;

            // Show loading
            const loginBtn = document.getElementById('loginBtn');
            const originalText = loginBtn.textContent;
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Demo account - always works for testing
            const DEMO_ACCOUNT = {
                email: 'demo@gift.com',
                password: 'Demo123!',
                user: {
                    id: 12345,
                    fullName: 'Demo User',
                    email: 'demo@gift.com',
                    country: 'US',
                    gender: 'unisex',
                    verified: true,
                    createdAt: '2025-12-01T00:00:00Z'
                }
            };

            // Check if demo account
            if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
                window.GiftExchange.Storage.set('user', DEMO_ACCOUNT.user);
                window.GiftExchange.Storage.set('authToken', 'demo-token-' + Date.now());

                window.GiftExchange.showToast('Login successful! Welcome back.', 'success');

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
                return;
            }

            // Check if user exists (demo purposes)
            const pendingUser = window.GiftExchange.Storage.get('pendingUser');
            const existingUser = window.GiftExchange.Storage.get('user');

            if ((pendingUser && pendingUser.email === email && pendingUser.verified) ||
                (existingUser && existingUser.email === email)) {
                // Login successful
                const user = pendingUser?.verified ? pendingUser : existingUser || {
                    id: Date.now(),
                    fullName: 'Demo User',
                    email,
                    country: 'US',
                    verified: true
                };

                window.GiftExchange.Storage.set('user', user);
                window.GiftExchange.Storage.set('authToken', 'demo-token-' + Date.now());

                window.GiftExchange.showToast('Login successful! Welcome back.', 'success');

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                // Login failed
                loginBtn.disabled = false;
                loginBtn.textContent = originalText;
                showError('passwordError', 'password', 'Invalid email or password');
            }
        });
    }

    // ==========================================
    // EMAIL VERIFICATION HANDLING
    // ==========================================

    const verifyForm = document.getElementById('verifyForm');
    if (verifyForm) {
        // Display user email
        const userEmailEl = document.getElementById('userEmail');
        const userEmail = window.GiftExchange.Storage.get('userEmail');
        if (userEmailEl && userEmail) {
            userEmailEl.textContent = userEmail;
        }

        // Start resend timer
        startResendTimer();

        // Form submission
        verifyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get code from inputs
            const codeInputs = document.querySelectorAll('.code-input');
            const code = Array.from(codeInputs).map(input => input.value).join('');

            // Clear error
            const codeError = document.getElementById('codeError');
            codeError.textContent = '';

            // Validate code length
            if (code.length !== 6) {
                codeError.textContent = 'Please enter the complete 6-digit code';
                return;
            }

            // Show loading
            const verifyBtn = document.getElementById('verifyBtn');
            const originalText = verifyBtn.textContent;
            verifyBtn.disabled = true;
            verifyBtn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For demo, accept any 6-digit code
            if (/^\d{6}$/.test(code)) {
                // Show success animation
                const successIcon = document.getElementById('successIcon');
                const codeInputsContainer = document.getElementById('codeInputs');

                if (successIcon && codeInputsContainer) {
                    codeInputsContainer.style.opacity = '0';
                    verifyBtn.style.display = 'none';
                    successIcon.classList.add('show');
                }

                // Update user as verified
                const pendingUser = window.GiftExchange.Storage.get('pendingUser');
                if (pendingUser) {
                    pendingUser.verified = true;
                    window.GiftExchange.Storage.set('user', pendingUser);
                    window.GiftExchange.Storage.set('authToken', 'demo-token-' + Date.now());
                    window.GiftExchange.Storage.remove('pendingUser');
                }

                window.GiftExchange.showToast('Email verified successfully!', 'success');

                setTimeout(() => {
                    if (window.GiftExchangeAnimations && window.GiftExchangeAnimations.confetti) {
                        window.GiftExchangeAnimations.confetti();
                    }
                }, 500);

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2500);
            } else {
                verifyBtn.disabled = false;
                verifyBtn.textContent = originalText;
                codeError.textContent = 'Invalid verification code. Please try again.';
            }
        });
    }
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function showError(errorId, inputId, message) {
    const errorEl = document.getElementById(errorId);
    const inputEl = document.getElementById(inputId);

    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.add('error');
}

function startResendTimer() {
    const resendLink = document.getElementById('resendLink');
    const timerEl = document.getElementById('timer');

    if (!resendLink || !timerEl) return;

    let seconds = 60;

    const interval = setInterval(() => {
        seconds--;
        timerEl.textContent = seconds;

        if (seconds <= 0) {
            clearInterval(interval);
            resendLink.classList.remove('disabled');
            resendLink.innerHTML = 'Resend code';
            resendLink.onclick = resendCode;
        }
    }, 1000);
}

async function resendCode() {
    const resendLink = document.getElementById('resendLink');
    const timerEl = document.getElementById('timer');

    if (!resendLink || resendLink.classList.contains('disabled')) return;

    // Show loading
    const originalText = resendLink.textContent;
    resendLink.textContent = 'Sending...';
    resendLink.classList.add('disabled');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    window.GiftExchange.showToast('Verification code sent!', 'success');

    // Restart timer
    resendLink.innerHTML = 'Resend in <span class="timer" id="timer">60</span>s';
    startResendTimer();
}

// Social authentication handlers
window.socialSignup = async function (provider) {
    window.GiftExchange.showToast(`${provider} signup is not yet implemented`, 'error');
};

window.socialLogin = async function (provider) {
    window.GiftExchange.showToast(`${provider} login is not yet implemented`, 'error');
};
