/* ==========================================================================
   VANGUARD & PARTNERS - CORE JAVASCRIPT & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRTLToggle();
  initMobileDrawer();
  initFormValidation();
  initGSAPAnimations();
  init3DCardTiltEffect();
  initMagneticButtons();
  initFAQAccordions();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle System (macOS Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem('vanguard_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(currentTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = htmlTag.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('vanguard_theme', newTheme);
    });
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlTag.setAttribute('data-theme', 'dark');
      updateThemeIcons('ri-sun-line');
    } else {
      htmlTag.removeAttribute('data-theme');
      updateThemeIcons('ri-moon-line');
    }
  }

  function updateThemeIcons(iconClass) {
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = iconClass;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. RTL / LTR Language Direction Toggle
   -------------------------------------------------------------------------- */
function initRTLToggle() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const htmlTag = document.documentElement;

  const savedDir = localStorage.getItem('vanguard_dir');
  if (savedDir) {
    htmlTag.setAttribute('dir', savedDir);
  }

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = htmlTag.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      htmlTag.setAttribute('dir', newDir);
      localStorage.setItem('vanguard_dir', newDir);
    });
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Hamburger & Slide-Drawer System (<= 1024px)
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const hamburgerBtns = document.querySelectorAll('.hamburger-toggle');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const navDrawer = document.querySelector('.nav-drawer');
  const closeBtns = document.querySelectorAll('.drawer-close-btn');

  if (!navDrawer || !drawerOverlay) return;

  function openDrawer() {
    navDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  closeBtns.forEach(btn => btn.addEventListener('click', closeDrawer));
  drawerOverlay.addEventListener('click', closeDrawer);
}

/* --------------------------------------------------------------------------
   4. Form Validation Engine (All Forms)
   -------------------------------------------------------------------------- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('.form-control[required]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      inputs.forEach(input => {
        const parent = input.closest('.form-group');
        const errorText = parent ? parent.querySelector('.error-message') : null;

        let inputValid = true;

        if (!input.value.trim()) {
          inputValid = false;
        } else if (input.type === 'email' && !emailRegex.test(input.value.trim())) {
          inputValid = false;
        } else if (input.type === 'password' && input.value.trim().length < 8) {
          inputValid = false;
        } else if (input.id === 'confirmPassword') {
          const passInput = form.querySelector('#password');
          if (passInput && input.value !== passInput.value) {
            inputValid = false;
          }
        }

        if (!inputValid) {
          isValid = false;
          input.classList.add('error');
          input.classList.remove('success');
          if (errorText) errorText.classList.add('active');
        } else {
          input.classList.remove('error');
          input.classList.add('success');
          if (errorText) errorText.classList.remove('active');
        }
      });

      const termsCheckbox = form.querySelector('#termsCheckbox');
      if (termsCheckbox) {
        if (!termsCheckbox.checked) {
          isValid = false;
          termsCheckbox.parentElement.style.color = '#ef4444';
        } else {
          termsCheckbox.parentElement.style.color = '';
        }
      }

      if (isValid) {
        const successAlert = form.querySelector('.form-success-alert');
        if (successAlert) {
          successAlert.style.display = 'block';
          form.reset();
          inputs.forEach(i => i.classList.remove('success'));
          setTimeout(() => {
            successAlert.style.display = 'none';
          }, 5000);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. GSAP Entrance Animations
   -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.from('.navbar-header', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    clearProps: 'opacity,transform'
  });

  gsap.from('.hero-animate', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.1,
    clearProps: 'opacity,transform'
  });

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.gsap-reveal').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        clearProps: 'opacity,transform'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   6. 3D Card Tilt Physics
   -------------------------------------------------------------------------- */
function init3DCardTiltEffect() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
  });
}

/* --------------------------------------------------------------------------
   7. Magnetic Tactile Buttons
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn-primary, .icon-btn');

  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}

/* --------------------------------------------------------------------------
   8. Interactive FAQ Accordion Dropdowns
   -------------------------------------------------------------------------- */
function initFAQAccordions() {
  const headers = document.querySelectorAll('.faq-accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-accordion-item');
      if (!item) return;
      const isActive = item.classList.contains('active');

      // Toggle accordion items
      document.querySelectorAll('.faq-accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
