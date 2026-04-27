# B1 — Architecture Overview  
Track B: Platform Foundation  
Project: Vedic Library v1.0

---

## 1. Core Philosophy

The Vedic Library is designed as a layered scripture rendering engine.

It separates:

- Canonical text
- Editorial layers (synonyms, translation, exposition)
- UI state system
- Layout system
- Rendering system

This prevents architectural entanglement and allows future expansion into:

- Multi-commentary comparison
- Cross-text linking
- Footnotes
- Scholarly modes
- Sanskrit study tools

---

## 2. Directory Structure (Core Areas)

frontend/
│
├── app/
│   ├── layout.tsx
│   └── bg/[chapter]/[verse]/page.tsx
│
├── components/
│   ├── LayoutShell.tsx
│   └── CorpusTree.tsx
│
├── context/
│   └── ReadingModeContext.tsx
│
├── features/scripture/
│   ├── scripture.loader.ts
│   └── components/organisms/VerseDisplay.tsx
│
└── lib/constants.ts

---

## 3. Layout Architecture

RootLayout
└── ReadingModeProvider
    └── LayoutShell
        ├── Sidebar (CorpusTree)
        ├── Resizable Handle
        └── Reading Panel (VerseDisplay)

LayoutShell owns structure.
VerseDisplay owns content presentation.

---

## 4. Rendering Flow

page.tsx
→ loadVerseComposition()
→ Extract canonical + editorial layers
→ Pass clean props to VerseDisplay
→ VerseDisplay renders based on UI state

---

## 5. Design Principles

✔ Separation of concerns  
✔ Layer isolation  
✔ State-driven rendering  
✔ Future extensibility  
✔ SSR-compatible architecture  

---

Phase 1 Status: Stable
