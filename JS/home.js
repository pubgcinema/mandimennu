document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    } else {
        console.error('Navbar not found');
    }

    // Slideshow functionality
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) {
        console.error('Slideshow element not found');
        return;
    }

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    console.log('Slideshow element:', slideshow);
    console.log('Slides found:', slides.length);

    if (slides.length === 0) {
        console.error('No slides found');
        return;
    }

    // Check if images are loaded
    const imageLoaded = (slide) => {
        return new Promise((resolve) => {
            if (slide.complete && slide.naturalHeight !== 0) {
                resolve(true);
            } else {
                slide.addEventListener('load', () => resolve(true));
                slide.addEventListener('error', () => resolve(false));
            }
        });
    };

    // Initialize first slide after images load
    const initSlideshow = async () => {
        for (const slide of slides) {
            const loaded = await imageLoaded(slide);
            if (!loaded) {
                console.warn('Image failed to load:', slide.src);
                slide.style.display = 'none'; // Hide broken images
            }
        }
        slides[currentSlide].classList.add('active');
    };

    initSlideshow().catch((error) => console.error('Slideshow init error:', error));

    // Function to go to the next slide
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        console.log('Transition to slide:', currentSlide);
    }

    // Function to go to the previous slide
    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        console.log('Transition to slide:', currentSlide);
    }

    // Automatic slideshow
    let interval = setInterval(nextSlide, 3000); // Changed to 3000

    // Add navigation buttons (if they are missing from your HTML, add them here or directly in HTML)
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('slideshow-nav', 'next');
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Prev';
    prevButton.classList.add('slideshow-nav', 'prev');

    slideshow.appendChild(prevButton);
    slideshow.appendChild(nextButton);

    // Button event listeners
    nextButton.addEventListener('click', () => {
        clearInterval(interval);
        nextSlide();
        interval = setInterval(nextSlide, 3000); // Changed to 3000
    });

    prevButton.addEventListener('click', () => {
        clearInterval(interval);
        prevSlide();
        interval = setInterval(nextSlide, 3000); // Changed to 3000 (NOTE: was nextSlide, should be prevSlide if you want it to restart with prev)
                                                // Correction: This should still be nextSlide to continue auto-play
    });

    // Pause slideshow on hover
    slideshow.addEventListener('mouseenter', () => clearInterval(interval));
    slideshow.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 3000); // Changed to 3000
    });

    // Clean up interval on slideshow removal
    slideshow.addEventListener('remove', () => clearInterval(interval));
});