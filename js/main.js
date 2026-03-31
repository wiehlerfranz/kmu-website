const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.primary-nav a');
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const animateTargets = document.querySelectorAll('[data-animate]');
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('[data-form-status]');
const scrollButtons = document.querySelectorAll('[data-scroll]');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.25 }
);

animateTargets.forEach(target => observer.observe(target));

const highlightNav = () => {
  let activeId = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      activeId = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const id = href.replace('#', '');
    if (id === activeId) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
};

window.addEventListener('scroll', highlightNav);
highlightNav();

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.setAttribute('aria-expanded', String(!expanded));
  });
}

scrollButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSelector = button.getAttribute('data-scroll');
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    formStatus.textContent = 'Danke fuer Ihr Vertrauen. Ich melde mich kurzfristig.';
    contactForm.reset();
    setTimeout(() => {
      formStatus.textContent = '';
    }, 4000);
  });
}

const slider = document.querySelector('[data-slider]');
if (slider) {
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(track.children);
  let index = 0;
  let slideWidth = slides[0]?.getBoundingClientRect().width || 0;

  const updateSlider = () => {
    slideWidth = slides[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(${-index * (slideWidth + 16)}px)`;
  };

  slider.addEventListener('click', event => {
    const direction = event.target.getAttribute('data-direction');
    if (!direction) return;
    if (direction === 'prev' && index > 0) {
      index -= 1;
    }
    if (direction === 'next' && index < slides.length - 1) {
      index += 1;
    }
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}

const yearTarget = document.getElementById('current-year');
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}
