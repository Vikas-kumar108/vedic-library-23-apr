⚠️ HISTORICAL PHASE-1 IMPLEMENTATION

This document records the exact “Verse Not Found” handling logic
used in Phase-1 of the Vedic Library (Bhagavad-gītā pilot).

It is preserved for reference and historical accuracy.
It is not an architectural contract and may evolve in later phases.


This will be tiny, calm, and Phase-1-safe.
No backend, no redirects, no drama.

✅ Goal

If someone visits an invalid verse like:

/bg/19/1
/bg/2/200
/bg/abc/1


They should see a peaceful message, not a crash.

1️⃣ Add a validator helper (pure logic)

Create this file:

frontend/src/lib/validateVerse.ts

import { BG_CHAPTER_VERSE_COUNT } from "./bgChapters";

export function isValidVerse(chapter: number, verse: number): boolean {
  if (!Number.isInteger(chapter) || !Number.isInteger(verse)) {
    return false;
  }

  const maxVerse = BG_CHAPTER_VERSE_COUNT[chapter];
  if (!maxVerse) {
    return false;
  }

  return verse >= 1 && verse <= maxVerse;
}


✔ No React
✔ No Next.js
✔ Reusable forever

2️⃣ Create a tiny “Verse Not Found” component

Create:

frontend/src/components/verse/VerseNotFound.tsx

export default function VerseNotFound() {
  return (
    <main style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h1>Verse not found</h1>
      <p>
        The requested verse does not exist in the Bhagavad-gītā.
      </p>
      <p>
        Please check the chapter and verse number.
      </p>
    </main>
  );
}


That’s it.
No links, no blame, no noise.

3️⃣ Use it in your verse page (1 condition only)

Open:

frontend/src/app/bg/[chapter]/[verse]/page.tsx


Add imports at the top:

import VerseNotFound from "@/components/verse/VerseNotFound";
import { isValidVerse } from "@/lib/validateVerse";


Inside your page component, before loading data, add:

const chapterNum = Number(params.chapter);
const verseNum = Number(params.verse);

if (!isValidVerse(chapterNum, verseNum)) {
  return <VerseNotFound />;
}


That’s all.

4️⃣ What happens now (behavior)
URL	Result
/bg/1/1	Normal verse
/bg/2/13	Normal verse
/bg/1/0	Verse Not Found
/bg/2/200	Verse Not Found
/bg/19/1	Verse Not Found
/bg/abc/1	Verse Not Found

✔ No crash
✔ No stack trace
✔ No confusion

5️⃣ Why this is the right Phase-1 solution

No redirects

No Next.js notFound() yet

No backend assumptions

Reader stays calm

Developer stays calm

Later (Phase 2+), this can evolve into:

Custom 404

Backend-aware validation

Search suggestions

But not now.

🕉️ Final Phase-1 reminder

Errors should be quiet.
Scripture should remain dignified.

With this, Phase 1 is now truly complete.
