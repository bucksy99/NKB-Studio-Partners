// Force scroll to top on page load — but only if there's no hash (so anchor links work)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (!window.location.hash) {
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
  });
  // Also scroll immediately before load fires
  window.scrollTo(0, 0);
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Header border on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Contact form — forward to email via FormSubmit.co
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formsubmit.co/ajax/nkbuchholtz@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (response.ok) {
        form.reset();
        formNote.hidden = false;
        formNote.textContent = "Thanks — we'll be in touch within a few days.";
        setTimeout(() => { formNote.hidden = true; }, 5000);
      } else {
        formNote.hidden = false;
        formNote.textContent = "Sorry, something went wrong. Please email us directly.";
        setTimeout(() => { formNote.hidden = true; }, 5000);
      }
    } catch (err) {
      formNote.hidden = false;
      formNote.textContent = "Sorry, something went wrong. Please email us directly.";
      setTimeout(() => { formNote.hidden = true; }, 5000);
    }
  });
}
