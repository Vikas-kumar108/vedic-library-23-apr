REGISTRY AND GOVERNANCE INTEGRATION

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies from: Phase-2 onward
Authority: Subordinate only to the Constitution and Canonical Identity layer

This is where we ensure that nothing canonical ever appears “from nowhere”.

You were right to insist on doing this before real ingestion resumes.

Status

Authority level: Architectural

Scope: All canonical ingestion

Change policy: Versioned only

Depends on:

PROJECT_CONSTITUTION.md

UID_SYSTEM.md

CANONICAL_HANDOFF_AND_VAULTING.md

CIP_ROOT_ARCHITECTURE.md


1. Purpose of This Document

This document defines how canonical ingestion is recorded, governed, and remembered.

It ensures that:

every canonical unit has a traceable origin

every UID has a historical context

no ingestion event is anonymous

no future contributor has to “guess” what happened

This is memory, not mechanics.

2. The Two Registries (Distinct but Coordinated)

Canonical ingestion affects two registries only.

They serve different purposes and must never be merged.

3. UID Registry
3.1 Purpose

The UID Registry is the permanent ledger of canonical identity.

It answers:

Which UIDs exist?

When were they introduced?

To which śāstra do they belong?

Are they active, superseded, or deprecated?

3.2 Properties (Non-Negotiable)

The UID Registry is:

append-only

immutable per entry

never auto-generated

never rewritten

never inferred

Once a UID appears here, it exists forever.

3.3 What Gets Recorded

Each UID entry records:

UID string

corpus

work

canonical unit type

date of acceptance

ingestion reference (CIP ID)

status (active | superseded)

No text content appears here.

3.4 What the UID Registry NEVER Does

It does NOT validate text

It does NOT store canonical files

It does NOT encode meaning

It does NOT track editions

It tracks existence, not content.

4. Pipeline Registry
4.1 Purpose

The Pipeline Registry records how canon came to be.

It answers:

Which ingestion pipeline produced this canon?

Which spine was used?

Which sources were consulted?

Who reviewed and accepted it?

This registry protects institutional memory.

4.2 Properties

The Pipeline Registry is:

human-authored

review-driven

auditable

historical

never implicit

4.3 What Gets Recorded

Each pipeline record includes:

CIP identifier

śāstra name

canonical spine ID

source witnesses used

scripts executed

validation status

reviewer identity

date of acceptance

4.4 What the Pipeline Registry NEVER Does

It does NOT generate UIDs

It does NOT store canonical text

It does NOT alter canon

It does NOT validate structure

It documents process, not product.

5. Relationship Between Registries

The two registries are linked but independent.

UID Registry answers: what exists

Pipeline Registry answers: how it came to exist

A UID must reference a pipeline record.
A pipeline record may reference many UIDs.

6. Governance Rule (Absolute)

No canonical unit may enter the vault unless both registries are updated.

If either registry is missing or incomplete:

the handoff is invalid

the canonical files must not be locked

the ingestion is considered unfinished

7. Human Authority Clause

Registries are:

updated by humans

reviewed by humans

approved by humans

Scripts may assist validation,
but never registration.

8. Conflict Resolution

If a conflict arises between:

a canonical file

a UID registry entry

a pipeline record

Resolution priority is:

PROJECT_CONSTITUTION.md

Canonical Identity principles

UID Registry (existence)

Pipeline Registry (history)

Scripts and convenience never override registries.

9. Longevity Guarantee

These registries are designed so that:

10 years later, ingestion choices are understandable

50 years later, UID origins are traceable

future scholars can audit decisions without guesswork

This is civilizational bookkeeping.

10. Closing Principle

Canonical text is what survives.
Registries are how we remember why.

Both are required for trust.

REGISTRY_AND_GOVERNANCE_INTEGRATION.md is hereby declared LOCKED.
