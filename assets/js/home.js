document.addEventListener('DOMContentLoaded', function() {
    const banners = document.querySelectorAll('#theme-main-banner'); // Select all elements with this ID
    const totalSlides = 3;

    banners.forEach((banner) => {
        let currentSlide = 0;
        const slides = banner.querySelectorAll('.slide'); // Select slides within each banner

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active'); 
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides; // Cycle through slides
            showSlide(currentSlide);
        }

        setInterval(nextSlide, 5000); // Change slide every 5 seconds
        showSlide(currentSlide);
    });
});
