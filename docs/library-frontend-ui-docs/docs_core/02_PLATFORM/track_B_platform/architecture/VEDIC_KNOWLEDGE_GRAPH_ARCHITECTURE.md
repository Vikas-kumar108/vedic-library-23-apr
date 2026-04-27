# VEDIC_KNOWLEDGE_GRAPH_ARCHITECTURE.md
Vedic Library — Knowledge Graph Architecture

---

# 1. Purpose

This document defines the **knowledge graph architecture** of the Vedic Library platform.

While the current platform focuses on **scripture rendering**, the long-term vision is to build a **structured knowledge network** connecting:

• verses  
• concepts  
• commentaries  
• authors (ācāryas)  
• educational modules  
• cross-text references  

This knowledge graph transforms the Vedic Library from a **text reader** into a **Vedic knowledge exploration system**.

---

# 2. What is the Knowledge Graph?

A **knowledge graph** is a structured network of connected entities.

In the Vedic Library context:

Concept ↕ Verse ↕ Commentary ↕ Concept ↕ Educational Module
Instead of reading isolated texts, users can explore **ideas across the entire Vedic corpus**.

---

# 3. Core Entities

The knowledge graph revolves around several primary entities.

### 3.1 Verse

The foundational canonical unit.

Example:

Bhagavad-gītā 2.47
Verse nodes connect to:

• concepts  
• commentaries  
• translations  
• cross-references

---

### 3.2 Concept

Concepts represent philosophical ideas or themes.

Examples:

| Concept | Description |
|-------|-------------|
| karma | action |
| karma-yoga | disciplined action |
| dharma | duty |
| bhakti | devotion |
| ātman | self |

Concept nodes connect to:

• verses  
• commentaries  
• educational lessons

---

### 3.3 Commentary

Commentaries are interpretive layers authored by specific ācāryas.

Example:

| Acharya | Work |
|--------|------|
| Śrīla Prabhupāda | Bhagavad-gītā As It Is |
| Rāmānuja | Gītā Bhāṣya |
| Madhva | Gītā Tatparya |

Commentary nodes connect to:

• verses  
• concepts  
• philosophical schools

---

### 3.4 Educational Modules

Educational systems use the knowledge graph to build structured learning.

Example:

Course: Introduction to Karma-Yoga
Connected nodes:

• relevant verses  
• concepts  
• commentary excerpts

---

# 4. Entity Relationships

The graph is formed through relationships between entities.

Verse ↔ Concept
Verse ↔ Commentary
Concept ↔ Concept
Concept ↔ Educational Module
Commentary ↔ Acharya
Example relationship map:

Bhagavad-gītā 2.47 │ ├── karma-yoga ├── niṣkāma karma └── dharma
karma-yoga │ ├── Bhagavad-gītā 3.7 ├── Bhagavad-gītā 5.2 └── Śrīmad Bhāgavatam 1.5.12
---

# 5. Concept Data Model

Concept nodes require structured metadata.

Example:

Concept { id: string name: string sanskrit: string description: string relatedConcepts: string[] }
Example instance:

{ id: "karma-yoga", name: "Karma Yoga", sanskrit: "कर्मयोग", description: "The discipline of selfless action.", relatedConcepts: ["karma", "dharma", "yoga"] }
---

# 6. Verse-Concept Mapping

Verses may reference multiple concepts.

Example:

VerseConceptLink { verseId: "bg.2.47" conceptId: "karma-yoga" }
This allows queries like:

Find all verses about karma-yoga
---

# 7. Commentary-Concept Mapping

Commentaries can also reference concepts.

Example:

CommentaryConceptLink { commentaryId: "prabhupada_bg_2_47" conceptId: "karma-yoga" }
This enables:

• concept-based commentary discovery  
• comparative philosophy tools

---

# 8. Cross-Text References

Verses can reference other verses.

Example:

CrossReference { source: "bg.2.47" target: "bg.3.7" relation: "philosophical continuation" }
This creates a network of textual relationships.

---

# 9. Knowledge Graph Visualization

The graph structure looks like:

    karma-yoga
      │
      │
┌─────┴─────┐
│           │
bg.2.47 bg.3.7 │ │ │ │ Prabhupāda Rāmānuja Commentary Commentary
Users can navigate ideas rather than only texts.

---

# 10. Educational Graph Layer

Education systems will leverage the knowledge graph.

Example structure:

Lesson ↕ Concept ↕ Verse
Example:

Lesson: Karma Yoga Introduction ↓ Concept: Karma Yoga ↓ Verses: bg.2.47 bg.3.7 bg.5.2
This allows building structured courses.

---

# 11. Storage Architecture (Future)

The knowledge graph may be stored using:

| Option | Description |
|------|-------------|
| PostgreSQL | relational graph tables |
| Neo4j | dedicated graph database |
| JSON registry | static graph files |

Initial phases may use **JSON mapping files**.

---

# 12. Query Examples

The graph allows advanced queries.

Examples:

Find all verses discussing dharma

Find commentaries discussing karma-yoga

Find verses referenced by Bhagavad-gītā 2.47

Generate curriculum for bhakti-yoga
---

# 13. Integration with the Canonical Data Model

The knowledge graph sits **on top of the canonical verse model**.

Canonical Verse Data │ ▼ Knowledge Graph Layer │ ▼ Education / Exploration Systems
Canonical data remains unchanged.

The graph simply connects it.

---

# 14. Platform Impact

The knowledge graph enables several powerful features.

### Concept Explorer

Navigate philosophical ideas.

### Cross-Text Discovery

Find verses across multiple scriptures.

### Commentary Comparison

Compare interpretations by different ācāryas.

### Curriculum Builder

Generate structured educational paths.

---

# 15. Implementation Timeline

Knowledge graph implementation will occur after:

Phase 5 — UI stabilization Phase 6 — Commentary infrastructure Phase 7 — Education system foundation
The graph layer will be introduced in **Phase 8+**.

---

# 16. Long-Term Vision

When complete, the Vedic Library will function as:

• a scripture reading environment  
• a philosophical knowledge graph  
• a curriculum engine  
• a community learning platform  

Users will be able to explore the Vedic tradition **conceptually, not just sequentially**.

---

# 17. Final Principle

The knowledge graph must always remain **anchored in canonical text**.

Concepts must arise from scripture rather than replacing it.

The graph exists to illuminate śāstra, not to reinterpret it.
