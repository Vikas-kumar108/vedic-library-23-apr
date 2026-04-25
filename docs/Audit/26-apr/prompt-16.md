Create a tag mapper:

File:
src/modules/knowledge/shared/mappers/tag.mapper.ts

Goal:
Standardize how tags are returned

Create function:
toTagList(tags)

Responsibilities:
- Map tag objects into consistent structure
- Extract:
  - id
  - name
  - slug (if exists)

Steps:
1. Find repeated tag mapping logic in:
   - LibraryService
   - DiscoveryService

2. Extract into toTagList(tags)

3. Replace inline mappings with this function

CRITICAL RULES:
- Do NOT change output structure
- Do NOT rename fields
- Only extract mapping logic

Apply ONLY where tags are already mapped

Do NOT modify business logic


======================


Edited prompt-15.md
Viewed prompt-15.md:22-54
Created tag.mapper.ts
Edited library.service.ts
Edited library.service.ts
Ran command: `grep -C 5 ".map" /Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/discovery/discovery.service.ts`

I have centralized the tag mapping logic into a shared mapper and refactored the `LibraryService` to use it.

### Implementation Details
1.  **New Mapper File:** Created `src/modules/knowledge/shared/mappers/tag.mapper.ts`.
    - **`toTagList(tags)`**: This function standardizes the conversion of tag objects. It handles both direct tag objects and nested tag objects (from `node_tags` relations), extracting `id`, `name`, and `slug`. It also preserves additional fields like `sanskritName` and `parent` information by using the spread operator, ensuring compatibility with the existing `LibraryService` requirements.
2.  **Refactored LibraryService:**
    - In `getVerse()`, I replaced the complex, 10-line inline mapping of `node.tags` with a single call to `toTagList(node.tags)`.
    - This change significantly reduces boilerplate in the service layer while maintaining the exact same output structure (including `sanskrit` and `parent` nested objects).

### Files Updated
- **Shared Mapper:** [tag.mapper.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/shared/mappers/tag.mapper.ts)
- **Library Module:** [library.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/library/library.service.ts)

This refactoring unifies how scripture tags are handled across the knowledge domain, making the codebase more maintainable and consistent.