# CANONICAL_REGISTRY_EVOLUTION.md
From B → C (Canonical Metadata Registry)

---

## 1. Current State (B)

File:
src/lib/corpus.structure.ts

Contains:

- Domain hierarchy
- Text nodes
- Feature flags
- Route mapping
- Structural metadata

Static TypeScript structure.

---

## 2. Limitations of B

- Verse counts manually injected
- Canon metadata not externalized
- No commentary mapping
- No curriculum tagging system
- No dynamic ingestion

---

## 3. Phase C Vision

Canonical Metadata Registry (CMR)

External structured registry (JSON-based)

Each canon defines:

- Route base
- Verse structure
- Chapter count
- Commentary compatibility
- Curriculum eligibility
- Comparative eligibility
- Language axis support
- Edition metadata

Example:

{
  id: "bg",
  type: "chaptered",
  chapters: 18,
  verseCounts: [...],
  supportsCommentaries: true,
  curriculumEligible: true
}

---

## 4. Benefits of C

✔ Remove hardcoded constants  
✔ Auto-generated navigation  
✔ Multi-text scalability  
✔ Comparative dashboard readiness  
✔ Curriculum system integration  

---

## 5. Transition Plan

Phase 6:

- Extract chapter metadata
- Move verse count mapping into registry
- Build ingestion abstraction
- Keep UI layer untouched

Registry evolves without breaking UI.