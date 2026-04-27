# Production-Grade Schema Design: System Domain (`system`)

This document outlines the architectural design for the `system` PostgreSQL schema. This domain acts as the **Infrastructure & Control Plane** of the Vedic Skills Institute.

---

## 1. Schema Overview

The `system` schema manages background operations, security auditing, global configurations, and external connectivity. 

**Core Architectural Rule:** This domain acts as the absolute bottom layer of the application architecture. It tracks *what* happens in the other domains (auditing), controls *how* the app behaves (feature flags, settings), and manages external bridges (webhooks, integrations). It must be ultra-scalable for write-heavy logs and highly cached for read-heavy configs.

---

## 2. Table-by-Table Definition

### 2.1. Audit & Observability Subdomain
*   **`audit_logs` (Migrated)**: The immutable ledger of critical system changes.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `table_name`, `record_id`, `action` (`audit_action_enum`), `old_data` (JSONB), `new_data` (JSONB), `ip_address`, `timestamp`.
    *   **Relationships:** **Cross-Domain FK:** `performed_by_id` ➔ `identity.users(id)`.
*   **`activity_logs` (Migrated)**: General system events or feed items (distinct from strict database audits).
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `title`, `description`, `category`.

### 2.2. Global Configuration Subdomain
*   **`system_settings` (New)**: Key-value store for global platform configurations (e.g., `MAINTENANCE_MODE`, `DEFAULT_CURRENCY`).
    *   **Primary Key:** `key` (VARCHAR)
    *   **Key Fields:** `value` (JSONB), `description`, `updated_at`.
*   **`feature_flags` (New)**: Controls the rollout of new platform features.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `name` (UNIQUE), `description`, `status` (`feature_flag_status_enum`), `percentage_rollout` (INTEGER), `target_users` (UUID Array).

### 2.3. Background Processing Subdomain
*   **`background_jobs` (New)**: A lightweight internal queue for asynchronous tasks (e.g., generating PDFs, syncing data).
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `queue_name`, `task_name`, `payload` (JSONB), `status` (`job_status_enum`), `attempts` (INTEGER), `last_error`, `run_at`, `completed_at`.

### 2.4. Integrations & Webhooks Subdomain
*   **`external_integrations` (Migrated)**: Configuration blocks for external APIs (Stripe, SendGrid, S3).
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `service` (`integration_service_enum`), `config` (JSONB - encrypted at application layer), `is_active`, `last_error`.
    *   **Relationships:** **Cross-Domain FK:** `org_id` ➔ `institution.organizations(id)`.
*   **`webhook_events` (Migrated)**: Logs of incoming/outgoing webhooks to ensure idempotency and auditing.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `provider`, `event_type`, `external_id`, `payload` (JSONB), `status` (`webhook_status_enum`), `processed_at`.

---

## 3. Mapping from Existing Schema (`public` ➔ `system`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `audit_logs` | **MOVE** | Direct migration to `system`. |
| `activity_logs` | **MOVE** | Direct migration to `system`. |
| `external_integrations` | **MOVE** | Direct migration to `system`. |
| `webhook_events` | **MOVE** | Direct migration to `system`. |
| *(None)* | **CREATE** | Create `system_settings`, `feature_flags`, `background_jobs` to mature the platform's infrastructure. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions establish the business rules for infrastructure:

