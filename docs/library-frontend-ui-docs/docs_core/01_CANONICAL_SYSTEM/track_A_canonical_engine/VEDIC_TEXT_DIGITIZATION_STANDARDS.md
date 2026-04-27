# VEDIC_TEXT_DIGITIZATION_STANDARDS.md
Standards for Digitizing Sanskrit and Vedic Texts

Track A — Textual Integrity Framework

---

# 1. Purpose

This document defines the **official standards for digitizing Vedic texts** used by the Vedic Library platform.

The purpose of these standards is to ensure:

• textual accuracy  
• encoding consistency  
• reliable search indexing  
• concept tagging compatibility  
• long-term dataset stability  

All textual data entered into the system must follow these standards.

---

# 2. Guiding Principles

The digitization process must follow three core principles:

1. **Canonical Fidelity**
   - The Sanskrit text must match authoritative editions.

2. **Encoding Consistency**
   - All texts must use standardized Unicode encoding.

3. **Structural Clarity**
   - Text must be divided according to canonical verse structure.

---

# 3. Unicode Encoding Standard

All Sanskrit text must use **Unicode UTF-8 encoding**.

Required:

UTF-8 Unicode
This ensures compatibility with:

• modern browsers  
• databases  
• search engines  
• graph systems  

Devanāgarī characters must use official Unicode ranges.

Example:

धर्मक्षेत्रे कुरुक्षेत्रे
---

# 4. Devanāgarī Text Standard

Canonical Sanskrit should be stored in **Devanāgarī script**.

Example:

धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः
Rules:

• preserve sandhi  
• preserve punctuation where present  
• do not normalize spellings  

The Devanāgarī field is considered the **primary canonical text**.

---

# 5. Transliteration Standard

Roman transliteration must follow **IAST (International Alphabet of Sanskrit Transliteration)**.

Example:

dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ
Required diacritics:

ā ī ū ṛ ṝ ḷ ṃ ṅ ñ ṭ ḍ ṇ ś ṣ
Do not use simplified transliteration systems.

---

# 6. Word Separation

In transliteration:

• words should remain **separated for readability**  
• compounds should preserve sandhi  

Example:

Correct:

dharma-kṣetre kuru-kṣetre
Incorrect:

dharmakshetre kurukshetre
---

# 7. Verse Identification

Every verse must have a **unique UID**.

Example:

bg.2.47
Structure:

textID.chapter.verse
Examples:

bg.2.47 katha.1.2.18 manu.3.56
UIDs must never change once assigned.

---

# 8. Punctuation Rules

Sanskrit texts may contain punctuation marks such as:

। ॥
These should be preserved exactly as found in canonical editions.

Example:

कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
---

# 9. Synonyms and Word Analysis

Synonyms (padārtha) should follow the traditional format.

Example:

dharma-kṣetre — in the holy place kuru-kṣetre — in the land of the Kurus
Each synonym entry should contain:

word meaning
This enables structured lexical analysis.

---

# 10. Translation Standards

Translations must follow these rules:

• preserve philosophical meaning  
• avoid paraphrasing  
• maintain verse structure  

Example:

Correct:

You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.
Translations should be stored as language objects:

```json
"translation": {
  "en": "",
  "hi": ""
}

11. Commentary Digitization
Commentaries must be stored separately from the verse text.
Example:
commentaries/shankara/bg.2.47.json
Fields:
verse_uid
author
language
text
Commentaries must never modify the verse text.

12. Textual Variants
Some scriptures contain manuscript variants.
Variants should be stored separately.
Example:
variants:
[
  {
    "source": "manuscript_A",
    "reading": ""
  }
]
The canonical reading must remain primary.

13. Metadata Requirements
Each text must include metadata.
Example:
title
category
chapters
verses
language
tradition
This metadata helps index the corpus.

14. File Naming Conventions
All dataset files must follow consistent naming.
Examples:
bg.2.47.json
katha.1.2.18.json
manu.3.56.json
Avoid:
verse47.json
gita_247.json
Consistency is essential for automated loaders.

15. Directory Structure
Datasets must follow the standard structure.
Example:
corpus/bg/
├── verses
├── commentaries
├── relationships
├── analysis
└── metadata
This ensures maintainable repositories.

16. Error Checking
Before committing datasets, verify:
Unicode encoding correct
IAST transliteration correct
UID format valid
JSON syntax valid
This prevents corrupted datasets.

17. Source Verification
All digitized texts must reference authoritative editions.
Possible sources:
critical editions
traditional printed editions
scholarly publications
Source metadata should be recorded when available.

18. Future Automation
In future phases, automated tools may assist with:
OCR correction
transliteration generation
variant detection
However manual verification remains essential.

19. Long-Term Goal
The Vedic Library aims to build a clean, canonical digital corpus of the Vedic tradition.
This requires:
consistent encoding
careful editing
structured datasets
The digitization standards ensure that the corpus remains reliable for generations.

20. Final Principle
Sanskrit scriptures must be treated as canonical knowledge artifacts.
Digitization must therefore prioritize:
accuracy consistency reverence for the original text
---

## Important Result

With this document, **Track A is now completely documented**.

You now have the full **textual, conceptual, and structural architecture** of the Vedic Library dataset system.

Your stack now includes:

**Text layer**

- corpus registry  
- digitization standards  

**Knowledge layer**

- concept registry  
- concept relationships  
- tagging guidelines  

**Graph layer**

- knowledge graph schema  

**Operational layer**

- data entry workflow  
- dataset implementation plans  

