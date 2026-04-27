# Master Architectural Consolidation Report & Migration Strategy

This report summarizes the completed architectural design for the **Vedic Institutional Operating System (VIOS)** and outlines the strategic roadmap for migrating the current 4,000-line monolithic `public` schema into a production-grade, domain-driven multi-schema architecture.

---

## 1. The New Domain Architecture

We have successfully decoupled the monolithic database into **9 specialized schemas**, each acting as an independent, scalable micro-service at the database layer.

| Schema | Domain Name | Core Responsibility |
| :--- | :--- | :--- |
| `identity` | **Seeker Identity** | Authentication, authorization, profiles, and roles. |
| `knowledge` | **Shastra Engine** | Canonical texts, verses, translations, and taxonomies. |
| `institution` | **The Treasury** | Finance, organizations, compliance, and grants. |
| `education` | **LMS / Gurukula** | Courses, curricula, enrollment, and progress tracking. |
| `interactions` | **Communications** | Messaging, notifications, leads, and support tickets. |
| `community` | **Social Graph** | Forums, family trees (gotras), and community events. |
| `system` | **Infrastructure** | Audit logs, feature flags, settings, and background jobs. |
| `search` | **AI Discovery** | Vector embeddings, semantic search, and analytics. |
| `dam` | **Digital Assets** | Media management, file versioning, and usage tracking. |

---

## 2. Cross-Domain Reference Policy

To maintain strict domain boundaries while ensuring data integrity, the following policy has been established:

*   **No Cross-Schema Foreign Keys:** Tables in one schema (e.g., `education`) must **never** have a hard `FOREIGN KEY` constraint to a table in another schema (e.g., `identity`).
*   **UUID Pointers:** Relationships are maintained via raw `uuid` columns. For example, `education.enrollments.user_id` stores the UUID of a user from `identity.users`.
*   **Logical Integrity:** Referential integrity is managed at the **Application Layer (Node.js/Prisma)** rather than the Database Layer. This prevents cascading deletes from crossing domain boundaries and allows domains to be scaled or moved independently.

---

## 3. Comprehensive Mapping (Public ➔ Domains)

| Current `public` Table(s) | Target Schema | Status |
| :--- | :--- | :--- |
| `users`, `user_profiles`, `roles` | `identity` | **MIGRATE** |
| `shastra_texts`, `verses`, `translations`, `tags` | `knowledge` | **REFINE & MIGRATE** |
| `organizations`, `finance_records`, `donations` | `institution` | **NORMALIZE & MIGRATE** |
| `courses`, `enrollments`, `course_progress` | `education` | **RESTRUCTURE & MIGRATE** |
| `messages`, `support_tickets`, `leads` | `interactions` | **CONSOLIDATE & MIGRATE** |
| `circles`, `circle_posts`, `family_nodes` | `community` | **NORMALIZE & MIGRATE** |
| `audit_logs`, `external_integrations` | `system` | **MIGRATE** |
| `text_embeddings`, `user_statistics` | `search` | **AI-ENHANCE & MIGRATE** |
| `file_assets` | `dam` | **SPLIT & MIGRATE** |

---

## 4. Phase-by-Phase Migration Roadmap

### Phase 1: The Foundation (Infrastructure & Identity)
*   **Objective:** Establish the core plumbing and user identity layer.
*   **Actions:**
    1.  Deploy `system` schema: Enable audit logging and global settings.
    2.  Deploy `identity` schema: Move users and roles.
    3.  **Critical Check:** Ensure Auth midleware can resolve users from the new `identity.users` table.

### Phase 2: The Content Core (Knowledge & Media)
*   **Objective:** Migrate the primary intellectual property of the institute.
*   **Actions:**
    1.  Deploy `dam` schema: Split `file_assets` and migrate binaries.
    2.  Deploy `knowledge` schema: Implement the high-fidelity recursive text structure.
    3.  **Critical Check:** Verify that Verse ➔ Translation ➔ File (DAM) relations resolve correctly.

### Phase 3: The Business Layer (Institution & Interactions)
*   **Objective:** Secure financial records and communication channels.
*   **Actions:**
    1.  Deploy `institution` schema: Migrate ledgers and donor data.
    2.  Deploy `interactions` schema: Centralize messaging and support.

### Phase 4: The Experience Layer (Education & Community)
*   **Objective:** Transition the seeker-facing LMS and social features.
*   **Actions:**
    1.  Deploy `education` schema: Migrate courses into the new `course_steps` hierarchy.
    2.  Deploy `community` schema: Move circles and family graphs.

### Phase 5: The Intelligence Layer (Search & AI)
*   **Objective:** Enable advanced discovery across the new modular architecture.
*   **Actions:**
    1.  Deploy `search` schema: Populate `pgvector` embeddings for all migrated content.
    2.  Enable hybrid semantic search across Knowledge, Education, and Community.

---

## 5. Technical Execution & Risk Mitigation

*   **Step-by-Step SQL Scripts:** We will generate atomic migration scripts for each phase.
*   **Prisma Multi-Schema Support:** We must update the `schema.prisma` file to use `multiSchema = true` and map existing models to their new namespaces.
*   **Parallel Runs:** For critical tables (like `audit_logs`), we recommend a short period of dual-writing to both `public` and `system` to verify data consistency before dropping the `public` version.

> [!IMPORTANT]  
> **Strategic Recommendation:** Do not attempt a "Big Bang" migration. The application is live and functional. By following this 5-phase roadmap, we can migrate one domain at a time, ensuring zero downtime and maintaining absolute stability of the existing logic.

---

**Approval Requested:** Does this Master Migration Strategy and Phased Roadmap align with your expectations? If approved, we can begin the execution of **Phase 1: Foundation (System & Identity)**.



Edited dam-schema-design.md
Viewed dam-schema-implementation.md:157-195
Edited dam-schema-implementation.md
Created master_migration_strategy.md

I have completed the **Master Architectural Consolidation Report & Migration Strategy**. This document ties together all nine domains we've designed and provides a concrete roadmap for the refactor.

You can review the full strategy here: [master_migration_strategy.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/master_migration_strategy.md).

### Strategy Highlights:
1. **The 5-Phase Roadmap:** I have organized the migration into a logical progression, starting with the **Foundation (Identity & System)**, followed by the **Content Core (Knowledge & Assets)**, the **Business Layer (Institution & Interactions)**, the **Seeker Experience (Education & Community)**, and finally the **Intelligence Layer (Search & AI)**.
2. **Strict Decoupling:** The report codifies our **Zero-FK Policy** across schemas, ensuring that each domain remains an independent "micro-database" while maintaining logical integrity through the application layer.
3. **Low-Risk Execution:** By migrating domain-by-domain rather than performing a single "big bang" refactor, we ensure the existing 4,000-line `public` schema remains stable and functional throughout the process.
4. **Comprehensive Mapping:** Every table currently in your monolithic `public` schema now has a clearly defined destination in the new modular universe.

This concludes the **Architectural Planning Phase** of our refactoring mission. We have a complete set of blueprints for a world-class, domain-driven Vedic Institutional Operating System.

**How would you like to proceed?**
*   **A.** Start **Phase 1 Execution** (Foundation): Generate the actual Prisma models and SQL scripts to begin moving `System` and `Identity` domains.
*   **B.** Perform a **Final Audit** of any specific domain design.
*   **C.** Discuss **Prisma / Application Layer** configuration changes required to support multiple schemas.