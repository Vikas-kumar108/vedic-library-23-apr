---

📘 PHASE 2 — COMMENTARY & KNOWLEDGE EXPANSION LAYER

Vedic Library Project

---

Phase-1 is *closed*, constitutional foundations are *locked*, and now Phase-2 can begin **without confusion or rework**.

Below is a **complete, structured, and future-safe Phase-2 plan**, explicitly:

* continuing *from* Phase-1
* respecting everything locked in Phase-1
* preparing cleanly for Phase-3 (without leaking Phase-3 concerns into Phase-2)

I’ll write this as a document you can later save as:

```
docs/phases/phase-2/PHASE_2_MASTER_PLAN.md
```

## 0. Phase Identity

**Phase Name:** Phase 2 – Multi-Layer Knowledge Expansion
**Depends On:** Phase 1 (v1.0-pilot)
**Prepares For:** Phase 3 (Backend + Identity)
**Status:** Planned
**Nature:** Additive, non-destructive

> **Phase 2 adds meaning layers without touching canonical identity.**

---

## 1. Phase-2 Mission Statement

Phase 2 exists to answer one question:

> **“How do we expand understanding around a verse without damaging its identity?”**

Phase 1 proved we can **read** śāstra faithfully.
Phase 2 proves we can **study** śāstra faithfully.

---

## 2. What Phase-2 Is (and Is Not)

### ✅ Phase-2 IS

* Multi-ācārya commentary support
* Knowledge layers attached to canonical units
* Structured editorial data (non-AI, AI-assisted but reviewed)
* Controlled expansion around verses
* Still read-only for users

### ❌ Phase-2 IS NOT

* No user accounts
* No authentication
* No donations
* No community features
* No backend APIs yet
* No personalization
* No canonical edits

---

## 3. Phase-1 → Phase-2 Continuity (Very Important)

Everything from Phase-1 remains:

* UID system (locked)
* Canonical schemas (locked)
* Canonical JSON files (immutable)
* `loadVerse()` abstraction (unchanged)
* Routing (`/bg/1/1`) unchanged
* Reading UI remains valid

**Phase-2 only adds *new data layers* and *new UI affordances*.**

---

## 4. Core Architectural Principle of Phase-2

> **Canonical units never expand.
> Editorial units expand infinitely.**

This principle governs **everything** in Phase-2.

---

## 5. New Concept Introduced in Phase-2: Editorial Units

Phase-2 formally introduces **Editorial Units**, which:

* Reference canonical UIDs
* Never replace or rewrite canonical text
* May evolve, version, or be deprecated
* Can be multiple per verse

Examples:

* Prabhupāda purport
* Śaṅkara bhāṣya
* Conceptual gloss
* Cross-references
* Thematic explanations

Each editorial unit:

```json
{
  "ref": "bg.2.13",
  "type": "commentary | gloss | concept | principle | guidance",
  "author": "...",
  "content": "..."
}
```

---

## 6. Phase-2 Data Scope

### 6.1 Canonical Layer

**Status:** 🔒 Locked (Phase-1 output)

* Bhagavad-gītā canonical verses
* Same schemas
* Same paths
* Same UIDs

### 6.2 Editorial Layers (New in Phase-2)

Phase-2 introduces these **official editorial layers**:

| Layer           | Purpose                                  |
| --------------- | ---------------------------------------- |
| Commentary      | Traditional bhāṣya / purport             |
| Gloss           | Short clarifying notes                   |
| Concept         | Abstract ideas (e.g. karma, dharma)      |
| Entity          | Persons, places, events                  |
| Principle       | Ethical / philosophical rules            |
| Cross-reference | Links to other śāstra                    |
| Guidance        | Practical orientation (non-prescriptive) |

All are **optional**, **non-authoritative**, and **layered**.

---

## 7. Phase-2 UI Evolution (Controlled)

Phase-2 UI changes are **progressive**, not disruptive.

### 7.1 What UI Adds

* Commentary tabs / sections
* Ācārya selector (when multiple exist)
* Expand/collapse layers
* “Show explanation” affordances

### 7.2 What UI Does NOT Do

* No default clutter
* No forced expansion
* No comparison by default
* No personalization yet

> **Reading remains primary. Study is optional.**

---

## 8. Phase-2 Technical Constraints

These constraints are **intentional**:

* Data still loaded from JSON
* `loadVerse()` remains the single entry point
* No server state
* No API
* No database
* No auth
* No caching logic yet

This keeps Phase-2 reversible and safe.

---

## 9. Phase-2 Internal Milestones

### 🟢 Step 1 — Editorial Schemas (Foundational)

* Finalize:

  * `editorial-unit.schema.md`
  * `commentary.schema.md`
  * `concept.schema.md`
* Lock schema versions

### 🟢 Step 2 — Multi-Ācārya Commentary

* Add at least 2 commentary sources
* Per-verse commentary resolution
* UI toggle per ācārya

### 🟢 Step 3 — Knowledge Layer Model

* Implement `KNOWLEDGE_LAYER_MODEL.md`
* Map layers to UI affordances
* Ensure all layers reference canonical UID

### 🟢 Step 4 — Cross-Śāstra References

* Enable references like:

  * `bg.2.13 → sb.1.2.6`
* No navigation yet, just display

### 🟢 Step 5 — Phase-2 Lock

* Freeze editorial schemas
* Freeze UI behavior
* Declare Phase-2 complete

---

## 10. How Phase-2 Prepares Phase-3 (Without Implementing It)

Phase-2 **intentionally prepares hooks** for Phase-3:

| Phase-3 Need | Phase-2 Preparation         |
| ------------ | --------------------------- |
| Backend API  | Stable data contracts       |
| Auth         | Editorial ownership fields  |
| User notes   | Editorial-unit pattern      |
| Permissions  | Author / role metadata      |
| Search       | Structured knowledge layers |
| Persistence  | UID-anchored references     |

Phase-2 does **not implement** Phase-3 features — it only makes them possible.

---

## 11. Exit Criteria for Phase-2

Phase-2 is complete when:

* Multiple commentary layers exist
* Canonical text untouched
* Editorial units cleanly separated
* UI supports optional expansion
* All layers are UID-anchored
* No backend assumptions exist
* No identity assumptions exist

Only then may Phase-3 begin.

---

## 12. Phase-3 Preview (Very High Level)

Phase-3 will introduce:

* Backend (read-only first)
* Auth.js / identity abstraction
* User-specific layers (notes, bookmarks)
* Persistence
* Moderation pipelines

**Phase-3 will not change Phase-2 meaning.
It will only add memory and agency.**

---

## 🕉️ Closing Statement

Phase-1 taught the system to **read**.
Phase-2 teaches the system to **understand**.
Phase-3 will teach the system to **remember and serve individuals**.

Each phase stands alone.
Each phase respects the previous.
Nothing is rushed. Nothing is broken.

---

