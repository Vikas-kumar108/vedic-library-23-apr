# Phase 0 — Foundation & Architectural Freeze

Phase 0 of the **Vedic Library Project** establishes the
**non-negotiable foundation** upon which all future phases depend.

This phase is not about features, UI, users, or performance.
It is about **thinking correctly before building anything**.

---

## 1. Purpose of Phase 0

Phase 0 exists to ensure that:

- canonical textual data is stable
- identities (UIDs) are correct and permanent
- editorial authority is modeled accurately
- derivative layers are cleanly separated
- pipelines are deterministic
- validation is enforceable
- future growth does not corrupt foundations

Once Phase 0 is complete, **architecture is frozen**.

---

## 2. What Phase 0 Contains

Phase 0 delivers the following foundational layers:

### Canonical Layer
- Canonical verse data (verse-atomic)
- Devanāgarī and IAST text
- Stable UIDs
- Schema validation

### Editorial Layer
- Editorial Unit model
- Support for single-verse and multi-verse coverage
- Author, tradition, and scope metadata

### Derivative Layers
- Translations
- Word-for-word synonyms
- Exposition (purport / commentary)
- All linked via Editorial Units, never embedded

### Routing Layer
- Verse Index files
- Deterministic mapping: verse → editorial units
- No content duplication

### Pipelines & Validation
- Source ingestion
- Normalization stages
- Canonical extraction
- Migration scripts (M1–M5)
- Validator suite for all schemas

---

## 3. What Phase 0 Explicitly Excludes

Phase 0 does **not** include:

- frontend or UI
- backend services
- databases
- authentication
- search
- users or permissions
- AI or inference
- performance optimization

Any such work before Phase 1 is a violation of scope.

---

## 4. Architectural Guarantees

After Phase 0:

- Canonical data will not change casually
- UIDs will never be regenerated
- Schemas are enforced by validators
- Pipelines are documented and repeatable
- Legacy outputs are isolated and safe
- New contributors can reason about data without context loss

---

## 5. Governance Status

Phase 0 is:

- **Architecturally complete**
- **Foundationally frozen**
- **Safe to build upon**

Changes to Phase-0 artifacts require
explicit review and amendment, not iteration.

Refer to:
- `docs/constitution/PROJECT_CONSTITUTION_v2.md`
- `docs/architecture/PIPELINE_REGISTRY.md`

---

## 6. Relationship to Later Phases

- Phase 1 builds UI on top of Phase-0 data
- Phase 2 extends search and navigation
- Phase 3+ introduce education, courses, and multi-ācārya layers

No later phase is permitted to alter Phase-0 foundations.

---

## 7. Final Note

Phase 0 was intentionally slow.

That slowness is what enables speed, confidence,
and correctness in every phase that follows.

**Foundation precedes freedom.**

