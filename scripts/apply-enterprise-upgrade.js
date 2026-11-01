const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Inyectar meta tags de seguridad y stylesheet enterprise en <head>
if (!html.includes('enterprise-2026.css')) {
  const headTarget = '<link rel="stylesheet" href="assets/pool-scene-accessories.css">';
  const headReplacement = `<link rel="stylesheet" href="assets/pool-scene-accessories.css">\n  <link rel="stylesheet" href="assets/enterprise-2026.css">`;
  html = html.replace(headTarget, headReplacement);
}

if (!html.includes('X-Content-Type-Options')) {
  const metaTarget = '<meta name="color-scheme" content="light">';
  const metaReplacement = `<meta name="color-scheme" content="light">\n  <meta http-equiv="X-Content-Type-Options" content="nosniff">\n  <meta name="referrer" content="strict-origin-when-cross-origin">`;
  html = html.replace(metaTarget, metaReplacement);
}

// 2. Banner de Novedades con Temporada de Navidad & Verano
const bannerRegex = /<div class="announcement-track">[\s\S]*?<\/div><div class="announcement-controls">/;
const newBanner = `<div class="announcement-track">
    <div class="announcement-slide is-active" data-announcement data-tone="seasonal" data-season="christmas"><span class="announcement-message">🎅 <strong>Campaña Navidad & Verano 2026/2027</strong>: Reserva fabricación e instalación antes del cierre de agenda. Cupos limitados.</span><a href="#/contacto?area=Piscinas%20y%20bienestar">Reservar cupo <span aria-hidden="true">↗</span></a></div>
    <div class="announcement-slide" data-announcement data-tone="pool" hidden><span class="announcement-message">☀️ <strong>Piscinas y Jacuzzis de Hidromasaje</strong>: Disfruta las fiestas con agua temperada y automatización domótica.</span><a href="#/piscinas">Ver modelos <span aria-hidden="true">↗</span></a></div>
    <div class="announcement-slide" data-announcement data-tone="electric" hidden><span class="announcement-message">⚡ <strong>Ingeniería, Tableros e Inmótica</strong>: Ahorro energético y telemetría inteligente para hogares y empresas.</span><a href="#/electricidad">Soluciones técnicas <span aria-hidden="true">↗</span></a></div>
    <div class="announcement-slide" data-announcement data-tone="commercial" hidden><span class="announcement-message">📦 <strong>Despachos rápidos a todo Chile</strong>: Bombas, filtros, iluminación subacuática y suministros garantizados.</span><a href="#/tienda">Ver tienda oficial <span aria-hidden="true">↗</span></a></div>
  </div><div class="announcement-controls">`;

html = html.replace(bannerRegex, newBanner);

