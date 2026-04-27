Very well. **Phase 3 – Step 5** is about **discipline, not features**.

You have now introduced:

* Identity
* Persistence
* Money
* Backend authority

So this step exists to **lock power down**, not expand it.

---

# 🪜 Phase 3 – Step 5

## Backend Authority Hardening, Security & Privacy Audit

---

## 🎯 Goal of Step 5 (Very Clear)

By the end of **Phase 3 – Step 5**, you will have:

* A backend that **cannot accidentally overreach**
* Clear separation between:

  * Sacred text (read-only)
  * User data (controlled)
  * Money records (protected)
* Explicit security and privacy guarantees
* Confidence that growth will not corrupt purpose

This step answers the question:

> “Now that we have power, are we restraining it correctly?”

---

## 🧱 Scope of Step 5 (STRICT)

### ✔ Allowed

* Authorization enforcement
* Endpoint protection
* Data access rules
* Privacy minimization
* Documentation

### ❌ Not allowed

* New features
* New user data fields
* Analytics
* Tracking
* Admin dashboards
* Performance optimization

If you feel tempted to “improve” something → pause.

---

## 🔐 Step 5.1 – Enforce Authorization Boundaries

Now that Auth.js exists, backend must **explicitly check identity**.

### Rules

* Backend trusts **only verified session tokens**
* Frontend never sends raw user identity blindly
* Backend decides who may write

### Action

Introduce a **single dependency**:

```
backend/app/core/auth.py
```

Conceptual example:

```python
from fastapi import Depends, HTTPException

def require_user(user_id: str = None):
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user_id
```

This is intentionally minimal.

---

## 🧠 Step 5.2 – Lock Read vs Write Responsibilities

Define and enforce:

### Read-only domains

* Canonical text
* Translations
* Commentaries

Backend must:

* Never mutate
* Never accept POST/PUT/DELETE for texts

### Write-only domains

* User preferences
* Donation records

Only these may accept writes.

If an endpoint touches both → redesign.

---

## 🛡 Step 5.3 – Secure Donation Recording

Audit donation endpoint:

* Validate amounts (positive numbers only)
* Validate currency codes
* Validate provider name
* Prevent duplicate accidental submissions
* Do not expose donation list publicly

Add guardrails:

* Simple validation
* No business logic
* No “success” gamification

---

## 🔒 Step 5.4 – Privacy Minimization Audit

Make a written list of **all stored data**:

### Allowed data

* User email (for login)
* User preferences (language, commentary)
* Donation records (amount, currency, provider, timestamp)

### Explicitly forbidden

* IP address storage
* Location data
* Device fingerprints
* Reading history
* Time-on-page
* Verse tracking

If anything extra is stored → remove it.

---

## 📜 Step 5.5 – Backend Endpoint Inventory

Create an internal document:

```
docs/BACKEND_ENDPOINTS.md
```

Example:

```md
## Backend Endpoints (Phase 3)

GET  /health               – health check
GET  /api/preferences/{id} – read user preferences
POST /api/preferences/{id} – save user preferences
POST /api/donations        – record donation
```

This inventory prevents silent expansion.

---

## 🧪 Step 5.6 – Abuse & Failure Testing

Test these scenarios manually:

* Unauthorized preference write → blocked
* Malformed donation data → rejected
* Backend restarted → no text loss
* Backend down → frontend still reads

Ask:

> “If backend disappears, does reading still survive?”

It must.

---

## 🟢 Step 5 Exit Criteria (ALL REQUIRED)

You may declare **Phase 3 – Step 5 complete** only if:

* [ ] Backend write access strictly limited
* [ ] Text data immutable
* [ ] Donation endpoint protected
* [ ] No extra data collected
* [ ] Privacy guarantees explicit
* [ ] Backend inventory documented
* [ ] Frontend unaffected by backend failure

---

## 🕉️ Closing Reminder for Step 5

> **The highest responsibility of power
> is knowing when not to use it.**

If your backend feels *boring*,
you have succeeded.

---

### What comes next

After you say:

> **“Phase 3 – Step 5 complete.”**

We will move to **Phase 3 – Step 6 (Final Regression & Trust Audit)**
and then formally **close Phase 3**.

You are now guarding the soul of the project.

