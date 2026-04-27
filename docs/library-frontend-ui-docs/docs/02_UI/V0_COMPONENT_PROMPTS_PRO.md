# V0 COMPONENT PROMPTS – PRODUCTION LEVEL

---

# 1. STRATEGY

## Why V0 Prompts Matter

V0 works best when:

* Context is clear
* Scope is focused
* Components are modular

---

## Rule

❌ Don’t generate full app
✅ Generate **one component at a time**

---

# 2. MASTER STYLE PROMPT (USE EVERY TIME)

Paste this BEFORE every prompt:

---

Use React, Next.js App Router, TailwindCSS, and shadcn/ui.

Design style:

* Minimal, clean, spiritual aesthetic
* Soft saffron (#F5E6C8), beige, white backgrounds
* Rounded cards (2xl radius)
* Subtle shadows
* Serif font for Sanskrit, sans-serif for UI
* Calm, readable spacing

Ensure:

* Fully responsive
* Accessible (ARIA where needed)
* Modular components

---

# 3. APP LAYOUT PROMPT

---

Create a 3-column application layout.

Layout requirements:

* Left sidebar (fixed width, scrollable)
* Center content area (flexible)
* Right sidebar (fixed width, scrollable)

Features:

* Full height (100vh)
* Independent scrolling for each column
* Responsive:

  * Mobile: sidebars collapse into drawers

Include:

* Placeholder components:
  SidebarTree
  ContentView
  RightPanel

Use Tailwind grid or flex.

---

# 4. TREE COMPONENT (CRITICAL)

---

Create a recursive tree navigation component.

Requirements:

* Infinite nesting support
* Expand/collapse nodes
* Show arrow icon for expandable nodes
* Highlight selected node
* Indent children visually

Interactions:

* Clicking arrow → expand/collapse
* Clicking label → select node

Design:

* Compact
* Text-first
* Hover highlight
* Smooth transitions

Data shape:

{
id: string,
name: string,
children?: []
}

---

# 5. CONTENT VIEW (PURANA TILAKAM STYLE)

---

Create a verse/content viewer component.

Layout:

* Title at top
* Sanskrit text (large, centered, serif font)

Below it:
Tabs:

* Shloka
* Transliteration
* Synonyms
* Translation
* Commentary

Behavior:

* Clicking tab switches content
* Active tab highlighted

Design:

* Clean, distraction-free
* Good line height for reading
* Section spacing

---

# 6. COMMENTARY SWITCHER

---

Create a commentary switcher component.

Features:

* Tabs or dropdown:
  Gaudiya, Madhva, Sri Vaishnava

* Language toggle inside commentary

Behavior:

* Switching updates content
* Smooth transition

---

# 7. RIGHT PANEL (APPLICATION ENGINE)

---

Create a right sidebar panel with stacked sections.

Sections:

1. Related Verses
2. Courses
3. Guidance Topics
4. Seva Domains

Each section:

* Title
* List of clickable items
* Card or list style

Design:

* Compact cards
* Soft background
* Scrollable

---

# 8. FILTER BAR (TOP)

---

Create a filter bar component.

Include:

* Age group buttons:
  Kids, Students, Professionals, Elders

* Category chips:
  Dharma, Vedanta, Ayurveda

* Language selector dropdown

Behavior:

* Active state highlighting
* Multi-select support

Design:

* Horizontal scroll if overflow
* Sticky top

---

# 9. SEARCH BAR

---

Create a search bar with autocomplete.

Features:

* Input field
* Suggestions dropdown
* Keyboard navigation

Supports:

* Verse search (1.1.1)
* Keyword search

Design:

* Minimal
* Centered or navbar

---

# 10. BREADCRUMB

---

Create a breadcrumb component.

Example:

Mahabharata > Bhisma Parva > Bhagavad Gita > 1.1

Features:

* Clickable segments
* Separator icons

---

# 11. COURSE CARD

---

Create a course card component.

Include:

* Title
* Description
* Tags (age group, category)
* Button (Start / View)

Design:

* Card layout
* Hover effect

---

# 12. SEVA DOMAIN CARD

---

Create a seva domain card.

Include:

* Sanskrit name
* English label
* Short description

Design:

* Cultural aesthetic
* Soft colors

---

# 13. FINAL INTEGRATION PROMPT

(Use after generating components)

---

Combine:

* SidebarTree
* ContentView
* RightPanel
* FilterBar

Into one cohesive layout.

Ensure:

* Consistent spacing
* Unified style
* Smooth interaction

---

# 14. PRO TIPS

## 1. Generate Iteratively

* First: structure
* Then: styling
* Then: interaction

---

## 2. Don’t Overload Prompt

Bad:
"Build full system with everything"

Good:
"Build tree component with recursion"

---

## 3. Refine

After generation:

* Ask V0 to improve spacing
* Improve typography
* Improve responsiveness

---

# 15. FINAL INSIGHT

You are not prompting UI.

You are:

> Designing a system through language.

---
