Excellent. This is the **last technical design lock** before writing real code.

Below is the **actual OpenSearch index mappings**, written to **strictly implement** everything you already decided:

* UID-first
* Scope-first
* Layer-separated
* No relevance tricks
* No popularity
* No inference
* Fully rebuildable

You may save this as:

```
vedic-library/docs/OPENSEARCH_INDEX_MAPPINGS.md
```

---

````md
# 🧱 OpenSearch Index Mappings  
## Phase 4.5 – Search & Discovery  
## Vedic Library Project

This document defines the **actual OpenSearch index schemas** used by
the Vedic Library.

These mappings are **binding**, engine-specific, and derived from:
- UID discipline
- Scope model
- Metadata mapping

> **The index mirrors the library.  
> It must never reinterpret it.**

---

## 🎯 Global Index Design Strategy

We use **separate indices per layer** to guarantee:
- Scope isolation
- Zero accidental blending
- Simpler queries
- Ethical enforcement at engine level

### Indices

| Index Name | Content |
|---|---|
| `vedic_canonical` | Śāstra verses |
| `vedic_commentary` | Ācārya commentaries |
| `vedic_education` | Educational content |

---

## 1️⃣ Canonical Text Index (`vedic_canonical`)

### Purpose
Exact reference & phrase search on scripture.

---

### Mapping

```json
{
  "settings": {
    "analysis": {
      "analyzer": {
        "sanskrit_iast": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  },
  "mappings": {
    "dynamic": "strict",
    "properties": {
      "uid": { "type": "keyword" },
      "text_id": { "type": "keyword" },

      "layer": { "type": "keyword" },
      "scope": { "type": "keyword" },

      "chapter": { "type": "integer" },
      "verse": { "type": "integer" },

      "ordering": {
        "properties": {
          "chapter": { "type": "integer" },
          "verse": { "type": "integer" }
        }
      },

      "content": {
        "properties": {
          "sanskrit_devanagari": {
            "type": "text",
            "analyzer": "standard"
          },
          "sanskrit_iast": {
            "type": "text",
            "analyzer": "sanskrit_iast"
          },
          "word_synonyms": {
            "type": "text"
          },
          "translation_en": {
            "type": "text"
          },
          "translation_hi": {
            "type": "text"
          }
        }
      },

      "language": {
        "type": "keyword"
      }
    }
  }
}
````

---

### Enforcement Notes

* `dynamic: strict` prevents accidental fields
* No `text` fields outside `content`
* No ranking fields
* Ordering always deterministic

---

## 2️⃣ Commentary Index (`vedic_commentary`)

### Purpose

Exact phrase search within **one ācārya at a time**.

---

### Mapping

```json
{
  "mappings": {
    "dynamic": "strict",
    "properties": {
      "uid": { "type": "keyword" },
      "text_id": { "type": "keyword" },

      "layer": { "type": "keyword" },
      "scope": { "type": "keyword" },

      "acharya": { "type": "keyword" },

      "chapter": { "type": "integer" },
      "verse": { "type": "integer" },

      "ordering": {
        "properties": {
          "chapter": { "type": "integer" },
          "verse": { "type": "integer" }
        }
      },

      "content": {
        "properties": {
          "commentary_text": {
            "type": "text"
          }
        }
      },

      "language": {
        "type": "keyword"
      }
    }
  }
}
```

---

### Enforcement Notes

* `acharya` is mandatory
* Queries MUST filter on `acharya`
* No cross-commentary indexing
* No blending at index level

---

## 3️⃣ Educational Index (`vedic_education`)

### Purpose

Search educational material without touching scripture.

---

### Mapping

```json
{
  "mappings": {
    "dynamic": "strict",
    "properties": {
      "uid": { "type": "keyword" },

      "layer": { "type": "keyword" },
      "scope": { "type": "keyword" },

      "type": { "type": "keyword" },

      "title": { "type": "text" },
      "term": { "type": "text" },

      "content": {
        "type": "text"
      },

      "related_uids": {
        "type": "keyword"
      },

      "language": {
        "type": "keyword"
      }
    }
  }
}
```

---

### Enforcement Notes

* Educational content is flat & simple
* No inference fields
* No ranking fields
* Related UIDs only for navigation

---

## 🚫 Explicitly Forbidden Mapping Fields

The following fields must NEVER appear in any index:

```text
view_count
click_count
popularity
rank
score_override
ai_summary
semantic_vector
embedding
```

If present → index invalid.

---

## 🧪 Query Discipline (Engine-Level)

Every query MUST:

1. Filter by `scope`
2. Filter by `layer`
3. Filter by index
4. Match exact phrase OR reference
5. Sort by `ordering.chapter`, `ordering.verse`

No query may:

* Use `function_score`
* Use `script_score`
* Use `knn_vector`
* Use ML plugins

---

## 🔁 Rebuild Guarantee

All indices must be rebuildable via:

```
JSON source
 → indexer
 → OpenSearch indices
```

No manual edits.
No partial authority.

---

## 🕉️ Closing Principle

> **If the index knows more than the text,
> something has gone wrong.**

These mappings ensure:

* Search remains humble
* Scripture remains central
* Discovery remains disciplined

---

## ✅ Status

OpenSearch Index Mappings are now **LOCKED**.

You may now safely:

* Implement index creation scripts
* Write FastAPI search code
* Connect frontend search UI

---

```

---

## 🌿 You Are Architecturally Complete

At this point, you have designed **every layer**:

- Canonical text ✔
- Commentary ✔
- Education ✔
- Participation ✔
- Search ethics ✔
- Search UX ✔
- Search backend ✔
- Search index ✔

Nothing foundational is missing.

---

### Final next steps (choose one):

1️⃣ Begin **FastAPI + OpenSearch implementation (code)**  
2️⃣ Begin **Frontend Search UI implementation**  
3️⃣ Pause and stabilize (very wise after this much design)

Just tell me the number, dear 🙏
```

