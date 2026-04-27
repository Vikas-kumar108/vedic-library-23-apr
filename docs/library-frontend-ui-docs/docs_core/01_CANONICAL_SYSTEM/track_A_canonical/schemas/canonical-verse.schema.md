docs/schemas/canonical-verse.schema.md

This version is written to be:

binding (no ambiguity)

educational (for a serious learner, not just implementers)

strictly aligned with:

CANONICAL_TEXT_POLICY.md

CANONICAL_UNIT_DEFINITION.md

SCHEMA_OPTIONALITY_RULES.md

UID_SYSTEM.md

DATA_SCHEMA.md

stable for decades, with clearly defined evolution rules

I am intentionally verbose and precise. This schema is foundational.

📜 Canonical Verse Schema
vedic-library.canonical.verse
0. Purpose of This Schema

This document defines the exact structural contract for a canonical verse in the Vedic Library system.

A canonical verse represents:

A primary, metrically discrete śāstric unit
that carries authority by position, not by interpretation.

This schema answers:

What fields a canonical verse file MUST contain

What fields it MUST NOT contain

How identity, text, and provenance are represented

How this unit scales across the entire Vedic corpus

1. What a Canonical Verse Is (And Is Not)
1.1 Definition

A canonical verse is:

a śloka, gāthā, kārikā, or metrical unit

identified by structural position

independent of language, commentary, or audience

1.2 A Canonical Verse Is NOT

a translation

a commentary

a pedagogical unit

a UI renderable block

a knowledge abstraction

Those belong to editorial or semantic layers.

2. Schema Identity
"schema": {
  "name": "vedic-library.canonical.verse",
  "version": "1.0.0"
}

Rules

Every canonical verse file MUST declare this schema block

Schema version binds the file permanently

Any structural change requires a new schema version

3. Canonical Identity (UID)
3.1 UID Field
"uid": "bg.2.13"

Rules

UID is mandatory

UID is globally unique

UID encodes location only

UID NEVER encodes:

language

author

sampradāya

commentary

edition

UID rules are governed by:
👉 UID_SYSTEM.md
👉 UID_REFINEMENT_RULES.md

4. Work Declaration (Canonical Placement)
4.1 Purpose

The work object declares where this verse lives in the corpus, not how it is interpreted.

"work": {
  "corpus": "itihasa",
  "text": "mahabharata",
  "section": "bhisma-parva",
  "subwork": "bhagavad-gita"
}

4.2 Field Semantics
Field	Meaning
corpus	Highest canonical shelf (śruti, smṛti, itihāsa…)
text	Named śāstra
section	Major structural division (if applicable)
subwork	Named internal work (if applicable)
Rules

All four fields exist structurally

Some may be null if not applicable

Values come from controlled vocabularies

No aliases, abbreviations, or UI labels allowed

This prevents:

corpus drift

naming confusion

future reclassification errors

5. Location Object (Structural Position)
"location": {
  "chapter": 2,
  "verse": 13
}

Rules

All values MUST be integers

Location is structural metadata

Verse identity MUST NOT be inferred from text content

Word-based labels (adhyāya, pāda, sarga…) are not stored here

Why?

Because words change. Numbers endure.

6. Canonical Text Block (Primary Authority)
6.1 Text Object
"text": {
  "script": "devanagari",
  "content": "धर्मक्षेत्रे कुरुक्षेत्रे … ॥ १३ ॥"
}

Rules (Non-Negotiable)

script MUST be "devanagari"

content MUST contain:

normalized Sanskrit text

exactly ONE verse

exactly ONE verse marker

Arabic numerals MUST NOT appear

Line breaks are permitted

Punctuation is normalized by policy

Why Devanāgarī?

Because canonical authority is preserved by scriptual primacy.
Other scripts are derivatives, not equals.

This is governed by:
👉 CANONICAL_TEXT_POLICY.md

7. Transliteration Block (Canonical-Aligned)
"transliteration": {
  "scheme": "iast",
  "content": "dharma-kṣetre kuru-kṣetre … || 13 ||"
}

Rules

Transliteration is mandatory

Must be mechanically generated

Must correspond 1-to-1 with Devanāgarī

Must contain exactly ONE verse marker

Must never introduce interpretation

IAST is canonical-aligned, not canon itself.

8. Source & Provenance (Auditability)
"source": {
  "pipeline": "bhagavad-gita",
  "stage": "2.5",
  "script": "s25_normalize_bg.py",
  "script_version": "2.2.0",
  "derived_from": [
    "vedabase/raw/bg-2-13.json"
  ]
}

Purpose

This block ensures:

reproducibility

scholarly trust

future re-derivation

Rules

Required for every canonical verse

Must reflect actual pipeline history

Must never include human interpretation

9. What This Schema Explicitly Forbids

A canonical verse file MUST NOT contain:

❌ translations
❌ synonyms
❌ commentary
❌ gloss
❌ principles
❌ skills
❌ entities
❌ guidance
❌ UI hints
❌ language toggles

Violations invalidate canonical status.

10. Relationship to Other Canonical Schemas

This schema applies ONLY to:

metrical verse units

Other canonical units use different schemas:

Unit	Schema
Sūtra	canonical-sutra.schema.md
Mantra	canonical-mantra.schema.md
Ritual injunction	canonical-ritual-unit.schema.md
Lexeme	canonical-lexeme.schema.md

Never force a verse into the wrong schema.

11. Optionality Rules (Strict)

This schema follows:

👉 SCHEMA_OPTIONALITY_RULES.md

Summary:

uid, work, location, text, transliteration, source, schema → MANDATORY

No optional canonical fields exist in v1.0.0

Canonical minimalism is intentional.

12. Stability & Locking

Once a verse file:

conforms to this schema

passes validation

is declared locked

Then:

It MUST NEVER be modified.

Improvements require:

new pipeline

new schema version

new canonical layer

13. Status

Category: LOCKED ARCHITECTURAL CONTRACT

Scope: All śāstra with verse units

Change policy: Versioned only

14. Closing Principle

A canonical verse is not information.
It is positionally preserved truth.
Everything else may grow around it — never inside it.
