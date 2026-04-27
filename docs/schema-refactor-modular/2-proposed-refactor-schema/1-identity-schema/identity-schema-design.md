# Production-Grade Schema Design: Identity Domain (`identity`)

This document outlines the architectural design for the `identity` PostgreSQL schema. It is based on the existing `public` schema but enforces strict domain-driven boundaries to ensure high scalability and zero external dependencies.

---

## 1. Schema Overview

The `identity` schema acts as the **Anchor Domain** for the entire Vedic Skills Institute system. It is responsible for Authentication (Who is this?), Authorization (What can they do?), and core Profiling (Who are they?). 

**Core Architectural Rule:** This schema must have **zero outbound foreign keys**. No table within `identity` is allowed to reference a table in `institution`, `knowledge`, or any other domain. All dependencies are strictly *inbound* (other schemas referencing `identity.users.id`).

---

## 2. Table-by-Table Definition

### 2.1. `users` (The Core Identity)
*   **Purpose:** Handles authentication credentials, account security, and authorization roles. It must remain extremely lean.
*   **Primary Key:** `id` (UUID)
*   **Key Fields:**
    *   `email` (text, UNIQUE)
    *   `password` (text, nullable for OAuth flows)
    *   `is_online` (boolean)
    *   `email_verified` (timestamp)
    *   `roles` (`user_role_enum[]` - highly performant array for stateless JWT auth)
    *   `status` (`user_status_enum`)
    *   **Security:** `failed_login_attempts`, `account_locked_until`
    *   **Auth Flows:** `verification_token`, `reset_token`, `reset_token_expires`
    *   **GDPR:** `deleted_at`, `is_anonymized`, `anonymized_at`
    *   **Audit:** `created_at`, `updated_at`, `last_active`
*   **Relationships:** Has no foreign keys. Is referenced by almost every other schema.

### 2.2. `user_profiles` (Standard Demographics)
*   **Purpose:** Stores standard PII and demographic data. Separated from `users` to keep authentication queries fast and cacheable.
*   **Primary Key:** `user_id` (UUID)
*   **Key Fields:** `full_name`, `phone_number`, `whatsapp_number`, `avatar_url`, `gender` (`gender_enum`), `date_of_birth`, `village`, `city`, `state`, `pin_code`.
*   **Relationships:** `user_id` is both PK and a strict 1:1 Foreign Key to `identity.users.id`.

### 2.3. `spiritual_profiles` (Vedic Psychometrics)
*   **Purpose:** Tracks qualitative spiritual metrics specific to the Vedic ecosystem.
*   **Primary Key:** `user_id` (UUID)
*   **Key Fields:** `age_group`, `life_stage`, `eligibility_level`, `primary_focus`, `inner_state`, `nature`. (All utilizing their respective Enums).
*   **Relationships:** 1:1 Foreign Key to `identity.users.id`.
*   **🚨 Refactoring Required (See Section 3):** The current `subscription_tier_id` field must be removed from this table.

### 2.4. `user_preferences` (Application Settings)
*   **Purpose:** Stores user-configurable UI and system settings.
*   **Primary Key:** `user_id` (UUID)
*   **Key Fields:** `notification_prefs` (JSONB), `metadata` (JSONB), `notes` (text).
*   **Relationships:** 1:1 Foreign Key to `identity.users.id`.

### 2.5. `user_statistics` (Aggregated Metrics)
*   **Purpose:** Fast-read table for user dashboards. Prevents complex `COUNT()` queries across domains when loading a profile.
*   **Primary Key:** `user_id` (UUID)
*   **Key Fields:** `nodes_read_count`, `courses_completed`, `contribution_points`.
*   **Relationships:** 1:1 Foreign Key to `identity.users.id`.

---

## 3. Mapping from Existing Schema (`public` ➔ `identity`)

The current `public` schema correctly implements vertical partitioning (1:1 extensions for profiles). However, the following mapping logic must be applied during migration:

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `users` | **MOVE** | Direct migration to `identity.users`. No schema changes required. |
| `user_profiles` | **MOVE** | Direct migration to `identity.user_profiles`. |
| `user_preferences` | **MOVE** | Direct migration to `identity.user_preferences`. |
| `user_statistics` | **MOVE** | Direct migration to `identity.user_statistics`. |
| `spiritual_profiles` | **SPLIT** | Move to `identity.spiritual_profiles`, but **drop** the `subscription_tier_id` column. That column creates an outbound dependency on the `institution` schema, violating the anchor pattern. Subscription mapping belongs in the `institution` schema (e.g., an `institution.user_subscriptions` table). |

---

## 4. Enum Strategy

To maintain strict typing at the database level, the following `TYPE ... AS ENUM` definitions must be moved from `public` to `identity`. They represent Schema-Level enums that will be exported via Prisma for backend usage.

1.  **`user_role_enum`**: (`student`, `mentor`, `teacher`, `admin`, etc.) Used in `users.roles`.
2.  **`user_status_enum`**: (`ACTIVE`, `INACTIVE`, `SUSPENDED`, `DELETED`, `ANONYMIZED`). Used in `users.status`.
3.  **`gender_enum`**: (`male`, `female`). Used in `user_profiles`.
4.  **`age_group_enum`**, **`life_stage_enum`**, **`purushartha_enum`**, **`inner_state_enum`**, **`svabhava_enum`**: Used in `spiritual_profiles`.

