# Comprehensive Enum Analysis Report

This report provides a strict audit of all Enums utilized across three primary domains: **User & Authentication (Identity Layer)**, **Library / Knowledge Layer**, and **Institution-Level Systems**. 

It maps Prisma schema definitions to PostgreSQL database representations and flags hardcoded usages, gaps, and inconsistencies within the application codebase.

---

## 1. User & Authentication (Identity Layer)

### Prisma & Database Enums
All Prisma enums here are materialized directly in PostgreSQL as custom `TYPE ... AS ENUM` types.
*   **`user_role_enum`**
    *   *Values:* `student`, `mentor`, `teacher`, `coordinator`, `admin`, `donor`, `director`, `village_member`, `city_member`, `outreach_lead`, `volunteer`, `staff`
    *   *Used In:* `users` model (`roles` array).
*   **`user_status_enum`**
    *   *Values:* `ACTIVE`, `INACTIVE`, `SUSPENDED`, `DELETED`, `ANONYMIZED`
    *   *Used In:* `users` model (`status`).
*   **`gender_enum`**
    *   *Values:* `male`, `female`
    *   *Used In:* `user_profiles` model (`gender`).
*   **`inner_state_enum`**
    *   *Values:* `confused`, `seeking`, `stable`, `disturbed`, `detached`
    *   *Used In:* `spiritual_profiles` model (`inner_state`).
*   **`svabhava_enum`**
    *   *Values:* `intellectual`, `administrative`, `creative`, `practical`
    *   *Used In:* `spiritual_profiles` model (`svabhava`).
*   **`purushartha_enum`**
    *   *Values:* `dharma`, `artha`, `kama`, `moksha`
    *   *Used In:* `spiritual_profiles` model (`primary_purushartha`).

### Codebase Usage & Observations
*   **`apps/web-portal/lib/rbac.ts`**: Imports `UserRole` directly from the generated `@/lib/prisma` client. The functions `checkRole` and `protectAction` safely use the strongly-typed enum array to authorize actions.
*   **Observation - Consistent Usage:** The Identity layer uses strong typing for its enums successfully. The RBAC system is closely coupled to the Prisma-generated types, preventing typo-based security flaws.

---

## 2. Library / Knowledge Layer

### Prisma & Database Enums
*   **`content_type_enum`**
    *   *Values:* `sutra`, `shloka`, `mantra`, `vachana`, `anuvada`, `vyakhyana`, `bhashya`, `tatparya`, `tika`, `shirshaka`, `upashirshaka`, `pushpika`, `title`, `translation`, `transliteration`, `bhasantara`, `bhavanuvada`, `padaccheda`, `vigraha`, `arthavistara`, `tippani_extended`, `sutra_summary`, `key_points`, `mula`
    *   *Used In:* `texts` model (`content_type`).
*   **`content_status_enum`**
    *   *Values:* `DRAFT`, `ACTIVE`, `ARCHIVED`, `DELETED`
    *   *Used In:* `texts` model (`status`).
*   **`librarytype`**
    *   *Values:* `BOOK`, `BOOKLET`, `ARTICLE`, `NEWSLETTER`
    *   *Used In:* `library_items` model (`type`).
*   **`script_enum`**
    *   *Values:* `devanagari`, `latin`, `bengali`, `tamil`, `oriya`
    *   *Used In:* `texts` model (`script`).
*   **`language_enum`**
    *   *Values:* `sa`, `en`, `hi`, `bn`, `ta`, `or`, `mr`, `gu`
    *   *Used In:* `texts` model (`language`).

### Codebase Usage & Observations
*   **`apps/api-gateway/src/modules/knowledge/library/library.service.ts`**: The codebase manually maps hardcoded strings (e.g., `'mula'`, `'transliteration'`, `'anuvada'`, `'bhasantara'`, `'bhavanuvada'`, `'tika'`, `'bhashya'`, `'vyakhyana'`) via `if-else` blocks to categorize verse structures for the frontend.
*   **🚨 CRITICAL GAP & INCONSISTENCY:**
    *   The code in `library.service.ts` (lines 118-123) explicitly checks for `t.content_type === 'vivarana'` and (line 134) `t.content_type === 'shabdartha'`.
    *   **Neither `vivarana` nor `shabdartha` exist in the Prisma `content_type_enum`.**
    *   This means these analytical and commentary layers will never be successfully ingested into the DB or retrieved by the UI, silently failing because the DB physically cannot store those string values. 

---

## 3. Institution-Level Systems

### Prisma & Database Enums
*   **`asset_status_enum`** (`ACTIVE`, `MAINTENANCE`, `RETIRED`, `LOST`, `SOLD`) - Used in `physical_assets`.
*   **`authority_status_enum`** (`guardian`, `dependant`, `karta`, `shakha_head`) - Used in `org_members`.
*   **`compliance_status_enum`** (`UPCOMING`, `IN_PROGRESS`, `COMPLETED`, `OVERDUE`, `DELAYED`) - Used in `compliance_tasks`.
*   **`contribution_type_enum`** (`FINANCIAL`, `IN_KIND`, `SERVICE`) - Used in `contributions`.
*   **`grant_status_enum`** (`PROPOSED`, `ACTIVE`, `COMPLETED`, `EXPIRED`) - Used in `grants`.
*   **`legal_document_status_enum`** (`DRAFT`, `ACTIVE`, `ARCHIVED`, `EXPIRED`, `REVOKED`) - Used in `legal_documents`.
*   **`milestone_status_enum`** (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `VERIFIED`) - Used in `grant_milestones`.
*   **`partner_type_enum`** (`CSR`, `NGO`, `GOVERNMENT`, `CORPORATE`, `VENDOR`) - Used in `partner_organizations`.
*   **`payment_method_enum`** (`UPI`, `CASH`, `BANK_TRANSFER`, `CHEQUE`) - Used in `transactions`.
*   **`project_status_enum`** (`PROPOSED`, `ACTIVE`, `COMPLETED`, `ON_HOLD`, `CANCELLED`) - Used in `projects`.
*   **`transaction_status_enum`** (`PENDING`, `APPROVED`, `REJECTED`, `FAILED`) - Used in `transactions`.
*   **`transaction_type_enum`** (`INCOME`, `EXPENSE`, `TRANSFER`, `ADJUSTMENT`, `PAYROLL`) - Used in `transactions`.

### Codebase Usage & Observations
*   **`apps/api-gateway/src/services/institutional.service.ts`**: The `getOverview` method queries `complianceTask` by passing the hardcoded string `'UPCOMING'`. 
*   **Observation - Weak Typing in Logic:** While the DB strictly enforces the enums, the services frequently use raw hardcoded strings (e.g., `'UPCOMING'`) instead of importing the strongly-typed Prisma enums (e.g., `ComplianceStatusEnum.UPCOMING`). This leaves the system vulnerable to refactoring bugs if the Prisma schema enum values ever change.
*   **Observation - Raw SQL Strings:** Several services (like `AcademyService` registering vows, or `TaskOrchestrator` logging jobs) use raw `INSERT/UPDATE` SQL queries with hardcoded string literals (e.g., `'ACTIVE'`, `'PENDING'`) rather than the ORM, bypassing compile-time TypeScript checks entirely.
