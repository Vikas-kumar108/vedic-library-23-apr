This version is written to be:

authoritative (no ambiguity)

educational (for a learner, not just implementers)

aligned with:

CANONICAL_TEXT_POLICY.md

CANONICAL_UNIT_DEFINITION.md

SCHEMA_OPTIONALITY_RULES.md

UID_SYSTEM.md

stable for decades, while still allowing evolution through versioning

I am intentionally explicit, even where it feels repetitive — because schema confusion is the most expensive kind of confusion.

🗃️ Data Schema
Canonical & Extended Data Architecture
Vedic Library Project
0. Purpose of This Document

This document defines how data is structured, what may coexist, and what must never mix, across the entire Vedic Library system.

It answers:

What is a schema in this project?

What belongs in canonical data?

What belongs in extended data?

How are layers separated?

How does schema scale from one verse to the entire Vedic corpus?

This is not a storage guide.
This is a semantic and structural contract.

1. What “Schema” Means Here (Important)

In this project, a schema is:

A formal, machine-verifiable definition of
what fields exist,
which are mandatory,
which are forbidden,
and what they mean.

A schema is not:

a UI model

a database table

a rendering format

a convenience structure

Schemas exist to protect meaning over time.

2. Global Architectural Principle

Canonical meaning is preserved by separation, not by enrichment.

Therefore:

Canonical data is minimal and immutable

Everything else is layered around it

3. Canonical vs Extended: The Fundamental Split

Every piece of data in this system belongs to exactly one of these categories.

3.1 Canonical Data (Layer A)

Canonical data represents the primary śāstric unit.

Examples:

a śloka

a sūtra

a mantra

a ritual injunction

Canonical data:

has exactly one UID

exists once

is never edited after locking

3.2 Extended Data (Layer B+)

Extended data exists because canonical data exists.

Examples:

translations

synonyms

commentaries

glosses

principles

skills

guidance

knowledge graphs

Extended data:

always references a canonical UID

may be missing

may be multiple

may evolve

4. Canonical Schema Family (Layer A)

Canonical schemas define primary textual units only.

They are schema-specific, not one-size-fits-all.

4.1 Canonical Schema Types
Schema	Represents
canonical-verse.schema.md	Metric verse (śloka)
canonical-sutra.schema.md	Aphoristic unit (sūtra)
canonical-mantra.schema.md	Vedic mantra
canonical-lexeme.schema.md	Word-level canonical unit
canonical-ritual-unit.schema.md	Ritual injunction

Each schema is:

separate

versioned

independently evolvable

5. Example: Canonical Verse Schema (Conceptual)

A canonical verse contains:

UID (identity)

Work metadata (location, not interpretation)

Text (primary script)

Transliteration (mechanical)

Provenance

Schema binding

It never contains:

translation

meaning

commentary

explanation

audience framing

6. Extended Schema Family (Layer B+)

Extended schemas wrap canonical units, but never alter them.

Examples:

Schema	Purpose
translation.schema.md	Human language rendering
commentary.schema.md	Ācārya exposition
synonym.schema.md	Word meanings
gloss.schema.md	Short explanatory notes
principle.schema.md	Abstracted ideas
skill.schema.md	Applied competencies
guidance.schema.md	Practice-oriented advice
knowledge-node.schema.md	Graph connections

All extended schemas share one rule:

They must reference a canonical UID.

7. UID as the Spine of All Schemas

Every schema contains one of two identity fields:

7.1 Canonical Schemas
"uid": "bg.2.13"

7.2 Extended Schemas
"ref": "bg.2.13"


Rules:

uid is owned by canonical units

ref is used by everything else

No schema may contain both

8. Mandatory vs Optional Fields (Schema Discipline)

Mandatory fields are:

required for identity

required for validation

required for long-term stability

Optional fields are:

contextual

editorial

version-sensitive

Rules governing this split are defined in:
👉 SCHEMA_OPTIONALITY_RULES.md

No schema may redefine this arbitrarily.

9. Language Handling (Critical Clarification)

Languages are never embedded in canonical schemas.

Canonical text:

has one authoritative script

may have mechanically derived forms

Languages belong to extended schemas only.

This prevents:

canonical drift

translation bias

accidental authority shifts

10. Provenance & Auditability

Canonical schemas must record:

source pipeline

derivation stage

script version

schema version

This allows:

reproducibility

scholarly audit

future re-derivation

Extended schemas may record:

authorship

review status

confidence

editorial notes

11. What Must NEVER Be Stored Together

❌ canonical text + translation
❌ canonical text + commentary
❌ multiple languages in canonical layer
❌ AI output in canonical schema
❌ UI state in data schema

Violating these rules corrupts meaning.

12. Schema Versioning Rules

Schemas evolve only by:

version increment

explicit migration path

never silent change

Canonical schemas are conservative.
Extended schemas are adaptive.

13. Relationship to Other Documents

This document is governed by:

PROJECT_CONSTITUTION.md

CANONICAL_TEXT_POLICY.md

CANONICAL_UNIT_DEFINITION.md

CANONICAL_IDENTITY_PRINCIPLES.md

It directly supports:

DATA_LOADING_ABSTRACTION_STRATEGY.md

KNOWLEDGE_LAYER_MODEL.md

SEMANTIC_DERIVATION_POLICY.md

14. Status & Classification

Category: LOCKED ARCHITECTURAL CONTRACT

Applies to: All phases

Changes allowed only by:

schema versioning

constitutional amendment

15. Closing Principle

Schemas are vows.
Once taken, they are not adjusted for convenience.
Meaning survives because discipline survives.
