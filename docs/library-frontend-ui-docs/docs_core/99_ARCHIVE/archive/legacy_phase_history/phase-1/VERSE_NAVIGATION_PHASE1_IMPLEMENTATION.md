⚠️ HISTORICAL PHASE-1 IMPLEMENTATION

This document records the **exact verse navigation logic used in Phase-1**
of the Vedic Library (Bhagavad-gītā pilot).

It is preserved for reference and historical accuracy.

It is **not an architectural contract** and must not be assumed
to apply unchanged to later phases.


Below is small, clean, Phase-1-safe Verse Navigation code.
No backend, no magic, no extra abstractions.

You can copy–paste this directly.

1️⃣ Chapter map (one-time file)

Create:

frontend/src/lib/bgChapters.ts

export const BG_CHAPTER_VERSE_COUNT: Record<number, number> = {
  1: 47,
  2: 72,
  3: 43,
  4: 42,
  5: 29,
  6: 47,
  7: 30,
  8: 28,
  9: 34,
  10: 42,
  11: 55,
  12: 20,
  13: 35,
  14: 27,
  15: 20,
  16: 24,
  17: 28,
  18: 78
};


This is Phase-1 acceptable hard data.

2️⃣ Navigation helper (pure logic)

Create:

frontend/src/lib/verseNavigation.ts

import { BG_CHAPTER_VERSE_COUNT } from "./bgChapters";

export function getPrevNext(chapter: number, verse: number) {
  const maxVerse = BG_CHAPTER_VERSE_COUNT[chapter];

  let prev: { chapter: number; verse: number } | null = null;
  let next: { chapter: number; verse: number } | null = null;

  // Previous
  if (verse > 1) {
    prev = { chapter, verse: verse - 1 };
  } else if (chapter > 1) {
    const prevChapter = chapter - 1;
    prev = {
      chapter: prevChapter,
      verse: BG_CHAPTER_VERSE_COUNT[prevChapter]
    };
  }

  // Next
  if (verse < maxVerse) {
    next = { chapter, verse: verse + 1 };
  } else if (BG_CHAPTER_VERSE_COUNT[chapter + 1]) {
    next = { chapter: chapter + 1, verse: 1 };
  }

  return { prev, next };
}


✔ No React
✔ No routing
✔ No side effects

3️⃣ Navigation component (very small)

Create:

frontend/src/components/verse/VerseNavigation.tsx

import Link from "next/link";

interface Props {
  prev: { chapter: number; verse: number } | null;
  next: { chapter: number; verse: number } | null;
}

export default function VerseNavigation({ prev, next }: Props) {
  return (
    <nav style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
      {prev ? (
        <Link href={`/bg/${prev.chapter}/${prev.verse}`}>
          ← BG {prev.chapter}.{prev.verse}
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link href={`/bg/${next.chapter}/${next.verse}`}>
          BG {next.chapter}.{next.verse} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

4️⃣ Use it in your verse page

In:

frontend/src/app/bg/[chapter]/[verse]/page.tsx


Add imports:

import VerseNavigation from "@/components/verse/VerseNavigation";
import { getPrevNext } from "@/lib/verseNavigation";


Inside your component:

const chapterNum = Number(params.chapter);
const verseNum = Number(params.verse);

const { prev, next } = getPrevNext(chapterNum, verseNum);


Render it at the bottom of the page:

<VerseNavigation prev={prev} next={next} />

5️⃣ What this gives you (Phase-1 complete)

✔ BG 1.1 → BG 1.2
✔ BG 1.47 → BG 2.1
✔ BG 18.78 → no “Next”
✔ Clean, readable navigation
✔ Vedabase-style reading flow

No extra UI. No overthinking.

🕉️ Phase-1 discipline reminder

Navigation should feel invisible.
If the reader notices it, it’s too loud.
