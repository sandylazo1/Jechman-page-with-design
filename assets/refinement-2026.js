/* Editorial refinement for the existing static GitHub Pages site. */
(() => {
  'use strict';
  const useImage = (selector, src, alt) => {
    const image = document.querySelector(selector);
    if (!image) return;
    image.removeAttribute('srcset');
    image.removeAttribute('sizes');
    image.src = src;
    if (alt !== undefined) image.alt = alt;
  };
  // The opening mosaic and division cards use distinct visual references.
  useImage('.hero-overview-images img:nth-child(1)', 'assets/catalog/hidraulica.webp');
  useImage('.hero-overview-images img:nth-child(2)', 'assets/editorial/energy-1600.webp');
  useImage('.hero-overview-images img:nth-child(3)', 'assets/projects/pool-work.webp');
  useImage('.division-card--pool img', 'assets/areas/piscinas.webp', 'Piscina exterior fotografiada para la sección de bienestar');
  useImage('.division-card--electric img', 'assets/catalog/tablero-electrico.webp', 'Tablero y protecciones eléctricas');
  useImage('.division-card--commercial img', 'assets/areas/comercial.webp', 'Materiales y suministros para construcción');
  useImage('.home-solution--care img', 'assets/catalog/robot-limpiafondos.svg', 'Robot limpiafondos, esquema de producto');
  const electric = document.querySelector('.view[data-view="electricidad"]');
  if (!electric) return;

  // Keep one concise work-area section. Each photograph describes its heading.
  const legacySections = [...electric.querySelectorAll(':scope > .section')];
  const work = legacySections.find(section => section.querySelector('h2')?.textContent.trim() === 'Áreas de trabajo');
  const redundant = legacySections.find(section => section.querySelector('h2')?.textContent.trim() === 'De la planificación a la puesta en marcha');
  redundant?.remove();
  const smartDemo = electric.querySelector('.enh-smart-demo');
  if (work && smartDemo) smartDemo.insertAdjacentElement('afterend', work);
  // The selectable checklist already covers these topics without another row
  // of repeated photographs competing with the dedicated work cards.
  electric.querySelector('.enh-service-visuals')?.remove();
  if (work) {
    const grid = work.querySelector('.trio');
    if (grid) {
      grid.classList.add('ref-work-grid');
      const areas = [
        { title: 'Instalaciones', description: 'Obra nueva, ampliaciones y montaje eléctrico para viviendas o industria, según evaluación del lugar.', image: 'assets/photography/work-installation.jpg', alt: 'Electricista revisando una instalación eléctrica', href: '#/electricidad/instalaciones', action: 'Explorar instalaciones' },
        { title: 'Tableros', description: 'Distribución, control y protecciones definidos de acuerdo con las cargas y el uso del proyecto.', image: 'assets/photography/work-panel.jpg', alt: 'Técnico trabajando en un tablero eléctrico', href: '#/electricidad/tableros', action: 'Explorar tableros' },
        { title: 'Automatización y control', description: 'Escenas, sensores, monitoreo y mando de equipos para espacios más cómodos y eficientes.', image: 'assets/photography/work-automation.jpg', alt: 'Panel industrial de automatización y control', href: '#/electricidad/automatizacion', action: 'Explorar automatización' }
      ];
      grid.replaceChildren(...areas.map(item => {
        const card = document.createElement('article');
        card.className = 'card ref-work-card';
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.alt;
        image.loading = 'eager';
        image.decoding = 'async';
        const copy = document.createElement('div');
        copy.className = 'ref-work-copy';
        const heading = document.createElement('h3');
        heading.textContent = item.title;
        const body = document.createElement('p');
        body.textContent = item.description;
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.action;
        copy.append(heading, body, link);
        card.append(image, copy);
        return card;
      }));
    }
  }

  // The supplied JPEGs contain an information panel beneath the photograph.
  // Their dimensions remain searchable/selectable in HTML model descriptions.
  document.querySelectorAll('img[src*="assets/pools-real/"]').forEach(image => {
    image.classList.add('ref-pool-source');
    image.setAttribute('decoding', 'async');
  });
  const newsTrack = document.querySelector('#news-track');
  if (newsTrack && 'MutationObserver' in window) {
    const classifyNews = () => newsTrack.querySelectorAll('img[src*="assets/pools-real/"]').forEach(image => {
      if (image.parentElement?.classList.contains('ref-pool-media')) return;
      const frame = document.createElement('div');
      frame.className = 'ref-pool-media';
      image.replaceWith(frame);
      frame.append(image);
    });
    classifyNews();
    new MutationObserver(classifyNews).observe(newsTrack, { childList: true });
  }
})();
