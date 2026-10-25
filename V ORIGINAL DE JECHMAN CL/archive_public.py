"""Read-only public snapshot of JECHMAN WordPress. No credentials or admin endpoints."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from xml.etree import ElementTree

import requests

ROOT = Path(__file__).resolve().parent
SITE = "https://www.jechman.cl"
HOSTS = {"www.jechman.cl", "jechman.cl"}
SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "JECHMAN-public-archive/1.0 (+read-only snapshot)"})
API_TYPES = ["pages", "posts", "portfolio", "product", "media", "product_cat", "product_tag", "project-cat", "categories", "tags"]
MAX_MEDIA_BYTES = 50 * 1024 * 1024


def get(url: str, *, params: dict | None = None, stream: bool = False) -> requests.Response:
    last_error = None
    for attempt in range(3):
        try:
            response = SESSION.get(url, params=params, timeout=50, stream=stream)
            response.raise_for_status()
            return response
        except (requests.RequestException, ValueError) as error:
            last_error = error
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"{url}: {last_error}")


def save_bytes(path: Path, content: bytes) -> dict:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(content)
    return {"path": path.relative_to(ROOT).as_posix(), "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()}


def save_json(path: Path, data: object) -> dict:
    return save_bytes(path, (json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n").encode("utf-8"))


def api_collection(path: str) -> tuple[list, int]:
    url = f"{SITE}/wp-json/wp/v2/{path}"
    first = get(url, params={"page": 1, "per_page": 100})
    pages = int(first.headers.get("X-WP-TotalPages", "1"))
    total = int(first.headers.get("X-WP-Total", "0"))
    items = first.json()
    for page in range(2, pages + 1):
        items.extend(get(url, params={"page": page, "per_page": 100}).json())
    if len(items) != total and path != "media":
        raise RuntimeError(f"{path}: expected {total}, got {len(items)}")
    return items, total


def capture_api(manifest: dict) -> None:
    results = manifest.setdefault("collections", {})
    for name in API_TYPES:
        try:
            items, total = api_collection(name)
            info = save_json(ROOT / "public-api" / f"{name}.json", items)
            manifest["errors"] = [error for error in manifest.get("errors", []) if not error.startswith(f"API {name}:")]
            results[name] = {"total_reported": total, "total_saved": len(items), **info}
            if len(items) != total:
                manifest.setdefault("warnings", []).append(f"API {name}: WordPress reports {total} but returns {len(items)} public records across all pages")
            print(f"API {name}: {len(items)} public records (reported {total})", flush=True)
        except Exception as error:
            manifest.setdefault("errors", []).append(f"API {name}: {error}")
            print(f"API {name}: ERROR {error}", flush=True)
    try:
        url = f"{SITE}/wp-json/wc/store/v1/products"
        first = get(url, params={"page": 1, "per_page": 100})
        pages = int(first.headers.get("X-WP-TotalPages", "1"))
        total = int(first.headers.get("X-WP-Total", "0"))
        items = first.json()
        for page in range(2, pages + 1):
            items.extend(get(url, params={"page": page, "per_page": 100}).json())
        if len(items) != total:
            raise RuntimeError(f"expected {total}, got {len(items)}")
        results["store-products"] = {"total": total, **save_json(ROOT / "public-api" / "store-products.json", items)}
        print(f"API store-products: {total}", flush=True)
    except Exception as error:
        manifest.setdefault("errors", []).append(f"API store-products: {error}")


def sitemap_urls(manifest: dict) -> list[str]:
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    index = get(f"{SITE}/wp-sitemap.xml").content
    save_bytes(ROOT / "sitemaps" / "wp-sitemap.xml", index)
    maps = [x.text for x in ElementTree.fromstring(index).findall("s:sitemap/s:loc", namespace) if x.text and "users" not in x.text]
    urls = [f"{SITE}/"]
    for url in maps:
        try:
            xml = get(url).content
            save_bytes(ROOT / "sitemaps" / urlparse(url).path.rsplit("/", 1)[-1], xml)
            urls.extend(x.text for x in ElementTree.fromstring(xml).findall("s:url/s:loc", namespace) if x.text)
        except Exception as error:
            manifest.setdefault("errors", []).append(f"sitemap {url}: {error}")
    return sorted({u for u in urls if urlparse(u).hostname in HOSTS and "/author/" not in urlparse(u).path})


def capture_html(manifest: dict) -> None:
    urls = sitemap_urls(manifest)
    print(f"HTML URLs: {len(urls)}", flush=True)
    records = []

    def worker(url: str) -> dict:
        key = hashlib.sha256(url.encode()).hexdigest()[:20]
        path = ROOT / "html" / f"{key}.html"
        if path.exists() and path.stat().st_size:
            content = path.read_bytes()
            return {"url": url, "path": path.relative_to(ROOT).as_posix(), "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()}
        response = get(url)
        if "html" not in response.headers.get("Content-Type", ""):
            raise RuntimeError(f"unexpected content type {response.headers.get('Content-Type')}")
        return {"url": url, **save_bytes(path, response.content)}

    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(worker, url): url for url in urls}
        for index, future in enumerate(as_completed(futures), 1):
            try:
                records.append(future.result())
            except Exception as error:
                manifest.setdefault("errors", []).append(f"HTML {futures[future]}: {error}")
            if index % 50 == 0:
                print(f"HTML {index}/{len(urls)}", flush=True)
    records.sort(key=lambda item: item["url"])
    manifest["html"] = {"expected": len(urls), "saved": len(records), "index": save_json(ROOT / "html" / "index.json", records)}


def capture_media(manifest: dict) -> None:
    metadata_path = ROOT / "public-api" / "media.json"
    if not metadata_path.exists():
        raise RuntimeError("Run the API phase first")
    media = json.loads(metadata_path.read_text(encoding="utf-8"))
    records = []

    def worker(item: dict) -> dict:
        url = item["source_url"]
        parsed = urlparse(url)
        if parsed.hostname not in HOSTS or not parsed.path.startswith("/wp-content/uploads/"):
            raise RuntimeError(f"unexpected URL {url}")
        relative = unquote(parsed.path.removeprefix("/wp-content/uploads/"))
        if ".." in Path(relative).parts:
            raise RuntimeError(f"unsafe path {url}")
        destination = ROOT / "media" / relative
        if destination.exists() and destination.stat().st_size:
            content = destination.read_bytes()
            return {"id": item["id"], "url": url, "path": destination.relative_to(ROOT).as_posix(), "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()}
        response = get(url, stream=True)
        announced = int(response.headers.get("Content-Length", "0"))
        if announced > MAX_MEDIA_BYTES:
            response.close()
            raise RuntimeError(f"larger than 50 MiB: {url}")
        body = bytearray()
        try:
            for chunk in response.iter_content(128 * 1024):
                body.extend(chunk)
                if len(body) > MAX_MEDIA_BYTES:
                    raise RuntimeError(f"larger than 50 MiB: {url}")
        finally:
            response.close()
        return {"id": item["id"], "url": url, **save_bytes(destination, bytes(body))}

    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(worker, item): item for item in media if item.get("source_url")}
        for index, future in enumerate(as_completed(futures), 1):
            try:
                records.append(future.result())
            except Exception as error:
                manifest.setdefault("errors", []).append(f"media {futures[future].get('id')}: {error}")
            if index % 50 == 0:
                print(f"media {index}/{len(futures)}", flush=True)
    records.sort(key=lambda item: item["id"])
    manifest["media"] = {"expected": len(futures), "saved": len(records), "index": save_json(ROOT / "media" / "index.json", records)}


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "script" and values.get("src"):
            self.urls.add(values["src"])
        if tag == "link" and values.get("href") and any(word in (values.get("rel") or "") for word in ("stylesheet", "icon", "preload")):
            self.urls.add(values["href"])


def capture_assets(manifest: dict) -> None:
    html_index = ROOT / "html" / "index.json"
    if not html_index.exists():
        raise RuntimeError("Run the HTML phase first")
    candidate_urls: set[str] = set()
    for page in json.loads(html_index.read_text(encoding="utf-8")):
        parser = AssetParser()
        parser.feed((ROOT / page["path"]).read_text(encoding="utf-8", errors="replace"))
        candidate_urls.update(urljoin(page["url"], link) for link in parser.urls)

    allowed = re.compile(r"\.(?:css|js|woff2?|ttf|otf|svg|png|jpe?g|webp|gif|ico)$", re.I)
    urls = sorted(url for url in candidate_urls if urlparse(url).hostname in HOSTS and allowed.search(urlparse(url).path) and "/wp-content/uploads/" not in urlparse(url).path)
    print(f"frontend assets: {len(urls)}", flush=True)
    records = []

    def worker(url: str) -> dict:
        suffix = Path(urlparse(url).path).suffix.lower()
        key = hashlib.sha256(url.encode()).hexdigest()[:20]
        path = ROOT / "frontend-assets" / f"{key}{suffix}"
        if path.exists() and path.stat().st_size:
            content = path.read_bytes()
            return {"url": url, "path": path.relative_to(ROOT).as_posix(), "bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()}
        response = get(url)
        if len(response.content) > MAX_MEDIA_BYTES:
            raise RuntimeError(f"larger than 50 MiB: {url}")
        return {"url": url, **save_bytes(path, response.content)}

    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(worker, url): url for url in urls}
        for index, future in enumerate(as_completed(futures), 1):
            try:
                records.append(future.result())
            except Exception as error:
                manifest.setdefault("errors", []).append(f"asset {futures[future]}: {error}")
            if index % 50 == 0:
                print(f"frontend assets {index}/{len(futures)}", flush=True)
    records.sort(key=lambda item: item["url"])
    manifest["frontend_assets"] = {"expected": len(urls), "saved": len(records), "index": save_json(ROOT / "frontend-assets" / "index.json", records)}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("phase", choices=["api", "html", "media", "assets", "all"])
    args = parser.parse_args()
    manifest_path = ROOT / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {"source": SITE, "started_at_utc": datetime.now(timezone.utc).isoformat(), "errors": []}
    if args.phase in ("api", "all"):
        capture_api(manifest)
        save_json(manifest_path, manifest)
    if args.phase in ("html", "all"):
        capture_html(manifest)
        save_json(manifest_path, manifest)
    if args.phase in ("media", "all"):
        capture_media(manifest)
        save_json(manifest_path, manifest)
    if args.phase in ("assets", "all"):
        capture_assets(manifest)
        save_json(manifest_path, manifest)
    manifest["updated_at_utc"] = datetime.now(timezone.utc).isoformat()
    save_json(manifest_path, manifest)
    print(f"Done. Errors: {len(manifest['errors'])}", flush=True)


if __name__ == "__main__":
    main()
