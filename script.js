// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const searchBtn = document.querySelector('.search-btn');
const closeSearch = document.querySelector('.close-search');
const searchOverlay = document.querySelector('.search-overlay');
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');
const heroIndicators = document.querySelectorAll('.indicator');
const heroSlides = document.querySelectorAll('.hero-slide');
const contentGrids = document.querySelectorAll('.content-grid');

// Sample data for content
const contentData = {
    continueWatching: [
        { id: 1, title: "The Crown Jewel", type: "Movie", rating: 8.7, duration: "2h 15m", progress: 65 },
        { id: 2, title: "Cyber Hunt", type: "Series", rating: 8.9, duration: "45m", progress: 40 },
        { id: 3, title: "Midnight Express", type: "Movie", rating: 7.8, duration: "1h 52m", progress: 80 },
        { id: 4, title: "Dark Secrets", type: "Series", rating: 9.1, duration: "50m", progress: 20 },
        { id: 5, title: "The Last Frontier", type: "Movie", rating: 8.3, duration: "2h 30m", progress: 55 },
        { id: 6, title: "Parallel Worlds", type: "Series", rating: 8.5, duration: "48m", progress: 70 }
    ],
    movies: [
        { id: 1, title: "Infinity War", year: 2023, rating: 8.9, duration: "2h 29m", genre: "Action, Sci-Fi" },
        { id: 2, title: "Echoes of Time", year: 2024, rating: 8.7, duration: "2h 05m", genre: "Thriller, Mystery" },
        { id: 3, title: "Ocean's Depth", year: 2023, rating: 7.8, duration: "1h 58m", genre: "Adventure, Drama" },
        { id: 4, title: "The Silent Guardian", year: 2024, rating: 8.5, duration: "2h 12m", genre: "Action, Drama" },
        { id: 5, title: "Midnight in Paris", year: 2023, rating: 8.2, duration: "1h 52m", genre: "Romance, Drama" },
        { id: 6, title: "Quantum Leap", year: 2024, rating: 8.8, duration: "2h 20m", genre: "Sci-Fi, Action" }
    ],
    series: [
        { id: 1, title: "Stranger Things", season: 4, rating: 8.7, episodes: 9, genre: "Sci-Fi, Horror" },
        { id: 2, title: "The Crown", season: 6, rating: 8.6, episodes: 10, genre: "Drama, History" },
        { id: 3, title: "Money Heist", season: 5, rating: 8.3, episodes: 10, genre: "Crime, Drama" },
        { id: 4, title: "Breaking Bad", season: 5, rating: 9.5, episodes: 62, genre: "Crime, Drama" },
        { id: 5, title: "The Witcher", season: 3, rating: 8.2, episodes: 8, genre: "Fantasy, Action" },
        { id: 6, title: "Dark", season: 3, rating: 8.8, episodes: 26, genre: "Sci-Fi, Mystery" }
    ],
    kdramas: [
        { id: 1, title: "Crash Landing on You", year: 2019, rating: 8.7, episodes: 16, genre: "Romance, Comedy" },
        { id: 2, title: "Squid Game", year: 2021, rating: 8.0, episodes: 9, genre: "Thriller, Drama" },
        { id: 3, title: "Goblin", year: 2016, rating: 8.6, episodes: 16, genre: "Fantasy, Romance" },
        { id: 4, title: "Vincenzo", year: 2021, rating: 8.4, episodes: 20, genre: "Crime, Comedy" },
        { id: 5, title: "Itaewon Class", year: 2020, rating: 8.2, episodes: 16, genre: "Drama" },
        { id: 6, title: "Mr. Sunshine", year: 2018, rating: 8.7, episodes: 24, genre: "Historical, Romance" }
    ]
};

