// Impact & Approach Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeHoverEffects();
    initializeNavbarScroll();
});

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in animations to key elements
    const animatedElements = [
        '.hero-content',
        '.section-header',
        '.spotlight-block',
        '.step-item',
        '.scenario-card',
        '.cta-content'
    ];

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });

    // Add slide animations for methodology steps
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((step, index) => {
        step.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        step.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(step);
    });
}

// Animated counters for hero stats
function initializeCounterAnimations() {
    const stats = [
        { element: document.querySelector('.stat-item:nth-child(1) .stat-number'), target: 70, suffix: '%' },
        { element: document.querySelector('.stat-item:nth-child(2) .stat-number'), target: 50, suffix: '+' },
        { element: document.querySelector('.stat-item:nth-child(3) .stat-number'), target: 3, suffix: 'x' }
    ];

    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    function animateStats() {
        stats.forEach(stat => {
            if (stat.element) {
                animateCounter(stat.element, 0, stat.target, stat.suffix, 2000);
            }
        });
    }

    function animateCounter(element, start, end, suffix, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}

// Enhanced hover effects
function initializeHoverEffects() {
    // Spotlight blocks hover effects
    const spotlightBlocks = document.querySelectorAll('.spotlight-block');
    spotlightBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Scenario cards hover effects
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Step items interactive effects
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(12px) scale(1.02)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // CTA buttons enhanced effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('primary')) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 12px 35px rgba(37, 99, 235, 0.5)';
            } else {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (this.classList.contains('primary')) {
                this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
            }
        });
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animation
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease-out';
        }
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add parallax effect to hero section
function initializeParallax() {
    const hero = document.querySelector('.hero-impact-approach');
    
    const parallaxScroll = throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }, 10);
    
    window.addEventListener('scroll', parallaxScroll);
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', initializeParallax);

// Add intersection observer for progressive loading
function initializeProgressiveLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus management for accessibility
function initializeAccessibility() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Add error handling for animations
function safeAnimate(element, animation) {
    try {
        if (element && typeof element.animate === 'function') {
            return element.animate(animation.keyframes, animation.options);
        }
    } catch (error) {
        console.warn('Animation not supported:', error);
    }
}

// Export functions for potential external use
window.ImpactApproachPage = {
    initializeScrollAnimations,
    initializeCounterAnimations,
    initializeHoverEffects,
    safeAnimate
};
