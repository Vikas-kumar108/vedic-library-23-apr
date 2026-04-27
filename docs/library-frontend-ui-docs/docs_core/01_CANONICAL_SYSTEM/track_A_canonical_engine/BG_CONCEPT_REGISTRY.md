# BG_CONCEPT_REGISTRY.md
Bhagavad-Gītā Concept Registry

Track A — Concept Ontology Layer

---

# 1. Purpose

This document defines the **official registry of philosophical concepts**
used in the Bhagavad-gītā dataset.

Concepts are used for:

• verse tagging  
• knowledge graph construction  
• philosophical analysis  
• search and discovery  
• curriculum design  
• guidance systems  

All concept tags used in the dataset **must come from this registry**.

---

# 2. Concept Registry Principles

The registry follows several principles.

### Controlled Vocabulary

Concept tags must come from a **fixed controlled list**.

This prevents inconsistent tagging.

Example problem:

karma_yoga karma-yoga karma yoga
The registry enforces one official form.

---

### Neutral Terminology

Concept names must remain **neutral between philosophical schools**.

Example:

Avoid doctrinal labels unless clearly required.

---

### Sanskrit Root Priority

Whenever possible, the concept name should use **standard Sanskrit terminology**.

Example:

karma dharma atman prakriti guna
---

### English Readability

Concept identifiers should remain understandable to modern readers.

Example:

nishkama_karma
instead of a complex transliteration.

---

# 3. Concept Identifier Rules

Concept identifiers follow these rules.

lowercase underscore_separator no spaces no diacritics
Example:

karma_yoga bhakti_yoga sattva_guna self_realization
---

# 4. Core Concept Categories

Concepts are organized into categories.

This helps structure the knowledge graph.

---

# 5. Metaphysical Concepts

These describe the **nature of reality**.

Example concepts:

atman brahman ishvara prakriti purusha maya kala
---

# 6. Ontological Entities

These describe the **entities discussed in the Gītā**.

Example concepts:

jiva body mind intellect ego supersoul
---

# 7. Ethical Concepts

These relate to **moral and social duty**.

Example concepts:

dharma adharma svadharma karma tyaga sannyasa duty virtue
---

# 8. Psychological Concepts

These describe **inner mental states**.

Example concepts:

desire anger greed attachment fear delusion equanimity self_control
Many of these correspond to Sanskrit terms:

kama krodha lobha moha
---

# 9. Yogic Paths

These represent the **major spiritual disciplines**.

Example concepts:

karma_yoga jnana_yoga bhakti_yoga dhyana_yoga sankhya abhyasa vairagya
---

# 10. Liberation Concepts

These relate to **ultimate spiritual realization**.

Example concepts:

moksha liberation nirvana brahma_bhuta self_realization union_with_god
---

# 11. Devotional Concepts

These relate specifically to **bhakti traditions**.

Example concepts:

devotion surrender bhakti divine_service grace love_of_god
---

# 12. Cosmological Concepts

These describe the **structure of the universe**.

Example concepts:

guna sattva rajas tamas cosmic_creation cosmic_destruction time
---

# 13. Concept Relationships

Concepts often form clusters.

Example cluster:

karma dharma svadharma karma_yoga nishkama_karma
Another cluster:

atman self_realization moksha brahman liberation
These clusters become the **edges of the knowledge graph**.

---

# 14. Concept Metadata

Each concept may include metadata.

Example structure:

concept_id: karma_yoga sanskrit: कर्मयोग category: yogic_path description: discipline of performing action without attachment
This metadata will later power the **concept dictionary**.

---

# 15. Concept Expansion Policy

New concepts may be added when:

• multiple verses require the concept  
• the concept appears in commentaries  
• the concept is necessary for analysis

However, concepts should not be added casually.

---

# 16. Concept Review Process

Concept registry updates should follow a review process.

Steps:

proposal review approval registry update
This maintains consistency.

---

# 17. Integration with Knowledge Graph

Each concept becomes a **node in the knowledge graph**.

Example:

karma ↳ bg.2.47 ↳ bg.3.8 ↳ bg.3.19
This allows users to explore ideas across the text.

---

# 18. Future Expansion

Once the platform expands beyond the Gītā,
this registry will evolve into a **global Vedic concept ontology**.

It will cover:

Upaniṣads Mahābhārata Purāṇas Vedānta texts Bhakti literature
---

# 19. Concept Registry File (Dataset)

The registry will eventually exist as a dataset.

Example:

corpus/bg/concepts/concepts.json
Example entry:

{ "id": "karma_yoga", "sanskrit": "कर्मयोग", "category": "yogic_path", "description": "The discipline of performing prescribed action without attachment to results." }
---

# 20. Final Principle

The concept registry is the **philosophical vocabulary of the platform**.

Every verse, commentary, and teaching will connect to this vocabulary.

Through this structure, the platform reveals the **philosophical architecture of the Bhagavad-gītā**.

What This Document Achieves
This file defines the core ontology layer of your platform.
It connects:
Verses
↓
Concept Tags
↓
Concept Registry
↓
Knowledge Graph
↓
Education + Guidance Systems
That means your system is no longer just a text reader.
It becomes a structured philosophical knowledge system.

