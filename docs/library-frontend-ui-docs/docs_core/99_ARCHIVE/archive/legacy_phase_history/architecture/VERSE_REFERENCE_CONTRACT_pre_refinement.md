This document is extremely important: it is the glue that safely connects all higher knowledge layers to the canonical corpus, without ever corrupting it.

I’ve written it slowly, with examples, rules, and reasons — so that ten years later, it will still protect you from confusion.

🔗 Verse Reference Contract
Vedic Library Project
0. Purpose of This Document

This document defines the Verse Reference Contract for the Vedic Library.

It answers:

How does anything refer to a canonical verse?

What is allowed to reference a verse?

What is forbidden?

How do we reference parts of verses?

How do we reference groups of verses?

How do we remain consistent across all śāstra?

This contract is binding across:

data schemas

pipelines

frontend

knowledge layers

future contributors

1. Core Principle (Non-Negotiable)

Canonical verses are never embedded — only referenced.

Everything outside the Canonical Layer must point to a verse, never copy it.

This preserves:

textual integrity

auditability

long-term trust

2. What Is a “Verse” in This Contract?

A verse means a canonical unit, as defined in:

CANONICAL_UNIT_DEFINITION.md

Depending on the śāstra, a “verse” may be:

śloka (Bhagavad-gītā)

sūtra (Yoga-sūtra)

mantra (Ṛg-veda)

prose unit (Brāhmaṇa, Arthaśāstra)

The contract does not care about form — only canonical identity.

3. The Canonical Reference Key: ref
3.1 Mandatory Field

All non-canonical objects that refer to canon MUST include:

"ref": "bg.2.13"


Where:

ref = canonical UID

UID syntax is governed by UID_SYSTEM.md

No exceptions.

4. Single-Verse Reference (Most Common)
Example: Translation
{
  "type": "translation",
  "language": "en",
  "ref": "bg.2.13",
  "text": "As the embodied soul continuously passes..."
}

Example: Commentary
{
  "type": "commentary",
  "author": "A.C. Bhaktivedanta Swami Prabhupāda",
  "ref": "bg.2.13",
  "text": "In this verse the Lord explains..."
}

5. Multi-Verse Reference (Ranges)

Some units naturally span verses.

5.1 Range Reference
"ref": {
  "start": "bg.2.12",
  "end": "bg.2.16"
}


Rules:

Start and end must belong to same work

Order must be canonical

No skipping ambiguity

5.2 Explicit List Reference
"ref": [
  "bg.2.11",
  "bg.2.12",
  "bg.2.13"
]


Used when:

verses are non-contiguous

thematic grouping is intentional

6. Partial Verse Reference (Important)

Sometimes meaning refers to part of a verse.

6.1 Allowed: Structural Sub-Reference
"ref": {
  "uid": "bg.2.13",
  "segment": "pada-2"
}


Segments may be:

pāda (quarter)

sentence

mantra line

⚠️ Segment identifiers are local, not canonical.

6.2 Forbidden

❌ Quoting raw Sanskrit text as identifier
❌ Line numbers inside text
❌ Free-form offsets

Canonical segmentation never changes.

7. Commentary Introductions & Conclusions

You asked this explicitly — this is crucial.

Problem

Many commentaries include:

an introductory paragraph before the verse

a concluding reflection after several verses

These are not verse content.

7.1 Correct Handling

Such material is stored as editorial units, not verse units.

{
  "type": "commentary-introduction",
  "author": "Śaṅkara",
  "ref": "bg.2.1",
  "scope": "pre-verse",
  "text": "Before explaining the verse..."
}


Or:

{
  "type": "commentary-conclusion",
  "author": "Śaṅkara",
  "ref": {
    "start": "bg.2.1",
    "end": "bg.2.10"
  },
  "scope": "post-section",
  "text": "Thus the teaching is summarized..."
}


✔ Canon preserved
✔ Commentary preserved
✔ No contamination

8. Titles, Headings, Section Names

Headings such as:

“Arjuna’s Lament”

“Kṣetra-kṣetrajña-vibhāga”

Rule

They are editorial metadata, not canonical text.

{
  "type": "section-title",
  "ref": {
    "start": "bg.2.1",
    "end": "bg.2.10"
  },
  "title": "The Nature of the Soul"
}

9. Cross-Śāstra References

A unit may reference multiple śāstra.

Example:

"ref": [
  "bg.2.13",
  "sb.11.22.8",
  "katha.up.2.18"
]


Rules:

Each UID must be valid

No assumption of equivalence

Relationship must be explained elsewhere

10. Knowledge-Layer Awareness

Which layers may reference canon?

Layer	May reference canon?
Semantic	✅
Interpretive	✅
Pedagogical	✅
Community	✅
Canonical	❌ (self-contained)
11. What This Contract Forbids (Critical)

❌ Copying Sanskrit text into non-canonical files
❌ Embedding verse text inside commentary JSON
❌ Editing canon “for clarity”
❌ Re-numbering verses per tradition
❌ Implicit references (“this verse above”)

12. Validation Rules

Any object with ref must satisfy:

UID exists

UID conforms to registry

Reference scope is explicit

Range order is valid

Segment identifiers are local only

Validation failures are hard errors.

13. Why This Contract Exists

Without it:

verses get duplicated

commentaries rewrite scripture

traditions fight over text

AI contaminates canon

With it:

canon remains untouched

meaning layers flourish

disagreements coexist safely

the library scales indefinitely

14. Relationship to Other Documents

This contract depends on:

UID_SYSTEM.md

CANONICAL_UNIT_DEFINITION.md

EDITORIAL_UNIT_DEFINITION.md

KNOWLEDGE_LAYER_MODEL.md

If any conflict arises:

Canonical identity always wins.

15. Status & Governance

Category: LOCKED ARCHITECTURAL CONTRACT

Changes require:

constitution review

version bump

migration plan

16. Closing Reflection

A verse is not a paragraph to be copied.
It is a point of truth to be referenced.

This contract ensures reverence and rigor.
