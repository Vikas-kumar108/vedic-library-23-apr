CANONICAL SPINE DECLARATION

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies to: All canonical texts and all ingestion pipelines
Authority: Subordinate only to PROJECT_CONSTITUTION.md

0. Purpose of This Document

This document formally defines the concept of a Canonical Spine and establishes the mechanism by which a spine is declared, recorded, and governed.

It answers the question:

What is the authoritative structural backbone to which canonical identity binds?

This document does not:

choose a specific edition for any śāstra

define textual correctness

resolve scholarly disputes

encode meaning or interpretation

It defines structural authority, not textual preference.

1. Definition of a Canonical Spine

A Canonical Spine is the minimal, stable, traditional structural framework of a śāstra used to:

derive canonical UIDs

anchor canonical units

ensure long-term address stability

allow variant editions to map coherently

A spine consists of:

hierarchical unit types (e.g. parva → adhyāya → verse)

numerical ordering within those units

depth sufficient to uniquely locate canonical units

A spine is structural, not semantic.

2. Properties of a Canonical Spine (Normative)

A valid canonical spine MUST be:

Numerically stable across traditions

Traditionally grounded

Edition-independent

Minimal (no unnecessary subdivisions)

Explicitly declared

Immutable once activated

A spine MUST NOT:

encode editorial groupings

encode sub-parvas or alternate names

encode manuscript families

encode philosophical meaning

change silently over time

3. Canonical Spine vs Edition Structure
Aspect	Canonical Spine	Edition Structure
Authority	Project-declared	Source-dependent
Stability	Immutable	Variable
Purpose	Identity & UID	Presentation
Changes	Supersession only	Arbitrary
Encoded in UID	✅ Yes	❌ No

Editions map to the spine.
The spine never maps to editions.

4. Spine Declaration (Formal Act)

A canonical spine exists only after explicit declaration.

4.1 Declaration Requirements

Each spine declaration MUST specify:

the work

the hierarchical depth

the numerical basis

the justification for stability

the declaration authority

the declaration date

the status

4.2 Declaration Record (Machine-Readable)

Each declared spine MUST be recorded as a JSON document.

Example (illustrative only)
{
  "work": "Mahabharata",
  "spine_id": "mbh.spine.v1",
  "hierarchy": [
    "parva",
    "adhyaya",
    "verse"
  ],
  "numerical_basis": "traditional adhyaya numbering",
  "justification": "Most stable cross-edition structural layer",
  "declared_by": "Vedic Library Project",
  "declared_on": "YYYY-MM-DD",
  "status": "active"
}


This record:

does not choose an edition

does not include text

does not include variant labels

5. Spine Identity and Versioning

Each spine has:

a unique spine_id

a version (v1, v2, etc.)

5.1 Immutability Rule

Once a spine is active:

it MUST NOT be modified

errors are handled via supersession, not mutation

5.2 Supersession Rule

If a spine must be replaced:

a new spine is declared

the old spine is marked superseded

UIDs derived from the old spine remain valid forever

No spine deletion is permitted.

6. Relationship to UID System

UIDs are derived only from the canonical spine

UID grammar assumes a declared spine

UID stability depends on spine immutability

If a spine is unclear, UID assignment MUST STOP.

7. Role in Canonical Ingestion (CIP)

Every Canonical Ingestion Project MUST:

reference exactly one declared spine

record the spine in the CIP README

refuse ingestion if the spine is missing or ambiguous

Scripts:

apply the spine mechanically

never infer structure

never correct the spine

8. Relationship to Structural Variants

This document works in conjunction with:

STRUCTURAL_VARIANTS_POLICY.md

WITNESS_AND_VARIANT_MODEL.md

Structural variants:

map to the spine

never redefine the spine

never affect canonical identity

9. Governance & Authority

Spine declaration is an architectural act, not an ingestion act.

It requires:

constitutional alignment

architectural review

explicit documentation

No CIP may declare a spine.

10. Closing Principle

Texts evolve.
Editions differ.
Traditions speak in many voices.

The spine exists so that identity remains calm when everything else moves.

CANONICAL_SPINE_DECLARATION.md is hereby declared LOCKED.
