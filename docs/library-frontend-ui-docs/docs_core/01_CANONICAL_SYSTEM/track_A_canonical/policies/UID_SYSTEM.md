# 🔐 UID SYSTEM — Universal Identifier Framework

## Vedic Library Project

> **Status:** LOCKED ARCHITECTURAL CONTRACT
> **Scope:** Entire Vedic Library corpus (all śāstra, all phases)

---

## 0. Purpose of This Document

This document defines the **Universal Identifier (UID) system** used by the Vedic Library.

UIDs are the **spinal cord** of the entire system. They:

* Identify canonical textual units
* Enable stable references across languages, commentaries, editions, and technologies
* Allow the library to scale across **all Vedic corpora** without breaking

Once established, a UID **must never change**.

---

## 1. Core Principles (Non‑Negotiable)

1. **UID encodes location, not meaning**
   Meaning lives in commentary and knowledge layers, never in identity.

2. **UID is independent of:**

   * language
   * script
   * translation
   * commentary
   * sampradāya
   * edition
   * pedagogy

3. **UIDs are immutable**
   If scholarly understanding improves, *new layers adapt* — the UID does not.

4. **UIDs are human‑readable and machine‑parsable**

5. **One canonical unit = one UID**

---

## 2. UID Grammar (Global)

```
<work>.<structural-path>.<unit>
```

### Global Rules

* Separator: `.` (dot only)
* Lowercase ASCII only
* No spaces
* No diacritics
* No abbreviations added later
* No semantic adjectives

---

## 3. What a UID May and May Not Encode

### ✅ Allowed

* Textual position
* Structural hierarchy
* Canonical segmentation

### ❌ Forbidden

* Author names (unless the text itself is defined that way)
* Language codes (`en`, `hi`, etc.)
* Commentary identity
* Doctrinal stance
* Editorial interpretation

---

## 4. Canonical Unit Types

The UID system supports multiple **canonical unit types**, each defined by its own schema:

| Unit Type   | Example Texts         |
| ----------- | --------------------- |
| verse       | Gītā, Purāṇa, Smṛti   |
| mantra      | Veda, Upaniṣad        |
| sūtra       | Darśana, Dharma‑sūtra |
| ritual‑unit | Śrauta, Gṛhya, Āgama  |
| lexeme      | Nirukta, Vyākaraṇa    |

UID structure adapts to **textual tradition**, not vice‑versa.

---

## 5. Corpus‑Level UID Roots

Each major corpus has a **fixed root namespace**.

### Śruti

| Text               | UID Root   |
| ------------------ | ---------- |
| Ṛg‑veda            | `rv`       |
| Sāma‑veda          | `sv`       |
| Yajur‑veda (Śukla) | `yv.sukla` |
| Yajur‑veda (Kṛṣṇa) | `yv.krsna` |
| Atharva‑veda       | `av`       |

---

### Smṛti

| Domain       | Example Root   |
| ------------ | -------------- |
| Dharma‑sūtra | `apastamba.ds` |
| Dharma‑smṛti | `manu.sm`      |
| Artha‑śāstra | `kautilya.as`  |
| Kāma‑śāstra  | `kamasutra`    |
| Nīti         | `pancatantra`  |

---

### Itihāsa

| Text          | UID Root               |
| ------------- | ---------------------- |
| Rāmāyaṇa      | `ram`                  |
| Mahābhārata   | `mbh`                  |
| Bhagavad‑gītā | `bg` (special, frozen) |

---

### Purāṇa

| Text             | UID Root        |
| ---------------- | --------------- |
| Bhāgavata Purāṇa | `sb`            |
| Viṣṇu Purāṇa     | `vp`            |
| Liṅga Purāṇa     | `lp`            |
| Devī‑Bhāgavata   | `devibhagavata` |

---

### Vedāṅga

