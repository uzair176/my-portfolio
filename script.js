(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuBackdrop = document.querySelector('[data-menu-backdrop]');
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('[data-scroll-progress]');
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = [...new Set(navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean))];

  const updateThemeControls = () => {
    const isDark = root.dataset.theme === 'dark';
    themeToggle?.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    themeToggle?.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    if (themeMeta) themeMeta.content = isDark ? '#070c12' : '#f2f0e9';
  };

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (error) {
      // The theme still changes when storage is unavailable.
    }
    updateThemeControls();
  });

  const closeMenu = (restoreFocus = false) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.hidden = true;
    if (menuBackdrop) menuBackdrop.hidden = true;
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle?.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', `${willOpen ? 'Close' : 'Open'} navigation menu`);
    if (mobileMenu) mobileMenu.hidden = !willOpen;
    if (menuBackdrop) menuBackdrop.hidden = !willOpen;
    document.body.classList.toggle('menu-open', willOpen);
    if (willOpen) mobileMenu?.querySelector('a')?.focus();
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu(false)));
  menuBackdrop?.addEventListener('click', () => closeMenu(true));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu(true);
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });

  const updateScrollState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollRange > 0 ? Math.min(window.scrollY / scrollRange, 1) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
  updateThemeControls();
})();
