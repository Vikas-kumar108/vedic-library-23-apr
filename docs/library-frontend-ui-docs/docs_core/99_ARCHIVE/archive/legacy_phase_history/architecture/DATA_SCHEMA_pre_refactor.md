This version is written so that:

it never contradicts CANONICAL_TEXT_POLICY.md

it cleanly separates schema vs policy vs pipeline

it scales from Bhagavad-gītā to the entire Vedic corpus

a future contributor can read it without prior context

nothing “accidental” slips into canon ever again

Read it slowly once. After that, this document should feel settled for years.

🗃️ Data Schema
Vedic Library Project
Canonical & Derived Textual Data
0. Purpose of This Document

This document defines the data schemas used by the Vedic Library.

It answers only one question:

“What is the allowed structural shape of stored data?”

This document does not:

define textual authority

define normalization rules

define interpretation

define UI behavior

define pipeline logic

Those live elsewhere.

This document is structural law, not philosophy.

1. Architectural Principle (Non-Negotiable)

Structure is enforced by schema.
Meaning is governed by policy.
Transformation is governed by pipeline.

No schema may encode meaning.
No schema may encode interpretation.
No schema may encode UI assumptions.

2. Canonical vs Derived Data (Top-Level Separation)

All data in the Vedic Library belongs to exactly one of these classes:

2.1 Canonical Data

Represents primary śāstric units

Immutable once locked

Authority-bearing

Language-independent (except script requirement)

2.2 Derived Data

Depends on canonical data

Additive

Replaceable

May evolve independently

Canonical data is the spine.
Derived data is the ecosystem.

3. Canonical Data Schemas (Layer A)

Canonical schemas define what a canonical unit is, structurally.

They never include:

translation

commentary

interpretation

pedagogy

metadata of opinion

3.1 Canonical Unit Types

Different śāstra use different unit kinds.
Each has its own schema.

Unit Type	Example Texts
verse	Bhagavad-gītā, Purāṇa
mantra	Veda
sūtra	Dharma-sūtra, Yoga-sūtra
kārikā	Sāṅkhya-kārikā
prose-unit	Brāhmaṇa, Upaniṣad
ritual-unit	Śrauta / Gṛhya texts

Each unit type has:

a dedicated schema

a stable UID

identical policy guarantees

4. Canonical Verse Schema (Illustrative)

(Full definition lives in canonical-verse.schema.md)

Canonical verse files MUST include:
{
  "uid": "string",
  "work": { ... },
  "location": { ... },
  "text": { ... },
  "transliteration": { ... },
  "source": { ... },
  "schema": { ... }
}


All fields are required.

5. The uid Field
"uid": "bg.2.13"


Rules:

globally unique

immutable

ASCII

lowercase

location-based, never semantic

UIDs are defined by:

UID_SYSTEM.md

corpus-specific UID registries

Schema validates presence, not correctness.
Correctness is validated elsewhere.

6. The work Object (Structural Identity)
"work": {
  "corpus": "itihasa",
  "text": "mahabharata",
  "section": "bhisma-parva",
  "subwork": "bhagavad-gita"
}

Purpose

To locate the unit within the Vedic corpus, not to describe it.

Rules

All fields are required

Values come from controlled vocabularies

These are structural axes, not literary labels

Important Clarification

Some texts do not conceptually require all four levels.
They are still structurally present.

Example:

Padma-Purāṇa

corpus = purana

text = padma

section = null-equivalent (fixed placeholder)

subwork = null-equivalent

Absence is represented by controlled placeholders, never omission.

This preserves schema uniformity across all śāstra.

7. The location Object (Numeric Position)
"location": {
  "chapter": 2,
  "verse": 13
}


Rules:

numeric only

integers only

no inference from text

numbering disputes are resolved before schema entry

The schema does not care what chapter means.
It only enforces that location exists.

8. The text Object (Canonical Script)
"text": {
  "script": "devanagari",
  "content": "धर्मक्षेत्रे कुरुक्षेत्रे..."
}


Rules:

canonical script = Devanāgarī

no translations

no markup

no HTML

verse markers normalized per policy

This is the authoritative textual witness.

9. The transliteration Object (Canonical-Aligned)
"transliteration": {
  "scheme": "iast",
  "content": "dharma-kṣetre kuru-kṣetre..."
}


Rules:

must be mechanically derived

must be reproducible

must match canonical text exactly

not independently authoritative

Schema enforces shape, not correctness.

10. The source Object (Audit Trail)
"source": {
  "pipeline": "bhagavad-gita",
  "stage": "2.5",
  "script": "s25_normalize_bg.py",
  "script_version": "2.3.1",
  "derived_from": [
    "vedabase/raw/bg-2-13.json"
  ]
}


Purpose:

reproducibility

accountability

scholarly trust

This is not editorial metadata.
It is technical provenance.

11. The schema Object (Binding Contract)
"schema": {
  "name": "vedic-library.canonical.verse",
  "version": "1.0.0"
}


Rules:

every canonical file declares its schema

schema version is immutable per file

upgrades require new version

This prevents silent drift.

12. Derived Data Schemas (Layer B+)

Derived data never alters canonical files.

Examples:

translation

synonyms

commentary

gloss

concepts

entities

principles

skills

courses

compilations

Each derived unit:

references canonical uid

declares its own schema

declares its own authority level

Example:

{
  "ref": "bg.2.13",
  "type": "translation",
  "language": "en",
  "text": "The soul is never born..."
}


Derived schemas are replaceable by design.

13. What Must NEVER Appear in Canonical Schemas

❌ translations
❌ commentary
❌ gloss
❌ semantic tags
❌ entities
❌ principles
❌ skills
❌ pedagogy
❌ AI output
❌ UI hints

Canonical schema = textual identity only.

14. Schema Evolution Rules

Schemas may evolve only when:

a new unit type is introduced

structural insufficiency is proven

policy explicitly authorizes change

Never:

silently extend

overload fields

add optional shortcuts

Evolution is versioned, not patched.

15. Relationship to Other Documents

This document depends on:

CANONICAL_TEXT_POLICY.md

CANONICAL_UNIT_DEFINITION.md

UID_SYSTEM.md

This document is depended on by:

validators

pipelines

storage

frontend loaders

indexing engines

16. Final Principle

If something feels “useful,”
it probably does not belong in the schema.

Schemas exist to prevent mistakes, not enable creativity.
