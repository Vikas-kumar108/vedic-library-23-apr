Refactor DiscoveryService and LibraryService to:

- Use shared mappers consistently
- Remove any remaining duplicate mapping logic

Focus:
- Replace inline mapping with:
  toLightVerse
  toTagList
  resolveReference
  getPrimaryText

Rules:
- Do NOT change API response structure
- Do NOT change business logic
- Only simplify and reuse shared layer

Goal:
Services should orchestrate, not transform data


=================



I have performed a final consistency pass on both `DiscoveryService` and `LibraryService` to ensure maximum reuse of the shared mapping layer.

### Refactoring Summary

#### 1. Discovery Module Consistency
I have verified that `DiscoveryService` now consistently uses `toLightVerse`, `resolveReference`, and `getPrimaryText`. 
- **Recommendations & Fallbacks:** These now fully utilize the `toLightVerse` mapper, reducing the service's responsibility for data transformation.
- **Search Results:** While the search result structure is specific (using `nodeId`, `level`, and `tag` info), it now correctly uses the `getPrimaryText` utility for safe content extraction.

#### 2. Library Module Consistency
I have further simplified `LibraryService` by integrating the shared mappers into its auxiliary flows:
- **Related Verses:** Refactored `getRelated()` to use the `toLightVerse` mapper via destructuring. This ensures that the `title` and `snippet` (mapped from `text`) are resolved using the same centralized logic as the search engine.
- **Verse Details:** The `getVerse()` method is now significantly leaner, using `resolveReference` for the metadata and `toTagList` for the taxonomy, while keeping its core "Heavy Verse" assembly logic intact.

### Final Domain Structure
The services have been successfully shifted toward an **orchestration role**:
- **Repositories** handle raw data fetching.
- **Shared Mappers/Utils** handle domain-specific data transformation and safety.
- **Services** coordinate these components to fulfill business requirements (heuristics, fallbacks, and hierarchy building).

### Files Finalized
- [library.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/library/library.service.ts)
- [discovery.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/modules/knowledge/discovery/discovery.service.ts)

The Knowledge domain is now internally modular, with a clean separation between data retrieval, intelligence, and presentation.


==========


Now what we hvae got after audit 


Database (Prisma)
   ↓
Repositories (data access)
   ↓
Shared Layer
   ├── utils      → core primitives
   └── mappers    → representation rules
   ↓
Services          → orchestration only
   ↓
Routes            → API surface