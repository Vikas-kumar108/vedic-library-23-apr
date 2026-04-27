# 🟢 Track B — Platform & Interface Roadmap
## Vedic Library Project

---

## Status

Track: B  
Domain: Platform, Rendering Engine, Interaction Systems  
Authority Level: Subordinate to Track A (Canonical)

---

## 0. Purpose

Track B governs:

- Reader engine
- Rendering architecture
- UI system
- Scripture abstraction layer
- Search systems
- Authentication systems
- Infrastructure deployment
- Supabase readiness

Track B must never:

- Modify canonical identity
- Redefine UID structure
- Alter canonical schemas
- Collapse layer separation

---

## 1. Platform Philosophy

Track B exists to:

Render canon without distortion.  
Enable interaction without corruption.  
Scale interface without touching identity.

Canon is immutable.
Platform is adaptable.

---

## 2. Completed Platform Milestones

### Phase B0 — Frontend Stabilization
- Working routing
- File loader abstraction
- Canonical verse rendering
- Clean single-column reading UI

### Phase B1 — Component Architecture
- Atomic UI system
- Scripture component separation
- Layout isolation
- Documentation of structure

---

## 3. Active Roadmap Areas

### A. Commentary System Expansion

Location:
`roadmap_future/commentary/`

Goals:
- Multi-commentary support
- Commentary tabs
- Tradition attribution
- Layer separation enforcement

---

### B. Authentication & Supabase Integration

Location:
`roadmap_future/auth/`

Goals:
- Auth boundaries
- User identity
- Bookmarks
- Notes
- Preferences persistence

Rules:
- No canonical data stored in user tables
- UID remains reference key

---

### C. Search & Discovery Layer

Location:
`roadmap_future/search/`

Goals:
- Reference search
- Metadata search
- OpenSearch integration
- Query scope controls
- Non-semantic search (canonical-safe)

Search must never:
- Modify canonical data
- Infer canonical meaning
- Rewrite structural identity

---

### D. UI Expansion Layer

Location:
`roadmap_future/ui/`

Goals:
- Reading modes
- Scholar mode
- Toggle systems
- Advanced rendering rules
- Accessibility refinement

UI must remain:
- Calm
- Reversible
- Canon-safe

---

## 4. Supabase Readiness Strategy

Supabase integration will:

- Store user state only
- Store bookmarks keyed by UID
- Store notes keyed by UID
- Store preferences (script, mode)

Supabase will never:
- Store canonical text
- Store canonical schema
- Alter canonical records

---

## 5. Deployment & Infrastructure

Deployment governed by:

- Vercel
- GitHub main branch auto-deploy
- Subdomain isolation
- SSL via Let's Encrypt

Infrastructure evolution must not:
- Entangle canonical ingestion
- Introduce backend mutation of canonical layer

---

## 6. Future Expansion

Potential future platform systems:

- Advanced scholar view
- Cross-reference engine
- Multi-panel reading
- Canonical diff view (variants)
- Role-based interface layers

---

## 7. Structural Invariant

Track B may evolve.
Track B may refactor.
Track B may redesign.

But Track B must always obey Track A.

---

End of Document.
