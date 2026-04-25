-- =========================================================================
-- VEDIC INSTITUTIONAL OPERATING SYSTEM (VIOS) - THE ABSOLUTE TRUTH (V18 - FINAL UNABRIDGED)
-- =========================================================================
-- Created: 24 April 2026
-- Goal: The Absolute, Exhaustive, Unabridged DNA of the Entire Universe.
-- Restoration: Full Metadata, Full Enums, Full Constraints, Full Audit Readiness.
-- =========================================================================

-- 1. SYSTEM EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "ltree";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =========================================================================
-- 2. INSTITUTIONAL STATE MACHINES (ENUMS)
-- =========================================================================

-- Content & Wisdom
CREATE TYPE content_type_enum AS ENUM ('sutra', 'translation', 'commentary', 'purport', 'title', 'subtitle', 'colophon');
CREATE TYPE content_status_enum AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED', 'DELETED');
CREATE TYPE language_enum AS ENUM ('sa', 'en', 'hi', 'bn', 'ta', 'or', 'mr', 'gu');
CREATE TYPE script_enum AS ENUM ('devanagari', 'latin', 'bengali', 'tamil', 'oriya');
CREATE TYPE LibraryType AS ENUM ('BOOK', 'BOOKLET', 'ARTICLE', 'NEWSLETTER');

-- Identity & Spirit
CREATE TYPE user_status_enum AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED', 'ANONYMIZED');
CREATE TYPE user_role_enum AS ENUM ('student', 'mentor', 'teacher', 'coordinator', 'admin', 'donor', 'director', 'village_member', 'city_member', 'outreach_lead', 'volunteer', 'staff');
CREATE TYPE gender_enum AS ENUM ('male', 'female');
CREATE TYPE age_group_enum AS ENUM ('child_0_5', 'child_5_10', 'teen_10_18', 'youth_18_25', 'adult_25_40', 'mid_40_60', 'senior_60_plus');
CREATE TYPE purushartha_enum AS ENUM ('dharma', 'artha', 'kama', 'moksha');
CREATE TYPE inner_state_enum AS ENUM ('confused', 'seeking', 'stable', 'disturbed', 'detached');
CREATE TYPE svabhava_enum AS ENUM ('intellectual', 'administrative', 'creative', 'practical');
CREATE TYPE life_stage_enum AS ENUM ('student', 'unmarried', 'married', 'parent', 'vanaprastha', 'renunciate');
CREATE TYPE guidance_level_enum AS ENUM ('beginner', 'intermediate', 'advanced', 'teacher');
CREATE TYPE guidance_status_enum AS ENUM ('ACTIVE', 'COMPLETED', 'ON_HOLD', 'TERMINATED');
CREATE TYPE relationship_type_enum AS ENUM ('pitara', 'matara', 'sapinda', 'vaivahika', 'shishya', 'guru', 'prapautra', 'pautra', 'sahodara');
CREATE TYPE authority_status_enum AS ENUM ('guardian', 'dependant', 'karta', 'shakha_head');
CREATE TYPE assignment_type_enum AS ENUM ('mentor', 'teacher', 'coordinator');
CREATE TYPE vow_status_enum AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'BROKEN', 'REVOKED');

-- Finance & Operations
CREATE TYPE transaction_type_enum AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER', 'ADJUSTMENT', 'PAYROLL');
CREATE TYPE transaction_status_enum AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'FAILED');
CREATE TYPE payment_method_enum AS ENUM ('UPI', 'CASH', 'BANK_TRANSFER', 'CHEQUE');
CREATE TYPE contribution_type_enum AS ENUM ('FINANCIAL', 'IN_KIND', 'SERVICE');
CREATE TYPE compliance_status_enum AS ENUM ('UPCOMING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE', 'DELAYED');
CREATE TYPE project_status_enum AS ENUM ('PROPOSED', 'ACTIVE', 'COMPLETED', 'ON_HOLD', 'CANCELLED');
CREATE TYPE webhook_status_enum AS ENUM ('PENDING', 'PROCESSED', 'FAILED');
CREATE TYPE partner_type_enum AS ENUM ('CSR', 'NGO', 'GOVERNMENT', 'CORPORATE', 'VENDOR');
CREATE TYPE grant_status_enum AS ENUM ('PROPOSED', 'ACTIVE', 'COMPLETED', 'EXPIRED');
CREATE TYPE milestone_status_enum AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'VERIFIED');
CREATE TYPE asset_status_enum AS ENUM ('ACTIVE', 'MAINTENANCE', 'RETIRED', 'LOST', 'SOLD');
CREATE TYPE tax_type_enum AS ENUM ('GST', 'TDS', 'INCOME_TAX', 'OTHER');

