# Translation Schema
## vedic-library.derivative.translation @ 2.0.0

This document defines the schema for **translation content**
in the Vedic Library.

Translations are **derivative**, **interpretative**, and are
**anchored to Editorial Units**, not directly to canonical verses.

---

## 1. Conceptual Foundation (Normative)

- Canonical Sanskrit verses are **verse-atomic**
- Translations are authored as **editorial thought-units**
- One translation MAY cover:
  - one verse, or
  - multiple verses grouped intentionally by the author

Therefore:

> **Translations belong to Editorial Units.  
> Verses only *participate in* those units.**

---

## 2. Schema Identity

- **Schema name:** `vedic-library.derivative.translation`
- **Schema version:** `2.0.0`
- **Granularity:** one translation per Editorial Unit

---

## 3. Top-Level Structure

```json
{
  "uid": "string",
  "editorial_unit_ref": { ... },
  "translation": { ... },
  "source": { ... },
  "schema": { ... }
}
All top-level fields are required.

4. Field Definitions
4.1 uid (string, required)
Globally unique identifier for this translation instance.

Recommended format:

php-template
Copy code
<editorial-unit-uid>.translation.<language>.<translator-id>
Example:

json
Copy code
"uid": "bg.1.16-18.prabhupada.translation.en"
4.2 editorial_unit_ref (object, required)
Binds this translation to its authorial unit.

json
Copy code
"editorial_unit_ref": {
  "uid": "bg.1.16-18.prabhupada",
  "schema": "vedic-library.editorial.unit",
  "version": "1.0.0"
}
This field is mandatory and replaces direct verse binding.

4.3 translation (object, required)
json
Copy code
"translation": {
  "language": "en",
  "translator": "A. C. Bhaktivedanta Swami Prabhupāda",
  "content": "While watching the soldiers of the Pāṇḍavas…"
}
Rules:

content is plain text

Line breaks are preserved

No Sanskrit text appears here

4.4 source (object, required)
Documents provenance and derivation.

json
Copy code
"source": {
  "edition": "Bhagavad-gītā As It Is",
  "publisher": "BBT",
  "year": 1972,
  "derived_from": "vedabase.io",
  "pipeline_stage": "3.1",
  "script": "s31_extract_translation_prabhupada.py",
  "script_version": "1.1.0"
}
4.5 schema (object, required)
json
Copy code
"schema": {
  "name": "vedic-library.derivative.translation",
  "version": "2.0.0"
}
5. Normative Rules
A Translation MUST reference exactly one Editorial Unit.

A Translation MUST NOT claim ownership of individual verses.

Multiple Translations MAY exist for the same Editorial Unit.

Verse-level access MUST occur via Editorial Unit indirection.

Translations MUST NOT modify or repeat canonical Sanskrit text.

6. Relationship to Other Schemas
Schema	Role
canonical-verse.schema	Defines Sanskrit verse identity
editorial-unit.schema	Defines authored grouping
translation.schema	Defines translation content

This schema is dependent on the Editorial Unit schema.

7. Stability
Once published, translation files are immutable.

Revisions require:

a new translation UID, or

a new schema version

End of Schema
