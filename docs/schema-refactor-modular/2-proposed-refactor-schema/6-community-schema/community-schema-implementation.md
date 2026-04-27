# Implementation-Ready Schema: Community Domain (`community`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the newly isolated `community` schema. 

This schema serves as the **Social Engine**, governing Forums, Events, and Ancestral (Family) Graph structures. It completely relies on outward logical references to the `identity` schema for user records, keeping it scalable and modular.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Community
CREATE SCHEMA IF NOT EXISTS community;

-- Ensure ltree is available in public so we can use it for family trees
CREATE EXTENSION IF NOT EXISTS ltree SCHEMA public;
```

---

## 2. Enum Definitions

These custom PostgreSQL types establish strict states for social structures, events, and moderation.

```sql
-- Community Enums
CREATE TYPE community.community_type_enum AS ENUM (
    'REGIONAL',
    'STUDY_GROUP',
    'MENTOR_CIRCLE'
);

CREATE TYPE community.community_role_enum AS ENUM (
    'MEMBER',
    'MODERATOR',
    'ADMIN'
);

CREATE TYPE community.post_category_enum AS ENUM (
    'REALIZATION',
    'QUESTION',
    'ANNOUNCEMENT'
);

-- Engagement & Moderation Enums
CREATE TYPE community.reaction_type_enum AS ENUM (
    'LIKE',
    'HEART',
    'INSIGHTFUL'
);

CREATE TYPE community.report_reason_enum AS ENUM (
    'SPAM',
    'HARASSMENT',
    'INAPPROPRIATE',
    'OTHER'
);

CREATE TYPE community.report_status_enum AS ENUM (
    'PENDING',
    'REVIEWED',
    'DISMISSED',
    'ACTION_TAKEN'
);

-- Family & Events Enums
CREATE TYPE community.relationship_type_enum AS ENUM (
    'pitara',
    'matara',
    'vaivahika',
    'sahodara',
    'guru',
    'shishya'
);

CREATE TYPE community.event_type_enum AS ENUM (
    'LIVE_SATSANG',
    'WORKSHOP',
    'GROUP_MEDITATION'
);
```

---

## 3. Communities & Memberships

### 3.1. `communities`
```sql
CREATE TABLE community.communities (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    description text,
    
    type community.community_type_enum DEFAULT 'REGIONAL'::community.community_type_enum,
    is_private boolean DEFAULT false NOT NULL,
    
    -- Cross-Domain Reference to Identity Schema
    mentor_id uuid,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 3.2. `memberships`
```sql
CREATE TABLE community.memberships (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    community_id uuid NOT NULL REFERENCES community.communities(id) ON DELETE CASCADE,
    
    -- Cross-Domain Reference to Identity Schema
    user_id uuid NOT NULL,
    
    role community.community_role_enum DEFAULT 'MEMBER'::community.community_role_enum,
    joined_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT uq_community_membership UNIQUE (community_id, user_id)
);
```

---

## 4. Discussions & Engagement

### 4.1. `posts` (The Thread/Reply Engine)
```sql
CREATE TABLE community.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    community_id uuid NOT NULL REFERENCES community.communities(id) ON DELETE CASCADE,
    
    -- Recursive Foreign Key for infinite nesting (Adjacency List)
    parent_post_id uuid REFERENCES community.posts(id) ON DELETE CASCADE,
    
    -- Cross-Domain References
    author_id uuid NOT NULL, -- points to identity.users
    reference_node_id uuid,  -- points to knowledge.nodes (optional, for verse discussions)
    
    content text NOT NULL,
    category community.post_category_enum DEFAULT 'REALIZATION'::community.post_category_enum,
    is_pinned boolean DEFAULT false,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.2. `reactions` & `follows`
```sql
CREATE TABLE community.reactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    post_id uuid NOT NULL REFERENCES community.posts(id) ON DELETE CASCADE,
    
    -- Cross-Domain Reference
    user_id uuid NOT NULL,
    
    reaction_type community.reaction_type_enum DEFAULT 'LIKE'::community.reaction_type_enum,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Prevent duplicate reactions of the same type by the same user on the same post
    CONSTRAINT uq_post_user_reaction UNIQUE (post_id, user_id, reaction_type)
);

CREATE TABLE community.follows (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain Reference
    user_id uuid NOT NULL,
    
    target_id uuid NOT NULL,
    target_type text NOT NULL, -- 'COMMUNITY' or 'POST'
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT uq_user_follow UNIQUE (user_id, target_id, target_type)
);
```

---

## 5. Family & Genealogy Graph

### 5.1. `family_groups` & `family_nodes`
```sql
CREATE TABLE community.family_groups (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text,
    origin_place text,
    description text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community.family_nodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    family_group_id uuid REFERENCES community.family_groups(id) ON DELETE CASCADE,
    parent_id uuid REFERENCES community.family_nodes(id) ON DELETE CASCADE,
    
    -- Cross-Domain Reference
    user_id uuid, 
    
    path public.ltree,
    level integer,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for fast tree traversal operations
CREATE INDEX idx_family_nodes_path ON community.family_nodes USING gist (path);
```

### 5.2. `family_links`
```sql
CREATE TABLE community.family_links (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain References
    user_id uuid NOT NULL,
    related_id uuid NOT NULL,
    
    type community.relationship_type_enum NOT NULL,
    notes text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT uq_family_link UNIQUE (user_id, related_id, type)
);
```

---

## 6. Events & Gatherings

### 6.1. `events` & `event_registrations`
```sql
CREATE TABLE community.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    title text NOT NULL,
    description text,
    
    -- Cross-Domain Reference
    host_id uuid NOT NULL,
    
    start_time timestamp(3) without time zone NOT NULL,
    end_time timestamp(3) without time zone NOT NULL,
    type community.event_type_enum DEFAULT 'LIVE_SATSANG'::community.event_type_enum,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE community.event_registrations (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    event_id uuid NOT NULL REFERENCES community.events(id) ON DELETE CASCADE,
    
    -- Cross-Domain Reference
    user_id uuid NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT uq_event_registration UNIQUE (event_id, user_id)
);
```

---

## 7. Moderation

### 7.1. `moderation_reports`
```sql
CREATE TABLE community.moderation_reports (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    post_id uuid NOT NULL REFERENCES community.posts(id) ON DELETE CASCADE,
    
    -- Cross-Domain References
    reporter_id uuid NOT NULL,
    resolved_by_id uuid,
    
    reason community.report_reason_enum NOT NULL,
    status community.report_status_enum DEFAULT 'PENDING'::community.report_status_enum,
    notes text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 8. Summary of Key Decisions

*   **Ltree Safety:** The `family_nodes` table utilizes `public.ltree` successfully. By ensuring the `ltree` extension is created in `public`, both the `knowledge` schema and the `community` schema can use this extension without duplicating it or creating permission errors.
*   **Normalized Adjacency List:** The `posts` table replaces both threads and comments natively via the `parent_post_id` column.
*   **Decoupled Entities:** All dependencies on `identity` (like `author_id`, `user_id`, `host_id`, `mentor_id`) are standard UUID columns. The schema remains independent and devoid of rigid cross-schema `FOREIGN KEY` constraints, adhering to strict micro-schema boundaries.