-- Infrastructure
CREATE TYPE storage_provider_enum AS ENUM ('S3', 'R2', 'GCS', 'LOCAL');
CREATE TYPE file_category_enum AS ENUM ('RECEIPT', 'INVOICE', 'MEDIA', 'DOCUMENT', 'AVATAR', 'SHASTRA_SCAN', 'AGREEMENT', 'COMPLIANCE_REPORT', 'UC_CERTIFICATE', 'GALLERY_ITEM', 'TAX_CHALLAN');
CREATE TYPE communication_channel_enum AS ENUM ('EMAIL', 'SMS', 'WHATSAPP', 'PUSH', 'IN_APP');
CREATE TYPE communication_status_enum AS ENUM ('DRAFT', 'QUEUED', 'SENT', 'DELIVERED', 'FAILED', 'OPENED', 'CLICKED');
CREATE TYPE campaign_status_enum AS ENUM ('DRAFT', 'SCHEDULED', 'SENT', 'FAILED', 'CANCELLED');
CREATE TYPE integration_service_enum AS ENUM ('S3', 'R2', 'TWILIO', 'SENDGRID', 'RAZORPAY', 'STRIPE', 'GITA_API', 'TRANSLATION_ENGINE');
CREATE TYPE legal_document_status_enum AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED', 'EXPIRED', 'REVOKED');
CREATE TYPE document_permission_enum AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE');
CREATE TYPE circle_type_enum AS ENUM ('REGIONAL', 'STUDY_GROUP', 'MENTOR_CIRCLE');
CREATE TYPE circle_role_enum AS ENUM ('MEMBER', 'MODERATOR', 'MENTOR');
CREATE TYPE post_category_enum AS ENUM ('REALIZATION', 'QUESTION', 'ANNOUNCEMENT');
CREATE TYPE event_type_enum AS ENUM ('LIVE_SATSANG', 'WORKSHOP', 'GROUP_MEDITATION');
CREATE TYPE ticket_status_enum AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- =========================================================================
-- 3. PILLAR I: ORGANIZATIONAL FOUNDATION
-- =========================================================================

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES organizations(id),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    registration_no TEXT,
    pan TEXT,
    tan TEXT,
    address TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscription_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    level INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 4. PILLAR II: IDENTITY, SPIRIT & PARTNERSHIPS
-- =========================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    is_online BOOLEAN DEFAULT true,
    email_verified TIMESTAMP(3),
    roles user_role_enum[] DEFAULT ARRAY['student']::user_role_enum[],
    status user_status_enum NOT NULL DEFAULT 'ACTIVE',
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP(3),
    deleted_at TIMESTAMP(3),
    is_anonymized BOOLEAN DEFAULT false,
    anonymized_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP(3)
);