// 3. Inyectar las 2 secciones interactivas después de #historia en el home view
const interactiveModules = `
      <!-- SECCIÓN INTERACTIVA 1: CÓMO SE FABRICA E INSTALA UNA PISCINA DE FIBRA DE VIDRIO -->
      <section class="section pool-engineering-section" id="ingenieria-piscinas" aria-labelledby="pool-eng-main-title">
        <div class="wrap">
          <div class="pool-eng-header">
            <span class="pool-eng-badge">Ingeniería & Proceso Constructivo</span>
            <h2 id="pool-eng-main-title">Cómo se fabrica e instala una piscina de fibra de vidrio</h2>
            <p>De la matriz en taller a tu jardín: un proceso de precisión milimétrica con resina viniléster, refuerzos estructurales de acero y nivelación láser.</p>
          </div>
          <div class="pool-eng-nav" id="pool-eng-nav" role="tablist" aria-label="Fases de fabricación e instalación"></div>
          <div class="pool-eng-stage">
            <div class="pool-eng-media">
              <img id="pool-eng-img" src="assets/projects/pool-construction.jpg" alt="Fase de ingeniería de piscina" width="800" height="550" loading="lazy">
              <span class="pool-eng-step-num" id="pool-eng-num">01 / 06</span>
            </div>
            <div class="pool-eng-info">
              <div class="eng-phase-label" id="pool-eng-phase">Fase 01 · Barrera Química y Filtro UV</div>
              <h3 id="pool-eng-title">Matriz y Aplicación de Gel Coat ISO/NPG</h3>
              <p id="pool-eng-desc">En cabina presurizada con temperatura controlada (21°C), se aplica una capa uniforme de 800 micras de Gel Coat isoftálico neopentilglicol (ISO/NPG). Proporciona resistencia total a la ósmosis, brillo náutico y protección certificada contra radiación UV.</p>
              <div class="pool-eng-specs" id="pool-eng-specs"></div>
              <a class="btn" data-wa="Hola JECHMAN, me interesa cotizar una piscina de fibra de vidrio con instalación técnica garantizada." href="#">Consultar fabricación para mi proyecto</a>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN INTERACTIVA 2: ORIGEN Y FUTURO DE LA DOMÓTICA E INMÓTICA -->
      <section class="section domotica-future-section" id="domotica-inmotica" aria-labelledby="domotica-main-title">
        <div class="wrap">
          <div class="domotica-header">
            <span class="domotica-kicker">Revolución Tecnológica 1975 - 2026</span>
            <h2 id="domotica-main-title">Origen de la Domótica y la Inmótica: Cómo transforman tu espacio</h2>
            <p>De las primeras señales analógicas por corriente eléctrica al estándar unificado Matter e Inteligencia Artificial: descubre el impacto en tu hogar y empresa.</p>
          </div>
          <div class="domotica-tab-controls" role="tablist" aria-label="Categorías de domótica e inmótica">
            <button type="button" class="domotica-tab-btn is-active" data-domotica-tab="domotica-historia" role="tab" aria-selected="true">01 · Origen e Historia (1975 - 2026)</button>
            <button type="button" class="domotica-tab-btn" data-domotica-tab="domotica-hogar" role="tab" aria-selected="false">02 · Domótica Residencial (Hogar)</button>
            <button type="button" class="domotica-tab-btn" data-domotica-tab="domotica-empresa" role="tab" aria-selected="false">03 · Inmótica Corporativa (Empresas)</button>
          </div>

          <!-- Pestaña 1: Historia -->
          <div class="domotica-tab-pane is-active" id="domotica-historia" role="tabpanel">
            <div class="domotica-timeline">
              <div class="timeline-step">
                <div class="timeline-year">1975</div>
                <span class="timeline-badge">Nacimiento Histórico</span>
                <h4>Protocolo X10</h4>
                <p>Nace en Escocia el primer protocolo domótico masivo, modulando ráfagas de 120 kHz sobre el cableado de 220V existente al cruzar la fase por cero.</p>
              </div>
              <div class="timeline-step">
                <div class="timeline-year">1990s</div>
                <span class="timeline-badge">Estándar Profesional</span>
                <h4>Cableado Bus KNX / EIB</h4>
                <p>La industria europea adopta el cable bus de par trenzado, permitiendo a grandes edificios y residencias controlar climatización e iluminación con alta fiabilidad.</p>
              </div>
              <div class="timeline-step">
                <div class="timeline-year">2010s</div>
                <span class="timeline-badge">Redes Inalámbricas</span>
                <h4>Zigbee, Z-Wave y Wi-Fi IoT</h4>
                <p>Desaparición de cables invasivos gracias a redes malladas (mesh) ultra eficientes y control ubicuo desde las primeras apps móviles de bolsillo.</p>
              </div>
              <div class="timeline-step">
                <div class="timeline-year">2026</div>
                <span class="timeline-badge">Era Cuántica & IA</span>
                <h4>Matter, Thread y Machine Learning</h4>
                <p>Interoperabilidad universal entre marcas, telemetría de consumo eléctrico en tableros y algoritmos de IA predictiva que reducen hasta un 40% el gasto en climatización.</p>
              </div>
            </div>
          </div>

          <!-- Pestaña 2: Domótica Residencial -->
          <div class="domotica-tab-pane" id="domotica-hogar" role="tabpanel">
            <div class="domotica-pillars-grid">
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <span class="pillar-tag">Eficiencia Máxima</span>
                <h4>Gestión Térmica Inteligente</h4>
                <p>Coordinación automática de bombas de calor, paneles solares y aire acondicionado según las tarifas horarias y temperatura ambiente.</p>
              </div>
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                </div>
                <span class="pillar-tag">Bienestar & Confort</span>
                <h4>Iluminación Circadiana & RGB</h4>
                <p>Luminarias LED que ajustan su temperatura de color al ciclo biológico humano y escenas subacuáticas programables en piscinas y jardines.</p>
              </div>
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span class="pillar-tag">Seguridad Activa</span>
                <h4>Protección Perimetral y Accesos</h4>
                <p>Cerraduras electrónicas biométricas, cámaras con visión nocturna, sensores de corte de energía y detección de anegamiento en sala de bombas.</p>
              </div>
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <span class="pillar-tag">Piscinas & Spa IoT</span>
                <h4>Piscinas y Tinajas Inteligentes</h4>
                <p>Activación remota del hidromasaje desde el celular, control del ciclo de filtración según calidad del agua y temperado anticipado.</p>
              </div>
            </div>
          </div>

          <!-- Pestaña 3: Inmótica Corporativa -->
          <div class="domotica-tab-pane" id="domotica-empresa" role="tabpanel">
            <div class="domotica-pillars-grid">
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>
                </div>
                <span class="pillar-tag">Gestión Edilicia (BEMS)</span>
                <h4>Automatización de Edificios</h4>
                <p>Centralización de climatización central (HVAC), luminarias de faena y áreas comunes para cumplir metas de carbono neutralidad y ahorro operativo.</p>
              </div>
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <span class="pillar-tag">Ingeniería Eléctrica</span>
                <h4>Telemetría en Tableros Trifásicos</h4>
                <p>Monitoreo continuo de tensión, armónicos, desbalance de fases y consumo por circuito para prevenir caídas de producción en plantas e industrias.</p>
              </div>
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <span class="pillar-tag">Seguridad Corporativa</span>
                <h4>Control de Acceso Unificado</h4>
                <p>Torniquetes, barreras vehiculares y puertas de acceso restringido con lector RFID/facial sincronizado con la nube institucional.</p>
              </div>
              <div class="domotica-pillar-card">
                <div class="pillar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
                </div>
                <span class="pillar-tag">Impulsión & Riego</span>
                <h4>Grupos de Bombeo Autónomos</h4>
                <p>Control de bombas de agua con variadores de frecuencia (VFD), alternancia de motores y alarmas de falta de agua en estanques de acumulación.</p>
              </div>
            </div>
          </div>
        </div>
      </section>`;