1.  **`audit_action_enum` (New)**: (`CREATE`, `UPDATE`, `DELETE`, `LOGIN`, `EXPORT`). Replaces free-text strings in `audit_logs`.
2.  **`feature_flag_status_enum` (New)**: (`ACTIVE`, `INACTIVE`, `ROLLING_OUT`).
3.  **`job_status_enum` (New)**: (`PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `RETRYING`).
4.  **`webhook_status_enum` (Existing)**: (`PENDING`, `PROCESSED`, `FAILED`).
5.  **`integration_service_enum` (Existing)**: (`S3`, `R2`, `TWILIO`, `SENDGRID`, `RAZORPAY`, `STRIPE`, `GITA_API`, `TRANSLATION_ENGINE`).

---

## 5. Boundaries & Separation

### What Strictly Belongs
Server-level tracking, database mutation audits, 3rd-party API credentials, webhook receipts, and feature toggles.

### What Must Be Excluded (The "Leaky Abstractions")
*   **User Authentication:** Passwords, OAuth tokens, and `roles` belonging to a user live in `identity`. `system` only cares about tracking *who* did *what* (`performed_by_id`).
*   **Email Tracking:** Sending an email to a user goes in `interactions.communication_logs`. Configuring the SendGrid API key goes in `system.external_integrations`.
*   **Payments:** Logging a Stripe webhook payload goes in `system.webhook_events`. The actual parsed `transactions` ledger goes in `institution`.

---

## 6. Migration Awareness (Design-Level)

*   **Audit Log Volume:** The `audit_logs` table usually becomes the largest table in the database. Moving it to the `system` schema allows you to eventually partition this table by month/year without complicating the `public` or `identity` schemas.
*   **JSONB Flexibility:** Settings, Integrations, and Webhooks heavily utilize `JSONB`. This allows you to add new integrations or settings without altering the schema structure in the future.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design. In particular, note the introduction of `system_settings`, `feature_flags`, and `background_jobs` to provide a robust control plane. Does this infrastructure architecture align with your operational goals?

Edited community-schema-design-2.md
Edited community-schema-implementation.md
Viewed prompt-1.md
Searched for "CREATE TABLE public\.(audit_logs|permissions|roles|feature_flags|configuration|settings|jobs|queues|webhooks|webhook_events|external_integrations)"
Viewed schema.sql:880-910
Viewed schema.sql:860-885
Viewed schema.sql:1141-1155
Viewed schema.sql:2230-2250
Searched for "CREATE TYPE public\.(integration_service_enum|webhook_status_enum|job_status_enum|feature_flag_enum)"
Viewed schema.sql:409-425
Viewed schema.sql:732-745
Created system_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **System / Infrastructure Domain** based on your existing `public` schema.

You can review the full schema definition and architectural decisions here: [system_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/system_schema_design.md).

### Key Architectural Highlights:
1. **The Infrastructure Control Plane:** I have introduced three new tables—`system_settings`, `feature_flags`, and `background_jobs`—to transition this domain from being merely a logging bucket into a true operational control plane. This enables the Admin portal to safely toggle features or change global configs without deploying code.
2. **Strict Boundary Management:** A critical distinction is made here: parsing a Stripe webhook payload happens in `system.webhook_events`, but the actual financial transaction ledger is kept in `institution`. Storing SendGrid API keys happens in `system.external_integrations`, but tracking an email sent to a user belongs in `interactions.communication_logs`.
3. **Partition-Ready Auditing:** By isolating `audit_logs` into this specific schema and cleaning up the `action` field with a strict `audit_action_enum`, the table is perfectly primed for future PostgreSQL table partitioning (by month/year) as the application scales.
4. **Virtual Cross-Schema Constraints:** As established across all domains, references to external tables (like the `performed_by_id` pointing to `identity.users`) are standard UUID columns without hard foreign key locks, preventing massive audit inserts from blocking user logins.

As requested, this report focuses purely on design, structure, and boundaries without altering any code. Please review the proposal. If this infrastructure layout meets your system observability and control requirements, we can proceed to generate the raw DDL implementation script for this schema.



Edited system-schema-design.md
Edited prompt-2.md
Viewed prompt-2.md:24-70
Created system_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **System / Infrastructure Domain**.

You can review the complete schema definition (DDL) here: [system_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/system_schema_implementation.md).

### Design Summary:
1. **The Infrastructure Control Plane:** The newly designed `system_settings` and `feature_flags` tables provide a centralized way to safely manage your system's behavior without requiring code deployments. 
2. **Background Operations:** I introduced the `background_jobs` table, turning this schema into a lightweight, native task queue capable of tracking retries and processing states natively within Postgres.
3. **Audit Readiness:** The `audit_logs` table has been successfully migrated and fortified with the strict `audit_action_enum`. I also indexed the `table_name` and `record_id` columns, ensuring that when an Admin wants to view the history of a specific user or a specific course, the system can instantly pull the relevant audit records from a potentially massive table.
4. **Idempotent Webhooks:** The `webhook_events` table includes a critical `UNIQUE (provider, external_id)` constraint, structurally preventing the system from ever processing the same webhook payload (like a Stripe charge) twice.

This concludes the architectural planning and schema generation for the **System Domain**. 

If this DDL accurately reflects your requirements, we are ready to proceed to the next domains (Media/DAM, Search/AI) or move to the **Final Consolidation & Refactoring Checklist** phase!