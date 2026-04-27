
# **`docs/schemas/canonical-sutra.schema.md`**

This document is written as a **first-class canonical contract**, not a casual schema.
It is intentionally detailed, explanatory, and conservative, because **sūtra texts are structurally different from verses**, and confusing the two is one of the most common long-term architectural failures in śāstra digitization.

This schema is aligned with and depends on:

* `CANONICAL_TEXT_POLICY.md`
* `CANONICAL_UNIT_DEFINITION.md`
* `SCHEMA_OPTIONALITY_RULES.md`
* `UID_SYSTEM.md`
* `UID_REFINEMENT_RULES.md`
* `CANONICAL_IDENTITY_DECISION_FRAMEWORK.md`

---

# 📜 Canonical Sūtra Schema

## `vedic-library.canonical.sutra`

---

## 0. Purpose of This Schema

This document defines the **structural contract** for a **canonical sūtra unit** in the Vedic Library system.

A *canonical sūtra* represents:

> A **compact, aphoristic, non-metrical śāstric unit**
> whose authority lies in **ordered sequence and logical dependence**,
> not in poetic meter.

This schema answers:

* What *exactly* a canonical sūtra file contains
* How a sūtra differs from a verse at the data level
* How sūtra identity is preserved across traditions and editions
* How this unit scales across Dharma-sūtra, Yoga-sūtra, Brahma-sūtra, Kāma-sūtra, etc.

---

## 1. What a Canonical Sūtra Is (And Is Not)

### 1.1 Definition

A **canonical sūtra** is:

* a terse, rule-like textual unit
* typically prose (not metrical)
* dependent on **sequence** for meaning
* structurally minimal by design

Examples:

* Yoga-sūtra
* Brahma-sūtra
* Dharma-sūtra
* Kāma-sūtra
* Arthaśāstra (in sūtra style)

---

### 1.2 A Canonical Sūtra Is NOT

* a verse (śloka, gāthā, kārikā)
* a commentary (bhāṣya, ṭīkā)
* a paragraph or prose block
* a pedagogical explanation
* a UI-segmented chunk

If a unit is poetic or metrical → **use canonical-verse.schema**
If a unit is prose but discursive → **do NOT make it canonical**

---

## 2. Schema Identity

```json
"schema": {
  "name": "vedic-library.canonical.sutra",
  "version": "1.0.0"
}
```

### Rules

* Mandatory for every canonical sūtra file
* Schema version permanently binds the file
* Structural change → new schema version only

---

## 3. Canonical Identity (UID)

### 3.1 UID Field

```json
"uid": "yoga.sutra.1.2"
```

or

```json
"uid": "kamasutra.1.2.p3.15"
```

### Rules

* UID is mandatory and immutable
* UID encodes **location only**
* UID NEVER encodes:

  * language
  * author
  * commentary
  * interpretation
  * pedagogy
* UID structure must match a registered pattern in `UID_SYSTEM.md`

UID refinement rules (e.g. prakaraṇa handling) are governed by:
👉 `UID_REFINEMENT_RULES.md`

---

## 4. Work Declaration (Corpus Placement)

```json
"work": {
  "corpus": "darsana",
  "text": "yoga-sutra",
  "section": null,
  "subwork": null
}
```

or

```json
"work": {
  "corpus": "smrti",
  "text": "kama-sutra",
  "section": "adhikarana-1",
  "subwork": null
}
```

### Rules

* All four keys exist structurally
* Some values may be `null`
* Values come from controlled vocabularies
* No aliases or UI labels permitted

This allows:

* cross-corpus consistency
* future re-indexing
* reliable automation

---

## 5. Location Object (Sequential Authority)

```json
"location": {
  "adhyaya": 1,
  "sutra": 2
}
```

or (when applicable):

```json
"location": {
  "adhikarana": 1,
  "adhyaya": 2,
  "prakarana": 3,
  "sutra": 15
}
```

### Rules

* All values MUST be integers
* Location expresses **sequence**, not meaning
* Optional structural levels (e.g. prakaraṇa) are allowed
* Absence of optional levels MUST NOT break identity

This follows:
👉 `SCHEMA_OPTIONALITY_RULES.md`

---

## 6. Canonical Text Block (Primary Authority)

### 6.1 Text Object

```json
"text": {
  "script": "devanagari",
  "content": "योगश्चित्तवृत्तिनिरोधः"
}
```

### Rules (Strict)

* Script MUST be `"devanagari"`
* Content MUST contain:

  * exactly one sūtra
  * no translations
  * no commentary
* No verse markers
* No punctuation normalization beyond policy
* Line breaks discouraged unless attested in sources

Why Devanāgarī?

> Canonical authority is anchored in **primary script**,
> not in convenience or availability.

---

## 7. Transliteration Block (Canonical-Aligned)

```json
"transliteration": {
  "scheme": "iast",
  "content": "yogaś citta-vṛtti-nirodhaḥ"
}
```

### Rules

* Mandatory
* Generated mechanically from Devanāgarī
* One-to-one character correspondence
* No interpretive spacing or glossing

IAST is **derivative**, not authoritative.

---

## 8. Source & Provenance (Audit Trail)

```json
"source": {
  "pipeline": "yoga-sutra",
  "stage": "2.5",
  "script": "s25_normalize_sutra.py",
  "script_version": "1.1.0",
  "derived_from": [
    "critical-edition/yoga-sutra.txt"
  ]
}
```

### Rules

* Mandatory
* Must reflect real pipeline history
* Required for scholarly auditability
* Must never contain opinion or interpretation

---

## 9. What This Schema Explicitly Forbids

A canonical sūtra file MUST NOT contain:

❌ translations
❌ commentary or bhāṣya
❌ gloss or explanation
❌ semantic tags
❌ principles or skills
❌ editorial notes
❌ UI metadata

All such material belongs to **editorial or knowledge layers**.

---

## 10. Relationship to Other Canonical Units

| Unit              | Schema                            |
| ----------------- | --------------------------------- |
| Verse (metrical)  | `canonical-verse.schema.md`       |
| Mantra (Vedic)    | `canonical-mantra.schema.md`      |
| Ritual injunction | `canonical-ritual-unit.schema.md` |
| Lexeme            | `canonical-lexeme.schema.md`      |

Never mix schemas to “simplify” implementation.

---

## 11. Optionality Rules

This schema obeys:

👉 `SCHEMA_OPTIONALITY_RULES.md`

Summary:

* `uid`, `work`, `location`, `text`, `transliteration`, `source`, `schema` → **MANDATORY**
* Structural sub-levels (adhikaraṇa, prakaraṇa) → **OPTIONAL BUT REGULATED**
* Optionality must be **explicit**, never inferred

---

## 12. Stability & Locking

Once a canonical sūtra file:

* conforms to this schema
* passes validation
* is declared locked

Then:

> **It MUST NEVER be modified.**

Corrections require:

* new pipeline run
* or new schema version
* never silent edits

---

## 13. Status

* Category: **LOCKED ARCHITECTURAL CONTRACT**
* Scope: **All sūtra-style śāstra**
* Change policy: **Versioned only**

---

## 14. Closing Principle

> **A sūtra is not a sentence.
> It is a position in a chain of reasoning.
> Preserve the chain — everything else may evolve.**

---

