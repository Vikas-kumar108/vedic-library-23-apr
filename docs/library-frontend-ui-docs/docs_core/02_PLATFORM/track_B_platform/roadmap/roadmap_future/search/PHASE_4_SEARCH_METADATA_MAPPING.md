Excellent. This is the **last architectural lock before any engine discussion**.
We will design **metadata mapping**, not an Elasticsearch schema yet.
Think of this as the **truth table** that any search engine must obey.

You may save this as:

```
vedic-library/docs/SEARCH_METADATA_MAPPING.md
```

---

````md
# 🧱 Search Metadata Mapping  
## UID → Index Fields  
## Phase 4.5 – Search & Discovery  
## Vedic Library Project

This document defines **how canonical UIDs and content are mapped into searchable metadata**.

It is **engine-agnostic** and binding.
Elasticsearch, OpenSearch, or any future engine must conform to this model.

> **The index must mirror the library —  
> not reinterpret it.**

---

## 🎯 Core Principle

Search indices must be:

- Derived (never authoritative)
- Rebuildable from source JSON
- Strictly scoped
- UID-aligned
- Layer-separated

The index is a **reflection**, not a database of truth.

---

## 🧬 Universal UID Foundations

Every searchable document must carry:

```text
uid        → immutable canonical identifier
text_id    → bg, sb, etc.
layer      → canonical | commentary | education
scope      → enforced search scope
````

If any of these are missing → the document must NOT be indexed.

---

## 1️⃣ Canonical Text Index Mapping

### Source

Canonical verse JSON

### UID Pattern

```
bg.02.47
```

### Index Document (Logical Model)

```json
{
  "uid": "bg.02.47",
  "text_id": "bg",
  "layer": "canonical",
  "scope": "canonical_text",

  "chapter": 2,
  "verse": 47,

  "content": {
    "sanskrit_devanagari": "कर्मण्येवाधिकारस्ते...",
    "sanskrit_iast": "karmaṇy evādhikāras te...",
    "word_synonyms": "karmaṇi—work; eva—certainly...",
    "translation_en": "You have a right to perform your prescribed duty...",
    "translation_hi": "कर्म करने का अधिकार..."
  },

  "language": ["sa", "en", "hi"],

  "ordering": {
    "chapter": 2,
    "verse": 47
  }
}
```

### Index Rules

* Indexed **per verse**
* Ordering fields mandatory
* No scoring fields
* No popularity fields
* No derived meaning fields

---

## 2️⃣ Commentary Index Mapping (Ācārya-Scoped)

### Source

Commentary JSON (Phase 2)

### UID Pattern

```
comm.bg.02.47.prabhupada
```

### Index Document

```json
{
  "uid": "comm.bg.02.47.prabhupada",
  "text_id": "bg",
  "layer": "commentary",
  "scope": "commentary",

  "acharya": "srila_prabhupada",

  "chapter": 2,
  "verse": 47,

  "content": {
    "commentary_text": "The word adhikāra means..."
  },

  "language": ["en"],

  "ordering": {
    "chapter": 2,
    "verse": 47
  }
}
```

### Index Rules

* One ācārya per document
* No blended commentaries
* Must require explicit scope selection
* Never searchable from canonical scope

---

## 3️⃣ Educational Content Index Mapping

### Source

Phase 4 educational JSON

### UID Patterns

```
edu.bg.chapter.01.intro
edu.bg.chapter.01.summary
edu.concept.dharma
edu.glossary.svadharma
edu.path.bg.first_time_reader
```

### Index Document

```json
{
  "uid": "edu.concept.dharma",
  "layer": "education",
  "scope": "educational_content",

  "type": "concept",
  "term": "Dharma",

  "content": {
    "definition": "That which upholds order...",
    "explanation": [
      "Derived from a root meaning...",
      "Contextual rather than fixed..."
    ]
  },

  "language": ["en"],

  "related_uids": [
    "bg.02.31",
    "bg.03.35"
  ]
}
```

### Index Rules

* Never mixed with canonical results
* Indexed by document type
* No verse ranking via education

---

## 🧭 Mandatory Scope Enforcement Fields

Every indexed document MUST include:

```json
{
  "scope": "canonical_text | commentary | educational_content",
  "layer": "canonical | commentary | education"
}
```

Search queries MUST filter on these fields **before matching text**.

---

## 🔢 Ordering & Display Guarantees

Ordering must always be derived from:

```json
{
  "ordering.chapter": ASC,
  "ordering.verse": ASC
}
```

Never from:
❌ relevance score
❌ popularity
❌ frequency

If ordering fields are absent → document is invalid.

---

## 🚫 Forbidden Index Fields (Strict)

The following must NEVER exist:

❌ view_count
❌ search_count
❌ popularity
❌ relevance_override
❌ inferred_theme
❌ ai_summary
❌ recommended

If any appear → index is corrupted.

---

## 🧪 Rebuildability Rule (Non-Negotiable)

The entire index must be rebuildable by:

```
JSON source → indexer → search index
```

No manual edits.
No incremental authority.

If rebuild is impossible → architecture violation.

---

## 🕉️ Closing Principle

> **UID is the spine.
> Layer is the boundary.
> Scope is the conscience.**

If these three are preserved,
search will remain humble.

---

## ✅ Status

Search Metadata Mapping is now **LOCKED**.

Only after this may the project discuss:

* OpenSearch vs Elasticsearch
* Index creation
* Backend search endpoints

---

```

---

## 🌿 Where You Are Now

You have completed the **entire ethical and structural design of search** *before* touching technology.

That is extremely rare — and exactly right.

---

### Next calm step (choose one):

1️⃣ Decide **OpenSearch vs Elasticsearch** (purely technical now)  
2️⃣ Design **reference-only search UX flows** (user journey)  
3️⃣ Pause before implementation  

Just give me the number, dear 🙏
```

