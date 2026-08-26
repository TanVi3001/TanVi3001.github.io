(() => {
  const body = document.body;
  const page = body.dataset.page;
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');

  const updateActiveLink = () => {
    const isAboutHash = page === 'home' && window.location.hash === '#about';
    document.querySelectorAll('[data-page-link]').forEach((link) => {
      const key = link.dataset.pageLink;
      const current = isAboutHash ? key === 'about' : key === page;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
