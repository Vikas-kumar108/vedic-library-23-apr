Perfect.
We will now **translate vision into disciplined action** — without collapsing ethics into engineering.

Below is a **precise, phase-locked tasklist** that turns the **Phase 6 UI Preview** into an implementable roadmap, while still respecting that Phase 6 is *optional, human-centered, and opt-in*.

You may save this exactly as:

```
vedic-library/docs/PHASE_6_TASKLIST.md
```

---

```md
# 🧱 PHASE_6_TASKLIST.md  
## Vedic Library Project  
### Phase 6 — Courses, Teachers & Guided Study  
### Tasklist (Implementation Roadmap)

---

## 0. Phase 6 Scope Reminder (Read First)

Phase 6 introduces **guided learning** without disturbing:

- Phase 5 reading environment
- Canonical primacy
- Reader autonomy
- Non-algorithmic ethics

Phase 6 is **additive and optional**.

---

## 1. Phase 6 Entry Infrastructure (Foundation)

### 1.1 Create Dedicated Learning Namespace
- [ ] Create `/courses` route
- [ ] Create `/teachers` route
- [ ] Create `/guided-paths` route
- [ ] Ensure these routes are **not linked automatically** from verse pages

📌 Access must be intentional.

---

### 1.2 Update Global Navigation (Minimal)
- [ ] Add “Learning” item to header or footer
- [ ] Do NOT place in primary reading navigation
- [ ] Avoid call-to-action language

---

## 2. Course System (UI + Data)

### 2.1 Course Data Schema
- [ ] Define `Course` JSON schema:
  - id
  - title
  - description
  - scope
  - prerequisites (optional)
  - teacher_ids
  - referenced_verses (UIDs)
- [ ] Store initial courses as JSON (no DB yet)

---

### 2.2 Course Listing Page (`/courses`)
- [ ] Implement `CourseListPage`
- [ ] Display courses as neutral cards:
  - title
  - teacher(s)
  - scope
- [ ] No sorting by popularity
- [ ] No recommendations

---

### 2.3 Course Detail Page (`/courses/[course_id]`)
- [ ] Implement `CourseDetailPage`
- [ ] Show:
  - course overview
  - modules (if any)
  - referenced verses (as links)
- [ ] Ensure verse links open **Phase 5 Verse Workspace**

---

### 2.4 Course Enrollment (Optional)
- [ ] Add “Enroll” button (non-prominent)
- [ ] Enrollment is optional
- [ ] No progress tracking UI in Phase 6

---

## 3. Teacher System (Human-Centered)

### 3.1 Teacher Data Schema
- [ ] Define `Teacher` JSON schema:
  - id
  - name
  - lineage / background
  - teaching_scope
  - statement_of_approach
- [ ] Explicitly store scope limitations

---

### 3.2 Teacher Listing Page (`/teachers`)
- [ ] Implement `TeacherListPage`
- [ ] Display teachers alphabetically
- [ ] No ratings
- [ ] No popularity indicators

---

### 3.3 Teacher Profile Page (`/teachers/[teacher_id]`)
- [ ] Implement `TeacherProfilePage`
- [ ] Show:
  - background
  - lineage
  - courses offered
  - teaching scope disclaimer

---

## 4. Guided Study Paths (Human-Curated)

### 4.1 Guided Path Data Schema
- [ ] Define `GuidedPath` JSON schema:
  - id
  - title
  - curator (teacher_id)
  - purpose
  - ordered verse UIDs
  - optional reflections

---

### 4.2 Guided Path Listing Page (`/guided-paths`)
- [ ] Implement `GuidedPathListPage`
- [ ] Paths listed neutrally
- [ ] No “recommended” labels

---

### 4.3 Guided Path Detail Page (`/guided-paths/[path_id]`)
- [ ] Implement `GuidedPathDetailPage`
- [ ] Display:
  - purpose
  - curator
  - suggested reading order
- [ ] Verse links open in Phase 5 workspace

---

## 5. Integration with Phase 5 UI (Careful & Minimal)

### 5.1 Verse → Learning Cross-Links (Optional)
- [ ] Add subtle note:
  - “Appears in course: X”
- [ ] Links must be unobtrusive
- [ ] No auto-opening

---

### 5.2 Education → Learning Links
- [ ] From concepts/glossary pages:
  - link to related courses/paths
- [ ] Label clearly as “Guided Study”

---

## 6. Authentication & Roles (Light Touch)

### 6.1 Role Awareness
- [ ] Reuse Phase 3 auth
- [ ] Roles:
  - reader
  - student (enrolled)
  - teacher
- [ ] No UI privilege escalation

---

### 6.2 Teacher Access (Manual Initially)
- [ ] Teacher accounts created manually
- [ ] No self-publishing in Phase 6

---

## 7. Explicit UI & UX Guardrails (Must Enforce)

### Forbidden in Phase 6
- [ ] No dashboards with metrics
- [ ] No progress bars
- [ ] No completion badges
- [ ] No “Next lesson” pressure
- [ ] No AI teaching UI

---

## 8. Accessibility & Calmness Audit (Phase 6)

- [ ] Course pages keyboard accessible
- [ ] Teacher pages readable without login
- [ ] Learning UI does not distract from reading UI
- [ ] No notification overload

---

## 9. Documentation & Ethics Lock

### 9.1 Documentation
- [ ] Update `UI_UX_MASTER_PLAN.md` with Phase 6 reference
- [ ] Reference `PHASE_6_UI_PREVIEW.md` explicitly

---

### 9.2 Ethics Checkpoint
- [ ] Confirm all learning is opt-in
- [ ] Confirm no authority implied by UI
- [ ] Confirm reading remains primary experience

---

## 10. Phase 6 Exit Criteria

Phase 6 may be declared COMPLETE only if:

- [ ] Reading UI remains untouched
- [ ] Learning UI is optional
- [ ] Teachers are explicit and human
- [ ] No algorithmic guidance exists
- [ ] Courses reference verses, not replace them

---

## 🕉️ Closing Note

> **Phase 6 does not upgrade the reader.  
> It invites the seeker.**

If Phase 6 feels “quiet,” it is correct.

---

## ✅ Status

PHASE_6_TASKLIST.md is **ACTIVE**.

Phase 6 is now consciously open for implementation.
```

---

🌿 You have now **fully transitioned** from *library* to *living tradition*, without betraying either.

Whenever you wish, the next natural step could be:

* Designing **Course JSON schemas in detail**
* Designing **Teacher onboarding workflow**
* Or pausing to reflect before building

Just tell me, dear 🙏

