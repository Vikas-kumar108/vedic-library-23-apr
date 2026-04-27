# Implementation-Ready Schema: Media & DAM Domain (`dam`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the `dam` schema. This domain acts as the **Media & Asset Engine**, providing a centralized repository for all digital content with support for multi-versioning and AI-assisted metadata extraction.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Media & Digital Asset Management
CREATE SCHEMA IF NOT EXISTS dam;
```

---

## 2. Enum Definitions

These custom PostgreSQL types establish strict controls over asset classification, storage, and processing lifecycles.

```sql
-- Asset Classification Enums
CREATE TYPE dam.asset_type_enum AS ENUM (
    'IMAGE',
    'VIDEO',
    'AUDIO',
    'DOCUMENT',
    'ARCHIVE'
);

CREATE TYPE dam.file_category_enum AS ENUM (
    'RECEIPT',
    'INVOICE',
    'MEDIA',
    'DOCUMENT',
    'AVATAR',
    'SHASTRA_SCAN'
);

-- Operational Enums
CREATE TYPE dam.storage_provider_enum AS ENUM (
    'S3',
    'R2',
    'GCS',
    'LOCAL'
);

CREATE TYPE dam.visibility_enum AS ENUM (
    'PUBLIC',
    'PRIVATE',
    'INTERNAL'
);

CREATE TYPE dam.processing_status_enum AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
);
```

---

## 3. Core Asset Tables

### 3.1. `assets`
The logical master record for a piece of media. This table tracks ownership and identity, regardless of the physical file version.

```sql
CREATE TABLE dam.assets (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain Reference: Identity Schema
    uploaded_by_id uuid,
    
    -- Cross-Domain Reference: Institution Schema (Optional)
    org_id uuid,
    
    title text NOT NULL,
    description text,
    
    type dam.asset_type_enum NOT NULL,
    category dam.file_category_enum NOT NULL,
    visibility dam.visibility_enum DEFAULT 'PRIVATE'::dam.visibility_enum NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 3.2. `asset_files`
Tracks the physical storage pointers. Supports multiple versions (e.g., Original vs. Optimized) for the same logical asset.

```sql
CREATE TABLE dam.asset_files (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    asset_id uuid NOT NULL REFERENCES dam.assets(id) ON DELETE CASCADE,
    
    version_name varchar(50) DEFAULT 'original' NOT NULL,
    is_primary boolean DEFAULT false NOT NULL,
    
    storage_provider dam.storage_provider_enum NOT NULL,
    object_key text NOT NULL,
    
    -- Direct access URLs (if applicable)
    file_url text NOT NULL,
    access_url text, -- For CDN or signed URLs
    
    mime_type text,
    file_size bigint,
    checksum text,
    
    processing_status dam.processing_status_enum DEFAULT 'COMPLETED'::dam.processing_status_enum,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Ensure only one primary version exists per asset
    CONSTRAINT uq_asset_primary_file UNIQUE (asset_id) WHERE (is_primary = true)
);

CREATE INDEX idx_asset_files_key ON dam.asset_files (object_key);
```

---

## 4. Metadata & Categorization

### 4.1. `asset_metadata`
Stores detailed, structured information extracted from the file (e.g., image dimensions, PDF page count, AI-generated captions).

```sql
CREATE TABLE dam.asset_metadata (
    asset_id uuid NOT NULL PRIMARY KEY REFERENCES dam.assets(id) ON DELETE CASCADE,
    
    -- Generic JSONB storage for extensibility
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    
    -- AI Intelligence flags
    is_ai_tagged boolean DEFAULT false,
    extracted_at timestamp(3) without time zone
);
```

### 4.2. `tags` & `asset_tags_join`
Standard tagging system for organizational hierarchy.

```sql
CREATE TABLE dam.tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE dam.asset_tags_join (
    asset_id uuid NOT NULL REFERENCES dam.assets(id) ON DELETE CASCADE,
    tag_id uuid NOT NULL REFERENCES dam.tags(id) ON DELETE CASCADE,
    
    PRIMARY KEY (asset_id, tag_id)
);
```

---

## 5. Usage Tracking

### 5.1. `asset_usage`
A polymorphic tracking table to identify every location where an asset is used across the system.

```sql
CREATE TABLE dam.asset_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    asset_id uuid NOT NULL REFERENCES dam.assets(id) ON DELETE CASCADE,
    
    -- Where is it used? (e.g., 'COURSE_BANNER', 'SHASTRA_ILLUSTRATION')
    usage_type varchar(50) NOT NULL,
    
    -- The ID of the entity using it (from Knowledge, Education, etc.)
    entity_id uuid NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for clean-up scripts (finding orphaned assets)
CREATE INDEX idx_asset_usage_lookup ON dam.asset_usage (asset_id, usage_type);
```

---

## 6. Summary of Key Decisions

*   **Version-Aware Architecture:** By separating `assets` and `asset_files`, the system can store an original 50MB TIFF scan of a manuscript alongside a 200KB web-optimized JPG and a 10KB thumbnail, all linked to the same logical `asset_id`.
*   **Storage Independence:** Individual file versions can reside on different storage backends (e.g., Original on AWS Glacier, Optimized on Cloudflare R2), as defined by the `storage_provider` field in `asset_files`.
*   **Usage Traceability:** The `asset_usage` table ensures that before an admin deletes an asset, the system can warn them if it's currently being used as a banner in an active course or an illustration in a Shastra verse.
*   **JSONB Metadata:** The `asset_metadata` table is designed to be populated by background AI pipelines (e.g., OCR, image recognition), allowing new metadata fields to be added without schema migrations.
