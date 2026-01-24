// script.js - Interactive functionality for Netflix clone

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFAQ();
    initForms();
    initCookieNotice();
    initLanguageSelectors();
});

// ====== FAQ ACCORDION ======
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Close other open FAQ items
            document.querySelectorAll('.faq-answer.active').forEach(activeAnswer => {
                if (activeAnswer !== answer) {
                    activeAnswer.classList.remove('active');
                    const activeIcon = activeAnswer.parentElement.querySelector('.faq-question i');
                    if (activeIcon) {
                        activeIcon.className = 'fas fa-plus';
                    }
                }
            });
            
            // Toggle current FAQ item
            answer.classList.toggle('active');
            
            // Change icon
            if (answer.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
}

// ====== FORM HANDLING ======
function initForms() {
    const heroForm = document.getElementById('heroForm');
    const bottomForm = document.getElementById('bottomForm');
    
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'hero');
        });
    }
    
    if (bottomForm) {
        bottomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'bottom');
        });
    }
}

function handleFormSubmission(form, formType) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        // In a real implementation, this would submit to Netflix's servers
        console.log(`Form ${formType} submitted with email: ${email}`);
        
        // Show success message
        showNotification(`Thank you! A signup link will be sent to ${email}`, 'success');
        
        // Clear form
        emailInput.value = '';
    } else {
        // Show error message
        showNotification('Please enter a valid email address.', 'error');
        emailInput.focus();
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ====== COOKIE NOTICE ======
function initCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptBtn = document.getElementById('cookieAccept');
    const customizeBtn = document.getElementById('cookieCustomize');
    
    // Check if user has already made a choice
    const cookiePreference = localStorage.getItem('netflixCookiePreference');
    
    if (!cookiePreference) {
        // Show notice after a short delay (Netflix style)
        setTimeout(() => {
            cookieNotice.classList.add('show');
        }, 1000);
    }
    
    // Accept button
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('netflixCookiePreference', 'accepted');
            cookieNotice.classList.remove('show');
            showNotification('Cookie preferences saved.', 'info');
        });
    }
    
    // Customize button
    if (customizeBtn) {
        customizeBtn.addEventListener('click', function() {
            // In a real implementation, this would open a customization modal
            const customChoice = confirm('Customize cookie preferences:\n\n1. Essential cookies (required)\n2. Performance cookies\n3. Advertising cookies\n\nSelect which categories to accept.');
            
            if (customChoice) {
                localStorage.setItem('netflixCookiePreference', 'customized');
                showNotification('Custom cookie preferences saved.', 'info');
            }
            
            cookieNotice.classList.remove('show');
        });
    }
}

// ====== LANGUAGE SELECTOR ======
function initLanguageSelectors() {
    const languageSelectors = document.querySelectorAll('.language-selector select');
    
    languageSelectors.forEach(select => {
        select.addEventListener('change', function() {
            const selectedLanguage = this.value;
            
            // In a real Netflix implementation, this would:
            // 1. Send a request to change language preference
            // 2. Reload page content in selected language
            
            console.log(`Language changed to: ${selectedLanguage}`);
            
            // Show language change confirmation
            if (selectedLanguage === 'hi') {
                showNotification('भाषा हिन्दी में बदल गई है (Language changed to Hindi)', 'info');
            } else {
                showNotification('Language changed to English', 'info');
            }
        });
    });
}

// ====== NOTIFICATION SYSTEM ======
function showNotification(message, type = 'info') {
    // Remove existing notification if present
    const existingNotification = document.querySelector('.netflix-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `netflix-notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'error' ? '#e50914' : type === 'success' ? '#2d2d2d' : '#2d2d2d'};
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// ====== SIGN IN BUTTON ======
document.querySelector('.netflix-btn-signin')?.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Redirecting to sign in page...', 'info');
    
    // Simulate redirect (in real implementation, this would be a page change)
    setTimeout(() => {
        alert('In a production environment, this would redirect to:\nhttps://www.netflix.com/in/login');
    }, 1000);
});
// Add geo-detection and redirection logic
function detectUserRegion() {
    // Get user's IP location (simplified example)
    const userInIndia = true; // Would be determined by IP lookup
    
    if (userInIndia && window.location.pathname !== '/in/') {
        // Redirect to correct regional page
        window.location.href = '/in/';
    }
    
    // Ensure all pricing shows ₹ (Indian Rupees)
    updatePricingToINR();
}
// <!-- Simplified cookie notice -->
<div class="cookie-notice-improved">
    <p>We use cookies to improve your Netflix experience. 
       <a href="#">Learn more</a>
    </p>
    <button class="accept-btn">Got it</button>
</div>
// Dynamic content loading for Trending section
async function loadTrendingContent() {
    // Fetch real trending data (using a movie API)
    const trendingData = await fetchTrendingMovies();
    
    // Populate the section with actual content
    renderTrendingGrid(trendingData);
}