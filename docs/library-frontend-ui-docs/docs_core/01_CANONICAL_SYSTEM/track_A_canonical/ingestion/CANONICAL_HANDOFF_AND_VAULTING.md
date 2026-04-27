CANONICAL HANDOFF AND VAULTING

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies from: Phase-2 onward
Authority: Subordinate only to the Constitution and Canonical Identity documents

This is where we seal the boundary between “forging canon” and “housing canon.”
Without this document, future contributors will mix CIP output with the canonical vault.

Status

Authority level: Architectural

Scope: All CIP pipelines

Change policy: Requires architectural review

Depends on:

PROJECT_CONSTITUTION.md

CANONICAL_UNIT_DEFINITION.md

UID_SYSTEM.md

CIP_LEAF_STANDARD.md

1. Purpose of This Document

This document defines how and when canonical data exits the Canonical Ingestion Pipeline (CIP) and becomes part of the Vedic Library canonical vault.

It exists to prevent:

canonical drift

edition contamination

accidental overwrites

script-driven authority

long-term archival confusion

2. Two Worlds: Forge vs Vault
2.1 The Forge — vedic-corpus-ingestion/

The CIP environment is a forge.

Its properties:

temporary

experimental

repeatable

discardable

source-aware

revision-friendly

Canonical JSON files produced here are candidates, not canon.

2.2 The Vault — vedic-library-v1.0/data/

The Vedic Library data directory is a vault.

Its properties:

authoritative

immutable once locked

UID-stable

source-independent

human-approved only

Nothing enters the vault automatically.

3. The Handoff Rule (ABSOLUTE)

No script may write directly into vedic-library-v1.0/data/.

Canonical data enters the vault only by explicit human action.

This is non-negotiable.

4. What “04_canonical/” Actually Means

Inside each CIP leaf:

<cip-leaf>/data/04_canonical/


This directory contains:

schema-valid canonical units

bound UIDs

canonical text only

no witnesses

no commentary

no translation

no edition labels

However:

These files are still provisional.

They are not yet canon.

5. Preconditions for Handoff

Before any data may be moved from CIP to the vault, ALL of the following must be true:

✅ Canonical spine is declared and referenced

✅ All scripts pass without warnings

✅ 08_validate_output.py passes cleanly

✅ UID uniqueness verified against registry

✅ Human review completed

✅ No unresolved anomalies remain

✅ Provenance is complete and documented

If any condition fails → handoff is forbidden

6. The Handoff Procedure (Human-Only)

Canonical handoff consists of four explicit steps.

Step 1 — Review

A human reviewer confirms:

correct scope

correct spine

correct unit boundaries

correct UID grammar

schema compliance

Step 2 — Registration

Two registries are updated:

a) UID Registry

new UIDs appended

no modification of existing entries

b) Pipeline Registry

records:

CIP identifier

spine used

source witnesses

validation status

date of acceptance

Step 3 — Transfer

Canonical JSON files are copied, not moved, into:

vedic-library-v1.0/data/
└── <corpus>/
    └── <work>/
        └── canonical units (*.json)


Directory structure is determined only by canonical identity and UID grammar.

Step 4 — Locking

Once placed in the vault:

files are immutable

edits are forbidden

corrections require:

new CIP

new pipeline record

explicit supersession

7. What NEVER Enters the Vault

The following MUST NEVER appear in vedic-library-v1.0/data/:

raw sources

normalized text

extraction artifacts

witness files

variant maps

provenance documents

logs

reports

scripts

The vault contains canon only.

8. Relationship to Witnesses and Variants

Edition differences (e.g., BORI vs Gita Press):

do NOT alter canonical units

do NOT alter UIDs

do NOT alter vault data

They are recorded separately as witness mappings, not canonical replacements.

9. Immutability Principle

Once canonical data is vaulted:

Downstream layers must adapt to canon — never the reverse.

UI, editorial, translation, and knowledge layers are all subordinate.

10. Failure Mode Protection

If a future contributor:

bypasses CIP

edits vault files directly

regenerates canon from witnesses

alters canonical text in place

This constitutes a constitutional breach.

11. Closing Principle

CIP creates candidates.
Humans declare canon.
The vault remembers forever.

CANONICAL_HANDOFF_AND_VAULTING.md is hereby declared LOCKED.
