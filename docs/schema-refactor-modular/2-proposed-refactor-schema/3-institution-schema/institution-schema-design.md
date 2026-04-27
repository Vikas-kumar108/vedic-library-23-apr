# Production-Grade Schema Design: Institution Domain (`institution`)

This document outlines the architectural design for the `institution` PostgreSQL schema. This domain acts as the **Operational and Financial Backbone** of the Vedic Skills Institute.

---

## 1. Schema Overview

The `institution` schema governs the "Transaction Nexus"—the unified flow of money, legal obligations, and organizational hierarchy.

**Core Architectural Rule:** Finance, Donations, Grants, and Compliance must **NOT** be split into micro-schemas. A single user payment dictates updates to transactions, contributions, and double-entry ledgers simultaneously. Splitting these breaks ACID transactional guarantees. They must all reside together within `institution`.

---

## 2. Table-by-Table Definition

### 2.1. Organization Subdomain
*   **`organizations`:** The root entity (e.g., "Vedic Skills Institute HQ"). Primary Key: `id`.
*   **`org_members`:** Associates a user with an organization role (e.g., Staff, Coordinator). FKs: `org_id`, `identity.users.id`.
*   **`projects`:** Internal initiatives. FK: `org_id`.
*   **`physical_assets`:** Tracks hardware/infrastructure. FK: `org_id`.
*   **`subscription_tiers` & `user_subscriptions` (New):** Because we removed `subscription_tier_id` from the `identity` schema, we introduce `user_subscriptions` here to map `identity.users.id` to `subscription_tiers.id` without bleeding financial concepts into Identity.

### 2.2. Finance Subdomain (The Ledger)
*   **`financial_accounts`:** Chart of Accounts (Assets, Liabilities, Equity). FK: `org_id`.
*   **`transactions`:** The unified record of a payment/transfer. 
    *   Key Fields: `amount`, `type`, `paymentmethod`, `external_payment_id`.
    *   Relationships: FK to `financial_accounts` (source/destination).
*   **`journal_entries` & `journal_lines`:** The immutable Double-Entry Accounting ledger. Every transaction triggers equal debit/credit lines here.

### 2.3. Donations Subdomain
*   **`donation_causes`:** Specific fundraising campaigns. FK: `org_id`.
*   **`contributions`:** Records of individual donations. FKs: `cause_id`, `transaction_id`, `identity.users.id`.
*   **`donation_receipts`:** Tax-compliant receipts (e.g., 80G). FKs: `contribution_id`, `media.file_assets.id`.

### 2.4. Grants & Partnerships Subdomain
*   **`partnerships`:** External entities (NGOs, Corporate CSR).
*   **`grants`:** Approved funding from partnerships. FK: `partnership_id`.
*   **`grant_allocations`:** Disbursement of grant money to specific `projects`.
*   **`grant_milestones`:** Deliverables required for grant tranches.

### 2.5. Compliance & Legal Subdomain
*   **`compliance_tasks`:** Regulatory deadlines (e.g., FCRA Renewal). FK: `org_id`.
*   **`legal_documents`:** Memorandums, Audit Reports. FK: `media.file_assets.id`.
*   **`utilization_certificates`:** Proof of grant spending. FK: `grant_id`.

---

## 3. Mapping from Existing Schema (`public` ➔ `institution`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `organizations`, `projects`, `org_members`, `physical_assets`, `subscription_tiers` | **MOVE** | Direct migration to `institution`. |
| `financial_accounts`, `transactions`, `journal_entries`, `journal_lines` | **MOVE** | Move atomically to preserve ledger integrity. |
| `donation_causes`, `contributions`, `donation_receipts` | **MOVE** | Direct migration to `institution`. |
| `partnerships`, `grants`, `grant_allocations`, `grant_milestones` | **MOVE** | Direct migration to `institution`. |
| `compliance_tasks`, `legal_documents`, `utilization_certificates` | **MOVE** | Direct migration to `institution`. |
| *None* | **CREATE** | Create `user_subscriptions` to fix the broken identity boundary. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions must be moved from `public` to `institution`:

1.  **Finance/Donations:** `transaction_type_enum`, `payment_method_enum`
2.  **Grants:** `grant_status_enum`, `partner_type_enum`, `milestone_status_enum`
3.  **Compliance:** `compliance_status_enum`, `legal_document_status_enum`
4.  **Org:** `asset_status_enum`, `project_status_enum`

---

## 5. Boundaries & Separation

### What Strictly Belongs
All monetary data, legal compliance records, and organizational staff associations. If it relates to money, tax, or employment, it lives here.

### What Must Be Excluded (The "Leaky Abstractions")
*   **`users`:** Staff and Donors are users. Their records live in **Identity**. The Institution schema only holds `user_id` foreign keys (e.g., in `org_members` or `contributions`).
*   **Binary Files:** PDFs of tax receipts or legal audits live in S3. Their metadata (`url`, `mime_type`) belongs in the **Media/DAM** schema. The Institution schema only stores `file_id`.
*   **`support_tickets`:** Even if a ticket is about a failed donation, the ticketing system belongs in **Interactions**.

