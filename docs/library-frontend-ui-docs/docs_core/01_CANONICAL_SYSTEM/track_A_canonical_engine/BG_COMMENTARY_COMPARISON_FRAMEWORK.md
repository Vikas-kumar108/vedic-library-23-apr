# BG_COMMENTARY_COMPARISON_FRAMEWORK.md
Bhagavad-Gītā Commentary Comparison Framework

Track A — Scholarly Comparative Analysis Layer

---

# 1. Purpose

This document defines the methodology for comparing **multiple commentaries on the Bhagavad-gītā**.

The comparison system allows scholars to:

• analyze philosophical differences  
• understand interpretive traditions  
• explore sampradāya perspectives  
• build structured comparative studies  

This system transforms the Vedic Library from a **text repository** into a **philosophical research platform**.

---

# 2. Supported Commentary Traditions

The system is designed to accommodate major commentary traditions.

Initial set:

Śaṅkara Rāmānuja Madhva Śrīla Prabhupāda Abhinavagupta (optional) Śrīdhara Svāmī (future)
Each commentary remains **fully independent**.

The system does **not merge or synthesize commentaries automatically**.

---

# 3. Commentary Storage Structure

Commentaries are stored separately from the verse text.

Example directory:

corpus/bg/commentaries/
Example structure:

corpus/bg/commentaries/shankara/bg.2.47.json corpus/bg/commentaries/ramanuja/bg.2.47.json corpus/bg/commentaries/madhva/bg.2.47.json corpus/bg/commentaries/prabhupada/bg.2.47.json
Example file structure:

```json
{
  "uid": "bg.2.47",
  "commentator": "shankara",
  "language": "sanskrit",
  "text": "..."
}

4. Comparison Unit
The fundamental comparison unit is:
One verse
Example:
bg.2.47
For each verse the system may display:
Verse
Commentary A
Commentary B
Commentary C
This enables parallel reading.

5. Commentary Comparison Layers
Comparison can occur across multiple layers.

Layer 1 — Literal Explanation
What does the commentator say the verse means?
Example categories:
definition
explanation
restatement

Layer 2 — Philosophical Interpretation
How the commentator interprets the philosophical meaning.
Example differences:
Advaita interpretation
Viśiṣṭādvaita interpretation
Dvaita interpretation
Bhakti interpretation

Layer 3 — Doctrinal Emphasis
Which doctrines the commentator emphasizes.
Example:
knowledge (jñāna)
devotion (bhakti)
action (karma)
renunciation (tyāga)

Layer 4 — Scriptural Cross References
Commentators often cite other texts.
Example:
Upaniṣads
Mahābhārata
Vedānta Sūtra
Purāṇas
Tracking these references builds the multi-text knowledge graph.

Layer 5 — Practical Application
Some commentators emphasize practical teaching.
Example:
spiritual discipline
devotional service
ethical behavior
This layer becomes important for the Guidance pillar.

6. Structured Commentary Analysis
Each commentary may optionally be analyzed using structured categories.
Example structure:
definition
argument
interpretation
example
scriptural_reference
This allows advanced scholarly comparison.

7. Commentary Neutrality Principle
The platform must remain neutral between traditions.
The system must:
• present commentaries faithfully • avoid ranking traditions • avoid automated doctrinal judgments
The reader must decide.

8. Example Comparison
Example verse:
bg.2.47
Possible comparative observations:
Śaṅkara:
Emphasizes detachment from fruits as necessary for knowledge.

Rāmānuja:
Interprets the verse as duty performed in devotion to God.

Madhva:
Connects the teaching to proper performance of prescribed duties.

Śrīla Prabhupāda:
Interprets the verse in terms of devotional service to Kṛṣṇa.
These observations should remain descriptive, not evaluative.

9. Commentary Metadata
Each commentary file should include metadata.
Example:
{
  "commentator": "shankara",
  "tradition": "advaita",
  "language": "sanskrit",
  "century": "8th century"
}
This metadata supports:
• historical analysis • philosophical classification • knowledge graph linking

10. Comparative UI (Future)
The frontend may later display commentaries in several modes.
Possible layouts:
Single Commentary
Verse
Commentary

Side-by-Side Comparison
Verse

Śaṅkara | Rāmānuja | Madhva

Analytical Mode
Verse
Commentary text
Extracted themes
Concept tags

11. Knowledge Graph Integration
Commentary insights may connect to concepts.
Example:
karma_yoga
bhakti
jnana
renunciation
This enables deeper exploration of philosophical ideas.

12. AI-Assisted Commentary Analysis
AI may assist with:
• segmenting commentary sections • extracting themes • identifying scriptural references
However:
AI analysis must remain separate from canonical commentary text.

13. Research Applications
This framework enables new types of research.
Example studies:
How different traditions interpret karma-yoga

Evolution of Gītā interpretation

Comparative Vedānta analysis
These capabilities go far beyond typical scripture readers.

14. Long-Term Vision
Once multiple texts are included, the system may compare:
Gītā commentaries
Upaniṣad commentaries
Brahma Sūtra commentaries
This creates a comprehensive Vedānta research environment.

15. Final Principle
Commentary comparison must illuminate philosophical diversity, not erase it.
Each commentator represents a living tradition.
The role of the platform is to present those voices clearly and faithfully.

