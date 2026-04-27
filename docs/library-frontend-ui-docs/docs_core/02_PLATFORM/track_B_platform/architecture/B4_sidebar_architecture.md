# B4 — Sidebar Architecture

---

## 1. Layout System

Uses:

- react-resizable-panels
- Custom ResizableHandle
- Scrollable sidebar container

---

## 2. CorpusTree Structure

Tree hierarchy:

Itihāsa
  └── Mahābhārata
        └── Bhīṣma-parva
              └── Bhagavad-gītā
                    └── Chapters

---

## 3. CHAPTERS Metadata

Located in:

lib/constants.ts

Contains:

- id
- Sanskrit title
- English title
- Summary
- Verse count

---

## 4. Phase 2 Goals

- Expandable verse nodes
- Active verse highlighting
- Better indentation
- Search within corpus
- Collapsible tree persistence
