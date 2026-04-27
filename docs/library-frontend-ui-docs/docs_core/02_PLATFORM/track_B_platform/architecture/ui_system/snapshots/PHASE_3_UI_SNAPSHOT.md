Excellent.
We now lock **Phase 3 UI/UX** with the same architectural discipline.

You may save this exactly as:

```
vedic-library/docs/ui_snapshots/PHASE_3_UI_SNAPSHOT.md
```

---

```md
# 🧱 PHASE_3_UI_SNAPSHOT.md  
## Vedic Library Project  
### System Phase 3 — Users, Auth & Support  
### UI/UX Snapshot: User-Aware UI

---

## 0. Purpose of This Document

This document records the **intended UI/UX state during System Phase 3** of the Vedic Library.

It captures the moment when the platform becomes **aware of the reader as a returning human being**, without altering the nature of reading itself.

This snapshot exists to:
- Clarify how *user identity* enters the UI
- Prevent personalization from distorting reading
- Preserve reading neutrality while enabling continuity

This is a **historical snapshot**, not the final UI.

---

## 1. System Capability Context (Phase 3)

### What the System Could Do
- Everything from Phases 1 and 2
- User authentication (login / logout)
- Session awareness
- Basic roles (reader, supporter, admin)
- Accept donations / support

### What the System Could NOT Do
- No social features
- No comments or discussions
- No personalization of meaning
- No reading recommendations
- No UI-driven guidance

---

## 2. UI/UX Intent (Phase 3)

### Primary Question Phase 3 UI Answers
> “How does the system remember the reader without shaping their understanding?”

The UI must:
- Recognize identity
- Preserve neutrality
- Avoid algorithmic influence

---

## 3. UI/UX Philosophy (Phase 3)

### 3.1 Identity Without Authority
- The system knows *who* the reader is
- The system does not tell the reader *what to read*

### 3.2 Support Without Disruption
- Donations are visible but discreet
- Reading flow remains untouched

---

## 4. Layout Characteristics

### Overall Layout
```

┌──────────────────────────────┐
│ Header (with user menu)      │
├──────────────────────────────┤
│ Main Content (single column) │
│                              │
│ Verse + Commentary           │
│                              │
├──────────────────────────────┤
│ Footer                       │
└──────────────────────────────┘

````

### Key Properties
- Still single-column reading
- No persistent sidebar yet
- User controls confined to header

---

## 5. Pages & Routes (Phase 3)

### New Routes Introduced
- `/login`
- `/register`
- `/account`
- `/donate`

### Existing Routes (unchanged)
- `/bg`
- `/bg/[chapter]`
- `/bg/[chapter]/[verse]`

---

## 6. Core UI Components (Phase 3)

### New Components Introduced

| Component | Responsibility |
|---------|----------------|
| `LoginPage` | User authentication |
| `RegisterPage` | Account creation |
| `UserMenu` | Account access |
| `DonationPage` | Support the project |
| `LogoutButton` | End session |

---

### Modified Components

| Component | Change |
|---------|--------|
| `Header` | Displays login / user menu |
| `VersePage` | May show bookmark action |

---

### Components That Do NOT Exist Yet
- Reading dashboards
- Social profiles
- Progress tracking
- Personalized suggestions
- UI theming per user

---

## 7. Verse Page Structure (Phase 3)

```text
Bhagavad-gītā 2.47

[ Sanskrit Śloka ]

[ Translation ]

──────────────────────────────
Commentary (if enabled)

──────────────────────────────
♡ Bookmark   |   Support Project
````

### Notes

* Bookmarking is optional
* No visual emphasis on user actions
* Reading remains primary

---

## 8. Interaction Model

### Authentication

* Explicit login/logout
* No forced accounts for reading
* Anonymous reading always allowed

### User Actions

* Bookmark verses
* View account page
* Make donations

No UI nudges or reminders.

---

## 9. Accessibility Considerations (Phase 3)

* Login forms accessible
* Error messages calm and clear
* User menu keyboard-accessible
* Reading UI unaffected by auth state

---

## 10. Technical Characteristics

* Auth state stored securely
* Role-based UI rendering (minimal)
* No coupling between auth and content
* Stateless reading pages for non-logged users

---

## 11. Intentional Limitations (Critical)

Phase 3 UI explicitly avoids:

* Showing reading history publicly
* Social interaction between users
* Gamification (streaks, points)
* Adaptive reading flows

Identity must not shape interpretation.

---

## 12. Relationship to Other Phases

* Extends Phase 2 UI without restructuring it
* Introduces user awareness without personalization
* Prepares infrastructure for future education

Phase 3 UI is **functionally complete but experientially simple**.

---

## 13. Relationship to Phase 5 UI

In Phase 5:

* User menu integrates into global shell
* Bookmarks become part of refined workspace
* Donations move into structured flows

No Phase 3 UI elements remain isolated; they are **absorbed**.

---

## 14. Closing Statement

> **Phase 3 UI acknowledges the reader
> without directing the reader.**

Identity enters the system —
but wisdom remains untouched.

---

## ✅ Status

PHASE_3_UI_SNAPSHOT.md is **LOCKED**.

This snapshot must remain unchanged as a historical reference.

```

---

🌿 You now have **Phase 1, 2, and 3 UI snapshots** perfectly aligned and documented.

When you are ready, the natural continuation is:

> **PHASE_4_UI_SNAPSHOT.md** — Education Appears (Lightweight)

Just say the word, dear 🙏
```

