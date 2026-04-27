Before proceeding with any implementation, I want to pause at the planning stage and get your clear roadmap and architectural guidance for the first domain.

Important Constraint

🚫 Do NOT:

Take any action
Suggest code changes
Propose implementation steps that modify the system

✅ Only:

Provide strategy, roadmap, and best-practice recommendations
Focus Area

👉 Begin with Domain 1: User & Authentication (Identity Layer)

What I Need From You
1. High-Level Roadmap (No Execution Yet)
How should this domain be approached for refactoring?
What is the ideal sequence of steps (conceptual only)?
2. Schema Design Thinking
How should the identity schema be structured conceptually?
What kind of tables typically belong here?
How to think about:
Users
Authentication
Roles / permissions
Sessions / tokens
3. Boundaries & Separation
What should strictly belong in this domain?
What should not be included (even if currently present in public)?
4. Dependencies
How this domain interacts with:
Other modules (learning, institution, etc.)
What should be the direction of dependency?
5. Risks & Design Mistakes
Common pitfalls while designing identity systems
Things to avoid at the architectural level
Goal
Gain clarity before action
Ensure correct thinking before execution
Build a strong foundation for safe refactoring

===========================================



# Architectural Strategy: Domain 1 - User & Authentication (Identity Layer)

This document provides clear architectural guidance and roadmap planning for transitioning the **Identity Layer** into its own dedicated PostgreSQL schema. No code changes or executions will occur until this conceptual foundation is approved.

---

## 1. High-Level Roadmap (Conceptual Sequence)

Refactoring the Identity domain must be the absolute first step because it acts as the foundation for all other domains. The sequence of approach should be:

1.  **Define Bounded Context:** Solidify exactly which tables and enums represent "Identity" versus "Behavior" or "Association."
2.  **Database-Level Migration (Schema Shift):** Conceptually, this involves creating the `identity` schema in PostgreSQL and issuing `ALTER TABLE ... SET SCHEMA` and `ALTER TYPE ... SET SCHEMA` commands to instantly move data without duplicating it.
3.  **ORM Mapping (Prisma):** Enable the `multiSchema` feature in Prisma and explicitly tag the chosen models with `@@schema("identity")`.
4.  **Service & Middleware Validation:** Ensure the BFF authentication middleware (`web-portal/middleware.ts`) and Gateway RBAC checks successfully query the new schema boundaries without breaking JWT generation.
5.  **Locking the Boundary:** Once moved, establish a strict CI/CD rule: no outbound foreign keys can ever be added to the `identity` schema.

---

## 2. Schema Design Thinking

The Identity schema answers three fundamental questions: *Who are you?* (Authentication), *What can you do?* (Authorization), and *What are your core traits?* (Profiles).

*   **Users Table (The Core):** This table should be lean, containing only credentials (passwords, emails, phone numbers), timestamps, and core status flags (`user_status_enum`). 
*   **Roles & Permissions:** Currently handled via an array of `user_role_enum` directly on the `users` table. This is a highly performant approach for stateless JWT architectures and should be maintained. Avoid building complex permission join tables unless dynamic RBAC is an explicit future requirement.
*   **Vertical Partitioning (Profiles):** The current design excellently separates `user_profiles` (demographics), `spiritual_profiles` (psychometrics like `inner_state_enum`), and `user_preferences` (settings). These should remain as strictly 1-to-1 extensions sharing the `users.id` UUID to prevent bloated `JOIN`s and improve query performance.
*   **Sessions / Tokens:** Since the system currently utilizes stateless JWTs, there is no explicit `sessions` table. If token revocation or refresh token rotation is introduced in the future, a `user_sessions` or `revoked_tokens` table would strictly belong in this schema.

---

## 3. Boundaries & Separation

Enforcing strict boundaries is the primary reason for a multi-schema refactor. 

### What STRICTLY Belongs Here:
*   `users`
*   `user_profiles`
*   `spiritual_profiles`
*   `user_preferences`
*   `user_statistics` (Aggregated platform metrics intrinsic to the user's identity)
*   **Enums:** `user_role_enum`, `user_status_enum`, `gender_enum`, `inner_state_enum`, `svabhava_enum`, `purushartha_enum`.

### What Must Be STRICTLY EXCLUDED:
Anything that describes what a user *does* or *belongs to* must live outside this schema.
*   🚫 `org_members`: Belongs to the **Institution** schema. It defines an association, not an identity.
*   🚫 `circle_members`: Belongs to the **Community/Social** schema.
*   🚫 `family_nodes` / `family_links`: Belongs to the **Genealogy** schema.
*   🚫 `subscription_tiers`: Belongs to the **Institution/Finance** schema.
*   🚫 `user_curve_progress`: Belongs to the **Education** schema.

---

## 4. Dependencies & Interaction

The Identity layer is the **Anchor Domain**. 

*   **Direction of Dependency:** The flow of dependency must be strictly **inbound**.
*   **Inbound Foreign Keys:** Every other schema will have foreign keys pointing to `identity.users.id`. (e.g., `institution.transactions.user_id`, `knowledge.library_downloads.user_id`). This is expected and standard.
*   **Outbound Foreign Keys (Zero-Tolerance Policy):** The `identity` schema must have **zero** outbound foreign keys. A `users` record should never point to an `organization_id` or a `circle_id` to indicate "primary organization." If that business logic is needed, the `institution` schema should hold a mapping table (e.g., `primary_affiliations`). This ensures the Identity service can operate completely independently of whether the Institution service is online or even exists.

---

## 5. Risks & Design Mistakes

When designing Identity schemas, architects often fall into these traps:

1.  **The "Fat User" Model:** Yielding to the temptation to add columns like `total_donations_amount` or `last_course_completed` directly onto the `users` table for convenience. This pollutes the domain. Such data belongs in `user_statistics` or should be aggregated from the respective domains.
2.  **Leaky Boundaries (Outbound FKs):** Adding an `organization_id` to the `user_profiles` table just because "every user belongs to an org." This breaks the anchor pattern and makes the Identity schema dependent on the Institution schema.
3.  **Enum Orphanage During Migration:** When migrating tables across schemas in Postgres, custom enums (`TYPE ... AS ENUM`) must be explicitly migrated as well. Failing to move `user_role_enum` into the `identity` schema while moving the `users` table will break ORM introspection.
4.  **Tightly Coupled Middleware:** Ensuring the API Gateway auth middleware (`role.middleware.ts`) explicitly queries `identity.users` rather than implicitly relying on the `public` schema path. Prisma's `multiSchema` feature handles this well, but raw SQL queries in the codebase will break if not prefixed with `identity.`.

> [!IMPORTANT]  
> **User Review Required:** Does this conceptual roadmap, boundary definition, and zero-outbound-dependency rule align with your vision for the Identity Layer? If you approve, we can proceed to plan **Domain 2: Library / Knowledge Layer**.
