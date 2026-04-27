# Production-Grade Schema Design: Knowledge Domain (`knowledge`)

This document outlines the architectural design for the `knowledge` PostgreSQL schema. This domain acts as the **Immutable Product Core** of the Vedic Skills Institute, housing the canonical scriptural hierarchies, translations, purports, and ontology graph.

---

## 1. Schema Overview

The `knowledge` schema is the heart of the platform. It manages the complex, recursive structures of Vedic literature. 

**Core Architectural Rule:** This is a **Standalone Foundation Domain**. Its internal structure represents historical truth. It should have **zero dependencies** on operational state (like user progress, student enrollment, or community discussions). Any operational data must point *inward* to the Knowledge schema.

---

## 2. Table-by-Table Definition

### 2.1. `shastras` (The Root Collection)
*   **Purpose:** Represents a top-level unified work (e.g., "Bhagavad Gita", "Srimad Bhagavatam").
*   **Primary Key:** `id` (UUID)
*   **Key Fields:** `slug` (UNIQUE), `name`, `structure_type`, `status` (`content_status_enum`).
*   **Relationships:** The absolute root. Has no foreign keys.

### 2.2. `nodes` (The Hierarchical Ontology)
*   **Purpose:** Defines the structural spine of the Shastra using PostgreSQL's `ltree` extension. A node can be a Canto, Chapter, Section, or Verse.
*   **Primary Key:** `id` (UUID)
*   **Key Fields:** 
    *   `level` (text: e.g., 'CHAPTER', 'VERSE')
    *   `slug`, `order_index`, `canonical_ref` (e.g., 'BG 1.1')
    *   `path` (`ltree` - extremely performant tree traversal, e.g., `shastra_id.chapter_id.verse_id`)
    *   `sensitivity`, `status`
*   **Relationships:** 
    *   FK to `shastras.id`
    *   Self-referential FK `parent_id` to `nodes.id`

### 2.3. `texts` (The Polymorphic Content)
*   **Purpose:** Holds the actual readable data attached to a node. A single Verse node will have multiple `texts` (e.g., the original Sanskrit, the English translation, the commentary).
*   **Primary Key:** `id` (UUID)
*   **Key Fields:**
    *   `content_type` (`content_type_enum`: 'mula', 'translation', 'purport', etc.)
    *   `language` (`language_enum`: 'sa', 'en', etc.)
    *   `script` (`script_enum`: 'devanagari', 'latin')
    *   `content` (text)
    *   `is_primary`, `anchor_word`, `segment_order`
*   **Relationships:**
    *   FK to `nodes.id`
    *   FK to `sources.id` (Who translated/commented on this specific text)

### 2.4. `sources` (The Historical Metadata Registry)
*   **Purpose:** A registry of authors, commentators, and historical figures (e.g., "Srila Vyasadeva", "A.C. Bhaktivedanta Swami Prabhupada").
*   **Primary Key:** `id` (UUID)
*   **Key Fields:** `name`, `role`, `description`, `year_approx`, `era`.
*   **Relationships:** Standalone lookup table. Referenced by `texts`.

### 2.5. `synonyms` (Word-by-Word Analysis)
*   **Purpose:** Houses the literal word-for-word breakdown (Anvaya/Shabdartha) of a verse text.
*   **Primary Key:** `id` (UUID)
*   **Key Fields:** `word`, `meaning`, `language`, `order_index`.
*   **Relationships:** FK to `texts.id`.

### 2.6. `tags` & `node_tags` (The Taxonomy Engine)
*   **Purpose:** A global, hierarchical tagging system for topical categorization.
*   **Key Fields (`tags`):** `slug`, `name`, `description`, `keywords`, `sanskrit_name`, self-referential `parent_id`.
*   **Relationships (`node_tags`):** Many-to-Many Join Table connecting `nodes.id` and `tags.id`.

### 2.7. `node_relations` (The Knowledge Graph)
*   **Purpose:** Creates lateral connections across the hierarchy (e.g., "Verse BG 2.13 references SB 1.2.6").
*   **Primary Key:** `id` (UUID)
*   **Key Fields:** `relation_type`.
*   **Relationships:** 
    *   FK `from_node_id` to `nodes.id`
    *   FK `to_node_id` to `nodes.id`

---

## 3. Mapping from Existing Schema (`public` ➔ `knowledge`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `shastras` | **MOVE** | Direct migration to `knowledge.shastras`. |
| `nodes` | **MOVE** | Direct migration to `knowledge.nodes`. |
| `texts` | **MOVE** | Direct migration to `knowledge.texts`. |
| `sources` | **MOVE** | Direct migration to `knowledge.sources`. |
| `synonyms` | **MOVE** | Direct migration to `knowledge.synonyms`. |
| `tags` | **MOVE** | Direct migration to `knowledge.tags`. |
| `node_tags` | **MOVE** | Direct migration to `knowledge.node_tags`. |
| `node_relations` | **MOVE** | Direct migration to `knowledge.node_relations`. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions must be moved from `public` to `knowledge`. 

1.  **`content_status_enum`**: (`ACTIVE`, `DRAFT`, `ARCHIVED`, etc.)
2.  **`content_type_enum`**: (`mula`, `anvaya`, `translation`, `purport`, `summary`. *Note: Must be patched to include `vivarana` and `shabdartha` as previously identified.*)
3.  **`language_enum`**: (`sa`, `en`, `hi`, `bn`, etc.)
4.  **`script_enum`**: (`devanagari`, `latin`, `bengali`, etc.)

