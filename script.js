// StreamFlow - Interactive Streaming Platform
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroSection();
    initContentCarousels();
    initSearch();
    initNotifications();
    initUserProfile();
    initVideoPlayer();
    initWatchParties();
    initQuickActions();
    initLoading();
    initAnimations();
    
    // Load initial data
    loadContinueWatching();
    loadTrendingContent();
    loadRecommendations();
    loadWatchParties();
    loadNewReleases();
});

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Hero Section
function initHeroSection() {
    const hero = document.querySelector('.hero');
    const playBtn = document.querySelector('.btn-play');
    const progressFill = document.querySelector('.progress-fill');
    
    // Auto-play progress animation
    let progress = 0;
    setInterval(() => {
        if (progress < 100) {
            progress += 0.1;
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
        }
    }, 1000);
    
    // Play button click
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            document.querySelector('.video-modal').style.display = 'flex';
        });
    }
    
    // Volume button toggle
    const volumeBtn = document.querySelector('.volume-btn');
    if (volumeBtn) {
        volumeBtn.addEventListener('click', () => {
            const icon = volumeBtn.querySelector('i');
            if (icon.classList.contains('fa-volume-up')) {
                icon.classList.replace('fa-volume-up', 'fa-volume-mute');
            } else {
                icon.classList.replace('fa-volume-mute', 'fa-volume-up');
            }
        });
    }
}

