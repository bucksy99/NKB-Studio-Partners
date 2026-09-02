// Prevent browser from restoring previous scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
// Scroll to top on fresh page load (no hash = not coming from a nav link)
if (!window.location.hash) {
  window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
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

// Contact form — forward to email via FormSubmit.co AJAX
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formsubmit.co/ajax/nkbuchholtz@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        form.reset();
        formNote.hidden = false;
        formNote.textContent = "Thanks — we'll be in touch within a few days.";
        setTimeout(() => { formNote.hidden = true; }, 5000);
      } else {
        formNote.hidden = false;
        formNote.textContent = "Sorry, something went wrong. Please email us directly at nkbuchholtz@gmail.com";
        setTimeout(() => { formNote.hidden = true; }, 8000);
      }
    } catch (err) {
      formNote.hidden = false;
      formNote.textContent = "Sorry, something went wrong. Please email us directly at nkbuchholtz@gmail.com";
      setTimeout(() => { formNote.hidden = true; }, 8000);
    }
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send enquiry';
  });
}
