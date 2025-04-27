document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation functionality
    const tabs = document.querySelectorAll('.tab');
    const screens = document.querySelectorAll('.screen');
    
    // Add the missing switchScreen function
    window.switchScreen = function(screenId) {
        // Hide all screens
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show the target screen
        document.getElementById(screenId).classList.add('active');
        
        // Update active tab
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-screen') === screenId) {
                tab.classList.add('active');
            }
        });
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the target screen ID from the data attribute
            const targetScreenId = this.getAttribute('data-screen');
            switchScreen(targetScreenId);
        });
    });
    
    // Donation button functionality
    const donateButtons = document.querySelectorAll('.donate-btn');
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Donate') {
                alert('Redirecting to donation scheduling...');
            } else if (this.textContent === 'Contact') {
                alert('Contacting blood bank...');
            }
        });
    });
    
    // Main donation button
    const mainDonateButton = document.querySelector('.donation-card .btn');
    if (mainDonateButton) {
        mainDonateButton.addEventListener('click', function() {
            alert('Redirecting to donation scheduling...');
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Searching for:', this.value);
            
            // For demo purposes, let's show different results for different searches
            if (this.value.toLowerCase().includes('a+')) {
                filterBloodBanks('A+');
            } else if (this.value.toLowerCase().includes('o-')) {
                filterBloodBanks('O-');
            } else {
                showAllBloodBanks();
            }
        });
    }
    
    // Blood type filter functionality
    const bloodTypeButtons = document.querySelectorAll('.blood-type-item');
    bloodTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bloodType = this.getAttribute('data-type');
            if (['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'].includes(bloodType)) {
                // Update active state visually
                bloodTypeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter blood banks
                filterBloodBanks(bloodType);
            }
        });
    });
    
    // Helper functions
    function filterBloodBanks(bloodType) {
        const bloodBankCards = document.querySelectorAll('.blood-bank-card');
        bloodBankCards.forEach(card => {
            const availableTypes = card.querySelector('.blood-bank-distance').textContent;
            if (availableTypes.includes(bloodType)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function showAllBloodBanks() {
        const bloodBankCards = document.querySelectorAll('.blood-bank-card');
        bloodBankCards.forEach(card => {
            card.style.display = 'flex';
        });
    }
    
    // Initialize the app by showing the home screen
    document.getElementById('home-screen').classList.add('active');
    document.querySelector('.tab[data-screen="home-screen"]').classList.add('active');

    // Logout functionality
    function logout() {
        localStorage.removeItem('user');
        window.location.href = 'index1.html';
    }

    // Settings icon click handler
    document.querySelector('.fa-cog').addEventListener('click', function() {
        if (confirm('Would you like to logout?')) {
            logout();
        }
    });
    
    // Language selector functionality
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
        });
    }
    
    function changeLanguage(lang) {
        console.log('Changing language to:', lang);
        // Set direction for RTL languages
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
        
        // Here you would typically load language translations
        // This is a placeholder for demonstration purposes
        // In a real app, you would load JSON language files or use a translation library
    }
});