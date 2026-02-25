const initCounter = () => {
    const counters = document.querySelectorAll('.counter__content__title');

    const duration = 2000; // duración en milisegundos (2 segundos)

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = '+';
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * target);

            counter.innerText = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.innerText = target + suffix;
            }
        };

        requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

}
