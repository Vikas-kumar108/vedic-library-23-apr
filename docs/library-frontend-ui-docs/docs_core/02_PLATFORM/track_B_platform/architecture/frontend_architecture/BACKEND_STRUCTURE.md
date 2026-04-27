# 🧠 Backend Structure – Vedic Library (Python & FastAPI)

This document defines the **backend architecture, folder structure, and responsibilities**
for the **Vedic Library** project.

The backend is designed to:
- Support JSON-first workflows
- Enable AI-assisted translation
- Scale gradually to users, databases, and analytics
- Remain independent of frontend frameworks

---

## 1. Backend Philosophy

The backend follows these principles:

1. **Backend is a servant, not a ruler**
   - It serves data and logic
   - It does not interpret śāstra
2. **Stateless first**
   - JSON files first
   - Database later
3. **API clarity**
   - One endpoint = one responsibility
4. **Text integrity**
   - Canonical text is never modified
5. **Gradual activation**
   - Backend can stay dormant in Phase 1

---

## 2. Backend Root Location

All backend code lives inside:

```text
vedic-library/backend/
Nothing outside this folder contains backend logic.

3. High-Level Folder Structure
text
Copy code
backend/
├── app/
│   ├── main.py              ← FastAPI entry point
│   ├── config.py            ← App configuration
│   ├── api/                 ← API route definitions
│   │   ├── v1/
│   │   │   ├── verses.py
│   │   │   ├── translations.py
│   │   │   ├── commentaries.py
│   │   │   ├── users.py     ← Phase 3
│   │   │   └── donations.py ← Phase 3
│   │
│   ├── services/            ← Core logic (no HTTP)
│   │   ├── verse_service.py
│   │   ├── translation_service.py
│   │   ├── ai_service.py
│   │   └── uid_service.py
│   │
│   ├── models/              ← Data models
│   │   ├── verse.py
│   │   ├── translation.py
│   │   ├── commentary.py
│   │   └── user.py
│   │
│   ├── utils/               ← Helper utilities
│   │   ├── file_loader.py
│   │   ├── json_validator.py
│   │   └── logger.py
│   │
│   └── db/                  ← Database layer (future)
│       ├── base.py
│       └── session.py
│
├── scripts/                 ← Standalone scripts
│   ├── normalize_json.py
│   ├── generate_uid.py
│   └── ai_translate.py
│
├── tests/                   ← Backend tests (later)
│
├── requirements.txt
└── README.md
4. FastAPI Entry Point (main.py)
Purpose:

Initialize FastAPI app

Register routes

Configure middleware

Rules:

No business logic

No file loading

No AI calls

5. API Layer (api/)
Versioning
All routes are versioned:

text
Copy code
/api/v1/
This allows future breaking changes without disruption.

Example Endpoints (Phase-wise)
Phase 1
GET /api/v1/verses/bg/1/1

Phase 2
GET /api/v1/commentaries/bg/1/1?acharya=prabhupada

Phase 3
POST /api/v1/users/login

POST /api/v1/donations

6. Services Layer (services/)
This is the heart of the backend.

Rules:

No HTTP awareness

No FastAPI imports

Pure Python logic

Responsibilities
Load JSON files

Assemble verse data

Call AI services

Validate UIDs

Enforce canonical integrity

Frontend and API layers depend on services — never the other way around.

7. Models Layer (models/)
Purpose:

Define structured data using Pydantic

Validate incoming/outgoing data

Examples:

Verse

Translation

Commentary

User

Rules:

Models represent data shape, not logic

No database queries here

8. Utilities Layer (utils/)
Helper tools that do one thing well.

Examples:

JSON loading

Logging

Validation

Error formatting

Utilities are:

Stateless

Reusable

Framework-independent

9. Scripts Folder (scripts/)
Purpose:

One-time or batch operations

Examples:

Normalize scraped JSON

Generate UIDs

Run AI translation

Validate data sets

Rules:

Scripts do NOT run automatically

Scripts do NOT expose APIs

Scripts can modify extended JSON, never canonical JSON

10. Database Layer (db/) – Future Use
Introduced in Phase 4+.

Purpose:

Persistent user data

Bookmarks

Donation records

Analytics

Planned stack:

PostgreSQL

SQLAlchemy

Until Phase 4:

This folder may remain empty

11. Authentication & Authorization (Phase 3)
Backend responsibilities:

Verify session tokens

Enforce role-based access

Protect private endpoints

Frontend handles login UI.
Backend enforces permissions.

12. AI Integration (Gemini APIs)
Handled via:

text
Copy code
services/ai_service.py
Rules:

AI never modifies canonical text

AI output is always tagged

AI failures must not break APIs

13. Error Handling
Principles:

Clear error messages

No stack traces exposed to users

Logging for debugging

Graceful failure

14. Testing Strategy (Later Phase)
Unit tests for services

API tests for endpoints

No frontend coupling

Testing starts after Phase 1 stability.

15. What Backend Does NOT Do (Initially)
❌ Render HTML
❌ Store canonical text in database
❌ Handle UI state
❌ Perform interpretation
❌ Run continuously if not needed

Backend can remain idle in Phase 1.

16. Guiding Principle
Backend exists to protect truth,
not to decorate it.
