# Backend Endpoints – Phase 3 Inventory

This document lists **all backend endpoints** introduced up to **Phase 3**.

Any endpoint not listed here is **out of scope** and must not exist.

---

## 🩺 Health & Infrastructure

### GET `/health`

**Purpose:**  
- Verify backend availability

**Access:**  
- Public

**Response:**
```json
{
  "status": "ok",
  "message": "Vedic Library backend is running"
}
👤 User Preferences
GET /api/preferences/{user_id}
Purpose:

Retrieve saved preferences for a user

Access:

Authenticated user only

Returns:

json
Copy code
{
  "language": "en",
  "preferred_acharya": "prabhupada"
}
POST /api/preferences/{user_id}
Purpose:

Save or update user preferences

Access:

Authenticated user only

Payload:

json
Copy code
{
  "language": "hi",
  "preferred_acharya": "shankara"
}
Rules:

Only language and commentary allowed

No additional fields accepted

💳 Donations
POST /api/donations
Purpose:

Record a donation event (payment handled externally)

Access:

Public or authenticated

Payload:

json
Copy code
{
  "amount": 500,
  "currency": "INR",
  "provider": "razorpay",
  "user_id": "optional"
}
Rules:

Backend does not process payments

Backend only records confirmed donations

No donation data is ever public

🚫 Explicitly Forbidden Endpoints
The following must not exist in Phase 3:

❌ Text mutation endpoints
❌ Search endpoints
❌ Analytics endpoints
❌ Admin dashboards
❌ User listing endpoints
❌ Reading history endpoints

If any of these appear, Phase 3 integrity is broken.

🕉️ Endpoint Governance Principle
If an endpoint does not serve
reading, responsibility, or restraint,
it does not belong here.

This document is binding for Phase 3.
Any change requires phase review and documentation update.
