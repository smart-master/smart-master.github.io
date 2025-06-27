document.addEventListener('DOMContentLoaded', () => {
      const parallaxElements = document.querySelectorAll('.parallax-bg');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', onScroll);
          } else {
            window.removeEventListener('scroll', onScroll);
          }
        });
      });

      parallaxElements.forEach(el => observer.observe(el));

      function onScroll() {
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.4;
          const offset = window.pageYOffset;
          el.style.transform = `translateY(${offset * speed}px)`;
        });
      }
    });