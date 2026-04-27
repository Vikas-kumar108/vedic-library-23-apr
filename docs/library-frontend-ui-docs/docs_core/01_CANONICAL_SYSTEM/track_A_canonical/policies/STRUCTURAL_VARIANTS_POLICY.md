STRUCTURAL VARIANTS POLICY

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies to: All canonical texts, all editions, all phases
Supersedes: Implicit assumptions about structure
Authority: Subordinate only to PROJECT_CONSTITUTION.md

0. Purpose of This Document

This document defines how the Vedic Library handles structural variation across editions, recensions, and traditions without fragmenting canonical identity.

It answers one core question:

How can multiple legitimate textual traditions coexist without breaking UID stability?

This policy does not define:

textual meaning

philosophical interpretation

editorial preference

scholarly correctness

It defines structural law only.

1. Core Principle (Non-Negotiable)

Canonical identity binds to the most stable traditional numerical spine.

All canonical identity decisions flow from this principle.

Therefore:

Canonical identity is numerical and positional

Canonical identity is edition-independent

Canonical identity is immutable once declared

2. What Counts as Structural Variation

The following are recognized as structural variants, not identity changes:

Alternate names of parvas, sub-parvas, khaṇḍas

Presence or absence of sub-parvas

Regional chapter naming traditions

Editorial regroupings

Chapter boundary disagreements

Verse grouping differences across editions

These variations do not affect UID.

3. Canonical Spine (Authoritative Structure)
3.1 Definition

A Canonical Spine is the declared structural backbone of a śāstra consisting of:

Primary hierarchical units (e.g. parva → adhyāya → verse)

Stable numbering used for UID derivation

Chosen for maximal cross-tradition stability

3.2 Authority

A canonical spine:

Is explicitly declared

Is documented

Is reviewable

Is never inferred from a website or edition UI

Once declared, a spine:

Cannot be modified

Can only be superseded with a new spine declaration

4. Sub-Parvas and Variant Labels
4.1 Policy

Sub-parvas, alternate structural names, and editorial divisions are:

❌ Not part of canonical identity

❌ Not encoded in UID

❌ Not used for canonical segmentation

They are treated as structural metadata only.

4.2 Storage Location

Such data may live in:

structural_labels.json

variant_map.json

witness metadata

They must never appear in canonical JSON files.

5. Editions and Witnesses
5.1 Witness Definition

A witness is a concrete textual source, such as:

Gita Press edition

BORI critical edition

Southern recension

Manuscript family

Witnesses:

Attach to canonical units

Never redefine canonical units

Never alter UID

5.2 Mapping Rule

Witnesses are mapped onto the canonical spine.

If a witness:

merges verses → canonical units remain separate

splits verses → canonical unit remains one

renames chapters → UID unchanged

6. UID Protection Rule

UIDs:

Encode spine position only

Never encode editorial structure

Never encode sub-parvas

Never encode edition identity

Example:

mbh.adi.1.23


remains stable even if:

the chapter is named differently

sub-parva names vary

verse grouping differs

7. Human Responsibility Clause

All decisions regarding:

spine selection

hierarchy depth

numbering authority

are explicitly human responsibilities.

AI systems:

MAY assist in comparison

MUST NOT infer canonical structure

MUST NOT choose between variants

8. Conflict Resolution Order

When structural conflicts arise, resolution follows:

Traditional numerical stability

Cross-edition consensus

Conservative minimality

Future reversibility

UI convenience is never a deciding factor.

9. Relationship to Other Documents

This policy is referenced by:

UID_SYSTEM.md

CANONICAL_INGESTION_PROJECT_STANDARD.md

CANONICAL_SPINE_DECLARATION.md

Mahābhārata and Purāṇa ingestion READMEs

In case of conflict:

PROJECT_CONSTITUTION.md prevails

10. Closing Principle

Structural variation is a fact of tradition.
Canonical identity is a discipline of restraint.

This policy exists so that:

traditions may differ

editions may disagree

scholarship may evolve

without ever breaking the address of the text itself.

STRUCTURAL_VARIANTS_POLICY.md is hereby declared LOCKED.
