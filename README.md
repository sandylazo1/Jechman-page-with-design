# JECHMAN · Portal de cotizaciones

Sitio HTML de JECHMAN para orientar consultas sobre piscinas y bienestar, electricidad e ingeniería, y comercializadora. La tienda funciona como catálogo de cotización: no muestra precios, stock ni compra en línea.

- `index.html`: entrada de GitHub Pages con las vistas completas del portal.
- `glassindex.html`: copia de la misma experiencia para conservar el enlace histórico.
- `glassindex-original.html`: copia intacta del archivo original recibido.
- `instrucciones-hernan.txt`: texto de referencia entregado por Sandy con las indicaciones para el sitio.
- `news.json`: selección editorial de soluciones verificadas, con enlace directo a la fuente.

Para revisar el sitio completo localmente, inicia un servidor estático en la raíz del repositorio (por ejemplo, `python -m http.server 8000`) y abre `http://localhost:8000/`. El carrusel carga `news.json` mediante HTTP. Todas las rutas de recursos son relativas para funcionar bajo `/Jechman-page-with-design/` en GitHub Pages. Las imágenes son ilustrativas; las consultas se preparan para WhatsApp y requieren que el visitante presione Enviar allí.

El ícono de WhatsApp del botón flotante proviene de [Bootstrap Icons](https://icons.getbootstrap.com/icons/whatsapp/) (licencia MIT).

## Imágenes del catálogo

`assets/catalog/` contiene imágenes ilustrativas de referencia para las 18 fichas de Tienda. Diez fotografías fueron generadas con IA para esta versión (piscina romana, tinaja, jacuzzi, bomba y filtro, foco de piscina, tablero eléctrico, bomba de calor, iluminación general, tuberías y fittings, herramientas). La foto de piscina rectangular proviene del material ilustrativo que ya estaba integrado en el HTML original. Estas imágenes no acreditan productos específicos ni obras realizadas por JECHMAN. Las imágenes PNG del catálogo se convirtieron a WebP para reducir el peso de carga, manteniendo el material original en el historial de Git.

Prompts de generación: fotografía comercial horizontal, realista y de alta resolución para cada familia indicada; producto o solución claramente visible, luz profesional, sin personas, marcas, texto ni marcas de agua. Se generaron como referencias visuales, sujetas a confirmación con JECHMAN.

La portada y las subpáginas usan imágenes de referencia con licencia documentada y, en algunos contenidos de piscinas y tinajas, fotografías publicadas por JECHMAN. Sus URL de origen y notas de autoría están en `assets/image-sources.json`. No se presentan imágenes de distintas páginas como una secuencia de antes y después del mismo proyecto. Las imágenes restantes del catálogo siguen siendo ilustrativas.

La tipografía de la experiencia actual usa archivos locales de Inter y Manrope. Sus licencias SIL Open Font License se incluyen en `assets/fonts/`. La portada organiza las tres divisiones corporativas y el catálogo conserva la solicitud de cotización sin pagos en línea.

El logotipo de cabecera y pie utiliza `assets/jechman-logo-official.jpeg`, proporcionado por Sandy. Se muestra con un recorte visual de los márgenes vacíos del archivo original, sin modificar la marca.

## Fuentes de Novedades

Las cuatro fichas de `news.json` remiten a páginas del sitio oficial: [piscinas](https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/), [tinajas](https://www.jechman.cl/fabricacion-e-instalacion-de-tinajas-de-madera-recubiertas-en-fibra-de-vidrio/), [catálogo eléctrico](https://www.jechman.cl/product-category/electricidad-2/) y [jacuzzis](https://www.jechman.cl/fabricacion-e-instalacion-de-jacuzzi-de-fibra-de-vidrio/). Son páginas de producto o servicio, sin fecha reciente comprobada; el carrusel evita presentarlas como publicaciones nuevas. No se identificaron perfiles de Instagram cuya titularidad y publicaciones recientes pudieran confirmarse desde el sitio oficial, por lo que no se añadieron enlaces ni fechas de esas cuentas.

## Publicación

GitHub Pages sirve la raíz de `feature/jechman-glassmorphism-news` en `https://sandylazo1.github.io/Jechman-page-with-design/`. La rama `main` no se fusiona ni publica mediante este flujo. El sitio oficial `www.jechman.cl` es únicamente una fuente de consulta.
