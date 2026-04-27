1️⃣ data/ — Canonical & Derivative Content (Expanded in Phase-2)
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
│
├── _canonical/
│   ├── verse/
│   ├── sutra/
│   ├── mantra/
│   └── ritual-unit/
│
├── _extended/
│   ├── translation/
│   ├── synonyms/
│   └── commentary/        # remains EMPTY in Phase-2
│
└── _indexes/
    ├── verse-index.json
    ├── sutra-index.json
    └── mantra-index.json

🔒 Rules

_canonical/ contains only canonical units

_extended/ exists but is mostly dormant in Phase-2

_indexes/ are machine-generated, never hand-edited

2️⃣ docs/ — Architectural Authority (Major Phase-2 Growth)
docs/
├── constitution/
│   ├── PROJECT_CONSTITUTION.md
│   ├── CANONICAL_IDENTITY_PRINCIPLES.md
│   └── CANONICAL_TEXT_POLICY.md
│
├── architecture/
│   ├── UID_SYSTEM.md
│   ├── UID_REFINEMENT_RULES.md
│   ├── CANONICAL_UNIT_DEFINITION.md
│   ├── SCHEMA_OPTIONALITY_RULES.md
│   ├── DATA_SCHEMA.md
│   ├── DATA_LOADING_ABSTRACTION_STRATEGY.md
│   ├── NAMING_CONVENTIONS.md
│   ├── VERSE_REFERENCE_CONTRACT.md
│   ├── CANONICAL_INTAKE_AND_NORMALIZATION.md
│   └── SEMANTIC_DERIVATION_POLICY.md
│
├── schemas/
│   ├── canonical-verse.schema.md
│   ├── canonical-sutra.schema.md
│   ├── canonical-mantra.schema.md
│   ├── canonical-ritual-unit.schema.md
│   └── canonical-lexeme.schema.md
│
├── phases/
│   ├── phase-1/
│   │   └── (LOCKED — historical)
│   └── phase-2/
│       ├── PHASE_2_MASTER_PLAN.md
│       ├── PHASE_2_TASKLIST.md
│       └── PHASE_2_STATUS.md
│
└── ui-ux/
    └── snapshots/
        ├── PHASE_1_UI_SNAPSHOT.md   # locked
        └── PHASE_2_UI_SNAPSHOT.md   # descriptive later

🔒 Rules

constitution/ = philosophical + binding

architecture/ = technical + enforceable

schemas/ = machine-readable contracts

phases/ = historical record + planning

No phase edits old phase docs

3️⃣ registry/ — UID & Canonical Registries (Core to Phase-2)
registry/
├── UID_REGISTRY.json
│
├── sruti/
│   └── UID_REGISTRY_SRUTI.json
├── smrti/
│   ├── UID_REGISTRY_SMRITI.json
│   ├── UID_REGISTRY_SMRITI_DHARMA.json
│   ├── UID_REGISTRY_SMRITI_KAMA.json
│   ├── UID_REGISTRY_SMRITI_NITI.json
│   └── UID_REGISTRY_SMRITI_ARTHA.json
├── itihasa/
│   └── UID_REGISTRY_ITIHASA.json
├── purana/
│   └── UID_REGISTRY_PURANA.json
├── agama/
│   └── UID_REGISTRY_AGAMA.json
├── vedanga/
│   └── UID_REGISTRY_VEDANGA.json
├── upaveda/
│   └── UID_REGISTRY_UPAVEDA.json
├── darsana/
│   └── UID_REGISTRY_DARSANA.json
└── sampradaya/
    └── UID_REGISTRY_GAUDIYA.json

🔒 Rules

Registries are LOCKED once published

Changes require:

version bump

written rationale

Registry ≠ schema ≠ data

4️⃣ scripts/ — Canonical Intake & Validation (Phase-2 Critical)
scripts/
├── intake/
│   ├── normalize_devanagari.py
│   ├── generate_iast.py
│   ├── apply_verse_markers.py
│   └── split_canonical_units.py
│
├── validate/
│   ├── validate_uid.py
│   ├── validate_schema.py
│   └── validate_canonical_policy.py
│
└── build/
    ├── generate_indexes.py
    └── verify_integrity.py

🔒 Rules

Scripts are mechanical only

No interpretation

No “smart guessing”

Every transformation must be reproducible

5️⃣ frontend/ — Minimal Change in Phase-2
frontend/
├── src/
│   ├── app/
│   │   ├── bg/              # Phase-1 intact
│   │   ├── texts/           # Phase-2 multi-śāstra entry
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── CanonicalUnit.tsx
│   │   ├── VerseRenderer.tsx
│   │   ├── SutraRenderer.tsx
│   │   ├── MantraRenderer.tsx
│   │   └── UnitNavigation.tsx
│   │
│   └── lib/
│       ├── loadCanonicalUnit.ts
│       └── uidResolver.ts

🔒 Rules

UI still reader-first

No commentary toggles

No knowledge overlays

No personalization

🚫 What Phase-2 Explicitly Does NOT Add

❌ Commentary rendering
❌ Teaching / knowledge layers
❌ Entity graphs
❌ Search or filters
❌ Auth / donations
❌ AI involvement

Those belong to Phase-3+

✅ Phase-2 Folder Structure Status

Phase-1: Locked

Phase-2: Canonical expansion

Phase-3: Interpretive layers begin

This structure will not need to be reorganized again — only extended.
