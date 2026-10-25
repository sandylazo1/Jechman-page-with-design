# V ORIGINAL DE JECHMAN CL

Archivo público, previo a la migración, de `https://www.jechman.cl/`. Se mantiene en la rama `archive/v-original-jechman-cl`; `main` y GitHub Pages siguen sirviendo la versión de diseño sin cambios.

## Contenido

- `public-api/`: respuestas públicas de WordPress y WooCommerce, incluidas páginas, proyectos, productos, taxonomías y metadatos de medios.
- `html/`: capturas HTML de las URL públicas incluidas en los sitemaps, con un índice URL → archivo.
- `media/`: originales de los archivos publicados en la biblioteca de medios, cuando son descargables.
- `frontend-assets/`: hojas de estilo, scripts, fuentes y otros recursos públicos enlazados por el HTML guardado.
- `sitemaps/`: índices y sitemaps originales, sin el mapa de usuarios.
- `manifest.json`: recuentos, fecha, errores y SHA-256 de cada archivo capturado.
- `archive_public.py`: proceso reproducible para actualizar la captura.
- `ABRIR_ARCHIVO.html`: índice local para buscar páginas, proyectos y productos; se genera con `build_index.py`.
- `verify_archive.py`: comprueba tamaños, recuentos y SHA-256 de todos los archivos indexados.

## Estado de la captura pública

La captura del 24 de octubre de 2026 contiene 10 páginas, 9 proyectos, 730 productos, 90 categorías de producto, 845 URL HTML públicas, 723 medios descargados y 199 recursos de interfaz. WordPress anunció 727 medios, pero su API pública entregó 723 tras recorrer todas las páginas; la diferencia está registrada en `manifest.json`.

## Límites de este respaldo

Esto **no es** una copia instalable de WordPress. La API pública no proporciona la base SQL, datos de Elementor, formularios privados, pedidos, ajustes del tema, plugins ni archivos PHP. El HTML guardado puede depender de recursos externos y no sustituye un hosting WordPress.

Para una restauración completa, conserva **fuera de este repositorio público** un respaldo privado del hosting con base de datos y `wp-content` (tema, plugins y uploads), o al menos un XML de **Herramientas → Exportar → Todo el contenido** junto con la biblioteca de medios. Verifica el respaldo en una instalación de prueba antes de cambiar el dominio. No subas a GitHub datos de clientes, pedidos, correos privados o credenciales.

La captura es de solo lectura: no se modificó `www.jechman.cl`.
