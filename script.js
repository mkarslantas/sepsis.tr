// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and content sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .content-card, .info-item, .requirement-item');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Mobile menu toggle (for future enhancement)
const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '☰';
navToggle.style.display = 'none';
navToggle.style.fontSize = '1.5rem';
navToggle.style.background = 'none';
navToggle.style.border = 'none';
navToggle.style.cursor = 'pointer';
navToggle.style.color = 'var(--primary-color)';

// Show menu toggle on mobile
if (window.innerWidth <= 768) {
    const headerContent = document.querySelector('.header-content');
    const nav = document.querySelector('.nav');

    if (headerContent && nav) {
        headerContent.insertBefore(navToggle, nav);
        navToggle.style.display = 'block';

        navToggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
        });

        // Initially hide nav on mobile
        nav.style.display = 'none';
        nav.style.flexDirection = 'column';
        nav.style.width = '100%';
        nav.style.marginTop = '1rem';
    }
}

// Resize handler
window.addEventListener('resize', () => {
    const nav = document.querySelector('.nav');

    if (window.innerWidth > 768) {
        navToggle.style.display = 'none';
        if (nav) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
            nav.style.width = 'auto';
            nav.style.marginTop = '0';
        }
    } else {
        navToggle.style.display = 'block';
        if (nav) {
            nav.style.display = 'none';
        }
    }
});

// Log page load
console.log('TURK-SOFA2 website loaded successfully');
