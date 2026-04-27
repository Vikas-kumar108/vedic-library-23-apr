Good. **Phase 3 – Step 4** is the **most sensitive step so far**, because it introduces **money**.
So we proceed **slowly, ethically, and with zero pressure**.

This step is **not fundraising**.
It is **allowing gratitude to express itself voluntarily**.

---

# 🪜 Phase 3 – Step 4

## Donation Infrastructure (Ethical, Voluntary, Non-Intrusive)

---

## 🎯 Goal of Step 4 (Fix this in mind)

By the end of **Phase 3 – Step 4**, you will have:

* A **working donation flow**
* Entirely **voluntary**
* **Never gating content**
* **Never interrupting reading**
* Backend records for accountability
* No psychological pressure

This step answers the question:

> “Can people support the project without being manipulated?”

---

## 🧱 Scope of Step 4 (STRICT)

### ✔ Allowed

* Donation link or payment flow
* Backend donation recording
* Optional association with logged-in user
* Transparent intent messaging

### ❌ Not allowed

* Paywalls
* Premium access
* “Support to continue reading”
* Popups during reading
* Emotional language (“save dharma”, “urgent”)
* Tracking donation behavior

If any of these appear → STOP.

---

## 🧠 Strategic Decision (Important)

### **Phase 3 Donation Method: External Payment + Internal Record**

**Recommended approach for this phase:**

* Use **external payment processor** (Stripe / Razorpay / PayPal)
* Handle payment **outside** your app
* Record donation **after success**

Why:

* Security
* Legal clarity
* Minimal liability
* Less backend complexity

---

## 📁 Step 4.1 – Define Donation Ethics Text (Mandatory)

Create:

```
docs/DONATION_ETHICS.md
```

Example content (you may adjust wording later):

```md
## About Supporting Vedic Library

Vedic Library is a free, open reading space.

If you find this project meaningful and wish to support its
maintenance, translation work, and hosting costs,
you may do so voluntarily.

Support:
- Never unlocks content
- Never changes access
- Never influences presentation

Reading remains free for everyone.
```

This text must appear wherever donations are mentioned.

---

## 🔌 Step 4.2 – Backend: Donation Record Model (Minimal)

Conceptual model:

```ts
Donation {
  id
  user_id (optional)
  amount
  currency
  provider
  timestamp
}
```

Rules:

* No donor ranking
* No public display
* No analytics
* No “top supporters”

---

## 🪜 Step 4.3 – Backend: Donation Endpoint (Record Only)

Add to backend:

```
backend/app/api/donations.py
```

Example:

```python
from fastapi import APIRouter
from typing import Optional
from datetime import datetime

router = APIRouter()

DONATIONS = []

@router.post("/donations")
def record_donation(
    amount: float,
    currency: str,
    provider: str,
    user_id: Optional[str] = None
):
    DONATIONS.append({
        "user_id": user_id,
        "amount": amount,
        "currency": currency,
        "provider": provider,
        "timestamp": datetime.utcnow().isoformat()
    })
    return {"status": "recorded"}
```

Rules:

* Backend **does not process payments**
* Backend **only records**
* Provider is trusted source

---

## 🔁 Step 4.4 – Register Donation Router

In `backend/app/main.py`:

```python
from app.api.donations import router as donations_router

app.include_router(donations_router, prefix="/api")
```

---

## 🧩 Step 4.5 – Frontend: Donation Entry Point (Quiet)

Create a **small, respectful entry point**:

* Footer link: “Support this project”
* About page mention
* No buttons near verses
* No sticky banners

Rules:

* Never show during reading flow
* Never auto-open
* Never block content

---

## 🌐 Step 4.6 – Donation Flow (Simple)

Recommended flow:

1. User clicks “Support”
2. Sees ethics text
3. Clicks external payment link
4. After success → redirect back
5. Backend records donation

For logged-in users:

* Associate donation with user ID

For anonymous users:

* Record without user ID

Both are acceptable.

---

## 🧪 Step 4.7 – Behavior Testing (Critical)

Test these scenarios:

### Anonymous user

* Can donate
* Reading unaffected
* No prompts to log in

### Logged-in user

* Can donate
* Donation recorded with user ID
* No role change

### All users

* No interruptions
* No upsell language
* No tracking

Ask:

> “Would I feel comfortable recommending this to a scholar?”

If yes → correct.

---

## 🟢 Step 4 Exit Criteria (ALL REQUIRED)

You may declare **Phase 3 – Step 4 complete** only if:

* [ ] Donations are optional
* [ ] Content is never gated
* [ ] Ethics text visible
* [ ] Backend records donations
* [ ] No pressure introduced
* [ ] Logged-in & anonymous flows work

---

## 🕉️ Closing Reminder for Step 4

> **Support must arise from gratitude,
> not from fear or urgency.**

If a reader can ignore donations completely
and still feel respected,
you have done this step correctly.

---

### What comes next

After you say:

> **“Phase 3 – Step 4 complete.”**

We proceed to **Phase 3 – Step 5**:

### 👉 *Backend authority hardening, security & privacy audit*

This is where we ensure **power does not leak**.

You are handling this with rare maturity.

