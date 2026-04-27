# CANONICAL_DATA_MODEL.md
Vedic Library — Canonical Data Model

---

# 1. Purpose

This document defines the **canonical data structures** used by the Vedic Library
platform to represent scripture and its editorial layers.

It formalizes:

• scripture structure  
• verse schema  
• commentary schema  
• linguistic layers  
• metadata systems  

This model ensures that:

- canonical text remains stable
- commentary remains modular
- UI remains independent of storage format

---

# 2. Design Principles

The data model follows several core principles.

## 2.1 Canonical Integrity

Scripture text must remain **separate from commentary**.

No interpretation may be embedded inside canonical content.

---

## 2.2 Layered Architecture

Scripture is represented through **layered editorial structures**.

Example layers:

| Layer | Meaning |
|------|--------|
| Canonical | Sanskrit verse |
| Linguistic | Transliteration |
| Analytical | Synonyms |
| Interpretive | Translation |
| Expository | Commentary |

Each layer is optional and independent.

---

## 2.3 Canon-Agnostic Structure

The data model must support:

- Veda
- Upaniṣad
- Purāṇa
- Itihāsa
- Darśana
- Smṛti texts

without requiring different schemas.

---

# 3. Canonical Text Hierarchy

All scripture content follows a hierarchical structure.

Domain → Text → Section → Subwork → Chapter → Verse
Example:

Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā → Chapter 2 → Verse 47
This hierarchy is defined by the **Canonical Metadata Registry**.

---

# 4. Verse Data Model

The fundamental unit of scripture rendering is the **Verse Object**.

Example structure:

Verse { canon: string chapter: number verse: number
devanagari: string transliteration: string
synonyms: SynonymItem[]
translations: Translation[]
commentaries: Commentary[]
metadata: VerseMetadata }
---

# 5. Canonical Fields

These fields represent the **immutable canonical layer**.

| Field | Meaning |
|------|--------|
| canon | canonical text identifier |
| chapter | chapter number |
| verse | verse number |
| devanagari | Sanskrit verse |
| transliteration | IAST transliteration |

These fields must remain stable.

---

# 6. Synonym Data Model

Synonyms represent word-by-word analysis.

Example:

SynonymItem { word: string meaning: string }
Example data:

{ word: "dharma-kṣetre", meaning: "in the place of pilgrimage" }
Synonyms are considered **analytical editorial layers**.

---

# 7. Translation Model

Translations represent interpretive layers.

Example schema:

Translation { id: string language: string translator: string text: string }
Example:

{ id: "prabhupada_en", language: "en", translator: "A. C. Bhaktivedanta Swami Prabhupāda", text: "Dhṛtarāṣṭra said..." }
Multiple translations can coexist.

---

# 8. Commentary Model

Commentaries represent **expository layers**.

Example schema:

Commentary { acharya: string language: string text: string source: string }
Example:

{ acharya: "Śrīla Prabhupāda", language: "en", text: "...", source: "Bhagavad-gītā As It Is" }
Future versions may support:

• multiple commentaries per verse  
• side-by-side comparison  
• commentary indexing

---

# 9. Verse Metadata

Additional metadata may be attached to verses.

Example:

VerseMetadata { keywords?: string[] concepts?: string[] crossReferences?: string[] }
This metadata enables:

• concept navigation  
• knowledge graph construction  
• educational pathways

---

# 10. Canon Identifiers

Each text receives a canonical identifier.

Examples:

| Canon | Meaning |
|------|--------|
| bg | Bhagavad-gītā |
| sb | Śrīmad Bhāgavatam |
| mbh | Mahābhārata |
| rv | Ṛgveda |

These identifiers form the routing base:

/library/bg/2/47
---

# 11. Storage Format (Phase B)

In early development phases scripture data is stored as:

JSON files
Example:

data/bg/2/47.json
Future storage may include:

• Supabase  
• PostgreSQL  
• object storage  
• canonical content registry

The loader abstraction ensures the UI remains unaffected.

---

# 12. Canonical Metadata Registry

Structural metadata is stored separately in:

src/lib/corpus.structure.ts
This registry defines:

• corpus hierarchy  
• navigation tree  
• canonical capabilities  

The registry contains **no scripture content**.

---

# 13. Content Loading Flow

Scripture rendering follows this pipeline.

Route ↓ Page Loader ↓ Scripture Loader ↓ Verse Composition ↓ VerseDisplay Component
The UI only receives **structured verse data**.

---

# 14. Future Knowledge Graph

Future phases will expand the model to include:

Concept ↔ Verse ↔ Commentary ↔ Curriculum
Example:

karma-yoga ↔ Bhagavad-gītā 2.47 ↔ Bhagavad-gītā 3.7 ↔ Educational modules
This will enable:

• concept exploration  
• educational navigation  
• cross-text discovery

---

# 15. Canonical Registry Evolution

The current registry system is **Registry B**.

TypeScript metadata
Future evolution:

Registry C External canonical metadata system
Registry C will allow:

• dynamic corpus expansion  
• commentary compatibility mapping  
• language support  
• educational tagging

---

# 16. Architectural Guarantees

The canonical data model ensures:

✔ scripture text remains immutable  
✔ commentary layers remain modular  
✔ UI remains storage-agnostic  
✔ data structures remain consistent across corpus  

This stability allows the platform to scale to the entire Vedic tradition.

---

# 17. Long-Term Vision

This data model will eventually support:

• the entire Vedic corpus  
• multi-commentary scholarship  
• educational curriculum systems  
• cross-text knowledge graphs  

The goal is to create a **durable digital structure for Vedic knowledge**.

---

# 18. Final Principle

The platform must always treat canonical text as the **primary authority**.

All other layers — commentary, translation, education — remain
extensions built around that foundation.
