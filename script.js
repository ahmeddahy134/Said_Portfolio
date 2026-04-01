// ============================
// Cursor Glow (Desktop + Mobile)
// ============================
const cursorGlow = document.querySelector('.cursor-glow');

function moveCursor(e) {
    if (!cursorGlow) return;

    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
}

// Desktop
document.addEventListener('mousemove', moveCursor);

// Mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
        moveCursor(e.touches[0]);
    }
});


// ============================
// Theme Switching
// ============================
const themeSwitch = document.getElementById('theme-switch');

if (themeSwitch) {
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeSwitch.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeSwitch?.querySelector('i');
    if (!icon) return;

    icon.setAttribute('data-lucide', theme === 'light' ? 'sun' : 'moon');

    if (window.lucide) {
        lucide.createIcons();
    }
}


// ============================
// Scroll Reveal Animation
// ============================
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}


// ============================
// Navbar Scroll Effect
// ============================
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}


// ============================
// Mobile Menu Toggle
// ============================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


// ============================
// Portfolio Modal (Lightbox)
// ============================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');
const portfolioItems = document.querySelectorAll('.portfolio-item img');
const closeBtn = document.querySelector('.close');

portfolioItems.forEach(img => {
    img.addEventListener('click', function () {
        if (!modal || !modalImg || !captionText) return;

        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = "none";
    });
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// ============================
// Smooth Scrolling
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});


// ============================
// Init Lucide Icons
// ============================
window.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
});
