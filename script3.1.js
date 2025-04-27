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
    const aadhaarId = document.getElementById('aadhaar-id').value;

    if (!email || !password || !aadhaarId) {
        alert('Please fill in all fields');
        return;
    }

    try {
        // For demo purposes, we'll simulate a successful login
        // In a real app, you would make an API call here
        const user = {
            role: currentRole,
            name: "John Donor", // Example name
            email: email
        };

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on role
        switch (currentRole) {
            case 'donor':
                window.location.href = 'dashboard3.html';
                break;
            case 'hospital':
                // In a real app, you would redirect to hospital dashboard
                alert('Hospital dashboard would load here');
                break;
            case 'admin':
                // In a real app, you would redirect to admin dashboard
                alert('Admin dashboard would load here');
                break;
        }
    } catch (error) {
        alert(error.message);
    }
}

async function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const aadhaarId = document.getElementById('aadhaar-id').value;

    if (!name || !email || !password || !confirmPassword || !aadhaarId) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role: currentRole,
                aadhaarId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        alert('Signup successful! Please log in.');
        switchTab('login');
    } catch (error) {
        alert(error.message);
    }
}
