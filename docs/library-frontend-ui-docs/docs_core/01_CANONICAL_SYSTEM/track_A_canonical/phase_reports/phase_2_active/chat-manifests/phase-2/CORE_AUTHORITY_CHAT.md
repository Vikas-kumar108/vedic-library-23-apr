# 🧭 CORE AUTHORITY CHAT — PHASE 2

Status: GOVERNANCE — NORMATIVE  
Applies to: Phase 2 (Canonical Expansion & Identity Stress-Test Phase)  
Authority Level: Supreme (within Phase-2 scope)  
Last Updated: YYYY-MM-DD

---

## 1. Purpose of the Core Authority Chat

The Core Authority Chat exists to:

- Define, clarify, and lock Phase-2 law
- Resolve ambiguity escalated from other chats
- Approve canonical spines, UID grammar, and registry updates
- Guard canonical identity against drift or contamination
- Coordinate parallel work without centralizing execution

The Core Authority Chat is **not** an execution chat.  
It is a **constitutional and architectural decision chamber**.

---

## 2. Fundamental Principle

> **Authority lives in documents, not in chat memory.**

A chat is a working room.  
Canonical authority is preserved only through:

- Locked documents
- Registries
- Explicit handoffs

---

## 3. Exclusivity Rule

At any moment in Phase-2:

- There MUST be exactly **one Active Core Authority Chat**
- All other chats are subordinate by definition

No two Core Authority Chats may be active simultaneously.

---

## 4. Powers of the Active Core Authority Chat

The Active Core Authority Chat MAY:

- Draft, revise, and lock Phase-2 governance, architecture, and ingestion documents
- Declare or approve canonical spines
- Approve UID ranges and registry updates
- Resolve conflicts escalated from:
  - Text-Specific Canonical Chats
  - Pipeline / Script Chats
  - Clarification Chats
- Declare documents LOCKED or SUPERSEDED
- Advance Phase-2 status

The Active Core Authority Chat MAY NOT:

- Perform ingestion
- Write pipeline scripts
- Normalize text
- Emit canonical JSON
- Introduce interpretation, commentary, or pedagogy

---

## 5. What Other Chats MUST Do

All non-core chats MUST:

- Treat Core Authority decisions as final
- Escalate ambiguity instead of inventing solutions
- Halt execution when authority is unclear
- Reference documents, not chat statements

---

## 6. Succession & Continuity (Critical)

### 6.1 Why Succession Exists

Phase-2 is long-running and high-volume.

To prevent:
- Context overload
- Decision loss
- Fatigue-driven drift

Core authority is **intentionally transferable**.

---

### 6.2 The Core Authority State

The authoritative state of Phase-2 consists of:

- Locked constitutional documents
- Locked architecture documents
- Spine declarations (`docs/spines/`)
- Registry states:
  - UID registry
  - Pipeline registry
- `PHASE_2_STATUS.md`
- `CORE_AUTHORITY_HANDOFF.md`

If these are intact, authority continuity is preserved.

---

### 6.3 Handoff Document (Mandatory)

All transitions of Core Authority are recorded in:

docs/phases/phase-2/CORE_AUTHORITY_HANDOFF.md

yaml
Copy code

This file is:

- Append-only
- Human-written
- Constitutionally binding

---

### 6.4 Handoff Entry Format

Each retiring Core Authority Chat MUST append an entry:

```md
## Core Authority Handoff — Entry N

Outgoing Core Chat:
- Scope: Phase-2 Canonical Expansion
- Active Period: YYYY-MM-DD → YYYY-MM-DD

Documents Locked / Updated:
- <document name> (version)
- <document name> (version)

Registry Updates:
- UID registry: <summary>
- Pipeline registry: <summary>

Open Issues (Explicit):
- <list>

Instructions for Successor:
- Resume from PHASE_2_STATUS.md
- Do not reopen locked decisions
Failure to record a handoff is a governance breach.

7. Starting a Successor Core Authority Chat
A new Core Authority Chat becomes active only after:

Reading:

PROJECT_CONSTITUTION.md

PHASE_2_STATUS.md

CORE_AUTHORITY_HANDOFF.md

Declaring in-chat:

“I acknowledge the current Phase-2 authority state as recorded.
I will not reopen locked decisions.”

Without this declaration, the chat has no authority.

8. Retirement of a Core Authority Chat
A Core Authority Chat MUST retire when:

Its context becomes saturated

A major Phase-2 milestone is complete

Authority is intentionally handed to a successor

Retirement requires:

Writing a handoff entry

Declaring retirement explicitly

9. Relationship to Other Chat Types
Chat Type	Authority Level
Core Authority Chat	Supreme
Text-Specific Canonical Chat	Subordinate
Pipeline / Script Chat	Subordinate
Clarification Chat	Non-authoritative
General Query Chat	Non-authoritative

10. End of Phase-2
The final Core Authority Chat for Phase-2 MUST:

Mark PHASE_2_STATUS.md as CLOSED

Write a final handoff entry

Declare Phase-2 constitutionally complete

11. Final Principle
No chat is sacred.
The law is sacred.

This document ensures Phase-2 remains coherent even as chats come and go.

CORE_AUTHORITY_CHAT.md is hereby declared normative for Phase-2.
