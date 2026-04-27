🧱 DATA LOADING ABSTRACTION STRATEGY
Vedic Library Project

Version: 1.0.1  
Status: EVOLVING ARCHITECTURE (Versioned)

---

## 0. Purpose of This Document

This document defines the **contractual abstraction** for how data is
requested, resolved, and assembled across the Vedic Library.

It answers:

- How does the system request textual data?
- How is canonical identity resolved?
- How are non-canonical layers attached safely?
- What loaders must guarantee — and must never assume?
- How loading evolves across phases without rewrites?

This is **not** an implementation guide.
This is a **binding architectural contract**.

---

## 1. Core Design Principle (Non-Negotiable)

> **The loader knows what it wants, not where it lives.**

Therefore:

- UI components MUST NOT know file paths
- UI components MUST NOT know directory layouts
- UI components MUST NOT know storage mediums
- UI components MUST NOT branch on phase or backend

UI requests **conceptual units**, never files.

---

## 2. Loader Roles (Explicit Separation)

The data-loading system consists of **three distinct roles**.

### 2.1 Canonical Loader (Layer A)

Responsible for:
- Resolving a canonical UID
- Fetching canonical data
- Validating schema
- Returning immutable content

It MUST:
- Accept only `{ uid }`
- Return exactly one canonical unit or `null`

It MUST NOT:
- Attach translations
- Attach commentary
- Infer meaning
- Mutate content
- Perform orchestration

---

### 2.2 Layer Loaders (Layer B+)

Responsible for:
- Fetching optional, non-canonical layers
- Respecting UID anchoring
- Returning zero, one, or many results

Each layer has its **own loader**:
- translation loader
- commentary loader
- synonym loader
- knowledge-layer loader

Layer loaders:
- MAY return `null`
- MUST NOT fail if data is absent
- MUST NOT modify canonical content

---

### 2.3 Assembly Orchestrator (Non-Authoritative)

Responsible for:
- Coordinating multiple loaders
- Assembling a composite response
- Preserving canonical-first rendering

The orchestrator:
- MAY exist as a helper function (e.g. `loadVerse`)
- MUST NOT encode interpretation
- MUST NOT make assumptions about completeness

The UI never sees internal orchestration.

---

## 3. Canonical Loading Contract

### 3.1 Canonical Load Input

Canonical data is requested **only** by:

```json
{ "uid": "bg.2.13" }
Never by:

filenames

URLs

language

author

phase

3.2 Canonical Load Guarantees
When requesting canonical data:

✔ Exactly one result OR null
✔ Immutable content
✔ Language-independent
✔ Schema-validated

If the canonical UID does not exist:

Loader MUST return null

UI MUST render a calm “Not Found”

No guessing, no fallback

4. Extended Layer Loading Contract
Extended layers are optional, plural, and non-authoritative.

4.1 Extended Load Input
json
Copy code
{
  "ref": "bg.2.13",
  "layer": "translation",
  "language": "en"
}
or

json
Copy code
{
  "ref": "bg.2.13",
  "layer": "commentary",
  "author": "prabhupada",
  "language": "en"
}
Rules:

ref MUST be a canonical UID

Layer selection is explicit

No implicit defaults

4.2 Extended Load Guarantees
✔ Canonical identity remains untouched
✔ Absence does not break rendering
✔ Multiple layers may coexist

Layer loaders MAY return:

null

partial data

multiple entries

This is expected behavior.

5. Composition Model (Canonical-First)
The UI MUST follow this order:

Load canonical unit

Render canonical text immediately

Attach extended layers progressively

This guarantees:

Reading always works

Scholarship never blocks access

Incomplete data is safe

6. Phase-Wise Evolution (Guaranteed Stability)
Phase 1
Static JSON

File-based loaders

No caching

No backend

UID → filesystem resolution

Phase 2
Registry-based resolution

Canonical expansion across śāstra

Still read-only

Caching discouraged (not required)

Phase 3+
Backend APIs

Persistence

User-specific layers

Distributed storage

The loader interface NEVER changes.
Only internal resolution evolves.

7. Prohibited Loader Behaviors (Strict)
Loaders MUST NEVER:

❌ Assume directory names
❌ Assume file extensions
❌ Assume language defaults
❌ Infer missing data
❌ Mutate canonical text
❌ Mix layers

Loaders are resolvers, not editors.

8. Error Handling Rules (Normative)
Situation	Required Behavior
Canonical missing	Return null, render calmly
Translation missing	Omit silently
Commentary missing	Omit silently
Schema invalid	Hard failure (developer error)
UID invalid	Validation error

Silence is preferred over noise.

9. Caching Policy (Deferred)
Caching is:

Allowed

Optional

Never relied upon

Cache keys MUST be explicit:

ruby
Copy code
<uid>:<layer>:<language>:<author>
Caches MUST NOT mutate data.

10. Relationship to Other Documents
Depends on:

UID_SYSTEM.md

DATA_SCHEMA.md

CANONICAL_UNIT_DEFINITION.md

NAMING_CONVENTIONS.md

Supports:

KNOWLEDGE_LAYER_MODEL.md

SEMANTIC_DERIVATION_POLICY.md

Frontend routing & loaders

11. Final Principle
Data loading is an act of humility.
We ask the text to come forth —
we do not force it.
