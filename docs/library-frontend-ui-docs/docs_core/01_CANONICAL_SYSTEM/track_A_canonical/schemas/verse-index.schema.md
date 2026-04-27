# Verse Index Schema
## vedic-library.index.verse @ 1.0.0

---

## 1. Purpose (Normative)

The Verse Index is a **routing and resolution layer** that maps a
single canonical unit to one or more **Editorial Units** that
reference or cover it.

It exists to support:
- navigation
- resolution
- discovery

The Verse Index NEVER stores textual content and NEVER defines meaning.

---

## 2. Conceptual Foundations (Normative)

- Canonical units are atomic and immutable
- Editorial Units may span one or more canonical units
- A canonical unit may belong to multiple Editorial Units
- Editorial Units define meaning; Verse Index only links them

Therefore:

> The Verse Index is a **pure reference map**.

---

## 3. Schema Identity

- **Schema name:** `vedic-library.index.verse`
- **Schema version:** `1.0.0`
- **Granularity:** one file per canonical unit
- **Authority:** non-authoritative (derived)

Verse Index files are safe to delete and regenerate.

---

## 4. Top-Level Structure

```json
{
  "canonical_uid": "string",
  "editorial_unit_refs": [ "string" ],
  "schema": { ... }
}
All top-level fields are required.

5. Field Definitions
5.1 canonical_uid (string, required)
The canonical UID of the unit this index file represents.

Example:

json
Copy code
"canonical_uid": "bg.1.16"
Rules:

MUST be a valid canonical UID

MUST resolve via UID_SYSTEM.md

This UID is the identity of the index file

5.2 editorial_unit_refs (array, required)
A list of Editorial Unit UIDs that cover or reference this canonical unit.

Example:

json
Copy code
"editorial_unit_refs": [
  "eu.bg.1.16-18.prabhupada.v1",
  "eu.bg.1.16-16.shankara.v1"
]
Rules:

MAY be empty

Order is not authoritative

Each UID MUST resolve to an Editorial Unit

Coverage semantics are defined by the Editorial Unit itself

5.3 schema (object, required)
Schema declaration.

json
Copy code
"schema": {
  "name": "vedic-library.index.verse",
  "version": "1.0.0"
}
6. Normative Rules (Strict)
The Verse Index MUST NOT contain:

❌ canonical text
❌ translations
❌ synonyms
❌ commentary
❌ derivative availability
❌ author names
❌ traditions
❌ coverage descriptions

The Verse Index MAY contain:

✔ canonical UID
✔ Editorial Unit UID references

7. Regeneration & Stability
Verse Index files are:

deterministic

reproducible

non-authoritative

They may be regenerated whenever:

Editorial Units change

Canonical units are added

New authors are introduced

Regeneration MUST NOT alter canonical or editorial data.

8. Relationship to Other Documents
This schema depends on:

UID_SYSTEM.md

CANONICAL_UNIT_DEFINITION.md

EDITORIAL_UNIT_DEFINITION.md

This schema supports:

loaders

routing

UI navigation

search indexing (Phase-4+)

If conflict arises, canonical identity always wins.

9. Final Principle
If a Verse Index file feels informative, it is wrong.
If it feels boring, it is correct.

End of Schema
