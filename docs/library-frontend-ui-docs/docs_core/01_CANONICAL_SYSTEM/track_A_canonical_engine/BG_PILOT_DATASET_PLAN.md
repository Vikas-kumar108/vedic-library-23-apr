# BG_PILOT_DATASET_PLAN.md
Bhagavad-Gītā Pilot Dataset Implementation Plan

Track A — Dataset Construction Phase

---

# 1. Purpose

This document defines the strategy for building the **first operational dataset**
for the Bhagavad-gītā.

Rather than immediately constructing the full dataset of **700 verses**, the system
will begin with a **pilot dataset**.

The pilot allows us to test:

• data structures  
• concept tagging  
• commentary storage  
• knowledge graph relationships  
• frontend rendering  

Once the pilot works reliably, the dataset can be expanded to the full text.

---

# 2. Why a Pilot Dataset

Large datasets introduce complexity.

Testing with a smaller dataset helps ensure:

schema correctness file structure validation relationship integrity UI compatibility
This approach prevents large-scale errors later.

---

# 3. Pilot Scope

The recommended pilot scope is:

Bhagavad-Gītā Chapter 2
Reasons:

• one of the most philosophically rich chapters  
• introduces key concepts of the Gītā  
• contains manageable dataset size  
• widely studied and commented upon  

Chapter 2 contains:

72 verses
---

# 4. Pilot Dataset Structure

The pilot dataset will follow the full directory structure.

Example:

corpus/bg/
Subdirectories used in the pilot:

corpus/bg/ ├── verses/ ├── commentaries/ ├── concepts/ ├── relationships/ ├── analysis/ └── metadata/
---

# 5. Verse Dataset Construction

The first stage is to create verse files.

Example:

corpus/bg/verses/bg.2.1.json corpus/bg/verses/bg.2.2.json ... corpus/bg/verses/bg.2.72.json
Each file must follow the canonical schema.

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

6. Commentary Pilot
The pilot should include at least two commentary traditions.
Recommended starting set:
Śaṅkara
Śrīla Prabhupāda
This allows testing of the commentary comparison framework.
Example directory:
corpus/bg/commentaries/
Structure:
corpus/bg/commentaries/shankara/bg.2.47.json
corpus/bg/commentaries/prabhupada/bg.2.47.json

7. Concept Registry Initialization
The pilot should include an initial concept set.
Example concepts:
atman
karma
dharma
detachment
equanimity
self_realization
karma_yoga
nishkama_karma
Concepts should be stored in:
corpus/bg/concepts/concepts.json
These concepts will later expand as the dataset grows.

8. Concept Tagging
Each verse must be tagged with concepts.
Example:
bg.2.47
Concept tags:
karma
dharma
karma_yoga
nishkama_karma
Relationships must be recorded in:
corpus/bg/relationships/verse_concepts.json

9. Verse Cross-References
Cross references help build the internal knowledge graph.
Example:
bg.2.47 → bg.3.8
bg.2.47 → bg.3.19
Stored in:
corpus/bg/relationships/verse_links.json

10. Verse Analysis
Each verse should have an analysis file.
Location:
corpus/bg/analysis/verse_analysis/
Example:
bg.2.47.md
This analysis follows the template defined in:
BG_VERSE_ANALYSIS_TEMPLATE.md

11. Chapter Analysis
Create a chapter-level analysis file.
Example:
corpus/bg/analysis/chapter_analysis/chapter_2.md
This file should follow the structure defined in:
BG_CHAPTER_ANALYSIS_FRAMEWORK.md

12. Metadata Files
Metadata helps describe the text and chapters.
Example location:
corpus/bg/metadata/
Example file:
chapter_metadata.json
Example structure:
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

13. Pilot Validation
Once the pilot dataset is created, several validations must occur.
Structural Validation
JSON files valid
directory structure correct
UID consistency

Concept Validation
concept tags accurate
concept registry consistent

Relationship Validation
verse_concepts relationships correct
cross references valid
concept links valid

14. Frontend Testing
The pilot dataset should be loaded by the frontend system.
Verify:
verse rendering
navigation
concept linking
commentary display
This ensures Track A integrates with Track B.

15. Knowledge Graph Testing
Test the knowledge graph queries.
Example queries:
Find all verses tagged with karma
Find all verses connected to bg.2.47
Find concepts appearing most frequently in Chapter 2
These tests confirm graph functionality.

16. Pilot Review
After testing, the pilot dataset should be reviewed.
Review areas:
schema correctness
concept tagging consistency
commentary integration
analysis clarity
Any issues discovered should lead to adjustments in the schema or workflow.

17. Expansion Strategy
Once the pilot dataset is validated, expansion can proceed.
Recommended sequence:
Chapter 2 → Chapter 3 → Chapter 4
Then complete remaining chapters sequentially
Sequential expansion ensures philosophical continuity.

18. Long-Term Dataset Goal
The final Bhagavad-gītā dataset will contain:
700 verse files
multiple commentary traditions
100+ philosophical concepts
thousands of relationships
extensive analytical layers
This dataset becomes the core engine of the Vedic Library platform.

19. Role in the Platform
The dataset powers all four pillars:
Library
Education
Guidance
Community
The Bhagavad-gītā dataset will serve as the prototype knowledge base for the entire Vedic corpus.

20. Final Principle
The pilot dataset is the bridge between theoretical design and living system.
Through this pilot, the Bhagavad-gītā becomes the first text of a structured digital Vedic knowledge civilization.
