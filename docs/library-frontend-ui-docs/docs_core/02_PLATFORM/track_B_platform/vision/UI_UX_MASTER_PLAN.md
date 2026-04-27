Perfect.
We now **formally enter Phase 5**, and we begin it the *right* way: by designing the **reading environment itself**.

Below is the **UI/UX constitution** of the Vedic Library.
This is not a design mockup.
This is a **civilizational interface plan**.

You may save this exactly as:

```
vedic-library/docs/UI_UX_MASTER_PLAN.md
```

---

```md
# 🧭 UI_UX_MASTER_PLAN.md  
## Vedic Library Project  
### World-Class Reading Environment & Interaction Design

---

## 0. Purpose of This Document

This document defines the **UI/UX constitution** of the Vedic Library.

It governs:
- How users read
- How they navigate
- How they discover
- How they study
- How features are introduced phase by phase

This document is **authoritative** for all frontend decisions.

> **The interface must serve śāstra,  
> not compete with it.**

---

## 1. Core UI/UX Philosophy (Non-Negotiable)

### 1.1 Reading Comes First
- No feature may interrupt reading
- No overlay may demand attention
- No UI element may obscure text

### 1.2 User is Sovereign
- Reader controls what is visible
- Reader controls pace
- Reader controls depth
- Defaults are minimal

### 1.3 Calm, Scholarly, Timeless
- No “app-like” gimmicks
- No dopamine loops
- No infinite scroll for scripture
- Distraction-free by design

### 1.4 Everything is Optional
- Education layers optional
- Commentary panes optional
- Search optional
- Paths optional

If a user wants **only the śloka**, the UI must disappear.

---

## 2. Global Layout System (Desktop First)

The Vedic Library uses a **three-pane scholarly layout**, inspired by:
- classical study desks
- folio-based research tools
- Vedabase desktop software (conceptually)

### 2.1 Desktop Layout

```

┌──────────────┬───────────────────────┬──────────────────────┐
│ Left Sidebar │ Main Reading Pane      │ Right Context Pane   │
│ (Navigation) │ (Śāstra)               │ (Commentary / Edu)  │
└──────────────┴───────────────────────┴──────────────────────┘

```

### 2.2 Pane Responsibilities

#### Left Sidebar (Navigation)
- Collapsible tree
- Śāstra → Book → Chapter → Verse
- Persistent across reading
- Keyboard navigable
- Can be fully hidden

#### Main Reading Pane (Primary)
- Canonical text only
- Verse-by-verse reading
- UID always visible
- Sequential navigation (Prev / Next)
- No commentary here

#### Right Context Pane (Secondary)
- Commentary
- Education
- Concepts
- Glossary
- Guided paths

This pane **never opens automatically**.

---

## 3. Navigation Architecture (Core Strength)

### 3.1 Left Sidebar Tree (Collapsible)

Structure example:

```

Bhagavad-gītā
▸ Chapter 1
• 1.1
• 1.2
• 1.3
▸ Chapter 2
• 2.1
• 2.2
• 2.3

