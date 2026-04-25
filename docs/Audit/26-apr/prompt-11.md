Analyze these modules:

- library
- discovery
- wisdom

Find:

1. Repeated logic across services
2. Shared concepts:
   - verse
   - commentary
   - tags
   - references
   - transliteration usage

3. Identify duplication patterns

Propose a shared layer:

src/modules/knowledge/shared/

Include:
- utility functions
- common mappers
- shared types/interfaces

Do NOT move code yet.
Only propose structure.



==============================================



Edited prompt-10.md
Viewed prompt-10.md:19-61
Created shared_layer_proposal.md

I have analyzed the three knowledge modules and identified several areas of duplication, particularly around Data Transfer Object (DTO) mapping, safe text extraction, and reference resolution.

I have drafted a proposal for a `shared/` layer designed to unify these concepts across the domain. You can review the complete structural design and analysis in the [shared_layer_proposal.md](file:///Users/ppublications/.gemini/antigravity/brain/166493e0-3a72-42d0-87c8-fa4b04bea183/artifacts/shared_layer_proposal.md) artifact.

**Key Findings:**
1.  **Node to DTO Mapping:** Every service manually maps Prisma results to JSON objects (e.g., `DiscoveryService` has four distinct `.map()` blocks that do nearly the same thing).
2.  **Shared Concepts:** Verses, tags, and references are treated slightly differently in each service, leading to inconsistent naming (e.g., `title` vs `meta.canonicalRef`).
3.  **Proposed Structure:** I propose adding `types/`, `mappers/`, and `utils/` within `src/modules/knowledge/shared/` to enforce consistency (e.g., standardizing `toLightVerse()` vs `toFullVerse()`).

Let me know if you approve of this structure, and I can begin centralizing these utilities and refactoring the services to use them!

# Knowledge Engine Shared Layer Proposal

This document outlines an analysis of the `library`, `discovery`, and `wisdom` modules to identify duplication patterns and proposes a centralized `shared/` layer to unify domain logic.

## 1. Analysis of Duplication & Shared Concepts

Across the three knowledge modules, several core domain concepts and logic patterns are repeatedly implemented:

### A. Shared Concepts
-   **Verse (Node):** The central entity. `LibraryService` builds a heavy "Standard Format" verse object. `DiscoveryService` builds a lightweight search result verse. `WisdomEngineService` builds a contextual verse object.
-   **Tags:** Used by `Library` for hierarchical taxonomy and `related` matching. Used by `Discovery` for intent-fallback and recommendations. Both services manually map tag objects.
-   **References:** The logic `canonicalRef || slug` (or formatting via `@dharma/text-engine` if missing) is scattered across the services to provide human-readable titles.
-   **Content Extraction (Commentary/Sutra):** Extracting the primary text is duplicated. `DiscoveryService` frequently uses `node.texts[0]?.content`, while `LibraryService` loops over `node.texts` to map them into translations and commentaries.
-   **Transliteration:** Currently isolated to `LibraryService`, but the need to safely resolve script keys (`devanagari` vs `iast`) is a universal domain requirement.

### B. Duplication Patterns
1.  **Manual DTO Mapping:** Every service manually maps Prisma results to JSON objects. For example, `DiscoveryService` has 4 different `.map(n => ({ id: n.id, title: n.canonical_ref || n.slug, text: n.texts[0]?.content }))` blocks.
2.  **Safe Navigation:** Repeated defensive checks like `texts[0]?.content` or `t.source?.name || 'Anonymous'`.
3.  **Property Naming Mismatches:** Slight variations in how objects are returned (e.g., `DiscoveryService` returns `title`, while `LibraryService` returns `meta.canonicalRef`).

---

## 2. Proposed Shared Layer Structure

To resolve these duplications and enforce domain consistency, I propose introducing a `shared/` folder within the knowledge domain.

```text
src/modules/knowledge/shared/
├── types/
│   ├── verse.types.ts       # Unified interfaces for FullVerse, LightVerse (search results)
│   └── taxonomy.types.ts    # Unified interfaces for Tags and Categories
│
├── mappers/
│   ├── verse.mapper.ts      # Functions: toLightVerse(), toFullVerse()
│   └── tag.mapper.ts        # Functions: toTagList(), toTagHierarchy()
│
└── utils/
    ├── reference.util.ts    # Centralized `resolveTitle(node)` and `formatReference()`
    └── text.util.ts         # Centralized transliteration and `getPrimaryText(texts)` wrappers
```

## 3. Benefits of the Shared Layer

1.  **Consistent API Responses:** By routing all Prisma nodes through `verse.mapper.ts`, a verse will look identical whether it comes from a search result (`Discovery`), a tree navigation (`Library`), or a random pulse (`Wisdom`).
2.  **DRY (Don't Repeat Yourself):** Removes the repetitive `.map()` blocks scattered throughout the services.
3.  **Centralized Safety:** Null checks for texts, authors, and canonical references are handled in one place, reducing runtime errors.
4.  **Easier Testing:** Pure mapping and utility functions can be comprehensively unit tested independently of the database or Fastify.

---
**Status:** Awaiting your approval before moving files or refactoring the code to utilize this shared layer.
