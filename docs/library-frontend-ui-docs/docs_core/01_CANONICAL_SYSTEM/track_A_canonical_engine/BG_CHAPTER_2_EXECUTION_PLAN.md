# BG_CHAPTER_2_EXECUTION_PLAN.md
Bhagavad-Gītā Chapter 2 Dataset Execution Plan

Track A — Dataset Construction Phase

---

# 1. Purpose

This document defines the **step-by-step plan for constructing the Chapter 2 dataset** of the Bhagavad-gītā.

Chapter 2 serves as the **pilot implementation** for the entire Vedic knowledge system.

Once this chapter is complete, the same process can be applied to the remaining chapters.

---

# 2. Chapter Overview

Chapter Number: 2 Title: Sāṅkhya Yoga Verses: 72
This chapter introduces several foundational philosophical ideas:

nature_of_self karma detachment equanimity buddhi_yoga self_realization
Because of this richness, Chapter 2 is ideal for validating the knowledge system.

---

# 3. Phase 1 — Verse Dataset Creation

Create verse files for all 72 verses.

Directory:

corpus/bg/verses/
Files:

bg.2.1.json bg.2.2.json bg.2.3.json ... bg.2.72.json
Each verse file must include:

uid chapter verse devanagari transliteration synonyms translation
Example:

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

4. Phase 2 — Concept Tagging
Each verse should be tagged with 3–6 philosophical concepts.
Concepts must come from:
BG_CONCEPT_REGISTRY.md
Example:
bg.2.47
Concepts:
karma
dharma
karma_yoga
nishkama_karma
Store relationships in:
corpus/bg/relationships/verse_concepts.json

5. Phase 3 — Commentary Integration
Add commentary datasets for selected commentators.
Initial recommended set:
Śaṅkara
Śrīla Prabhupāda
Directory:
corpus/bg/commentaries/
Example:
corpus/bg/commentaries/shankara/bg.2.47.json
corpus/bg/commentaries/prabhupada/bg.2.47.json
Example structure:
{
  "uid": "bg.2.47",
  "commentator": "shankara",
  "language": "sanskrit",
  "text": "..."
}

6. Phase 4 — Verse Cross References
Identify related verses inside the Gītā.
Example:
bg.2.47 → bg.3.8
bg.2.47 → bg.3.19
bg.2.47 → bg.5.10
Store in:
corpus/bg/relationships/verse_links.json
These links form the internal conceptual network.

7. Phase 5 — Verse Analysis
Create an analytical document for each verse.
Directory:
corpus/bg/analysis/verse_analysis/
Example file:
bg.2.47.md
The analysis should follow:
BG_VERSE_ANALYSIS_TEMPLATE.md
Sections include:
verse meaning
philosophical themes
concept tags
commentary insights
cross references

8. Phase 6 — Chapter Analysis
Create the chapter-level analysis.
File:
corpus/bg/analysis/chapter_analysis/chapter_2.md
Use the framework defined in:
BG_CHAPTER_ANALYSIS_FRAMEWORK.md
Include:
chapter overview
dialogue context
concept clusters
key verses
philosophical role

9. Phase 7 — Concept Distribution Map
Analyze concept frequency across Chapter 2.
Example:
atman → 6 verses
karma → 8 verses
detachment → 10 verses
equanimity → 5 verses
This helps visualize the philosophical structure.

10. Phase 8 — Metadata
Create chapter metadata.
Location:
corpus/bg/metadata/chapter_metadata.json
Example:
{
  "chapter": 2,
  "title": "Sāṅkhya Yoga",
  "verses": 72,
  "themes": [
    "self_knowledge",
    "karma",
    "detachment"
  ]
}

11. Phase 9 — Validation
Once the dataset is created, run validation checks.
Structural validation
JSON syntax correct
UID consistency
file naming correct
Concept validation
tags match registry
no duplicate tags
Relationship validation
verse_concepts correct
cross references valid

12. Phase 10 — Frontend Integration
Test the dataset with the Vedic Library frontend.
Verify:
verse loading
chapter navigation
concept tagging
commentary display
This confirms Track A integrates with Track B.

13. Phase 11 — Knowledge Graph Testing
Test knowledge graph queries.
Example queries:
Find all verses tagged with karma
Find verses related to self_realization
Find cross-referenced verses
This confirms graph integrity.

14. Review Stage
After implementation, review:
concept tagging consistency
commentary accuracy
analysis clarity
knowledge graph connections
Adjust schema if necessary.

15. Expansion Strategy
Once Chapter 2 works reliably, expand the dataset.
Recommended sequence:
Chapter 2
Chapter 3
Chapter 4
Chapter 5
...
Chapter 18
This preserves philosophical progression.

16. Long-Term Outcome
After full expansion, the Bhagavad-gītā dataset will contain:
700 verse files
thousands of commentary files
hundreds of concept relationships
structured philosophical analysis
This dataset becomes the foundation of the Vedic Knowledge Graph.

17. Role in the Platform
The Chapter 2 dataset will power the first real implementation of:
Library reading system
Concept navigation
Commentary comparison
Knowledge graph exploration
Educational modules
Thus Chapter 2 becomes the prototype knowledge engine for the entire Vedic platform.

18. Final Principle
The construction of Chapter 2 is not only a dataset project.
It is the first living implementation of the Vedic knowledge architecture designed for the platform.
---
## What This Document Marks

Now the system moves from:

Architecture → Dataset construction
You now have **15 Track-A foundation documents**, which together define the **entire Bhagavad-gītā knowledge infrastructure**.

---
