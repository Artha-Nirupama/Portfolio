document.addEventListener('DOMContentLoaded', () => {
            
            // --- 1. SCROLL ANIMATION (Intersection Observer) ---
            const observerOptions = {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: "0px 0px -50px 0px"
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        
                        // If it's a progress bar, animate width
                        const progressBars = entry.target.querySelectorAll('.skill-progress');
                        progressBars.forEach(bar => {
                            bar.style.width = bar.getAttribute('data-width');
                        });
                        
                        // Optional: Unobserve if you only want it to happen once
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));


            // --- 2. NAVBAR GLASS EFFECT ON SCROLL ---
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });


            // --- 3. TYPEWRITER EFFECT ---
            const textElement = document.getElementById('typewriter');
            const phrases = ["Digital Experiences", "Modern Interfaces", "Future Web Apps"];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typeSpeed = 100;

            function type() {
                const currentPhrase = phrases[phraseIndex];
                
                if (isDeleting) {
                    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    typeSpeed = 50; // Faster when deleting
                } else {
                    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    typeSpeed = 100; // Normal typing speed
                }

                if (!isDeleting && charIndex === currentPhrase.length) {
                    isDeleting = true;
                    typeSpeed = 2000; // Pause at end of word
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeSpeed = 500; // Pause before new word
                }

                setTimeout(type, typeSpeed);
            }

            // Start Typing
            setTimeout(type, 1000);


            // --- 4. CONTACT FORM HANDLING ---
            const contactForm = document.getElementById('contactForm');
            const toast = document.getElementById('custom-toast');

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent actual submission
                
                // Show custom toast
                toast.className = "show";
                
                // Clear form
                contactForm.reset();

                // Hide toast after 3 seconds
                setTimeout(() => {
                    toast.className = toast.className.replace("show", "");
                }, 3000);
            });
        });