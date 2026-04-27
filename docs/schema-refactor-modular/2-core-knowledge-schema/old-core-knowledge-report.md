I now need a comprehensive analysis and mapping of all “Library / Knowledge Layer” components in my system—similar to the audit previously done for user authentication.

This is strictly an analysis task only. No changes should be made.

Context
The system currently has two separate library implementations:
User Dashboard Library
Research Scholars Library
These are:
Partially independent
Partially connected to database tables
Partially using hardcoded/static data
The focus is specifically on knowledge-related content, such as:
Vedic texts and scriptures
Scriptural content (e.g., Bhagavad Gita and similar works)
Teachings, verses, commentaries, references
Any structured textual knowledge

🚫 Exclude general “education system” logic—focus only on scriptural / knowledge layer content.

Scope of Analysis
1. Database Layer
Identify all Prisma models related to:
Texts / scriptures
Verses / sections / chapters
Commentaries / annotations
Knowledge indexing / metadata
Identify all PostgreSQL tables:
That store or relate to knowledge content
Including both actively used and partially used tables
2. Codebase Layer

Identify all files involved in:

Rendering / fetching library content
Research scholar tools and views
User dashboard library views
Hardcoded data sources (very important to identify)

Include:

API routes / endpoints
Controllers
Services
Repositories
Prisma queries / DB interaction files
Static data files (JSON, constants, etc.)
Type definitions
3. Dual-System Mapping

Since there are two library systems:

Clearly separate:
User Dashboard Library components
Research Scholar Library components
Then identify:
Overlaps
Redundancies
Shared vs isolated logic
Important Constraints (Strict)

🚫 Do NOT:

Modify any code
Suggest UI/UX changes
Refactor anything
Change APIs or structure

✅ Only:

Analyze
Identify
Map
Expected Output Format

Please provide a structured report with:

Prisma Models
Model name + role
Database Tables
Table name + purpose
Relationships (if relevant)
File-Level Mapping
File path → responsibility
Grouped by:
User Dashboard Library
Research Scholar Library
Hardcoded Data Identification
Files containing static/scriptural data
What kind of data they hold
Dependency & Overlap Overview
How systems are connected
Duplicate or parallel implementations
Goal
Achieve complete visibility of the knowledge layer
Prepare for future unification and refactoring
Ensure no content source is missed (DB or hardcoded)

==========================


# Core Knowledge & Library Layer Audit Report

This report provides a comprehensive analysis of the "Library / Knowledge Layer" components across the Vedic Skills Institute monorepo. It specifically focuses on scriptural content, verses, commentaries, and structured textual knowledge, comparing the User Dashboard Library against the Research Scholars Library.

## 1. Database Layer (Prisma Models & PostgreSQL Tables)

### Knowledge Structure & Content Models
These models represent the core ontological schema for storing shastras, their hierarchical structure, and multi-layered textual content.

*   **`shastras`**
    *   **Purpose:** High-level entities representing entire scriptures or books (e.g., "Bhagavad Gita").
    *   **Key Fields:** `id`, `slug`, `name`, `structure_type`, `status`.
*   **`nodes`**
    *   **Purpose:** Represents the hierarchical tree structure of the knowledge graph (Adhyaya, Prakarana, Shloka, Sutra). Uses PostgreSQL `ltree` extension for efficient path querying.
    *   **Key Fields:** `id`, `shastra_id`, `parent_id`, `level`, `slug`, `order_index`, `path` (`ltree`).
    *   **Relationships:** Belongs to a `shastra`, has self-referential `parent_id`, holds many `texts`.
*   **`texts`**
    *   **Purpose:** Stores the actual textual content blocks linked to a specific node. Content is categorized by type (mula, anuvada, bhashya) and language.
    *   **Key Fields:** `id`, `node_id`, `content_type` (Enum), `language` (Enum), `script` (Enum), `content`, `source_id`.
    *   **Relationships:** Belongs to a `node`, linked to a `source` (author).

### Knowledge Metadata & Interconnection Models
*   **`sources`**
    *   **Purpose:** Represents authors, commentators, or origin lineages of specific texts (e.g., "A.C. Bhaktivedanta Swami Prabhupada").
*   **`synonyms`**
    *   **Purpose:** Stores word-by-word (shabdartha) meanings linked to a specific `text_id`.
*   **`node_relations`**
    *   **Purpose:** Enables deep cross-referencing between different nodes (e.g., a verse in the Gita referencing an Upanishad).
*   **`tags` & `node_tags`**
    *   **Purpose:** Hierarchical taxonomy for tagging verses with conceptual themes (e.g., "Karma Yoga", "Dharma").
*   **`text_embeddings` & `text_metadata`**
    *   **Purpose:** Future-proofing for semantic search (pgvector) and specific sensitivity/guidance filtering.

---

## 2. Codebase Layer & Dual-System Mapping

