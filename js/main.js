// HERO fade-in
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  hero.classList.add('visible'); // CSS transition

  // Fade-in billeder ved load hvis de allerede er i viewport
  const faders = document.querySelectorAll('.fade-in, .image-stack img');
  faders.forEach(fader => {
    const rect = fader.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      fader.classList.add('visible');
    }
  });
});

// DYNAMISK NAV + FADE-IN SEKTIONER
let lastScroll = 0;
const nav = document.getElementById('main-nav');
const sections = document.querySelectorAll('.section');
const faders = document.querySelectorAll('.fade-in, .image-stack img');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Nav skjul/vis
  if (currentScroll > lastScroll) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;

  // Fade-in sektioner
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) sec.classList.add('visible');
  });

  // Fade-in billeder
  faders.forEach(fader => {
    const rect = fader.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) fader.classList.add('visible');
  });
});

// Smooth scroll for nav links
document.querySelectorAll('#main-nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
