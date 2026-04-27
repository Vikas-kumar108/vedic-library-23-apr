🧭 PARALLEL WORK & CHAT PROTOCOL

Vedic Library Project

Status: GOVERNANCE — LOCKED
Authority Level: Subordinate to PROJECT_CONSTITUTION.md
Applies To: All contributors, maintainers, and AI-assisted workflows
Scope: Coordination, parallelization, and decision discipline

0. Purpose of This Document

This document defines how parallel work is coordinated within the Vedic Library Project without violating:

Canonical integrity

Phase discipline

Architectural stability

Constitutional authority

It answers the operational question:

How can many texts, scripts, and discussions proceed in parallel without drift, contradiction, or accidental authority violations?

This document governs process and coordination only.
It does not define canon, identity, schema, or architecture.

1. Governing Principle

No parallel work may create parallel authority.

Parallel work is permitted only when:

Authority remains centralized

Decisions remain traceable

Conflicts resolve upward, never sideways

2. Authority Hierarchy (Non-Negotiable)

All work — human or AI-assisted — is governed by the following hierarchy:

PROJECT_CONSTITUTION.md (supreme)

Architecture contracts (docs/architecture/)

Schemas & UID law

Governance protocols (this document)

Operational work units (chats, scripts, tasks)

If conflict arises, higher authority always prevails.

3. Concept of “Work Channels”

For coordination purposes, the project recognizes distinct work channels.

A work channel is a bounded context where a specific type of work happens.
Channels may be implemented as chats, documents, repositories, or tasks.

Channels are functional roles, not technologies.

4. Canonical Work Channel Types
4.1 Phase-2 Core Authority Channel

Purpose:
To define, clarify, and lock architectural and canonical law.

This channel MAY:

Clarify canonical principles

Lock architectural contracts

Resolve cross-text ambiguities

Declare documents LOCKED

This channel MUST NOT:

Ingest text

Write scripts

Normalize data

Produce canonical output

📌 There is exactly ONE active Phase-2 Core Authority Channel at any time.

4.2 Text-Specific Canonical Ingestion Channel

Purpose:
To ingest one and only one śāstra into canonical form.

This channel MAY:

Apply existing UID rules

Apply canonical unit definitions

Segment verses / sūtras / mantras

Validate against schemas

Produce canonical JSON output

This channel MUST NOT:

Redesign UID systems

Modify schemas

Invent conventions

Introduce interpretation

Resolve architectural ambiguity

📌 If ambiguity arises → STOP and escalate to Core Authority.

4.3 Pipeline / Script Implementation Channel

Purpose:
To write deterministic scripts that implement already-defined rules.

This channel MAY:

Write Python or tooling scripts

Implement raw → normalized → canonical pipelines

Enforce folder and naming standards

Implement validators

This channel MUST NOT:

Decide canonical structure

Alter verse boundaries

Introduce metadata meaning

Adjust UID logic

“Fix” canonical output manually

📌 Scripts execute law; they do not interpret it.

4.4 Clarification-Only Channel

Purpose:
To understand why something exists — not to change it.

This channel MAY:

Ask conceptual questions

Seek explanations of existing rules

Explore consequences of decisions

This channel MUST NOT:

Make decisions

Propose changes

Create new rules

Modify documents

📌 If a decision seems necessary, the question must be taken upward.

5. Escalation & Stoppage Rules
5.1 Mandatory Stop Conditions

Work must halt immediately if any of the following occur:

Canonical ambiguity is detected

UID assignment is unclear

Source conflicts cannot be resolved mechanically

A rule appears missing or contradictory

5.2 Escalation Path

All unresolved issues escalate in this order:

Text-Specific Channel
→ Phase-2 Core Authority Channel
→ Constitutional review (if required)

Side-resolution or workaround is forbidden.

6. Parallelization Policy

Parallel work is permitted only when:

Each channel has clearly defined scope

No channel modifies shared authority documents

Outputs are merge-safe and reviewable

Canonical output is produced by scripts only

Allowed parallelism examples:

Padma Purāṇa ingestion + Yoga Sūtra ingestion

Script development + separate text ingestion

Clarification discussion while pipelines run

Forbidden parallelism examples:

Two channels redefining UID logic

Competing schema interpretations

Independent canonical decisions

7. Merge Discipline

Only the following artifacts may be merged into the main repository:

Canonical data (_canonical/)

Index data (_indexes/)

LOCKED documents approved by authority

Drafts, experiments, logs, and raw material must not be merged upstream.

8. AI Participation (Procedural Boundary)

AI tools may participate only within the bounds defined by the Constitution.

Procedurally:

AI output is always non-authoritative

AI must not decide identity, boundaries, or meaning

AI-assisted channels must declare their role clearly

AI output may not bypass escalation rules

Silently promoted AI output is treated as invalid.

9. Record-Keeping & Traceability

For every canonical ingestion effort:

Decisions must be traceable to documents

Scripts must be reproducible

Ambiguities must be logged

Deviations must be explicit

Institutional memory must outlive individual contributors.

10. Stability & Governance

This document is a governance protocol, not a design surface.

Changes require:

Review against PROJECT_CONSTITUTION.md

Cross-check with architectural contracts

Explicit version bump

Ad-hoc deviations are forbidden.

11. Closing Principle

Parallel work accelerates progress.
Parallel authority destroys trust.

This protocol exists so that:

Many hands may work

One canon remains

The library grows without fragmentation

Status: LOCKED
File: docs/governance/PARALLEL_WORK_AND_CHAT_PROTOCOL.md
