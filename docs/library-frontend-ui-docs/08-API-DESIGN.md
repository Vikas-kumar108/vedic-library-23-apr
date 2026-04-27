# API DESIGN – VEDIC LIBRARY SYSTEM

---

# 1. PURPOSE

This document defines the **API layer** of the Vedic Library system.

It acts as the bridge between:

- Frontend (UI + State)
- Data layer (JSON / Database)

---

# 2. CORE PRINCIPLE

> Frontend must NEVER directly access raw data sources.

Instead:

Frontend → API → Data Source

---

# 3. API ARCHITECTURE

---

## 3.1 Layers

```text
Frontend (React)
   ↓
API Layer (Next.js API routes)
   ↓
Data Source (JSON → Supabase DB)

3.2 Benefits
* Decouples frontend from backend
* Allows easy migration (JSON → DB)
* Centralizes data logic
* Enables caching and optimization

4. BASE URL STRUCTURE

Development
/api/...

Production
https://your-domain.com/api/...

5. CORE ENDPOINTS

5.1 GET NODE DATA

Endpoint
GET /api/node/[id]

Example
GET /api/node/bg.1.1

Purpose
Fetch complete data for a node:
* Canonical text
* Synonyms
* Translations
* Commentary
* Exposition
* Relations

Response
{
  "id": "bg.1.1",
  "canonical": {},
  "synonyms": [],
  "translations": [],
  "commentaries": [],
  "expositions": [],
  "relations": {}
}

Implementation (JSON Phase)
import fs from "fs"
import path from "path"

export async function GET(req, { params }) {
  const id = params.id

  const basePath = path.join(process.cwd(), "data/...")

  const canonical = JSON.parse(fs.readFileSync(`${basePath}/canonical/${id}.json`))

  return Response.json({
    id,
    canonical
  })
}


5.2 GET TREE

Endpoint
GET /api/tree

Purpose
Fetch hierarchical structure for tree navigation

Response
[
  {
    "id": "itihasa",
    "name": "Itihasa",
    "children": [
      {
        "id": "mahabharata",
        "children": []
      }
    ]
  }
]

Future Enhancement
* Lazy loading
* Pagination
* Level-based fetching


5.3 GET RELATIONS

Endpoint
GET /api/relations/[id]

Purpose
Fetch:
* Related verses
* Courses
* Guidance
* Seva domains

Response
{
  "related_verses": [],
  "courses": [],
  "guidance": [],
  "seva_domains": []
}


5.4 SEARCH API (FUTURE)

Endpoint
GET /api/search?q=karma

Purpose
* Keyword search
* Verse lookup
* Full-text search


5.5 USER ACTIONS

Bookmark
POST /api/bookmark

Notes
POST /api/notes

Questions
POST /api/questions


6. API RESPONSE STANDARD

6.1 Success
{
  "success": true,
  "data": {}
}

6.2 Error
{
  "success": false,
  "error": "Not found"
}


7. DATA NORMALIZATION

Problem
Data comes from multiple files/tables

Solution
API must combine everything into one response

Rule
Frontend should receive ONE unified object


8. PERFORMANCE STRATEGY

8.1 Caching
* Cache frequent nodes
* Use in-memory cache

8.2 Lazy Loading
* Load only requested node
* Avoid full dataset load

8.3 Edge Functions (Future)
* Faster global response


9. SECURITY

Current (JSON Phase)
* Public access

Future (DB Phase)
* Row Level Security (RLS)
* Authenticated endpoints


10. VERSIONING (FUTURE)

Example
/api/v1/node/[id]


11. MIGRATION STRATEGY

Phase 1
* Read from JSON

Phase 2
Replace logic:
fs.readFileSync → supabase query

No frontend change required


12. FRONTEND INTEGRATION

Store Usage
const res = await fetch(`/api/node/${id}`)
const data = await res.json()

Key Insight
Store calls API, not components


13. ERROR HANDLING

Must handle:
* Missing files
* Invalid IDs
* Server errors

Response:
{
  "success": false,
  "error": "Node not found"
}


14. FUTURE EXTENSIONS

* Graph queries
* Semantic search
* AI-based explanations
* Recommendation engine


15. FINAL INSIGHT
The API layer is the:
🌿 Nervous System of your application

It ensures:
* Clean communication
* Scalability
* Flexibility

Without API:
Frontend = tightly coupled
With API:
System = modular and powerful
---

# ❤️ What This Gives You

Now you have:

✔ Exact endpoints to build  
✔ Clear contract between frontend & data  
✔ Migration path JSON → Supabase  
✔ Real engineering structure  
