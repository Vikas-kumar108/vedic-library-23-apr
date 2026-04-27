# 🖥 FRONTEND SYSTEM OVERVIEW
## Vedic Library Project

Status: ACTIVE  
Applies To: All frontend development  
Authority: Architectural Reference  
Phase Alignment: Phase-2 Canonical Expansion  

---

# 0. Purpose of This Document

This document defines the structural architecture of the Vedic Library frontend.

It answers:

- Where does routing live?
- Where does scripture logic live?
- Where do UI components live?
- Where do types live?
- What must never be mixed?

This is a structural contract, not a style guide.

---

# 1. High-Level Architecture

The frontend is organized into five strict layers:


src/
app/ → Routing Layer
features/ → Application Logic Layer
components/ → UI Layer
types/ → Type Definitions
lib/ → Pure Utilities


Each layer has a single responsibility.

---

# 2. Routing Layer (src/app/)

Purpose:
- Defines URL structure
- Maps routes to pages
- Composes layout + components

Must NOT:
- Load filesystem directly
- Contain scripture logic
- Contain heavy UI styling
- Perform canonical transformation

Routing is orchestration only.

---

# 3. Application Logic Layer (src/features/)

Primary module:

src/features/scripture/


Responsibilities:
- Load canonical units
- Normalize data
- Select script variants
- Inject derivative layers
- Apply reading modes
- Prepare structured output for UI

Pages must never read raw JSON directly.

All data access flows through the Scripture Engine.

Future modules:

src/features/user/
src/features/search/


---

# 4. UI Layer (src/components/)

Organized using Atomic Design:


components/
ui/ → Atoms
scripture/ → Molecules
layout/ → Organisms


## 4.1 UI (Atoms)

Examples:
- Text
- Divider
- Container
- Button
- ToggleSwitch

Rules:
- No scripture logic
- No corpus assumptions
- Purely visual

---

## 4.2 Scripture (Molecules)

Examples:
- VerseText
- TranslationBlock
- CommentaryTabs
- NavigationArrows
- ScriptToggle

Rules:
- Scripture-aware
- Not corpus-specific
- No filesystem access

---

## 4.3 Layout (Organisms)

Examples:
- ScriptureLayout
- ChapterLayout
- PageWrapper

Rules:
- Compose molecules
- Control spacing and structure
- No data fetching

---

# 5. Types Layer (src/types/)

Single source of type truth.

Must align with:
- DATA_SCHEMA.md
- Canonical schema files

Types follow schema.
Schema never follows types.

---

# 6. Data Flow Model

Canonical JSON (filesystem)
        ↓
Scripture Loader (features/)
        ↓
Normalized Scripture Object
        ↓
Page Route (app/)
        ↓
UI Components
        ↓
Rendered Output

No component may bypass this chain.

---

# 7. Canonical Discipline Rules

The frontend must never:

- Mutate canonical data
- Embed translation into canonical layer
- Redesign UID structure
- Infer structural hierarchy
- Override spine declarations

Canonical layer is immutable.

---

# 8. Reading Modes (Future-Ready)

Frontend supports mode abstraction:

- Minimal
- Devotional
- Scholarly

Modes affect rendering only.
They never affect canonical structure.

---

# 9. Supabase Integration Boundary

When introduced, Supabase will:

- Store user bookmarks
- Store user notes
- Store preferences

Supabase will NOT:

- Replace canonical storage
- Alter UID system
- Modify canonical data

Database layer sits above canonical discipline.

---

# 10. Extension Policy

When adding new śāstra:

- No routing redesign required
- No UI redesign required
- Only loader logic extended
- Canonical schema validated
- Spine declared first

Frontend architecture must remain stable across corpora.

---

# 11. Stability Declaration

This architecture is designed for:

- Multi-śāstra support
- Multi-script rendering
- Multi-commentary expansion
- Long-term institutional use

Changes require documentation update.

No silent refactors permitted.
