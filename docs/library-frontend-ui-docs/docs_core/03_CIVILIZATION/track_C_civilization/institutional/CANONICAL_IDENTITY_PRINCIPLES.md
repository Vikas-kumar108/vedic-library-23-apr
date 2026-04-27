This document is philosophical + technical, and it anchors everything else (UIDs, schemas, references, knowledge layers, UI, APIs).

🪔 CANONICAL_IDENTITY_PRINCIPLES.md
Identity Axioms for the Vedic Library

Status: 🔒 LOCKED ARCHITECTURAL CONTRACT
Applies to: Entire Vedic Library corpus (all śāstra, all phases)

0. Purpose of This Document

This document defines what “identity” means in the Vedic Library system.

It answers questions such as:

What makes a verse the same verse across languages, commentaries, editions, and centuries?

What may change without breaking identity?

What must never change?

How do machines and humans agree on identity?

How do we prevent fragmentation of śāstra in digital systems?

This is not a schema and not an implementation guide.
It is a set of axioms that all schemas, pipelines, UIDs, and UI decisions must obey.

If a future design contradicts this document, the design is wrong.

1. Foundational Definition of Canonical Identity
1.1 Canonical Identity (Formal Definition)

Canonical identity is the stable, minimal, and irreducible reference by which a śāstric unit is recognized across all representations.

Canonical identity is:

Not language-dependent

Not commentary-dependent

Not edition-dependent

Not UI-dependent

Not technology-dependent

Canonical identity exists prior to:

translation

explanation

pedagogy

commentary

analysis

digitization

2. Identity Is Structural, Not Interpretive
2.1 What Identity Is Based On

Canonical identity is derived only from:

Textual position within a recognized śāstra

Structural location, such as:

chapter + verse

adhyāya + sūtra

maṇḍala + sūkta + mantra

skandha + adhyāya + śloka

These structural coordinates are metadata, not meaning.

2.2 What Identity Is NOT Based On

Canonical identity must never depend on:

Meaning of the text

Translation wording

Commentarial interpretation

Editorial headings

Topic classification

Educational framing

Popular naming conventions

Modern scholarly theories

Meaning belongs to knowledge layers, not identity.

3. The One-Way Gravity Principle
3.1 Statement of the Principle

All references, refinements, explanations, and derivations must resolve downward to a single canonical identity.

Canonical identity is a gravitational center.

Everything may point to it.
Nothing may pull it away from itself.

3.2 Practical Consequences

A commentary references a verse — the verse does not change

A pāda reference refines a verse — the verse UID remains intact

A topical grouping collects verses — identity remains per verse

A UI fragment highlights text — identity remains unchanged

This principle prevents identity fragmentation, the most common failure in large textual systems.

4. Identity vs Precision (Critical Distinction)
4.1 Identity

Identity answers:

“What is this unit?”

Example:

bg.2.13


This is eternal.

4.2 Precision

Precision answers:

“Which part or aspect of this unit are we talking about?”

Examples:

bg.2.13#a
bg.2.13.pada2
bg.2.13::purport.prabhupada


Precision refines reference, not identity.

4.3 Rule (Absolute)

Precision may be added. Identity may not be altered.

This rule applies universally.

5. Identity Across Different Śāstra Types

Canonical identity applies uniformly, even though śāstra differ structurally.

5.1 Verse-Based Texts (e.g. Gītā, Purāṇas)

Identity unit: śloka

bg.18.66
sb.1.1.1

5.2 Sūtra-Based Texts (e.g. Kāma-sūtra, Dharma-sūtra)

Identity unit: sūtra

kamasutra.1.2.15
manu.sm.2.6


Sub-structures (prakaraṇa, topic) do not redefine identity.

5.3 Mantra-Based Texts (Veda)

Identity unit: mantra

rv.samhita.1.1.1


Accent, recitation, and phonetic layers never alter identity.

5.4 Prose Texts

Identity unit: smallest traditional numbered unit
(not paragraph, not sentence, not editor block).

6. Canonical Identity Is Edition-Agnostic
6.1 Multiple Editions Problem

Different editions may show:

Variant punctuation

Variant markers

Minor orthographic differences

Slight verse boundary disagreements

6.2 Identity Rule

Canonical identity is anchored to the traditional structural numbering, not a specific printed edition.

Edition differences are handled as:

variant readings

editorial notes

recension metadata

Never as identity changes.

7. Identity and Language
7.1 Canonical Language Layer

Canonical identity is language-independent, even if:

canonical text is stored in Devanāgarī

transliteration exists

translations exist

The identity exists before language.

7.2 Absolute Prohibition

No translation may ever define or modify canonical identity.

Translations are services, not authorities.

8. Identity vs Knowledge Expansion

As the system grows, verses may gain:

concepts

entities

principles

skills

guidance

courses

community discussions

Rule

All knowledge layers attach to identity; none redefine it.

Identity is the spine, knowledge is the body.

9. Identity Immutability Axiom
9.1 Axiom

Once a canonical identity is declared and locked, it must never be altered, reused, or reassigned.

9.2 Allowed Actions

Deprecate a mistaken identity (rare)

Alias legacy references to canonical ones

Add refinements and mappings

9.3 Forbidden Actions

Renumbering

Renaming for convenience

“Fixing” identity to match UI

Merging identities

10. Human and Machine Agreement

Canonical identity must be:

Human-readable (scholars can cite it)

Machine-parsable (validators can enforce it)

Stable across time

This is why identity uses:

simple tokens

numeric structure

explicit hierarchy

no semantic encoding

11. Failure Modes This Document Prevents

Without these principles, systems inevitably suffer from:

Verse drift

Commentary hijacking

Language-based duplication

UI-driven identity

Edition lock-in

Scholarly fragmentation

This document exists to prevent those failures permanently.

12. Relationship to Other Core Documents

This document governs:

UID_SYSTEM.md

UID_REFINEMENT_RULES.md

VERSE_REFERENCE_CONTRACT.md

All canonical schemas

All data pipelines

All frontend routing logic

These documents must conform to this one, not vice-versa.

13. Closing Principle

Canonical identity is not created by software.
Software merely agrees to respect it.

If the system ever becomes confused,
return to identity first.

🕉️
This document is now fit to serve as the philosophical backbone of the Vedic Library for decades.