CREATE TABLE org_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    role TEXT NOT NULL,
    base_stipend DECIMAL DEFAULT 0,
    start_date TIMESTAMP(3),
    end_date TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partner_organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type partner_type_enum NOT NULL,
    registration_number TEXT,
    pan TEXT,
    tan TEXT,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    website TEXT,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partnerships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id),
    partner_id UUID NOT NULL REFERENCES partner_organizations(id),
    title TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status grant_status_enum DEFAULT 'ACTIVE',
    agreement_file_id UUID,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone_number TEXT,
    whatsapp_number TEXT,
    avatar_url TEXT,
    gender gender_enum,
    date_of_birth TIMESTAMP(3),
    village TEXT,
    city TEXT,
    state TEXT,
    pin_code TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spiritual_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    age_group age_group_enum,
    life_stage life_stage_enum,
    eligibility_level INTEGER NOT NULL DEFAULT 1,
    primary_focus purushartha_enum,
    inner_state inner_state_enum,
    nature svabhava_enum,
    subscription_tier_id UUID REFERENCES subscription_tiers(id) ON DELETE SET NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spiritual_vows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status vow_status_enum DEFAULT 'ACTIVE',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    notification_prefs JSONB DEFAULT '{"email": true, "whatsapp": false, "sms": false}',
    metadata JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_statistics (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    nodes_read_count INTEGER DEFAULT 0,
    courses_completed INTEGER DEFAULT 0,
    contribution_points INTEGER DEFAULT 0,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 5. PILLAR III: KNOWLEDGE & SCRIPTURE
-- =========================================================================

CREATE TABLE shastras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    structure_type TEXT NOT NULL,
    status content_status_enum NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    description TEXT,
    year_approx INTEGER,
    era TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shastra_id UUID NOT NULL REFERENCES shastras(id),
    parent_id UUID REFERENCES nodes(id),
    level TEXT NOT NULL,
    slug TEXT,
    order_index INTEGER DEFAULT 0,
    canonical_ref TEXT,
    path LTREE,
    status content_status_enum NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE texts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id UUID NOT NULL REFERENCES nodes(id),
    content_type content_type_enum NOT NULL,
    language language_enum NOT NULL,
    script script_enum NOT NULL,
    content TEXT NOT NULL,
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    is_primary BOOLEAN DEFAULT false,
    anchor_word TEXT,
    segment_order INTEGER,
    status content_status_enum NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE text_metadata (
    text_id UUID PRIMARY KEY REFERENCES texts(id) ON DELETE CASCADE,
    life_stages life_stage_enum[],
    guidance_levels guidance_level_enum[],
    is_sensitive BOOLEAN DEFAULT false
);

CREATE TABLE text_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text_id UUID NOT NULL REFERENCES texts(id) ON DELETE CASCADE,
    content TEXT,
    content_type content_type_enum,
    language language_enum,
    script script_enum,
    version_number INTEGER,
    updated_by TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE synonyms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text_id UUID NOT NULL REFERENCES texts(id),
    word TEXT NOT NULL,
    meaning TEXT,
    language language_enum,
    order_index INTEGER,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT,
    description TEXT,
    keywords TEXT[],
    type TEXT,
    parent_id UUID REFERENCES tags(id),
    sanskrit_name TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE node_tags (
    node_id UUID NOT NULL REFERENCES nodes(id),
    tag_id UUID NOT NULL REFERENCES tags(id),
    PRIMARY KEY (node_id, tag_id)
);

CREATE TABLE node_relations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_node_id UUID NOT NULL REFERENCES nodes(id),
    to_node_id UUID NOT NULL REFERENCES nodes(id),
    relation_type TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE text_embeddings (
    text_id UUID PRIMARY KEY REFERENCES texts(id) ON DELETE CASCADE,
    embedding VECTOR(384) NOT NULL,
    model TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 6. PILLAR IV: AUDIT-PROOF INSTITUTIONAL WEALTH (ERP GRADE)
-- =========================================================================

CREATE TABLE financial_periods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id),
    year_label TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_closed BOOLEAN DEFAULT false,
    closed_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    balance DECIMAL NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'INR',
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES financial_accounts(id),
    period_id UUID REFERENCES financial_periods(id),
    opening_balance DECIMAL,
    closing_balance DECIMAL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ledger_snapshot_unique UNIQUE (account_id, period_id)
);

