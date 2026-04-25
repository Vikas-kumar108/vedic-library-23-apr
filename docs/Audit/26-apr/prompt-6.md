Refactor DiscoveryService into two layers:

1. Create: discovery.repository.ts
   - Move all Prisma queries into this file
   - Keep methods focused on data retrieval only

2. Update: discovery.service.ts
   - Remove direct Prisma usage
   - Keep all search logic, heuristics, fallback strategies

CRITICAL RULES:
- Do NOT change API or return structure
- Do NOT modify logic
- Do NOT affect UI behavior
- Only separate data access

Goal:
Clean separation between search data and search intelligence
===============


Viewed discovery.service.ts:1-192
Created discovery.repository.ts
Edited discovery.service.ts

I have refactored the `Discovery` domain to separate search data access from search intelligence.

### Changes Summary
1.  **New Repository Layer:** Created `apps/api-gateway/src/repositories/discovery.repository.ts`. This file now handles all direct Prisma interactions, including the complex multi-table searches and keyword matching used by the discovery system.
2.  **Intelligent Service Layer:** Updated `apps/api-gateway/src/services/discovery.service.ts` to remove all Prisma queries. The service now focuses exclusively on its "intelligence" responsibilities:
    *   Orchestrating search intent matching (via `searchByIntent`).
    *   Managing multi-stage fallback strategies (Intent Search → Keyword Tag Search → Literal Content Search).
    *   Determining recommendation logic based on seeker eligibility levels.
3.  **Preserved Logic & Signatures:** The external API and return structures remain identical. Error handling and console logging for missing tables (like `node_tags`) have been preserved to maintain the exact same operational behavior.

### Refactored Files
- **Repository:** [discovery.repository.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories/discovery.repository.ts)
- **Service:** [discovery.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/services/discovery.service.ts)

This architecture ensures that search intelligence (heuristics and fallbacks) can evolve independently of the underlying data storage and schema.