"""Check documentation structure and example JSON; this does not run Minecraft."""

import json
import re
import sys
import uuid
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
errors = []
counts = {"documents": 0, "json_code_blocks": 0, "example_json_files": 0}


def report(path, message):
    errors.append(f"{path.relative_to(ROOT)}: {message}")


def unique_keys(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate key: {key}")
        result[key] = value
    return result


def parse_json(text, path):
    try:
        return json.loads(text, object_pairs_hook=unique_keys)
    except ValueError as error:
        report(path, str(error))
        return None


pages = sorted(p for p in DOCS.rglob("*.md") if ".vuepress" not in p.parts)
for path in pages:
    text = path.read_text(encoding="utf-8")
    prose = re.sub(r"^```.*?^```\s*$", "", text, flags=re.MULTILINE | re.DOTALL)
    counts["documents"] += 1
    if not re.search(r"^# .+", prose, re.MULTILINE):
        report(path, "missing level-one title")
    if re.search(r"\b(?:WIP|TODO|TBD)\b", text):
        report(path, "unfinished marker")
    if len(re.findall(r"^```", text, re.MULTILINE)) % 2:
        report(path, "unclosed code fence")
    for block in re.finditer(r"^```json\s*\n(.*?)^```\s*$", text, re.MULTILINE | re.DOTALL):
        counts["json_code_blocks"] += 1
        parse_json(block.group(1), path)
    for link in re.findall(r"\[[^\]]*\]\(([^\s)]+)", prose):
        url = urlsplit(link)
        if url.scheme or url.netloc or not url.path:
            continue
        target = DOCS / url.path.lstrip("/") if url.path.startswith("/") else path.parent / unquote(url.path)
        if target.suffix == ".html":
            target = target.with_suffix(".md")
        if not target.exists():
            report(path, f"missing local link: {link}")

config = (DOCS / ".vuepress/config.js").read_text(encoding="utf-8")
navigation = set(re.findall(r"['\"](/(?:primer|advanced|peak|misc)/[^'\"]+\.md)['\"]", config))
for page in pages:
    if page.parent == DOCS:
        continue
    if "/" + page.relative_to(DOCS).as_posix() not in navigation:
        report(page, "not included in navigation")
for link in navigation:
    if not (DOCS / link.lstrip("/")).is_file():
        report(DOCS / ".vuepress/config.js", f"missing navigation page: {link}")

identities = {}
for path in sorted((ROOT / "examples").rglob("*.json")):
    counts["example_json_files"] += 1
    data = parse_json(path.read_text(encoding="utf-8"), path)
    if path.name != "manifest.json" or data is None:
        continue
    for item in [data["header"], *data["modules"]]:
        identity = item["uuid"]
        try:
            uuid.UUID(identity)
        except ValueError:
            report(path, f"invalid UUID: {identity}")
        if identity in identities:
            report(path, f"duplicate pack/module UUID with {identities[identity]}")
        identities[identity] = path.relative_to(ROOT)
        if "entry" in item and not (path.parent / item["entry"]).is_file():
            report(path, f"missing script entry: {item['entry']}")

print(json.dumps({"checked": counts, "errors": errors}, ensure_ascii=False, indent=2))
sys.exit(bool(errors))
