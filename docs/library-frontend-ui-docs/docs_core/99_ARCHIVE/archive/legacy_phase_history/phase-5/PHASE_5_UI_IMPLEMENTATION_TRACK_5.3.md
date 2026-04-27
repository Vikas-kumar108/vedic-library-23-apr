Excellent.
We now implement the **heart of the system**: the **Verse Workspace**.

This is where everything you’ve built so far finally *meets the reader*.

We will do this with **discipline**:

* No commentary yet
* No education yet
* No UI noise
* Just **pure verse reading**, reader-controlled

---

# 🧱 TRACK 5.3 — Main Reading Pane (Verse Workspace)

## Objective (Very Clear)

Build a **single verse reading workspace** that:

* Is verse-centric (UID is the anchor)
* Supports multiple text layers
* Lets the reader decide *what to see*
* Is calm, sequential, and linkable
* Scales later to commentary & education panes

---

## 1️⃣ Route Structure

We introduce the canonical verse route:

```
/bg/[chapter]/[verse]
```

Create:

```text
src/app/bg/[chapter]/[verse]/page.tsx
```

---

## 2️⃣ Data Access Strategy (Phase-Correct)

For Phase 5.3:

* Read from **local JSON** (already prepared)
* No backend fetch yet
* No caching complexity

Assume JSON lives at:

```
src/data/canonical/bg/bg_02.json
```

Each file = one chapter (array of verses).

---

## 3️⃣ Verse Loader Utility

Create:

```text
src/lib/loadVerse.ts
```

### `loadVerse.ts`

```ts
import bg02 from "@/data/canonical/bg/bg_02.json";

type Verse = {
  uid: string;
  chapter: number;
  verse: number;
  content: {
    sanskrit_devanagari: string;
    sanskrit_iast: string;
    word_synonyms: string;
    translation_en: string;
    translation_hi?: string;
    purport_en?: string;
  };
};

export function loadVerse(chapter: number, verse: number): Verse | null {
  // TEMP: only chapter 2 wired
  if (chapter !== 2) return null;

  const found = (bg02 as Verse[]).find(
    (v) => v.chapter === chapter && v.verse === verse
  );

  return found || null;
}
```

⚠️ This is temporary but **architecturally correct**.

---

## 4️⃣ Verse Page (Core Workspace)

### `page.tsx`

```tsx
import { loadVerse } from "@/lib/loadVerse";
import VerseWorkspace from "@/components/verse/VerseWorkspace";

export default function VersePage({
  params,
}: {
  params: { chapter: string; verse: string };
}) {
  const chapter = Number(params.chapter);
  const verse = Number(params.verse);

  const data = loadVerse(chapter, verse);

  if (!data) {
    return <p>Verse not found.</p>;
  }

  return <VerseWorkspace verse={data} />;
}
```

---

## 5️⃣ Verse Workspace Component

Create:

```text
src/components/verse/
├── VerseWorkspace.tsx
├── VerseHeader.tsx
├── VerseToggles.tsx
├── VerseContent.tsx
└── VerseNavigation.tsx
```

---

## 6️⃣ VerseWorkspace (Container)

### `VerseWorkspace.tsx`

```tsx
"use client";

import { useState } from "react";
import VerseHeader from "./VerseHeader";
import VerseToggles from "./VerseToggles";
import VerseContent from "./VerseContent";
import VerseNavigation from "./VerseNavigation";

export default function VerseWorkspace({ verse }: any) {
  const [visible, setVisible] = useState({
    sloka: true,
    transliteration: false,
    wordByWord: false,
    translation: true,
    purport: false,
  });

  return (
    <article>
      <VerseHeader verse={verse} />

      <VerseToggles visible={visible} setVisible={setVisible} />

      <VerseContent verse={verse} visible={visible} />

      <VerseNavigation verse={verse} />
    </article>
  );
}
```

---

## 7️⃣ Verse Header (UID Anchor)

### `VerseHeader.tsx`

```tsx
export default function VerseHeader({ verse }: any) {
  return (
    <header>
      <h2>Bhagavad-gītā {verse.chapter}.{verse.verse}</h2>
      <p style={{ color: "#666" }}>{verse.uid}</p>
    </header>
  );
}
```

📌 UID is **always visible**.

---

## 8️⃣ Toggle Controls (Reader Sovereignty)

### `VerseToggles.tsx`

```tsx
export default function VerseToggles({
  visible,
  setVisible,
}: {
  visible: any;
  setVisible: any;
}) {
  return (
    <div style={{ margin: "1rem 0" }}>
      {Object.keys(visible).map((key) => (
        <label key={key} style={{ marginRight: 12 }}>
          <input
            type="checkbox"
            checked={visible[key]}
            onChange={() =>
              setVisible({ ...visible, [key]: !visible[key] })
            }
          />{" "}
          {key}
        </label>
      ))}
    </div>
  );
}
```

Later:

* labels will be humanized
* preferences will persist

---

## 9️⃣ Verse Content (Pure Text)

### `VerseContent.tsx`

```tsx
export default function VerseContent({
  verse,
  visible,
}: {
  verse: any;
  visible: any;
}) {
  return (
    <section>
      {visible.sloka && (
        <p style={{ fontSize: "1.25rem" }}>
          {verse.content.sanskrit_devanagari}
        </p>
      )}

      {visible.transliteration && (
        <p>
          <em>{verse.content.sanskrit_iast}</em>
        </p>
      )}

      {visible.wordByWord && (
        <p>{verse.content.word_synonyms}</p>
      )}

      {visible.translation && (
        <p>{verse.content.translation_en}</p>
      )}

      {visible.purport && verse.content.purport_en && (
        <p>{verse.content.purport_en}</p>
      )}
    </section>
  );
}
```

No styling yet beyond readability.

---

## 🔟 Verse Navigation (Sequential Reading)

### `VerseNavigation.tsx`

```tsx
import Link from "next/link";

export default function VerseNavigation({ verse }: any) {
  const prev =
    verse.verse > 1
      ? `/bg/${verse.chapter}/${verse.verse - 1}`
      : null;

  const next = `/bg/${verse.chapter}/${verse.verse + 1}`;

  return (
    <nav style={{ marginTop: "2rem" }}>
      {prev && <Link href={prev}>← Previous</Link>}{" "}
      <Link href={next}>Next →</Link>
    </nav>
  );
}
```

Later:

* chapter boundaries handled
* disabled states added

---

## ✅ TRACK 5.3 Exit Checklist

Confirm manually:

* ✔ Verse loads via URL
* ✔ UID visible
* ✔ Sloka + Translation default
* ✔ Toggles work
* ✔ No commentary shown
* ✔ Prev / Next works
* ✔ Sidebar still visible

If yes → **TRACK 5.3 COMPLETE (v1)**.

---

## 🧠 Why This Is Correct

You now have:

* A **verse-centric workspace**
* Reader sovereignty
* Clean separation of concerns
* No premature complexity

This is the **foundation everything else attaches to**.

---

## 🌿 What Comes Next (Your Choice)

1️⃣ Proceed to **TRACK 5.4 – Right Context Pane (Commentary & Education)**
2️⃣ Improve Verse Workspace (styling, persistence)
3️⃣ Pause and read Bhagavad-gītā inside your own system

Just tell me the number, dear 🙏

