# 🔐 Auth.js Integration Boundaries – Phase 3 Constitution

This document defines the **explicit boundaries, permissions, and prohibitions**
for integrating **Auth.js** into the Vedic Library project during **Phase 3**.

Auth.js is treated as a **servant utility**, not a governing system.

Violation of these boundaries compromises trust.

---

## 🎯 Purpose of Auth.js in Vedic Library

Auth.js exists **only** to:

- Identify users who *choose* to participate
- Maintain secure sessions
- Enable optional persistence (preferences, support records)

Auth.js does **not** exist to:
- Control access to knowledge
- Influence reading behavior
- Shape community hierarchy

---

## 🧱 AUTH.js AUTHORITY: WHAT IT MAY DO

Auth.js is permitted to handle **only** the following:

### 1. Identity & Sessions
- Email-based login
- OAuth login (Google, GitHub)
- Session creation and expiry
- Logout handling

### 2. Minimal User Model
Auth.js may expose:
- `user.id`
- `user.email`
- `session.expires`
- `role` (reader / supporter / admin)

No additional profile data.

---

### 3. Preference Persistence (Indirect Only)

Auth.js may:
- Authenticate the user
- Allow backend to store:
  - Language preference
  - Commentary preference

Auth.js itself **must not store preferences**.

---

### 4. Donation Association
Auth.js may:
- Provide user identity to associate donation records

Auth.js must not:
- Handle payment logic
- Store payment metadata

---

## 🚫 AUTH.js PROHIBITIONS (STRICT)

Auth.js must NEVER be used to:

### ❌ Gate Reading Access
- No verse requires login
- No commentary requires login
- No language requires login

Reading is unconditional.

---

### ❌ Create Social Identity
- No usernames
- No public profiles
- No avatars
- No follower systems
- No public role badges

Identity remains private and functional.

---

### ❌ Introduce Metrics or Engagement Logic
- No login counters
- No reading tracking
- No time-on-page metrics
- No behavioral analytics

Auth.js must remain blind to reading behavior.

---

### ❌ Enforce Authority Hierarchies
- Roles must not alter content visibility
- Admin role exists only for maintenance
- Supporter role must not imply superiority

---

### ❌ Store or Infer Sensitive Information
- No location inference
- No IP-based profiling
- No device fingerprinting
- No inferred interests

Minimal data is an ethical requirement.

---

## 🔁 AUTH.js ↔ BACKEND INTERACTION RULES

Auth.js interacts with the backend **only** via:

- Verified session tokens
- Explicit backend endpoints

Rules:
- Backend trusts Auth.js for identity only
- Backend enforces authorization logic
- Auth.js never decides permissions alone

---

## 🧠 FRONTEND BOUNDARIES

Frontend must:

- Treat Auth.js as optional
- Never block UI based on auth state
- Never visually prioritize logged-in users
- Never prompt login during reading

Login entry points must be **quiet and respectful**.

---

## 🧪 TESTING & COMPLIANCE CHECKLIST

Before Phase 3 completion, verify:

- [ ] Reading works fully while logged out
- [ ] Commentary toggle works logged out
- [ ] Language toggle works logged out
- [ ] Login does not change available content
- [ ] Logout resets preferences safely
- [ ] No auth-related UI intrusions

If any item fails → boundary violation.

---

## 🔒 CHANGE CONTROL

Any attempt to expand Auth.js authority requires:

1. Architectural review
2. Phase boundary justification
3. Documentation update
4. Explicit approval

Silent expansion is forbidden.

---

## 🕉️ Guiding Principle (Auth)

> **Identity must enable responsibility  
> without becoming power.**

Auth.js exists to support the project —  
not to reshape its soul.

---

## 📌 Phase Applicability

- **Phase 3:** This document is binding
- **Phase 4+:** May be revised consciously, never implicitly

---

**Auth.js must remain invisible to readers.  
If readers notice it, it is already too much.**

✅ What you have achieved now

Auth choice is locked

Auth authority is strictly limited

Future feature creep is prevented

Ethical intent is documented and enforceable

You are now ready to safely begin Phase 3 – Step 1 (Backend Skeleton) without fear that auth will dominate the project.
