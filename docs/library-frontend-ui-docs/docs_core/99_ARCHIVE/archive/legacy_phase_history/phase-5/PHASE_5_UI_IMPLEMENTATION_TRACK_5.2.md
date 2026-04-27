Excellent.
Now we build the **heart of the scholarly experience**: the **left sidebar collapsible navigation tree** — the feature that makes this feel like **Vedabase/Folio**, not a blog.

We will do this **cleanly, incrementally, and future-proof**.

---

# 🧱 TRACK 5.2 — Left Sidebar Navigation (Collapsible Tree)

This track delivers:

* Book → Chapter → Verse tree
* Expand / collapse (+ / −)
* Keyboard accessible
* Scroll-safe
* URL-driven (no fragile state)
* Ready for future śāstra, not hardcoded only to BG

No search. No commentary. No distractions.

---

## 1️⃣ Conceptual Model (Very Important)

The sidebar is a **navigation tree**, not a menu.

### Hierarchy

```
Śāstra
 └── Bhagavad-gītā
     ├── Chapter 1
     │    ├── 1.1
     │    ├── 1.2
     │    └── 1.3
     ├── Chapter 2
     │    ├── 2.1
     │    └── 2.2
```

### Rules

* Only **one level expands at a time per branch**
* Clicking a verse:

  * updates URL
  * loads main pane
  * does NOT collapse sidebar
* Expand/collapse state is **local UI state**
* Active verse is highlighted

---

## 2️⃣ Folder Structure (Sidebar)

Add:

```text
src/
├── components/
│   └── sidebar/
│       ├── Sidebar.tsx
│       ├── Tree.tsx
│       ├── TreeNode.tsx
│       └── useSidebarTree.ts
```

---

## 3️⃣ Tree Data (Temporary, Static)

For now, we hardcode Bhagavad-gītā structure.
Later, this will come from backend / JSON.

### `useSidebarTree.ts`

```ts
export type VerseNode = {
  type: "verse";
  chapter: number;
  verse: number;
};

export type ChapterNode = {
  type: "chapter";
  chapter: number;
  verses: VerseNode[];
};

export type BookNode = {
  type: "book";
  id: "bg";
  title: string;
  chapters: ChapterNode[];
};

export function useSidebarTree(): BookNode {
  const chapters: ChapterNode[] = [];

  for (let c = 1; c <= 18; c++) {
    const verses: VerseNode[] = [];
    const verseCount = c === 1 ? 47 : 72; // placeholder

    for (let v = 1; v <= verseCount; v++) {
      verses.push({ type: "verse", chapter: c, verse: v });
    }

    chapters.push({
      type: "chapter",
      chapter: c,
      verses,
    });
  }

  return {
    type: "book",
    id: "bg",
    title: "Bhagavad-gītā",
    chapters,
  };
}
```

⚠️ This is **temporary** but structurally correct.

---

## 4️⃣ Sidebar Container

### `Sidebar.tsx`

```tsx
import Tree from "./Tree";

export default function Sidebar() {
  return (
    <nav aria-label="Scripture navigation">
      <Tree />
    </nav>
  );
}
```

---

## 5️⃣ Tree Root

### `Tree.tsx`

```tsx
import { useSidebarTree } from "./useSidebarTree";
import TreeNode from "./TreeNode";

export default function Tree() {
  const book = useSidebarTree();

  return (
    <div>
      <TreeNode node={book} />
    </div>
  );
}
```

---

## 6️⃣ TreeNode (Expandable Logic)

### `TreeNode.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { BookNode, ChapterNode, VerseNode } from "./useSidebarTree";
import { usePathname } from "next/navigation";

type Node = BookNode | ChapterNode | VerseNode;

export default function TreeNode({ node }: { node: Node }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (node.type === "book") {
    return (
      <div>
        <button onClick={() => setOpen(!open)}>
          {open ? "−" : "+"} {node.title}
        </button>

        {open &&
          node.chapters.map((ch) => (
            <TreeNode key={ch.chapter} node={ch} />
          ))}
      </div>
    );
  }

  if (node.type === "chapter") {
    return (
      <div style={{ marginLeft: 16 }}>
        <button onClick={() => setOpen(!open)}>
          {open ? "−" : "+"} Chapter {node.chapter}
        </button>

        {open &&
          node.verses.map((v) => (
            <TreeNode
              key={`${v.chapter}.${v.verse}`}
              node={v}
            />
          ))}
      </div>
    );
  }

  // Verse
  const href = `/bg/${node.chapter}/${node.verse}`;
  const active = pathname === href;

  return (
    <div style={{ marginLeft: 32 }}>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        style={{
          fontWeight: active ? "bold" : "normal",
          textDecoration: active ? "underline" : "none",
        }}
      >
        {node.chapter}.{node.verse}
      </Link>
    </div>
  );
}
```

---

## 7️⃣ Mount Sidebar into Layout

Update **ThreePaneLayout.tsx**:

```tsx
import Sidebar from "@/components/sidebar/Sidebar";
```

Replace left `<aside>`:

```tsx
<aside
  aria-label="Navigation"
  style={{
    borderRight: "1px solid var(--border)",
    padding: "0.5rem",
    overflowY: "auto",
  }}
>
  <Sidebar />
</aside>
```

---

## 8️⃣ Keyboard & Accessibility Notes

Already handled:

* `<nav>` landmark
* Buttons for expand/collapse
* Links for verses
* `aria-current="page"` for active verse

Later we’ll add:

* Arrow-key navigation
* Remember open state per chapter

---

## 9️⃣ What You Should Test Now (Very Important)

Manually verify:

* ⬜ Book expands / collapses
* ⬜ Chapter expands / collapses
* ⬜ Clicking verse updates URL
* ⬜ Active verse highlights
* ⬜ Sidebar scrolls independently
* ⬜ Main pane does not reload shell

If all pass → **TRACK 5.2 COMPLETE (v1)**.

---

## 🌿 What Comes Next

You now have:

* A **real scholarly navigation system**
* No search dependency
* No UI gimmicks
* Infinite scalability (Śruti → Smṛti → Purāṇa…)

### Next choices:

1️⃣ Proceed to **TRACK 5.3 – Main Reading Pane (Verse Workspace)**
2️⃣ Improve sidebar (persist open state, better styling)
3️⃣ Pause and live with navigation for a day

Just tell me the number, dear 🙏

