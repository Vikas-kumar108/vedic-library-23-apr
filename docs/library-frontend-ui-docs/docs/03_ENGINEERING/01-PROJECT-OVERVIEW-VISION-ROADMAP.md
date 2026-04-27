# NIKHIL - Vedic Library System

## National Initiative for Knowledge Heritage of Indic Literature

---

# 1. VISION

To build a **Unified Vedic Knowledge System** that:

- Preserves the entire Vedic corpus (Veda → Upanishad → Itihasa → Purana → Shastra)
- Presents knowledge in structured, interconnected form
- Enables learning, reflection, and application
- Serves all audiences: children → scholars → practitioners

---

# 2. CORE PRINCIPLE

> Every unit of knowledge originates from canonical Śāstra.

Therefore:

- Verse / Mantra / Sutra = **Atomic unit**
- All other layers (translation, commentary, courses, guidance) are **derived**

---

# 3. SYSTEM IDENTITY

This is NOT a website.

It is:

> A **Vedic Knowledge Operating System**

---

## 3.1 Three-Axis Architecture

| Axis | Purpose |
|------|--------|
| Tree (Left) | Knowledge Structure |
| Content (Center) | Canonical Truth |
| Application (Right) | Life Application |

---

# 4. CURRENT STATE (v1.0)

## 4.1 Frontend Prototype Completed

### Layout System
- 3-column responsive architecture
- Independent scroll panels
- Clean reading experience

---

### Tree Navigation
- Hierarchical corpus structure
- Expand/collapse nodes
- Verse grid display

---

### Content Engine
- Multi-script support (Devanagari, IAST, Telugu)
- Multi-language support
- Word analysis system
- Commentary with sampradaya switching
- Structured reading UI

---

### Application Panel
- Related verses
- Courses
- Guidance topics
- Seva domains
- Media placeholders

---

### State System
- Zustand-based global store
- Filter system (age, category, language)

---

## 4.2 Current Limitations

### Data Layer
- Static mock data
- No real JSON integration
- No API layer

---

### System Gaps
- No dynamic tree loading
- No database
- No user system
- No admin dashboard

---

### Feature Gaps
- Save, copy, share not functional
- Media not integrated
- Search not implemented

---

# 5. SYSTEM ARCHITECTURE (REAL)

---

## 5.1 Data Flow

```text
User → Tree → State → Data Loader → JSON/API → Store → UI

5.2 Data Sources
Current
* Local JSON corpus (canonical + derivatives)
Future
* Supabase (PostgreSQL)
* API-based access
* Indexed knowledge graph

6. DEVELOPMENT ROADMAP

🔹 v1 – UI Prototype (COMPLETED)
* Static frontend
* Component architecture
* Basic state system

🔹 v2 – Dynamic Data Layer (CURRENT PHASE)
Goal:
* Replace static data with real JSON
Tasks:
* Build API routes (/api/verse/[id])
* Implement loadNode() system
* Connect tree → content
* Add caching layer

🔹 v3 – Backend Integration
Goal:
* Move to scalable database
Tasks:
* Supabase schema implementation
* Data migration from JSON
* API standardization
* Authentication system

🔹 v4 – Full Platform
Goal:
* Complete knowledge ecosystem
Features:
* Admin dashboard
* User accounts
* Notes, bookmarks
* AI guidance
* Semantic search
* Courses engine

7. CONTENT MODEL

7.1 Supported Types
Type	Example
Verse	Bhagavad Gita
Mantra	Vedas
Sutra	Brahma Sutra
Prose	Puranas
7.2 Layers of Content
* Canonical Text
* Synonyms
* Translation
* Commentary
* Exposition
* Relations

8. TARGET USERS

Group	Need
Kids	Stories, simplified dharma
Students	Structured learning
Professionals	Life application
Elders	Deep study
9. DESIGN PHILOSOPHY

The interface must feel like:
A sacred library, not a digital product

Principles:
* Calm and minimal
* Typography-first
* Structured hierarchy
* Distraction-free reading

10. SCALING VISION

Target:
* 20+ lakh Sanskrit texts
* Multi-language support
* Multi-tradition commentary

Strategy:
* Lazy loading
* API-driven architecture
* Database indexing
* Modular rendering engine

11. FINAL INSIGHT
This system is not built for:
❌ Content display
It is built for:
Knowledge navigation, understanding, and transformation

It is a:
🌿 Civilizational Knowledge Interface
---

# ❤️ Why This Version Is Important

This version now:

✔ Matches your real architecture  
✔ Aligns with your codebase  
✔ Defines future clearly  
✔ Removes ambiguity  
✔ Becomes your “source of truth”  
