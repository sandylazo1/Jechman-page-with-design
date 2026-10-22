# Registro de imágenes editoriales

Las imágenes de `assets/editorial/` son **renders fotorrealistas creados con la herramienta integrada de generación de imágenes de Codex** para esta vista previa. Son propuestas visuales de espacios y servicios: no documentan obras, instalaciones, productos específicos ni clientes de JECHMAN. No deben presentarse como fotografías de proyectos ejecutados. Se conservan separadas de las fotografías publicadas por JECHMAN en `assets/projects/`.

Cada escena se generó sin marcas, texto ni personas y se exportó como WebP de 800 y 1600 píxeles. Se usan tamaños responsivos donde aplica. Los archivos PNG originales de generación permanecen en el directorio local de imágenes generadas de Codex; este repositorio contiene las versiones optimizadas.

| Archivo base | Escena / uso | Naturaleza |
| --- | --- | --- |
| `pool-hero` | Piscina rectangular con vivienda y jardín; portada y división | Render editorial |
| `pool-roman` | Piscina romana de borde curvo; modelos romanos | Render editorial |
| `tinaja` | Tinaja de madera en exterior | Render editorial |
| `jacuzzi` | Jacuzzi exterior integrado a terraza | Render editorial |
| `electric` | Instalación eléctrica ordenada | Render editorial |
| `domotica` | Controles de vivienda inteligente | Render editorial |
| `inmotica` | Control técnico de edificio | Render editorial |
| `commercial` | Materiales y herramientas de ferretería | Render editorial |
| `energy` | Paneles fotovoltaicos en edificio | Render editorial |
| `sauna` | Sauna de madera en espacio de bienestar | Render editorial; servicio por confirmar |

## Criterio de generación

Modo: generación integrada de imágenes, estilo `photorealistic-natural`. Prompts particulares describieron una escena arquitectónica creíble para cada categoría, composición editorial horizontal, luz natural, materiales plausibles, tono cromático de la división y ausencia de logotipos, texto, marcas de agua y personas. Ningún prompt pidió recrear un proyecto real de JECHMAN. Las imágenes técnicas solo comunican la categoría y no son planos, especificaciones ni garantías de instalación.

## Imágenes de terceros y de JECHMAN

La procedencia de los recursos anteriores permanece en [`assets/image-sources.json`](../assets/image-sources.json). Las fotografías extraídas de páginas públicas de JECHMAN se usan únicamente como referencias de la propia marca en esta vista previa; se conservan separadas de los renders. Las imágenes de Unsplash y Pexels ya incorporadas tienen sus enlaces de origen en ese registro y en el historial del proyecto. Al cambiar de recurso, comprobar su licencia y actualizar el registro.

## Fotografías de piscinas entregadas por Sandy

`assets/pools-real/` reúne ocho JPEG recibidos para esta versión. Se publican sin alterar sus píxeles. Cada archivo incluye una tabla de medidas debajo de la fotografía; las fichas encuadran únicamente la zona fotográfica mediante CSS y muestran las medidas como texto HTML independiente. Varios tamaños comparten una misma fotografía de familia, por lo que la imagen no debe interpretarse como prueba del tamaño exacto mostrado en una ficha. Para el modelo 6,30 × 3,30 m se mantiene otra foto de JECHMAN, ya que el archivo entregado identifica 6,40 × 3,30 m.

| Foto | Fichas relacionadas |
| --- | --- |
| `modelo-3-0.jpeg` | 3,00 × 2,00 m |
| `modelo-4-0.jpeg` | 4,00 × 2,50 m |
| `modelos-4-8-5-3.jpeg` | 4,80 × 2,80 m y 5,30 × 3,10 m |
| `modelo-6-4.jpeg` | 6,40 × 3,30 m |
| `modelos-romanos.jpeg` | 6,70 × 3,40 m y 8,10 × 3,40 m |
| `modelos-grandes.jpeg` | 7,15 × 3,40 m; 8,50 × 3,40 m; 8,50 × 4,00 m; 9,40 × 3,40 m; 10,50 × 3,40 m; 10,50 × 4,00 m |
| `jacuzzi-rectangular.jpeg` | Piscina de 10,50 × 3,40 m con jacuzzi rectangular |
| `jacuzzi-redondo.jpeg` | Piscina de 10,90 × 3,40 m con jacuzzi redondo |

## Medidas

El [catálogo público de piscinas de JECHMAN](https://www.jechman.cl/fabricacion-e-instalacion-de-piscinas-de-fibra-de-vidrio/) publica un modelo rectangular de **6,30 × 3,30 m**, profundidad **1,00 a 1,70 m**. La fotografía entregada para esta versión muestra **6,40 × 3,30 m** con el mismo rango; la página conserva ambas opciones sin presentar la foto de 6,40 m como prueba de la de 6,30 m. La foto entregada para piscina con jacuzzi rectangular indica **1,00 a 2,00 m**, por lo que se corrigió el rango anterior de 1,00 a 1,90 m. Disponibilidad, acabados e instalación se confirman al cotizar. Una misma fotografía de familia puede acompañar varias medidas, sin representar exactamente cada una.
