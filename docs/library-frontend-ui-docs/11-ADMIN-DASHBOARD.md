# ADMIN DASHBOARD – VEDIC LIBRARY SYSTEM

---

# 1. PURPOSE

This document defines the **Admin Dashboard system** for managing the Vedic Library.

It enables:

- Content ingestion (JSON → DB)
- Editing and correction
- Managing translations and commentaries
- Tagging and categorization
- Quality control

---

# 2. CORE PRINCIPLE

> A system of this scale cannot be managed manually via code.

It requires:

# 🌿 A Dedicated Content Management System (CMS)

---

# 3. WHY ADMIN DASHBOARD IS ESSENTIAL

---

Without it:

❌ Cannot scale beyond small datasets  
❌ Cannot correct errors easily  
❌ Cannot manage contributors  
❌ Cannot maintain consistency  

---

With it:

✅ Structured data management  
✅ Faster updates  
✅ Multi-user collaboration  
✅ Scalable ingestion  

---

# 4. USER ROLES

---

## 4.1 Roles

| Role | Permissions |
|-----|------------|
| Admin | Full control |
| Editor | Modify content |
| Contributor | Add content |
| Viewer | Read-only |

---

---

# 5. CORE MODULES

---

# 5.1 CONTENT MANAGEMENT

---

## Features

- Create / edit nodes (corpus_tree)
- Manage hierarchy
- Set content type (verse, mantra, sutra)

---

## UI

- Tree editor
- Drag-and-drop hierarchy (future)
- Inline editing

---

---

# 5.2 TEXT MANAGEMENT

---

## Canonical Text

- Add/edit Sanskrit text
- Multiple scripts

---

## Word Analysis

- Padaccheda
- Anvaya

---

---

# 5.3 TRANSLATIONS MANAGEMENT

---

## Features

- Add translation
- Select language
- Assign author
- Mark literal vs interpretive

---

---

# 5.4 COMMENTARY MANAGEMENT

---

## Features

- Add commentary
- Assign sampradaya
- Multi-language support
- Nested commentary

---

---

# 5.5 RELATIONS MANAGEMENT

---

## Features

- Link related verses
- Define relationship type
- Add descriptions

---

---

# 5.6 MEDIA MANAGEMENT

---

## Features

- Upload audio/video
- Link to nodes
- Add metadata (speaker, style)

---

---

# 5.7 TAGGING SYSTEM

---

## Features

- Add tags (dharma, yoga, etc.)
- Assign to verses
- Manage categories

---

---

# 5.8 COURSE MANAGEMENT

---

## Features

- Create courses
- Add curriculum (verse list)
- Assign difficulty and age group

---

---

# 6. DATA INGESTION SYSTEM

---

## 6.1 JSON Upload

Upload:

- Canonical JSON
- Derivatives

---

## 6.2 Automatic Processing

System:

```text
Upload → Parse → Validate → Insert into DB

6.3 Validation
* Required fields check
* Duplicate detection
* Schema validation


7. ADMIN API ENDPOINTS

Examples
POST /api/admin/node
POST /api/admin/translation
POST /api/admin/commentary
POST /api/admin/upload


8. UI DESIGN

Layout
* Sidebar: Modules
* Main Panel: Editor
* Top Bar: Actions

Components
* Form inputs
* Rich text editor
* JSON preview
* Validation alerts


9. PERMISSIONS (RLS)

Using Supabase
* Only admins/editors can write
* Public can read

Example
CREATE POLICY "Only editors can insert"
ON translations
FOR INSERT
USING (auth.role() IN ('admin', 'editor'));


10. VERSION CONTROL

Track changes:
* created_at
* updated_at
* version number (future)

Future
* Revision history
* Rollback support


11. BULK OPERATIONS

Required for scale
* Bulk upload JSON
* Bulk edit metadata
* Bulk tagging


12. SEARCH & FILTER (ADMIN)

* Search by ID
* Filter by text
* Filter by author
* Filter by category


13. ERROR HANDLING

* Invalid input warnings
* Duplicate detection
* Missing references alerts


14. FUTURE EXTENSIONS

* AI-assisted translation
* AI commentary suggestions
* Contributor moderation system
* Workflow approvals


15. IMPLEMENTATION STRATEGY

Phase 1
* Basic CRUD UI
* Simple forms

Phase 2
* Bulk upload system
* Validation engine

Phase 3
* Full CMS with roles


16. FINAL INSIGHT
Admin dashboard is not optional.
It is:
🌿 The Control Center of your entire system

Without it:
System = static and fragile

With it:
System = scalable, maintainable, and alive
---

# ❤️ Why This Matters for You

This directly answers your earlier concern:

✔ “How will I manage huge data?”  
✔ “How to input new texts?”  
✔ “How to scale operations?”  
