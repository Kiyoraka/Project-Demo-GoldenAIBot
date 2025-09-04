// GoldenAI Login Authentication System
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    console.log('GoldenAI Login System initialized');
});

// Hardcoded credentials for demo
const CREDENTIALS = {
    'admin@gmail.com': {
        password: 'admin123',
        role: 'admin',
        name: 'Administrator',
        redirect: 'admin.html'
    },
    'staff@gmail.com': {
        password: 'admin123',
        role: 'staff',
        name: 'Staff Member',
        redirect: 'staff.html'
    }
};

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Form submission handler
    loginForm.addEventListener('submit', handleLogin);
    
    // Enter key handler for inputs
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin(e);
            }
        });
    });
    
    // Auto-focus email field
    emailInput.focus();
    
    // Add input animation effects
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.querySelector('.login-btn');
    
    // Validate inputs
    if (!email || !password) {
        showError('Please enter both email and password');
        return;
    }
    
    // Show loading state
    showLoadingButton(loginBtn, true);
    
    // Simulate authentication delay
    setTimeout(() => {
        authenticateUser(email, password, loginBtn);
    }, 1000);
}

function authenticateUser(email, password, loginBtn) {
    const user = CREDENTIALS[email.toLowerCase()];
    
    if (!user) {
        showLoadingButton(loginBtn, false);
        showError('Invalid email address');
        shakeForm();
        return;
    }
    
    if (user.password !== password) {
        showLoadingButton(loginBtn, false);
        showError('Invalid password');
        shakeForm();
        return;
    }
    
    // Successful login
    showLoadingButton(loginBtn, false);
    showSuccessModal(user);
}

function showSuccessModal(user) {
    const modal = document.getElementById('loginModal');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    welcomeMessage.textContent = `Welcome back, ${user.name}!`;
    modal.style.display = 'flex';
    
    // Redirect after animation
    setTimeout(() => {
        window.location.href = user.redirect;
    }, 2500);
}

function showLoadingButton(button, isLoading) {
    const btnText = button.querySelector('.btn-text');
    const btnIcon = button.querySelector('i');
    
    if (isLoading) {
        button.disabled = true;
        btnText.textContent = 'Signing In...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        button.style.opacity = '0.8';
    } else {
        button.disabled = false;
        btnText.textContent = 'Sign In';
        btnIcon.className = 'fas fa-arrow-right';
        button.style.opacity = '1';
    }
}

function showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: rgba(239, 68, 68, 0.2);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #EF4444;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: errorSlideIn 0.3s ease-out;
    `;
    
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        ${message}
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes errorSlideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert before login form
    const loginForm = document.getElementById('loginForm');
    loginForm.parentNode.insertBefore(errorDiv, loginForm);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv && errorDiv.parentNode) {
            errorDiv.style.animation = 'errorSlideOut 0.3s ease-out';
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

function shakeForm() {
    const loginCard = document.querySelector('.login-card');
    loginCard.style.animation = 'shake 0.5s ease-in-out';
    
    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        loginCard.style.animation = '';
    }, 500);
}

function fillCredentials(email, password) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    emailInput.value = email;
    passwordInput.value = password;
    
    // Add focus effects
    emailInput.parentElement.classList.add('focused');
    passwordInput.parentElement.classList.add('focused');
    
    // Show notification
    showNotification(`Credentials filled: ${email}`, 'info');
    
    // Focus on login button
    document.querySelector('.login-btn').focus();
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        'info': '#3B82F6',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        font-weight: 500;
        font-size: 0.875rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Advanced features
function initializeAdvancedFeatures() {
    // Remember me functionality
    const rememberCheckbox = document.getElementById('remember');
    const emailInput = document.getElementById('email');
    
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
        emailInput.parentElement.classList.add('focused');
    }
    
    // Save/remove email based on remember me
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked && emailInput.value) {
            localStorage.setItem('rememberedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    });
    
    // Update saved email when input changes
    emailInput.addEventListener('blur', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', this.value);
        }
    });
    
    // Forgot password handler
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Password reset functionality coming soon!', 'info');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter to submit
        if (e.ctrlKey && e.key === 'Enter') {
            const loginForm = document.getElementById('loginForm');
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            clearForm();
        }
    });
}

function clearForm() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('remember').checked = false;
    
    // Remove focused states
    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
        wrapper.classList.remove('focused');
    });
    
    // Remove any errors
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    
    // Focus email field
    document.getElementById('email').focus();
    
    showNotification('Form cleared', 'info');
}

// Initialize advanced features when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAdvancedFeatures);

// Add CSS animations for loading states
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .input-wrapper.focused {
        transform: translateY(-2px);
    }
    
    .login-btn:disabled {
        cursor: not-allowed;
    }
    
    @keyframes errorSlideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
    
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
`;
document.head.appendChild(additionalStyles);