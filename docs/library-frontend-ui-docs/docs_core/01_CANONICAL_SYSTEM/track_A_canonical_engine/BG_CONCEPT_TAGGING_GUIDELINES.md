# BG_CONCEPT_TAGGING_GUIDELINES.md
Bhagavad-Gītā Concept Tagging Guidelines

Track A — Analytical Layer

---

# 1. Purpose

This document defines the rules for assigning **philosophical concepts to verses** of the Bhagavad-gītā.

Concept tagging enables:

• knowledge graph construction  
• philosophical exploration  
• curriculum generation  
• guidance systems  

However, concept tagging must be done **carefully and consistently**.

These guidelines ensure that the process remains:

• accurate  
• transparent  
• philosophically responsible

---

# 2. What Is Concept Tagging

Concept tagging means identifying the **philosophical ideas expressed in a verse**.

Example:

Verse:

bg.2.47 karmaṇy evādhikāras te...
Possible concepts:

karma dharma karma_yoga nishkama_karma
These tags connect the verse to the **knowledge graph**.

---

# 3. Primary Rule

Concept tags must represent **ideas actually expressed in the verse**, not ideas merely associated with the verse in later interpretation.

Example:

If a verse explicitly discusses **action without attachment**, then:

nishkama_karma
may be tagged.

But a verse should not receive tags simply because commentators later expand its meaning.

---

# 4. Types of Concepts

Concepts generally fall into several categories.

### Metaphysical Concepts

Examples:

atman brahman prakriti purusha ishvara guna
---

### Ethical Concepts

Examples:

dharma karma svadharma adharma tyaga sannyasa
---

### Psychological Concepts

Examples:

manas buddhi ahamkara moha kama krodha lobha
---

### Yogic Concepts

Examples:

karma_yoga jnana_yoga bhakti_yoga dhyana_yoga sankhya abhyasa vairagya
---

### Liberation Concepts

Examples:

moksha nirvana brahma_bhuta parama_gati
---

# 5. Concept Granularity

Concepts should not be overly broad.

Example:

Instead of tagging only:

yoga
prefer more specific concepts:

karma_yoga jnana_yoga bhakti_yoga
Specific tags improve the knowledge graph.

---

# 6. Maximum Tags Per Verse

A verse should normally receive **3–6 concept tags**.

Too many tags reduce clarity.

Too few tags reduce usefulness.

---

# 7. Explicit vs Implicit Concepts

Concepts may be tagged if they are:

### Explicit

Directly stated in the verse.

Example:

atman
when the verse explicitly describes the self.

---

### Implicit

Strongly implied by the teaching.

Example:

nishkama_karma
in verses discussing detached action.

Implicit tagging should be used cautiously.

---

# 8. Commentary Influence

Commentaries may guide concept tagging, but they must not dominate it.

Example:

If multiple commentators interpret a verse as teaching **karma-yoga**, then tagging may include:

karma_yoga
However the concept must still be justified by the verse.

---

# 9. Avoid Over-Interpretation

Concept tagging must avoid speculative interpretation.

Example:

Do not tag a verse with:

advaita dvaita vishishtadvaita
unless the verse explicitly addresses the philosophical position.

The system must remain **neutral between schools**.

---

# 10. Concept Registry

All concept tags must come from the **official concept registry**.

Example file:

corpus/bg/concepts/concepts.json
New concepts should be added only after careful review.

---

# 11. Example Tagging

Example verse:

bg.2.20
Possible tags:

atman eternal_self immortality metaphysics
---

Example verse:

bg.3.19
Possible tags:

karma karma_yoga dharma nishkama_karma
---

# 12. Concept Relationships

Concepts often appear together.

Example cluster:

karma dharma karma_yoga nishkama_karma
These clusters help build the knowledge graph.

---

# 13. Review Process

Concept tagging should be reviewed periodically.

Review questions:

• Are tags supported by the verse?  
• Are tags consistent across chapters?  
• Are philosophical biases avoided?

---

# 14. Iterative Refinement

Concept tagging may improve over time.

Initial tags may later be refined after:

• commentary analysis  
• philosophical study  
• graph visualization

Updates should be recorded in version control.

---

# 15. Role of AI

AI may assist by suggesting concept tags.

However:

AI suggestions must always be **verified manually**.

The final decision belongs to **human scholarly judgment**.

---

# 16. Long-Term Goal

The concept tagging system will eventually map the **entire philosophical structure of the Bhagavad-gītā**.

This map becomes the foundation of the **Vedic Knowledge Graph**.

---

# 17. Final Principle

Concept tagging must illuminate the text,
not distort it.

The goal is to reveal the philosophical architecture already present in the śāstra.

