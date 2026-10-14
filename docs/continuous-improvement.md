# Mejora continua de JECHMAN

Trabajo en `feature/jechman-glassmorphism-news`. La web oficial se usa solo como fuente pública de información. Esta rama no se fusiona automáticamente a `main`.

## Auditoría priorizada · 2026-10-14

| Prioridad | Problema observado | Cambio propuesto | Estado | Resultado |
| --- | --- | --- | --- | --- |
| P1 · Confianza | La home repetía las tres divisiones en dos bloques de tarjetas y dependía de fotos ilustrativas. | Sustituir el bloque repetido por una historia de instalación con foto publicada por JECHMAN. | Hecho | Foto oficial y proceso visibles; Edge móvil/escritorio y axe sin errores |
| P1 · Claridad | El proceso de piscinas y los más de diez años de experiencia quedaban lejos de las primeras pantallas. | Explicar evaluación, preparación e instalación con alcance sujeto a cotización. | Hecho | Foto oficial y proceso visibles; Edge móvil/escritorio y axe sin errores |
| P2 · Confianza local | El pie mostraba solo la comuna, aunque el sitio oficial publica dirección y horario. | Mostrar los datos verificados en el pie. | Hecho | Foto oficial y proceso visibles; Edge móvil/escritorio y axe sin errores |
| P3 · Cotización | El formulario saltaba a WhatsApp sin adaptar la solicitud al área elegida. | Agregar preguntas opcionales por área y mantener el mensaje editable. | Hecho | Datos opcionales verificados en enlaces de WhatsApp; no se guardan ni envían antes del usuario |
| P4 · Mobile | El botón de WhatsApp puede coincidir con el aviso de privacidad y controles bajos. | Medir solapamientos en tamaños móviles y ajustar posición. | Pendiente | — |
| P6 · Jerarquía visual | Las 18 fichas de tienda aplicaban desenfoque de fondo y serif editorial a títulos técnicos. | Dejar fichas opacas y títulos de producto en sans; conservar la serif para titulares grandes. | Hecho | 18 fichas sin backdrop-filter y títulos sans comprobados en Edge |

## Fuentes verificadas

- [Inicio oficial de JECHMAN](https://www.jechman.cl/): experiencia, teléfono y áreas de servicio.
- [Piscinas en JECHMAN](https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/): proceso de instalación y fotografías publicadas.
- [Contacto oficial](https://www.jechman.cl/nosotros/): horario y dirección.

Las fotografías de `assets/projects/` proceden de la página pública de piscinas. Su autor y licencia no aparecen allí; se identifican como imágenes publicadas por JECHMAN y no se presentan como un antes/después del mismo proyecto.

## Ciclo 2 · Piscinas y cotización

Se incorporó una segunda fotografía publicada en la web oficial antes del selector de modelos. No se afirma que las dos fotografías pertenezcan al mismo proyecto. El formulario ahora muestra detalles opcionales solo para Piscinas y Bienestar o Electricidad e Ingeniería. Validado en Edge, con JavaScript sin errores, 15 modelos conservados y axe sin hallazgos.

## Ciclo 3 · Fichas y tipografía

Se eliminó el desenfoque de las fichas estándar y se reservó la serif para titulares principales. El catálogo conserva filtros, imágenes y acciones.
