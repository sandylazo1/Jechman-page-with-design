/* Franja de novedades: rotación dinámica, mensajes estacionales de alta conversión y control accesible. */
(() => {
  const bar = document.querySelector('.announcement');
  if (!bar) return;
  const allSlides = [...bar.querySelectorAll('[data-announcement]')];
  if (!allSlides.length) return;
  const pauseButton = document.getElementById('announcement-pause');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let paused = false;
  let keyboardFocus = false;
  let timer;

  function show(next) {
    index = (next + allSlides.length) % allSlides.length;
    allSlides.forEach((slide, i) => {
      slide.hidden = i !== index;
      slide.classList.toggle('is-active', i === index);
    });
    bar.dataset.tone = allSlides[index].dataset.tone || 'commercial';
  }

  function stop() { clearInterval(timer); }
  function start() {
    stop();
    if (!paused && !keyboardFocus && !reducedMotion.matches && !document.hidden) {
      timer = setInterval(() => show(index + 1), 3800);
    }
  }

  if (pauseButton) {
    pauseButton.addEventListener('click', () => {
      paused = !paused;
      pauseButton.setAttribute('aria-pressed', String(paused));
      pauseButton.setAttribute('aria-label', paused ? 'Reanudar rotación de mensajes' : 'Detener rotación de mensajes');
      if (paused) stop(); else start();
    });
  }

  bar.addEventListener('focusin', event => { if (event.target.matches(':focus-visible')) { keyboardFocus = true; stop(); } });
  bar.addEventListener('focusout', event => { if (!bar.contains(event.relatedTarget)) { keyboardFocus = false; start(); } });
  bar.addEventListener('pointerup', () => { keyboardFocus = false; start(); });
  bar.addEventListener('keydown', event => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); start(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); start(); }
  });

  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  reducedMotion.addEventListener?.('change', start);

  function updateArea() {
    const route = (location.hash.split(/[/?]/)[1] || 'home');
    document.body.dataset.area = route;
  }
  window.addEventListener('hashchange', updateArea);
  updateArea();
  show(0);
  start();
})();
