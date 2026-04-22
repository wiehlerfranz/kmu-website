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

const scrollHeader = document.querySelector('.site-header');
const smoothScrollTo = target => {
  const headerHeight = scrollHeader?.getBoundingClientRect().height || 0;
  const targetY = window.scrollY + target.getBoundingClientRect().top - headerHeight - 12;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
};

const navAnchors = document.querySelectorAll('.primary-nav a, .footer-legal a');
navAnchors.forEach(link => {
  const href = link.getAttribute('href') || '';
  if (!href.startsWith('#')) return;
  link.addEventListener('click', event => {
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    smoothScrollTo(target);
    if (primaryNav && navToggle && primaryNav.getAttribute('aria-expanded') === 'true') {
      navToggle.click();
    }
  });
});

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
    const data = new FormData(contactForm);
    const payload = new URLSearchParams();
    data.forEach((value, key) => payload.append(key, value));
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString()
    })
      .then(() => {
        formStatus.textContent = 'Danke für Ihr Vertrauen. Ich melde mich kurzfristig.';
        contactForm.reset();
        setTimeout(() => { formStatus.textContent = ''; }, 5000);
      })
      .catch(() => {
        formStatus.textContent = 'Etwas hat nicht geklappt. Bitte schreiben Sie mir direkt an franz.wiehler@gmx.de';
      });
  });
}

const slider = document.querySelector('[data-slider]');
if (slider) {
  const prevButton = slider.querySelector('[data-direction="prev"]');
  const nextButton = slider.querySelector('[data-direction="next"]');
  const viewport = slider.querySelector('.slider-viewport');
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(track.querySelectorAll('.reference-card'));
  let index = 0;

  const updateSlider = () => {
    const slideWidth = viewport?.getBoundingClientRect().width || 0;
    index = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transform = `translateX(${-index * (slideWidth + 16)}px)`;
    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === slides.length - 1;
  };

  slider.addEventListener('click', event => {
    const button = event.target.closest('[data-direction]');
    const direction = button?.getAttribute('data-direction');
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
