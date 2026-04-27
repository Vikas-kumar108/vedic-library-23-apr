# FRONTEND_DATA_FLOW.md
Vedic Library — Frontend Data Flow Architecture

---

# 1. Purpose

This document explains how canonical scripture data moves through the
frontend architecture of the Vedic Library platform.

It clarifies the separation between:

• Canonical metadata  
• Scripture content  
• Editorial layers  
• UI rendering  

Understanding this flow prevents architectural entanglement
and ensures the system remains extensible.

---

# 2. Core Philosophy

The Vedic Library frontend is a **rendering engine**, not a data store.

The frontend does NOT own scripture content.

Instead it:

1. Receives canonical structure
2. Loads scripture through abstraction layers
3. Passes clean data to UI components
4. Renders according to study state

---

# 3. High Level Data Flow


Corpus Registry
↓
Route Resolution
↓
Page Loader
↓
Scripture Loader
↓
Verse Composition
↓
VerseDisplay Component
↓
UI State Context
↓
Final Render


---

# 4. Stage 1 — Canonical Metadata

Source file:


src/lib/corpus.structure.ts


Purpose:

Defines the structural hierarchy of the Vedic corpus.

Example structure:


Domain
→ Text
→ Section
→ Subwork
→ Chapter
→ Verse


Example:


Itihāsa
→ Mahābhārata
→ Bhīṣma Parva
→ Bhagavad-gītā


This registry provides:

• Navigation structure  
• Routing base paths  
• Feature flags  
• Canon capability metadata  

No scripture content exists here.

---

# 5. Stage 2 — Routing Resolution

Next.js dynamic routing resolves scripture paths.

Example route:


/library/bg/1/8


Mapped to:


src/app/library/[canon]/[chapter]/[verse]/page.tsx


Parameters extracted:

| Parameter | Value |
|-----------|------|
| canon | bg |
| chapter | 1 |
| verse | 8 |

These parameters are passed to the loader layer.

---

# 6. Stage 3 — Page Loader

Location:


src/app/library/[canon]/[chapter]/[verse]/page.tsx


Responsibilities:

• Receive route parameters  
• Request scripture data from loader  
• Extract canonical + editorial layers  
• Pass structured props to UI components  

Example call:


loadVerseComposition(canon, chapter, verse)


The page itself contains no scripture logic.

---

# 7. Stage 4 — Scripture Loader

Location:


src/features/scripture/scripture.loader.ts


Responsibilities:

• Locate verse JSON data
• Load canonical verse data
• Combine editorial layers
• Return structured verse composition

Output format example:


{
canon: "bg",
chapter: 1,
verse: 8,

devanagari: "...",
transliteration: "...",

synonyms: [...],
translation: "...",
exposition: "..."
}


The loader abstracts data source details.

Future versions may load from:

• JSON files  
• Database  
• Supabase  
• Content registry  

UI components remain unaffected.

---

# 8. Stage 5 — Verse Composition

The loader constructs a **verse composition object**.

This separates:

| Layer | Meaning |
|------|--------|
| Canonical | Sanskrit verse |
| Linguistic | Transliteration |
| Analytical | Synonyms |
| Interpretive | Translation |
| Expository | Purport |

This structure ensures editorial layers remain modular.

---

# 9. Stage 6 — VerseDisplay Rendering

Location:


src/features/scripture/components/organisms/VerseDisplay.tsx


Responsibilities:

• Render canonical text
• Render editorial layers
• Respect UI state
• Maintain typographic hierarchy

This component does not load data.

It only renders props passed by the page.

---

# 10. Stage 7 — UI State Context

Location:


src/context/ReadingModeContext.tsx


Controls study environment settings.

State variables include:

| State | Purpose |
|------|--------|
| scriptMode | Devanagari / IAST |
| showTranslation | Toggle translation |
| studyMode | Devotional / Scholarly / Comparative |

Components react to state changes automatically.

---

# 11. Stage 8 — Final Render

The final reading interface consists of:


LayoutShell
→ CorpusTree (navigation)
→ Reading Panel
→ VerseDisplay


Rendering is controlled by:

• UI state
• Canonical structure
• Verse composition

---

# 12. Architectural Guarantees

The architecture enforces:

✔ Separation of canonical structure  
✔ Separation of scripture content  
✔ Separation of UI rendering  
✔ Loader abstraction for future backends  

No component mixes responsibilities.

---

# 13. Future Data Flow (Phase C)

Planned evolution:


Canonical Metadata Registry (CMR)
↓
Content Registry
↓
Loader Abstraction
↓
Rendering Engine


This will support:

• Multiple texts
• Commentary layering
• Comparative views
• Curriculum systems

---

# 14. Guiding Rule

The frontend must always remain a **rendering engine**.

It must never:

• Own scripture data
• Hardcode canon logic
• Couple UI to storage format

Content sources may evolve,
but rendering architecture must remain stable.

---

# 15. Summary

The frontend data flow ensures:

• Clean separation of layers  
• Canon-agnostic rendering  
• Future backend compatibility  
• Scalable scripture architecture  

This design allows the Vedic Library to grow from
a single text reader into a full civilizational knowledge platform.
