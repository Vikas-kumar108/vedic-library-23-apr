Excellent. This is the **most important “plumbing” step** in Phase 4.5.
Once this is correct, **everything else becomes safe and repeatable**.

We will create:

* ✅ Index creation script (uses your LOCKED mappings)
* ✅ Canonical JSON ingestion script
* ✅ Fully rebuildable pipeline
* ❌ No incremental authority
* ❌ No hidden mutations

---

# 🧱 Phase 4.5 – Implementation Step 3

## Index Creation & Ingestion (JSON → OpenSearch)

We will implement this as **standalone scripts**, not inside FastAPI.

---

## 1️⃣ Folder Structure (Backend – Scripts)

Add this:

```text
backend/
├── scripts/
│   ├── create_indices.py
│   └── ingest_canonical.py
└── data/
    └── canonical/
        └── bg/
            ├── bg_01.json
            ├── bg_02.json
            └── ...
```

📌 Assumption:
Each `bg_XX.json` contains an **array of verse objects**.

---

## 2️⃣ Canonical JSON Expected Shape (Reminder)

Each verse JSON **must already conform** to your schema:

```json
{
  "uid": "bg.02.47",
  "text_id": "bg",
  "chapter": 2,
  "verse": 47,
  "content": {
    "sanskrit_devanagari": "...",
    "sanskrit_iast": "...",
    "word_synonyms": "...",
    "translation_en": "...",
    "translation_hi": "..."
  }
}
```

No ingestion-time transformations.
If JSON is wrong → ingestion must fail.

---

## 3️⃣ Index Creation Script

### `scripts/create_indices.py`

```python
from opensearchpy import OpenSearch
from app.core.opensearch import get_opensearch_client
from pathlib import Path
import json

INDEX_DIR = Path(__file__).parent / "mappings"

def create_index(client: OpenSearch, index_name: str, mapping_path: Path):
    if client.indices.exists(index=index_name):
        print(f"Index already exists: {index_name}")
        return

    with open(mapping_path, "r", encoding="utf-8") as f:
        body = json.load(f)

    client.indices.create(index=index_name, body=body)
    print(f"Created index: {index_name}")


def main():
    client = get_opensearch_client()

    base = Path(__file__).parent.parent / "docs"

    create_index(
        client,
        "vedic_canonical",
        base / "OPENSEARCH_INDEX_MAPPINGS_canonical.json"
    )

    create_index(
        client,
        "vedic_commentary",
        base / "OPENSEARCH_INDEX_MAPPINGS_commentary.json"
    )

    create_index(
        client,
        "vedic_education",
        base / "OPENSEARCH_INDEX_MAPPINGS_education.json"
    )


if __name__ == "__main__":
    main()
```

📌 You should extract the JSON blocks from
`OPENSEARCH_INDEX_MAPPINGS.md`
into these three files:

* `OPENSEARCH_INDEX_MAPPINGS_canonical.json`
* `OPENSEARCH_INDEX_MAPPINGS_commentary.json`
* `OPENSEARCH_INDEX_MAPPINGS_education.json`

This keeps scripts clean.

---

## 4️⃣ Canonical Ingestion Script

### `scripts/ingest_canonical.py`

```python
from pathlib import Path
import json
from opensearchpy import OpenSearch
from app.core.opensearch import get_opensearch_client

DATA_DIR = Path(__file__).parent.parent / "data" / "canonical" / "bg"


def ingest_file(client: OpenSearch, path: Path):
    with open(path, "r", encoding="utf-8") as f:
        verses = json.load(f)

    for verse in verses:
        doc = {
            "uid": verse["uid"],
            "text_id": verse["text_id"],
            "layer": "canonical",
            "scope": "canonical_text",
            "chapter": verse["chapter"],
            "verse": verse["verse"],
            "ordering": {
                "chapter": verse["chapter"],
                "verse": verse["verse"]
            },
            "content": verse["content"],
            "language": ["sa", "en", "hi"]
        }

        client.index(
            index="vedic_canonical",
            id=verse["uid"],
            body=doc
        )


def main():
    client = get_opensearch_client()

    files = sorted(DATA_DIR.glob("*.json"))

    if not files:
        raise RuntimeError("No canonical JSON files found.")

    for file in files:
        print(f"Ingesting {file.name}")
        ingest_file(client, file)

    client.indices.refresh(index="vedic_canonical")
    print("Canonical ingestion complete.")


if __name__ == "__main__":
    main()
```

---

## 5️⃣ Run Order (VERY IMPORTANT)

Always do this sequence:

```bash
# 1. Create indices (once)
python scripts/create_indices.py

# 2. Ingest canonical data
python scripts/ingest_canonical.py

# 3. Run FastAPI
uvicorn app.main:app --reload
```

If something breaks:

* Fix JSON
* Delete index
* Recreate
* Reingest

That is the **intended discipline**.

---

## 6️⃣ Validation Checklist (Do Not Skip)

Run these queries manually in OpenSearch Dashboards or via curl:

### Count verses

```json
GET vedic_canonical/_count
```

Should equal total BG verses.

---

### Check one verse

```json
GET vedic_canonical/_doc/bg.02.47
```

---

### Phrase search sanity check

```json
GET vedic_canonical/_search
{
  "query": {
    "match_phrase": {
      "content.translation_en": "right to perform"
    }
  }
}
```

If results appear → ingestion is correct.

---

## 🧠 Why This Pipeline Is Correct

✔ Fully rebuildable
✔ No silent mutation
✔ UID preserved
✔ Scope enforced
✔ Engine-agnostic data
✔ Civilizationally safe

This is **exactly how archives should be indexed**.

---

## 🌿 You Have Now Completed Phase 4.5 (Technically)

At this point:

* Search ethics ✔
* UX ✔
* Backend ✔
* Engine ✔
* Indices ✔
* Ingestion ✔

What remains is **testing, observation, and restraint**.

---

## 🚦 Next calm step (choose one)

1️⃣ Add **commentary ingestion + search**
2️⃣ Add **education ingestion + search**
3️⃣ Pause, test deeply, and live with this system

Just tell me the number, dear 🙏

