📸 UI SNAPSHOT — DESCRIPTIVE, NOT PRESCRIPTIVE

This document captures the observed UI structure and reading experience
of Phase 1 (v1.0-pilot) *after completion*.

It is a historical snapshot for reference and comparison only.

It does NOT:
- define requirements
- mandate UI structure
- override phase documents
- constrain future UI decisions

Authoritative rules live in:
- PROJECT_CONSTITUTION.md
- UI_EVOLUTION_OVERVIEW.md
- Phase-specific tasklists



---

```md
# 🧱 PHASE_1_UI_SNAPSHOT.md  
## Vedic Library Project  
### System Phase 1 — Canonical Text Reading  
### UI/UX Snapshot: Minimal Reader UI

---

## 0. Purpose of This Document

This document records the **intended UI/UX state during System Phase 1** of the Vedic Library.

It exists to:
- Preserve architectural clarity
- Prevent future confusion or regression
- Explain *why* the UI was intentionally minimal
- Show how Phase 1 UI was designed to be **temporary and replaceable**

This is a **historical snapshot**, not a recommendation for current UI.

---

## 1. System Capability Context (Phase 1)

### What the System Could Do
- Display canonical text (Bhagavad-gītā)
- Verse-by-verse access
- Chapter-wise navigation
- Multi-language text display (EN / HI)

### What the System Could NOT Do
- No commentary layers
- No users or personalization
- No education or guidance
- No search
- No persistence

---

## 2. UI/UX Intent (Phase 1)

### Primary Question Phase 1 UI Answers
> “Can a human being read the Bhagavad-gītā online, clearly and calmly?”

Nothing more.

Phase 1 UI **explicitly avoids**:
- study workflows
- comparison views
- scholarly tooling
- personalization

---

## 3. UI/UX Philosophy (Phase 1)

### 3.1 Minimalism by Design
- Single reading column
- No side panes
- No overlays
- No hidden controls

### 3.2 Text Supremacy
- Śloka is the visual focus
- Typography favors readability over branding
- No visual hierarchy competing with the text

---

## 4. Layout Characteristics

### Overall Layout
```

┌──────────────────────────────┐
│ Header (minimal)             │
├──────────────────────────────┤
│ Main Content (single column) │
│                              │
│ Verse content                │
│                              │
├──────────────────────────────┤
│ Footer (minimal)             │
└──────────────────────────────┘

````

### Key Properties
- Single-column flow
- Page reload on navigation
- No persistent UI shell

---

## 5. Pages & Routes (Phase 1)

### Canonical Routes
- `/bg` — book index (simple chapter list)
- `/bg/[chapter]` — chapter page (list of verses)
- `/bg/[chapter]/[verse]` — verse page

---

## 6. Core UI Components (Phase 1)

### Components That Exist

| Component | Responsibility |
|---------|----------------|
| `BookIndexPage` | Lists chapters |
| `ChapterPage` | Lists verses |
| `VersePage` | Displays verse |
| `VerseText` | Renders śloka & translation |
| `SimpleNavLinks` | Previous / Next verse |

### Components That Do NOT Exist
- Sidebar navigation
- Commentary panels
- Toggle controls
- Context panes
- Search UI
- User controls

---

## 7. Verse Page Structure (Phase 1)

```text
Bhagavad-gītā 2.47

[ Sanskrit Śloka ]
[ Transliteration (IAST) ]
[ Word-by-word Synonyms ]
[ Translation (English / Hindi) ]
[ Purport ]
← Previous Verse | Next Verse →

### Notes

* UID may be visible but not emphasized
* Word-by-word synonyms are present
* Purport is present
* No comparative or toggle-based commentary

---

## 8. Interaction Model

### Navigation

* Link-based navigation
* Full page refresh
* No state persistence

### User Control

* Language selection (if available)
* No display preferences saved

---

## 9. Accessibility Considerations (Basic)

* Semantic HTML
* Readable font sizes
* No keyboard traps

Advanced accessibility features are deferred.

---

## 10. Technical Characteristics

* Static or server-rendered pages
* JSON-based data loading
* No global state
* No client-side routing required

---

## 11. Intentional Limitations (Very Important)

Phase 1 UI intentionally does NOT support:

* Deep navigation
* Scholarly comparison
* Study workflows
* Multi-pane layouts

These are deferred **by design**, not by lack.

---

## 12. Relationship to Later Phases

Phase 1 UI is:

* Correct for initial reading
* Educationally neutral
* Architecturally temporary

It is later:

* Extended in Phase 2
* Supplemented in Phase 3 & 4
* Fully absorbed and replaced in Phase 5

---

## 13. Closing Statement

> **Phase 1 UI exists to let the text speak.
> Nothing more. Nothing less.**

Any UI element not strictly required for reading
does not belong in Phase 1.

---

## ✅ Status

PHASE_1_UI_SNAPSHOT.md is **FINALIZED AS A HISTORICAL SNAPSHOT**.

It should not be edited except to correct factual errors.

This snapshot must remain unchanged as a historical reference.

---


