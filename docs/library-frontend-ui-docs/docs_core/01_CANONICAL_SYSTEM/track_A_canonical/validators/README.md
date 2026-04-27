# Validators Registry
## Vedic Library — Phase 0

This document lists all **data validators** implemented in Phase 0 and defines
their scope, authority, and usage rules.

Validators ensure **structural integrity**, not interpretive correctness.

---

## 1. Purpose

Validators exist to guarantee that:

- data conforms to its declared schema
- layers do not leak responsibilities
- pipelines can be safely regenerated
- future contributors do not violate invariants

All validators are **deterministic**, **idempotent**, and **read-only**.

---

## 2. Validator Location

scripts/validators/

yaml
Copy code

Each validator corresponds to **exactly one schema**.

---

## 3. Canonical Validators

### 3.1 Canonical Verse Validator

**Script**
validate_canonical_verse.py

markdown
Copy code

**Validates**
- `vedic-library.canonical.verse @ 1.0.0`

**Checks**
- required fields present
- Devanāgarī and IAST text
- UID correctness
- schema metadata integrity

**Notes**
- Canonical verses are immutable
- Validation failure is **fatal**

---

## 4. Editorial Layer Validators

### 4.1 Editorial Unit Validator

**Script**
validate_editorial_unit.py

markdown
Copy code

**Validates**
- `vedic-library.editorial.unit @ 1.0.0`

**Checks**
- verse coverage consistency
- author and tradition metadata
- derivative references
- scope flags (`has_translation`, etc.)

---

## 5. Derivative Validators

### 5.1 Translation Validator

**Script**
validate_translation.py

markdown
Copy code

**Validates**
- `vedic-library.translation`

**Checks**
- editorial unit reference
- language code
- author attribution
- content presence

---

### 5.2 Synonyms Validator

**Script**
validate_synonyms.py

markdown
Copy code

**Validates**
- `vedic-library.synonyms`

**Checks**
- word-for-word structure
- Sanskrit term integrity
- meaning presence
- editorial unit linkage

---

### 5.3 Exposition Validator

**Script**
validate_exposition.py

markdown
Copy code

**Validates**
- `vedic-library.exposition`

**Checks**
- purport/commentary presence
- language and author
- editorial unit reference
- correct handling of absence

---

## 6. Index Validators

### 6.1 Verse Index Validator

**Script**
validate_verse_index.py

yaml
Copy code

**Validates**
- `vedic-library.index.verse @ 1.0.0`

**Checks**
- verse → editorial unit mapping
- canonical reference integrity
- derivative availability flags

**Notes**
- Verse Index is a routing layer only
- No content validation occurs here

---

## 7. General Rules

- Validators MUST NOT mutate data
- Validators MUST NOT auto-fix data
- Validators MAY be safely re-run
- Validators MUST fail loudly on schema violations

---

## 8. Phase Status

All validators listed here are:

- implemented
- tested
- passing on current corpus
- considered **stable**

---

**End of Validators Registry**
