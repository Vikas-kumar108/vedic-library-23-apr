📘 Phase-2 Ingestion README

Vedic Library Project

Phase: 2 — Canonical Ingestion
Status: AUTHORITATIVE GUIDE (non-constitutional)
Audience: Human operators, reviewers, future maintainers
Change policy: Clarificatory edits only (no new rules)

1. What Phase-2 Is

Phase-2 is the canonical ingestion phase of the Vedic Library Project.

Its sole responsibility is to:

Convert traditional śāstra into canonically valid, immutable, position-preserving units, without interpretation.

Phase-2 does not:

translate

explain

comment

teach

interpret

normalize meaning

reconcile philosophy

It preserves identity, not understanding.

2. What Phase-2 Produces (and What It Never Produces)
Phase-2 PRODUCES

Canonical units (verse / sūtra / mantra / ritual unit)

Canonical UIDs

Canonical Devanāgarī text

Canonical-aligned transliteration (IAST)

Provenance-tracked ingestion history

Registry entries (UID + pipeline)

Phase-2 NEVER PRODUCES

Translations

Commentaries

Synonyms

Concepts

Entities

Skills

Guidance

UI renderables

If a file feels informative, it does not belong to Phase-2.

3. Authority Stack (Read This Once, Remember Forever)

When conflicts arise, authority flows downward only:

PROJECT_CONSTITUTION.md

Canonical Identity & UID documents

Canonical unit schemas

Phase-2 ingestion architecture

CIP scripts

Convenience, tooling, speed (lowest)

Scripts never outrank documents.
Websites never outrank tradition.
AI never outranks human judgment.

4. The Canonical Spine Principle

Every śāstra ingested in Phase-2 MUST have:

a declared canonical spine

based on the most stable numerical structure

declared explicitly, never inferred

Canonical spine rules are defined in:

CANONICAL_SPINE_DECLARATION.md

STRUCTURAL_VARIANTS_POLICY.md

Key consequences

Alternate chapter names are editorial metadata

Sub-parvas do not affect UID grammar

Editions map to the spine — they never redefine it

5. Structural Variants & Editions (How We Avoid Chaos)

Differences between editions (e.g. BORI vs Gita Press):

do not create new UIDs

do not change canonical identity

do not fragment canon

Instead, they are handled through:

witnesses

variant mappings

structural labels

Defined in:

WITNESS_AND_VARIANT_MODEL.md

Canonical text remains source-independent.
Edition differences remain traceable, not authoritative.

6. The CIP System (How Ingestion Is Organized)

Canonical ingestion happens outside the main library, in a controlled forge:

vedic-corpus-ingestion/


This separation ensures:

canonical vault is never polluted

ingestion can fail safely

experimentation never touches canon

Core rule

CIP mirrors the canonical corpus tree only down to UID-relevant depth.

Defined in:

CIP_ROOT_ARCHITECTURE.md

7. The CIP Leaf (Unit of Work)

Each ingestion unit (one scripture or one canonical subdivision) is a CIP leaf.

Every CIP leaf follows the same standard:

<cip-leaf>/
├── README.md
├── requirements.txt
├── config/
│   ├── sources.yaml
│   ├── selectors.yaml
│   └── normalization.yaml
├── data/
│   ├── 00_index/
│   ├── 01_raw/
│   ├── 02_extracted/
│   ├── 03_normalized/
│   └── 04_canonical/
├── logs/
└── reports/


This is locked by:

CIP_LEAF_STANDARD.md

8. Raw Data Is Sacred (But Not Canon)

The raw layer is archival truth, not authority.

Rules for raw data:

grouped by source, not by file type

provenance is mandatory

nothing is silently “cleaned”

Defined in:

RAW_LAYER_SEMANTICS.md

Example:

01_raw/
└── wisdomlib/
    ├── html/
    ├── txt/
    ├── scans/
    └── provenance.json


Translations and commentaries never live in CIP.

9. Script Discipline (Machinery, Not Judgment)

Scripts implement decisions — they never make them.

Each script has a single responsibility, defined in:

PIPELINE_SCRIPT_CONTRACT.md

Key principle:

If a script needs to decide something, it must fail.

Human escalation is not a weakness.
It is the design.

10. Canonical Handoff (Forge → Vault)

Canonical output from CIP is temporary until approved.

Flow:

vedic-corpus-ingestion/.../04_canonical/
        ↓ review & validation
vedic-library-v1.0/data/
        ↓ locked forever


This process is governed by:

CANONICAL_HANDOFF_AND_VAULTING.md

Once inside the vault:

files never change

corrections require new versions

history is preserved

11. Registries (Memory of the Project)

Nothing canonical exists without being remembered.

Two registries are mandatory:

UID Registry

records existence of canonical units

append-only

eternal

Pipeline Registry

records how canon was produced

sources, spine, scripts, reviewers

historical accountability

Governed by:

REGISTRY_AND_GOVERNANCE_INTEGRATION.md

If either registry is missing → ingestion is invalid.

12. What Happens After Phase-2

Only after Phase-2 completion may the project proceed to:

editorial layers (translation, commentary)

knowledge layers (concepts, entities)

pedagogy

UI & navigation

community features

All later layers:

attach to canonical UIDs

never redefine identity

never rewrite canon

13. Mental Model (Carry This With You)

Canon is position, not prose

UID is address, not meaning

Editions are witnesses, not judges

Scripts are servants, not thinkers

Silence is better than guessing

If you ever feel:

“I need to decide something here”

You are in the wrong layer.

14. Final Orientation

Phase-2 is not about speed.
It is about trustworthiness under time.

When Phase-2 is done correctly:

future work becomes easier

disagreements become manageable

AI remains useful but harmless

the śāstra remains dignified

Phase-2 Ingestion README is complete.
