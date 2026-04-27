# VEDIC_LIBRARY_UI_COMPONENT_REGISTRY.md
Vedic Library — UI Component Registry

---

# 1. Purpose

This document catalogs all UI components used in the Vedic Library frontend.

The registry helps developers understand:

• what components exist  
• where they live in the codebase  
• what responsibility each component has  
• how components relate to the design system  

The registry ensures the codebase remains **organized and scalable** as the platform grows.

---

# 2. Component Architecture Model

The UI architecture follows the **Atomic Design model**.

Atoms ↓ Molecules ↓ Organisms ↓ Layouts ↓ Pages
Each level increases in complexity and responsibility.

---

# 3. Component Directory Structure

Primary UI components live inside:

frontend/src/components/
Additional feature-specific components live inside:

frontend/src/features/
Example structure:

src/ ├── components/ │ ├── layout/ │ ├── ui/ │ └── navigation/ │ └── features/ └── scripture/
---

# 4. Layout Components

Layout components define **page structure**.

Location:

src/components/layout/
| Component | File | Purpose |
|----------|------|--------|
GlobalHeader | GlobalHeader.tsx | Main site navigation header |
LayoutShell | LayoutShell.tsx | Primary reading workspace layout |

---

### GlobalHeader

Provides the global navigation system.

Navigation links:

Home Library Education Guidance Community
Includes:

• logo  
• dropdown-ready navigation  
• search placeholder  
• login link  

---

### LayoutShell

Defines the scripture reading workspace.

Structure:

LayoutShell ├── CorpusTree (left sidebar) └── Reading Panel (main content)
Also contains:

• study mode toggles  
• corpus toggle control  

---

# 5. Navigation Components

Navigation components help users move through the corpus.

Location:

src/components/
| Component | File | Purpose |
|----------|------|--------|
CorpusTree | CorpusTree.tsx | Hierarchical corpus navigation |
CorpusToggle | CorpusToggle.tsx | Show / hide sidebar |

---

### CorpusTree

Renders the canonical corpus navigation tree.

Data source:

src/lib/corpus.structure.ts
Features:

• hierarchical navigation  
• chapter expansion  
• verse links  
• active route highlighting

---

# 6. Scripture Rendering Components

Scripture-specific components live inside:

src/features/scripture/
Example structure:

features/scripture/ ├── components/ │ └── organisms/ │ └── mode/
---

### VerseDisplay

Location:

features/scripture/components/organisms/VerseDisplay.tsx
Purpose:

Renders the full verse workspace.

Layers rendered:

• Sanskrit verse  
• transliteration  
• synonyms  
• translation  
• purport  

Receives data through props.

---

# 7. Study Mode Controls

Study controls allow readers to customize the reading environment.

Location:

features/scripture/mode/
| Component | Purpose |
|----------|--------|
ScriptToggle | switch between Devanagari and IAST |
TranslationToggle | show or hide translation |
StudyModeToggle | devotional / scholarly reading mode |

These controls interact with:

ReadingModeContext
---

# 8. UI Utility Components

Generic UI elements are located inside:

src/components/ui/
Examples include:

| Component | Purpose |
|----------|--------|
ResizablePanelGroup | split layout panels |
ResizablePanel | resizable sections |
ResizableHandle | panel resizing control |
Separator | section divider |

These components typically come from **Radix UI / shadcn-based utilities**.

---

# 9. Context Providers

UI state is managed through React Context.

Location:

src/context/
| Provider | File | Purpose |
|---------|------|--------|
ReadingModeProvider | ReadingModeContext.tsx | manages study state |

State values include:

scriptMode showTranslation studyMode
---

# 10. Data-Driven Components

Some components render based on structured metadata.

Example:

CorpusTree
which reads from:

src/lib/corpus.structure.ts
This ensures the UI does not hardcode specific texts.

---

# 11. Future Components

The following components are planned but not yet implemented.

### RightContextPane

Displays:

• commentary  
• concept information  
• glossary entries

---

### CanonNavigator

Displays:

• previous verse  
• next verse  
• chapter navigation

---

### CommentaryPanel

Allows readers to select:

• commentary tradition  
• acharya  

and display commentary layers.

---

### ConceptExplorer

Allows exploration of philosophical concepts across texts.

---

# 12. Component Design Rules

All UI components must follow these principles.

### Single Responsibility

Each component performs one clear function.

---

### Data via Props

Components should receive data through props rather than loading data themselves.

---

### Minimal Logic

Complex data processing should happen in loaders or services, not UI components.

---

### Reusability

Components should be reusable across multiple parts of the platform.

---

# 13. Component Evolution

As the platform grows, new components should be added following the same structure:

Atoms Molecules Organisms Layouts
Each new component should be documented in this registry.

---

# 14. Maintenance

Whenever a new component is added:

1. Add it to this registry
2. Describe its responsibility
3. Link to its source file

This ensures the UI architecture remains understandable as the platform expands.

---

# 15. Summary

The UI component registry provides a structured overview of the platform’s frontend architecture.

It ensures:

• component clarity  
• architectural discipline  
• long-term maintainability  

The Vedic Library interface must remain **simple, readable, and respectful to scripture**, and the component system exists to support that goal.
