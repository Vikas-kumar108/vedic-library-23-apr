# Implementation-Ready Schema: System Domain (`system`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the newly isolated `system` schema. 

This schema serves as the **Infrastructure Control Plane**, managing audit logs, feature flags, global settings, background jobs, and webhook receipts. It is strictly separated from business domains to ensure scalability of high-volume event data.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for System infrastructure
CREATE SCHEMA IF NOT EXISTS system;
```

---

## 2. Enum Definitions

These custom PostgreSQL types define the strict operational states for system processes.

```sql
-- Auditing & Features Enums
CREATE TYPE system.audit_action_enum AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE',
    'LOGIN',
    'EXPORT'
);

CREATE TYPE system.feature_flag_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'ROLLING_OUT'
);

-- Background Processing & Integrations Enums
CREATE TYPE system.job_status_enum AS ENUM (
    'PENDING',
    'RUNNING',
    'COMPLETED',
    'FAILED',
    'RETRYING'
);

CREATE TYPE system.webhook_status_enum AS ENUM (
    'PENDING',
    'PROCESSED',
    'FAILED'
);

CREATE TYPE system.integration_service_enum AS ENUM (
    'S3',
    'R2',
    'TWILIO',
    'SENDGRID',
    'RAZORPAY',
    'STRIPE',
    'GITA_API',
    'TRANSLATION_ENGINE'
);
```

---

## 3. Audit & Observability Subdomain

### 3.1. `audit_logs`
```sql
CREATE TABLE system.audit_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    table_name text NOT NULL,
    record_id uuid, -- The ID of the record being mutated
    
    action system.audit_action_enum NOT NULL,
    
    -- Cross-Domain Reference: Identity Schema
    performed_by_id uuid NOT NULL, 
    
    old_data jsonb,
    new_data jsonb,
    
    ip_address text,
    device_info text,
    
    timestamp timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for efficient querying of entity history
CREATE INDEX idx_audit_logs_record ON system.audit_logs (table_name, record_id);
```

### 3.2. `activity_logs`
```sql
CREATE TABLE system.activity_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    
    -- Optional cross-domain references depending on the context of the activity
    org_id uuid, 
    project_id uuid,
    
    images text[],
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 4. Global Configuration Subdomain

### 4.1. `system_settings`
```sql
CREATE TABLE system.system_settings (
    key varchar(100) NOT NULL PRIMARY KEY,
    value jsonb NOT NULL,
    description text,
    
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.2. `feature_flags`
```sql
CREATE TABLE system.feature_flags (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    description text,
    
    status system.feature_flag_status_enum DEFAULT 'INACTIVE'::system.feature_flag_status_enum NOT NULL,
    
    -- For partial rollouts (e.g., 20% of users)
    percentage_rollout integer DEFAULT 0,
    
    -- For explicitly enabling a feature for specific user IDs (Cross-Domain UUIDs)
    target_users uuid[],
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 5. Background Processing Subdomain

### 5.1. `background_jobs`
```sql
CREATE TABLE system.background_jobs (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    queue_name varchar(50) DEFAULT 'default' NOT NULL,
    task_name varchar(100) NOT NULL,
    
    payload jsonb DEFAULT '{}'::jsonb,
    
    status system.job_status_enum DEFAULT 'PENDING'::system.job_status_enum NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    max_attempts integer DEFAULT 3 NOT NULL,
    
    last_error text,
    
    run_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at timestamp(3) without time zone,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for queue workers to quickly find pending jobs
CREATE INDEX idx_background_jobs_queue ON system.background_jobs (queue_name, status, run_at);
```

---

## 6. Integrations & Webhooks Subdomain

### 6.1. `external_integrations`
```sql
CREATE TABLE system.external_integrations (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain Reference
    org_id uuid,
    
    service system.integration_service_enum NOT NULL,
    config jsonb DEFAULT '{}'::jsonb, -- Assumes application-level encryption for secrets
    
    is_active boolean DEFAULT true NOT NULL,
    
    last_used_at timestamp(3) without time zone,
    last_error text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Typically only one configuration per service per organization
    CONSTRAINT uq_org_service_integration UNIQUE (org_id, service)
);
```

### 6.2. `webhook_events`
```sql
CREATE TABLE system.webhook_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    provider text NOT NULL, -- e.g., 'stripe', 'sendgrid'
    event_type text NOT NULL,
    
    -- The ID provided by the external system to ensure idempotency
    external_id text NOT NULL, 
    
    payload jsonb NOT NULL,
    
    status system.webhook_status_enum DEFAULT 'PENDING'::system.webhook_status_enum NOT NULL,
    processed_at timestamp(3) without time zone,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Prevent processing the same webhook twice
    CONSTRAINT uq_webhook_provider_external_id UNIQUE (provider, external_id)
);
```

---

## 7. Summary of Key Decisions

*   **Idempotency & Auditing:** The `webhook_events` table includes a unique constraint on `provider` and `external_id` to guarantee that external events (like Stripe payments) are never double-processed.
*   **Decoupling JSON from Structure:** Settings, background payloads, and integration configs heavily utilize `JSONB`. This ensures the database schema remains extremely stable even as application features and third-party API requirements change over time.
*   **Virtual Schema Boundaries:** The `performed_by_id` inside `audit_logs` securely points back to `identity.users` without triggering PostgreSQL constraint checks. This protects the `identity` schema from locking under heavy audit write loads.
