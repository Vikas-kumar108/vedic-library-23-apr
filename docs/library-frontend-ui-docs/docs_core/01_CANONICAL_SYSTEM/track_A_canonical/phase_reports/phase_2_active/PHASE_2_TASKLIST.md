# 🧱 PHASE 2 — TASKLIST
## Canonical Expansion Phase
## Vedic Library Project

---

## Phase Declaration

- **Phase:** 2
- **Designation:** Canonical Expansion
- **Depends on:** Phase-1 (v1.0-pilot) — LOCKED
- **Status:** Planned
- **Nature:** Architectural / Canonical (NOT interpretive)

This tasklist is derived directly from PHASE_2_CANONICAL_EXPANSION_PLAN.md
and must not exceed its scope.

---

## 1. Phase-2 Initialization Tasks

### 1.1 Phase Transition Declaration
- [ ] Confirm `PHASE_2_CANONICAL_EXPANSION_PLAN.md` is finalized and locked
- [ ] Create this file: `PHASE_2_TASKLIST.md`
- [ ] Add Phase-2 banner note in root `README.md`

**Completion signal:**  
Phase-2 exists as a formally declared phase.

---

### 1.2 Phase-1 Lock Confirmation
- [ ] Confirm Phase-1 documents are locked
- [ ] No edits to Phase-1 UI snapshot
- [ ] No edits to Phase-1 canonical BG data

**Completion signal:**  
Phase-1 is immutable.

---

## 2. Śāstra Selection for Phase-2 (Canonical Only)

### 2.1 Select Canonical Expansion Set
Choose **at least one** from each category:

- [ ] One **Sūtra-based text** (e.g. Yoga-sūtra / Kāma-sūtra)
- [ ] One **Mantra-based text** (e.g. select Upaniṣad)
- [ ] One **Mixed / Prose text** (e.g. Smṛti or Purāṇa sample)

⚠️ Selection must prioritize **structural diversity**, not popularity.

**Completion signal:**  
A written list of Phase-2 śāstra targets exists.

---

### 2.2 Declare Canonical Scope per Text
For each selected śāstra:
- [ ] Define canonical unit type (verse / sūtra / mantra / ritual)
- [ ] Declare structural hierarchy (chapter, section, etc.)
- [ ] Map to UID grammar

**Completion signal:**  
Each text has a documented canonical structure.

---

## 3. Canonical Intake & Normalization

### 3.1 Source Acquisition (Raw)
- [ ] Identify trusted textual source(s)
- [ ] Preserve raw form separately (no overwrites)
- [ ] Record provenance

**Rules:**
- No interpretation
- No translation
- No editorial smoothing

---

### 3.2 Canonical Normalization Pipeline
For each text:
- [ ] Normalize script (as per Canonical Text Policy)
- [ ] Normalize numbering and segmentation
- [ ] Apply canonical markers (where applicable)
- [ ] Generate canonical transliteration (if required)

**Completion signal:**  
Text conforms to canonical policy and is reproducible.

---

## 4. Canonical Unit Schema Validation

### 4.1 Apply Existing Canonical Schemas
- [ ] Validate verses against `canonical-verse.schema.md`
- [ ] Validate sūtras against `canonical-sutra.schema.md`
- [ ] Validate mantras against `canonical-mantra.schema.md`
- [ ] Validate ritual units if applicable

**Completion signal:**  
Each canonical file validates cleanly.

---

### 4.2 Schema Generalization (If Required)
- [ ] Identify schema gaps exposed by new texts
- [ ] Propose schema clarifications (NOT breaking changes)
- [ ] Update schema docs with version notes

⚠️ No schema breaking allowed in Phase-2.

---

## 5. UID System Stress Testing

### 5.1 UID Generation
- [ ] Generate UIDs for all Phase-2 canonical units
- [ ] Ensure UID encodes **location only**
- [ ] Confirm no semantic leakage

---

### 5.2 UID Validation
- [ ] Validate UID uniqueness
- [ ] Validate cross-corpus consistency
- [ ] Validate human readability

**Completion signal:**  
UID system holds across multiple śāstra.

---

## 6. Data Schema Alignment

### 6.1 DATA_SCHEMA.md Alignment
- [ ] Confirm canonical vs derivative separation
- [ ] Confirm canonical immutability
- [ ] Confirm schema optionality rules are respected

---

### 6.2 Cross-Schema Consistency
- [ ] Verse schema aligns with sūtra schema
- [ ] Mantra schema aligns with verse schema
- [ ] Ritual schema does not leak interpretation

**Completion signal:**  
All schemas coexist without contradiction.

---

## 7. Reader & Routing Expansion (Still Minimal)

### 7.1 Routing Support
- [ ] Support routing for multiple śāstra
- [ ] Support different canonical unit types
- [ ] Maintain UID-based routing

---

### 7.2 Reader UI Stability
- [ ] Single-column reading preserved
- [ ] No pedagogical UI introduced
- [ ] No commentary toggles
- [ ] No knowledge panels

**Completion signal:**  
Reader remains a reader.

---

## 8. Explicit Exclusion Enforcement

Verify absence of:
- [ ] Commentary
- [ ] Translation layers 
      (except where the śāstra itself is canonically bilingual or non-Sanskrit by tradition,
       in which case both forms are treated as canonical text, not translation)
- [ ] Knowledge layers (concepts, entities, principles)
- [ ] Teaching UX
- [ ] Search
- [ ] Analytics
- [ ] Community features

**Completion signal:**  
Phase-2 purity is intact.

---

## 9. Documentation & Reporting

### 9.1 Update / Validate Documents
- [ ] `CANONICAL_TEXT_POLICY.md`
- [ ] `CANONICAL_INTAKE_AND_NORMALIZATION.md`
- [ ] `UID_SYSTEM.md` (clarifications only)
- [ ] Canonical schema docs

---

### 9.2 Phase-2 Completion Report
- [ ] Write `PHASE_2_COMPLETION_REPORT.md`
- [ ] Document lessons learned
- [ ] Declare readiness for Phase-3

---

## 10. Phase-2 Completion Checklist (Final)

Phase-2 is complete only when **all** are true:

- [ ] Multiple śāstra ingested canonically
- [ ] Multiple canonical unit types validated
- [ ] UID system proven universal
- [ ] Reader stable across corpora
- [ ] No commentary present
- [ ] All documentation updated

---

## Closing Principle

> **Phase-2 proves that the system can hold śāstra.**  
> **Phase-3 will prove that the system can explain without distortion.**

Until then, restraint is success.

