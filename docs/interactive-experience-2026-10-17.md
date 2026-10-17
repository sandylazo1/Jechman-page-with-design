# JECHMAN Interactive Experience 2.0

La ampliación mantiene `index.html`, `glassindex.html` y las vistas históricas. `glassindex-original.html` permanece intacto. Las páginas nuevas se declaran en `assets/experience.js` y utilizan rutas hash bajo GitHub Pages. No se añadió React ni un sistema de compilación: las transiciones de titulares, revelados al desplazarse, focos de tarjetas y escenas conceptuales se implementaron con CSS y JavaScript nativo, inspiradas en patrones de [React Bits](https://www.reactbits.dev/).

## Experiencias incorporadas

- 44 destinos jerárquicos con portada, enlace de regreso, navegación contextual, galería cuando hay más de una imagen adecuada y cotización. Incluyen modelos rectangulares y romanos, tinajas, jacuzzis, instalación, filtración, iluminación, electricidad, domótica, inmótica, eficiencia energética, ferretería y categorías del catálogo.
- Configuradores escalonados para piscina, tinaja, jacuzzi, proyectos eléctricos, hogar y edificio inteligente. El resumen y el enlace de WhatsApp cambian con las opciones. Los 15 modelos de piscina se leen del arreglo existente; las medidas no se alteraron. Las páginas de modelos permiten comparar dos medidas en una tabla.
- La tinaja usa capacidades y materiales publicados por JECHMAN. El color específico del revestimiento queda por confirmar porque la ficha oficial no enumera colores de tinaja. Las alternativas especiales, bomba de calor y proyectos inteligentes se presentan como consultas sujetas a validación.
- La simulación de hogar y edificio es conceptual; no representa equipos conectados. El cálculo energético usa `W × cantidad × horas ÷ 1000` y muestra kWh teóricos, sin importes ni ahorros prometidos.
- Cada producto del catálogo existente tiene URL propia y una ficha de consulta con cantidad, uso y necesidad de instalación. Las fichas rápidas anteriores siguen disponibles.
- «Mi proyecto» reúne hasta 12 solicitudes, permite modificar detalles o quitar elementos y prepara un único mensaje para `wa.me/56962306924`. La selección se guarda únicamente en `sessionStorage` durante la sesión de la pestaña. No se almacenan datos de contacto ni se envían mensajes automáticamente.

## Estado comercial

Las fichas oficiales de [piscinas](https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/), [tinajas](https://www.jechman.cl/fabricacion-e-instalacion-de-tinajas-de-madera-recubiertas-en-fibra-de-vidrio/) y [jacuzzis](https://www.jechman.cl/fabricacion-e-instalacion-de-jacuzzi-de-fibra-de-vidrio/) respaldan modelos, materiales y opciones citadas. Las páginas de domótica, inmótica, monitoreo y otros servicios nuevos muestran explícitamente que son propuestas por confirmar con JECHMAN. Las decisiones eléctricas, capacidades y compatibilidades requieren revisión técnica.

No se muestra precio, descuento, stock ni pago en estas experiencias. Las imágenes reutilizadas están documentadas en `assets/image-sources.json`; las muestras de acabado son conceptuales y no se presentan como fotografías exactas de una variante.

## Verificaciones

Se probaron 44 subsecciones en Microsoft Edge y ocho anchos de 320 a 1920 px, sin desplazamiento horizontal. También se verificaron rutas directas, configurador de piscina y tinaja, lista multiproducto, edición y persistencia durante la sesión, ficha de producto, escenas conceptuales, cálculo de kWh, mensajes a WhatsApp y movimiento reducido. Las pruebas anteriores de catálogo, búsqueda, calculadora y carruseles pasaron. Axe-core no detectó infracciones WCAG 2.1 A/AA en las nueve vistas originales ni en ocho vistas interactivas representativas.

Pendiente: prueba directa en Safari de iPhone, medición real de Lighthouse/Core Web Vitals y validación interna de las ofertas marcadas como propuestas. No se inventaron imágenes para cada variante; las galerías con material insuficiente se mantienen simples.