CREATE TABLE donation_causes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id),
    parent_id UUID REFERENCES donation_causes(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    level INTEGER DEFAULT 0,
    path LTREE,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donation_cause_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cause_id UUID NOT NULL REFERENCES donation_causes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    suggested_amount DECIMAL CHECK (suggested_amount > 0),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    total_budget DECIMAL NOT NULL,
    status project_status_enum DEFAULT 'ACTIVE',
    cause_id UUID REFERENCES donation_causes(id),
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_budget_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    budget_amount DECIMAL NOT NULL CHECK (budget_amount >= 0),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE grants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partnership_id UUID NOT NULL REFERENCES partnerships(id),
    amount DECIMAL NOT NULL CHECK (amount > 0),
    currency TEXT DEFAULT 'INR',
    purpose TEXT,
    disbursement_type TEXT,
    status grant_status_enum DEFAULT 'ACTIVE',
    is_restricted BOOLEAN DEFAULT true,
    start_date DATE,
    end_date DATE,
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE grant_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grant_id UUID NOT NULL REFERENCES grants(id),
    project_id UUID REFERENCES projects(id),
    cause_id UUID REFERENCES donation_causes(id),
    allocated_amount DECIMAL NOT NULL CHECK (allocated_amount > 0),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE grant_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grant_id UUID NOT NULL REFERENCES grants(id),
    title TEXT NOT NULL,
    due_date DATE,
    amount DECIMAL NOT NULL CHECK (amount >= 0),
    status milestone_status_enum DEFAULT 'PENDING',
    completion_report_id UUID,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE utilization_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grant_id UUID NOT NULL REFERENCES grants(id) ON DELETE CASCADE,
    total_received DECIMAL NOT NULL,
    total_utilized DECIMAL NOT NULL,
    unspent_amount DECIMAL NOT NULL,
    certified_by TEXT,
    certification_date DATE,
    file_id UUID,
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compliance_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id),
    grant_id UUID REFERENCES grants(id),
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    due_date DATE NOT NULL,
    status compliance_status_enum DEFAULT 'UPCOMING',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    grant_id UUID REFERENCES grants(id),
    cause_id UUID REFERENCES donation_causes(id),
    project_id UUID REFERENCES projects(id),
    amount DECIMAL NOT NULL CHECK (amount > 0),
    type transaction_type_enum NOT NULL,
    date TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    source_account_id UUID REFERENCES financial_accounts(id),
    destination_account_id UUID REFERENCES financial_accounts(id),
    category TEXT NOT NULL,
    purpose TEXT NOT NULL,
    paymentMethod payment_method_enum NOT NULL,
    provider TEXT,
    external_payment_id TEXT,
    is_corpus BOOLEAN DEFAULT false,
    gst_applicable BOOLEAN DEFAULT false,
    tds_applicable BOOLEAN DEFAULT false,
    recorded_by_id UUID NOT NULL REFERENCES users(id),
    approved_by_id UUID REFERENCES users(id),
    status transaction_status_enum DEFAULT 'PENDING',
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tax_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    type tax_type_enum NOT NULL,
    amount DECIMAL NOT NULL CHECK (amount >= 0),
    challan_number TEXT,
    deducted_at DATE,
    filing_link TEXT,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id),
    transaction_id UUID REFERENCES transactions(id),
    entry_date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    created_by_id UUID REFERENCES users(id),
    approved_by_id UUID REFERENCES users(id),
    status transaction_status_enum DEFAULT 'PENDING',
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE journal_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES financial_accounts(id),
    debit DECIMAL DEFAULT 0 CHECK (debit >= 0),
    credit DECIMAL DEFAULT 0 CHECK (credit >= 0),
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT debit_or_credit_positive CHECK (debit > 0 OR credit > 0),
    CONSTRAINT not_both_positive CHECK (NOT (debit > 0 AND credit > 0))
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT,
    record_id UUID,
    transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
    module TEXT,
    action TEXT NOT NULL,
    performed_by_id UUID NOT NULL REFERENCES users(id),
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,
    device_info TEXT,
    timestamp TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    transaction_id UUID UNIQUE REFERENCES transactions(id) ON DELETE CASCADE,
    amount DECIMAL CHECK (amount > 0 OR amount IS NULL),
    type contribution_type_enum NOT NULL,
    purpose TEXT,
    cause_id UUID REFERENCES donation_causes(id),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    date TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    images TEXT[],
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 7. PILLAR V: INSTITUTIONAL ASSETS & PAYROLL
-- =========================================================================