// Generate random image URLs for content cards
const getRandomImage = (type, id) => {
    const baseUrl = "https://images.unsplash.com/photo-";
    const movieImages = [
        "1536440136628-849c177e76a1",
        "1489599809516-9827f5d1d5e1",
        "1626814029239-8f6aac3c8f8a",
        "1595769812727-8c4c138b6b8a",
        "1535016120720-40c646be5580",
        "1534447677764-84193e1ffb8e"
    ];
    const seriesImages = [
        "1558618661-5b83363e0c27",
        "1598899134739-24c46f58b8c0",
        "1517604931442-7f0d9238da5a",
        "1531259683007-016a7b628fc3",
        "1536440136628-849c177e76a1",
        "1496024840828-d6b6c2d6e4a9"
    ];
    const kdramaImages = [
        "1520223297779-95d01f6c48a5",
        "1518709268805-4e9042af2176",
        "1533630559537-8d2b3e4a6b2a",
        "1551029506-0807df4e2031",
        "1520223297779-95d01f6c48a5",
        "1518709268805-4e9042af2176"
    ];
    
    if (type === "movie") {
        return `${baseUrl}${movieImages[id % movieImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
    } else if (type === "series") {
        return `${baseUrl}${seriesImages[id % seriesImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
    } else {
        return `${baseUrl}${kdramaImages[id % kdramaImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;
    }
};

// Create content cards
const createContentCard = (item, type) => {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.dataset.id = item.id;
    
    let imageUrl, subtitle;
    
    if (type === 'continue') {
        imageUrl = getRandomImage('movie', item.id);
        subtitle = `${item.type} • ${item.duration}`;
    } else if (type === 'movie') {
        imageUrl = getRandomImage('movie', item.id);
        subtitle = `${item.year} • ${item.genre}`;
    } else if (type === 'series') {
        imageUrl = getRandomImage('series', item.id);
        subtitle = `Season ${item.season} • ${item.episodes} episodes`;
    } else if (type === 'kdrama') {
        imageUrl = getRandomImage('kdrama', item.id);
        subtitle = `${item.year} • ${item.episodes} episodes`;
    }
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${item.title}" class="card-image">
        <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <div class="card-meta">
                <span><i class="fas fa-star"></i> ${item.rating}</span>
                <span>${subtitle}</span>
            </div>
        </div>
        <button class="card-play"><i class="fas fa-play"></i></button>
    `;
    
    // Add progress bar for continue watching
    if (type === 'continue') {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.position = 'absolute';
        progressBar.style.bottom = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '100%';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = '#2a2a3e';
        
        const progressFill = document.createElement('div');
        progressFill.style.width = `${item.progress}%`;
        progressFill.style.height = '100%';
        progressFill.style.backgroundColor = '#00a8ff';
        
        progressBar.appendChild(progressFill);
        card.appendChild(progressBar);
    }
    
    return card;
};

// Populate content grids
const populateContentGrids = () => {
    // Continue watching
    const continueGrid = document.querySelector('.content-grid:first-of-type');
    contentData.continueWatching.forEach(item => {
        continueGrid.appendChild(createContentCard(item, 'continue'));
    });
    
    // Movies
    const moviesGrid = document.getElementById('movies-grid');
    contentData.movies.forEach(item => {
        moviesGrid.appendChild(createContentCard(item, 'movie'));
    });
    
    // Series
    const seriesGrid = document.getElementById('series-grid');
    contentData.series.forEach(item => {
        seriesGrid.appendChild(createContentCard(item, 'series'));
    });
    
    // K-Dramas
    const kdramaGrid = document.getElementById('kdrama-grid');
    contentData.kdramas.forEach(item => {
        kdramaGrid.appendChild(createContentCard(item, 'kdrama'));
    });
};

// Hero Slider Functionality
let currentSlide = 0;

const showSlide = (slideIndex) => {
    // Hide all slides
    heroSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all indicators
    heroIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show the selected slide
    heroSlides[slideIndex].classList.add('active');
    heroIndicators[slideIndex].classList.add('active');
    currentSlide = slideIndex;
};

const nextSlide = () => {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= heroSlides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
};

const prevSlide = () => {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
        prevIndex = heroSlides.length - 1;
    }
    showSlide(prevIndex);
};

// Set up event listeners for hero slider
heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-advance hero slider
let slideInterval = setInterval(nextSlide, 5000);

// Reset interval when user interacts with slider
const resetSlideInterval = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
};

// Event Listeners
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchOverlay.style.display = 'flex';
    document.querySelector('.search-input').focus();
});

