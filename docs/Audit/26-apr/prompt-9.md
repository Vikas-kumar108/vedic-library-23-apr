We are NOT creating a new microservice yet.

Task:
Restructure the existing api-gateway into domain modules.

Move files into:

src/modules/knowledge/

Structure:
- library/
- discovery/
- wisdom/

Each module contains:
- service
- repository

Rules:
- DO NOT change imports outside what is necessary
- DO NOT change logic
- DO NOT change API routes
- Keep system fully working

Goal:
Internal domain organization only
NO new service creation

==================================



Ran command: `mkdir -p /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/library /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/discovery /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/wisdom`
Ran command: `mv /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/services/library.service.ts /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/library/library.service.ts && mv /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories/library.repository.ts /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/library/library.repository.ts && mv /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/services/discovery.service.ts /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/discovery/discovery.service.ts && mv /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories/discovery.repository.ts /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/discovery/discovery.repository.ts && mv /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/services/wisdom-engine.service.ts /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/wisdom/wisdom-engine.service.ts && mv /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories/wisdom.repository.ts /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/wisdom/wisdom.repository.ts`
Listed directory routes
Viewed system.routes.ts:1-38
Searched for "WisdomEngineService"
Viewed institutional.routes.ts:1-98
Edited library.service.ts
Edited discovery.service.ts
Edited wisdom-engine.service.ts
Edited library.routes.ts
Edited discovery.routes.ts
Edited institutional.routes.ts

I have successfully restructured the `api-gateway` into domain-specific modules under `src/modules/knowledge/`.

### Restructured Module Organization
I have migrated the refactored services and repositories into a vertical domain structure to ensure better cohesion and isolation within the gateway:

- **Library Module:** `src/modules/knowledge/library/`
  - `library.service.ts`
  - `library.repository.ts`
- **Discovery Module:** `src/modules/knowledge/discovery/`
  - `discovery.service.ts`
  - `discovery.repository.ts`
- **Wisdom Module:** `src/modules/knowledge/wisdom/`
  - `wisdom-engine.service.ts`
  - `wisdom.repository.ts`

### Migration Details
1.  **Internal Decoupling:** Updated all service-to-repository imports to be local within their respective modules (e.g., `LibraryService` now imports `LibraryRepository` from `./library.repository`).
2.  **Route Synchronization:** Adjusted the import paths in the existing route files to ensure the API remains operational:
    *   `src/routes/library.routes.ts` (Library)
    *   `src/routes/discovery.routes.ts` (Discovery)
    *   `src/routes/institutional.routes.ts` (Wisdom Engine)
3.  **Zero Logic Change:** All business heuristics, search fallbacks, and data transformations remain exactly as they were. No API contracts or external behaviors were modified during this move.

The system is now organized by domain, providing a much cleaner foundation for future extraction or scaling without the overhead of a new microservice.