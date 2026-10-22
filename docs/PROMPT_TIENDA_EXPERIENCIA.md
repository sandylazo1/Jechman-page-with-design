# Prompt ejecutado — JECHMAN: inspiración y tienda

Mejora el sitio estático existente en `feature/jechman-glassmorphism-news`. Conserva rutas, formularios, configuradores, logo, imágenes con procedencia documentada, las paletas celeste/amarillo/morado y la cotización sin precios. Publica en la rama de GitHub Pages y deja el PR #4 abierto hacia `main`.

1. Convierte «Inspiración visual» en una secuencia útil: cada imagen comunica un resultado para la persona (descanso, convivencia, comodidad, continuidad del proyecto) y ofrece una acción relevante para explorar o cotizar. Mantén control por teclado, movimiento reducido y fuentes de imágenes.
2. Diseña la tienda con identidad morada, navegación por necesidades, una vista destacada que cambia imagen y mensaje al elegir categoría, y una ruta clara de cada producto a su ficha y cotización. La búsqueda y los filtros existentes deben seguir funcionando. No incluyas precios ni afirmaciones de stock, descuentos, entrega garantizada o proyectos realizados no verificados.
3. Usa microinteracciones ligeras inspiradas en patrones de exploración de colecciones; no copies código, imágenes, marcas ni textos de otros sitios. Garantiza un modo táctil y estático sin hover y desactiva transformaciones con `prefers-reduced-motion`.
4. Revisa Spline como opción futura de 3D con una escena JECHMAN propia y exportada, carga diferida, imagen de respaldo y límite de peso. No incrustes escenas de terceros. Para este cambio, usa profundidad CSS ligera sin dependencia externa.
5. Valida móvil, escritorio, rutas, filtros, imágenes, ausencia de desbordamiento, accesibilidad y flujos de cotización. Comprueba la publicación real.

## Referencias de patrones

- Perfect Pool: navegación por familias, búsqueda, filtros y exploración visual: https://perfectpool.cl/
- Componentry: patrones de colecciones y transiciones, sujetos a revisión de licencia antes de reutilizar código: https://componentry.dev/docs
- Manus: interfaz de entrada simple y elección de tarea: https://manus.im/
- Spline Viewer: exportación, carga diferida y optimización de escenas: https://docs.spline.design/exporting-your-scene/web/exporting-as-spline-viewer y https://docs.spline.design/exporting-your-scene/how-to-optimize-your-scene
