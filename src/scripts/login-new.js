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

// Form validation
function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    clearMessages();
    
    let isValid = true;
    
    // Validate email
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    // Validate password
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        remember: document.getElementById('remember').checked
    };
    
    // Show loading state
    const submitBtn = document.querySelector('.login-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call to backend
        const response = await loginUser(formData);
        
        if (response.success) {
            showMessage('Login successful! Redirecting to dashboard...', 'success');
            
            // Store token if remember me is checked
            if (formData.remember) {
                localStorage.setItem('userToken', response.token);
                localStorage.setItem('userEmail', formData.email);
            }
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage(response.message || 'Login failed. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }
});

// Simulate login API call
async function loginUser(credentials) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Handle forgot password
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    showMessage('Password reset link has been sent to your email', 'success');
});

// Handle signup link
function showSignup() {
    showMessage('Redirecting to signup page...', 'success');
    setTimeout(() => {
        // In a real app, this would redirect to signup page
        window.location.href = 'signup.html';
    }, 1000);
}

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

// Check for existing session on page load
window.addEventListener('load', function() {
    const savedToken = localStorage.getItem('userToken');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedToken && savedEmail) {
        // Auto-fill the form if user data is saved
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
        
        showMessage('Welcome back! You are already logged in.', 'success');
        
        // Optionally redirect to dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT') {
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }
    }
});
