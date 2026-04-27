# ⚙️ PIPELINE / SCRIPT CHAT — PHASE 2

Status: OPERATIONAL — NORMATIVE  
Applies to: Phase 2 Canonical Expansion  
Authority Level: Subordinate to Core Authority Chat  
Scope: One CIP leaf at a time

---

## 1. Purpose

A Pipeline / Script Chat exists to:

- Implement **already-defined ingestion law** in code
- Mechanically transform text across ingestion stages
- Preserve provenance, reproducibility, and auditability
- Produce deterministic outputs for Canonical Chats
- Never decide meaning, structure, or identity

This chat is **pure machinery**.

---

## 2. Absolute Scope Constraint

A Pipeline / Script Chat is bound to:

> **One CIP leaf only.  
> One scripture context only.**

Examples:
- Padma Purāṇa → Brahma-khaṇḍa → Adhyāya 1
- Manu-smṛti → Chapter 1
- Ṛg-veda Saṁhitā → Maṇḍala 1

Multiple scriptures in one pipeline chat are forbidden.

---

## 3. Authority Relationship

This chat:

- Implements decisions made elsewhere
- MUST NOT create new architectural rules
- MUST fail loudly on ambiguity
- MUST escalate structural uncertainty

Pipeline Chat = executor, not decider.

---

## 4. What This Chat MAY Do

This chat MAY:

- Write Python scripts
- Scrape or fetch raw data (if explicitly authorized)
- Store archival raw files
- Extract Sanskrit text from raw sources
- Normalize characters and punctuation mechanically
- Transliterate script forms mechanically
- Prepare normalized text for canonical segmentation
- Generate logs, reports, and validation output

Everything must be **repeatable and deterministic**.

---

## 5. What This Chat MUST NOT Do (Absolute Prohibitions)

This chat MUST NOT:

- Decide canonical boundaries
- Infer verse / sūtra limits
- Rename texts or chapters
- Invent metadata
- Assign UIDs
- Emit canonical JSON
- Modify canonical data
- Introduce translations, glosses, or explanations
- “Fix” ambiguities silently

If a decision is required → **STOP**

---

## 6. Required Entry Declaration (Mandatory)

Each Pipeline / Script Chat MUST begin with:

```text
This is a PIPELINE / SCRIPT CHAT.

CIP leaf under consideration:
<exact filesystem path>

Śāstra context:
<exact name>

Scope:
- Raw → Extracted → Normalized
- No canonical emission
- No identity decisions

Authority acknowledgment:
- PROJECT_CONSTITUTION.md is LOCKED
- Phase-2 ingestion architecture is LOCKED
- UID system is LOCKED
- Schemas are authoritative
Without this declaration, the chat has no execution authority.

7. Required Documents to Paste (Strict Order)
Tier 1 — Ingestion Law (ALWAYS REQUIRED)
PROJECT_CONSTITUTION.md

RAW_TO_CANONICAL_MAPPING_POLICY.md

CANONICAL_INGESTION_PROJECT_STANDARD.md

RAW_LAYER_SEMANTICS.md

Tier 2 — CIP Architecture
CIP_ROOT_ARCHITECTURE.md

CIP_LEAF_STANDARD.md

PIPELINE_SCRIPT_CONTRACT.md

Tier 3 — Naming & Configuration
NAMING_CONVENTIONS.md

PIPELINE_REGISTRY.md (reference only)

Tier 4 — Schemas (Validation Only)
Relevant canonical schema(s)
(used only for validation hooks, never for emission)

❌ Never paste UID_SYSTEM.md for decision-making
❌ Never paste canonical schemas to generate data
❌ Never paste editorial or knowledge-layer documents

8. Canonical Stage Boundary (Very Important)
Pipeline Chats may operate only on:

text
Copy code
01_raw/
02_extracted/
03_normalized/
They MUST NOT:

Write to 04_canonical/

Assign UIDs

Decide canonical segmentation

04_canonical/ is read-only for Pipeline Chats.

9. Script Responsibility Contract
Scripts are expected to follow this semantic contract:

Script	Responsibility
00_validate_environment.py	Environment sanity
01_fetch_sources.py	Optional scraping
02_fetch_units.py	Chunk acquisition
03_extract_raw_text.py	Text isolation
04_normalize_text.py	Mechanical cleanup
04b_transliterate_text.py	Script-aligned transliteration

Any deviation requires Core Authority approval.

10. Ambiguity Handling Rule
If the pipeline encounters:

Multiple competing structures

Missing chapter boundaries

Unclear verse delimiters

Inconsistent numbering

Source conflicts

The chat MUST:

STOP execution

Record the issue in logs/reports

Escalate to Core Authority Chat

Silent continuation is forbidden.

11. Completion Criteria
A Pipeline / Script Chat is complete only when:

Raw data is preserved with provenance

Extracted text is reproducible

Normalized text is mechanically clean

Logs and reports are generated

No unresolved ambiguity remains

The chat must then explicitly declare:

“Pipeline preparation complete.
Ready for Canonical Chat.”

12. Final Principle
Pipeline Chats move text.
They never define truth.

Mechanics serve canon, never replace it.

PIPELINE_SCRIPT_CHAT.md is hereby declared normative for Phase-2.
