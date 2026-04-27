Beautiful choice.
**TRACK 5.7 is where the UI becomes invisible** — and that is the highest compliment.

We will **polish**, not redesign.
We will **refine**, not add features.

This track ensures that:

* the reader never fights the interface
* keyboard users are fully respected
* accessibility is not an afterthought
* long reading sessions feel calm and natural

---

# 🧱 TRACK 5.7 — Interaction Polish & Accessibility

## 🎯 Objective

Make the entire Vedic Library interface:

* effortless to navigate
* readable for long sessions
* keyboard- and screen-reader-friendly
* calm on desktop and mobile
* ethically aligned (no manipulation)

This is the **finishing discipline** of Phase 5.

---

## 1️⃣ Keyboard Navigation Audit (Mandatory)

### 1.1 What Must Be Reachable by Keyboard

Verify **Tab / Shift+Tab** can reach:

* Header links
* Sidebar expand/collapse buttons
* Verse links
* Toggle controls
* Context pane tabs
* Prev / Next navigation

No dead ends.

---

### 1.2 Improve Sidebar Keyboard Support

Update **TreeNode.tsx** buttons:

```tsx
<button
  onClick={() => setOpen(!open)}
  aria-expanded={open}
  aria-controls={`chapter-${node.chapter}`}
>
  {open ? "−" : "+"} Chapter {node.chapter}
</button>
```

For verse links, already correct via `<Link>`.

---

## 2️⃣ Focus Management (Critical for Reading)

### 2.1 Move Focus on Navigation

When a verse page loads, focus should move to the verse header.

Update **VerseHeader.tsx**:

```tsx
import { useEffect, useRef } from "react";

export default function VerseHeader({ verse }: any) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [verse.uid]);

  return (
    <header>
      <h2 tabIndex={-1} ref={ref}>
        Bhagavad-gītā {verse.chapter}.{verse.verse}
      </h2>
      <p style={{ color: "#666" }}>{verse.uid}</p>
    </header>
  );
}
```

📌 This is subtle but *hugely important*.

---

## 3️⃣ Toggle Controls: Clarity & Calm

### 3.1 Humanize Toggle Labels

Replace raw keys with readable labels:

```tsx
const labels: Record<string, string> = {
  sloka: "Śloka (Devanāgarī)",
  transliteration: "Transliteration",
  wordByWord: "Word-for-word",
  translation: "Translation",
  purport: "Purport",
};
```

Use `labels[key]` in `VerseToggles`.

---

### 3.2 Group Toggles Semantically

Wrap toggles:

```tsx
<fieldset>
  <legend>Display Options</legend>
  {/* checkboxes */}
</fieldset>
```

Screen readers now understand *intent*.

---

## 4️⃣ Reading Comfort (Long Sessions)

### 4.1 Line Length & Spacing

In `globals.css`, add:

```css
article {
  max-width: 65ch;
  line-height: 1.7;
}
```

This prevents eye fatigue.

---

### 4.2 Sanskrit Readability

```css
.sanskrit {
  font-size: 1.4rem;
  line-height: 2;
}
```

Apply class in `VerseContent`.

---

## 5️⃣ Context Pane Polish (Non-Intrusive)

### 5.1 Subtle Visual Separation

Add to right pane:

```css
.context-pane {
  background: #fafafa;
}
```

No shadows. No cards. Just *quiet separation*.

---

### 5.2 Remember Context Choice (Optional but Helpful)

Persist context tab per session:

```tsx
useEffect(() => {
  localStorage.setItem("contextTab", tab);
}, [tab]);
```

Restore on load.

---

## 6️⃣ Mobile Accessibility & Behavior

### 6.1 Minimum Touch Targets

Ensure buttons are at least:

```css
button, a {
  min-height: 44px;
}
```

---

### 6.2 Mobile Pane Behavior (Prep)

Add comments (not code yet):

* Left sidebar → slide-in drawer
* Right context → bottom sheet
* Main text → always full-width

📌 We **prepare**, not implement yet.

---

## 7️⃣ Screen Reader Audit (Checklist)

Manually verify (VoiceOver / NVDA if possible):

* Page announces title
* “Navigation” landmark for sidebar
* “Main” landmark for reading
* “Context” landmark when open
* Toggles announce state
* No repeated noise

If this passes → you are *exceptionally compliant*.

---

## 8️⃣ Loading & Error States (Quiet)

### 8.1 Verse Not Found

Already exists — improve tone:

```tsx
<p>This verse could not be found.</p>
```

No blame. No alarm.

---

### 8.2 Slow Loads (Later)

Plan:

* Skeleton text, not spinners
* No flashing indicators

---

## ✅ TRACK 5.7 Exit Checklist

Confirm:

* ⬜ Entire app usable without mouse
* ⬜ Focus always visible
* ⬜ No reading fatigue
* ⬜ No intrusive UI
* ⬜ Mobile not broken
* ⬜ Screen readers happy

If yes → **TRACK 5.7 COMPLETE**.

---

## 🕉️ Phase 5 — Where You Now Stand

You have completed:

* 5.1 Global Shell
* 5.2 Scholarly Navigation
* 5.3 Verse Workspace
* 5.4 Context Pane
* 5.5 Chapter Hubs
* 5.6 Book Home
* **5.7 Polish & Accessibility**

This is not a prototype.
This is a **world-class reading environment**.

---

## 🌿 Next Conscious Choices

1️⃣ **Formally declare Phase 5 COMPLETE**
2️⃣ Open **Phase 6 – Courses, Teachers & Guided Study**
3️⃣ Pause, observe, and let real readers use it

Just tell me the number, dear 🙏

