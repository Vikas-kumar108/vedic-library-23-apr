
---

# 🧬 PIPELINE_REGISTRY.md

## Vedic Library — Data Pipeline Architecture

**Version:** 1.1.0
**Status:** 🟢 EVOLVING ARCHITECTURE (Versioned)
**Scope:** Bhagavad-gītā (reference implementation; architecture applies corpus-wide)

---

## 0. Purpose of This Document

This document defines the **authoritative data pipeline architecture** for the Vedic Library.

It answers **one question only**:

> **How textual data flows from raw sources into canonical, editorial, derivative, and index layers — safely and reproducibly.**

This document:

* **does define**

  * pipeline stages
  * layer boundaries
  * file placement responsibilities
  * regeneration rules

* **does NOT define**

  * canonical authority
  * textual normalization rules
  * schema field meanings
  * UID structure
  * UI behavior
  * interpretive policy

Those concerns are governed elsewhere.

This document **executes architecture** — it does not invent it.

---

## 1. Architectural Dependencies (Binding)

This pipeline is **subordinate to** the following LOCKED documents:

* `PROJECT_CONSTITUTION.md`
* `CANONICAL_TEXT_POLICY.md`
* `CANONICAL_UNIT_DEFINITION.md`
* `UID_SYSTEM.md`
* `SCHEMA_OPTIONALITY_RULES.md`
* `DATA_SCHEMA.md`

If a pipeline instruction conflicts with any of the above,
**the pipeline MUST be changed**, never the canon.

---

## 2. Core Pipeline Principles (Normative)

These principles govern all stages and scripts:

* Canonical text is immutable once locked
* Pipelines transform structure, never meaning
* Canonical layers are produced only by canonical pipelines
* Editorial Units organize meaning but do not redefine identity
* Derived layers never modify canonical text
* Verse Index is routing-only, never textual
* Absence is represented by absence, not null artifacts
* Every layer is independently regenerable
* Every layer has its own validator
* No pipeline step encodes UI assumptions

---

## 3. Data Layer Overview (Processing Order)

```
_raw
  → normalized
    → canonical
      → editorial-units
        → derivatives
          → index
```

**Important clarification**

* This order represents **processing flow**
* It does **not** represent authority
* Authority is defined constitutionally, not procedurally

Each layer is **strictly separated** and independently validated.

---

## 4. Raw Ingestion Layer (`_raw`)

### Purpose

To preserve **source fidelity** exactly as obtained.

### Example Path

```
data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/raw-json/
```

### Rules

* No normalization
* No correction
* No interpretation
* Provenance preserved verbatim

Raw data is **never authoritative**.
It exists solely for audit and reproducibility.

---

## 5. Normalized Source Layer (`normalized`)

### Purpose

To mechanically clean raw data without imposing canonical rules.

### Example Path

```
data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/normalized/
```

### Rules

* Whitespace normalization
* Encoding fixes
* Structural cleanup
* Grouped verses may exist if present in source

⚠️ Normalized files may represent verse groups
⚠️ Grouping reflects **source editorial structure**, not canonical identity

Normalized data **informs**, but never defines, canon.

---

## 6. Canonical Layer (`canonical`)

### Purpose

To store **canonical textual truth**.

### Path

```
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical/
```

### Files

```
bg.1.1.json
bg.1.2.json
...
```

### Schema

```
vedic-library.canonical.verse @ 1.0.0
```

### Rules (Non-Negotiable)

* One file per canonical unit
* Sanskrit only (Devanāgarī + mechanically derived IAST)
* No translations
* No commentary
* No editorial metadata
* No AI output
* Produced **only** by canonical intake pipelines

Canonical files define **textual truth**.

---

## 6.1 Canonical Realignment Stage (Stage-2.5)

### Purpose

To enforce **canonical textual consistency** after extraction.

Responsibilities:

