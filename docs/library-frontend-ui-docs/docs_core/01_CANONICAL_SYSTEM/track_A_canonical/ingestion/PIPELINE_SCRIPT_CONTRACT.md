PIPELINE SCRIPT CONTRACT

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies from: Phase-2 onward
Authority: Subordinate only to PROJECT_CONSTITUTION.md,
CIP_LEAF_STANDARD.md, and RAW_LAYER_SEMANTICS.md

This step locks what each script is allowed to do, and what it is forbidden to do.
Once written, no future contributor can say:

“I just added a little logic here…”

1. Purpose of This Contract

This document defines the role, limits, and responsibilities of every script used in Canonical Ingestion Pipelines (CIP).

It exists to ensure that:

scripts remain mechanical

decisions remain human

canonical identity remains uncontaminated

pipelines remain auditable and repeatable

Scripts are workers, not deciders.

2. Global Rules (Apply to ALL Scripts)

The following rules apply to every script, without exception.

2.1 Scripts Are Non-Authoritative

Scripts MUST NOT:

decide canonical boundaries

infer structure

rename chapters

choose between variants

invent missing content

“fix” unclear text

resolve ambiguity silently

If a decision is required → the script MUST FAIL.

2.2 Scripts Are Deterministic

Given the same input:

output MUST be identical

ordering MUST be stable

randomness is forbidden

No script may depend on:

time of day

network state (except fetch scripts)

environment quirks

2.3 Scripts Are Idempotent

Running a script twice must:

not corrupt data

not duplicate output

not mutate prior stages

If re-running changes output → the script is invalid.

2.4 Scripts Never Edit Upstream Layers

A script may:

read from previous stages

write only to its own stage

A script may NEVER:

modify 01_raw/

modify outputs of later stages

bypass stages

3. Script Numbering Semantics

Script numbers are semantic, not cosmetic.

Lower numbers represent earlier epistemic stages.

Skipping numbers or reordering scripts is forbidden.

4. Script-by-Script Responsibility Matrix
00_validate_environment.py

Purpose

Verify Python version

Verify required libraries

Verify directory structure

Verify schema availability

MUST

Fail fast if environment is invalid

MUST NOT

Touch data

Fetch sources

01_fetch_sources.py (Optional)

Purpose

Fetch raw source material

Download files verbatim

MUST

Write ONLY to 01_raw/<source-id>/

Create or update provenance.json

MUST NOT

Parse content

Strip markup

Decide scope

02_fetch_units.py

Purpose

Fetch logically grouped raw chunks
(e.g., one adhyāya per file)

MUST

Follow human-declared scope

Preserve rawness

MUST NOT

Infer missing units

Rename units

Assume completeness

03_extract_raw_text.py

Purpose

Strip non-textual noise
(HTML tags, page numbers, headers)

MUST

Preserve textual order

Preserve line breaks where possible

MUST NOT

Normalize spelling

Fix OCR errors

Change script

04_normalize_text.py

Purpose

Mechanical normalization only

Examples:

Unicode normalization

danda standardization

whitespace cleanup

MUST

Be fully reversible in principle

MUST NOT

Correct grammar

Resolve variants

Harmonize editions

05_split_canonical_units.py

Purpose

Apply pre-declared canonical boundaries

MUST

Follow canonical spine

Follow human-specified rules

MUST NOT

Invent boundaries

Merge or split units for convenience

If boundaries are unclear → FAIL

06_assign_uids.py

Purpose

Bind canonical units to UIDs

MUST

Use UID_SYSTEM.md rules

Validate uniqueness

MUST NOT

Encode meaning

Encode source identity

Change existing UIDs

07_emit_canonical_json.py

Purpose

Emit schema-compliant canonical JSON

MUST

Declare schema name + version

Emit one file per canonical unit

MUST NOT

Embed commentary

Embed translation

Embed provenance text

08_validate_output.py

Purpose

Validate canonical output

Checks:

Schema validation

UID uniqueness

Required fields present

No forbidden fields

MUST

Fail loudly on error

MUST NOT

Auto-correct output

5. Logging Rules

Each script MUST:

write logs to /logs/

include timestamps

include script version hash

Logs are:

append-only

never canonical

never edited

6. Reports

Scripts MAY generate reports in /reports/, including:

anomaly reports

coverage reports

validation summaries

Reports are diagnostic only.

They never affect canonical output.

7. Relationship to Canonical Authority

Scripts are subordinate to:

PROJECT_CONSTITUTION.md

Canonical spine declarations

Canonical unit definitions

UID_SYSTEM.md

If a script conflicts with any of the above,
the script is wrong.

8. Failure Is Success

A pipeline that fails loudly is healthy.

A pipeline that “works anyway” is dangerous.

9. Closing Principle

Scripts do not know what a text means.
Scripts do not know what a text is.

Scripts only know what they are allowed to touch.

PIPELINE_SCRIPT_CONTRACT.md is hereby declared LOCKED.
