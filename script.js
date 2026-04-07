/* ─── Theme toggle + image swap ─── */
(function () {
  const html       = document.documentElement;
  const btn        = document.getElementById('theme-toggle');
  const heroIcon   = document.getElementById('hero-icon');
  const navIcon    = document.querySelector('.nav-icon');
  const footerIcon = document.querySelector('.footer-icon');
  const screenshot = document.querySelector('.screenshot-img');

  const IMAGES = {
    dark:  { icon: 'assets/icon-dark.png',       screenshot: 'assets/screenshot-dark.png' },
    light: { icon: 'assets/icon.png',             screenshot: 'assets/screenshot.png'      },
  };

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const imgs = IMAGES[theme];
    if (heroIcon)   heroIcon.src   = imgs.icon;
    if (navIcon)    navIcon.src    = imgs.icon;
    if (footerIcon) footerIcon.src = imgs.icon;
    if (screenshot) screenshot.src = imgs.screenshot;
  }

  // Load saved preference; default to 'light'
  const saved = localStorage.getItem('swiftmtp-theme') || 'light';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('swiftmtp-theme', next);
    applyTheme(next);
  });
})();

/* ─── Nav scroll shadow ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 16);
});

/* ─── Reveal on scroll ─── */
const reveals = document.querySelectorAll(
  '.feature-card, .step, .section-header, .hero-text, .hero-visual, .table-wrap, .cta-block'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el, i) => {
  el.classList.add('reveal');
  // stagger feature cards
  if (el.classList.contains('feature-card')) {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
  }
  observer.observe(el);
});

/* ─── Active nav link highlight ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text-primary)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => sectionObserver.observe(s));
