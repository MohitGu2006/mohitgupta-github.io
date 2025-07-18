
// Set default theme to dark
const body = document.body;
body.setAttribute('data-theme', 'dark');

// Add smooth scrolling for mobile if content overflows
function handleMobileLayout() {
    const container = document.querySelector('.container');
    const profileCard = document.querySelector('.profile-card');
    
    if (window.innerHeight < profileCard.offsetHeight + 100) {
        container.style.alignItems = 'flex-start';
        container.style.paddingTop = '50px';
        document.body.style.overflowY = 'auto';
    } else {
        container.style.alignItems = 'center';
        container.style.paddingTop = '20px';
        document.body.style.overflowY = 'hidden';
    }
}

// Handle window resize
window.addEventListener('resize', handleMobileLayout);
window.addEventListener('load', handleMobileLayout);

// Add click animation to social links
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .social-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add intersection observer for animations on mobile
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe social links for staggered animation
socialLinks.forEach(link => {
    observer.observe(link);
});



// Preload profile image
const profileImg = document.getElementById('profileImg');
profileImg.addEventListener('error', () => {
    // Fallback to a default avatar if image fails to load
    profileImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVhIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNTAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOCIvPgo8cGF0aCBkPSJNNzUgMjI1Qzc1IDE5MS44NjMgMTAxLjg2MyAxNjUgMTM1IDE2NUgxNjVDMTk4LjEzNyAxNjUgMjI1IDE5MS44NjMgMjI1IDIyNVYyNzVINzVWMjI1WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC44Ii8+Cjwvc3ZnPgo=';
});

// Handle email link clicks with better error handling
const emailLink = document.querySelector('.social-link.email');
if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        // For mobile devices, we might need to handle email differently
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, the mailto link should work directly
            console.log('Opening email client...');
        }
    });
}

console.log('Bio Link Website Loaded Successfully! 🎉');
