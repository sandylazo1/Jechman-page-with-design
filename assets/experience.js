/* JECHMAN interactive subsections. Static, framework-free and safe under GitHub Pages hash routes. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projectKey = 'jechman-project-list-v2';
  const phone = '56962306924';
  const poolSource = 'https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/';
  const tinajaSource = 'https://www.jechman.cl/fabricacion-e-instalacion-de-tinajas-de-madera-recubiertas-en-fibra-de-vidrio/';
  const jacuzziSource = 'https://www.jechman.cl/fabricacion-e-instalacion-de-jacuzzi-de-fibra-de-vidrio/';
  const photo = (src, alt, credit = 'Visual de referencia', source = '') => ({ src, alt, credit, source });
  function responsiveImage(img) {
    const src=img.getAttribute('src')||'';
    if(!/^assets\/editorial\/[a-z-]+-(?:800|1600)\.webp$/.test(src)){img.removeAttribute('srcset');img.removeAttribute('sizes');return;}
    const base=src.replace(/-(?:800|1600)\.webp$/,'');
    img.srcset=`${base}-800.webp 800w, ${base}-1600.webp 1600w`;
    img.sizes=img.closest('.xp-thumb,.xp-preview-gallery,.xp-discovery-card')?'120px':img.closest('.xp-model-card,.xp-related-card')?'(max-width: 700px) 100vw, 32vw':'(max-width: 700px) 100vw, 60vw';
    img.decoding='async';
  }
  const gallery = {
    pool: [photo('assets/editorial/pool-hero-1600.webp', 'Piscina rectangular en jardín contemporáneo'), photo('assets/projects/pool-installed.webp', 'Piscina publicada por JECHMAN', 'Fotografía JECHMAN', poolSource), photo('assets/editorial/pool-roman-1600.webp', 'Piscina romana en jardín'), photo('assets/projects/pool-work.webp', 'Piscina exterior publicada por JECHMAN', 'Fotografía JECHMAN', poolSource)],
    tinaja: [photo('assets/editorial/tinaja-1600.webp', 'Tinaja de madera en terraza natural'), photo('assets/projects/tinaja-official.webp', 'Tinaja publicada por JECHMAN', 'Fotografía JECHMAN', tinajaSource)],
    jacuzzi: [photo('assets/editorial/jacuzzi-1600.webp', 'Jacuzzi exterior en terraza'), photo('assets/catalog/jacuzzi.webp', 'Jacuzzi de fibra de vidrio de referencia')],
    electric: [photo('assets/photography/electric-install.jpg', 'Profesionales trabajando en una instalación eléctrica, foto de referencia'), photo('assets/areas/electricidad.webp', 'Tablero eléctrico de referencia'), photo('assets/photography/smart-home.jpg', 'Control inteligente de una vivienda, foto de referencia'), photo('assets/photography/solar-install.jpg', 'Instalación de paneles solares, foto de referencia')],
    light: [photo('assets/areas/iluminacion-pexels.jpeg', 'Luminarias de interior de referencia', 'Anchornhaven / Pexels', 'https://www.pexels.com/photo/colorful-modern-pendant-lights-in-cozy-setting-35128229/'), photo('assets/catalog/iluminacion.webp', 'Iluminación de referencia')],
    commercial: [photo('assets/editorial/commercial-1600.webp', 'Suministros y herramientas de construcción'), photo('assets/catalog/herramientas.webp', 'Herramientas de referencia')],
    hydraulic: [photo('assets/catalog/hidraulica.webp', 'Conexiones hidráulicas de referencia'), photo('assets/catalog/bomba-filtro.webp', 'Bomba y filtro de referencia')],
    heating: [photo('assets/catalog/bomba-calor.webp', 'Equipo de climatización de referencia'), photo('assets/photography/water-heater-9551366.jpg', 'Calefactor y sistema térmico de referencia')],
    sauna: [photo('assets/photography/sauna-real.jpg', 'Sauna de madera, foto de referencia')]
  };
  const entries = [
    ['piscinas/rectangulares','Piscinas rectangulares','piscinas','pool','Modelos rectangulares','Compara las medidas existentes y prepara una solicitud con el espacio y el acabado que imaginas.','modelos','confirmed'],
    ['piscinas/romanas','Piscinas romanas','piscinas','pool','Curvas que transforman el jardín','Explora las medidas de los modelos romanos incorporados al catálogo JECHMAN.','modelos','confirmed'],
    ['piscinas/con-jacuzzi','Piscinas con jacuzzi','piscinas','pool','Agua para compartir y descansar','Modelos con jacuzzi integrado en el listado de medidas proporcionado por JECHMAN.','modelos','evaluation'],
    ['piscinas/configurar','Diseña tu piscina ideal','piscinas','pool','Dale forma a tu piscina','Elige un modelo del listado existente, acabado y opciones para preparar una cotización completa.','pool-config','confirmed'],
    ['piscinas/instalacion','Fabricación e instalación','piscinas','pool','Del modelo al espacio terminado','La evaluación del lugar define traslado, excavación, conexiones y puesta en marcha.','service','confirmed'],
    ['piscinas/climatizacion','Climatización','piscinas','heating','Disfruta el agua a tu manera','Consulta soluciones de temperado y su compatibilidad con tu piscina o jacuzzi.','service','evaluation'],
    ['piscinas/filtracion','Bombas y filtración','piscinas','hydraulic','Una piscina que se cuida bien','Bombas, filtros y recirculación se seleccionan según medidas, instalación y uso.','service','evaluation'],
    ['piscinas/iluminacion','Iluminación de piscinas','piscinas','light','La piscina también se vive de noche','Explora focos y consulta la integración eléctrica apropiada para tu proyecto.','service','evaluation'],
    ['piscinas/mantencion','Cuidado y mantención','piscinas','pool','Cuidar el agua también es parte del proyecto','Consulta robot limpiafondos, filtración, mantención, pintado o reparación según necesidad.','service','evaluation'],
    ['tinajas/configurar','Diseña tu tinaja JECHMAN','tinajas','tinaja','Tu momento de pausa empieza aquí','Selecciona capacidad, madera, caldera y complementos documentados.','tinaja-config','confirmed'],
    ['jacuzzis/configurar','Diseña tu jacuzzi','jacuzzis','jacuzzi','Un espacio de bienestar a tu medida','Explora acabados y equipamiento sujeto a revisión técnica.','jacuzzi-config','confirmed'],
    ['electricidad/instalaciones','Instalaciones eléctricas','electricidad','electric','Conecta cada etapa del proyecto','Cuéntanos si se trata de una obra nueva, ampliación o revisión de instalación.','technical','evaluation'],
    ['electricidad/tableros','Tableros eléctricos','electricidad','electric','Distribución y control con criterio técnico','Prepara un requerimiento de tablero sin anticipar protecciones ni capacidades.','technical','evaluation'],
    ['electricidad/proyectos','Proyectos eléctricos','electricidad','electric','Ingeniería desde el primer plano','Describe el alcance, antecedentes y documentación disponibles para evaluación.','technical','evaluation'],
    ['electricidad/automatizacion','Automatización y control','electricidad','electric','Haz que los sistemas trabajen juntos','Control, horarios y supervisión se estudian de acuerdo con cada instalación.','technical','evaluation'],
    ['electricidad/domotica','Diseña tu hogar inteligente','electricidad','light','Imagina una casa que responde a ti','Explora ambientes y automatizaciones en una demostración conceptual.','domotica','proposal'],
    ['electricidad/inmotica','Configura tu edificio inteligente','electricidad','electric','Coordina espacios, energía y control','Selecciona zonas y sistemas para preparar una consulta técnica preliminar.','inmotica','proposal'],
    ['electricidad/eficiencia-energetica','Eficiencia energética','electricidad','light','Comprende cómo usas la energía','Calcula un consumo teórico cuando conoces potencia, cantidad y horas de funcionamiento.','energy','proposal'],
    ['electricidad/paneles-solares','Paneles solares','electricidad','electric','Estudia una instalación solar para tu proyecto','Comparte consumo, espacio disponible y objetivos para consultar la factibilidad de una instalación fotovoltaica.','technical','proposal'],
    ['electricidad/iluminacion','Iluminación técnica','electricidad','light','La luz también cumple una función','Describe el espacio, el uso y la instalación para revisar luminarias apropiadas.','technical','evaluation'],
    ['electricidad/bombeo','Control de bombas','electricidad','hydraulic','Control para sistemas de agua','Consulta automatización de bombas y tableros sujetos a ingeniería.','technical','proposal'],
    ['comercial/herramientas','Herramientas','comercial','commercial','Herramientas para avanzar','Encuentra familias de herramientas y consulta la especificación necesaria.','catalog','confirmed'],
    ['comercial/hidraulica','Hidráulica y fittings','comercial','hydraulic','Cada conexión cuenta','Tuberías y fittings para revisar por medida, material y aplicación.','catalog','confirmed'],
    ['comercial/electricidad','Material eléctrico','comercial','electric','Componentes para tu instalación','Tableros, protecciones y elementos auxiliares publicados en el catálogo.','catalog','confirmed'],
    ['comercial/iluminacion','Iluminación','comercial','light','Opciones de luz para cada espacio','Luminarias y soluciones de iluminación para consultar por uso y cantidad.','catalog','confirmed'],
    ['tienda/iluminacion','Iluminación en el catálogo','tienda','light','Encuentra la luz adecuada','Consulta luminarias, proyectores y accesorios publicados en el catálogo.','catalog','confirmed'],
    ['tienda/hidraulica','Hidráulica en el catálogo','tienda','hydraulic','Conexiones para el proyecto','Explora fittings y tuberías; indica medida y material al cotizar.','catalog','confirmed']
  ].map(([route,title,parent,visual,headline,description,type,status]) => ({route,title,parent,visual,headline,description,type,status,gallery:gallery[visual]}));
  const extensions=[
    ['piscinas/accesorios','Accesorios de piscina','piscinas','hydraulic','Los detalles que completan la piscina','Bombas, filtros, focos y complementos para consultar según tu modelo.','catalog','confirmed','Accesorios de piscina'],
    ['piscinas/spa','Spa y bienestar','piscinas','jacuzzi','Crea un espacio para desconectar','Explora una idea de spa y consulta si JECHMAN puede desarrollarla.','service','proposal'],
    ['piscinas/sauna','Sauna','piscinas','sauna','Bienestar para tu espacio','Consulta factibilidad, ventilación, suministro y alcance de una eventual solución de sauna.','service','proposal'],
    ['electricidad/control-accesos','Control de accesos','electricidad','electric','Piensa en cómo se usa cada acceso','Plantea necesidades de ingreso y seguridad para revisión técnica.','technical','proposal'],
    ['electricidad/monitoreo','Monitoreo de instalaciones','electricidad','electric','Información para tomar decisiones','Consulta supervisión, alertas y seguimiento técnico según tu instalación.','technical','proposal'],
    ['electricidad/viviendas','Soluciones para viviendas','electricidad','light','Conecta tu casa desde el diseño','Integra iluminación, instalación eléctrica y necesidades de control en una solicitud.','technical','evaluation'],
    ['electricidad/empresas','Soluciones para empresas','electricidad','electric','Sistemas que acompañan tu operación','Describe áreas, continuidad y necesidades eléctricas para una evaluación.','technical','evaluation'],
    ['comercial/ferreteria','Ferretería','comercial','commercial','Materiales para seguir construyendo','Explora herramientas y piezas que puedes consultar con especificaciones.','catalog','confirmed','Ferretería/Hidráulica'],
    ['comercial/tuberias','Tuberías','comercial','hydraulic','Conexiones para cada tramo','Indica medida, material y uso para preparar la solicitud.','catalog','confirmed','Ferretería/Hidráulica'],
    ['comercial/fittings','Fittings','comercial','hydraulic','Cada unión necesita la pieza correcta','Consulta tipo de conexión y medida; la compatibilidad se revisa antes de cotizar.','catalog','confirmed','Ferretería/Hidráulica'],
    ['comercial/bombas','Bombas y filtración','comercial','hydraulic','Equipamiento para mover y cuidar el agua','Revisa familias de bombas y filtros del catálogo sin anticipar dimensionamiento.','catalog','confirmed','Accesorios de piscina'],
    ['comercial/construccion','Materiales de construcción','comercial','commercial','Un proyecto necesita buenos materiales','Prepara una lista de materiales para revisión de disponibilidad.','service','evaluation'],
    ['comercial/automatizacion','Componentes de automatización','comercial','electric','Piezas para control eléctrico','Consulta contactores y elementos auxiliares publicados en el catálogo.','catalog','confirmed','Electricidad'],
    ['comercial/bienestar','Accesorios de bienestar','comercial','pool','Complementos para tu espacio de agua','Consulta equipamiento y accesorios relacionados con piscinas o jacuzzis.','catalog','evaluation','Accesorios de piscina'],
    ['tienda/accesorios-piscina','Accesorios de piscina','tienda','hydraulic','Equipa tu piscina','Bombas, filtros y complementos de catálogo para una solicitud contextual.','catalog','confirmed','Accesorios de piscina'],
    ['tienda/climatizacion','Climatización','tienda','heating','Consulta calefacción y temperado','Cada sistema se evalúa según el producto y las condiciones del lugar.','catalog','evaluation','Climatización'],
    ['tienda/electricidad','Material eléctrico','tienda','electric','Componentes para instalar y controlar','Explora familias de productos eléctricos publicados en el catálogo.','catalog','confirmed','Electricidad'],
    ['tienda/piscinas','Piscinas y bienestar','tienda','pool','Modelos para explorar','Compara familias de piscinas antes de cotizar.','catalog','confirmed','Piscinas y bienestar']
  ];
  extensions.forEach(([route,title,parent,visual,headline,description,type,status,category])=>entries.push({route,title,parent,visual,headline,description,type,status,category,gallery:gallery[visual]}));
  const routeVisuals = {
    'piscinas/romanas':'pool-roman',
    'piscinas/rectangulares':'pool-hero',
    'piscinas/con-jacuzzi':'assets/jechman-products/pool-jacuzzi-clean-ai.png',
    'piscinas/configurar':'assets/catalog/piscina-rectangular.jpg',
    'piscinas/filtracion':'assets/catalog/bomba-filtro.webp',
    'piscinas/climatizacion':'assets/catalog/bomba-calor.webp',
    'piscinas/iluminacion':'assets/catalog/foco-piscina.webp',
    'piscinas/spa':'assets/editorial/jacuzzi-1600.webp',
    'electricidad/domotica':'assets/photography/route-domotica.jpg',
    'electricidad/inmotica':'assets/editorial/inmotica-1600.webp',
    'electricidad/eficiencia-energetica':'assets/editorial/energy-1600.webp',
    'electricidad/paneles-solares':'assets/photography/route-solar.jpg',
    'electricidad/control-accesos':'assets/photography/access-control.jpg',
    'electricidad/monitoreo':'assets/photography/monitoring-control-room-32529341.jpg',
    'electricidad/viviendas':'assets/photography/route-viviendas.jpg',
    'electricidad/empresas':'assets/photography/solar-farm.jpg',
    'electricidad/instalaciones':'assets/photography/route-installation.jpg',
    'electricidad/tableros':'assets/photography/route-panel.jpg',
    'electricidad/proyectos':'assets/editorial/electric-1600.webp',
    'electricidad/automatizacion':'assets/areas/electricidad.webp',
    'electricidad/iluminacion':'assets/areas/iluminacion-pexels.jpeg',
    'electricidad/bombeo':'assets/catalog/bomba-filtro.webp',
    'piscinas/mantencion':'assets/photography/pool-care.jpg',
    'piscinas/sauna':'assets/photography/sauna-real.jpg'
  };
  entries.forEach(entry=>{
    const asset=routeVisuals[entry.route];
    if(asset){const src=asset.startsWith('assets/')?asset:`assets/editorial/${asset}-1600.webp`;entry.gallery=[photo(src,entry.title),...entry.gallery.filter(item=>item.src!==src)];}
  });
  const accessoryEntry=entries.find(entry=>entry.route==='piscinas/accesorios');
  accessoryEntry.gallery=[
    photo('assets/catalog/zuipy-300.png','Robot limpiafondos Vulcano ZUIPY 300'),
    photo('assets/photography/route-solar.jpg','Paneles solares, fotografía de referencia'),
    photo('assets/catalog/bomba-calor.webp','Bomba de calor de referencia'),
    photo('assets/catalog/bomba-filtro.webp','Bomba y filtro de piscina de referencia')
  ];
  const byRoute = new Map(entries.map(item => [item.route,item]));
  const parentTitles = {piscinas:'Piscinas y bienestar',tinajas:'Tinajas',jacuzzis:'Jacuzzis',electricidad:'Electricidad e ingeniería',comercial:'Comercializadora',tienda:'Tienda'};
  const statusLabels = {confirmed:'Opciones documentadas',evaluation:'Sujeto a evaluación técnica',proposal:'Propuesta en estudio · confirmar con JECHMAN'};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const wa = message => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const defaultMessage = (title, details, status) => `Hola JECHMAN. Quisiera cotizar: ${title}.\n${details}\n${status === 'proposal' ? 'Entiendo que es una propuesta por confirmar y solicito revisar si JECHMAN puede ofrecerla.\n' : ''}¿Podemos revisar factibilidad, opciones y una cotización?`;
  const view = document.createElement('div');
  view.className = 'view xp-view'; view.dataset.view = 'experience'; view.hidden = true;
  $('#contenido').append(view);
  const projectButton = document.createElement('a'); projectButton.className = 'xp-project-button'; projectButton.href = '#/mi-proyecto';
  projectButton.innerHTML = '<span>Mi proyecto</span><strong id="xp-project-count">0</strong>';
  document.body.append(projectButton);
  let project = readProject();
  let projectName='';try{projectName=(sessionStorage.getItem('jechman-project-name')||'').slice(0,80);}catch{}
  let currentEntry = null;

  function readProject() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(projectKey) || '[]');
      return Array.isArray(saved) ? saved.filter(item => item && typeof item.title === 'string' && typeof item.details === 'string').slice(0,12).map(item=>({id:String(item.id||''),title:item.title.slice(0,90),details:item.details.slice(0,900),route:typeof item.route==='string'&&item.route.startsWith('#/')?item.route:'#/',status:['confirmed','evaluation','proposal'].includes(item.status)?item.status:'evaluation',config:item.config&&typeof item.config==='object'&&!Array.isArray(item.config)?item.config:null})) : [];
    } catch { return []; }
  }
  function persist() { try { sessionStorage.setItem(projectKey,JSON.stringify(project)); } catch {} $('#xp-project-count').textContent=project.length; }
  function announce(message) {
    let node = $('#xp-toast');
    if (!node) { node=document.createElement('div'); node.id='xp-toast'; node.className='xp-toast'; node.setAttribute('role','status'); document.body.append(node); }
    node.textContent=message; node.classList.add('is-visible'); clearTimeout(announce.timer); announce.timer=setTimeout(()=>node.classList.remove('is-visible'),3200);
  }
  function addProject(title,details,route,status='evaluation',config=null,draftId='') {
    const draft=project.find(item=>item.id===draftId);
    if(draft){Object.assign(draft,{title:String(title).slice(0,90),details:String(details).slice(0,900),route,status,config});persist();announce('Configuración actualizada en Mi proyecto.');return true;}
    if (project.length >= 12) { announce('Tu proyecto admite hasta 12 elementos. Revisa la lista antes de agregar más.'); return; }
    project.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:String(title).slice(0,90),details:String(details).slice(0,900),route,status,config});
    persist(); announce('Se agregó a Mi proyecto.');return true;
  }
  persist();

  function insertDiscovery() {
    const groups = {
      piscinas:['piscinas/rectangulares','piscinas/romanas','piscinas/con-jacuzzi','piscinas/configurar','piscinas/filtracion','piscinas/climatizacion','piscinas/iluminacion','piscinas/mantencion','piscinas/accesorios','piscinas/spa','piscinas/sauna'],
      electricidad:['electricidad/instalaciones','electricidad/tableros','electricidad/proyectos','electricidad/automatizacion','electricidad/domotica','electricidad/inmotica','electricidad/paneles-solares','electricidad/eficiencia-energetica','electricidad/iluminacion','electricidad/bombeo','electricidad/control-accesos','electricidad/monitoreo','electricidad/viviendas','electricidad/empresas'],
      comercial:['comercial/herramientas','comercial/hidraulica','comercial/electricidad','comercial/iluminacion','comercial/ferreteria','comercial/tuberias','comercial/fittings','comercial/bombas','comercial/construccion','comercial/automatizacion','comercial/bienestar'],
      tinajas:['tinajas/configurar'],jacuzzis:['jacuzzis/configurar'],tienda:['tienda/iluminacion','tienda/hidraulica','tienda/accesorios-piscina','tienda/climatizacion','tienda/electricidad','tienda/piscinas']
    };
    for (const [parent,routes] of Object.entries(groups)) {
      const target=$(`.view[data-view="${parent}"]`); if (!target) continue;
      const section=document.createElement('section'); section.className=`xp-discovery xp-discovery--${parent}`;
      section.innerHTML=`<div class="wrap"><div class="xp-discovery-heading"><h2>${parent==='piscinas'?'Encuentra tu próxima experiencia':parent==='electricidad'?'Explora el alcance de tu proyecto':parent==='comercial'?'Elige los materiales que necesitas':parent==='tienda'?'Explora por necesidad':'Configura con más detalle'}</h2><p>Entra en cada área, revisa opciones y prepara una consulta específica.</p></div><div class="xp-discovery-grid"></div></div>`;
      const grid=$('.xp-discovery-grid',section);
      for (const route of routes) {
        const item=byRoute.get(route); const a=document.createElement('a');a.className='xp-discovery-card xp-spotlight';a.href='#/'+route;
        a.innerHTML=`<span class="xp-discovery-photo"><img src="${escape(item.gallery[0].src)}" alt="" loading="lazy" width="360" height="240"></span><span class="xp-discovery-info"><span>${escape(item.title)}</span><small>${escape(item.status==='proposal'?'Propuesta por confirmar':item.type.includes('config')?'Configurar y cotizar':'Explorar opciones')}</small><b aria-hidden="true">↗</b></span>`;grid.append(a);
      }
      const anchor=$('.enh-mast',target)||$('.page-hero',target);
      anchor.insertAdjacentElement('afterend',section);
      if(parent==='electricidad') {
        const smartDemo=$('.enh-smart-demo',target);
        if(smartDemo)section.insertAdjacentElement('afterend',smartDemo);
      }
    }
  }
  insertDiscovery();

  function hero(entry) {
    const image=entry.gallery[0];
    return `<section class="xp-hero xp-hero--${escape(entry.parent)}"><div class="wrap xp-hero-grid"><div class="xp-hero-copy"><nav class="xp-breadcrumb" aria-label="Ruta de navegación"><a href="#/">Inicio</a><span aria-hidden="true">/</span><a href="#/${entry.parent}">${escape(parentTitles[entry.parent])}</a><span aria-hidden="true">/</span><span aria-current="page">${escape(entry.title)}</span></nav><span class="xp-status xp-status--${entry.status}">${escape(statusLabels[entry.status])}</span><h1>${escape(entry.headline)}</h1><p>${escape(entry.description)}</p><div class="xp-hero-actions"><button type="button" class="btn xp-primary" data-xp-scroll>${entry.type==='modelos'?'Ver modelos':entry.type==='catalog'?'Ver productos':'Configurar y cotizar'}</button><a class="xp-text-link" href="#/${entry.parent}">Volver a ${escape(parentTitles[entry.parent])}</a></div></div><div class="xp-hero-media"><img src="${escape(image.src)}" alt="${escape(image.alt)}" width="1200" height="800"><span>${escape(image.credit)}</span></div></div></section>`;
  }
  function makeGallery(entry) {
    if(!['modelos','catalog','service'].includes(entry.type))return '';
    const photos=entry.gallery.slice(1); if (!photos.length) return '';
    const buttons=photos.map((item,index)=>`<button type="button" class="xp-thumb" data-gallery-index="${index}" aria-label="Mostrar imagen ${index+1}: ${escape(item.alt)}" aria-current="${index===0}">${String(index+1).padStart(2,'0')}</button>`).join('');
    return `<section class="xp-gallery-section"><div class="wrap"><div class="xp-section-heading"><h2>Observa los detalles</h2><p>Renders editoriales y fotografías publicadas por JECHMAN. Cada medida, acabado y solución se confirma al cotizar.</p></div><div class="xp-gallery" tabindex="0" aria-label="Galería de ${escape(entry.title)}"><figure class="xp-gallery-main"><img src="${escape(photos[0].src)}" alt="${escape(photos[0].alt)}" loading="lazy" width="1200" height="800"><figcaption>${escape(photos[0].credit)}</figcaption></figure><div class="xp-gallery-bottom"><button type="button" class="xp-gallery-arrow" data-gallery-direction="-1" aria-label="Imagen anterior">←</button><div class="xp-gallery-thumbs" role="group" aria-label="Elegir imagen">${buttons}</div><button type="button" class="xp-gallery-arrow" data-gallery-direction="1" aria-label="Imagen siguiente">→</button></div></div></div></section>`;
  }
  function bindGallery(entry) {
    const root=$('.xp-gallery',view); if (!root) return; let index=0; const photos=entry.gallery.slice(1);
    function show(next) {
      index=(next+photos.length)%photos.length; const item=photos[index], img=$('.xp-gallery-main img',root);
      img.classList.remove('xp-image-enter');img.src=item.src;img.alt=item.alt;responsiveImage(img);
      if (!reduced()) requestAnimationFrame(()=>img.classList.add('xp-image-enter'));
      $('.xp-gallery-main figcaption',root).textContent=item.credit;
      $$('.xp-thumb',root).forEach((button,i)=>button.setAttribute('aria-current',String(i===index)));
    }
    root.addEventListener('click',event=>{const thumb=event.target.closest('[data-gallery-index]');const arrow=event.target.closest('[data-gallery-direction]');if(thumb)show(Number(thumb.dataset.galleryIndex));if(arrow)show(index+Number(arrow.dataset.galleryDirection));});
    root.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(index+(event.key==='ArrowRight'?1:-1));}});
    let start=0;root.addEventListener('touchstart',event=>{start=event.changedTouches[0].screenX},{passive:true});root.addEventListener('touchend',event=>{const delta=event.changedTouches[0].screenX-start;if(Math.abs(delta)>50)show(index+(delta<0?1:-1))},{passive:true});
  }
  function related(entry) {
    const relatedPhoto={
      'piscinas/configurar':'assets/photography/home-pool-8134747.jpg',
      'piscinas/filtracion':'assets/jechman-products/bomba-reynolds.jpg',
      'piscinas/iluminacion':'assets/photography/pool-lighting-6957108.jpg',
      'piscinas/climatizacion':'assets/photography/heat-pump-cutout.png',
      'electricidad/instalaciones':'assets/photography/electrician-panel-27928760.jpg',
      'electricidad/tableros':'assets/jechman-products/tablero-digital.jpg',
      'electricidad/domotica':'assets/photography/smart-home.jpg',
      'electricidad/eficiencia-energetica':'assets/photography/solar-farm.jpg',
      'tienda/iluminacion':'assets/photography/led-ceiling-36344746.jpg',
      'tienda/hidraulica':'assets/photography/pipework-29274530.jpg',
      'comercial/electricidad':'assets/photography/electrical-breakers-38171184.jpg'
    };
    let routes=[];
    if(entry.parent==='piscinas')routes=['piscinas/configurar','piscinas/filtracion','piscinas/iluminacion','piscinas/climatizacion'];
    else if(entry.parent==='electricidad')routes=['electricidad/instalaciones','electricidad/tableros','electricidad/domotica','electricidad/eficiencia-energetica'];
    else if(entry.parent==='tinajas'||entry.parent==='jacuzzis')routes=['piscinas/climatizacion','piscinas/iluminacion','piscinas/filtracion'];
    else routes=['tienda/iluminacion','tienda/hidraulica','comercial/electricidad'];
    routes=routes.filter(route=>route!==entry.route && !(entry.route==='comercial/iluminacion' && route==='tienda/iluminacion') && !(entry.route==='comercial/automatizacion' && route==='comercial/electricidad')).slice(0,3);
     return `<section class="xp-related"><div class="wrap"><div class="xp-section-heading"><h2>Soluciones que acompañan tu proyecto</h2><p>Consulta por separado cada complemento que te interese.</p></div><div class="xp-related-grid">${routes.map(route=>{const item=byRoute.get(route);return `<article class="xp-related-card xp-spotlight"><img src="${escape(relatedPhoto[route]||item.gallery[0].src)}" alt="${escape(item.title)}" loading="lazy" width="420" height="220"><div><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><div class="xp-related-actions"><a href="#/${route}">Explorar</a><button type="button" data-related-add="${escape(route)}">Agregar a mi proyecto</button></div></div></article>`}).join('')}</div></div></section>`;
  }
  function quotePanel(entry) {
    return `<div class="xp-quote-panel"><div><h3>¿Lo conversamos?</h3><p>Tu selección se prepara en WhatsApp. JECHMAN confirma alcance y compatibilidad antes de cotizar.</p></div><a class="btn" id="xp-simple-quote" href="#">Cotizar ${escape(entry.title.toLowerCase())}</a><button type="button" class="btn outline" id="xp-simple-add">Agregar a mi proyecto</button></div>`;
  }
  function bindSimpleQuote(entry,details) {
    const q=$('#xp-simple-quote',view); if(q){q.href=wa(defaultMessage(entry.title,details,entry.status));q.target='_blank';q.rel='noopener noreferrer';}
    const add=$('#xp-simple-add',view); if(add)add.onclick=()=>addProject(entry.title,details,'#/'+entry.route,entry.status);
  }
  function renderModelList(entry) {
    const family=entry.route.endsWith('romanas')?'Romana':entry.route.endsWith('con-jacuzzi')?'Con jacuzzi':'Rectangular';
    const selected=models.filter(item=>family==='Rectangular'?['Rectangular','Piscina'].includes(item[0]):item[0]===family);
      const rows=selected.map((item,index)=>`<article class="xp-model-card xp-spotlight"><span>Modelo ${String(index+1).padStart(2,'0')}</span><h3>${escape(item[1])} m</h3><p>Profundidad: ${escape(item[2])} m${item[3]?' · '+escape(item[3]):''}</p>${item[4]==='por-confirmar'?'<p>Medida por confirmar con JECHMAN</p>':''}<a href="#/piscinas/configurar?tipo=${encodeURIComponent(family)}&modelo=${encodeURIComponent(item[1])}">Elegir este modelo <span aria-hidden="true">↗</span></a><button type="button" class="xp-compare-toggle" data-model-index="${index}" aria-pressed="false">Comparar</button></article>`).join('');
    return `<section class="xp-content" id="xp-config"><div class="wrap"><div class="xp-section-heading"><h2>Modelos para comparar</h2><p>Medidas del listado actual de JECHMAN. Verifica el espacio disponible y la instalación antes de decidir.</p></div><div class="xp-model-grid">${rows}</div><div class="xp-comparison" hidden role="status" aria-live="polite"></div><p class="xp-note">Las imágenes muestran proyectos o ambientes de referencia; no identifican visualmente cada medida.</p>${quotePanel(entry)}</div></section>`;
  }
  function bindModelComparison(entry){
    const family=entry.route.endsWith('romanas')?'Romana':entry.route.endsWith('con-jacuzzi')?'Con jacuzzi':'Rectangular';
    const listed=models.filter(item=>family==='Rectangular'?['Rectangular','Piscina'].includes(item[0]):item[0]===family),selected=[];
    const box=$('.xp-comparison',view);
    view.querySelectorAll('.xp-compare-toggle').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.modelIndex),position=selected.indexOf(index);if(position>=0)selected.splice(position,1);else if(selected.length<2)selected.push(index);else{selected.shift();selected.push(index);}view.querySelectorAll('.xp-compare-toggle').forEach(item=>item.setAttribute('aria-pressed',String(selected.includes(Number(item.dataset.modelIndex)))));box.hidden=!selected.length;box.replaceChildren();if(!selected.length)return;const title=document.createElement('h3');title.textContent=selected.length===1?'Elige un segundo modelo para comparar':'Comparación de medidas';box.append(title);const table=document.createElement('table');const caption=document.createElement('caption');caption.textContent='Comparación de modelos de piscina';table.append(caption);const head=document.createElement('thead'),headRow=document.createElement('tr');['Dato',...selected.map(index=>listed[index][1]+' m')].forEach(value=>{const th=document.createElement('th');th.textContent=value;headRow.append(th)});head.append(headRow);table.append(head);const body=document.createElement('tbody');for(const [label,column] of [['Forma',0],['Profundidad (m)',2],['Detalle',3]]){const row=document.createElement('tr');const th=document.createElement('th');th.scope='row';th.textContent=label;row.append(th);selected.forEach(index=>{const td=document.createElement('td');td.textContent=listed[index][column]||'Por consultar';row.append(td)});body.append(row)}table.append(body);box.append(table);}));
  }
  function renderService(entry) {
    const prompts=entry.parent==='piscinas'?['Espacio y medidas aproximadas','Equipamiento que quieres integrar','Instalación o servicio a evaluar']:entry.parent==='electricidad'?['Tipo de inmueble o instalación','Alcance del trabajo','Documentación disponible']:['Producto o familia','Medida o especificación','Cantidad aproximada'];
    return `<section class="xp-content" id="xp-config"><div class="wrap xp-service-layout"><div><div class="xp-section-heading"><h2>Partamos por lo esencial</h2><p>Estos datos ayudan al equipo a entender el proyecto sin anticipar una solución técnica definitiva.</p></div><ul class="xp-service-points">${prompts.map((label,index)=>`<li><strong>0${index+1}</strong><span>${escape(label)}</span></li>`).join('')}</ul></div><div class="xp-service-form"><label>¿Qué quieres resolver?<textarea id="xp-service-detail" rows="5" maxlength="600" placeholder="Describe el espacio, la necesidad o el producto"></textarea></label><label>¿Necesitas instalación?<select id="xp-service-install"><option value="Por definir">Por definir</option><option value="Solicitar evaluación de instalación">Solicitar evaluación de instalación</option><option value="Solo suministro o consulta">Solo suministro o consulta</option></select></label><p class="xp-note">No ingreses datos personales aquí; podrás añadirlos directamente en WhatsApp.</p>${quotePanel(entry)}</div></div></section>`;
  }
  function bindService(entry) {
    const detail=$('#xp-service-detail',view),install=$('#xp-service-install',view);
    const update=()=>bindSimpleQuote(entry,`Necesidad: ${detail.value.trim()||'por definir'}. Instalación: ${install.value}.`);
    detail.addEventListener('input',update);install.addEventListener('change',update);update();
  }
  const colorOptions=[['Blanco puro','#f8f8f5'],['Blanco crema','#f2ead7'],['Celeste','#91d1e5'],['Gris','#8d999d'],['Turquesa','#43aeb1']];
  const select = (id,label,options,help='') => ({id,label,type:'select',options,help});
  const checks = (id,label,options,help='') => ({id,label,type:'checks',options,help});
  const textField = (id,label,placeholder='',help='') => ({id,label,type:'text',placeholder,help});
  function configDefinition(entry) {
    switch(entry.type) {
      case 'pool-config':return [
        {title:'Modelo',fields:[select('family','Forma de piscina',['Rectangular','Romana','Con jacuzzi']),select('model','Modelo y dimensiones',[]) ]},
        {title:'Acabado',fields:[{id:'color',label:'Color del revestimiento',type:'colors',options:colorOptions},select('installation','Instalación',['Solicitar instalación','Solo suministro','Evaluar alternativas'])]},
        {title:'Equipamiento',fields:[checks('equipment','Consultar complementos',['Filtración y motobomba','Iluminación de piscina','Cobertor térmico','Robot limpiafondos','Climatización a evaluar'],'La compatibilidad y el dimensionamiento se revisan técnicamente.'),textField('space','Espacio o referencia de terreno','Ej. patio, terraza, parcela')]},
        {title:'Revisar',fields:[textField('observations','Algo más que debamos saber','Acceso, plazo, dudas o inspiración')]}];
      case 'tinaja-config':return [
         {title:'Capacidad',fields:[{...select('capacity','¿Para cuántas personas?',['2 personas','4 personas','6 personas','8 personas','10 personas','12 personas','Capacidad personalizada por consultar','1 persona · medida especial por consultar'],'Las capacidades estándar figuran en la ficha oficial de JECHMAN.'),type:'tiles'}]},
         {title:'Madera',fields:[{...select('wood','Madera',['Pino','Ciprés','Por definir']),type:'tiles'}]},
        {title:'Revestimiento',fields:[select('lining','Color del revestimiento',['Por definir con JECHMAN'],'La página oficial permite elegir color, pero no publica un listado específico para tinajas.')]},
         {title:'Calefacción',fields:[{...select('boiler','Caldera o alternativa',['Acero galvanizado','Acero inoxidable','Consultar otra alternativa','Consultar bomba de calor · compatibilidad por evaluar'],'La bomba de calor se plantea solo como consulta de factibilidad.'),type:'tiles'}]},
        {title:'Complementos',fields:[checks('extras','Equipamiento adicional',['Bomba de recirculación','Filtro y carga filtrante','Hidromasaje','Iluminación LED','Tablero eléctrico'],'La ficha oficial documenta estas alternativas; JECHMAN confirma cada configuración.')]},
        {title:'Instalación',fields:[select('installation','Alcance',['Solo suministro','Solicitar instalación','Instalación y complementos','Evaluación técnica del proyecto'])]},
        {title:'Revisar',fields:[textField('observations','Detalles del lugar','Accesos, ubicación o necesidades especiales')]}];
      case 'jacuzzi-config':return [
        {title:'Proyecto',fields:[textField('space','Espacio disponible','Interior, terraza, patio u otro'),textField('capacity','Personas estimadas','Cantidad aproximada por evaluar','La ficha oficial no publica una capacidad fija.') ]},
        {title:'Acabado',fields:[{id:'color',label:'Color',type:'colors',options:colorOptions},select('installation','Instalación',['Solicitar instalación','Solo suministro','Por definir'])]},
        {title:'Equipamiento',fields:[checks('extras','Consultar opciones',['Recirculación y filtración','Hidromasaje','Iluminación','Bomba de calor a evaluar','Calefont a evaluar','Tablero eléctrico'],'La integración y compatibilidad se revisan por proyecto.')]},
        {title:'Revisar',fields:[textField('observations','Observaciones','Acceso, calefacción o dudas')]}];
      case 'domotica':return [
        {title:'Vivienda',fields:[select('home','Tipo de vivienda',['Casa','Departamento','Vivienda en construcción','Remodelación','Otro proyecto'])]},
        {title:'Ambientes',fields:[checks('rooms','¿Qué espacios quieres considerar?',['Living','Dormitorios','Cocina','Baños','Patio','Piscina','Estacionamiento','Accesos'])]},
        {title:'Automatización',fields:[checks('systems','Ideas a evaluar',['Iluminación inteligente','Control por horarios','Sensores de presencia','Climatización','Cortinas y persianas','Control de accesos','Monitoreo de consumo','Alertas y seguridad','Automatización de bombas'],'Estas son ideas para evaluación, no equipos ofrecidos ni compatibilidades garantizadas.')]},
        {title:'Energía e instalación',fields:[checks('energy','Objetivos de eficiencia',['Monitorear consumo','Controlar horarios','Apagar cargas no esenciales','Gestionar climatización']),select('wiring','Estado eléctrico',['Instalación existente','Necesita modernización','Proyecto nuevo','Requiere tablero o adecuaciones','No lo sé'])]},
        {title:'Revisar',fields:[textField('observations','¿Cómo imaginas tu hogar?','Cuéntanos qué te gustaría simplificar')]}];
      case 'inmotica':return [
        {title:'Inmueble',fields:[select('building','Tipo de proyecto',['Oficina','Edificio corporativo','Local comercial','Bodega','Instalación industrial','Hotel','Centro educativo','Otro']),textField('zones','Zonas aproximadas','Ej. tres pisos y estacionamiento')]},
        {title:'Sistemas',fields:[checks('systems','Sistemas por estudiar',['Iluminación por zonas','Climatización','Sensores de ocupación','Monitoreo energético','Control de accesos','Alarmas','Bombas','Áreas comunes','Tableros eléctricos','Gestión de horarios'])]},
        {title:'Integración',fields:[checks('integration','Consulta de integración',['Supervisión centralizada','BMS','PLC / SCADA','KNX','BACnet / Modbus'],'Las tecnologías indicadas son referencias de consulta; su disponibilidad y compatibilidad requieren ingeniería.'),select('existing','Instalaciones actuales',['Existentes','Proyecto nuevo','Requieren revisión','Por definir'])]},
        {title:'Revisar',fields:[textField('objectives','Objetivo del proyecto','Continuidad, gestión, confort u otro')]}];
      case 'energy':return [
        {title:'Uso',fields:[select('installation','Tipo de instalación',['Vivienda','Comercio','Oficina','Edificio','Otra']),checks('measures','Medidas por estudiar',['Iluminación eficiente','Sensores de presencia','Control horario','Monitoreo de consumo','Gestión de climatización','Evaluación de tableros'])]},
        {title:'Datos para cálculo',fields:[textField('equipment','Equipo o sistema','Ej. luminaria LED'),{id:'watts',label:'Potencia conocida (W)',type:'number',min:1,max:100000},{id:'quantity',label:'Cantidad de equipos',type:'number',min:1,max:10000},{id:'hours',label:'Horas de funcionamiento al día',type:'number',min:.1,max:24}]},
        {title:'Revisar',fields:[textField('observations','Objetivo del proyecto','¿Qué uso de energía deseas comprender mejor?')]}];
      default:return [
        {title:'Proyecto',fields:[select('project','Tipo de proyecto',['Vivienda','Comercio','Industria','Edificio','Otro']),textField('use','Uso o necesidad','Describe la instalación o el equipo')]},
        {title:'Alcance',fields:[checks('scope','Trabajos a consultar',['Diseño o revisión','Suministro de componentes','Instalación','Control y automatización','Monitoreo','Documentación técnica']),select('existing','Estado actual',['Proyecto nuevo','Instalación existente','Ampliación','Por definir'])]},
        {title:'Revisar',fields:[textField('observations','Antecedentes disponibles','Planos, ubicación o requisitos conocidos')] }];
    }
  }
  function control(field) {
    const help=field.help?`<small>${escape(field.help)}</small>`:'';
    if(field.type==='tiles')return `<fieldset class="xp-choice-field"><legend>${escape(field.label)}</legend><div class="xp-tile-options">${field.options.map((option,index)=>`<label class="xp-tile"><input type="radio" name="${field.id}" value="${escape(option)}" ${index===0?'checked':''}><span>${escape(option)}</span></label>`).join('')}</div>${help}</fieldset>`;
    if(field.type==='select')return `<label class="xp-field"><span>${escape(field.label)}</span><select name="${field.id}" id="xp-${field.id}">${field.options.map(option=>`<option value="${escape(option)}">${escape(option)}</option>`).join('')}</select>${help}</label>`;
    if(field.type==='text'||field.type==='number')return `<label class="xp-field"><span>${escape(field.label)}</span><input name="${field.id}" id="xp-${field.id}" type="${field.type==='number'?'number':'text'}" ${field.type==='number'?`min="${field.min}" max="${field.max}" step="any" inputmode="decimal"`:''} maxlength="200" placeholder="${escape(field.placeholder||'Por definir')}">${help}</label>`;
    if(field.type==='colors')return `<fieldset class="xp-choice-field"><legend>${escape(field.label)}</legend><div class="xp-color-options">${field.options.map(([label,color],index)=>`<label><input type="radio" name="${field.id}" value="${escape(label)}" ${index===0?'checked':''}><span class="xp-color-swatch" style="--swatch:${color}"></span><span>${escape(label)}</span></label>`).join('')}</div>${help}</fieldset>`;
    return `<fieldset class="xp-choice-field"><legend>${escape(field.label)}</legend><div class="xp-check-options">${field.options.map(option=>`<label><input type="checkbox" name="${field.id}" value="${escape(option)}"><span>${escape(option)}</span></label>`).join('')}</div>${help}</fieldset>`;
  }
  function renderConfig(entry) {
    const steps=configDefinition(entry);
    const previewPhotos=entry.gallery.length>1?entry.gallery.slice(1):entry.gallery;
    const visualClass=entry.type==='domotica'?'xp-house-scene':entry.type==='inmotica'?'xp-building-scene':'';
    const concept=visualClass?`<div class="xp-concept ${visualClass}" aria-hidden="true"><div class="xp-concept-architecture"><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="xp-concept-light"></div></div>`:'';
     const finishMarkup='<div class="xp-preview-finish" hidden><span class="xp-preview-swatch"></span><strong></strong><small>Acabado solicitado; la fotografía no cambia con la selección.</small></div>';
     const previewGallery=previewPhotos.length>1?`<div class="xp-preview-gallery" aria-label="Fotografías de referencia"><button type="button" class="xp-preview-arrow" data-preview-step="-1" aria-label="Fotografía anterior">←</button>${previewPhotos.map((item,index)=>`<button type="button" data-preview-index="${index}" aria-label="Ver fotografía ${index+1}: ${escape(item.alt)}" aria-pressed="${index===0}">${String(index+1).padStart(2,'0')}</button>`).join('')}<button type="button" class="xp-preview-arrow" data-preview-step="1" aria-label="Fotografía siguiente">→</button><button type="button" class="xp-preview-zoom" aria-label="Ampliar fotografía">Ampliar</button></div>`:'';
    const sim=entry.type==='domotica'?`<div class="xp-simulator"><h3>Prueba una escena conceptual</h3><p>Demostración visual; no hay equipos conectados ni mediciones reales.</p><div class="xp-sim-actions"><button type="button" data-scene="day" aria-pressed="true">Día</button><button type="button" data-scene="night" aria-pressed="false">Noche</button><button type="button" data-scene="away" aria-pressed="false">Ausencia</button></div></div>`:entry.type==='inmotica'?`<div class="xp-simulator"><h3>Explora zonas del edificio</h3><p>Representación conceptual de áreas a revisar por ingeniería.</p><div class="xp-sim-actions"><button type="button" data-zone="Planta baja" aria-pressed="true">Planta baja</button><button type="button" data-zone="Oficinas" aria-pressed="false">Oficinas</button><button type="button" data-zone="Servicios" aria-pressed="false">Servicios</button></div><p class="xp-zone-status" role="status">Zona: Planta baja</p></div>`:'';
    const calculation=entry.type==='energy'?'<div class="xp-energy-result" role="status">Ingresa potencia, cantidad y horas para ver un consumo diario teórico.</div>':'';
    return `<section class="xp-content" id="xp-config"><div class="wrap"><div class="xp-section-heading"><h2>${escape(entry.title)}</h2><p>Tu selección se actualiza mientras avanzas. Podrás revisarla antes de abrir WhatsApp.</p></div><div class="xp-config-layout"><div class="xp-preview xp-spotlight"><div class="xp-preview-image"><img src="${escape(previewPhotos[0].src)}" alt="${escape(previewPhotos[0].alt)}" loading="lazy" width="1000" height="750">${concept}${finishMarkup}<span class="xp-preview-label">${visualClass?'Simulación conceptual':escape(previewPhotos[0].credit)}</span></div>${previewGallery}${sim}<div class="xp-preview-summary"><h3>Tu selección</h3><dl id="xp-summary" aria-live="polite"></dl>${calculation}</div></div><div class="xp-config-form"><div class="xp-progress"><span id="xp-step-count">Paso 1 de ${steps.length}</span><div class="xp-progress-track"><span id="xp-progress-fill"></span></div></div><form id="xp-form" novalidate>${steps.map((step,index)=>`<fieldset class="xp-step" data-step="${index}" ${index?'hidden':''}><legend>${escape(step.title)}</legend>${step.fields.map(control).join('')}</fieldset>`).join('')}</form><div class="xp-config-nav"><button type="button" class="btn outline" id="xp-prev" disabled>Anterior</button><button type="button" class="btn" id="xp-next">Continuar</button></div><div class="xp-config-actions"><a class="btn xp-quote" id="xp-quote" href="#">Cotizar esta configuración</a><button type="button" class="btn outline" id="xp-add">Agregar a mi proyecto</button><button type="button" class="xp-reset" id="xp-reset">Reiniciar selección</button></div><p class="xp-note">No se envía información hasta que revises el mensaje y pulses Enviar en WhatsApp. La configuración final depende de JECHMAN.</p></div></div></div></section>`;
  }
  function bindConfig(entry) {
    const root=$('#xp-config',view), form=$('#xp-form',root), steps=$$('.xp-step',form), definitions=configDefinition(entry);let step=0;
    const previewPhotos=entry.gallery.length>1?entry.gallery.slice(1):entry.gallery;
     const draftId=new URLSearchParams((location.hash.split('?')[1]||'')).get('editar')||'';
     const draft=project.find(item=>item.id===draftId&&item.route==='#/'+entry.route);
     if(draft?.config){for(const [name,saved] of Object.entries(draft.config)){if(typeof name!=='string'||name.length>40)continue;const inputs=$$('[name]',form).filter(input=>input.name===name);for(const input of inputs){if(input.type==='checkbox'||input.type==='radio')input.checked=Array.isArray(saved)?saved.includes(input.value):saved===input.value;else if(typeof saved==='string')input.value=saved.slice(0,200);}}}
     const previewButtons=$$('[data-preview-index]',root),previewImage=$('.xp-preview-image>img',root),previewLabel=$('.xp-preview-label',root);
     function setPreview(index){const item=previewPhotos[index];if(!item)return;previewImage.src=item.src;previewImage.alt=item.alt;responsiveImage(previewImage);previewLabel.textContent=item.credit;previewButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));}
     previewButtons.forEach(button=>button.addEventListener('click',()=>setPreview(Number(button.dataset.previewIndex))));
     $$('[data-preview-step]',root).forEach(button=>button.addEventListener('click',()=>{const current=previewButtons.findIndex(item=>item.getAttribute('aria-pressed')==='true');setPreview((current+Number(button.dataset.previewStep)+previewPhotos.length)%previewPhotos.length);}));
     const zoom=$('.xp-preview-zoom',root);
     if(zoom){const dialog=document.createElement('dialog');dialog.className='xp-lightbox';dialog.innerHTML='<button type="button" aria-label="Cerrar imagen">Cerrar ×</button><img alt=""><p></p>';root.append(dialog);zoom.addEventListener('click',()=>{const img=$('img',dialog);img.src=previewImage.src;img.alt=previewImage.alt;$('p',dialog).textContent=previewLabel.textContent;dialog.showModal();});$('button',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});}
    const family=$('#xp-family',form), model=$('#xp-model',form);
    if(family&&model){
      const params=new URLSearchParams((location.hash.split('?')[1]||'')); const wanted=params.get('tipo');if(['Rectangular','Romana','Con jacuzzi'].includes(wanted))family.value=wanted;
       function updateModels() {const previous=model.value;model.replaceChildren();models.filter(item=>family.value==='Rectangular'?['Rectangular','Piscina'].includes(item[0]):item[0]===family.value).forEach(item=>model.add(new Option(`${item[1]} m · prof. ${item[2]} m${item[3]?' · '+item[3]:''}`,item[1])));if([...model.options].some(item=>item.value===previous))model.value=previous;const wantedModel=draft?.config?.model||params.get('modelo');if([...model.options].some(item=>item.value===wantedModel))model.value=wantedModel;update();}
      family.addEventListener('change',()=>{params.delete('modelo');updateModels()});updateModels();
    }
    function selections() {
      return definitions.flatMap(group=>group.fields.map(field=>{
        const inputs=$$(`[name="${field.id}"]`,form);let value='';
        if(field.type==='checks')value=inputs.filter(input=>input.checked).map(input=>input.value).join(', ');
         else if(field.type==='colors'||field.type==='tiles')value=inputs.find(input=>input.checked)?.value||'';
        else value=inputs[0]?.value?.trim()||'';
        return {label:field.label,value};
      })).filter(item=>item.value);
    }
     function configSnapshot(){const snapshot={};for(const input of $$('[name]',form)){if(input.type==='checkbox'){(snapshot[input.name]??=[]);if(input.checked)snapshot[input.name].push(input.value);}else if(input.type==='radio'){if(input.checked)snapshot[input.name]=input.value;}else snapshot[input.name]=input.value.slice(0,200);}return snapshot;}
    function update() {
      const values=selections();const summary=$('#xp-summary',root);summary.replaceChildren();
      for(const {label,value} of values){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;summary.append(dt,dd);}
      let details=values.map(item=>`${item.label}: ${item.value}.`).join('\n');
      if(entry.type==='pool-config'){const selected=models.find(item=>item[1]===model?.value&& (family.value==='Rectangular'?['Rectangular','Piscina'].includes(item[0]):item[0]===family.value));if(selected)details+=`\nProfundidad del modelo: ${selected[2]} m${selected[3]?' · '+selected[3]:''}.`;}
      if(entry.type==='energy'){const theoretical=updateEnergy(form,root);if(theoretical)details+=`\nConsumo diario teórico: ${theoretical} kWh (no es una medición).`;}
      $('#xp-quote',root).href=wa(defaultMessage(entry.title,details,entry.status));$('#xp-quote',root).target='_blank';$('#xp-quote',root).rel='noopener noreferrer';
      root.dataset.color=$('[name="color"]:checked',form)?.value||'';
      root.dataset.light=String(values.some(item=>/iluminaci/i.test(item.value)));
      const finish=$('.xp-preview-finish',root);
      if(entry.type==='pool-config'||entry.type==='jacuzzi-config'){
        const chosen=$('[name="color"]:checked',form)?.value||'Blanco puro';finish.hidden=false;$('.xp-preview-swatch',finish).style.background=colorOptions.find(item=>item[0]===chosen)?.[1]||'#f8f8f5';$('strong',finish).textContent=`Acabado: ${chosen}`;
       if(entry.type==='pool-config')root.dataset.family=family.value;
       }else if(entry.type==='tinaja-config'){const capacity=$('[name="capacity"]:checked',form)?.value||'Capacidad por definir',wood=$('[name="wood"]:checked',form)?.value||'madera por definir';finish.hidden=false;$('.xp-preview-swatch',finish).style.background=wood==='Ciprés'?'#9f6a42':'#c18b57';$('strong',finish).textContent=`${capacity} · ${wood}`;}
      return details;
    }
    function showStep(next){step=Math.max(0,Math.min(next,steps.length-1));steps.forEach((item,index)=>item.hidden=index!==step);$('#xp-step-count',root).textContent=`Paso ${step+1} de ${steps.length}`;$('#xp-progress-fill',root).style.width=`${((step+1)/steps.length)*100}%`;$('#xp-prev',root).disabled=step===0;$('#xp-next',root).textContent=step===steps.length-1?'Revisar mi proyecto':'Continuar';}
    form.addEventListener('input',update);form.addEventListener('change',update);
    $('#xp-prev',root).addEventListener('click',()=>{showStep(step-1);$('.xp-config-form',root).scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});});
     $('#xp-next',root).addEventListener('click',()=>{if(step<steps.length-1){showStep(step+1);$('.xp-config-form',root).scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});}else if(addProject(entry.title,update(),'#/'+entry.route,entry.status,configSnapshot(),draftId)){location.hash='#/mi-proyecto';}});
     $('#xp-add',root).addEventListener('click',()=>{if(addProject(entry.title,update(),'#/'+entry.route,entry.status,configSnapshot(),draftId)&&draftId)location.hash='#/mi-proyecto';});
    $('#xp-reset',root).addEventListener('click',()=>{form.reset();if(family&&model)family.dispatchEvent(new Event('change'));showStep(0);update();announce('Selección reiniciada.');});
    root.addEventListener('click',event=>{
      const scene=event.target.closest('[data-scene]'),zone=event.target.closest('[data-zone]');
      if(scene){$$('[data-scene]',root).forEach(button=>button.setAttribute('aria-pressed',String(button===scene)));root.dataset.scene=scene.dataset.scene;}
      if(zone){$$('[data-zone]',root).forEach(button=>button.setAttribute('aria-pressed',String(button===zone)));$('.xp-zone-status',root).textContent='Zona: '+zone.dataset.zone;root.dataset.zone=zone.dataset.zone;}
    });
     if(draft)announce('Configuración guardada recuperada. Puedes editarla y actualizar tu proyecto.');
     showStep(0);update();
  }
  function updateEnergy(form,root){
    const watts=Number($('#xp-watts',form).value),quantity=Number($('#xp-quantity',form).value),hours=Number($('#xp-hours',form).value),output=$('.xp-energy-result',root);
    if(!Number.isFinite(watts)||!Number.isFinite(quantity)||!Number.isFinite(hours)||watts<=0||quantity<=0||hours<=0||hours>24||watts>100000||quantity>10000){output.textContent='Ingresa potencia, cantidad y horas válidas para ver un consumo diario teórico.';return null;}
    const kwh=watts*quantity*hours/1000;output.textContent=`Consumo teórico diario: ${kwh.toLocaleString('es-CL',{maximumFractionDigits:2})} kWh. Fórmula: potencia (W) × cantidad × horas ÷ 1000. No es una medición ni una proyección de ahorro.`;return kwh.toFixed(2);
  }
  function slug(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function productRoute(product){return '#/tienda/producto/'+slug(product.name);}
  const productBySlug=new Map(products.map(product=>[slug(product.name),product]));
  function productEntry(product) {
    const visual=product.category==='Iluminación'?'light':product.category==='Ferretería/Hidráulica'?'hydraulic':product.category==='Electricidad'?'electric':product.category==='Tinajas'?'tinaja':product.category==='Jacuzzis'?'jacuzzi':product.category==='Climatización'?'heating':'pool';
    return {route:'tienda/producto/'+slug(product.name),title:product.name,parent:'tienda',visual,headline:product.name,description:product.description,status:'confirmed',gallery:[photo(product.image,product.name,'Imagen de catálogo')],type:'product'};
  }
  function renderProduct(product) {
    const entry=productEntry(product);
    const relevant=products.filter(item=>item.category===product.category&&item!==product).slice(0,3);
    const categoryFields=product.category==='Iluminación'?'<label>Uso previsto<select id="xp-product-use"><option>Por definir</option><option>Interior</option><option>Exterior</option><option>Piscina · revisar compatibilidad</option></select></label>':product.category==='Ferretería/Hidráulica'?'<label>Medida y material conocidos<input id="xp-product-use" maxlength="120" placeholder="Ej. diámetro, material o tipo de fitting"></label>':product.category==='Piscinas y bienestar'?'<label>Modelo de interés<input id="xp-product-use" maxlength="120" placeholder="Modelo o medida, si ya lo conoces"></label>':'<label>Uso o variante solicitada<input id="xp-product-use" maxlength="120" placeholder="Dato a confirmar"></label>';
    return `${hero(entry)}<section class="xp-content" id="xp-config"><div class="wrap xp-product-layout"><div class="xp-product-image"><img src="${escape(product.image)}" alt="${escape(product.name)}" loading="lazy" width="900" height="700"><p>Imagen de referencia del catálogo. Modelo, características y disponibilidad se confirman al cotizar.</p></div><div class="xp-product-details"><h2>Prepara tu consulta</h2><p>${escape(product.description)}</p><div class="xp-product-fields">${categoryFields}<label>Cantidad solicitada<input id="xp-product-quantity" type="number" min="1" max="999" value="1" inputmode="numeric"></label><label>¿Necesitas instalación?<select id="xp-product-install"><option>Por definir</option><option>Consultar instalación</option><option>Solo producto</option></select></label><label>Especificación adicional<textarea id="xp-product-notes" maxlength="300" rows="3" placeholder="Medidas o requisitos conocidos"></textarea></label></div><div class="xp-product-summary" role="status"></div><div class="xp-product-actions"><a class="btn" id="xp-product-quote" href="#">Cotizar producto</a><button type="button" class="btn outline" id="xp-product-add">Agregar a mi proyecto</button></div></div></div></section>${relevant.length?`<section class="xp-related"><div class="wrap"><div class="xp-section-heading"><h2>También puedes consultar</h2></div><div class="xp-related-grid">${relevant.map(item=>`<a class="xp-related-card xp-spotlight" href="${productRoute(item)}"><span>${escape(item.name)}</span><small>${escape(item.description)}</small><b aria-hidden="true">↗</b></a>`).join('')}</div></div></section>`:''}`;
  }
  function bindProduct(product){
    const use=$('#xp-product-use',view),quantity=$('#xp-product-quantity',view),install=$('#xp-product-install',view),notes=$('#xp-product-notes',view),summary=$('.xp-product-summary',view);
    const details=()=>`Producto: ${product.name}. Categoría: ${product.category}. Uso o variante: ${use.value.trim()||'por definir'}. Cantidad solicitada: ${quantity.value||'por definir'}. Instalación: ${install.value}. Detalles: ${notes.value.trim()||'por definir'}.`;
    function update(){const amount=Number(quantity.value);if(!Number.isInteger(amount)||amount<1||amount>999){summary.textContent='Indica una cantidad entre 1 y 999 para preparar la solicitud.';$('#xp-product-quote',view).removeAttribute('href');$('#xp-product-add',view).disabled=true;return;}summary.textContent=`${product.name} · ${amount} ${amount===1?'unidad solicitada':'unidades solicitadas'} · ${install.value}`;$('#xp-product-quote',view).href=wa(defaultMessage(product.name,details(),'confirmed'));$('#xp-product-quote',view).target='_blank';$('#xp-product-quote',view).rel='noopener noreferrer';$('#xp-product-add',view).disabled=false;}
    [use,quantity,install,notes].forEach(input=>input.addEventListener('input',update));
    $('#xp-product-add',view).addEventListener('click',()=>addProject(product.name,details(),productRoute(product),'confirmed'));update();
  }
  function renderCatalog(entry) {
    const category=entry.category|| (entry.visual==='light'?'Iluminación':entry.visual==='hydraulic'?'Ferretería/Hidráulica':entry.visual==='electric'?'Electricidad':'Ferretería/Hidráulica');
    const selected=products.filter(item=>item.category===category);
    return `<section class="xp-content" id="xp-config"><div class="wrap"><div class="xp-section-heading"><h2>Explora productos</h2><p>Abre una ficha para indicar uso, cantidad y necesidades de instalación. La disponibilidad se confirma al cotizar.</p></div><div class="xp-catalog-grid">${selected.map(item=>`<article class="xp-catalog-card xp-spotlight"><img src="${escape(item.image)}" alt="${escape(item.name)}" loading="lazy" width="700" height="500"><div><h3>${escape(item.name)}</h3><p>${escape(item.description)}</p><a href="${productRoute(item)}">Explorar ficha <span aria-hidden="true">↗</span></a></div></article>`).join('')}</div>${quotePanel(entry)}</div></section>`;
  }
  function renderProject(){
     view.innerHTML=`<section class="xp-project-hero"><div class="wrap"><nav class="xp-breadcrumb" aria-label="Ruta de navegación"><a href="#/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Mi proyecto</span></nav><h1>Revisa tu proyecto</h1><p>Reúne soluciones y productos en una sola solicitud. Puedes quitar elementos o volver a configurarlos antes de enviarla.</p></div></section><section class="xp-project-content"><div class="wrap"><label class="xp-project-name">Nombre de tu proyecto <input id="xp-project-name" maxlength="80" placeholder="Ej. Piscina y terraza en casa" value="${escape(projectName)}"><small>Opcional. Solo se añade al mensaje cuando solicites cotización.</small></label><div id="xp-project-items" class="xp-project-items"></div><div class="xp-project-final"><p>JECHMAN confirma disponibilidad, compatibilidad y alcance técnico. Tu lista no incluye precios ni envía datos automáticamente.</p><a class="btn" id="xp-project-send" href="#">Enviar solicitud de cotización</a><a class="xp-text-link" href="#/">Seguir explorando</a></div></div></section>`;
     $('#xp-project-name',view).addEventListener('input',event=>{projectName=event.target.value.trim().slice(0,80);try{sessionStorage.setItem('jechman-project-name',projectName);}catch{}updateProjectLink();});
    const container=$('#xp-project-items',view);if(!project.length)container.innerHTML='<div class="xp-project-empty"><h2>Aún no hay elementos en tu proyecto</h2><p>Explora una sección, configura tu idea y agrégala aquí.</p><a class="btn" href="#/piscinas">Explorar soluciones</a></div>';
    else project.forEach((item,index)=>{
      const card=document.createElement('article');card.className='xp-project-item';
      const text=document.createElement('div');const title=document.createElement('h2');title.textContent=`${index+1}. ${item.title}`;
      const p=document.createElement('p');p.textContent=item.details;const status=document.createElement('small');status.textContent=statusLabels[item.status]||statusLabels.evaluation;
      const editor=document.createElement('div');editor.className='xp-project-editor';editor.hidden=true;
      const label=document.createElement('label');label.textContent='Detalles de la solicitud';const area=document.createElement('textarea');area.value=item.details;area.maxLength=900;area.rows=5;label.append(area);
      const save=document.createElement('button');save.type='button';save.textContent='Guardar cambios';save.addEventListener('click',()=>{item.details=area.value.trim().slice(0,900)||item.details;persist();renderProject();announce('Solicitud actualizada.');});
      const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Cancelar';cancel.addEventListener('click',()=>{editor.hidden=true;});editor.append(label,save,cancel);text.append(title,status,p,editor);
       const actions=document.createElement('div');const edit=document.createElement('a');edit.href=item.config?`${item.route}?editar=${encodeURIComponent(item.id)}`:item.route;edit.textContent=item.config?'Editar configuración':'Volver a configurar';
      const modify=document.createElement('button');modify.type='button';modify.textContent='Editar detalles';modify.addEventListener('click',()=>{editor.hidden=false;area.focus();});
      const remove=document.createElement('button');remove.type='button';remove.textContent='Quitar';remove.addEventListener('click',()=>{project=project.filter(candidate=>candidate.id!==item.id);persist();renderProject();});
      actions.append(modify,edit,remove);card.append(text,actions);container.append(card);
    });
     updateProjectLink();
  }
   function updateProjectLink(){const send=$('#xp-project-send',view);if(!send)return;if(!project.length){send.setAttribute('aria-disabled','true');send.removeAttribute('href');return;}const message=`Hola JECHMAN. Quisiera solicitar una cotización conjunta para mi proyecto${projectName?' «'+projectName+'»':''}.\n\n`+project.map((item,index)=>`${index+1}. ${item.title}\n${item.details}${item.status==='proposal'?'\nPropuesta sujeta a confirmación comercial y técnica.':''}`).join('\n\n')+'\n\n¿Podemos revisar factibilidad, disponibilidad e instalación?';send.href=wa(message);send.target='_blank';send.rel='noopener noreferrer';}
  function decorateCatalog(){
    const grid=$('#catalog-grid');if(!grid)return;
    function refresh(){for(const card of $$('.catalog-card',grid)){if(card.dataset.xpEnhanced)return;const title=$('h3',card)?.textContent;const product=products.find(item=>item.name===title);if(!product)continue;card.dataset.xpEnhanced='true';const link=document.createElement('a');link.className='xp-catalog-page-link';link.href=productRoute(product);link.textContent='Página del producto ↗';$('.actions',card)?.append(link);const add=document.createElement('button');add.type='button';add.className='xp-card-add';add.textContent='Agregar a mi proyecto';add.addEventListener('click',()=>addProject(product.name,`Producto: ${product.name}. Categoría: ${product.category}. Especificaciones y cantidad por definir.`,productRoute(product),'confirmed'));$('.actions',card)?.append(add);}}
    new MutationObserver(refresh).observe(grid,{childList:true});refresh();
    const dialog=$('#product-dialog');if(dialog){const actions=$('.dialog-body .actions',dialog);const link=document.createElement('a');link.className='xp-dialog-page-link';link.textContent='Ver página del producto';const add=document.createElement('button');add.type='button';add.className='btn outline';add.textContent='Agregar a mi proyecto';add.addEventListener('click',()=>{const title=$('#dialog-title',dialog)?.textContent;const product=products.find(item=>item.name===title);if(product)addProject(product.name,messageFromAnchor($('#dialog-quote',dialog)),productRoute(product),'confirmed');});actions.append(link,add);new MutationObserver(()=>{const title=$('#dialog-title',dialog)?.textContent;const product=products.find(item=>item.name===title);if(product)link.href=productRoute(product);}).observe($('#dialog-title',dialog),{childList:true});}
  }
  decorateCatalog();
  function messageFromAnchor(anchor){try{return new URL(anchor.href).searchParams.get('text')?.replace(/^Hola JECHMAN[,.: ]*/i,'').slice(0,900)||'Opciones por definir.';}catch{return 'Opciones por definir.';}}
  function connectExisting(){
    const connections=[
      ['#tinaja-quote','#tinaja-config','Tinaja personalizada','#/tinajas','confirmed'],
      ['#enh-quote','.enh-studio','Proyecto de piscina y bienestar','#/piscinas','evaluation'],
      ['#enh-electric-quote','.enh-service-picker','Proyecto eléctrico','#/electricidad','evaluation']
    ];
    for(const [selector,container,title,route,status] of connections){const anchor=$(selector),host=$(container);if(!anchor||!host)continue;const button=document.createElement('button');button.type='button';button.className='btn outline xp-existing-add';button.textContent='Agregar a mi proyecto';button.addEventListener('click',()=>addProject(title,messageFromAnchor(anchor),route,status));anchor.insertAdjacentElement('afterend',button);}
    $$('.model-card').forEach(card=>{const quote=$('.model-quote',card);if(!quote)return;const button=document.createElement('button');button.type='button';button.className='btn small outline xp-existing-add';button.textContent='Agregar a mi proyecto';button.addEventListener('click',()=>addProject('Piscina '+($('h3',card)?.textContent||''),messageFromAnchor(quote),'#/piscinas/configurar','confirmed'));quote.insertAdjacentElement('afterend',button);});
  }
  connectExisting();
  function activateMotion(){
    if(reduced())return;
    const observer=new IntersectionObserver(items=>{for(const item of items){if(item.isIntersecting){item.target.classList.add('xp-in-view');observer.unobserve(item.target);}}},{threshold:.08});
    $$('.xp-section-heading,.xp-model-card,.xp-catalog-card,.xp-related-card',view).forEach(element=>element.classList.add('xp-reveal'));
    $$('.xp-reveal',view).forEach(element=>observer.observe(element));
    $$('.xp-spotlight',view).forEach(element=>element.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const bounds=element.getBoundingClientRect();element.style.setProperty('--pointer-x',`${event.clientX-bounds.left}px`);element.style.setProperty('--pointer-y',`${event.clientY-bounds.top}px`);}));
  }
  function handleRoute(){
    let raw;try{raw=decodeURIComponent((location.hash.slice(2)||'').split('?')[0]).replace(/\/$/,'');}catch{return;}
    if(raw==='mi-proyecto'){
      $$('.view').forEach(item=>item.hidden=item!==view);$$('.nav [data-route]').forEach(link=>link.removeAttribute('aria-current'));currentEntry=null;renderProject();document.title='Mi proyecto | JECHMAN';window.scrollTo({top:0,left:0,behavior:'instant'});$('#contenido').focus({preventScroll:true});activateMotion();return;
    }
    let entry=byRoute.get(raw),product=null;
    if(raw.startsWith('tienda/producto/')){product=productBySlug.get(raw.split('/')[2]);if(product)entry=productEntry(product);}
    if(!entry)return;
    $$('.view').forEach(item=>item.hidden=item!==view);currentEntry=entry;
    const navParent=['tinajas','jacuzzis'].includes(entry.parent)?'piscinas':entry.parent;
    $$('.nav [data-route]').forEach(link=>{if(link.dataset.route===navParent)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    let content='';if(product)content=renderProduct(product);else if(entry.type==='modelos')content=renderModelList(entry);else if(entry.type==='catalog')content=renderCatalog(entry);else if(entry.type==='service')content=renderService(entry);else content=renderConfig(entry);
    view.innerHTML=hero(entry)+content+makeGallery(entry)+related(entry);
    $$("img[src^='assets/editorial/']",view).forEach(responsiveImage);
    if(product)bindProduct(product);else if(entry.type==='modelos'){
      bindSimpleQuote(entry,'Familia de modelos: '+entry.title+'. Modelo y medidas por definir.');
      bindModelComparison(entry);
      const family=entry.route.endsWith('romanas')?'Romana':entry.route.endsWith('con-jacuzzi')?'Con jacuzzi':'Rectangular';
      const listed=models.filter(item=>family==='Rectangular'?['Rectangular','Piscina'].includes(item[0]):item[0]===family);
      $$('.xp-model-card',view).forEach((card,index)=>window.showPoolPhoto?.(card,listed[index]));
    }else if(entry.type==='catalog')bindSimpleQuote(entry,'Familia de productos: '+entry.title+'. Especificaciones por definir.');else if(entry.type==='service')bindService(entry);else bindConfig(entry);
    bindGallery(entry);activateMotion();document.title=entry.title+' | JECHMAN';window.scrollTo({top:0,left:0,behavior:'instant'});$('#contenido').focus({preventScroll:true});
  }
  window.addEventListener('hashchange',handleRoute);handleRoute();
   view.addEventListener('click',event=>{if(event.target.closest('[data-xp-scroll]'))$('#xp-config',view)?.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});const button=event.target.closest('[data-related-add]');if(button){const item=byRoute.get(button.dataset.relatedAdd);if(item)addProject(item.title,`Complemento solicitado para ${currentEntry?.title||'mi proyecto'}. Detalles y compatibilidad por evaluar.`, '#/'+item.route,item.status);}const quote=event.target.closest('a[href^="https://wa.me/"]');if(quote)announce('Mensaje preparado para WhatsApp. Revísalo antes de enviarlo.');});
  window.JechmanExperience={addProject,productRoute,entries};
})();


