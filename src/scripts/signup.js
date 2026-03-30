// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Show message function
function showMessage(message, type = 'success') {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    messageDiv.innerHTML = `<i class="fas ${icon}"></i>${message}`;
    
    container.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            container.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// Clear messages
function clearMessages() {
    const container = document.getElementById('messageContainer');
    container.innerHTML = '';
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password strength validation
function validatePassword(password) {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let strength = 0;
    if (minLength) strength++;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChar) strength++;
    
    return {
        isValid: minLength,
        strength: strength,
        message: getPasswordStrengthMessage(strength)
    };
}

function getPasswordStrengthMessage(strength) {
    if (strength <= 2) return 'Weak password';
    if (strength <= 3) return 'Fair password';
    if (strength <= 4) return 'Good password';
    return 'Strong password';
}

// Form validation
function validateForm() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    clearMessages();
    
    let isValid = true;
    
    // Validate full name
    if (fullName.length < 2) {
        showMessage('Name must be at least 2 characters long', 'error');
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        showMessage(`Password must be at least 6 characters long`, 'error');
        isValid = false;
    }
    
    // Validate password confirmation
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        isValid = false;
    }
    
    // Validate terms agreement
    if (!agreeTerms) {
        showMessage('Please agree to the Terms of Service and Privacy Policy', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    // Show loading state
    const submitBtn = document.querySelector('.login-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call to backend
        const response = await signupUser(formData);
        
        if (response.success) {
            showMessage('Account created successfully! Redirecting to login...', 'success');
            
            // Store user data
            localStorage.setItem('userEmail', formData.email);
            localStorage.setItem('userName', formData.fullName);
            
            // Redirect to login after delay
            setTimeout(() => {
                window.location.href = 'login-new.html';
            }, 2000);
        } else {
            showMessage(response.message || 'Signup failed. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }
});

// Simulate signup API call
async function signupUser(userData) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }
        
        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}

// Handle login link
function showLogin() {
    showMessage('Redirecting to login page...', 'success');
    setTimeout(() => {
        window.location.href = 'login-new.html';
    }, 1000);
}

// Add real-time password strength indicator
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const validation = validatePassword(password);
    
    // Remove existing strength indicator
    const existingIndicator = document.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (password.length > 0) {
        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        strengthIndicator.style.cssText = `
            margin-top: 0.5rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            font-weight: 500;
        `;
        
        // Set color based on strength
        if (validation.strength <= 2) {
            strengthIndicator.style.background = '#dc3545';
            strengthIndicator.style.color = '#fff';
        } else if (validation.strength <= 3) {
            strengthIndicator.style.background = '#ffc107';
            strengthIndicator.style.color = '#000';
        } else {
            strengthIndicator.style.background = '#28a745';
            strengthIndicator.style.color = '#fff';
        }
        
        strengthIndicator.textContent = validation.message;
        this.parentElement.appendChild(strengthIndicator);
    }
});

// Add input animations
document.querySelectorAll('.input-wrapper input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add ripple effect to button
document.querySelector('.login-btn').addEventListener('click', function(e) {
    const button = this;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple styles
const rippleStyles = `
    .login-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT') {
            document.getElementById('signupForm').dispatchEvent(new Event('submit'));
        }
    }
});

// Check if user is already logged in
window.addEventListener('load', function() {
    const savedToken = localStorage.getItem('userToken');
    
    if (savedToken) {
        showMessage('You are already logged in. Redirecting to dashboard...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
});
