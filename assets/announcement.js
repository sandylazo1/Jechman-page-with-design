/* Franja de novedades: solo enlaces internos, sin seguimiento ni almacenamiento. */
(() => {
  const bar = document.querySelector('.announcement');
  if (!bar) return;
  const allSlides = [...bar.querySelectorAll('[data-announcement]')];
  const october = new Date().getMonth() === 9;
  const slides = allSlides.filter(slide => slide.dataset.season !== 'october' || october);
  const pauseButton = document.getElementById('announcement-pause');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let paused = false;
  let keyboardFocus = false;
  let timer;

  function show(next) {
    index = (next + slides.length) % slides.length;
    allSlides.forEach(slide => { slide.hidden = slide !== slides[index]; });
    bar.dataset.tone = slides[index].dataset.tone;
  }

  function stop() { clearInterval(timer); }
  function start() {
    stop();
    if (!paused && !keyboardFocus && !reducedMotion.matches && !document.hidden) {
      timer = setInterval(() => show(index + 1), 2000);
    }
  }

  pauseButton.addEventListener('click', () => {
    paused = !paused;
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Reanudar rotación de mensajes' : 'Detener rotación de mensajes');
    start();
  });
  bar.addEventListener('focusin', event => { if (event.target.matches(':focus-visible')) { keyboardFocus = true; stop(); } });
  bar.addEventListener('focusout', event => { if (!bar.contains(event.relatedTarget)) { keyboardFocus = false; start(); } });
  bar.addEventListener('pointerup', () => { keyboardFocus = false; start(); });
  bar.addEventListener('keydown', event => {
    if (event.target.tagName === 'INPUT') return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); start(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); start(); }
  });
  document.addEventListener('visibilitychange', start);
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
