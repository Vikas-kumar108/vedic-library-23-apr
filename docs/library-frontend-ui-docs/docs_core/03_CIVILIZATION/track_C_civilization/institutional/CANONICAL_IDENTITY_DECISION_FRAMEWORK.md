This document is deliberately slow, explicit, and decisive.
It exists so that future-you, collaborators, and even successors never have to re-argue identity questions again.

🧭 Canonical Identity Decision Framework
Vedic Library Project
0. Purpose of This Document

This document defines how decisions about canonical identity are made in the Vedic Library.

It answers questions like:

What counts as a canonical unit?

When are two things the same canonical identity?

When must identity be split?

What must NEVER affect canonical identity?

How to decide when traditions, editions, or structures disagree?

This is a decision framework, not a schema.

If schema is law, this is constitutional reasoning.

1. Foundational Axiom (Non-Negotiable)

Canonical identity encodes textual location, not interpretation, meaning, or usage.

Everything in this document follows from this single axiom.

2. What “Canonical Identity” Means (Precisely)

In this project, canonical identity is:

A stable, minimal, location-based reference to a primary śāstric unit
that remains valid across languages, editions, traditions, and time.

Canonical identity is not:

an interpretation

a pedagogical unit

a reading convenience

a UI artifact

an editorial decision

3. Canonical Identity Is NOT Affected By

The following must never change canonical identity:

Factor	Reason
Language	Translations are derivative
Script	Canon is script-fixed; identity is not
Commentary	Commentary depends on canon
Sampradāya	Multiple traditions share canon
Philosophy	Meaning evolves, identity does not
Pedagogy	Teaching units are derivative
AI / tooling	Tools must conform to identity
UI routes	UI is disposable
File paths	Storage ≠ identity

If any of these alter identity → design error.

4. Canonical Identity IS Affected By

Only the following may affect canonical identity:

Textual location

Primary structural division

Traditionally recognized unit boundaries

Nothing else.

5. Decision Hierarchy (Very Important)

When deciding identity, apply these in order:

Step 1: Is the unit recognized as primary in the tradition?

śloka

mantra

sūtra

kārikā

prose-unit

If no → not canonical.

Step 2: Does it have a stable location?

chapter + verse

adhikāraṇa + adhyāya + sūtra

skandha + adhyāya + śloka

maṇḍala + sūkta + mantra

If no stable location → not canonical.

Step 3: Is the unit referenced independently in traditional citation?

If scholars traditionally cite it by number, it qualifies.

If only cited by content, it does not.

Step 4: Does splitting or merging destroy traditional citation?

If yes → do not split or merge.

6. Identity vs Structure (Critical Distinction)

Structure may vary. Identity must not.

Example: Bhagavad-gītā 2.47

Some editions merge 2.47–48

Some split prose introductions

Some add speaker lines

Canonical identity remains:

bg.2.47


Structure adapts. Identity does not.

7. Speaker Lines & Prefatory Text

Example:

धृतराष्ट्र उवाच
धर्मक्षेत्रे कुरुक्षेत्रे…

Decision Rule

If the speaker line is traditionally bound to the verse → include in canonical text.

If it is editorial or sectional → move to derivative layer.

Never create a separate UID for speaker lines.

8. Section / Chapter / Part Naming Confusion

Traditional texts use overlapping terms:

Term	Also Called
Adhikāraṇa	Part / Book
Adhyāya	Chapter
Sarga	Canto
Skandha	Book
Prakaraṇa	Topic
Pāda	Quarter
Canonical Rule

Names are irrelevant. Position is everything.

Canonical identity encodes:

numeric position

hierarchical order

Never encode:

Sanskrit term names

translated labels

topical titles

9. Optional Subdivisions (Prakaraṇa, Pāda, etc.)

Some subdivisions are:

globally numbered (e.g. Kāma-sūtra prakaraṇa)

sometimes omitted in editions

sometimes merged

Decision Rule

If subdivision is globally stable → encode optionally with prefix

If subdivision is editorial → never encode

Example (correct):

kamasutra.1.2.p14.7


Prefix avoids ambiguity.

10. Verse vs Sūtra vs Mantra

Canonical identity is unit-type aware, but unit-type neutral in principle.

That means:

A sūtra is not “less canonical” than a śloka

A mantra is not “more canonical” than a prose unit

Each has:

its own schema

same identity guarantees

Never force all texts into “verse” semantics.

11. Grouped or Combined Units

Example:

BG 1.32–35

Rule

Each verse retains its own canonical UID

Grouping is editorial

Canonical:

bg.1.32
bg.1.33
bg.1.34
bg.1.35


Grouping belongs to:

exposition

commentary

pedagogy

12. Multiple Recensions / Editions
Rule (Very Important)

Disagreement between recensions does NOT create new canonical identities.

Instead:

canonical identity is frozen

textual variants are stored as derivatives

Canonical identity never branches.

13. Canonical Identity vs Knowledge Expansion

When attaching:

entities

concepts

principles

skills

guidance

These reference canonical identity; they never redefine it.

ref: bg.2.13
type: principle


Identity stays atomic. Knowledge fans outward.

14. Decision Anti-Patterns (Hard No)

❌ Creating new UIDs for pedagogy
❌ Encoding interpretation in UID
❌ Encoding tradition or author
❌ Encoding topic or theme
❌ Encoding translation language
❌ Encoding UI routes
❌ Encoding file paths

If tempted → stop.

15. When In Doubt (Golden Rule)

Choose the identity that survives the maximum number of traditions, editions, and centuries.

That is almost always:

simpler

smaller

more boring

Boring identity is good identity.

16. Relationship to Other Documents

This framework governs decisions in:

UID_SYSTEM.md

DATA_SCHEMA.md

CANONICAL_TEXT_POLICY.md

all canonical schema files

If conflict arises:

This document wins over implementation convenience.

17. Status & Authority

Category: LOCKED ARCHITECTURAL CONTRACT

Changes allowed only if:

a genuine category error is discovered

entire corpus analysis supports revision

version increment is declared

18. Closing Statement

Canonical identity is the promise that a verse cited today
will still be the same verse centuries from now.

Guard it carefully.
