# VEDIC_DATA_ENTRY_MASTER_WORKFLOW.md
Master Workflow for Vedic Corpus Data Entry

Track A — Operational Data Construction Guide

---

# 1. Purpose

This document defines the **standard workflow for entering textual data into the Vedic Library platform**.

It ensures that:

• all datasets follow consistent structure  
• concepts remain standardized  
• relationships remain accurate  
• the knowledge graph remains coherent  

This workflow applies to **all Vedic texts added to the platform**.

---

# 2. Scope of Data Entry

Data entry may involve multiple layers of content.

These include:

text registry entries verse datasets concept tagging commentary datasets verse relationships concept relationships analysis documents metadata
Each layer must follow the established architecture.

---

# 3. Data Entry Pipeline

All textual datasets must pass through the following pipeline.

Text Registration ↓ Dataset Structure Creation ↓ Verse Data Entry ↓ Concept Tagging ↓ Commentary Integration ↓ Relationship Mapping ↓ Analysis Documentation ↓ Validation
This pipeline ensures data integrity.

---

# 4. Step 1 — Register the Text

Before entering any text data, the text must be registered in the **Corpus Registry**.

File:

corpus/registry/text_registry.json
Example entry:

```json
{
  "text_id": "bg",
  "title": "Bhagavad-Gītā",
  "category": "itihasa",
  "structure": "chapter_verse",
  "chapters": 18,
  "verses": 700,
  "dataset_location": "corpus/bg/"
}
This step ensures that the platform recognizes the text.

5. Step 2 — Create Dataset Directory
Create the directory structure for the text.
Example:
corpus/bg/
Subdirectories:
verses/
commentaries/
concepts/
relationships/
analysis/
metadata/
This structure must be maintained consistently.

6. Step 3 — Enter Verse Dataset
Create verse files.
Example:
corpus/bg/verses/bg.2.47.json
Verse file schema:
{
  "uid": "bg.2.47",
  "chapter": 2,
  "verse": 47,
  "devanagari": "",
  "transliteration": "",
  "synonyms": [],
  "translation": {
    "en": "",
    "hi": ""
  }
}
Guidelines:
• Sanskrit must remain unchanged • transliteration must follow standard IAST • translations must preserve meaning

7. Step 4 — Tag Concepts
After verse entry, assign concept tags.
Example:
bg.2.47
concepts:
- concept.karma
- concept.dharma
- concept.karma_yoga
Concepts must be taken from:
Universal Concept Registry
No new concepts should be introduced without registry approval.

8. Step 5 — Add Commentaries
Commentaries must be stored separately.
Example:
corpus/bg/commentaries/prabhupada/bg.2.47.json
Schema:
{
  "uid": "bg.2.47",
  "author": "prabhupada",
  "language": "english",
  "text": ""
}
Each commentary is stored independently.
This allows commentary comparison.

9. Step 6 — Map Verse Relationships
Identify cross-references between verses.
Example:
bg.2.47 → bg.3.8
bg.2.47 → bg.3.19
Store in:
corpus/bg/relationships/verse_links.json
These relationships help build the knowledge graph.

10. Step 7 — Map Concept Relationships
Concept relationships must be stored separately.
Example:
karma → karma_yoga
detachment → equanimity
equanimity → sthita_prajna
Stored in:
corpus/relationships/concept_relationships.json
This defines the philosophical structure.

11. Step 8 — Create Analysis Documents
Each verse should have an analysis document.
Example:
corpus/bg/analysis/verse_analysis/bg.2.47.md
These documents include:
summary
concept discussion
commentary comparison
cross references

12. Step 9 — Chapter Analysis
Each chapter should have an overview document.
Example:
corpus/bg/analysis/chapter_analysis/chapter_2.md
This explains the philosophical structure of the chapter.

13. Step 10 — Metadata Creation
Metadata helps contextualize the text.
Example:
corpus/bg/metadata/chapter_metadata.json
Example:
{
  "chapter": 2,
  "title": "Sāṅkhya Yoga",
  "themes": [
    "self_knowledge",
    "karma",
    "detachment"
  ]
}

14. Step 11 — Dataset Validation
Before publishing the dataset, perform validation.
Validation checklist:
JSON syntax correct
UID format correct
concept tags valid
relationships valid
commentary links correct
Validation prevents corruption of the knowledge graph.

15. Step 12 — Platform Integration
After validation, test integration with the frontend.
Verify:
verse rendering
chapter navigation
concept tagging
commentary display
This ensures the dataset works with the platform.

16. Version Control
All datasets must be version controlled.
Recommended approach:
Git repository
structured commits
dataset version tags
Example commit message:
Add BG Chapter 2 Tier 1 verses

17. Editorial Governance
Large datasets require editorial discipline.
Editorial rules:
do not modify canonical Sanskrit
maintain concept consistency
document schema changes
review commentary sources
These rules maintain scholarly integrity.

18. Expansion Workflow
Once the workflow is validated with the Bhagavad-Gītā pilot, it can be applied to:
Upaniṣads
Mahābhārata
Rāmāyaṇa
Purāṇas
Dharmaśāstra
Vedānta works
Each text follows the same pipeline.

19. Automation Opportunities
In future phases, parts of the workflow may be automated.
Possible automation:
text ingestion tools
concept tagging assistance
relationship detection
graph construction
However human review will remain essential.

20. Final Principle
The Vedic Library platform is not merely digitizing texts.
It is building a structured philosophical knowledge system.
The data entry workflow ensures that the Vedic tradition can be represented faithfully while also becoming navigable through modern knowledge architecture.
---

## What You Now Possess

With this final document, **Track A is fully architected**.

You now have:

**Text layer**

- Corpus registry
- dataset structure

**Knowledge layer**

- concept registry
- concept relationships
- verse tagging

**Graph layer**

- knowledge graph schema
- relationships

**Operational layer**

- data entry workflow
- dataset construction plan

This is essentially the **blueprint of a Vedic knowledge civilization database**.

---
