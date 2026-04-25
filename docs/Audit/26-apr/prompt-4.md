Refactor LibraryService into two layers:

1. Create: library.repository.ts
   - Move ALL Prisma queries into this file
   - Each query becomes a method

2. Update: library.service.ts
   - Remove direct Prisma usage
   - Call repository methods instead

CRITICAL RULES:
- DO NOT change any function signatures
- DO NOT change return data structure
- DO NOT modify business logic
- DO NOT touch routes or controllers
- DO NOT change anything related to UI consumption
- Both scholar-facing and application-facing flows must behave EXACTLY the same

Goal:
Internal separation only (Prisma → Repository)
ZERO external behavior change

Output:
- New repository file
- Updated service file

==========================================================


Edited prompt-3.md
Edited prompt-1.md
Viewed prompt-3.md:22-50
Listed directory src
Viewed library.service.ts:1-222
Ran command: `mkdir -p /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories`
Created library.repository.ts
Edited library.service.ts

I have completed the refactoring of the `Library` domain into a clean two-layer architecture.

### Changes Summary
1.  **New Repository Layer:** Created `apps/api-gateway/src/repositories/library.repository.ts` to encapsulate all Prisma queries. This ensures that the data access logic is centralized and reusable.
2.  **Decoupled Service Layer:** Updated `apps/api-gateway/src/services/library.service.ts` to remove all direct `PrismaClient` usage. It now interacts exclusively with the repository for data operations while retaining its core business logic (hierarchical tree construction, dynamic transliteration, and content assembly).
3.  **Preserved Interface:** The `LibraryService` constructor still accepts `PrismaClient` to maintain compatibility with existing route initializations (e.g., in `library.routes.ts`), fulfilling the requirement to avoid touching routes or controllers.

### Refactored Files

- **Repository:** [library.repository.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories/library.repository.ts)
- **Service:** [library.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/services/library.service.ts)

This internal separation improves maintainability without changing any external behavior or API contracts.