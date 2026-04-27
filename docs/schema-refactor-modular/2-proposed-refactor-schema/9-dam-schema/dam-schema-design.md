# Production-Grade Schema Design: Media & DAM Domain (`dam`)

This document outlines the architectural design for the `dam` PostgreSQL schema. This domain acts as the **Media & Asset Engine** of the Vedic Skills Institute, governing all digital content from shastra scans to educational videos and administrative documents.

---

## 1. Schema Overview

The `dam` schema centralizes the management of all digital files. It decouples the physical storage (where the file lives) from its metadata and usage (how it's described and where it's used).

**Core Architectural Rule:** The DAM domain is the single source of truth for file pointers. Other domains (Knowledge, Education, Institution) must reference `dam.assets(id)` rather than storing direct S3 URLs or local paths. This allows for centralized asset lifecycle management, such as automated compression, CDN purging, and global access control.

---

## 2. Table-by-Table Definition

### 2.1. Assets & Versions
*   **`assets` (Rename of `file_assets`)**: The primary record for a logical asset.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `title`, `description`, `type` (`asset_type_enum`), `category` (`file_category_enum`), `visibility` (`visibility_enum`).
    *   **Relationships:** 
        *   **Cross-Domain FK:** `uploaded_by_id` ➔ `identity.users(id)`.
        *   **Cross-Domain FK:** `org_id` ➔ `institution.organizations(id)`.
*   **`asset_files` (New)**: Stores the actual file pointers. Supports multiple versions (original, thumbnail, mobile-optimized).
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `asset_id` (FK), `version_name` (e.g., 'original', 'thumb'), `storage_provider` (`storage_provider_enum`), `object_key`, `file_url`, `mime_type`, `file_size`, `checksum`, `is_primary`.

### 2.2. Metadata & Categorization
*   **`asset_metadata` (New)**: Extensible metadata for assets (e.g., EXIF for images, duration for videos).
    *   **Primary Key:** `asset_id` (FK)
    *   **Key Fields:** `metadata` (JSONB), `extracted_at`.
*   **`tags`**: Reusable tags for asset organization.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `name` (Unique).
*   **`asset_tags_join`**: Join table for assets and tags.
    *   **Primary Key:** `(asset_id, tag_id)`

### 2.3. Usage Tracking
*   **`asset_usage` (New)**: Tracks exactly where an asset is referenced across the platform.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `asset_id` (FK), `usage_type` (e.g., 'COURSE_BANNER', 'SHASTRA_SCAN'), `entity_id` (UUID - Polymorphic reference).

---

## 3. Mapping from Existing Schema (`public` ➔ `dam`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `file_assets` | **SPLIT** | Split into `dam.assets` (metadata/ownership) and `dam.asset_files` (physical storage pointers). |
| `storage_provider_enum` | **MOVE** | Migrate to `dam`. |
| `file_category_enum` | **MOVE** | Migrate to `dam`. |
| *(None)* | **CREATE** | Create `asset_metadata`, `asset_usage`, and `tags` to support advanced management. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions establish the business rules for media:

1.  **`asset_type_enum` (New)**: (`IMAGE`, `VIDEO`, `AUDIO`, `DOCUMENT`, `ARCHIVE`).
2.  **`visibility_enum` (New)**: (`PUBLIC`, `PRIVATE`, `INTERNAL`).
3.  **`processing_status_enum` (New)**: (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`). Used for background transformations.
4.  **`storage_provider_enum` (Existing)**: (`S3`, `R2`, `GCS`, `LOCAL`).
5.  **`file_category_enum` (Existing)**: (`RECEIPT`, `INVOICE`, `MEDIA`, `DOCUMENT`, `AVATAR`, `SHASTRA_SCAN`).

---

## 5. Boundaries & Separation

### What Strictly Belongs
File metadata, storage path resolution, versioning (thumbnails/transcoding), and usage analytics.

### What Must Be Excluded (The "Leaky Abstractions")
*   **Actual File Binary:** Files are stored in external object storage (S3/R2). The database only holds pointers.
*   **Business Logic tied to Files:** While DAM tracks that a file is a `RECEIPT`, the logic for validating that receipt belongs in `institution.finance`.
*   **Social Context:** Comments on a media asset belong in `community`.

---

## 6. Migration Awareness (Design-Level)

*   **Atomic Split:** The existing `file_assets` table is monolithic. During migration, each row will generate one `assets` record and one `asset_files` record (marked as `is_primary`).
*   **URL Stability:** The `access_url` field will be maintained in `asset_files` to ensure existing frontend components can continue to render media without immediate API changes.

> [!IMPORTANT]  
> **Review Requested:** Please review the split of `file_assets` into `assets` and `asset_files`. This structure allows us to support multiple versions of a single asset (e.g., a high-res Shastra scan and its optimized web-view version) under a single ID. Does this multi-versioning approach meet your requirements?



Edited search-schema-design.md
Edited search-schema-implementation.md
Edited prompt-1.md
Viewed prompt-1.md:49-95
Searched for "CREATE TABLE public\.(file[a-z_]*|asset[a-z_]*|media[a-z_]*)"
Viewed schema.sql:1211-1230
Searched for "CREATE TYPE public\.(storage_provider_enum|file_category_enum)"
Viewed schema.sql:319-325
Viewed schema.sql:609-615
Created dam_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **Media & Digital Asset Management (DAM) Domain**.

You can review the full schema definition and architectural decisions here: [dam_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/dam_schema_design.md).

### Key Architectural Highlights:
1. **The Core Split:** I have proposed splitting the monolithic `file_assets` table into two: `assets` (logical metadata/ownership) and `asset_files` (physical storage pointers). This allows a single asset (like a Vedic Manuscript scan) to have multiple versions (Original, Web-Optimized, Thumbnail) while maintaining a single ID for the rest of the system.
2. **Usage Tracking:** A new `asset_usage` table allows us to track exactly where an asset is referenced (e.g., a Course Banner, a Verse Illustration, or a User Avatar). This is critical for preventing "orphan" files and managing global asset updates.
3. **Storage Provider Flexibility:** By keeping the `storage_provider_enum` and `object_key` at the file level, the system can seamlessly transition between providers (e.g., migrating from S3 to R2 or GCS) or even host different versions of the same asset on different providers for cost/performance optimization.
4. **Virtual Schema Boundaries:** As with other domains, references to `identity.users` and `institution.organizations` are maintained via UUID pointers without rigid foreign key constraints, ensuring that high-volume asset indexing doesn't impact core transactional performance.

As requested, this report focuses purely on design, structure, and boundaries. Please review the **Asset/File split** proposal—this is the most significant structural change from the current monolithic `public` table. If this design meets your requirements, we can proceed to generate the raw DDL implementation script for this schema.



Edited dam-schema-design.md
Viewed prompt-2.md:1-29
Edited prompt-2.md
Created dam_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Media & Digital Asset Management (DAM) Domain**.

You can review the complete schema definition (DDL) here: [dam_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/dam_schema_implementation.md).

### Design Summary:
1. **Multi-Version Lifecycle:** The split between `assets` and `asset_files` enables professional media workflows. You can now store an original "source" file alongside multiple "renditions" (thumbnails, mobile-optimized versions, or transcoded video) under a single logical asset ID.
2. **Usage Intelligence:** The `asset_usage` table provides the foundation for referential integrity across the monorepo. It tracks which courses, verses, or community posts are utilizing a specific asset, preventing accidental deletions of active media.
3. **AI-Ready Metadata:** The `asset_metadata` table uses a `JSONB` structure designed specifically for ingestion from AI processing pipelines. It can store OCR results from Shastra scans, auto-generated tags, and technical EXIF data without requiring schema changes.
4. **Cloud-Agnostic Storage:** Individual file versions can be distributed across different providers (S3, R2, GCS, or Local) via the `storage_provider_enum`, allowing you to optimize for cost (storing originals in cold storage) and performance (storing renditions on a CDN-integrated provider).

This concludes the architectural planning and schema generation for the **Media & DAM Domain**.

We have now finalized the schema designs for **all nine identified domains**:
1. **Identity**
2. **Knowledge**
3. **Institution**
4. **Education**
5. **Interactions**
6. **Community**
7. **System**
8. **Search & AI**
9. **Media & DAM**

Would you like me to prepare a **Master Architectural Consolidation Report** that summarizes the entire new multi-schema universe and provides the **Phase-by-Phase Migration Strategy** to move the current 4,000-line `public` schema into this modular future?