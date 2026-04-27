# VEDIC_CORPUS_REGISTRY_SCHEMA.md
Master Schema for the Vedic Corpus Registry

Track A — Canonical Text Infrastructure

---

# 1. Purpose

This document defines the **Vedic Corpus Registry**, a structured catalog of all texts included in the Vedic Library platform.

The registry provides a unified framework for representing:

- canonical texts
- textual hierarchy
- textual classification
- dataset locations

It allows the platform to treat the Vedic corpus as a **structured intellectual library**, rather than a set of unrelated texts.

---

# 2. Role in the Platform Architecture

The corpus registry connects the **knowledge graph layer** with the **platform navigation system**.

Architecture:

Corpus Registry  
↓  
Text Datasets  
↓  
Verses / Sections  
↓  
Concept Tags  
↓  
Knowledge Graph

The registry provides the **entry point for all textual data**.

---

# 3. Registry Responsibilities

The Vedic Corpus Registry defines:

• text identifier  
• canonical title  
• textual classification  
• structural hierarchy  
• dataset location  
• metadata  

This ensures every text can be consistently loaded and navigated.

---

# 4. Text Identifier System

Each text must have a unique **text ID**.

Example format:

bg rigveda katha_upanishad mahabharata manu_smriti yoga_sutra
Text IDs are used throughout the platform:

bg.2.47
Structure:

textID.chapter.verse
---

# 5. Canonical Classification

Texts are categorized according to traditional Vedic classification.

Primary domains:

śruti smṛti itihāsa purāṇa āgama darśana
These categories correspond to the highest level of the corpus tree.

---

# 6. Hierarchical Structure

Texts may contain multiple structural layers.

Possible hierarchy:

domain ↓ text ↓ section ↓ subwork ↓ chapter ↓ verse
Example (Bhagavad-gītā):

itihāsa └── mahābhārata └── bhīṣma_parva └── bhagavad_gītā └── chapter └── verse
---

# 7. Example Text Registry Entry

Example entry for the Bhagavad-gītā:

```json
{
  "text_id": "bg",
  "title": "Bhagavad-Gītā",
  "category": "itihasa",
  "parent_text": "mahabharata",
  "section": "bhisma_parva",
  "structure": "chapter_verse",
  "chapters": 18,
  "verses": 700,
  "dataset_location": "corpus/bg/",
  "languages": [
    "sanskrit",
    "english",
    "hindi"
  ]
}

8. Example Registry Entry — Upaniṣad
{
  "text_id": "katha_upanishad",
  "title": "Kaṭha Upaniṣad",
  "category": "sruti",
  "structure": "chapter_verse",
  "chapters": 2,
  "verses": 119,
  "dataset_location": "corpus/upanishads/katha/"
}

9. Example Registry Entry — Dharmaśāstra
{
  "text_id": "manu_smriti",
  "title": "Manu Smṛti",
  "category": "smrti",
  "structure": "chapter_verse",
  "chapters": 12,
  "verses": 2685,
  "dataset_location": "corpus/smrti/manu/"
}

10. Registry Storage
The corpus registry should be stored in:
corpus/registry/text_registry.json
This file acts as the master catalog of the Vedic Library.

11. Integration with Frontend CorpusTree
The frontend currently uses a static corpus structure.
Future architecture will generate the navigation tree from the registry.
Example:
Corpus Registry
   ↓
Tree Builder
   ↓
Sidebar Navigation
This allows the interface to automatically update as new texts are added.

12. Integration with Dataset Loader
Dataset loaders will reference the registry.
Example workflow:
User opens verse
↓
route: /library/bg/2/47
↓
loader resolves text_id
↓
dataset path loaded from registry
Thus the registry acts as the routing map for the dataset system.

13. Metadata Fields
Each registry entry may include additional metadata.
Possible fields:
tradition
estimated_date
language
manuscript_sources
canonical_status
This metadata supports scholarly research.

14. Expansion Strategy
The registry will gradually include the full Vedic corpus.
Possible scale:
Vedas
Upaniṣads
Mahābhārata
Rāmāyaṇa
Purāṇas
Dharmaśāstra texts
Vedānta works
Yoga texts
Bhakti texts
Ultimately the registry may contain hundreds of texts.

15. Relationship to the Knowledge Graph
The corpus registry defines text nodes in the knowledge graph.
Example:
text.bg
text.katha_upanishad
text.manu_smriti
These nodes connect to:
verse nodes
concept nodes
commentary nodes
Thus the registry provides the textual backbone of the knowledge graph.

16. Role in Track A
Track A uses the corpus registry for:
dataset organization
text identification
knowledge graph construction
It ensures all datasets follow a consistent structure.

17. Role in Track B
Track B uses the registry to power:
navigation systems
search indexing
dataset loading
UI generation
This enables dynamic corpus expansion.

18. Long-Term Vision
When fully implemented, the Vedic Corpus Registry will represent the complete map of the Vedic textual universe.
Possible scale:
hundreds of texts
tens of thousands of chapters
hundreds of thousands of verses
All interconnected through the knowledge graph.

19. Final Principle
The Vedic Corpus Registry transforms the Vedic Library from:
a digital bookshelf
into
a structured map of the Vedic textual tradition.

### Important — What You Have Completed

With this file, the **entire Track A architecture is now fully defined**:

You now have:

- **Corpus Registry**
- **Knowledge Graph Schema**
- **Concept Registry**
- **Concept Relationships**
- **Verse tagging system**
- **Commentary framework**
- **Dataset architecture**
- **Execution plan**

This means Track A now has **complete theoretical infrastructure**.
