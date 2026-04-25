Refactor WisdomEngineService into:

1. wisdom.repository.ts
   - Move any Prisma usage into this file (if present)
   - Keep only data access

2. wisdom-engine.service.ts
   - Keep all interpretation logic
   - Mapping contexts (Finance, HR, etc.)
   - Commentary generation

CRITICAL RULES:
- Do NOT change API or return structure
- Do NOT modify logic
- Do NOT affect UI or downstream usage

Goal:
Separate knowledge retrieval from wisdom interpretation


====================



Viewed wisdom-engine.service.ts:1-52
Created wisdom.repository.ts
Edited wisdom-engine.service.ts

I have refactored the `WisdomEngine` domain to separate knowledge retrieval from wisdom interpretation.

### Changes Summary
1.  **New Repository Layer:** Created `apps/api-gateway/src/repositories/wisdom.repository.ts`. This file now handles the specific query for fetching Shastric verses by their unique slugs, including the necessary Shastra metadata.
2.  **Interpretative Service Layer:** Updated `apps/api-gateway/src/services/wisdom-engine.service.ts` to remove direct Prisma calls. The service now focuses purely on its core "interpretation" logic:
    *   Mapping institutional contexts (Finance, HR, Governance, etc.) to philosophical verse roots.
    *   Randomly selecting a relevant verse for the requested context.
    *   Generating specific spiritual commentaries that bridge the gap between administrative actions and Vedic wisdom.
3.  **Preserved Interface:** The external API and return structures remain identical, and the random selection heuristic continues to behave exactly as before.

### Refactored Files
- **Repository:** [wisdom.repository.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories/wisdom.repository.ts)
- **Service:** [wisdom-engine.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/services/wisdom-engine.service.ts)

This separation ensures that the philosophical mapping and interpretation logic can be managed independently of the database structure.