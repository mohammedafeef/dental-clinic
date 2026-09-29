import './style.css';

// ===== DOM Elements =====
const header = document.getElementById('main-header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

// ===== Light / Dark Mode Controller =====
const updateThemeButtonLabels = (isDark) => {
  themeToggleBtns.forEach(btn => {
    const title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    btn.setAttribute('title', title);
    btn.setAttribute('aria-label', title);
  });
};

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateThemeButtonLabels(true);
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateThemeButtonLabels(false);
  }
};

// Initial sync with DOM state (defaults to white/light mode)
updateThemeButtonLabels(document.documentElement.classList.contains('dark'));

themeToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });
});


// ===== Header Scroll Effect =====
let lastScrollY = 0;
const handleScroll = () => {
  const scrollY = window.scrollY;

  // Header styling on scroll
  if (header) {
    if (scrollY > 50) {
      header.classList.add('header-scrolled');
      header.classList.remove('bg-white/95', 'dark:bg-slate-900/95');
    } else {
      header.classList.remove('header-scrolled');
      header.classList.add('bg-white/95', 'dark:bg-slate-900/95');
    }
  }

  // Scroll-to-top button visibility
  if (scrollToTopBtn) {
    if (scrollY > 500) {
      scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
      scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
    } else {
      scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
      scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
    }
  }

  lastScrollY = scrollY;
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // Initial check

// ===== Scroll to Top =====
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Mobile Menu =====
const openMobileMenu = () => {
  if (!mobileMenu || !mobileMenuOverlay) return;
  mobileMenu.classList.add('open');
  mobileMenuOverlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    mobileMenuOverlay.classList.remove('opacity-0');
    mobileMenuOverlay.classList.add('opacity-100');
  });
  document.body.style.overflow = 'hidden';
};

const closeMobileMenu = () => {
  if (!mobileMenu || !mobileMenuOverlay) return;
  mobileMenu.classList.remove('open');
  mobileMenuOverlay.classList.remove('opacity-100');
  mobileMenuOverlay.classList.add('opacity-0');
  document.body.style.overflow = '';
  setTimeout(() => {
    mobileMenuOverlay.classList.add('hidden');
  }, 300);
};

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href.length <= 1) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== Intersection Observer for Scroll Animations =====
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const updateActiveNav = () => {
  const scrollY = window.scrollY + 180;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('!text-primary', '!bg-primary-soft', 'dark:!text-primary-light', 'dark:!bg-primary/20');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('!text-primary', '!bg-primary-soft', 'dark:!text-primary-light', 'dark:!bg-primary/20');
        }
      });
    }
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const trigger = item.querySelector('.faq-trigger');
  if (trigger) {
    trigger.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const triggerBtn = otherItem.querySelector('.faq-trigger');
        if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isCurrentlyActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }
});

// ===== Keyboard Accessibility =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

console.log('🦷 Dr. Reena\'s Dental Speciality Clinic loaded with Dark Mode support');
