/* JECHMAN commerce modules: static, local and quote-first for GitHub Pages. */
(() => {
  'use strict';
  const store = document.querySelector('.view[data-view="tienda"]');
  if (!store) return;
  const PHONE = '56962306924';
  const wa = message => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const decimal = number => new Intl.NumberFormat('es-CL', {maximumFractionDigits: 1}).format(number);
  const selected = new Map();
  let currentEstimate = '';

  const families = [
    {id:'calor',category:'Bombas de calor',name:'Climatización para piscinas',image:'assets/catalog/bomba-calor.webp',alt:'Equipo de climatización de referencia',intro:'Consulta potencia, rendimiento e integración hidráulica según tu piscina.',variants:['9 kW de referencia','13 kW de referencia','19 kW de referencia'],specs:['Potencia objetivo','COP real','Ruido / alimentación'],notes:['Según equipo confirmado','Confirmar ficha técnica','Confirmar ficha técnica']},
    {id:'manta',category:'Mantas térmicas',name:'Cobertor térmico a medida',image:'assets/catalog/manta-termica.svg',alt:'Esquema de una manta térmica sobre una piscina rectangular',intro:'La medida y el borde se revisan con tu piscina antes de fabricar o elegir.',variants:['3 × 2 m de referencia','4 × 2,5 m de referencia','A medida'],specs:['Superficie requerida','Material / espesor','Ajuste'],notes:['Según medidas finales','Confirmar opción','Confirmar instalación']},
    {id:'filtrado',category:'Bombas de filtrado',name:'Bombeo y filtración',image:'assets/catalog/bomba-filtro.webp',alt:'Bomba y filtro de piscina de referencia',intro:'El caudal y la compatibilidad dependen del volumen y de la instalación existente.',variants:['Piscina pequeña','Piscina mediana','Proyecto especial'],specs:['Caudal requerido','Filtro compatible','Alimentación'],notes:['Validación hidráulica','Validación hidráulica','Confirmar ficha técnica']},
    {id:'tablero',category:'Tableros y automatización',name:'Tablero y control eléctrico',image:'assets/catalog/tablero-electrico.webp',alt:'Tablero eléctrico de referencia',intro:'Protecciones, conductores y automatización se dimensionan para cada carga.',variants:['Control de piscina','Tablero residencial','Control industrial'],specs:['Cargas / circuitos','Protecciones','Alimentación'],notes:['Según proyecto','Según proyecto','Según proyecto']}
  ];
  const trust = {
    conductores:{title:'Conductores acordes a la instalación',solo:'La ficha del equipo indica su consumo, pero no describe el recorrido ni la instalación existente.',project:'Solicita revisar cargas, distancia, canalización y sección antes de definir materiales.'},
    protecciones:{title:'Protecciones según el circuito',solo:'Comprar un tablero no define automáticamente la protección del proyecto.',project:'Consulta interruptores, diferencial y puesta a tierra apropiados para el lugar y el equipo.'},
    seguimiento:{title:'Puesta en marcha y soporte',solo:'La garantía de un producto no sustituye la revisión de la instalación completa.',project:'Pide alcance de instalación, prueba, garantía y postventa por escrito en la cotización.'}
  };

  // Keep the existing catalog intact; the new modules sit immediately before it.
  fetch('assets/commerce-modules.html')
    .then(response => {if (!response.ok) throw Error('modules'); return response.text();})
    .then(markup => {
      const template = document.createElement('template');
      template.innerHTML = markup;
      const existingCatalog = $('.section', store);
      store.insertBefore(template.content, existingCatalog);
      existingCatalog.id = 'catalogo';
      initThermal();
      initTrust();
      initSticky();
    })
    .catch(() => { /* The original catalog remains available if the optional module cannot load. */ });

  function initThermal() {
    const scope = $('#jx-commerce');
    const controls = ['length','width','depth','zone','hours','current-temp','target-temp','cover'].map(id => $(`#jx-${id}`,scope));
    const update = () => {
      const length = Number($('#jx-length',scope).value);
      const width = Number($('#jx-width',scope).value);
      const depth = Number($('#jx-depth',scope).value);
      const current = Number($('#jx-current-temp',scope).value);
      const target = Number($('#jx-target-temp',scope).value);
      const hours = Number($('#jx-hours',scope).value);
      const covered = $('#jx-cover',scope).checked;
      ['length','width','depth'].forEach(id => { $(`#jx-${id}-value`,scope).textContent = `${decimal(Number($(`#jx-${id}`,scope).value))} m`; });
      const volume = length * width * depth;
      const delta = Math.max(0,target - current);
      const heat = volume * delta * 1.16;
      const baseKw = heat / hours;
      const scenarioKw = baseKw * (covered ? 1 : 1.45);
      const range = scenarioKw <= 9 ? 'Hasta 9 kW' : scenarioKw <= 13 ? '9–13 kW' : scenarioKw <= 19 ? '13–19 kW' : 'Más de 19 kW';
      $('#jx-volume',scope).textContent = `${decimal(volume)} m³ de agua`;
      $('#jx-power',scope).textContent = `${decimal(baseKw)} kW`;
      $('#jx-power-detail',scope).textContent = `${decimal(heat)} kWh térmicos para subir ${decimal(delta)} °C en ${hours} h, sin pérdidas reales.`;
      $('#jx-capacity',scope).textContent = range;
      $('#jx-cover-size',scope).textContent = `${decimal(length)} × ${decimal(width)} m`;
      $('#jx-electric-energy',scope).textContent = `${decimal(heat / 4)} kWh`;
      $('#jx-gas-energy',scope).textContent = `${decimal(heat / .85)} kWh`;
      $('#jx-loss',scope).textContent = covered
        ? 'Con manta: menor exposición a evaporación. El efecto real depende del uso y del clima.'
        : `Sin manta: escenario ilustrativo de +45% sobre la potencia base (${decimal(scenarioKw)} kW). No representa una pérdida nocturna medida.`;
      const zone = $('#jx-zone',scope).value;
      currentEstimate = `Piscina ${decimal(length)} × ${decimal(width)} × ${decimal(depth)} m; volumen aproximado ${decimal(volume)} m³; ${zone}; agua actual ${current} °C, objetivo ${target} °C en ${hours} h; ${covered?'con':'sin'} manta. Energía térmica teórica ${decimal(heat)} kWh, potencia base ${decimal(baseKw)} kW. Rango a revisar: ${range}; manta a medida ${decimal(length)} × ${decimal(width)} m. Consumo teórico comparativo: bomba COP supuesto 4, ${decimal(heat / 4)} kWh eléctricos; gas eficiencia supuesta 85%, ${decimal(heat / .85)} kWh de combustible. ${covered?'':'Se mostró un escenario adicional ilustrativo de +45%, no una pérdida medida.'}`;
      $('#jx-pack-quote',scope).href = wa(`Hola JECHMAN. Quisiera cotizar climatización con cobertor y evaluar la instalación eléctrica.\n${currentEstimate}\nPor favor confirmen equipo compatible, especificaciones, disponibilidad, alcance de instalación y cotización.`);
      const bar = $('#jx-sticky-summary');
      if (bar) bar.textContent = `Piscina ${decimal(volume)} m³ · ${range} a revisar`;
      refreshQuotes();
    };
    controls.forEach(control => control.addEventListener(control.type === 'range' ? 'input' : 'change',update));
    update();
  }

  function productMessage(family,variant,intent) {
    return `Hola JECHMAN. ${intent === 'compra'?'Quisiera comprar, sujeto a confirmar disponibilidad y cotización':'Quisiera cotizar'}: ${family.name}.\nOpción solicitada: ${variant}.\n${family.intro}\n${currentEstimate ? `Contexto de mi piscina: ${currentEstimate}\n` : ''}Por favor confirmen modelo, ficha técnica, instalación si corresponde y condiciones comerciales.`;
  }
  function refreshQuotes() {
    $$('.jx-product-card').forEach(card => {
      const family = families.find(item => item.id === card.dataset.jxFamily);
      if (!family) return;
      const variant = $('select',card).value;
      $('.jx-button-amber',card).href = wa(productMessage(family,variant,'compra'));
      $('.jx-button-outline',card).href = wa(productMessage(family,variant,'cotizar'));
    });
    const activeTrust = $('[data-jx-trust][aria-pressed="true"]');
    if (activeTrust) {
      const item = trust[activeTrust.dataset.jxTrust];
      $('#jx-trust-quote').href = wa(`Hola JECHMAN. Quisiera revisar mi proyecto de climatización o electricidad. Me interesa evaluar: ${item.title.toLowerCase()}.\n${currentEstimate ? `Datos orientativos de mi piscina: ${currentEstimate}\n` : ''}¿Podemos confirmar el alcance técnico, instalación y cotización?`);
    }
    updateBar();
  }
  function initProducts() {
    const scope = $('#jx-commerce');
    const tabs = $('#jx-tabs',scope);
    const grid = $('#jx-product-grid',scope);
    const filters = ['Todas las soluciones',...families.map(family => family.category)];
    let active = filters[0];
    const renderTabs = () => {
      tabs.replaceChildren();
      filters.forEach(label => {
        const button = document.createElement('button');
        button.type = 'button'; button.textContent = label;
        button.setAttribute('aria-pressed',String(active === label));
        button.addEventListener('click',() => {active = label; renderTabs(); renderCards();});
        tabs.append(button);
      });
    };
    const renderCards = () => {
      grid.replaceChildren();
      const visible = families.filter(family => active === filters[0] || family.category === active);
      visible.forEach(family => {
        const card = document.createElement('article');
        card.className = 'jx-product-card';
        card.dataset.jxFamily = family.id;
        card.innerHTML = `<div class="jx-product-media"><img src="${family.image}" alt="${family.alt}" loading="lazy" width="800" height="500"><span>Disponibilidad por confirmar</span></div><div class="jx-product-body"><p class="jx-product-category">${family.category}</p><h3>${family.name}</h3><p>${family.intro}</p><label>Elige lo que necesitas<select></select></label><div class="jx-product-state"><span>Solicitud personalizada</span><strong>Precio al cotizar</strong></div><details><summary>Datos técnicos a confirmar</summary><dl></dl></details><div class="jx-product-actions"><a class="jx-button jx-button-amber" target="_blank" rel="noopener noreferrer">Solicitar compra ↗</a><a class="jx-button jx-button-outline" target="_blank" rel="noopener noreferrer">Cotizar con asesor ↗</a></div><button type="button" class="jx-add">Agregar al resumen</button></div>`;
        const select = $('select',card);
        family.variants.forEach(variant => select.add(new Option(variant,variant)));
        const specList = $('dl',card);
        const buy = $('.jx-button-amber',card);
        const quote = $('.jx-button-outline',card);
        const add = $('.jx-add',card);
        const sync = () => {
          const variant = select.value;
          specList.replaceChildren();
          family.specs.forEach((label,index) => {
            const dt = document.createElement('dt'); dt.textContent = label;
            const dd = document.createElement('dd'); dd.textContent = index === 0 ? variant : family.notes[index];
            specList.append(dt,dd);
          });
          buy.href = wa(productMessage(family,variant,'compra'));
          quote.href = wa(productMessage(family,variant,'cotizar'));
          if (selected.has(family.id)) { selected.set(family.id,{name:family.name,variant}); updateBar(); }
          add.textContent = selected.has(family.id) ? 'Quitar del resumen' : 'Agregar al resumen';
          add.setAttribute('aria-pressed',String(selected.has(family.id)));
        };
        select.addEventListener('change',sync);
        add.addEventListener('click',() => {
          if (selected.has(family.id)) selected.delete(family.id);
          else selected.set(family.id,{name:family.name,variant:select.value});
          sync(); updateBar();
        });
        sync(); grid.append(card);
      });
      $('#jx-filter-status',scope).textContent = `${visible.length} ${visible.length === 1?'solución':'soluciones'} para explorar.`;
    };
    renderTabs(); renderCards();
  }

  function initTrust() {
    const scope = $('#jx-commerce');
    const detail = $('#jx-trust-detail',scope);
    const show = key => {
      const item = trust[key];
      detail.replaceChildren();
      const heading = document.createElement('h3'); heading.textContent = item.title;
      const table = document.createElement('table');
      table.innerHTML = '<thead><tr><th scope="col">Solo producto</th><th scope="col">Con evaluación del proyecto</th></tr></thead><tbody><tr><td></td><td></td></tr></tbody>';
      const cells = $$('td',table);
      cells[0].textContent = item.solo;
      cells[1].textContent = item.project;
      detail.append(heading,table);
      $$('[data-jx-trust]',scope).forEach(button => {
        const active = button.dataset.jxTrust === key;
        button.classList.toggle('is-active',active);
        button.setAttribute('aria-pressed',String(active));
      });
      $('#jx-trust-quote',scope).href = wa(`Hola JECHMAN. Quisiera revisar mi proyecto de climatización o electricidad. Me interesa evaluar: ${item.title.toLowerCase()}.\n${currentEstimate ? `Datos orientativos de mi piscina: ${currentEstimate}\n` : ''}¿Podemos confirmar el alcance técnico, instalación y cotización?`);
    };
    $$('[data-jx-trust]',scope).forEach(button => button.addEventListener('click',() => show(button.dataset.jxTrust)));
    show('conductores');
  }

  function updateBar() {
    const count = $('#jx-sticky-count');
    const link = $('#jx-sticky-quote');
    if (!count || !link) return;
    count.textContent = selected.size ? `${selected.size} ${selected.size === 1?'solución':'soluciones'} seleccionadas` : 'Cotización personalizada';
    const items = [...selected.values()].map(item => `- ${item.name}: ${item.variant}`).join('\n');
    link.href = wa(`Hola JECHMAN. Quisiera cotizar mi proyecto.\n${items ? `Soluciones seleccionadas:\n${items}\n` : ''}${currentEstimate ? `Datos orientativos de mi piscina: ${currentEstimate}\n` : ''}Por favor confirmen factibilidad, disponibilidad, instalación y condiciones.`);
    link.textContent = selected.size ? 'Cotizar selección por WhatsApp ↗' : 'Cotizar por WhatsApp ↗';
  }
  function initSticky() {
    const bar = document.createElement('aside');
    bar.className = 'jx-sticky'; bar.id = 'jx-sticky'; bar.hidden = true;
    bar.setAttribute('aria-label','Acceso rápido a cotización');
    bar.innerHTML = '<div class="wrap jx-sticky-inner"><div><strong id="jx-sticky-count">Cotización personalizada</strong><span id="jx-sticky-summary">Climatización e instalación a evaluar</span></div><a id="jx-sticky-quote" target="_blank" rel="noopener noreferrer" href="#">Cotizar por WhatsApp ↗</a></div>';
    document.body.append(bar);
    const sync = () => {
      const onStore = (location.hash || '#/').startsWith('#/tienda');
      const cookie = document.getElementById('cookie-banner');
      const visible = onStore && scrollY > 300 && (innerWidth > 680 || !cookie || cookie.hidden);
      bar.hidden = !visible;
      document.body.classList.toggle('jx-bar-visible',visible);
    };
    window.addEventListener('scroll',sync,{passive:true});
    window.addEventListener('resize',sync);
    const cookie = document.getElementById('cookie-banner');
    if (cookie) new MutationObserver(sync).observe(cookie,{attributes:true,attributeFilter:['hidden']});
    window.addEventListener('hashchange',() => requestAnimationFrame(sync));
    updateBar(); sync();
  }
})();