// Content Carousels
function initContentCarousels() {
    // Make carousels draggable
    const carousels = document.querySelectorAll('.content-carousel');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchResults.innerHTML) {
            searchResults.style.display = 'block';
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    function performSearch(query) {
        // Simulated search results
        const mockResults = [
            { title: 'Cyberpunk 2077: Edgerunners', type: 'Movie', year: 2023 },
            { title: 'Stranger Worlds', type: 'Series', year: 2022 },
            { title: 'The Last Frontier', type: 'Movie', year: 2023 },
            { title: 'Digital Dreams', type: 'Documentary', year: 2023 },
            { title: 'Neo Tokyo', type: 'Anime', year: 2022 }
        ];
        
        const filteredResults = mockResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredResults.length > 0) {
            searchResults.innerHTML = filteredResults.map(item => `
                <div class="search-result-item">
                    <div>
                        <strong>${item.title}</strong>
                        <small>${item.type} • ${item.year}</small>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.style.display = 'block';
        }
        
        // Add click handlers to results
        searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                searchInput.value = filteredResults[index].title;
                searchResults.style.display = 'none';
                // In a real app, this would navigate to the content page
                alert(`Opening: ${filteredResults[index].title}`);
            });
        });
    }
}

// Notifications
function initNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (notificationBell && notificationDropdown) {
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.style.display = 
                notificationDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            notificationDropdown.style.display = 'none';
        });
    }
}

// User Profile
function initUserProfile() {
    const userProfile = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (userProfile && profileDropdown) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.style.display = 
                profileDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            profileDropdown.style.display = 'none';
        });
    }
}

// Video Player
function initVideoPlayer() {
    const videoModal = document.querySelector('.video-modal');
    const closeModal = document.querySelector('.close-modal');
    const playBtns = document.querySelectorAll('.btn-play, .action-btn.play');
    
    // Open modal
    playBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Video controls
    const videoControls = {
        play: document.querySelector('.control-btn .fa-play'),
        volume: document.querySelector('.control-btn .fa-volume-up'),
        progress: document.querySelector('.progress-container .progress-bar')
    };
    
    if (videoControls.play) {
        videoControls.play.addEventListener('click', function() {
            if (this.classList.contains('fa-play')) {
                this.classList.replace('fa-play', 'fa-pause');
            } else {
                this.classList.replace('fa-pause', 'fa-play');
            }
        });
    }
}

// Watch Parties
function initWatchParties() {
    const watchPartyBtn = document.querySelector('.watch-party-btn');
    const createPartyBtn = document.querySelector('.btn-create-party');
    const partyModal = document.querySelector('.party-modal');
    const closeParty = document.querySelector('.close-party');
    
    // Open party modal
    if (watchPartyBtn) {
        watchPartyBtn.addEventListener('click', () => {
            partyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (createPartyBtn) {
        createPartyBtn.addEventListener('click', () => {
            partyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close party modal
    if (closeParty) {
        closeParty.addEventListener('click', () => {
            partyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    partyModal.addEventListener('click', (e) => {
        if (e.target === partyModal) {
            partyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Invite buttons
    document.querySelectorAll('.invite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('invited')) {
                this.textContent = 'Invited';
                this.classList.add('invited');
                this.disabled = true;
                
                // Show success message
                showToast('Invitation sent successfully!', 'success');
            }
        });
    });
}

// Quick Actions
function initQuickActions() {
    const quickBtns = document.querySelectorAll('.quick-btn');
    
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            
            // Add bounce effect
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Handle different actions
            if (action.includes('fa-plus')) {
                showToast('Added to your list!', 'success');
            } else if (action.includes('fa-download')) {
                showToast('Download started...', 'info');
            } else if (action.includes('fa-hd')) {
                showToast('Quality settings opened', 'info');
            } else if (action.includes('fa-closed-captioning')) {
                showToast('Subtitle options opened', 'info');
            }
        });
    });
}

// Loading
function initLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Show loading overlay initially
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    document.querySelectorAll('.content-section, .feature-card, .genre-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .content-section,
        .feature-card,
        .genre-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

// Data Loading Functions
function loadContinueWatching() {
    const container = document.getElementById('continue-watching');
    if (!container) return;
    
    const data = [
        { id: 1, title: 'Cyberpunk 2077', progress: 65, episode: 'E5', time: '45m left' },
        { id: 2, title: 'Stranger Worlds', progress: 30, episode: 'S2 E3', time: '1h 20m left' },
        { id: 3, title: 'The Last Frontier', progress: 85, episode: 'Movie', time: '15m left' },
        { id: 4, title: 'Digital Dreams', progress: 45, episode: 'E2', time: '30m left' },
        { id: 5, title: 'Neo Tokyo', progress: 10, episode: 'S1 E8', time: '22m left' }
    ];
    
    container.innerHTML = data.map(item => `
        <div class="content-card" data-id="${item.id}">
            <div class="card-image">
                <div class="card-progress" style="width: ${item.progress}%"></div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">
                    <span>${item.episode}</span>
                    <span>•</span>
                    <span>${item.time}</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn play" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="action-btn" title="More Info">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button class="action-btn" title="Remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadTrendingContent() {
    const container = document.getElementById('trending-content');
    if (!container) return;
    
    const data = [
        { id: 1, title: 'Cyberpunk 2077', year: 2023, rating: 8.7, type: 'Movie' },
        { id: 2, title: 'Stranger Worlds', year: 2022, rating: 8.9, type: 'Series' },
        { id: 3, title: 'The Last Frontier', year: 2023, rating: 7.8, type: 'Movie' },
        { id: 4, title: 'Digital Dreams', year: 2023, rating: 8.2, type: 'Documentary' },
        { id: 5, title: 'Neo Tokyo', year: 2022, rating: 9.1, type: 'Anime' },
        { id: 6, title: 'Cosmic Odyssey', year: 2023, rating: 8.5, type: 'Series' }
    ];
    
    container.innerHTML = data.map(item => `
        <div class="content-card" data-id="${item.id}">
            <div class="card-image"></div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">
                    <span>${item.year}</span>
                    <span>•</span>
                    <span>${item.type}</span>
                    <span>•</span>
                    <span><i class="fas fa-star"></i> ${item.rating}</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn play" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="action-btn" title="Add to List">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadRecommendations() {
    const container = document.getElementById('recommendations');
    if (!container) return;
    
    const data = [
        { id: 1, title: 'AI Revolution', match: 95, reason: 'Based on your watch history' },
        { id: 2, title: 'Virtual Reality', match: 88, reason: 'Similar to Cyberpunk 2077' },
        { id: 3, title: 'Future Cities', match: 92, reason: 'Trending in your area' },
        { id: 4, title: 'Robot Uprising', match: 85, reason: 'Because you watched AI Revolution' }
    ];
    
    container.innerHTML = data.map(item => `
        <div class="content-card" data-id="${item.id}">
            <div class="card-image">
                <div class="match-badge">${item.match}% Match</div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-reason">${item.reason}</p>
                <div class="card-actions">
                    <button class="action-btn play" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="action-btn" title="More Info">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadWatchParties() {
    const container = document.getElementById('watch-parties');
    if (!container) return;
    
    const data = [
        { id: 1, host: 'Emma Wilson', movie: 'Cyberpunk 2077', viewers: 12, time: '8:00 PM' },
        { id: 2, host: 'Mike Chen', movie: 'Stranger Worlds', viewers: 8, time: '9:30 PM' },
        { id: 3, host: 'Sarah Johnson', movie: 'The Last Frontier', viewers: 15, time: '10:00 PM' }
    ];
    
    container.innerHTML = data.map(item => `
        <div class="party-card" data-id="${item.id}">
            <div class="party-host">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${item.host}" alt="${item.host}">
                <div class="party-info">
                    <h4>${item.host}'s Party</h4>
                    <p>Watching ${item.movie}</p>
                </div>
            </div>
            <div class="party-movie">
                <div class="movie-poster"></div>
                <div>
                    <h5>${item.movie}</h5>
                    <p>Starts at ${item.time}</p>
                </div>
            </div>
            <div class="party-stats">
                <div class="party-stat">
                    <i class="fas fa-users"></i>
                    <span>${item.viewers} watching</span>
                </div>
                <div class="party-stat">
                    <i class="fas fa-clock"></i>
                    <span>Live Now</span>
                </div>
            </div>
            <button class="party-join">Join Party</button>
        </div>
    `).join('');
}

function loadNewReleases() {
    const container = document.getElementById('new-releases');
    if (!container) return;
    
    const data = [
        { id: 1, title: 'Quantum Leap', date: 'Today', type: 'Series', new: true },
        { id: 2, title: 'Digital Frontier', date: '2 days ago', type: 'Movie', new: true },
        { id: 3, title: 'Future Shock', date: '3 days ago', type: 'Documentary', new: false },
        { id: 4, title: 'AI Awakening', date: '5 days ago', type: 'Movie', new: false },
        { id: 5, title: 'Cyber City', date: '1 week ago', type: 'Series', new: false },
        { id: 6, title: 'Virtual Realms', date: '2 weeks ago', type: 'Movie', new: false }
    ];
    
    container.innerHTML = data.map(item => `
        <div class="content-card" data-id="${item.id}">
            <div class="card-image">
                ${item.new ? '<div class="new-badge">NEW</div>' : ''}
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">
                    <span>${item.type}</span>
                    <span>•</span>
                    <span>${item.date}</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn play" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="action-btn" title="Add to List">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Utility Functions
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Add styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 100px;
                right: 30px;
                background: var(--dark-light);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10000;
                animation: slideIn 0.3s ease-out, slideOut 0.3s ease-out 2.7s forwards;
                border-left: 4px solid var(--primary);
                box-shadow: var(--shadow);
            }
            .toast-success { border-left-color: var(--success); }
            .toast-info { border-left-color: var(--secondary); }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// Add event listeners for dynamic content
document.addEventListener('click', function(e) {
    // Play buttons
    if (e.target.closest('.action-btn.play') || e.target.classList.contains('play')) {
        const card = e.target.closest('.content-card');
        if (card) {
            const title = card.querySelector('.card-title')?.textContent;
            showToast(`Playing: ${title}`, 'info');
            document.querySelector('.video-modal').style.display = 'flex';
        }
    }
    
    // Add to list buttons
    if (e.target.closest('.action-btn .fa-plus') || e.target.classList.contains('fa-plus')) {
        const card = e.target.closest('.content-card');
        if (card) {
            const title = card.querySelector('.card-title')?.textContent;
            showToast(`Added "${title}" to your list`, 'success');
        }
    }
    
    // Join party buttons
    if (e.target.closest('.party-join')) {
        const partyCard = e.target.closest('.party-card');
        if (partyCard) {
            const host = partyCard.querySelector('h4')?.textContent;
            showToast(`Joining ${host}'s watch party...`, 'info');
        }
    }
    
    // Filter buttons
    if (e.target.closest('.filter-btn')) {
        const buttons = e.target.closest('.trending-filters, .release-filters');
        if (buttons) {
            buttons.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.closest('.filter-btn').classList.add('active');
            showToast('Filter applied', 'info');
        }
    }
    
    // Mood selector
    if (e.target.closest('#mood-select')) {
        const mood = e.target.value;
        showToast(`Showing ${mood} recommendations`, 'info');
    }
    
    // Genre cards
    if (e.target.closest('.genre-card')) {
        const genre = e.target.closest('.genre-card').getAttribute('data-genre');
        showToast(`Opening ${genre} category`, 'info');
    }
});

// Real-time updates simulation
setInterval(() => {
    // Update viewer counts randomly
    document.querySelectorAll('.party-stat .fa-users').forEach(icon => {
        const span = icon.nextElementSibling;
        if (span) {
            const current = parseInt(span.textContent);
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newCount = Math.max(1, current + change);
            span.textContent = `${newCount} watching`;
        }
    });
    
    // Update notification count randomly
    const notificationCount = document.querySelector('.notification-count');
    if (notificationCount) {
        const current = parseInt(notificationCount.textContent);
        if (Math.random() > 0.7) { // 30% chance
            const newCount = Math.min(99, current + 1);
            notificationCount.textContent = newCount;
            notificationCount.style.animation = 'none';
            setTimeout(() => {
                notificationCount.style.animation = 'pulse 0.5s';
            }, 10);
        }
    }
}, 10000); // Update every 10 seconds