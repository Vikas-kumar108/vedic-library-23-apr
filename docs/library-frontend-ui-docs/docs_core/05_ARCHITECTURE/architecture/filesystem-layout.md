# Filesystem Layout

## 1. Overview

The Vedic Library project is structured around a clear separation between:

1. Scripture data
2. Engine code
3. Frontend application
4. Developer tooling
5. Documentation

This separation allows the project to scale from a small scripture collection (such as the Bhagavad-gītā) to the entire Vedic corpus without restructuring the repository.

The filesystem layout ensures:

• predictable data storage  
• modular software architecture  
• independent development of frontend and corpus  
• scalable corpus management  

---

# 2. Top-Level Repository Structure

The root of the repository contains several major directories.

Example layout:

vedic-library-v1.0 │ ├── data ├── frontend ├── scripts ├── registry ├── docs_src ├── package.json └── tsconfig.json
Each of these directories serves a distinct purpose.

---

# 3. The `data/` Directory

The `data/` directory contains the **entire scripture corpus**.

This includes:

• canonical texts  
• derivative layers  
• commentaries  
• indexes  

Structure:

data/ / / / /
Example:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/
This hierarchical structure mirrors the natural structure of Sanskrit literature.

---

# 4. Scripture Directory Structure

Each scripture directory contains several standardized folders.

Example:

bhagavad-gita │ ├── canonical ├── derivatives ├── index ├── metadata ├── editions ├── word-by-word ├── translations └── README.md
Each folder has a specific responsibility.

---

# 5. Canonical Layer

Location:

canonical/
Contains the immutable Sanskrit text.

Example:

canonical/bg.1.1.json
Each verse is stored as a separate JSON file.

This allows:

• fast loading  
• easy editing  
• Git-friendly version control  

---

# 6. Derivative Layer

Location:

derivatives/
Contains interpretive layers derived from the canonical text.

Structure:

derivatives synonyms translations exposition editorial-units commentary
---

## Synonyms

Word-by-word meanings.

Example:

derivatives/synonyms/prabhupada/bg.1.1.prabhupada.synonyms.json
---

## Translations

Language translations of verses.

Example:

derivatives/translations/en/prabhupada/bg.1.1.prabhupada.translation.json
Languages use ISO codes:

| Code | Language |
|-----|---------|
| en | English |
| hi | Hindi |
| bn | Bengali |
| ta | Tamil |
| kn | Kannada |

---

## Exposition

Extended philosophical explanations.

Example:

derivatives/exposition/en/prabhupada/bg.1.1.prabhupada.exposition.json
---

## Editorial Units

Editorial units define how derivative layers relate to verses.

Example:

derivatives/editorial-units/prabhupada/bg.1.1.prabhupada.editorial-unit.json
These define:

• verse coverage  
• derivative availability  

---

## Commentary Layer

Traditional Sanskrit commentaries.

Structure:

derivatives/commentary///
Example:

derivatives/commentary/sridhara/sa/bg.1.1.sridhara.commentary.json
Translation of commentary:

derivatives/commentary/sridhara/en/bg.1.1.sridhara.translation.json
---

# 7. Index Directory

Location:

index/
Indexes provide fast lookup of resources.

Structure:

index verse commentary
---

## Verse Index

Example:

index/verse/bg.1.1.index.json
Contains:

• canonical reference  
• editorial units  
• derivative availability  

---

## Commentary Index

Example:

index/commentary/bg.1.1.commentaries.index.json
Lists available commentaries and languages.

---

# 8. Metadata Directory

Location:

metadata/
Stores scripture-level metadata such as:

• text title  
• historical notes  
• editorial information  

Example:

metadata/text.json
---

# 9. Editions Directory

Location:

editions/
Stores information about published editions of the text.

Example:

editions/gita-press.json
This allows the library to preserve the source edition of textual data.

---

# 10. Word-by-Word Layer (Future)

Location:

word-by-word/
Planned layer for detailed Sanskrit analysis.

Example:

word-by-word/bg.1.1.word-by-word.json
Possible data:

• padaccheda  
• grammatical tags  
• dictionary references  

---

# 11. Frontend Directory

Location:

frontend/
Contains the Next.js application.

Example structure:

frontend src public package.json next.config.ts
The frontend is responsible for:

• rendering scripture pages  
• displaying translations and commentaries  
• providing the user interface.

---

# 12. Scripts Directory

Location:

scripts/
Contains developer utilities and corpus tools.

Example:

scripts/cli vedic.ts build-commentary-index.ts
These scripts allow developers to:

• inspect verses  
• build indexes  
• validate corpus data  

---

# 13. Registry Directory

Location:

registry/
The registry maps scripture identifiers to their filesystem locations.

Example:

registry/scriptures.registry.json
The registry allows the engine to support many scriptures without hardcoding paths.

---

# 14. Documentation Directory

Location:

docs_src/
Contains architectural documentation for the system.

Example:

docs_src/architecture/
This includes documents explaining:

• canonical layer  
• derivative layer  
• commentary system  
• indexing architecture  
• verse composition engine  

---

# 15. Benefits of This Layout

This filesystem architecture provides several advantages.

### Scalability

New scriptures can be added without restructuring the project.

### Modularity

Each layer of data is independent.

### Scholarly Integrity

Canonical text remains separate from interpretation.

### Maintainability

Developers can easily locate and edit files.

---

# 16. Example Full Path

Example verse file:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical/bg.1.1.json
Example translation:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/translations/en/prabhupada/bg.1.1.prabhupada.translation.json
Example commentary:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/commentary/sridhara/sa/bg.1.1.sridhara.commentary.json
Example commentary index:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/index/commentary/bg.1.1.commentaries.index.json
---

# 17. Long-Term Vision

This filesystem layout is designed to support the entire Vedic corpus, including:

• Vedas  
• Upaniṣads  
• Itihāsa  
• Purāṇas  
• Dharmaśāstra  
• Vedānta-sūtra  
• classical commentaries  

while maintaining a consistent and scalable architecture.

The system can eventually grow to support **millions of textual nodes** without structural changes.

Documentation Set — COMPLETE
You now have a complete architecture documentation system:
docs_src/architecture/

canonical-layer.md
derivative-layer.md
commentary-layer.md
index-system.md
verse-composition-engine.md
developer-cli.md
filesystem-layout.md
This is serious production-level documentation.

