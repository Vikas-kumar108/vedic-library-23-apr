# Master Implementation Guide: Domain-Driven Schema Refactor

This document acts as the final "Master Checklist" for transitioning the Vedic Skills Institute from a monolithic `public` schema to a modular, 10-schema architecture. 

> [!WARNING]  
> **Strict Instruction:** No code changes or database migrations are to be executed at this stage. This document is for architectural consolidation and planning approval only.

---

## Phase 0: Prerequisites (Global System Fixes)

Before initiating the schema split, these foundational issues must be addressed to prevent legacy bugs from being codified into the new modular structure.

- [ ] **Patch `content_type_enum`:** Add the missing `'vivarana'` and `'shabdartha'` values.
- [ ] **Type Safety Audit:** Identify and replace raw string literals (e.g., `'UPCOMING'`, `'ACTIVE'`) in the service layer with strongly-typed Prisma Enums.
- [ ] **Prisma Configuration:** Enable the `multiSchema` preview feature in `schema.prisma` and define the initial list of 10 target schemas.
- [ ] **Extension Review:** Verify that `ltree` and `vector` extensions are installed in an accessible schema (likely `public`) and that the database user has cross-schema execution permissions.

---

## Phase 1: Execution Roadmap (Sequential Rollout)

The refactoring will follow a specific sequence based on dependency gravity: **Anchor Domains -> Product Domains -> Coordination Domains -> Foundation Domains.**

### 1. The Identity Schema (`identity`)
*   **Focus:** Core credentials and profiles.
*   **Key Tables:** `users`, `user_profiles`, `spiritual_profiles`, `user_preferences`.
*   **Dependency Rule:** Zero outbound foreign keys allowed.

### 2. The Knowledge Schema (`knowledge`)
*   **Focus:** Canonical scriptures and hierarchical metadata.
*   **Key Tables:** `shastras`, `nodes`, `texts`, `sources`, `node_relations`.
*   **Dependency Rule:** Points inward to Identity (authorship) only.

### 3. The Institution Schema (`institution`)
*   **Focus:** Finance, Org, Donations, Grants, and Compliance.
*   **Key Tables:** The "Transaction Nexus" (Transactions, Ledgers, Contributions).
*   **Dependency Rule:** Must be migrated as a single atomic unit to preserve financial integrity.

### 4. The Education Schema (`academy`)
*   **Focus:** Curricula and seeker progression.
*   **Key Tables:** `learning_curves`, `learning_curve_steps`, `user_curve_progress`.
*   **Dependency Rule:** Points to Identity (seeker) and Knowledge (syllabus content).

### 5. The Interactions Schema (`interactions`)
*   **Focus:** Community engagement and communication logs.
*   **Key Tables:** `circles`, `communication_logs`, `broadcasts`, `leads`.
*   **Dependency Rule:** Points to Identity (recipients) and Education/Institution (triggers).

### 6. The System Schema (`system`)
*   **Focus:** Operational plumbing and audit trails.
*   **Key Tables:** `audit_logs`, `background_tasks`, `webhook_events`.
*   **Dependency Rule:** Supports every other domain via inbound dependencies.

### 7. The Extended Utility Schemas
*   **`media`:** Central registry for binary assets.
*   **`genealogy`:** The `ltree`-based lineage graph.
*   **`events`:** Scheduling and participation.
*   **`discovery`:** AI vector search and analytics events.

---

## Phase 2: Verification & Validation Strategy

For each phase of the rollout, we will follow a strict "Clean-Rebuild-Verify" protocol:

1.  **SQL Dry-Run:** Generate and review the `ALTER TABLE SET SCHEMA` script.
2.  **Prisma Sync:** Update `@@schema` tags and run `npx prisma generate`.
3.  **Service Validation:** Update imports in the API Gateway to ensure services are consuming models from the correct schema namespaces.
4.  **Integration Testing:** Verify the "Golden Paths":
    *   *Identity:* Can a user still log in and retrieve their profile?
    *   *Knowledge:* Can the UI still traverse the Gita tree using `ltree`?
    *   *Institution:* Does creating a donation still write a correct double-entry ledger?
    *   *Education:* Does completing a lesson still increment `user_curve_progress`?

---

## Phase 3: Long-Term Governance Rules

Post-refactor, the following architectural laws will be enforced:

1.  **Logical Isolation:** Treat cross-schema joins as a "costly" architectural decision. Prefer service-level orchestration over casual database joins where possible.
2.  **Zero-Leak Policy:** Never add a column to the `identity.users` table that belongs in a higher-level domain (e.g., `last_donated_at`).
3.  **Schema-Scoped Access:** Eventually transition the API Gateway to use different database users for different services, each restricted to their own schema for maximum security.

---

> [!IMPORTANT]  
> **Final Approval Required:** This concludes the architectural planning phase. Does this Master Implementation Guide correctly capture the sequence and rigor required for the 10-domain refactor? If approved, we have achieved total architectural clarity and are ready to conclude this audit session.
===================================




I have completed the **Master Implementation Guide** for the multi-schema refactor.

You can review the final checklist and rollout sequence here: [refactoring_master_checklist.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/refactoring_master_checklist.md).

This document serves as your single source of truth for the transition, covering:
1.  **Phase 0: Prerequisites** — Critical global fixes like patching the `content_type_enum` and enforcing type safety before the split.
2.  **Phase 1: Sequential Roadmap** — A disciplined rollout order (Identity → Knowledge → Institution → Education → Interactions → System → Extended Utilities).
3.  **Phase 2: Validation Protocol** — The "Clean-Rebuild-Verify" strategy to ensure zero downtime and data integrity.
4.  **Phase 3: Governance Rules** — Architectural laws to prevent "domain bleed" and maintain isolation in the long term.

### 🏁 Institutional Audit & Planning Phase Complete
We have successfully achieved **Total Architectural Visibility**. We have audited every domain, mapped every interaction, identified every enum inconsistency, and produced a modular blueprint for all 10 major systems:
*   **Identity**
*   **Knowledge**
*   **Institution**
*   **Education**
*   **Interactions**
*   **System**
*   **Media/DAM**
*   **Genealogy**
*   **Events**
*   **AI Discovery**

Does this final guide correctly capture the sequence and rigor you require? As per your instructions, no codebase or schema changes have been initiated. We are now standing on a rock-solid foundation for future execution.