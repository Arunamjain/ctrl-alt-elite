document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation functionality
    const tabs = document.querySelectorAll('.tab');
    const screens = document.querySelectorAll('.screen');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the target screen ID from the data attribute
            const targetScreenId = this.getAttribute('data-screen');
            
            // Hide all screens
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Show the target screen
            document.getElementById(targetScreenId).classList.add('active');
            
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
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
    const bloodTypeButtons = document.querySelectorAll('.category-icon');
    bloodTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bloodType = this.textContent.trim();
            if (['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'].includes(bloodType)) {
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
});