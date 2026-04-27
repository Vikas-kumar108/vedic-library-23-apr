# B4 — Corpus Navigation Architecture

## Context

Current system renders individual scripture routes:

    /bg/[chapter]/[verse]

Navigation exists only linearly (Previous / Next).

There is no visible structural representation of the Vedic corpus.

---

## Objective

Introduce a scalable, corpus-aware navigation layer:

- Left collapsible tree
- Hierarchical structure
- Multi-corpus capable
- Dynamic ingestion ready

---

## Design Philosophy

Navigation must reflect canonical hierarchy:

Corpus
  → Text
    → Section
      → Subwork
        → Chapter
          → Verse

Example:

itihasa
  └─ mahabharata
       └─ bhisma-parva
            └─ bhagavad-gita
                 ├─ Chapter 1
                 ├─ Chapter 2
                 └─ ...

---

## Architectural Requirements

1. Navigation must NOT hardcode Bhagavad-gītā.
2. It must read from structured metadata.
3. It must scale to:
   - Purāṇa
   - Śruti
   - Smṛti
   - Darśana
4. It must support:
   - Collapse / Expand
   - Active route highlighting
   - Future search integration

---

## Phase B4.1

Implement static corpus tree for Bhagavad-gītā only,
but design generically.

This ensures:

- UI foundation
- Scalable abstraction
- No refactor later

---

## Future Evolution (B4.3+)

- Dynamic tree generated from registry
- Lazy loading
- Supabase integration
- User bookmarks
- Recently visited
