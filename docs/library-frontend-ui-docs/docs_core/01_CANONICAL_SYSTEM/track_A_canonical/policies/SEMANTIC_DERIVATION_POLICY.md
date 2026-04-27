It answers how meaning grows around canonical text without ever contaminating it.

🌱 Semantic Derivation Policy
Vedic Library Project
0. Purpose of This Document

This document defines how meaning, knowledge, interpretation, and application are derived from canonical text in the Vedic Library.

It answers questions like:

What kinds of meaning can be attached to a verse?

How do concepts, principles, skills, and guidance relate to canon?

What is allowed to be derived, and what is forbidden?

How do multiple interpretations coexist safely?

How does AI participate without becoming authority?

This is a policy document, not a schema.

If canonical text is bedrock, semantic derivation is the ecosystem built upon it.

1. Foundational Axiom

Canonical text is fixed. Meaning is expandable.

Everything in this document follows from this axiom.

Canonical text:

does not change

does not evolve

does not absorb meaning

Semantic layers:

grow

branch

refine

disagree

coexist

2. What “Semantic Derivation” Means

In this project, semantic derivation means:

Any structured meaning, interpretation, explanation, abstraction, or application
that is derived from a canonical unit but is not part of the canonical unit itself.

Examples:

word meanings

concepts

principles

philosophical positions

moral guidance

skills

narratives

entities

historical context

pedagogical explanations

courses and curricula

All of these are derivative.

3. Absolute Separation Principle

No derived semantic content may ever modify canonical text.

This includes:

adding meaning into canonical files

embedding interpretation inside canonical schema

merging commentary with verse text

annotating canonical text inline

All derivations must reference, never embed.

4. The Canonical Reference Contract

Every semantic derivation MUST:

Reference a canonical UID

Declare its semantic type

Declare its source or authority

Be removable without harming canon

Example:

{
  "ref": "bg.2.13",
  "type": "principle",
  "source": "Bhagavad-gita tradition",
  "content": "The soul is eternal and transmigrates."
}


If removing this file breaks the canonical verse → violation.

5. Taxonomy of Semantic Layers

All derived meaning must belong to one or more semantic categories.

Core Categories (Stable)
Category	Purpose
gloss	Short explanatory notes
synonym	Word-by-word meanings
translation	Language rendering
commentary	Traditional explanation
concept	Abstract idea
principle	Generalized truth
entity	Person, place, event
skill	Actionable capability
guidance	Applied instruction
Extended Categories (Expandable)
Category	Purpose
narrative	Story or context
question	Inquiry-based framing
practice	Sādhana or discipline
course	Structured learning
compilation	Cross-verse synthesis
community	Discussion & lived usage

New categories may be added without touching canon.

6. One-to-Many Rule

One canonical unit may have unlimited semantic derivations.

Example:

bg.2.13
 ├── translation (en)
 ├── translation (hi)
 ├── synonym
 ├── commentary (Prabhupāda)
 ├── commentary (Śaṅkara)
 ├── principle (ātman eternality)
 ├── concept (transmigration)
 ├── entity (Kṛṣṇa)
 ├── guidance (detachment from bodily identity)


No derivation has priority by structure alone.

7. Authority & Attribution (Very Important)

Every semantic derivation MUST declare its authority.

Allowed authorities:

named ācārya

named text

scholarly tradition

community consensus

AI-assisted (explicitly labeled)

Example:

"authority": {
  "type": "acharya",
  "name": "A.C. Bhaktivedanta Swami Prabhupāda"
}


No anonymous authority is allowed.

8. AI as Assistant, Never Authority

AI-generated semantics:

MUST be labeled

MUST be reviewable

MUST NOT overwrite traditional views

MUST coexist as one interpretation among many

Example:

"authority": {
  "type": "ai-assisted",
  "model": "gpt-5.2",
  "review_status": "unreviewed"
}


AI is a tool, not a voice.

9. Semantic Disagreement Is Allowed

Multiple, even contradictory interpretations may coexist.

Rules:

never merge conflicting views

never collapse disagreement

never rank by default

Let the reader choose.

10. Semantic Units Are Not Canonical Units

A principle:

may span multiple verses

may derive from a theme

may be reformulated

But it always points back to canonical references.

Example:

"refs": ["bg.2.13", "bg.2.20", "bg.15.7"]


Never invent a canonical identity for a principle.

11. Cross-Śāstra Derivations

Semantic derivations may link across texts:

Example:

A principle derived from Upaniṣads and Gītā

A skill drawn from Dharmaśāstra and Purāṇa

Canonical identities remain separate.

Semantic layer performs the synthesis.

12. Temporal Evolution of Meaning

Meaning may evolve across:

centuries

sampradāyas

cultures

Rules:

store each evolution separately

timestamp semantic derivations

never overwrite older interpretations

History is preserved, not flattened.

13. Pedagogy Is a Semantic Layer

Teaching structures:

lessons

curricula

courses

roadmaps

Are derivative semantic constructs.

They may:

group verses

reorder presentation

emphasize themes

They may never redefine canon.

14. Semantic Granularity Levels

Derivations may exist at different scales:

Level	Example
Micro	single word meaning
Verse	commentary
Section	narrative
Text-wide	principle
Corpus-wide	philosophy

Granularity must be declared.

15. Forbidden Semantic Actions

❌ Editing canonical text to fit interpretation
❌ Embedding meaning inside canonical schema
❌ Allowing AI to overwrite tradition
❌ Ranking interpretations without attribution
❌ Treating pedagogy as canon

16. Relationship to Other Documents

This policy works with:

CANONICAL_TEXT_POLICY.md

CANONICAL_IDENTITY_DECISION_FRAMEWORK.md

KNOWLEDGE_LAYER_MODEL.md

VERSE_REFERENCE_CONTRACT.md

If conflict arises:

Canonical identity always wins.

17. Status & Authority

Category: EVOLVING ARCHITECTURE (Versioned)

Changes allowed:

when new semantic categories emerge

when new knowledge practices arise

Canonical layer remains untouched

18. Closing Reflection

Canon is the lamp.
Meaning is the light it spreads.

Guard both — but never confuse them.
