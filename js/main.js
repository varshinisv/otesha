/* ===========================
   Otesha — Main JavaScript
   =========================== */

/* MOBILE NAV (hamburger) */
(function () {
  const nav = document.getElementById('mainnav');
  if (!nav) return;
  const links = nav.querySelector('.nav-links');
  if (!links) return;
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);
  btn.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      // If it's a dropdown parent link on mobile, toggle sub-menu on first tap; navigate on second tap
      var dd = e.target.closest('.nav-dropdown');
      if (dd && e.target === dd.querySelector(':scope > a') && dd.querySelector('.nav-sub') && window.innerWidth <= 900) {
        if (!dd.classList.contains('sub-open')) {
          e.preventDefault();
          // Close other open dropdowns
          links.querySelectorAll('.sub-open').forEach(function (el) { if (el !== dd) el.classList.remove('sub-open'); });
          dd.classList.add('sub-open');
          return;
        }
        // Already open — let it navigate (fall through to close menu + scroll)
      }
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      // Close all sub-menus
      links.querySelectorAll('.sub-open').forEach(function (el) { el.classList.remove('sub-open'); });
    }
  });
})();

/* AREAS SLIDESHOW */
(function () {
  const slides = document.querySelectorAll('.areas-slide');
  if (!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 4000);
})();

/* HERO SLIDESHOW */
(function () {
  const data = [
    { text: 'Climbing, exploring, discovering.' },
    { text: 'The jackfruit tree, growing alongside our children.' },
    { text: 'Our slice of green.' },
    { text: 'An extension of home.' },
    { text: 'Welcome to Otesha!' },
    { text: 'Walking into the indoors.' },
  ];
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.hdot')];
  const textEl = document.getElementById('hero-text');
  let cur = 0, timer;

  const heroContent = document.querySelector('.hero-content');
  let textTimer = null;

  function go(n) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('on');

    /* Hide text immediately */
    heroContent.classList.remove('hero-text-visible');
    if (textTimer) clearTimeout(textTimer);

    /* After 2s delay, update text and fade in slowly */
    textTimer = setTimeout(() => {
      textEl.textContent = data[cur].text;
      heroContent.classList.add('hero-text-visible');
    }, 2000);
  }

  dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.i); reset(); }));
  document.getElementById('hero-prev').addEventListener('click', () => { go(cur - 1); reset(); });
  document.getElementById('hero-next').addEventListener('click', () => { go(cur + 1); reset(); });

  function reset() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 8000);
  }
  timer = setInterval(() => go(cur + 1), 6000);

  /* Delay hero text appearance by 2 seconds */
  setTimeout(() => {
    document.querySelector('.hero-content').classList.add('hero-text-visible');
  }, 2000);

  /* Touch swipe */
  let sx = 0;
  document.querySelector('.hero').addEventListener('touchstart', e => {
    sx = e.touches[0].clientX;
  }, { passive: true });
  document.querySelector('.hero').addEventListener('touchend', e => {
    if (Math.abs(sx - e.changedTouches[0].clientX) > 45) {
      go(cur + (sx > e.changedTouches[0].clientX ? 1 : -1));
      reset();
    }
  });
})();

/* NAV scroll: transparent → watercolor-textured on scroll */
(function(){
  const nav = document.getElementById('mainnav');
  window.addEventListener('scroll', function(){
    if(window.scrollY > 80){
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
})();

/* AREAS OF LEARNING accordion */
(function() {
  const areas = document.querySelectorAll('.area');
  if (!areas.length) return;
  areas.forEach(area => {
    area.querySelector('.area-title').addEventListener('click', () => {
      const wasOpen = area.classList.contains('area-open');
      areas.forEach(a => a.classList.remove('area-open'));
      if (!wasOpen) area.classList.add('area-open');
    });
  });
})();

/* DAILY RHYTHM timeline accordion */
(function() {
  const blocks = document.querySelectorAll('.rhythm-block');
  if (!blocks.length) return;
  blocks[0].classList.add('rhythm-open');
  blocks.forEach(block => {
    block.querySelector('.rhythm-label').addEventListener('click', () => {
      const wasOpen = block.classList.contains('rhythm-open');
      blocks.forEach(b => b.classList.remove('rhythm-open'));
      if (!wasOpen) block.classList.add('rhythm-open');
    });
  });
})();

/* SMOOTH SCROLL — scroll to the section-label heading, not the section container */
(function () {
  function doScroll(id) {
    var section = document.getElementById(id);
    if (!section) return;
    var label = section.querySelector('.section-label') || section.querySelector('h2');
    var target = label || section;
    var nav = document.getElementById('mainnav');
    var navHeight = nav.offsetHeight;
    var navWave = window.innerWidth <= 900 ? 30 : 0;
    var margin = 40;
    var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - navWave - margin;
    window.scrollTo(0, targetTop);
    history.pushState(null, '', '#' + id);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      if (!id) return;
      var section = document.getElementById(id);
      if (!section) return;
      e.preventDefault();
      // If mobile menu is open, wait for it to close before scrolling
      var nav = document.getElementById('mainnav');
      if (nav.classList.contains('open')) {
        setTimeout(function () { doScroll(id); }, 400);
      } else {
        doScroll(id);
      }
    });
  });
})();

/* FADE-IN on scroll */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.07 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

