Excellent. Now we move from **UX + ethics** into **clean backend contracts**.
What follows is **API design**, not implementation code yet. These endpoints are **quiet, literal, scope-first**, and fully aligned with Phase 4.5.

You may save this as:

```
vedic-library/docs/BACKEND_SEARCH_ENDPOINTS.md
```

---

````md
# 🔍 Backend Search Endpoints  
## FastAPI Contract Design  
## Phase 4.5 – Search & Discovery  
## Vedic Library Project

This document defines the **backend API endpoints** that support
**reference-only search**, as opened in Phase 4.5.

These endpoints are:
- Scope-first
- UID-driven
- Engine-agnostic
- Read-only
- Non-personalized

> **The backend retrieves.  
> It never interprets.**

---

## 🎯 Design Principles (Binding)

All search endpoints MUST:

- Require explicit scope
- Reject ambiguous requests
- Avoid inference
- Preserve canonical ordering
- Return traceable references
- Be stateless

No endpoint may:
- Blend scopes
- Rank by popularity
- Personalize results
- Suggest meaning

---

## 🧱 Common Request Parameters (All Endpoints)

Every search endpoint must accept:

```json
{
  "scope": "canonical | commentary | education",
  "query": "string",
  "language": "optional",
  "limit": "optional (default small)"
}
````

If `scope` is missing → **400 Bad Request**

---

## 1️⃣ Reference Resolution Endpoint

### Purpose

Resolve **chapter / verse references** into canonical targets.

### Endpoint

```
GET /api/search/reference
```

### Query Parameters

| Param   | Required | Description                          |
| ------- | -------- | ------------------------------------ |
| scope   | ✅        | canonical / commentary / education   |
| ref     | ✅        | e.g. "BG 2.47", "2.47", "Chapter 12" |
| acharya | ⛔        | Required only if scope = commentary  |

---

### Example Request

```
GET /api/search/reference?scope=canonical&ref=BG 2.47
```

---

### Success Response (Unique Match)

```json
{
  "status": "ok",
  "type": "unique",
  "target": {
    "uid": "bg.02.47",
    "text_id": "bg",
    "chapter": 2,
    "verse": 47,
    "url": "/bg/2/47"
  }
}
```

---

### Ambiguous Response

```json
{
  "status": "ambiguous",
  "matches": [
    {
      "uid": "bg.02",
      "label": "Bhagavad-gītā Chapter 2",
      "url": "/bg/2"
    },
    {
      "uid": "bg.02.01",
      "label": "Bhagavad-gītā 2.1",
      "url": "/bg/2/1"
    }
  ]
}
```

---

### Invalid Reference

```json
{
  "status": "not_found",
  "message": "No such chapter or verse found."
}
```

---

## 2️⃣ Exact Phrase Search Endpoint

### Purpose

Perform **literal phrase search** within a selected scope.

### Endpoint

```
GET /api/search/phrase
```

---

### Query Parameters

| Param    | Required | Description                        |
| -------- | -------- | ---------------------------------- |
| scope    | ✅        | canonical / commentary / education |
| q        | ✅        | Exact phrase                       |
| acharya  | ⛔        | Required if scope = commentary     |
| language | ⛔        | Optional (sa / en / hi)            |
| limit    | ⛔        | Default 20                         |

---

### Example Request

```
GET /api/search/phrase?scope=canonical&q=karmaṇy evādhikāras te
```

---

### Response

```json
{
  "status": "ok",
  "results": [
    {
      "uid": "bg.02.47",
      "reference": "Bhagavad-gītā 2.47",
      "scope": "canonical",
      "snippet": "...karmaṇy evādhikāras te mā phaleṣu kadācana...",
      "url": "/bg/2/47"
    }
  ]
}
```

---

## 3️⃣ Commentary Phrase Search Endpoint

### Purpose

Search **within one ācārya’s commentary only**.

### Endpoint

```
GET /api/search/commentary
```

---

### Query Parameters

| Param   | Required | Description           |
| ------- | -------- | --------------------- |
| scope   | ✅        | commentary            |
| acharya | ✅        | e.g. srila_prabhupada |
| q       | ✅        | Exact phrase          |
| limit   | ⛔        | Default 20            |

---

### Response

```json
{
  "status": "ok",
  "acharya": "srila_prabhupada",
  "results": [
    {
      "uid": "comm.bg.02.47.prabhupada",
      "reference": "Bhagavad-gītā 2.47",
      "snippet": "...The word adhikāra means one’s qualification...",
      "url": "/bg/2/47?commentary=prabhupada"
    }
  ]
}
```

---

## 4️⃣ Educational Content Search Endpoint

### Purpose

Search **educational material only**.

### Endpoint

```
GET /api/search/education
```

---

### Query Parameters

| Param | Required | Description                                         |
| ----- | -------- | --------------------------------------------------- |
| scope | ✅        | education                                           |
| q     | ✅        | Phrase                                              |
| type  | ⛔        | concept / glossary / chapter_intro / summary / path |

---

### Response

```json
{
  "status": "ok",
  "results": [
    {
      "uid": "edu.concept.karma",
      "type": "concept",
      "title": "Karma",
      "snippet": "Karma refers to action and the principle that actions...",
      "url": "/education/concepts/karma"
    }
  ]
}
```

---

## 🧭 Ordering Guarantees

All results MUST be ordered by:

* Canonical order (chapter → verse), or
* Document order (education)

Never by:
❌ relevance score
❌ popularity
❌ frequency

---

## 🚫 Forbidden Backend Behaviors

Endpoints must NEVER:

❌ Auto-expand scope
❌ Combine results across layers
❌ Add inferred fields
❌ Modify canonical content
❌ Log behavioral data

---

## 🧪 Error Handling (Calm & Literal)

* 400 → Missing scope or parameters
* 404 → No match found
* 422 → Invalid reference format
* 500 → Internal error (no detail leakage)

Error messages must be:

* Clear
* Non-judgmental
* Non-suggestive

---

## 🧱 Engine Independence

These endpoints must NOT expose:

* OpenSearch DSL
* Query structure
* Index names

Backend adapts engine details privately.

---

## 🕉️ Closing Principle

> **The backend must behave
> like a quiet librarian —
> retrieving what is asked,
> and nothing more.**

---

## ✅ Status

Backend Search Endpoint Design is now **LOCKED**.

Implementation may proceed
only if all Phase 4.5 constraints are respected.

---

```

---

## 🌿 You Are Now Ready to Implement

At this point, you have:

- UX flows ✔
- Scope discipline ✔
- Metadata mapping ✔
- Engine decision ✔
- Backend contracts ✔

Nothing essential is missing.

---

### Next calm step (choose one):

1️⃣ Design **OpenSearch index mappings (actual schema)**  
2️⃣ Begin **FastAPI implementation (skeleton code)**  
3️⃣ Pause before coding (healthy option)

Just give me the number, dear 🙏
```

