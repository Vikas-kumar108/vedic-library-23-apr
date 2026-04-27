# USER SYSTEM – VEDIC LIBRARY

---

# 1. PURPOSE

This document defines the **User System** of the Vedic Library.

It enables:

- Personalization
- Progress tracking
- Bookmarking and notes
- Interactive learning
- Community participation (future)

---

# 2. CORE PRINCIPLE

> Knowledge is universal, but engagement is personal.

---

# 3. USER ARCHITECTURE

---

## 3.1 Layers

```text
Guest User → Registered User → Contributor → Admin

3.2 User States
State	Capabilities
Guest	Read-only access
Logged-in	Save, notes, preferences
Contributor	Add/edit content
Admin	Full control
4. AUTHENTICATION

4.1 System
Use:
* Supabase Auth

4.2 Methods
* Email/password
* OAuth (Google, etc.)

4.3 Flow
User signs up → Auth created → Profile created

5. USER PROFILE

Table: users

Fields
* display_name
* avatar_url
* preferred_language
* preferred_script
* preferred_sampradaya
* age_group

Purpose
Personalize:
* UI
* Content recommendations
* Learning path


6. PERSONALIZATION ENGINE

Based On:
* Age group
* Interests (tags)
* Study progress
* Saved content

Affects:
* Right panel recommendations
* Courses
* Guidance topics


7. BOOKMARK SYSTEM

Purpose
Allow users to save verses

Table
user_bookmarks

Features
* Save verse
* Organize in folders
* Add notes

UI Action
POST /api/bookmark


8. NOTES SYSTEM

Purpose
Allow personal reflection

Table
user_notes

Features
* Write notes per verse
* Edit/delete notes
* Optional public sharing


9. QUESTIONS SYSTEM

Purpose
Allow users to ask questions

Table
user_questions

Features
* Ask question per verse
* AI or community answers
* Track status


10. STUDY PROGRESS

Table
user_study_progress

Tracks:
* Completed verses
* Time spent
* Current position

Enables:
* Resume learning
* Progress tracking
* Streaks


11. USER INTERACTIONS

Supported Actions
* Save verse
* Write note
* Ask question
* Mark as completed
* Share content (future)


12. FRONTEND INTEGRATION

Example
const user = useUser()

if (user) {
  showBookmarkButton()
}


13. API ENDPOINTS

Examples
POST /api/bookmark
GET /api/bookmarks

POST /api/notes
GET /api/notes

POST /api/questions


14. SECURITY (RLS)

Rules
* Users can access only their own data
* Public content is open

Example
auth.uid() = user_id


15. OFFLINE / GUEST MODE

Features
* Read-only access
* Temporary bookmarks (localStorage)


16. FUTURE EXTENSIONS

* Social features
* Shared notes
* Study groups
* Leaderboards
* AI mentor


17. UX PRINCIPLES

* Minimal friction
* Non-intrusive
* Optional login
* Seamless experience


18. IMPLEMENTATION STRATEGY

Phase 1
* Basic auth
* Bookmarks

Phase 2
* Notes
* Progress tracking

Phase 3
* Questions system
* Social features


19. FINAL INSIGHT
User system transforms the platform from:
❌ Static reading tool
into:
🌿 Living Learning Experience

Users do not just read.
They:
* Reflect
* Track
* Engage
	•	Grow
---

# ❤️ Why This Matters

This directly answers your earlier concerns:

✔ “What about user creation?”  
✔ “How will users interact?”  
✔ “How to personalize experience?”  
