Now we enter Phase 2 – Step 3, which is a very important transition step.

This is the first time Phase 2 gently touches the frontend, but still:

❌ No backend

❌ No refactor of Phase 1 code

❌ No new features beyond commentary selection

Think of this step as adding a new lamp to a room without rearranging the furniture.

🪜 Phase 2 – Step 3
Commentary Selection State & Data Wiring (No New UI Complexity)
🎯 Goal of Step 3 (Crystal Clear)

By the end of Phase 2 – Step 3, you will have:

Commentary data successfully wired into the frontend

Ability to switch commentaries for the same verse

Zero changes to:

Canonical text rendering

Verse navigation

Language toggle behavior

Proof that Phase 2 data model works in the UI

This step answers the question:

“Can the UI consume multi-ācārya commentary data without becoming noisy?”

🧱 Scope of Step 3 (STRICT)
✔ What is allowed

Add commentary selection state

Load commentary data via existing abstraction

Render one selected commentary at a time

❌ What is NOT allowed

No styling overhaul

No side-by-side comparison

No backend introduction

No persistence (no localStorage, no cookies)

No new routes

No search or filtering

🧠 Step 3.1 – Extend the Unified Verse Data Shape (Conceptual)

Your frontend currently expects something like:

{
  uid,
  sloka,
  translation,
  purport
}


In Phase 2, you extend, not replace, this shape:

commentaries: {
  prabhupada?: {
    en?: string;
    hi?: string;
  };
  shankara?: {
    en?: string;
  };
  ramanuja?: {
    en?: string;
  };
  madhva?: {
    en?: string;
  };
}


Important:

This is in-memory only

Files remain separate

Frontend never knows file paths

🔌 Step 3.2 – Update loadVerse() (Data Assembly Only)

Wherever your Phase 1 loadVerse(uid) exists:

Extend it so that it:

Loads canonical + translation data (as before)

Additionally loads available commentary files for that UID

Returns them grouped by ācārya ID

Rules:

No default commentary chosen here

No UI logic

Missing commentary = simply absent

✔ If loadVerse() returns correct data, UI stays simple.

🧩 Step 3.3 – Add Commentary Selection State (Page-Level Only)

In your verse page component:

Introduce one new piece of state:

selectedAcharya = "prabhupada"


Rules:

Default must be "prabhupada"

State lives only in the verse page

Do not lift it higher

Do not persist it

This mirrors the Language Toggle pattern from Phase 1.

🪟 Step 3.4 – Add a Minimal Commentary Selector (Behavior Only)

Using the rules from
COMMENTARY_TOGGLE_UI_BEHAVIOR.md:

Implement a simple selector that:

Lists available ācāryas for the verse

Allows switching one at a time

Causes commentary text to change

For now:

Buttons OR dropdown

Plain text labels

No icons

No animations

You are testing behavior, not aesthetics.

📜 Step 3.5 – Render Selected Commentary

Below the selector:

Render only the selected commentary

Show:

Commentary text

Ācārya name

Sampradāya (subtle)

Rules:

Do not show “no commentary available” unless none exist

Do not compare

Do not annotate

The commentary should feel like Phase 1 purport, not a new feature.

🌐 Step 3.6 – Language Interaction Validation

Test the matrix carefully:

Commentary	Language	Expected
Prabhupāda	EN	Shows EN
Prabhupāda	HI	Shows HI
Śaṅkara	HI	Falls back to EN
Switch acharya	Same language preserved	

Rules:

Commentary toggle does NOT reset language

Language toggle does NOT reset commentary

🔁 Step 3.7 – Navigation Regression Test

Very important.

Test:

Switch commentary

Click “Next verse”

Ensure:

Commentary resets to default

No state leakage

No crash

Phase 1 navigation must feel untouched.

🧪 Step 3.8 – Manual Acceptance Test (Slow)

Manually test on:

BG 1.1

BG 2.13

BG 4.7

BG 18.66

For each:

Switch commentaries

Switch languages

Navigate away and back

Ask yourself:

“Does this still feel like a calm reader?”

If answer is yes → success.

🟢 Step 3 Exit Criteria (ALL REQUIRED)

You may declare Phase 2 – Step 3 complete only if:

 Commentary selector works

 Only one commentary visible at a time

 Attribution always correct

 Language toggle unaffected

 Phase 1 UI unchanged

 No visual clutter introduced

 Code remains readable

🕉️ Closing Reminder for Step 3

Phase 2 should feel like
Phase 1 plus depth,
not Phase 1 plus noise.

If someone can ignore the selector and just read,
you have done this step correctly.
