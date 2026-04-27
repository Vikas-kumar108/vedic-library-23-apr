RAW LAYER SEMANTICS

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies from: Phase-2 onward
Authority: Subordinate only to PROJECT_CONSTITUTION.md and CIP_LEAF_STANDARD.md

Once this is locked, you will never again wonder:

“Should this PDF go here or there?”

“Why do we have _raw in two places?”

“Can I normalize this now or later?”

“Where does provenance actually live?”

We now write the semantic law of rawness.

🧱  RAW LAYER SEMANTICS

This is a load-bearing document.

It explains why the raw layer exists, what kind of truth it represents, and what must never happen to it.

1. Purpose of the Raw Layer

The raw layer exists to preserve archival truth.

It answers only one question:

“What exactly did we receive from the world before we touched it?”

The raw layer does not exist to be clean, readable, canonical, or correct.

It exists to be faithful.

2. Definition of “Raw”

In the Vedic Library Project, raw means:

source-shaped

uncorrected

potentially noisy

potentially inconsistent

historically traceable

Raw data may include:

HTML with navigation junk

OCR with errors

PDFs with broken lines

Multiple conflicting versions

Non-Unicode text

Mixed scripts

All of this is acceptable.

None of this is canonical.

3. Absolute Rules of the Raw Layer

The following rules are non-negotiable.

3.1 Raw Data Is Never Edited

Once a file enters 01_raw/:

❌ it is never modified

❌ it is never normalized

❌ it is never “fixed”

❌ it is never overwritten

If a mistake exists, it is corrected downstream, never in raw.

3.2 Raw Data Is Grouped by Source, Not by File Type

Correct:

01_raw/
└── wisdomlib/
    ├── html/
    ├── txt/
    ├── pdf/
    └── provenance.json


Incorrect:

01_raw/
├── html/
├── pdf/
└── txt/


Why:
File type is accidental.
Source identity is epistemic.

4. Source Identity

Each folder directly under 01_raw/ represents one witness source.

A source is defined by:

origin (website, scan, edition)

edition or imprint (if known)

acquisition method

acquisition date

Example source IDs

wisdomlib

gita_press_1962

bori_ce

manuscript_scan_benares

Source IDs must be:

stable

lowercase

filesystem-safe

5. provenance.json (MANDATORY)

Every source folder MUST contain a provenance.json.

Purpose

provenance.json records how the raw data entered the system.

It guarantees:

auditability

reproducibility

scholarly honesty

Example
{
  "source_id": "wisdomlib",
  "source_type": "website",
  "title": "Padma Purana (Sanskrit)",
  "url": "https://www.wisdomlib.org/…",
  "language": "sanskrit",
  "script": "devanagari",
  "retrieved_on": "2026-02-04",
  "retrieved_by": "script:01_fetch_sources.py",
  "notes": "Generic online edition, non-critical"
}


Rules:

provenance.json is human-reviewed

provenance.json is never auto-generated blindly

provenance.json never asserts canonical authority

6. Relationship Between Raw and Canon

Raw data:

❌ does not define canonical boundaries

❌ does not define numbering

❌ does not define identity

❌ does not decide variants

Canonical identity is defined outside the raw layer.

Raw data is only evidence, never law.

7. Why 01_raw/ Exists in Two Places (Critical Clarification)
7.1 In CIP (vedic-corpus-ingestion/)
<cip-leaf>/data/01_raw/


This holds raw canonical witnesses only
→ used to forge canonical text.

7.2 In the Main Library (vedic-library-v1.0/)
vedic-library-v1.0/data/_raw/


This holds:

translations

commentaries

glosses

scans

pedagogical drafts

AI-assisted material

These are non-canonical forever.

The shared word “raw” means:

“Not yet processed into its final layer.”

It does not mean the same thing semantically.

8. Forbidden Content in CIP Raw Layer

The following MUST NOT appear in vedic-corpus-ingestion/**/01_raw/:

translations

commentaries

glossaries

explanatory notes

AI-generated text

pedagogical material

If present, ingestion must STOP.

9. Regeneration & Safety

The raw layer is:

append-only

archival

never regenerated

Downstream layers may be regenerated indefinitely.

10. Closing Principle

Raw data is not sacred.
Raw data is honest.

The Vedic Library preserves rawness so that:

canon is defensible

mistakes are traceable

future scholars can disagree responsibly

RAW_LAYER_SEMANTICS.md is hereby declared LOCKED.
