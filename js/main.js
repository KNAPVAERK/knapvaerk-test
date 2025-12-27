/* =========================
   HERO FADE-IN (PAGE LOAD)
   ========================= */

window.addEventListener('DOMContentLoaded', () => {
  const heroLogo = document.querySelector('.hero img');

  if (heroLogo) {
    heroLogo.style.opacity = 0;
    heroLogo.style.transform = 'translateY(20px)';
    heroLogo.style.transition = 'opacity 1s ease, transform 1s ease';

    requestAnimationFrame(() => {
      heroLogo.style.opacity = 1;
      heroLogo.style.transform = 'translateY(0)';
    });
  }
});


/* =========================
   SCROLL-LOGIK (ÉN SANHED)
   ========================= */

const sections = document.querySelectorAll('.hero, .section');
const faders = document.querySelectorAll('.fade-in');
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('#main-nav a');

let lastScroll = 0;
let ticking = false;

function onScroll() {
  const scrollY = window.pageYOffset;

  /* --- NAV: SKJUL / VIS --- */
  if (scrollY > lastScroll && scrollY > 120) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = scrollY;

  /* --- ACTIVE STATE --- */
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(
        `#main-nav a[href="#${id}"]`
      );
      if (activeLink) activeLink.classList.add('active');
    }
  });

  /* --- FADE-IN --- */
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
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
   SMOOTH SCROLL (NAV)
   ========================= */

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* =========================
   KONTAKTFORMULAR - TAK FOR HENVENDELSEN
   ========================= */

const form = document.getElementById('contact-form');
const thankYou = document.getElementById('thank-you-message');

if (form && thankYou) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.style.display = 'none';
        thankYou.style.display = 'block';
        // subtil fade-in
        thankYou.style.opacity = 0;
        thankYou.style.transition = 'opacity 0.8s ease';
        requestAnimationFrame(() => { thankYou.style.opacity = 1; });
      } else {
        alert('Noget gik galt. Prøv igen.');
      }
    } catch (error) {
      alert('Noget gik galt. Prøv igen.');
    }
  });
}