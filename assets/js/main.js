// IVT Medical — shared behaviors

// Sticky header
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// Rotating key phrases in the hero badge
const rotator = document.getElementById('rotator');
if (rotator) {
  const phrases = [
    'Precision Infection Control & Wound Closure',
    'Simple Solutions for Complex Wounds',
    'No Skin Grafts. No Flaps.',
    'From Implant Removal to Implant Salvage',
    'Returning Patients to Life'
  ];
  let pi = 0;
  setInterval(() => {
    rotator.style.opacity = '0';
    setTimeout(() => {
      pi = (pi + 1) % phrases.length;
      rotator.textContent = phrases[pi];
      rotator.style.opacity = '1';
    }, 450);
  }, 4200);
}

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Publication tabs (research page)
const tabs = document.querySelectorAll('.pub-tab');
if (tabs.length) {
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.filter;
    document.querySelectorAll('.pub-item').forEach(item => {
      item.style.display = (key === 'all' || item.dataset.cat === key) ? '' : 'none';
    });
  }));
}

// Contact form is handled by Netlify Forms (data-netlify="true") — native POST + thank-you page.
// Fallback to mailto only when the site is opened as a local file (no form backend).
const form = document.getElementById('contact-form');
if (form && location.protocol === 'file:') {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const body = encodeURIComponent(
      `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || '-'}\n\n${d.message}`
    );
    const subject = encodeURIComponent(d.subject || 'Website inquiry');
    window.location.href = `mailto:info@ivtmedical.com?subject=${subject}&body=${body}`;
  });
}

// Age gate (clinical cases page)
const gate = document.getElementById('age-gate');
if (gate) {
  if (sessionStorage.getItem('ivt-gate-ok') === '1') {
    gate.remove();
  } else {
    document.body.style.overflow = 'hidden';
    document.getElementById('gate-yes').addEventListener('click', () => {
      sessionStorage.setItem('ivt-gate-ok', '1');
      gate.remove();
      document.body.style.overflow = '';
    });
  }
}
