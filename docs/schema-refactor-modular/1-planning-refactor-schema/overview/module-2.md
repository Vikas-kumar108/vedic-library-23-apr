Now that we have completed the roadmap and architectural guidance for the first domain, I want to proceed to the next module in the same structured manner.

Important Constraint

🚫 Do NOT:

Take any action
Suggest code changes
Initiate implementation

✅ Only:

Provide strategy, roadmap, and architectural guidance
Focus Area

👉 Proceed with the next domain/module in sequence (as per your recommended roadmap).

What I Need From You

Please follow the same depth and structure as the previous domain:

1. High-Level Roadmap (Conceptual Only)
How should this domain be approached for refactoring?
What is the ideal sequence of steps (conceptual, not executable)?
2. Schema Design Thinking
What should be the conceptual structure of this domain’s schema?
What types of tables and entities belong here?
3. Boundaries & Separation
What should strictly belong to this domain?
What should be excluded (even if currently present in public)?
4. Dependencies & Interactions
How this domain connects with:
Identity (User/Auth)
Other modules
Direction of dependencies (who depends on whom)
5. Risks & Design Pitfalls
Common architectural mistakes
Overlaps or duplication risks
Things to avoid
Goal
Maintain consistency across all domain designs
Build a clear, modular architecture step-by-step
Ensure no confusion before execution begins

==========================================================


# Architectural Strategy: Domain 2 - Library / Knowledge Layer

This document provides architectural guidance and roadmap planning for transitioning the **Library / Knowledge Layer** into its own dedicated PostgreSQL schema. No code changes will occur until this strategy is approved.

---

## 1. High-Level Roadmap (Conceptual Sequence)

The Knowledge layer is the "Crown Jewel" of the Vedic Skills Institute. It houses the canonical scriptures and commentaries. It should be refactored immediately after the Identity schema.

1.  **Resolve Existing Enum Disconnects:** Before moving anything, update the `content_type_enum` to include the missing `'vivarana'` and `'shabdartha'` values. Attempting to migrate an incomplete structure will permanently codify the error.
2.  **Define Bounded Context:** Isolate the canonical, immutable Shastra from dynamic user interaction (e.g., separating `nodes` from `learning_curve_steps`).
3.  **Database-Level Migration:** Create the `knowledge` schema. Issue `ALTER TABLE ... SET SCHEMA` for all core library tables and their corresponding `TYPE ... AS ENUM`s.
4.  **Extension Accessibility Check:** Ensure that PostgreSQL extensions utilized by this schema (specifically `ltree` for hierarchical tree traversal) are installed in an accessible schema (usually `public`) and that the database `search_path` allows the `knowledge` schema to seamlessly utilize `ltree` operators without manual schema-prefixing.
5.  **ORM Mapping:** Tag the models with `@@schema("knowledge")` in Prisma and regenerate the client.

---

## 2. Schema Design Thinking

The Knowledge schema represents the **Ontological Truth**. It must be designed as an immutable graph of scripture. It answers: *What is the structure of the Veda?* and *What are the translations and commentaries associated with a specific verse?*

*   **The Hierarchy Engine (`nodes`, `shastras`):** The `nodes` table uses the `ltree` path to represent the infinite depth of scriptures (e.g., `gita.chapter_1.verse_1`). This structure must remain extremely lean, acting only as the structural skeleton.
*   **The Content Engine (`texts`, `synonyms`):** These tables are polymorphic attachments to `nodes`. A single node (Verse) will have dozens of `texts` associated with it (Mula, Anuvada, Bhashya) across multiple languages (`language_enum`) and scripts (`script_enum`).
*   **The Taxonomy & Graph Engine (`tags`, `node_tags`, `node_relations`):** Provides topical classification (e.g., tagging a verse with "Karma Yoga") and lateral relationships (e.g., "This Gita verse is related to this Upanishad mantra").
*   **Versioning (`library_versions`, `text_versions`):** Essential for an academic institution. Tracks historical edits to the canonical translations.

---

## 3. Boundaries & Separation

The Knowledge schema must remain completely pristine and academic. It should never track user behavior or gamification.

### What STRICTLY Belongs Here:
*   `shastras`
*   `nodes`
*   `texts` (and `text_versions`, `text_metadata`)
*   `sources` (Authors of commentaries, e.g., "Srila Prabhupada", "Ramanujacharya")
*   `node_relations`
*   `tags` and `node_tags`
*   `synonyms`
*   `library_items` and `library_versions`
*   **Enums:** `content_type_enum`, `content_status_enum`, `librarytype`, `script_enum`, `language_enum`.

### What Must Be STRICTLY EXCLUDED:
*   🚫 `text_embeddings`: Belongs to the **Search / AI Discovery** schema. While it relates 1-to-1 with `texts`, vector math and AI search models represent a different bounded context (compute/indexing vs. canonical storage).
*   🚫 `learning_curve_steps`: Belongs to the **Education** schema. Syllabuses are curated paths *through* knowledge, not the knowledge itself.
*   🚫 `library_downloads`: Belongs to the **Media / DAM** schema (or Identity tracking). It tracks *behavior*, not *truth*.
*   🚫 `spiritual_vows` or `user_notes` (if any exist): Must never be attached directly to `nodes`. These belong in Education or Community.

---

## 4. Dependencies & Interaction

The Knowledge layer is a **Core Independent Domain**.

*   **Direction of Dependency:** Like Identity, the flow of dependency is largely **inbound**.
*   **Inbound Dependencies:**
    *   **Education:** `learning_curve_steps` point to `knowledge.nodes.id`.
    *   **AI Discovery:** `text_embeddings` point to `knowledge.texts.id`.
    *   **Communications:** `communication_logs` (broadcasts) point to `knowledge.library_items.id`.
*   **Outbound Dependencies (Near Zero):** The canonical texts (`shastras`, `nodes`, `texts`) should have virtually no outbound foreign keys. The only exception might be an `uploaded_by` or `approved_by` column pointing to `identity.users` for moderation purposes, but the core scriptural entities themselves do not conceptually depend on system users.

---

## 5. Risks & Design Pitfalls

When architecting a Knowledge Graph in PostgreSQL, avoid these common mistakes:

1.  **The Extension Trap (PostgreSQL `ltree`):** If the `ltree` extension is installed in the `public` schema, and you move the `nodes` table to the `knowledge` schema, querying `path <@ 'gita.chapter_1'` might fail with an "operator does not exist" error unless your database's `search_path` explicitly includes `public, knowledge`. This is the #1 cause of downtime during multi-schema migrations involving custom types.
2.  **Polluting the Node:** The temptation to add fields like `view_count`, `difficulty_level`, or `is_bookmarked` directly onto the `nodes` table. This violates the boundary. Read states belong in the Identity or Education schemas.
3.  **Cross-Schema `JOIN` Performance Fear:** Developers often worry that joining `education.learning_curve_steps` with `knowledge.nodes` across schemas will incur a performance penalty. In Postgres, **schema boundaries are logical namespaces, not physical divisions**. There is absolutely zero performance penalty for cross-schema JOINs. Do not duplicate data just to avoid a cross-schema foreign key.
4.  **Incomplete Enum Migration:** As noted, if `content_type_enum` is moved to the `knowledge` schema but remains unpatched (missing `vivarana`), the UI's translation pipeline will remain permanently broken at the database level.

> [!IMPORTANT]  
> **User Review Required:** Do you approve of this strategy, the strict exclusion of AI Embeddings and behavioral tracking, and the handling of the `ltree` extension risk for the Knowledge Layer? If approved, I will proceed to **Domain 3: Institution-Level Systems**.
