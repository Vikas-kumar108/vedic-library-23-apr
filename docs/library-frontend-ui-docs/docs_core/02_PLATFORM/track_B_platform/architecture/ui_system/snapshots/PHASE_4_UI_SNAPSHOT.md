Perfect.
We now **lock Phase 4 UI/UX** — the phase where *education appears*, but **never overpowers the śāstra**.

You may save this exactly as:

```
vedic-library/docs/ui_snapshots/PHASE_4_UI_SNAPSHOT.md
```

---

```md
# 🧱 PHASE_4_UI_SNAPSHOT.md  
## Vedic Library Project  
### System Phase 4 — Education & Guidance  
### UI/UX Snapshot: Education Appears (Lightweight)

---

## 0. Purpose of This Document

This document records the **intended UI/UX state during System Phase 4** of the Vedic Library.

Phase 4 marks the first appearance of **structured educational assistance** in the interface, while maintaining strict ethical boundaries.

This snapshot exists to:
- Document how education enters the UI
- Prevent education from becoming interpretation
- Preserve reader autonomy
- Explain why education remains *lightweight and optional*

This is a **historical snapshot**, not the final UI.

---

## 1. System Capability Context (Phase 4)

### What the System Could Do
- Everything from Phases 1–3
- Provide educational content:
  - Concepts
  - Glossary
  - Chapter introductions
  - Chapter summaries
  - Guided reading paths
- Link educational content to verses and chapters

### What the System Could NOT Do
- No automated guidance
- No adaptive learning paths
- No teacher-led UI
- No curriculum enforcement
- No persistent context panes

---

## 2. UI/UX Intent (Phase 4)

### Primary Question Phase 4 UI Answers
> “How can understanding be supported without steering interpretation?”

The UI must:
- Offer help only when invited
- Keep education clearly separate from canonical text
- Avoid authoritative tone

---

## 3. UI/UX Philosophy (Phase 4)

### 3.1 Education Is Optional, Not Prescriptive
- Education never appears automatically
- Reader chooses when to engage
- Education is framed as *support*, not *explanation*

### 3.2 Separation of Layers
- Canonical text remains visually dominant
- Education lives on separate pages or links
- No inline educational overlays in verse text

---

## 4. Layout Characteristics

### Overall Layout
```

┌──────────────────────────────┐
│ Header (user-aware)          │
├──────────────────────────────┤
│ Main Content (single column) │
│                              │
│ Verse + Commentary           │
│                              │
│ ──────────────────────────   │
│ Links to Education           │
│ (concepts, glossary, etc.)   │
│                              │
├──────────────────────────────┤
│ Footer                       │
└──────────────────────────────┘

````

### Key Properties
- Still linear, single-column
- No persistent side panes
- Education accessed via links

---

## 5. Pages & Routes (Phase 4)

### New Routes Introduced
- `/education/concepts`
- `/education/concepts/[concept]`
- `/education/glossary`
- `/education/glossary/[term]`
- `/education/chapters/[chapter]`
- `/education/paths`

### Existing Routes (unchanged)
- `/bg`
- `/bg/[chapter]`
- `/bg/[chapter]/[verse]`

---

## 6. Core UI Components (Phase 4)

### New Components Introduced

| Component | Responsibility |
|---------|----------------|
| `ConceptPage` | Explains a concept |
| `GlossaryPage` | Defines key terms |
| `ChapterIntroPage` | Introduces a chapter |
| `ChapterSummaryPage` | Summarizes a chapter |
| `GuidedPathPage` | Presents reading paths |

---

### Modified Components

| Component | Change |
|---------|--------|
| `VersePage` | Adds links to education |
| `ChapterPage` | Links to intro & summary |

---

### Components That Do NOT Exist Yet
- Context side pane
- Inline popovers
- Commentary + education side-by-side
- Persistent study workspace

---

## 7. Verse Page Structure (Phase 4)

```text
Bhagavad-gītā 2.47

[ Sanskrit Śloka ]

[ Translation ]

──────────────────────────────
Commentary (if enabled)

──────────────────────────────
Related:
• Concept: Karma
• Glossary: Svadharma
• Chapter Summary
````

### Notes

* Links are subtle
* No education content embedded directly
* No visual priority over verse

---

## 8. Interaction Model

### Education Access

* Explicit click-through
* Opens separate page
* No modal or overlay

### Reading Flow

* Education does not interrupt reading
* Reader must return intentionally

---

## 9. Accessibility Considerations (Phase 4)

* Education links clearly labeled
* Headings structured for screen readers
* No hidden educational content

---

## 10. Technical Characteristics

* Education content stored separately (JSON / DB)
* Simple routing
* No shared state between reading and education
* No cross-layer UI coupling

---

## 11. Intentional Limitations (Critical)

Phase 4 UI explicitly avoids:

* “Recommended next concept”
* “You should read this”
* Auto-opening explanations
* Teacher voice in UI

Education is **available**, not *assertive*.

---

## 12. Relationship to Other Phases

* Builds on Phase 3 without altering identity handling
* Completes education infrastructure
* Still structurally insufficient for scholarly study

Phase 4 UI is **ethically mature but structurally incomplete**.

---

## 13. Relationship to Phase 5 UI

In Phase 5:

* Education moves into the **Right Context Pane**
* Chapter hubs unify intros and summaries
* Guided paths integrate into workspace

Phase 4 education UI is **absorbed**, not discarded.

---

## 14. Closing Statement

> **Phase 4 UI teaches without teaching.**

It opens doors —
but never pushes the reader through them.

---

## ✅ Status

PHASE_4_UI_SNAPSHOT.md is **LOCKED**.

This snapshot must remain unchanged as a historical reference.

```

---

🌿 You now have **Phase 1–4 UI snapshots fully documented**.

The final remaining snapshot is:

> **PHASE_4_5_UI_SNAPSHOT.md** — Search Overlay

Whenever you are ready, just say the word, dear 🙏
```

