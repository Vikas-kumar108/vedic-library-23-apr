# COMPONENT ARCHITECTURE – VEDIC KNOWLEDGE SYSTEM

---

# 1. PHILOSOPHY OF COMPONENT DESIGN

## 1.1 Principle

Each component must represent:

* A **conceptual unit of knowledge interaction**
* Not just UI, but **meaningful behavior**

---

## 1.2 Layers of Components

| Layer   | Purpose                              |
| ------- | ------------------------------------ |
| Core    | System engine (tree, content, graph) |
| Feature | Domain-specific (library, courses)   |
| UI      | Visual building blocks               |

---

# 2. ROOT COMPONENT: APP LAYOUT

## Component: `AppLayout`

### Purpose

Defines the entire user experience structure.

---

### UX Responsibility

* Maintain 3-column layout
* Handle responsiveness
* Coordinate global state

---

### Structure

```tsx
<AppLayout>
  <SidebarTree />
  <ContentView />
  <RightPanel />
</AppLayout>
```

---

### Props

```ts
type AppLayoutProps = {
  treeData: TreeNode[]
  currentNode: Node
}
```

---

### Technical Notes

* Uses CSS Grid (12 columns)
* Collapsible panels (future)

---

# 3. TREE SYSTEM (LEFT PANEL)

---

## Component: `SidebarTree`

### Purpose

Render entire Vedic corpus hierarchy.

---

### UX Needs

* Infinite nesting
* Fast expansion
* Clear hierarchy

---

### Props

```ts
type SidebarTreeProps = {
  data: TreeNode[]
  onSelect: (node: TreeNode) => void
}
```

---

## Component: `TreeNode`

### Purpose

Recursive rendering unit.

---

### UX Behavior

* Click = expand/collapse
* Click label = select node

---

### State

```ts
const [isOpen, setIsOpen] = useState(false)
```

---

### Data Contract

```ts
type TreeNode = {
  id: string
  name: string
  path: string
  children?: TreeNode[]
}
```

---

### Scaling Strategy

* Lazy load children
* Avoid full tree render

---

# 4. CONTENT SYSTEM (CENTER PANEL)

---

## Component: `ContentView`

### Purpose

Display knowledge node.

---

### UX Needs

* Focused reading
* Layered information
* Clean layout

---

### Props

```ts
type ContentViewProps = {
  node: Node
}
```

---

## Component: `TabSystem`

### Purpose

Switch between content layers.

---

### Tabs

* Shloka
* Transliteration
* Synonyms
* Translation
* Commentary

---

### State

```ts
const [activeTab, setActiveTab] = useState("translation")
```

---

## Component: `CommentarySwitcher`

### Purpose

Switch sampradaya commentary.

---

### UX

* Tab or dropdown
* Multi-language support

---

### Data Contract

```ts
commentary: {
  [sampradaya: string]: {
    [language: string]: string
  }
}
```

---

## Component: `LanguageSwitcher`

### Purpose

Control language globally.

---

### UX

* Dropdown in navbar
* Per-section override (optional)

---

### Technical

* Context API

---

# 5. RIGHT PANEL SYSTEM

---

## Component: `RightPanel`

### Purpose

Display application layer.

---

### UX Needs

* Context-aware
* Dynamic updates

---

### Sections

```tsx
<RightPanel>
  <RelatedVerses />
  <CourseList />
  <GuidanceList />
  <SevaDomains />
</RightPanel>
```

---

## Component: `RelatedVerses`

### Purpose

Show linked verses.

---

### Data

```ts
related_verses: string[]
```

---

## Component: `CourseList`

### Purpose

Show relevant courses.

---

## Component: `GuidanceList`

### Purpose

Show life guidance topics.

---

## Component: `SevaDomains`

### Purpose

Show application domains.

---

# 6. FILTER SYSTEM

---

## Component: `FilterBar`

### Purpose

Provide personalization.

---

### UX

* Sticky top bar
* Multi-select filters

---

## Subcomponents

* AgeFilter
* CategoryFilter
* SevaFilter

---

### Data Contract

```ts
filters: {
  ageGroup?: string
  category?: string
  sevaDomain?: string
}
```

---

# 7. SEARCH SYSTEM

---

## Component: `SearchBar`

### Purpose

Enable direct access.

---

### UX

* Instant suggestions
* Sloka search (1.1.1)

---

### Future

* Semantic search

---

# 8. NAVIGATION COMPONENTS

---

## Component: `Breadcrumb`

### Purpose

Show hierarchical path.

---

### Example

Mahabharata > Bhisma Parva > Gita > 1.1

---

# 9. STATE MANAGEMENT

---

## Global State

```ts
{
  currentNode,
  language,
  filters
}
```

---

## Tools

* Context API (initial)
* Zustand (future)

---

# 10. DATA FLOW

---

## Flow

1. User selects node
2. Update global state
3. Fetch data
4. Render components

---

# 11. PERFORMANCE DESIGN

---

## Challenges

* Deep tree
* Large dataset

---

## Solutions

* Lazy loading
* Virtualization
* Memoization

---

# 12. COMPONENT RELATIONSHIP MAP

```
AppLayout
 ├── SidebarTree
 │     └── TreeNode
 ├── ContentView
 │     ├── TabSystem
 │     ├── CommentarySwitcher
 │     └── LanguageSwitcher
 └── RightPanel
       ├── RelatedVerses
       ├── CourseList
       ├── GuidanceList
       └── SevaDomains
```

---

# 13. FINAL INSIGHT

Each component must answer:

* What knowledge does it represent?
* What user action does it enable?
* How does it connect to the graph?

---

This is not UI.

This is a **knowledge interaction system**.

---
