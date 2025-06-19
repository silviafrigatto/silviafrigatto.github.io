// Enhanced script.js with better mobile support

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
        
        // Scroll to top of content on mobile
        if (window.innerWidth <= 768) {
            targetContent.scrollTop = 0;
        }
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
    
    // Add touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
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

// Enhanced toggle function with better mobile behavior
function toggleDetails(button) {
    const details = button.nextElementSibling;
    const isExpanded = details.classList.contains('expanded');
    const isMobile = window.innerWidth <= 480;
    
    if (isExpanded) {
        details.classList.remove('expanded');
        button.textContent = 'Read More ✨';
        button.style.background = 'linear-gradient(135deg, #2dd4bf 0%, #a855f7 100%)';
        
        // On mobile, scroll to the button for better UX
        if (isMobile) {
            setTimeout(() => {
                button.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    } else {
        details.classList.add('expanded');
        button.textContent = 'Show Less ⚡';
        button.style.background = 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)';
        
        // On mobile, add a small delay to ensure smooth expansion
        if (isMobile) {
            setTimeout(() => {
                // Optionally scroll to show more content
                const rect = details.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    details.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 300);
        }
    }
}

// Add smooth scrolling for better mobile experience
function addSmoothScrolling() {
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
        
        /* Improve scrolling on iOS */
        .tab-content {
            -webkit-overflow-scrolling: touch;
        }
    `;
    document.head.appendChild(style);
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', addSmoothScrolling);

// Handle orientation changes on mobile
window.addEventListener('orientationchange', function() {
    // Small delay to ensure proper rendering after orientation change
    setTimeout(() => {
        // Recalculate any dynamic heights if needed
        const activeContent = document.querySelector('.tab-content.active');
        if (activeContent) {
            activeContent.style.minHeight = 'auto';
        }
    }, 500);
});

// Prevent zoom on double-tap for better UX (optional)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Collapse any expanded project details on resize to prevent layout issues
    const expandedDetails = document.querySelectorAll('.project-details.expanded');
    const isMobile = window.innerWidth <= 480;
    
    if (!isMobile && expandedDetails.length > 0) {
        expandedDetails.forEach(detail => {
            const button = detail.previousElementSibling;
            if (button && button.classList.contains('read-more-btn')) {
                // Reset to collapsed state on desktop
                detail.classList.remove('expanded');
                button.textContent = 'Read More ✨';
                button.style.background = 'linear-gradient(135deg, #2dd4bf 0%, #a855f7 100%)';
            }
        });
    }
});