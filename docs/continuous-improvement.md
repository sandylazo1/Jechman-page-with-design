# Mejora continua de JECHMAN

Trabajo en `feature/jechman-glassmorphism-news`. La web oficial se usa solo como fuente pública de información. Esta rama no se fusiona automáticamente a `main`.

## Auditoría priorizada · 2026-10-14

| Prioridad | Problema observado | Cambio propuesto | Estado | Resultado |
| --- | --- | --- | --- | --- |
| P1 · Confianza | La home repetía las tres divisiones en dos bloques de tarjetas y dependía de fotos ilustrativas. | Sustituir el bloque repetido por una historia de instalación con foto publicada por JECHMAN. | Hecho | Foto oficial y proceso visibles; Edge móvil/escritorio y axe sin errores |
| P1 · Claridad | El proceso de piscinas y los más de diez años de experiencia quedaban lejos de las primeras pantallas. | Explicar evaluación, preparación e instalación con alcance sujeto a cotización. | Hecho | Foto oficial y proceso visibles; Edge móvil/escritorio y axe sin errores |
| P2 · Confianza local | El pie mostraba solo la comuna, aunque el sitio oficial publica dirección y horario. | Mostrar los datos verificados en el pie. | Hecho | Foto oficial y proceso visibles; Edge móvil/escritorio y axe sin errores |
| P3 · Cotización | El formulario saltaba a WhatsApp sin adaptar la solicitud al área elegida. | Agregar preguntas opcionales por área y mantener el mensaje editable. | Hecho | Datos opcionales verificados en enlaces de WhatsApp; no se guardan ni envían antes del usuario |
| P0 · Contacto | Una regla compartida cambiaba WhatsApp de posición fija a relativa; el acceso quedaba fuera de pantalla. | Restaurar la posición fija y separar el aviso de privacidad en tablet. | Hecho | WhatsApp visible, sin solapamiento en 320, 390, 768 y 1024 px |
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

## Ciclo 4 · Acceso a WhatsApp

La comprobación de posición reveló un fallo no detectado en las revisiones visuales anteriores: el botón flotante se comportaba como elemento relativo y terminaba al final del documento. Se eliminó la regla que anulaba `position: fixed` y se separó el aviso de privacidad en tablet.

## Ciclo 5 · Tinajas

La vista de tinajas ahora coloca una fotografía publicada por JECHMAN junto al configurador, sin atribuirle una obra o ubicación concreta. Las seis capacidades y las opciones originales siguen disponibles. El mensaje de WhatsApp refleja la capacidad y opciones seleccionadas en Edge móvil y escritorio.

## Ciclo 6 · Pie de página

El pie ahora presenta el nombre JECHMAN como texto editorial en vez de colocar la foto del logotipo dentro de un recuadro blanco. El logotipo oficial proporcionado por Sandy permanece visible en la cabecera. Se conservaron dirección, horario, contacto y enlaces; comprobado a 390 y 1440 px.

## Ciclo 7 · Quiénes son

La imagen ilustrativa de «Somos JECHMAN» se sustituyó por una fotografía publicada en la galería oficial de piscinas. El texto ahora indica fabricación e instalación, ubicación y años de experiencia verificados. Se quitó una referencia a certificaciones no confirmadas. La imagen tiene dimensiones explícitas; recursos, rutas y axe sin hallazgos.

## Ciclo 8 · Primera impresión

La primera diapositiva del hero cambió la imagen ilustrativa por una foto horizontal publicada en la galería oficial de piscinas. El titular y las acciones ahora dicen fabricación, instalación, cotización y modelos. El texto de atribución del carrusel distingue la primera foto oficial de las otras imágenes ilustrativas. Validado en Edge móvil y escritorio; carrusel y recursos sin errores.
