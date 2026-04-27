# Phase 8: Distributed Scraper Tool

## Goal
Create a robust Python scraper (`scrape_distributed.py`) that fetches verse content from Vedabase.io and saves it into the **exact distributed file structure** required by the project (Canon vs Interpretative separation).

## Architecture
The script will perform a "Split-and-Save" operation. For each verse scraped, it will generate 5 distinct JSON files in specific directories:

1.  **Canonical (`canonical/`)**: 
    *   Contains: Devanagari, IAST.
    *   Purpose: Pure scriptural text, unchangeable.
2.  **Index (`index/verse/`)**:
    *   Contains: Metadata linking the verse to its derivatives.
    *   Purpose: The "Router" that `loadVerse.ts` reads first.
3.  **Synonyms (`derivatives/synonyms/`)**:
    *   Contains: Word-for-word meanings.
    *   Folder: `prabhupada/`
4.  **Translation (`derivatives/translations/`)**:
    *   Contains: English translation.
    *   Folder: `en/prabhupada/`
5.  **Exposition (`derivatives/exposition/`)**:
    *   Contains: The Purport.
    *   Folder: `en/prabhupada/`

## Script Logic
1.  **Fetch**: HTTP GET to `vedabase.io/en/library/bg/{ch}/{v}/`.
2.  **Parse**: BeautifulSoup extraction of the 5 text components.
3.  **Format**: Construct 5 separate Python dictionaries representing the exact JSON schemas found in `data/`.
4.  **Write**: Save each dictionary to its specific path in the `data/` hierarchy.

## Output Structure
```
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/
├── canonical/
│   └── bg.1.1.json
├── index/verse/
│   └── bg.1.1.index.json
└── derivatives/
    ├── synonyms/prabhupada/
    │   └── bg.1.1.prabhupada.synonyms.en.json
    ├── translations/en/prabhupada/
    │   └── bg.1.1.prabhupada.translation.json
    └── exposition/en/prabhupada/
        └── bg.1.1.prabhupada.exposition.json
```

## Verification
*   We will run the script for a single verse (e.g., `bg.1.1`).
*   We will verify the 5 files are created on disk.
*   We will load the app (`localhost:3000/bg/1/1`) and confirm it displays correctly, proving the distributed files are linked properly.
