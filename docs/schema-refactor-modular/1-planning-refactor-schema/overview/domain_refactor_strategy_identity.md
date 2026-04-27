I want your expert architectural guidance on restructuring my database by moving from a single public schema to a multi-schema, domain-driven design, where each major module has its own dedicated schema.

Context
Currently, the entire system is organized under a single public schema
We have already identified 8–9 major domains/modules, such as:
User & Authentication
Library / Knowledge Layer
Institution-Level Systems
Learning / Education
Interactions, Communications & Outreach
System / Infrastructure
(and any additional supporting domains identified)

👉 The proposal is to:

Create separate PostgreSQL schemas for each domain
Move corresponding tables into their respective domain schemas
Objective

I want to evaluate and execute a domain-based schema refactor, with:

Strong architectural clarity
Proper separation of concerns
Long-term scalability and maintainability
What I Need From You
1. Overall Architectural Opinion
Is this multi-schema (domain-based) approach the right direction?
What are:
Advantages
Risks
Trade-offs
2. Domain-by-Domain Strategy

I want to proceed one module at a time, in a controlled manner.

👉 For each domain, provide a detailed report, including:

a. Schema Design Recommendation
Suggested schema name
Which tables belong inside it
Boundaries (what should NOT be included)
b. Table Organization
Grouping and structure within the schema
Handling of shared or cross-domain tables
c. Relationships & Dependencies
How this schema interacts with other schemas
Foreign key considerations across schemas
d. Migration Approach (Conceptual)
How to move from public → new schema safely
Whether to:
Duplicate + migrate, or
Move directly
e. Risks & Pitfalls
What could go wrong
Common mistakes to avoid
3. Execution Plan (Phased)
Recommend:
Which module to refactor first
Order of modules
Ensure:
Minimal breakage
Controlled transition
Working Style
We will proceed module-by-module
You can generate 8–9 detailed reports, one per domain
No rush—we will validate each step before moving forward
Important Constraints

🚫 Do NOT:

Jump into code-level changes yet
Modify APIs or implementation

✅ Focus on:

Architecture
Planning
Strategy
Goal
Transition from a monolithic schema → modular, domain-driven schemas
Build a clean, scalable, and maintainable foundation
Execute refactoring safely and confidently

Once you're ready, please begin with:
👉 Module 1: User & Authentication (Identity Schema)


============================

# Database Refactoring Strategy: Multi-Schema Domain-Driven Design

This document outlines the architectural strategy for transitioning the Vedic Skills Institute's monolithic `public` database schema into a modular, multi-schema architecture. It also includes the detailed execution plan for **Module 1: User & Authentication (Identity Schema)**.

---

## 1. Overall Architectural Opinion

Moving from a single `public` schema to a domain-driven multi-schema approach in PostgreSQL is a highly effective, mature architectural decision for a system of this size.

### Advantages
*   **Architectural Boundaries:** It forces developers to respect bounded contexts. You can no longer easily write spaghetti queries joining a `transaction` directly to a `shastra_text` without acknowledging crossing a domain boundary.
*   **Future Microservice Readiness:** If the Knowledge layer ever needs to scale independently of the Institution layer, having it already isolated in a `knowledge` schema makes breaking it out into a separate database trivial.
*   **Security & Access Control:** PostgreSQL allows granting permissions on a per-schema basis. You could theoretically create a DB user that only has read access to the `knowledge` schema but no access to the `finance` schema.
*   **Cognitive Load:** Tools like DataGrip, pgAdmin, and Prisma Studio become much easier to navigate when 66 tables are categorized into 6-8 logical folders (schemas).

### Risks & Trade-offs
*   **Cross-Schema Foreign Keys:** PostgreSQL fully supports foreign keys across schemas (e.g., `finance.transactions.user_id` → `identity.users.id`). However, taking database backups (dumps) of a *single* schema becomes complicated if it strictly depends on another schema.
*   **Prisma Complexity:** You must enable the `multiSchema` preview feature in Prisma. This requires explicitly tagging every model with `@@schema("schema_name")`.
*   **Migration Danger:** Moving a table to a new schema is instantaneous in Postgres (`ALTER TABLE SET SCHEMA`), but if the application is live, there is a microsecond where active queries might fail if Prisma isn't perfectly synced.

