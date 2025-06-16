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