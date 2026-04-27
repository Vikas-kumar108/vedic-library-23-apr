# Phase 0 — Executed Work Record
## Vedic Library Project

This document records **what was actually executed** during Phase 0.

It is a factual ledger derived from:
- `docs/architecture/PIPELINE_REGISTRY.md`
- existing scripts
- generated data artifacts
- validator outcomes

This file contains **no planning, no intent, and no future scope**.

---

## 1. Canonical Data Pipeline

### Stage 1 — Source Normalization
- **Input:** Vedabase Bhagavad-gītā JSON (raw)
- **Location:**  
  `data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/raw-json/`
- **Output:** Normalized JSON files
- **Output location:**  
  `data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/normalized/`
- **Result:**  
  All 700 Bhagavad-gītā verses normalized, including grouped verses
  (e.g. 1.16–18, 2.11–13, etc.)

---

### Stage 2 — Canonical Extraction
- **Input:** Normalized Vedabase data
- **Output:** One canonical JSON file per verse
- **Output location:**  
  `data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical/`
- **Schema:**  
  `vedic-library.canonical.verse @ 1.0.0`
- **Result:**  
  Canonical verse set created with stable UIDs (`bg.X.Y`)

---

### Stage 2.5 — Canonical Realignment
- **Purpose:**  
  Correct Devanāgarī numerals and IAST markers
- **Scope:**  
  Textual formatting only
- **Guarantee:**  
  Canonical verse identity and UID preserved
- **Result:**  
  Canonical Sanskrit layer finalized and frozen

---

## 2. Editorial Authority Pipeline

### Stage M1 — Editorial Unit Creation
- **Input:** Normalized Vedabase data
- **Output:** Editorial Unit files
- **Output location:**  
  `data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/editorial-units/prabhupada/`
- **Schema:**  
  `vedic-library.editorial.unit @ 1.0.0`
- **Result:**  
  Editorial Units created for all verses, including
  single-verse and multi-verse coverage (e.g. 1.16–18)

---

## 3. Derivative Migration Pipelines

### Stage M2 — Translation Migration
- **Source:** Normalized Vedabase data
- **Target:** Editorial Unit–based translation files
- **Output location:**  
  `data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/translations/en/prabhupada/`
- **Result:**  
  English translations migrated where available

---

### Stage M3 — Synonyms Migration
- **Source:** Normalized Vedabase data
- **Target:** Editorial Unit–based synonym files
- **Output location:**  
  `data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/synonyms/en/prabhupada/`
- **Result:**  
  Word-for-word synonym files created where available

---

### Stage M4 — Exposition (Purport) Migration
- **Source:** Normalized Vedabase data
- **Target:** Editorial Unit–based exposition files
- **Output location:**  
  `data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/exposition/en/prabhupada/`
- **Result:**  
  Purports migrated where they exist  
  (no files created for verses without purports)

---

## 4. Routing Layer

### Stage M5 — Verse Index Creation
- **Input:** Canonical verses + Editorial Units
- **Output:** One index file per verse
- **Output location:**  
  `data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/index/verse/`
- **Schema:**  
  `vedic-library.index.verse @ 1.0.0`
- **Result:**  
  All verses linked deterministically to relevant Editorial Units

---

## 5. Validation

The following validators were executed and passed:

- `validate_canonical_verse.py`
- `validate_editorial_unit.py`
- `validate_translation.py`
- `validate_synonyms.py`
- `validate_exposition.py`
- `validate_verse_index.py`

Validators enforce **structure and invariants**, not interpretive correctness.

---

## 6. Legacy Isolation

- Earlier Stage-3.1 outputs and intermediate files were moved to:
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/_legacy/

yaml
Copy code
- No legacy files participate in active pipelines

---

## 7. Execution Summary

Phase 0 successfully produced:

- Canonical Sanskrit verse corpus
- Editorial authority model
- Clean derivative layers
- Deterministic routing
- Full validation coverage

All outputs conform to `PIPELINE_REGISTRY.md`.

---

**End of Phase 0 — Executed Work Record**
