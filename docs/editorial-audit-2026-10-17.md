# Auditoría editorial y funcional — 17 de octubre de 2026

## Estado inicial

- GitHub Pages publica `feature/jechman-glassmorphism-news` desde `/`; antes de esta iteración, el commit publicado en la rama era `d3102d7`. `main` contiene una versión anterior. El configurador de tinaja con vista esquemática procedía de `assets/enhancements.js`; las rutas de configuración detallada estaban en `assets/experience.js`.
- Se conservaron el sitio estático, las rutas hash, los catálogos, el logo oficial, los carruseles, la lista de modelos y todos los formularios existentes. `glassindex-original.html` no se modificó.
- Referencia comercial examinada: [Perfect Pool](https://perfectpool.cl/), especialmente navegación por familias y descubrimiento de productos relacionados. Referencia corporativa: [JECHMAN](https://www.jechman.cl/). No se copiaron imágenes ni textos de Perfect Pool.

## Cambios por fases

1. **Tipografía y composición.** Libre Baskerville local bajo OFL para titulares, Manrope para lectura y controles. Escala fluida, marfil cálido, petróleo y acentos originales por división.
2. **Configuradores.** Capacidad, madera y calefacción de tinaja ahora se eligen con controles accesibles. La fotografía mantiene su procedencia y no pretende cambiar de acabado cuando se selecciona una muestra. La galería inmediata tiene miniaturas, flechas y ampliación. El configurador anterior de Piscinas conserva su lógica de selección y cotización, pero reemplaza la escena geométrica por fotografías de referencia según el tipo de proyecto.
3. **Cotización.** «Mi proyecto» conserva una copia estructurada de cada configuración en la sesión. «Editar configuración» recupera las opciones, permite modificarlas y actualiza el mismo elemento. El nombre opcional del proyecto se añade al mensaje de WhatsApp. Los complementos relacionados se agregan solo al pulsar su botón.
4. **Descubrimiento.** Las subsecciones muestran fotografía documentada en sus accesos y recomendaciones contextuales. Las propuestas sujetas a confirmación conservan esa condición explícita.
5. **Móvil.** El configurador presenta fotografía antes de controles; «Mi proyecto» queda junto al botón flotante de WhatsApp sin cubrir el formulario.

## Verificación

- `node --check assets/experience.js` y `git diff --check`: sin errores.
- Playwright/Edge: 44 rutas en ocho anchos, sin desbordes ni errores de página.
- Playwright/Edge: recorrido completo de tinaja (selección, guardar, editar, persistencia, cotización), galería, ampliación y recomendación en 375, 390, 768, 1024, 1440 y 1920 px. Sin fallos.
- Playwright/Edge: configurador anterior con tinaja, caldera exterior e iluminación; resumen y WhatsApp mantienen esas tres selecciones después del cambio visual.
- Playwright/Edge: ocho rutas nuevas verificadas con axe; ninguna infracción automática. Los recorridos previos de piscinas, electricidad y tienda se volvieron a ejecutar.
- Capturas de esta fase: `docs/qa/editorial-tinaja-390.png`, `docs/qa/editorial-tinaja-1440.png`.

## Límites conocidos

- Las fotografías de referencia no representan cada variante seleccionada. Los servicios propuestos y la disponibilidad de productos requieren confirmación de JECHMAN.
- No se hizo una medición Lighthouse ni una prueba real en Safari/iPhone. El navegador automatizado utilizado fue Microsoft Edge en Windows.
- La auditoría de accesibilidad automática no sustituye una revisión humana con tecnologías de asistencia.
