(() => {
  const lightbox = document.querySelector('#gallery-lightbox');
  const items = [...document.querySelectorAll('[data-gallery-index]')];
  if (!lightbox || items.length === 0) return;

  const image = lightbox.querySelector('#lightbox-image');
  const caption = lightbox.querySelector('#lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const previousButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');
  let currentIndex = 0;
  let lastFocused;

  const render = () => {
    const item = items[currentIndex];
    const thumbnail = item.querySelector('img');
    image.src = thumbnail.currentSrc || thumbnail.src;
    image.alt = thumbnail.alt;
    caption.textContent = `${item.dataset.category} / ${item.dataset.caption}`;
  };

  const open = (index) => {
    currentIndex = index;
    lastFocused = items[index];
    render();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    closeButton.focus();
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    lastFocused?.focus();
  };

  const move = (step) => {
    currentIndex = (currentIndex + step + items.length) % items.length;
    render();
  };

  items.forEach((item, index) => item.addEventListener('click', () => open(index)));
  closeButton.addEventListener('click', close);
  previousButton.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) close(); });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
})();
