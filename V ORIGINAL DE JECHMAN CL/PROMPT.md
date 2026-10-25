# Prompt ejecutado: preservar la versión original de JECHMAN

Actúa como archivista web e ingeniero de migración. Antes de sustituir el sitio WordPress de `https://www.jechman.cl`, preserva una copia fechada de todo el contenido **público** que se pueda recuperar sin modificar el sitio: páginas, proyectos, productos, categorías, medios, sitemaps y HTML visible. Guarda el resultado en la rama `archive/v-original-jechman-cl`, dentro de la carpeta `V ORIGINAL DE JECHMAN CL`. Esta rama no debe alterar `main` ni la publicación de GitHub Pages.

Documenta el origen de cada archivo, la fecha de captura, los recuentos, los errores y las limitaciones. Incluye un inventario y comprobaciones de integridad. No publiques usuarios, pedidos, formularios, credenciales, exportaciones SQL ni respaldos completos de WordPress en el repositorio público. Una migración real requiere, además, un respaldo privado de base de datos y `wp-content` del hosting o un exportador de WordPress.

No escribas en `www.jechman.cl`, no instales plugins, no cambies su configuración y no lances la nueva versión en WordPress durante este respaldo.
