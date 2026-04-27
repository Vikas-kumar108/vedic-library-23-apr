# Synonyms (Word-for-Word) Schema
## vedic-library.derivative.synonyms @ 1.0.0

This document defines the schema for **word-for-word explanations**
(synonyms / padaccheda / śabda-artha) in the Vedic Library.

Synonyms are **derivative**, **interpretative**, and are
**anchored to Editorial Units**, not directly to canonical verses.

---

## 1. Conceptual Foundation (Normative)

- Sanskrit word-for-word explanations are authored as **expository units**
- They may span:
  - one verse, or
  - multiple verses grouped by the author
- They MUST preserve Sanskrit lexical order as presented by the author

Therefore:

> **Synonyms belong to Editorial Units.  
> Verses only participate in those units.**

---

## 2. Schema Identity

- **Schema name:** `vedic-library.derivative.synonyms`
- **Schema version:** `1.0.0`
- **Granularity:** one synonym set per Editorial Unit

---

## 3. Top-Level Structure

```json
{
  "uid": "string",
  "editorial_unit_ref": { ... },
  "synonyms": [ ... ],
  "source": { ... },
  "schema": { ... }
}
All top-level fields are required.

4. Field Definitions
4.1 uid (string, required)
Globally unique identifier for this synonym set.

Recommended format:

php-template
Copy code
<editorial-unit-uid>.synonyms.<language>.<author-id>
Example:

json
Copy code
"uid": "bg.1.16-18.prabhupada.synonyms.en"
4.2 editorial_unit_ref (object, required)
Binds this synonym set to an Editorial Unit.

json
Copy code
"editorial_unit_ref": {
  "uid": "bg.1.16-18.prabhupada",
  "schema": "vedic-library.editorial.unit",
  "version": "1.0.0"
}
4.3 synonyms (array, required)
An ordered list of Sanskrit terms with their explanations.

json
Copy code
"synonyms": [
  {
    "sanskrit": "ananta-vijayam",
    "meaning": "the conch named Ananta-vijaya"
  },
  {
    "sanskrit": "rājā",
    "meaning": "the king"
  }
]
Rules:
Order MUST follow authorial presentation

Sanskrit terms may be:

IAST

Devanāgarī

or mixed (as per source)

Meanings are plain text (language defined in source)

4.4 source (object, required)
Documents provenance.

json
Copy code
"source": {
  "edition": "Bhagavad-gītā As It Is",
  "publisher": "BBT",
  "year": 1972,
  "derived_from": "vedabase.io",
  "pipeline_stage": "3.x",
  "script": "s3x_extract_synonyms_prabhupada.py",
  "script_version": "1.0.0"
}
4.5 schema (object, required)
json
Copy code
"schema": {
  "name": "vedic-library.derivative.synonyms",
  "version": "1.0.0"
}
5. Normative Rules
Synonyms MUST reference exactly one Editorial Unit.

Synonyms MUST NOT be split artificially per verse.

Ordering MUST follow the author’s presentation.

Meanings MUST remain interpretative and derivative.

Canonical Sanskrit MUST NOT be duplicated here.

6. Relationship to Other Schemas
Schema	Role
canonical-verse.schema	Defines Sanskrit verse text
editorial-unit.schema	Defines authored grouping
translation.schema	Defines translation content
synonyms.schema	Defines word-for-word explanation

This schema is parallel to Translation and Exposition schemas.

7. Stability
Once published, synonym files are immutable.

Revisions require:

a new synonym UID, or

a new schema version

End of Schema
