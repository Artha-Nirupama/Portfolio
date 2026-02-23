document.addEventListener('DOMContentLoaded', () => {

// --- 1. CUSTOM CURSOR ---
const cursorDot = document.createElement("div");
const cursorOutline = document.createElement("div");

cursorDot.classList.add("cursor-dot");
cursorOutline.classList.add("cursor-outline");
document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

const links = document.querySelectorAll('a, button, .portfolio-item');
links.forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// --- 2. REVEAL ANIMATION (Observer) ---
const revealObserverOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate Progress Bars
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// --- 3. TYPEWRITER EFFECT ---
const textElement = document.getElementById('typewriter');
if(textElement) {
    const phrases = ["Digital Experiences", "Modern Interfaces", "Future Web Apps"];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;
    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--; typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++; typeSpeed = 100;
        }
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true; typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);
}


// --- 4. FULL PAGE SCROLL (Smart Scroll) ---
const sections = document.querySelectorAll(".block");
let currentSection = 0;
let isScrolling = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { isScrolling = false; }, 1000);
}

window.addEventListener("wheel", function (e) {
    if (isScrolling) return;

    // CRITICAL FIX: Allow scrolling inside tables
    // If the mouse is hovering over a table, do NOT hijack scroll
    if (e.target.closest('.table-responsive')) return;

    if (e.deltaY > 0) {
        currentSection++;
    } else {
        currentSection--;
    }
    scrollToSection(currentSection);
}, { passive: true });

document.addEventListener("keydown", function (e) {
    if (isScrolling) return;
    if (e.key === "ArrowDown") {
        e.preventDefault(); currentSection++; scrollToSection(currentSection);
    }
    if (e.key === "ArrowUp") {
        e.preventDefault(); currentSection--; scrollToSection(currentSection);
    }
});


// --- 5. FORM VALIDATION & HANDLING ---
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('custom-toast');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        if (!contactForm.checkValidity()) {
            e.preventDefault(); e.stopPropagation();
            contactForm.classList.add('was-validated');
        } else {
            e.preventDefault();
            toast.className = "show";
            contactForm.reset();
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
            contactForm.classList.remove('was-validated');
        }
    });
}

// --- 6. NAVBAR GLASS EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
});