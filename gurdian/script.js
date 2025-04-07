document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar toggle functionality
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainContent = document.querySelector('.main-content');
    
    // Toggle sidebar on desktop
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });
    
    // Toggle sidebar on mobile
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('mobile-open');
    });
    
    // Close sidebar when clicking outside on mobile
    mainContent.addEventListener('click', function() {
        if (window.innerWidth <= 768 && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }
    });
    
    // Responsive handling
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('mobile-open');
        }
    });
    
    // Simulate map loading
    initMap();
    
    // Add click handlers for dependent cards
    const dependentCards = document.querySelectorAll('.dependent-card:not(.add-new)');
    dependentCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real app, this would navigate to the dependent's detail page
            console.log('Viewing dependent details');
        });
    });
    
    // Add click handler for add new dependent card
    const addNewCard = document.querySelector('.dependent-card.add-new');
    if (addNewCard) {
        addNewCard.addEventListener('click', function() {
            // In a real app, this would open a modal or navigate to add dependent page
            alert('Add new dependent functionality would open here');
        });
    }
    
    // Add click handler for respond button in alert banner
    const respondBtn = document.querySelector('.alert-banner .btn-primary');
    if (respondBtn) {
        respondBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would open response options
            alert('SOS response options would appear here');
        });
    }
    
    // Add click handler for call button in alert banner
    const callBtn = document.querySelector('.alert-banner .btn-outline');
    if (callBtn) {
        callBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would initiate a call
            alert('Calling dependent...');
        });
    }
    
    // Add click handlers for dependent action buttons
    const actionButtons = document.querySelectorAll('.dependent-actions .btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the card click
            const action = this.querySelector('svg').dataset.feather;
            
            // Handle different actions
            switch(action) {
                case 'phone':
                    alert('Calling dependent...');
                    break;
                case 'message-circle':
                    alert('Messaging dependent...');
                    break;
                case 'map':
                    alert('Viewing dependent location...');
                    break;
            }
        });
    });
});

// Simulate map initialization
function initMap() {
    // In a real app, this would initialize a map library like Google Maps or Mapbox
    console.log('Map initialized');
    
    // For demonstration purposes, we'll just add some styling to the placeholder
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        // Add a subtle animation to simulate map loading
        setTimeout(() => {
            mapPlaceholder.innerHTML = `
                <i data-feather="map-pin" style="color: var(--danger);"></i>
                <p>Map loaded - showing 4 dependents</p>
            `;
            // Check if feather is defined before calling replace
            if (typeof feather !== 'undefined') {
                feather.replace();
            } else {
                console.warn('Feather icons not loaded. Ensure feather.js is included in your HTML.');
            }
        }, 1500);
    }
}

// Update current date in the header
function updateDate() {
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        dateElement.textContent = currentDate;
    }
}

// Call updateDate when the page loads
updateDate();