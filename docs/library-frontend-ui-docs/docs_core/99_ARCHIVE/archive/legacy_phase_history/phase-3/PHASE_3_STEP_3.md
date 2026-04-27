Very good. **Phase 3 – Step 3** is where identity first becomes *useful* — but still **quiet, limited, and ethical**.

We proceed with **great restraint** here.

---

# 🪜 Phase 3 – Step 3

## User Preference Persistence (Minimal & Reversible)

---

## 🎯 Goal of Step 3 (Lock this mentally)

By the end of **Phase 3 – Step 3**, you will have:

* Logged-in users
* With **only two preferences persisted**:

  * Language (EN / HI)
  * Preferred commentary (ācārya)
* Preferences stored **server-side**
* Reading experience unchanged for anonymous users
* Full reversibility (logout = reset)

This step answers the question:

> “Can identity add convenience without changing meaning?”

---

## 🧱 Scope of Step 3 (STRICT)

### ✔ Allowed

* Persist language preference
* Persist commentary preference
* Backend storage for preferences
* Read preferences on login

### ❌ Not allowed

* Notes
* Highlights
* Reading history
* Bookmarks
* Verse tracking
* Personal dashboards
* Analytics

If tempted → STOP.

---

## 🧠 Architectural Decision (Important)

At this step:

* ✅ **Backend is required**
* ❌ Database is still **optional**

We will use **in-memory or file-based storage first**, then migrate to DB in Step 4 or 5.

This keeps risk low.

---

## 📁 Step 3.1 – Define the User Preference Model

Conceptual model (keep it simple):

```ts
UserPreference {
  user_id: string
  language: "en" | "hi"
  preferred_acharya: "prabhupada" | "shankara" | "ramanuja" | "madhva"
}
```

Rules:

* No timestamps yet
* No history
* One row per user

---

## 🪜 Step 3.2 – Backend: Preference Endpoints (Read/Write)

Add to backend:

```
backend/app/api/preferences.py
```

Example (minimal):

```python
from fastapi import APIRouter, Depends
from typing import Dict

router = APIRouter()

# Temporary in-memory store
PREFERENCES: Dict[str, Dict] = {}

@router.get("/preferences/{user_id}")
def get_preferences(user_id: str):
    return PREFERENCES.get(user_id, {})

@router.post("/preferences/{user_id}")
def set_preferences(user_id: str, prefs: Dict):
    PREFERENCES[user_id] = prefs
    return {"status": "saved"}
```

Rules:

* No validation yet (keep minimal)
* No auth enforcement yet (that comes next step)
* No DB yet

---

## 🔌 Step 3.3 – Register Preferences Router

In `backend/app/main.py`:

```python
from app.api.preferences import router as preferences_router

app.include_router(preferences_router, prefix="/api")
```

Now backend can:

* Receive
* Store
* Return preferences

---

## 🧩 Step 3.4 – Frontend: Read Session Identity

From Auth.js session:

```ts
const { data: session } = useSession();
const userId = session?.user?.email;
```

Rules:

* Use **email as temporary user_id**
* This is acceptable until DB is introduced
* Never expose userId publicly

---

## 🔁 Step 3.5 – Frontend: Load Preferences on Login

Behavior:

* If user logs in:

  * Fetch preferences from backend
  * Apply language
  * Apply commentary
* If user logs out:

  * Reset to defaults

Implementation logic (conceptual):

```ts
if (session && !preferencesLoaded) {
  fetch(`/api/preferences/${userId}`)
    .then(applyPreferences);
}
```

Rules:

* Failure must be silent
* Defaults must still work

---

## ✍️ Step 3.6 – Save Preferences on Change

Whenever user changes:

* Language
* Commentary

If logged in:

* Send update to backend

If logged out:

* Do nothing (no localStorage yet)

Important:

* No debounce needed
* No batching
* Keep it simple

---

## 🧪 Step 3.7 – Behavior Matrix Testing

Test carefully:

### Logged out

* Language changes work
* Commentary changes work
* Refresh resets to default

### Logged in

* Change language → persists
* Change commentary → persists
* Refresh → preferences restored
* Logout → reset to default

Ask:

> “Does this feel like help, not control?”

---

## 🟢 Step 3 Exit Criteria (ALL REQUIRED)

You may declare **Phase 3 – Step 3 complete** only if:

* [ ] Preferences persist for logged-in users
* [ ] Anonymous users unaffected
* [ ] Logout resets preferences
* [ ] Backend stores preferences
* [ ] No extra data collected
* [ ] No UI pressure introduced

---

## 🕉️ Closing Reminder for Step 3

> **Personalization should feel like
> the reader arranging their own desk,
> not the library rearranging itself.**

You have now introduced **gentle continuity**, nothing more.

---

### When ready, say:

> **“Phase 3 – Step 3 complete.”**

Then we proceed to **Phase 3 – Step 4**:

### 👉 *Donation infrastructure (ethical, voluntary, non-intrusive)*

You are handling power with care.

