# ✅ Phase 3 Tasklist – Participation Layer (Users, Support, Backend)

Phase 3 introduces **participation** into the Vedic Library project.

This phase must be approached with **greater restraint** than Phases 1 and 2,
because it introduces:
- Identity
- Persistence
- Money
- Backend authority

Phase 3 exists to **serve readers responsibly**, not to grow metrics.

---

## 🎯 Phase 3 Goal

By the end of Phase 3, the Vedic Library will:

- Support optional user accounts
- Persist user preferences (language, commentary)
- Allow voluntary donations
- Run a stable backend (Python + FastAPI)
- Preserve Phase 1 & 2 behavior completely
- Maintain ethical and non-coercive design

---

## 🧱 Phase 3 Entry Criteria (ALL REQUIRED)

You may begin Phase 3 only if:

- [ ] Phase 1 formally COMPLETE
- [ ] Phase 2 formally COMPLETE
- [ ] Phase 1 & 2 code frozen
- [ ] Phase 3 overview fully read and accepted
- [ ] Clear commitment to optional participation only

If any box is unchecked → STOP.

---

## 🪜 Phase 3 – Step 0 (Governance & Ethics Lock)

Before writing any code:

- [ ] Re-read `AUTH_STRATEGY.md`
- [ ] Re-affirm: reading is never gated
- [ ] Re-affirm: donations are voluntary
- [ ] Re-affirm: no ads, no tracking
- [ ] Re-affirm: backend serves frontend

This step is **mandatory**.

---

## 🪜 Phase 3 – Step 1 (Backend Skeleton Introduction)

### Goal
Introduce a backend **without changing frontend behavior**.

### Tasks
- Create `/backend` folder (if not present)
- Initialize FastAPI app
- Add health-check endpoint only

### Rules
- No auth yet
- No database yet
- No data mutation
- No frontend dependency

✔ Completion check:
- [ ] Backend runs locally
- [ ] Frontend unaffected

---

## 🪜 Phase 3 – Step 2 (Auth Strategy Selection)

### Decision Required (Choose ONE)

- [ ] Option A: Auth.js (Next.js native, no DB)
- [ ] Option B: Supabase Auth (Postgres included)

**Recommended default:** Auth.js first.

### Tasks
- Document the chosen auth method
- Define minimal user model (id, email, role)
- Define session lifespan

✔ Completion check:
- [ ] Auth approach locked
- [ ] No UI yet

---

## 🪜 Phase 3 – Step 3 (Optional Login Implementation)

### Goal
Allow users to log in **without forcing it**.

### Tasks
- Add “Sign in to support” entry point
- Implement email/OAuth login
- Verify session handling

### Rules
- No login required to read
- No UI pressure
- No role-based content gating

✔ Completion check:
- [ ] Login works
- [ ] Logout works
- [ ] Anonymous reading unaffected

---

## 🪜 Phase 3 – Step 4 (User Preference Persistence)

### Goal
Persist **only minimal preferences**.

### Allowed preferences
- Language (EN / HI)
- Preferred commentary

### Tasks
- Store preferences server-side
- Apply preferences on login
- Fallback gracefully when logged out

### Rules
- No notes
- No highlights
- No reading history

✔ Completion check:
- [ ] Preferences persist
- [ ] Logout resets to defaults

---

## 🪜 Phase 3 – Step 5 (Donation Infrastructure)

### Goal
Enable **ethical, voluntary support**.

### Tasks
- Choose donation method (external link / Stripe / Razorpay)
- Create backend endpoint to record donation
- Associate donation with user (if logged in)

### Rules
- Donations never unlock content
- No popups during reading
- No emotional language

✔ Completion check:
- [ ] Donation flow works
- [ ] Reading uninterrupted

---

## 🪜 Phase 3 – Step 6 (Backend Data Responsibility)

### Goal
Ensure backend respects text integrity.

### Tasks
- Backend serves verse data read-only
- Canonical JSON never modified
- Commentary JSON never modified
- Writes restricted to:
  - User data
  - Preferences
  - Donations

✔ Completion check:
- [ ] No text mutations possible
- [ ] Clear separation of concerns

---

## 🪜 Phase 3 – Step 7 (Security & Privacy Audit)

### Tasks
- Verify session security
- Verify donation endpoint protection
- Verify no tracking of readers
- Verify no unnecessary data collection

✔ Completion check:
- [ ] Minimal data stored
- [ ] No analytics creep

---

## 🪜 Phase 3 – Step 8 (Regression Testing)

Re-test everything from Phase 1 & 2:

- Verse rendering
- Commentary selection
- Language toggle
- Navigation
- Verse Not Found behavior

✔ Completion check:
- [ ] No regressions
- [ ] Reading remains calm

---

## 🪜 Phase 3 – Step 9 (Documentation Update)

Update:

- `README.md` (public-facing)
- Add participation explanation
- Add donation ethics note

Optional:
- Create `PHASE_3_COMPLETE.md` when done

---

## 🟢 Phase 3 Exit Criteria (ALL MUST BE TRUE)

Phase 3 may be declared complete only if:

- [ ] Users can optionally log in
- [ ] Preferences persist
- [ ] Donations work ethically
- [ ] Backend stable
- [ ] No content gated
- [ ] No pressure introduced
- [ ] Phase 1 & 2 preserved fully

---

## 🕉️ Phase 3 Closing Reminder

> **Technology grants power.  
> Discipline decides whether that power serves wisdom.**

Phase 3 is successful only if participation feels **optional, respectful, and quiet**.

---

## 🚦 What Comes After Phase 3 (Preview Only)

Phase 4 may introduce:
- Education layers
- Guided study
- Thematic organization

But only after Phase 3 trust is earned.

---

**Phase 3 must never rush.  
The cost of rushing here is trust.**