CREATE TABLE physical_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    purchase_date DATE,
    purchase_cost DECIMAL,
    current_value DECIMAL,
    status asset_status_enum DEFAULT 'ACTIVE',
    location TEXT,
    qr_code TEXT UNIQUE,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_member_id UUID NOT NULL REFERENCES org_members(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES transactions(id),
    period_id UUID NOT NULL REFERENCES financial_periods(id),
    amount DECIMAL NOT NULL,
    type TEXT DEFAULT 'STIPEND',
    status TEXT DEFAULT 'PENDING',
    paid_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 8. PILLAR VI: WISDOM DISTRIBUTION (LIBRARY)
-- =========================================================================

CREATE TABLE file_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    uploaded_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_type TEXT,
    mime_type TEXT,
    storage_provider storage_provider_enum NOT NULL,
    object_key TEXT NOT NULL,
    file_url TEXT NOT NULL,
    access_url TEXT,
    file_size BIGINT,
    checksum TEXT,
    category file_category_enum NOT NULL,
    security_level TEXT DEFAULT 'PRIVATE',
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Fix partnership/grant/UC dependencies
ALTER TABLE partnerships ADD CONSTRAINT fk_agreement_file FOREIGN KEY (agreement_file_id) REFERENCES file_assets(id);
ALTER TABLE grant_milestones ADD CONSTRAINT fk_report_file FOREIGN KEY (completion_report_id) REFERENCES file_assets(id);
ALTER TABLE utilization_certificates ADD CONSTRAINT fk_uc_file FOREIGN KEY (file_id) REFERENCES file_assets(id);

CREATE TABLE library_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    type LibraryType NOT NULL,
    language language_enum,
    author TEXT,
    published_at TIMESTAMP(3),
    file_id UUID NOT NULL UNIQUE REFERENCES file_assets(id),
    thumbnail_url TEXT,
    tags TEXT[],
    keywords TEXT[],
    required_role user_role_enum[],
    required_tier UUID REFERENCES subscription_tiers(id),
    is_public BOOLEAN DEFAULT true,
    is_downloadable BOOLEAN DEFAULT true,
    deleted_at TIMESTAMP(3),
    created_by_id UUID REFERENCES users(id),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE library_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    library_item_id UUID NOT NULL REFERENCES library_items(id) ON DELETE CASCADE,
    file_id UUID NOT NULL REFERENCES file_assets(id),
    version_number INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE library_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    library_item_id UUID NOT NULL REFERENCES library_items(id) ON DELETE CASCADE,
    downloaded_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donation_receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL UNIQUE REFERENCES transactions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    receipt_number TEXT UNIQUE NOT NULL,
    amount DECIMAL NOT NULL,
    pan_number TEXT,
    donor_name TEXT,
    is_80g_applicable BOOLEAN DEFAULT true,
    file_id UUID UNIQUE REFERENCES file_assets(id),
    status TEXT DEFAULT 'GENERATED',
    issued_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
    library_item_id UUID REFERENCES library_items(id) ON DELETE SET NULL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partner_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partnership_id UUID NOT NULL REFERENCES partnerships(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL,
    file_id UUID NOT NULL REFERENCES file_assets(id),
    period_start DATE,
    period_end DATE,
    submitted_at TIMESTAMP(3),
    deleted_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partner_report_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES partner_reports(id) ON DELETE CASCADE,
    file_id UUID NOT NULL REFERENCES file_assets(id),
    version_number INTEGER NOT NULL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE communication_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    target_partner_id UUID REFERENCES partner_organizations(id),
    target_org_id UUID REFERENCES organizations(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL,
    status campaign_status_enum DEFAULT 'DRAFT',
    target_tier_id UUID REFERENCES subscription_tiers(id) ON DELETE SET NULL,
    language language_enum,
    scheduled_at TIMESTAMP(3),
    sent_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE communication_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    partner_id UUID REFERENCES partner_organizations(id) ON DELETE SET NULL,
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES communication_campaigns(id) ON DELETE SET NULL,
    library_item_id UUID REFERENCES library_items(id) ON DELETE SET NULL,
    channel communication_channel_enum NOT NULL,
    recipient TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    status communication_status_enum DEFAULT 'SENT',
    external_id TEXT,
    provider TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "_CommunicationCampaignToLibraryItem" (
    "A" UUID NOT NULL REFERENCES communication_campaigns(id) ON DELETE CASCADE,
    "B" UUID NOT NULL REFERENCES library_items(id) ON DELETE CASCADE,
    PRIMARY KEY ("A", "B")
);

-- =========================================================================
-- 9. PILLAR VII: HERITAGE & ANCESTRY
-- =========================================================================

CREATE TABLE family_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    origin_place TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE family_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    parent_id UUID REFERENCES family_nodes(id) ON DELETE SET NULL,
    family_group_id UUID REFERENCES family_groups(id) ON DELETE CASCADE,
    path LTREE,
    level INTEGER,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE family_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    related_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type relationship_type_enum NOT NULL,
    notes TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT family_links_unique UNIQUE (user_id, related_id, type)
);

-- =========================================================================
-- 10. PILLAR VIII: COMMUNITY & LEARNING
-- =========================================================================

CREATE TABLE guidance_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES users(id),
    student_id UUID NOT NULL REFERENCES users(id),
    assignment_type assignment_type_enum NOT NULL,
    subject TEXT,
    status guidance_status_enum DEFAULT 'ACTIVE',
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT guidance_unique UNIQUE (guide_id, student_id, assignment_type)
);

CREATE TABLE guidance_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES guidance_assignments(id) ON DELETE CASCADE,
    topic TEXT,
    summary_notes TEXT,
    session_date TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_curves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    target_life_stages life_stage_enum[],
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_curve_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curve_id UUID NOT NULL REFERENCES learning_curves(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    title TEXT NOT NULL,
    node_id UUID REFERENCES nodes(id) ON DELETE SET NULL,
    unlock_requirement JSONB,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT step_order_unique UNIQUE (curve_id, step_order)
);

CREATE TABLE user_curve_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    curve_id UUID NOT NULL REFERENCES learning_curves(id) ON DELETE CASCADE,
    current_step_id UUID REFERENCES learning_curve_steps(id) ON DELETE SET NULL,
    is_completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP(3),
    CONSTRAINT user_curve_unique UNIQUE (user_id, curve_id)
);

