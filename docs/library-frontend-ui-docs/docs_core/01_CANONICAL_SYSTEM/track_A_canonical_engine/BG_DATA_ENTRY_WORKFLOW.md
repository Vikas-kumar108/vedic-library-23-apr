# BG_DATA_ENTRY_WORKFLOW.md
Bhagavad-Gītā Dataset Construction Workflow

Track A — Canonical Data Engine

---

# 1. Purpose

This document defines the **step-by-step workflow for building the Bhagavad-gītā dataset** used by the Vedic Library platform.

The goal is to ensure:

• consistent data entry  
• canonical integrity  
• accurate concept tagging  
• clean knowledge graph construction  

This workflow will be followed for **all 700 verses of the Bhagavad-gītā**.

Once refined, it will become the **standard workflow for the entire Vedic corpus**.

---

# 2. Guiding Principles

Dataset construction must follow several principles.

### Canonical Fidelity

The text must remain faithful to authoritative sources.

### Commentary Integrity

Each commentary must be preserved exactly as written.

The system must never:

• summarize  
• merge commentaries  
• reinterpret commentaries

### Analytical Transparency

Concept tagging and analysis must be clearly documented.

---

# 3. Dataset Construction Stages

Each verse will be processed in **five stages**.

Stage 1 Verse Entry
Stage 2 Linguistic Layer
Stage 3 Commentary Layer
Stage 4 Concept Tagging
Stage 5 Graph Integration
---

# 4. Stage 1 — Verse Entry

The first step is to create the verse file.

Example file:

corpus/bg/verses/bg.2.47.json
Minimum required structure:

```json
{
  "uid": "bg.2.47",
  "chapter": 2,
  "verse": 47,
  "devanagari": "...",
  "transliteration": "...",
  "synonyms": [],
  "translation": {
    "en": "",
    "hi": ""
  }
}
The verse text must be copied from reliable canonical editions.

5. Stage 2 — Linguistic Layer
The linguistic layer analyzes the Sanskrit.
Example:
synonyms:
  karmaṇi → in action
  eva → certainly
This layer enables future features:
• Sanskrit study tools • grammatical analysis • word exploration

6. Stage 3 — Commentary Layer
Commentaries are inserted separately.
Example directory:
corpus/bg/commentaries/shankara/
Example file:
bg.2.47.json
Example structure:
{
  "uid": "bg.2.47",
  "commentator": "shankara",
  "language": "sanskrit",
  "text": "..."
}
Important rule:
Each commentary must remain independent.

7. Stage 4 — Concept Tagging
Concept tagging connects verses to philosophical ideas.
Example file:
corpus/bg/relationships/verse_concepts.json
Example entry:
{
  "bg.2.47": [
    "karma",
    "dharma",
    "karma_yoga",
    "nishkama_karma"
  ]
}
Concept tagging should be conservative.
Only concepts clearly expressed in the verse should be added.

8. Stage 5 — Graph Integration
After concept tagging, the verse becomes part of the knowledge graph.
Example connections:
karma
  → bg.2.47
  → bg.3.8
  → bg.3.19
This allows concept navigation.

9. Commentary Analysis Workflow
Commentaries may later be analyzed for philosophical insights.
Example analysis categories:
definition
argument
interpretation
scriptural_reference
This analysis will remain separate from the canonical commentary text.

10. AI Assistance Guidelines
AI tools may assist with:
• translation drafts • concept suggestions • commentary segmentation
However:
All AI output must be reviewed manually.
AI suggestions are only proposals, not authoritative entries.

11. Version Control Workflow
Every verse entry should follow this process.
Edit dataset file
Review accuracy
Commit changes
Push to repository
Example commit message:
Add verse dataset for bg.2.47
Add Shankara commentary
Tag concepts karma, dharma
This ensures traceability.

12. Quality Control
Periodic review must ensure:
• consistent concept tagging • commentary accuracy • UID correctness
Review may be done chapter by chapter.

13. Dataset Construction Order
The recommended order is sequential.
Chapter 1
Chapter 2
Chapter 3
...
Chapter 18
This allows:
• conceptual continuity • thematic understanding

14. Prototype Scope
The first experimental phase should process:
Chapter 2
Reasons:
• philosophically rich • introduces core metaphysical ideas • manageable size
This chapter will serve as the pilot dataset.

15. Long-Term Dataset Goal
Final Bhagavad-gītā dataset:
700 verse files
multiple commentary traditions
100+ philosophical concepts
knowledge graph connections
This dataset becomes the foundation of the Vedic Knowledge Graph.

16. Expansion Beyond the Gītā
Once the workflow is stable, the same process will be used for:
• Upaniṣads • Śrīmad Bhāgavatam • Mahābhārata • Purāṇas • Vedānta texts

17. Final Principle
Dataset construction is not merely technical work.
It is an act of preserving and structuring sacred knowledge.
The goal is to reveal the philosophical architecture contained within the śāstra.

