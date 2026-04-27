PARALLEL_WORK_AND_CHAT_PROTOCOL.md
Vedic Library Project

Status: GOVERNANCE — LOCKED
Authority Level: Subordinate to PROJECT_CONSTITUTION.md
Applies To: All contributors, all phases, all tools, all AI-assisted work

0. Purpose (Normative)

This document defines how parallel work is conducted in the Vedic Library Project without causing:

architectural drift

philosophical inconsistency

duplication of authority

accidental constitutional violations

It answers one operational question only:

When multiple chats, contributors, or workflows run in parallel, how is authority preserved and confusion prevented?

This document governs process discipline, not content decisions.

1. Core Principle (Non-Negotiable)

Authority flows in one direction only.

Higher-authority contexts define rules.
Lower-authority contexts apply rules.

No parallel workflow may invent, reinterpret, or override authority.

If confusion arises, work must stop, not improvise.

2. The Four Canonical Chat Contexts

All work in the Vedic Library Project MUST fall into exactly one of the following contexts.

No hybrid contexts are permitted.

🟥 1. CORE / CONSTITUTIONAL CHAT

(Authority-Defining Context)

Purpose

To define, clarify, or lock binding rules.

May Do

Define constitutional principles

Clarify architectural law

Lock governance documents

Resolve disputes

Interpret conflicts between documents

Must NOT Do

Perform ingestion

Write scraping scripts

Normalize text

Generate canonical data

Authority Level

Highest.
All other chats are subordinate.

🟧 2. TEXT-SPECIFIC CANONICAL CHAT

(Canonical Application Context)

Purpose

To ingest one śāstra canonically by applying already-locked rules.

This context is a scribe, not a designer.

May Do

Apply UID rules

Apply canonical unit definitions

Segment verses / sūtras / mantras

Validate against schemas

Produce canonical JSON

Must NOT Do

Redesign UID system

Modify schemas

Introduce interpretation

Introduce translations

Solve architectural ambiguity

Failure Rule

If ambiguity arises → STOP and escalate to Core Chat.

🟨 3. PIPELINE / SCRIPT CHAT

(Mechanical Implementation Context)

Purpose

To write deterministic scripts that implement decisions made elsewhere.

May Do

Write Python scripts

Scrape or ingest raw data

Normalize text mechanically

Generate files

Run validators

Must NOT Do

Decide verse boundaries

Interpret śāstra

Invent metadata

Rename texts

Modify canonical rules

Scripts must fail loudly when rules are unclear.

🟦 4. CLARIFICATION-ONLY CHAT

(Understanding Context)

Purpose

To understand why something exists — not to change it.

May Do

Ask conceptual questions

Request explanations

Seek decision rationale

Must NOT Do

Make decisions

Modify documents

Propose changes

Produce outputs used directly in the project

If a decision seems necessary → return to Core Chat.

3. Authority Hierarchy Between Chats
CORE CHAT
   ↓ defines law
TEXT-SPECIFIC CANONICAL CHAT
   ↓ applies law
PIPELINE / SCRIPT CHAT
   ↓ mechanizes law
CLARIFICATION CHAT
   ↺ supports understanding only


Any attempt to reverse this flow is a governance violation.

4. Document Usage Rules Per Chat
Core / Constitutional Chat

May reference:

PROJECT_CONSTITUTION.md

Governance documents

Architecture contracts

Phase plans (for conflict resolution only)

Text-Specific Canonical Chat

May reference:

Constitution

Canonical identity & UID documents

Canonical schemas

Raw → Canonical policies

Must NOT reference:

Knowledge layer models

Pedagogical UX

Community features

Pipeline / Script Chat

May reference:

PIPELINE_REGISTRY.md

RAW_TO_CANONICAL_MAPPING_POLICY.md

Schemas (validation only)

Must NOT reference:

Constitution (except as constraint)

Philosophical discussions

Clarification Chat

May reference:

One document only, directly relevant to the question

Must NOT reference:

Phase plans

Schemas (unless explicitly requested)

Multiple authority documents simultaneously

5. Parallel Work Safety Rule

Parallel chats are permitted only if:

They do not modify shared authority documents

They do not redefine schemas

They do not invent conventions

They do not resolve ambiguity independently

All parallel work assumes frozen authority.

6. Escalation Rule (Critical)

If any chat encounters:

identity ambiguity

unit boundary confusion

UID uncertainty

schema mismatch

phase leakage

Then:

Work must stop immediately and escalate to Core Chat.

Guessing is forbidden.

7. AI Usage Boundary (Reinforcement)

AI tools:

Are allowed only where constitutionally permitted

Must never decide authority

Must never generate canonical content

Must never resolve ambiguity silently

AI assistance does not change chat authority.

8. Enforcement

Violations of this protocol are treated as:

Process errors, not stylistic differences

Grounds for invalidating outputs

Grounds for re-ingestion if necessary

Convenience never overrides discipline.

9. Relationship to Other Documents

This protocol is subordinate to:

PROJECT_CONSTITUTION.md

DOCUMENT_AUTHORITY_HIERARCHY.md

This protocol governs:

All chat usage

All parallel workflows

All AI-assisted processes

If conflict arises, the Constitution prevails.

10. Final Declaration

Parallelism is a scaling technique, not an authority multiplier.

This protocol exists so that the Vedic Library may grow in size
without growing confused in identity.

🕉️
PARALLEL_WORK_AND_CHAT_PROTOCOL.md is hereby declared LOCKED.
