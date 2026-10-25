# Publicar JECHMAN como página de WordPress

El archivo ZIP generado por `scripts/build-wordpress-package.ps1` es un complemento instalable. Contiene una copia del sitio estático y una plantilla de página completa. No cambia la portada ni borra contenido al activarse.

1. En WordPress, abre **Plugins → Añadir nuevo → Subir plugin**, elige `JECHMAN-WordPress-portal.zip` y actívalo.
2. Crea una página nueva llamada, por ejemplo, **JECHMAN prueba**. En los ajustes de la página, selecciona la plantilla **Portal JECHMAN (pantalla completa)**. Guarda y revisa la vista previa en escritorio y móvil.
3. Comprueba menú, catálogo, imágenes, configuradores y enlaces de cotización. Cuando estés conforme, cambia la portada en **Ajustes → Lectura** a esa página. Conserva la portada antigua publicada como página independiente para revertir el cambio si hace falta.

La plantilla reproduce el portal completo en una página de WordPress y guarda sus recursos dentro del complemento. No sustituye las fichas de WooCommerce ni convierte el contenido a bloques de Elementor. La base de datos, pedidos y páginas antiguas permanecen en WordPress. El enlace de la página puede cambiar; las rutas internas usan el fragmento `#/...`.

Si WordPress rechaza el ZIP por límite de tamaño, el archivo puede subirse por SFTP al directorio `wp-content/plugins/` y activarse desde el panel. No se debe descomprimir en el editor de páginas.
