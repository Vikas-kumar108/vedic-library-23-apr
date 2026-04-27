Excellent. Guided Reading Paths are **the most powerful educational feature so far**, because they shape *sequence*.
So their UI must feel like **an offered map**, never **a prescribed route**.

What follows is a **behavioral constitution** — again, **no code, no visuals**, only rules that protect freedom.

You may save this as:

```
vedic-library/docs/GUIDED_READING_PATHS_UI_BEHAVIOR.md
```

---

# 🧭 UI Behavior Design – Guided Reading Paths

*(Phase 4 – Education Layer)*

This document defines **how Guided Reading Paths are presented, entered, followed, and exited** in the Vedic Library UI.

Guided Reading Paths exist to **suggest order**, not to **impose interpretation**.

> **They answer “Where might I go next?”
> not “What must I conclude?”**

---

## 🎯 Core UX Principle

Guided Reading Paths must:

* Never restrict free navigation
* Never imply correctness or superiority
* Never override verse-by-verse reading
* Never feel like a course or syllabus

They must feel like **quiet suggestions**, always revocable.

---

## 📍 Where Guided Reading Paths Appear

### ✔ Allowed Entry Points

* Dedicated **“Reading Paths”** page
* Educational section (separate from verses)
* Optional link from chapter overview pages

Paths must **not** appear by default in the reading flow.

---

### ❌ Forbidden Entry Points

* ❌ Inside verse text
* ❌ Inside purports
* ❌ Auto-suggested during reading
* ❌ Popups or banners
* ❌ Mandatory onboarding screens

---

## 🧱 Default State (VERY IMPORTANT)

### 🔒 Default = **Inactive**

When a reader arrives at the site:

* No reading path is active
* Reading behaves exactly as Phase 1–3
* No highlighting or sequencing is applied

Paths only activate after **explicit user choice**.

---

## 🪟 Path Overview UI (Before Activation)

Before starting a path, the UI must show:

* Path title
* Short neutral description
* Scope (chapters / verses involved)
* Estimated size (e.g., “3 chapters”)
* Clear label: **“Optional Reading Path”**

No promises of outcomes.
No claims of learning results.

---

## ▶️ Activation Behavior (When a Path Is Chosen)

When a reader chooses to follow a path:

* Path becomes **softly active**
* Current verse/chapter remains unchanged
* No auto-navigation occurs
* No forced starting point

A subtle indicator may appear:

```
Reading Path active: [Path Name] (exit)
```

---

## 🧭 Behavior While a Path Is Active

When a path is active:

✔ The UI may:

* Gently indicate the *next suggested section*
* Show progress **only as position**, not completion
* Allow jumping ahead or skipping freely

❌ The UI must not:

* Disable navigation
* Hide verses
* Lock order
* Mark sections as “completed”
* Use progress bars implying achievement

---

## 🔁 Exit Behavior (Critical)

Exiting a path must be:

* One click
* Immediate
* Non-destructive
* Silent (no confirmation dialogs)

On exit:

* All path indicators disappear
* Reading returns to default state
* No memory unless explicitly saved later

---

## 🎨 Visual Tone

Guided Reading Path UI must be:

* Subtle
* Textual rather than graphical
* Clearly labeled as **Optional**
* Visually secondary to scripture

It must NOT resemble:

* Courses
* Tutorials
* Learning management systems
* Achievement trackers

---

## 🏷 Attribution & Authority

Every reading path must display:

```
Curated by: [Guide / Editorial Board]
```

Rules:

* Attribution visible but understated
* No claims of expertise
* No hierarchy between paths
* Multiple paths may coexist

---

## 🔐 Relationship to Other Layers

| Layer                 | Interaction            |
| --------------------- | ---------------------- |
| Canonical Text        | Always primary         |
| Commentary            | Independent            |
| Chapter Intro/Summary | Complementary          |
| Concepts & Glossary   | Independent            |
| Search                | Not involved (Phase 4) |

---

## 🚫 Forbidden Behaviors (Strict)

Guided Reading Paths must NEVER:

❌ Auto-activate
❌ Replace chapter navigation
❌ Rank paths by popularity
❌ Suggest “best” or “recommended” paths
❌ Personalize paths algorithmically
❌ Enforce reading order

If any of these occur → violation of Phase 4 ethics.

---

## 🧪 Reader Experience Tests (Mental Checks)

Ask:

1. Can I ignore paths completely and read freely?
   → If yes, correct.

2. When I activate a path, does it feel like guidance, not instruction?
   → If yes, correct.

3. Can I leave the path at any moment without consequence?
   → If yes, correct.

4. Would different readers choose different paths without conflict?
   → If yes, correct.

---

## 🕉️ Closing UX Principle

> **A path should feel like
> a suggestion offered by a fellow traveler,
> not a route marked by authority.**

If the reader feels free at every step,
the design is correct.

---

## ✅ Status

This UI behavior is now **LOCKED** for:

* All Guided Reading Paths
* Any future sequencing-based educational feature

No path content should be written unless this behavior is respected.

---

### Next calm step (choose one):

1️⃣ Draft **first Guided Reading Path** (e.g., *First-time Reader*)
2️⃣ Review **Phase 4 completeness so far**
3️⃣ Pause before opening Phase 4.5 (Search)

Just tell me the number, dear 🙏