---

## 2. Phased Execution Plan

To minimize breakage, the refactoring must be sequenced from the "Most Depended Upon" to the "Least Depended Upon." 

1.  **Phase 1: Identity (`identity`)** - The root of the system. Everything references `users`.
2.  **Phase 2: Knowledge (`knowledge`)** - The core product (Shastras, Library). Highly independent.
3.  **Phase 3: Institution (`institution`)** - Organization, Finance, Grants. Heavy internal dependency.
4.  **Phase 4: Education (`education`)** - Depends heavily on both Identity (students) and Knowledge (syllabus).
5.  **Phase 5: Community & Social (`community`)** - Circles, Family Trees, Posts. Depends on Identity.
6.  **Phase 6: Infrastructure & Operations (`system`)** - Audit logs, Webhooks, Integrations. Spans everything.

---

## 3. Module 1: User & Authentication Strategy

### a. Schema Design Recommendation
*   **Suggested Schema Name:** `identity` (Avoid `users` or `auth` as they are often reserved or overloaded keywords).
*   **Tables Included:**
    *   `users` (Core credentials and roles)
    *   `user_profiles` (Standard demographics)
    *   `spiritual_profiles` (Vedic-specific psychometrics)
    *   `user_preferences` (App settings)
    *   `user_statistics` (Aggregated platform metrics)
*   **Boundaries (What to EXCLUDE):**
    *   `org_members` belongs in `institution` (it relates to payroll/hierarchy).
    *   `circle_members` belongs in `community`.
    *   `family_nodes` belongs in `community`.

### b. Table Organization
*   **Core vs. Extension:** `users` is the master table. The other four tables (`user_profiles`, `spiritual_profiles`, etc.) act as strictly 1-to-1 extensions (Vertical Partitioning). They share the same UUID primary key as the `users` table to eliminate unnecessary indexing and JOIN overhead.
*   **Enums Hosted Here:** `user_role_enum`, `user_status_enum`, `gender_enum`, `inner_state_enum`, `svabhava_enum`, `purushartha_enum`.

### c. Relationships & Dependencies
*   **Inbound Dependencies:** This schema is the "Anchor." Almost every other schema will have a foreign key pointing to `identity.users`.
*   **Outbound Dependencies:** The `identity` schema should be strictly isolated. It should **not** have any foreign keys pointing to tables in `institution`, `knowledge`, or `education`. If a user needs a subscription tier, the `institution.subscription_tiers` table should track it, not the `users` table.

### d. Migration Approach (Conceptual)
1.  **Schema Creation:** Run `CREATE SCHEMA IF NOT EXISTS identity;`
2.  **Move Directly (No Duplication):** Because Postgres handles schema reassignment instantly without moving underlying disk data, we use the direct move approach:
    ```sql
    ALTER TABLE public.users SET SCHEMA identity;
    ALTER TABLE public.user_profiles SET SCHEMA identity;
    -- (Repeat for tables and TYPE AS ENUMs)
    ```
3.  **Prisma Sync:** Update `schema.prisma` by adding `schemas = ["public", "identity"]` to the generator block, and append `@@schema("identity")` to the moved models. Run `npx prisma generate`.

### e. Risks & Pitfalls
*   **Enum Orphanage:** When moving tables via SQL, you must also explicitly move the custom `TYPE AS ENUM`s that those tables use. If you move `users` but leave `user_role_enum` in `public`, Postgres will maintain the link, but Prisma introspection will break.
*   **Middleware Failure:** The JWT authentication middleware in API Gateway relies on `users`. If the deployment of the DB schema move and the updated Prisma client are out of sync, all user logins will immediately fail.

> [!IMPORTANT]  
> **User Review Required:** Do you approve of this architectural direction and the specific schema boundaries proposed for the `identity` schema? If approved, I will prepare the analysis for Module 2.
