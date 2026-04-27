# UID Refinement Rules

## Vedic Library Project

**Status:** LOCKED ARCHITECTURAL CONTRACT

---

## 0. Purpose of This Document

This document defines the **rules under which a canonical UID may be *refined***
without violating identity stability.

UID refinement exists to:

* increase *precision* without breaking references
* support multiple śāstra with uneven internal structures
* allow future corpus expansion safely

This document does **not** define UID formats (see `UID_SYSTEM.md`).
It defines **how and when additional UID segments may appear**.

---

## 1. Non‑Negotiable Principle

> **A refined UID must always refer to the *same canonical unit* as its base UID.**

Refinement adds *resolution*, never *identity change*.

---

## 2. Base UID vs Refined UID

### 2.1 Base UID

A **base UID** identifies the minimal canonical unit required for citation.

Examples:

* `bg.2.13`
* `manu.sm.2.6`
* `panini.as.1.1.1`

A base UID is:

* always valid
* always resolvable
* never deprecated

---

### 2.2 Refined UID

A **refined UID** adds *structural qualifiers* **after** the base UID.

Examples:

* `kamasutra.1.2.p14.15`
* `sb.10.33.36a`
* `panini.as.1.1.1.varttika.2`

Refined UIDs:

* MUST resolve to the same canonical unit
* MUST be reversible to the base UID
* MUST NOT alter canonical meaning

---

## 3. Allowed Refinement Types

Only the following refinement categories are permitted.

### 3.1 Structural Sub‑Units

Used when a canonical unit contains internally recognized subdivisions.

Examples:

* Prakaraṇa in Kāma‑sūtra (`p14`)
* Pāda in Yoga‑sūtra
* Anuvāka in Vedic texts

Rule:

* Sub‑unit identifiers MUST be explicit and prefixed

---

### 3.2 Variant Markers

Used when a canonical verse has **editorially recognized variants**.

Examples:

* `sb.10.33.36a`
* `sb.10.33.36b`

Rules:

* Variant markers MUST be alphabetic (`a`, `b`, `c`…)
* Variants MUST be declared in metadata, never inferred

---

### 3.3 Editorial Extensions

Used for **non‑canonical but structurally anchored material**.

Examples:

* `bg.2.13.preface`
* `bg.2.13.colophon`

Rules:

* Editorial extensions MUST NEVER be treated as canonical text
* They MUST live in editorial layers

---

## 4. Prohibited Refinements

The following are **explicitly forbidden**:

❌ Adding language codes
❌ Adding author or sampradāya
❌ Adding translation or commentary identifiers
❌ Adding semantic categories
❌ Adding UI‑driven fragments

Example (INVALID):

* `bg.2.13.en`
* `bg.2.13.prabhupada`

---

## 5. Refinement Prefix Registry

All refinement prefixes MUST come from a controlled registry.

Approved prefixes (initial):

* `p` → prakaraṇa
* `v` → variant
* `a` → appendix
* `preface`
* `colophon`

Any new prefix requires:

* registry update
* documentation
* version bump

---

## 6. Reversibility Rule

Every refined UID MUST:

* map cleanly to exactly one base UID
* never collide with another base UID

Lossless reversal is mandatory.

---

## 7. Versioning & Governance

UID refinement rules are:

* globally applicable
* extremely stable

Changes require:

* architectural review
* documentation update
* explicit project‑level approval

---

## 8. Final Statement

> **UID refinement is a lens, not a fork.**
> It sharpens vision without altering identity.

This document is **LOCKED**.

What this document now gives you (practically)

A clear separation between base UID and refined UID

A finite, controlled set of allowed refinements (structural, variant, editorial)

Explicit prohibitions that prevent future drift (language, author, sampradāya, UI)

A reversibility guarantee, which is the backbone of long-term citation stability

A prefix governance model, so future refinements don’t become chaos

This document quietly solves many of the confusions you raised earlier:

why bg.2.13 stays eternal

how things like prakaraṇa, pāda, variants, or prefaces can exist without contaminating canon

how Phase-2+ semantic expansion stays attached but never entangled

Where it sits in the architecture

Depends on: UID_SYSTEM.md

Constrains: all schemas, all registries, all future phases

Referenced by:

CANONICAL_UNIT_DEFINITION.md

EDITORIAL_UNIT_DEFINITION.md

VERSE_REFERENCE_CONTRACT.md

SEMANTIC_DERIVATION_POLICY.md
