WITNESS AND VARIANT MODEL

Vedic Library Project

Status: ARCHITECTURAL — LOCKED
Applies to: All canonical texts, editions, and ingestion pipelines
Authority: Subordinate only to PROJECT_CONSTITUTION.md and CANONICAL_SPINE_DECLARATION.md

(This is where editions, recensions, and naming differences are finally tamed)

This step is load-bearing. Once locked, you will never again panic about:

Gita Press vs BORI

Northern vs Southern Mahābhārata

Purāṇa khaṇḍa naming differences

Sub-parva disagreements

Verse inclusion/exclusion debates

All of that pressure is absorbed here, not in canon.

0. Purpose of This Document

This document defines how multiple editions, recensions, and structural variants of a śāstra coexist within the Vedic Library without altering canonical identity.

It answers the question:

How can different textual witnesses be preserved and respected without fragmenting canon or breaking UIDs?

This document does not:

decide which edition is “correct”

merge or harmonize variants

alter canonical text

redefine canonical structure

It defines coexistence rules, not textual resolution.

1. Core Principle (Non-Negotiable)

Canonical identity is singular.
Textual witnesses are plural.

Canonical identity:

is derived from the declared canonical spine

is UID-anchored

is immutable

Textual witnesses:

may vary

may disagree

may contradict each other

may be incomplete or expanded

Witnesses attach to canon.
Canon never bends to witnesses.

2. Definition of a Witness

A Witness is a concrete manifestation of a text, such as:

a printed edition (e.g., Gita Press)

a critical edition (e.g., BORI)

a manuscript family

a regional recension

a digital source (WisdomLib, GRETIL, etc.)

A witness is evidence, not authority.

3. Witness vs Canon (Formal Separation)
Aspect	Canonical Unit	Witness
Authority	Structural identity	Textual evidence
UID	Required	Never defines UID
Stability	Immutable	Variable
Purpose	Addressing & identity	Preservation & comparison
Phase	Phase-2	Phase-2+

A witness may:

omit a verse

add verses

rename sections

reorder internally

split or merge verses

None of these alter canonical identity.

4. Witness Identity

Each witness MUST have:

a unique witness_id

declared provenance

edition metadata

scope of coverage

4.1 Witness Record (Machine-Readable)
{
  "witness_id": "mbh.gita-press.1966",
  "work": "Mahabharata",
  "edition": "Gita Press Gorakhpur",
  "year": 1966,
  "language": "Sanskrit",
  "script": "Devanagari",
  "scope": "complete",
  "notes": "Traditional North Indian recension"
}


This record:

does NOT imply correctness

does NOT affect canon

exists for traceability

5. Witness Attachment to Canon

Witnesses attach to canonical units via mapping, not replacement.

5.1 Witness Mapping File

Each witness may provide a mapping file:

{
  "canonical_uid": "mbh.adi.1.23",
  "witness_id": "mbh.gita-press.1966",
  "status": "present",
  "witness_ref": "page_12_line_3",
  "variant_notes": null
}


Possible status values:

present

absent

variant

expanded

condensed

disputed

6. Structural Variants (Names, Sub-Parvas, Labels)

Structural elements such as:

sub-parvas

alternate parva names

chapter titles

regional labels

are treated as structural metadata, not canonical identity.

6.1 Rule (Strict)

Names do not define identity.
Numbers do.

Therefore:

alternate names are stored as metadata

canonical UID remains unchanged

multiple labels may coexist

Example:

{
  "canonical_uid": "mbh.adi.1",
  "labels": [
    "Ādi Parva",
    "Paushya Parva",
    "Anukramanika"
  ],
  "source": "various traditions"
}

7. Variants in Verse Content

If witnesses disagree on verse content:

canon records one canonical slot

witnesses record their textual reality

absence or addition is explicitly marked

Canonical unit does not disappear because a witness omits it.

8. Witnesses and Canonical Text

Canonical text:

is minimal

is conservative

is declared once

Witness text:

may be stored separately

may include expansions

may include omissions

may include orthographic differences

Witness text MUST NEVER overwrite canonical text.

9. Role in Canonical Ingestion Projects (CIP)

CIPs:

ingest raw material from witnesses

normalize mechanically

map output to canonical units

record disagreements explicitly

CIPs MUST NOT:

resolve variant disputes

prefer one witness silently

invent harmonizations

If witness disagreement is detected:

canonical unit is still emitted

witness metadata records discrepancy

10. Relationship to Other Documents

This model depends on:

PROJECT_CONSTITUTION.md

CANONICAL_SPINE_DECLARATION.md

STRUCTURAL_VARIANTS_POLICY.md

This model supports:

RAW_TO_CANONICAL_MAPPING_POLICY.md

CANONICAL_INGESTION_PROJECT_STANDARD.md

future critical apparatus layers

If conflict arises:
Canonical identity principles prevail.

11. Long-Term Implication (Important)

This model allows the Vedic Library to:

preserve plurality without chaos

respect traditions without fragmentation

support scholarship without adjudication

remain stable for decades

No edition ever “wins”.
No tradition is erased.
No identity is lost.

12. Closing Principle

The canon is the address.
Witnesses are the voices.

A library that confuses the two becomes a battlefield.
This model exists so the Vedic Library never does.

WITNESS_AND_VARIANT_MODEL.md is hereby declared LOCKED.