CREATE TABLE circles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    type circle_type_enum DEFAULT 'REGIONAL',
    member_count INTEGER DEFAULT 0,
    mentor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE circle_members (
    user_id UUID NOT NULL REFERENCES users(id),
    circle_id UUID NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
    role circle_role_enum DEFAULT 'MEMBER',
    joined_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, circle_id)
);

CREATE TABLE circle_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    circle_id UUID NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    category post_category_enum DEFAULT 'REALIZATION',
    likes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vedic_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    host_id UUID NOT NULL REFERENCES users(id),
    start_time TIMESTAMP(3) NOT NULL,
    end_time TIMESTAMP(3) NOT NULL,
    type event_type_enum DEFAULT 'LIVE_SATSANG',
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_registrations (
    user_id UUID NOT NULL REFERENCES users(id),
    event_id UUID NOT NULL REFERENCES vedic_events(id) ON DELETE CASCADE,
    registered_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id)
);

CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status ticket_status_enum DEFAULT 'OPEN',
    priority TEXT DEFAULT 'MEDIUM',
    assigned_to_id UUID REFERENCES users(id),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 11. PILLAR IX: LEGAL, COMPLIANCE & INTEGRATIONS
-- =========================================================================

CREATE TABLE legal_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    status legal_document_status_enum DEFAULT 'ACTIVE',
    created_by_id UUID REFERENCES users(id),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    change_note TEXT,
    created_by_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE secure_share_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id),
    token TEXT UNIQUE NOT NULL,
    purpose TEXT,
    expires_at TIMESTAMP(3) NOT NULL,
    access_count INTEGER DEFAULT 0,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE secure_share_link_documents (
    link_id UUID NOT NULL REFERENCES secure_share_links(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES legal_documents(id),
    access_level document_permission_enum DEFAULT 'READ',
    PRIMARY KEY (link_id, document_id)
);

CREATE TABLE external_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    service integration_service_enum NOT NULL,
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP,
    last_error TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID UNIQUE REFERENCES transactions(id) ON DELETE SET NULL,
    provider TEXT NOT NULL,
    external_id TEXT NOT NULL,
    amount DECIMAL NOT NULL CHECK (amount > 0),
    currency TEXT DEFAULT 'INR',
    status TEXT NOT NULL,
    raw_data JSONB,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL,
    event_type TEXT NOT NULL,
    external_id TEXT NOT NULL,
    payload JSONB NOT NULL,
    status webhook_status_enum DEFAULT 'PENDING',
    processed_at TIMESTAMP(3),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 12. INSTITUTIONAL HARDENING (FINAL SHIELD)
-- =========================================================================

-- Journal Balance Verification
CREATE OR REPLACE FUNCTION verify_journal_approval()
RETURNS TRIGGER AS $$
DECLARE
    total_debit DECIMAL;
    total_credit DECIMAL;
BEGIN
    IF NEW.status = 'APPROVED' THEN
        SELECT COALESCE(SUM(debit),0), COALESCE(SUM(credit),0) INTO total_debit, total_credit
        FROM journal_lines WHERE journal_id = NEW.id;
        
        IF total_debit = 0 OR total_debit != total_credit THEN
            RAISE EXCEPTION 'PERMISSION_DENIED: Unbalanced or empty journal entry.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_journal_balance_check
BEFORE UPDATE ON journal_entries
FOR EACH ROW EXECUTE FUNCTION verify_journal_approval();

-- Period Lock Enforcement
CREATE OR REPLACE FUNCTION protect_closed_periods()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT is_closed FROM financial_periods WHERE NEW.date BETWEEN start_date AND end_date AND org_id = NEW.org_id) THEN
        RAISE EXCEPTION 'PERMISSION_DENIED: Cannot modify transactions in a closed financial period.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_period_lock
