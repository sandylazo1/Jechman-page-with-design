<?php
defined('ABSPATH') || exit;

$plugin_dir = plugin_dir_path(__FILE__);
$portal_file = $plugin_dir . 'site/index.html';

if (!is_readable($portal_file)) {
    status_header(503);
    echo 'El paquete JECHMAN está incompleto: falta site/index.html.';
    return;
}

$portal = file_get_contents($portal_file);
if ($portal === false) {
    status_header(503);
    echo 'No se pudo abrir la página JECHMAN.';
    return;
}

// Si la carpeta assets existe localmente en el plugin, usarla; si no, usar el CDN de GitHub Pages
if (is_dir($plugin_dir . 'site/assets')) {
    $base_url = trailingslashit(plugins_url('site', __FILE__));
} else {
    $base_url = 'https://sandylazo1.github.io/Jechman-page-with-design/';
}

$bridge_url = plugins_url('route-bridge.js', __FILE__);
$portal = preg_replace('~<head>~i', '<head><base href="' . esc_url($base_url) . '">', $portal, 1);
$portal = str_replace('</body>', '<script src="' . esc_url($bridge_url) . '"></script></body>', $portal);

header('Content-Type: text/html; charset=UTF-8');
echo $portal;
