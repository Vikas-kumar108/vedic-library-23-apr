# DEVELOPER_ONBOARDING_GUIDE.md
Vedic Library — Developer Onboarding Guide

---

# 1. Welcome

Welcome to the **Vedic Library platform**.

This project is designed to become a **civilizational knowledge infrastructure**
for studying the Vedic corpus.

The platform combines:

• Canonical scripture reading  
• Structured metadata registry  
• Scholarly commentary systems  
• Educational pathways  
• Community learning tools  

This guide explains how the system works so that a new developer can
understand the project architecture quickly.

---

# 2. Project Philosophy

The Vedic Library is not built like a typical content website.

Instead it follows four core principles:

1. **Scripture First**

The interface must serve śāstra, not compete with it.

2. **Canonical Integrity**

Scripture text remains separate from commentary and interpretation.

3. **Architectural Separation**

Each layer has a single responsibility:

• Metadata  
• Content loading  
• Rendering  
• UI state  

4. **Future Scalability**

The platform must eventually support:

• The entire Vedic corpus  
• Multiple commentaries  
• Curriculum systems  
• Community study groups

---

# 3. High-Level System Overview

The platform architecture consists of five layers.

Frontend Rendering Engine │ ▼ Canonical Metadata Registry │ ▼ Scripture Loader Layer │ ▼ Verse Composition System │ ▼ UI Rendering Components
Each layer is intentionally isolated.

---

# 4. Repository Structure

The most important project directories are:

frontend/ docs_src/ data/ scripts/
### frontend/

Contains the Next.js application.

frontend/src/
Key areas:

| Directory | Purpose |
|-----------|--------|
| app | Next.js routing system |
| components | UI components |
| context | UI state systems |
| features/scripture | Scripture rendering system |
| lib | shared utilities and canonical registry |

---

# 5. Routing System

The platform uses **Next.js App Router**.

Current scripture route structure:

/library/[canon]/[chapter]/[verse]
Example:

/library/bg/2/47
Meaning:

| Parameter | Meaning |
|----------|--------|
| canon | scripture identifier |
| chapter | chapter number |
| verse | verse number |

The route maps to:

src/app/library/[canon]/[chapter]/[verse]/page.tsx
---

# 6. Canonical Metadata Registry

Location:

src/lib/corpus.structure.ts
This file defines the **hierarchical structure of the Vedic corpus**.

Example hierarchy:

Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā
The registry controls:

• navigation tree  
• route bases  
• commentary capability  
• curriculum eligibility  

The registry contains **no scripture content**.

---

# 7. Navigation System

The left sidebar navigation is rendered by:

src/components/CorpusTree.tsx
It reads exclusively from the **Canonical Metadata Registry**.

The tree dynamically expands into:

Canon → Chapters → Verses
This allows the UI to scale to the entire Vedic corpus without hardcoding texts.

---

# 8. Scripture Loader

Location:

src/features/scripture/scripture.loader.ts
The loader is responsible for:

• locating verse data  
• loading canonical layers  
• combining editorial layers  
• returning a structured verse object

Example loader output:

{ canon: "bg", chapter: 2, verse: 47,
devanagari: "...", transliteration: "...", synonyms: [...], translation: "...", exposition: "..." }
This abstraction allows content sources to change later without affecting UI.

---

# 9. Verse Rendering

The main rendering component is:

src/features/scripture/components/organisms/VerseDisplay.tsx
Responsibilities:

• render canonical verse  
• render transliteration  
• render synonyms  
• render translation  
• render commentary  

The component receives data through props and does not load content itself.

---

# 10. UI State System

Location:

src/context/ReadingModeContext.tsx
Controls reading environment settings.

Example state variables:

| State | Purpose |
|------|--------|
| scriptMode | Devanagari / IAST |
| showTranslation | Toggle translation |
| studyMode | Devotional / Scholarly / Comparative |

This allows the UI to adapt dynamically to user preferences.

---

# 11. Layout System

The reading interface is structured using:

LayoutShell.tsx
Layout structure:

GlobalHeader │ ▼ LayoutShell ├── CorpusTree (left navigation) └── Reading Panel (verse content)
The layout is designed as a **scholarly reading workspace**.

---

# 12. Global Navigation

The global header component is located at:

src/components/layout/GlobalHeader.tsx
Primary navigation:

Home Library Education Guidance Community
These represent the **four pillars of the platform**.

Currently only the **Library** pillar is implemented.

---

# 13. Development Workflow

Typical development workflow:

1. Start dev server

npm run dev
2. Build production bundle

npm run build
3. Commit changes

git add . git commit -m "message" git push
Deployment is handled automatically by **Vercel**.

---

# 14. Current Development Phase

Current phase:

Phase 5 — UI Refinement
Focus areas:

• header system  
• layout stability  
• corpus navigation  
• library landing pages  
• UI component architecture  

---

# 15. Future Platform Modules

The architecture is designed to expand into:

### Education

• guided learning paths  
• concept exploration  
• curriculum systems

### Guidance

• life-stage guidance  
• dharma advisory systems  
• mentorship

### Community

• study groups  
• discussion forums  
• temple network integration

---

# 16. Long-Term Platform Vision

The Vedic Library will eventually function as:

• a scripture reading system  
• a knowledge registry  
• an educational platform  
• a community learning environment

The architecture has been designed so that these systems
can grow without breaking existing functionality.

---

# 17. Where To Start as a Developer

Recommended reading order for new developers:

1️⃣ `FRONTEND_DATA_FLOW.md`  
2️⃣ `VEDIC_LIBRARY_ARCHITECTURE_DIAGRAM.md`  
3️⃣ `PLATFORM_ARCHITECTURE_v2.md`  
4️⃣ `HEADER_SYSTEM_SPEC.md`  

After reading these documents, explore the code starting from:

src/app/library/[canon]/[chapter]/[verse]/page.tsx
---

# 18. Final Principle

This project is not just software.

It is an attempt to build a **durable interface to the Vedic tradition**.

Code should therefore prioritize:

• clarity  
• stability  
• reverence for source texts  

over novelty or complexity.