BEFORE INSERT OR UPDATE OR DELETE ON transactions
FOR EACH ROW EXECUTE FUNCTION protect_closed_periods();

-- Ledger Protection
CREATE OR REPLACE FUNCTION protect_immutable_ledger()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status = 'APPROVED' THEN
        RAISE EXCEPTION 'PERMISSION_DENIED: Cannot modify an approved transaction.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_immutable_ledger
BEFORE UPDATE OR DELETE ON transactions
FOR EACH ROW EXECUTE FUNCTION protect_immutable_ledger();

-- Automated Auditing
CREATE OR REPLACE FUNCTION log_transaction_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (table_name, record_id, transaction_id, module, action, performed_by_id, old_data, new_data)
    VALUES (TG_TABLE_NAME, OLD.id, CASE WHEN TG_TABLE_NAME = 'transactions' THEN OLD.id ELSE NULL END, 'FINANCE', TG_OP, NEW.recorded_by_id, row_to_json(OLD), row_to_json(NEW));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_transaction_audit
AFTER UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION log_transaction_change();

-- Performance Indices
CREATE INDEX idx_users_active ON users (id) WHERE status = 'ACTIVE' AND deleted_at IS NULL;
CREATE INDEX idx_nodes_path ON nodes USING GIST (path);
CREATE INDEX idx_family_path ON family_nodes USING GIST (path);
CREATE INDEX idx_causes_path ON donation_causes USING GIST (path);
CREATE INDEX idx_node_tags_node ON node_tags (node_id);
CREATE INDEX idx_node_tags_tag ON node_tags (tag_id);
CREATE INDEX idx_node_rel_from ON node_relations (from_node_id);
CREATE INDEX idx_node_rel_to ON node_relations (to_node_id);
CREATE INDEX idx_transactions_cause ON transactions (cause_id);
CREATE INDEX idx_transactions_grant ON transactions (grant_id) WHERE grant_id IS NOT NULL;
CREATE INDEX idx_milestones_due ON grant_milestones (due_date) WHERE status = 'PENDING';
CREATE INDEX idx_budget_project ON project_budget_lines (project_id);
CREATE INDEX idx_asset_qr ON physical_assets (qr_code);

-- Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE physical_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_records ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- END OF VEDIC INSTITUTIONAL MASTER BLUEPRINT (V18 - THE ABSOLUTE FINAL)
-- =========================================================================


-- Updates for Paletinum level upgraddes 


DROP TYPE content_type_enum;

CREATE TYPE content_type_enum AS ENUM (

-- 🌱 ROOT TEXT (Absolute)
'mula',

-- 🌳 PRIMARY COMMENTARY (Paramparā-level)
'bhashya',

-- 🌿 SECONDARY COMMENTARY
'tika',
'tippani',

-- 🔍 ANALYTICAL LAYERS
'shabdartha',     -- word-by-word
'anvaya',         -- grammatical order
'padaccheda',     -- word splitting (NEW)
'vigraha',        -- compound breakdown (NEW)

-- 🧠 INTERPRETIVE LAYERS
'bhavartha',      -- essence meaning
'tatparya',       -- philosophical intent
'arthavistara',   -- expanded meaning (NEW)

-- 📖 EXPLANATORY LAYERS
'vivarana',       -- detailed exposition
'vyakhyana',      -- general explanation
'tippani_extended', -- longer notes (NEW, optional nuance)

-- 🌐 TRANSLATION LAYERS
'anuvada',        -- faithful translation
'bhasantara',     -- contextual/free translation
'bhavanuvada',    -- interpretive translation (NEW)

-- 🧩 STRUCTURED STUDY AIDS
'sutra_summary',  -- summary of section (NEW)
'key_points',     -- extracted teachings (NEW)

-- 🏷️ META TEXT
'shirshaka',      -- title
'upashirshaka',   -- subtitle
'pushpika'        -- colophon
);