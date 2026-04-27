# CORPUS_TREE_ARCHITECTURE_STATUS.md
Vedic Library — Corpus Tree Architecture Status

---

# 1. Purpose of This Document

This document records the **current implementation and future evolution plan**
for the **Corpus Tree navigation system** used in the Vedic Library platform.

The goal is to preserve architectural clarity so that future development
can evolve the system without losing the reasoning behind the current design.

This document explains:

• how the current sidebar corpus tree works  
• why it was implemented this way  
• what stage of the architecture it belongs to  
• how it will evolve in the future  

---

# 2. Current Sidebar System

The left navigation panel of the Vedic Library is implemented through the
component:

src/components/CorpusTree.tsx
This component renders the canonical navigation tree for the library.

The tree is built from structured metadata rather than hardcoded UI logic.

---

# 3. Current Data Source

The navigation structure is currently defined in:

src/lib/corpus.structure.ts
This file exports a constant:

CORPUS_STRUCTURE
Example simplified structure:

Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā
The UI component reads this structure and renders it recursively.

---

# 4. Current Chapter and Verse Injection

While the top-level corpus hierarchy is defined in the registry file,
chapters and verses are generated dynamically.

The chapter metadata currently comes from:

src/lib/constants.ts
Example structure:

CHAPTERS = [ { id: 1, verseCount: 47 }, { id: 2, verseCount: 72 }, ... ]
The CorpusTree component then generates verse links dynamically:

Chapter → Verse 1..N
---

# 5. Current System Classification

The current system is **partially dynamic**.

| Layer | Source | Dynamic Status |
|------|------|------|
Corpus hierarchy | corpus.structure.ts | Hardcoded registry |
Chapter structure | constants.ts | Config-driven |
Verse navigation | Generated from verseCount | Fully dynamic |

Summary:

Corpus → Hardcoded Chapter → Config driven Verse → Generated
---

# 6. Why This Architecture Was Chosen

During early development phases the priority was to create:

• stable routing  
• predictable navigation  
• simple architecture  
• easy debugging  

Therefore the corpus hierarchy was implemented as a **TypeScript registry**.

This approach allowed rapid development of the scripture reader
without introducing complex backend dependencies.

---

# 7. Registry B (Current Canonical Registry)

The current system is known as:

Registry B
Registry B is a **TypeScript canonical metadata registry**.

Characteristics:

• stored in the frontend codebase  
• manually edited  
• strongly typed  
• simple and stable  

File:

src/lib/corpus.structure.ts
This registry defines:

• corpus domains  
• text hierarchy  
• navigation metadata  
• feature flags

---

# 8. Example Registry Structure

Example representation:

Domain → Text → Section → Subwork → Chaptered Work
Example real instance:

Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā
The tree component renders this hierarchy recursively.

---

# 9. Current Navigation Flow

The current navigation pipeline looks like this:

CORPUS_STRUCTURE ↓ CorpusTree.tsx ↓ Chapter Injection ↓ Verse Links
Diagram:

Registry (TypeScript) ↓ CorpusTree UI ↓ Chapter metadata ↓ Verse generation
---

# 10. Limitations of the Current System

The current system works well for small-scale corpus support,
but it has several limitations.

Examples:

• new texts require editing TypeScript code  
• large corpus expansion becomes harder  
• external content systems cannot modify the tree  
• dynamic corpus loading is not possible

For this reason the system is designed to evolve later.

---

# 11. Future Evolution — Registry C

The next stage of the architecture is called:

Registry C
Registry C introduces a **dynamic canonical metadata registry**.

Instead of storing the corpus hierarchy in TypeScript,
it will be stored in a structured data file.

Example future file:

registry/corpus_registry.json
Example data:

{ "domains": [ { "id": "itihasa", "texts": [ { "id": "mahabharata", "sections": [ { "id": "bhisma-parva", "works": [ { "id": "bg", "title": "Bhagavad-gītā", "chapters": 18 } ] } ] } ] } ] }
---

# 12. Future Dynamic Navigation Flow

The future navigation architecture will look like this:

Corpus Registry JSON ↓ Registry Loader ↓ CorpusTree ↓ Chapter Metadata ↓ Verse Navigation
Diagram:

Registry File ↓ Loader Layer ↓ UI Navigation ↓ Dynamic Tree
This allows the corpus to expand without modifying UI code.

---

# 13. Example Future Capabilities

With a dynamic registry the system will be able to support:

• Upaniṣads  
• Purāṇas  
• Dharmaśāstra  
• Darśana texts  
• multiple scripture traditions  

Example large-scale corpus structure:

Śruti Veda Saṁhitā Brāhmaṇa Upaniṣad
Smṛti Dharmaśāstra
Itihāsa Mahābhārata Rāmāyaṇa
Purāṇa 18 Mahāpurāṇa
Darśana Vedānta Nyāya Sāṅkhya
The sidebar will automatically render this structure.

---

# 14. When Registry C Will Be Implemented

Registry C is not part of the current development phase.

Current development stage:

Phase 5 — UI Refinement
Registry C will likely be implemented during:

Phase 7+
Reason:

Before converting to a dynamic registry we must stabilize:

• routing architecture  
• commentary infrastructure  
• knowledge graph design  
• education modules

Introducing dynamic registries too early would cause unnecessary refactoring.

---

# 15. Current Recommendation

The current architecture should remain unchanged for now.

src/lib/corpus.structure.ts
will continue to act as the canonical registry during Phase B development.

This is intentional and correct.

---

# 16. Optional Future Improvement

Before full Registry C migration we may introduce a loader abstraction.

Example file:

src/lib/corpus.registry.loader.ts
Then the flow becomes:

Registry Loader ↓ CORPUS_STRUCTURE ↓ CorpusTree
This makes migration easier later.

---

# 17. Final Status Summary

| Layer | Current Status | Future Status |
|------|------|------|
Corpus hierarchy | TypeScript registry | JSON registry |
Chapter metadata | constants.ts | metadata registry |
Verse generation | dynamic | dynamic |
Navigation UI | static registry | dynamic registry |

---

# 18. Key Architectural Insight

The current platform is primarily a:

Scripture Rendering Engine
Future evolution will transform it into a:

Canonical Knowledge Platform
The dynamic registry will enable:

• large corpus expansion  
• commentary compatibility  
• concept tagging  
• curriculum systems  
• knowledge graph integration

---

# 19. Architectural Guarantee

The current design already prepares the system for future migration.

The UI reads from a **registry abstraction**, not directly from code.

Therefore when Registry C is introduced, only the data source changes,
not the UI architecture.

---

# 20. Final Principle

The navigation system must always reflect the **canonical hierarchy of texts**.

The goal is not only to display scripture, but to represent the
structure of the Vedic corpus faithfully in the interface.
