I now need a comprehensive analysis and mapping of all “Institution-Level” components in my system—similar to the detailed reports already generated for:

User & Authentication
Library / Knowledge Layer

This is strictly an analysis task only. No changes or refactoring should be performed.

Scope of Analysis

The Institution Layer consists of five major domains:

Organization
Entities, hierarchy, roles, departments, structure
Finance
Accounts, transactions, ledgers, financial tracking
Donations
Contributions, receipts, donor records
Grants
Partnerships, funding sources, grant allocations
Compliances
Legal records, audits, regulatory tracking, documentation
What Needs to Be Identified
1. Database Layer
All Prisma models related to:
Organization structure
Financial systems
Donations and donors
Grants and funding
Compliance and legal records
All corresponding PostgreSQL tables:
Across existing schema(s), especially public
Including partially used or legacy tables
2. Codebase Layer

Identify all files involved in:

Organization management
Financial operations
Donation workflows
Grant management
Compliance and audit handling

Include:

API routes / endpoints
Controllers
Services
Repositories / data access
Prisma queries
Type definitions
Middleware (if applicable)
3. Domain-Wise Segmentation

Clearly group findings into:

Organization
Finance
Donations
Grants
Compliances

Within each domain, map:

Models
Tables
Files
Responsibilities
Important Constraints (Strict)

🚫 Do NOT:

Modify any code
Suggest UI/UX changes
Refactor anything
Change APIs or architecture

✅ Only:

Analyze
Identify
Map
Expected Output Format

Please provide a structured report with:

Prisma Models (Domain-wise)
Model name + role
Database Tables (Domain-wise)
Table name + purpose
Relationships (if relevant)
File-Level Mapping
File path → responsibility
Grouped by domain
Dependency Overview
How different domains interact
Cross-domain dependencies (e.g., donations → finance)
Goal
Achieve complete visibility of institution-level systems
Understand how all domains are currently structured and interconnected
Prepare for future schema restructuring and modularization

===========================================


# Institution-Level Systems Audit Report

This report maps the comprehensive "Institution Layer" of the Vedic Skills Institute. It details the five major domains—Organization, Finance, Donations, Grants, and Compliances—documenting their database schemas, codebase handling, and cross-domain dependencies. This is strictly an analysis report; no codebase modifications were made.

---

## 1. Organization Domain
Manages the structural hierarchy, internal staffing, operational assets, and overarching projects.

### Database Layer
*   **`organizations`**: The root model representing institutional entities (parent/child hierarchy).
*   **`org_members`**: Maps `users` to `organizations` with specific roles, stipends, and tenure.
*   **`physical_assets`**: Tracks physical inventory (QR codes, purchase cost, current value, status).
*   **`projects`**: Manages institutional projects and budgets, linking to causes and transactions.
*   **`project_budget_lines`**: Granular budget allocations per project.
*   **`activity_logs`**: General timeline of organizational events.
*   **`support_tickets`**: Operational support tracking.

### Codebase Layer
*   **API Routes:** `apps/api-gateway/src/routes/institutional.routes.ts` (`/overview`, `/assets`, `/human-capital`)
*   **Services:** `InstitutionalService`, `AssetService`, `HumanCapitalService` (located in `apps/api-gateway/src/services/`)
*   **Admin UI:** `apps/web-portal/app/admin/organizations/`, `apps/web-portal/app/admin/human-capital/`, `apps/web-portal/app/admin/assets/`, `apps/web-portal/app/admin/projects/`

---

## 2. Finance Domain
The core accounting engine managing accounts, double-entry bookkeeping ledgers, and institutional transactions.

### Database Layer
*   **`financial_accounts`**: Chart of Accounts representing specific institutional balances (INR).
*   **`financial_periods`**: Accounting periods (e.g., Fiscal Year start/end, closed status).
*   **`journal_entries` & `journal_lines`**: Double-entry bookkeeping system (debits/credits) tied to accounts.
*   **`ledger_snapshots`**: Periodic balance rollups for fast querying.
*   **`transactions`**: High-level record of all inbound/outbound financial movements (Income, Expense, Transfer, Payroll). Links extensively across the entire system.
*   **`payment_records`**: External gateway tracking (e.g., Razorpay external ID, raw JSON payload).
*   **`payroll_records`**: Stipend disbursements linked to `org_members` and `transactions`.

