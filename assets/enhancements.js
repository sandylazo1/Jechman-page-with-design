/* Internal-view enhancements. No analytics, network requests, or stored configuration. */
(() => {
  const pool = document.querySelector('.view[data-view="piscinas"]');
  const electric = document.querySelector('.view[data-view="electricidad"]');
  const commercial = document.querySelector('.view[data-view="comercial"]');
  const shop = document.querySelector('.view[data-view="tienda"]');
  const tinaja = document.querySelector('.view[data-view="tinajas"]');
  const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const quote = (anchor, message) => setWA(anchor, message);

  function section(className, content) {
    const element = document.createElement('section');
    element.className = className;
    element.innerHTML = content;
    return element;
  }

  function createCarousel(view, slides, heading) {
    const panel = section('enh-mast', `<div class="wrap enh-mast-inner"><div class="enh-mast-media is-loading"><img alt="" loading="lazy" decoding="async"><div class="enh-mast-credit"></div></div><div class="enh-mast-copy"><span class="eyebrow">INSPIRACIÓN VISUAL</span><h2>${heading}</h2><p class="enh-mast-description"></p><div class="enh-mast-controls"><button type="button" class="enh-prev" aria-label="Foto anterior">‹</button><span class="enh-mast-count" aria-live="polite"></span><button type="button" class="enh-next" aria-label="Foto siguiente">›</button><div class="enh-mast-dots" role="group" aria-label="Elegir foto"></div></div></div></div>`);
    view.querySelector('.page-hero').insertAdjacentElement('afterend', panel);
    const image = panel.querySelector('img');
    const media = panel.querySelector('.enh-mast-media');
    const description = panel.querySelector('.enh-mast-description');
    const credit = panel.querySelector('.enh-mast-credit');
    const dots = panel.querySelector('.enh-mast-dots');
    let index = Math.floor(Math.random() * slides.length);
    let timer;
    slides.forEach((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Mostrar foto ${i + 1}`);
      dot.addEventListener('click', () => { show(i); start(); });
      dots.append(dot);
    });
    function show(next) {
      index = (next + slides.length) % slides.length;
      const slide = slides[index];
      media.classList.add('is-loading');
      image.alt = slide.alt;
      image.src = slide.src;
      if (image.complete && image.naturalWidth) media.classList.remove('is-loading');
      description.textContent = slide.description;
      credit.replaceChildren();
      credit.append(document.createTextNode(slide.credit));
      if (slide.url) {
        credit.append(document.createTextNode(' · '));
        const link = document.createElement('a');
        link.href = slide.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Ver fuente';
        credit.append(link);
      }
      panel.querySelector('.enh-mast-count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      [...dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    }
    image.addEventListener('load', () => media.classList.remove('is-loading'));
    image.addEventListener('error', () => { media.classList.remove('is-loading'); credit.textContent = 'Imagen no disponible'; });
    const stop = () => clearInterval(timer);
    function start() { stop(); if (!view.hidden && !prefersReducedMotion() && !document.hidden) timer = setInterval(() => show(index + 1), 4500); }
    panel.querySelector('.enh-prev').addEventListener('click', () => { show(index - 1); start(); });
    panel.querySelector('.enh-next').addEventListener('click', () => { show(index + 1); start(); });
    panel.addEventListener('mouseenter', stop);
    panel.addEventListener('mouseleave', start);
    panel.addEventListener('focusin', stop);
    panel.addEventListener('focusout', event => { if (!panel.contains(event.relatedTarget)) start(); });
    document.addEventListener('visibilitychange', start);
    window.addEventListener('hashchange', () => {
      if (view.hidden) stop();
      else { if (!image.getAttribute('src')) show(index); start(); }
    });
    if (!view.hidden) { show(index); start(); }
  }

  createCarousel(pool, [
    {src:'assets/projects/pool-installed.webp',alt:'Piscina con iluminación publicada por JECHMAN',description:'Agua, iluminación y una propuesta adaptada al lugar.',credit:'Fotografía publicada por JECHMAN',url:'https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/'},
    {src:'assets/projects/pool-work.webp',alt:'Piscina exterior publicada por JECHMAN',description:'De la elección de medida a la evaluación de instalación.',credit:'Fotografía publicada por JECHMAN',url:'https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/'},
    {src:'assets/areas/jacuzzis.webp',alt:'Jacuzzi exterior ilustrativo',description:'Jacuzzis y espacios de bienestar para conversar en detalle.',credit:'Imagen ilustrativa · Bradrey Nassel / Unsplash',url:'https://unsplash.com/photos/a-hot-tub-in-a-backyard-surrounded-by-greenery-wJ7zd8SvnpM'}
  ], 'Ideas para disfrutar el agua');
  createCarousel(electric, [
    {src:'assets/areas/electricidad.webp',alt:'Tablero de control eléctrico ilustrativo',description:'Instalaciones y tableros con una conversación técnica desde el inicio.',credit:'Imagen ilustrativa · Aleksandr Lyaptsev / Unsplash',url:'https://unsplash.com/photos/electrical-panel-with-wires-and-components-q0Jo_J5YxHY'},
    {src:'assets/catalog/tablero-electrico.webp',alt:'Gabinete y tablero eléctrico ilustrativos',description:'Distribución, protección y control según el proyecto.',credit:'Imagen ilustrativa generada para esta vista'},
    {src:'assets/catalog/iluminacion.webp',alt:'Iluminación general ilustrativa',description:'La iluminación también define cómo se vive un espacio.',credit:'Imagen ilustrativa generada para esta vista'}
  ], 'Ingeniería que acompaña el proyecto');
  createCarousel(commercial, [
    {src:'assets/areas/comercial.webp',alt:'Suministros de ferretería ilustrativos',description:'Materiales y herramientas para cada etapa.',credit:'Imagen ilustrativa · KC Shum / Unsplash',url:'https://unsplash.com/photos/a-cluttered-hardware-store-aisle-with-various-items-tE6zayejDNY'},
    {src:'assets/catalog/hidraulica.webp',alt:'Conexiones hidráulicas ilustrativas',description:'Tuberías y fittings para consultar según especificación.',credit:'Imagen ilustrativa generada para esta vista'},
    {src:'assets/catalog/herramientas.webp',alt:'Herramientas de canalización ilustrativas',description:'Busca por familia y conversa sobre disponibilidad.',credit:'Imagen ilustrativa generada para esta vista'}
  ], 'Suministros con contexto');

  const studio = section('enh-section enh-studio', `<div class="wrap"><div class="enh-head"><span class="eyebrow">IMAGINA TU PROYECTO</span><h2>Combina lo que necesitas</h2><p>Una vista ilustrativa que cambia con tus elecciones. Sirve para preparar la conversación; el diseño, la factibilidad y el equipamiento final se confirman con JECHMAN.</p></div><div class="enh-studio-layout"><div class="enh-studio-form"><label for="enh-type">1. ¿Qué te interesa?<select id="enh-type"><option value="piscina">Piscina</option><option value="jacuzzi">Jacuzzi</option><option value="tinaja">Tinaja</option><option value="spa">Spa · consultar factibilidad</option><option value="sauna">Sauna · consultar factibilidad</option></select></label><label for="enh-heat">2. Forma de calefacción<select id="enh-heat"></select></label><fieldset class="enh-studio-features"><legend>3. Complementos y servicios</legend><div class="enh-feature-grid"></div></fieldset><a class="btn" id="enh-quote" href="#">Preparar cotización</a><p class="enh-note">Sin valores publicados. El mensaje se abre en WhatsApp para que lo revises antes de enviarlo; esta selección no se guarda.</p></div><div class="enh-studio-visual"><div class="enh-scene" data-type="piscina" role="img" aria-label="Vista ilustrativa del proyecto seleccionado"><div class="enh-scene-water"></div><div class="enh-scene-unit"></div><div class="enh-scene-caption"></div></div><div class="enh-studio-summary" role="status" aria-live="polite"><strong></strong><p></p></div></div></div></div>`);
  pool.querySelector('#piscina-modelos').insertAdjacentElement('beforebegin', studio);
  const type = studio.querySelector('#enh-type');
  const heat = studio.querySelector('#enh-heat');
  const featureGrid = studio.querySelector('.enh-feature-grid');
  const scene = studio.querySelector('.enh-scene');
  const typeNames = {piscina:'Piscina',jacuzzi:'Jacuzzi',tinaja:'Tinaja',spa:'Spa',sauna:'Sauna'};
  const heatByType = {
    piscina:[['sin-definir','Por definir'],['bomba-calor','Bomba de calor']],
    jacuzzi:[['sin-definir','Por definir'],['bomba-calor','Bomba de calor'],['calefont','Calefont']],
    tinaja:[['sin-definir','Por definir'],['calefont','Calefont'],['caldera-lena','Caldera a leña integrada'],['caldera-exterior','Caldera a leña exterior']],
    spa:[['sin-definir','Por definir'],['bomba-calor','Bomba de calor'],['calefont','Calefont']],
    sauna:[['sin-definir','Por definir'],['evaluar','Sistema de calor por evaluar']]
  };
  const features = [
    ['luz','Iluminación','piscina jacuzzi tinaja spa'],
    ['cobertor','Cobertor térmico','piscina jacuzzi spa'],
    ['filtro','Filtro y motobomba','piscina jacuzzi spa'],
    ['robot','Robot limpiador','piscina'],
    ['mantencion','Mantención','piscina jacuzzi tinaja spa'],
    ['pintado','Pintado o reparación','piscina']
  ];
  function renderStudioOptions() {
    heat.replaceChildren();
    heatByType[type.value].forEach(([value,label]) => { const option = new Option(label,value); heat.add(option); });
    featureGrid.replaceChildren();
    features.filter(feature => feature[2].split(' ').includes(type.value)).forEach(([value,label]) => {
      const wrapper = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox'; input.value = value; input.dataset.label = label;
      input.addEventListener('change', updateStudio);
      wrapper.append(input,document.createTextNode(label)); featureGrid.append(wrapper);
    });
    updateStudio();
  }
  function updateStudio() {
    const selected = [...featureGrid.querySelectorAll('input:checked')];
    const labels = selected.map(input => input.dataset.label);
    const heatLabel = heat.selectedOptions[0]?.textContent || 'Por definir';
    scene.dataset.type = type.value;
    scene.classList.toggle('has-heat', !['sin-definir','evaluar'].includes(heat.value));
    scene.classList.toggle('has-wood-boiler', heat.value.startsWith('caldera-'));
    scene.classList.toggle('has-cover', selected.some(input => input.value === 'cobertor'));
    scene.classList.toggle('has-light', selected.some(input => input.value === 'luz'));
    scene.classList.toggle('has-robot', selected.some(input => input.value === 'robot'));
    const chips = scene.querySelector('.enh-scene-caption'); chips.replaceChildren();
    [typeNames[type.value],heatLabel,...labels].slice(0,5).forEach(label => { const chip=document.createElement('span');chip.textContent=label;chips.append(chip); });
    const summary = `${typeNames[type.value]} · ${heatLabel}${labels.length ? ' · '+labels.join(', ') : ''}`;
    scene.setAttribute('aria-label','Ilustración de '+summary);
    studio.querySelector('.enh-studio-summary strong').textContent = summary;
    studio.querySelector('.enh-studio-summary p').textContent = 'Composición ilustrativa; ubicación y compatibilidad sujetas a evaluación técnica.';
    quote(studio.querySelector('#enh-quote'), `Hola JECHMAN, quisiera cotizar un proyecto de ${typeNames[type.value].toLowerCase()}. Calefacción: ${heatLabel}. Complementos o servicios: ${labels.length ? labels.join(', ') : 'por definir'}. ¿Podemos revisar factibilidad, disponibilidad, instalación y una cotización sin compromiso?`);
  }
  type.addEventListener('change', renderStudioOptions);
  heat.addEventListener('change', updateStudio);
  renderStudioOptions();

  const extras = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">MÁS OPCIONES PARA TU ESPACIO</span><h2>Spa, sauna y cuidado de la piscina</h2><p>Consulta factibilidad de spa y sauna. Para piscinas, conversa sobre temperado, filtración, limpieza y mantención.</p></div><div class="enh-grid"><article class="enh-card"><img src="assets/areas/jacuzzis.webp" alt="Spa exterior ilustrativo" loading="lazy"><div class="enh-card-body"><h3>Spa e hidromasaje</h3><p>Una propuesta de bienestar que requiere revisar espacio, instalación y equipamiento.</p><button class="btn small" type="button" data-studio-pick="spa">Configurar consulta</button></div></article><article class="enh-card"><img src="assets/catalog/sauna.svg" alt="Ilustración de una cabina de sauna" loading="lazy"><div class="enh-card-body"><h3>Sauna</h3><p>Consulta una solución a evaluar según espacio, ventilación y suministro.</p><button class="btn small" type="button" data-studio-pick="sauna">Configurar consulta</button></div></article><article class="enh-card"><img src="assets/catalog/robot-limpiafondos.svg" alt="Ilustración de robot limpiador de piscinas" loading="lazy"><div class="enh-card-body"><h3>Mantención y limpieza</h3><p>Robot, filtración, mantención, reparación o pintado según el estado de la piscina.</p><button class="btn small" type="button" data-studio-pick="piscina">Configurar consulta</button></div></article></div></div>`);
  pool.querySelector('.wellness-intro').insertAdjacentElement('afterend', extras);
  extras.querySelectorAll('[data-studio-pick]').forEach(button => button.addEventListener('click', () => {
    type.value = button.dataset.studioPick; renderStudioOptions();
    studio.scrollIntoView({behavior:prefersReducedMotion()?'instant':'smooth'});
    type.focus({preventScroll:true});
  }));

  const projects = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">PROYECTOS PUBLICADOS</span><h2>Trabajo que se puede ver</h2><p>Una selección de fotografías de la galería pública de JECHMAN. Cada proyecto se evalúa por separado y estas imágenes no describen el resultado de una misma obra.</p></div><div class="enh-project-grid"><figure><img src="assets/projects/installation.webp" alt="Instalación de piscina publicada por JECHMAN" loading="lazy"><figcaption>Instalación · <a href="https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/" target="_blank" rel="noopener noreferrer">Fuente JECHMAN</a></figcaption></figure><figure><img src="assets/projects/pool-installed.webp" alt="Piscina terminada publicada por JECHMAN" loading="lazy"><figcaption>Piscina · <a href="https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/" target="_blank" rel="noopener noreferrer">Fuente JECHMAN</a></figcaption></figure><figure><img src="assets/projects/pool-work.webp" alt="Piscina exterior publicada por JECHMAN" loading="lazy"><figcaption>Espacio exterior · <a href="https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/" target="_blank" rel="noopener noreferrer">Fuente JECHMAN</a></figcaption></figure></div></div>`);
  pool.append(projects);

  const tinajaHeating = document.createElement('label');
  tinajaHeating.textContent = 'Forma de calefacción';
  tinajaHeating.innerHTML += '<select id="tinaja-heating"><option>Por definir</option><option>Calefont</option><option>Caldera a leña integrada</option><option>Caldera a leña exterior</option></select>';
  tinaja.querySelector('#tinaja-boiler').closest('label').insertAdjacentElement('afterend', tinajaHeating);
  function updateTinajaQuote() {
    const value = id => tinaja.querySelector('#'+id).value;
    quote(tinaja.querySelector('#tinaja-quote'), `Hola JECHMAN, quisiera cotizar una tinaja. Capacidad: ${value('tinaja-capacity')}. Madera: ${value('tinaja-wood')}. Caldera: ${value('tinaja-boiler')}. Forma de calefacción: ${value('tinaja-heating')}. Recubrimiento: ${value('tinaja-lining')}. Equipamiento: ${value('tinaja-options')}. Instalación: ${value('tinaja-install')}. ¿Podemos confirmar factibilidad y cotización?`);
  }
  tinaja.querySelectorAll('#tinaja-config select').forEach(select => select.addEventListener('change', updateTinajaQuote));
  updateTinajaQuote();

  const electricValue = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">PROPUESTA DE VALOR</span><h2>Del plano a un sistema que funcione</h2><p>Reúne tu necesidad eléctrica en una sola conversación: diseño, instalación, tablero, control y materiales. JECHMAN confirma alcance y profesionales habilitados antes de cotizar trabajos que los requieran.</p></div><div class="enh-grid"><article class="enh-card"><div class="enh-card-body"><h3>Planificar</h3><p>Entender cargas, espacio, seguridad y crecimiento posible antes de elegir componentes.</p></div></article><article class="enh-card"><div class="enh-card-body"><h3>Implementar</h3><p>Coordinar instalaciones, montaje y tableros según los requerimientos del proyecto.</p></div></article><article class="enh-card"><div class="enh-card-body"><h3>Conectar</h3><p>Explorar automatización, domótica e inmótica para viviendas y edificios.</p></div></article></div></div>`);
  electric.querySelector('.enh-mast').insertAdjacentElement('afterend', electricValue);
  const serviceGroups = [
    ['Diseño y montaje',['Proyectos eléctricos','Instalaciones domiciliarias e industriales','Montaje eléctrico industrial','Fabricación y armado de tableros','Planos eléctricos','Puesta a tierra']],
    ['Control y energía',['Automatización y control','Domótica para viviendas','Inmótica para edificios','Sistemas inteligentes','Iluminación','Paneles solares / fotovoltaica','Sistemas eólicos']],
    ['Revisión y continuidad',['Mantención de instalaciones','Regularización de instalaciones','Declaración SEC (TE1), sujeta a habilitación','Aumento de capacidad']],
    ['Materiales',['Comercialización de materiales eléctricos']]
  ];
  const servicePicker = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">TRABAJOS A CONSULTAR</span><h2>Selecciona lo que necesitas</h2><p>Marca uno o varios temas. La disponibilidad, el alcance y los trámites se confirman caso a caso.</p></div><div class="enh-service-picker"><div class="enh-service-groups"></div><p class="enh-service-status" role="status"></p><a class="btn" id="enh-electric-quote" href="#">Preparar consulta eléctrica</a><p class="enh-note">El mensaje queda editable en WhatsApp y solo se envía si tú presionas Enviar.</p></div></div>`);
  electricValue.insertAdjacentElement('afterend', servicePicker);
  const groupRoot = servicePicker.querySelector('.enh-service-groups');
  serviceGroups.forEach(([heading,items]) => {
    const group = document.createElement('div');
    const title = document.createElement('h3');title.textContent=heading;group.append(title);
    items.forEach(item => {const label=document.createElement('label');const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.value=item;checkbox.addEventListener('change', updateElectricQuote);label.append(checkbox,document.createTextNode(item));group.append(label);});
    groupRoot.append(group);
  });
  function updateElectricQuote() {
    const selected = [...groupRoot.querySelectorAll('input:checked')].map(input => input.value);
    servicePicker.querySelector('.enh-service-status').textContent = selected.length ? `${selected.length} ${selected.length===1?'tema seleccionado':'temas seleccionados'}` : 'Selecciona temas o envía una consulta general.';
    quote(servicePicker.querySelector('#enh-electric-quote'), `Hola JECHMAN, quisiera consultar por un proyecto eléctrico. Temas: ${selected.length ? selected.join(', ') : 'orientación general'}. ¿Podemos revisar alcance, factibilidad y cotización?`);
  }
  updateElectricQuote();

  const lighting = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">ILUMINACIÓN</span><h2>La luz transforma el espacio</h2><p>Explora un ambiente de referencia. Temperatura, potencia, protección y compatibilidad se definen con el equipo técnico.</p></div><div class="enh-light-panel"><div><h3>Prueba el ambiente</h3><p>Selecciona un tono para ver cómo cambia esta vista ilustrativa.</p><div class="enh-light-choice" role="group" aria-label="Tono de iluminación"><button type="button" style="--swatch:#f6d399" data-light="#f6d399" data-name="Cálida" aria-label="Luz cálida" aria-pressed="false"></button><button type="button" style="--swatch:#fff5d6" data-light="#fff5d6" data-name="Neutra" aria-label="Luz neutra" aria-pressed="false"></button><button type="button" style="--swatch:#b9f4ff" data-light="#b9f4ff" data-name="Fría" aria-label="Luz fría" aria-pressed="true"></button></div><p id="enh-light-status" role="status">Ambiente de referencia: luz fría.</p><a class="btn outline" href="#/tienda?categoria=Iluminaci%C3%B3n">Ver iluminación en Tienda</a></div><div class="enh-light-preview" role="img" aria-label="Ambiente ilustrativo con luz fría"></div></div></div>`);
  servicePicker.insertAdjacentElement('afterend', lighting);
  lighting.querySelectorAll('[data-light]').forEach(button => button.addEventListener('click', () => {
    lighting.querySelectorAll('[data-light]').forEach(other => other.setAttribute('aria-pressed',String(other===button)));
    const preview=lighting.querySelector('.enh-light-preview');preview.style.setProperty('--enh-light',button.dataset.light);preview.setAttribute('aria-label','Ambiente ilustrativo con luz '+button.dataset.name.toLowerCase());
    lighting.querySelector('#enh-light-status').textContent='Ambiente de referencia: luz '+button.dataset.name.toLowerCase()+'.';
  }));

  // Add specific quote-only catalog entries without changing the existing product flows.
  ['Robots y limpieza','Bombas y filtros','Cubiertas térmicas','Spa y sauna'].forEach(category => {if(!categories.includes(category)) categories.push(category);});
  products.push(
    {name:'Robot limpiafondos para piscina',category:'Robots y limpieza',image:'assets/catalog/robot-limpiafondos.svg',description:'Limpieza automatizada del fondo. Consulta compatibilidad, disponibilidad y especificaciones del equipo.'},
    {name:'Bomba de calor para piscina',category:'Climatización',image:'assets/catalog/bomba-calor.webp',description:'Equipo ilustrativo para consultar temperado de piscina. Capacidad e instalación se evalúan según volumen y lugar.'},
    {name:'Filtro para piscina',category:'Bombas y filtros',image:'assets/catalog/filtro.svg',description:'Filtración para piscina. Medio filtrante, caudal y tamaño requieren selección técnica.'},
    {name:'Motobomba para piscina',category:'Bombas y filtros',image:'assets/catalog/motobomba.svg',description:'Recirculación para piscina. Consulta caudal y compatibilidad con el filtro.'},
    {name:'Cobertor térmico para piscina',category:'Cubiertas térmicas',image:'assets/catalog/cobertor-termico.svg',description:'Cubierta ilustrativa para consultar medidas, material y forma de uso.'},
    {name:'Spa e hidromasaje',category:'Spa y sauna',image:'assets/areas/jacuzzis.webp',description:'Solución de bienestar para evaluar espacio, instalación y equipamiento.'},
    {name:'Sauna',category:'Spa y sauna',image:'assets/catalog/sauna.svg',description:'Consulta de factibilidad para una cabina de sauna y sus requerimientos técnicos.'},
    {name:'Calefont para tinaja o jacuzzi',category:'Climatización',image:'assets/catalog/calefont.svg',description:'Calefont ilustrativo; equipo específico y conexión por confirmar.'},
    {name:'Caldera a leña exterior para tinaja',category:'Climatización',image:'assets/catalog/caldera-lena.svg',description:'Caldera exterior ilustrativa para consultar según espacio y configuración.'}
  );
  const shopIntro = section('enh-shop-intro', `<div class="wrap"><div class="enh-head"><span class="eyebrow">ENCUENTRA TU SOLUCIÓN</span><h2>Explora por necesidad</h2><p>Productos y servicios para consultar al equipo. Las fotografías e ilustraciones muestran familias de referencia; no son fichas de modelos confirmados.</p></div><div class="enh-shop-categories"><a href="#/tienda?categoria=Climatizaci%C3%B3n">Temperado</a><a href="#/tienda?categoria=Robots%20y%20limpieza">Robots</a><a href="#/tienda?categoria=Bombas%20y%20filtros">Bombas y filtros</a><a href="#/tienda?categoria=Cubiertas%20t%C3%A9rmicas">Cobertores</a><a href="#/tienda?categoria=Iluminaci%C3%B3n">Iluminación</a><a href="#/tienda?categoria=Spa%20y%20sauna">Spa y sauna</a></div></div>`);
  shop.querySelector('.page-hero').insertAdjacentElement('afterend', shopIntro);
  const catalog = shop.querySelector('#catalog-grid');
  const skeletonObserver = new MutationObserver(() => {
    catalog.querySelectorAll('.catalog-media:not([data-enhanced])').forEach(media => {
      media.dataset.enhanced='true';media.classList.add('is-loading');
      const image=media.querySelector('img');
      const done=()=>media.classList.remove('is-loading');
      image.addEventListener('load',done,{once:true});image.addEventListener('error',done,{once:true});
      if(image.complete)done();
    });
  });
  skeletonObserver.observe(catalog,{childList:true});
  if(location.hash.startsWith('#/tienda')){renderFilters();renderCatalog();}
})();
