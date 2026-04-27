🏷️ NAMING CONVENTIONS
Vedic Library Project

Version: 1.0.1  
Status: LOCKED ARCHITECTURAL CONTRACT

---

## 0. Purpose of This Document

This document defines **binding naming conventions** for the Vedic Library.

It governs naming across:

- data/
- docs/
- registry/
- schemas/
- pipelines/
- frontend data loaders

The goal is not aesthetics, but:

**predictability, permanence, and zero ambiguity.**

---

## 1. Core Principle (Non-Negotiable)

> **Names encode role and location — never opinion, workflow, or time.**

Therefore, names MUST NOT encode:

- “final”, “draft”, “latest”
- version numbers (v2, new)
- personal initials
- UI assumptions
- environment or deployment context

Those belong in **git history**, not filenames.

---

## 2. Global Rules (Apply Everywhere)

### 2.1 Character Set

✔ lowercase only  
✔ ASCII only  
✔ digits 0–9  
✔ hyphen `-`  
✔ dot `.` (for UID-like structures)

❌ no spaces  
❌ no diacritics (ā, ī, ṛ, etc.) in filenames  

---

### 2.2 Word Separation

| Context        | Separator |
|---------------|-----------|
| folders       | `-`       |
| filenames     | `-`       |
| UIDs          | `.`       |
| schema names  | `.`       |

---

### 2.3 Reserved Underscore Exception (IMPORTANT)

The underscore `_` is **forbidden in canonical identity and content paths**.

However, it is **explicitly permitted** for **system-reserved internal directories**, such as:

- `_raw/`
- `_archive/`
- `_canonical/`
- `_extended/`
- `_indexes/`

Rules:

- Underscore directories MUST be infrastructure-only
- They MUST NOT encode canonical identity
- They MUST NOT appear in UIDs

This exception is **intentional and locked**.

---

## 3. Directory Naming Rules

### 3.1 Corpus Directories (Fixed Vocabulary)

```text
data/
├── sruti/
├── smrti/
├── itihasa/
├── purana/
├── agama/
├── vedanga/
├── upaveda/
├── darsana/
├── sampradaya/
Rules:

No aliases

No abbreviations

No pluralization drift

Vocabulary is registry-governed

3.2 Internal Structural Directories
Structure reflects textual reality, not UI needs.

Examples:

itihasa/mahabharata/bhisma-parva/

purana/bhagavata/skandha-01/adhyaya-01/

vedanga/vyakarana/astadhyayi/01/

Rules:

Use traditional names

Hyphenate multi-word Sanskrit terms

Numeric ordering MUST be zero-padded (01, 02, …)

4. Canonical Data File Naming
4.1 Canonical Files (All Unit Types)
Canonical filenames are derived from structural location, not language or author.

Example (Bhagavad-gītā):

text
Copy code
bg-2-13.json
Rules:

✔ chapter–verse only
✔ hyphen-separated
✔ no language suffix
✔ no author marker

❌ bg-2-13-en.json
❌ bg-2-13-final.json

Language and interpretation are never canonical.

4.2 UID ↔ Filename Correspondence (Normative)
Canonical filenames MUST be a lossless, reversible transform of canonical UID location.

UID encodes identity

Filename encodes storage location

Neither may encode meaning

5. Extended / Editorial Data Naming
Extended data MUST live in explicit, non-canonical directories.

5.1 Language Axis (Canonical Target)
Preferred structure:

text
Copy code
translations/en/bg-2-13.json
translations/hi/bg-2-13.json
Rules:

Language is context, not identity

UID remains stable

Filenames remain predictable

5.2 Transitional Language Collapse (Phase-Aware)
During Phase-1 and early Phase-2, language directories MAY be physically collapsed
(as documented in PIPELINE_REGISTRY.md).

Rules:

Collapse is temporary and explicit

Migration requires scripts + registry update + version bump

Existing files MUST NOT be renamed ad-hoc

5.3 Commentary / Exposition Naming
text
Copy code
commentary/prabhupada/en/bg-2-13.json
commentary/shankara/sa/bg-2-13.json
Rules:

Author as directory

Language as directory

Filename = referenced canonical unit

6. Schema Naming Rules
6.1 Schema Filenames
text
Copy code
canonical-verse.schema.md
canonical-sutra.schema.md
editorial-unit.schema.md
Rules:

singular

kebab-case

role-first naming

6.2 Schema Identity Inside Files
json
Copy code
{
  "schema": {
    "name": "vedic-library.canonical.verse",
    "version": "1.0.0"
  }
}
Rules:

dot-namespaced

versioned

immutable once locked

7. Document Naming (docs/)
7.1 Architectural & Constitutional Documents
text
Copy code
CANONICAL_TEXT_POLICY.md
UID_SYSTEM.md
NAMING_CONVENTIONS.md
Rules:

UPPERCASE

underscore-separated

conceptual nouns only

8. JSON Field Naming Rules
✔ snake_case
✔ lowercase
✔ no ambiguous abbreviations

Example:

json
Copy code
{
  "review_status": "unreviewed",
  "confidence": "high"
}
Forbidden:

❌ lang → use language
❌ txt → use text
❌ id → use uid

9. Language Codes
Language codes follow ISO-639-1 / community standards.

Examples:

Language	Code
Sanskrit	sa
English	en
Hindi	hi
Bengali	bn
Tamil	ta

Rules:

Language NEVER encoded in UID

Language NEVER embedded in canonical filenames

10. Explicitly Forbidden (Critical)
❌ _final, _latest, _new
❌ .bak, .old
❌ mixed casing
❌ personal initials
❌ UI-driven names (homepage.json)
❌ environment names (prod, test)

These destroy archival clarity.

11. Validation & Enforcement
Automated checks MUST ensure:

filename ↔ UID correspondence

language appears only in directories

canonical files have no language marker

registry vocabulary is respected

Violations are hard failures, not warnings.

12. Closing Principle
A name is not a label.
It is a promise to the future.

This document exists to keep that promise.
