# PLATFORM_ARCHITECTURE_v2.md
Vedic Library — Platform Architecture Freeze
Phase 5 Stabilization

---

## 1. Purpose

This document freezes the architectural state of the Vedic Library
after successful separation of:

- Global header
- Library workspace
- Canonical routing
- Corpus navigation
- UI state management

This marks the transition from experimental build to structured evolution.

---

## 2. High-Level Layout Hierarchy

### Global Application Layout

app/layout.tsx

RootLayout
  ├─ GlobalHeader
  └─ {children}

---

### Library-Specific Layout

app/library/layout.tsx

LibraryLayout
  ├─ ReadingModeProvider
  └─ LayoutShell
        ├─ Library Header (workspace header)
        ├─ CorpusTree (left panel)
        └─ Reading Panel (main content)

---

## 3. Render Stack Example

Route: /library/bg/1/8

Render Order:

RootLayout
  → GlobalHeader
    → LibraryLayout
      → LayoutShell
        → CorpusTree
        → Verse Page

This separation ensures:

- Global navigation is universal
- Library workspace is isolated
- Future pillars remain independent

---

## 4. Architectural Principles

✔ Separation of global and sectional layout  
✔ Canon-agnostic routing  
✔ Canonical metadata registry driven navigation  
✔ State-driven rendering  
✔ Extensibility without structural refactor  

---

## 5. Current Stability Status

✔ Production deployed  
✔ Build clean  
✔ TypeScript clean  
✔ Dynamic corpus routing stable  
✔ Layout layering correct  

Architecture v2 is considered stable.