📄 docs/spines/padma-purana.spine.md

Version: 1.0.0
Status: DRAFT — AWAITING LOCK
Authority Level: Canonical Spine (binding once locked)

1. Text Identification

Text Name: Padma Purāṇa

Corpus: Purāṇa

Classification: Mahāpurāṇa

Scope of This Spine: Entire Padma Purāṇa (all khaṇḍas)

This spine governs all canonical ingestion, UID assignment, and structural identity for the Padma Purāṇa within the Vedic Library.

2. Why a Canonical Spine Is Required

The Padma Purāṇa exists in:

Multiple manuscript traditions

Multiple printed editions

Digitized sources with differing internal structures

Observed variances include:

Differences in khaṇḍa ordering

Differences in khaṇḍa naming conventions

Differences in adhyāya counts per khaṇḍa

Differences in verse counts per adhyāya

Because of this, canonical identity cannot be inferred from any single source.

A Canonical Spine is therefore required to:

Anchor UID grammar

Allow deterministic ingestion

Prevent edition drift

Preserve long-term stability

3. Spine Basis (Authoritative for Numbering Only)

Spine Basis Chosen:

Traditional khaṇḍa → adhyāya → verse sequence
as represented in widely circulated Sanskrit editions
and reflected consistently across major modern repositories.

Important clarifications:

This is not an endorsement of any specific publisher or edition

This spine does not assert textual superiority

The spine exists only to fix ordering and numbering

4. Declared Structural Levels (UID Grammar)

The only structural levels that participate in canonical identity are:

khanda → adhyaya → verse


Accordingly:

Every canonical verse UID for Padma Purāṇa encodes:

khaṇḍa number

adhyāya number

verse number

No other structural markers are permitted in UID identity

Example (illustrative only):

padma.1.1.1

5. Khaṇḍa Handling (Critical Section)

For the purposes of canonical identity:

Khaṇḍas are treated as ordered numeric units

Khaṇḍa names are labels, not identity

Khaṇḍa order is frozen once declared

Canonical identity uses:

khanda = 1, 2, 3, ...


Regardless of:

Alternate naming

Synonym usage

Editorial rearrangement

6. Explicit Exclusions from Canonical Identity

The following are explicitly excluded from canonical identity and UID construction:

Khaṇḍa names (e.g., Sṛṣṭi-khaṇḍa, Bhūmi-khaṇḍa, etc.)

Chapter titles

Section headers

Editorial subdivisions

Thematic groupings

Manuscript family labels

Publisher or digitization source

These elements may appear only in:

Editorial metadata

Witness records

Documentation layers

They MUST NEVER affect UID identity.

7. Variance Acknowledgement (Non-Exhaustive)

It is acknowledged that:

Different traditions enumerate khaṇḍas differently

Some editions merge or split adhyāyas

Verse counts may vary across witnesses

Ordering may differ in non-critical editions

These variances are handled via:

Witness metadata

Edition comparison layers

Structural variance documentation

They do not affect canonical identity.

8. Relationship to Witnesses and Editions

Canonical identity (this spine):

Declares one fixed structural order

Editions and manuscripts:

Are treated as witnesses to that structure

May include omissions, additions, or divergences

Are never allowed to redefine UID identity

Witness data is recorded separately and never merged into canonical units.

9. Lock & Change Policy

Once this spine is:

Reviewed

Confirmed

Marked LOCKED

Then:

All Padma Purāṇa ingestion MUST conform to it

All UIDs are permanently bound to it

No mid-stream changes are permitted

Any future change requires:

A new spine version

A formal migration document

Explicit constitutional review

10. Final Principle

The Canonical Spine chooses order, not authority.
Truth may have witnesses; identity has only one spine.
