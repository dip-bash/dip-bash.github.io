// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HEADER & SCROLL PROGRESS ---
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        // Header blur effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll progress bar
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });

    // --- 2. MOBILE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- 3. FADE-IN ANIMATION ON SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    document.querySelectorAll('.section-container, .timeline-item').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // --- 4. THEME (LIGHT/DARK MODE) TOGGLE ---
    const themeToggle = document.getElementById('checkbox');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', null); // Or 'dark-mode'
        }
    });

    // --- 5. CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send form data to a server
        // For this demo, we'll just show an alert.
        alert('Thank you for your message! (This is a demo)');
        contactForm.reset();
    });

    // --- 6. TSPARTICLES - FLOATING PARTICLES EFFECT ---
    if (window.tsParticles) {
        tsParticles.load({
            id: "particle-container",
            options: {
                background: {
                    color: {
                        value: "transparent"
                    }
                },
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                        }
                    },
                    color: {
                        value: "#555"
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                    },
                    size: {
                        value: 2,
                        random: true,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        outModes: "out"
                    }
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse"
                        },
                    }
                },
                detectRetina: true
            }
        });
    }

});
