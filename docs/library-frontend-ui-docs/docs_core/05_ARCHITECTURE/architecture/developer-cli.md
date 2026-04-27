# Developer CLI Architecture

## 1. Overview

The Vedic Library includes a Developer Command Line Interface (CLI) that allows engineers and corpus maintainers to interact with the scripture engine directly from the terminal.

The CLI is designed for:

• debugging scripture data  
• validating corpus integrity  
• generating indexes  
• inspecting verse composition  
• testing loaders without the frontend  

This tooling layer is essential when managing large textual corpora such as the Vedas, Purāṇas, or Dharmaśāstra literature.

---

# 2. Why a CLI Is Necessary

While the Next.js frontend provides a user interface for reading scriptures, developers and corpus editors require deeper access to the system.

Common tasks include:

• verifying that new JSON files load correctly  
• checking commentary availability  
• rebuilding indexes  
• validating UID structures  
• debugging loader behavior  

Performing these operations through the browser would be inefficient and error-prone.

The CLI provides a fast and scriptable interface for these operations.

---

# 3. CLI Location

The CLI scripts are located in:

scripts/cli/
Example structure:

scripts/ cli/ vedic.ts build-commentary-index.ts
---

# 4. Main CLI Entry Point

Primary command:

npm run vedic
This runs:

scripts/cli/vedic.ts
Example usage:

npm run vedic verse bg.1.1
---

# 5. Verse Inspection Command

The most commonly used command is the verse inspection tool.

Example:

npm run vedic verse bg.1.1
This command performs the following:

1. Parses the UID
2. Calls the verse composition engine
3. Loads canonical text
4. Loads derivative layers
5. Loads commentaries
6. Prints the result in readable form

Example output:

UID: bg.1.1
SANSKRIT धृतराष्ट्र उवाच...
TRANSLITERATION dhṛtarāṣṭra uvāca...
SYNONYMS dhṛtarāṣṭraḥ — King Dhṛtarāṣṭra ...
TRANSLATION Dhṛtarāṣṭra said...
EXPOSITION Bhagavad-gītā is the widely read...
COMMENTARIES Śrīdhara Svāmī (sa) Madhvācārya (sa)
COMMENTARY TRANSLATIONS sridhara (en) sridhara (hi) madhva (en)
This command is extremely useful for verifying the integrity of verse data.

---

# 6. Commentary Index Builder

To speed up commentary resolution, the system maintains commentary indexes.

These indexes are generated using the CLI.

Command:

npm run build:commentary-index
Script:

scripts/cli/build-commentary-index.ts
This script scans:

derivatives/commentary/
and generates index files in:

index/commentary/
Example output:

bg.1.1.commentaries.index.json
---

# 7. Why Commentary Indexes Are Needed

Without commentary indexes the loader would need to scan directories repeatedly.

For large corpora this would cause significant slowdown.

Indexes provide a quick lookup table that lists:

• available commentary authors  
• available translation languages  

This dramatically speeds up verse loading.

---

# 8. CLI Technology Stack

The CLI is written using:

• TypeScript  
• Node.js  
• ts-node  

Execution command:

ts-node -r tsconfig-paths/register
This allows CLI scripts to reuse the same modules used by the frontend.

---

# 9. Relationship With the Loader System

The CLI does not implement its own scripture logic.

Instead it reuses the same loaders used by the application.

Example:

loadVerseComposition()
This ensures that:

• CLI results match frontend behavior  
• bugs can be reproduced easily  
• debugging is simplified  

---

# 10. Typical Workflow for Corpus Editors

A typical workflow when adding new verses or commentaries is:

1. Add JSON files to the corpus.
2. Run the commentary index builder.
3. Use the CLI to inspect the verse.

Example:

npm run build:commentary-index npm run vedic verse bg.1.1
If the verse loads correctly in the CLI, it will also work in the frontend.

---

# 11. Future CLI Extensions

The CLI system will expand as the corpus grows.

Future commands may include:

### Corpus Validation

npm run vedic validate
Checks:

• UID correctness  
• JSON schema validation  
• broken references  

---

### Word Index Builder

npm run vedic build-word-index
Builds Sanskrit word search indexes.

---

### Cross Reference Builder

npm run vedic build-crossrefs
Generates links between verses across scriptures.

---

### Corpus Import Tools

npm run vedic import-upanishad
Imports external textual corpora.

---

# 12. Importance of the CLI Layer

The CLI transforms the Vedic Library from a simple website into a **true corpus management system**.

It allows developers to:

• maintain large textual datasets  
• automate processing tasks  
• validate scholarly data  

This capability becomes essential when the library expands to thousands of scriptures.

---

# 13. Summary

The Developer CLI provides a powerful interface for interacting with the scripture engine.

It supports:

• verse inspection  
• commentary indexing  
• debugging  
• corpus maintenance  

and will serve as the primary toolkit for engineers maintaining the Vedic Library infrastructure.
