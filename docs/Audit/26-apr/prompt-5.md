Review library.repository.ts

Improve:
- Method names → domain-specific
- Remove any business logic
- Keep only data access

Ensure methods reflect:
- chapters
- verses
- commentary
- tree

Return improved version

===================================


Edited library.repository.ts
Edited library.service.ts

I have reviewed and improved the `LibraryRepository` to better reflect the domain-specific language and ensure a strict separation between data access and business logic.

### Improved LibraryRepository
The methods have been renamed to align with the core concepts of the library (tree navigation, verses, and commentary):

1.  **`getLibraryNavigationTree()`**: Fetches the flat node hierarchy required to reconstruct the library's navigation structure (Chapters, Verses, etc.).
2.  **`getVerseWithCommentary(id, isUuid)`**: Retrieves a specific scripture node along with its shastra metadata and all associated translations and commentaries.
3.  **`getVerseTags(nodeId)`**: A targeted query to fetch only the semantic tags assigned to a verse, used for finding spiritual relationships.
4.  **`getRelatedVerses(nodeId, tagIds, limit)`**: Executes the similarity matching query to find verses across different shastras that share the same philosophical themes.
5.  **`getLibraryTaxonomy()`**: Fetches the top-level categories and shastra divisions from the tag system.

### Updated LibraryService
The service has been updated to consume these improved repository methods. All logic related to tree reconstruction, dynamic transliteration, and data normalization remains in the service layer, while the repository handles the raw Prisma interactions.

- **Improved Repository:** [library.repository.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/repositories/library.repository.ts)
- **Updated Service:** [library.service.ts](file:///Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/api-gateway/src/services/library.service.ts)

This refactoring ensures that the repository layer is now purely domain-driven and strictly focused on data retrieval.