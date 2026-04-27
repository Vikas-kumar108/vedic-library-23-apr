# ✅ Phase 1 Tasklist – Bhagavad-gītā Pilot (Frontend)

Phase 1 is about building a **faithful, readable, Vedabase-style Bhagavad-gītā library**
using **Next.js + React**, powered by **JSON data**.

No users.
No backend APIs.
No AI calls.
No database.

Only **reading, structure, and correctness**.

---

## 🎯 Phase 1 Goal

By the end of Phase 1, you will have:

- A working Next.js application
- Bhagavad-gītā verse pages (`/bg/1/1`, `/bg/2/13`, etc.)
- Vedabase-style content order
- English + Hindi language toggle
- Clean React component structure
- JSON-driven rendering
- Stable, reviewable pilot version

---

## 🧱 Phase 1 Entry Criteria (ALL REQUIRED)

Before starting Phase 1, confirm:

- [ ] Phase 0 completed
- [ ] UID system finalized (`bg.x.y`)
- [ ] Canonical & extended JSON ready
- [ ] `frontend/` Next.js app created
- [ ] First test verse page working

If any item is unchecked → STOP.

---

## 📁 Step 1 – Frontend Folder Sanity Check

Verify structure:

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── bg/
│   │       └── [chapter]/
│   │           └── [verse]/
│   │               └── page.tsx
│   ├── data/
│   ├── components/
│   └── lib/
✔ Completion check:

 Folder structure matches plan

 No extra files created

🧩 Step 2 – Create Core React Components
Create the following components:

text
Copy code
src/components/verse/
├── Sloka.tsx
├── Transliteration.tsx
├── Synonyms.tsx
├── Translation.tsx
└── Purport.tsx
Each component must:

Accept props only

Render text only

Contain no routing logic

Contain no data loading

✔ Completion check:

 Components exist

 Each has single responsibility

🧠 Step 3 – Create Data Loading Helpers
Inside src/lib/ create:

loadVerse.ts

uid.ts

languages.ts

Responsibilities:

Convert route params → UID

Load JSON by UID

Provide supported language list

✔ Completion check:

 No React code in lib/

 Helpers return plain data

📄 Step 4 – Replace Test JSON with Real Data
For BG 1.1:

Load canonical JSON

Load extended JSON (synonyms, translation, purport)

Combine them only in memory (not in files)

Rules:

Canonical files untouched

Extended files referenced by UID

✔ Completion check:

 No merged files saved permanently

 UID used everywhere

📜 Step 5 – Implement Vedabase-Style Verse Layout
On verse page, ensure exact order:

Verse Header (BG X.Y)

Sanskrit Śloka (Devanāgarī)

Transliteration (IAST)

Word-by-word Synonyms

Translation

Purport

✔ Completion check:

 Order matches Vedabase

 No missing section

🌐 Step 6 – Language Toggle (English ↔ Hindi)
Implement:

Language toggle UI

Default language: English

Hindi support for:

Translation

Synonyms (if available)

Purport

Rules:

Same page URL

No duplicated routes

Language stored in UI state only

✔ Completion check:

 Toggle works

 English ↔ Hindi switches correctly

🧪 Step 7 – Test Multiple Verses
Manually test at least:

BG 1.1

BG 2.13

BG 4.7

BG 18.66

✔ Completion check:

 Correct verse loads

 UID mapping correct

 No hard-coded verse data

🎨 Step 8 – Minimal Styling (Readability Only)
Allowed:

Line height

Font size

Spacing

Section separators

Not allowed:

Animations

Themes

Visual distractions

✔ Completion check:

 Text readable

 Clean, calm UI

🚫 Step 9 – Explicitly Excluded (DO NOT ADD)
❌ User login
❌ Donations
❌ Backend API
❌ AI translation calls
❌ Database
❌ Search

If tempted → stop and re-read constitution.

🟢 Phase 1 Exit Criteria (ALL REQUIRED)
You may complete Phase 1 only if:

 Bhagavad-gītā renders correctly

 Multiple verses work

 Language toggle stable

 Code is readable

 JSON structure respected

 No feature creep

📦 Phase 1 Deliverable
Working local Next.js app

Read-only Bhagavad-gītā library

English + Hindi

Version tag: v1.0-pilot

➡️ What Comes Next (Phase 2 Preview)
Phase 2 – Multi-Ācārya Commentary

Multiple commentary layers

Commentary toggles

Commentary metadata

No users yet

Do NOT start Phase 2 until Phase 1 is stable.

🕉️ Guiding Reminder
Faithful reading is the foundation of faithful understanding.
Phase 1 exists to protect that reading.
