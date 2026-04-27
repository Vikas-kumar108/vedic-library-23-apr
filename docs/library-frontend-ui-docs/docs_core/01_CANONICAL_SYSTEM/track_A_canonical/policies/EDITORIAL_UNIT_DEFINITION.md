# 🧾 EDITORIAL_UNIT_DEFINITION.md

## Vedic Library Project

> **Status:** LOCKED ARCHITECTURAL CONTRACT (v1.0)

---

## 0. Purpose of This Document

This document defines what an **Editorial Unit** is in the Vedic Library system.

An Editorial Unit is **any non-canonical textual or semantic layer** that:

* Refers to canonical text
* Explains, translates, interprets, annotates, or expands it
* May evolve over time
* Must never alter canonical identity

This document exists to:

* Prevent accidental mixing of canon and interpretation
* Create a safe expansion surface for future phases
* Allow unlimited scholarly, pedagogical, and devotional growth
* Keep canonical data eternally stable

---

## 1. Fundamental Distinction (Non‑Negotiable)

### Canonical Unit

* Represents *what the text is*
* Immutable
* Independent of language, author, or audience

### Editorial Unit

* Represents *what we say about the text*
* Mutable, revisable, expandable
* Human-facing, purpose-driven

> **Canonical Units are truth anchors.**
> **Editorial Units are lenses.**

They must never be confused.

---

## 2. Definition: Editorial Unit

An **Editorial Unit** is a structured data object that:

1. **References** one or more canonical UIDs
2. **Adds meaning, explanation, or context**
3. **Does not redefine identity**
4. **May change independently of canon**

An Editorial Unit always contains:

* A `ref` to canonical UID(s)
* A declared `type`
* A clear editorial intent

---

## 3. What Editorial Units Include

Editorial Units include (but are not limited to):

| Category         | Examples                           |
| ---------------- | ---------------------------------- |
| Translation      | English, Hindi, regional languages |
| Commentary       | Bhāṣya, ṭīkā, purport              |
| Synonyms         | Word-by-word meanings              |
| Gloss            | Short explanatory notes            |
| Concepts         | Philosophical ideas                |
| Principles       | Dharma, tattva, siddhānta          |
| Entities         | Persons, places, events            |
| Skills           | Yoga practices, rituals            |
| Guidance         | Practical application              |
| Courses          | Structured learning paths          |
| Compilations     | Thematic verse groupings           |
| Community Layers | Discussion, reflection             |

All of these are **editorial by nature**.

---

## 4. What Editorial Units NEVER Are

Editorial Units must never:

❌ Contain canonical Sanskrit text
❌ Define verse numbering
❌ Override chapter/structure metadata
❌ Alter verse segmentation
❌ Encode authority claims

> Editorial authority ≠ Canonical authority

---

## 5. Editorial Unit Identity Model

### 5.1 Identity

Editorial Units do **not** have eternal IDs like canonical units.

Instead, they have:

* Local identifiers
* Versioning
* Attribution
* Provenance

Example:

```json
{
  "id": "prabhupada-bg-2-47-en-v1",
  "ref": "bg.2.47",
  "type": "commentary",
  "author": "A.C. Bhaktivedanta Swami Prabhupāda",
  "language": "en",
  "text": "..."
}
```

The **canonical UID remains unchanged** regardless of editorial changes.

---

## 6. Relationship to Canonical Units

### 6.1 Directionality Rule

The relationship is always **one-way**:

```
Canonical Unit  ───▶  Editorial Unit
```

Never the reverse.

### 6.2 Cardinality

* One canonical unit → many editorial units
* One editorial unit → one or many canonical units

Examples:

* A commentary on a single verse
* A concept spanning many verses

---

## 7. Editorial Unit Types (Formal Registry)

Each Editorial Unit must declare its **type**.

### Core Types (Phase‑2 Safe)

| Type          | Description                     |
| ------------- | ------------------------------- |
| `translation` | Natural language rendering      |
| `synonyms`    | Word-by-word meanings           |
| `commentary`  | Traditional explanation         |
| `gloss`       | Short clarification             |
| `concept`     | Abstract idea                   |
| `principle`   | Normative or philosophical rule |
| `entity`      | Person, place, event            |
| `guidance`    | Applied instruction             |

Future types may be added **without breaking canon**.

---

## 8. Placement of Pre‑Verse and Post‑Verse Text

Many śāstra contain:

* Speaker labels (e.g. *Dhṛtarāṣṭra uvāca*)
* Contextual prose before verses
* Transitional remarks after verses

### Rule:

These are **editorial structural units**, not canonical verses.

They must be stored as:

* `editorial_unit.type = "context"`
* Referencing the nearest canonical UID(s)

Canonical verse remains **only the metrical unit**.

---

## 9. Editorial Units Across Śāstra Types

Editorial Units apply uniformly to:

* Mantras
* Ślokas
* Sūtras
* Prose texts
* Ritual instructions

The **canonical unit type changes** — the editorial logic does not.

---

## 10. Versioning & Review

Editorial Units:

* May include `review_status`
* May include `confidence`
* May include `notes`

Canonical Units:

* NEVER include such fields

---

## 11. Why This Separation Matters

Without this separation:

* Canon becomes unstable
* Interpretations harden into dogma
* Future scholarship is blocked
* Multi‑sampradāya coexistence breaks

With it:

* Canon stays eternal
* Interpretations remain plural
* Technology stays replaceable
* Tradition stays alive

---

## 12. Lock Statement

This document defines a **core architectural boundary**.

Once adopted:

* Canonical schemas depend on it
* Editorial schemas depend on it
* Phase‑2+ features rely on it

**EDITORIAL_UNIT_DEFINITION.md is LOCKED.**

Any future changes require:

* New document version
* Explicit migration notes

---

🕉️ *Canonical truth is preserved by restraint.
Editorial richness is enabled by clarity.*

EDITORIAL_UNIT_DEFINITION.md has been compiled, structured, and placed into the architecture canon with the right level of depth and guardrails.

What this document now clearly achieves

Draws a hard, non-negotiable boundary between canonical truth and editorial lenses

Explains why translations, commentaries, glosses, entities, principles, skills, etc. are not canon

Resolves long-standing confusion about:

pre-śloka / post-śloka material

speaker labels (uvāca, prose bridges, etc.)

multi-verse concepts vs single-verse canon

Creates a safe expansion surface for Phase-2 and beyond without destabilizing Phase-1

Makes your system multi-sampradāya, multi-century, and revision-friendly

This document quietly becomes one of the load-bearing pillars of the entire Vedic Library. Many future schemas, registries, and UI layers will depend on it.
