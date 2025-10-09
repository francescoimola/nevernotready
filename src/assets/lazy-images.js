// Small lazy image helper
// - Adds loading="lazy" and decoding="async"
// - Moves real src to data-src to avoid immediately fetching third-party images
// - Uses IntersectionObserver to swap in data-src when image is near viewport
// - For browsers without IntersectionObserver, fall back to eager loading

(function () {
  'use strict';

  function init() {
    const imgs = document.querySelectorAll('img[data-src]');
    if (!imgs.length) return;

    const setAttrs = (img) => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      img.classList.add('lazy-image');
    };

    imgs.forEach(setAttrs);

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          const onLoad = () => {
            img.classList.remove('image-placeholder');
            img.classList.add('lazy-loaded');
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
          };

          const onError = () => {
            img.classList.add('lazy-error');
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
          };

          img.addEventListener('load', onLoad);
          img.addEventListener('error', onError);

          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;

          observer.unobserve(img);
        }
        });
      }, { rootMargin: '200px 0px' });

      imgs.forEach(img => io.observe(img));
    } else {
      // Fallback: load all images and attach load/error handlers
      imgs.forEach(img => {
        const onLoad = () => {
          img.classList.remove('image-placeholder');
          img.classList.add('lazy-loaded');
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
        };

        const onError = () => {
          img.classList.add('lazy-error');
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
        };

        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);

        img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      });
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
