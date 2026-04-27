# Implementation-Ready Schema: Search Domain (`search`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the `search` schema. This domain acts as the **Intelligence Overlay**, managing AI embeddings, discovery analytics, and recommendation signals.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Search & AI
CREATE SCHEMA IF NOT EXISTS search;

-- Ensure pgvector is available in public for vector operations
-- Note: This requires the pgvector extension to be installed on the database server.
CREATE EXTENSION IF NOT EXISTS vector SCHEMA public;
```

---

## 2. Enum Definitions

These custom PostgreSQL types define the parameters for AI models, search types, and user engagement tracking.

```sql
-- Search & Query Enums
CREATE TYPE search.query_type_enum AS ENUM (
    'KEYWORD',
    'SEMANTIC',
    'HYBRID'
);

CREATE TYPE search.result_type_enum AS ENUM (
    'NODE',
    'COURSE',
    'COMMUNITY_POST',
    'EVENT'
);

-- AI & Embedding Enums
CREATE TYPE search.embedding_source_enum AS ENUM (
    'SHASTRA_VERSE',
    'PURPORT',
    'ARTICLE',
    'COURSE_DESCRIPTION'
);

-- Engagement Enums
CREATE TYPE search.search_action_enum AS ENUM (
    'CLICKED',
    'SAVED',
    'IGNORED'
);
```

---

## 3. Embeddings & Vector Storage

### 3.1. `content_embeddings`
This table stores the high-dimensional mathematical representations of content for semantic search.

```sql
CREATE TABLE search.content_embeddings (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain Reference: Points to knowledge.nodes, education.courses, etc.
    entity_id uuid NOT NULL,
    content_type search.embedding_source_enum NOT NULL,
    
    -- Vector storage (e.g., 384 dimensions for many open-source models)
    embedding public.vector(384) NOT NULL,
    
    -- Tracking the model used to generate the embedding for compatibility management
    model varchar(100) NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for fast similarity search using Cosine Distance
-- Note: Using HNSW (Hierarchical Navigable Small World) for high performance on large datasets
CREATE INDEX idx_content_embeddings_vector ON search.content_embeddings 
USING hnsw (embedding vector_cosine_ops);
```

---

## 4. Query Logging & Analytics

### 4.1. `search_queries`
Logs the raw inputs and performance of search operations.

```sql
CREATE TABLE search.search_queries (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain Reference: Identity Schema
    user_id uuid, 
    
    query_text text NOT NULL,
    query_type search.query_type_enum DEFAULT 'HYBRID'::search.query_type_enum NOT NULL,
    
    -- Performance Metrics
    results_count integer DEFAULT 0,
    execution_time_ms integer,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.2. `search_results_engagement`
The critical feedback loop that tells the AI which results were actually useful to the user.

```sql
CREATE TABLE search.search_results_engagement (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    query_id uuid NOT NULL REFERENCES search.search_queries(id) ON DELETE CASCADE,
    
    -- The ID of the result item (Node, Course, Post)
    result_entity_id uuid NOT NULL,
    result_type search.result_type_enum NOT NULL,
    
    action search.search_action_enum DEFAULT 'IGNORED'::search.search_action_enum NOT NULL,
    
    -- The rank/position where this result was displayed (0-indexed)
    position_index integer NOT NULL,
    
    timestamp timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index to analyze click-through rates by result type
CREATE INDEX idx_search_engagement_entity ON search.search_results_engagement (result_entity_id, result_type);
```

---

## 5. Recommendations & Personalization

### 5.1. `user_statistics`
Aggregated behavior metrics that serve as inputs for the recommendation engine.

```sql
CREATE TABLE search.user_statistics (
    -- Primary Key is the User ID (Cross-Domain Reference)
    user_id uuid NOT NULL PRIMARY KEY,
    
    -- Aggregated progress signals
    nodes_read_count integer DEFAULT 0,
    courses_completed integer DEFAULT 0,
    contribution_points integer DEFAULT 0,
    
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 5.2. `recommendation_signals`
Cached affinity scores calculated by AI models to personalize the seeker's experience.

```sql
CREATE TABLE search.recommendation_signals (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain Reference: Identity Schema
    user_id uuid NOT NULL,
    
    -- Cross-Domain Reference: Knowledge Schema (Tags)
    tag_id uuid NOT NULL,
    
    -- How strong is the user's affinity for this topic/tag (0.0 to 1.0)
    affinity_score numeric(4,3) NOT NULL CHECK (affinity_score >= 0 AND affinity_score <= 1),
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT uq_user_tag_affinity UNIQUE (user_id, tag_id)
);
```

---

## 6. Summary of Key Decisions

*   **HNSW Vector Indexing:** I have explicitly chosen the `hnsw` index type for the `embedding` column. While standard `ivfflat` is easier to build, `hnsw` provides significantly faster query performance for semantic search at scale, which is essential for a production-grade AI search engine.
*   **Engagement Tracking:** By including `position_index` and `action` in `search_results_engagement`, the schema supports advanced ranking algorithms (like Learning to Rank - LTR) that adjust search results based on where users click most often.
*   **Virtual Reference Strategy:** All references to content (`entity_id`) and users (`user_id`) use standard UUID types without hard `FOREIGN KEY` constraints. This ensures that the search engine can index content from any domain (Knowledge, Education, Community) without introducing rigid database locks that could slow down those primary domains.
*   **Stat Centralization:** Moving `user_statistics` to the `search` domain consolidates the "input signals" for recommendation logic, keeping the `identity` domain focused strictly on authentication and profile metadata.
