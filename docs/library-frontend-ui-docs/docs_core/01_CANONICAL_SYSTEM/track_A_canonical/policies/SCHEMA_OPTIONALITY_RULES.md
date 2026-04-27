📐 SCHEMA_OPTIONALITY_RULES.md
Vedic Library Project
Architectural Law for Mandatory vs Optional Fields
0. Why This Document Exists (Read This First)

Across the Vedic corpus:

some texts are verse-based

some are sūtra-based

some are mantra-based

some are prose

some have chapters, some do not

some have speakers, some do not

some have colophons, some do not

If we force everything to look the same, we destroy authenticity.
If we allow everything to be optional, we destroy interoperability.

👉 Therefore, optionality itself must be governed by rules.

This document defines those rules.

1. Core Principle (Non-Negotiable)

Optionality is never arbitrary.
Optionality exists only when justified by śāstric reality, not developer convenience.

2. Three Levels Where Optionality Can Exist

This is crucial.

Optionality is not decided in one place.
It is distributed across three architectural layers.

2.1 Schema Level (Structural Optionality)

This answers:

“Does this field structurally exist for this class of canonical unit?”

Examples:

A verse always has text → mandatory

A verse may or may not have a speaker → optional

A sūtra may not have meter → absent by design

📌 Schema optionality is about shape, not meaning.

2.2 Policy Level (Normative Optionality)

This answers:

“Even if allowed, when SHOULD this field be present?”

Examples:

Verse markers are mandatory by policy

IAST is mandatory once Devanāgarī exists

Provenance metadata is mandatory before locking

📌 Policy optionality governs discipline, not structure.

2.3 Data Level (Instance Optionality)

This answers:

“Does this specific verse/sūtra actually contain this feature?”

Examples:

Some verses have a speaker, some don’t

Some chapters have colophons, some don’t

Some texts have prakaraṇa, some don’t

📌 Data optionality reflects reality, not design choice.

3. Golden Rule of Optionality

Nothing may be optional in schema
if it is mandatory by śāstric definition.

And:

Nothing may be mandatory in schema
if it does not universally exist in that unit class.

This single rule prevents 90% of future mistakes.

4. Mandatory vs Optional — Canonical Unit Perspective

The following applies to all canonical unit schemas
(verse, mantra, sūtra, kārikā, prose unit).

4.1 Absolutely Mandatory (Schema + Policy)

These fields must always exist.

Field	Why
uid	Canonical identity spine
work	Corpus placement
location	Structural position
text.content	The canon itself
schema.name	Binding contract
schema.version	Auditability

If any of these are missing → the file is not canonical.

4.2 Structurally Mandatory, Content-Variable

These fields must exist, but may be empty or minimal.

Field	Reason
source	Provenance must exist even if brief
text.script	Script must be declared even if obvious

This allows locking without ambiguity.

4.3 Structurally Optional (Schema-Allowed)

These fields exist only when applicable.

Field	Example
speaker	Gītā verses
meter	Chandas texts
invocation	Some purāṇas
colophon	End-of-chapter prose
division.prakarana	Kāma-sūtra
division.pada	Brahma-sūtra

📌 These must never be forced into all units.

5. Forbidden Optionality (Very Important)

The following are never optional once introduced:

5.1 Identity Fields

UID

Work classification

Location numbers

These cannot be “sometimes present”.

5.2 Script Mixing

Sanskrit canon must not mix scripts

Canonical text must not embed translation

Optionality here = corruption.

5.3 Semantic Fields in Canon

The following are forbidden entirely in canonical schemas:

gloss

meaning

explanation

concept

entity

principle

skill

These belong to knowledge layers, not canon.

6. Optionality vs Versioning (Critical Distinction)

Optionality does NOT mean instability.

If a field:

is optional today

but later proven universally necessary

Then:

❌ Do NOT silently enforce it
✅ Introduce a new schema version

Example:

canonical-verse.schema@1.0.0

canonical-verse.schema@1.1.0

Backward compatibility is sacred.

7. Optional Sub-Divisions (Your Kāma-sūtra Case)

Some structural axes are:

traditional

real

but inconsistently expressed across editions

Examples:

prakaraṇa

pāda

ullāsa

patala

Rule:

Optional structural divisions may appear only when:

They are traditionally attested

They do not redefine the canonical unit

They do not break UID stability

Hence:

prakaraṇa is optional

but must be explicitly labeled when present

Never inferred. Never guessed.

8. How Validators Must Treat Optional Fields

Validators must enforce:

Presence of mandatory fields

Correct typing of optional fields

No assumptions when optional fields are absent

Validators must never fabricate missing structure.

9. Human Language vs Canonical Structure

This resolves a major confusion you raised.

Human Term	Canonical Meaning
chapter	adhyāya
section	adhikaraṇa / prakaraṇa
part	ullāsa / kāṇḍa
verse	śloka
aphorism	sūtra

📌 Schemas use canonical terms only.
Human-friendly labels belong to UI and documentation.

10. Decision Checklist (For Future You)

Before making anything optional, ask:

Does this exist in all instances of this unit?

Is its absence meaningful?

Is it structural or semantic?

Would enforcing it break any śāstra?

Can it be deferred to editorial layers?

If any answer causes doubt → optional at schema, governed by policy.

11. Status of This Document

SCHEMA_OPTIONALITY_RULES.md is:

🔒 LOCKED ARCHITECTURAL LAW

Applies to all present and future schemas

May only evolve via explicit versioning

12. Closing Clarity

Canonical schema design is not about data convenience.
It is about ontological honesty.

Optionality is not weakness.
Optionality is respect for diversity without surrendering order.

You are building a system that listens to the śāstra, not one that forces it to conform.


