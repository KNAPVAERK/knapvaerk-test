
/* =========================
   HERO FADE-IN
   ========================= */
window.addEventListener('DOMContentLoaded', () => {
  const heroLogo = document.querySelector('.hero img');
  if (heroLogo) heroLogo.classList.add('visible');
});

/* =========================
   SCROLL-LOGIK (UPDATED - Task 1.1)
   ========================= */
const sections = document.querySelectorAll('.hero, .section');
const faders = document.querySelectorAll('.fade-in');
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('#main-nav a');

let ticking = false;

function onScroll() {
  const scrollY = window.pageYOffset;

  // NAV: Add 'scrolled' class when scrolled past threshold (no longer hides)
  if (scrollY > 120) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

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
   CONTACT FORM HANDLER
   ========================= */

const form = document.getElementById('contact-form');
const statusBox = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button');
    button.classList.add('is-loading');

    statusBox.className = '';
    statusBox.textContent = '';
    statusBox.classList.remove('visible');

    const formData = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/mnjadppw', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        button.classList.remove('is-loading');

        // Smooth transition: wait a moment before hiding fields
        setTimeout(() => {
          // Hide form fields but keep the form container visible
          const formFields = form.querySelectorAll('.form-field, .submit-btn');
          formFields.forEach(field => {
            field.style.opacity = '0';
            field.style.transform = 'translateY(-10px)';
            field.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          });

          // After fields fade out, hide them and show success message
          setTimeout(() => {
            formFields.forEach(field => field.style.display = 'none');
            
            // Show success message
            statusBox.textContent = 'Tak for din besked.';
            statusBox.classList.add('success', 'visible');
          }, 400);
        }, 300);
      } else {
        throw new Error();
      }

    } catch {
      button.classList.remove('is-loading');

      statusBox.textContent = 'Noget gik galt. Prøv igen.';
      statusBox.classList.add('error', 'visible');
    }
  });
}