---

## 5. Boundaries & Separation

### What Strictly Belongs
Everything related to verifying identity, authorizing access via roles, and storing intrinsic attributes about the human being (demographics, spiritual state).

### What Must Be Excluded (The "Leaky Abstractions")
*   **Sessions Table:** Because the existing system uses stateless JWTs, no `sessions` table is required. If OAuth refresh tokens are added later, an `oauth_sessions` table would belong here.
*   `org_members`: Belongs to `institution`. Employment/Membership is an association, not an identity.
*   `family_nodes`: Belongs to `genealogy`. Family trees are a graph structure separate from auth.
*   `user_curve_progress`: Belongs to `education`.
*   `subscription_tier_id`: As identified above, this belongs in `institution` or `finance`.

---

## 6. Migration Awareness (Design-Level)

*   **Zero-Downtime Feasibility:** Because Postgres supports instantaneous schema reassignment (`ALTER TABLE public.users SET SCHEMA identity;`), this design can be implemented without copying gigabytes of data.
*   **Prisma Compatibility:** The design perfectly supports Prisma's `multiSchema` feature. The API Gateway will not need to alter its raw SQL queries if the ORM is updated correctly.
*   **JWT Integrity:** The `users` table structure remains completely identical, meaning existing JWT tokens will not be invalidated and the `role.middleware.ts` will continue to function seamlessly once the Prisma client points to the new schema space.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design and specifically the decision to split `subscription_tier_id` out of the `spiritual_profiles` table to maintain the zero-outbound-dependency rule. Does this align with your architectural goals?



Edited refacotring-master-checklist.md
Viewed schema.sql:1792-1844
Searched for "CREATE TABLE public.users "
Viewed schema.sql:2167-2250
Searched for "CREATE TABLE public\.(user_profiles|spiritual_profiles|user_preferences|user_statistics)"
Viewed schema.sql:2113-2166
Viewed schema.sql:1877-1894
Created identity_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **Identity Domain** based on your existing `public` schema.

You can review the full schema definition and architectural decisions here: [identity_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/identity_schema_design.md).

### Key Architectural Highlights:
1.  **Vertical Partitioning Maintained:** The existing system's design of using 1:1 extension tables (`user_profiles`, `spiritual_profiles`, etc.) sharing the `users.id` as the primary key is highly performant. This design is fully preserved in the new `identity` schema.
2.  **Stateless Auth Integrity:** Since authentication is currently handled via stateless JWTs, I have deliberately excluded a `sessions` table to keep the schema lean. The array of `user_role_enum` on the `users` table handles authorization efficiently.
3.  **The Subscriptions Refactor (Crucial Boundary Fix):** During the mapping phase, I identified that `spiritual_profiles` currently holds a `subscription_tier_id`. **This must be removed during migration.** Storing a subscription ID creates an outbound foreign key dependency on the Institution/Finance schema, violating the "Anchor Domain" rule. Subscriptions should be mapped in the `institution` schema instead.
4.  **Enum Export Strategy:** All core identity enums (roles, statuses, demographics, psychometrics) have been identified to be moved alongside the tables to ensure Prisma can correctly introspect the new schema space.

As requested, this focuses purely on design, structure, and migration awareness without altering any code. Please review the proposal, specifically the decision regarding the `subscription_tier_id`. If this design meets your standard, we can proceed to design the schema structure for **Module 2: Library / Knowledge Layer**.




Searched for "CREATE TYPE public\.(user_role_enum|user_status_enum|gender_enum|age_group_enum|life_stage_enum|purushartha_enum|inner_state_enum|svabhava_enum)"
Viewed schema.sql:678-715
Viewed schema.sql:340-635
Created identity_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Identity Domain**.

You can review the complete schema definition (DDL) here: [identity_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/identity_schema_implementation.md).

### Design Summary:
1. **Isolated Schema:** All definitions exist securely within the `CREATE SCHEMA IF NOT EXISTS identity` block.
2. **Strict Typings:** All 8 related enums (e.g., `user_role_enum`, `svabhava_enum`) are defined natively within the schema.
3. **Optimized Core Table:** The `identity.users` table handles authentication, role-arrays, and OAuth states effectively.
4. **Vertical Partitioning with Cascading Deletes:** The 4 profile/extension tables (`user_profiles`, `spiritual_profiles`, `user_preferences`, `user_statistics`) utilize `user_id` as both their Primary Key and an `ON DELETE CASCADE` Foreign Key. This eliminates `JOIN` complexity while ensuring immediate GDPR compliance if an identity is legally requested to be purged.
5. **Architectural Purity:** As outlined in the previous report, the `subscription_tier_id` field has been omitted to strictly enforce the "zero-outbound dependency" rule for this Anchor Domain.

This DDL serves as the pristine target-state representation of the Identity Domain, ensuring a highly scalable, production-grade foundation. Let me know if you would like any modifications to this structure.