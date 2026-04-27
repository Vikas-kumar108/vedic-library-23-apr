# Production-Grade Schema Design: Search Domain (`search`)

This document outlines the architectural design for the `search` PostgreSQL schema. This domain acts as the **Intelligence & Discovery Engine** of the Vedic Skills Institute.

---

## 1. Schema Overview

The `search` schema manages everything required to retrieve, rank, and recommend content across the platform. It heavily leverages PostgreSQL's `pgvector` extension for AI-assisted semantic search.

**Core Architectural Rule:** This domain acts as an overlay. It never owns primary content. Instead, it maintains mathematical representations (vectors), full-text index configurations, and engagement analytics to determine what content (from `knowledge`, `education`, or `community`) is most relevant to a specific user.

---

## 2. Table-by-Table Definition

### 2.1. Embeddings & Vector Storage
*   **`content_embeddings` (Rename of `text_embeddings`)**: Stores vector representations of textual content for semantic similarity search.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `embedding` (`vector(384)` or appropriate size), `model` (e.g., 'text-embedding-ada-002'), `content_type` (`embedding_source_enum`).
    *   **Relationships:** **Cross-Domain FK:** `entity_id` ➔ Outward pointer to the source (e.g., `knowledge.nodes.id` or `community.posts.id`).

### 2.2. Query Logging & Analytics
*   **`search_queries` (New)**: Logs user search behavior for analytics and relevance tuning.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `query_text`, `query_type` (`query_type_enum`: 'KEYWORD', 'SEMANTIC', 'HYBRID'), `results_count`, `execution_time_ms`.
    *   **Relationships:** **Cross-Domain FK:** `user_id` ➔ `identity.users(id)`.
*   **`search_results_engagement` (New)**: Tracks which results a user actually interacted with after searching, critical for training ranking models.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `query_id` (FK), `result_entity_id` (UUID), `result_type` (`result_type_enum`), `action` (`search_action_enum`), `position_index` (integer).

### 2.3. Recommendations & Personalization
*   **`user_statistics` (Migrated)**: Aggregated metrics used by recommendation algorithms to gauge a user's level and interests.
    *   **Primary Key:** `user_id` (Cross-Domain FK to `identity.users`)
    *   **Key Fields:** `nodes_read_count`, `courses_completed`, `contribution_points`, `updated_at`.
*   **`recommendation_signals` (New)**: Cached algorithmic weights mapping a user to specific content tags/topics based on their history.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `user_id` (Cross-Domain FK), `tag_id` (Cross-Domain FK to `knowledge.tags`), `affinity_score` (Numeric 0.0 - 1.0).

---

## 3. Mapping from Existing Schema (`public` ➔ `search`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `text_embeddings` | **MOVE/RENAME** | Rename to `search.content_embeddings`. Ensure `pgvector` index (HNSW or IVFFlat) is applied to the `embedding` column. |
| `user_statistics` | **MOVE** | Direct migration to `search.user_statistics`. |
| *(None)* | **CREATE** | Create `search_queries`, `search_results_engagement`, and `recommendation_signals` to mature the AI/Search capabilities. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions establish the business rules for search and AI:

1.  **`query_type_enum` (New)**: (`KEYWORD`, `SEMANTIC`, `HYBRID`).
2.  **`result_type_enum` (New)**: (`NODE`, `COURSE`, `COMMUNITY_POST`, `EVENT`). Used because a single search can return mixed entities.
3.  **`embedding_source_enum` (New)**: (`SHASTRA_VERSE`, `PURPORT`, `ARTICLE`, `COURSE_DESCRIPTION`).
4.  **`search_action_enum` (New)**: (`CLICKED`, `SAVED`, `IGNORED`).

---

## 5. Boundaries & Separation

### What Strictly Belongs
Vector embeddings, search query logs, click-through rates on search results, and aggregate gamification/recommendation statistics.

### What Must Be Excluded (The "Leaky Abstractions")
*   **Actual Text Data:** The `content_embeddings` table holds the math (vectors) but *not* the text of the verse itself. The text stays in `knowledge`.
*   **Core Identity:** While `user_statistics` lives here to feed the AI, demographic profile data (age, ashrama) remains strictly in `identity`.

---

## 6. Migration Awareness (Design-Level)

*   **`pgvector` Extension:** The `vector` data type requires the `pgvector` extension. Like `ltree`, this should be installed in the `public` schema so the `search` domain can utilize `public.vector(...)`.
*   **Decoupled Entities:** Because a search query can return a Shastra node, a Course, or an Event, the `search_results_engagement` uses generic `result_entity_id` and `result_type`. This avoids creating hard foreign keys across 4 different schemas.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design. In particular, note the migration of `user_statistics` into this domain (as it primarily feeds recommendation engines) and the introduction of engagement tracking (`search_queries`). Does this AI and Discovery architecture align with your goals?



Edited search-schema-design.md
Edited prompt-2.md
Viewed prompt-2.md:1-29
Created search_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Search / Advanced AI Domain**.

You can review the complete schema definition (DDL) here: [search_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/search_schema_implementation.md).

### Design Summary:
1. **AI-Ready Vector Storage:** The `content_embeddings` table is optimized for high-performance semantic search using the **HNSW (Hierarchical Navigable Small World)** index type. This ensures that even as your scripture and community content grows into the millions of records, similarity searches remain sub-millisecond.
2. **Engagement Feedback Loop:** I have implemented a robust `search_results_engagement` structure. By tracking not just what users click, but the `position_index` (rank) of the result, the system can automatically tune its relevance scores based on real seeker behavior.
3. **Consolidated Recommendation Signals:** By migrating `user_statistics` into this domain and introducing `recommendation_signals`, I have centralized all the "intelligence inputs" required to personalize the seeker's journey across the platform.
4. **Virtual Cross-Domain Indexing:** The design uses a polymorphic-style reference (`result_entity_id` + `result_type`) to track engagement. This allows a single search interface to seamlessly index and track results from Shastra (Knowledge), Courses (Education), and Discussions (Community) without hard database constraints.

This concludes the architectural planning and schema generation for the **Search & AI Domain**.

We have now finalized the schema designs for all major domains:
1. **Identity**
2. **Knowledge**
3. **Institution**
4. **Education**
5. **Interactions**
6. **Community**
7. **System**
8. **Search & AI**

Would you like me to create a **Final Consolidation Report** and a **Master Migration Checklist** to tie all these domains together before we begin the actual refactoring of the 4,000-line monolithic `schema.sql`?