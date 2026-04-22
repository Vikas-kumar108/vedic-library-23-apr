# DATA MIGRATION – VEDIC LIBRARY SYSTEM

---

# 1. PURPOSE

This document defines how to migrate data from the current **JSON-based corpus** into the structured database system.

It ensures:

- Data integrity
- Scalability (20+ lakh texts)
- Consistent schema mapping
- Future API compatibility

---

# 2. CURRENT DATA STRUCTURE

---

## 2.1 Folder Organization

Your current structure:

/data/└── itihasa/└── mahabharata/└── bhisma-parva/└── bhagavad-gita/├── canonical/│ └── bg.1.1.json│├── derivatives/│ ├── synonyms/│ ├── translations/│ ├── commentary/│ ├── exposition/│ ├── editorial-units/│└── index/├── verse/└── commentary/
---

## 2.2 Key Insight

> Your folder structure is already a **perfect logical schema**

You are not starting from zero.

---

# 3. MIGRATION STRATEGY

---

## 3.1 Two-Phase Approach

---

### Phase 1 (NOW)

- Use JSON directly via API
- No database yet
- Build dynamic system

---

### Phase 2 (LATER)

- Migrate JSON → Supabase
- Replace file reads with DB queries

---

---

# 4. DATA MAPPING

---

## 4.1 Canonical Text

### Source:

canonical/bg.1.1.json
### Target Table:

canonical_texts
---

## 4.2 Synonyms

### Source:

derivatives/synonyms/
### Target:

synonyms
---

## 4.3 Translations

### Source:

derivatives/translations/
### Target:

translations
---

## 4.4 Commentary

### Source:

derivatives/commentary/
### Target:

commentaries
---

## 4.5 Exposition

### Source:

derivatives/exposition/
### Target:

expositions
---

## 4.6 Relations

### Source:

index/
### Target:

related_verses
---

---

# 5. NODE IDENTIFICATION SYSTEM

---

## 5.1 Current

```text
bg.1.1

5.2 Rule
This ID must be the single source of truth

5.3 Usage
* API
* Database
* Store
* Routing


6. MIGRATION PIPELINE

6.1 Step-by-Step

Step 1: Traverse folders
read all directories recursively

Step 2: Extract metadata
From path:
itihasa → mahabharata → bhisma-parva → gita → 1.1

Step 3: Create corpus_tree entries
insert node hierarchy

Step 4: Insert canonical data
canonical_texts

Step 5: Insert derivatives
* synonyms
* translations
* commentary
* exposition

Step 6: Insert relations
related_verses


7. MIGRATION SCRIPT (EXAMPLE)

Node.js Script
import fs from "fs"
import path from "path"

function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"))
}

function processVerse(id, basePath) {
  const canonical = loadJSON(`${basePath}/canonical/${id}.json`)

  const synonyms = loadJSON(`${basePath}/derivatives/synonyms/...`)
  const translations = loadJSON(`${basePath}/derivatives/translations/...`)

  return {
    canonical,
    synonyms,
    translations
  }
}


8. DATA NORMALIZATION RULES

8.1 Always Normalize
Before inserting into DB:
* Clean missing fields
* Standardize language codes
* Normalize author names


8.2 Example
"Prabhupāda" → "prabhupada"


9. ERROR HANDLING

9.1 Missing Files
* Skip gracefully
* Log warnings

9.2 Invalid JSON
* Validate before insert


10. VALIDATION

Must check:
* Each node has canonical text
* No duplicate IDs
* All relations valid


11. PERFORMANCE STRATEGY

11.1 Batch Processing
Process:
* 100–1000 records per batch

11.2 Parallel Processing
Use:
* Worker threads
* Async processing


12. MIGRATION ORDER (IMPORTANT)

Follow this order strictly:
1. corpus_tree
2. canonical_texts
3. synonyms
4. translations
5. commentaries
6. expositions
7. relations


13. FUTURE AUTOMATION

Admin Dashboard
Later:
* Upload JSON files
* Auto-ingest into DB
* Validate structure


14. KEY INSIGHT
You are NOT converting data.
You are:
Transforming a file system into a knowledge graph


15. FINAL INSIGHT
This migration is the bridge between:
* Static files (past)
* Dynamic system (present)
* Scalable platform (future)

Done correctly:
* Your system becomes infinite in scale
* Your data becomes queryable
	•	Your knowledge becomes interconnected
---

# ❤️ Why This Document Matters Deeply

This is the answer to your biggest real-world problem:

✔ “I have massive JSON data — what do I do with it?”  
✔ “How do I scale beyond files?”  
✔ “How do I prepare for Supabase?”  