The system currently features a distinct split between the UI designed for general users and the robust workbench designed for scholars.

### Group A: User Dashboard Library (Hardcoded Prototype)
This system represents a distraction-free, aesthetic reading experience, but is currently **disconnected from the database**.

*   **File:** `apps/web-portal/app/library/[id]/page.tsx`
    *   **Responsibility:** The catalog/detail page for a book.
    *   **Data Source:** Uses a hardcoded `contentMetadata` object.
*   **File:** `apps/web-portal/app/library/[id]/read/page.tsx`
    *   **Responsibility:** The deep reading experience UI.
    *   **Data Source:** **Fully Hardcoded**. It contains static arrays for `chapters`, static verse text (Bg 2.47), static translation, and static purport strings. It mimics functionality (like toggling purports or saving highlights) but relies on local React state (`useState`).

### Group B: Research Scholar Library (DB-Driven)
This system represents the production-grade, multi-pane workbench that actively pulls from the PostgreSQL DB via the API Gateway.

*   **Frontend UI:**
    *   `apps/web-portal/app/library/research/page.tsx`: The main scholarly workbench shell.
    *   `apps/web-portal/components/library/library-layout.tsx`: The 3-pane responsive layout (Tree Navigation, Content Engine, Application Panel).
    *   `apps/web-portal/components/library/content-engine.tsx`: The core orchestrator that renders the active verse, its meanings, translations, and commentaries.
*   **Frontend Data Fetching:**
    *   `apps/web-portal/lib/hooks/use-verse.ts`: Custom hook that fetches data using `fetch('/api/verse/[id]')` and caches it in `useAppStore`.
    *   `apps/web-portal/app/api/verse/[id]/route.ts` & `apps/web-portal/app/api/library/tree/route.ts`: Next.js Route Handlers that act as BFF proxies, forwarding requests to `http://localhost:4444`.
*   **Backend API Gateway:**
    *   `apps/api-gateway/src/routes/library.routes.ts`: Fastify endpoints exposing the knowledge layer (`/tree`, `/verse/:id`, `/search`).
    *   `apps/api-gateway/src/modules/knowledge/library/library.service.ts`: The data transformation layer. It maps flat Prisma results into a rich, nested JSON payload grouping texts by `mula`, `transliteration`, `translationsByAuthor`, and `commentary`.
    *   `apps/api-gateway/src/modules/knowledge/library/library.repository.ts`: Executes complex Prisma queries joining `nodes`, `texts`, `shastras`, `node_relations`, and `node_tags`.

---

## 3. Hardcoded Data Identification

Aside from the inline hardcoded strings in the User Dashboard views, the system relies on physical static data files.

### Ingestion Datasets (Static JSON)
Located in `apps/ingestion-service/datasets/`:
*   **Gita Data:** `gita/verse.json`, `gita/translation.json`, `gita/commentary.json`, `gita/chapters.json`, `gita/authors.json`.
    *   **Purpose:** These files contain the raw, authoritative structured text of the Bhagavad Gita used by the Prisma ingestion scripts to populate the database.
*   **Kama Sutra Data:** `ks-prakarana-output/*.json`, `ks-tags-subtags/*.json`.
    *   **Purpose:** Raw text and taxonomy classifications for secondary ingestion.

### Frontend Application Data Mockups
Located in `apps/web-portal/data/application/`:
*   `courses.ts`, `guidance.ts`, `seva.ts`
    *   **Purpose:** Hardcoded arrays used to populate the "Application Panel" on the right side of the Research Scholar Library layout, demonstrating how a verse links to educational courses or service domains.

---

## 4. Dependency & Overlap Overview

### The Disconnect (Parallel Implementations)
1.  **UI vs. Data:** The User Dashboard's deep reading page (`[id]/read/page.tsx`) features a beautifully designed UI but lacks data integration. The Research Scholar's `content-engine.tsx` has full data integration but uses a separate component structure (`VerseSection`, `MeaningSection`, `CommentarySection`).
2.  **State Management:** The User Dashboard uses isolated local state (`useState`) for tracking the active chapter and reading preferences. The Scholar Library uses a global Zustand store (`useAppStore` tracking `currentNode` and `verses` cache).

### Future Unification Path
To achieve complete system unity without losing the aesthetic UX of the dashboard:
1.  **Abstract Data Fetching:** The User Dashboard's `ReadingExperiencePage` must be refactored to consume the same `useVerse()` hook currently used exclusively by the `ContentEngine`.
2.  **Component Reuse:** The beautifully styled text elements in `ReadingExperiencePage` can be modularized and shared with the `ContentEngine`'s rendering logic.
3.  **Application Panel DB Integration:** The static application panel data (`courses.ts`, etc.) needs to be replaced by querying the `node_relations` and linking out to the actual `projects` or educational system tables.
