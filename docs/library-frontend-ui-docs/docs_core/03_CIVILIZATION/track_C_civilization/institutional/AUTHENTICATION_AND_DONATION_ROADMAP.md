⚠️ GOVERNANCE & ROADMAP DOCUMENT

This document describes **long-term intent and ethical boundaries**
for authentication and donations in the Vedic Library project.

It does **not authorize implementation** in Phase 1 or Phase 2.
Implementation is permitted only when a phase explicitly adopts
these ideas into scoped technical plans.


# 🔐 Authentication & Donation Strategy – Vedic Library

This document defines the **authentication (login) and donation roadmap**
for the Vedic Library project.

The strategy is:
- Phase-wise
- Budget-aware
- Vendor-neutral
- Scalable from 0 users to large communities
- Respectful of the project’s scholarly and devotional nature

---

## 1. Core Philosophy

1. **Reading comes first**
   - No login required to read śāstra
2. **Login is a service, not a gate**
   - Users log in for personalization or support
3. **Donations are voluntary**
   - Never obstruct reading
   - Never manipulate emotion
4. **No premature complexity**
   - Auth and payments are introduced only when justified

---

## 2. User Roles (Planned, Not All Active Initially)

| Role | Description | Phase |
|---|---|---|
| Reader | Anonymous or logged-in reader | Phase 1–3 |
| Supporter | Logged-in donor | Phase 3 |
| Student | Learner (future education layer) | Phase 4+ |
| Teacher | Educator / guide | Phase 4+ |
| Admin | Maintainer | Phase 3 |

Roles are **conceptual early**, enforced later.

---

## 3. Phase 1 – No Authentication (Default)

**Status:** ✅ Current phase

### Rules
- No login
- No cookies
- No sessions
- No user tracking

### Why
- Focus on scripture
- Simplify development
- Avoid legal/privacy complexity

---

## 4. Phase 2 – Soft Identity (Optional Preview)

**Status:** ❌ Not implemented in Phase 1

### What May Be Added
- Optional “Sign in to support” links
- Informational UI only
- No enforcement

Still:
- No required login
- No gated content

---

## 5. Phase 3 – Auth.js (Primary Login System)

### Why Auth.js
- Free
- Open-source
- Designed for Next.js
- No vendor lock-in
- Supports:
  - Email (magic link)
  - Google login
  - GitHub login

### What Auth.js Handles
- User identity
- Sessions
- OAuth providers

### What It Does NOT Handle
- Database
- Payments
- Business logic

---

### Phase 3 Login Capabilities

- Email login (magic link)
- Google login
- GitHub login
- Session persistence
- Role assignment (basic)

### Cost
- ₹0 for Auth.js
- Minor email cost (SMTP provider)

---

## 6. Donation Strategy (Phase 3)

### Core Rules
1. Donation is **optional**
2. Donation does **not unlock text**
3. Donation supports:
   - Hosting
   - Development
   - Translation
4. Donation UI is minimal and respectful

---

### Phase 3 Donation Implementation (Simple)

Options:
- External payment link
- Manual payment page
- UPI / Stripe / Razorpay (depending on region)

Backend handling:
- Store donation record
- Associate with user (if logged in)
- No financial analytics initially

---

## 7. Phase 4 – Supabase Auth (Scaling Option)

### Why Supabase
- Free tier up to ~50,000 users
- PostgreSQL included
- Simple admin dashboard
- Row-level security

### When to Switch
- Growing user base
- Persistent preferences needed
- Bookmarks, notes, progress tracking

### Migration Rule
Auth.js → Supabase is allowed because:
- Frontend abstracts auth
- Roles are conceptual, not hard-coded

---

## 8. Phase 5 – Firebase Auth (Enterprise Scale)

### When Firebase Makes Sense
- Very large global user base
- Mobile apps
- Advanced identity federation

### Why It Is NOT Default
- Vendor lock-in
- Heavier ecosystem
- Not needed early

Firebase is **optional**, not inevitable.

---

## 9. Auth Abstraction Rule (VERY IMPORTANT)

Frontend must never depend directly on:
- Auth.js
- Supabase
- Firebase

Instead, frontend depends on:
```ts
useAuth()
Which returns:

user (or null)

role

loading state

Auth provider can change without rewriting UI.

10. Data Privacy & Ethics
Rules:

Collect minimum data

Never sell data

Never use data for marketing

Transparent purpose of login

Clear consent for donations

This is a library, not a surveillance platform.

11. What Is Explicitly NOT Allowed
❌ Mandatory login for reading
❌ Donation popups blocking content
❌ Emotional manipulation
❌ Paywalled śāstra
❌ Dark UX patterns

12. Phase-wise Summary
Phase	Auth	Donations
Phase 1	None	None
Phase 2	Optional preview	Optional UI
Phase 3	Auth.js	Basic donations
Phase 4	Supabase Auth	Integrated support
Phase 5	Firebase Auth (optional)	Advanced

🕉️ Guiding Principle
Śāstra is not a product.
Access is a right.
Support is a choice.


