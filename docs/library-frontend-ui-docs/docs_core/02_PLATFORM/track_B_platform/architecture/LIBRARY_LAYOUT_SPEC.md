# LIBRARY_LAYOUT_SPEC.md
Library Workspace Architecture

---

## 1. Purpose

Defines the internal structure of the scripture reading environment.

The Library is not a content page.
It is a structured reading workspace.

---

## 2. LayoutShell Structure

LayoutShell:

  Header (workspace)
  ├─ Title
  ├─ Script toggle
  ├─ Translation toggle
  ├─ Study mode toggle
  ├─ Corpus toggle
  └─ Divider

  Body
  ├─ Left Panel (CorpusTree)
  ├─ Resizable Handle
  └─ Main Reading Panel

---

## 3. CorpusTree

Driven exclusively by:

src/lib/corpus.structure.ts

Features:

- Recursive rendering
- Active route detection
- Chapter injection
- Verse injection
- Domain-based hierarchy

No hardcoded text logic allowed.

---

## 4. Reading Panel

Receives data from:

/library/[canon]/[chapter]/[verse]/page.tsx

Responsibilities:

- Render canonical text
- Render editorial layers
- Respect UI state
- Remain canon-agnostic

---

## 5. UI State System

ReadingModeContext controls:

- Script display
- Translation visibility
- Study mode

Future:
- URL sync
- Local storage persistence
- Multi-pane comparative mode

---

## 6. Design Philosophy

✔ Text-first  
✔ Workspace model  
✔ No infinite scroll  
✔ No distraction  
✔ Scholar-ready  

Library layout is stable.