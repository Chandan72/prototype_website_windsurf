// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeHeroDemo();
    initializeScrollEffects();
    initializeFormHandling();
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
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
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hero Demo Animation
function initializeHeroDemo() {
    const demoCards = document.querySelectorAll('.demo-card');
    let currentStep = 0;
    
    function animateDemo() {
        // Remove active class from all cards
        demoCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to current card
        if (demoCards[currentStep]) {
            demoCards[currentStep].classList.add('active');
        }
        
        // Move to next step
        currentStep = (currentStep + 1) % demoCards.length;
    }
    
    // Start animation
    if (demoCards.length > 0) {
        setInterval(animateDemo, 2000);
    }
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.tier-card, .challenge-item, .solution-item, .stat');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // (Parallax effect removed – previously caused layout shift on scroll)
    // Smooth scrolling handled via CSS scroll-behavior and in-page link logic.

    
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter Animation
function animateCounter(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
    const suffix = text.replace(/[0-9.,]/g, '');
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue;
        if (number >= 1000000) {
            displayValue = (current / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            displayValue = (current / 1000).toFixed(1) + 'K';
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = displayValue + suffix.replace(/[KM]/g, '');
    }, duration / steps);
}

// Modal Functions
function openConsultationModal(service = '') {
    const modal = document.getElementById('consultationModal');
    const serviceSelect = document.getElementById('service');
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Pre-select service if provided
        if (service && serviceSelect) {
            serviceSelect.value = service;
        }
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeConsultationModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('consultationModal');
    if (event.target === modal) {
        closeConsultationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeConsultationModal();
    }
});

// Form Handling
function initializeFormHandling() {
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    const submitButton = event.target.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        console.log('Form submitted:', data);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        event.target.reset();
        
        // Close modal
        setTimeout(() => {
            closeConsultationModal();
        }, 2000);
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
        ">
            <strong>Success!</strong> We'll contact you within 24 hours.
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ROI Calculator (Interactive Demo)
function initializeROICalculator() {
    const calculator = document.querySelector('.roi-calculator');
    if (!calculator) return;
    
    const inputs = calculator.querySelectorAll('input[type="range"]');
    const results = calculator.querySelector('.roi-results');
    
    inputs.forEach(input => {
        input.addEventListener('input', calculateROI);
    });
    
    function calculateROI() {
        const employees = parseInt(document.getElementById('employees-slider')?.value || 50);
        const hourlyRate = parseInt(document.getElementById('hourly-rate-slider')?.value || 50);
        const hoursPerWeek = parseInt(document.getElementById('hours-slider')?.value || 10);
        
        const weeklySavings = employees * hourlyRate * hoursPerWeek * 0.7; // 70% efficiency gain
        const monthlySavings = weeklySavings * 4.33;
        const yearlySavings = monthlySavings * 12;
        
        if (results) {
            results.innerHTML = `
                <div class="roi-result">
                    <span class="roi-label">Monthly Savings:</span>
                    <span class="roi-value">$${monthlySavings.toLocaleString()}</span>
                </div>
                <div class="roi-result">
                    <span class="roi-label">Yearly Savings:</span>
                    <span class="roi-value">$${yearlySavings.toLocaleString()}</span>
                </div>
                <div class="roi-result highlight">
                    <span class="roi-label">3-Year ROI:</span>
                    <span class="roi-value">${Math.round((yearlySavings * 3) / 50000 * 100)}%</span>
                </div>
            `;
        }
    }
    
    // Initial calculation
    calculateROI();
}

// Testimonial Carousel
function initializeTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;
    
    const testimonials = carousel.querySelectorAll('.testimonial');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
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
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'styles.css',
        // Add other critical resources
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .success-message {
        animation: slideInRight 0.3s ease-out;
    }
    
    .demo-card.active {
        animation: pulse 2s ease-in-out;
    }
`;
document.head.appendChild(style);
