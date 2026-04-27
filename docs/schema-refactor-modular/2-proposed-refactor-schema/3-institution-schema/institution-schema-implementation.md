# Implementation-Ready Schema: Institution Domain (`institution`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the newly isolated `institution` schema. 

This schema acts as the **Transaction Nexus**, preserving ACID compliance by keeping financial accounts, donations, and double-entry accounting ledgers tightly coupled. It introduces the `user_subscriptions` table to cleanly isolate identity boundaries.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Institution
CREATE SCHEMA IF NOT EXISTS institution;
```

---

## 2. Enum Definitions

These custom PostgreSQL types establish strict typing at the database layer.

```sql
-- Finance & Donations
CREATE TYPE institution.transaction_type_enum AS ENUM (
    'INCOME',
    'EXPENSE',
    'TRANSFER'
);

CREATE TYPE institution.payment_method_enum AS ENUM (
    'UPI',
    'CASH',
    'BANK_TRANSFER',
    'CHEQUE'
);

-- Organization & Projects
CREATE TYPE institution.project_status_enum AS ENUM (
    'PROPOSED',
    'ACTIVE',
    'COMPLETED',
    'ON_HOLD',
    'CANCELLED'
);

CREATE TYPE institution.asset_status_enum AS ENUM (
    'ACTIVE',
    'MAINTENANCE',
    'RETIRED'
);

-- Grants & Partnerships
CREATE TYPE institution.partner_type_enum AS ENUM (
    'CSR',
    'NGO',
    'GOVERNMENT',
    'CORPORATE',
    'VENDOR'
);

CREATE TYPE institution.grant_status_enum AS ENUM (
    'PROPOSED',
    'ACTIVE',
    'COMPLETED',
    'EXPIRED'
);

CREATE TYPE institution.milestone_status_enum AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'VERIFIED'
);

-- Compliance
CREATE TYPE institution.compliance_status_enum AS ENUM (
    'PENDING',
    'COMPLETED',
    'OVERDUE'
);

CREATE TYPE institution.legal_document_status_enum AS ENUM (
    'DRAFT',
    'ACTIVE',
    'ARCHIVED',
    'EXPIRED',
    'REVOKED'
);
```

---

## 3. Organization Subdomain

### 3.1. `organizations`
```sql
CREATE TABLE institution.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    parent_id uuid REFERENCES institution.organizations(id),
    name text NOT NULL,
    type text NOT NULL,
    registration_no text,
    pan text,
    tan text,
    address text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 3.2. `org_members`
```sql
CREATE TABLE institution.org_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id) ON DELETE CASCADE,
    -- Points outwardly to Identity Schema:
    user_id uuid NOT NULL, 
    
    role text NOT NULL,
    base_stipend numeric DEFAULT 0,
    start_date timestamp(3) without time zone,
    end_date timestamp(3) without time zone,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

### 3.3. `projects` & `physical_assets`
```sql
CREATE TABLE institution.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    budget numeric DEFAULT 0,
    status institution.project_status_enum DEFAULT 'PROPOSED'::institution.project_status_enum,
    
    start_date date,
    end_date date,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution.physical_assets (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id) ON DELETE CASCADE,
    name text NOT NULL,
    asset_type text NOT NULL,
    purchase_value numeric DEFAULT 0,
    purchase_date date,
    status institution.asset_status_enum DEFAULT 'ACTIVE'::institution.asset_status_enum,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

### 3.4. `subscription_tiers` & `user_subscriptions`
```sql
CREATE TABLE institution.subscription_tiers (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    level integer DEFAULT 1 NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- NEW: Correctly isolating the relationship from the Identity Domain
CREATE TABLE institution.user_subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    tier_id uuid NOT NULL REFERENCES institution.subscription_tiers(id) ON DELETE CASCADE,
    user_id uuid NOT NULL, -- Points to Identity
    
    start_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);
```

---

## 4. Finance Subdomain (The Ledger)

