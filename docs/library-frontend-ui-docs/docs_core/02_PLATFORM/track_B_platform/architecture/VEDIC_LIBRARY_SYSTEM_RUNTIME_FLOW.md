# VEDIC_LIBRARY_SYSTEM_RUNTIME_FLOW.md
Runtime Architecture of the Vedic Library Platform

Track B — Platform Runtime System

---

# 1. Purpose

This document explains the runtime execution flow of the Vedic Library platform.

It describes how user interactions trigger data retrieval, processing, and rendering across multiple system layers.

The goal is to make the system understandable for developers working on:

• frontend UI  
• canonical dataset  
• knowledge graph  
• search engine  
• AI-assisted scholarship  

this document will describe the complete runtime behavior of the entire Vedic Library platform, not just the frontend.
It explains how every system layer interacts:
* dataset
* canonical registry
* loader
* router
* UI engine
* knowledge graph
* search
* AI layer (future)
This is essentially the operational blueprint of the whole platform.
---

# 2. High-Level Runtime Architecture

The Vedic Library runtime system consists of several interacting layers.

User Interface ↓ Routing Layer ↓ Scripture Loader ↓ Dataset Layer ↓ Knowledge Graph Layer ↓ Search / AI Systems
Each layer performs a specific responsibility.

---

# 3. User Interaction Layer

The runtime flow begins with user actions.

Examples:

open a verse navigate chapters search for a concept compare commentaries
Example URL:

/library/bg/2/47
The user intends to read Bhagavad-Gītā Chapter 2 Verse 47.

---

# 4. Routing Layer (Next.js)

Next.js App Router resolves the route.

Location:

src/app/library/[canon]/[chapter]/[verse]/page.tsx
Route parameters extracted:

canon = bg chapter = 2 verse = 47
The page component becomes responsible for retrieving the verse.

---

# 5. Canonical Registry Validation

Before loading data, the system can validate the canonical structure.

Registry location:

src/lib/corpus.structure.ts
This registry defines:

domain text section subwork chaptered works
Example hierarchy:

Itihāsa └─ Mahābhārata └─ Bhīṣma Parva └─ Bhagavad-Gītā
The registry ensures the requested route belongs to a valid canonical work.

---

# 6. Scripture Loader

The page calls the scripture loader.

Location:

src/features/scripture/scripture.loader.ts
Function:

loadVerseComposition(canon, chapter, verse)
The loader performs:

locate dataset file extract verse data normalize structure prepare composition object
---

# 7. Dataset Retrieval

The loader reads the dataset from the filesystem.

Example location:

data/bg/chapter_02.json
Example verse data:

{ "verse": 47, "devanagari": "...", "transliteration": "...", "synonyms": [], "translation": "...", "purport": "..." }
The loader extracts the correct verse.

---

# 8. Composition Assembly

The loader returns a structured composition.

Example:

{ canon: "bg", chapter: 2, verse: 47, devanagari: "...", transliteration: "...", synonyms: [], translation: "...", purport: "..." }
This object becomes the input to the rendering pipeline.

---

# 9. Rendering Pipeline

The rendering pipeline prepares the UI structure.

Location:

src/features/scripture/components/organisms/VerseDisplay.tsx
Responsibilities:

render canonical text handle navigation apply UI state organize layout
The pipeline converts the composition into UI-ready props.

---

# 10. UI State Integration

UI state is managed by:

ReadingModeContext
Location:

src/context/ReadingModeContext.tsx
Controls include:

scriptMode translation visibility study mode
These settings influence how the verse appears.

---

# 11. UI Component Rendering

The rendering pipeline delegates display to smaller components.

Structure:

VerseDisplay ├── Sloka ├── Transliteration ├── Synonyms ├── Translation └── Purport
Each component renders a specific section.

Example:

Sloka.tsx → Sanskrit verse Translation.tsx → translation text
---

# 12. Layout System

The layout system defines the reading interface.

Location:

src/components/layout/LayoutShell.tsx
Layout structure:

Header ↓ Control Panel ↓ Corpus Navigation ↓ Reading Panel
Components involved:

GlobalHeader CorpusTree VerseDisplay
---

# 13. Corpus Navigation System

The left sidebar shows the Vedic corpus structure.

Component:

src/components/CorpusTree.tsx
Data source:

src/lib/corpus.structure.ts
This registry drives navigation rendering.

Example:

Itihāsa └ Mahābhārata └ Bhīṣma Parva └ Bhagavad-Gītā
---

# 14. Navigation Flow

When a user clicks a verse:

CorpusTree ↓ Next.js Router ↓ page.tsx ↓ scripture.loader ↓ VerseDisplay ↓ UI Components
The new verse appears in the reading panel.

---

# 15. Knowledge Graph Layer (Future)

In future phases, the system will query the knowledge graph.

Location (future):

knowledge_graph/
This graph connects:

verses concepts commentaries texts authors
Example:

BG 2.47 ↓ concept: karma-yoga ↓ related verses
---

# 16. Commentary Engine (Future)

Commentary systems will retrieve commentarial texts.

Example sources:

Śaṅkara Rāmānuja Madhva Śrīla Prabhupāda
The commentary pane will render interpretations alongside the verse.

---

# 17. Search System (Future)

Search queries will trigger the search engine.

Possible architecture:

OpenSearch
Search flow:

user query ↓ search index ↓ verse retrieval ↓ UI results
---

# 18. AI Assistance Layer (Future)

AI systems may assist with research.

Example queries:

verses discussing detachment compare commentators find references to ātman
AI retrieves structured data from the knowledge graph.

---

# 19. Complete Runtime Flow

The complete system runtime pipeline is:

User Interaction ↓ Next.js Router ↓ Canonical Registry Validation ↓ Scripture Loader ↓ Dataset Retrieval ↓ Composition Assembly ↓ Rendering Pipeline ↓ UI Components ↓ Reading Interface
Future additions extend the pipeline:

knowledge graph search engine AI research assistant
---

# 20. Architectural Principles

The runtime system follows strict principles.

data layer independent of UI loader isolates dataset format routes mirror scripture hierarchy components remain stateless registry defines corpus structure
These rules ensure the platform remains scalable.

---

# 21. Long-Term Runtime Architecture

As the platform grows, the runtime system will support:

multiple scriptures multiple commentary traditions concept graph exploration AI-assisted scholarship educational pathways
The architecture is designed to scale to the entire Vedic corpus.

---

# 22. Summary

The Vedic Library runtime system transforms structured scripture data into an interactive reading environment.

Pipeline:

dataset ↓ loader ↓ router ↓ rendering pipeline ↓ UI components ↓ reader interface
Future layers will expand the system into a full Vedic knowledge exploration platform.