if (!html.includes('id="ingenieria-piscinas"')) {
  const targetAbout = `</ol><a class="about-cert" data-wa="Hola JECHMAN, quisiera solicitar antecedentes técnicos o certificaciones para mi proyecto." href="#">Solicitar antecedentes y certificaciones</a></div></div></section>`;
  html = html.replace(targetAbout, targetAbout + interactiveModules);
}

// 4. Actualizar Formulario de Contacto
const formActionsTarget = `<div class="form-actions"><button class="btn" type="submit">Preparar solicitud en WhatsApp</button><a class="text-link" href="mailto:ventas@jechman.cl">Prefiero enviar un correo</a></div><p id="form-status" role="status"></p>`;
const formActionsReplacement = `<div class="form-actions">
            <button class="btn btn-email-dispatch" type="submit" id="btn-submit-email">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Enviar Cotización a ventas@jechman.cl
            </button>
            <button class="btn btn-wa-dispatch" type="button" id="btn-submit-wa">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
              Enviar también por WhatsApp Oficial
            </button>
          </div>
          <p id="form-status" role="status"></p>`;

html = html.replace(formActionsTarget, formActionsReplacement);

// 5. Actualizar el array products en el script con imageHover para los 22 productos
const productsRegex = /const products=\[\s*\{[\s\S]*?\}\s*\];/;
const newProducts = `const products=[
  {name:'Proyecto integral de piscina con jacuzzi',category:'Piscinas y bienestar',image:'assets/pools-real/jacuzzi-redondo.jpeg',imageHover:'assets/pools-real/jacuzzi-rectangular.jpeg',description:'Piscina de fibra con jacuzzi integrado; consulta modelo, instalación, filtración, climatización e iluminación.',route:'#/piscinas'},
  {name:'Proyecto eléctrico con tablero y control',category:'Electricidad',image:'assets/photography/work-installation.jpg',imageHover:'assets/photography/electrician-panel-27928760.jpg',description:'Instalación, tablero, protecciones, iluminación y automatización sujetos a evaluación técnica.',route:'#/electricidad'},
  {name:'Gabinete metálico para tablero IP65',category:'Electricidad',image:'assets/jechman-products/tablero-digital.jpg',imageHover:'assets/jechman-products/tablero-analogo.jpg',description:'Familia de gabinetes metálicos de distintos tamaños presente en el catálogo público. Consulta dimensiones y compatibilidad.'},
  {name:'Filtro Vulcano VC50',category:'Accesorios de piscina',image:'assets/jechman-products/filtro-vulcano-vc50.jpg',imageHover:'assets/photography/pool-filter-pump-cutout.png',description:'Filtración para mantener el agua en movimiento. Confirma caudal, conexiones y disponibilidad al cotizar.'},
  {name:'Filtro Emaux P450',category:'Accesorios de piscina',image:'assets/jechman-products/filtro-emaux-p450.jpg',imageHover:'assets/photography/pipework-29274530.jpg',description:'Filtración para piscina. Consulta compatibilidad con la bomba y el volumen de agua.'},
  {name:'Piscina rectangular de fibra de vidrio',category:'Piscinas y bienestar',image:'assets/jechman-products/piscina-rectangular.png',imageHover:'assets/pools-real/modelo-6-4.jpeg',description:'Familia de modelos rectangulares publicados por JECHMAN. Selecciona la medida en la página de piscinas.',route:'#/piscinas'},
  {name:'Piscina romana de fibra de vidrio',category:'Piscinas y bienestar',image:'assets/jechman-products/piscina-romana.png',imageHover:'assets/pools-real/modelos-romanos.jpeg',description:'Familia de modelos romanos publicados por JECHMAN.',route:'#/piscinas'},
  {name:'Tinaja de madera revestida en fibra',category:'Tinajas',image:'assets/jechman-products/tinaja.jpg',imageHover:'assets/photography/wood-fired-hot-tub-27777826.jpg',description:'Capacidades de 2 a 12 personas; madera y equipamiento configurables.',route:'#/tinajas'},
  {name:'Jacuzzi de fibra de vidrio',category:'Jacuzzis',image:'assets/jechman-products/jacuzzi-jechman.jpg',imageHover:'assets/pools-real/jacuzzi-rectangular.jpeg',description:'Fabricación e instalación; recirculación y filtración sujetos a evaluación.',route:'#/jacuzzis'},
  {name:'Bomba para piscina',category:'Accesorios de piscina',image:'assets/jechman-products/bomba-emaux-ss050.jpg',imageHover:'assets/jechman-products/bomba-reynolds.jpg',description:'Recirculación para piscina. Revisamos caudal, conexiones y compatibilidad con el filtro antes de cotizar.'},
  {name:'Foco para piscina',category:'Iluminación',image:'assets/jechman-products/foco-piscina.png',imageHover:'assets/photography/pool-lighting-6957108.jpg',description:'Iluminación diseñada para piscina. Consulta modelo y compatibilidad.'},
  {name:'Bomba de calor o calefont para jacuzzi',category:'Climatización',image:'assets/catalog/bomba-calor.webp',imageHover:'assets/photography/heat-pump-cutout.png',description:'Opciones mencionadas para jacuzzi; factibilidad y compatibilidad se evalúan técnicamente.'},
  {name:'Caldera para tinaja',category:'Climatización',image:'assets/photography/wood-fired-hot-tub-27777826.jpg',imageHover:'assets/projects/tinaja-official.webp',description:'Opciones de acero galvanizado o inoxidable publicadas para tinajas.'},
  {name:'Luminaria LED general',category:'Iluminación',image:'assets/photography/led-ceiling-36344746.jpg',imageHover:'assets/photography/floodlights-1666582.jpg',description:'Ilumina interiores con una solución ajustada al uso, tono de luz y tipo de instalación.'},
  {name:'Proyector de área',category:'Iluminación',image:'assets/photography/floodlights-1666582.jpg',imageHover:'assets/photography/led-ceiling-36344746.jpg',description:'Iluminación para exteriores y espacios de trabajo; revisamos potencia, montaje y protección.'},
  {name:'Cinta LED',category:'Iluminación',image:'assets/photography/led-strips-6444242.jpg',imageHover:'assets/photography/pool-lighting-6957108.jpg',description:'Luz flexible para detalles y ambientes; consulta longitud, perfil y fuente de alimentación.'},
  {name:'Tablero eléctrico',category:'Electricidad',image:'assets/jechman-products/tablero-analogo.jpg',imageHover:'assets/jechman-products/tablero-digital.jpg',description:'Gabinetes y tableros para organizar distribución, protección y control según el proyecto.'},
  {name:'Contactor y elementos auxiliares',category:'Electricidad',image:'assets/photography/work-automation.jpg',imageHover:'assets/photography/electrical-breakers-38171184.jpg',description:'Control de cargas y maniobras eléctricas; definimos componentes tras revisar la instalación.'},
  {name:'Interruptor termomagnético',category:'Electricidad',image:'assets/photography/electrical-breakers-38171184.jpg',imageHover:'assets/photography/work-panel.jpg',description:'Protección para circuitos eléctricos; la capacidad se define según el proyecto.'},
  {name:'Fitting PVC hidráulico',category:'Ferretería/Hidráulica',image:'assets/photography/plumbing-fittings-28178448.jpg',imageHover:'assets/photography/pipework-29274530.jpg',description:'Conexiones hidráulicas para armar o reparar una red. Indica medida y material al cotizar.'},
  {name:'Tubería PVC',category:'Ferretería/Hidráulica',image:'assets/photography/pvc-pipes-29301874.jpg',imageHover:'assets/photography/plumbing-fittings-28178448.jpg',description:'Tuberías para conducción; confirma diámetro, uso y cantidad requerida.'},
  {name:'Herramientas para canalización',category:'Ferretería/Hidráulica',image:'assets/photography/power-tools-6154662.jpg',imageHover:'assets/photography/materials-10261153.jpg',description:'Herramientas para preparar y ejecutar trabajos de canalización.'}
];`;

