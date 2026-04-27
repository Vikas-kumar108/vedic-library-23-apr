# ✅ Phase 0 Tasklist – Foundation & Readiness

Phase 0 is about **preparing the ground**.  
No frontend. No backend. No AI. No users.

Only **structure, clarity, and safety**.

You must complete Phase 0 **fully** before starting Phase 1.

---

## 🎯 Phase 0 Goal

By the end of Phase 0, you should have:

- A stable project root
- A fixed UID system
- Clean Bhagavad-gītā JSON
- Clear documentation
- Zero confusion about “what comes next”

If anything feels rushed, stop.

---

## 🧱 Step 1 – Lock the Project Root

### Task
- Confirm this folder exists:

```text
P Publications/vedic-library/
Verify
All work happens inside this folder

No code or data outside this root

✔ Completion check:

 Root folder exists

 You open this folder in VS Code

📁 Step 2 – Verify Folder Structure
Ensure the following folders exist:

text
Copy code
vedic-library/
├── docs/
├── data/
│   └── bhagavad-gita/
│       ├── canonical/
│       ├── translations/
│       │   ├── en/
│       │   └── hi/
│       └── commentaries/
├── frontend/
├── backend/
├── scripts/
└── README.md
✔ Completion check:

 All folders exist

 No extra folders added

📜 Step 3 – Place Constitution Files
Ensure these files exist inside docs/:

PROJECT_CONSTITUTION.md

TECH_STACK.md

INSTALLATION_GUIDE.md

FRONTEND_STRUCTURE.md

BACKEND_STRUCTURE.md

DATA_SCHEMA.md

PHASES.md

✔ Completion check:

 All documents present

 You have read them once fully

🧱 Step 4 – Confirm UID System Understanding
Task
Read UID_SYSTEM.md or UID section in DATA_SCHEMA.md

You must be able to answer:
What is a UID?

Why does it never change?

Why it must not contain language or author?

✔ Completion check:

 You can explain UID in one sentence

 You accept UID as “law”

🗃️ Step 5 – Prepare Raw Bhagavad-gītā JSON
Task
Place your scraped JSON files in a temporary folder:

text
Copy code
data/bhagavad-gita/raw/
Do NOT modify them yet.

✔ Completion check:

 Raw data safely stored

 No editing done

🧹 Step 6 – Normalize Canonical Data
Task
For each verse:

Create one canonical JSON file

Follow the schema in DATA_SCHEMA.md

Generate UID like bg.1.1

File example:
text
Copy code
data/bhagavad-gita/canonical/bg-1-1.json
✔ Completion check:

 UID added

 Sanskrit Devanāgarī correct

 IAST present

 No translation included

📦 Step 7 – Separate Extended Data
For each verse, ensure separate files for:

Word-by-word synonyms

English translation

English purport

Hindi translation (if exists)

Hindi purport (if exists)

✔ Completion check:

 No mixing of layers

 All extended files reference UID

 AI content marked clearly

🔍 Step 8 – Spot Check 5 Verses
Manually verify at least 5 verses:

BG 1.1

BG 2.13

BG 2.20

BG 4.7

BG 18.66

✔ Completion check:

 UID correct

 Sanskrit accurate

 No data loss

 File names match UID

🧪 Step 9 – Validate Consistency
Ask yourself:

Can I delete the frontend and still understand the data?

Can another person read JSON and know what it means?

✔ Completion check:

 JSON is human-readable

 Schema followed everywhere

🧘 Step 10 – Mental Checkpoint (Very Important)
Before moving to Phase 1, confirm:

 I am not rushing

 I am not thinking about UI yet

 I am not thinking about users yet

 I am confident in data structure

If any answer is “no”, pause here.

🟢 Phase 0 Exit Criteria (ALL REQUIRED)
You may move to Phase 1 only if:

 Canonical Bhagavad-gītā JSON complete

 UID system fully applied

 Extended layers separated

 Documentation complete

 Folder structure clean

➡️ What Comes Next (Phase 1 Preview)
Phase 1 – Bhagavad-gītā Library UI

Create Next.js app inside /frontend

Build verse reader

Implement language toggle

No users yet

No backend yet

Do NOT begin Phase 1 until Phase 0 exit criteria are met.

🕉️ Guiding Reminder
A weak foundation creates endless rewrites.
A strong foundation creates freedom.


