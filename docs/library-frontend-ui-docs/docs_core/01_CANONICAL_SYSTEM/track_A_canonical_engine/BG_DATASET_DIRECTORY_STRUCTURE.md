# BG_DATASET_DIRECTORY_STRUCTURE.md
Bhagavad-Gītā Dataset Directory Structure

Track A — Canonical Data Engine

---

# 1. Purpose

This document defines the **filesystem directory structure**
for the Bhagavad-gītā dataset used by the Vedic Library platform.

The structure organizes:

• verses  
• commentaries  
• concepts  
• relationships  
• analysis layers  

A consistent directory structure ensures that the dataset remains:

• scalable  
• maintainable  
• machine-readable  
• easy for contributors to navigate

---

# 2. Dataset Root Location

The Bhagavad-gītā dataset will live inside the main corpus directory.

Example root:

corpus/bg/
Where:

bg = Bhagavad-gītā
This structure allows the system to later include other texts such as:

corpus/upanishads/ corpus/mahabharata/ corpus/puranas/
---

# 3. Top-Level Dataset Structure

The recommended directory structure is:

corpus/bg/ ├── verses/ ├── commentaries/ ├── concepts/ ├── relationships/ ├── topics/ ├── analysis/ └── metadata/
Each directory has a specific role.

---

# 4. Verses Directory

This directory stores the **canonical verse dataset**.

Example:

corpus/bg/verses/
Structure:

corpus/bg/verses/ ├── bg.1.1.json ├── bg.1.2.json ├── bg.1.3.json ... ├── bg.2.47.json ... ├── bg.18.78.json
Each file represents **one verse**.

Example structure:

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

5. Commentaries Directory
This directory stores all commentary traditions.
corpus/bg/commentaries/
Structure:
corpus/bg/commentaries/
├── shankara/
├── ramanuja/
├── madhva/
├── prabhupada/
└── others/
Each commentator has their own folder.
Example:
corpus/bg/commentaries/shankara/
Files:
bg.1.1.json
bg.1.2.json
bg.1.3.json
...
Example structure:
{
  "uid": "bg.2.47",
  "commentator": "shankara",
  "language": "sanskrit",
  "text": "..."
}

6. Concepts Directory
This directory contains the concept ontology.
Location:
corpus/bg/concepts/
Files:
concepts.json
concept_categories.json
Example concept entry:
{
  "id": "karma_yoga",
  "sanskrit": "कर्मयोग",
  "category": "yogic_path",
  "description": "Performing prescribed action without attachment to results."
}
This dataset powers:
• concept tagging • concept exploration • knowledge graph construction

7. Relationships Directory
This directory stores graph relationships.
Location:
corpus/bg/relationships/
Files may include:
verse_concepts.json
verse_links.json
concept_links.json
verse_topics.json
Example:
verse_concepts.json
{
  "bg.2.47": [
    "karma",
    "dharma",
    "karma_yoga",
    "nishkama_karma"
  ]
}
These files define the knowledge graph connections.

8. Topics Directory
Topics represent educational themes derived from concepts.
Location:
corpus/bg/topics/
Example files:
action_without_attachment.json
self_realization.json
duty_and_detachment.json
Example structure:
{
  "id": "action_without_attachment",
  "title": "Action Without Attachment",
  "description": "Performing one's duties without attachment to results.",
  "verses": ["bg.2.47", "bg.3.19"]
}
This directory supports the Education pillar.

9. Analysis Directory
This directory stores analytical research layers.
Location:
corpus/bg/analysis/
Possible subdirectories:
verse_analysis/
commentary_analysis/
philosophical_notes/
Example:
corpus/bg/analysis/verse_analysis/bg.2.47.md
These files contain the structured analysis created using:
BG_VERSE_ANALYSIS_TEMPLATE.md

10. Metadata Directory
Metadata describes the text itself.
Location:
corpus/bg/metadata/
Example files:
text_metadata.json
chapter_metadata.json
commentary_metadata.json
Example:
{
  "text": "Bhagavad-gītā",
  "chapters": 18,
  "verses": 700,
  "language": "Sanskrit",
  "context": "Mahābhārata Bhīṣma Parva"
}

11. Future Dataset Expansion
When the system expands, the same structure will be used for other texts.
Example:
corpus/
├── bg/
├── upanishads/
├── bhagavatam/
├── ramayana/
└── vedanta_sutra/
Each text becomes a modular dataset.

12. Dataset Integrity Rules
Several rules must be followed.
Unique UID
Every verse must have a unique identifier.
Example:
bg.2.47

File Consistency
Verse filenames must match their UID.
Example:
bg.2.47.json

Commentary Alignment
Commentary files must reference existing verse UIDs.

13. Version Control Strategy
Dataset changes should follow disciplined commits.
Example:
Add verse dataset bg.2.47
Add Shankara commentary for bg.2.47
Add concept tags
This allows:
• change tracking • scholarly transparency

14. Dataset Size Projection
Final Bhagavad-gītā dataset may contain:
700 verse files
7000+ commentary files
100+ concepts
thousands of relationships
Despite this size, the filesystem structure remains manageable.

15. Long-Term Goal
This dataset becomes the canonical machine-readable Bhagavad-gītā knowledge base.
It will support:
• advanced search • knowledge graph exploration • education systems • AI-assisted study tools

16. Final Principle
The directory structure is the physical architecture of the Bhagavad-gītā knowledge system.
Every verse, concept, and commentary must have a clear and predictable place within this structure.
---

## What This Document Completes

Now you have defined **every structural layer of the Bhagavad-gītā system**:

Ontology (Concept Registry) ↓ Dataset Structure ↓ Verse Files ↓ Commentary Files ↓ Relationships ↓ Knowledge Graph
That means the system is now ready to **actually begin building the dataset**.

