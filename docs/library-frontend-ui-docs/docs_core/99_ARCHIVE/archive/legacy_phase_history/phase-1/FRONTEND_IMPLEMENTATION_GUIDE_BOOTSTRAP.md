⚠️ HISTORICAL DOCUMENT — DO NOT FOLLOW LITERALLY

This document records an early Phase-1 bootstrap approach to setting up
the frontend.

It does NOT reflect the final Phase-1 implementation and is preserved
solely for historical and educational context.

Refer instead to:
- PHASE_1_TASKLIST.md
- PHASE_1_SUCCESS_DEFINITION.md
- Architecture documents under docs/architecture/


# 🚀 Frontend Implementation Guide – Phase 1 (Next.js Setup)

This document guides you through the **first actual coding step** of the Vedic Library project:
setting up the **Next.js frontend** correctly and calmly.

This is **Phase 1 entry**.  
Do NOT proceed unless Phase 0 is fully complete.

---

## 🎯 Phase 1 Goal (Frontend)

By the end of this guide, you will have:

- A working Next.js app inside `/frontend`
- One test verse page (BG 1.1)
- JSON data loaded correctly
- Zero extra features
- No confusion

This is **not** about beauty or completeness.  
This is about correctness.

---

## 1️⃣ Preconditions (Must Be True)

Before starting, confirm:

- [ ] Phase 0 completed
- [ ] `vedic-library/` root exists
- [ ] JSON data normalized with UIDs
- [ ] Node.js installed
- [ ] VS Code ready

If any item is unchecked → STOP.

---

## 2️⃣ Go to Frontend Folder

Open terminal / command prompt.

Navigate to your project root:

```bash
cd "P Publications/vedic-library"
Then enter frontend folder:

bash
Copy code
cd frontend
If frontend/ does not exist, create it:

bash
Copy code
mkdir frontend
cd frontend
3️⃣ Create Next.js App (App Router)
Run this command:

bash
Copy code
npx create-next-app@latest .
When prompted, choose:
TypeScript? → Yes

ESLint? → Yes

Tailwind CSS? → No

src/ directory? → Yes

App Router? → Yes

Import alias? → Yes (@/*)

Wait until installation finishes.

4️⃣ Verify Project Structure
After installation, you should see:

text
Copy code
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── styles/
│       └── globals.css
├── package.json
├── tsconfig.json
└── next.config.js
✔ Do NOT modify anything yet.

5️⃣ Start Development Server
Run:

bash
Copy code
npm run dev
Open browser:

arduino
Copy code
http://localhost:3000
You should see the default Next.js page.

✔ If page loads → success
❌ If not → stop and fix before proceeding

6️⃣ Prepare Data Access (Read-Only)
Create a folder inside frontend:

text
Copy code
frontend/src/data/
Inside it, create:

text
Copy code
frontend/src/data/bg-1-1.json
Paste one canonical + extended merged test verse temporarily:

json
Copy code
{
  "uid": "bg.1.1",
  "chapter": 1,
  "verse": 1,
  "sloka": "धर्मक्षेत्रे कुरुक्षेत्रे...",
  "iast": "dharma-kṣetre kuru-kṣetre...",
  "translation_en": "Dhṛtarāṣṭra said...",
  "purport_en": "Bhagavad-gītā is the widely read..."
}
⚠️ This merge is temporary for testing only.

7️⃣ Create Bhagavad-gītā Route
Create folders:

text
Copy code
frontend/src/app/bg/[chapter]/[verse]/
Inside it, create:

text
Copy code
page.tsx
8️⃣ Implement First Verse Page
Open page.tsx and paste:

tsx
Copy code
import verse from "@/data/bg-1-1.json";

export default function VersePage() {
  return (
    <main style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h1>Bhagavad-gītā {verse.chapter}.{verse.verse}</h1>

      <p style={{ fontSize: "1.5rem", marginTop: "1.5rem" }}>
        {verse.sloka}
      </p>

      <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
        {verse.iast}
      </p>

      <p style={{ marginTop: "1.5rem" }}>
        {verse.translation_en}
      </p>

      <hr style={{ margin: "2rem 0" }} />

      <p>{verse.purport_en}</p>
    </main>
  );
}
Save file.

9️⃣ View the Verse Page
Open browser:

bash
Copy code
http://localhost:3000/bg/1/1
You should see:

Verse header

Sanskrit

Transliteration

Translation

Purport

🎉 This is your first Vedabase-style page.

10️⃣ What You Have Achieved
✔ Next.js installed correctly
✔ React rendering scripture
✔ UID-based routing working
✔ JSON consumed safely

This is a major milestone.

11️⃣ What You MUST NOT Do Yet
❌ Do not add language toggle
❌ Do not refactor JSON yet
❌ Do not add components yet
❌ Do not style yet
❌ Do not add users or auth

All that comes next — step by step.

12️⃣ Phase 1 Next Steps (Preview)
After this guide, next tasks will be:

Split verse into React components

Replace test JSON with real structured JSON

Implement language toggle

Clean routing logic

Only proceed one step at a time.

🕉️ Guiding Reminder
First make it work.
Then make it right.
Then make it beautiful.
