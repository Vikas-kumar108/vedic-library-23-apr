CANONICAL INGESTION PROJECT (CIP) ROOT ARCHITECTURE

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies from: Phase-2 onward
Authority: Subordinate only to PROJECT_CONSTITUTION.md

This step locks forever:

why vedic-corpus-ingestion/ exists

how it differs from vedic-library-v1.0/

how deep the tree goes

where Padma-Purāṇa, Manu-Smṛti, Kāma-Sūtra, etc. actually belong

why earlier confusion around _raw was real and not your fault

After this document, there will be no more guessing.

0. Purpose of This Document

This document defines the root-level architecture for all Canonical Ingestion Projects (CIPs).

It answers, definitively:

Why ingestion does not happen inside vedic-library-v1.0/

Why vedic-corpus-ingestion/ exists as a separate workspace

How ingestion folders mirror the canonical corpus

How deep that mirroring goes — and where it MUST stop

This document governs structure, not scripts.

1. Core Principle (Non-Negotiable)

Ingestion is a forge.
The library is a vault.

Therefore:

No ingestion work happens inside the canonical library

No raw, intermediate, or experimental data pollutes the corpus

Canonical data enters the library only after validation and review

2. Two Repositories, Two Roles
2.1 vedic-library-v1.0/ (The Vault)

This repository is:

canonical

authoritative

stable

reader-facing

It contains:

locked canonical units

editorial layers

knowledge layers

UI-ready structure

It does not contain:

scraping logic

intermediate text

normalization artifacts

ingestion experiments

2.2 vedic-corpus-ingestion/ (The Forge)

This repository is:

mechanical

procedural

experimental

disposable (except outputs)

It exists to:

collect raw textual witnesses

normalize mechanically

apply canonical boundaries

emit schema-validated canonical units

Nothing here is authoritative until merged.

3. Root Structure of vedic-corpus-ingestion/

The ingestion workspace MUST mirror the canonical corpus tree only to the depth that affects canonical identity and UID grammar.

3.1 Root Layout
vedic-corpus-ingestion/
├── sruti/
├── smrti/
├── itihasa/
├── purana/
├── agama/
├── vedanga/
├── upaveda/
├── darsana/
└── sampradaya/


These top-level folders MUST exactly match:

vedic-library-v1.0/data/


Vocabulary, spelling, and hierarchy are shared.

4. How Deep the CIP Tree Goes (Critical Rule)

A CIP mirrors the canonical corpus tree down to the level that affects UID grammar and canonical identity — but not below it.

This rule is absolute.

4.1 Examples (Correct)
Manu-Smṛti
vedic-corpus-ingestion/
└── smrti/
    └── dharma-sastra/
        └── dharma-smrtis/
            └── manu/
                └── <cip-leaf>


Why this depth?

manu is the canonical work

deeper divisions (chapters, verses) are handled inside the CIP

Padma-Purāṇa
vedic-corpus-ingestion/
└── purana/
    └── mahapurana/
        └── padma/
            └── <cip-leaf>


Why not khaṇḍa folders here?

khaṇḍas affect canonical structure

but they are internal to the work

they belong inside the CIP, not the root tree

Kāma-Sūtra
vedic-corpus-ingestion/
└── smrti/
    └── kama-sastra/
        └── kama-sutra/
            └── <cip-leaf>

4.2 Examples (Forbidden)

❌ This is not allowed in CIP root:

padma/
└── brahma-khanda/
    └── adhyaya-01/


Because:

adhyāya/khaṇḍa boundaries are applied by scripts

not by folder guessing

5. Definition of a CIP Leaf

A CIP leaf is the smallest unit of ingestion responsibility.

One CIP leaf ingests exactly one canonical work, using one declared canonical spine.

A CIP leaf contains:

scripts

configs

raw data

intermediate data

canonical emission

A CIP leaf never spans multiple works.

6. Standard CIP Leaf Layout (Referenced, Not Redefined)

Each <cip-leaf> MUST conform to:

<cip-leaf>/
├── README.md
├── requirements.txt
├── config/
├── scripts/
├── data/
│   ├── 00_index/
│   ├── 01_raw/
│   ├── 02_extracted/
│   ├── 03_normalized/
│   └── 04_canonical/
├── logs/
└── reports/


Details are governed by:

CIP_LEAF_STANDARD.md

RAW_LAYER_SEMANTICS.md

This document only defines where the leaf lives, not its internals.

7. Relationship to _raw in the Main Library

vedic-library-v1.0/data/_raw/ and
vedic-corpus-ingestion/**/01_raw/
are not the same thing.

Aspect	Ingestion 01_raw/	Library _raw/
Purpose	Canon creation	Editorial & derivative work
Authority	Non-authoritative	Reference only
Contents	Witnesses for canon	Translations, commentaries, scans
Lifetime	Temporary	Long-term
Output	Canonical units	Editorial layers

This separation is intentional and mandatory.

8. Canonical Output Path (Important)

Canonical JSON emitted by a CIP:

vedic-corpus-ingestion/
└── .../<cip-leaf>/data/04_canonical/


After validation and review, these files are merged into:

vedic-library-v1.0/data/
└── <sruti|smrti|itihasa|...>/
    └── <work>/
        └── canonical units


No other data is merged.

9. Governance Rule

No CIP may redefine folder depth

No CIP may introduce new corpus branches

No CIP may guess canonical structure from sources

Any uncertainty → escalate to Core Architecture Chat

10. Closing Principle

The ingestion tree teaches the machine where to work.
The canonical tree teaches humanity what exists.

Confusing the two destroys both.

CANONICAL_INGESTION_PROJECT_ROOT_ARCHITECTURE.md is hereby declared LOCKED.
