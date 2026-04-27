This document is deliberately long, explicit, and pedagogical, because this stage is where most canonical corruption happens if rules are vague. After this, you should feel calm ingesting any śāstra—no matter how messy the source.

🏗️ Canonical Intake & Normalization
Vedic Library Project
0. Purpose of This Document

This document defines how raw textual sources are transformed into canonical data in the Vedic Library.

It governs:

how sources are accepted

what is allowed to change

what must never change

how ambiguity is resolved

how consistency is enforced across all śāstra

This document works in tandem with:

CANONICAL_TEXT_POLICY.md (what canon is)

canonical schema files (how canon is shaped)

This document answers:

“I have raw text in many inconsistent forms — how do I safely turn it into canonical data?”

1. The Fundamental Rule of Intake

Canonical text is never copied verbatim from a source.
It is always derived through a controlled normalization pipeline.

This is not optional.

Why:

manuscripts differ

editions differ

websites differ

punctuation differs

verse markers differ

scripts differ

Blind copying is the fastest way to corrupt canon.

2. Definition: “Source Text”

A source text is any representation of a śāstra obtained from:

printed editions

PDFs

scanned OCR

websites

databases (Vedabase, GRETIL, etc.)

academic corpora

traditional manuscripts (digitized)

Source text:

MAY be incomplete

MAY be inconsistent

MAY contain commentary

MAY contain formatting artifacts

Source text is never canonical by default.

3. Intake Stages (Conceptual Pipeline)

Canonical intake happens in clearly separated stages.

Overview
Raw Source
   ↓
Pre-cleaning
   ↓
Segmentation
   ↓
Structural Validation
   ↓
Canonical Normalization
   ↓
Canonical Unit Assembly
   ↓
Schema Validation
   ↓
LOCK


Each stage has strict boundaries.

4. Stage 0 — Source Registration (Required)

Before touching text, every source MUST be registered.

You must record:

source name

source URL or bibliographic reference

acquisition date

format (PDF, HTML, OCR, etc.)

known issues (if any)

This ensures:

traceability

auditability

reproducibility

No anonymous sources are allowed.

5. Stage 1 — Pre-cleaning (Mechanical Only)

Purpose: remove non-textual noise.

Allowed operations:

remove HTML tags

remove CSS artifacts

normalize whitespace

remove page numbers

remove headers/footers

remove footnote markers

Forbidden operations:

rephrasing

spelling “corrections”

interpretation

rearranging lines

At this stage:

text may still be messy

verse boundaries may still be unclear

That is expected.

6. Stage 2 — Segmentation (Critical Stage)

Purpose: determine canonical unit boundaries.

Examples:

śloka boundaries

sūtra boundaries

mantra boundaries

Rules:

segmentation follows traditional unit identity

not line breaks

not website layout

not paragraph formatting

If ambiguity exists:

consult multiple editions

consult traditional numbering

choose the most conservative segmentation

Never split or merge units for convenience.

7. Stage 2.5 — Canonical Alignment (LOCKED STAGE)

This is the most important stage.

Responsibilities of Stage 2.5

Remove ALL existing verse / unit markers

Normalize text body

Append canonical markers

Generate canonical-aligned transliteration

Ensure one-to-one unit alignment

This stage is:

mechanical

deterministic

repeatable

No interpretation is allowed.

8. Script Normalization Rules
8.1 Canonical Script Requirement

Primary canonical script = Devanāgarī

If source is:

IAST → convert to Devanāgarī

Romanized → convert to Devanāgarī

regional script → convert to Devanāgarī

Devanāgarī is the anchor.

8.2 Transliteration Generation

IAST transliteration:

MUST be generated algorithmically

MUST NOT be copied from source

MUST be reproducible

Approved libraries:

indic-transliteration (preferred)

others allowed only with explicit justification

Transliteration exists to mirror, not interpret.

9. Handling Inconsistent Verse Forms (Your Example)

You correctly observed cases like:

धृतराष्ट्र उवाच
धर्मक्षेत्रे कुरुक्षेत्रे ...


vs

धर्मक्षेत्रे कुरुक्षेत्रे ...
॥ १ ॥


Rules:

Canonical unit includes only the text belonging to the unit

Narrative headers (e.g., “धृतराष्ट्र उवाच”) are included only if traditionally part of the verse

Marker variants are normalized

Multi-line layout is preserved only if textually meaningful

The identity of the unit never depends on formatting.

10. Handling Pre-Verse and Post-Verse Material

Types of extra material:

speaker attributions

prose connectors

colophons

section titles

Rules:

If traditionally inseparable → included

If editorial or contextual → separate editorial unit

Never merged into canonical verse for convenience

This preserves:

citation integrity

cross-edition alignment

11. Numbering Normalization

Rules:

Arabic numerals are metadata, never text

Devanāgarī numerals appear only in markers

Inconsistent numbering across editions:

choose the most widely accepted traditional numbering

document alternatives externally

UID remains stable regardless of numbering disputes.

12. Canonical Unit Assembly

Each canonical unit must include:

UID

work metadata

location metadata

canonical text (Devanāgarī)

canonical-aligned transliteration

schema declaration

source provenance

Nothing else.

13. Schema Validation (Mandatory)

Before acceptance:

every canonical file MUST validate against its schema

missing required fields = rejection

extra fields = rejection

Schema defines:

structure

allowed fields

Policy defines:

meaning

authority

14. Locking & Immutability

Once a canonical unit passes validation:

it is declared LOCKED

it must never be edited

Corrections require:

new pipeline version

or new schema version

Old data remains valid.

15. Error Handling & Disputes

If disagreement arises:

canonical data is not modified

disputes are recorded externally

commentary layers handle divergence

Canon is not a debate space.

16. Why This Process Exists

Because:

every shortcut today becomes corruption tomorrow

śāstra survives by precision, not speed

future generations must trust this data blindly

17. Final Guiding Statement

Normalization is not improvement.
It is disciplined preservation.

If an action feels like “making it clearer,”
it probably does not belong in canon.
