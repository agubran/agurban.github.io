// ==================== DOM READY ==================== //
document.addEventListener('DOMContentLoaded', function () {
    // Page loaded - trigger animations
    document.body.classList.add('loaded');

    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initMobileMenu();
    initScrollAnimations();
    initContactForm();
    initCounterAnimation();
    initHeroScrollFade();
});

// ==================== NAVBAR SCROLL EFFECT ==================== //
function initNavbar() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check
    updateNavbar();

    // On scroll
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

// ==================== SMOOTH SCROLL ==================== //
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                const mobileBtn = document.getElementById('mobileMenuBtn');
                if (navMenu && mobileBtn) {
                    navMenu.classList.remove('active');
                    mobileBtn.classList.remove('active');
                }
            }
        });
    });
}

// ==================== BACK TO TOP BUTTON ==================== //
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Initial check
    toggleBackToTop();

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== MOBILE MENU ==================== //
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (!mobileMenuBtn || !navMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close menu on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// ==================== SCROLL ANIMATIONS ==================== //
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Main observer for sections and animated elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.animate-stagger');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-visible');
                });
            }
        });
    }, observerOptions);

    // Add fade-in-up class to section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in-up');
        observer.observe(header);
    });

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Observe individual animated elements
    document.querySelectorAll('.animate-on-scroll, .fade-in-up, .fade-in-down, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Enhanced cards animation with alternating slide directions
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    // Apply slide-in-left to odd cards, slide-in-right to even cards (goal cards)
    document.querySelectorAll('.goal-card').forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('slide-in-left');
        } else {
            card.classList.add('slide-in-right');
        }
        card.classList.add(`stagger-${(index % 6) + 1}`);
        cardObserver.observe(card);
    });

    // Service showcase cards - alternating with stagger
    document.querySelectorAll('.service-showcase-card').forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('slide-in-right');
        } else {
            card.classList.add('slide-in-left');
        }
        card.classList.add(`stagger-${(index % 8) + 1}`);
        cardObserver.observe(card);
    });

    // Sector cards - slide in from right with stagger
    document.querySelectorAll('.sector-pro-card').forEach((card, index) => {
        card.classList.add('slide-in-right');
        card.classList.add(`stagger-${(index % 9) + 1}`);
        cardObserver.observe(card);
    });

    // Partner cards - scale in effect
    document.querySelectorAll('.partner-card').forEach((card, index) => {
        card.classList.add('scale-in');
        card.classList.add(`stagger-${index + 1}`);
        cardObserver.observe(card);
    });

    // Info cards in contact section - slide in left
    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.classList.add('slide-in-left');
        card.classList.add(`stagger-${index + 1}`);
        cardObserver.observe(card);
    });

    // Contact form - fade in up
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('fade-in-up');
        contactForm.classList.add('stagger-2');
        cardObserver.observe(contactForm);
    }

    // Vision/Mission cards - slide from opposite sides
    document.querySelectorAll('.vm-card').forEach((card, index) => {
        if (index === 0) {
            card.classList.add('slide-in-right');
        } else {
            card.classList.add('slide-in-left');
        }
        card.classList.add(`stagger-${index + 1}`);
        cardObserver.observe(card);
    });

    // Additional sector items - fade in up with stagger
    document.querySelectorAll('.additional-sector-item').forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.classList.add(`stagger-${(index % 7) + 1}`);
        cardObserver.observe(item);
    });

    // Health card special animation
    const healthCard = document.querySelector('.health-pro-card');
    if (healthCard) {
        healthCard.classList.add('scale-in');
        cardObserver.observe(healthCard);
    }

    // CTA sections
    document.querySelectorAll('.cta-content, .services-cta-new').forEach(el => {
        el.classList.add('fade-in-up');
        cardObserver.observe(el);
    });
}

// ==================== CONTACT FORM ==================== //
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Simple validation
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];

        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });

        if (!isValid) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        // Email validation
        const emailInput = this.querySelector('[name="email"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('شكراً لتواصلك معنا! سنرد عليك قريباً.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Focus effects
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.closest('.form-group').classList.add('focused');
        });
        input.addEventListener('blur', function () {
            this.closest('.form-group').classList.remove('focused');
        });
    });
}

// ==================== NOTIFICATION ==================== //
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%) translateY(-20px)',
        background: type === 'success' ? '#16a085' : '#e74c3c',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        zIndex: '10000',
        opacity: '0',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        fontSize: '1rem'
    });

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ==================== COUNTER ANIMATION ==================== //
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==================== HERO SCROLL FADE EFFECT ==================== //
function initHeroScrollFade() {
    const heroContent = document.querySelector('.hero-content');
    const heroStats = document.querySelector('.hero-stats');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero');

    if (!heroSection) return;

    let ticking = false;

    function updateHeroFade() {
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const fadeStart = 0; // Start fading immediately
        const fadeEnd = heroHeight * 0.6; // Fully faded at 60% of hero height

        // Calculate opacity based on scroll position
        let opacity = 1 - ((scrolled - fadeStart) / (fadeEnd - fadeStart));
        opacity = Math.max(0, Math.min(1, opacity)); // Clamp between 0 and 1

        // Calculate translateY for parallax effect
        const translateY = scrolled * 0.4;

        // Calculate scale for subtle zoom effect
        const scale = 1 - (scrolled * 0.0003);
        const clampedScale = Math.max(0.9, Math.min(1, scale));

        // Apply transforms to hero content
        if (heroContent) {
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${translateY}px) scale(${clampedScale})`;
        }

        // Apply transforms to hero stats with slight delay effect
        if (heroStats) {
            const statsOpacity = 1 - ((scrolled - fadeStart) / (fadeEnd * 0.8));
            const clampedStatsOpacity = Math.max(0, Math.min(1, statsOpacity));
            heroStats.style.opacity = clampedStatsOpacity;
            heroStats.style.transform = `translateY(${translateY * 0.7}px)`;
        }

        // Apply to scroll indicator with faster fade
        if (scrollIndicator) {
            const indicatorOpacity = 1 - (scrolled / (fadeEnd * 0.3));
            scrollIndicator.style.opacity = Math.max(0, Math.min(1, indicatorOpacity));
        }

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeroFade);
            ticking = true;
        }
    }

    // Initial call
    updateHeroFade();

    // On scroll with passive listener for performance
    window.addEventListener('scroll', onScroll, { passive: true });
}

// ==================== PARALLAX EFFECT ==================== //
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-bg-image');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, { passive: true });

// ==================== ACTIVE NAV LINK ==================== //
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ==================== MOBILE MENU STYLES ==================== //
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 992px) {
        .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 280px;
            height: 100vh;
            background: linear-gradient(135deg, #0a2540 0%, #0d3b5c 100%);
            flex-direction: column;
            padding: 100px 30px 30px;
            gap: 15px;
            transition: right 0.3s ease;
            box-shadow: -5px 0 30px rgba(0,0,0,0.3);
            z-index: 999;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-link {
            display: block;
            width: 100%;
            text-align: right;
            padding: 15px 20px;
            border-radius: 10px;
        }
        
        .nav-link:hover,
        .nav-link.active {
            background: rgba(255,255,255,0.1);
        }
        
        .nav-link.cta-nav {
            margin-right: 0;
            margin-top: 20px;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        body.menu-open::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 998;
        }
    }
`;
document.head.appendChild(style);

// ==================== LAZY LOAD IMAGES ==================== //
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== PRELOADER ==================== //
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});
