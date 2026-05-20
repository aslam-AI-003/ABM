// Authentication System - Arabian Bismi Mandi

// Authorized users (stored locally - also will be in Firestore)
const authorizedUsers = [
    { mobile: '9894092449', password: 'Aslam', name: 'Aslam' },
    { mobile: '9025499668', password: 'Kamal', name: 'Kamal' },
    { mobile: '9600827837', password: 'Jaffar', name: 'Jaffar' }
];

// Check if user is logged in
function isLoggedIn() {
    const session = localStorage.getItem('abm_session');
    if (!session) return false;
    
    try {
        const sessionData = JSON.parse(session);
        // Check if session is valid (24 hours)
        const now = new Date().getTime();
        if (now - sessionData.loginTime > 24 * 60 * 60 * 1000) {
            // Session expired
            localStorage.removeItem('abm_session');
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

// Get logged in user info
function getLoggedInUser() {
    const session = localStorage.getItem('abm_session');
    if (!session) return null;
    try {
        return JSON.parse(session);
    } catch (e) {
        return null;
    }
}

// Login function
function login(mobile, password) {
    const user = authorizedUsers.find(u => u.mobile === mobile && u.password === password);
    
    if (user) {
        const sessionData = {
            mobile: user.mobile,
            name: user.name,
            loginTime: new Date().getTime()
        };
        localStorage.setItem('abm_session', JSON.stringify(sessionData));
        return { success: true, name: user.name };
    }
    
    return { success: false, message: 'Invalid mobile number or password' };
}

// Logout function
function logout() {
    localStorage.removeItem('abm_session');
    window.location.href = 'login.html';
}

// Protect page - redirect to login if not authenticated
function protectPage() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ========== LOGIN PAGE LOGIC ==========
// Only runs on login.html
function initializeLoginPage() {
    // If already logged in, redirect to main page
    if (isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const mobile = document.getElementById('loginMobile').value.trim();
            const password = document.getElementById('loginPassword').value;
            const loginError = document.getElementById('loginError');
            const loginErrorText = document.getElementById('loginErrorText');
            
            if (!mobile || !password) {
                loginError.style.display = 'block';
                loginErrorText.textContent = 'Please fill all fields';
                return;
            }
            
            if (mobile.length !== 10) {
                loginError.style.display = 'block';
                loginErrorText.textContent = 'Enter valid 10-digit mobile number';
                return;
            }
            
            const result = login(mobile, password);
            
            if (result.success) {
                loginError.style.display = 'none';
                window.location.href = 'index.html';
            } else {
                loginError.style.display = 'block';
                loginErrorText.textContent = result.message;
                // Shake animation
                document.querySelector('.login-card').classList.add('shake');
                setTimeout(() => {
                    document.querySelector('.login-card').classList.remove('shake');
                }, 500);
            }
        });
    }
    
    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('loginPassword');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    // If on login page, initialize login
    if (document.getElementById('loginForm')) {
        initializeLoginPage();
    }
});

// Export for use in other scripts
window.ABMAuth = {
    isLoggedIn,
    getLoggedInUser,
    logout,
    protectPage
};