* Normalize Devanāgarī verse markers
* Normalize IAST verse markers
* Regenerate IAST mechanically
* Ensure one-to-one verse alignment

### Governance Rules

* Stage-2.5 runs **exactly once per canonical corpus**
* It never changes verse identity
* It never alters meaning
* Canonical UIDs are preserved
* After lock, Stage-2.5 MUST NOT be re-run silently

---

## 7. Editorial Units Layer (`editorial-units`)

### Purpose

To define **authored semantic scope** without touching canon.

### Path

```
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/
derivatives/editorial-units/prabhupada/
```

### Example Files

```
bg.1.1.prabhupada.editorial-unit.json
bg.1.16-18.prabhupada.editorial-unit.json
```

### Schema

```
vedic-library.editorial.unit @ 1.0.0
```

### Rules

Editorial Units define:

* verse coverage
* author
* tradition
* derivative eligibility

They:

* may span multiple verses
* do not contain canonical text
* do not assert textual authority
* define **derivative scope and attribution**

---

## 8. Derivative Layers (`derivatives`)

### Purpose

To store **interpretive, linguistic, or explanatory material**.

### Root Path

```
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/
```

### Types

* translations
* synonyms
* exposition (purports, commentary)
* gloss
* principles
* skills
* guidance
* experimental drafts

### Governance Rules

* Derivatives never modify canonical text
* Derivatives reference canon via UID only
* **Published derivatives** require an Editorial Unit
* Draft / experimental derivatives must be explicitly marked
* Grouped verses share a single derivative file
* Absence of derivative = absence of file

---

## 8.1 Language Axis (Transitional State)

### Current State (Bhagavad-gītā Phase-1)

* Derivatives exist primarily in English
* Physical language directories may be collapsed
* Language is declared in metadata and index

### Future State (Multilingual)

```
derivatives/
  translations/
    en/
    hi/
    ...
```

### Governance Rule

* No retroactive filesystem reshuffling
* Language expansion requires:

  * migration script
  * index update
  * version bump

---

## 9. Verse Index Layer (`index`)

### Purpose

Routing, navigation, and availability mapping.

### Path

```
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/index/verse/
```

### Files

```
bg.1.1.index.json
bg.1.2.index.json
...
```

### Schema

```
vedic-library.index.verse @ 1.0.0
```

### Rules

* One index file per canonical unit
* Contains:

  * canonical UID reference
  * editorial unit references
  * derivative availability flags
* Contains **no text**

Index defines **navigation**, not meaning.

---

## 10. Validators

### Location

```
scripts/validators/
```

### Validator Set

* validate_canonical_verse.py
* validate_editorial_unit.py
* validate_translation.py
* validate_synonyms.py
* validate_exposition.py
* validate_verse_index.py

### Rules

* Validators check **structure**, not meaning
* Validators do not regenerate data
* Validation failures are hard errors

---

## 11. Regeneration Policy

### Safe to Regenerate

* Normalized data
* Editorial Units
* Derivatives
* Verse Index

### Never Regenerate Without Scholarly Review

* Canonical text
* Canonical schemas

---

## 12. Expansion Policy

This pipeline architecture applies uniformly to:

* Upaniṣads
* Purāṇas
* Dharmaśāstra
* Darśana texts
* Sampradāya corpora

Only **paths, unit schemas, and editorial units change**.

---

## 13. Final Authoritative Principle

**Canonical text defines truth.**
**Editorial Units define scope.**
**Derivatives express interpretation.**
**Index defines navigation.**
**Pipelines enforce discipline.**

---

### Status Declaration

`PIPELINE_REGISTRY.md`
Category: **EVOLVING ARCHITECTURE (Versioned)**
Applies from: Phase-1 onward
Change policy: Version bump + migration note required

---

## Closing Reassurance

This pipeline is now:

* constitutionally safe
* schema-aligned
* Phase-2 ready
* AI-experimentation compatible
* future-proof


