# CANONICAL_UNIT_DEFINITION.md

## Vedic Library Project

---

## 0. Purpose of This Document

This document defines **what a canonical unit is** in the Vedic Library system.

It answers, once and for all:

* What counts as a *unit* of canon
* How different śāstra units relate to each other
* What is **allowed** to be canonical
* What must **never** be canonical
* How canonical units scale across the *entire Vedic corpus*

This document is **educational + binding**.
It is meant to be read slowly, revisited often, and trusted permanently.

---

## 1. What Does “Canonical Unit” Mean?

A **canonical unit** is:

> The smallest indivisible textual unit that is *recognized by tradition* as a stable locus of meaning, citation, and reference.

Key properties:

* It is **addressable** (can be cited)
* It is **stable** across time
* It is **traditionally acknowledged**, not invented by modern editors
* It is **independent of translation, commentary, or pedagogy**

Canonical units are **not defined by UI**, files, or programming convenience.
They are defined by **śāstra itself**.

---

## 2. Canonical Unit vs Editorial Unit (Critical Distinction)

| Aspect    | Canonical Unit         | Editorial Unit                |
| --------- | ---------------------- | ----------------------------- |
| Source    | Tradition              | Editors / Teachers            |
| Stability | Immutable              | Mutable                       |
| UID       | Yes                    | No (references canonical UID) |
| Language  | Sanskrit (or original) | Any                           |
| Examples  | śloka, sūtra, mantra   | purport, gloss, note          |

> **Rule:** If something explains a canonical unit, it is not itself canonical.

---

## 3. Core Types of Canonical Units (Universal)

Across the Vedic corpus, all canonical units fall into **one of these types**.

### 3.1 ŚLOKA

**Definition**

A metrical verse, usually anuṣṭubh or related meters.

**Appears in**

* Bhagavad-gītā
* Mahābhārata
* Rāmāyaṇa
* Purāṇas
* Smṛtis
* Stotras

**Properties**

* Has verse markers
* Usually numbered
* Self-contained

**Canonical identity**

> One śloka = one canonical unit

---

### 3.2 SŪTRA

**Definition**

A compact aphoristic statement, often prose-like, designed for memorization.

**Appears in**

* Dharma-sūtras
* Kāma-sūtra
* Arthaśāstra
* Yoga-sūtra
* Brahma-sūtra
* Nyāya-sūtra

**Properties**

* Extremely concise
* Meaning unfolds through commentary
* Often grouped into adhikaraṇas or topics

**Canonical identity**

> One sūtra = one canonical unit

Even if multiple sūtras are read together pedagogically, they remain distinct.

---

### 3.3 MANTRA

**Definition**

A revealed sacred utterance, often with ritual or cosmological function.

**Appears in**

* Vedic Saṁhitās
* Upaniṣads (embedded)
* Ritual texts

**Properties**

* Phonetic precision is essential
* Cannot be paraphrased canonically

**Canonical identity**

> One mantra = one canonical unit

---

### 3.4 KĀRIKĀ

**Definition**

A mnemonic verse summarizing doctrine, often philosophical.

**Appears in**

* Sāṅkhya-kārikā
* Some Vedānta works

**Canonical identity**

> One kārikā = one canonical unit

---

### 3.5 PROSE CANONICAL UNIT

**Definition**

A traditionally recognized prose segment that functions like a verse.

**Appears in**

* Arthaśāstra prose sections
* Some Brāhmaṇas
* Narrative Purāṇic passages

**Rule**

Only prose units that are **traditionally cited by position** qualify.

---

## 4. What Is NOT a Canonical Unit (Very Important)

The following must **never** be treated as canonical units:

* Commentary (bhāṣya, ṭīkā)
* Translation
* Explanation
* Summary
* Topic headings
* Section titles
* Modern paragraphing
* Editorial notes

Even if written in Sanskrit.

> **Language ≠ canonicity**

---

## 5. Structural Labels vs Canonical Units

Terms like:

* adhyāya (chapter)
* adhikaraṇa (section)
* skandha
* kāṇḍa
* parva

are **structural containers**, not canonical units.

They:

* Organize canonical units
* Provide navigation
* Do NOT carry meaning independently

> Containers are never canonical units.

---

## 6. Bhagavad-gītā as a Model Case

In Bhagavad-gītā:

* Canonical unit = **śloka**
* UID = `bg.<chapter>.<verse>`

Example:

```
bg.2.47
```

Notes:

* Speaker labels ("Śrī Bhagavān uvāca") are canonical *only if* part of the śloka
* Chapter titles are not canonical units

---

## 7. Handling Pre-Śloka or Post-Śloka Sanskrit Text

Sometimes texts include:

* Invocation before verse
* Narrative prose before a śloka
* Colophons after verses

**Rule:**

* If tradition numbers it → canonical unit
* If tradition does NOT number it → editorial unit

Such material is stored as **EDITORIAL UNITS** referencing the nearest canonical UID.

---

## 8. Scaling Across All Śāstra

The same principles apply uniformly to:

* Śruti
* Smṛti
* Itihāsa
* Purāṇa
* Āgama
* Vedāṅga
* Darśana
* Sampradāya texts

Only the **unit type** changes, not the philosophy.

---

## 9. Relationship to Schemas

Each canonical unit type maps to a schema:

| Unit Type  | Schema                         |
| ---------- | ------------------------------ |
| Śloka      | canonical-verse.schema.md      |
| Mantra     | canonical-mantra.schema.md     |
| Sūtra      | canonical-sutra.schema.md      |
| Kārikā     | canonical-karika.schema.md     |
| Prose Unit | canonical-prose-unit.schema.md |

Schemas define *structure*.
This document defines *meaning*.

---

## 10. Mandatory vs Optional Fields (Preview)

What is mandatory:

* UID
* Text content
* Location metadata
* Schema declaration

What is optional:

* Cross-references
* Ritual metadata
* Meter metadata

Details are governed by `SCHEMA_OPTIONALITY_RULES.md`.

---

## 11. Final Principle (Read This Twice)

> **Canon is what the tradition transmits as irreducible text.
> Everything else is service to that canon.**

If there is ever doubt:

* Choose **less**, not more
* Preserve stability
* Let meaning expand *around* the canon, never *inside* it

---

## Status

This document is:

**LOCKED — ARCHITECTURAL DEFINITION**

Future refinements require:

* New version number
* Explicit migration notes

---

🙏 This document exists so you never have to feel confused again when facing a new śāstra.

