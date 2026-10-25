"""Build a local, searchable table of contents for the public archive."""
import html
import json
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent


def load(path: str):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def normalize(url: str) -> str:
    parsed = urlparse(url)
    return parsed.path.rstrip("/") or "/"


captured = {normalize(item["url"]): item["path"] for item in load("html/index.json")}
categories = {item["id"]: html.unescape(item["name"]) for item in load("public-api/product_cat.json")}
sections = [
    ("Páginas", load("public-api/pages.json")),
    ("Proyectos", load("public-api/portfolio.json")),
    ("Productos", load("public-api/product.json")),
]


def card(item: dict, kind: str) -> str:
    label = html.unescape(item.get("title", {}).get("rendered", "Sin título"))
    original = item.get("link", "")
    local = captured.get(normalize(original))
    category = ", ".join(categories.get(value, "") for value in item.get("product_cat", [])) if kind == "Productos" else ""
    metadata = f"<span>{html.escape(category)}</span>" if category else ""
    link = f'<a href="{html.escape(local, quote=True)}">{html.escape(label)}</a>' if local else html.escape(label)
    return f'<li data-search="{html.escape((label + " " + category).lower(), quote=True)}">{link}{metadata}<small><a href="{html.escape(original, quote=True)}">Ver URL original</a></small></li>'


blocks = []
for title, items in sections:
    rows = "\n".join(card(item, title) for item in sorted(items, key=lambda entry: html.unescape(entry.get("title", {}).get("rendered", "")).casefold()))
    blocks.append(f'<section><h2>{title} <span>{len(items)}</span></h2><ul class="items">{rows}</ul></section>')

home = captured.get("/", "")
content = f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Archivo público original · JECHMAN</title>
<style>
:root{{font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#183444;background:#f6f9fa}}
*{{box-sizing:border-box}}body{{margin:0}}main{{width:min(1120px,calc(100% - 32px));margin:auto;padding:38px 0 80px}}
header{{background:#102d40;color:#fff;padding:38px max(16px,calc((100% - 1120px)/2))}}h1{{font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;margin:0 0 12px}}
header p{{max-width:68ch;color:#d6e5e9}}a{{color:#176b88;text-underline-offset:3px}}header a{{color:#a8e4ef}}
.notice{{padding:16px 20px;background:#eaf4f6;border-left:4px solid #4db6ca;border-radius:4px;line-height:1.5}}
label{{display:block;font-weight:700;margin:30px 0 8px}}input{{width:100%;max-width:520px;min-height:48px;padding:10px 14px;border:1px solid #7596a5;border-radius:7px;font:inherit}}
section{{margin-top:38px}}h2{{border-bottom:1px solid #cbdde4;padding-bottom:10px}}h2 span{{font-size:.65em;color:#507080}}
ul{{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}}li{{background:#fff;border:1px solid #d7e4e9;border-radius:8px;padding:15px;display:flex;flex-direction:column;gap:6px;min-width:0}}
li>a{{font-weight:700;overflow-wrap:anywhere}}li span{{font-size:.83rem;color:#526c79}}li small{{margin-top:auto}}[hidden]{{display:none!important}}
</style></head><body>
<header><h1>V original de JECHMAN CL</h1><p>Índice local de una captura pública de www.jechman.cl. Las páginas conservadas son evidencia histórica; algunos enlaces y funciones de WordPress requieren el sitio original.</p><a href="{html.escape(home, quote=True)}">Abrir captura de la portada</a> · <a href="README.md">Leer límites del respaldo</a></header>
<main><p class="notice">Esta carpeta no contiene la base de datos ni datos privados de WordPress. Para restaurar el sitio completo se necesita un respaldo privado del hosting.</p>
<label for="buscar">Buscar en el archivo</label><input id="buscar" type="search" placeholder="Página, proyecto o producto" autocomplete="off">
<p id="resultado" role="status"></p>{''.join(blocks)}</main>
<script>const input=document.querySelector('#buscar'),items=[...document.querySelectorAll('[data-search]')],status=document.querySelector('#resultado');function filter(){{const term=input.value.trim().toLocaleLowerCase('es');let count=0;for(const item of items){{item.hidden=!!term&&!item.dataset.search.includes(term);if(!item.hidden)count++}}status.textContent=`${{count}} elementos visibles`}}input.addEventListener('input',filter);filter();</script>
</body></html>'''
(ROOT / "ABRIR_ARCHIVO.html").write_text(content, encoding="utf-8")
print(f"Index built: {sum(len(items) for _, items in sections)} entries")
