# VEDIC_LIBRARY_DESIGN_SYSTEM.md
Vedic Library — Design System

---

# 1. Purpose

This document defines the **design system** of the Vedic Library platform.

It establishes the visual and interaction rules for:

• typography  
• colors  
• layout structure  
• UI components  
• interaction patterns  

The goal is to ensure that the interface remains:

• calm  
• readable  
• scholarly  
• consistent  

as the platform expands.

---

# 2. Design Philosophy

The Vedic Library interface must embody the following principles.

### Text First

Scripture text is always the primary focus.

UI elements must support reading rather than compete with it.

---

### Calm Interface

Avoid:

• bright colors  
• flashy animation  
• excessive visual noise

The interface should resemble a **quiet study environment**.

---

### Timeless Aesthetic

The platform should feel like a **scholarly reference system**, not a social media application.

Design should prioritize clarity over novelty.

---

### Hierarchy of Attention

Visual hierarchy must reflect the importance of elements.

Priority order:

1. Scripture text
2. Verse structure
3. Commentary
4. Navigation
5. UI controls

---

# 3. Layout System

The platform uses a **three-pane scholarly layout**.

┌──────────────┬──────────────────────┬──────────────────────┐ │ Navigation │ Scripture Reading │ Commentary / Context │ │ (Left Pane) │ (Center Pane) │ (Right Pane) │ └──────────────┴──────────────────────┴──────────────────────┘
### Left Pane

Corpus navigation tree.

### Center Pane

Primary reading environment.

### Right Pane

Contextual layers such as commentary and concepts.

---

# 4. Global Layout Structure

The top-level page structure is:

GlobalHeader │ ▼ LayoutShell ├── CorpusTree └── Reading Panel
Future layout may include:

RightContextPane
for commentary and concept exploration.

---

# 5. Typography

Typography is the most important design element.

### Font Categories

| Category | Usage |
|--------|------|
| Serif | scripture text |
| Sans-serif | UI controls |
| Monospace | technical references |

---

### Sanskrit Typography

Sanskrit verses should use fonts that support Devanāgarī clearly.

Examples:

• Noto Serif Devanagari  
• Sanskrit 2003  

---

### Transliteration

Roman transliteration should use:

• italic styling  
• slightly smaller size than Sanskrit

---

### Example Verse Layout

Devanāgarī (primary) Transliteration (italic) Synonyms Translation Purport
Spacing between layers must be generous.

---

# 6. Color System

The color palette should resemble **parchment and ink**.

### Background

#e8e2d3
Warm parchment tone.

---

### Reading Panel

#f4efe3
Slightly lighter reading surface.

---

### Navigation Background

#ede6d6
Subtle contrast for sidebar.

---

### Primary Text

#2b2218
Deep ink-like tone.

---

### Secondary Text

#6b5b45
Muted explanatory text.

---

### Hover States

#e4dbc7
Gentle highlight.

---

# 7. Component Hierarchy

Components follow the **atomic design model**.

Atoms ↓ Molecules ↓ Organisms ↓ Layouts
---

# 8. Atomic Components

Atoms are the smallest UI elements.

Examples:

| Component | Purpose |
|----------|--------|
Button | action trigger |
Typography | text styles |
Icon | symbolic UI |
Divider | section separation |
Badge | small label |

Atoms contain no logic.

---

# 9. Molecules

Molecules combine atoms into meaningful UI units.

Examples:

| Component | Purpose |
|----------|--------|
VerseCard | verse container |
ExpandableSection | collapsible content |
SearchBar | search interface |
Breadcrumb | navigation context |

---

# 10. Organisms

Organisms are complex UI structures.

Examples:

| Component | Purpose |
|----------|--------|
SidebarNavigation | corpus tree |
CanonNavigator | verse navigation |
ReadingPanel | scripture rendering |
FilterPanel | discovery tools |

---

# 11. Layout Components

Layouts define page structure.

Examples:

| Layout | Purpose |
|------|--------|
StandardTextLayout | basic reading |
CanonLayout | scripture workspace |
ComparisonLayout | commentary comparison |

---

# 12. Interaction Design

Interaction patterns must remain minimal and predictable.

Rules:

• no surprise UI changes  
• no auto-opening panels  
• no intrusive overlays

User control is always prioritized.

---

# 13. Navigation Design

Navigation should follow canonical hierarchy.

Example:

Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā → Chapter → Verse
The sidebar navigation reflects this structure.

---

# 14. Motion Design

Animations must be extremely restrained.

Allowed:

• subtle hover transitions  
• smooth panel resizing  
• gentle dropdown motion

Avoid:

• bouncing animations  
• flashy effects  
• distracting motion.

---

# 15. Responsive Design

Mobile interface adapts the layout.

### Desktop

Three-pane layout.

### Tablet

Two-pane layout.

### Mobile

Single reading column.

Sidebar becomes a slide-out panel.

---

# 16. Accessibility

Accessibility principles:

• high contrast text  
• keyboard navigation  
• clear focus indicators  
• semantic HTML structure

Scripture must remain readable for long sessions.

---

# 17. Design Evolution

The design system will evolve gradually.

However the following must remain stable:

• typography hierarchy  
• calm color palette  
• scripture-first layout

---

# 18. Final Principle

The design system exists to support **deep reading**.

The interface must feel like a **quiet library desk** rather than a modern app interface.

Every design decision should therefore ask:

Does this help the reader engage with the text?

