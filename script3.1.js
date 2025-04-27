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

    // Demo user data with initialized values
    const user = {
        role: currentRole,
        name: email.split('@')[0] || 'Donor',
        email: email,
        bloodType: 'A+',
        donations: 0,
        liters: 0,
        livesSaved: 0,
        daysSinceLast: 0
    };

    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'dashboard3.html';
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

    // Create new user with initial values
    const user = {
        role: currentRole,
        name: name,
        email: email,
        bloodType: 'A+',
        donations: 0,
        liters: 0,
        livesSaved: 0,
        daysSinceLast: 0
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Signup successful!');
    window.location.href = 'dashboard3.html';
}