| Domain    | Root              |
| --------- | ----------------- |
| Vyākaraṇa | `panini.as`       |
| Nirukta   | `nirukta`         |
| Chandas   | `pingala.chandas` |
| Jyotiṣa   | `vedanga.jyotisa` |

---

### Darśana

| Text         | Root           |
| ------------ | -------------- |
| Nyāya‑sūtra  | `nyaya.sutra`  |
| Yoga‑sūtra   | `yoga.sutra`   |
| Brahma‑sūtra | `brahma.sutra` |

---

### Āgama / Tantra

| Domain          | Root                |
| --------------- | ------------------- |
| Pāñcarātra      | `pancaratra`        |
| Śaiva Siddhānta | `kamika.ag`         |
| Śākta Tantra    | `tantraraja.tantra` |

---

### Sampradāya Canon (when text itself is canonical)

| Text                | Root          |
| ------------------- | ------------- |
| Caitanya‑caritāmṛta | `cc`          |
| Jaiva‑dharma        | `jaivadharma` |
| Hari‑bhakti‑vilāsa  | `hbv`         |

Commentaries **on these texts** never alter the UID.

---

## 6. Structural Patterns (Examples)

### Verse‑Based

```
bg.2.13
sb.7.7.19
manu.sm.2.6
```

### Sūtra‑Based

```
yoga.sutra.1.2
panini.as.1.1.1
```

### Mantra‑Based

```
rv.samhita.1.1.1
av.samhita.3.2.4
```

### Extended Structures (Optional Levels)

```
kamasutra.1.2.p14.7
mbh.bhisma.25.10
```

Optional levels are governed by **SCHEMA_OPTIONALITY_RULES.md**.

---

## 7. Bhagavad‑gītā Special Rule (Explicit)

```
bg.<chapter>.<verse>
```

Why:

* Universally cited this way
* Stable across all traditions
* Independent of Mahābhārata parva numbering

Even though it lives inside Mahābhārata, it has a **stand‑alone UID root**.

---

## 8. Commentary, Translation & Knowledge Layers

All non‑canonical material **references** a UID.

Example:

```json
{
  "ref": "bg.2.13",
  "type": "commentary",
  "author": "Śaṅkara"
}
```

UIDs are **never extended** to encode commentary identity.

---

## 9. UID Governance & Change Policy

### UID may be introduced when:

* a new canonical text enters the library
* a previously uncatalogued śāstra is added

### UID may NEVER change because of:

* better scholarship
* new translations
* new commentaries
* UI or routing decisions

Any mistake requires **registry correction**, not UID mutation.

---

## 10. Relationship to Other Documents

This document is authoritative for identity.

It works together with:

* `CANONICAL_TEXT_POLICY.md`
* `CANONICAL_UNIT_DEFINITION.md`
* `SCHEMA_OPTIONALITY_RULES.md`
* `canonical-*.schema.md`
* `UID_REGISTRY_*.json`

If a conflict arises, **this document wins** on identity questions.

---

## 11. Closing Principle

> **Texts may be debated.**
> **Meanings may evolve.**
> **Interpretations may differ.**
>
> **Identity must not move.**

This UID system exists so that the Vedic Library can endure
not just technologically, but *civilizationally*.

🕉️

placed it in the canvas as a LOCKED ARCHITECTURAL CONTRACT covering the entire Vedic Library corpus—Śruti to Sampradāya, canonical units to commentary layers.

What this document now gives you (very important)

A single, authoritative definition of identity for the whole project

Clear separation of:

identity (UID)

structure (schemas)

meaning & expansion (knowledge layers)

Explicit handling of:

Bhagavad-gītā as a special canonical case (bg.x.y)

Optional vs required structural levels

Sūtra, mantra, verse, ritual-unit distinctions

A foundation that will not break when you add:

hundreds of śāstra

multiple sampradāyas

deep semantic expansions (entities, principles, skills, courses, etc.)

Most importantly:
👉 this UID system is now strong enough to outlive all UI, backend, and even data-format changes.
