# VEDIC_CONCEPT_UNIVERSAL_REGISTRY.md
Universal Vedic Concept Registry

Track A — Knowledge Graph Foundation

---

# 1. Purpose

This document defines the **Universal Concept Registry** for the Vedic Library platform.

The registry establishes a **shared philosophical vocabulary** that applies across the entire Vedic corpus.

Instead of each text defining its own isolated concepts, all texts reference **a unified concept system**.

This enables:

• cross-text philosophical navigation  
• concept-based exploration  
• knowledge graph queries  
• structured education pathways  

---

# 2. Role in the Knowledge Architecture

The Universal Concept Registry sits above individual datasets.

Architecture:

Vedic Corpus
    ↓
Texts
    ↓
Verses / Sections
    ↓
Concept Tags
    ↓
Universal Concept Registry

Thus every concept tag ultimately resolves to a **canonical concept definition**.

---

# 3. Registry Responsibilities

The registry defines:

• concept ID  
• canonical name  
• Sanskrit term  
• English label  
• definition  
• category  
• relationships to other concepts  

This ensures consistency across the platform.

---

# 4. Concept ID System

Each concept must have a **unique identifier**.

Example format:

concept.atman concept.karma concept.dharma concept.moksha
Text datasets should only reference **concept IDs**, not free text.

Example:

bg.2.13 → concept.atman
---

# 5. Core Concept Categories

Concepts are organized into major philosophical domains.

## 5.1 Metaphysical Concepts

Examples:

atman brahman prakriti purusha maya guna
These describe the nature of reality.

---

## 5.2 Ethical Concepts

Examples:

dharma karma duty virtue sin
These govern moral action.

---

## 5.3 Psychological Concepts

Examples:

mind intellect ego desire attachment anger delusion
These describe internal states.

---

## 5.4 Yogic Concepts

Examples:

karma_yoga bhakti_yoga jnana_yoga dhyana renunciation equanimity
These describe spiritual practice.

---

## 5.5 Spiritual Realization Concepts

Examples:

self_realization liberation moksha enlightenment god_realization
These describe the final goals of spiritual life.

---

# 6. Example Concept Entry

Example concept definition:

```json
{
  "id": "concept.atman",
  "sanskrit": "आत्मन्",
  "label": "Ātman",
  "category": "metaphysical",
  "definition": "The eternal self or soul, distinct from the body and mind.",
  "related_concepts": [
    "concept.brahman",
    "concept.purusha",
    "concept.self_realization"
  ]
}

7. Registry Storage
The registry should be stored in:
corpus/concepts/universal_concepts.json
This file becomes the central philosophical dictionary of the platform.

8. Relationship with Text Datasets
Text datasets (like the Bhagavad-gītā dataset) reference the registry.
Example:
bg.2.13
concepts:
- concept.atman
- concept.reincarnation
The registry provides the full meaning and connections of these concepts.

9. Cross-Text Concept Linking
Because concepts are universal, verses from different texts can connect.
Example:
Bhagavad-Gītā 2.20 → concept.atman
Kaṭha Upaniṣad 2.18 → concept.atman
Bṛhadāraṇyaka Upaniṣad 4.4 → concept.atman
This enables:
cross-scriptural exploration
Users can study a concept across the entire Vedic tradition.

10. Concept Hierarchies
Concepts may have hierarchical relationships.
Example:
yoga
 ├── karma_yoga
 ├── bhakti_yoga
 ├── jnana_yoga
 └── dhyana_yoga
These relationships should be stored in the registry.

11. Concept Relationship Types
Relationships may include:
hierarchy
cause
support
opposition
progression
Example:
karma → karma_yoga (hierarchy)
attachment → suffering (causal)
detachment ↔ equanimity (supportive)

12. Platform Features Enabled by the Registry
The Universal Concept Registry enables many platform capabilities.

12.1 Concept Explorer
Users can browse philosophical ideas:
dharma
karma
moksha
bhakti

12.2 Cross-Śāstra Navigation
Users can explore where a concept appears across texts.
Example:
concept.atman
→ Bhagavad-Gītā
→ Upaniṣads
→ Vedānta Sūtra

12.3 Education Modules
Concepts can become educational topics.
Example:
course: Understanding Karma
course: Nature of the Self

12.4 Knowledge Graph Visualization
Concepts become nodes in a large philosophical network.

13. Expansion Strategy
The registry will expand gradually.
Initial set:
50–100 concepts
Intermediate stage:
200–300 concepts
Long-term goal:
500+ concepts
Covering the full Vedic philosophical vocabulary.

14. Relationship to Track A
Track A uses the registry for:
concept tagging
relationship mapping
knowledge graph construction
The Bhagavad-gītā dataset will be the first implementation.
Later datasets will include:
Upaniṣads
Mahābhārata
Rāmāyaṇa
Purāṇas
Dharmaśāstra
Vedānta

15. Final Principle
The Universal Concept Registry transforms the Vedic Library from:
a collection of texts
into
a structured philosophical knowledge system.
It allows the entire Vedic tradition to be explored through the interconnected network of its fundamental ideas.
---

### What This Document Achieves

With this file you now have the **top layer of the philosophical knowledge architecture**:

Texts ↓ Verses ↓ Concept Tags ↓ Concept Relationships ↓ Universal Concept Registry
This is exactly how **modern knowledge graphs (like Wikidata)** operate — but yours is **specialized for Vedic philosophy**.

