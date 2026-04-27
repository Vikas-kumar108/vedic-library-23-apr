Now that we have completed the roadmap and architectural guidance for the first two domains, I want to proceed to the third module in the same structured and disciplined manner.

Important Constraint

🚫 Do NOT:

Take any action
Suggest code changes
Begin implementation

✅ Only:

Provide strategic, architectural, and conceptual guidance
Focus Area

👉 Proceed with Module 3: Institution-Level Systems

This includes domains such as:

Organization (entities, structure, hierarchy)
Finance (accounts, transactions, ledgers)
Donations (contributions, receipts, donors)
Grants (partnerships, funding sources)
Compliances (legal, audits, regulatory tracking)
What I Need From You

Please follow the same depth and structure as previous modules:

1. High-Level Roadmap (Conceptual Only)
How should this domain be approached for refactoring?
What is the ideal conceptual sequence of steps?
2. Schema Design Thinking
How should the institution schema (or sub-schemas) be structured?
How to logically separate:
Organization
Finance
Donations
Grants
Compliances
Should these be:
One schema with sub-domains, or
Multiple schemas?
3. Boundaries & Separation
What should strictly belong in this domain?
What should be excluded (even if currently present in public)?
4. Dependencies & Interactions
How this domain interacts with:
Identity (users, roles)
Other modules (learning, communication, etc.)
Direction of dependencies
5. Risks & Design Pitfalls
Common mistakes in designing institutional/financial systems
Overlaps, redundancy, compliance risks
Things to avoid
Goal
Maintain architectural consistency across modules
Ensure clear domain boundaries
Build a robust foundation before implementation begins

=======================================================

# Architectural Strategy: Domain 3 - Institution-Level Systems

This document provides architectural guidance and conceptual roadmap planning for transitioning the **Institution-Level Systems** into a modular PostgreSQL schema. No code changes will occur until this strategy is approved.

---

## 1. High-Level Roadmap (Conceptual Sequence)

The Institution layer is the operational backbone of the Vedic Skills Institute. Because it governs money, legalities, and internal hierarchy, the refactoring must be handled with extreme precision to avoid breaking financial ledgers.

1.  **Resolve "One vs. Many" Schema Debate:** Decide whether to split Finance, Grants, and Donations into micro-schemas or keep them unified. (See Section 2 for the recommendation).
2.  **Define Bounded Context:** Identify the "Transaction Nexus"—the core tables that act as the financial nervous system.
3.  **Database-Level Migration:** Create the target schema. Issue `ALTER TABLE ... SET SCHEMA` for all organizational, financial, donation, grant, and compliance tables, alongside their numerous `TYPE ... AS ENUM`s.
4.  **Codebase Typing Remediation:** Address the risk identified in the Enum Audit where services like `InstitutionalService` use raw strings (e.g., `'UPCOMING'`) instead of strictly-typed Prisma Enums.
5.  **ORM Mapping:** Tag the 25+ institutional models with `@@schema("target_schema")` in Prisma and regenerate the client.

---

## 2. Schema Design Thinking

The Institution layer governs five major sub-domains: Organization, Finance, Donations, Grants, and Compliances. 

**Architectural Decision: One Schema vs. Multiple Schemas**
*   *Recommendation:* **One Unified `institution` Schema.**
*   *Reasoning (The Transaction Nexus):* In this system, money is fluid. A single user payment (`transactions`) triggers a `contribution` (Donations), dictates a `grant_allocation` (Grants), and writes to double-entry ledgers (`journal_entries` and `journal_lines` in Finance). 
*   If you split `finance` and `donations` into separate PostgreSQL schemas, a single donation flow would cross three different schema boundaries. While Postgres supports this, it introduces massive cognitive overhead and complicates transactional rollbacks and point-in-time database restorations. Keeping them under one `institution` schema (using table prefixes if necessary, e.g., `fin_accounts`, `grant_milestones`) maintains the ACID guarantees of the financial nexus within a single bounded context.

### Table Grouping within `institution`
*   **Organization:** `organizations`, `org_members`, `projects`, `physical_assets`
*   **Finance (Core Ledger):** `transactions`, `financial_accounts`, `journal_entries`, `journal_lines`
*   **Donations:** `contributions`, `donation_causes`, `donation_receipts`
*   **Grants & Partnerships:** `grants`, `partnerships`, `grant_allocations`, `grant_milestones`
*   **Compliances:** `compliance_tasks`, `legal_documents`, `utilization_certificates`

---

## 3. Boundaries & Separation

This schema represents the internal, operational governance of the institute. It should have no awareness of the core product (Shastras) or the students' learning progress.

### What STRICTLY Belongs Here:
*   All financial ledgers and transaction records.
*   All internal staffing and hierarchy mappings (`org_members`).
*   All legal and compliance tracking entities.
*   **Enums:** `asset_status_enum`, `transaction_type_enum`, `compliance_status_enum`, `grant_status_enum`, `payment_method_enum`, `partner_type_enum`, etc.

### What Must Be STRICTLY EXCLUDED:
*   🚫 `users`: The `org_members` and `contributions` tables will hold a `user_id`, but the user credentials and profiles belong entirely to the **Identity** schema.
*   🚫 `file_assets`: A `donation_receipt` or `legal_document` will point to a binary PDF. That PDF metadata (`url`, `s3_key`) belongs in the **Media/DAM** schema. The Institution schema only holds the foreign key reference to the asset.
*   🚫 `support_tickets`: Even if they involve operational support, ticketing and messaging belong in the **Communications / Support** schema.

---

## 4. Dependencies & Interaction

The Institution layer is a **Dependent Governance Domain**.

*   **Direction of Dependency:** The flow of dependency is largely **outbound**. This is the opposite of Identity and Knowledge. 
*   **Outbound Dependencies (Heavy):**
    *   **Identity:** `contributions`, `transactions`, `org_members`, and `payroll_records` all point outward to `identity.users.id`.
    *   **Media/DAM:** `legal_documents` and `donation_receipts` point outward to `media.file_assets.id`.
*   **Inbound Dependencies (Low):** Very few domains depend on the Institution schema. The core product (Library/Education) functions perfectly even if the entire Institution schema goes offline.

---

## 5. Risks & Design Pitfalls

When architecting institutional and financial systems, avoid these critical mistakes:

1.  **Splitting the Ledger (Micro-schema Over-engineering):** As mentioned, isolating `finance` from `donations` into separate schemas. It looks clean on paper but makes querying the holistic financial health of a project a nightmare of cross-schema joins. Keep the money in one schema.
2.  **Conflating 'User' and 'Staff':** Yielding to the temptation to add `salary` or `department` directly onto the `users` table. The current design correctly isolates this into `org_members`. This boundary must be fiercely protected during migration.
3.  **Hardcoded Service Logic:** We observed in the Enum Audit that services use raw strings like `'UPCOMING'` instead of strongly-typed Prisma Enums. If the `compliance_status_enum` is moved to the `institution` schema, these raw strings become fragile. The codebase must be audited to enforce strong typing.
4.  **Transaction Boundary Failures:** When migrating these tables, if the `transactions` table is moved but `journal_entries` is left in `public` temporarily, any live financial operation will fatally crash. The entire "Transaction Nexus" must be migrated in a single, atomic database transaction.

> [!IMPORTANT]  
> **User Review Required:** Do you agree with the architectural decision to keep Finance, Donations, Grants, and Compliances unified under a single `institution` schema to preserve the "Transaction Nexus"? If approved, I will proceed to **Domain 4: Learning / Education**.
