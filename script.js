/* ================================
   MASTER PROMPT JAVASCRIPT
   High-End Editorial Portfolio Effects
   ================================ */

// Initialize all effects on page load
document.addEventListener('DOMContentLoaded', () => {
    initProjectPopups();
    initSmoothScroll();
    initScrollAnimations();
    initWaterRipple();
});

/* ================================
   WATER RIPPLE EFFECT
   ================================ */

function initWaterRipple() {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const gravity = 0.1;
    const damping = 0.98;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = (Math.random() - 0.5) * 4 - 2;
            this.life = 1;
        }

        update() {
            this.vy += gravity;
            this.vx *= damping;
            this.vy *= damping;
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.01;
        }

        draw() {
            const opacity = this.life * 0.3;
            ctx.fillStyle = `rgba(241, 235, 225, ${opacity})`;
            ctx.fillRect(this.x, this.y, 2, 2);
        }
    }

    // Create ripples on mouse move (subtle effect)
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ================================
   PROJECT POPUP HANDLER
   Glassmorphic Click-Based Popups
   ================================ */

function initProjectPopups() {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close all other popups first
            document.querySelectorAll('.project-popup').forEach(p => {
                p.style.display = 'none';
                p.style.visibility = 'hidden';
                p.style.opacity = '0';
                p.style.pointerEvents = 'none';
            });
            // Open the clicked project's popup
            const popup = this.querySelector('.project-popup');
            if (popup) {
                popup.style.display = 'block';
                popup.style.visibility = 'visible';
                popup.style.opacity = '1';
                popup.style.pointerEvents = 'auto';
                // Keep scrolling enabled - allow user to scroll with popup open
            }
        });
    });

    // Close popup on close button
    const closeButtons = document.querySelectorAll('.popup-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const popup = this.closest('.project-popup');
            if (popup) {
                popup.style.display = 'none';
                popup.style.visibility = 'hidden';
                popup.style.opacity = '0';
                popup.style.pointerEvents = 'none';
            }
        });
    });

    // Close popup when clicking outside (on backdrop)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup-backdrop')) {
            const popups = document.querySelectorAll('.project-popup');
            popups.forEach(popup => {
                popup.style.display = 'none';
                popup.style.visibility = 'hidden';
                popup.style.opacity = '0';
                popup.style.pointerEvents = 'none';
            });
        }
    });

    // Prevent closing when clicking inside popup
    const popups = document.querySelectorAll('.project-popup');
    popups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

/* ================================
   SMOOTH SCROLL NAVIGATION
   ================================ */

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/* ================================
   SCROLL ANIMATIONS
   Fade in sections on scroll
   ================================ */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ================================
   HOVER EFFECTS - 3D TILT
   ================================ */

function initHoverEffects() {
    const sketchFrame = document.querySelector('.sketch-frame');
    if (!sketchFrame) return;

    sketchFrame.addEventListener('mousemove', (e) => {
        const rect = sketchFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        sketchFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    sketchFrame.addEventListener('mouseleave', () => {
        sketchFrame.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Initialize hover effects after DOM load
document.addEventListener('DOMContentLoaded', initHoverEffects);

/* ================================
   RESPONSIVE CANVAS HANDLING
   ================================ */

window.addEventListener('resize', () => {
    // Handle any canvas resizing if needed
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (canvas.id !== 'backgroundCanvas') {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    });
});

/* ================================
   UTILITY: Log Page Load
   ================================ */

console.log('Portfolio initialized - Master Prompt Design');
console.log('Features: Glassmorphic UI, Water Ripple Effects, Smooth Navigation');
