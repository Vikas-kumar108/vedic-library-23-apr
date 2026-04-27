# Verse Composition Engine

## 1. Overview

The Verse Composition Engine is the central orchestration system of the Vedic Library.

It dynamically assembles all textual layers related to a verse and produces a unified object that can be rendered in:

• CLI tools  
• the Next.js frontend  
• APIs  
• AI systems  

Instead of storing fully assembled verses, the system composes them dynamically from multiple independent layers.

This architecture ensures:

• modularity  
• scalability  
• scholarly accuracy  
• multi-tradition compatibility  

---

# 2. Why a Composition Engine Is Necessary

Scriptures are not simple texts. A single verse may contain many layers of interpretation.

Example layers for Bhagavad-gītā 1.1:

| Layer | Example |
|------|--------|
| Canonical | Sanskrit verse |
| Transliteration | IAST romanization |
| Synonyms | word-by-word meanings |
| Translation | English translation |
| Exposition | philosophical purport |
| Commentary | classical Sanskrit commentary |
| Commentary Translation | translation of commentary |

If these were stored together in one file, the system would be rigid and difficult to maintain.

Instead the architecture separates each layer and composes them dynamically.

---

# 3. Main Entry Function

The central function is:

loadVerseComposition(uid)
Location:

frontend/src/features/scripture/scripture.loader.ts
Example call:

loadVerseComposition("bg.1.1")
This function loads all available layers and returns a structured object.

---

# 4. Composition Flow

When a verse is requested, the following sequence occurs.

UID ↓ Verse Index ↓ Canonical Loader ↓ Editorial Unit ↓ Derivative Layers ↓ Commentary Loader ↓ Final VerseComposition
---

# 5. Step-by-Step Execution

## Step 1 — UID Parsing

The UID identifies the verse.

Example:

bg.1.1
From the UID the system determines:

• scripture  
• chapter  
• verse  

---

## Step 2 — Load Verse Index

File:

index/verse/bg.1.1.index.json
The index provides references to:

• canonical file  
• editorial units  
• derivative availability  

---

## Step 3 — Resolve Scripture Root

The loader constructs the filesystem path.

Example:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/
This ensures the engine works for **any scripture**, not only the Bhagavad-gītā.

---

## Step 4 — Load Canonical Layer

Function:

loadCanonical()
Loads:

canonical/bg.1.1.json
This provides:

• Sanskrit text  
• transliteration  
• location metadata  

---

## Step 5 — Load Editorial Unit

Function:

loadEditorialUnit()
Example file:

derivatives/editorial-units/prabhupada/bg.1.1.prabhupada.editorial-unit.json
The editorial unit defines:

• which derivative layers exist  
• verse coverage range  

---

## Step 6 — Load Derivative Layers

Functions:

loadSynonyms() loadTranslation() loadExposition()
These read files such as:

derivatives/synonyms/prabhupada/ derivatives/translations/en/prabhupada/ derivatives/exposition/en/prabhupada/
---

## Step 7 — Load Commentary Layers

The commentary loader scans:

derivatives/commentary///
Functions:

loadCommentaries() loadCommentaryTranslations()
These return arrays of commentary objects.

---

## Step 8 — Assemble VerseComposition

All loaded layers are combined into a single object.

Example structure:

VerseComposition ├ canonical ├ editorial │ ├ synonyms │ ├ translation │ ├ exposition │ ├ commentary │ └ commentary translations
---

# 6. VerseComposition Data Model

Example object:

```ts
{
  canonical: {...},

  editorial: {
    unit: {...},

    layers: {
      synonyms: {...},
      translation: {...},
      exposition: {...},

      commentary: [...],
      commentary_translations: [...]
    }
  }
}
This object is passed to the renderer.

7. CLI Rendering
The CLI uses the same composition engine.
Command:
npm run vedic verse bg.1.1
Output example:
SANSKRIT
TRANSLITERATION
SYNONYMS
TRANSLATION
EXPOSITION
COMMENTARIES
COMMENTARY TRANSLATIONS
This makes corpus debugging extremely easy.

8. Frontend Rendering
Next.js pages call the composition engine.
Example route:
/library/bg/1/1
Page component:
src/app/library/[canon]/[chapter]/[verse]/page.tsx
The page loads the verse and renders each layer.

9. Advantages of the Composition Model
The composition model enables:
✔ multi-language support ✔ multiple traditions ✔ dynamic data loading ✔ AI-generated layers ✔ large corpus scalability
without duplicating text.

10. Future Extensions
The composition engine will eventually support additional layers:
• word-by-word Sanskrit analysis • grammar tagging • cross-references • citation networks • philosophical topic indexing
These can be added without modifying existing data.

11. Summary
The Verse Composition Engine is the central intelligence of the Vedic Library.
It allows the system to dynamically assemble scripture verses with all interpretive layers while maintaining strict separation between:
• canonical text • derivative content • classical commentaries.
