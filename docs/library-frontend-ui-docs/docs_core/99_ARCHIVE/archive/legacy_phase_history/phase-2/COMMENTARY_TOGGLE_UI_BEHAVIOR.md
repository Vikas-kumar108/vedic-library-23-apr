# 🪟 Commentary Toggle UI Behavior – Phase 2 (No Code)

This document defines **how the multi-ācārya commentary selection UI behaves**
in **Phase 2** of the Vedic Library project.

This is a **behavioral contract**, not an implementation guide.

The purpose is to ensure:
- Calm reading
- Respectful comparison
- No visual noise
- No interpretive bias

---

## 🎯 Purpose of Commentary Toggle

The commentary toggle exists to allow a reader to:

- Read **the same verse**
- Through **different traditional lenses**
- One at a time
- Without confusion or pressure

The toggle is **a selector**, not a debate tool.

---

## 🧱 Fundamental Principles (Non-Negotiable)

1. **One commentary visible at a time**
2. **Canonical text never moves**
3. **Toggle does not change URL**
4. **Toggle does not reload the page**
5. **Toggle does not imply hierarchy**
6. **UI must remain visually quiet**

Violation of any rule breaks Phase 2.

---

## 📍 Placement in the Verse Page

### Fixed Order (Unchanged from Phase 1)

1. Verse Header (BG X.Y)
2. Sanskrit Śloka
3. Transliteration
4. Synonyms
5. Translation
6. **Commentary Selector**
7. **Selected Commentary Content**

The selector appears **immediately above** the commentary text.

---

## 🧭 Commentary Selector – Visual Form

### Preferred UI Form (Phase 2)

- Horizontal button group
- OR simple dropdown (if many ācāryas)
- Neutral typography
- No icons
- No colors indicating “better” or “worse”

### Example Labels (Human-Readable)

- Prabhupāda
- Śaṅkarācārya
- Rāmānujācārya
- Madhvācārya

Internal IDs are never shown.

---

## 🔁 Toggle Behavior

### Initial State (Very Important)

- Default selected commentary: **Prabhupāda**
- Reason:
  - Completeness
  - Modern availability
  - Clear English prose

This default may be revisited later, but Phase 2 fixes it.

---

### When User Selects a Commentary

The UI must:

- Instantly replace commentary text
- Keep scroll position stable
- Not animate aggressively
- Not affect other sections

The UI must NOT:

- Reload the page
- Collapse the verse
- Hide canonical text
- Show comparison views

---

## 🌐 Language Interaction

The commentary toggle and language toggle are **independent**.

Behavior matrix:

| Action | Result |
|---|---|
| Change commentary | Language remains same |
| Change language | Same commentary, different language |
| Commentary lacks language | Fallback to English |

The UI should **never block** due to missing translations.

---

## 🧾 Commentary Metadata Display

Metadata is displayed **subtly**, below the commentary title.

Allowed metadata:
- Ācārya name
- Sampradāya
- Source (optional)
- AI-assisted flag (if applicable)

Not allowed:
❌ Editorial notes  
❌ Comparative remarks  
❌ Opinions  

---

## 🚫 Explicitly Forbidden UI Patterns

The following are NOT allowed in Phase 2:

❌ Side-by-side comparison columns  
❌ Tabs with animations  
❌ Collapsible accordion debates  
❌ Ratings or likes  
❌ Highlighting differences  
❌ “Recommended” labels  

Phase 2 is not a classroom debate.

---

## 🧠 Accessibility & Calmness Rules

- Keyboard accessible
- Readable font sizes
- No flashing
- No auto-scrolling
- No sticky UI that covers text

Reading must feel **undisturbed**.

---

## 🔄 State Persistence (Phase 2 Decision)

In Phase 2:

- Commentary selection is **not persisted**
- Page refresh resets to default

Persistence is a Phase 3 feature (user accounts).

---

## 🧪 Phase 2 Acceptance Criteria (UI)

The commentary toggle UI is considered correct if:

- A new reader understands it without explanation
- A scholar is not irritated by it
- The text remains the focus
- Phase 1 reading experience feels unchanged

---

## 🕉️ Guiding Principle

> **The UI must step aside  
> so that the ācārya may speak.**

The best commentary toggle is the one the reader forgets is there.

