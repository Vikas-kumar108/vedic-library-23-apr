# BG_RELATIONSHIP_SCHEMA.md
Bhagavad-Gītā Relationship Schema

Track A — Knowledge Graph Relationship Layer

---

# 1. Purpose

This document defines the **relationship model** used to connect
different elements of the Bhagavad-gītā dataset.

These relationships form the foundation of the **Bhagavad-gītā Knowledge Graph**.

They connect:

• verses  
• concepts  
• commentaries  
• philosophical themes  
• cross references  
• educational topics  

Through these relationships the platform becomes a **structured philosophical network** rather than a simple text collection.

---

# 2. Core Entities

The relationship schema connects several primary entities.

### Verse

Example:

bg.2.47
---

### Concept

Example:

karma karma_yoga dharma nishkama_karma
Defined in:

BG_CONCEPT_REGISTRY.md
---

### Commentary

Example commentators:

shankara ramanuja madhva prabhupada
Stored in:

corpus/bg/commentaries/
---

### Topic

Topics represent **educational themes** derived from concepts.

Example:

action_without_attachment duty_and_detachment self_realization
Topics support the **Education pillar**.

---

# 3. Relationship Types

The system supports several relationship types.

---

# 4. Verse → Concept

The most fundamental relationship.

Example:

bg.2.47 → karma bg.2.47 → dharma bg.2.47 → karma_yoga bg.2.47 → nishkama_karma
Dataset file:

corpus/bg/relationships/verse_concepts.json
Example structure:

```json
{
  "bg.2.47": [
    "karma",
    "dharma",
    "karma_yoga",
    "nishkama_karma"
  ]
}
This relationship powers:
• concept navigation • thematic exploration • knowledge graph mapping

5. Verse → Commentary
Each verse may have multiple commentaries.
Example:
bg.2.47 → shankara
bg.2.47 → ramanuja
bg.2.47 → madhva
bg.2.47 → prabhupada
This relationship enables the commentary comparison system.

6. Verse → Verse
Verses may reference or reinforce each other.
Example:
bg.2.47 → bg.3.8
bg.2.47 → bg.3.19
bg.2.47 → bg.5.10
Dataset file:
corpus/bg/relationships/verse_links.json
Example structure:
{
  "bg.2.47": [
    "bg.3.8",
    "bg.3.19",
    "bg.5.10"
  ]
}
This enables internal cross navigation within the Gītā.

7. Concept → Concept
Concepts often relate to other concepts.
Example:
karma → dharma
karma → karma_yoga
karma_yoga → nishkama_karma
Dataset file:
corpus/bg/relationships/concept_links.json
Example structure:
{
  "karma": ["dharma", "karma_yoga"],
  "karma_yoga": ["nishkama_karma"]
}
These links create the philosophical ontology graph.

8. Concept → Verse
The reverse relationship of verse tagging.
Example:
karma
  → bg.2.47
  → bg.3.8
  → bg.3.19
This allows users to explore all verses related to a concept.

9. Commentary → Concept
Commentaries may emphasize certain philosophical ideas.
Example:
shankara → jnana
ramanuja → bhakti
madhva → dualism
prabhupada → devotional_service
These links help analyze philosophical traditions.

10. Verse → Topic
Topics represent educational interpretations.
Example:
bg.2.47 → duty_and_detachment
bg.2.47 → action_without_attachment
Dataset file:
corpus/bg/relationships/verse_topics.json
This supports:
• course creation • educational pathways • teaching modules

11. Verse → Guidance Context
Verses may apply to real-life contexts.
Example:
bg.2.47 → decision_making
bg.2.47 → leadership
bg.2.47 → ethical_duty
This supports the Guidance pillar of the platform.

12. Cross-Text Relationships (Future)
Eventually the system will connect verses across texts.
Example:
bg.2.20 → isa_upanishad.1
bg.2.16 → kathopanishad.2.18
This builds the multi-text Vedic knowledge graph.

13. Relationship Storage Strategy
Relationships are stored as lightweight datasets.
Example directory:
corpus/bg/relationships/
Example files:
verse_concepts.json
verse_links.json
concept_links.json
verse_topics.json
This keeps the system simple and extensible.

14. Knowledge Graph Structure
All relationships combine to form the graph.
Example simplified graph:
bg.2.47
   ↓
karma
   ↓
karma_yoga
   ↓
nishkama_karma
This allows philosophical exploration.

15. Query Examples
Possible system queries:
Find all verses related to karma_yoga

Find all verses connected to bg.2.47

Find all concepts related to dharma
These queries power the search and discovery system.

16. Relationship Expansion
As the dataset grows, relationships may include:
• scriptural references • philosophical debates • historical interpretations
The schema is designed to grow gradually.

17. Future Graph Database Integration
In later phases relationships may be stored in a graph database.
Possible technologies:
Neo4j
ArangoDB
Amazon Neptune
However initial implementation remains file-based.

18. Data Integrity Rules
Relationships must always reference valid entities.
Example:
bg.2.47 must exist
karma must exist
Invalid references must be avoided.

19. Relationship Review
Relationships should be periodically reviewed for:
• philosophical accuracy • consistency across chapters • knowledge graph clarity

20. Final Principle
The relationship schema transforms the Bhagavad-gītā from a sequence of verses into a living network of ideas.
Through these connections the platform reveals the deep philosophical architecture of the text.
---

## What This Document Completes

Now your **Track A knowledge system is structurally complete**.

You now have the full architecture:

Verse Dataset ↓ Concept Registry ↓ Concept Tagging ↓ Relationship Schema ↓ Knowledge Graph ↓ Education + Guidance Systems
This is the **engine behind the entire Vedic Knowledge Platform**.


