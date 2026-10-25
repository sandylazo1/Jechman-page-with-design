/* Catalog-first storefront. Source and license records stay in docs, outside the customer UI. */
(() => {
  const poolDiscoveryPhotos = {
    'rectangulares':'assets/jechman-products/piscina-rectangular.png',
    'romanas':'assets/jechman-products/piscina-romana.png',
    'con-jacuzzi':'assets/jechman-products/jacuzzi-fibra.jpg',
    'configurar':'assets/photography/home-pool-19084144.jpg',
    'filtracion':'assets/jechman-products/filtro-vulcano-vc50.jpg',
    'climatizacion':'assets/catalog/bomba-calor.webp',
    'iluminacion':'assets/jechman-products/foco-piscina.png',
    'mantencion':'assets/photography/pool-cleaner-6436202.jpg',
    'accesorios':'assets/photography/solar-install.jpg',
    'spa':'assets/areas/jacuzzis.webp',
    'sauna':'assets/photography/sauna-nordic-31092892.jpg'
  };
  document.querySelectorAll('.xp-discovery--piscinas .xp-discovery-card').forEach(card => {
    const route = card.getAttribute('href')?.split('/').pop();
    const image = card.querySelector('img');
    if (poolDiscoveryPhotos[route] && image) {
      image.src = poolDiscoveryPhotos[route];
      image.removeAttribute('srcset');
      image.alt = card.querySelector('.xp-discovery-info>span')?.textContent || '';
    }
  });
  const commercialPhotos = {
    herramientas:'assets/photography/power-tools-6154662.jpg',
    hidraulica:'assets/photography/pvc-pipes-29301874.jpg',
    electricidad:'assets/photography/electrical-breakers-38171184.jpg',
    iluminacion:'assets/photography/led-strips-6444242.jpg',
    ferreteria:'assets/photography/warehouse-24862481.jpg',
    tuberias:'assets/photography/pipework-29274530.jpg',
    fittings:'assets/photography/plumbing-fittings-28178448.jpg',
    bombas:'assets/jechman-products/bomba-emaux-ss050.jpg',
    construccion:'assets/photography/materials-10261153.jpg',
    automatizacion:'assets/photography/work-automation.jpg',
    bienestar:'assets/jechman-products/jacuzzi-jechman.jpg'
  };
  document.querySelectorAll('.xp-discovery--comercial .xp-discovery-card').forEach(card => {
    const route = card.getAttribute('href')?.split('/').pop();
    const image = card.querySelector('img');
    if (commercialPhotos[route] && image) { image.src=commercialPhotos[route]; image.removeAttribute('srcset'); image.alt=card.querySelector('.xp-discovery-info>span')?.textContent || ''; }
  });

  const store = document.querySelector('.view[data-view="tienda"]');
  const grid = store?.querySelector('#catalog-grid');
  const catalog = grid?.closest('section');
  if (!catalog) return;

  catalog.classList.add('market-catalog');
  catalog.id = 'catalogo';
  store.querySelector('.page-hero')?.remove();
  store.querySelector('.enh-shop-intro')?.remove();
  store.querySelector('.xp-discovery--tienda')?.remove();
  const wrap = catalog.querySelector('.wrap');
  const header = document.createElement('div');
  header.className = 'market-catalog-header';
  header.innerHTML = '<p class="market-kicker">Productos y soluciones · cotización personalizada</p><div class="market-catalog-title"><div><h1>Catálogo JECHMAN</h1><p>Piscinas, bienestar, electricidad y construcción. Elige lo que necesitas y cotiza directamente con nuestro equipo.</p></div><a class="market-header-cta" href="#/contacto?area=Tienda">Cuéntanos tu proyecto <span aria-hidden="true">↗</span></a></div><p class="market-shipping">Enviamos a todo Chile. Cobertura, plazo y costo de despacho se confirman al cotizar.</p>';
  wrap.prepend(header);

  const first = () => { if (store.firstElementChild !== catalog) store.prepend(catalog); };
  first();
  const observer = new MutationObserver(first);
  observer.observe(store, {childList:true});
})();