closeSearch.addEventListener('click', () => {
    searchOverlay.style.display = 'none';
});

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.style.display = 'none';
    }
});

// Suggestion tags click event
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelector('.search-input').value = tag.textContent;
    });
});

// Hero slider controls
heroNext.addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
});

heroPrev.addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
});

// Card play button click events
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-play') || e.target.closest('.card-play')) {
        const card = e.target.closest('.content-card');
        const title = card.querySelector('.card-title').textContent;
        alert(`Now playing: ${title}`);
    }
    
    // Watch live button
    if (e.target.classList.contains('btn-watch-live') || e.target.closest('.btn-watch-live')) {
        const card = e.target.closest('.live-card');
        const eventTitle = card.querySelector('h3').textContent;
        alert(`Starting live stream: ${eventTitle}`);
    }
    
    // Play hero button
    if (e.target.classList.contains('btn-play') || e.target.closest('.btn-play')) {
        alert('Starting playback of "The Last Stand"');
    }
});

// App download buttons
document.querySelectorAll('.app-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const store = btn.querySelector('i').classList.contains('fa-apple') ? 'App Store' : 'Google Play';
        alert(`Redirecting to ${store} to download FlexNet app`);
    });
});

// Notification button
document.querySelector('.notify-btn').addEventListener('click', () => {
    alert('You have 3 new notifications');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Create additional hero slides
    const hero = document.querySelector('.hero');
    
    const slideData = [
        { title: "AVENGERS: ENDGAME", subtitle: "THE BIGGEST MOVIE OF THE YEAR", description: "The grave course of events set in motion by Thanos that wiped out half the universe and fractured the Avengers ranks compels the remaining Avengers to take one final stand." },
        { title: "STRANGER THINGS", subtitle: "SEASON 5 NOW STREAMING", description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl." },
        { title: "IPL 2024", subtitle: "LIVE CRICKET ACTION", description: "Watch the most exciting cricket tournament live. Catch all the matches, highlights, and exclusive content only on FlexNet." }
    ];
    
    // Add additional slides
    for (let i = 1; i < 4; i++) {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${getRandomImage('movie', i)})`;
        
        slide.innerHTML = `
            <div class="hero-content">
                <h2 class="hero-title">${slideData[i-1].subtitle}</h2>
                <h1 class="hero-main-title">${slideData[i-1].title}</h1>
                <p class="hero-description">${slideData[i-1].description}</p>
                <div class="hero-actions">
                    <button class="btn-play"><i class="fas fa-play"></i> Play Now</button>
                    <button class="btn-info"><i class="fas fa-info-circle"></i> More Info</button>
                </div>
                <div class="hero-meta">
                    <span><i class="fas fa-star"></i> ${8 + i/10}/10</span>
                    <span><i class="fas fa-clock"></i> ${i === 2 ? '45m' : '2h 30m'}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${2023 + i}</span>
                    <span class="age-rating">${i === 2 ? 'TV-14' : 'PG-13'}</span>
                </div>
            </div>
            <div class="hero-gradient"></div>
        `;
        
        hero.insertBefore(slide, hero.querySelector('.hero-controls'));
    }
    
    // Update hero slides reference
    const allHeroSlides = document.querySelectorAll('.hero-slide');
    
    // Populate content
    populateContentGrids();
    
    // Show first slide
    showSlide(0);
    
    // Add keyboard navigation for search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.style.display === 'flex') {
            searchOverlay.style.display = 'none';
        }
        
        if (e.key === 'Enter' && document.activeElement === document.querySelector('.search-input')) {
            const query = document.querySelector('.search-input').value;
            if (query.trim()) {
                alert(`Searching for: ${query}`);
                searchOverlay.style.display = 'none';
            }
        }
    });
});