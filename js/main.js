/* ===========================
   Otesha — Main JavaScript
   =========================== */


/* HERO SLIDESHOW */
(function () {
  const data = [
    { text: 'Climbing, exploring, discovering \u2014 the gate is always open.', loc: 'The Verandah \u00b7 Otesha' },
    { text: 'A thriving garden that breathes with the seasons.', loc: 'The Grounds \u00b7 Yadavagiri' },
    { text: 'Learning happens in wild, green places.', loc: 'The Garden \u00b7 Yadavagiri' },
    { text: 'Jackfruit, breadfruit, mango \u2014 growing alongside our children.', loc: 'The Jackfruit Tree \u00b7 Otesha' },
    { text: 'Every morning begins with an open gate.', loc: 'The Entrance \u00b7 Otesha' },
  ];
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.hdot')];
  const textEl = document.getElementById('hero-text');
  const locEl = document.getElementById('hero-loc');
  let cur = 0, timer;

  function go(n) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('on');
    textEl.classList.add('txt-out');
    setTimeout(() => {
      textEl.textContent = data[cur].text;
      locEl.textContent = data[cur].loc;
      textEl.classList.remove('txt-out');
      textEl.classList.add('txt-in');
      requestAnimationFrame(() =>
        requestAnimationFrame(() => textEl.classList.remove('txt-in'))
      );
    }, 380);
  }

  dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.i); reset(); }));
  document.getElementById('hero-prev').addEventListener('click', () => { go(cur - 1); reset(); });
  document.getElementById('hero-next').addEventListener('click', () => { go(cur + 1); reset(); });

  function reset() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 6000);
  }
  timer = setInterval(() => go(cur + 1), 6000);

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

/* FADE-IN on scroll */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.07 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

