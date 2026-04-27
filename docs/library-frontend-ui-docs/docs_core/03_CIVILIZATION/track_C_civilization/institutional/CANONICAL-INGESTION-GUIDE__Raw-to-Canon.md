# Canonical Ingestion Guide  
## Exhaustive Governance from RAW to Canonical Text

This document defines the **mandatory end-to-end process** for ingesting
any Sanskrit śāstra into a canonical, machine-verifiable form.

It is written from real failures and recoveries during the Padma Purāṇa pipeline.

This is not a tutorial.
This is **operational law**.

---

## 0. Core Mental Model (Most Important)

### The Single Most Important Rule

> **Do not try to be intelligent before the text is stable.**

Most failures come from:
- early Sanskrit detection
- early verse logic
- early “purity” assumptions
- early transliteration

### Pipeline Principle

Each stage must answer **exactly one question**.

If a script answers more than one question, it is wrong.

---

## 1. RAW Acquisition Stage

### Question This Stage Answers
> “What exactly did the source give us?”

### What RAW Must Contain
- complete HTML or source text
- navigation junk
- advertisements
- prose
- mixed languages
- duplication
- errors

### What RAW Must NOT Do
- extract Sanskrit
- normalize text
- remove verses
- fix danda
- transliterate

### Coding Rules
- Fetch and save only
- Preserve folder structure for provenance
- Never overwrite RAW

### Common Mistakes
❌ “Let’s clean a little while fetching”  
❌ “Let’s extract just the Sanskrit part now”  

---

## 2. Mechanical Cleanup Stage

### Question This Stage Answers
> “What is *structural noise*?”

### Allowed Removals
- headers
- footers
- navigation bars
- ads
- UI text (“Buy now”, “Next”, etc.)

### Forbidden Removals
- speaker labels (उवाच)
- prose explanations
- colophons
- chapter metadata
- verse numbers

### Rule of Thumb
If a **human judgement** is required, it does not belong here.

### Output
Cleaned text, still mixed-language, still messy.

---

## 3. Indexing & Unit Discovery Stage

### Question This Stage Answers
> “How many units exist and where are they?”

### Responsibilities
- detect khaṇḍa / parva / adhyāya boundaries
- assign stable IDs
- generate index JSON

### Forbidden
- touching text content
- cleaning text
- normalizing Sanskrit

### Failure Mode Observed
Index scripts that assume clean filenames or linear numbering  
→ misalignment across khaṇḍas

---

## 4. Extraction Stage

### Question This Stage Answers
> “What is the raw textual content of each unit?”

### Responsibilities
- extract text per chapter
- preserve order
- preserve line breaks

### Forbidden
- verse logic
- Sanskrit logic
- danda logic

### Output
One text file per unit, **still impure**.

---

## 5. Normalization Stage (Stage 4A)

### Question This Stage Answers
> “What is *definitely not* part of the text?”

### Allowed
- removing catalog lists
- removing publisher lists
- removing language labels
- removing duplicate boilerplate

### Forbidden
- deciding what is Sanskrit
- removing prose
- restructuring verses

### Output
`.clean.txt`

---

## 6. Sanskrit Isolation (Stage 4A.1)

### Question This Stage Answers
> “Which lines contain Sanskrit script?”

### Detection Rule
Unicode-range based detection only.

NO:
- grammar
- metre
- verse expectations

### What Must Remain
- prose Sanskrit
- colophons
- uneven verses
- speaker lines

### Output
`.san.txt`

This is the **only valid input** for later Sanskrit-aware stages.

---

## 7. Danda Normalization (Stage 4A.2)

### Question This Stage Answers
> “Where do verses structurally end?”

### Rules
- Single danda `|` stays inline
- Double danda `|| n ||` closes a verse
- Verse number binds to closing danda

### Forbidden
- splitting verses
- renumbering
- dropping lines

### Output
Updated `.san.txt` (structure-correct)

---

## 8. Transliteration (Stage 4B) — MANDATORY

### Question This Stage Answers
> “Can this text be represented in both scripts?”

### Absolute Requirement
Every Sanskrit unit must exist in:
- Devanāgarī
- IAST

### Tooling Law
**`indic-transliteration` is mandatory**

No CID may skip this.

### File Outputs
- `.dev.txt`
- `.iast.txt`

### Forbidden
- transliterating dirty text
- transliterating transliterations
- multiple passes

---

## 9. File Lifecycle Discipline

### Single Truth Rule
Per chapter, exactly one live file per format:
- `.san.txt`
- `.dev.txt`
- `.iast.txt`

### Archive Rule
All experimental files must be moved to:
data/03_normalized/_archive_stage4/

yaml
Copy code

Scripts must explicitly prune this directory.

---

## 10. Canonical Segmentation Stage

### Question This Stage Answers
> “What are the canonical verses?”

### Rules
- operate on normalized Sanskrit only
- never mutate text
- segmentation is reversible

### Output
Canonical verse JSON or canonical verse files.

---

## Final Lessons Learned

### Good Practices
✔ one concern per script  
✔ mechanical before linguistic  
✔ explicit file extensions  
✔ aggressive archiving  

### Bad Practices
✘ premature intelligence  
✘ clever regexes  
✘ mixed responsibilities  
✘ silent overwrites  

---

This document governs all future canonical ingestion pipelines.
Deviation must be explicit and documented.