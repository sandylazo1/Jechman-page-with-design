# Validación de la vista previa

Capturas del 14 de octubre de 2026:

- [Inicio, escritorio](preview-desktop.png)
- [Inicio, móvil](preview-mobile.png)
- [Piscinas, móvil](preview-piscinas-mobile.png)

Se comprobó en Microsoft Edge a 320, 375, 390, 430, 768, 1024 y 1440 px: cero desbordamientos horizontales, cero imágenes rotas en Inicio y cero errores de consola. Se recorrieron las vistas Piscinas, Tinajas, Jacuzzis, Electricidad, Comercial, Tienda, Contacto y Privacidad. La búsqueda, estado vacío, filtros de Iluminación y Tinajas, ficha de producto, mensaje de WhatsApp, calculadora orientativa y controles del carrusel funcionaron. También se verificó la carga bajo `/Jechman-page-with-design/` y la asignación de colores: celeste para Piscinas y bienestar, amarillo para Electricidad y morado para Comercial.

Una revisión automática de accesibilidad WCAG 2.1 A/AA con axe-core no detectó infracciones en Inicio y las ocho vistas internas. La preferencia de movimiento reducido desactiva las animaciones adicionales.

Se descargó WebKit de Playwright junto con `icuin77.dll` y `libpng16.dll`; ambos archivos están presentes. El ejecutable no inicia porque Windows Smart App Control bloquea la carga de `icuin77.dll` por su política de firma (evento Code Integrity 3077, error 4551). Por tanto, falta una prueba directa en Safari de iPhone antes de publicar. Esta limitación requiere un entorno donde WebKit esté permitido o un iPhone real; no se cambió la configuración de seguridad del equipo.

## Mejora continua · 14 de octubre de 2026

La rama `feature/jechman-glassmorphism-news` se actualizó desde `main` y recibió ciclos separados de fotografía oficial, proceso de instalación, cotización, tipografía, WhatsApp, tinajas, pie de página y portada. `main` no recibió estas mejoras.

- Edge a 390 y 1440 px: home, piscinas, tinajas, catálogo, formulario y pie revisados visualmente.
- 320, 390, 768 y 1024 px: WhatsApp fijo a la derecha, aviso de privacidad sin solapamiento y sin desbordamiento horizontal.
- Búsqueda, filtros, ficha, WhatsApp, calculadora y carruseles: `check-flows.js` pasó.
- Rutas con el prefijo de GitHub Pages: `check-pages-path.js` pasó.
- Axe-core: cero hallazgos en Inicio y ocho vistas internas.
- Auditoría de recursos: 21 referencias sin archivos faltantes; `index.html` y `glassindex.html` idénticos.

La prueba directa en Safari de iPhone sigue pendiente por el bloqueo local de WebKit descrito arriba.
