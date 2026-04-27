Phase 2 – Step 2
Controlled Expansion of Commentary Data (Still Offline)
🎯 Goal of Step 2 (Very Clear)

By the end of Phase 2 – Step 2, you will have:

Commentary JSON prepared for multiple verses

For multiple ācāryas

Using one fixed, proven schema

With absolute consistency

This step answers the question:

“Can this structure scale calmly beyond one verse?”

🧱 Scope of Step 2 (STRICT)

We now expand horizontally, not vertically.

✔ Verses to include (ONLY these)

Add commentary data for the remaining three test verses:

BG 2.13

BG 4.7

BG 18.66

Do not add any other verses yet.

✔ Ācārya rule (Important)

For Step 2, choose one of the following approaches:

Option A (Recommended for calmness):

Same two ācāryas you used in Step 1
(e.g. Prabhupāda + Śaṅkara)

Option B (If data is readily available):

All four ācāryas, but only English

⚠️ Do not mix approaches mid-step. Choose one.

📁 Step 2.1 – Duplicate the Proven Pattern (No Creativity)

You already have a working pattern from Step 1.

Now repeat it exactly.

Example for BG 2.13 (Prabhupāda, English):

data/bhagavad-gita/commentaries/prabhupada/en/bg-2-13.json


Template (same as before):

{
  "ref": "bg.2.13",
  "type": "commentary",
  "acharya": {
    "id": "prabhupada",
    "name": "A.C. Bhaktivedanta Swami Prabhupāda",
    "sampradaya": "Gauḍīya Vaiṣṇava"
  },
  "language": "en",
  "source": {
    "text": "Bhagavad-gītā As It Is",
    "publisher": "BBT"
  },
  "text": ""
}


Only three things change per file:

ref

filename

commentary text

Everything else stays identical.

📜 Step 2.2 – Paste Commentary Text Carefully

While pasting commentary text:

✔ Preserve paragraph breaks
✔ Preserve original tone
✔ Do not modernize language
✔ Do not summarize
✔ Do not annotate

You are acting as a scribe, not an editor.

🔁 Step 2.3 – Repeat for Each Selected Ācārya

For each verse (2.13, 4.7, 18.66):

Create one file per ācārya

One language per file

Follow the same folder structure

Example:

commentaries/
├── prabhupada/en/bg-2-13.json
├── shankara/en/bg-2-13.json
├── prabhupada/en/bg-4-7.json
├── shankara/en/bg-4-7.json
├── prabhupada/en/bg-18-66.json
└── shankara/en/bg-18-66.json


(Your exact set may differ, that’s fine.)

🧪 Step 2.4 – Consistency Audit (VERY IMPORTANT)

After all files are created, do a slow audit.

Check horizontally (same verse, different ācāryas)

Same UID everywhere

No text overlap

No accidental mixing

Distinct voices preserved

Check vertically (same ācārya, different verses)

Same acharya block

Same source format

Same language code

Same tone of metadata

If you find even one inconsistency, fix it everywhere.

📋 Step 2.5 – Create a Simple Index (Optional but Helpful)

Create a plain text or markdown file for yourself:

docs/phase-2-commentary-progress.md


Example:

## Commentary Coverage (Phase 2)

BG 1.1
- Prabhupāda (EN, HI)
- Śaṅkara (EN)

BG 2.13
- Prabhupāda (EN)
- Śaṅkara (EN)

BG 4.7
- Prabhupāda (EN)
- Śaṅkara (EN)

BG 18.66
- Prabhupāda (EN)
- Śaṅkara (EN)


This is not for the app, only for your clarity.

🟢 Step 2 Exit Criteria (ALL REQUIRED)

You may declare Phase 2 – Step 2 complete only if:

 All four test verses have commentary data

 Same schema used everywhere

 At least two ācāryas represented

 No file mixes text or roles

 Folder structure remains clean

 You feel no confusion reading the files

If confusion exists → pause and correct.

🕉️ Closing Reminder for Step 2

Scalability is not proven by quantity.
It is proven by repetition without deviation.

If these four verses feel effortless,
the remaining 700 will be peaceful later.


