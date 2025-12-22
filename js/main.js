// FADE-IN HERO LOGO PÅ PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
  const heroLogo = document.querySelector('.hero-logo');
  heroLogo.style.opacity = 0;
  heroLogo.style.transition = 'opacity 1s ease, transform 1s ease';
  heroLogo.style.transform = 'translateY(20px)';

  setTimeout(() => {
    heroLogo.style.opacity = 1;
    heroLogo.style.transform = 'translateY(0)';
  }, 100); // lille forsinkelse for at trigge transition
});

// DYNAMISK NAV + FADE-IN SEKTIONER
let lastScroll = 0;
const nav = document.querySelector('.site-nav');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Nav skjul/vis
  if (currentScroll > lastScroll) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  lastScroll = currentScroll;

  // Fade-in sektioner
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      sec.classList.add('visible');
    }
  });
});

// Smooth scroll for nav links
document.querySelectorAll('.site-nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
