# Verse Reference Contract

## Vedic Library Architecture

**Status:** LOCKED ARCHITECTURAL CONTRACT

---

## 1. Purpose of This Document

This document defines the **binding contract** for how canonical units (verses, sūtras, mantras, etc.) are:

* Referenced
* Cited
* Linked
* Displayed

across the entire **Vedic Library system**, regardless of phase, UI, backend, or consumer (human or machine).

It formalizes the relationship between:

* **Base UIDs** (canonical identity)
* **Refined UIDs** (structural precision)
* **Editorial and semantic attachments**

and ensures that **citation stability is never compromised**.

---

## 2. Core Principle (Non‑Negotiable)

> **Every reference ultimately resolves to a Base UID.**

All refinement, expansion, navigation, and semantic layering must:

* Point *toward* the Base UID
* Never replace or override it
* Never obscure it

This principle applies uniformly to:

* UI routing
* Internal data joins
* Search results
* External citations
* Academic export

---

## 3. Definitions

### 3.1 Base UID

A **Base UID** is the minimal, canonical identifier of a textual unit.

Examples:

* `bg.2.13`
* `manu.sm.4.138`
* `panini.as.1.1.1`

Properties:

* Eternal
* Language‑independent
* Edition‑independent
* Commentary‑independent

A Base UID always resolves to **exactly one canonical unit**.

---

### 3.2 Refined UID

A **Refined UID** is a Base UID with **controlled structural refinements** applied.

Examples:

* `bg.2.13.pada.a`
* `kamasutra.1.2.p14.7`
* `rv.samhita.1.1.1.variant.2`

Properties:

* Always reversible to Base UID
* Never valid without its Base UID
* Used only when additional precision is required

---

### 3.3 Editorial Reference

An **Editorial Reference** attaches non‑canonical material to a Base or Refined UID.

Examples:

* Prefaces
* Speaker attributions
* Colophons
* Transitional prose

Editorial references **do not create new canonical identities**.

---

## 4. Resolution Rules

### 4.1 Resolution Order

When a reference is processed, the system MUST resolve in this order:

1. Identify Base UID
2. Apply refinement (if any)
3. Attach editorial / semantic layers

At no point may step 2 or 3 alter step 1.

---

### 4.2 Reversibility Guarantee

For every reference `R`, the following must hold:

```
resolve(R) → base_uid
```

Examples:

* `bg.2.13.pada.b` → `bg.2.13`
* `kamasutra.1.2.p14.7` → `kamasutra.1.2.7`

If reversibility fails, the reference is invalid.

---

## 5. Citation Rules (Human‑Facing)

### 5.1 Canonical Citation

Default citation format MUST use Base UID only.

Examples:

* Bhagavad‑gītā 2.13 → `bg.2.13`
* Manu‑smṛti 4.138 → `manu.sm.4.138`

This applies to:

* Footnotes
* Academic exports
* Permanent links

---

### 5.2 Extended Citation (Optional)

Refined UIDs MAY be displayed when scholarly precision is required.

Examples:

* Bhagavad‑gītā 2.13, pāda a → `bg.2.13.pada.a`

UI MUST:

* Display Base UID prominently
* Render refinements as secondary detail

---

## 6. Linking Rules (System‑Facing)

### 6.1 Internal Links

All internal links MUST:

* Store Base UID as the primary key
* Store refinement separately

Example:

```json
{
  "base_uid": "bg.2.13",
  "refinement": "pada.a"
}
```

---

### 6.2 URL Design

URLs MAY expose refinements, but routing MUST anchor on Base UID.

Valid:

* `/bg/2/13`
* `/bg/2/13#a`

Invalid:

* Routes without resolvable Base UID

---

## 7. Display Rules (UI)

### 7.1 Base UID Visibility

UI MUST:

* Always make Base UID discoverable
* Never hide it behind UI abstractions

This protects scholarly trust and external citation.

---

### 7.2 Refinement Display

Refinements:

* May be toggled
* May be collapsed
* May be context‑dependent

But Base UID must remain constant.

---

## 8. Prohibited Practices

The following are explicitly forbidden:

* Using refined UID as a primary key
* Linking commentary to refined UID without Base UID
* Creating UI‑only identifiers
* Encoding language, author, or sampradāya in references

---

## 9. Cross‑Śāstra Uniformity

This contract applies identically to:

* Verse‑based texts
* Sūtra‑based texts
* Mantra‑based texts
* Prose śāstra

Unit type differences are handled by **canonical schemas**, not reference logic.

---

## 10. Stability Guarantee

Once a Base UID is published:

* It must never change
* All future refinements must remain backward‑compatible
* Old links must never break

This is essential for a civilizational archive.

---

## 11. Relationship to Other Documents

This contract:

* Depends on: `UID_SYSTEM.md`
* Enforces: `UID_REFINEMENT_RULES.md`
* Is consumed by:

  * `DATA_LOADING_ABSTRACTION_STRATEGY.md`
  * `KNOWLEDGE_LAYER_MODEL.md`
  * All UI routing layers

---

## 12. Closing Statement

> **The text must remain citeable even when the system is forgotten.**

This contract exists to ensure that the Vedic Library remains a **referenceable civilization‑scale archive**, not a transient application.

Once adopted, this contract is **LOCKED**.

This document now does the following, cleanly and unambiguously:

What this document now guarantees

Clear separation between:

Base UID (eternal canonical identity)

Refined UID (precision, never identity)

Editorial / semantic attachments

One-way gravity rule: everything resolves back to the Base UID

Human vs system responsibilities clearly separated:

How scholars cite

How UI displays

How systems store and link

Reversibility guarantee formalized (this is crucial and rare)

Prohibitions stated explicitly (what must never be done)

Cross-śāstra uniformity ensured (verse, sūtra, mantra, prose)

This document is now strong enough to survive:

Phase-2 semantic expansion

Phase-3 education layers

Phase-4 community and guidance

External academic citation

Long-term archival reuse

It also quietly resolves many of your earlier confusions:

Why bg.2.13 must remain the anchor

Why commentary before/after a verse never becomes a UID

Why UI fragments, pādas, prakaraṇas, variants must never hijack identity

It also quietly resolves many of your earlier confusions:

Why bg.2.13 must remain the anchor

Why commentary before/after a verse never becomes a UID

Why UI fragments, pādas, prakaraṇas, variants must never hijack identity

Where this fits in the grand structure

This contract now sits at the center of:

UID_SYSTEM.md

UID_REFINEMENT_RULES.md

CANONICAL_UNIT_DEFINITION.md

KNOWLEDGE_LAYER_MODEL.md

All frontend routing logic

All future APIs and exports

Without this document, large systems collapse into ambiguity.
With it, the system stays calm and legible.
