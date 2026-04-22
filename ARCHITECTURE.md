# Vedic Library Platform: Architectural Specification

## 1. Evolution of the System

### From Prototype to Professional Scale
The Vedic Library began as a monolithic prototype designed for rapid iteration. It utilized a hybrid SQLite/Prisma architecture with flat data structures and in-memory JSON processing.

**Key Problems in the Prototype:**
*   **Memory Exhaustion**: Loading massive scripture JSONs into memory during the build/dev process caused frequent system hangs.
*   **Structural Fragility**: A flat "Verse" table made it impossible to represent complex hierarchies like the *Kāmasūtra* (Adhikarana → Adhyāya → Prakarana).
*   **Tight Coupling**: The UI logic was inextricably linked to the database schema, making any architectural change a high-risk event.
*   **Data Redundancy**: Transliterations were stored as JSON blobs within rows, preventing granular indexing or script-specific search.

**The Current Monorepo Solution:**
The system was refactored into a **Normalized PostgreSQL 17 Monorepo**. This transition moved the "Brain" of the application into specialized packages and offloaded data processing to a dedicated background service, ensuring the user-facing portal remains fast and lightweight.

---

## 2. Current Architecture Overview

The system is organized as a **pnpm-workspace monorepo**, strictly following the "Single Responsibility Principle" (SRP) at the package level.

### System Layers:
1.  **Frontend Layer (`apps/web-portal`)**: A specialized Next.js environment focused entirely on the "Spiritual UX" and scripture rendering.
2.  **Domain Layer (`packages/*`)**: Deterministic logic that contains the "Rules of Scripture" (Transliteration, Search algorithms, Coordinate systems).
3.  **Ingestion Layer (`apps/ingestion-service`)**: A high-performance background service that processes raw scripture data into the professional schema.
4.  **Database Layer (`packages/data-access`)**: The unified interface for PostgreSQL, managing connections and schema migrations.

---

## 3. Responsibilities of Each Module

### `apps/web-portal` (The Interface)
*   **Responsibility**: Rendering the Knowledge Tree and Verse View.
*   **Constraint**: Must NOT perform raw database queries or complex Sanskrit parsing. It consumes pre-formatted data from the Domain layer.

### `apps/ingestion-service` (The Worker)
*   **Responsibility**: Atomic ingestion of JSON source data into the normalized Postgres schema.
*   **Features**: Handles UUID generation, `ltree` path construction, and FTS vector initialization.

### `packages/data-access` (The Foundation)
*   **Responsibility**: Database singleton management and Type safety.
*   **Features**: Exports the centralized Prisma client used by all other apps.

### `packages/text-engine` (The Grammar)
*   **Responsibility**: Mathematical Sanskrit logic.
*   **Features**: Transliteration (IAST/Devanagari), Reference formatting (e.g., "BG 1.1"), and Slug generation.

### `packages/search-domain` (The Intelligence)
*   **Responsibility**: Multi-dimensional retrieval.
*   **Features**: Ranked Full-Text Search (FTS) and (Future) Semantic similarity queries.

### `packages/dharma-core` (The Validator - Future)
*   **Responsibility**: Business rules and data integrity.
*   **Goal**: Ensure that a "Verse" in the library follows the canonical rules of its specific Shastra.

---

## 4. End-to-End Data Flow

### Ingestion Flow (Source to DB)
1.  **Raw Input**: JSON scripture files (e.g., *KS Prakaranas*) are read by the `ingestion-service`.
2.  **Decomposition**: The service splits the JSON into atomic `Node` (Hierarchy) and `Text` (Content) records.
3.  **Coordinate Mapping**: `text-engine` generates the deterministic slugs and canonical references.
4.  **DB Commit**: Data is committed via `data-access` using the Postgres `ltree` for hierarchy.
5.  **Indexing**: Database triggers automatically generate the `fts_vector` for instant searchability.

### Frontend Flow (User to Render)
1.  **Request**: User navigates to a verse UUID or slug.
2.  **API Call**: Next.js route handler calls the `data-access` package.
3.  **Assembly**: The API joins the `Node` with its related `Texts` (Sutra, Translation, Commentary).
4.  **Domain Processing**: `text-engine` formats the display references.
5.  **Render**: The "Spiritual UX" components display the assembled view model.

---

## 5. Design Philosophy

*   **Normalization First**: Content (Sanskrit, English) is never "nested" in JSON. Every segment is a discrete database row, allowing for future multi-language scaling.
*   **Infrastructure Isolation**: The `text-engine` is a pure-logic package with zero dependencies, allowing it to run in any environment (Server, Browser, or Mobile).
*   **Headless Capability**: By separating the Search and Text domains, the platform is ready to support headless clients beyond the web portal.

---

## 6. Current Limitations & Fragility

*   **Ingestion Validation**: The `ingestion-service` currently trusts the JSON input structure. A malformed JSON can lead to partial tree generation.
*   **UI-Logic Coupling**: Some components still handle their own data-formatting logic rather than delegating to hooks or the `text-engine`.
*   **Static Search Dictionary**: The FTS currently uses a standard 'english' dictionary, which is suboptimal for Sanskrit-heavy keyword matching.

---

## 7. Validation Strategy

### Current State:
*   Database-level constraints (Foreign keys, Unique slugs).
*   Prisma-level type safety.

### Required Future Implementations:
*   **Zod Schema Validation**: Every ingestion pipeline must validate its input against a strict Zod schema before hitting the database.
*   **Integrity Checks**: Automated scripts to verify that every `Shastra` has a complete `Root` node and sequential `order_index` values.

---

## 8. Frontend Refactor Strategy (Invisible Refactor)

To improve the frontend without changing the UX, we will implement the **"Logic-UI Divorce"**:
1.  **Extract Data Hooks**: Move all `api/verse` calling logic into a `useVerse()` hook.
2.  **ViewModel Pattern**: The hook will return a "Ready-to-Render" object, moving all formatting logic out of the `.tsx` components.
3.  **Quarantine Styling**: Tailwind and CSS files will be treated as read-only to preserve the established aesthetic.

---

## 9. Roadmap Ahead

1.  **Semantic Search**: Integrate `pgvector` and generate 384-dimensional embeddings for the entire corpus.
2.  **Validation System**: Implement a global `packages/validation` to ensure zero-error ingestion for the next 1,000 Shastras.
3.  **Admin System**: A dedicated `apps/admin-portal` for managing Shastra metadata and tracking ingestion status.
4.  **API Gateway**: Introduction of a standalone Gateway to support external mobile applications.
