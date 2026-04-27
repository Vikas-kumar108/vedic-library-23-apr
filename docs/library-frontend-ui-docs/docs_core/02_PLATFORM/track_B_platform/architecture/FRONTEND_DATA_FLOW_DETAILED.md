# FRONTEND_DATA_FLOW.md
Vedic Library — Frontend Data Flow Architecture

Track B — Platform Foundation

---


# 1. Purpose

This document explains how scripture data moves through the Vedic Library platform from the raw dataset to the final rendered user interface.

The goal of this architecture is to maintain:

• strict separation between data and UI  
• predictable rendering behavior  
• scalability to thousands of texts  
• compatibility with server-side rendering  

it explains the entire lifecycle of scripture data:
data → loader → rendering pipeline → React components → UI display
When your project grows (Bhagavad-Gītā → Upaniṣads → Purāṇas → commentaries), this document will help every developer understand exactly how data flows.

---

# 2. High-Level Data Flow

The complete data flow pipeline is:

DATASET ↓ Data Loader ↓ Route Resolver ↓ Rendering Pipeline ↓ Verse Display Component ↓ UI Components ↓ User Interface
Each stage has a specific responsibility.

---

# 3. Data Source Layer

All scripture content originates in the dataset.

Current location:

data/ bg/ chapter_01.json chapter_02.json
Each chapter file contains structured verse data.

Example structure:

{ "chapter": 2, "title": "Sāṅkhya Yoga", "verses": [ { "verse": 47, "devanagari": "...", "transliteration": "...", "synonyms": [], "translation": "...", "purport": "..." } ] }
This layer contains **canonical text only**.

It contains no UI logic.

---

# 4. Data Loading Layer

Data is loaded through a dedicated loader.

Location:

src/features/scripture/scripture.loader.ts
The loader performs:

loadVerseComposition(canon, chapter, verse)
Responsibilities:

• locate correct chapter file  
• extract verse data  
• normalize structure  
• return structured composition  

Example output:

{ chapter verse devanagari transliteration synonyms translation purport }
The loader isolates the UI from dataset format changes.

---

# 5. Route Resolution Layer

Next.js App Router determines which verse to load.

Example route:

/library/bg/2/47
Mapped by:

src/app/library/[canon]/[chapter]/[verse]/page.tsx
Route parameters:

canon = bg chapter = 2 verse = 47
The page component calls the loader:

loadVerseComposition(canon, chapter, verse)
---

# 6. Rendering Pipeline

After data loading, the rendering pipeline prepares UI props.

Location:

src/features/scripture/components/organisms/VerseDisplay.tsx
Responsibilities:

compose display structure handle navigation apply UI state
Example props passed to VerseDisplay:

{ canon chapter verse title devanagari transliteration synonyms translation purport }
This layer acts as the **interface between data and UI**.

---

# 7. UI State System

UI display is controlled by ReadingModeContext.

Location:

src/context/ReadingModeContext.tsx
Controls:

scriptMode translationVisibility studyMode
Example behaviors:

devanagari only IAST only both scripts translation hidden scholarly mode
The rendering pipeline reads this state.

---

# 8. Component Rendering Layer

VerseDisplay delegates rendering to specialized components.

Structure:

VerseDisplay ├── Sloka ├── Transliteration ├── Synonyms ├── Translation └── Purport
Each component has a single responsibility.

Example:

Sloka.tsx
renders Sanskrit text.

Translation.tsx
renders translation.

Components are **pure UI**.

They do not load data.

---

# 9. Layout System

The layout system defines the reading environment.

Location:

src/components/layout/LayoutShell.tsx
Layout structure:

Header ↓ Reading Controls ↓ Corpus Sidebar ↓ Reading Panel
Components:

GlobalHeader CorpusTree Reading Panel
The layout system ensures consistent UI across pages.

---

# 10. Corpus Navigation System

The left sidebar displays the canonical structure.

Location:

src/components/CorpusTree.tsx
Data source:

src/lib/corpus.structure.ts
This file defines the hierarchy of the Vedic corpus.

Example structure:

Itihāsa └── Mahābhārata └── Bhīṣma Parva └── Bhagavad-Gītā
CorpusTree reads this registry and renders the navigation tree.

---

# 11. Navigation Flow

When the user clicks a verse:

CorpusTree Link ↓ Next.js Router ↓ page.tsx ↓ scripture.loader ↓ VerseDisplay ↓ UI Components
The page reloads with the new verse.

---

# 12. Header Navigation System

The global header provides top-level navigation.

Location:

src/components/layout/GlobalHeader.tsx
Navigation links include:

Home Library Education Guidance Community
These routes lead to different sections of the platform.

---

# 13. Rendering Example

Example user interaction:

User visits:

/library/bg/2/47
Flow:

Next.js router ↓ page.tsx ↓ loadVerseComposition(bg,2,47) ↓ VerseDisplay ↓ Sloka Transliteration Translation Purport ↓ Rendered UI
The verse appears in the reading panel.

---

# 14. Future Data Flow Extensions

Future phases will extend the pipeline.

Upcoming additions include:

commentary loader knowledge graph query concept tagging system search engine integration
Future flow:

Dataset ↓ Loader ↓ Concept Graph ↓ Commentary Engine ↓ Rendering Pipeline ↓ UI
---

# 15. Architectural Principles

The system follows these rules:

data must remain independent of UI UI components must not load data loaders isolate dataset format routes mirror scripture structure
These principles ensure long-term scalability.

---

# 16. Summary

The Vedic Library frontend follows a clean architecture:

dataset ↓ loader ↓ router ↓ rendering pipeline ↓ UI components ↓ reading interface
This architecture allows the platform to scale from a single text (Bhagavad-Gītā) to the entire Vedic corpus.
