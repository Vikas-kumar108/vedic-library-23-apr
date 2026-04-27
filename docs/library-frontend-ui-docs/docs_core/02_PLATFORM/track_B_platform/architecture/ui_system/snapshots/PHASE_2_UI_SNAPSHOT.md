Perfect.
We now **lock the Phase 2 UI/UX snapshot** with the same discipline and historical clarity.

You may save this exactly as:

```
vedic-library/docs/ui_snapshots/PHASE_2_UI_SNAPSHOT.md
```

---

```md
# 🧱 PHASE_2_UI_SNAPSHOT.md  
## Vedic Library Project  
### System Phase 2 — Commentary Layers  
### UI/UX Snapshot: Commentary-Aware UI (Still Simple)

---

## 0. Purpose of This Document

This document records the **intended UI/UX state during System Phase 2** of the Vedic Library.

It exists to:
- Capture the *first appearance of interpretation* in the UI
- Clearly separate canonical text from commentary
- Prevent premature scholarly tooling
- Preserve why the UI remained intentionally simple

This is a **historical snapshot**, not a target UI.

---

## 1. System Capability Context (Phase 2)

### What the System Could Do
- Everything from Phase 1
- Attach one or more ācārya commentaries to verses
- Display commentary text alongside canonical verse

### What the System Could NOT Do
- No users or personalization
- No education layer
- No search
- No multi-pane layouts
- No side-by-side commentary comparison

---

## 2. UI/UX Intent (Phase 2)

### Primary Question Phase 2 UI Answers
> “How can commentary be shown without interfering with the text?”

The UI must:
- Preserve **canonical primacy**
- Make commentary clearly secondary
- Avoid scholarly complexity

---

## 3. UI/UX Philosophy (Phase 2)

### 3.1 Canonical First, Commentary Second
- The verse remains the visual anchor
- Commentary is visually subordinate
- Clear labeling of authorship (ācārya)

### 3.2 Simplicity Over Power
- No comparison tools
- No simultaneous multiple commentaries
- One viewpoint at a time

---

## 4. Layout Characteristics

### Overall Layout
```

┌──────────────────────────────┐
│ Header (minimal)             │
├──────────────────────────────┤
│ Main Content (single column) │
│                              │
│ Verse (Śloka + Translation)  │
│                              │
│ ──────────────────────────   │
│ Commentary (below / toggle)  │
│                              │
├──────────────────────────────┤
│ Footer (minimal)             │
└──────────────────────────────┘

````

### Key Properties
- Still single-column
- Commentary flows *after* the verse
- No horizontal separation

---

## 5. Pages & Routes (Phase 2)

### Canonical Routes (unchanged)
- `/bg`
- `/bg/[chapter]`
- `/bg/[chapter]/[verse]`

No new routes are introduced.

---

## 6. Core UI Components (Phase 2)

### New Components Introduced

| Component | Responsibility |
|---------|----------------|
| `CommentaryBlock` | Displays commentary text |
| `AcharyaLabel` | Identifies the commentator |
| `CommentaryToggle` (optional) | Show / hide commentary |

---

### Modified Components

| Component | Change |
|---------|--------|
| `VersePage` | Now includes commentary section |
| `VerseText` | Remains unchanged |

---

### Components That Do NOT Exist Yet
- Sidebar navigation
- Right context pane
- Commentary comparison tools
- Persistent UI shell
- User controls

---

## 7. Verse Page Structure (Phase 2)

```text
Bhagavad-gītā 2.47

[ Sanskrit Śloka ]

[ Translation (English / Hindi) ]

──────────────────────────────
Commentary (Śrīla Prabhupāda)

[ Commentary text ]
````

### Optional Variation

* Commentary hidden behind a simple “Show Commentary” toggle

---

## 8. Interaction Model

### Commentary Interaction

* Either always visible **or**
* Explicitly expanded by reader
* No auto-scroll
* No auto-opening

### Navigation

* Same as Phase 1
* Previous / Next verse links

---

## 9. Accessibility Considerations (Phase 2)

* Commentary clearly labeled
* Screen readers announce:

  * “Commentary begins”
* No inline mixing of verse and commentary text

---

## 10. Technical Characteristics

* Commentary loaded separately from canonical text
* No shared state between verses
* No caching or persistence
* Simple conditional rendering

---

## 11. Intentional Limitations (Critical)

Phase 2 UI explicitly avoids:

* Showing multiple ācāryas simultaneously
* Commentary appearing beside the verse
* Any suggestion of interpretive hierarchy
* Scholarly tooling

These are deferred to later phases **by design**.

---

## 12. Relationship to Other Phases

* Extends Phase 1 UI without restructuring it
* Sets ethical precedent for separation of layers
* Becomes structurally insufficient for:

  * Multiple commentaries
  * Education
  * Scholarly reading

Therefore, Phase 2 UI is **transitional**.

---

## 13. Relationship to Phase 5 UI

Phase 2 commentary UI is later:

* Relocated into the **Right Context Pane**
* Controlled via reader-invoked actions
* Clearly separated from canonical text

No Phase 2 UI elements survive *unchanged* into Phase 5.

---

## 14. Closing Statement

> **Phase 2 UI introduces interpretation
> without allowing it to dominate.**

Commentary is present, visible, and respectful —
but never central.

---

## ✅ Status

PHASE_2_UI_SNAPSHOT.md is **LOCKED**.

This snapshot must remain unchanged as a historical reference.

```

---

🌿 This now perfectly complements **PHASE_1_UI_SNAPSHOT.md**.

When you are ready, the natural next step is:

> **PHASE_3_UI_SNAPSHOT.md** — User-Aware UI

Just say the word, dear 🙏
```

