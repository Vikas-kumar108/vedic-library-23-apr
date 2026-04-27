# ✅ Phase 2 Tasklist – Multi-Ācārya Commentary Layer

Phase 2 builds on the **completed and frozen Phase 1 (v1.0-pilot)**.

If Phase 1 established **faithful reading**,  
Phase 2 establishes **faithful comparison**.

This phase introduces **multiple traditional commentaries** on the Bhagavad-gītā,
without altering the reading experience, architecture, or discipline of Phase 1.

---

## 🎯 Phase 2 Goal

By the end of Phase 2, the Vedic Library will:

- Support multiple ācārya commentaries per verse
- Allow calm selection of one commentary at a time
- Preserve canonical primacy
- Maintain Phase 1 stability unchanged
- Remain read-only and non-commercial

---

## 🧱 Phase 2 Entry Criteria (ALL REQUIRED)

You may begin Phase 2 only if:

- [ ] Phase 1 formally declared COMPLETE
- [ ] Version tagged `v1.0-pilot`
- [ ] Phase 1 code frozen (no refactors)
- [ ] Phase 2 overview, schema, and UI behavior documents read fully

If any box is unchecked → STOP.

---

## 📁 Step 1 – Prepare Commentary Folder Structure

Create (if not already present):

```text
data/bhagavad-gita/commentaries/
├── prabhupada/
├── shankara/
├── ramanuja/
└── madhva/
Inside each ācārya folder:

Create language folders (en/, hi/ as available)

✔ Completion check:

 Folder names are stable IDs

 No mixing of languages or ācāryas

📄 Step 2 – Create Commentary JSON Files (Limited Set)
For initial Phase 2 validation, prepare commentary files for:

BG 1.1

BG 2.13

BG 4.7

BG 18.66

For each verse:

One file per ācārya

One language per file

Schema strictly follows PHASE_2_COMMENTARY_DATA_SCHEMA.md

✔ Completion check:

 UID matches filename

 Ācārya attribution correct

 No canonical text included

 AI-assisted content clearly marked

🧠 Step 3 – Decide Data Source Strategy (MANDATORY DECISION)
Before coding, decide:

 Option A: JSON-only (frontend loads commentary JSON)

 Option B: Backend-assisted (FastAPI aggregates commentary)

⚠️ Once chosen, do not mix approaches in Phase 2.

Recommended default:

Option A (JSON-only) for early Phase 2

🧩 Step 4 – Extend Data Loading Abstraction
Modify (or extend):

bash
Copy code
frontend/src/lib/loadVerse.ts
Responsibilities now include:

Load canonical verse

Load translations

Load available commentaries (by UID)

Return unified data object

Rules:

No UI logic

No commentary selection logic

No hard-coded ācārya assumptions

✔ Completion check:

 Same function signature used everywhere

 Phase 1 pages still work unchanged

🪟 Step 5 – Implement Commentary Selector UI (Behavior Only)
Implement UI strictly following:

COMMENTARY_TOGGLE_UI_BEHAVIOR.md

Requirements:

One commentary visible at a time

Default = Prabhupāda

Selector placed above commentary text

Selector does not affect URL

✔ Completion check:

 Selector intuitive

 No visual noise

 No comparison views

📜 Step 6 – Render Selected Commentary
Render commentary using:

Same layout space as Phase 1 purport

Clear attribution (ācārya + sampradāya)

Subtle metadata display

Rules:

Commentary text only

No highlighting differences

No editorial overlays

✔ Completion check:

 Attribution visible

 Text readable

 Canonical sections unchanged

🌐 Step 7 – Language Interaction Validation
Test combinations:

English + Prabhupāda

Hindi + Prabhupāda

English + Śaṅkara

Commentary with missing Hindi → fallback to English

✔ Completion check:

 No crashes

 Fallback behavior correct

 Language toggle independent of commentary toggle

🔁 Step 8 – Navigation Stability Check
Verify that:

Previous / Next navigation still works

Commentary selection resets per verse

No state leaks across verses

✔ Completion check:

 Navigation untouched

 Phase 1 behavior preserved

🧪 Step 9 – Manual Multi-Verse Testing
Manually test:

BG 1.1 (all available ācāryas)

BG 2.13

BG 4.7

BG 18.66

Check for:

Correct commentary loaded

Correct attribution

Calm reading experience

✔ Completion check:

 No layout breaks

 No incorrect mixing

 No UI confusion

🚫 Step 10 – Explicitly Forbidden in Phase 2
If any of these appear, Phase 2 is invalid:

❌ User accounts
❌ Donations
❌ Search
❌ AI-generated commentary
❌ Side-by-side comparisons
❌ Commentary ranking
❌ Highlighted disagreements

🟢 Phase 2 Exit Criteria (ALL MUST BE TRUE)
Phase 2 may be declared complete only if:

 Multiple ācārya commentaries supported

 Commentary toggle stable and calm

 Attribution always clear

 Phase 1 reading experience unchanged

 JSON and UID discipline preserved

 No scope violations

📦 Phase 2 Deliverable
A multi-commentary Bhagavad-gītā reader that allows
respectful exploration of traditional explanations
without forcing interpretation or comparison.

🕉️ Phase 2 Closing Reminder
Phase 2 is not about deciding who is right.
It is about allowing each voice to be heard clearly.

