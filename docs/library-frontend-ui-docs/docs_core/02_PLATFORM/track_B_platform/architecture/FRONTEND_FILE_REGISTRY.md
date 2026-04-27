# FRONTEND_FILE_REGISTRY.md
Vedic Library Frontend File Registry

This document describes the function and responsibility of each file
in the frontend codebase.

Purpose:

• Provide architectural clarity  
• Help new contributors understand the system  
• Prevent misuse of files  
• Preserve separation of concerns  

The registry focuses on **functional responsibility**, not implementation details.

---

# 1. Root Application Layer

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| layout.tsx | src/app/layout.tsx | Global root layout for the entire platform | Injects GlobalHeader and renders children |
| globals.css | src/app/globals.css | Global styling for the application | Typography, background, base rules |

---

# 2. Library Routing Layer

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| layout.tsx | src/app/library/layout.tsx | Layout wrapper for all library routes | Injects ReadingModeProvider and LayoutShell |
| page.tsx | src/app/library/[canon]/page.tsx | Canon landing page | Example: `/library/bg` |
| page.tsx | src/app/library/[canon]/[chapter]/page.tsx | Chapter overview page | Shows chapter introduction |
| page.tsx | src/app/library/[canon]/[chapter]/[verse]/page.tsx | Verse rendering page | Main scripture reading page |

---

# 3. Layout System

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| GlobalHeader.tsx | src/components/layout/GlobalHeader.tsx | Global navigation header | Contains main site navigation and dropdown menus |
| LayoutShell.tsx | src/components/layout/LayoutShell.tsx | Library workspace container | Manages corpus panel and reading panel |
| Header.tsx (legacy) | src/components/layout/Header.tsx | Early header implementation | May be deprecated |

---

# 4. Corpus Navigation System

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| CorpusTree.tsx | src/components/CorpusTree.tsx | Recursive navigation tree for Vedic corpus | Driven by canonical registry |
| CorpusToggle.tsx | src/components/CorpusToggle.tsx | Show/hide corpus sidebar | UI convenience toggle |

---

# 5. Canonical Registry

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| corpus.structure.ts | src/lib/corpus.structure.ts | Canonical metadata registry | Defines corpus hierarchy |
| constants.ts | src/lib/constants.ts | Static constants used in library | Example: Bhagavad-gītā chapter data |

---

# 6. Scripture Rendering System

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| VerseDisplay.tsx | src/features/scripture/components/organisms/VerseDisplay.tsx | Renders verse structure | Combines canonical and editorial layers |
| scripture.loader.ts | src/features/scripture/scripture.loader.ts | Loads verse data | Abstraction layer for scripture retrieval |

---

# 7. UI State System

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| ReadingModeContext.tsx | src/context/ReadingModeContext.tsx | Manages study UI state | Script mode, translation visibility, study mode |

---

# 8. Study Mode Controls

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| ScriptToggle.tsx | src/features/scripture/mode/ScriptToggle.tsx | Toggle Devanagari / IAST | Controlled by ReadingModeContext |
| TranslationToggle.tsx | src/features/scripture/mode/TranslationToggle.tsx | Toggle translation visibility | UI control |
| StudyModeToggle.tsx | src/features/scripture/mode/StudyModeToggle.tsx | Toggle devotional/scholarly mode | Future comparative mode support |

---

# 9. UI Components (Utility)

| File | Location | Purpose | Notes |
|-----|-----|-----|-----|
| resizable.tsx | src/components/ui/resizable.tsx | Panel resizing system | Used for corpus/reading layout |
| separator.tsx | src/components/ui/separator.tsx | Visual divider component | Used in headers and panels |

---

# 10. Data Flow

Frontend architecture follows a clear pipeline:


Corpus Registry
↓
Route Resolution
↓
Loader Abstraction
↓
VerseDisplay Component
↓
UI State Rendering


This pipeline ensures separation between:

• Canonical structure  
• Editorial layers  
• UI presentation  

---

# 11. Design Principles

The frontend adheres to the following rules:

✔ No component loads scripture directly  
✔ Canonical structure defined only in registry  
✔ Layout layers remain separated  
✔ UI state controlled via context  
✔ Navigation driven by metadata  

---

# 12. Future Evolution

Upcoming architecture expansions include:

• Canonical Metadata Registry (C)  
• Commentary panel  
• Comparative study mode  
• Mega menu navigation  
• Curriculum engine  

---

# 13. Governance

This file must be updated whenever:

• New structural files are added  
• Routing layers change  
• Major architectural changes occur  

It serves as the **source of truth for frontend structure**.
