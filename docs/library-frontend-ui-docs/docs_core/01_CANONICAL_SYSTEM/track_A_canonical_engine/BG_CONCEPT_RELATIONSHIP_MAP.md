# BG_CONCEPT_RELATIONSHIP_MAP.md
Bhagavad-Gītā Concept Relationship Map

Track A — Knowledge Graph Layer

---

# 1. Purpose

This document defines the **philosophical relationships between concepts** used in the Bhagavad-gītā dataset.

While verse tagging identifies which concepts appear in each verse, the concept relationship map defines **how concepts are connected to each other**.

This creates the **conceptual knowledge graph** of the Bhagavad-gītā.

---

# 2. Why Concept Relationships Matter

Without concept relationships, the system only knows:

Verse → Concept
With relationships defined, the system can also know:

Concept → Concept Concept → Verse Verse → Verse
This enables powerful capabilities:

• conceptual navigation  
• philosophical exploration  
• knowledge graph queries  
• educational pathways  

---

# 3. Relationship Types

Concept relationships can have several types.

## 3.1 Hierarchical Relationships

Represents conceptual hierarchy.

Example:

karma └── karma_yoga
Meaning:

karma_yoga is a **specialized application** of karma.

---

## 3.2 Causal Relationships

Represents cause → effect.

Example:

desire → attachment → anger → delusion
This chain appears in **BG 2.62–63**.

---

## 3.3 Complementary Relationships

Concepts that work together.

Example:

karma_yoga ↔ detachment
Meaning:

detachment is necessary for proper practice of karma-yoga.

---

## 3.4 Philosophical Progression

Represents spiritual evolution.

Example:

karma → karma_yoga → equanimity → sthita_prajna → moksha
---

## 3.5 Oppositional Relationships

Concepts that contrast each other.

Example:

knowledge ↔ ignorance attachment ↔ detachment
---

# 4. Core Concept Network of Chapter 2

The central conceptual system of Chapter 2 can be visualized as:

Atman │ ├── eternal ├── unborn └── indestructible
Karma │ └── karma_yoga │ ├── detachment ├── duty └── equanimity
Equanimity │ └── buddhi_yoga │ └── sthita_prajna │ └── moksha
---

# 5. Concept Relationship Categories

Each relationship should include a category.

Possible categories:

hierarchy causal supportive oppositional progression
Example:

karma → karma_yoga (hierarchy) karma_yoga → detachment (supportive) detachment → equanimity (progression)
---

# 6. Data Representation

Relationships should be stored in:

corpus/bg/relationships/concept_relationships.json
Example structure:

```json
[
  {
    "source": "karma",
    "target": "karma_yoga",
    "relationship": "hierarchy",
    "description": "karma_yoga is the disciplined spiritual application of karma"
  },
  {
    "source": "karma_yoga",
    "target": "detachment",
    "relationship": "supportive",
    "description": "detachment is necessary for practicing karma_yoga"
  },
  {
    "source": "detachment",
    "target": "equanimity",
    "relationship": "progression",
    "description": "detachment leads to equanimity"
  }
]

7. Major Concept Chains in Chapter 2
Several important philosophical chains appear in the chapter.

7.1 Desire Chain (BG 2.62–63)
sense_contemplation
      ↓
attachment
      ↓
desire
      ↓
anger
      ↓
delusion
      ↓
memory_loss
      ↓
intelligence_destruction
      ↓
spiritual_downfall
This is one of the most important causal chains in the Bhagavad-gītā.

7.2 Karma Yoga Chain
action
  ↓
duty
  ↓
karma
  ↓
karma_yoga
  ↓
detachment
  ↓
equanimity

7.3 Wisdom Chain
knowledge
  ↓
buddhi
  ↓
buddhi_yoga
  ↓
steady_wisdom
  ↓
sthita_prajna

7.4 Liberation Chain
self_knowledge
      ↓
detachment
      ↓
equanimity
      ↓
sthita_prajna
      ↓
moksha

8. Concept Graph Role in the Platform
The concept relationship map powers several major platform features.

8.1 Concept Explorer
Users can explore:
karma
  → karma_yoga
  → detachment
  → equanimity

8.2 Guided Study Paths
Education modules can follow conceptual progressions.
Example:
Karma → Karma Yoga → Equanimity → Sthita Prajna

8.3 Knowledge Graph Visualization
The platform can visualize philosophical relationships as an interactive graph.

8.4 Cross-Śāstra Exploration
Eventually concepts will connect across texts.
Example:
Bhagavad-Gītā
Upaniṣads
Vedānta Sūtra
Purāṇas

9. Long-Term Expansion
Eventually the concept relationship map will include:
hundreds of concepts
thousands of relationships
cross-text connections
This will form the Vedic Knowledge Graph.

10. Role in Track A
Within Track A, this system enables:
concept tagging
concept navigation
concept clustering
philosophical analysis
This turns the Bhagavad-gītā dataset into a structured philosophical system rather than a simple digital text.

11. Final Principle
The Bhagavad-gītā is not merely a sequence of verses.
It is a network of philosophical concepts interacting with each other.
The Concept Relationship Map reveals this hidden structure and makes it navigable in the digital age.
