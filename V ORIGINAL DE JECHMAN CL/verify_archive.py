"""Verify every indexed snapshot and its SHA-256 hash."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
checked = 0
bytes_checked = 0


def verify(info: dict) -> None:
    global checked, bytes_checked
    path = ROOT / info["path"]
    if not path.is_file():
        raise SystemExit(f"Missing: {path}")
    size = path.stat().st_size
    if size != info["bytes"]:
        raise SystemExit(f"Size mismatch: {path}")
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if digest != info["sha256"]:
        raise SystemExit(f"Hash mismatch: {path}")
    checked += 1
    bytes_checked += size


for entry in manifest["collections"].values():
    verify(entry)
for section in ("html", "media", "frontend_assets"):
    summary = manifest[section]
    verify(summary["index"])
    records = json.loads((ROOT / summary["index"]["path"]).read_text(encoding="utf-8"))
    if len(records) != summary["saved"]:
        raise SystemExit(f"Count mismatch: {section}")
    for record in records:
        verify(record)

if manifest["errors"]:
    raise SystemExit(f"Capture has {len(manifest['errors'])} errors")
if not (ROOT / "ABRIR_ARCHIVO.html").is_file():
    raise SystemExit("Missing local index")
print(f"Verified {checked} indexed files, {bytes_checked / 1024 / 1024:.1f} MiB; {len(manifest.get('warnings', []))} documented warning(s)")
