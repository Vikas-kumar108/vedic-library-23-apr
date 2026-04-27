# Vedic Library — Scripture Engine Architecture

This document describes the architecture of the Vedic Library scripture engine.

The system is designed to support the **entire Vedic textual corpus**, including:

- Vedas
- Upaniṣads
- Itihāsas (Mahābhārata, Rāmāyaṇa)
- Purāṇas
- Dharmaśāstra
- Vedānta commentaries
- Traditional and modern translations

The architecture separates **canonical text**, **derivative layers**, and **commentary traditions** so that the corpus can scale without data duplication.

---

# 1. Core Design Principles

The system is built on several principles.

### 1. Canonical text is immutable

The Sanskrit verse is stored once and never modified.

### 2. Interpretations are layered

Translations, purports, and commentaries are separate derivative layers.

### 3. Multiple traditions are supported

Different philosophical traditions can coexist:

- Advaita
- Dvaita
- Viśiṣṭādvaita
- Gauḍīya Vedānta
- others

### 4. Text composition is dynamic

A verse page is assembled dynamically from multiple data layers.

---

# 2. UID System

Every textual unit is identified by a UID.

Example:

bg.1.1
Structure:

text.chapter.verse
Examples:

bg.1.1 bg.2.13 bg.18.66
UIDs allow consistent indexing across all layers.

---

# 3. Canonical Layer

Location:

data/////canonical/
Example:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical/bg.1.1.json
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
Canonical layer contains:
* Sanskrit text
* transliteration
* metadata

4. Editorial Layer
Editorial units define interpretation scope.
Location:
derivatives/editorial-units/
Example:
bg.1.1.prabhupada.editorial-unit.json
This layer defines:
* commentary author
* verse coverage
* available derivative layers
Example:
{
  "uid": "bg.1.1.prabhupada",
  "covers": {
    "chapter": 1,
    "from_verse": 1,
    "to_verse": 1
  },
  "scope": {
    "has_synonyms": true,
    "has_translation": true,
    "has_exposition": true
  }
}

5. Derivative Layers
Derivative layers extend the canonical text.
These include:
* synonyms
* translations
* exposition (purports)
Location:
derivatives/
Structure:
derivatives/
   synonyms/
   translations/
   exposition/
Example:
derivatives/translations/en/prabhupada/bg.1.1.prabhupada.translation.json

6. Commentary Layer
Traditional Sanskrit commentaries are stored separately.
Structure:
derivatives/commentary/<author>/<language>/
Example:
derivatives/commentary/sridhara/sa/bg.1.1.sridhara.commentary.json
Translations of commentaries:
derivatives/commentary/sridhara/en/bg.1.1.sridhara.translation.json
Example directory:
commentary/
   sridhara/
      sa/
      en/
      hi/

   madhva/
      sa/
      en/

   baladeva/
      sa/
This allows multiple traditions simultaneously.

7. Commentary Index
To avoid filesystem scanning, commentary availability is indexed.
Location:
index/commentary/
Example:
bg.1.1.commentaries.index.json
Example structure:
{
  "verse_uid": "bg.1.1",
  "commentaries": [
    {
      "author": "sridhara",
      "languages": ["sa", "en", "hi"]
    },
    {
      "author": "madhva",
      "languages": ["sa", "en"]
    }
  ]
}
The loader reads this index instead of scanning directories.

8. Verse Index
Each verse also has a structural index.
Location:
index/verse/
Example:
bg.1.1.index.json
This index connects:
* canonical text
* editorial units
* derivative layers

9. Verse Composition Engine
The engine assembles a verse dynamically.
Flow:
UID
 ↓
Verse Index
 ↓
Canonical Loader
 ↓
Editorial Unit
 ↓
Derivative Layers
 ↓
Commentary Layer
Result:
VerseComposition
Which contains:
canonical
synonyms
translation
exposition
commentaries
commentary translations

10. CLI Tools
Developer CLI commands are available.
Example:
npm run vedic verse bg.1.1
Output:
Sanskrit
Transliteration
Synonyms
Translation
Exposition
Commentaries
Commentary translations

11. Commentary Index Builder
To maintain indexes automatically:
npm run build:commentary-index
This scans:
derivatives/commentary/
and generates:
index/commentary/*.index.json

12. Frontend Rendering
Frontend uses Next.js.
URL pattern:
/library/[canon]/[chapter]/[verse]
Example:
/library/bg/1/1
The page calls:
loadVerseComposition()
which builds the complete verse display.

13. System Layers
The architecture is divided into three layers.
Data Layer
canonical
derivatives
commentary
index
Engine Layer
verse loader
commentary loader
index resolver
AI derivatives
Interface Layer
Next.js scripture reader

14. Future Extensions
Planned features include:
Word-by-word Sanskrit engine
Supports:
dhṛtarāṣṭraḥ → noun
uvāca → verb
Cross-reference graph
Example:
BG 2.13 ↔ Kaṭha Upaniṣad
Corpus ingestion pipelines
Import tools for:
* Rig Veda
* Upaniṣads
* Vedānta-sūtra
* Dharmaśāstra
* Purāṇas

15. Long-Term Vision
The goal of the Vedic Library is to create a unified digital corpus of Vedic knowledge, including:
* primary Sanskrit texts
* traditional commentaries
* translations
* linguistic analysis
* philosophical cross-references
This architecture ensures that the system can scale to millions of textual nodes while preserving canonical integrity.
