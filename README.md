# JECHMAN · Portal de cotizaciones

Sitio HTML de JECHMAN para orientar consultas sobre piscinas y bienestar, electricidad e ingeniería, y comercializadora. La tienda funciona como catálogo de cotización: no muestra precios, stock ni compra en línea.

- `index.html`: entrada de GitHub Pages con las vistas completas del portal.
- `glassindex.html`: redirige el enlace histórico a la única entrada activa, conservando la subsección solicitada.
- `glassindex-original.html`: copia intacta del archivo original recibido.
- `instrucciones-hernan.txt`: texto de referencia entregado por Sandy con las indicaciones para el sitio.
- `news.json`: selección editorial de soluciones verificadas, con enlace directo a la fuente.
- `assets/experience.js` y `assets/experience.css`: subsecciones por hash, configuradores visuales y lista de cotización compartida sin framework.

Para revisar el sitio completo localmente, inicia un servidor estático en la raíz del repositorio (por ejemplo, `python -m http.server 8000`) y abre `http://localhost:8000/`. El carrusel carga `news.json` mediante HTTP. Todas las rutas de recursos son relativas para funcionar bajo `/Jechman-page-with-design/` en GitHub Pages. El sitio combina fotografías proporcionadas por Sandy y JECHMAN con imágenes editoriales de referencia; las consultas se preparan para WhatsApp y requieren que el visitante presione Enviar allí.

El ícono de WhatsApp del botón flotante proviene de [Bootstrap Icons](https://icons.getbootstrap.com/icons/whatsapp/) (licencia MIT).

## Imágenes del catálogo

`assets/catalog/` contiene imágenes ilustrativas de referencia para las 18 fichas de Tienda. Diez fotografías fueron generadas con IA para esta versión (piscina romana, tinaja, jacuzzi, bomba y filtro, foco de piscina, tablero eléctrico, bomba de calor, iluminación general, tuberías y fittings, herramientas). La foto de piscina rectangular proviene del material ilustrativo que ya estaba integrado en el HTML original. Estas imágenes no acreditan productos específicos ni obras realizadas por JECHMAN. Las imágenes PNG del catálogo se convirtieron a WebP para reducir el peso de carga, manteniendo el material original en el historial de Git.

Prompts de generación: fotografía comercial horizontal, realista y de alta resolución para cada familia indicada; producto o solución claramente visible, luz profesional, sin personas, marcas, texto ni marcas de agua. Se generaron como referencias visuales, sujetas a confirmación con JECHMAN.

La portada y las subpáginas usan imágenes de referencia con licencia documentada y, en contenidos de piscinas y tinajas, fotografías publicadas por JECHMAN o entregadas por Sandy. Sus orígenes y notas de autoría están en `assets/image-sources.json`. En las fichas de piscinas, la foto se muestra sin el panel de medidas del JPEG original y las dimensiones figuran como texto accesible. No se presentan imágenes de distintas páginas como una secuencia de antes y después del mismo proyecto. Las imágenes restantes del catálogo siguen siendo ilustrativas.

La tipografía usa Libre Baskerville para titulares y Manrope para texto y controles, con archivos locales y licencias SIL Open Font License en `assets/fonts/`. La portada organiza las tres divisiones corporativas y el catálogo conserva la solicitud de cotización sin pagos en línea.

El logotipo de cabecera y pie utiliza `assets/jechman-logo-official.jpeg`, proporcionado por Sandy. Se muestra con un recorte visual de los márgenes vacíos del archivo original, sin modificar la marca.

## Experiencia interactiva

Las rutas nuevas, sus estados de verificación comercial y los resultados de prueba se describen en [docs/interactive-experience-2026-10-17.md](docs/interactive-experience-2026-10-17.md). «Mi proyecto» guarda solo selecciones de productos y servicios en la sesión de la pestaña y reúne su solicitud para WhatsApp. Las opciones pendientes de validación aparecen identificadas como propuestas.

La revisión editorial y las pruebas de edición de configuraciones se documentan en [docs/editorial-audit-2026-10-17.md](docs/editorial-audit-2026-10-17.md).

## Fuentes de Novedades

Las fichas de `news.json` son una selección de productos, servicios e ideas para consultar. Cada ficha indica su estado editorial y lleva a una ruta del portal; no se presentan como noticias recientes verificadas. Las imágenes y sus fuentes se documentan en `assets/image-sources.json` y `docs/IMAGE_ASSETS.md`.

## Publicación

GitHub Pages sirve la raíz de `main` en `https://sandylazo1.github.io/Jechman-page-with-design/`. `index.html` es la única entrada activa; los estilos y comportamientos viven en `assets/` y las subsecciones usan rutas hash (`#/piscinas`, `#/electricidad`, etc.). `glassindex.html` conserva el enlace anterior mediante redirección. El sitio oficial `www.jechman.cl` es únicamente una fuente de consulta.

Las entregas se identifican con etiquetas Git: `v1.0.0` es la primera versión unificada en `main`; `v1.1.0` añade fotografías y amplía Sofía; `v1.2.1` restaura esa dirección visual y precisa la presentación de JECHMAN. El historial está en [CHANGELOG.md](CHANGELOG.md).
