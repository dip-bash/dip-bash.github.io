// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HEADER, SCROLL PROGRESS & CANVAS HIDING ---
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('progress-bar');
    const starCanvas = document.getElementById('star-canvas'); // Get canvas
    const heroSection = document.getElementById('hero');     // Get hero section
    
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

        // Show/Hide Star Canvas based on scroll
        if (starCanvas && heroSection) {
            const heroBottom = heroSection.offsetHeight;
            // Hide canvas just before it scrolls off-screen
            if (window.scrollY > (heroBottom - 50)) { 
                starCanvas.style.opacity = '0';
                starCanvas.style.pointerEvents = 'none'; // Disable mouse interaction when hidden
            } else {
                starCanvas.style.opacity = '1';
                starCanvas.style.pointerEvents = 'auto';
            }
        }
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

    // Apply fade-in to sections and specific elements
    document.querySelectorAll('.section-container, .project-card, .achievement-card, .skills-grid span, .form-group').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- 4. THEME (LIGHT/DARK MODE) TOGGLE ---
    const themeToggle = document.getElementById('checkbox');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            themeToggle.checked = true;
        }
    } else {
        // Default to dark mode if no theme saved
        document.body.classList.remove('light-mode');
        themeToggle.checked = false;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.removeItem('theme'); // Remove theme to default to dark
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

}); // End of DOMContentLoaded Listener


// --- 7. STAR PARTICLE EFFECT CODE ---
// Placed outside DOMContentLoaded as it runs immediately

const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8;

const canvas = document.querySelector( '#star-canvas' ),
      context = canvas.getContext( '2d' );

let scale = 1,
    width,
    height;

let stars = [];

let pointerX,
    pointerY;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

// Only run if canvas exists
if (canvas) {
    // Add CSS for opacity transition
    canvas.style.transition = 'opacity 0.5s ease-out';

    generate();
    resize();
    step(); // Start the animation loop

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onMouseLeave);
    document.addEventListener('mouseleave', onMouseLeave);
}


function generate() {
    stars = [];
    for( let i = 0; i < STAR_COUNT; i++ ) {
     stars.push({
       x: 0,
       y: 0,
       z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
     });
    }
}

function placeStar( star ) {
    if (!width || !height) return;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
}

function recycleStar( star ) {
    if (!width || !height) return;
    let direction = 'z';
    let vx = Math.abs( velocity.x ),
        vy = Math.abs( velocity.y );

    if( vx > 1 || vy > 1 ) {
     let axis;

     if( vx > vy ) {
       axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
     }
     else {
       axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
     }

     if( axis === 'h' ) {
       direction = velocity.x > 0 ? 'l' : 'r';
     }
     else {
       direction = velocity.y > 0 ? 't' : 'b';
     }
    }
    
    star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

    if( direction === 'z' ) {
     star.z = 0.1;
     star.x = Math.random() * width;
     star.y = Math.random() * height;
    }
    else if( direction === 'l' ) {
     star.x = -OVERFLOW_THRESHOLD;
     star.y = height * Math.random();
    }
    else if( direction === 'r' ) {
     star.x = width + OVERFLOW_THRESHOLD;
     star.y = height * Math.random();
    }
    else if( direction === 't' ) {
     star.x = width * Math.random();
     star.y = -OVERFLOW_THRESHOLD;
    }
    else if( direction === 'b' ) {
     star.x = width * Math.random();
     star.y = height + OVERFLOW_THRESHOLD;
    }
}

function resize() {
    scale = window.devicePixelRatio || 1;
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    if (canvas) {
        canvas.width = width;
        canvas.height = height;
        stars.forEach( placeStar );
    }
}

function step() {
    if (!canvas || !context) return;

    context.clearRect( 0, 0, width, height );

    update();
    render();

    requestAnimationFrame( step );
}

function update() {
    if (!width || !height) return;

    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    // --- YOUR CHANGE: Set acceleration to 0 ---
    velocity.x += ( velocity.tx - velocity.x ) * 0.0;
    velocity.y += ( velocity.ty - velocity.y ) * 0.0;

    stars.forEach( ( star ) => {

     star.x += velocity.x * star.z;
     star.y += velocity.y * star.z;

     star.x += ( star.x - width/2 ) * velocity.z * star.z;
     star.y += ( star.y - height/2 ) * velocity.z * star.z;
     star.z += velocity.z;
     
     if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD ) {
       recycleStar( star );
     }

    } );
}

function render() {
    if (!context) return;

    stars.forEach( ( star ) => {

     context.beginPath();
     context.lineCap = 'round';
     context.lineWidth = STAR_SIZE * star.z * scale;
     context.globalAlpha = 0.5 + 0.5*Math.random();
     context.strokeStyle = STAR_COLOR;

     context.beginPath();
     context.moveTo( star.x, star.y );

     var tailX = velocity.x * 2,
         tailY = velocity.y * 2;

     if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
     if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

     context.lineTo( star.x + tailX, star.y + tailY );

     context.stroke();

    } );
}

function movePointer( x, y ) {
    if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {

     let ox = x - pointerX,
         oy = y - pointerY;

     // --- YOUR CHANGE: Set mouse sensitivity to 150 ---
     velocity.tx = velocity.tx + ( ox / 150*scale ) * ( touchInput ? 1 : -1 );
     velocity.ty = velocity.ty + ( oy / 150*scale ) * ( touchInput ? 1 : -1 );
    }

    pointerX = x;
    pointerY = y;
}

function onMouseMove( event ) {
    touchInput = false;
    movePointer( event.clientX, event.clientY );
}

function onTouchMove( event ) {
    touchInput = true;
    if (event.touches && event.touches.length > 0) {
        movePointer( event.touches[0].clientX, event.touches[0].clientY, true );
        event.preventDefault();
    }
}

function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}
