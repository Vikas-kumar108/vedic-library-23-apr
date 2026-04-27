# Index System Architecture

## 1. Overview

The Index System allows the Vedic Library to locate textual resources efficiently without scanning the filesystem.

Indexes provide structured references to:

• canonical texts  
• editorial units  
• derivative layers  
• commentaries  

Without indexes, the system would need to scan thousands of directories every time a verse is loaded.

Indexes ensure predictable and fast resolution of textual resources.

---

# 2. Why Indexes Are Necessary

Large scriptural corpora contain massive numbers of files.

Example scale:

| Corpus | Approx Verses |
|------|--------------|
| Rig Veda | 10,000 |
| Mahābhārata | 100,000 |
| Purāṇas | 400,000 |
| Upaniṣads | 1,000 |

If the system scanned directories each time a verse is requested, performance would degrade significantly.

Indexes solve this by acting as **lookup tables**.

---

# 3. Types of Indexes

The Vedic Library currently uses two main index types.

## Verse Index

Location:


index/verse/


Example:


bg.1.1.index.json


Purpose:

Connects a verse UID to:

• canonical text  
• editorial units  
• derivative layers

---

## Commentary Index

Location:


index/commentary/


Example:


bg.1.1.commentaries.index.json


Purpose:

Lists available commentaries for a verse.

---

# 4. Verse Index Structure

Example file:


index/verse/bg.1.1.index.json


Example JSON:

```json
{
  "verse_uid": "bg.1.1",
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
  "canonical_ref": "bg.1.1",
  "editorial_unit": {
    "uid": "bg.1.1.prabhupada"
  },
  "derivatives": {
    "synonyms": {
      "available": true
    },
    "translations": {
      "available": true
    },
    "exposition": {
      "available": true
    }
  }
}
5. Commentary Index Structure

Example:

index/commentary/bg.1.1.commentaries.index.json

Example JSON:

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

This index tells the loader exactly which commentaries exist.

6. How the Loader Uses Indexes

When a verse is requested:

loadVerseComposition(uid)

The engine performs the following sequence.

Step 1

Load verse index.

Step 2

Resolve canonical file path.

Step 3

Check derivative availability.

Step 4

Check commentary index.

Step 5

Load corresponding files.

7. Commentary Index Builder

Indexes are generated automatically.

Command:

npm run build:commentary-index

Script:

scripts/cli/build-commentary-index.ts

The script scans:

derivatives/commentary/

and generates index files.

8. Benefits of Index System

The index system provides:

✔ predictable file resolution
✔ faster verse loading
✔ scalable architecture
✔ simplified loader logic

Without indexes the loader would require complex filesystem scanning.

9. Index Regeneration

Indexes must be regenerated when:

• new commentaries are added
• new derivative layers are added

Command:

npm run build:commentary-index

Future scripts may generate:

• verse indexes automatically
• derivative availability indexes

10. Future Index Extensions

The index system can expand to include:

• cross-reference indexes
• philosophical topic indexes
• Sanskrit word indexes
• citation graphs

This will enable powerful search capabilities across the Vedic corpus.

11. Summary

Indexes are the backbone of the scripture engine.

They allow the system to scale from a small dataset like Bhagavad-gītā to the entire Vedic literature without sacrificing performance.
