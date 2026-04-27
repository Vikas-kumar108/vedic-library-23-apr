# Canonical Ritual Unit Schema

## vedic-library.canonical.ritual-unit @ 1.0.0

This document defines the **canonical schema for ritual units** in the Vedic Library.

A *ritual unit* is a **structural, repeatable, authoritative unit of ritual action** attested in śāstra. This schema applies to Vedic, Smārta, Āgamic, Tantric, and Smṛti-based ritual corpora.

This is a **schema document**, not a ritual manual.
Rules for ritual interpretation, performance, symbolism, or theology are *explicitly out of scope*.

---

## 1. Purpose and Scope

The Canonical Ritual Unit Schema exists to:

* Represent ritual instructions *without interpretation*
* Preserve traditional ritual boundaries faithfully
* Enable precise citation and UID stability
* Support later layers (commentary, pedagogy, visualization)

This schema is designed to be:

* Textually faithful
* Tradition-agnostic
* Edition-resilient
* Machine-validated
* Human-readable

---

## 2. What Is a “Ritual Unit”?

A **ritual unit** is the *smallest canonically referencable block of ritual instruction* that:

* Has a stable traditional boundary
* Is cited or repeatable
* Is not purely explanatory prose

### Examples

| Corpus       | Ritual Unit Example                  |
| ------------ | ------------------------------------ |
| Śrauta       | A single iṣṭi step                   |
| Gṛhya        | One saṁskāra action                  |
| Āgama        | One nyāsa sequence                   |
| Tantra       | One mantra–mudrā–visualization block |
| Dharmaśāstra | One injunction–procedure pair        |

---

## 3. Canonical Boundaries (Very Important)

Canonical ritual units are defined by **textual attestation**, not modern ritual logic.

A ritual unit may be:

* One sentence
* One sūtra
* One numbered step
* One mantra + action pair
* One paragraph explicitly marked as a unit

A ritual unit is **not**:

* A full ritual
* A symbolic explanation
* A commentary gloss
* A modern procedural reorganization

---

## 4. Schema Identity

```json
"schema": {
  "name": "vedic-library.canonical.ritual-unit",
  "version": "1.0.0"
}
```

Once ritual units are locked under this schema, **they must not be modified**.

---

## 5. Top-Level Structure

```json
{
  "uid": "string",
  "work": { ... },
  "location": { ... },
  "unit_type": "string",
  "text": { ... },
  "mantras": [ ... ],
  "actions": [ ... ],
  "constraints": { ... },
  "source": { ... },
  "schema": { ... }
}
```

All top-level fields are required unless explicitly marked optional.

---

## 6. uid (required)

A globally stable identifier for the ritual unit.

UID rules:

* Encodes **location only**
* Never encodes deity, sampradāya, purpose, symbolism
* Must be resolvable to a single textual locus

### Example

```
agnihotra.srauta.1.3
```

---

## 7. work (required)

Identifies the śāstric corpus.

```json
"work": {
  "corpus": "sruti | smrti | agama | tantra",
  "text": "string",
  "section": "string | null",
  "subwork": "string | null"
}
```

Rules:

* All keys must exist
* Use `null` when a level is not applicable
* Values come from controlled vocabularies

---

## 8. location (required)

Specifies the ritual unit’s canonical position.

```json
"location": {
  "primary": "string",
  "secondary": "string | null",
  "unit": "number"
}
```

Examples:

* Brāhmaṇa section
* Sūtra number
* Step index

---

## 9. unit_type (required)

Declares the **ritual function type**.

Allowed values (controlled):

* `injunction`
* `procedure`
* `mantra-action`
* `preparatory`
* `concluding`
* `conditional`
* `prohibitive`

This is **descriptive**, not interpretive.

---

## 10. text (required)

The canonical ritual instruction text.

```json
"text": {
  "script": "devanagari",
  "content": "string"
}
```

Rules:

* Devanāgarī is authoritative
* No translation
* No explanation
* No interpretation

---

## 11. mantras (optional)

Used **only if** the ritual unit explicitly contains mantras.

```json
"mantras": [
  {
    "ref": "uid",
    "role": "invocatory | concluding | operative"
  }
]
```

Rules:

* References canonical mantra units
* Never embed mantra text here

---

## 12. actions (optional)

Explicit ritual actions described in the unit.

```json
"actions": [
  {
    "verb": "string",
    "object": "string",
    "qualifier": "string | null"
  }
]
```

Examples:

* offer oblation
* recite mantra
* touch vessel

---

## 13. constraints (optional)

Canonical constraints explicitly stated in the source.

```json
"constraints": {
  "time": "string | null",
  "eligibility": "string | null",
  "sequence": "string | null"
}
```

No inferred constraints allowed.

---

## 14. source (required)

Pipeline provenance.

```json
"source": {
  "pipeline": "string",
  "stage": "string",
  "derived_from": ["string"]
}
```

---

## 15. Schema Binding (required)

```json
"schema": {
  "name": "vedic-library.canonical.ritual-unit",
  "version": "1.0.0"
}
```

---

## 16. Prohibited Content (Absolute)

Canonical ritual units MUST NOT contain:

* Translation
* Explanation
* Symbolism
* Performance advice
* Modern ritual adaptation
* Sampradāya-specific theology

All such material belongs to **Editorial Units**.

---

## 17. Stability Guarantee

Once a ritual unit is locked:

* Its UID must not change
* Its text must not change
* Its boundaries must not change

Any improvement requires:

* New schema version, or
* New canonical pipeline

---

## 18. Relationship to Other Schemas

| Schema                  | Relationship                       |
| ----------------------- | ---------------------------------- |
| canonical-mantra.schema | Ritual units may reference mantras |
| canonical-sutra.schema  | Ritual units may be sutra-based    |
| editorial-unit.schema   | Commentary and guidance            |
| knowledge-layer-model   | Semantic expansion                 |

---

## 19. Final Principle

> **A ritual unit preserves what is done — not why it is done.**

Meaning, symbolism, theology, and pedagogy are deferred by design.

---

**Status:** LOCKED (v1.0.0)

This schema is foundational for all ritual corpora in the Vedic Library.

A few important things to highlight for your own confidence (no action needed right now):

Why this document is right and future-safe

It clearly separates:

ritual unit (canonical, what the text says)

from ritual performance (editorial, how it is done)

It works equally well for:

Śrauta & Gṛhya rituals

Āgama / Tantra

Dharmaśāstra procedural injunctions

It does not assume verse / sūtra / mantra — those are linked, not embedded.

It respects your core principle:

canonical text preserves structure and authority, not pedagogy

Especially important architectural wins

unit_type gives just enough classification without theology.

mantras are references, not copies → no duplication, no drift.

constraints are only what the text explicitly states (no inference).

The schema scales cleanly to:

yajña steps

saṁskāras

nyāsa sequences

vrata procedures

temple rituals

This file now cleanly sits alongside:

canonical-verse.schema.md

canonical-sutra.schema.md

canonical-mantra.schema.md

and completes the canonical unit family.
