# Canonical Layer Architecture

## 1. Overview

The Canonical Layer is the foundational layer of the Vedic Library architecture.

It stores the **authoritative textual source** of scriptures without any interpretation, translation, commentary, or derivative material.

In traditional Sanskrit scholarship, the base text is referred to as the **mūla-text**. The canonical layer represents this mūla-text digitally.

Examples of canonical texts include:

- Bhagavad-gītā verses
- Upaniṣad mantras
- Vedic mantras
- Dharmaśāstra verses
- Vedānta-sūtra aphorisms
- Purāṇic ślokas

All other layers in the system depend on the canonical layer.

---

# 2. Why the Canonical Layer Exists

Traditional Vedic literature distinguishes between:

• mūla-text (root text)  
• ṭīkā (commentary)  
• bhāṣya (philosophical explanation)  
• anvaya / padaccheda (word breakdown)  
• translation  

Mixing these elements into a single document causes several problems:

1. The original text becomes corrupted.
2. Multiple traditions cannot coexist.
3. The text becomes difficult to maintain programmatically.
4. Scholarly referencing becomes unreliable.

The canonical layer solves these problems by isolating the **pure textual source**.

This design allows:

• many translations  
• many commentaries  
• multiple traditions  
• linguistic analysis  

to coexist without altering the base text.

---

# 3. Canonical Data Responsibilities

The canonical layer contains only information intrinsic to the text itself.

It includes:

• the Sanskrit verse  
• the transliteration  
• the canonical UID  
• textual location metadata  

It does **not** contain:

✗ translations  
✗ synonyms  
✗ commentary  
✗ philosophical interpretation  
✗ linguistic analysis  

All of those belong to other layers.

---

# 4. Canonical Directory Structure

Canonical texts are stored inside the `data/` directory.

Structure:

data/ / / / / canonical/
Example:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical/
Inside this directory each verse is stored as an individual JSON file.

Example:

bg.1.1.json bg.1.2.json bg.1.3.json
This design enables:

• fast random access  
• independent editing  
• scalable corpus expansion  

---

# 5. Canonical File Naming Convention

Canonical files follow the UID naming pattern.

Example UID:

bg.1.1
File name:

bg.1.1.json
Where:

| Segment | Meaning |
|-------|--------|
| bg | text identifier |
| 1 | chapter |
| 1 | verse |

Examples:

bg.2.13.json bg.4.7.json bg.18.66.json
---

# 6. Canonical File Schema

Example canonical file:

data/.../canonical/bg.1.1.json
Example structure:

```json
{
  "uid": "bg.1.1",
  "work": {
    "corpus": "itihasa",
    "text": "mahabharata",
    "section": "bhisma-parva",
    "subwork": "bhagavad-gita"
  },
  "location": {
    "chapter": 1,
    "verse": 1
  },
  "text": {
    "script": "devanagari",
    "content": "धृतराष्ट्र उवाच..."
  },
  "transliteration": {
    "scheme": "iast",
    "content": "dhṛtarāṣṭra uvāca..."
  }
}

7. Canonical Fields Explained
uid
Unique textual identifier.
Example:
bg.1.1
This UID is used throughout the entire system.

work
Describes the textual hierarchy.
Example:
Mahābhārata
  └ Bhīṣma Parva
     └ Bhagavad-gītā
Fields:
Field	Meaning
corpus	literary category
text	primary work
section	subsection
subwork	embedded text
location
Physical position in the text.
Example:
chapter 1
verse 1

text
Stores the Sanskrit verse.
Example:
धृतराष्ट्र उवाच...
The script may vary:
Script	Example
devanagari	most Sanskrit editions
grantha	South Indian manuscripts
telugu	Telugu editions
transliteration
Romanized Sanskrit.
Example:
dhṛtarāṣṭra uvāca
This allows readers unfamiliar with Devanāgarī to access the text.

8. Canonical Loader
Canonical texts are loaded by the Canonical Loader.
File:
frontend/src/features/scripture/scripture.loader.ts
Function:
loadCanonical()
This function:
1. Reads the verse index
2. Resolves the canonical file path
3. Loads the JSON
4. Returns a CanonicalUnit object

9. Why Each Verse Is a Separate File
A single large JSON containing all verses would be simpler but problematic.
Problems:
• large file sizes • slow loading • merge conflicts in Git • difficulty editing
Per-verse files allow:
• parallel editing • incremental loading • Git-friendly history • scalability to millions of verses

10. Relationship to Other Layers
The canonical layer sits at the center of the architecture.
          Commentaries
               ↑
Derivatives ← Canonical → Word-by-word
               ↓
            Indexes
All other layers reference the canonical UID.

11. Canonical Layer Guarantees
The canonical layer guarantees:
1. textual integrity
2. stable referencing
3. tradition neutrality
4. compatibility with all commentary traditions

12. Long-Term Scalability
This architecture allows the system to scale to include:
• Rig Veda • Yajur Veda • Sāma Veda • Upaniṣads • Purāṇas • Dharmaśāstra • Vedānta-sūtra
while preserving consistent structure.

13. Philosophical Significance
Traditional Sanskrit scholarship places the mūla-text at the center of study.
Commentaries exist to illuminate the root text, not replace it.
This architecture mirrors that traditional structure digitally.
The canonical layer therefore represents the unchanging scriptural foundation upon which all interpretive traditions are built.
