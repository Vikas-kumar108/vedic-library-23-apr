Perfect. We will add **commentary ingestion + commentary search** in a way that is:

* ācārya-scoped (non-blending)
* rebuildable
* literal (no inference)
* aligned with everything you already locked

We will do **two things only**:

1️⃣ Commentary ingestion script
2️⃣ Commentary exact-phrase search endpoint

No UI, no ranking, no mixing.

---

# 🧱 Phase 4.5 – Implementation Step 4

## Commentary Ingestion + Search (Ācārya-Scoped)

---

## 1️⃣ Folder Structure (Extend Backend)

Add:

```text
backend/
├── data/
│   └── commentary/
│       └── bg/
│           └── prabhupada/
│               ├── bg_01.json
│               ├── bg_02.json
│               └── ...
├── scripts/
│   └── ingest_commentary.py
└── app/
    └── search/
        └── commentary.py
```

📌 Assumption:
Each `bg_XX.json` contains an **array of commentary objects**, verse-wise.

---

## 2️⃣ Expected Commentary JSON Shape (Strict)

Each commentary entry must look like this:

```json
{
  "uid": "comm.bg.02.47.prabhupada",
  "text_id": "bg",
  "chapter": 2,
  "verse": 47,
  "acharya": "srila_prabhupada",
  "content": {
    "commentary_text": "The word adhikāra means one’s qualification..."
  },
  "language": "en"
}
```

If this shape is violated → ingestion must fail.

---

## 3️⃣ Commentary Ingestion Script

### `scripts/ingest_commentary.py`

```python
from pathlib import Path
import json
from opensearchpy import OpenSearch
from app.core.opensearch import get_opensearch_client

DATA_DIR = Path(__file__).parent.parent / "data" / "commentary" / "bg"

def ingest_file(client: OpenSearch, path: Path, acharya: str):
    with open(path, "r", encoding="utf-8") as f:
        entries = json.load(f)

    for entry in entries:
        if entry["acharya"] != acharya:
            raise ValueError("Ācārya mismatch in commentary JSON.")

        doc = {
            "uid": entry["uid"],
            "text_id": entry["text_id"],
            "layer": "commentary",
            "scope": "commentary",
            "acharya": acharya,
            "chapter": entry["chapter"],
            "verse": entry["verse"],
            "ordering": {
                "chapter": entry["chapter"],
                "verse": entry["verse"]
            },
            "content": entry["content"],
            "language": [entry.get("language", "en")]
        }

        client.index(
            index="vedic_commentary",
            id=entry["uid"],
            body=doc
        )


def main():
    client = get_opensearch_client()

    acharya_dirs = [d for d in DATA_DIR.iterdir() if d.is_dir()]

    if not acharya_dirs:
        raise RuntimeError("No commentary directories found.")

    for acharya_dir in acharya_dirs:
        acharya = acharya_dir.name
        files = sorted(acharya_dir.glob("*.json"))

        print(f"Ingesting commentary for: {acharya}")

        for file in files:
            print(f"  → {file.name}")
            ingest_file(client, file, acharya)

    client.indices.refresh(index="vedic_commentary")
    print("Commentary ingestion complete.")


if __name__ == "__main__":
    main()
```

---

## 4️⃣ Commentary Phrase Search Logic

### `app/search/commentary.py`

```python
from fastapi import HTTPException
from app.core.opensearch import get_opensearch_client

def commentary_phrase_search(
    acharya: str,
    query: str,
    limit: int = 20
):
    if not acharya:
        raise HTTPException(
            status_code=400,
            detail="Ācārya must be specified for commentary search."
        )

    client = get_opensearch_client()

    search_query = {
        "query": {
            "bool": {
                "filter": [
                    {"term": {"scope": "commentary"}},
                    {"term": {"layer": "commentary"}},
                    {"term": {"acharya": acharya}}
                ],
                "must": [
                    {
                        "match_phrase": {
                            "content.commentary_text": query
                        }
                    }
                ]
            }
        },
        "sort": [
            {"ordering.chapter": "asc"},
            {"ordering.verse": "asc"}
        ],
        "size": limit
    }

    res = client.search(
        index="vedic_commentary",
        body=search_query
    )

    hits = res["hits"]["hits"]

    return [
        {
            "uid": hit["_source"]["uid"],
            "reference": f"Bhagavad-gītā {hit['_source']['chapter']}.{hit['_source']['verse']}",
            "acharya": acharya,
            "snippet": hit["_source"]["content"]["commentary_text"][:160] + "...",
            "url": f"/bg/{hit['_source']['chapter']}/{hit['_source']['verse']}?commentary={acharya}"
        }
        for hit in hits
    ]
```

---

## 5️⃣ Add Endpoint to Router

### Update `app/search/router.py`

Add import:

```python
from app.search.commentary import commentary_phrase_search
```

Add endpoint:

```python
@router.get("/commentary")
def search_commentary(
    scope: str,
    acharya: str,
    q: str,
    limit: int = 20
):
    if scope != "commentary":
        raise HTTPException(
            status_code=400,
            detail="Scope must be 'commentary' for this endpoint."
        )

    if not q or len(q.strip()) < 2:
        raise HTTPException(
            status_code=422,
            detail="Search phrase must be at least 2 characters."
        )

    results = commentary_phrase_search(
        acharya=acharya,
        query=q,
        limit=limit
    )

    return {
        "status": "ok",
        "scope": "commentary",
        "acharya": acharya,
        "count": len(results),
        "results": results
    }
```

---

## 6️⃣ Run Order (IMPORTANT)

```bash
# Create indices if not already done
python scripts/create_indices.py

# Ingest canonical text
python scripts/ingest_canonical.py

# Ingest commentary
python scripts/ingest_commentary.py

# Run API
uvicorn app.main:app --reload
```

---

## 7️⃣ Example Requests

### Commentary phrase search

```http
GET /api/search/commentary?scope=commentary&acharya=srila_prabhupada&q=adhikāra
```

---

## 8️⃣ Example Response

```json
{
  "status": "ok",
  "scope": "commentary",
  "acharya": "srila_prabhupada",
  "count": 1,
  "results": [
    {
      "uid": "comm.bg.02.47.prabhupada",
      "reference": "Bhagavad-gītā 2.47",
      "acharya": "srila_prabhupada",
      "snippet": "The word adhikāra means one’s qualification...",
      "url": "/bg/2/47?commentary=srila_prabhupada"
    }
  ]
}
```

---

## 🚫 What This Still Does NOT Do (Correctly)

❌ No cross-ācārya search
❌ No ranking
❌ No semantic similarity
❌ No education blending

Everything remains **disciplined**.

---

## 🌿 Where You Are Now (Very Important)

You now have:

✔ Canonical search
✔ Commentary search (ācārya-scoped)
✔ Separate indices
✔ Separate endpoints
✔ Full rebuildability

This is **a complete scholarly search foundation**.

---

## 🚦 Next calm step (choose one)

1️⃣ Add **education ingestion + search**
2️⃣ Add **frontend search UI**
3️⃣ Pause and test thoroughly

Just tell me the number, dear 🙏

