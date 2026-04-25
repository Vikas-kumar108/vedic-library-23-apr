Create a light verse mapper:

File:
src/modules/knowledge/shared/mappers/verse.mapper.ts

Function:
toLightVerse(node)

Fields:
- id → node.id
- title → resolveReference(node)
- text → getPrimaryText(node.texts)

Steps:
1. Find repeated mapping logic inside DiscoveryService
2. Extract into toLightVerse(node)
3. Replace inline mappings with this function

CRITICAL RULES:
- Do NOT change output structure
- Do NOT change field names
- Do NOT modify logic
- Only extract mapping logic

Apply ONLY to:
- DiscoveryService

Do NOT touch:
- LibraryService
- WisdomEngine


=========



Ran command: `mkdir -p /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/shared/mappers`
Created verse.mapper.ts
Edited discovery.service.ts

I have implemented a centralized `toLightVerse` mapper and refactored the `DiscoveryService` to utilize it.

### Implementation Details
1.  **New Mapper File:** Created `src/modules/knowledge/shared/mappers/verse.mapper.ts`.
    - **`toLightVerse(node)`**: This function provides a standardized way to convert a Prisma node into a lightweight Data Transfer Object (DTO). It integrates the previously created `resolveReference` and `getPrimaryText` utilities to populate the `id`, `title`, and `text` fields.
2.  **Refactored DiscoveryService:**
    - In `getRecommended()`, I replaced the redundant inline mapping blocks for both primary recommendations and fallback results with the `toLightVerse` mapper.
    - I used the spread operator (`...toLightVerse(node)`) to maintain the existing output structure, ensuring that additional fields like `slug`, `shastra`, and `type` are preserved exactly as they were.

### Files Updated
- **Shared Mapper:** [verse.mapper.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/shared/mappers/verse.mapper.ts)
- **Discovery Module:** [discovery.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/discovery/discovery.service.ts)

This centralization ensures that a "lightweight verse" has a consistent structure across all discovery and search features, reducing code duplication and simplifying future updates to the domain model.