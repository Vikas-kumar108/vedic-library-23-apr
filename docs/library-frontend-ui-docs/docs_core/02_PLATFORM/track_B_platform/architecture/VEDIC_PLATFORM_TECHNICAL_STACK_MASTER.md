# VEDIC_PLATFORM_TECHNICAL_STACK_MASTER.md
Master Technical Stack of the Vedic Library Platform

Track B — Platform Infrastructure & Technology

---

# 1. Purpose

This document defines the complete technology stack used to build and operate the Vedic Library platform.

The platform is designed to support:

• large-scale scripture datasets  
• commentary traditions  
• concept knowledge graphs  
• educational systems  
• AI-assisted scholarship  

The architecture prioritizes:

• scalability  
• readability  
• developer clarity  
• long-term maintainability  

---

# 2. Platform Architecture Overview

The Vedic Library platform is composed of several layers.

Infrastructure Layer ↓ Application Framework ↓ Frontend System ↓ Canonical Data Engine ↓ Knowledge Graph Layer ↓ Search & Discovery ↓ AI Assistance Systems
Each layer uses specific technologies.

---

# 3. Infrastructure Layer

The infrastructure layer hosts and deploys the platform.

Current technologies:

GitHub Vercel Node.js runtime
### GitHub

Responsibilities:

source code management version control documentation repository collaboration workflow
### Vercel

Responsibilities:

frontend deployment server-side rendering edge functions automatic builds
### Node.js Runtime

Responsibilities:

Next.js server execution data loading API routes (future)
---

# 4. Application Framework

The primary application framework is:

Next.js (App Router)
Key features used:

file-based routing server components dynamic routes static rendering server-side rendering
Example route structure:

/library/[canon]/[chapter]/[verse]
Example implementation:

src/app/library/[canon]/[chapter]/[verse]/page.tsx
---

# 5. Frontend Framework

The UI layer is built using:

React TypeScript
### React

Responsibilities:

component-based UI state management interactive rendering
### TypeScript

Responsibilities:

type safety data model validation predictable code behavior
Example type definitions:

VerseComposition CorpusNode ConceptNode
---

# 6. Styling System

The platform uses:

Tailwind CSS
Benefits:

utility-first styling consistent design tokens responsive layouts fast UI development
Example usage:

className="text-sm font-serif text-[#3b3126]"
Tailwind enables rapid UI development without large CSS files.

---

# 7. UI Component System

UI components follow a structured architecture.

Example hierarchy:

LayoutShell ├── GlobalHeader ├── CorpusTree ├── ReadingControls └── ReadingPanel
Scripture display components:

VerseDisplay ├── Sloka ├── Transliteration ├── Synonyms ├── Translation └── Purport
Components follow a **single responsibility principle**.

---

# 8. Layout System

The reading interface uses a resizable panel system.

Technology used:

Radix UI primitives
Example component:

ResizablePanelGroup
This allows:

collapsible corpus navigation adjustable reading panel future commentary panels
---

# 9. Canonical Registry System

The canonical registry defines the structure of the Vedic corpus.

Location:

src/lib/corpus.structure.ts
Example hierarchy:

Itihāsa └ Mahābhārata └ Bhīṣma Parva └ Bhagavad-Gītā
The registry powers:

corpus navigation route validation future corpus expansion
---

# 10. Scripture Engine

The scripture engine loads canonical data.

Location:

src/features/scripture/scripture.loader.ts
Responsibilities:

dataset retrieval verse extraction composition assembly data normalization
Example function:

loadVerseComposition(canon, chapter, verse)
This isolates the UI from the dataset format.

---

# 11. Dataset Storage

Scripture data currently resides in structured JSON files.

Example:

data/bg/chapter_01.json data/bg/chapter_02.json
Each chapter file contains:

verses translations synonyms purports
Future storage options include:

Supabase PostgreSQL distributed datasets
---

# 12. Knowledge Graph Layer (Future)

The knowledge graph will represent relationships between:

verses concepts texts commentaries authors
Possible technologies:

graph database JSON graph structures custom relationship engine
Example relationships:

verse → concept concept → concept verse → commentary
---

# 13. Search System (Future)

Search functionality will be implemented using:

OpenSearch
Capabilities:

verse search concept search commentary search cross-text discovery
Search indexing will include:

verse text translation concept tags metadata
---

# 14. Authentication Layer (Future)

User systems may use:

Supabase Auth
Capabilities:

user accounts bookmarks annotations study progress
Authentication will be optional for reading.

---

# 15. Commentary System (Future)

The commentary engine will support multiple traditions.

Examples:

Śaṅkarācārya Rāmānuja Madhva Śrīla Prabhupāda
Commentaries will appear in the **right context pane**.

---

# 16. Educational System (Future)

Education features will support:

guided reading paths concept learning modules course systems teacher-led studies
This layer will build upon:

verse clusters concept graphs commentary traditions
---

# 17. AI Assistance Layer

AI systems may assist with research tasks.

Possible capabilities:

concept discovery verse clustering commentary comparison knowledge graph navigation
AI systems must always reference canonical sources.

---

# 18. Development Tools

The development environment uses:

Node.js npm TypeScript compiler Next.js build system
Commands:

npm run dev npm run build npm run start
---

# 19. Version Control Workflow

Version control uses Git.

Example workflow:

git add . git commit git push
GitHub tracks:

code changes documentation architecture evolution
---

# 20. Deployment Pipeline

Deployment process:

GitHub push ↓ Vercel build ↓ Next.js production build ↓ Deployment to edge network
The platform automatically updates when commits are pushed.

---

# 21. Long-Term Platform Scalability

The architecture is designed to scale to:

thousands of texts hundreds of thousands of verses multiple commentary traditions knowledge graph exploration AI-assisted scholarship
Each system layer can evolve independently.

---

# 22. Summary

The Vedic Library platform combines modern web technologies with structured knowledge systems.

Core technologies:

Next.js React TypeScript Tailwind CSS GitHub Vercel
Future technologies:

Supabase OpenSearch Knowledge graph systems AI research assistants
Together these technologies create a scalable platform for exploring the intellectual heritage of the Vedic tradition.

