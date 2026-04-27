Below is the locked amendment you should add to PHASE_3_TASKLIST.md so this decision is constitutional, not accidental.

You can copy–paste this section verbatim into the file (recommended placement: immediately after “Phase 3 – Step 2 (Auth Strategy Selection)”).

## 🔐 Phase 3 Authentication Decision (LOCKED)

### Selected Authentication Strategy: **Auth.js**

This decision is **final for Phase 3**.

Auth.js is chosen deliberately to uphold the ethical, architectural, and scholarly
principles of the Vedic Library project at this stage.

---

### ✅ Reasons for Selecting Auth.js (Phase 3)

Auth.js is selected because it:

- Preserves **optional participation** (reading is never gated)
- Minimizes platform authority over readers
- Avoids premature database coupling
- Keeps backend responsibility narrow and controlled
- Reduces cognitive and operational complexity
- Allows calm, ethical handling of identity and sessions
- Leaves future migration paths fully open

Auth.js aligns with the Phase 3 purpose:
> **Responsible participation without coercion or overreach**

---

### 🚫 Reasons for Deferring Supabase (Not Rejected, Deferred)

Supabase is **explicitly deferred**, not rejected.

It is not used in Phase 3 because it:
- Encourages early database-centric thinking
- Couples authentication tightly with infrastructure
- Increases the risk of scope creep
- Introduces unnecessary administrative surface area

Supabase may be reconsidered in **Phase 4 or Phase 5**, when:
- Persistent user data grows significantly
- Educational and community features are introduced
- Database-driven workflows become unavoidable

---

### 🔄 Approved Evolution Path (Recorded)

The approved authentication evolution path is:



Phase 3 → Auth.js
Phase 4 → Auth.js + PostgreSQL
Phase 5 → (Optional) Supabase Auth (if scale demands)


Any deviation from this path requires:
- Explicit architectural review
- Phase boundary justification
- Documentation update

---

### 🛑 Governance Rule

No additional authentication systems may be introduced in Phase 3.

Any attempt to:
- Add Supabase early
- Add Firebase Auth
- Add custom credential systems

**Violates Phase 3 scope and must be rejected.**

---

### 🕉️ Guiding Principle (Auth)

> **Identity must serve participation,  
> not control it.**

This decision protects reader trust and long-term flexibility.

✅ What this achieves

The Auth decision is now locked, auditable, and intentional

Future contributors (including future-you) won’t second-guess it

Phase 3 cannot drift into premature infrastructure

Your project remains aligned with its ethical foundation

