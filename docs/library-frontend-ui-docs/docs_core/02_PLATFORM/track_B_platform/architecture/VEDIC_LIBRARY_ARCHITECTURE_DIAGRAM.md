# VEDIC_LIBRARY_ARCHITECTURE_DIAGRAM.md
Vedic Library — Complete Platform Architecture Diagram

---

# 1. Purpose

This document provides a **high-level architectural overview** of the entire
Vedic Library platform.

It explains how the following layers interact:

• Frontend rendering engine  
• Canonical metadata registry  
• Scripture content registry  
• Future backend infrastructure  
• Education / Guidance / Community systems  

This document acts as the **master architectural map of the project**.

---

# 2. Platform Philosophy

The Vedic Library platform is designed as a **knowledge infrastructure** rather
than a typical web application.

Core principles:

• Scripture remains canonical  
• Editorial layers remain modular  
• UI remains a rendering engine  
• Metadata drives navigation  
• Backend evolves without breaking frontend  

This separation allows the platform to grow from a scripture reader into a
complete civilizational knowledge system.

---

# 3. High Level System Architecture

                 ┌──────────────────────────┐
                 │      Global Platform     │
                 │   (Next.js Application)  │
                 └─────────────┬────────────┘
                               │
                               ▼
                   ┌─────────────────────┐
                   │   Global Header     │
                   │  (4 Pillars Nav)    │
                   └─────────┬───────────┘
                             │
                             ▼
                ┌──────────────────────────┐
                │       Library System      │
                │   Scripture Workspace     │
                └─────────┬────────────────┘
                          │
                          ▼
                ┌──────────────────────────┐
                │      LayoutShell UI       │
                │  Corpus + Reading Panel   │
                └─────────┬────────────────┘
                          │
                          ▼
                ┌──────────────────────────┐
                │       CorpusTree          │
                │  Canonical Navigation     │
                └─────────┬────────────────┘
                          │
                          ▼
            ┌────────────────────────────────┐
            │   Canonical Metadata Registry  │
            │        (B → C Evolution)       │
            └──────────────┬─────────────────┘
                           │
                           ▼
             ┌──────────────────────────────┐
             │        Scripture Loader       │
             │  Loader Abstraction Layer     │
             └──────────────┬───────────────┘
                            │
                            ▼
             ┌──────────────────────────────┐
             │        Verse Composition      │
             │ Canonical + Editorial Layers  │
             └──────────────┬───────────────┘
                            │
                            ▼
             ┌──────────────────────────────┐
             │        VerseDisplay UI        │
             │  Rendering + Study Controls   │
             └──────────────────────────────┘

---

# 4. Frontend Rendering Layer

The frontend acts as a **structured rendering engine**.

Key responsibilities:

• Interpret canonical metadata  
• Resolve scripture routes  
• Load verse data  
• Render editorial layers  
• Respect study modes  

The frontend does NOT own scripture content.

---

# 5. Canonical Metadata Registry

Location:

src/lib/corpus.structure.ts
Purpose:

Defines the structural hierarchy of the Vedic corpus.

Example hierarchy:

Domain → Text → Section → Subwork → Chapter → Verse
Example:

Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā
Metadata defines:

• Navigation structure  
• Route bases  
• Canon capabilities  
• Commentary compatibility  
• Curriculum eligibility  

---

# 6. Scripture Loader Layer

Location:

src/features/scripture/scripture.loader.ts
Purpose:

Provides an abstraction layer between UI and content.

Responsibilities:

• Locate verse data  
• Load canonical layers  
• Combine editorial layers  
• Return structured composition  

The loader allows content to come from:

• JSON files  
• Database  
• Supabase  
• API services  

without affecting UI components.

---

# 7. Verse Composition Layer

The loader constructs a **verse composition object** containing:

| Layer | Description |
|------|-------------|
| Canonical | Sanskrit verse |
| Transliteration | Romanized verse |
| Synonyms | Word-for-word meanings |
| Translation | Interpretive translation |
| Exposition | Commentary / purport |

These layers remain independent.

---

# 8. UI Rendering Layer

Primary rendering component:

VerseDisplay.tsx
Responsibilities:

• Render canonical verse  
• Render editorial layers  
• Respond to study mode context  
• Maintain typographic hierarchy  

This component contains **no data loading logic**.

---

# 9. UI State Layer

Location:

ReadingModeContext.tsx
Controls reading environment.

State includes:

| State | Purpose |
|------|--------|
| scriptMode | Devanagari / IAST |
| showTranslation | Toggle translation |
| studyMode | Devotional / Scholarly / Comparative |

Future versions will support:

• URL persistence  
• Local storage  
• Multi-pane comparison  

---

# 10. Four Pillar Platform Structure

The platform is designed around four primary domains:

Home Library Education Guidance Community
Current active pillar:

Library

Future pillars will integrate with the canonical registry.

---

# 11. Future Backend Architecture

Planned backend services:

Supabase / Postgres │ ▼ Content Registry │ ▼ Commentary Database │ ▼ User Systems │ ▼ Curriculum Engine
Backend evolution will not change frontend rendering architecture.

---

# 12. Canonical Metadata Registry Evolution

Current system:

Registry B TypeScript metadata
Future system:

Registry C External canonical registry JSON-driven
Registry C will support:

• Dynamic corpus expansion  
• Commentary compatibility mapping  
• Curriculum tagging  
• Language axis support  

---

# 13. Education / Guidance / Community Systems

Future modules will connect to the canonical registry.

Canonical Registry │ ├─ Education │ Curriculum │ Learning paths │ ├─ Guidance │ Life-stage guidance │ Mentorship │ └─ Community Study groups Events Temple networks
---

# 14. Architectural Guarantees

The platform guarantees:

✔ Canonical integrity  
✔ Modular editorial layers  
✔ UI independence from storage  
✔ Canon-agnostic rendering  
✔ Scalable corpus architecture  

---

# 15. Long-Term Vision

The Vedic Library will evolve into:

• A scripture reading platform  
• A Vedic knowledge registry  
• A curriculum engine  
• A civilizational education infrastructure  

This architecture allows the platform to grow without structural refactoring.

---

# 16. Summary

The Vedic Library architecture consists of:

Frontend Rendering Engine  
Canonical Metadata Registry  
Scripture Loader Abstraction  
Verse Composition System  
Future Knowledge Infrastructure  

Together they form a scalable platform capable of supporting the entire
Vedic corpus and its educational ecosystem.