---

## 6. Migration Awareness (Design-Level)

*   **Atomic Migration Requirement:** The single most critical constraint during the future migration script execution will be atomic transaction boundaries. `transactions`, `journal_entries`, and `contributions` must be migrated in the same `BEGIN...COMMIT` block. If a system attempts to write to `transactions` in `public` while `journal_entries` is in `institution`, the application will crash.
*   **Fixing Hardcoded Strings:** The application codebase currently uses raw strings for some statuses (e.g., `'UPCOMING'`). By moving these Enums into the `institution` schema and regenerating Prisma, the backend will be forced to adopt strong typing.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design, specifically the introduction of the `user_subscriptions` table to cleanly map Identity users to Institution subscription tiers. Does this align with your architectural goals?


=========


Edited institution-schema-design.md
Viewed prompt-2.md:1-24
Edited prompt-2.md
Viewed schema.sql:1593-1650
Viewed schema.sql:1680-1700
Viewed schema.sql:1230-1260
Created institution_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Institution Domain**.

You can review the complete schema definition (DDL) here: [institution_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/institution_schema_implementation.md).

### Design Summary:
1. **The Core Ledger (`journal_lines`):** I have added a strict database-level constraint (`chk_debit_credit_exclusive`) to physically guarantee that a single ledger line can only hold a debit OR a credit, never both and never neither. This natively enforces double-entry accounting rules at the lowest level.
2. **Virtual Boundaries (No Hard Cross-Schema FKs):** A critical architectural decision in multi-schema databases is handling cross-schema relations. I have defined external IDs (like `user_id` pointing to `identity`, and `file_id` pointing to `media`) strictly as raw `uuid` columns without standard `REFERENCES schema.table(id)` database constraints. 
   - *Why?* Creating hard foreign keys across isolated schemas tightly couples them and creates database-level lock contentions. By defining them as raw UUIDs, we enforce domain boundaries at the DB layer and allow the ORM (Prisma) to handle the logical relation perfectly.
3. **Subscriptions Relocated:** The new `user_subscriptions` mapping table effectively bridges the gap from the Identity schema into the financial tier structures seamlessly.
4. **9 New Typed Enums:** All the raw string statuses the system currently relies on (e.g., `'PROPOSED'`, `'CSR'`) have been permanently mapped to strong PostgreSQL enums, eliminating invalid string data entries in the future.

This DDL completes the physical schema design for the third anchor domain, locking in the Financial and Organizational backbone of the Vedic Skills Institute. 

If this design aligns perfectly with your goals, we can proceed to designing the schema structure for **Module 4: Learning / Education**.



Edited knowledge_schema_implementation.md
Edited prompt-2.md
Edited prompt-2.md
Viewed prompt-1.md:51-98
Edited prompt-1.md
Searched for "CREATE TABLE public\.(organizations|org_members|projects|physical_assets|financial_accounts|transactions|journal_entries|journal_lines|donation_causes|contributions|donation_receipts|grants|grant_allocations|grant_milestones|partnerships|compliance_tasks|legal_documents|utilization_certificates) "
Searched for "CREATE TYPE public\.(transaction_type_enum|donation_type_enum|grant_status_enum|compliance_status_enum|payment_method_enum|partner_type_enum|asset_status_enum|project_status_enum|legal_document_status_enum|milestone_status_enum)"
Searched for "CREATE TABLE public\.subscription_tiers"
Viewed schema.sql:1916-1940
Created institution_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **Institution Domain** based on your existing `public` schema.

You can review the full schema definition and architectural decisions here: [institution_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/institution_schema_design.md).

### Key Architectural Highlights:
1. **The Transaction Nexus:** I strongly advise keeping Finance, Donations, Grants, and Compliance under a single `institution` schema rather than splitting them into micro-schemas. Because a single user payment writes to `transactions`, `contributions`, and double-entry `journal_entries` simultaneously, they must remain within the same schema to preserve ACID transaction guarantees seamlessly.
2. **Identity Boundary Fix (Subscriptions):** In the Identity phase, we correctly identified that `subscription_tier_id` was violating domain boundaries by living inside `identity.spiritual_profiles`. In this design, I have introduced the `user_subscriptions` mapping table inside the `institution` schema to cleanly connect Identity users to Institution subscription tiers.
3. **Outbound Dependencies:** This schema is heavily reliant on outbound foreign keys. It will safely reference `identity.users.id` for donors/staff, and `media.file_assets.id` for binary tax receipts and legal documents.
4. **Enum Strictness:** The design relocates 9 crucial enums (like `transaction_type_enum` and `compliance_status_enum`) into the new schema. This will force the API layer to stop using raw strings (like `'UPCOMING'`) and adopt strict ORM typing.

As requested, this report focuses purely on design, structure, and boundaries without altering any code. Please review the proposal, specifically the introduction of the `user_subscriptions` mapping table. If this design meets your architectural standard, we can proceed to generate the raw DDL implementation script for this schema (similar to what we did for Identity and Knowledge).