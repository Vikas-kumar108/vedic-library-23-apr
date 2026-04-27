🪜 Phase 2 – Step 1
Commentary JSON Preparation (Foundational Work)
🎯 Goal of Step 1 (Very Clear)

By the end of Phase 2 – Step 1, you will have:

A small, clean, verified set of commentary JSON files

Multiple ācāryas

Multiple verses

Strict adherence to the Phase 2 schema

Zero ambiguity about attribution or structure

This step proves that Phase 2 is feasible and disciplined.

🧱 Scope of Step 1 (DO NOT EXPAND)

For Step 1, we intentionally limit ourselves.

✔ Verses to prepare (ONLY these 4)

Prepare commentary data for:

BG 1.1

BG 2.13

BG 4.7

BG 18.66

Do not prepare all 700 verses yet.

✔ Ācāryas to include (Phase 2 core)

Start with these four:

prabhupada

shankara

ramanuja

madhva

If you only have one or two initially, that is fine.
Structure matters more than completeness.

📁 Step 1.1 – Create the Folder Structure

Inside your project root:

vedic-library/
└── data/
    └── bhagavad-gita/
        └── commentaries/
            ├── prabhupada/
            │   ├── en/
            │   └── hi/
            ├── shankara/
            │   └── en/
            ├── ramanuja/
            │   └── en/
            └── madhva/
                └── en/

Rules (Non-negotiable)

Folder names = machine IDs

Lowercase only

No spaces

No diacritics in folder names

Languages separated by folders

✔ Do not worry if some folders are empty for now.

📄 Step 1.2 – Choose ONE Verse to Start With

We start with BG 1.1 only.

Why?

Opening verse

Rich commentary

Good test case

Do not do all four verses at once.

🧾 Step 1.3 – Prepare the First Commentary File (Template)

Create this file:

data/bhagavad-gita/commentaries/prabhupada/en/bg-1-1.json


Paste this exact structure (replace text later):

{
  "ref": "bg.1.1",
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


Now slowly paste the purport text into "text".

Important discipline rules

Paste plain text only

No HTML

No Markdown

Preserve paragraph breaks with \n\n

Do not paraphrase

Do not “clean up” language

You are archiving, not editing.

📜 Step 1.4 – Verify the First File (Checklist)

Before moving on, confirm:

 Filename is bg-1-1.json

 "ref" is exactly bg.1.1

 Ācārya name correct

 Sampradāya correct

 No Sanskrit verse present

 No translation text present

 Only commentary text

If anything feels off → fix now.

🌐 Step 1.5 – (Optional) Hindi AI-Assisted File

If you already have Hindi or AI-generated Hindi:

Create:

data/bhagavad-gita/commentaries/prabhupada/hi/bg-1-1.json


Template:

{
  "ref": "bg.1.1",
  "type": "commentary",
  "acharya": {
    "id": "prabhupada",
    "name": "A.C. Bhaktivedanta Swami Prabhupāda",
    "sampradaya": "Gauḍīya Vaiṣṇava"
  },
  "language": "hi",
  "source": {
    "text": "AI-assisted translation",
    "engine": "Gemini",
    "review_status": "unreviewed"
  },
  "text": ""
}


Rules:

AI must be declared

Review status mandatory

No claim of authority

🔁 Step 1.6 – Repeat for ONE More Ācārya (Same Verse)

Now prepare BG 1.1 for one more ācārya (e.g., Śaṅkarācārya).

Example file:

data/bhagavad-gita/commentaries/shankara/en/bg-1-1.json


Use the same schema.
Change only the acharya block and source.

🧪 Step 1.7 – Cross-Check (Critical)

Place the two files side by side and confirm:

Same UID

Same verse

Completely independent texts

No mixing of voices

No interpretive notes added by you

If you feel tempted to “explain” — stop.

🟢 Step 1 Exit Criteria (ALL REQUIRED)

You may declare Phase 2 – Step 1 complete only when:

 At least one verse has

 Two different ācārya commentaries

 Folder structure matches schema

 Files validate mentally (readable, clean)

 No shortcuts taken

At this point, Phase 2 is officially underway.

🕉️ Closing Reminder for Step 1

In Phase 2, discipline is more important than speed.
If you can preserve voices faithfully,
the platform will preserve itself.
