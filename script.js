// StreamFlow - Premium Streaming Platform JavaScript
class StreamFlow {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        this.initNavigation();
        this.initHeroSection();
        this.initContent();
        this.initSearch();
        this.initNotifications();
        this.initUserProfile();
        this.initVideoPlayer();
        this.initWatchParties();
        this.initQuickActions();
        this.initToasts();
        this.initLoading();
        this.initScrollAnimations();
        
        // Load initial data
        this.loadContinueWatching();
        this.loadTrendingContent();
        this.loadRecommendations();
        this.loadWatchParties();
        this.loadNewReleases();
        
        // Simulate loading
        setTimeout(() => {
            this.hideLoading();
        }, 1500);
    }

    // ===== NAVIGATION =====
    initNavigation() {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('show');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileNav.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });

        // Active nav link highlighting
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                if (mobileNav.classList.contains('show')) {
                    mobileNav.classList.remove('show');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });

        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        const searchContainer = document.querySelector('.search-container');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                searchContainer.classList.toggle('active');
                if (searchContainer.classList.contains('active')) {
                    document.querySelector('.search-input').focus();
                }
            });
        }

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }

    // ===== HERO SECTION =====
    initHeroSection() {
        const hero = document.querySelector('.hero');
        const playBtn = document.querySelector('.btn-play');
        const progressFill = document.querySelector('.progress-fill');
        
        // Simulate progress
        let progress = 35;
        const progressInterval = setInterval(() => {
            if (progress < 100) {
                progress += 0.1;
                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                    
                    // Update time display
                    const currentTime = document.querySelector('.time-current');
                    if (currentTime) {
                        const totalSeconds = 114 * 60; // 1:54:00 in seconds
                        const currentSeconds = Math.floor(totalSeconds * (progress / 100));
                        const minutes = Math.floor(currentSeconds / 60);
                        const seconds = currentSeconds % 60;
                        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                    }
                }
            } else {
                clearInterval(progressInterval);
            }
        }, 1000);

        // Volume toggle
        const volumeBtn = document.querySelector('.volume-btn');
        if (volumeBtn) {
            volumeBtn.addEventListener('click', () => {
                const icon = volumeBtn.querySelector('i');
                if (icon.classList.contains('fa-volume-up')) {
                    icon.classList.replace('fa-volume-up', 'fa-volume-mute');
                    this.showToast('Volume muted', 'info');
                } else {
                    icon.classList.replace('fa-volume-mute', 'fa-volume-up');
                    this.showToast('Volume unmuted', 'info');
                }
            });
        }

        // Subtitle toggle
        const subtitleBtn = document.querySelector('.subtitle-btn');
        if (subtitleBtn) {
            subtitleBtn.addEventListener('click', () => {
                this.showToast('Subtitles toggled', 'info');
            });
        }

        // Quality toggle
        const qualityBtn = document.querySelector('.quality-btn');
        if (qualityBtn) {
            qualityBtn.addEventListener('click', () => {
                this.showToast('Quality settings opened', 'info');
            });
        }

        // Play button opens video modal
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.openVideoModal();
            });
        }

        // Info button
        const infoBtn = document.querySelector('.btn-info');
        if (infoBtn) {
            infoBtn.addEventListener('click', () => {
                this.showToast('Opening movie details...', 'info');
            });
        }

        // Trailer button
        const trailerBtn = document.querySelector('.btn-trailer');
        if (trailerBtn) {
            trailerBtn.addEventListener('click', () => {
                this.showToast('Playing trailer...', 'info');
            });
        }

        // Add to list button
        const addBtn = document.querySelector('.btn-add');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showToast('Added to My List', 'success');
            });
        }
    }

    // ===== CONTENT MANAGEMENT =====
    initContent() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons in the same group
                const parent = btn.closest('.trending-filters, .release-filters');
                if (parent) {
                    parent.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                }
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Filter content based on selection
                const filter = btn.dataset.filter;
                this.filterContent(filter);
                
                this.showToast(`Showing ${filter} content`, 'info');
            });
        });

        // Mood selector
        const moodSelect = document.querySelector('.mood-select');
        if (moodSelect) {
            moodSelect.addEventListener('change', (e) => {
                const mood = e.target.value;
                this.filterRecommendations(mood);
                this.showToast(`Showing ${mood} recommendations`, 'info');
            });
        }

        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.showToast(`Opening ${category} category...`, 'info');
            });
        });

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

            // Touch support
            carousel.addEventListener('touchstart', (e) => {
                isDown = true;
                startX = e.touches[0].pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });

            carousel.addEventListener('touchend', () => {
                isDown = false;
            });

            carousel.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.touches[0].pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
        });
    }

    // ===== SEARCH =====
    initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchInput || !searchResults) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.innerHTML = '';
            }
        });
    }

    performSearch(query) {
        const searchResults = document.querySelector('.search-results');
        
        // Mock search results
        const mockResults = [
            { id: 1, title: 'Cyberpunk Edgerunners', type: 'Movie', year: 2023, rating: 8.7 },
            { id: 2, title: 'Stranger Worlds', type: 'Series', year: 2022, rating: 8.9 },
            { id: 3, title: 'The Last Frontier', type: 'Movie', year: 2023, rating: 7.8 },
            { id: 4, title: 'Digital Dreams', type: 'Documentary', year: 2023, rating: 8.2 },
            { id: 5, title: 'Neo Tokyo', type: 'Anime', year: 2022, rating: 9.1 },
            { id: 6, title: 'Cosmic Odyssey', type: 'Series', year: 2023, rating: 8.5 }
        ];
        
        const filteredResults = mockResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredResults.length > 0) {
            searchResults.innerHTML = filteredResults.map(item => `
                <div class="search-result-item" data-id="${item.id}">
                    <div class="result-image" style="background: linear-gradient(45deg, #2a2a2a, #404040);"></div>
                    <div class="result-info">
                        <h4>${item.title}</h4>
                        <p>${item.type} • ${item.year} • <i class="fas fa-star"></i> ${item.rating}</p>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </div>
            `).join('');
            
            // Add click handlers
            searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.showToast(`Opening: ${filteredResults[index].title}`, 'info');
                    document.querySelector('.search-input').value = '';
                    searchResults.innerHTML = '';
                    document.querySelector('.search-container').classList.remove('active');
                });
            });
        } else {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
        }
    }

    // ===== NOTIFICATIONS =====
    initNotifications() {
        const notificationBtn = document.querySelector('.notification-btn');
        const notificationDropdown = document.querySelector('.notification-dropdown');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (notificationBtn && notificationDropdown) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('show');
                
                // Mark notifications as read
                if (notificationBadge.textContent !== '0') {
                    notificationBadge.textContent = '0';
                    document.querySelectorAll('.notification-item').forEach(item => {
                        item.classList.remove('unread');
                    });
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                notificationDropdown.classList.remove('show');
            });
            
            // Load notifications
            this.loadNotifications();
        }
    }

    loadNotifications() {
        const notificationList = document.querySelector('.notification-list');
        
        const notifications = [
            { id: 1, icon: 'fa-play-circle', title: 'New episode available', message: 'Cyberpunk Edgerunners Episode 5 is now available', time: '2 hours ago', unread: true },
            { id: 2, icon: 'fa-user-friends', title: 'Watch party invitation', message: 'Alex invited you to join a watch party', time: '5 hours ago', unread: true },
            { id: 3, icon: 'fa-trophy', title: 'Achievement unlocked', message: 'You earned the "Binge Watcher" badge', time: '1 day ago', unread: true },
            { id: 4, icon: 'fa-film', title: 'New release', message: 'Stranger Worlds Season 3 is now streaming', time: '2 days ago', unread: false },
            { id: 5, icon: 'fa-calendar', title: 'Coming soon', message: 'The Last Frontier premieres next week', time: '3 days ago', unread: false }
        ];
        
        notificationList.innerHTML = notifications.map(notif => `
            <div class="notification-item ${notif.unread ? 'unread' : ''}" data-id="${notif.id}">
                <i class="fas ${notif.icon}"></i>
                <div>
                    <h5>${notif.title}</h5>
                    <p>${notif.message}</p>
                    <small>${notif.time}</small>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        notificationList.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.remove('unread');
            });
        });
    }

    // ===== USER PROFILE =====
    initUserProfile() {
        const profileBtn = document.querySelector('.profile-btn');
        const profileDropdown = document.querySelector('.profile-dropdown');
        
        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                profileDropdown.classList.remove('show');
            });
        }
    }

    // ===== VIDEO PLAYER =====
    initVideoPlayer() {
        const videoModal = document.querySelector('.video-modal');
        const closeModal = document.querySelector('.modal-close');
        const playBtns = document.querySelectorAll('.btn-play, .card-btn.play');
        
        // Open modal
        playBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.openVideoModal();
            });
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeVideoModal();
            });
        }
        
        // Close modal when clicking outside
        videoModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeVideoModal();
            }
        });
        
        // Video controls
        this.initVideoControls();
    }

    openVideoModal() {
        const videoModal = document.querySelector('.video-modal');
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.showToast('Video player opened', 'info');
    }

    closeVideoModal() {
        const videoModal = document.querySelector('.video-modal');
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.showToast('Video player closed', 'info');
    }

    initVideoControls() {
        const playPauseBtn = document.querySelector('.play-pause');
        const progressContainer = document.querySelector('.progress-container');
        const progressBar = document.querySelector('.progress-container .progress-bar');
        const volumeBtn = document.querySelector('.video-control.volume');
        const fullscreenBtn = document.querySelector('.video-control.fullscreen');
        const currentTime = document.querySelector('.current-time');
        
        // Play/Pause toggle
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                const icon = playPauseBtn.querySelector('i');
                if (icon.classList.contains('fa-play')) {
                    icon.classList.replace('fa-play', 'fa-pause');
                    this.showToast('Playing', 'info');
                } else {
                    icon.classList.replace('fa-pause', 'fa-play');
                    this.showToast('Paused', 'info');
                }
            });
        }
        
        // Volume toggle
        if (volumeBtn) {
            volumeBtn.addEventListener('click', () => {
                const icon = volumeBtn.querySelector('i');
                if (icon.classList.contains('fa-volume-up')) {
                    icon.classList.replace('fa-volume-up', 'fa-volume-mute');
                    this.showToast('Volume muted', 'info');
                } else {
                    icon.classList.replace('fa-volume-mute', 'fa-volume-up');
                    this.showToast('Volume unmuted', 'info');
                }
            });
        }
        
        // Fullscreen toggle
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                const videoPlayer = document.querySelector('.video-player');
                if (!document.fullscreenElement) {
                    videoPlayer.requestFullscreen().catch(err => {
                        console.log(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                    this.showToast('Fullscreen enabled', 'info');
                } else {
                    document.exitFullscreen();
                    this.showToast('Fullscreen disabled', 'info');
                }
            });
        }
        
        // Progress bar click
        if (progressContainer && progressBar) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                progressBar.style.width = `${pos * 100}%`;
                
                // Update time display
                if (currentTime) {
                    const duration = 114 * 60; // 1:54:00 in seconds
                    const currentSeconds = Math.floor(duration * pos);
                    const minutes = Math.floor(currentSeconds / 60);
                    const seconds = currentSeconds % 60;
                    currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }
            });
        }
        
        // Invite friends button
        const inviteBtn = document.querySelector('.invite-btn');
        if (inviteBtn) {
            inviteBtn.addEventListener('click', () => {
                this.showToast('Invite friends feature coming soon!', 'info');
            });
        }
    }

    // ===== WATCH PARTIES =====
    initWatchParties() {
        const createPartyBtn = document.querySelector('.create-party-btn');
        const partyModal = document.querySelector('.party-modal');
        const closePartyModal = partyModal?.querySelector('.modal-close');
        
        // Open party modal
        if (createPartyBtn) {
            createPartyBtn.addEventListener('click', () => {
                this.openPartyModal();
            });
        }
        
        // Join party buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.party-join')) {
                const partyCard = e.target.closest('.party-card');
                const partyName = partyCard?.querySelector('h4')?.textContent;
                this.showToast(`Joining ${partyName}...`, 'info');
            }
        });
        
        // Close modal
        if (closePartyModal) {
            closePartyModal.addEventListener('click', () => {
                this.closePartyModal();
            });
        }
        
        // Close modal when clicking outside
        partyModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closePartyModal();
            }
        });
        
        // Create party form
        const createPartySubmit = document.querySelector('.create-party-submit');
        if (createPartySubmit) {
            createPartySubmit.addEventListener('click', () => {
                const partyName = document.getElementById('party-name').value;
                if (partyName) {
                    this.showToast(`Watch party "${partyName}" created!`, 'success');
                    this.closePartyModal();
                } else {
                    this.showToast('Please enter a party name', 'error');
                }
            });
        }
        
        // Load party guests
        this.loadPartyGuests();
    }

    openPartyModal() {
        const partyModal = document.querySelector('.party-modal');
        partyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.showToast('Creating watch party...', 'info');
    }

    closePartyModal() {
        const partyModal = document.querySelector('.party-modal');
        partyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    loadPartyGuests() {
        const guestList = document.querySelector('.guest-list');
        
        const guests = [
            { id: 1, name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', invited: false },
            { id: 2, name: 'Mike Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', invited: false },
            { id: 3, name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', invited: true }
        ];
        
        guestList.innerHTML = guests.map(guest => `
            <div class="guest-item" data-id="${guest.id}">
                <div class="guest-info">
                    <img src="${guest.avatar}" alt="${guest.name}" class="guest-img">
                    <span>${guest.name}</span>
                </div>
                <span class="invite-status">${guest.invited ? 'Invited' : 'Invite'}</span>
            </div>
        `).join('');
        
        // Add click handlers for invite
        guestList.querySelectorAll('.guest-item').forEach((item, index) => {
            if (!guests[index].invited) {
                item.addEventListener('click', () => {
                    guests[index].invited = true;
                    item.querySelector('.invite-status').textContent = 'Invited';
                    item.querySelector('.invite-status').style.background = 'rgba(0, 255, 136, 0.1)';
                    item.querySelector('.invite-status').style.color = 'var(--success)';
                    this.showToast(`Invited ${guests[index].name}`, 'success');
                });
            }
        });
    }

    // ===== QUICK ACTIONS =====
    initQuickActions() {
        const quickActions = document.querySelectorAll('.quick-action');
        
        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const icon = action.querySelector('i').className;
                
                // Add bounce effect
                action.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    action.style.transform = 'scale(1)';
                }, 300);
                
                // Handle different actions
                if (icon.includes('fa-plus')) {
                    this.showToast('Added to My List', 'success');
                } else if (icon.includes('fa-download')) {
                    this.showToast('Download started...', 'info');
                } else if (icon.includes('fa-hd')) {
                    this.showToast('Quality settings opened', 'info');
                } else if (icon.includes('fa-closed-captioning')) {
                    this.showToast('Subtitle options opened', 'info');
                }
            });
        });
    }

    // ===== TOAST NOTIFICATIONS =====
    initToasts() {
        // Toast container is already in HTML
    }

    showToast(message, type = 'info') {
        const container = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // ===== LOADING =====
    initLoading() {
        // Loading overlay is already in HTML
    }

    hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        loadingOverlay.classList.add('hide');
        
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
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
        
        // Observe elements for animation
        document.querySelectorAll('.content-section, .feature-card, .category-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== DATA LOADING =====
    loadContinueWatching() {
        const container = document.getElementById('continue-watching');
        
        const data = [
            { id: 1, title: 'Cyberpunk Edgerunners', progress: 65, episode: 'E5', time: '45m left' },
            { id: 2, title: 'Stranger Worlds', progress: 30, episode: 'S2 E3', time: '1h 20m left' },
            { id: 3, title: 'The Last Frontier', progress: 85, episode: 'Movie', time: '15m left' },
            { id: 4, title: 'Digital Dreams', progress: 45, episode: 'E2', time: '30m left' },
            { id: 5, title: 'Neo Tokyo', progress: 10, episode: 'S1 E8', time: '22m left' },
            { id: 6, title: 'Cosmic Odyssey', progress: 50, episode: 'S3 E4', time: '1h left' }
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
                        <button class="card-btn play" title="Play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="card-btn" title="More Info">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button class="card-btn" title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        this.addCardEventListeners();
    }

    loadTrendingContent() {
        const container = document.getElementById('trending-content');
        
        const data = [
            { id: 1, title: 'Cyberpunk Edgerunners', year: 2023, rating: 8.7, type: 'Movie' },
            { id: 2, title: 'Stranger Worlds', year: 2022, rating: 8.9, type: 'Series' },
            { id: 3, title: 'The Last Frontier', year: 2023, rating: 7.8, type: 'Movie' },
            { id: 4, title: 'Digital Dreams', year: 2023, rating: 8.2, type: 'Documentary' },
            { id: 5, title: 'Neo Tokyo', year: 2022, rating: 9.1, type: 'Anime' },
            { id: 6, title: 'Cosmic Odyssey', year: 2023, rating: 8.5, type: 'Series' },
            { id: 7, title: 'AI Revolution', year: 2023, rating: 8.3, type: 'Movie' },
            { id: 8, title: 'Virtual Reality', year: 2022, rating: 7.9, type: 'Series' }
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
                        <button class="card-btn play" title="Play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="card-btn" title="Add to List">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        this.addCardEventListeners();
    }

    loadRecommendations() {
        const container = document.getElementById('recommendations');
        
        const data = [
            { id: 1, title: 'AI Revolution', match: 95, reason: 'Based on your watch history' },
            { id: 2, title: 'Virtual Reality', match: 88, reason: 'Similar to Cyberpunk Edgerunners' },
            { id: 3, title: 'Future Cities', match: 92, reason: 'Trending in your area' },
            { id: 4, title: 'Robot Uprising', match: 85, reason: 'Because you watched AI Revolution' },
            { id: 5, title: 'Digital Frontier', match: 78, reason: 'New release you might like' },
            { id: 6, title: 'Cyber Security', match: 82, reason: 'Popular in Sci-Fi category' }
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
                        <button class="card-btn play" title="Play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="card-btn" title="More Info">
                            <i class="fas fa-info-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        this.addCardEventListeners();
    }

    loadWatchParties() {
        const container = document.getElementById('watch-parties');
        
        const data = [
            { id: 1, host: 'Emma Wilson', movie: 'Cyberpunk Edgerunners', viewers: 12, time: '8:00 PM' },
            { id: 2, host: 'Mike Chen', movie: 'Stranger Worlds', viewers: 8, time: '9:30 PM' },
            { id: 3, host: 'Sarah Johnson', movie: 'The Last Frontier', viewers: 15, time: '10:00 PM' },
            { id: 4, host: 'Alex Johnson', movie: 'Digital Dreams', viewers: 6, time: '11:00 PM' }
        ];
        
        container.innerHTML = data.map(item => `
            <div class="party-card" data-id="${item.id}">
                <div class="party-header">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${item.host}" alt="${item.host}" class="party-host-img">
                    <div class="party-info">
                        <h4>${item.host}'s Party</h4>
                        <p>Watching ${item.movie}</p>
                    </div>
                </div>
                <div class="party-content">
                    <div class="content-poster"></div>
                    <div class="content-details">
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
                <button class="btn btn-primary party-join">
                    Join Party
                </button>
            </div>
        `).join('');
    }

    loadNewReleases() {
        const container = document.getElementById('new-releases');
        
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
                    ${item.new ? '<div class="match-badge">NEW</div>' : ''}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-meta">
                        <span>${item.type}</span>
                        <span>•</span>
                        <span>${item.date}</span>
                    </div>
                    <div class="card-actions">
                        <button class="card-btn play" title="Play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="card-btn" title="Add to List">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        this.addCardEventListeners();
    }

    // ===== HELPER FUNCTIONS =====
    addCardEventListeners() {
        // Play buttons
        document.querySelectorAll('.card-btn.play').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.content-card');
                const title = card.querySelector('.card-title')?.textContent;
                this.showToast(`Playing: ${title}`, 'info');
                this.openVideoModal();
            });
        });
        
        // Add to list buttons
        document.querySelectorAll('.card-btn .fa-plus').forEach(icon => {
            icon.closest('.card-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                const card = icon.closest('.content-card');
                const title = card.querySelector('.card-title')?.textContent;
                this.showToast(`Added "${title}" to My List`, 'success');
            });
        });
        
        // Info buttons
        document.querySelectorAll('.card-btn .fa-info-circle').forEach(icon => {
            icon.closest('.card-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                const card = icon.closest('.content-card');
                const title = card.querySelector('.card-title')?.textContent;
                this.showToast(`Showing details for: ${title}`, 'info');
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.card-btn .fa-times').forEach(icon => {
            icon.closest('.card-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                const card = icon.closest('.content-card');
                const title = card.querySelector('.card-title')?.textContent;
                card.style.opacity = '0.5';
                setTimeout(() => {
                    card.remove();
                }, 300);
                this.showToast(`Removed "${title}" from Continue Watching`, 'info');
            });
        });
        
        // Card click
        document.querySelectorAll('.content-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.card-btn')) {
                    const title = card.querySelector('.card-title')?.textContent;
                    this.showToast(`Opening: ${title}`, 'info');
                }
            });
        });
    }

    filterContent(filter) {
        // This would filter content based on the selected filter
        // For now, just log and show a toast
        console.log(`Filtering content by: ${filter}`);
    }

    filterRecommendations(mood) {
        // This would filter recommendations based on mood
        // For now, just log and show a toast
        console.log(`Filtering recommendations by mood: ${mood}`);
    }

    // ===== REAL-TIME UPDATES =====
    simulateRealTimeUpdates() {
        // Update viewer counts randomly
        setInterval(() => {
            document.querySelectorAll('.party-stat .fa-users').forEach(icon => {
                const span = icon.nextElementSibling;
                if (span) {
                    const current = parseInt(span.textContent);
                    const change = Math.random() > 0.5 ? 1 : -1;
                    const newCount = Math.max(1, current + change);
                    span.textContent = `${newCount} watching`;
                }
            });
            
            // Randomly add notifications
            if (Math.random() > 0.9) {
                const badge = document.querySelector('.notification-badge');
                if (badge && badge.textContent === '0') {
                    badge.textContent = '1';
                    this.showToast('New notification received', 'info');
                }
            }
        }, 10000); // Update every 10 seconds
    }
}

// Initialize StreamFlow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const streamflow = new StreamFlow();
    
    // Start real-time updates after a delay
    setTimeout(() => {
        streamflow.simulateRealTimeUpdates();
    }, 5000);
});