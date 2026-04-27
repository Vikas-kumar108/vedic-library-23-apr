This is written as a civilizational policy document, not just a technical note.
It is intentionally detailed, explanatory, and explicit, so that:

you, as a learner and future architect, never have lingering doubts

future contributors cannot “interpret” the policy loosely

Phase-2, Phase-20, and beyond remain aligned

canonical integrity survives disagreements, editions, technologies, and centuries

Please read it slowly. This document is meant to be internalized, not skimmed.

📜 Canonical Text Policy
Vedic Library Project
0. Purpose of This Document

This document defines what “canonical text” means in the Vedic Library project and establishes binding, non-negotiable rules for:

creating canonical data

normalizing canonical sources

storing canonical units

protecting canonical identity

separating canon from interpretation

This policy applies to all śāstra, without exception:

Śruti

Smṛti

Itihāsa

Purāṇa

Āgama / Tantra

Vedāṅga

Upaveda

Darśana

Sampradāya texts treated as canonical works

1. What “Canonical” Means (Very Precise)

In the Vedic Library:

Canonical text is the minimal, primary, authoritative textual witness of a śāstra.

Canonical text is defined by what it is, not by:

how it is explained

how it is taught

how it is translated

how it is interpreted

Canonical text is:

text that traditions argue about, but do not rewrite

text that commentaries depend on, but do not replace

text whose identity precedes explanation

2. What Canonical Text Is NOT

Canonical text is not:

a translation

a commentary

a paraphrase

a teaching aid

a modern edition’s formatting

a UI presentation

an explanation of meaning

Even if something is:

ancient

respected

widely accepted

…it is not canonical unless it satisfies the rules below.

3. Canonical Authority Layers

Canonical authority is layered, not flat.

3.1 Primary Canonical Layer (Absolute Authority)

Script: Devanāgarī
Status: Absolute textual authority

This layer contains:

the Sanskrit text as preserved by tradition

normalized mechanically (never interpretively)

Rules:

No semantic alteration is permitted

Orthographic normalization is allowed

Verse markers are normalized (see §7)

This layer is the source of truth.

3.2 Canonical-Aligned Mechanical Layers (Derived, Not Independent)

These layers are derived mechanically from the primary layer.

Example:

IAST transliteration

Rules:

Generated algorithmically

No human “correction”

No borrowing from third-party transliterations

No semantic input

These layers are canonical-aligned, not independently canonical.

4. Canonical Units (Identity Level)

Canonical text is stored as units, never as prose blobs.

A canonical unit is:

the smallest indivisible textual identity recognized by tradition

Examples:

śloka (Bhagavad-gītā)

sūtra (Dharma-sūtra, Darśana)

mantra (Veda)

kārikā (Sāṅkhya-kārikā)

Canonical unit definitions are governed by:

📄 CANONICAL_UNIT_DEFINITION.md

5. Canonical Identity vs Canonical Presentation

This distinction prevents enormous future damage.

Canonical identity:

UID

location metadata

unit type

Canonical presentation:

line breaks

punctuation

typography

page layout

UI grouping

Canonical identity must never depend on presentation.

6. UID as Canonical Spine

Every canonical unit MUST have a UID.

Example:

bg.2.13
manu.sm.2.6
panini.as.1.1.1


Rules:

UID encodes location only

UID never encodes:

meaning

topic

speaker

philosophy

sampradāya

edition

UID never changes once published

UID rules are governed by:

📄 UID_SYSTEM.md
📄 UID_REFINEMENT_RULES.md

7. Verse / Unit Markers (Normalization Rules)
7.1 Devanāgarī Markers (LOCKED)

Every canonical unit in Devanāgarī MUST end with exactly one marker.

Format:

॥ <Devanāgarī numeral> ॥


Example:

॥ १३ ॥


Rules:

Arabic numerals MUST NOT appear

Multiple markers MUST be normalized to one

Missing markers MUST be added mechanically

7.2 IAST Markers (LOCKED)

Every IAST unit MUST end with:

|| <Arabic numeral> ||


Example:

|| 13 ||


Rules:

Exactly one marker

No Devanāgarī numerals

No mixed systems

8. Canonical Intake & Normalization

Canonical data does not come “clean” from sources.

Sources may contain:

inconsistent punctuation

missing markers

extra markers

prose introductions

colophons

editorial headings

Therefore:

Canonical text is always the result of a controlled normalization pipeline.

Normalization rules are governed by:

📄 CANONICAL_INTAKE_AND_NORMALIZATION.md

9. What Is Explicitly Forbidden in Canonical Data

Canonical files MUST NOT contain:

translations

word meanings

glosses

commentary

speaker attribution

interpretive headings

philosophical labels

editorial notes

teaching aids

AI output

UI hints

If it helps understanding, it does not belong in canon.

10. Pre-Verse / Post-Verse Material (Important)

Many śāstra contain material such as:

“X uvāca”

narrative framing

prose transitions

colophons

Rules:

If traditionally part of the verse → included

If editorial or narrative framing → separate editorial unit

Canonical unit boundaries are never expanded for convenience

This prevents:

verse identity drift

edition-specific contamination

11. Canonical Text vs Commentary Text

Canonical text:

stands alone

does not explain itself

Commentary:

depends on canonical text

references canonical UID

never modifies canonical identity

This separation is absolute.

12. Canonical Stability & Locking

Once canonical data is declared LOCKED:

no edits allowed

no corrections allowed

no improvements allowed

Any change requires:

new pipeline version, or

new schema version

Old canonical data remains valid forever.

13. Schema Binding

All canonical files MUST declare their schema.

Examples:

canonical-verse.schema.md

canonical-sutra.schema.md

canonical-mantra.schema.md

Schema defines:

structure

required fields

allowed fields

optional fields

Policy defines:

meaning

authority

rules

Policy and schema must never be confused.

14. Relationship to Knowledge Layers

Canonical text is the root, not the destination.

All of the following attach to canon:

translations

glosses

entities

principles

skills

guidance

courses

community layers

None of them modify canon.

15. Why This Discipline Exists

Because śāstra survives by:

disagreement

interpretation

commentary

renewal

But it survives only if:

the text itself remains untouched.

16. Final Guiding Statement (Memorize This)

Canonical text is truth by preservation,
not truth by explanation.

If a rule protects preservation, it is right.
If a rule aids explanation at the cost of preservation, it is wrong.
