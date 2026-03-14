document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const headerRight = document.querySelector('.header-right');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navUl.closest('nav').classList.toggle('active');
        });
    }

    // Close menu on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navUl.closest('nav').classList.remove('active');
        });
    });

    // Contact form AJAX submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtns = contactForm.querySelectorAll('button[type="submit"]');
            submitBtns.forEach(btn => {
                const isAr = btn.classList.contains('ar-content');
                btn.disabled = true;
                btn.innerHTML = isAr ? '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...' : '<i class="fas fa-spinner fa-spin"></i> Sending...';
            });
            
            formMessage.innerHTML = '';
            formMessage.className = '';

            const formData = new FormData(contactForm);

            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    formMessage.style.color = '#28a745';
                    formMessage.innerHTML = data.message;
                    contactForm.reset();
                } else {
                    formMessage.style.color = '#dc3545';
                    formMessage.innerHTML = data.message || 'Error occurred.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessage.style.color = '#dc3545';
                formMessage.innerHTML = 'An unexpected error occurred. Please try again.';
            })
            .finally(() => {
                submitBtns.forEach(btn => {
                    const isAr = btn.classList.contains('ar-content');
                    btn.disabled = false;
                    btn.innerHTML = isAr ? 'إرسال الرسالة' : 'Send Message';
                });
            });
        });
    }

    // Close menu when clicking lang-switcher inside nav
    const mobileLangBtn = document.querySelector('nav .lang-switcher-mobile');
    if (mobileLangBtn) {
        mobileLangBtn.addEventListener('click', () => {
            setTimeout(() => {
                menuToggle.classList.remove('active');
                navUl.closest('nav').classList.remove('active');
            }, 200);
        });
    }

    // Close nav when clicking outside (overlay)
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });

    // Inject Floating Contact Buttons
    const floatingContacts = document.createElement('div');
    floatingContacts.className = 'floating-contacts';
    floatingContacts.innerHTML = `
        <a href="https://wa.me/201070753168" target="_blank" class="floating-btn whatsapp" aria-label="WhatsApp">
            <i class="fab fa-whatsapp"></i>
            <span class="tooltip en-content">WhatsApp Us</span>
            <span class="tooltip ar-content">تواصل معنا واتساب</span>
        </a>
        <a href="mailto:sales@alrowad-eg.net" class="floating-btn email" aria-label="Email">
            <i class="fas fa-envelope"></i>
            <span class="tooltip en-content">Email Us</span>
            <span class="tooltip ar-content">راسلنا إيميل</span>
        </a>
    `;
    document.body.appendChild(floatingContacts);

    // Initial language check for floating tooltips
    const currentLang = document.body.classList.contains('rtl') ? 'ar' : 'en';
    updateFloatingTooltips(currentLang);
});

function updateFloatingTooltips(lang) {
    const tooltipsEn = document.querySelectorAll('.floating-btn .tooltip.en-content');
    const tooltipsAr = document.querySelectorAll('.floating-btn .tooltip.ar-content');
    
    if (lang === 'ar') {
        tooltipsEn.forEach(el => el.style.display = 'none');
        tooltipsAr.forEach(el => el.style.display = 'block');
    } else {
        tooltipsEn.forEach(el => el.style.display = 'block');
        tooltipsAr.forEach(el => el.style.display = 'none');
    }
}

function languageSwitcher(lang) {
    const body = document.body;
    const enContent = document.querySelectorAll('.en-content');
    const arContent = document.querySelectorAll('.ar-content');
    
    // If no lang provided, toggle based on current state
    if (!lang) {
        lang = body.classList.contains('rtl') ? 'en' : 'ar';
    }

    if (lang === 'ar') {
        body.classList.add('rtl');
        enContent.forEach(el => el.style.display = 'none');
        arContent.forEach(el => el.style.display = 'block');
    } else {
        body.classList.remove('rtl');
        enContent.forEach(el => {
            // Restore visibility (block or inline-block depending on element if needed, 
            // but block is safe here for our layout)
            el.style.display = 'block';
        });
        arContent.forEach(el => el.style.display = 'none');
    }

    // Update floating tooltips
    updateFloatingTooltips(lang);
}
