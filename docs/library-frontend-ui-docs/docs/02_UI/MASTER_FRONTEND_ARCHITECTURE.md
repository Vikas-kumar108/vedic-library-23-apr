# VEDIC KNOWLEDGE SYSTEM – FRONTEND MASTER ARCHITECTURE

---

# 1. PURPOSE OF THE SYSTEM

## 1.1 Problem Statement

Modern knowledge systems suffer from:

* Fragmentation (books, courses, guidance separate)
* Lack of context (verses disconnected from life)
* Poor navigation (linear, not hierarchical)
* No personalization (same for all users)

---

## 1.2 Vision

To build a **Unified Vedic Knowledge Interface** where:

* All Śāstra is interconnected
* Knowledge is navigable like a tree
* Learning is contextual
* Application is immediate

---

## 1.3 Core Principle

> **Every unit of knowledge originates from canonical sources (Śāstra).**

Therefore:

* Verse = Atomic unit
* Everything else = Derived layer

---

# 2. SYSTEM ARCHITECTURE (CONCEPTUAL)

## 2.1 Four Pillars

| Pillar    | Purpose             |
| --------- | ------------------- |
| Library   | Canonical truth     |
| Education | Structured learning |
| Guidance  | Life application    |
| Community | Social embodiment   |

---

## 2.2 Three Axes Model

### Axis 1: Canonical Tree

* Source: vedic_corpus_registry.json
* Represents entire Vedic corpus

### Axis 2: Content Engine

* Displays verses, sutras, texts

### Axis 3: Application Layer

* Courses
* Guidance
* Seva domains

---

# 3. LAYOUT SYSTEM

## 3.1 Why 3-Column Layout?

### Problem:

Users lose context when navigating knowledge.

### Solution:

Show everything simultaneously:

* Left → Structure
* Center → Knowledge
* Right → Application

---

## 3.2 Layout Breakdown

### LEFT: Tree Navigation

Purpose:

* Represent full Vedic hierarchy

UX:

* Expand/collapse
* Deep nesting

Technical:

* Recursive component
* Lazy loading

---

### CENTER: Content Engine

Purpose:

* Display knowledge in structured form

UX:

* Tab-based navigation
* Clean reading experience

Technical:

* State-driven tab system
* Language switching

---

### RIGHT: Application Panel

Purpose:

* Connect knowledge to life

UX:

* Dynamic widgets
* Context-aware content

Technical:

* Fetch related data via relations

---

# 4. TREE NAVIGATION SYSTEM

## 4.1 Why Tree?

### Need:

Vedic corpus is inherently hierarchical.

### Solution:

Represent as expandable tree.

---

## 4.2 Data Source

```ts
vedic_corpus_registry.json
```

---

## 4.3 UX Requirements

* Infinite nesting support
* Fast navigation
* Visual clarity

---

## 4.4 Technical Implementation

### Structure

```ts
type TreeNode = {
  id: string
  name: string
  children?: TreeNode[]
}
```

---

### Rendering Strategy

* Recursive rendering
* Lazy expansion
* Virtualization (future)

---

## 4.5 Scaling Consideration

For 20 lakh nodes:

* Do NOT load full tree
* Load level-by-level
* Use API-based fetching

---

# 5. CONTENT ENGINE (VERSE VIEW)

## 5.1 Purpose

To present knowledge in layered format.

---

## 5.2 UX Model

Tabs:

* Shloka
* Transliteration
* Synonyms
* Translation
* Commentary

---

## 5.3 Why Tabs?

### Problem:

Too much information overwhelms user.

### Solution:

Layered visibility.

---

## 5.4 Commentary System

### Need:

Multiple interpretations exist.

### UX:

* Switch between sampradayas

### Technical:

```ts
commentary: {
  gaudiya: { en: string }
  madhva: { en: string }
}
```

---

## 5.5 Language System

### Need:

Global audience

### UX:

* Language switcher
* Persistent preference

### Technical:

* Context API or global store

---

# 6. APPLICATION PANEL

## 6.1 Purpose

Bridge:

> Knowledge → Application

---

## 6.2 Sections

* Related verses
* Courses
* Guidance
* Seva domains

---

## 6.3 UX Behavior

* Updates dynamically
* Context-aware

---

## 6.4 Technical Model

```ts
relations: {
  related_verses: string[]
  courses: string[]
  guidance: string[]
}
```

---

# 7. FILTER SYSTEM

## 7.1 Purpose

Personalization layer

---

## 7.2 Types

### Age Groups

* Kids
* Students
* Professionals

### Categories

* Dharma
* Vedanta

### Seva Domains

* Family
* Ecology

---

## 7.3 UX Placement

Top bar (global filters)

---

## 7.4 Technical Behavior

Filters affect:

* Recommendations
* Right panel
* Search results

---

# 8. DATA FLOW

## 8.1 Flow

1. User selects node
2. Fetch node data
3. Fetch related data
4. Render UI

---

## 8.2 Example

```ts
GET /api/node/bg_1_1
```

Returns:

* content
* commentary
* relations

---

# 9. FRONTEND ARCHITECTURE

## 9.1 Component Layers

### Core (Engine)

* Tree
* Content
* Graph

### Features

* Library
* Education
* Guidance

### Shared

* UI components
* Hooks

---

## 9.2 State Management

* React Context (initial)
* Later: Zustand or Redux

---

# 10. PERFORMANCE STRATEGY

## 10.1 Challenges

* 20 lakh nodes
* Deep nesting
* Multi-language

---

## 10.2 Solutions

* Lazy loading
* Caching
* Virtualized lists

---

# 11. FUTURE EXTENSIONS

* AI guidance engine
* Semantic search
* Personalized dashboards

---

# 12. FINAL INSIGHT

This system is not a website.

It is:

> A structured interface to a civilizational knowledge graph.

---
