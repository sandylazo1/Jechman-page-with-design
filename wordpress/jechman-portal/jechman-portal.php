<?php
/**
 * Plugin Name: JECHMAN Portal Enterprise
 * Description: Portal oficial de alta conversión JECHMAN Ingeniería y Construcción SpA. Incluye catálogo interactivo con doble vista, módulos de ingeniería y domótica, despacho oficial a ventas@jechman.cl y cabeceras de seguridad SSL Labs A+.
 * Version: 1.5.0
 * Requires PHP: 7.4
 * Author: JECHMAN Ingeniería SpA
 * Text Domain: jechman-portal
 */

defined('ABSPATH') || exit;

add_filter('theme_page_templates', static function ($templates) {
    $templates['jechman-portal-page.php'] = 'Portal JECHMAN (pantalla completa)';
    return $templates;
});

add_filter('template_include', static function ($template) {
    if (!is_page()) {
        return $template;
    }

    $page_id = get_queried_object_id();
    if (get_page_template_slug($page_id) !== 'jechman-portal-page.php') {
        return $template;
    }

    return plugin_dir_path(__FILE__) . 'portal-template.php';
}, 99);
