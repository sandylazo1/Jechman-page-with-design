# Módulos de climatización y cotización

La tienda `#/tienda` carga `assets/commerce-modules.html`, `assets/commerce-2026.css` y `assets/commerce-2026.js` antes del catálogo existente. Todo funciona en el navegador, sin servidor ni dependencias externas. Si el módulo no carga, el catálogo anterior permanece disponible.

## Criterio de datos

- La instrucción final del propietario es **no mostrar CLP ni precios**. No se anuncian descuentos, cuotas, stock, entrega inmediata ni compra procesada. Los botones preparan una conversación por WhatsApp; el visitante decide si la envía.
- Los valores 9, 13 y 19 kW son **rangos de referencia para conversar**, no nombres de equipos ni modelos JECHMAN confirmados. COP, nivel de ruido, voltaje, disponibilidad, garantías y alcance de instalación se confirman en la ficha y la cotización.
- El simulador estima volumen de una piscina rectangular y la energía térmica inicial como `m³ × ΔT × 1,16 kWh/(m³·°C)`. La potencia es esa energía dividida por las horas elegidas. El resultado no dimensiona automáticamente un equipo: omite pérdidas reales, viento, temperatura del aire, flujo hidráulico y rendimiento variable.
- El 45% adicional sin manta es un **supuesto comparativo pedido por el propietario**, nunca se presenta como pérdida nocturna medida. La comparación de energía usa COP 4 y eficiencia de gas 85% solo como hipótesis explícitas; no calcula ahorro económico ni consumos mensuales.
- El panel técnico plantea qué revisar para conductores, protecciones y seguimiento; no afirma que un producto, proyecto o instalador tenga una certificación específica.

## Fuentes consultadas

- [Catálogo JECHMAN](https://www.jechman.cl/tienda/): familias de bombas, filtros, piscinas y elementos eléctricos; los datos comerciales pueden cambiar.
- [Contacto JECHMAN](https://www.jechman.cl/contacto/): número de WhatsApp `+56 9 6230 6924`.
- [Departamento de Energía de EE. UU., eficiencia de piscinas](https://betterbuildingssolutioncenter.energy.gov/sites/default/files/attachments/Pool%20efficiency__0.pdf): la evaporación es una fuente principal de pérdida y las cubiertas ayudan a reducirla. No respalda una pérdida universal del 45%.
- [SEC, normas técnicas eléctricas](https://www.sec.cl/normas-tecnicas-electricas/): materias de conductores, alimentadores y medidas de protección que requieren evaluación aplicable al proyecto.
- [Perfect Pool](https://perfectpool.cl/): referencia de categorías y recorrido de tienda, sin copiar identidad, contenido comercial ni declaraciones de disponibilidad.

## Verificación

Ejecutar `node --check assets/commerce-2026.js`, `node ../check-commerce.js`, `node ../check-flows.js` y `node ../check-accessibility.js` desde el repositorio con el servidor local iniciado en `http://127.0.0.1:8765/`. El test del módulo comprueba 320, 390 y 1440 px, cálculo, filtrado, variante, WhatsApp, barra fija, comparación, ausencia de desbordes y reglas automáticas WCAG AA.
