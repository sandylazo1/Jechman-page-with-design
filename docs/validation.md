# Validación de la vista previa

Capturas del 14 de octubre de 2026:

- [Inicio, escritorio](preview-desktop.png)
- [Inicio, móvil](preview-mobile.png)
- [Piscinas, móvil](preview-piscinas-mobile.png)

Se comprobó en Microsoft Edge a 320, 375, 390, 430, 768, 1024 y 1440 px: cero desbordamientos horizontales, cero imágenes rotas en Inicio y cero errores de consola. Se recorrieron las vistas Piscinas, Tinajas, Jacuzzis, Electricidad, Comercial, Tienda, Contacto y Privacidad. La búsqueda, estado vacío, filtros de Iluminación y Tinajas, ficha de producto, mensaje de WhatsApp, calculadora orientativa y controles del carrusel funcionaron.

Una revisión automática de accesibilidad WCAG 2.1 A/AA con axe-core no detectó infracciones en Inicio y las ocho vistas internas. La preferencia de movimiento reducido desactiva las animaciones adicionales.

Se intentó probar con WebKit de Playwright, pero el ejecutable no inició en este equipo por las bibliotecas `icuin77.dll` y `libpng16.dll` ausentes. Por tanto, falta una prueba directa en Safari de iPhone antes de publicar.
