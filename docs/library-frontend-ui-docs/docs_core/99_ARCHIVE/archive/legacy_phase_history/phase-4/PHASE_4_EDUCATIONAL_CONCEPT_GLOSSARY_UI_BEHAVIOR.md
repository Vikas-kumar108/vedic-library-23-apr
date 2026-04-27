Excellent. Concept & Glossary links are **the most delicate educational UI element**, because they sit **closest to the text**.
If mishandled, they feel like interruptions; if done right, they feel like quiet clarifications.

What follows is a **behavioral constitution** — not code, not styling — that protects śāstra primacy.

You may save this as:

```
vedic-library/docs/CONCEPT_GLOSSARY_UI_BEHAVIOR.md
```

---

# 🧭 UI Behavior Design – Concept & Glossary Links

*(Phase 4 – Education Layer)*

This document defines **how concepts and glossary terms are surfaced, revealed, and dismissed** in the Vedic Library UI.

Concept & Glossary links exist to **clarify words**, not to **teach philosophy**.

> **They answer “What does this term mean?”
> not “What does this verse mean?”**

---

## 🎯 Core UX Principle

Concept & Glossary UI must:

* Never interrupt reading flow
* Never pull attention away from the verse
* Never feel like commentary
* Never suggest interpretation

They must feel like **quiet footnotes**, not explanations.

---

## 📍 Where Concept & Glossary Links Appear

### ✔ Allowed Locations

* On **specific terms only**, not whole verses
* On:

  * Sanskrit terms (IAST or Devanāgarī)
  * Repeated philosophical words (e.g., dharma, karma)
* Appearing **inline with text**

Example (conceptual):

```
… svadharmaṁ api cāvekṣya …
        ↑
      subtle indicator
```

---

### ❌ Forbidden Locations

* ❌ On entire verses
* ❌ On sentence blocks
* ❌ Inside purports
* ❌ Inside commentary text
* ❌ In navigation elements

---

## 🧱 Visual Marking (Subtle Only)

Concept & Glossary terms must be:

* Underlined **very lightly** OR
* Dotted underline OR
* Small superscript indicator

Rules:

* No bright colors
* No icons
* No bold emphasis
* No hover animations

If the term draws attention before reading → violation.

---

## 🖱 Interaction Model (Critical)

### Primary Interaction = **Explicit Click**

* No hover popups
* No auto-tooltips
* No long-press behavior

Reason:

> Hover-based UI interrupts reading and creates accidental triggers.

---

## 🪟 Display Behavior (When Activated)

When a reader **explicitly clicks** a term:

### ✔ Correct Behavior

* Opens a **small inline panel** OR **side panel**
* Does **not** obscure the verse
* Does **not** shift scroll position
* Does **not** block reading

The verse must remain **fully visible**.

---

### ❌ Forbidden Behavior

* ❌ Modal dialogs
* ❌ Full-screen overlays
* ❌ Popups covering text
* ❌ Auto-scrolling to glossary pages

---

## 📘 Content Scope (Very Important)

### Glossary Terms

* Short definition only
* One or two sentences max
* Linguistic clarification

### Concept Entries

* Short neutral explanation
* Contextual, not doctrinal
* May reference verses, but not interpret them

Neither may:

* Explain what the verse teaches
* Compare schools
* Assert conclusions

---

## 🏷 Labeling & Attribution

Every panel must clearly show:

```
Glossary Term
or
Concept Note
```

With optional attribution:

```
Source: Vedic Library Editorial
```

Rules:

* No “Explanation”
* No “Meaning of this verse”
* No authorial voice claiming authority

---

## 🔁 Persistence Rules

* Panel closes when:

  * User clicks outside
  * User clicks close icon
* Panel state does NOT persist across navigation
* No auto-open preferences in Phase 4

The reader must always choose to reopen.

---

## 🚫 Forbidden Behaviors (Strict)

Concept & Glossary UI must NEVER:

❌ Auto-open on page load
❌ Trigger on hover
❌ Highlight verses
❌ Chain multiple popups
❌ Inject links inside purport logic
❌ Replace reading with explanation

If any of these occur → UX violation.

---

## 🧪 Reader Experience Tests (Mental Checks)

Ask:

1. Can I read the verse smoothly without interacting?
   → If yes, correct.

2. When I click the term, does it clarify *only the word*?
   → If yes, correct.

3. Can I close it instantly and continue reading?
   → If yes, correct.

4. Does it feel optional and ignorable?
   → If yes, correct.

---

## 🔐 Relationship to Other Layers

| Layer                 | Interaction            |
| --------------------- | ---------------------- |
| Canonical Text        | Untouched              |
| Commentary            | Independent            |
| Chapter Intro/Summary | Separate               |
| Guided Paths          | May reference concepts |
| Search                | Not indexed (Phase 4)  |

---

## 🕉️ Closing UX Principle

> **A concept note should feel like
> whispering the meaning of a word,
> not speaking over the verse.**

If the reader feels **helped, not guided**,
this UI behavior is correct.

---

## ✅ Status

This UI behavior is now **LOCKED** for:

* Concept explanations
* Glossary terms
* Any inline educational clarification

No concept or glossary content should be written
unless this behavior is respected.

---

### Next calm step (choose one):

1️⃣ Draft **Concept explanation: “Dharma”**
2️⃣ Draft **Glossary term: “Svadharma”**
3️⃣ Pause and review Phase 4 completeness so far

Just tell me the number, dear 🙏

