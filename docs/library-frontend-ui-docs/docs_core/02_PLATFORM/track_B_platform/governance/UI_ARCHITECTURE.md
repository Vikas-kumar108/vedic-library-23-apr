# 🏛 UI_ARCHITECTURE.md
## Track B — Authoritative Frontend Architecture
### Baseline: Scripture Engine with Canonical Registry

---

## 1. Architectural Baseline (Declared)

The Vedic Library frontend is built as a:

> **Scripture Rendering Engine with Canonical Metadata Registry**

This is the official architectural baseline.

It is:

- Canon-agnostic
- Metadata-driven
- UI-state aware
- Extensible toward multi-commentary
- Expandable toward civilizational interface (future)

It is NOT:

- A blog
- A marketing site
- A Gita-only prototype
- A phase-1 static reader

---

## 2. Core Architectural Layers

### 2.1 Canonical Metadata Layer

Defined in:

- corpus.structure.ts (registry)
- constants.ts (temporary)
- scripture.loader.ts

Hierarchy:

Corpus
  → Text
    → Section
      → Subwork
        → Chapter
          → Verse

Navigation and routing must derive from metadata, not hardcoded paths.

---

### 2.2 Rendering Pipeline

Route:
`/library/[canon]/[chapter]/[verse]`

Flow:

page.tsx
→ loader abstraction
→ canonical + editorial layers
→ pass clean props to VerseDisplay
→ render based on UI state

No component loads files directly.

---

### 2.3 Layout System

RootLayout
└── ReadingModeProvider
    └── LayoutShell
        ├── Left Sidebar (CorpusTree)
        ├── Main Reading Pane
        └── (Future) Right Context Pane

Layout owns structure.
Display components own content.

---

### 2.4 UI State System

Centralized via:

ReadingModeContext

Controls:

- scriptMode
- showTranslation
- studyMode

Future:

- localStorage sync
- URL sync
- preset profiles

---

### 2.5 Corpus Navigation

Sidebar must:

- Reflect canonical hierarchy
- Highlight active route
- Collapse / Expand
- Remain canon-agnostic
- Avoid hardcoded Gita assumptions

Tree must eventually derive from Canonical Metadata Registry.

---

## 3. Documentation Governance Rules

This document is authoritative.

Other documents may:

- Explain subsystems
- Record experiments
- Describe phase history

But if conflict arises,
this document prevails.

---

## 4. Future Evolution (Not Baseline)

The following belong to Vision layer:

- Education system
- Guidance system
- Community system
- Comparative dashboards
- Mega navigation
- Civilizational OS

These are preserved in `/vision`.

They do not redefine current baseline.

---

## 5. Stability Principle

The Scripture Engine must remain stable even if:

- Education is removed
- Search is removed
- Auth is removed
- UI redesign occurs

Scripture rendering must always remain intact.

---

🕉️ This architecture is now formally stabilized.
