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
});

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
}
