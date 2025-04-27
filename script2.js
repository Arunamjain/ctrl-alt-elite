const API_URL = 'http://localhost:5000/api'; // Update if your backend is hosted elsewhere

let currentRole = 'donor';
let isSignup = false;

function switchTab(tab) {
    if (tab === 'login') {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('signup-form').style.display = 'none';
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.querySelectorAll('.tab')[1].classList.remove('active');
        isSignup = false;
    } else {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
        document.querySelectorAll('.tab')[0].classList.remove('active');
        document.querySelectorAll('.tab')[1].classList.add('active');
        isSignup = true;
    }
}

function selectRole(element, role, isSignupRole = false) {
    const form = isSignupRole ? document.getElementById('signup-form') : document.getElementById('login-form');
    const options = form.querySelectorAll('.role-option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    currentRole = role;
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                role: currentRole
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        switch(data.user.role) {
            case 'donor':
                window.location.href = 'donor-dashboard.html';
                break;
            case 'hospital':
                window.location.href = 'hospital-dashboard.html';
                break;
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            default:
                window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Login error:', error);
        alert(error.message);
    }
}

async function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Additional fields based on role
    const userData = {
        name,
        email,
        password,
        role: currentRole
    };
    
    if (currentRole === 'donor') {
        // In a real app, you'd collect blood type from a form field
        userData.bloodType = 'O+'; // Default, should be dynamic
    } else if (currentRole === 'hospital') {
        // In a real app, you'd collect hospital name from a form field
        userData.hospitalName = 'General Hospital'; // Default, should be dynamic
    }
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        alert('Registration successful!');
        switchTab('login');
    } catch (error) {
        console.error('Registration error:', error);
        alert(error.message);
    }
}