html = html.replace(productsRegex, newProducts);

// 6. Actualizar renderCatalog para renderizar ambas imágenes y el badge
const renderCatalogRegex = /function renderCatalog\(\)\{[\s\S]*?q\('#catalog-status'\)\.textContent=shown\.length\+' resultados de referencia\.'\}/;
const newRenderCatalog = `function renderCatalog(){
  const term=normalize(q('#catalog-search').value.trim());
  const shown=products.filter(p=>(activeCategory==='Todos'||p.category===activeCategory)&&normalize(p.name+' '+p.description+' '+p.category).includes(term));
  q('#catalog-grid').innerHTML='';
  shown.forEach(p=>{
    const card=document.createElement('article');
    card.className='card catalog-card spotlight-card';
    if(p.image.includes('pools-real/jacuzzi-'))card.classList.add('catalog-card--jacuzzi-real');
    
    const media=document.createElement('figure');
    media.className='catalog-media';
    
    const image=document.createElement('img');
    image.className='catalog-img-primary';
    image.src=p.image;
    image.alt=p.name;
    image.loading='lazy';
    image.decoding='async';
    media.append(image);
    
    if(p.imageHover){
      const imgHover=document.createElement('img');
      imgHover.className='catalog-img-hover';
      imgHover.src=p.imageHover;
      imgHover.alt=p.name+' - Vista técnica alterna';
      imgHover.loading='lazy';
      imgHover.decoding='async';
      media.append(imgHover);
      
      const badge=document.createElement('span');
      badge.className='catalog-hover-badge';
      badge.textContent='Vista alterna';
      media.append(badge);
    }
    
    const content=document.createElement('div');
    content.className='catalog-card-body';
    const tag=document.createElement('span');
    tag.className='tag';
    tag.textContent=p.category;
    const title=document.createElement('h3');
    title.textContent=p.name;
    const actions=document.createElement('div');
    actions.className='actions';
    const detail=document.createElement('button');
    detail.type='button';
    detail.className='btn small outline';
    detail.textContent='Ver ficha';
    detail.addEventListener('click',()=>openProduct(p));
    const quote=document.createElement('a');
    quote.className='btn small';
    quote.textContent='Cotizar';
    setWA(quote,productMessage(p));
    actions.append(detail,quote);
    const description=document.createElement('p');
    description.className='catalog-card-summary';
    description.textContent=p.description;
    content.append(tag,title,description,actions);
    card.append(media,content);
    q('#catalog-grid').append(card)
  });
  q('#catalog-empty').hidden=shown.length!==0;
  q('#catalog-status').textContent=shown.length+' resultados de referencia.'
}`;

html = html.replace(renderCatalogRegex, newRenderCatalog);

// 7. Enlazar assets/enterprise-2026.js al final del body
if (!html.includes('enterprise-2026.js')) {
  html = html.replace('</body></html>', '<script src="assets/enterprise-2026.js"></script>\n</body></html>');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html actualizado exitosamente con la arquitectura Enterprise 2026.');