---

## 5. Boundaries & Separation

### What Strictly Belongs
The raw, immutable structure of the scriptures, the historical metadata of who wrote them, the translated variations of the content, and the semantic connections between verses.

### What Must Be Excluded (The "Leaky Abstractions")
*   **`text_embeddings` / `vector` data:** Belongs to the **AI / Discovery** schema. The Knowledge schema should hold human-readable text. Mathematical arrays for similarity search bloat this domain and scale differently.
*   **`learning_curves`:** Belongs to the **Education** schema. How a student interacts with a sequence of verses is a curriculum, not the shastra itself.
*   **`users`:** Identity data. A modern system user translating a verse might be tracked via an `updated_by_user_id` audit field, but `sources` (the historical figures) must remain strictly decoupled from the `identity.users` table.

---

## 6. Migration Awareness (Design-Level)

*   **The `ltree` Extension Risk:** PostgreSQL extensions are bound to schemas. If `ltree` was installed in the `public` schema, the `knowledge.nodes` table must reference it explicitly as `public.ltree` for the `path` column. Attempting to just declare `path ltree` during a Prisma migration might fail if `search_path` doesn't include `public`.
*   **Referential Integrity:** Because this domain has zero outbound dependencies, migrating it requires no coordination with other domains (like Identity or Institution). It can be migrated cleanly and atomically.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design, specifically the handling of the `ltree` extension cross-schema access and the exclusion of Vector Search embeddings from this domain. Does this align with your architectural goals?


Edited Production-Grade%20Schema%20Design:%20Identity%20Domain%20%28identity%29.md
Edited identity_schema_implementation.md
Viewed prompt.md:45-91
Edited prompt.md
Searched for "CREATE TABLE public\.(shastras|nodes|texts|node_relations|authors|sources|tags|node_tags)"
Viewed schema.sql:1543-1600
Viewed schema.sql:2037-2080
Viewed schema.sql:1840-1865
Searched for "CREATE TYPE public\.(content_type_enum|language_enum|script_enum|content_status_enum)"
Viewed schema.sql:1960-1980
Viewed schema.sql:1946-1964
Created knowledge_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **Knowledge Domain** based on your existing `public` schema.

You can review the full schema definition and architectural decisions here: [knowledge_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/knowledge_schema_design.md).

### Key Architectural Highlights:
1. **The `ltree` Spine:** The `nodes` table maintains the `ltree` path implementation. This ensures rapid hierarchical traversal (e.g., retrieving an entire chapter's verses instantly). A critical migration note: the schema must explicitly reference `public.ltree` if the extension is installed globally.
2. **Polymorphic Content Structure:** The `texts` table acts as the polymorphic container for all readable data (Mula, Translations, Purports) via the `content_type_enum`. This structure allows the UI to swap between different languages or commentaries dynamically without altering the ontology graph.
3. **Standalone Purity (Zero Outbound Dependencies):** This schema represents historical and absolute truth. I have specifically decoupled it from user progress, student analytics, or active community discussions. Operational systems must point *inward* to the Knowledge schema.
4. **AI Vector Segregation:** I strongly advise excluding `text_embeddings` (for Vector AI search) from this schema. Vector arrays bloat relational databases significantly. AI embeddings should belong to an independent `discovery` or `analytics` schema that maps back to the `texts` IDs here.
5. **Taxonomy & Graphing:** The `tags`, `node_tags`, and `node_relations` tables provide the complete semantic graph for lateral cross-referencing across different Shastras.

As requested, this report focuses purely on design, structure, and boundaries without altering any code. Please review the proposal. If this design meets your architectural standard, we can proceed to generate the raw DDL implementation script for this schema (similar to what we did for the Identity domain).


Edited knowledge-schema-design.md
Viewed knowledge-schema-design.md:26-72
Created knowledge_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Knowledge Domain**.

You can review the complete schema definition (DDL) here: [knowledge_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/knowledge_schema_implementation.md).

### Design Summary:
1. **Isolated Schema Context:** All definitions exist securely within the `CREATE SCHEMA IF NOT EXISTS knowledge` block.
2. **Explicit `ltree` Resolution:** The `CREATE EXTENSION IF NOT EXISTS ltree SCHEMA public;` line ensures the system recognizes where the extension lives, and the `nodes.path` column strictly uses `public.ltree` to prevent resolution errors across schemas.
3. **Strict Domain Typings:** All content-related enums (e.g., `content_type_enum`, `language_enum`, `script_enum`) have been localized natively within the schema. I also applied the patch to add the missing `vivarana` and `shabdartha` values.
4. **Structural & Content Separation:** The structure is perfectly normalized. `shastras` holds the collection, `nodes` holds the ontology spine, and `texts` securely holds the polymorphic content payload.
5. **Architectural Purity Maintained:** Just as in the Identity schema, there are absolutely **zero outbound foreign keys** to any operational table. The `sources` table ensures historical commentators and authors are correctly decoupled from your modern `users` system.

This DDL serves as the pristine target-state representation of the Knowledge Domain, ensuring a highly scalable foundation for all your scriptural texts. Let me know if you would like any modifications to this structure.