# 🧩 COMPONENT_REGISTRY.md
## Track B – Authoritative Component Taxonomy

---

## 1. Component Philosophy

Components must follow:

- Single responsibility
- No direct data loading
- No routing logic
- No canonical assumptions
- No cross-layer awareness

Layout owns structure.
Display owns presentation.
Loaders own data retrieval.

---

## 2. Component Layers (Baseline B)

### 2.1 Atoms

Small, pure UI elements.

Examples:
- Button
- Divider
- ScriptBlock
- TranslationBlock
- Badge

Atoms must:
- Be stateless
- Accept props only
- Contain no domain knowledge

---

### 2.2 Molecules

Small combinations of atoms.

Examples:
- VerseNavigation
- ToggleGroup
- LanguageSelector
- ExpandableSection

Molecules may:
- Handle minor UI state
- Compose atoms

They must not:
- Access loaders
- Know canonical hierarchy

---

### 2.3 Organisms

Domain-aware UI blocks.

Examples:
- VerseDisplay
- CorpusTree
- SidebarNavigation
- ReadingPanel

Organisms:
- Receive structured props
- May use context
- May compose molecules

They must not:
- Load files directly
- Hardcode canon assumptions

---

### 2.4 Layouts

Structural containers.

Examples:
- LayoutShell
- CanonLayout
- ComparisonLayout (future)

Layouts:
- Define pane structure
- Control positioning
- Never render domain data directly

---

## 3. Strict Separation Rules

❌ Components must not:
- Load JSON directly
- Access filesystem
- Contain canonical registry logic
- Mix commentary layers implicitly

✔ Only page.tsx and loader abstractions may access data.

---

## 4. Future Expansion

Future additions (Baseline C evolution):

- ComparativePane
- EducationPane
- ConceptSidebar
- EntityInspector

These belong to `/vision` until implemented.

---

🕉️ Components are vessels.
Architecture protects them.
