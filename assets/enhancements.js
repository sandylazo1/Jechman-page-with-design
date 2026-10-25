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
    const panel = section('enh-mast', `<div class="wrap enh-mast-inner"><div class="enh-mast-media is-loading"><img alt="" loading="lazy" decoding="async"><div class="enh-mast-credit"></div></div><div class="enh-mast-copy"><span class="eyebrow">INSPIRACIÓN VISUAL</span><h2>${heading}</h2><strong class="enh-mast-benefit"></strong><p class="enh-mast-description"></p><div class="enh-mast-actions"><a class="btn enh-mast-explore" href="#">Explorar</a><a class="enh-mast-quote" href="#" target="_blank" rel="noopener noreferrer">Pedir una cotización <span aria-hidden="true">↗</span></a></div><div class="enh-mast-controls"><button type="button" class="enh-prev" aria-label="Foto anterior">‹</button><span class="enh-mast-count" aria-live="polite"></span><button type="button" class="enh-next" aria-label="Foto siguiente">›</button><div class="enh-mast-dots" role="group" aria-label="Elegir foto"></div></div></div></div>`);
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
      panel.querySelector('.enh-mast-benefit').textContent = slide.benefit;
      const explore=panel.querySelector('.enh-mast-explore');explore.href=slide.href;explore.textContent=slide.cta;
      quote(panel.querySelector('.enh-mast-quote'),`Hola JECHMAN, quisiera cotizar ${slide.quote}. ¿Podemos revisar opciones, disponibilidad y alcance de instalación?`);
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
    {src:'assets/photography/backyard-pool-38495442.jpg',alt:'Piscina en jardín residencial',benefit:'Más tiempo para disfrutar en casa.',description:'Imagina tardes de agua, luz y descanso con un diseño que se revisa para tu espacio.',href:'#/piscinas/configurar',cta:'Diseñar mi piscina',quote:'una piscina con iluminación',credit:'Fotografía de referencia'},
    {src:'assets/photography/backyard-pool-36777960.jpg',alt:'Piscina junto a vivienda',benefit:'Un lugar para reunirse y desconectar.',description:'Compara tamaños y conversa sobre instalación y cuidado para que el proyecto sea más sencillo.',href:'#/piscinas',cta:'Ver modelos',quote:'una piscina y su instalación',credit:'Fotografía de referencia'}
  ], 'Ideas para disfrutar el agua');
  createCarousel(electric, [
    {src:'assets/photography/electric-install.jpg',alt:'Técnicos trabajando en una instalación eléctrica de referencia',benefit:'Más tranquilidad para cada espacio.',description:'Organiza la instalación desde las necesidades reales de tu casa o proyecto.',href:'#/electricidad/instalaciones',cta:'Explorar instalaciones',quote:'una instalación eléctrica',credit:'Fotografía de referencia / Pexels',url:'https://www.pexels.com/photo/electricians-at-work-10871585/'},
    {src:'assets/catalog/tablero-electrico.webp',alt:'Gabinete y tablero eléctrico',benefit:'Control que acompaña el uso diario.',description:'Revisa tableros, protecciones y posibilidades de automatización con criterio técnico.',href:'#/electricidad/tableros',cta:'Ver tableros',quote:'un tablero eléctrico',credit:'Visual de referencia'},
    {src:'assets/photography/solar-install.jpg',alt:'Instalador trabajando con paneles solares, fotografía de referencia',benefit:'Energía para proyectar el futuro.',description:'Evalúa paneles solares, consumo y factibilidad técnica según tu inmueble.',href:'#/electricidad/paneles-solares',cta:'Explorar energía solar',quote:'paneles solares para mi proyecto',credit:'Fotografía de referencia / Pexels',url:'https://www.pexels.com/photo/man-wearing-safety-glasses-and-gloves-holding-solar-panels-on-the-roof-9875411/'}
  ], 'Ingeniería que acompaña el proyecto');
  createCarousel(commercial, [
    {src:'assets/areas/comercial.webp',alt:'Suministros de ferretería',benefit:'Todo empieza con los materiales correctos.',description:'Reúne lo que necesitas y prepara una conversación con el equipo.',href:'#/tienda',cta:'Explorar tienda',quote:'materiales y suministros para mi proyecto',credit:'KC Shum / Unsplash',url:'https://unsplash.com/photos/a-cluttered-hardware-store-aisle-with-various-items-tE6zayejDNY'},
    {src:'assets/catalog/hidraulica.webp',alt:'Conexiones hidráulicas',benefit:'Cada conexión merece atención.',description:'Encuentra familias de tuberías y fittings para revisar por medida y aplicación.',href:'#/tienda?categoria=Ferreter%C3%ADa%2FHidr%C3%A1ulica',cta:'Ver hidráulica',quote:'tuberías y fittings',credit:'Visual de referencia'},
    {src:'assets/catalog/herramientas.webp',alt:'Herramientas de canalización',benefit:'Avanza con una lista clara.',description:'Explora herramientas y materiales; comparte cantidades y especificaciones al cotizar.',href:'#/comercial/herramientas',cta:'Ver herramientas',quote:'herramientas y materiales',credit:'Visual de referencia'}
  ], 'Suministros con contexto');

  const commercialStory=section('enh-section enh-commercial-story', `<div class="wrap"><div class="enh-head"><h2>Del material a la obra terminada</h2><p>JECHMAN publica trabajos de piscinas e instalación. Úsalos para imaginar el alcance de tu proyecto y reúne los productos que necesitas cotizar.</p></div><div class="enh-commercial-layout"><div class="enh-commercial-photos"><img src="assets/projects/installation.webp" alt="Etapa de instalación de piscina publicada por JECHMAN" loading="lazy"><img src="assets/projects/pool-installed.webp" alt="Piscina instalada publicada por JECHMAN" loading="lazy"></div><div class="enh-commercial-content"><div class="enh-commercial-options" role="group" aria-label="Elegir familia de soluciones"><button type="button" data-commercial="0" aria-pressed="true">Proyecto integral</button><button type="button" data-commercial="1" aria-pressed="false">Agua y filtración</button><button type="button" data-commercial="2" aria-pressed="false">Electricidad y control</button><button type="button" data-commercial="3" aria-pressed="false">Construcción</button></div><h3></h3><p></p><div class="enh-commercial-links"><a class="btn" href="#">Cotizar la selección</a><a class="enh-commercial-browse" href="#/tienda">Explorar productos ↗</a></div><small>Fotos de trabajos publicadas por JECHMAN. Los equipos, etapas y alcances se definen para cada obra.</small></div></div></div>`);
  commercial.querySelector('.enh-mast').insertAdjacentElement('afterend',commercialStory);
  const commercialOptions=[
    {title:'Una solución que conecta todas las etapas',text:'Piscina, instalación, filtración, climatización y terminaciones en una solicitud coordinada.',quote:'un proyecto integral de piscina con instalación, filtración y climatización',route:'#/piscinas'},
    {title:'Agua lista para disfrutar',text:'Bombas, filtros, robot y cobertor se eligen según medidas, caudal y uso.',quote:'equipamiento de filtración, robot y accesorios de piscina',route:'#/tienda?categoria=Accesorios%20de%20piscina'},
    {title:'Energía y control para tu espacio',text:'Tableros, iluminación y automatización para consultar junto con el proyecto.',quote:'tableros, iluminación y automatización para mi proyecto',route:'#/electricidad'},
    {title:'Materiales que hacen avanzar la obra',text:'Reúne tuberías, fittings, herramientas y materiales con medidas y cantidades.',quote:'materiales de construcción, ferretería e hidráulica',route:'#/tienda?categoria=Ferreter%C3%ADa%2FHidr%C3%A1ulica'}
  ];
  function selectCommercial(index){const item=commercialOptions[index],root=commercialStory;root.querySelectorAll('[data-commercial]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));root.querySelector('h3').textContent=item.title;root.querySelector('.enh-commercial-content p').textContent=item.text;root.querySelector('.enh-commercial-browse').href=item.route;quote(root.querySelector('.enh-commercial-links .btn'),`Hola JECHMAN, quisiera cotizar ${item.quote}. ¿Podemos revisar opciones, disponibilidad y alcance?`)}
  commercialStory.querySelectorAll('[data-commercial]').forEach((button,index)=>button.addEventListener('click',()=>selectCommercial(index)));
  selectCommercial(0);

  const studio = section('enh-section enh-studio', `<div class="wrap"><div class="enh-head"><h2>Combina lo que necesitas</h2><p>Prueba distintas escenas reales y añade equipos de referencia. Cuéntanos qué necesitas: revisaremos compatibilidad, instalación y envío a tu región.</p></div><div class="enh-studio-layout"><div class="enh-studio-form"><label for="enh-type">1. ¿Qué te interesa?<select id="enh-type"><option value="piscina">Piscina</option><option value="piscina-jacuzzi">Piscina con jacuzzi integrado</option><option value="jacuzzi">Jacuzzi</option><option value="tinaja">Tinaja</option><option value="spa">Spa · consultar factibilidad</option><option value="sauna">Sauna · consultar factibilidad</option></select></label><label for="enh-heat">2. Forma de calefacción<select id="enh-heat"></select></label><fieldset class="enh-studio-features"><legend>3. Complementos y servicios</legend><div class="enh-feature-grid"></div></fieldset><a class="btn" id="enh-quote" href="#">Preparar cotización</a><p class="enh-note">Las imágenes son una composición visual de referencia. Confirmamos medidas, equipamiento, instalación y despacho antes de cotizar.</p></div><div class="enh-studio-visual"><div class="enh-scene" data-type="piscina"><img class="enh-scene-photo" src="assets/photography/studio-pool-chile-8839767.jpg" alt="Piscina exterior en Chile" loading="lazy" width="900" height="650"><div class="enh-product-layer" aria-hidden="true"><img class="enh-overlay enh-overlay--robot" src="assets/photography/zuipy-300-cutout.png" alt=""><img class="enh-overlay enh-overlay--heat" src="assets/photography/heat-pump-cutout.png" alt=""></div><div class="enh-scene-caption"></div></div><div class="enh-studio-gallery" role="group" aria-label="Escenas del tipo de proyecto"></div><div class="enh-studio-summary" role="status" aria-live="polite"><strong></strong><p></p></div></div></div></div>`);
  pool.querySelector('#piscina-modelos').insertAdjacentElement('beforebegin', studio);
  const type = studio.querySelector('#enh-type');
  const heat = studio.querySelector('#enh-heat');
  const featureGrid = studio.querySelector('.enh-feature-grid');
  const scene = studio.querySelector('.enh-scene');
  const studioPhotos={
    piscina:[['assets/photography/studio-pool-chile-8839767.jpg','Piscina exterior en Chile'],['assets/photography/outdoor-pool-9056670.jpg','Piscina de jardín'],['assets/photography/villa-pool-31817157.jpg','Piscina exterior junto a vivienda']],
    'piscina-jacuzzi':[['assets/jechman-products/pool-jacuzzi-clean-ai.png','Piscina de fibra con jacuzzi integrado; foto de JECHMAN sin tabla de medidas']],
    jacuzzi:[['assets/photography/spa-water-19150538.jpg','Jacuzzi con agua en funcionamiento'],['assets/jechman-products/jacuzzi-jechman.jpg','Jacuzzi publicado por JECHMAN']],
    tinaja:[['assets/jechman-products/tinaja.jpg','Tinaja de madera JECHMAN'],['assets/photography/pool-sauna-30302449.jpg','Tinaja exterior de madera']],
    spa:[['assets/photography/spa-wellness-8844604.jpg','Spa exterior en uso'],['assets/photography/spa-pool-7222183.jpg','Piscina de spa interior']],
    sauna:[['assets/photography/sauna-warm-17227605.jpg','Cabina de sauna de madera']]
  };
  const studioGallery=studio.querySelector('.enh-studio-gallery');
  const visualFeatures=document.createElement('div');
  visualFeatures.className='enh-visual-features';
  visualFeatures.setAttribute('role','status');
  visualFeatures.setAttribute('aria-live','polite');
  scene.insertAdjacentElement('afterend',visualFeatures);
  function showStudioPhoto(index){const photos=studioPhotos[type.value],item=photos[index];if(!item)return;const image=scene.querySelector('.enh-scene-photo');image.src=item[0];image.alt=item[1];studioGallery.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));}
  function renderStudioGallery(){studioGallery.replaceChildren();studioGallery.hidden=studioPhotos[type.value].length<2;studioPhotos[type.value].forEach((item,index)=>{const button=document.createElement('button');button.type='button';button.textContent=`Escena ${index+1}`;button.setAttribute('aria-label',`Ver escena ${index+1}: ${item[1]}`);button.setAttribute('aria-pressed',String(index===0));button.addEventListener('click',()=>showStudioPhoto(index));studioGallery.append(button);});showStudioPhoto(0);}
  const typeNames = {piscina:'Piscina','piscina-jacuzzi':'Piscina con jacuzzi integrado',jacuzzi:'Jacuzzi',tinaja:'Tinaja',spa:'Spa',sauna:'Sauna'};
  const heatByType = {
    piscina:[['sin-definir','Por definir'],['bomba-calor','Bomba de calor']],
    'piscina-jacuzzi':[['sin-definir','Por definir'],['bomba-calor','Bomba de calor']],
    jacuzzi:[['sin-definir','Por definir'],['bomba-calor','Bomba de calor'],['calefont','Calefont']],
    tinaja:[['sin-definir','Por definir'],['calefont','Calefont'],['caldera-lena','Caldera a leña integrada'],['caldera-exterior','Caldera a leña exterior']],
    spa:[['sin-definir','Por definir'],['bomba-calor','Bomba de calor'],['calefont','Calefont']],
    sauna:[['sin-definir','Por definir'],['evaluar','Sistema de calor por evaluar']]
  };
  const features = [
    ['luz','Iluminación','piscina piscina-jacuzzi jacuzzi tinaja spa'],
    ['cobertor','Cobertor térmico','piscina piscina-jacuzzi jacuzzi spa'],
    ['filtro','Filtro y motobomba','piscina piscina-jacuzzi jacuzzi spa'],
    ['robot','Robot limpiador','piscina piscina-jacuzzi'],
    ['mantencion','Mantención','piscina piscina-jacuzzi jacuzzi tinaja spa'],
    ['pintado','Pintado o reparación','piscina piscina-jacuzzi']
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
    studio.querySelector('.enh-studio-summary p').textContent = 'Composición visual de referencia. Los equipos superpuestos son PNG ilustrativos; validamos tamaño, posición y compatibilidad al cotizar.';
    quote(studio.querySelector('#enh-quote'), `Hola JECHMAN, quisiera cotizar un proyecto de ${typeNames[type.value].toLowerCase()}. Calefacción: ${heatLabel}. Complementos o servicios: ${labels.length ? labels.join(', ') : 'por definir'}. Estoy en [comuna y región]. ¿Podemos revisar factibilidad, disponibilidad, instalación, despacho a mi región y cotización?`);
  }
  type.addEventListener('change', renderStudioOptions);
  heat.addEventListener('change', updateStudio);
  renderStudioOptions();

  const extras = section('enh-section', `<div class="wrap"><div class="enh-head"><h2>Spa, sauna y cuidado de la piscina</h2><p>Consulta factibilidad de spa y sauna. Para piscinas, conversa sobre temperado, filtración, limpieza y mantención.</p></div><div class="enh-grid"><article class="enh-card"><img src="assets/photography/spa-water-19150538.jpg" alt="Spa de hidromasaje con agua" loading="lazy"><div class="enh-card-body"><h3>Spa e hidromasaje</h3><p>Una propuesta de bienestar que requiere revisar espacio, instalación y equipamiento.</p><button class="btn small" type="button" data-studio-pick="spa">Configurar consulta</button></div></article><article class="enh-card"><img src="assets/photography/sauna-real.jpg" alt="Sauna de madera" loading="lazy"><div class="enh-card-body"><h3>Sauna</h3><p>Consulta una solución a evaluar según espacio, ventilación y suministro.</p><button class="btn small" type="button" data-studio-pick="sauna">Configurar consulta</button></div></article><article class="enh-card"><img src="assets/photography/pool-care.jpg" alt="Persona limpiando una piscina" loading="lazy"><div class="enh-card-body"><h3>Mantención y limpieza</h3><p>Robot, filtración, mantención, reparación o pintado según el estado de la piscina.</p><button class="btn small" type="button" data-studio-pick="piscina">Configurar consulta</button></div></article></div></div>`);
  pool.querySelector('.wellness-intro').insertAdjacentElement('afterend', extras);
  extras.querySelectorAll('[data-studio-pick]').forEach(button => button.addEventListener('click', () => {
    type.value = button.dataset.studioPick; renderStudioOptions();
    studio.scrollIntoView({behavior:prefersReducedMotion()?'instant':'smooth'});
    type.focus({preventScroll:true});
  }));

  const projects = section('enh-section', `<div class="wrap"><div class="enh-head"><span class="eyebrow">PROYECTOS PUBLICADOS</span><h2>Trabajo que se puede ver</h2><p>Una selección de fotografías de la galería pública de JECHMAN. Cada proyecto se evalúa por separado y estas imágenes no describen el resultado de una misma obra.</p></div><div class="enh-project-grid"><figure><img src="assets/projects/installation.webp" alt="Instalación de piscina publicada por JECHMAN" loading="lazy"><figcaption>Instalación · <a href="https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/" target="_blank" rel="noopener noreferrer">Fuente JECHMAN</a></figcaption></figure><figure><img src="assets/projects/hero-pool.webp" alt="Piscina terminada publicada por JECHMAN" loading="lazy"><figcaption>Piscina · <a href="https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/" target="_blank" rel="noopener noreferrer">Fuente JECHMAN</a></figcaption></figure><figure><img src="assets/projects/pool-work.webp" alt="Piscina exterior publicada por JECHMAN" loading="lazy"><figcaption>Espacio exterior · <a href="https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/" target="_blank" rel="noopener noreferrer">Fuente JECHMAN</a></figcaption></figure></div></div>`);
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

  const smartDemo = section('enh-section enh-smart-demo', `<div class="wrap"><div class="enh-head"><h2>Prueba cómo respondería tu espacio</h2><p>Elige una necesidad para explorar una escena conceptual. La integración y los equipos se definen tras evaluar la instalación.</p></div><div class="enh-smart-layout"><div class="enh-smart-controls" role="group" aria-label="Escenarios de control inteligente"><button type="button" data-smart="0" aria-pressed="true">Confort en casa</button><button type="button" data-smart="1" aria-pressed="false">Uso de energía</button><button type="button" data-smart="2" aria-pressed="false">Control de acceso</button><button type="button" data-smart="3" aria-pressed="false">Bombas y tableros</button></div><div class="enh-smart-stage" data-active="false"><img src="assets/photography/smart-home.jpg" alt="Control inteligente de vivienda, fotografía de referencia" loading="lazy"><div class="enh-smart-readout" role="status" aria-live="polite"><span>SIMULACIÓN VISUAL</span><h3></h3><p></p><button class="enh-smart-toggle" type="button" aria-pressed="false">Activar escena</button><a class="btn" href="#">Cotizar esta solución</a></div></div></div></div>`);
  electric.querySelector('.enh-mast').insertAdjacentElement('afterend',smartDemo);
  const smartScenes=[
    {title:'Confort en casa',text:'Una escena puede coordinar iluminación y dispositivos desde un punto de control.',image:'assets/photography/smart-home.jpg',alt:'Persona usando control inteligente de vivienda',quote:'domótica para controlar iluminación y dispositivos en mi vivienda'},
    {title:'Uso de energía',text:'Consulta medición y automatización para comprender cuándo y cómo consumen energía tus equipos.',image:'assets/photography/solar-farm.jpg',alt:'Instalación de paneles fotovoltaicos de referencia',quote:'monitoreo energético y paneles solares'},
    {title:'Control de acceso',text:'Evalúa horarios, credenciales y trazabilidad de ingreso para un espacio compartido.',image:'assets/photography/access-control.jpg',alt:'Persona usando lector biométrico de acceso',quote:'control de accesos y monitoreo de ingresos'},
    {title:'Bombas y tableros',text:'Un tablero puede coordinar bombeo, protección y horarios de funcionamiento según ingeniería.',image:'assets/areas/electricidad.webp',alt:'Tablero eléctrico de referencia',quote:'tablero de automatización para bombas de piscina o jacuzzi'}
  ];
  function selectSmartScene(index){const item=smartScenes[index],stage=smartDemo.querySelector('.enh-smart-stage');smartDemo.querySelectorAll('[data-smart]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));stage.querySelector('img').src=item.image;stage.querySelector('img').alt=item.alt;stage.querySelector('h3').textContent=item.title;stage.querySelector('p').textContent=item.text;stage.dataset.active='false';const toggle=stage.querySelector('.enh-smart-toggle');toggle.setAttribute('aria-pressed','false');toggle.textContent='Activar escena';quote(stage.querySelector('a'),`Hola JECHMAN, quisiera cotizar ${item.quote}. ¿Podemos revisar factibilidad, equipos e instalación?`)}
  smartDemo.querySelectorAll('[data-smart]').forEach((button,index)=>button.addEventListener('click',()=>selectSmartScene(index)));
  smartDemo.querySelector('.enh-smart-toggle').addEventListener('click',event=>{const button=event.currentTarget,active=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(active));button.textContent=active?'Desactivar escena':'Activar escena';smartDemo.querySelector('.enh-smart-stage').dataset.active=String(active)});
  selectSmartScene(0);
  const electricShowcase = section('enh-section enh-electric-showcase', `<div class="wrap"><div class="enh-head"><h2>La electricidad que imaginas, en detalle</h2><p>Elige un tema para ver sus posibilidades y preparar una consulta. Cada instalación requiere revisar el lugar, los equipos y la factibilidad técnica.</p></div><div class="enh-electric-layout"><div class="enh-electric-options" role="group" aria-label="Explorar soluciones eléctricas"></div><div class="enh-electric-feature"><div class="enh-electric-image"><img alt="" loading="lazy" decoding="async" width="800" height="500"></div><div class="enh-electric-copy"><span class="enh-electric-status"></span><h3></h3><p></p><ul></ul><a class="btn" href="#">Explorar solución</a></div></div></div></div>`);
  smartDemo.insertAdjacentElement('afterend', electricShowcase);
  const showcaseItems = [
    {title:'Domótica',label:'Hogar conectado',image:'assets/editorial/domotica-1600.webp',status:'Propuesta a evaluar',text:'Escenas de luz, sensores y control coordinado para una vivienda más cómoda.',points:['Iluminación y escenas','Control desde dispositivos','Integración sujeta a compatibilidad'],route:'#/electricidad/domotica'},
    {title:'Inmótica',label:'Edificios inteligentes',image:'assets/photography/access-control.jpg',status:'Propuesta a evaluar',text:'Explora una gestión conectada de zonas compartidas, accesos y monitoreo.',points:['Control por zonas','Monitoreo de sistemas','Alcance según evaluación'],route:'#/electricidad/inmotica'},
    {title:'Tableros eléctricos',label:'Protección y distribución',image:'assets/photography/electric-install.jpg',status:'Catálogo JECHMAN',text:'Componentes para distribuir, proteger y organizar circuitos de acuerdo con el proyecto.',points:['Tableros y componentes','Montaje a consultar','Revisión técnica de cargas'],route:'#/electricidad/tableros'},
    {title:'Paneles solares',label:'Energía para estudiar',image:'assets/photography/solar-install.jpg',status:'Propuesta a evaluar',text:'Conversemos sobre consumo, cubierta disponible y una eventual solución fotovoltaica.',points:['Evaluación del lugar','Revisión de consumo','Instalación sujeta a factibilidad'],route:'#/electricidad/paneles-solares'}
  ];
  const showcaseOptions=electricShowcase.querySelector('.enh-electric-options');
  const showcaseFeature=electricShowcase.querySelector('.enh-electric-feature');
  function selectShowcase(index){
    const item=showcaseItems[index];
    showcaseOptions.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    const image=showcaseFeature.querySelector('img');image.src=item.image;image.alt=`Fotografía de referencia para ${item.title.toLowerCase()}`;
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
  const servicePicker = section('enh-section', `<div class="wrap"><div class="enh-head"><h2>Selecciona lo que necesitas</h2><p>Marca uno o varios temas. La disponibilidad, el alcance y los trámites se confirman caso a caso.</p></div><div class="enh-service-visuals" role="group" aria-label="Elegir trabajo eléctrico por imagen"><button type="button" data-service-select="Instalaciones domiciliarias e industriales" aria-pressed="false"><img src="assets/photography/electric-install.jpg" alt="Técnicos trabajando en instalación eléctrica" loading="lazy"><span>Instalaciones</span></button><button type="button" data-service-select="Paneles solares / fotovoltaica" aria-pressed="false"><img src="assets/photography/solar-install.jpg" alt="Paneles solares en instalación de referencia" loading="lazy"><span>Paneles solares</span></button><button type="button" data-service-select="Mantención de instalaciones" aria-pressed="false"><img src="assets/areas/electricidad.webp" alt="Tablero eléctrico de referencia" loading="lazy"><span>Mantención y revisión</span></button></div><div class="enh-service-picker"><div class="enh-service-groups"></div><p class="enh-service-status" role="status"></p><a class="btn" id="enh-electric-quote" href="#">Preparar consulta eléctrica</a><p class="enh-note">El mensaje queda editable en WhatsApp y solo se envía si tú presionas Enviar.</p></div></div>`);
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
    servicePicker.querySelectorAll('[data-service-select]').forEach(button=>button.setAttribute('aria-pressed',String(selected.includes(button.dataset.serviceSelect))));
  }
  servicePicker.querySelectorAll('[data-service-select]').forEach(button=>button.addEventListener('click',()=>{const input=[...groupRoot.querySelectorAll('input')].find(item=>item.value===button.dataset.serviceSelect);if(input){input.checked=!input.checked;updateElectricQuote();}}));
  updateElectricQuote();

  // Add specific quote-only catalog entries without changing the existing product flows.
  ['Robots y limpieza','Bombas y filtros','Cubiertas térmicas','Spa y sauna','Solar y energía'].forEach(category => {if(!categories.includes(category)) categories.push(category);});
  products.push(
    {name:'Robot limpiafondos Vulcano ZUIPY 300',category:'Robots y limpieza',image:'assets/catalog/zuipy-300.png',description:'Robot limpiafondos Vulcano ZUIPY 300 para piso, paredes y línea de agua. Consulta disponibilidad, compatibilidad y condiciones de instalación.'},
    {name:'Bomba de calor para piscina',category:'Climatización',image:'assets/photography/heat-pump-cutout.png',description:'Consulta temperado de piscina. Capacidad e instalación se evalúan según volumen y lugar.'},
    {name:'Motobomba para piscina',category:'Bombas y filtros',image:'assets/jechman-products/bomba-reynolds.jpg',description:'Recirculación para piscina. Consulta caudal y compatibilidad con el filtro.'},
    {name:'Cobertor térmico para piscina',category:'Cubiertas térmicas',image:'assets/photography/thermal-cover-concept-v2.png',description:'Consulta medidas, material y forma de uso para cubrir tu piscina. Imagen conceptual, no corresponde a un modelo publicado.'},
    {name:'Spa e hidromasaje',category:'Spa y sauna',image:'assets/photography/spa-pool-7222183.jpg',description:'Solución de bienestar para evaluar espacio, instalación y equipamiento.'},
    {name:'Sauna',category:'Spa y sauna',image:'assets/photography/sauna-warm-17227605.jpg',description:'Consulta de factibilidad para una cabina de sauna y sus requerimientos técnicos.'},
    {name:'Energía solar para equipamiento de piscina',category:'Accesorios de piscina',image:'assets/photography/solar-install.jpg',description:'Consulta una solución fotovoltaica para apoyar el consumo del equipamiento de piscina, incluida una eventual bomba de calor. Dimensionamiento y factibilidad sujetos a evaluación técnica.'},
    {name:'Sistema fotovoltaico para vivienda o empresa',category:'Solar y energía',image:'assets/photography/solar-farm.jpg',description:'Estudio de paneles fotovoltaicos según consumo, espacio, orientación y conexión disponible.'},
    {name:'Control de acceso y monitoreo',category:'Electricidad',image:'assets/photography/access-control.jpg',description:'Consulta integración de accesos, monitoreo y automatización para vivienda o empresa, sujeta a evaluación técnica.'},
    {name:'Calefont para tinaja o jacuzzi',category:'Climatización',image:'assets/photography/water-heater-9551366.jpg',description:'Consulta equipo y conexión apropiados para el proyecto.'},
    {name:'Caldera a leña exterior para tinaja',category:'Climatización',image:'assets/photography/pool-sauna-30302449.jpg',description:'Consulta la configuración exterior según espacio y necesidades.'}
  );
  const shopIntro = section('enh-shop-intro', `<div class="wrap"><div class="enh-head"><h2>Explora por necesidad</h2><p>Productos y servicios para consultar al equipo. Las fotografías e ilustraciones muestran familias de referencia; no son fichas de modelos confirmados.</p></div><div class="enh-shop-categories"><a href="#/tienda?categoria=Climatizaci%C3%B3n">Temperado</a><a href="#/tienda?categoria=Robots%20y%20limpieza">Robots</a><a href="#/tienda?categoria=Bombas%20y%20filtros">Bombas y filtros</a><a href="#/tienda?categoria=Cubiertas%20t%C3%A9rmicas">Cobertores</a><a href="#/tienda?categoria=Iluminaci%C3%B3n">Iluminación</a><a href="#/tienda?categoria=Spa%20y%20sauna">Spa y sauna</a><a href="#/tienda?categoria=Solar%20y%20energ%C3%ADa">Solar y energía</a><a href="#/tienda?categoria=Electricidad">Electricidad y control</a></div></div>`);
  shop.querySelector('.page-hero').insertAdjacentElement('afterend', shopIntro);
  const shopJourney = section('enh-shop-journey', `<div class="wrap"><div class="enh-shop-journey-head"><h2>Elige cómo quieres vivir tu espacio.</h2><p>Descubre equipos y materiales según lo que quieres lograr. Después, prepara una consulta con los detalles de tu proyecto.</p></div><div class="enh-shop-journey-layout"><div class="enh-shop-needs" role="group" aria-label="Elegir una necesidad"></div><div class="enh-shop-stage"><div class="enh-shop-stage-image"><img src="" alt="" loading="lazy" decoding="async" width="800" height="600"></div><div class="enh-shop-stage-copy" role="status" aria-live="polite"><span class="enh-shop-stage-tag"></span><h3></h3><p></p><div class="enh-shop-stage-actions"><a class="btn enh-shop-stage-browse" href="#">Ver opciones</a><a class="enh-shop-stage-quote" href="#" target="_blank" rel="noopener noreferrer">Cotizar esta idea ↗</a></div></div></div></div><div class="enh-shop-promise"><strong>Más momentos para vivirlos. Menos dudas al planificarlos.</strong><p>Desde materiales y equipamiento hasta consultas de instalación y mantención, reúne lo que necesitas en una conversación. JECHMAN revisa disponibilidad, compatibilidad y alcance antes de cotizar.</p></div></div>`);
  shopIntro.insertAdjacentElement('afterend',shopJourney);
  const shopNeeds=[
    {name:'Disfrutar más tiempo',category:'Climatización',title:'Tempera el agua y extiende los momentos juntos.',text:'Explora bombas de calor y soluciones de calefacción. La elección depende de las medidas, el uso y el lugar.',image:'assets/photography/studio-pool-chile-8839767.jpg',alt:'Piscina exterior para disfrutar por más tiempo',quote:'temperado para mi piscina'},
    {name:'Cuidar sin complicaciones',category:'Robots y limpieza',title:'Dedica menos tiempo a limpiar y más a disfrutar.',text:'Consulta por el robot Vulcano ZUIPY 300 y los elementos de filtración apropiados para tu piscina.',image:'assets/photography/pool-cleaner-6436202.jpg',alt:'Robot limpiando una piscina',quote:'un robot limpiafondos y cuidado de piscina'},
    {name:'Crear ambiente',category:'Iluminación',title:'Haz que cada rincón se sienta distinto.',text:'Descubre iluminación para piscina y espacios interiores; instalación y compatibilidad se revisan contigo.',image:'assets/photography/pool-lighting-6957108.jpg',alt:'Piscina iluminada',quote:'iluminación para mi espacio'},
    {name:'Avanzar en la obra',category:'Ferretería/Hidráulica',title:'Reúne lo que necesita tu proyecto.',text:'Herramientas, conexiones y materiales en una consulta clara, con medidas y cantidades por definir.',image:'assets/photography/pipework-29274530.jpg',alt:'Tuberías y conexiones hidráulicas',quote:'materiales de ferretería e hidráulica'},
    {name:'Encontrar bienestar',category:'Spa y sauna',title:'Prepara un espacio para bajar el ritmo.',text:'Conversa sobre spa, jacuzzi o sauna y revisa las posibilidades reales del lugar.',image:'assets/photography/spa-wellness-8844604.jpg',alt:'Spa exterior en uso',quote:'un espacio de spa y bienestar'},
    {name:'Aprovechar el sol',category:'Solar y energía',title:'Consulta energía solar para tu proyecto.',text:'Paneles solares y climatización requieren evaluar consumo, superficie y condiciones de instalación.',image:'assets/photography/route-solar.jpg',alt:'Paneles solares sobre una cubierta',quote:'paneles solares y climatización de piscina'},
    {name:'Controlar con precisión',category:'Electricidad',title:'Control eléctrico pensado para tu uso.',text:'Consulta tableros, automatización de bombas, accesos y monitoreo con respaldo técnico sujeto a evaluación.',image:'assets/photography/electrician-panel-27928760.jpg',alt:'Técnico revisando un tablero eléctrico',quote:'tableros y control inteligente'}
  ];
  const needButtons=shopJourney.querySelector('.enh-shop-needs');
  const needStage=shopJourney.querySelector('.enh-shop-stage');
  function selectNeed(index){
    const item=shopNeeds[index];
    needButtons.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    const image=needStage.querySelector('img');image.src=item.image;image.alt=item.alt;
    needStage.querySelector('.enh-shop-stage-tag').textContent=item.category;
    needStage.querySelector('h3').textContent=item.title;
    needStage.querySelector('p').textContent=item.text;
    needStage.querySelector('.enh-shop-stage-browse').href='#/tienda?categoria='+encodeURIComponent(item.category);
    quote(needStage.querySelector('.enh-shop-stage-quote'),`Hola JECHMAN, quisiera cotizar ${item.quote}. ¿Qué opciones y datos necesitamos revisar?`);
  }
  shopNeeds.forEach((item,index)=>{const button=document.createElement('button');button.type='button';button.textContent=item.name;button.addEventListener('click',()=>selectNeed(index));needButtons.append(button)});
  selectNeed(0);
  const stageImage=shopJourney.querySelector('.enh-shop-stage-image');
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!prefersReducedMotion()){
    stageImage.addEventListener('pointermove',event=>{const bounds=stageImage.getBoundingClientRect();const x=(event.clientX-bounds.left)/bounds.width-.5;const y=(event.clientY-bounds.top)/bounds.height-.5;stageImage.style.setProperty('--stage-tilt-x',`${(-y*5).toFixed(2)}deg`);stageImage.style.setProperty('--stage-tilt-y',`${(x*5).toFixed(2)}deg`)});
    stageImage.addEventListener('pointerleave',()=>{stageImage.style.setProperty('--stage-tilt-x','0deg');stageImage.style.setProperty('--stage-tilt-y','0deg')});
  }
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
