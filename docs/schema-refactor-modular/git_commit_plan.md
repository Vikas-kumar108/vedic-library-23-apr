# Git Commit History: User & Identity Module Upgrade

The following commits represent the logical progression of the User & Identity Module implementation, ensuring a clean and auditable repository history.

---

### Commit 1
**Commit Title:**
feat: implement identity domain migration with dynamic store pattern

**Description:**
- Refactored `AuthService` and `DiscoveryRepository` to support dual-schema operations (`public` and `identity`).
- Introduced a dynamic store pattern controlled by the `IDENTITY_SCHEMA_ENABLED` toggle.
- Enables zero-downtime migration of user identity data.

**Files:**
- `apps/api-gateway/src/services/auth.service.ts`
- `apps/api-gateway/src/modules/knowledge/discovery/discovery.repository.ts`

---

### Commit 2
**Commit Title:**
fix: enforce race-condition protection for audit logging

**Description:**
- Added a unique composite index to `audit_logs` on `(performed_by_id, record_id, action)`.
- Updated `LibraryRepository` to use a 1-minute debounce and atomic `try/catch` for unique violations.
- Corrected schema field names: `record_id` (not `entity_id`) and `timestamp` (not `created_at`).

**Files:**
- `packages/data-access/prisma/schema.prisma`
- `apps/api-gateway/src/modules/knowledge/library/library.repository.ts`
- `apps/api-gateway/src/modules/knowledge/discovery/discovery.repository.ts`

---

### Commit 3
**Commit Title:**
refactor: stabilize discovery engine with canonical ordering

**Description:**
- Replaced alphabetical slug-based ordering with shastric `order_index` and temporal `timestamp`.
- Optimized `findCuratedWisdom` and `findGenericWisdom` for stable seeker progression.
- Removed dependency on `node_tags` fallback.

**Files:**
- `apps/api-gateway/src/modules/knowledge/discovery/discovery.repository.ts`

---

### Commit 4
**Commit Title:**
feat: implement weighted, tier-based recommendation engine

**Description:**
- Created `SeekerRecommendationService` to deliver personalized wisdom based on seeker maturity (Beginner, Intermediate, Advanced).
- Implemented weighted distribution: FOUNDATIONAL (Continuity) vs. PERSONALIZED (Relevance).
- Added anti-repetition memory by excluding the last 20 read nodes.

**Files:**
- `apps/api-gateway/src/modules/knowledge/discovery/recommendation.service.ts`
- `apps/api-gateway/src/routes/discovery.routes.ts`

---

### Commit 5
**Commit Title:**
feat: introduce guided path layer with focus derivation

**Description:**
- Added `deriveFocus` logic to map `inner_state` and level to path focuses: FOUNDATION, STABILITY, CLARITY, DEPTH.
- Designated the first recommendation as a primary "Next Step" guide.
- Transformed suggestions into a structured spiritual journey.

**Files:**
- `apps/api-gateway/src/modules/knowledge/discovery/recommendation.service.ts`

---

### Commit 6
**Commit Title:**
feat: add persistence layer for guided path stability

**Description:**
- Extended `spiritual_profiles` models in both schemas with `current_focus`, `current_primary_node_id`, and `last_guided_at`.
- Implemented `updateGuidedPathState` in `DiscoveryRepository`.
- Ensures the "Next Step" remains stable across user sessions.

**Files:**
- `packages/data-access/prisma/schema.prisma`
- `apps/api-gateway/src/modules/knowledge/discovery/discovery.repository.ts`

---

### Commit 7
**Commit Title:**
feat: implement atomic completion and path refresh rules

**Description:**
- Added idempotent completion trigger in `LibraryRepository` using atomic `updateMany`.
- Implemented strict 24-hour refresh logic in `SeekerRecommendationService`.
- Awaits DB writes for primary guide assignment to ensure reliability.

**Files:**
- `apps/api-gateway/src/modules/knowledge/library/library.repository.ts`
- `apps/api-gateway/src/modules/knowledge/discovery/recommendation.service.ts`
- `apps/api-gateway/src/modules/knowledge/discovery/discovery.repository.ts`

---

### Commit 8
**Commit Title:**
feat: implement non-blocking observability layer for guided paths

**Description:**
- Added fire-and-forget logging for `PRIMARY_ASSIGNED`, `PRIMARY_COMPLETED`, and `PATH_REFRESHED` events.
- Enriched `audit_logs` metadata with seeker focus and eligibility levels.
- Ensures system behavior is traceable without impacting performance.

**Files:**
- `apps/api-gateway/src/modules/knowledge/discovery/discovery.repository.ts`
- `apps/api-gateway/src/modules/knowledge/discovery/recommendation.service.ts`
- `apps/api-gateway/src/modules/knowledge/library/library.repository.ts`

---

### Commit 9
**Commit Title:**
docs: create master documentation for User & Identity module

**Description:**
- Authored comprehensive system documentation covering architecture, database design, guided path logic, and observability.
- Provided end-to-end system flows and design principles for future maintainability.

**Files:**
- `docs/system-identity-module.md`
- `docs/schema-refactor-modular/identity_module_fullly_implemented.md`
