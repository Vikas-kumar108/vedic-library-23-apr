Extract primary text/content logic into:

src/modules/knowledge/shared/utils/text.util.ts

Responsibilities:
- Safely extract primary text from node.texts
- Handle empty/undefined cases

Create:
getPrimaryText(texts)

Steps:
1. Identify patterns like:
   texts[0]?.content

2. Replace with:
   getPrimaryText(texts)

Apply ONLY to:
- LibraryService
- DiscoveryService

Rules:
- No logic change
- No structure change
- No API change

Do NOT touch Wisdom


===========


Created text.util.ts
Edited library.service.ts
Edited library.service.ts
Edited discovery.service.ts

I have extracted the primary text extraction logic into a centralized utility within the `shared/` layer.

### Implementation Details
1.  **New Utility File:** Created `src/modules/knowledge/shared/utils/text.util.ts`.
    - **`getPrimaryText(texts)`**: This function standardizes the `texts[0]?.content || ''` pattern. It safely handles null, undefined, or empty arrays, returning an empty string if no content is found.
2.  **Refactored LibraryService:**
    - Updated `getRelated()` to use `getPrimaryText(r.texts)` for generating snippets.
3.  **Refactored DiscoveryService:**
    - Replaced all inline text extraction patterns in `getRecommended()`, `searchPractical()`, and `getNodesByTag()` with the unified `getPrimaryText()` utility.

### Files Updated
- **Shared Utility:** [text.util.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/shared/utils/text.util.ts)
- **Library Module:** [library.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/library/library.service.ts)
- **Discovery Module:** [discovery.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/discovery/discovery.service.ts)

This refactoring further unifies the domain logic and improves code safety by centralizing defensive checks for scripture text content.