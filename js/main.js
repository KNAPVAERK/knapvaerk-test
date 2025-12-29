/* =========================
   HERO FADE-IN
   ========================= */
window.addEventListener('DOMContentLoaded', () => {
  const heroLogo = document.querySelector('.hero img');
  if (heroLogo) heroLogo.classList.add('visible');
});

/* =========================
   SCROLL-LOGIK
   ========================= */
const sections = document.querySelectorAll('.hero, .section');
const faders = document.querySelectorAll('.fade-in');
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('#main-nav a');

let lastScroll = 0;
let ticking = false;

function onScroll() {
  const scrollY = window.pageYOffset;

  // NAV: skjul/vis
  nav.style.transform = (scrollY > lastScroll && scrollY > 120) ? 'translateY(-100%)' : 'translateY(0)';
  lastScroll = scrollY;

  // ACTIVE STATE
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`#main-nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  // FADE-IN
  faders.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
});

/* =========================
   SMOOTH SCROLL NAV
   ========================= */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* =========================
   KONTAKTFORMULAR - FEJL & SUCCES
   ========================= */
const form = document.getElementById('contact-form');
const formError = document.getElementById('form-error-message');
const thankYou = document.getElementById('thank-you-message');

function showMessage(el, delay = 4000) {
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), delay);
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  formError.classList.remove('visible');
  formError.textContent = '';
  thankYou.classList.remove('visible');

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.style.display = 'none';
      showMessage(thankYou);
    } else {
      formError.textContent = "Noget gik galt. Prøv venligst igen.";
      showMessage(formError);
    }
  } catch (err) {
    formError.textContent = "Noget gik galt. Prøv venligst igen.";
    showMessage(formError);
  }
});