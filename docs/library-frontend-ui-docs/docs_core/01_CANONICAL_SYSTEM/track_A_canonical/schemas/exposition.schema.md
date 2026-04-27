# Exposition Schema
## vedic-library.derivative.exposition @ 1.0.0

This document defines the schema for **expository material**
in the Vedic Library, including:

- Purports
- Bhāṣyas
- Ṭīkās
- Vivaraṇas
- Other authored explanations

Expositions are **derivative**, **interpretative**, and are
**anchored to Editorial Units**, not directly to canonical verses.

---

## 1. Conceptual Foundation (Normative)

- Expositions represent **authorial explanation**
- They are written as **semantic units**, not verse-atomic units
- One exposition MAY cover:
  - one verse, or
  - multiple verses grouped intentionally by the author

Therefore:

> **Expositions belong to Editorial Units.  
> Verses only participate in those units.**

---

## 2. Schema Identity

- **Schema name:** `vedic-library.derivative.exposition`
- **Schema version:** `1.0.0`
- **Granularity:** one exposition per Editorial Unit

---

## 3. Top-Level Structure

```json
{
  "uid": "string",
  "editorial_unit_ref": { ... },
  "exposition": { ... },
  "source": { ... },
  "schema": { ... }
}
All top-level fields are required.

4. Field Definitions
4.1 uid (string, required)
Globally unique identifier for this exposition instance.

Recommended format:

php-template
Copy code
<editorial-unit-uid>.exposition.<author-id>
Example:

json
Copy code
"uid": "bg.1.16-18.prabhupada.exposition"
4.2 editorial_unit_ref (object, required)
Binds this exposition to an Editorial Unit.

json
Copy code
"editorial_unit_ref": {
  "uid": "bg.1.16-18.prabhupada",
  "schema": "vedic-library.editorial.unit",
  "version": "1.0.0"
}
4.3 exposition (object, required)
json
Copy code
"exposition": {
  "type": "purport",
  "author": "A. C. Bhaktivedanta Swami Prabhupāda",
  "language": "en",
  "content": "Dhṛtarāṣṭra was blind from birth..."
}
type (string, required)
One of (non-exhaustive, extensible):

purport

bhāṣya

ṭīkā

vivaraṇa

commentary

explanatory-note

This field preserves traditional naming without hard-coding it into the schema name.

4.4 source (object, required)
Documents provenance and derivation.

json
Copy code
"source": {
  "edition": "Bhagavad-gītā As It Is",
  "publisher": "BBT",
  "year": 1972,
  "derived_from": "vedabase.io",
  "pipeline_stage": "3.x",
  "script": "s3x_extract_exposition_prabhupada.py",
  "script_version": "1.0.0"
}
4.5 schema (object, required)
json
Copy code
"schema": {
  "name": "vedic-library.derivative.exposition",
  "version": "1.0.0"
}
5. Normative Rules
An Exposition MUST reference exactly one Editorial Unit.

An Exposition MUST NOT be split artificially per verse.

Exposition content is free-form prose.

Canonical Sanskrit MUST NOT be duplicated here.

Multiple Expositions MAY exist for the same Editorial Unit (different authors).

6. Relationship to Other Schemas
Schema	Role
canonical-verse.schema	Sanskrit verse text
editorial-unit.schema	Authored grouping
translation.schema	Translation content
synonyms.schema	Word-for-word explanations
exposition.schema	Authorial explanation

All three derivative schemas attach to Editorial Units.

7. Stability
Once published, exposition files are immutable.

Revisions require:

a new exposition UID, or

a new schema version

End of Schema
