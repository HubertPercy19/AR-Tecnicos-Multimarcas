const initSlider = () => {
    const sliderContainer = document.querySelector('.slider-track');
    const next = document.querySelector('.slider-next');
    const prev = document.querySelector('.slider-prev');

    let index = 0;
    let slides;
    let autoplayInterval;
    const AUTOPLAY_TIME = 3000;

    /* 🔹 Cuántos visibles */
    function imagesPerView() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    /* 🔹 Clonado dinámico */
    function cloneSlides() {
        const originals = document.querySelectorAll('.slider-track .slides:not(.clone)');
        const perView = imagesPerView();

        // eliminar clones previos
        sliderContainer.querySelectorAll('.clone').forEach(c => c.remove());

        // clonar atrás
        for (let i = originals.length - perView; i < originals.length; i++) {
            const clone = originals[i].cloneNode(true);
            clone.classList.add('clone');
            sliderContainer.insertBefore(clone, sliderContainer.firstChild);
        }

        // clonar adelante
        for (let i = 0; i < perView; i++) {
            const clone = originals[i].cloneNode(true);
            clone.classList.add('clone');
            sliderContainer.appendChild(clone);
        }

        slides = document.querySelectorAll('.slider-track .slides');
        index = perView;
    }

    /* 🔹 Movimiento */
    function updateCarousel(animate = true) {

        const slideWidth = slides[0].getBoundingClientRect().width;

        const gap = parseFloat(
            window.getComputedStyle(sliderContainer).columnGap
        ) || 0;

        const totalWidth = slideWidth + gap;



        sliderContainer.style.transition = animate
            ? 'transform 0.4s ease'
            : 'none';

        sliderContainer.style.transform =
            `translateX(-${index * totalWidth}px)`;
    }


    /* 🔹 NEXT reutilizable */
    function goNext() {
        index++;
        updateCarousel();

        if (index === slides.length - imagesPerView()) {
            setTimeout(() => {
                index = imagesPerView();
                updateCarousel(false);
            }, 400);
        }
    }

    /* 🔹 Autoplay */
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(goNext, AUTOPLAY_TIME);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    /* 🔹 INIT */
    cloneSlides();
    updateCarousel(false);
    startAutoplay();

    /* 👉 CONTROLES */
    next.addEventListener('click', () => {
        goNext();
        startAutoplay();
    });

    prev.addEventListener('click', () => {
        index--;
        updateCarousel();

        if (index === 0) {
            setTimeout(() => {
                index = slides.length - imagesPerView() * 2;
                updateCarousel(false);
            }, 400);
        }
        startAutoplay();
    });

    /* ⏸ Pausar en hover */
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    /* 🔁 Resize */
    window.addEventListener('resize', () => {
        cloneSlides();
        updateCarousel(false);
        startAutoplay();
    });

};