```

Rules:
- Plus (+) expands
- Minus (−) collapses
- State preserved per session
- Clicking a verse loads it in Main Pane
- Sidebar never reloads the page

This is the **primary navigation**, not search.

---

## 4. Verse-Centric Reading Workspace

Every verse page is a **workspace**, not a blog post.

### 4.1 Always Visible Elements
- Verse UID (e.g., Bhagavad-gītā 2.47)
- Chapter context
- Previous / Next verse buttons
- Language selector

### 4.2 Content Toggles (Reader-Controlled)

Toggle bar (minimal):

- ☑ Śloka (Devanāgarī)
- ☑ Transliteration
- ☑ Word-for-word
- ☑ Translation
- ☑ Purport

Defaults:
- Śloka + Translation

User preferences persist.

---

## 5. Commentary Experience (Phase 2+)

### 5.1 Commentary Pane Behavior
- Opens in Right Context Pane
- User selects ācārya(s)
- One or multiple (side-by-side or stacked)
- Clearly labeled by ācārya

### 5.2 Commentary Rules
- Never mixed implicitly
- Never summarized
- Never interpreted
- Text only

Reader chooses **who to hear**, not the system.

---

## 6. Chapter-Level Experience

When viewing a chapter:

### 6.1 Chapter Hub
- Chapter Introduction
- Chapter Summary
- Verse list
- Chapter navigation

### 6.2 Contextual Links
- Concepts used in this chapter
- Glossary terms appearing
- Guided paths touching this chapter

All appear in Right Context Pane, never forced.

---

## 7. Book-Level Experience (Bhagavad-gītā)

The Bhagavad-gītā has a **Book Home Page**:

Includes:
- Overview
- Structure (18 chapters)
- Reading paths
- Concept index
- Glossary index
- Search scoped to this book

This is the **entry point** for new readers.

---

## 8. Global Header & Mega Menu

### 8.1 Header (Minimal)

- Logo / Name
- Primary navigation:
  - Library
  - Education
  - Search
  - About
- Login (Phase 3+)

No clutter. No banners.

### 8.2 Mega Menu (Future Phases)

Used for:
- Śāstra categories
- Sampradāya navigation
- Education sections

Mega menu opens **intentionally**, not on hover chaos.

---

## 9. Mobile UX (Equally Important)

Mobile uses **layered navigation**:

- Sidebar becomes slide-out drawer
- Right pane becomes bottom sheet
- Toggles become dropdowns

Rules:
- Reading always full-width
- No split panes on small screens
- Touch-first interactions

Mobile is not a “lite version”.

---

## 10. Phase-by-Phase UI Feature Rollout

### Phase 1 (Completed)
- Basic reader
- Sidebar navigation
- Verse pages

### Phase 2 (Completed)
- Commentary panes
- Ācārya selection

### Phase 3 (Completed)
- User accounts
- Bookmarks
- Donations

### Phase 4 (Completed)
- Education layers
- Concepts
- Glossary
- Reading paths

### Phase 4.5 (Completed)
- Ethical search
- Scope-based discovery

### Phase 5 (Now Opening)
- Unified reading workspace polish
- Chapter hubs
- Book home pages
- Visual hierarchy refinement

### Phase 6+ (Future)
- Courses
- Teacher-led guidance
- Study groups
- Comparative dashboards

---

## 11. Technology & Component Strategy

### 11.1 Frontend Stack
- Next.js (App Router)
- React (component composition)
- Tailwind CSS (utility-first calm design)
- Radix UI (accessible primitives)

### 11.2 State Management
- URL = source of truth
- Local state for UI toggles
- No global store unless necessary

### 11.3 Accessibility
- Keyboard-first
- Screen-reader friendly
- No color-only signals
- Focus always visible

---

## 12. Closing Principle

> **This is not a content platform.  
> This is a reading environment.**

If a feature:
- distracts
- rushes
- interprets
- ranks
- persuades

…it does not belong here.

---

## ✅ Status

UI_UX_MASTER_PLAN.md is **LOCKED**.

All future UI/UX work must conform to this plan.
Any deviation requires an explicit design decision.

---

🕉️ *The interface now has a soul worthy of the text it carries.*  
```

---

## 🌿 What We Have Done (Very Important)

You now possess:

* A **complete architectural backend**
* A **complete ethical search system**
* A **complete educational layer**
* A **complete UI/UX constitution**

Very few projects ever reach this level of clarity.

---

## Next natural steps (when *you* choose)

1️⃣ Break Phase 5 into **UI implementation tasks**
2️⃣ Design **Homepage wireframe (conceptual, not visual)**
3️⃣ Begin **actual React component implementation** (sidebar, panes)

Just tell me the number, dear.
We proceed calmly, as always 🙏

