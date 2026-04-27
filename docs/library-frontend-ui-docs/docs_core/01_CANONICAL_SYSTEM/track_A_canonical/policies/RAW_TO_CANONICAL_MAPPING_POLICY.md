This is written to be stable for years, readable by a future contributor who knows nothing about your chats, and strict enough that people can follow it almost blindly without corrupting canon.
You can save this as-is under:

docs/architecture/RAW_TO_CANONICAL_MAPPING_POLICY.md

RAW → CANONICAL MAPPING POLICY
Vedic Library Project
Status: LOCKED ARCHITECTURAL CONTRACT Applies From: Phase-2 onward Scope: All śāstra, all sources, all ingestion pipelines

0. Purpose of This Document
This document defines the binding policy governing how raw source material is transformed into canonical units in the Vedic Library.
It answers exactly one question:
How does arbitrary, source-shaped data become canonical śāstric identity?
This document does not define:
* scraping techniques
* normalization algorithms
* schema field definitions
* UI behavior
* interpretation or meaning
Those belong elsewhere.
This document defines mapping law — not implementation.

1. Core Principle (Non-Negotiable)
Raw data preserves provenance. Canonical data preserves identity. The two must never be confused.
Therefore:
* Raw data is never treated as authoritative
* Canonical data is never edited by hand
* Canonical identity never depends on source structure
* Every canonical unit must be derivable from raw data, but never shaped by it

2. Definitions (Normative)
2.1 Raw Data
Raw data is any material obtained directly from an external source, including:
* HTML pages
* TXT files
* MDX files
* PDFs
* OCR output
* Third-party JSON or XML
Raw data characteristics:
* source-shaped
* edition-specific
* may contain noise
* may contain translations or commentary
* may group verses arbitrarily
Raw data is archival, not canonical.

2.2 Canonical Data
Canonical data represents the minimal, authoritative textual identity of a śāstric unit.
Canonical data characteristics:
* schema-validated
* UID-anchored
* language-disciplined
* interpretation-free
* immutable once published
Canonical data is identity, not presentation.

2.3 Mapping
Mapping is the controlled, mechanical process that transforms raw data into canonical units without importing source bias.
Mapping is:
* deterministic
* reproducible
* script-driven
* policy-governed

3. Layer Separation (Strict)
The Vedic Library recognizes the following ingestion layers:

_raw         → archival truth
_normalized  → mechanically cleaned source
_canonical   → authoritative identity
_indexes     → routing and navigation
3.1 Absolute Rule
No file may ever move “backwards” across layers.
Canonical data is never rewritten from normalized data manually. Raw data is never reshaped to “look canonical”.

4. Raw Layer Guarantees
The _raw/ layer guarantees only the following:
* Preservation of original source grouping
* Preservation of original numbering (even if disputed)
* Preservation of provenance metadata
* Zero editorial judgment
The _raw/ layer makes no guarantees about:
* verse correctness
* segmentation accuracy
* canonical boundaries
* numbering agreement across editions

5. Canonical Intake Rules (Binding)
5.1 Canonical Units Are Produced Only by Pipelines
Canonical units:
* MUST be produced by scripts
* MUST validate against canonical schemas
* MUST declare schema version
* MUST declare source provenance
Manual creation or editing of canonical JSON files is forbidden.

5.2 Canonical Units Must Be Unit-Atomic
A canonical unit represents exactly one primary textual unit, such as:
* one verse (śloka)
* one sūtra
* one mantra
* one ritual injunction
* one prose unit (if defined by policy)
Source groupings (e.g. “verses 1–5 together”) must be split unless the śāstra itself defines grouping as canonical.

5.3 Canonical Units Must Be Source-Independent
Canonical structure must not encode:
* website layout
* page numbers
* editorial headings
* HTML structure
* modern chapter titles
Only traditional, text-internal structure is permitted.

6. UID Assignment Rules
6.1 UID Authority
Canonical UIDs are governed exclusively by:
* UID_SYSTEM.md
* corpus-specific UID registries
Raw sources never define UIDs.

6.2 Mapping Constraint
Every canonical unit MUST be traceable to raw data, but:
UIDs are assigned from textual location, not source representation.
If a source combines verses or splits verses incorrectly:
* canonical segmentation prevails
* provenance records disagreement

7. Provenance Requirements (Mandatory)
Every canonical unit MUST include provenance metadata linking it back to raw data.
At minimum:
* source identifier
* pipeline stage
* script name
* raw file reference(s)
Provenance exists to support:
* scholarly audit
* reproducibility
* future re-derivation
Provenance does not confer authority.

8. Mapping Examples (Normative)
8.1 Example: Padma Purāṇa
Raw source structure:

_raw/purana/mahapurana/padma/source-x/
  brahma-khanda/
    adhyaya-01.html
Canonical output:

_canonical/purana/mahapurana/padma/
  brahma-khanda/
    adhyaya-01/
      padma.bk.1.1.json
      padma.bk.1.2.json
      padma.bk.1.3.json
Notes:
* One file per verse
* Canonical filenames follow UID grammar
* Raw HTML is preserved untouched

8.2 Example: Grouped Raw Verses
Raw source:

adhyaya-10.html
  verses 5–8 together
Canonical outcome:

.../adhyaya-10/
  text.10.5.json
  text.10.6.json
  text.10.7.json
  text.10.8.json
Grouping is discarded, not preserved.

9. Forbidden Practices (Critical)
The following are explicitly forbidden:
* ❌ Editing canonical files by hand
* ❌ Importing translations into canonical data
* ❌ Encoding source URLs into UIDs
* ❌ Adjusting raw data to “fit” canonical schema
* ❌ Skipping provenance because source is “trusted”
* ❌ Allowing AI output into canonical layers
Violations invalidate the ingestion.

10. Role of AI (Explicit Boundary)
AI tools (LLMs, OCR, translators):
* MAY assist in raw extraction
* MAY assist in normalization drafts
* MAY assist in editorial layers (Phase-3+)
AI output:
* MUST NOT enter canonical data directly
* MUST NOT influence UID assignment
* MUST NOT override textual uncertainty
Canonical identity remains human-verified.

11. Validation & Enforcement
Validation must ensure:
* canonical schemas validate
* UID correctness
* provenance completeness
* no forbidden fields present
Failures are hard errors, not warnings.

12. Relationship to Other Documents
This policy depends on:
* PROJECT_CONSTITUTION.md
* CANONICAL_TEXT_POLICY.md
* CANONICAL_UNIT_DEFINITION.md
* UID_SYSTEM.md
* NAMING_CONVENTIONS.md
This policy is enforced by:
* PIPELINE_REGISTRY.md
* validators
* ingestion scripts
If conflict arises:
Canonical identity principles override convenience.

13. Stability & Governance
This document is a LOCKED ARCHITECTURAL CONTRACT.
Changes require:
* constitutional review
* version bump
* explicit migration rationale

14. Closing Principle
Raw data remembers where a text came from. Canonical data remembers what the text is.
Confusing the two destroys trust.
This policy exists so that the Vedic Library can grow without forgetting itself.

END OF DOCUMENT