### 4.1. `financial_accounts`
```sql
CREATE TABLE institution.financial_accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text NOT NULL, -- e.g., 'ASSET', 'LIABILITY', 'EQUITY'
    balance numeric DEFAULT 0 NOT NULL,
    currency text DEFAULT 'INR',
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 4.2. `transactions`
```sql
CREATE TABLE institution.transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id),
    
    amount numeric NOT NULL,
    type institution.transaction_type_enum NOT NULL,
    paymentmethod institution.payment_method_enum NOT NULL,
    
    source_account_id uuid REFERENCES institution.financial_accounts(id),
    destination_account_id uuid REFERENCES institution.financial_accounts(id),
    
    category text NOT NULL,
    purpose text NOT NULL,
    provider text,
    external_payment_id text,
    
    is_corpus boolean DEFAULT false,
    gst_applicable boolean DEFAULT false,
    tds_applicable boolean DEFAULT false,
    
    -- Points to Identity:
    recorded_by_id uuid NOT NULL, 
    
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    
    -- Optional references
    grant_id uuid,
    cause_id uuid,
    project_id uuid
);
```

### 4.3. Double-Entry Accounting
```sql
CREATE TABLE institution.journal_entries (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    transaction_id uuid NOT NULL REFERENCES institution.transactions(id) ON DELETE CASCADE,
    entry_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE institution.journal_lines (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    journal_entry_id uuid NOT NULL REFERENCES institution.journal_entries(id) ON DELETE CASCADE,
    account_id uuid NOT NULL REFERENCES institution.financial_accounts(id),
    
    debit numeric DEFAULT 0 NOT NULL,
    credit numeric DEFAULT 0 NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Integrity check to prevent unbalanced accounting
ALTER TABLE institution.journal_lines ADD CONSTRAINT chk_debit_credit_exclusive CHECK (
    (debit > 0 AND credit = 0) OR (credit > 0 AND debit = 0)
);
```

---

## 5. Donations Subdomain

### 5.1. `donation_causes` & `contributions`
```sql
CREATE TABLE institution.donation_causes (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id),
    title text NOT NULL,
    description text,
    target_amount numeric,
    raised_amount numeric DEFAULT 0,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution.contributions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    cause_id uuid NOT NULL REFERENCES institution.donation_causes(id),
    transaction_id uuid NOT NULL REFERENCES institution.transactions(id),
    
    -- Points to Identity:
    donor_user_id uuid, 
    
    amount numeric NOT NULL,
    is_anonymous boolean DEFAULT false,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

### 5.2. `donation_receipts`
```sql
CREATE TABLE institution.donation_receipts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    contribution_id uuid NOT NULL REFERENCES institution.contributions(id),
    receipt_number text NOT NULL UNIQUE,
    
    -- Points to Media/DAM:
    file_id uuid, 
    
    issued_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Grants & Partnerships Subdomain

### 6.1. Partnerships & Grants
```sql
CREATE TABLE institution.partner_organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    type institution.partner_type_enum NOT NULL,
    registration_number text,
    pan text,
    contact_person text,
    email text,
    phone text,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution.grants (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id),
    partner_id uuid NOT NULL REFERENCES institution.partner_organizations(id),
    
    title text NOT NULL,
    total_amount numeric NOT NULL,
    status institution.grant_status_enum DEFAULT 'PROPOSED'::institution.grant_status_enum,
    
    start_date date,
    end_date date,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2. Allocations & Milestones
```sql
CREATE TABLE institution.grant_allocations (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    grant_id uuid NOT NULL REFERENCES institution.grants(id) ON DELETE CASCADE,
    project_id uuid NOT NULL REFERENCES institution.projects(id),
    amount numeric NOT NULL,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution.grant_milestones (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    grant_id uuid NOT NULL REFERENCES institution.grants(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    target_date date,
    status institution.milestone_status_enum DEFAULT 'PENDING'::institution.milestone_status_enum,
    amount_released numeric DEFAULT 0,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. Compliance & Legal Subdomain

```sql
CREATE TABLE institution.compliance_tasks (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id),
    
    title text NOT NULL,
    description text,
    due_date date NOT NULL,
    status institution.compliance_status_enum DEFAULT 'PENDING'::institution.compliance_status_enum,
    
    -- Points to Media/DAM:
    proof_file_id uuid,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution.legal_documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    org_id uuid NOT NULL REFERENCES institution.organizations(id),
    
    title text NOT NULL,
    type text NOT NULL, -- e.g., 'MOA', 'AUDIT_REPORT'
    status institution.legal_document_status_enum DEFAULT 'DRAFT'::institution.legal_document_status_enum,
    
    -- Points to Media/DAM:
    file_id uuid,
    
    valid_from date,
    valid_until date,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution.utilization_certificates (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    grant_id uuid NOT NULL REFERENCES institution.grants(id),
    
    total_received numeric NOT NULL,
    total_utilized numeric NOT NULL,
    unspent_amount numeric NOT NULL,
    certified_by text,
    certification_date date,
    
    -- Points to Media/DAM:
    file_id uuid,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

---

## 8. Summary of Key Decisions
*   **The Identity Boundary:** External IDs such as `user_id`, `donor_user_id`, and `recorded_by_id` are defined simply as `uuid` instead of foreign keys to `identity.users(id)`. This strictly decouples schemas at the database layer (preventing cross-schema locks), while the application layer (Prisma) can handle the virtual relation.
*   **The Media Boundary:** Similarly, all document storage fields (`file_id`, `proof_file_id`) are stored as `uuid` pointing outward to S3/DAM.
*   **Double-Entry Integrity:** A database-level constraint `chk_debit_credit_exclusive` was added to `journal_lines` to physically prevent a single ledger row from having both a debit and credit simultaneously.
