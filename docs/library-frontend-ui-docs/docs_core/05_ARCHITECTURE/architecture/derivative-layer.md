# Derivative Layer Architecture

## 1. Overview

The Derivative Layer contains all **interpretive, explanatory, and translated material** derived from the canonical Sanskrit text.

Unlike the canonical layer, which stores the immutable source text, the derivative layer contains content that **depends on interpretation, tradition, language, or pedagogy**.

Examples of derivative materials include:

• word-by-word synonyms  
• translations  
• philosophical exposition (purports)  
• explanatory notes  
• modern interpretations  
• AI-generated translations  

This layer allows the Vedic Library to support **multiple traditions, languages, and teaching styles** without altering the canonical text.

---

# 2. Why the Derivative Layer Exists

Traditional Sanskrit scholarship always distinguishes between:

| Category | Description |
|--------|-------------|
| mūla-text | root scripture |
| anvaya | grammatical breakdown |
| padārtha | word meanings |
| bhāṣya | philosophical commentary |
| ṭīkā | explanatory commentary |
| translation | vernacular interpretation |

Combining these into a single document causes:

• duplication  
• loss of textual clarity  
• inability to support multiple interpretations  

The derivative layer solves this problem by separating **interpretation from source text**.

---

# 3. Types of Derivative Content

The system currently supports three major derivative categories.

## 3.1 Synonyms (Word-by-Word Meaning)

Example:

dhṛtarāṣṭraḥ — King Dhṛtarāṣṭra uvāca — said
Purpose:

• Sanskrit learners  
• grammatical understanding  
• teaching tools  

Directory:

derivatives/synonyms//
Example:

derivatives/synonyms/prabhupada/bg.1.1.prabhupada.synonyms.json
---

## 3.2 Translations

Translations convert Sanskrit verses into another language.

Supported languages may include:

• English  
• Hindi  
• Bengali  
• Tamil  
• Kannada  
• Telugu  
• Spanish  
• French  

Directory:

derivatives/translations///
Example:

derivatives/translations/en/prabhupada/bg.1.1.prabhupada.translation.json
---

## 3.3 Exposition (Purport)

Exposition provides extended philosophical explanation of the verse.

In many traditions this is called:

• purport  
• bhāṣya  
• commentary  
• explanation  

Example:

derivatives/exposition/en/prabhupada/bg.1.1.prabhupada.exposition.json
These texts can be long and may span multiple paragraphs.

---

# 4. Directory Structure

The derivative layer sits inside the scripture directory.

Example:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/

Derivative structure:

derivatives/ synonyms/ translations/ exposition/ commentary/
Example full path:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/translations/en/prabhupada/
---

# 5. File Naming Convention

Derivative files follow a structured UID pattern.

Example:

bg.1.1.prabhupada.translation.json
Structure:

...json
Example:

| File | Meaning |
|----|-----|
| bg.1.1.prabhupada.synonyms.json | word-by-word meanings |
| bg.1.1.prabhupada.translation.json | English translation |
| bg.1.1.prabhupada.exposition.json | philosophical purport |

---

# 6. Translation File Schema

Example translation file:

derivatives/translations/en/prabhupada/bg.1.1.prabhupada.translation.json
Example structure:

```json
{
  "uid": "bg.1.1.prabhupada.translation.en",
  "translation": {
    "language": "en",
    "translator": "A. C. Bhaktivedanta Swami Prabhupāda",
    "content": "Dhṛtarāṣṭra said..."
  }
}
Fields:
Field	Meaning
uid	unique translation identifier
language	language code
translator	translation author
content	translation text
7. Synonym File Schema
Example:
{
  "uid": "bg.1.1.prabhupada.synonyms",
  "synonyms": {
    "language": "en",
    "author": "A. C. Bhaktivedanta Swami Prabhupāda",
    "items": [
      {
        "sanskrit": "dhṛtarāṣṭraḥ",
        "meaning": "King Dhṛtarāṣṭra"
      }
    ]
  }
}

8. Exposition File Schema
Example:
{
  "uid": "bg.1.1.prabhupada.exposition",
  "exposition": {
    "language": "en",
    "author": "A. C. Bhaktivedanta Swami Prabhupāda",
    "type": "purport",
    "content": "Bhagavad-gītā is the widely read theistic science..."
  }
}

9. Editorial Units
Derivative layers are grouped under editorial units.
Example editorial unit:
bg.1.1.prabhupada
An editorial unit may include:
• synonyms • translation • exposition
Editorial units allow verse ranges to be covered.
Example:
bg.2.11-30.prabhupada

10. Derivative Layer Loader
The derivative layers are loaded by the Scripture Loader.
File:
frontend/src/features/scripture/scripture.loader.ts
Functions include:
• loadSynonyms() • loadTranslation() • loadExposition()
These functions read the verse index to determine available derivatives.

11. AI-Generated Derivatives
The architecture also supports AI-generated layers.
Example:
derivatives/translations/en/ai/bg.1.1.ai.translation.json
Possible AI outputs:
• automatic translation • generated synonyms • generated explanation
This allows the corpus to expand automatically.

12. Advantages of the Derivative Layer
This design allows:
✔ multiple translators ✔ multiple traditions ✔ multilingual support ✔ AI assistance ✔ scholarly annotation
without modifying the canonical text.

13. Relationship with Commentary Layer
The derivative layer is distinct from classical commentaries.
Derivative layer:
• modern translations • explanatory purports
Commentary layer:
• classical Sanskrit commentaries • Vedānta philosophical texts
This distinction preserves traditional scholarship.

14. Future Extensions
Possible derivative extensions include:
• grammar tagging • Sanskrit dictionary linking • cross-reference networks • semantic indexing • AI teaching tools
These can be added without modifying the canonical layer.

15. Summary
The derivative layer allows the Vedic Library to evolve as a living educational system while preserving the integrity of the canonical scriptures.
It supports:
• translators • teachers • scholars • AI systems
while maintaining a clean architectural separation between source text and interpretation.
