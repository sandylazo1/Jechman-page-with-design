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
    let keyboardFocus = false;
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
    function start() { stop(); if (!view.hidden && !keyboardFocus && !prefersReducedMotion() && !document.hidden) timer = setInterval(() => show(index + 1), 3500); }
    panel.querySelector('.enh-prev').addEventListener('click', () => { show(index - 1); start(); });
    panel.querySelector('.enh-next').addEventListener('click', () => { show(index + 1); start(); });
    panel.addEventListener('focusin', event => { if (event.target.matches(':focus-visible')) { keyboardFocus = true; stop(); } });
    panel.addEventListener('focusout', event => { if (!panel.contains(event.relatedTarget)) { keyboardFocus = false; start(); } });
    panel.addEventListener('pointerup', () => { keyboardFocus = false; start(); });
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
    {src:'assets/areas/jacuzzis.webp',alt:'Jacuzzi exterior',description:'Jacuzzis y espacios de bienestar para conversar en detalle.',credit:'Bradrey Nassel / Unsplash',url:'https://unsplash.com/photos/a-hot-tub-in-a-backyard-surrounded-by-greenery-wJ7zd8SvnpM'}
  ], 'Ideas para disfrutar el agua');
  createCarousel(electric, [
    {src:'assets/areas/electricidad.webp',alt:'Tablero de control eléctrico',description:'Instalaciones y tableros con una conversación técnica desde el inicio.',credit:'Aleksandr Lyaptsev / Unsplash',url:'https://unsplash.com/photos/electrical-panel-with-wires-and-components-q0Jo_J5YxHY'},
    {src:'assets/catalog/tablero-electrico.webp',alt:'Gabinete y tablero eléctrico',description:'Distribución, protección y control según el proyecto.',credit:'Visual de referencia'},
    {src:'assets/areas/iluminacion-pexels.jpeg',alt:'Luminarias decorativas de interior',description:'La iluminación también define cómo se vive un espacio.',credit:'Anchornhaven / Pexels',url:'https://www.pexels.com/photo/colorful-modern-pendant-lights-in-cozy-setting-35128229/'}
  ], 'Ingeniería que acompaña el proyecto');
  createCarousel(commercial, [
    {src:'assets/areas/comercial.webp',alt:'Suministros de ferretería',description:'Materiales y herramientas para cada etapa.',credit:'KC Shum / Unsplash',url:'https://unsplash.com/photos/a-cluttered-hardware-store-aisle-with-various-items-tE6zayejDNY'},
    {src:'assets/catalog/hidraulica.webp',alt:'Conexiones hidráulicas',description:'Tuberías y fittings para consultar según especificación.',credit:'Visual de referencia'},
    {src:'assets/catalog/herramientas.webp',alt:'Herramientas de canalización',description:'Busca por familia y conversa sobre disponibilidad.',credit:'Visual de referencia'}
  ], 'Suministros con contexto');

  const studio = section('enh-section enh-studio', `<div class="wrap"><div class="enh-head"><h2>Combina lo que necesitas</h2><p>Elige el tipo de proyecto y sus complementos. La fotografía sirve como referencia general; JECHMAN revisará el diseño y la compatibilidad de cada opción.</p></div><div class="enh-studio-layout"><div class="enh-studio-form"><label for="enh-type">1. ¿Qué te interesa?<select id="enh-type"><option value="piscina">Piscina</option><option value="jacuzzi">Jacuzzi</option><option value="tinaja">Tinaja</option><option value="spa">Spa · consultar factibilidad</option><option value="sauna">Sauna · consultar factibilidad</option></select></label><label for="enh-heat">2. Forma de calefacción<select id="enh-heat"></select></label><fieldset class="enh-studio-features"><legend>3. Complementos y servicios</legend><div class="enh-feature-grid"></div></fieldset><a class="btn" id="enh-quote" href="#">Preparar cotización</a><p class="enh-note">Sin precios publicados. Revisa el mensaje en WhatsApp antes de enviarlo. Para conservar la selección, pulsa «Agregar a mi proyecto».</p></div><div class="enh-studio-visual"><div class="enh-scene" data-type="piscina"><img class="enh-scene-photo" src="assets/projects/pool-installed.webp" alt="Piscina publicada por JECHMAN" loading="lazy" width="900" height="650"><div class="enh-scene-caption"></div></div><div class="enh-studio-gallery" role="group" aria-label="Fotografías del tipo de proyecto"></div><div class="enh-studio-summary" role="status" aria-live="polite"><strong></strong><p></p></div></div></div></div>`);
  pool.querySelector('#piscina-modelos').insertAdjacentElement('beforebegin', studio);
  const type = studio.querySelector('#enh-type');
  const heat = studio.querySelector('#enh-heat');
  const featureGrid = studio.querySelector('.enh-feature-grid');
  const scene = studio.querySelector('.enh-scene');
  const studioPhotos={
    piscina:[['assets/editorial/pool-hero-1600.webp','Piscina rectangular en jardín','Render editorial'],['assets/projects/pool-installed.webp','Piscina publicada por JECHMAN','Fotografía JECHMAN'],['assets/projects/pool-work.webp','Piscina exterior publicada por JECHMAN','Fotografía JECHMAN']],
    jacuzzi:[['assets/editorial/jacuzzi-1600.webp','Jacuzzi exterior','Render editorial'],['assets/areas/jacuzzis.webp','Jacuzzi exterior de referencia','Bradrey Nassel / Unsplash'],['assets/catalog/jacuzzi.webp','Jacuzzi de fibra de vidrio de referencia','Visual de referencia']],
    tinaja:[['assets/editorial/tinaja-1600.webp','Tinaja de madera exterior','Render editorial'],['assets/projects/tinaja-official.webp','Tinaja publicada por JECHMAN','Fotografía JECHMAN'],['assets/areas/tinajas.webp','Tinaja exterior de referencia','Clay Banks / Unsplash']],
    spa:[['assets/editorial/jacuzzi-1600.webp','Espacio de bienestar','Render editorial'],['assets/areas/jacuzzis.webp','Espacio de bienestar de referencia','Bradrey Nassel / Unsplash'],['assets/areas/tinajas.webp','Tinaja exterior de referencia','Clay Banks / Unsplash']],
    sauna:[['assets/editorial/sauna-1600.webp','Sauna en espacio de bienestar','Render editorial']]
  };
  const studioGallery=studio.querySelector('.enh-studio-gallery');
  const visualFeatures=document.createElement('div');
  visualFeatures.className='enh-visual-features';
  visualFeatures.setAttribute('role','status');
  visualFeatures.setAttribute('aria-live','polite');
  scene.insertAdjacentElement('afterend',visualFeatures);
  function showStudioPhoto(index){const photos=studioPhotos[type.value],item=photos[index];if(!item)return;const image=scene.querySelector('.enh-scene-photo');image.src=item[0];image.alt=item[1];studioGallery.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));}
  function renderStudioGallery(){studioGallery.replaceChildren();studioPhotos[type.value].forEach((item,index)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`Ver fotografía ${index+1}: ${item[1]}`);button.setAttribute('aria-pressed',String(index===0));const image=document.createElement('img');image.src=item[0];image.alt='';image.loading='lazy';button.append(image);button.addEventListener('click',()=>showStudioPhoto(index));studioGallery.append(button);});showStudioPhoto(0);}
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
    renderStudioGallery();
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
    scene.classList.toggle('has-light',selected.some(input=>input.value==='luz'));
    scene.classList.toggle('has-cover',selected.some(input=>input.value==='cobertor'));
    scene.classList.toggle('has-heat',heat.value==='bomba-calor'||heat.value==='calefont');
    scene.classList.toggle('has-wood-boiler',heat.value.startsWith('caldera'));
    scene.classList.toggle('has-robot',selected.some(input=>input.value==='robot'));
    visualFeatures.replaceChildren();
    [typeNames[type.value],heatLabel,...labels].forEach(label=>{const chip=document.createElement('span');chip.textContent=label;visualFeatures.append(chip)});
    const chips = scene.querySelector('.enh-scene-caption'); chips.replaceChildren();
    [typeNames[type.value],heatLabel,...labels].slice(0,5).forEach(label => { const chip=document.createElement('span');chip.textContent=label;chips.append(chip); });
    const summary = `${typeNames[type.value]} · ${heatLabel}${labels.length ? ' · '+labels.join(', ') : ''}`;
    studio.querySelector('.enh-studio-summary strong').textContent = summary;
    studio.querySelector('.enh-studio-summary p').textContent = 'Vista conceptual: las opciones seleccionadas se señalan sobre la foto y en las etiquetas. La compatibilidad se confirma al cotizar.';
    quote(studio.querySelector('#enh-quote'), `Hola JECHMAN, quisiera cotizar un proyecto de ${typeNames[type.value].toLowerCase()}. Calefacción: ${heatLabel}. Complementos o servicios: ${labels.length ? labels.join(', ') : 'por definir'}. ¿Podemos revisar factibilidad, disponibilidad, instalación y una cotización sin compromiso?`);
  }
  type.addEventListener('change', renderStudioOptions);
  heat.addEventListener('change', updateStudio);
  renderStudioOptions();

  const extras = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">MÁS OPCIONES PARA TU ESPACIO</span><h2>Spa, sauna y cuidado de la piscina</h2><p>Consulta factibilidad de spa y sauna. Para piscinas, conversa sobre temperado, filtración, limpieza y mantención.</p></div><div class="enh-grid"><article class="enh-card"><img src="assets/areas/jacuzzis.webp" alt="Spa exterior ilustrativo" loading="lazy"><div class="enh-card-body"><h3>Spa e hidromasaje</h3><p>Una propuesta de bienestar que requiere revisar espacio, instalación y equipamiento.</p><button class="btn small" type="button" data-studio-pick="spa">Configurar consulta</button></div></article><article class="enh-card"><img src="assets/catalog/sauna.svg" alt="Ilustración de una cabina de sauna" loading="lazy"><div class="enh-card-body"><h3>Sauna</h3><p>Consulta una solución a evaluar según espacio, ventilación y suministro.</p><button class="btn small" type="button" data-studio-pick="sauna">Configurar consulta</button></div></article><article class="enh-card"><img src="assets/catalog/zuipy-300.png" alt="Robot limpiafondos Vulcano ZUIPY 300" loading="lazy"><div class="enh-card-body"><h3>Mantención y limpieza</h3><p>Robot, filtración, mantención, reparación o pintado según el estado de la piscina.</p><button class="btn small" type="button" data-studio-pick="piscina">Configurar consulta</button></div></article></div></div>`);
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

  const electricValue = section('enh-section', `<div class="wrap"><div class="enh-head"><h2>Del plano a un sistema que funcione</h2><p>Reúne tu necesidad eléctrica en una sola conversación: diseño, instalación, tablero, control y materiales. JECHMAN confirma alcance y profesionales habilitados antes de cotizar trabajos que los requieran.</p></div><div class="enh-grid"><article class="enh-card"><div class="enh-card-body"><h3>Planificar</h3><p>Entender cargas, espacio, seguridad y crecimiento posible antes de elegir componentes.</p></div></article><article class="enh-card"><div class="enh-card-body"><h3>Implementar</h3><p>Coordinar instalaciones, montaje y tableros según los requerimientos del proyecto.</p></div></article><article class="enh-card"><div class="enh-card-body"><h3>Conectar</h3><p>Explorar automatización, domótica e inmótica para viviendas y edificios.</p></div></article></div></div>`);
  electric.querySelector('.enh-mast').insertAdjacentElement('afterend', electricValue);
  const electricShowcase = section('enh-section enh-electric-showcase', `<div class="wrap"><div class="enh-head"><h2>La electricidad que imaginas, en detalle</h2><p>Elige un tema para ver sus posibilidades y preparar una consulta. Cada instalación requiere revisar el lugar, los equipos y la factibilidad técnica.</p></div><div class="enh-electric-layout"><div class="enh-electric-options" role="group" aria-label="Explorar soluciones eléctricas"></div><div class="enh-electric-feature"><div class="enh-electric-image"><img alt="" loading="lazy" decoding="async" width="800" height="500"></div><div class="enh-electric-copy"><span class="enh-electric-status"></span><h3></h3><p></p><ul></ul><a class="btn" href="#">Explorar solución</a></div></div></div></div>`);
  electricValue.insertAdjacentElement('afterend', electricShowcase);
  const showcaseItems = [
    {title:'Domótica',label:'Hogar conectado',image:'domotica',status:'Propuesta a evaluar',text:'Escenas de luz, sensores y control coordinado para una vivienda más cómoda.',points:['Iluminación y escenas','Control desde dispositivos','Integración sujeta a compatibilidad'],route:'#/electricidad/domotica'},
    {title:'Inmótica',label:'Edificios inteligentes',image:'inmotica',status:'Propuesta a evaluar',text:'Explora una gestión conectada de zonas compartidas, iluminación y monitoreo.',points:['Control por zonas','Monitoreo de sistemas','Alcance según evaluación'],route:'#/electricidad/inmotica'},
    {title:'Tableros eléctricos',label:'Protección y distribución',image:'electric',status:'Catálogo JECHMAN',text:'Componentes para distribuir, proteger y organizar circuitos de acuerdo con el proyecto.',points:['Tableros y componentes','Montaje a consultar','Revisión técnica de cargas'],route:'#/electricidad/tableros'},
    {title:'Paneles solares',label:'Energía para estudiar',image:'energy',status:'Propuesta a evaluar',text:'Conversemos sobre consumo, cubierta disponible y una eventual solución fotovoltaica.',points:['Evaluación del lugar','Revisión de consumo','Instalación sujeta a factibilidad'],route:'#/electricidad/paneles-solares'}
  ];
  const showcaseOptions=electricShowcase.querySelector('.enh-electric-options');
  const showcaseFeature=electricShowcase.querySelector('.enh-electric-feature');
  function selectShowcase(index){
    const item=showcaseItems[index];
    showcaseOptions.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    const image=showcaseFeature.querySelector('img');image.src=`assets/editorial/${item.image}-800.webp`;image.alt=`Vista conceptual de ${item.title.toLowerCase()}`;
    showcaseFeature.querySelector('.enh-electric-status').textContent=item.status;
    showcaseFeature.querySelector('h3').textContent=item.title;
    showcaseFeature.querySelector('p').textContent=item.text;
    const list=showcaseFeature.querySelector('ul');list.replaceChildren();item.points.forEach(point=>{const li=document.createElement('li');li.textContent=point;list.append(li)});
    showcaseFeature.querySelector('a').href=item.route;
    showcaseFeature.querySelector('a').textContent=`Explorar ${item.title.toLowerCase()}`;
  }
  showcaseItems.forEach((item,index)=>{const button=document.createElement('button');button.type='button';button.innerHTML=`<span>${item.label}</span><strong>${item.title}</strong>`;button.addEventListener('click',()=>selectShowcase(index));showcaseOptions.append(button)});
  selectShowcase(0);
  const serviceGroups = [
    ['Diseño y montaje',['Proyectos eléctricos','Instalaciones domiciliarias e industriales','Montaje eléctrico industrial','Fabricación y armado de tableros','Planos eléctricos','Puesta a tierra']],
    ['Control y energía',['Automatización y control','Domótica para viviendas','Inmótica para edificios','Sistemas inteligentes','Iluminación','Paneles solares / fotovoltaica','Sistemas eólicos']],
    ['Revisión y continuidad',['Mantención de instalaciones','Regularización de instalaciones','Declaración SEC (TE1), sujeta a habilitación','Aumento de capacidad']],
    ['Materiales',['Comercialización de materiales eléctricos']]
  ];
  const servicePicker = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">TRABAJOS A CONSULTAR</span><h2>Selecciona lo que necesitas</h2><p>Marca uno o varios temas. La disponibilidad, el alcance y los trámites se confirman caso a caso.</p></div><div class="enh-service-picker"><div class="enh-service-groups"></div><p class="enh-service-status" role="status"></p><a class="btn" id="enh-electric-quote" href="#">Preparar consulta eléctrica</a><p class="enh-note">El mensaje queda editable en WhatsApp y solo se envía si tú presionas Enviar.</p></div></div>`);
  electricShowcase.insertAdjacentElement('afterend', servicePicker);
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
    {name:'Robot limpiafondos Vulcano ZUIPY 300',category:'Robots y limpieza',image:'assets/catalog/zuipy-300.png',description:'Robot limpiafondos Vulcano ZUIPY 300 para piso, paredes y línea de agua. Consulta disponibilidad, compatibilidad y condiciones de instalación.'},
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