### Codebase Layer
*   **API Routes:** `apps/api-gateway/src/routes/payment.ts`, `apps/api-gateway/src/routes/institutional.routes.ts` (`/ledger` endpoint).
*   **Services:** `PaymentService`
*   **Admin UI:** `apps/web-portal/app/admin/finance/`

---

## 3. Donations Domain
Manages inbound financial contributions, specific causes, and donor tax documentation.

### Database Layer
*   **`donation_causes`**: Hierarchical (ltree) campaigns or causes that accept funding.
*   **`donation_cause_options`**: Suggested donation tiers/amounts for a cause.
*   **`contributions`**: Specific inbound donations linking a user to a `cause_id` and a `transaction_id`.
*   **`donation_receipts`**: 80G tax-compliant receipts generated per transaction, securely linked to `file_assets`.

### Codebase Layer
*   **API Routes:** `apps/api-gateway/src/routes/payment.ts` (`/orders`, `/verify` for inbound Dāna via Razorpay).
*   **Admin UI:** `apps/web-portal/app/admin/payments/`

---

## 4. Grants Domain
Manages outbound funding, CSR partnerships, structured allocations, and reporting.

### Database Layer
*   **`partner_organizations`**: External entities (CSR, NGO, Gov) engaging in funding.
*   **`partnerships`**: Formal relationships establishing start/end dates and agreement files.
*   **`grants`**: Specific funding pools linked to a partnership.
*   **`grant_allocations`**: Distribution of grant funds to internal `projects` or `donation_causes`.
*   **`grant_milestones`**: Trackable deliverables triggering fund disbursements.
*   **`partner_reports` & `partner_report_versions`**: Documentation submitted to partners.
*   **`utilization_certificates`**: Official UC tracking (total received, utilized, unspent, certified_by).

### Codebase Layer
*   **API Routes:** `apps/api-gateway/src/routes/institutional.routes.ts` (`/grants` endpoint).
*   **Services:** `InstitutionalService`

---

## 5. Compliances Domain
Manages legal documents, regulatory tasks, audits, and secure sharing of sensitive files.

### Database Layer
*   **`legal_documents` & `document_versions`**: Tracks institutional paperwork with full version history.
*   **`compliance_tasks`**: Deadline-driven regulatory tasks (e.g., Tax filings, FCRA renewals).
*   **`secure_share_links` & `secure_share_link_documents`**: Time-limited, tokenized access links for safely sharing internal legal documents with external auditors.
*   **`audit_logs`**: System-wide immutable tracking of DB changes (`old_data`, `new_data`, `ip_address`).

### Codebase Layer
*   **API Routes:** `apps/api-gateway/src/routes/compliance.routes.ts`
*   **Services:** `ComplianceService`
*   **Admin UI:** `apps/web-portal/app/admin/governance/`

---

## Dependency & Interconnection Overview

The Institution Layer is highly interconnected, primarily funneling through the **Finance Domain**.

1.  **The Transaction Nexus:** The `transactions` table is the central hub. 
    *   **Donations:** A `contribution` record is strictly linked to a `transaction`. A `donation_receipt` is generated off that same `transaction`.
    *   **Payroll:** `payroll_records` require a `transaction_id`.
    *   **Grants:** Grant disbursements are logged as `transactions`.
    *   **Double-Entry Backup:** Every `transaction` optionally triggers a `journal_entry` with balancing `journal_lines`.
2.  **Asset Interlocking:**
    *   `donation_receipts`, `legal_documents`, `partner_reports`, and `utilization_certificates` all rely on the global `file_assets` table (usually tied to S3/R2).
3.  **Entity Anchoring:**
    *   Almost every model across all 5 domains contains an `org_id` referencing the `organizations` table, ensuring strict multi-tenant isolation or sub-branch accounting if the institution expands.
    *   `users` table acts as the performer/creator in `audit_logs`, `support_tickets`, `org_members`, and `contributions`.

