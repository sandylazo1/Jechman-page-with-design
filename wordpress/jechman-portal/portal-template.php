<?php
defined('ABSPATH') || exit;

$portal_file = plugin_dir_path(__FILE__) . 'site/index.html';
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

$base_url = trailingslashit(plugins_url('site', __FILE__));
$bridge_url = plugins_url('route-bridge.js', __FILE__);
$portal = preg_replace('~<head>~i', '<head><base href="' . esc_url($base_url) . '">', $portal, 1);
$portal = str_replace('</body>', '<script src="' . esc_url($bridge_url) . '"></script></body>', $portal);

header('Content-Type: text/html; charset=UTF-8');
echo $portal;
