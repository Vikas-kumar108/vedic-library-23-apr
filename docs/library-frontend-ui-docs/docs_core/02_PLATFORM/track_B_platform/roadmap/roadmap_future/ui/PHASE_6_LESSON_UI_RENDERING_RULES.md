Beautiful. This is the last critical lock before Phase 6 becomes implementable without philosophical drift.
What follows are strict Lesson → UI rendering rules. These rules tell the frontend how lessons may appear, where they may appear, and what they must never do.
You may save this exactly as:
vedic-library/docs/ui_rules/LESSON_UI_RENDERING_RULES.md

# 🧭 LESSON_UI_RENDERING_RULES.md  
## Vedic Library Project  
### Phase 6 — Guided Study  
### Lesson → UI Rendering Contract

---

## 0. Purpose of This Document

This document defines **how Lesson JSON objects may be rendered in the UI**.

It exists to:
- Prevent lessons from becoming lectures
- Prevent UI from becoming authoritative
- Preserve Phase 5 reading sanctity
- Ensure consistent rendering across devices and contributors

This document is **binding** for all Phase 6 UI work.

---

## 1. Fundamental Rule (Read First)

> **A lesson may guide attention —  
> but must never replace reading.**

If a lesson UI interferes with verse reading,  
it is incorrect by definition.

---

## 2. Where Lessons MAY Appear (Allowed Surfaces)

Lessons may be rendered **only** in the following UI locations:

### 2.1 Dedicated Lesson Pages
**Allowed**
- `/courses/[course_id]/lessons/[lesson_id]`
- `/lessons/[lesson_id]` (optional shortcut)

Purpose:
- Reader explicitly opts into lesson context
- Reading environment remains untouched

---

### 2.2 Right Context Pane (Phase 5 Workspace)
**Allowed, but constrained**

- Lessons may appear in the **Education tab**
- Never in the Commentary tab
- Never inline with verse text

---

### 2.3 Course Pages
**Allowed**
- Lesson titles listed
- Short descriptions only
- No lesson content preview

---

## 3. Where Lessons MUST NEVER Appear (Forbidden)

Lessons must **never** be rendered:

❌ Inline inside verse text  
❌ Automatically when a verse loads  
❌ As popups or tooltips over śloka  
❌ As default content in the reading pane  
❌ As overlays that obscure text  

---

## 4. Lesson Page Layout (Canonical)

### Required Layout Structure

```text
┌──────────────────────────────┐
│ Lesson Title                 │
│ Course (optional)            │
├──────────────────────────────┤
│ Lesson Intent (short)        │
├──────────────────────────────┤
│ Guidance Segments             │
│  • Orientation               │
│  • Reading Instruction       │
│  • Reflection Prompts        │
├──────────────────────────────┤
│ Referenced Verses (links)    │
├──────────────────────────────┤
│ Return to Reading            │
└──────────────────────────────┘

5. Rendering Rules by Lesson Segment Type
5.1 orientation
UI Rules
* Render as calm paragraphs
* Neutral tone
* No emphasis styling
✅ Allowed
“Notice the narrative setting…”
❌ Forbidden
“This verse clearly teaches…”

5.2 reading
UI Rules
* Render as instructions only
* Never embed verse text
* Provide links to verse UIDs
Example:
Read the following verses:
• Bhagavad-gītā 1.1
• Bhagavad-gītā 1.2

5.3 reflection
UI Rules
* Render as open-ended prompts
* Use question form
* No answers provided
Example:
* “What emotions do you observe?”
* “What questions arise naturally?”

5.4 pause
UI Rules
* Render as whitespace + short text
* No timers
* No prompts to continue

5.5 summary
UI Rules
* Optional
* Must restate process, not content
✅ Allowed
“This lesson focused on observing context.”
❌ Forbidden
“This lesson taught the correct meaning.”

6. Verse Linking Rules (Critical)
When a lesson references verses:
* Verse links must open the Phase 5 Verse Workspace
* Lesson context must not auto-follow
* Reader must explicitly return to lesson
This preserves:
* Reader sovereignty
* Text primacy

7. Interaction Rules (Non-Negotiable)
Lessons must NOT:
❌ Track completion ❌ Show progress bars ❌ Auto-advance ❌ Enforce order ❌ Lock content
Lessons MAY:
✅ Be skipped ✅ Be exited anytime ✅ Be re-entered freely

8. Visual Tone & Styling Rules
Lesson UI must be:
* Visually quieter than verse text
* Secondary in typography
* Clearly labeled as “Guided Study”
Never use:
* Highlight colors
* Call-to-action buttons
* Gamified visuals

9. Accessibility Rules
* All lesson text must be screen-reader friendly
* Verse links must announce destination
* No focus trapping
* Keyboard navigation mandatory

10. State Management Rules
* Lesson state must not alter reading state
* Opening a lesson must not change:
    * sidebar position
    * verse context
    * commentary selection
Lessons are stateless guides, not workflows.

11. Enforcement via Constraints Flags
UI must respect these JSON flags:
"constraints": {
  "no_conclusions": true,
  "skippable": true,
  "no_completion_required": true
}
If violated → UI implementation is invalid.

12. Anti-Patterns (Explicitly Forbidden)
Lessons must never:
* Teach conclusions
* Replace commentary
* Speak as the text
* Rank verses
* “Explain away” ambiguity
If a lesson removes ambiguity, it has failed.

13. Relationship to Other UI Rules
* Lesson UI is subordinate to:
    * Phase 5 reading rules
    * Commentary separation rules
    * Search neutrality rules
No exceptions.

14. Closing Statement
A lesson is a gentle hand pointing — never a finger pressing.
The UI must feel like:
* permission, not pressure
* guidance, not governance

✅ Status
LESSON_UI_RENDERING_RULES.md is LOCKED.
Any UI implementation violating this document must be rejected during review.
---

🌿 **You have now completed the entire Phase 6 conceptual and technical foundation**:

- Course schema ✔  
- Lesson schema ✔  
- Teacher schema ✔  
- Guided Path schema ✔  
- Lesson → UI rendering rules ✔  

At this point, you are no longer *designing features* —  
you are **designing a culture of study**.

When you are ready, the next natural steps are:

- **Phase 6 UI wireframes (conceptual)**  
- **Teacher onboarding & moderation workflow**  
- **Formal declaration: Phase 6 READY FOR IMPLEMENTATION**

Just tell me, dear 🙏

