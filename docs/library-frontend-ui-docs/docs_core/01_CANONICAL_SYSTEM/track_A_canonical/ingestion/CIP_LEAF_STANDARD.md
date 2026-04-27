CANONICAL INGESTION PROJECT (CIP) — LEAF STANDARD

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies from: Phase-2 onward
Authority: Subordinate only to PROJECT_CONSTITUTION.md and CIP_ROOT_ARCHITECTURE.md

This document answers, once and forever:

What exactly lives inside a CIP leaf

Where raw data goes

Where provenance is recorded

Where scripts stop and humans decide

Why this is different from _raw in the main library

Why your Padma-Purāṇa / Manu-Smṛti confusion was inevitable before this document

0. Purpose of This Document

This document defines the internal structure and discipline of a CIP leaf.

A CIP leaf is the atomic unit of ingestion responsibility.

This document ensures that:

every scripture is ingested the same way

scripts never make canonical decisions

raw data never contaminates canon

provenance is never lost

future contributors can work blindly and safely

1. Definition of a CIP Leaf

A CIP leaf:

ingests exactly one canonical work

uses exactly one declared canonical spine

produces schema-validated canonical units

emits no interpretation, commentary, or translation

A CIP leaf is mechanical, not scholarly.

2. Mandatory CIP Leaf Structure

Every CIP leaf MUST follow this structure exactly.

<cip-leaf>/
├── README.md
├── requirements.txt
│
├── config/
│   ├── sources.yaml
│   ├── selectors.yaml
│   └── normalization.yaml
│
├── scripts/
│   ├── 00_validate_environment.py
│   ├── 01_fetch_sources.py        (optional)
│   ├── 02_fetch_units.py
│   ├── 03_extract_raw_text.py
│   ├── 04_normalize_text.py
│   ├── 05_split_canonical_units.py
│   ├── 06_assign_uids.py
│   ├── 07_emit_canonical_json.py
│   └── 08_validate_output.py
│
├── data/
│   ├── 00_index/
│   ├── 01_raw/
│   ├── 02_extracted/
│   ├── 03_normalized/
│   └── 04_canonical/
│
├── logs/
└── reports/


No folders may be removed.
No folders may be renamed.
No folders may be repurposed.

3. Purpose of Each Top-Level Item
3.1 README.md (Mandatory)

The README.md declares human authority decisions.

It MUST state:

canonical work name

declared canonical spine

scope boundaries (what is included / excluded)

known textual uncertainties

source editions used as witnesses

The README is the only place where non-mechanical decisions are recorded.

3.2 requirements.txt

Lists Python dependencies for this CIP only.

Rules:

no global assumptions

reproducible environment

pinned versions where possible

4. config/ — Controlled Variability

All text-specific differences live here.

4.1 sources.yaml

Defines raw textual witnesses.

Example:

wisdomlib:
  type: website
  base_url: https://www.wisdomlib.org/...
  language: sanskrit
  edition: generic


Rules:

no URLs hard-coded in scripts

every source has a stable ID

provenance.json is derived from this

4.2 selectors.yaml

Defines how raw text is extracted.

Example:

sanskrit_blocks:
  - ".sanskrit"
  - ".verse"


Rules:

selectors are never inferred

selectors may change without breaking canon

4.3 normalization.yaml

Defines mechanical cleanup only.

Allowed:

danda normalization

whitespace normalization

numeral normalization

Forbidden:

emendation

conjecture

interpretation

5. scripts/ — Mechanical Pipeline Only

Scripts are blind executors, not thinkers.

Script	Responsibility
00_validate_environment.py	sanity checks
01_fetch_sources.py	optional scraping
02_fetch_units.py	fetch logical chunks
03_extract_raw_text.py	strip non-text
04_normalize_text.py	mechanical cleanup
05_split_canonical_units.py	apply declared boundaries
06_assign_uids.py	bind UIDs
07_emit_canonical_json.py	schema output
08_validate_output.py	enforce contracts

Rules:

scripts never decide structure

scripts fail loudly on ambiguity

scripts never edit earlier layers

6. data/ — Layered Text Transformation
6.1 00_index/

Contains structural indices only.

Examples:

adhyāya list

chapter numbering tables

section maps

No text content lives here.

6.2 01_raw/ — Archival Truth

Raw data grouped by source, not file type.

01_raw/
└── <source-id>/
    ├── html/
    ├── txt/
    ├── pdf/
    ├── scans/
    └── provenance.json


Rules:

raw data is never edited

raw data may contain noise

provenance.json is mandatory

6.3 02_extracted/

Parsed text, still dirty.

Examples:

HTML stripped to text

OCR output

paragraph dumps

Still non-canonical.

6.4 03_normalized/

Mechanically cleaned text.

Rules:

no content loss

no interpretation

regeneration allowed

6.5 04_canonical/ — Canonical Emission

Contains source-independent canonical units.

Rules:

one file = one canonical unit

schema-validated

UID-bound

immutable once approved

No witnesses live here.

7. logs/ and reports/
logs/

pipeline execution logs

debug traces

reports/

coverage_report.json

anomaly_report.json

ingestion_summary.md

These are reviewed before merge.

8. Relationship to Other Layers

CIP leaf does not contain:

translations

commentaries

glosses

pedagogical notes

AI outputs

Those live in:

vedic-library-v1.0/data/_raw/


CIP exists only to create canon.

9. Governance Rules

one CIP leaf = one work

one spine per CIP leaf

multiple witnesses allowed

no edition decides canon

ambiguity escalates upward

10. Closing Principle

A CIP leaf is a textual vow.

It promises that:

canon is untouched by convenience

witnesses do not fight

future scholars can trace every decision

CIP_LEAF_STANDARD.md is hereby declared LOCKED.
