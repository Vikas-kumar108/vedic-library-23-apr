# ✅ Phase 1 Tasklist – Bhagavad-gītā Pilot (FINAL)

Phase 1 establishes a **trustworthy, readable, Vedabase-style Bhagavad-gītā library**
using **Next.js + React**, driven by **JSON data**.

Phase 1 is deliberately **read-only**.

No users.  
No backend APIs.  
No AI calls.  
No database.  

---

## 🎯 Phase 1 Goal (Restated Clearly)

By the end of Phase 1, you will have:

- A stable Next.js application
- Bhagavad-gītā verse-by-verse reading
- Exact Vedabase-style section order
- English + Hindi toggle
- Smooth verse navigation
- Clean component architecture
- JSON-respecting data flow
- A clearly declared **v1.0-pilot**

Phase 1 is about **faithful reading**, not features.

---

## 🧱 Phase 1 Entry Criteria (ALL REQUIRED)

You may start Phase 1 only if:

- [ ] Phase 0 fully complete
- [ ] UID system finalized (`bg.x.y`)
- [ ] Canonical JSON immutable
- [ ] Extended JSON separated
- [ ] Next.js app running locally
- [ ] One verse page already renders

If any box is unchecked → STOP.

---

## 📁 Step 1 – Frontend Structure Verification

Confirm this structure exists:

```text
frontend/
├── src/
│   ├── app/
│   │   └── bg/[chapter]/[verse]/page.tsx
│   ├── components/
│   ├── lib/
│   └── data/
✔ Completion check:

 No ad-hoc folders

 No UI logic outside frontend/

🧩 Step 2 – Core React Components
Ensure these components exist and are used:

Sloka

Transliteration

Synonyms

Translation

Purport

LanguageToggle

Rules:

One responsibility each

No data loading

No routing logic

✔ Completion check:

 Components reusable

 Props-only data flow

🧠 Step 3 – Data Loading Abstraction
Verify:

All verse data is loaded via loadVerse(uid)

No page imports JSON directly

UID is the single lookup key

✔ Completion check:

 Abstraction exists

 Future backend swap possible

📜 Step 4 – Vedabase-Style Content Order
Each verse page must render sections in this exact order:

Verse Header (BG X.Y)

Sanskrit Śloka (Devanāgarī)

Transliteration (IAST)

Word-by-word Synonyms

Translation

Purport

✔ Completion check:

 Order matches Vedabase

 No section misplaced

🌐 Step 5 – Language Toggle (English ↔ Hindi)
Requirements:

Same URL for both languages

Default = English

Sanskrit never changes

Translation / Purport change by language

✔ Completion check:

 Toggle works instantly

 Hindi fallback to English if missing

 No URL duplication

🔁 Step 6 – Verse Navigation (NEW – REQUIRED)
Implement basic verse navigation:

Previous verse link

Next verse link

Example:

Copy code
← BG 1.1 | BG 1.3 →
Rules:

Simple links only

No dropdowns

No chapter list yet

✔ Completion check:

 Navigation visible

 Clicking loads correct verse

📘 Step 7 – Chapter Boundary Handling (NEW)
You must handle:

End of chapter → next chapter start

End of Bhagavad-gītā → stop navigation

Implement using a simple chapter map:

json
Copy code
{
  "1": 47,
  "2": 72,
  "3": 43,
  "...": "...",
  "18": 78
}
✔ Completion check:

 BG 1.47 → BG 2.1 works

 BG 18.last has no “Next”

🚫 Step 8 – Verse Not Found Handling (NEW)
If URL is invalid:

bash
Copy code
/bg/19/1
/bg/2/200
Behavior:

Show calm message:

“Verse not found”

No crash

No stack trace

✔ Completion check:

 Invalid verses handled gracefully

🎨 Step 9 – Minimal Typography Consistency (NEW)
Not styling — readability only.

Ensure:

Sanskrit larger than translation

Transliteration italic

Clear spacing between sections

Purport visually distinct

Rules:

No themes

No Tailwind

No animations

✔ Completion check:

 Comfortable long reading

 No visual clutter

🧪 Step 10 – Multi-Verse Manual Testing
Manually test:

BG 1.1

BG 1.47

BG 2.1

BG 2.13

BG 4.7

BG 18.66

BG 18.last

✔ Completion check:

 All load correctly

 Navigation works everywhere

 Language toggle stable

🏷 Step 11 – Phase 1 Version Declaration (NEW)
Explicitly declare:

Version: v1.0-pilot

Meaning:

Bhagavad-gītā only

Read-only

English + Hindi

No login

No backend

Where:

README.md

(Later) Git tag

✔ Completion check:

 Version clearly stated

🚫 Step 12 – Explicitly Forbidden in Phase 1
If you add any of these, Phase 1 is broken:

❌ Search
❌ User login
❌ Donations
❌ Backend APIs
❌ AI translation calls
❌ Multiple ācāryas
❌ Database

🟢 Phase 1 Exit Criteria (ALL MUST BE TRUE)
You may declare Phase 1 complete only if:

 All verses render correctly

 Navigation works across chapters

 Language toggle stable

 Errors handled gracefully

 JSON discipline respected

 Code readable and calm

 Version declared v1.0-pilot

📦 Phase 1 Deliverable (Final)
A trustworthy, distraction-free Bhagavad-gītā reader
that one can sit with and read peacefully.

🕉️ Final Guiding Reminder
Phase 1 builds trust.
Trust is built by stability, not features.
If reading feels calm, Phase 1 succeeded.
