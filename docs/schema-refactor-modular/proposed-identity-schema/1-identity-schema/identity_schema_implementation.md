Based on the report titled "Production-Grade Schema Design: Identity Domain (identity)", design the complete PostgreSQL identity schema.

Requirements
Define the full schema including:
All tables
All enums
Relationships (foreign keys, constraints)
Ensure the design is:
Production-grade
Scalable
Clearly structured
Output Expectations
Provide a complete and coherent schema design for the identity domain
Include:
Table definitions with key fields
Enum definitions
Relationships and constraints
Constraints
Do NOT modify application code
Do NOT include migration scripts
Focus strictly on schema design
Goal

Produce a final, implementation-ready PostgreSQL schema for the identity domain based on the given report.


=========================== 


# Implementation-Ready Schema: Identity Domain (`identity`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the newly isolated `identity` schema. 

As per the architectural constraints, this schema defines the **Anchor Domain** and contains zero outbound foreign keys. The `subscription_tier_id` has been intentionally omitted from `spiritual_profiles` to maintain domain purity.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Identity
CREATE SCHEMA IF NOT EXISTS identity;
```

---

## 2. Enum Definitions

These custom PostgreSQL types establish strict typing at the database layer.

```sql
-- Role and Access Enums
CREATE TYPE identity.user_role_enum AS ENUM (
    'student',
    'mentor',
    'teacher',
    'coordinator',
    'admin',
    'donor',
    'director',
    'village_member',
    'city_member',
    'outreach_lead',
    'volunteer',
    'staff'
);

CREATE TYPE identity.user_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED',
    'DELETED',
    'ANONYMIZED'
);

-- Demographic Enums
CREATE TYPE identity.gender_enum AS ENUM (
    'male',
    'female'
);

-- Spiritual & Psychometric Enums
CREATE TYPE identity.age_group_enum AS ENUM (
    'child',
    'teen',
    'young_adult',
    'adult',
    'senior'
);

CREATE TYPE identity.life_stage_enum AS ENUM (
    'student',
    'unmarried',
    'married',
    'parent',
    'vanaprastha',
    'renunciate'
);

CREATE TYPE identity.purushartha_enum AS ENUM (
    'dharma',
    'artha',
    'kama',
    'moksha'
);

CREATE TYPE identity.inner_state_enum AS ENUM (
    'confused',
    'seeking',
    'stable',
    'disturbed',
    'detached'
);

CREATE TYPE identity.svabhava_enum AS ENUM (
    'intellectual',
    'administrative',
    'creative',
    'practical'
);
```

---

## 3. Core Table: `users`

The central authentication and authorization record.

```sql
CREATE TABLE identity.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    password text, -- Nullable to support OAuth flows
    
    -- Status & Roles
    is_online boolean DEFAULT true,
    email_verified timestamp(3) without time zone,
    roles identity.user_role_enum[] DEFAULT ARRAY['student'::identity.user_role_enum],
    status identity.user_status_enum DEFAULT 'ACTIVE'::identity.user_status_enum NOT NULL,
    
    -- Security & Lockout
    failed_login_attempts integer DEFAULT 0,
    account_locked_until timestamp(3) without time zone,
    
    -- Authentication Flows
    verification_token text,
    reset_token text,
    reset_token_expires timestamp(3) without time zone,
    
    -- Compliance & Deletion (GDPR)
    deleted_at timestamp(3) without time zone,
    is_anonymized boolean DEFAULT false,
    anonymized_at timestamp(3) without time zone,
    
    -- Auditing
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_active timestamp(3) without time zone
);

-- Indexes for frequent auth queries
CREATE INDEX idx_users_email ON identity.users(email);
CREATE INDEX idx_users_status ON identity.users(status);
```

---

## 4. Vertical Partitioning: Extension Tables

These tables establish a strict 1:1 relationship with `users` utilizing `user_id` as the Primary Key and Foreign Key to prevent `JOIN` bloat.

### 4.1. `user_profiles`
```sql
CREATE TABLE identity.user_profiles (
    user_id uuid NOT NULL PRIMARY KEY REFERENCES identity.users(id) ON DELETE CASCADE,
    
    full_name text,
    phone_number text,
    whatsapp_number text,
    avatar_url text,
    
    gender identity.gender_enum,
    date_of_birth timestamp(3) without time zone,
    
    village text,
    city text,
    state text,
    pin_code text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.2. `spiritual_profiles`
```sql
CREATE TABLE identity.spiritual_profiles (
    user_id uuid NOT NULL PRIMARY KEY REFERENCES identity.users(id) ON DELETE CASCADE,
    
    age_group identity.age_group_enum,
    life_stage identity.life_stage_enum,
    eligibility_level integer DEFAULT 1 NOT NULL,
    primary_focus identity.purushartha_enum,
    inner_state identity.inner_state_enum,
    nature identity.svabhava_enum,
    
    -- Note: subscription_tier_id is EXCLUDED to maintain domain isolation.
    -- Subscriptions belong in the 'institution' schema.
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.3. `user_preferences`
```sql
CREATE TABLE identity.user_preferences (
    user_id uuid NOT NULL PRIMARY KEY REFERENCES identity.users(id) ON DELETE CASCADE,
    
    -- Using JSONB for flexible, non-relational settings
    notification_prefs jsonb DEFAULT '{"sms": false, "email": true, "whatsapp": false}'::jsonb,
    metadata jsonb DEFAULT '{}'::jsonb,
    notes text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.4. `user_statistics`
```sql
CREATE TABLE identity.user_statistics (
    user_id uuid NOT NULL PRIMARY KEY REFERENCES identity.users(id) ON DELETE CASCADE,
    
    -- Cached/Aggregated metrics
    nodes_read_count integer DEFAULT 0,
    courses_completed integer DEFAULT 0,
    contribution_points integer DEFAULT 0,
    
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Summary of Key Decisions
*   **Enums Relocated:** All enums necessary for identity evaluation have been localized into the `identity` schema.
*   **Zero Outbound Keys:** No table in this design references any external schema. 
*   **Cascading Deletes:** Applying `ON DELETE CASCADE` ensures that if an identity is legally requested to be purged from `users`, all corresponding PII inside the 1:1 profile tables is instantly and automatically destroyed at the database level.
