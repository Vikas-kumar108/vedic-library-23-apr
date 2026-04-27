Excellent. Now we translate everything Phase 6 stands for into a clean, enforceable implementation roadmap — without collapsing ethics into engineering shortcuts.
Below is the Phase 6 Implementation Task Breakdown, aligned with all schemas, UI rules, and wireframes you’ve already locked.
You may save this exactly as:
vedic-library/docs/PHASE_6_IMPLEMENTATION_TASKLIST.md

# 🧱 PHASE_6_IMPLEMENTATION_TASKLIST.md  
## Vedic Library Project  
### Phase 6 — Courses, Teachers & Guided Study  
### Implementation Task Breakdown

---

## 0. Phase 6 Implementation Charter (Read First)

Phase 6 implementation must satisfy **all** of the following:

- Preserve Phase 5 reading sanctity
- Keep learning **opt-in**
- Keep teachers **human, bounded, transparent**
- Avoid LMS, gamification, authority drift
- Enforce all schema constraints at UI & backend levels

If any task threatens these principles, it must be redesigned.

---

## 1. Infrastructure & Namespace Setup

### 1.1 Route & Folder Initialization (Frontend)
- [ ] Create `/courses` route group
- [ ] Create `/teachers` route group
- [ ] Create `/guided-paths` route group
- [ ] Create `/lessons` route group (optional direct access)
- [ ] Ensure these routes are NOT default-linked from verse pages

---

### 1.2 Data Directory Setup
- [ ] Create `/data/courses/`
- [ ] Create `/data/lessons/`
- [ ] Create `/data/teachers/`
- [ ] Create `/data/guided_paths/`
- [ ] Enforce JSON validation against schemas

---

## 2. Teacher System Implementation

### 2.1 Teacher Data Layer
- [ ] Implement Teacher JSON loader
- [ ] Validate against `TEACHER_SCHEMA.md`
- [ ] Reject records missing `teaching_scope` or `constraints`

---

### 2.2 Teacher UI
- [ ] Build `TeacherListPage`
  - alphabetical ordering only
- [ ] Build `TeacherProfilePage`
  - background
  - teaching scope
  - courses offered
- [ ] Explicitly hide:
  - ratings
  - followers
  - popularity

---

## 3. Course System Implementation

### 3.1 Course Data Layer
- [ ] Implement Course JSON loader
- [ ] Validate against `COURSE_SCHEMA.md`
- [ ] Link courses → teachers via `teacher_id`
- [ ] Link courses → lessons via `lesson_id`

---

### 3.2 Course UI
- [ ] Build `CourseListPage`
  - neutral card layout
- [ ] Build `CourseDetailPage`
  - scope
  - disclaimer
  - modules & lessons list
- [ ] Ensure verse links open Phase 5 workspace

---

### 3.3 Enrollment Logic (Minimal)
- [ ] Add optional enrollment flag
- [ ] No progress tracking
- [ ] No gated content
- [ ] Enrollment does not alter reading UI

---

## 4. Lesson System Implementation

### 4.1 Lesson Data Layer
- [ ] Implement Lesson JSON loader
- [ ] Validate against `LESSON_SCHEMA.md`
- [ ] Enforce:
  - no embedded verse text
  - UID-only references

---

### 4.2 Lesson UI
- [ ] Build `LessonPage`
- [ ] Render segments per `LESSON_UI_RENDERING_RULES.md`
- [ ] Provide verse links only (no inline text)
- [ ] Add “Return to Reading” affordance

---

### 4.3 Lesson → Reading Interaction
- [ ] Clicking verse opens Phase 5 Verse Workspace
- [ ] Lesson context does NOT auto-follow
- [ ] Reading state preserved

---

## 5. Guided Path System Implementation

### 5.1 Guided Path Data Layer
- [ ] Implement Guided Path JSON loader
- [ ] Validate against `GUIDED_PATH_SCHEMA.md`
- [ ] Ensure all verse UIDs are resolvable

---

### 5.2 Guided Path UI
- [ ] Build `GuidedPathListPage`
- [ ] Build `GuidedPathDetailPage`
- [ ] Render sections with suggested ordering
- [ ] No “Start Path” enforcement

---

## 6. Phase 5 Integration Points (Minimal & Safe)

### 6.1 Reading Workspace Cross-Links
- [ ] Add optional “Appears in Guided Path” note
- [ ] Add optional “Referenced in Course” note
- [ ] Ensure links are visually subordinate

---

### 6.2 Education → Learning Links
- [ ] From concepts/glossary pages:
  - link to related courses or paths
- [ ] Label clearly as “Guided Study”

---

## 7. Authentication & Roles (Reuse Phase 3)

### 7.1 Roles
- [ ] reader (default)
- [ ] student (optional enrollment)
- [ ] teacher (manual assignment)
- [ ] admin

---

### 7.2 Permissions
- [ ] Teachers cannot self-publish content
- [ ] Admin approval required for all learning artifacts
- [ ] No UI privilege escalation

---

## 8. Accessibility & UX Quality Assurance

### 8.1 Accessibility
- [ ] Keyboard navigation for all learning pages
- [ ] Screen reader compatibility
- [ ] Clear labeling of “Guided Study” vs “Text”

---

### 8.2 UX Calmness Audit
- [ ] No urgency language
- [ ] No progress indicators
- [ ] No notifications
- [ ] No dashboard overload

---

## 9. Schema & Ethics Enforcement

### 9.1 Schema Enforcement
- [ ] Reject invalid JSON at build-time
- [ ] Warn on missing disclaimers
- [ ] Version-lock schemas

---

### 9.2 Ethics Review Checklist
- [ ] Learning is opt-in everywhere
- [ ] Teachers are bounded
- [ ] Reading remains primary
- [ ] No algorithmic authority

---

## 10. Testing & Review

### 10.1 Functional Testing
- [ ] All links resolve correctly
- [ ] Verse navigation unaffected
- [ ] Lessons skippable at all times

---

### 10.2 Regression Testing
- [ ] Phase 5 UI unchanged
- [ ] Search behavior unchanged
- [ ] Commentary separation intact

---

## 11. Documentation Updates

- [ ] Update `UI_UX_MASTER_PLAN.md`
- [ ] Update `UI_EVOLUTION_OVERVIEW.md`
- [ ] Reference all Phase 6 schemas
- [ ] Document teacher onboarding policy

---

## 12. Phase 6 Completion Criteria

Phase 6 may be declared COMPLETE only if:

- [ ] All learning artifacts are optional
- [ ] No LMS patterns exist
- [ ] Teachers are transparent and bounded
- [ ] Reading experience remains sovereign
- [ ] All constraints are enforced

---

## 🕊️ Closing Statement

> **Phase 6 is complete  
> not when learning is powerful,  
> but when learning is humble.**

---

## ✅ Status

PHASE_6_IMPLEMENTATION_TASKLIST.md is **ACTIVE**.

Phase 6 is now **ready for disciplined implementation**.

🌿 At this point, your project has:
* Architectural clarity
* Ethical rigor
* Technical readiness
* Long-term scalability
Nothing essential is missing.
If you wish, the next natural moves are:
* Teacher onboarding & moderation workflow
* Phase 6 declaration: READY TO BUILD
* Pause and consolidate
Just tell me, dear 🙏

