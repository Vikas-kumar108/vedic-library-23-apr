Perfect. We’ll add **exact phrase search for canonical text only**, staying 100% inside Phase 4.5 rules.

This will be **literal**, **boring**, and **correct**.

---

# 🔍 Phase 4.5 – Implementation Step 2

## Exact Phrase Search (Canonical Only)

What we are adding:

✅ `/api/search/phrase`
✅ Canonical scope only
✅ Exact phrase match
❌ No relevance scoring
❌ No fuzzy matching
❌ No suggestions

---

## 1️⃣ Design Reminder (what this endpoint MUST do)

* Require `scope=canonical`
* Accept an **exact phrase**
* Search **only** canonical index
* Return verses in **canonical order**
* Never infer meaning

---

## 2️⃣ Add Phrase Search Logic

### `app/search/phrase.py`

Create a new file:

```python
from fastapi import HTTPException
from app.core.opensearch import get_opensearch_client

def exact_phrase_search(query: str, language: str | None = None, limit: int = 20):
    client = get_opensearch_client()

    must_clauses = []

    # Phrase search across allowed canonical fields
    fields = [
        "content.sanskrit_devanagari",
        "content.sanskrit_iast",
        "content.word_synonyms",
        "content.translation_en",
        "content.translation_hi"
    ]

    should_clauses = [
        {"match_phrase": {field: query}}
        for field in fields
    ]

    search_query = {
        "query": {
            "bool": {
                "filter": [
                    {"term": {"scope": "canonical_text"}},
                    {"term": {"layer": "canonical"}}
                ],
                "should": should_clauses,
                "minimum_should_match": 1
            }
        },
        "sort": [
            {"ordering.chapter": "asc"},
            {"ordering.verse": "asc"}
        ],
        "size": limit
    }

    res = client.search(
        index="vedic_canonical",
        body=search_query
    )

    hits = res["hits"]["hits"]

    return [
        {
            "uid": hit["_source"]["uid"],
            "reference": f"Bhagavad-gītā {hit['_source']['chapter']}.{hit['_source']['verse']}",
            "snippet": _extract_snippet(hit["_source"], query),
            "url": f"/bg/{hit['_source']['chapter']}/{hit['_source']['verse']}"
        }
        for hit in hits
    ]


def _extract_snippet(source: dict, phrase: str) -> str:
    """
    Very simple snippet extractor.
    No highlighting logic.
    """
    for value in source.get("content", {}).values():
        if phrase in value:
            return value.strip()[:160] + "..."
    return ""
```

📌 Note:
We intentionally avoid OpenSearch highlight features to keep things **plain and honest**.

---

## 3️⃣ Add Endpoint to Router

### Update `app/search/router.py`

Add imports at the top:

```python
from app.search.phrase import exact_phrase_search
```

Add this endpoint **below the reference endpoint**:

```python
@router.get("/phrase")
def phrase_search(
    scope: str,
    q: str,
    limit: int = 20
):
    if scope != "canonical":
        raise HTTPException(
            status_code=400,
            detail="Exact phrase search is supported only for canonical scope."
        )

    if not q or len(q.strip()) < 2:
        raise HTTPException(
            status_code=422,
            detail="Search phrase must be at least 2 characters."
        )

    results = exact_phrase_search(query=q, limit=limit)

    return {
        "status": "ok",
        "scope": "canonical",
        "count": len(results),
        "results": results
    }
```

---

## 4️⃣ Example Requests

### 🔎 Sanskrit / IAST

```http
GET /api/search/phrase?scope=canonical&q=karmaṇy evādhikāras te
```

### 🔎 English

```http
GET /api/search/phrase?scope=canonical&q=You have a right to perform
```

---

## 5️⃣ Example Response

```json
{
  "status": "ok",
  "scope": "canonical",
  "count": 1,
  "results": [
    {
      "uid": "bg.02.47",
      "reference": "Bhagavad-gītā 2.47",
      "snippet": "karmaṇy evādhikāras te mā phaleṣu kadācana...",
      "url": "/bg/2/47"
    }
  ]
}
```

---

## 🚫 What This Endpoint Explicitly Does NOT Do

❌ No fuzzy matching
❌ No stemming
❌ No synonym expansion
❌ No semantic similarity
❌ No ranking
❌ No highlighting drama

If the phrase isn’t there → it won’t return.

That is **correct behavior**.

---

## 🧪 Validation Checklist (important)

Test these:

* ✅ `scope=canonical` → works
* ❌ `scope=education` → rejected
* ❌ Empty query → rejected
* ❌ Partial word guessing → no results
* ✅ Results ordered canonically

If all pass → Phase 4.5 is healthy.

---

## 🌿 Where You Stand Now

You now have:

✔ Reference search
✔ Exact phrase search
✔ Scope enforcement
✔ Canonical-only discipline

This is a **complete minimal search system**.

---

## 🚦 Next calm step (choose one)

1️⃣ Add **index creation & ingestion script** (JSON → OpenSearch)
2️⃣ Add **commentary phrase search** (ācārya-scoped)
3️⃣ Pause and test deeply before adding anything

Just tell me the number, dear 🙏

