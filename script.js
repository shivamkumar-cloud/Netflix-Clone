// Netflix India Exact Clone JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initEmailForms();
    initFAQ();
    initLanguageSelectors();
    initSignInButton();
    initVideos();
    
    // Show cookie notice after delay (will implement improvements later)
    setTimeout(initCookieNotice, 3000);
});

// Email Form Handling
function initEmailForms() {
    const forms = document.querySelectorAll('.email-form');
    
    forms.forEach((form, index) => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, index === 0 ? 'top' : 'bottom');
        });
    });
}

function handleFormSubmission(form, location) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Netflix-style validation
    if (validateEmail(email)) {
        // Netflix would redirect to signup page with email parameter
        // For clone, we'll show a success message
        showNotification('Welcome! Redirecting to signup...', 'success');
        
        // In real Netflix, this would be:
        // window.location.href = `https://www.netflix.com/signup/registration?email=${encodeURIComponent(email)}`;
        
        // For demo purposes, clear the form
        setTimeout(() => {
            emailInput.value = '';
        }, 1000);
    } else {
        // Show error state
        emailInput.classList.add('error');
        showNotification('Please enter a valid email address.', 'error');
        
        setTimeout(() => {
            emailInput.classList.remove('error');
        }, 3000);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ items (Netflix behavior)
            document.querySelectorAll('.faq-answer.active').forEach(activeAnswer => {
                if (activeAnswer !== answer) {
                    activeAnswer.classList.remove('active');
                    const activeIcon = activeAnswer.parentElement.querySelector('.faq-question i');
                    if (activeIcon) {
                        activeIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current item
            if (!isActive) {
                answer.classList.add('active');
                icon.style.transform = 'rotate(45deg)';
                this.setAttribute('aria-expanded', 'true');
            } else {
                answer.classList.remove('active');
                icon.style.transform = 'rotate(0deg)';
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Language Selectors
function initLanguageSelectors() {
    const languageSelectors = document.querySelectorAll('.language-dropdown');
    
    languageSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            
            // In real Netflix, this would change the language
            // For clone, we'll just show a message
            if (selectedLanguage === 'hi') {
                showNotification('भाषा हिन्दी में बदल गई है (Language changed to Hindi)', 'info');
            } else {
                showNotification('Language changed to English', 'info');
            }
            
            // Update both selectors to stay in sync
            languageSelectors.forEach(s => {
                if (s !== this) {
                    s.value = selectedLanguage;
                }
            });
            
            // Store preference
            localStorage.setItem('netflixLanguage', selectedLanguage);
        });
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('netflixLanguage');
    if (savedLanguage) {
        languageSelectors.forEach(selector => {
            selector.value = savedLanguage;
        });
    }
}

// Sign In Button
function initSignInButton() {
    const signInButton = document.querySelector('.signin-button');
    
    if (signInButton) {
        signInButton.addEventListener('click', function(e) {
            // Netflix redirects to login page
            // For clone, we'll show a message
            e.preventDefault();
            showNotification('Redirecting to Netflix sign in...', 'info');
            
            // In real implementation:
            // window.location.href = 'https://www.netflix.com/in/login';
        });
    }
}

// Video Autoplay (Netflix style)
function initVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Ensure videos are muted and loop (Netflix autoplay policy)
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Attempt to play (Netflix autoplays videos)
        video.play().catch(error => {
            console.log('Autoplay prevented:', error);
            // Netflix would show a play button overlay here
        });
    });
}

// Cookie Notice (Placeholder for improvements)
function initCookieNotice() {
    // This is where we'll implement the improved cookie notice
    // For now, it remains hidden as per the original Netflix page
    const cookieNotice = document.getElementById('cookieNotice');
    
    // Check if user has already made a choice
    const cookiePreference = localStorage.getItem('netflixCookiePreference');
    
    if (!cookiePreference) {
        // In improvements, we'll show a better cookie notice here
        // cookieNotice.style.display = 'block';
    }
}

// Notification System (Netflix-style toasts)
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.netflix-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `netflix-notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'error' ? '#e50914' : type === 'success' ? '#2d2d2d' : '#2d2d2d'};
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        animation: netflixSlideIn 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes netflixSlideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes netflixFadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds (Netflix notification duration)
    setTimeout(() => {
        notification.style.animation = 'netflixFadeOut 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// Error state for email input
const style = document.createElement('style');
style.textContent = `
    .email-input.error {
        border-color: #e50914 !important;
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Handle browser resize (Netflix responsive behavior)
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Netflix may adjust layout on resize
        // For clone, we ensure videos maintain aspect ratio
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.style.width = '100%';
            video.style.height = '100%';
        });
    }, 250);
});

// Add loading state for videos (Netflix preloads content)
window.addEventListener('load', function() {
    // Simulate Netflix's content loading
    const loadingElements = document.querySelectorAll('.loading-placeholder');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
});

// Export functions for improvement phase
window.netflixClone = {
    validateEmail,
    showNotification,
    initCookieNotice
};