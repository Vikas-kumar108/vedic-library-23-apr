Wonderful.
Now we design the **Book-Level Home** — the *front door* of the Bhagavad-gītā inside the Vedic Library.

This page answers one silent question for every new reader:

> **“Where do I begin, and how do I proceed?”**

We will keep it **inviting, calm, non-authoritative, and structured**.

---

# 🧱 TRACK 5.6 — Book-Level Home (Bhagavad-gītā)

## 🎯 Objective

Create a **Book Home Page** that:

* Welcomes first-time readers
* Orients returning readers
* Shows structure without pressure
* Links naturally to:

  * Chapters
  * Reading paths
  * Concepts
  * Glossary
* Never overwhelms

This page is **not** for reading verses.
It is for *entering the book*.

---

## 1️⃣ Route

Book home route:

```
/bg
```

Create:

```text
src/app/bg/page.tsx
```

---

## 2️⃣ Book Home Responsibilities

The Bhagavad-gītā home page must present:

1. Book title & short orientation
2. Structural overview (18 chapters)
3. Primary ways to begin reading
4. Educational entry points
5. Book-scoped discovery (search later)

---

## 3️⃣ Page Implementation

### `src/app/bg/page.tsx`

```tsx
import BookHome from "@/components/book/BookHome";

export default function BhagavadGitaHome() {
  return <BookHome />;
}
```

---

## 4️⃣ Component Structure

Create:

```text
src/components/book/
├── BookHome.tsx
├── BookHeader.tsx
├── BookIntro.tsx
├── BookStructure.tsx
├── BookEntryPoints.tsx
├── BookEducationLinks.tsx
```

---

## 5️⃣ BookHome (Coordinator)

### `BookHome.tsx`

```tsx
import BookHeader from "./BookHeader";
import BookIntro from "./BookIntro";
import BookEntryPoints from "./BookEntryPoints";
import BookStructure from "./BookStructure";
import BookEducationLinks from "./BookEducationLinks";

export default function BookHome() {
  return (
    <article>
      <BookHeader />
      <BookIntro />
      <BookEntryPoints />
      <BookStructure />
      <BookEducationLinks />
    </article>
  );
}
```

---

## 6️⃣ Book Header

### `BookHeader.tsx`

```tsx
export default function BookHeader() {
  return (
    <header>
      <h1>Bhagavad-gītā</h1>
      <p style={{ color: "#666" }}>
        A dialogue on duty, action, devotion, and liberation.
      </p>
    </header>
  );
}
```

---

## 7️⃣ Book Introduction (Gentle Orientation)

### `BookIntro.tsx`

```tsx
export default function BookIntro() {
  return (
    <section>
      <p>
        The Bhagavad-gītā is a sacred dialogue between Śrī Kṛṣṇa and Arjuna,
        spoken on the battlefield of Kurukṣetra.
      </p>
      <p>
        This library presents the text verse by verse, with optional
        commentary and educational context, allowing each reader to
        approach the Gītā at their own pace.
      </p>
    </section>
  );
}
```

📌 This is **orientation**, not interpretation.

---

## 8️⃣ Entry Points (Reader Choice)

### `BookEntryPoints.tsx`

```tsx
import Link from "next/link";

export default function BookEntryPoints() {
  return (
    <section>
      <h3>Begin Reading</h3>

      <ul>
        <li>
          <Link href="/bg/1">Start from Chapter 1</Link>
        </li>
        <li>
          <Link href="/bg/2/47">
            Go to a well-known verse (2.47)
          </Link>
        </li>
        <li>
          <Link href="/education/paths/bg_first_time_reader">
            Follow a guided reading path
          </Link>
        </li>
      </ul>
    </section>
  );
}
```

📌 Multiple beginnings.
No “recommended” path.

---

## 9️⃣ Book Structure (18 Chapters Overview)

### `BookStructure.tsx`

```tsx
import Link from "next/link";

export default function BookStructure() {
  return (
    <section>
      <h3>Chapters</h3>

      <ol>
        {Array.from({ length: 18 }, (_, i) => (
          <li key={i}>
            <Link href={`/bg/${i + 1}`}>
              Chapter {i + 1}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

📌 Simple, scannable, not dense.

---

## 🔟 Educational Entry Points (Optional)

### `BookEducationLinks.tsx`

```tsx
import Link from "next/link";

export default function BookEducationLinks() {
  return (
    <section>
      <h3>Study Aids</h3>

      <ul>
        <li>
          <Link href="/education/concepts">
            Concepts in the Bhagavad-gītā
          </Link>
        </li>
        <li>
          <Link href="/education/glossary">
            Glossary of Key Terms
          </Link>
        </li>
        <li>
          <Link href="/education/paths">
            Guided Reading Paths
          </Link>
        </li>
      </ul>
    </section>
  );
}
```

📌 Education is **invited**, not imposed.

---

## 1️⃣1️⃣ UX Rules Enforced

* No verse content on book home
* No commentary shown here
* No search dominance
* No authority tone
* Clear exits to reading

This page says:

> *“Here is the book. Enter as you wish.”*

---

## ✅ TRACK 5.6 Exit Checklist

Confirm:

* ⬜ `/bg` loads correctly
* ⬜ Clear title & intro
* ⬜ Chapters navigable
* ⬜ Reading entry points visible
* ⬜ Education links optional
* ⬜ Sidebar still works

If yes → **TRACK 5.6 COMPLETE (v1)**.

---

## 🌿 Where You Are Now (Big Picture)

You now have:

* Global shell ✔
* Sidebar navigation ✔
* Verse workspace ✔
* Context pane ✔
* Chapter hubs ✔
* **Book home ✔**

This is already a **complete scholarly reading system**.

---

## Next calm step (your choice)

1️⃣ Proceed to **TRACK 5.7 – Interaction Polish & Accessibility**
2️⃣ Refine Book Home language & structure
3️⃣ Pause and walk through the entire reader journey

Just tell me the number, dear 🙏

