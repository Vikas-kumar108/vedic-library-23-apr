# VEDIC_KNOWLEDGE_GRAPH_MASTER_SCHEMA.md
Master Schema for the Vedic Knowledge Graph

Track A — Core Data Architecture

---

# 1. Purpose

This document defines the **master schema for the Vedic Knowledge Graph** used by the Vedic Library platform.

The knowledge graph organizes the Vedic corpus as an interconnected network of:

- texts
- verses
- concepts
- commentaries
- authors
- philosophical relationships

Rather than treating scriptures as isolated documents, the platform represents them as **structured philosophical knowledge**.

---

# 2. Graph Architecture Overview

The Vedic Knowledge Graph contains several major node types.

Text Nodes Verse Nodes Concept Nodes Commentary Nodes Author Nodes Topic Nodes Relationship Edges
These nodes form a **philosophical network** connecting the entire Vedic corpus.

---

# 3. Node Types

## 3.1 Text Node

Represents a canonical work.

Examples:

Bhagavad-Gītā Ṛgveda Bṛhadāraṇyaka Upaniṣad Mahābhārata Manu Smṛti Yoga Sūtra
Example structure:

text_id title category tradition metadata
---

## 3.2 Verse Node

Represents a specific verse or textual unit.

Example:

bg.2.47
Attributes:

uid text_id chapter verse devanagari transliteration translation
Each verse node can connect to:

- concepts
- commentaries
- other verses
- themes

---

## 3.3 Concept Node

Represents a philosophical idea.

Examples:

concept.atman concept.karma concept.dharma concept.moksha concept.bhakti
Attributes:

concept_id sanskrit label definition category
Concept nodes connect to:

- verses
- other concepts
- educational modules

---

## 3.4 Commentary Node

Represents a commentary on a verse.

Example:

commentary.shankara.bg.2.47
Attributes:

commentary_id verse_uid author_id language text
Commentary nodes connect to:

Verse Author Concepts
---

## 3.5 Author Node

Represents a commentator or teacher.

Examples:

Śaṅkarācārya Rāmānuja Madhva Śrīla Prabhupāda Baladeva Vidyābhūṣaṇa
Attributes:

author_id name tradition era biographical_notes
Author nodes connect to:

Commentaries Traditions Texts
---

## 3.6 Topic Node

Topics represent broader educational themes.

Examples:

karma_yoga bhakti nature_of_self cosmology dharma
Topics connect multiple concepts and verses into educational pathways.

---

# 4. Relationship Types

Relationships form the edges of the graph.

---

## 4.1 Verse → Concept

Example:

bg.2.13 → concept.atman
Meaning: the verse discusses the concept.

---

## 4.2 Verse → Verse

Example:

bg.2.47 → bg.3.8
Meaning: the verses are philosophically connected.

---

## 4.3 Concept → Concept

Example:

karma → karma_yoga detachment → equanimity equanimity → sthita_prajna
Meaning: philosophical relationships between ideas.

---

## 4.4 Verse → Commentary

Example:

bg.2.47 → commentary.prabhupada.bg.2.47
Meaning: commentary explains the verse.

---

## 4.5 Commentary → Author

Example:

commentary.prabhupada.bg.2.47 → author.prabhupada
Meaning: commentary written by that author.

---

## 4.6 Concept → Verse

This allows concept exploration.

Example:

concept.karma → bg.2.47
Meaning: the verse discusses karma.

---

# 5. Example Graph Segment

Example network around BG 2.47.

bg.2.47 │ ├── concept.karma ├── concept.dharma ├── concept.karma_yoga │ ├── commentary.shankara.bg.2.47 ├── commentary.prabhupada.bg.2.47 │ └── bg.3.8
This structure creates a **multi-layer philosophical network**.

---

# 6. Knowledge Graph Queries

Once the graph exists, powerful queries become possible.

Example queries:

Find all verses discussing karma_yoga Find commentaries explaining detachment Find verses related to bg.2.47 Find all concepts in Chapter 2
These queries enable advanced research tools.

---

# 7. Role in the Platform

The knowledge graph powers several major platform features.

---

## Library Navigation

Users explore scripture through structured relationships.

---

## Concept Explorer

Users navigate philosophical ideas across texts.

---

## Commentary Comparison

Users compare interpretations from multiple traditions.

---

## Education Modules

Courses can be built using concept and verse networks.

---

## Research Tools

Scholars can analyze philosophical structures.

---

# 8. Storage Strategy

In early phases the graph will be stored using structured files.

Example:

verses.json concepts.json commentaries.json relationships.json
Later phases may migrate to a graph database.

Possible options:

Neo4j ArangoDB Dgraph
---

# 9. Relationship to Track A

Track A is responsible for building the knowledge graph.

Tasks include:

concept tagging verse relationships commentary integration concept relationships
These elements collectively build the graph.

---

# 10. Relationship to Track B

Track B builds the platform interface.

The frontend uses the knowledge graph to power:

navigation search concept exploration commentary viewing
---

# 11. Long-Term Vision

Eventually the knowledge graph will cover the full Vedic tradition.

Possible scale:

thousands of texts hundreds of thousands of verses thousands of concepts millions of relationships
This creates a **digital map of Vedic knowledge**.

---

# 12. Final Principle

The Vedic Knowledge Graph transforms scripture from:

static text

into

a living network of philosophical knowledge.

This structure allows the Vedic tradition to be explored, studied, and taught in entirely new ways.

What You Have Achieved Now
You have designed the complete intellectual architecture of a Vedic Knowledge Graph platform.
The layers now look like this:
Universal Concept Registry
        ↓
Concept Relationships
        ↓
Verse Tagging
        ↓
Commentary Network
        ↓
Knowledge Graph
        ↓
Platform Interface
This is far beyond a normal digital library. It is closer to building a civilizational knowledge infrastructure.
