CANONICAL INGESTION PROJECT STANDARD
Vedic Library Project
Status: LOCKED ARCHITECTURAL STANDARD Applies To: All Phase-2+ ingestion sub-projects Audience: Maintainers, contributors, pipeline authors

0. Purpose of This Document
This document defines the mandatory project-level standard for any canonical ingestion effort within the Vedic Library.
It answers:
What does a “proper canonical ingestion project” look like from start to finish?
This document governs:
* folder structure
* script sequencing
* data flow
* naming discipline
* phase boundaries
* human vs machine responsibility
This document does not define:
* text-specific rules (e.g., Purāṇa vs Sūtra)
* schema field definitions
* UI behavior
* interpretation or commentary
It defines project discipline, not textual theory.

This document is written so that:

you can hand it to a future contributor and say “follow this blindly”

multiple parallel ingestion projects (Padma-Purāṇa, Yoga-Sūtra, Manu-Smṛti, etc.) stay structurally identical

raw scraping chaos never leaks into canonical identity

Phase-2 scale (20–30 śāstra) remains calm and controlled
1. Core Principle (Non-Negotiable)
Every śāstra ingestion is a miniature version of the whole Vedic Library.
Therefore:
* each ingestion project mirrors the global architecture
* no ad-hoc scripts
* no custom shortcuts
* no one-off folder logic
If a method cannot scale to all śāstra, it is forbidden.

2. Canonical Ingestion Project Definition
A Canonical Ingestion Project (CIP) is a self-contained workflow that:
1. acquires raw textual material
2. preserves provenance
3. normalizes mechanically
4. maps text to canonical units
5. outputs schema-validated canonical data
6. integrates cleanly into the main corpus
Each CIP must be:
* reproducible
* auditable
* script-driven
* policy-aligned

3. Mandatory Project Root Structure
Every ingestion project MUST follow this structure:

<ingestion-project-root>/
├── README.md
├── requirements.txt
│
├── config/
│   ├── sources.yaml
│   ├── selectors.yaml
│   ├── normalization.yaml
│
├── scripts/
│   ├── 00_validate_environment.py
│   ├── 01_fetch_sources.py
│   ├── 02_fetch_units.py
│   ├── 03_extract_raw_text.py
│   ├── 04_normalize_text.py
│   ├── 05_split_canonical_units.py
│   ├── 06_assign_uids.py
│   ├── 07_emit_canonical_json.py
│   └── 08_validate_output.py
│
├── data/
│   ├── 00_index/
│   ├── 01_raw/
│   ├── 02_extracted/
│   ├── 03_normalized/
│   └── 04_canonical/
│
├── logs/
│   └── ingestion.log
│
└── reports/
    ├── coverage_report.json
    ├── anomaly_report.json
    └── ingestion_summary.md
No files may be skipped. No stages may be merged.

4. Folder Responsibilities (Strict)
4.1 config/
Contains all text-specific variability.
Rules:
* no hard-coded URLs in scripts
* no hard-coded CSS selectors
* no hard-coded normalization rules
If the source website changes, only config files change.

4.2 scripts/
Scripts are:
* sequential
* single-purpose
* deterministic
Rules:
* one responsibility per script
* no script writes outside its designated output layer
* scripts never overwrite earlier layers
Scripts MUST be numbered and executed in order.

4.3 data/
Data layers are immutable once written.
Layer meaning:
Layer	Meaning
00_index	Structural map of text
01_raw	Untouched source data
02_extracted	Parsed but uncleaned
03_normalized	Mechanically cleaned
04_canonical	Schema-validated identity
Backward movement between layers is forbidden.

5. Naming Discipline (Mandatory)
All ingestion projects MUST comply with:
* NAMING_CONVENTIONS.md
* UID grammar rules
* corpus directory vocabulary
Violations are hard failures, not warnings.

6. Canonical Mapping Rules
Canonical output MUST:
* follow canonical schemas
* contain exactly one canonical unit per file
* declare schema name and version
* include provenance metadata
* exclude translations, commentary, AI output
Canonical files are never edited manually.

7. UID Assignment Discipline
UIDs:
* are assigned during script stage 06_assign_uids.py
* derive from textual location only
* never encode language, edition, author, or source
UID registries are consulted, not invented.

8. Validation Requirements
Every ingestion project MUST pass:
* schema validation
* UID validation
* policy validation
* coverage completeness check
No partial ingestion may be merged into the main corpus.

9. Documentation Requirements (Mandatory)
Each CIP MUST produce:
9.1 README.md
Explains:
* what text is being ingested
* edition/source used
* scope boundaries
* known limitations

9.2 Ingestion Summary
Located at:

reports/ingestion_summary.md
Must state:
* total units ingested
* missing or disputed sections
* editorial uncertainties
* readiness for canonical merge

10. Human vs Machine Responsibility
Task	Responsibility
scraping	machine
normalization	machine
UID assignment	machine
anomaly detection	machine
boundary decisions	human
canonical approval	human
Canonical identity is never delegated to AI judgment.

11. Parallelization Policy
Phase-2 ingestion MAY be parallelized:
* one CIP per śāstra
* one chat thread per CIP
* shared architectural contracts only
Parallel projects MUST:
* not modify shared architecture docs
* not redefine schemas
* not invent new conventions

12. Integration into Main Repository
Canonical output is merged only when:
* validation passes
* reports are reviewed
* coverage is complete
* conflicts are resolved explicitly
Partial merges are forbidden.

13. Relationship to Other Documents
This standard depends on:
* PROJECT_CONSTITUTION.md
* RAW_TO_CANONICAL_MAPPING_POLICY.md
* CANONICAL_TEXT_POLICY.md
* UID_SYSTEM.md
* PIPELINE_REGISTRY.md
This standard governs:
* all Phase-2 ingestion work
* all future corpus expansion

14. Stability & Governance
This document is LOCKED.
Changes require:
* constitutional amendment
* cross-document review
* version bump

15. Closing Principle
A canonical ingestion project is not a script. It is a vow.
Once a text enters the canon, it speaks for centuries.
This standard exists so that when it speaks, it speaks clearly, calmly, and without confusion.

END OF DOCUMENT

