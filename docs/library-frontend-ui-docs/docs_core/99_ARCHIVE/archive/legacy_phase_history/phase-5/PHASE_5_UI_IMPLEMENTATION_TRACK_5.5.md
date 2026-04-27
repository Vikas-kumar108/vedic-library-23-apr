Excellent.
Now we design the **Chapter-Level Hub Pages** — the bridge between *verse reading* and *structured understanding*.

This is where a chapter becomes a **coherent unit of study**, not just a list of verses.

We will do this **without overwhelming the reader**.

---

# 🧱 TRACK 5.5 — Chapter-Level Hub Pages

## 🎯 Objective

Create a **Chapter Hub Page** that:

* Acts as the *entry point* to a chapter
* Gives optional context (intro, summary)
* Enables structured navigation
* Connects education naturally
* Never forces reading order

---

## 1️⃣ Route Structure

Introduce the chapter route:

```
/bg/[chapter]
```

Create:

```text
src/app/bg/[chapter]/page.tsx
```

This page is **not** a reading page.
It is a **chapter overview & launchpad**.

---

## 2️⃣ Chapter Page Responsibilities

The chapter page must show:

1. Chapter title & number
2. Chapter introduction (educational, optional)
3. Chapter summary (optional)
4. Verse list (navigation only)
5. Entry points to:

   * Read sequentially
   * Jump to a verse
   * Open education

---

## 3️⃣ Chapter Data (Phase-Correct)

For now, we will:

* Read **chapter intro & summary from education JSON**
* Verse list from known chapter structure

Assume chapter education JSON exists at:

```
src/data/education/chapters/bg_chapter_02_intro.json
src/data/education/chapters/bg_chapter_02_summary.json
```

---

## 4️⃣ Chapter Page Implementation

### `src/app/bg/[chapter]/page.tsx`

```tsx
import ChapterHub from "@/components/chapter/ChapterHub";

export default function ChapterPage({
  params,
}: {
  params: { chapter: string };
}) {
  const chapter = Number(params.chapter);

  return <ChapterHub chapter={chapter} />;
}
```

---

## 5️⃣ Chapter Components Structure

Create:

```text
src/components/chapter/
├── ChapterHub.tsx
├── ChapterHeader.tsx
├── ChapterIntro.tsx
├── ChapterSummary.tsx
├── ChapterVerseList.tsx
├── ChapterActions.tsx
```

---

## 6️⃣ ChapterHub (Coordinator)

### `ChapterHub.tsx`

```tsx
import ChapterHeader from "./ChapterHeader";
import ChapterIntro from "./ChapterIntro";
import ChapterSummary from "./ChapterSummary";
import ChapterVerseList from "./ChapterVerseList";
import ChapterActions from "./ChapterActions";

export default function ChapterHub({ chapter }: { chapter: number }) {
  return (
    <article>
      <ChapterHeader chapter={chapter} />
      <ChapterActions chapter={chapter} />
      <ChapterIntro chapter={chapter} />
      <ChapterSummary chapter={chapter} />
      <ChapterVerseList chapter={chapter} />
    </article>
  );
}
```

---

## 7️⃣ Chapter Header

### `ChapterHeader.tsx`

```tsx
export default function ChapterHeader({ chapter }: { chapter: number }) {
  return (
    <header>
      <h1>Bhagavad-gītā — Chapter {chapter}</h1>
    </header>
  );
}
```

---

## 8️⃣ Chapter Actions (Reader Choices)

### `ChapterActions.tsx`

```tsx
import Link from "next/link";

export default function ChapterActions({ chapter }: { chapter: number }) {
  return (
    <nav style={{ margin: "1rem 0" }}>
      <Link href={`/bg/${chapter}/1`}>
        Start Reading →
      </Link>
    </nav>
  );
}
```

📌 No forced paths.
Just a gentle starting point.

---

## 9️⃣ Chapter Introduction (Optional Education)

### `ChapterIntro.tsx`

```tsx
import introData from "@/data/education/chapters/bg_chapter_02_intro.json";

export default function ChapterIntro({ chapter }: { chapter: number }) {
  if (chapter !== 2) return null;

  return (
    <section>
      <h3>Chapter Introduction</h3>
      {introData.body.map((p: string, i: number) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}
```

Later:

* toggleable
* loaded dynamically

---

## 🔟 Chapter Summary (Optional Reflection)

### `ChapterSummary.tsx`

```tsx
import summaryData from "@/data/education/chapters/bg_chapter_02_summary.json";

export default function ChapterSummary({ chapter }: { chapter: number }) {
  if (chapter !== 2) return null;

  return (
    <section>
      <h3>Chapter Summary</h3>
      {summaryData.body.map((p: string, i: number) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}
```

---

## 1️⃣1️⃣ Chapter Verse List (Navigation Only)

### `ChapterVerseList.tsx`

```tsx
import Link from "next/link";

export default function ChapterVerseList({
  chapter,
}: {
  chapter: number;
}) {
  const verseCount = chapter === 2 ? 72 : 47; // placeholder

  return (
    <section>
      <h3>Verses</h3>
      <ul>
        {Array.from({ length: verseCount }, (_, i) => (
          <li key={i}>
            <Link href={`/bg/${chapter}/${i + 1}`}>
              {chapter}.{i + 1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

📌 This list is **navigation**, not content.

---

## 1️⃣2️⃣ UX Principles Enforced Here

* Chapter pages do not replace verse pages
* Chapter pages do not auto-open education
* Verse reading remains primary
* Education is contextual, not authoritative

This matches **Phase 4 ethics** perfectly.

---

## ✅ TRACK 5.5 Exit Checklist

Verify:

* ⬜ `/bg/2` loads cleanly
* ⬜ Chapter intro visible
* ⬜ Chapter summary visible
* ⬜ Verse list navigates correctly
* ⬜ Sidebar remains usable
* ⬜ No commentary intrusion

If yes → **TRACK 5.5 COMPLETE (v1)**.

---

## 🌿 What Comes Next

You now have:

* Verse workspace ✔
* Context pane ✔
* Chapter hubs ✔

### Next choices:

1️⃣ Proceed to **TRACK 5.6 – Book-Level Home (Bhagavad-gītā)**
2️⃣ Improve Chapter Hub (toggles, polish)
3️⃣ Pause and review user journey end-to-end

Just tell me the number, dear 🙏

