# 📚 Phase 2 Commentary Data Schema – Multi-Ācārya Layer

This document defines the **official data schema** for storing and serving
**multiple traditional commentaries** on Bhagavad-gītā verses in **Phase 2**.

This schema builds on:
- `DATA_SCHEMA.md` (canonical + extended layers)
- Phase 1 UID discipline
- Phase 2 scope boundaries

---

## 1. Core Commentary Principles (Non-Negotiable)

1. **One commentary = one ācārya**
2. **One file = one verse + one ācārya**
3. **No commentary is ever merged with another**
4. **All commentaries reference the same UID**
5. **Canonical text is never duplicated**
6. **Translation ≠ commentary**
7. **AI assistance must be declared**

Violation of any rule breaks Phase 2.

---

## 2. Commentary Layer Position

Commentaries are an **extended layer**, never canonical.

Layer hierarchy:

Canonical (Sanskrit)
↓
Translation (language-specific)
↓
Commentary (ācārya-specific)

yaml
Copy code

Commentary files:
- Depend on UID
- Depend on language
- Depend on ācārya
- Never depend on UI or routing

---

## 3. Directory Structure (Mandatory)

```text
data/
└── bhagavad-gita/
    └── commentaries/
        ├── prabhupada/
        │   ├── en/
        │   │   └── bg-1-1.json
        │   └── hi/
        │       └── bg-1-1.json
        │
        ├── shankara/
        │   └── en/
        │       └── bg-1-1.json
        │
        ├── ramanuja/
        │   └── en/
        │       └── bg-1-1.json
        │
        └── madhva/
            └── en/
                └── bg-1-1.json
Rules:

Folder name = stable ācārya identifier

Language folder required

File name mirrors UID

4. Commentary File Schema (Base)
File: bg-<chapter>-<verse>.json
json
Copy code
{
  "ref": "bg.1.1",
  "type": "commentary",
  "acharya": {
    "id": "prabhupada",
    "name": "A.C. Bhaktivedanta Swami Prabhupāda",
    "sampradaya": "Gauḍīya Vaiṣṇava"
  },
  "language": "en",
  "source": {
    "text": "Bhagavad-gītā As It Is",
    "publisher": "BBT",
    "year": 1972
  },
  "text": "Dhṛtarāṣṭra, the blind king..."
}
5. Hindi / AI-Assisted Commentary Schema
json
Copy code
{
  "ref": "bg.1.1",
  "type": "commentary",
  "acharya": {
    "id": "prabhupada",
    "name": "A.C. Bhaktivedanta Swami Prabhupāda",
    "sampradaya": "Gauḍīya Vaiṣṇava"
  },
  "language": "hi",
  "source": {
    "text": "AI-assisted translation",
    "engine": "Gemini",
    "review_status": "unreviewed"
  },
  "text": "धृतराष्ट्र, जो जन्म से अंधे थे..."
}
Rules:

AI must be declared

Review status mandatory

Canonical authority remains with original language

6. Mandatory Fields (Explained)
Field	Meaning
ref	UID of the verse
type	Always "commentary"
acharya.id	Stable machine-readable identifier
acharya.name	Human-readable
sampradaya	Lineage attribution
language	en, hi, etc.
source	Provenance
text	Commentary body

7. Prohibited Fields (NEVER ALLOWED)
❌ Mixed ācāryas
❌ Verse Sanskrit text
❌ Translation text
❌ Interpretation summary
❌ Comparison notes
❌ Cross-ācārya references
❌ UI hints

Commentary files are pure content.

8. Ācārya Identity Registry (Optional but Recommended)
Create:

bash
Copy code
data/acharyas/registry.json
json
Copy code
{
  "prabhupada": {
    "name": "A.C. Bhaktivedanta Swami Prabhupāda",
    "sampradaya": "Gauḍīya Vaiṣṇava"
  },
  "shankara": {
    "name": "Ādi Śaṅkarācārya",
    "sampradaya": "Advaita Vedānta"
  }
}
This avoids duplication and enforces consistency.

9. Backend Aggregation Output (Contract)
When backend assembles data, it must return:

ts
Copy code
commentaries: {
  prabhupada?: {
    en?: string;
    hi?: string;
  };
  shankara?: {
    en?: string;
  };
}
Frontend must not know file structure.

10. Phase 2 Validation Checklist
For each commentary file:

 UID matches filename

 Ācārya correctly attributed

 Language declared

 Source declared

 No canonical text present

 No mixing of traditions

11. Why This Schema Scales
This schema supports:

Unlimited ācāryas

Unlimited languages

Multiple śāstra

Future databases

Scholarly review

AI assistance (clearly bounded)

Without ever breaking:

Phase 1 UI

UID system

Canonical integrity

🕉️ Final Guiding Principle
Commentary explains the text.
It must never replace it.
Distinction is respect.
