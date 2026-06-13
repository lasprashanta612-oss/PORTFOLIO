/* ════════════════════════════════════════════════════════════
   Prashant Rana Magar — Portfolio Script
   Features: Loader · Cursor · Particles · Typed · Stats Counter
             Skill Bars · Portfolio Filter · Testimonial Carousel
             AOS · Theme Toggle · Navbar · Back To Top · Form
   ════════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. Loader ── */
(function initLoader() {
  const loader = document.getElementById('loader');
  // Hide after CSS animation completes (2s) + small buffer
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 2200);
  });
})();

/* ── 2. AOS Init ── */
window.addEventListener('load', () => {
  AOS.init({
    duration: 700,
    once: true,
    easing: 'ease-out-cubic',
    offset: 80,
  });
});

/* ── 3. Custom Cursor ── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring follows with lag
  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .service-card, .project-card, .pricing-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ── 4. Scroll Progress Bar ── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ── 5. Navbar Scroll & Active Links ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky style
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  }, { passive: true });
})();

/* ── 6. Mobile Menu ── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── 7. Theme Toggle ── */
(function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;

  const saved = localStorage.getItem('pr-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('pr-theme', next);
  });

  function applyTheme(t) {
    root.dataset.theme = t;
    icon.className = t === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }
})();

/* ── 8. Typed Text Animation ── */
(function initTyped() {
  const el     = document.getElementById('typed-text');
  if (!el) return;

  const words  = ['Prashant Rana Magar', 'AI Expert', 'Web Developer', 'Web Designer', 'Thumbnail Designer'];
  let  wi = 0, ci = 0, deleting = false;
  const typeSpeed = 80, deleteSpeed = 40, pauseTime = 1800;

  function tick() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);

    if (!deleting && ci === word.length) {
      setTimeout(() => { deleting = true; tick(); }, pauseTime);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    ci += deleting ? -1 : 1;
    setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
  }
  tick();
})();

/* ── 9. Particle Canvas ── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.a  = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 63, 232, ${this.a})`;
      ctx.fill();
    }
  }

  // Init particles
  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawLines() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 63, 232, ${0.12 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── 10. Stats Counter ── */
(function initStats() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  let triggered = false;

  function countUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = duration / target;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
    }, step < 16 ? 16 : step);
  }

  function onScroll() {
    if (triggered) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      triggered = true;
      nums.forEach(countUp);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Check on load
})();

/* ── 11. SVG Gradient for Skill Circles ── */
(function injectSvgGrad() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0');
  const defs = document.createElementNS(ns, 'defs');
  const grad = document.createElementNS(ns, 'linearGradient');
  grad.id = 'grad1';
  grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '100%');
  const s1 = document.createElementNS(ns, 'stop');
  s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#6C3FE8');
  const s2 = document.createElementNS(ns, 'stop');
  s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', '#00E5FF');
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad); svg.appendChild(defs);
  document.body.prepend(svg);
})();

/* ── 12. Skill Circles & Bars (Intersection Observer) ── */
(function initSkills() {
  const circumference = 2 * Math.PI * 52; // ~326.7

  // Circles
  const circles = document.querySelectorAll('.skill-circle');
  circles.forEach(c => {
    const fill = c.querySelector('.fill');
    fill.setAttribute('stroke', 'url(#grad1)');
    fill.style.strokeDasharray  = circumference;
    fill.style.strokeDashoffset = circumference;
  });

  // Bars
  const bars = document.querySelectorAll('.skill-bar-fill');

  const skillSection = document.getElementById('skills');
  if (!skillSection) return;

  let fired = false;
  const observer = new IntersectionObserver(entries => {
    if (fired) return;
    if (entries[0].isIntersecting) {
      fired = true;

      // Animate circles
      circles.forEach(c => {
        const pct  = parseInt(c.dataset.percent, 10) / 100;
        const fill = c.querySelector('.fill');
        fill.style.strokeDashoffset = circumference * (1 - pct);
      });

      // Animate bars
      bars.forEach(bar => {
        const w = bar.dataset.width;
        bar.style.width = w + '%';
      });
    }
  }, { threshold: 0.3 });

  observer.observe(skillSection);
})();

/* ── 13. Portfolio Filter ── */
(function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fade-in-up 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ── 14. Testimonial Carousel ── */
(function initTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let autoTimer;

  // Determine visible count based on viewport
  function visibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  }

  function totalSlides() {
    return Math.max(1, cards.length - visibleCount() + 1);
  }

  // Build dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const d = document.createElement('div');
      d.className = 'testimonial-dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function getCardWidth() {
    const card = cards[0];
    const style = getComputedStyle(card);
    return card.offsetWidth + parseInt(style.marginRight || 24, 10);
  }

  function goTo(index) {
    const max = totalSlides() - 1;
    current = Math.max(0, Math.min(index, max));
    // Calculate offset: each slide = card width + gap (24px)
    const gap = 24;
    const cardW = cards[0] ? cards[0].offsetWidth + gap : 0;
    track.style.transform = `translateX(-${current * cardW}px)`;
    updateDots();
  }

  function next() { goTo(current + 1 < totalSlides() ? current + 1 : 0); }
  function prev() { goTo(current > 0 ? current - 1 : totalSlides() - 1); }

  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  function startAuto() { autoTimer = setInterval(next, 4000); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  buildDots();
  startAuto();

  window.addEventListener('resize', () => {
    buildDots();
    goTo(0);
  }, { passive: true });

  // Touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); resetAuto(); }
  }, { passive: true });
})();

/* ── 15. Back To Top ── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── 16. Contact Form ── */
(function initForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Compose mailto link
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }

    const mailto = `mailto:lasprashanta612@gmail.com`
      + `?subject=${encodeURIComponent('[Portfolio] ' + subject)}`
      + `&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;

    window.location.href = mailto;

    showStatus('Opening your email app… Thank you for reaching out!', 'success');
    form.reset();
  });

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form-status ' + type;
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  }
})();

/* ── 17. Download CV button (placeholder alert) ── */
(function initCV() {
  const btn = document.getElementById('download-cv');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.preventDefault();
    alert('CV coming soon! Contact me directly at lasprashanta612@gmail.com');
  });
})();

/* ── 18. Smooth scroll for all anchor links ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
