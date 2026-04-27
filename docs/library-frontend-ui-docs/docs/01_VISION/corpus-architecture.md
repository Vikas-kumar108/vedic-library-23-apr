Corpus Architecture Specification
Indian Knowledge Library — Canonical Infrastructure Document

Version 1.0

1. Purpose

This document defines the canonical structural architecture of the Indian Knowledge Library (IKL).

The objective is:

To preserve structural identity of śāstra.

To ensure canonical address stability.

To separate structure from interpretation.

To allow digital scalability across centuries.

This is infrastructure — not presentation.

2. Foundational Principles
2.1 Canonical Identity is Structural

A text’s identity is determined by:

Its hierarchical containment

Its numerical sequencing

Its canonical units

Not by:

Translation

Typography

Commentary

Editorial formatting

2.2 Separation of Layers

The system must maintain strict separation between:

Canonical Layer (immutable structure)

Derivative Layer (translations, commentaries, AI)

Presentation Layer (UI, layout, visuals)

3. Canonical Address Grammar

All texts must resolve to:

/{domain}/{text}/{section}/{subsection}/{chapter}/{verse}

Example:

/itihasa/mahabharata/bhisma-parva/bhagavad-gita/2/47

Rules:

Each level must correspond to an actual structural node.

No artificial UI-based nesting.

URL structure must reflect canonical containment.

4. Domain Taxonomy

Root domains:

sruti
smrti
itihasa
purana
agama
vedanga
upaveda
darsana
sampradaya

These represent epistemic categories — not UI folders.

5. Canonical Spine Declaration

Each text must declare its canonical spine.

Example: Bhagavad-gītā

Levels:

Itihāsa

Mahābhārata

Bhīṣma Parva

Bhagavad-gītā

Chapter

Verse

This spine must be declared explicitly in metadata.

Spines are:

Versioned

Immutable

Supersedable (never edited in place)

6. Metadata Contract

Each canonical work must include:

meta.json

Example:

{
  "id": "bg",
  "title": "Bhagavad-gītā",
  "domain": "itihasa",
  "spineVersion": "1.0",
  "levels": ["parva", "subwork", "chapter", "verse"],
  "chapterCount": 18,
  "verseCounts": {
    "1": 47,
    "2": 72
  }
}

UI must read from metadata.
Never hard-code structural numbers.

7. Canonical UID System

Each canonical unit must have a permanent UID.

Example:

bg.02.047

UID Rules:

Never reused

Never modified

Never dependent on translation

Never dependent on UI

8. Canonical vs Derivative Separation

Structure:

bhagavad-gita/
  canonical/
    02/
      047.json
  derivative/
    translations/
    commentaries/
    comparative/

Canonical folder:

Contains only structural content.

Derivative folder:

Contains mutable interpretive layers.

9. Corpus Loader Requirement

The application must not hardcode structure.

Instead:

Read directory tree

Read meta.json files

Generate CorpusNode tree dynamically

This ensures scalability across all śāstra.

10. Immutability Policy

Canonical structure may be:

Deprecated

Superseded

But never edited in place.

Structural calm ensures civilizational continuity.

End of Corpus Architecture Document.