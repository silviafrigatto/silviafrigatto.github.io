function switchTab(tabName) {
    const allContents = document.querySelectorAll('.tab-content');
    const allButtons = document.querySelectorAll('.tab-button');
    
    // Remove active class from all elements
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content and button
    const targetContent = document.getElementById(tabName);
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    
    if (targetContent && targetButton) {
        targetContent.classList.add('active');
        targetButton.classList.add('active');
    }
}

// Add click event listeners to all tab buttons
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
});

// Handle internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        if (document.getElementById(targetId)) {
            switchTab(targetId);
        }
    }
});

function toggleDetails(button) {
            const details = button.nextElementSibling;
            const isExpanded = details.classList.contains('expanded');
            
            if (isExpanded) {
                details.classList.remove('expanded');
                button.textContent = 'Read More ✨';
                button.style.background = 'linear-gradient(135deg, #2dd4bf 0%, #a855f7 100%)';
            } else {
                details.classList.add('expanded');
                button.textContent = 'Show Less ⚡';
                button.style.background = 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)';
            }
        }