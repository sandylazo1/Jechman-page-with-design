/* Keep hash routes on the WordPress page while assets load from this plugin. */
(() => {
  'use strict';
  const pageUrl = location.origin + location.pathname + location.search;
  const repairLinks = () => {
    document.querySelectorAll('a[href^="#/"], a[href="#contenido"]').forEach(link => {
      const fragment = link.getAttribute('href');
      link.setAttribute('href', pageUrl + fragment);
    });
  };
  repairLinks();
  new MutationObserver(repairLinks).observe(document.documentElement, {childList:true,subtree:true,attributes:true,attributeFilter:['href']});
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    const fragment = link?.getAttribute('href');
    if (fragment?.startsWith('#/')) {
      event.preventDefault();
      location.hash = fragment;
      repairLinks();
    }
  }, true);
})();
