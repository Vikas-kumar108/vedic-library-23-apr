# Implementation-Ready Schema: Knowledge Domain (`knowledge`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the newly isolated `knowledge` schema. 

As per the architectural constraints, this schema acts as the **Immutable Product Core** and contains zero outbound foreign keys to operational schemas. It explicitly references `public.ltree` for the hierarchical path implementation.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Knowledge
CREATE SCHEMA IF NOT EXISTS knowledge;

-- Ensure ltree is available (typically installed in public)
CREATE EXTENSION IF NOT EXISTS ltree SCHEMA public;
```

---

## 2. Enum Definitions

These custom PostgreSQL types establish strict typing at the database layer.

```sql
-- Content Status
CREATE TYPE knowledge.content_status_enum AS ENUM (
    'DRAFT',
    'REVIEW',
    'ACTIVE',
    'ARCHIVED',
    'DELETED'
);

-- Content Types (Patched with vivarana and shabdartha)
CREATE TYPE knowledge.content_type_enum AS ENUM (
    'mula',
    'anvaya',
    'translation',
    'purport',
    'summary',
    'vivarana',
    'shabdartha'
);

-- Language Types
CREATE TYPE knowledge.language_enum AS ENUM (
    'sa', -- Sanskrit
    'en', -- English
    'hi', -- Hindi
    'bn', -- Bengali
    'ta', -- Tamil
    'or', -- Oriya
    'mr', -- Marathi
    'gu'  -- Gujarati
);

-- Script Types
CREATE TYPE knowledge.script_enum AS ENUM (
    'devanagari',
    'latin',
    'bengali',
    'tamil',
    'oriya'
);
```

---

## 3. Core Ontology Tables

### 3.1. `shastras` (The Root Collections)
```sql
CREATE TABLE knowledge.shastras (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    name text NOT NULL,
    structure_type text NOT NULL, -- e.g., 'CHAPTER_VERSE', 'CANTO_CHAPTER_VERSE'
    
    status knowledge.content_status_enum DEFAULT 'ACTIVE'::knowledge.content_status_enum NOT NULL,
    
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 3.2. `nodes` (The `ltree` Hierarchy)
```sql
CREATE TABLE knowledge.nodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    shastra_id uuid NOT NULL REFERENCES knowledge.shastras(id) ON DELETE CASCADE,
    parent_id uuid REFERENCES knowledge.nodes(id) ON DELETE CASCADE,
    
    level text NOT NULL, -- e.g., 'CANTO', 'CHAPTER', 'VERSE'
    slug text,
    order_index integer DEFAULT 0,
    canonical_ref text, -- e.g., 'BG 1.1'
    
    -- The powerful ltree path (e.g., 'shastraId.chapterId.verseId')
    path public.ltree,
    
    sensitivity integer DEFAULT 1,
    status knowledge.content_status_enum DEFAULT 'ACTIVE'::knowledge.content_status_enum NOT NULL,
    
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Crucial GiST index for rapid hierarchical tree querying
CREATE INDEX idx_nodes_path ON knowledge.nodes USING GIST (path);
CREATE INDEX idx_nodes_shastra ON knowledge.nodes(shastra_id);
```

---

## 4. Metadata & Content Tables

### 4.1. `sources` (Historical Registry)
```sql
CREATE TABLE knowledge.sources (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    role text, -- e.g., 'Author', 'Commentator', 'Translator'
    description text,
    year_approx integer,
    era text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.2. `texts` (Polymorphic Content)
```sql
CREATE TABLE knowledge.texts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    node_id uuid NOT NULL REFERENCES knowledge.nodes(id) ON DELETE CASCADE,
    source_id uuid REFERENCES knowledge.sources(id) ON DELETE SET NULL,
    
    content_type knowledge.content_type_enum NOT NULL,
    language knowledge.language_enum NOT NULL,
    script knowledge.script_enum NOT NULL,
    
    content text NOT NULL,
    is_primary boolean DEFAULT false,
    anchor_word text,
    segment_order integer,
    
    status knowledge.content_status_enum DEFAULT 'ACTIVE'::knowledge.content_status_enum NOT NULL,
    
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for retrieving specific text types quickly (e.g., fetching only translations)
CREATE INDEX idx_texts_node_type ON knowledge.texts(node_id, content_type);
```

### 4.3. `synonyms` (Word-by-Word Analysis)
```sql
CREATE TABLE knowledge.synonyms (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    text_id uuid NOT NULL REFERENCES knowledge.texts(id) ON DELETE CASCADE,
    
    word text NOT NULL,
    meaning text,
    language knowledge.language_enum,
    order_index integer,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 5. Taxonomy & Cross-Referencing

### 5.1. `tags` (Global Dictionary)
```sql
CREATE TABLE knowledge.tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    parent_id uuid REFERENCES knowledge.tags(id) ON DELETE CASCADE,
    
    slug text NOT NULL UNIQUE,
    name text,
    description text,
    keywords text[],
    type text,
    sanskrit_name text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 5.2. `node_tags` (Tag Mapping)
```sql
CREATE TABLE knowledge.node_tags (
    node_id uuid NOT NULL REFERENCES knowledge.nodes(id) ON DELETE CASCADE,
    tag_id uuid NOT NULL REFERENCES knowledge.tags(id) ON DELETE CASCADE,
    
    PRIMARY KEY (node_id, tag_id)
);
```

### 5.3. `node_relations` (Knowledge Graph)
```sql
CREATE TABLE knowledge.node_relations (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    from_node_id uuid NOT NULL REFERENCES knowledge.nodes(id) ON DELETE CASCADE,
    to_node_id uuid NOT NULL REFERENCES knowledge.nodes(id) ON DELETE CASCADE,
    
    relation_type text, -- e.g., 'REFERENCES', 'EXPANDS_UPON'
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Prevent self-referencing loops at the DB level
    CONSTRAINT check_no_self_relation CHECK (from_node_id != to_node_id)
);
```

---

## 6. Summary of Key Decisions
*   **Explicit `public.ltree` Reference:** Ensures that the GiST index and `path` column will correctly resolve the extension type regardless of Postgres user search path setups.
*   **Decoupled Sources:** The `sources` table handles authors and commentators without referencing `identity.users`, maintaining the standalone purity of historical truth.
*   **Cascading Graph Integrity:** Aggressive `ON DELETE CASCADE` usage on the `nodes` hierarchy ensures that if a chapter is deleted, all its verses, texts, synonyms, and tags are correctly purged, preventing orphan data.
