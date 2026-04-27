Excellent. This is exactly how Phase 5 should begin: by turning the UI/UX constitution into clear, implementable work units, without jumping into visuals or code too fast.
Below is a Phase 5 UI Implementation Task Breakdown, written like an execution plan you can keep referring to in future chats.
You may save this as:
vedic-library/docs/PHASE_5_UI_IMPLEMENTATION_TASKS.md

# 🧱 PHASE 5 — UI IMPLEMENTATION TASKS  
## Vedic Library Project  
### From Constitution → Working Interface

---

## 🎯 Phase 5 Objective (Restated Clearly)

Phase 5 is **not** about adding new features.

Phase 5 is about:
- **Unifying** everything built so far
- **Polishing the reading workspace**
- **Making the interface world-class, calm, and scholarly**

This phase focuses entirely on **frontend UI/UX implementation**.

---

## 🧭 PHASE 5 STRUCTURE OVERVIEW

Phase 5 is divided into **7 implementation tracks**, each with precise goals and exit criteria.

You may work on them sequentially or in parallel, but they should be *completed in order* conceptually.

---

## TRACK 5.1 — Global Layout & Shell

### Goal
Create the permanent **application shell** used everywhere.

### Tasks
- [ ] Implement global layout (`app/layout.tsx`)
- [ ] Header (logo, primary nav, search entry)
- [ ] Footer (about, trust, links)
- [ ] CSS grid for 3-pane layout
- [ ] Responsive breakpoints (desktop / tablet / mobile)

### Deliverables
- App loads with empty panes
- Layout persists across navigation
- No reading content yet

### Exit Criteria
✅ Layout feels stable and non-distracting

---

## TRACK 5.2 — Left Sidebar Navigation (Core)

### Goal
Implement the **collapsible tree navigation** (Vedabase-like).

### Tasks
- [ ] Sidebar container component
- [ ] Tree data model (Book → Chapter → Verse)
- [ ] Expand / collapse (+ / −)
- [ ] Scroll position preservation
- [ ] Keyboard navigation (↑ ↓ → ←)
- [ ] Hide / show sidebar toggle

### Deliverables
- Fully navigable sidebar
- Clicking a verse updates main pane

### Exit Criteria
✅ User can browse entire Bhagavad-gītā without search

---

## TRACK 5.3 — Main Reading Pane (Verse Workspace)

### Goal
Build the **core verse reading experience**.

### Tasks
- [ ] Verse page route (`/bg/[chapter]/[verse]`)
- [ ] Display UID clearly
- [ ] Śloka (Devanāgarī)
- [ ] Transliteration
- [ ] Word-for-word
- [ ] Translation
- [ ] Toggle controls (show/hide)
- [ ] Prev / Next verse navigation
- [ ] Language selector (EN / HI)

### Deliverables
- Clean verse workspace
- Reader controls visibility

### Exit Criteria
✅ Reader can read only what they want, nothing more

---

## TRACK 5.4 — Right Context Pane (Commentary & Education)

### Goal
Implement the **optional, reader-invoked context pane**.

### Tasks
- [ ] Right pane container
- [ ] Open / close behavior
- [ ] Commentary selector (ācārya)
- [ ] Single / multiple commentary layout
- [ ] Education tabs:
  - Concepts
  - Glossary
  - Chapter info
- [ ] Pane persistence across verse navigation

### Deliverables
- Context pane never auto-opens
- Clear separation of layers

### Exit Criteria
✅ Context enriches without interrupting

---

## TRACK 5.5 — Chapter-Level Hub Pages

### Goal
Create **chapter overview pages**.

### Tasks
- [ ] Chapter route (`/bg/[chapter]`)
- [ ] Chapter introduction
- [ ] Chapter summary
- [ ] Verse list with quick navigation
- [ ] Chapter-specific education links
- [ ] “Start reading” CTA (subtle)

### Deliverables
- Chapter feels like a meaningful unit

### Exit Criteria
✅ Chapters are more than just verse containers

---

## TRACK 5.6 — Book-Level Home (Bhagavad-gītā)

### Goal
Create a **book home page** that welcomes readers.

### Tasks
- [ ] Book route (`/bg`)
- [ ] Book overview text
- [ ] Structural map (18 chapters)
- [ ] Guided reading paths
- [ ] Concept index
- [ ] Glossary index
- [ ] Book-scoped search entry

### Deliverables
- Entry point for new readers

### Exit Criteria
✅ A newcomer knows how to begin

---

## TRACK 5.7 — Interaction Polish & Accessibility

### Goal
Make everything **feel right**.

### Tasks
- [ ] Focus states everywhere
- [ ] Keyboard-only navigation audit
- [ ] Screen reader audit
- [ ] Mobile behavior tuning
- [ ] Pane animations (minimal, optional)
- [ ] Loading states (quiet)

### Deliverables
- Calm, inclusive experience

### Exit Criteria
✅ UI disappears behind the text

---

## 🧪 Phase 5 Testing (Ongoing)

- Manual reading sessions
- Long-form reading test (30–60 mins)
- Mobile-only reading test
- First-time reader walkthrough

---

## 🟢 Phase 5 Completion Criteria

Phase 5 is complete when:

- ✔ Navigation is intuitive
- ✔ Reading is uninterrupted
- ✔ Context is optional
- ✔ No feature competes with śāstra
- ✔ Interface feels *invisible*

---

## 🕉️ Closing Note

> **Phase 5 is where technology stops showing itself.**

If readers forget the UI and remember the text,  
Phase 5 has succeeded.

---

## ✅ Status

PHASE_5_UI_IMPLEMENTATION_TASKS.md is **LOCKED**.

You may now begin Phase 5 calmly, task by task.

🌿 Where to go next (your choice)
1️⃣ Start with TRACK 5.1 – Global Layout & Shell2️⃣ Design Homepage (conceptual wireframe in words)3️⃣ Decide component architecture (React component tree)
Just tell me the number, dear.

