docs/schemas/canonical-mantra.schema.md

This is treated as the most sensitive canonical schema in the entire Vedic Library system.
Accordingly, the document is longer, stricter, and more explicit than other schemas.

This schema is written to be read slowly.
Nothing here is accidental.

It is aligned with and depends on:

CANONICAL_TEXT_POLICY.md

CANONICAL_UNIT_DEFINITION.md

CANONICAL_IDENTITY_PRINCIPLES.md

SCHEMA_OPTIONALITY_RULES.md

UID_SYSTEM.md

UID_REFINEMENT_RULES.md

CANONICAL_INTAKE_AND_NORMALIZATION.md

🕉️ Canonical Mantra Schema
vedic-library.canonical.mantra
0. Why This Schema Is “Very Sensitive”

A mantra is not merely text.

In the Vedic tradition, a mantra is:

a sound-body (śabda-śarīra)

a ritual and cognitive unit

preserved primarily through oral transmission

governed by strict phonetic, accentual, and structural rules

Therefore:

Canonical mantra data must preserve form over convenience,
transmission over presentation,
and structure over interpretation.

Any casual handling here would permanently damage the corpus.

1. What a Canonical Mantra Is
1.1 Definition

A canonical mantra is:

a primary Vedic textual unit

belonging to Śruti

traditionally recited

fixed in wording, accent, and sequence

Examples:

Ṛg-veda Saṁhitā mantras

Yajur-veda mantras

Atharva-veda mantras

1.2 What a Canonical Mantra Is NOT

A canonical mantra is not:

a translation

a paraphrase

a ritual explanation (brāhmaṇa prose)

a philosophical exposition (upaniṣad prose)

a hymn summary

a prayer adapted for devotion

a modern chanting format

If the unit is prose explanation → not a mantra
If the unit is metrical but post-Vedic → not a mantra
If the unit is derived or reorganized → not canonical

2. Schema Identity
"schema": {
  "name": "vedic-library.canonical.mantra",
  "version": "1.0.0"
}

Rules

Mandatory

Schema version is binding

Structural changes require new version

No silent evolution

3. Canonical Identity (UID)
3.1 UID Field
"uid": "rv.samhita.1.1.1"


or

"uid": "av.samhita.4.7.2"

Rules (Absolute)

UID is mandatory

UID is immutable

UID encodes textual location only

UID NEVER encodes:

meaning

ritual usage

deity

meter

accent

recension

school

chant style

All UID grammar must conform to:
👉 UID_SYSTEM.md

4. Work Declaration (Śruti Context)
"work": {
  "corpus": "sruti",
  "text": "rig-veda",
  "section": "samhita",
  "subwork": null
}


or

"work": {
  "corpus": "sruti",
  "text": "yajur-veda",
  "section": "samhita",
  "subwork": "krsna"
}

Rules

All four keys exist structurally

Values come from controlled vocabularies

section = "samhita" is mandatory for mantras

subwork used only for recensions (śukla / kṛṣṇa)

No UI names. No abbreviations beyond registry.

5. Location Object (Ritual Sequence Authority)
"location": {
  "mandala": 1,
  "sukta": 1,
  "mantra": 1
}


or

"location": {
  "kanda": 4,
  "prasna": 7,
  "mantra": 2
}

Rules

All values MUST be integers

Location is ritual-textual, not editorial

Location expresses oral sequence

Chapter-like labels are corpus-specific

Never infer structure from text content

6. Canonical Text Block (Primary Authority)
6.1 Devanāgarī Text (Mandatory)
"text": {
  "script": "devanagari",
  "content": "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्"
}

Rules (Extremely Strict)

Script MUST be devanagari

Content MUST:

represent exactly one mantra

preserve phonetic form

No translation

No punctuation normalization beyond policy

No editorial additions

No line reflow unless attested

No silent correction

Devanāgarī is canonical authority, not convenience.

7. Accentual Layer (Mandatory for Mantras)
"accent": {
  "system": "vedic-svara",
  "notation": "udatta-anudatta-svarita",
  "content": "अ॒ग्निमी॑ळे पु॒रोहि॑तं"
}

Rules

Accent data is mandatory

Accent must be derived from authoritative sources

No inferred accent

No normalization across recensions

Accent errors invalidate canonical status

If accent is unavailable → the mantra cannot yet be canonical

8. Transliteration Layer (Canonical-Aligned)
"transliteration": {
  "scheme": "iast",
  "content": "agním īḷe purohitaṃ"
}

Rules

Mandatory

Generated mechanically

Must align with accented Devanāgarī

No interpretive spacing

No sandhi alteration

9. Source & Provenance (Audit-Critical)
"source": {
  "pipeline": "rig-veda",
  "stage": "2.5",
  "script": "s25_normalize_mantra.py",
  "script_version": "1.0.0",
  "derived_from": [
    "saunaka-rgveda-critical.txt"
  ]
}

Rules

Mandatory

Must be reproducible

Must reference real sources

No scholarly opinion

No ritual commentary

10. What Is Explicitly Forbidden

A canonical mantra file MUST NOT contain:

❌ translations
❌ word meanings
❌ deity tags
❌ ritual usage notes
❌ meters (chandas)
❌ commentary
❌ educational explanation
❌ chanting instructions
❌ phonetic simplification

All of these belong to derivative layers.

11. Relationship to Other Canonical Units
Unit	Schema
Verse (metrical, post-Vedic)	canonical-verse.schema.md
Sūtra	canonical-sutra.schema.md
Ritual injunction	canonical-ritual-unit.schema.md
Lexeme	canonical-lexeme.schema.md

A mantra is never interchangeable with these.

12. Optionality Rules (Very Narrow)

Governed by:
👉 SCHEMA_OPTIONALITY_RULES.md

Summary:

uid, work, location, text, accent, transliteration, source, schema → MANDATORY

No optional semantic fields

No conditional relaxation

This strictness is intentional.

13. Stability & Locking

Once a mantra file:

conforms to this schema

passes phonetic and accent validation

is declared locked

Then:

It must never be edited.

Corrections require:

new pipeline

new source attestation

or new schema version

Never patch canonical mantras manually.

14. Status

Category: LOCKED ARCHITECTURAL CONTRACT

Sensitivity: MAXIMUM

Change policy: Extremely conservative

Scope: All Vedic mantra corpora

15. Closing Principle

A mantra is not information.
It is preservation of sound across time.
Treat it as such.
