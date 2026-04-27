Excellent. Chapter Summaries require **even more restraint** than introductions, because they appear **after** reading and can easily feel like a “conclusion” if mishandled.

What follows is a **behavioral constitution** for Chapter Summaries — again, **no code, no mockups**, only rules that protect the reader’s freedom.

You may save this as:

```
vedic-library/docs/CHAPTER_SUMMARY_UI_BEHAVIOR.md
```

---

# 🧭 UI Behavior Design – Chapter Summaries

*(Phase 4 – Education Layer)*

This document defines **how Chapter Summaries appear, behave, and disappear** in the Vedic Library UI.

Chapter Summaries are **retrospective aids**, not interpretive conclusions.

> **They help the reader recall what was read —
> not decide what it meant.**

---

## 🎯 Core UX Principle

Chapter Summaries must:

* Never feel final
* Never feel authoritative
* Never replace re-reading
* Never imply “this is the meaning”

They must feel like **a quiet recap**, offered only after the journey.

---

## 📍 Placement Rules (Where It Appears)

### ✔ Correct Placement

* Appears **after the final verse of a chapter**
* Appears **below the last verse**, never above
* Appears **before navigation to next chapter**

**Visual order:**

```
… last verse of Chapter 1 …

[ Chapter Summary (optional) ]

→ Proceed to Chapter 2
```

This reinforces:

* Reading first
* Reflection second
* Continuation third

---

### ❌ Forbidden Placement

* ❌ Before the last verse
* ❌ Between verses
* ❌ As a sidebar
* ❌ As a popup or modal
* ❌ As an auto-appearing panel

---

## 🧱 Default State (VERY IMPORTANT)

### 🔒 Default = **Collapsed**

On reaching the end of a chapter:

```
▸ Chapter Summary (optional)
```

Rules:

* Never auto-expanded
* Never animated to draw attention
* Never highlighted

This ensures:

* Readers are not told “what they should take away”
* Scholars can ignore it completely

---

## 🪟 Expansion Behavior (When Opened)

When the reader **explicitly chooses** to open it:

* Summary expands inline
* No scroll jump
* No overlay
* No background dimming

The summary should appear as **a gentle reflection panel**, visually quieter than the text above it.

---

## 🎨 Visual Tone & Differentiation

Chapter Summaries must be:

* Visually distinct from:

  * Canonical text
  * Commentary
* Slightly lighter or muted
* Clearly labeled **“Educational Summary”**

They must NOT resemble:

* Commentary conclusions
* Teaching notes
* Moral verdicts

---

## 🏷 Labeling & Attribution (Mandatory)

Every Chapter Summary must display:

```
Educational Summary
By: [Guide Name or Editorial Board]
```

Rules:

* Attribution visible but understated
* Role shown as **Guide**
* No honorifics
* No claims of authority

---

## 🔁 Persistence Rules

### Per Session

* If opened, it may remain open **only until navigation**
* Moving to next chapter resets state

### Logged-in Users

* No auto-open preference in Phase 4
* Summaries must always require explicit intent

This protects against unconscious influence.

---

## 🚫 Forbidden Behaviors (Strict)

Chapter Summaries must NEVER:

❌ Auto-open at chapter end
❌ Highlight verses retroactively
❌ Use evaluative language (“therefore”, “thus we see”)
❌ Present conclusions or doctrines
❌ Contain calls to action
❌ Appear in search results (Phase 4)

If any of these occur → UX violation.

---

## 🧪 Reader Experience Tests (Mental Checks)

Ask these questions:

1. Can I finish the chapter and move on without noticing this?
   → If yes, correct.

2. When I open it, does it simply help me recall events or themes?
   → If yes, correct.

3. Does it avoid telling me *what the chapter ultimately teaches*?
   → If yes, correct.

4. Would two readers disagree after reading it?
   → If yes, that’s good — it did not impose meaning.

---

## 🔐 Relationship to Other Layers

| Layer                | Interaction           |
| -------------------- | --------------------- |
| Canonical Text       | Already read          |
| Commentary           | Separate, untouched   |
| Chapter Introduction | Independent           |
| Reading Paths        | May reference chapter |
| Search               | Not indexed (Phase 4) |

---

## 🕉️ Closing UX Principle

> **A summary should feel like
> gently looking back over one’s steps,
> not being told where the path leads.**

If the reader feels free to disagree with the summary,
it has done its job.

---

## ✅ Status

This UI behavior is now **LOCKED** for:

* Chapter Summaries
* All future summary-type educational content

No summary text should be written unless this behavior is respected.

---

### Next calm step (choose one):

1️⃣ Draft **Chapter 1 Summary** text
2️⃣ Design UI behavior for **Concept & Glossary links**
3️⃣ Pause and review Phase 4 alignment

Just tell me the number, dear 🙏

