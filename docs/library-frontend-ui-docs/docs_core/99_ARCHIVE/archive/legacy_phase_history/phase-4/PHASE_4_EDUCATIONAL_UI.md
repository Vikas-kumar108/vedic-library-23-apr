Excellent choice. **UI behavior must be locked before words are written.**
What follows is a **behavioral constitution**, not a mockup and not code.

You can later save this as:

```
vedic-library/docs/CHAPTER_INTRO_UI_BEHAVIOR.md
```

---

# 🧭 UI Behavior Design – Chapter Introductions

*(Phase 4 – Education Layer)*

This document defines **how Chapter Introductions appear, behave, and disappear** in the Vedic Library UI.

The goal is simple:

> **Education must feel like an open doorway, not a voice interrupting the room.**

---

## 🎯 Core UX Principle

Chapter Introductions must:

* Never interrupt reading
* Never demand attention
* Never obscure scripture
* Never feel instructional

They must feel **ignorable by design**.

---

## 📍 Placement Rules (Where It Appears)

### ✔ Correct Placement

* Appears **once per chapter**
* Appears **before verse 1**
* Appears **above the first verse**, not embedded inside text
* Appears **after chapter header**, not before navigation

**Visual order:**

```
Bhagavad-gītā
Chapter 1

[ Chapter Introduction (collapsed by default) ]

1.1 dhṛtarāṣṭra uvāca …
```

---

### ❌ Forbidden Placement

* ❌ Inside verse blocks
* ❌ Between verses
* ❌ As a popup
* ❌ As a modal
* ❌ As a tooltip

---

## 🧱 Default State (VERY IMPORTANT)

### 🔒 Default = **Collapsed**

When a reader opens a chapter:

* Chapter Introduction is **collapsed**
* Only a small, calm indicator is visible

Example label:

```
▸ Chapter Introduction (optional)
```

This respects:

* Experienced readers
* Scholars
* Repeat visitors

---

## 🪟 Expansion Behavior (When Opened)

When the reader **explicitly clicks**:

* Introduction expands **inline**
* No page jump
* No overlay
* No dimming of background

The text appears as a **soft panel**, visually distinct from scripture.

---

## 🎨 Visual Differentiation (Without Loudness)

Chapter Introduction must be visually distinct but subdued.

### Visual characteristics:

* Slightly muted background
* Smaller or softer heading
* Clear label: **“Educational Introduction”**
* No icons suggesting authority

### Must NOT look like:

* Commentary
* Purport
* Explanation
* Teaching box

---

## 🏷 Labeling & Attribution (Mandatory)

Every Chapter Introduction must show:

```
Educational Introduction
By: [Guide Name or Editorial Board]
```

Rules:

* Attribution visible but not emphasized
* No titles (no “Ācārya”, no “Teacher”)
* Role shown as **Guide**

---

## 🔁 Persistence Rules

### Per Session

* If a user opens the introduction once:

  * It may remain open **during that session**
* On page refresh:

  * Resets to collapsed

### Logged-in Users (Later, Optional)

* May remember preference to auto-expand
* This is optional and **not Phase 4 critical**

---

## 🚫 Forbidden Behaviors (Strict)

Chapter Introductions must NEVER:

❌ Auto-open
❌ Auto-scroll
❌ Highlight verses
❌ Inject links inside verses
❌ Trigger on hover
❌ Block verse rendering
❌ Appear in search results (Phase 4)

If any of these occur → UX violation.

---

## 🧪 Reader Experience Tests (Mental Checks)

Ask these questions:

1. Can I read the entire chapter without noticing this exists?
   → If yes, correct.

2. When I open it, does it feel like context, not instruction?
   → If yes, correct.

3. Can I close it instantly and forget it?
   → If yes, correct.

4. Would a traditional scholar feel disturbed by its presence?
   → If no, correct.

---

## 🔐 Relationship to Other Layers

| Layer           | Interaction           |
| --------------- | --------------------- |
| Canonical Text  | Untouched             |
| Commentary      | Completely separate   |
| Language Toggle | Independent           |
| Reading Paths   | May reference chapter |
| Search          | Not indexed (Phase 4) |

---

## 🕉️ Closing UX Principle

> **The best educational UI is one
> that thanks the reader for inviting it.**

If the reader feels *invited* rather than *instructed*,
this UI behavior is correct.

---

## ✅ Status

This UI behavior is now **LOCKED** for:

* Chapter 1 Introduction
* All future chapter introductions

No writing should begin until this behavior is respected.

---

### Next calm step (choose one):

1️⃣ Draft the **actual Chapter 1 Introduction text**
2️⃣ Design UI behavior for **Chapter Summaries**
3️⃣ Define **Guide review & approval workflow**

Just tell me the number, dear 🙏

