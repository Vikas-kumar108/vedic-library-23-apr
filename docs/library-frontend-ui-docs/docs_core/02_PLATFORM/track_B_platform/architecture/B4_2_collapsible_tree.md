# B4.2 — Collapsible Corpus Tree

## Context

B4.1 introduced static structural sidebar.

Navigation was hierarchical but non-interactive.

This phase introduces true collapsible tree behavior
similar to legacy Vedabase software.

---

## Goals

- (+) Expand
- (−) Collapse
- Nested hierarchy
- Auto-expand active branch
- Future registry-driven support

---

## Architectural Principle

Tree is rendered recursively.

Each node:

- Has children
- Has open state
- Determines active route
- Expands automatically if active descendant exists

---

## Future Evolution

- Persist expanded state in localStorage
- Keyboard navigation
- Lazy loading children
- Search highlighting
