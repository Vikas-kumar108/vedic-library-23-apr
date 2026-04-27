# Editorial Unit Schema
## vedic-library.editorial.unit @ 1.0.0

This document defines the **Editorial Unit** schema used by the
Vedic Library to represent **authorial scope and intent** over
canonical textual units.

An Editorial Unit NEVER alters canonical identity or text.
It only declares **who explains what**, not **what is said**.

---

## 1. Definition

An **Editorial Unit** is the smallest unit of authored intent,
as defined by a specific author or tradition, covering
one or more canonical units.

It represents:
- authorial grouping
- verse coverage
- editorial intent

It does NOT represent:
- canonical text
- translation content
- commentary content
- file locations
- UI structure

---

## 2. Schema Identity

- **Schema name:** `vedic-library.editorial.unit`
- **Schema version:** `1.0.0`
- **Granularity:** one authorial scope declaration

---

## 3. Top-Level Structure

```json
{
  "uid": "string",
  "author": { ... },
  "covers": { ... },
  "declares": { ... },
  "source": { ... },
  "schema": { ... }
}
All top-level fields are required.

4. Field Definitions
4.1 uid (string, required)
Opaque, globally unique identifier for the Editorial Unit.

Rules:

MUST be unique

MUST be versionable

MUST NOT encode canonical identity

Example:

json
Copy code
"uid": "eu.bg.1.16-18.prabhupada.v1"
4.2 author (object, required)
Identifies the human or traditional authority.

json
Copy code
"author": {
  "id": "prabhupada",
  "name": "A. C. Bhaktivedanta Swami Prabhupāda",
  "tradition": "Gaudiya Vaishnava"
}
4.3 covers (object, required)
Defines the canonical scope covered by this Editorial Unit.

json
Copy code
"covers": {
  "start": "bg.1.16",
  "end": "bg.1.18"
}
Rules:

MUST reference canonical UIDs

MUST resolve via UID_SYSTEM.md

MAY represent a single unit (start = end)

4.4 declares (object, required)
Declares which derivative categories MAY exist for this unit.

json
Copy code
"declares": {
  "synonyms": true,
  "translation": true,
  "exposition": true
}
Rules:

Declaration does NOT imply presence

Actual content lives elsewhere

Absence is allowed

4.5 source (object, required)
Provenance and editorial origin.

json
Copy code
"source": {
  "edition": "Bhagavad-gītā As It Is",
  "publisher": "BBT",
  "year": 1972,
  "derived_from": "vedabase.io"
}
4.6 schema (object, required)
json
Copy code
"schema": {
  "name": "vedic-library.editorial.unit",
  "version": "1.0.0"
}
5. Normative Rules
Canonical units remain verse-atomic

Editorial Units MAY span ranges

Editorial Units NEVER embed content

Derivative files MUST reference Editorial Units

Multiple Editorial Units MAY overlap

Editorial Units are immutable once published

6. Terminology (Locked)
Schema-level term: Exposition

Subtypes (metadata only):

purport

bhāṣya

ṭīkā

vṛtti

vivaraṇa

UI and documentation may use human-friendly labels.
Schema remains neutral.

7. Phase Governance
Phase-2: Schema may exist, content remains unused

Phase-3: Derivative layers attach to Editorial Units

Phase-4+: Knowledge layers may reference Editorial Units

This schema is structural, not expressive.

8. Stability
Changes require:

new schema version, OR

new Editorial Unit UID

Silent mutation is forbidden.

END OF SCHEMA
