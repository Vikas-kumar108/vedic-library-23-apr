--
-- PostgreSQL database dump
--

\restrict szKrLg0NH3G2uOaikPGl0qVYgLsySyQke8heoonkajEjzRpxy0xouXDirChyn5B

-- Dumped from database version 17.8 (130b160)
-- Dumped by pg_dump version 17.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO neondb_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: neondb_owner
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: age_group_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.age_group_enum AS ENUM (
    'child_0_5',
    'child_5_10',
    'teen_10_18',
    'youth_18_25',
    'adult_25_40',
    'mid_40_60',
    'senior_60_plus'
);


ALTER TYPE public.age_group_enum OWNER TO neondb_owner;

--
-- Name: asset_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.asset_status_enum AS ENUM (
    'ACTIVE',
    'MAINTENANCE',
    'RETIRED',
    'LOST',
    'SOLD'
);


ALTER TYPE public.asset_status_enum OWNER TO neondb_owner;

--
-- Name: assignment_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.assignment_type_enum AS ENUM (
    'mentor',
    'teacher',
    'coordinator'
);


ALTER TYPE public.assignment_type_enum OWNER TO neondb_owner;

--
-- Name: authority_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.authority_status_enum AS ENUM (
    'guardian',
    'dependant',
    'karta',
    'shakha_head'
);


ALTER TYPE public.authority_status_enum OWNER TO neondb_owner;

--
-- Name: campaign_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.campaign_status_enum AS ENUM (
    'DRAFT',
    'SCHEDULED',
    'SENT',
    'FAILED',
    'CANCELLED'
);


ALTER TYPE public.campaign_status_enum OWNER TO neondb_owner;

--
-- Name: circle_role_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.circle_role_enum AS ENUM (
    'MEMBER',
    'MODERATOR',
    'MENTOR'
);


ALTER TYPE public.circle_role_enum OWNER TO neondb_owner;

--
-- Name: circle_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.circle_type_enum AS ENUM (
    'REGIONAL',
    'STUDY_GROUP',
    'MENTOR_CIRCLE'
);


ALTER TYPE public.circle_type_enum OWNER TO neondb_owner;

--
-- Name: communication_channel_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.communication_channel_enum AS ENUM (
    'EMAIL',
    'SMS',
    'WHATSAPP',
    'PUSH',
    'IN_APP'
);


ALTER TYPE public.communication_channel_enum OWNER TO neondb_owner;

--
-- Name: communication_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.communication_status_enum AS ENUM (
    'DRAFT',
    'QUEUED',
    'SENT',
    'DELIVERED',
    'FAILED',
    'OPENED',
    'CLICKED'
);


ALTER TYPE public.communication_status_enum OWNER TO neondb_owner;

--
-- Name: compliance_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.compliance_status_enum AS ENUM (
    'UPCOMING',
    'IN_PROGRESS',
    'COMPLETED',
    'OVERDUE',
    'DELAYED'
);


ALTER TYPE public.compliance_status_enum OWNER TO neondb_owner;

--
-- Name: content_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.content_status_enum AS ENUM (
    'DRAFT',
    'ACTIVE',
    'ARCHIVED',
    'DELETED'
);


ALTER TYPE public.content_status_enum OWNER TO neondb_owner;

--
-- Name: content_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.content_type_enum AS ENUM (
    'sutra',
    'shloka',
    'mantra',
    'vachana',
    'anuvada',
    'vyakhyana',
    'bhashya',
    'tatparya',
    'tika',
    'shirshaka',
    'upashirshaka',
    'pushpika',
    'title',
    'translation',
    'transliteration',
    'bhasantara',
    'bhavanuvada',
    'padaccheda',
    'vigraha',
    'arthavistara',
    'tippani_extended',
    'sutra_summary',
    'key_points',
    'mula'
);


ALTER TYPE public.content_type_enum OWNER TO neondb_owner;

--
-- Name: contribution_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.contribution_type_enum AS ENUM (
    'FINANCIAL',
    'IN_KIND',
    'SERVICE'
);


ALTER TYPE public.contribution_type_enum OWNER TO neondb_owner;

--
-- Name: document_permission_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.document_permission_enum AS ENUM (
    'READ',
    'WRITE',
    'DELETE',
    'SHARE'
);


ALTER TYPE public.document_permission_enum OWNER TO neondb_owner;

--
-- Name: event_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.event_type_enum AS ENUM (
    'LIVE_SATSANG',
    'WORKSHOP',
    'GROUP_MEDITATION'
);


ALTER TYPE public.event_type_enum OWNER TO neondb_owner;

--
-- Name: file_category_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.file_category_enum AS ENUM (
    'RECEIPT',
    'INVOICE',
    'MEDIA',
    'DOCUMENT',
    'AVATAR',
    'SHASTRA_SCAN',
    'AGREEMENT',
    'COMPLIANCE_REPORT',
    'UC_CERTIFICATE',
    'GALLERY_ITEM',
    'TAX_CHALLAN'
);


ALTER TYPE public.file_category_enum OWNER TO neondb_owner;

--
-- Name: gender_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.gender_enum AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.gender_enum OWNER TO neondb_owner;

--
-- Name: grant_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.grant_status_enum AS ENUM (
    'PROPOSED',
    'ACTIVE',
    'COMPLETED',
    'EXPIRED'
);


ALTER TYPE public.grant_status_enum OWNER TO neondb_owner;

--
-- Name: guidance_level_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.guidance_level_enum AS ENUM (
    'beginner',
    'intermediate',
    'advanced',
    'teacher'
);


ALTER TYPE public.guidance_level_enum OWNER TO neondb_owner;

--
-- Name: guidance_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.guidance_status_enum AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'ON_HOLD',
    'TERMINATED'
);


ALTER TYPE public.guidance_status_enum OWNER TO neondb_owner;

--
-- Name: inner_state_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.inner_state_enum AS ENUM (
    'confused',
    'seeking',
    'stable',
    'disturbed',
    'detached'
);


ALTER TYPE public.inner_state_enum OWNER TO neondb_owner;

--
-- Name: integration_service_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.integration_service_enum AS ENUM (
    'S3',
    'R2',
    'TWILIO',
    'SENDGRID',
    'RAZORPAY',
    'STRIPE',
    'GITA_API',
    'TRANSLATION_ENGINE'
);


ALTER TYPE public.integration_service_enum OWNER TO neondb_owner;

--
-- Name: language_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.language_enum AS ENUM (
    'sa',
    'en',
    'hi',
    'bn',
    'ta',
    'or',
    'mr',
    'gu'
);


ALTER TYPE public.language_enum OWNER TO neondb_owner;

--
-- Name: legal_document_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.legal_document_status_enum AS ENUM (
    'DRAFT',
    'ACTIVE',
    'ARCHIVED',
    'EXPIRED',
    'REVOKED'
);


ALTER TYPE public.legal_document_status_enum OWNER TO neondb_owner;

--
-- Name: librarytype; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.librarytype AS ENUM (
    'BOOK',
    'BOOKLET',
    'ARTICLE',
    'NEWSLETTER'
);


ALTER TYPE public.librarytype OWNER TO neondb_owner;

--
-- Name: life_stage_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.life_stage_enum AS ENUM (
    'student',
    'unmarried',
    'married',
    'parent',
    'vanaprastha',
    'renunciate'
);


ALTER TYPE public.life_stage_enum OWNER TO neondb_owner;

--
-- Name: milestone_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.milestone_status_enum AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'VERIFIED'
);


ALTER TYPE public.milestone_status_enum OWNER TO neondb_owner;

--
-- Name: partner_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.partner_type_enum AS ENUM (
    'CSR',
    'NGO',
    'GOVERNMENT',
    'CORPORATE',
    'VENDOR'
);


ALTER TYPE public.partner_type_enum OWNER TO neondb_owner;

--
-- Name: payment_method_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.payment_method_enum AS ENUM (
    'UPI',
    'CASH',
    'BANK_TRANSFER',
    'CHEQUE'
);


ALTER TYPE public.payment_method_enum OWNER TO neondb_owner;

--
-- Name: post_category_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.post_category_enum AS ENUM (
    'REALIZATION',
    'QUESTION',
    'ANNOUNCEMENT'
);


ALTER TYPE public.post_category_enum OWNER TO neondb_owner;

--
-- Name: project_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.project_status_enum AS ENUM (
    'PROPOSED',
    'ACTIVE',
    'COMPLETED',
    'ON_HOLD',
    'CANCELLED'
);


ALTER TYPE public.project_status_enum OWNER TO neondb_owner;

--
-- Name: purushartha_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.purushartha_enum AS ENUM (
    'dharma',
    'artha',
    'kama',
    'moksha'
);


ALTER TYPE public.purushartha_enum OWNER TO neondb_owner;

--
-- Name: relationship_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.relationship_type_enum AS ENUM (
    'pitara',
    'matara',
    'sapinda',
    'vaivahika',
    'shishya',
    'guru',
    'prapautra',
    'pautra',
    'sahodara'
);


ALTER TYPE public.relationship_type_enum OWNER TO neondb_owner;

--
-- Name: script_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.script_enum AS ENUM (
    'devanagari',
    'latin',
    'bengali',
    'tamil',
    'oriya'
);


ALTER TYPE public.script_enum OWNER TO neondb_owner;

--
-- Name: storage_provider_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.storage_provider_enum AS ENUM (
    'S3',
    'R2',
    'GCS',
    'LOCAL'
);


ALTER TYPE public.storage_provider_enum OWNER TO neondb_owner;

--
-- Name: svabhava_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.svabhava_enum AS ENUM (
    'intellectual',
    'administrative',
    'creative',
    'practical'
);


ALTER TYPE public.svabhava_enum OWNER TO neondb_owner;

--
-- Name: ticket_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.ticket_status_enum AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'RESOLVED',
    'CLOSED'
);


ALTER TYPE public.ticket_status_enum OWNER TO neondb_owner;

--
-- Name: transaction_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.transaction_status_enum AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'FAILED'
);


ALTER TYPE public.transaction_status_enum OWNER TO neondb_owner;

--
-- Name: transaction_type_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.transaction_type_enum AS ENUM (
    'INCOME',
    'EXPENSE',
    'TRANSFER',
    'ADJUSTMENT',
    'PAYROLL'
);


ALTER TYPE public.transaction_type_enum OWNER TO neondb_owner;

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.user_role_enum AS ENUM (
    'student',
    'mentor',
    'teacher',
    'coordinator',
    'admin',
    'donor',
    'director',
    'village_member',
    'city_member',
    'outreach_lead',
    'volunteer',
    'staff'
);


ALTER TYPE public.user_role_enum OWNER TO neondb_owner;

--
-- Name: user_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.user_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED',
    'DELETED',
    'ANONYMIZED'
);


ALTER TYPE public.user_status_enum OWNER TO neondb_owner;

--
-- Name: vow_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.vow_status_enum AS ENUM (
    'PENDING',
    'ACTIVE',
    'COMPLETED',
    'BROKEN',
    'REVOKED'
);


ALTER TYPE public.vow_status_enum OWNER TO neondb_owner;

--
-- Name: webhook_status_enum; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.webhook_status_enum AS ENUM (
    'PENDING',
    'PROCESSED',
    'FAILED'
);


ALTER TYPE public.webhook_status_enum OWNER TO neondb_owner;

--
-- Name: handle_milestone_completion(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.handle_milestone_completion() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED' THEN
        -- Notify institutional admin to record disbursement
        INSERT INTO audit_logs (org_id, user_id, action, entity_type, entity_id, new_data)
        VALUES (
            (SELECT org_id FROM partnerships WHERE id = NEW.partnership_id),
            NULL, -- System Action
            'MILESTONE_COMPLETED_DISBURSEMENT_PENDING',
            'GRANT_MILESTONE',
            NEW.id,
            jsonb_build_object('milestone_title', NEW.title, 'amount', NEW.amount)
        );
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_milestone_completion() OWNER TO neondb_owner;

--
-- Name: log_transaction_change(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.log_transaction_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO audit_logs (table_name, record_id, transaction_id, module, action, performed_by_id, old_data, new_data)
    VALUES (TG_TABLE_NAME, OLD.id, CASE WHEN TG_TABLE_NAME = 'transactions' THEN OLD.id ELSE NULL END, 'FINANCE', TG_OP, NEW.recorded_by_id, row_to_json(OLD), row_to_json(NEW));
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.log_transaction_change() OWNER TO neondb_owner;

--
-- Name: protect_closed_periods(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.protect_closed_periods() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF (SELECT is_closed FROM financial_periods WHERE NEW.date BETWEEN start_date AND end_date AND org_id = NEW.org_id) THEN
        RAISE EXCEPTION 'PERMISSION_DENIED: Cannot modify transactions in a closed financial period.';
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.protect_closed_periods() OWNER TO neondb_owner;

--
-- Name: protect_immutable_ledger(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.protect_immutable_ledger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF OLD.status = 'APPROVED' THEN
        RAISE EXCEPTION 'PERMISSION_DENIED: Cannot modify an approved transaction.';
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.protect_immutable_ledger() OWNER TO neondb_owner;

--
-- Name: verify_journal_approval(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.verify_journal_approval() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.verify_journal_approval() OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _CommunicationCampaignToLibraryItem; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."_CommunicationCampaignToLibraryItem" (
    "A" uuid NOT NULL,
    "B" uuid NOT NULL
);


ALTER TABLE public."_CommunicationCampaignToLibraryItem" OWNER TO neondb_owner;

--
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.activity_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    images text[],
    project_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.activity_logs OWNER TO neondb_owner;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.audit_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    table_name text,
    record_id uuid,
    transaction_id uuid,
    module text,
    action text NOT NULL,
    performed_by_id uuid NOT NULL,
    old_data jsonb,
    new_data jsonb,
    ip_address text,
    device_info text,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO neondb_owner;

--
-- Name: circle_members; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.circle_members (
    user_id uuid NOT NULL,
    circle_id uuid NOT NULL,
    role public.circle_role_enum DEFAULT 'MEMBER'::public.circle_role_enum,
    joined_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.circle_members OWNER TO neondb_owner;

--
-- Name: circle_posts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.circle_posts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    circle_id uuid NOT NULL,
    author_id uuid NOT NULL,
    content text NOT NULL,
    category public.post_category_enum DEFAULT 'REALIZATION'::public.post_category_enum,
    likes integer DEFAULT 0,
    replies integer DEFAULT 0,
    is_pinned boolean DEFAULT false,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.circle_posts OWNER TO neondb_owner;

--
-- Name: circles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.circles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    type public.circle_type_enum DEFAULT 'REGIONAL'::public.circle_type_enum,
    member_count integer DEFAULT 0,
    mentor_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.circles OWNER TO neondb_owner;

--
-- Name: communication_campaigns; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.communication_campaigns (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    target_partner_id uuid,
    target_org_id uuid,
    title text NOT NULL,
    content text NOT NULL,
    type text NOT NULL,
    status public.campaign_status_enum DEFAULT 'DRAFT'::public.campaign_status_enum,
    target_tier_id uuid,
    language public.language_enum,
    scheduled_at timestamp(3) without time zone,
    sent_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.communication_campaigns OWNER TO neondb_owner;

--
-- Name: communication_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.communication_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    partner_id uuid,
    org_id uuid,
    campaign_id uuid,
    library_item_id uuid,
    channel public.communication_channel_enum NOT NULL,
    recipient text NOT NULL,
    subject text,
    message text,
    status public.communication_status_enum DEFAULT 'SENT'::public.communication_status_enum,
    external_id text,
    provider text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.communication_logs OWNER TO neondb_owner;

--
-- Name: compliance_tasks; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.compliance_tasks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    due_date date NOT NULL,
    status public.compliance_status_enum DEFAULT 'UPCOMING'::public.compliance_status_enum,
    assigned_to uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.compliance_tasks OWNER TO neondb_owner;

--
-- Name: contributions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.contributions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    user_id uuid NOT NULL,
    transaction_id uuid,
    amount numeric,
    type public.contribution_type_enum NOT NULL,
    purpose text,
    cause_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT contributions_amount_check CHECK (((amount > (0)::numeric) OR (amount IS NULL)))
);


ALTER TABLE public.contributions OWNER TO neondb_owner;

--
-- Name: document_versions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.document_versions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    document_id uuid NOT NULL,
    file_url text NOT NULL,
    version_number integer NOT NULL,
    change_note text,
    created_by_id uuid NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.document_versions OWNER TO neondb_owner;

--
-- Name: donation_cause_options; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.donation_cause_options (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cause_id uuid NOT NULL,
    name text NOT NULL,
    suggested_amount numeric,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT donation_cause_options_suggested_amount_check CHECK ((suggested_amount > (0)::numeric))
);


ALTER TABLE public.donation_cause_options OWNER TO neondb_owner;

--
-- Name: donation_causes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.donation_causes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    parent_id uuid,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    level integer DEFAULT 0,
    path public.ltree,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.donation_causes OWNER TO neondb_owner;

--
-- Name: donation_receipts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.donation_receipts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    transaction_id uuid NOT NULL,
    user_id uuid NOT NULL,
    receipt_number text NOT NULL,
    amount numeric NOT NULL,
    pan_number text,
    donor_name text,
    is_80g_applicable boolean DEFAULT true,
    file_id uuid,
    status text DEFAULT 'GENERATED'::text,
    issued_by_id uuid,
    library_item_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.donation_receipts OWNER TO neondb_owner;

--
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.event_registrations (
    user_id uuid NOT NULL,
    event_id uuid NOT NULL,
    registered_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.event_registrations OWNER TO neondb_owner;

--
-- Name: external_integrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.external_integrations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid,
    service public.integration_service_enum NOT NULL,
    config jsonb DEFAULT '{}'::jsonb,
    is_active boolean DEFAULT true,
    last_used_at timestamp without time zone,
    last_error text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.external_integrations OWNER TO neondb_owner;

--
-- Name: family_groups; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.family_groups (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text,
    origin_place text,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.family_groups OWNER TO neondb_owner;

--
-- Name: family_links; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.family_links (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    related_id uuid NOT NULL,
    type public.relationship_type_enum NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.family_links OWNER TO neondb_owner;

--
-- Name: family_nodes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.family_nodes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    parent_id uuid,
    family_group_id uuid,
    path public.ltree,
    level integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.family_nodes OWNER TO neondb_owner;

--
-- Name: file_assets; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.file_assets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    uploaded_by_id uuid,
    file_name text NOT NULL,
    file_type text,
    mime_type text,
    storage_provider public.storage_provider_enum NOT NULL,
    object_key text NOT NULL,
    file_url text NOT NULL,
    access_url text,
    file_size bigint,
    checksum text,
    category public.file_category_enum NOT NULL,
    security_level text DEFAULT 'PRIVATE'::text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.file_assets OWNER TO neondb_owner;

--
-- Name: financial_accounts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.financial_accounts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    balance numeric DEFAULT 0 NOT NULL,
    currency text DEFAULT 'INR'::text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.financial_accounts OWNER TO neondb_owner;

--
-- Name: financial_periods; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.financial_periods (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    year_label text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    is_closed boolean DEFAULT false,
    closed_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.financial_periods OWNER TO neondb_owner;

--
-- Name: grant_allocations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.grant_allocations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    grant_id uuid NOT NULL,
    project_id uuid,
    cause_id uuid,
    allocated_amount numeric NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT grant_allocations_allocated_amount_check CHECK ((allocated_amount > (0)::numeric))
);


ALTER TABLE public.grant_allocations OWNER TO neondb_owner;

--
-- Name: grant_milestones; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.grant_milestones (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    grant_id uuid NOT NULL,
    title text NOT NULL,
    due_date date,
    amount numeric NOT NULL,
    status public.milestone_status_enum DEFAULT 'PENDING'::public.milestone_status_enum,
    completion_report_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT grant_milestones_amount_check CHECK ((amount >= (0)::numeric))
);


ALTER TABLE public.grant_milestones OWNER TO neondb_owner;

--
-- Name: grants; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.grants (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    partnership_id uuid NOT NULL,
    amount numeric NOT NULL,
    currency text DEFAULT 'INR'::text,
    purpose text,
    disbursement_type text,
    status public.grant_status_enum DEFAULT 'ACTIVE'::public.grant_status_enum,
    is_restricted boolean DEFAULT true,
    start_date date,
    end_date date,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT grants_amount_check CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.grants OWNER TO neondb_owner;

--
-- Name: guidance_assignments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.guidance_assignments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    guide_id uuid NOT NULL,
    student_id uuid NOT NULL,
    assignment_type public.assignment_type_enum NOT NULL,
    subject text,
    status public.guidance_status_enum DEFAULT 'ACTIVE'::public.guidance_status_enum,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.guidance_assignments OWNER TO neondb_owner;

--
-- Name: guidance_sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.guidance_sessions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    assignment_id uuid NOT NULL,
    topic text,
    summary_notes text,
    session_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.guidance_sessions OWNER TO neondb_owner;

--
-- Name: journal_entries; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.journal_entries (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    transaction_id uuid,
    entry_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text,
    created_by_id uuid,
    approved_by_id uuid,
    status public.transaction_status_enum DEFAULT 'PENDING'::public.transaction_status_enum,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.journal_entries OWNER TO neondb_owner;

--
-- Name: journal_lines; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.journal_lines (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    journal_id uuid NOT NULL,
    account_id uuid NOT NULL,
    debit numeric DEFAULT 0,
    credit numeric DEFAULT 0,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT debit_or_credit_positive CHECK (((debit > (0)::numeric) OR (credit > (0)::numeric))),
    CONSTRAINT journal_lines_credit_check CHECK ((credit >= (0)::numeric)),
    CONSTRAINT journal_lines_debit_check CHECK ((debit >= (0)::numeric)),
    CONSTRAINT not_both_positive CHECK ((NOT ((debit > (0)::numeric) AND (credit > (0)::numeric))))
);


ALTER TABLE public.journal_lines OWNER TO neondb_owner;

--
-- Name: learning_curve_steps; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.learning_curve_steps (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    curve_id uuid NOT NULL,
    step_order integer NOT NULL,
    title text NOT NULL,
    node_id uuid,
    unlock_requirement jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.learning_curve_steps OWNER TO neondb_owner;

--
-- Name: learning_curves; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.learning_curves (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text,
    target_life_stages public.life_stage_enum[],
    is_published boolean DEFAULT false,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.learning_curves OWNER TO neondb_owner;

--
-- Name: ledger_snapshots; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.ledger_snapshots (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    account_id uuid,
    period_id uuid,
    opening_balance numeric,
    closing_balance numeric,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ledger_snapshots OWNER TO neondb_owner;

--
-- Name: legal_documents; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.legal_documents (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    file_url text NOT NULL,
    status public.legal_document_status_enum DEFAULT 'ACTIVE'::public.legal_document_status_enum,
    created_by_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.legal_documents OWNER TO neondb_owner;

--
-- Name: library_downloads; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.library_downloads (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    library_item_id uuid NOT NULL,
    downloaded_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.library_downloads OWNER TO neondb_owner;

--
-- Name: library_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.library_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text,
    type public.librarytype NOT NULL,
    language public.language_enum,
    author text,
    published_at timestamp(3) without time zone,
    file_id uuid NOT NULL,
    thumbnail_url text,
    tags text[],
    keywords text[],
    required_role public.user_role_enum[],
    required_tier uuid,
    is_public boolean DEFAULT true,
    is_downloadable boolean DEFAULT true,
    deleted_at timestamp(3) without time zone,
    created_by_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.library_items OWNER TO neondb_owner;

--
-- Name: library_versions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.library_versions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    library_item_id uuid NOT NULL,
    file_id uuid NOT NULL,
    version_number integer NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.library_versions OWNER TO neondb_owner;

--
-- Name: node_relations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.node_relations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    from_node_id uuid NOT NULL,
    to_node_id uuid NOT NULL,
    relation_type text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.node_relations OWNER TO neondb_owner;

--
-- Name: node_tags; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.node_tags (
    node_id uuid NOT NULL,
    tag_id uuid NOT NULL
);


ALTER TABLE public.node_tags OWNER TO neondb_owner;

--
-- Name: nodes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.nodes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    shastra_id uuid NOT NULL,
    parent_id uuid,
    level text NOT NULL,
    slug text,
    order_index integer DEFAULT 0,
    canonical_ref text,
    path public.ltree,
    sensitivity integer DEFAULT 1,
    status public.content_status_enum DEFAULT 'ACTIVE'::public.content_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nodes OWNER TO neondb_owner;

--
-- Name: org_members; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.org_members (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role text NOT NULL,
    base_stipend numeric DEFAULT 0,
    start_date timestamp(3) without time zone,
    end_date timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.org_members OWNER TO neondb_owner;

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.organizations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    parent_id uuid,
    name text NOT NULL,
    type text NOT NULL,
    registration_no text,
    pan text,
    tan text,
    address text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.organizations OWNER TO neondb_owner;

--
-- Name: partner_organizations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.partner_organizations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    type public.partner_type_enum NOT NULL,
    registration_number text,
    pan text,
    tan text,
    contact_person text,
    email text,
    phone text,
    address text,
    website text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.partner_organizations OWNER TO neondb_owner;

--
-- Name: partner_report_versions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.partner_report_versions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    report_id uuid NOT NULL,
    file_id uuid NOT NULL,
    version_number integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.partner_report_versions OWNER TO neondb_owner;

--
-- Name: partner_reports; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.partner_reports (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    partnership_id uuid NOT NULL,
    report_type text NOT NULL,
    file_id uuid NOT NULL,
    period_start date,
    period_end date,
    submitted_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.partner_reports OWNER TO neondb_owner;

--
-- Name: partnerships; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.partnerships (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    partner_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    start_date date,
    end_date date,
    status public.grant_status_enum DEFAULT 'ACTIVE'::public.grant_status_enum,
    agreement_file_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.partnerships OWNER TO neondb_owner;

--
-- Name: payment_records; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.payment_records (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    transaction_id uuid,
    provider text NOT NULL,
    external_id text NOT NULL,
    amount numeric NOT NULL,
    currency text DEFAULT 'INR'::text,
    status text NOT NULL,
    raw_data jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT payment_records_amount_check CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.payment_records OWNER TO neondb_owner;

--
-- Name: payroll_records; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.payroll_records (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_member_id uuid NOT NULL,
    transaction_id uuid,
    period_id uuid NOT NULL,
    amount numeric NOT NULL,
    type text DEFAULT 'STIPEND'::text,
    status text DEFAULT 'PENDING'::text,
    paid_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.payroll_records OWNER TO neondb_owner;

--
-- Name: physical_assets; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.physical_assets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    category text NOT NULL,
    purchase_date date,
    purchase_cost numeric,
    current_value numeric,
    status public.asset_status_enum DEFAULT 'ACTIVE'::public.asset_status_enum,
    location text,
    qr_code text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.physical_assets OWNER TO neondb_owner;

--
-- Name: project_budget_lines; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.project_budget_lines (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    project_id uuid NOT NULL,
    category text NOT NULL,
    budget_amount numeric NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT project_budget_lines_budget_amount_check CHECK ((budget_amount >= (0)::numeric))
);


ALTER TABLE public.project_budget_lines OWNER TO neondb_owner;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.projects (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    total_budget numeric NOT NULL,
    status public.project_status_enum DEFAULT 'ACTIVE'::public.project_status_enum,
    cause_id uuid,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.projects OWNER TO neondb_owner;

--
-- Name: secure_share_link_documents; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.secure_share_link_documents (
    link_id uuid NOT NULL,
    document_id uuid NOT NULL,
    access_level public.document_permission_enum DEFAULT 'READ'::public.document_permission_enum
);


ALTER TABLE public.secure_share_link_documents OWNER TO neondb_owner;

--
-- Name: secure_share_links; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.secure_share_links (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    token text NOT NULL,
    purpose text,
    expires_at timestamp(3) without time zone NOT NULL,
    access_count integer DEFAULT 0,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.secure_share_links OWNER TO neondb_owner;

--
-- Name: shastras; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.shastras (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    structure_type text NOT NULL,
    status public.content_status_enum DEFAULT 'ACTIVE'::public.content_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.shastras OWNER TO neondb_owner;

--
-- Name: sources; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.sources (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    role text,
    description text,
    year_approx integer,
    era text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.sources OWNER TO neondb_owner;

--
-- Name: spiritual_profiles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.spiritual_profiles (
    user_id uuid NOT NULL,
    age_group public.age_group_enum,
    life_stage public.life_stage_enum,
    eligibility_level integer DEFAULT 1 NOT NULL,
    primary_focus public.purushartha_enum,
    inner_state public.inner_state_enum,
    nature public.svabhava_enum,
    subscription_tier_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.spiritual_profiles OWNER TO neondb_owner;

--
-- Name: spiritual_vows; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.spiritual_vows (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    status public.vow_status_enum DEFAULT 'ACTIVE'::public.vow_status_enum,
    start_date date,
    end_date date,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.spiritual_vows OWNER TO neondb_owner;

--
-- Name: subscription_tiers; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.subscription_tiers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    level integer DEFAULT 1 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.subscription_tiers OWNER TO neondb_owner;

--
-- Name: support_tickets; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.support_tickets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    user_id uuid,
    subject text NOT NULL,
    description text NOT NULL,
    status public.ticket_status_enum DEFAULT 'OPEN'::public.ticket_status_enum,
    priority text DEFAULT 'MEDIUM'::text,
    assigned_to_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.support_tickets OWNER TO neondb_owner;

--
-- Name: synonyms; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.synonyms (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text_id uuid NOT NULL,
    word text NOT NULL,
    meaning text,
    language public.language_enum,
    order_index integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.synonyms OWNER TO neondb_owner;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.tags (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    slug text NOT NULL,
    name text,
    description text,
    keywords text[],
    type text,
    parent_id uuid,
    sanskrit_name text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.tags OWNER TO neondb_owner;

--
-- Name: text_embeddings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.text_embeddings (
    text_id uuid NOT NULL,
    embedding public.vector(384) NOT NULL,
    model text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.text_embeddings OWNER TO neondb_owner;

--
-- Name: text_metadata; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.text_metadata (
    text_id uuid NOT NULL,
    life_stages public.life_stage_enum[],
    guidance_levels public.guidance_level_enum[],
    is_sensitive boolean DEFAULT false
);


ALTER TABLE public.text_metadata OWNER TO neondb_owner;

--
-- Name: text_versions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.text_versions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text_id uuid NOT NULL,
    content text,
    content_type public.content_type_enum,
    language public.language_enum,
    script public.script_enum,
    version_number integer,
    updated_by text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.text_versions OWNER TO neondb_owner;

--
-- Name: texts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.texts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    node_id uuid NOT NULL,
    content_type public.content_type_enum NOT NULL,
    language public.language_enum NOT NULL,
    script public.script_enum NOT NULL,
    content text NOT NULL,
    source_id uuid,
    is_primary boolean DEFAULT false,
    anchor_word text,
    segment_order integer,
    status public.content_status_enum DEFAULT 'ACTIVE'::public.content_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.texts OWNER TO neondb_owner;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    grant_id uuid,
    cause_id uuid,
    project_id uuid,
    amount numeric NOT NULL,
    type public.transaction_type_enum NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    source_account_id uuid,
    destination_account_id uuid,
    category text NOT NULL,
    purpose text NOT NULL,
    paymentmethod public.payment_method_enum NOT NULL,
    provider text,
    external_payment_id text,
    is_corpus boolean DEFAULT false,
    gst_applicable boolean DEFAULT false,
    tds_applicable boolean DEFAULT false,
    recorded_by_id uuid NOT NULL,
    approved_by_id uuid,
    status public.transaction_status_enum DEFAULT 'PENDING'::public.transaction_status_enum,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT transactions_amount_check CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.transactions OWNER TO neondb_owner;

--
-- Name: user_curve_progress; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_curve_progress (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    curve_id uuid NOT NULL,
    current_step_id uuid,
    is_completed boolean DEFAULT false,
    started_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at timestamp(3) without time zone
);


ALTER TABLE public.user_curve_progress OWNER TO neondb_owner;

--
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_preferences (
    user_id uuid NOT NULL,
    notification_prefs jsonb DEFAULT '{"sms": false, "email": true, "whatsapp": false}'::jsonb,
    metadata jsonb DEFAULT '{}'::jsonb,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_preferences OWNER TO neondb_owner;

--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_profiles (
    user_id uuid NOT NULL,
    full_name text,
    phone_number text,
    whatsapp_number text,
    avatar_url text,
    gender public.gender_enum,
    date_of_birth timestamp(3) without time zone,
    village text,
    city text,
    state text,
    pin_code text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_profiles OWNER TO neondb_owner;

--
-- Name: user_statistics; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_statistics (
    user_id uuid NOT NULL,
    nodes_read_count integer DEFAULT 0,
    courses_completed integer DEFAULT 0,
    contribution_points integer DEFAULT 0,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_statistics OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    password text,
    is_online boolean DEFAULT true,
    email_verified timestamp(3) without time zone,
    roles public.user_role_enum[] DEFAULT ARRAY['student'::public.user_role_enum],
    status public.user_status_enum DEFAULT 'ACTIVE'::public.user_status_enum NOT NULL,
    failed_login_attempts integer DEFAULT 0,
    account_locked_until timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    is_anonymized boolean DEFAULT false,
    anonymized_at timestamp(3) without time zone,
    verification_token text,
    reset_token text,
    reset_token_expires timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_active timestamp(3) without time zone
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: utilization_certificates; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.utilization_certificates (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    grant_id uuid NOT NULL,
    total_received numeric NOT NULL,
    total_utilized numeric NOT NULL,
    unspent_amount numeric NOT NULL,
    certified_by text,
    certification_date date,
    file_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.utilization_certificates OWNER TO neondb_owner;

--
-- Name: vedic_events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vedic_events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text,
    host_id uuid NOT NULL,
    start_time timestamp(3) without time zone NOT NULL,
    end_time timestamp(3) without time zone NOT NULL,
    type public.event_type_enum DEFAULT 'LIVE_SATSANG'::public.event_type_enum,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.vedic_events OWNER TO neondb_owner;

--
-- Name: webhook_events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.webhook_events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    provider text NOT NULL,
    event_type text NOT NULL,
    external_id text NOT NULL,
    payload jsonb NOT NULL,
    status public.webhook_status_enum DEFAULT 'PENDING'::public.webhook_status_enum,
    processed_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.webhook_events OWNER TO neondb_owner;

--
-- Name: _CommunicationCampaignToLibraryItem _CommunicationCampaignToLibraryItem_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_CommunicationCampaignToLibraryItem"
    ADD CONSTRAINT "_CommunicationCampaignToLibraryItem_pkey" PRIMARY KEY ("A", "B");


--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: circle_members circle_members_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circle_members
    ADD CONSTRAINT circle_members_pkey PRIMARY KEY (user_id, circle_id);


--
-- Name: circle_posts circle_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circle_posts
    ADD CONSTRAINT circle_posts_pkey PRIMARY KEY (id);


--
-- Name: circles circles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_pkey PRIMARY KEY (id);


--
-- Name: circles circles_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_slug_key UNIQUE (slug);


--
-- Name: communication_campaigns communication_campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_pkey PRIMARY KEY (id);


--
-- Name: communication_logs communication_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_pkey PRIMARY KEY (id);


--
-- Name: compliance_tasks compliance_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.compliance_tasks
    ADD CONSTRAINT compliance_tasks_pkey PRIMARY KEY (id);


--
-- Name: contributions contributions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_pkey PRIMARY KEY (id);


--
-- Name: contributions contributions_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_transaction_id_key UNIQUE (transaction_id);


--
-- Name: document_versions document_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_pkey PRIMARY KEY (id);


--
-- Name: donation_cause_options donation_cause_options_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_cause_options
    ADD CONSTRAINT donation_cause_options_pkey PRIMARY KEY (id);


--
-- Name: donation_causes donation_causes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_causes
    ADD CONSTRAINT donation_causes_pkey PRIMARY KEY (id);


--
-- Name: donation_causes donation_causes_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_causes
    ADD CONSTRAINT donation_causes_slug_key UNIQUE (slug);


--
-- Name: donation_receipts donation_receipts_file_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_file_id_key UNIQUE (file_id);


--
-- Name: donation_receipts donation_receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_pkey PRIMARY KEY (id);


--
-- Name: donation_receipts donation_receipts_receipt_number_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_receipt_number_key UNIQUE (receipt_number);


--
-- Name: donation_receipts donation_receipts_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_transaction_id_key UNIQUE (transaction_id);


--
-- Name: event_registrations event_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (user_id, event_id);


--
-- Name: external_integrations external_integrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.external_integrations
    ADD CONSTRAINT external_integrations_pkey PRIMARY KEY (id);


--
-- Name: family_groups family_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_groups
    ADD CONSTRAINT family_groups_pkey PRIMARY KEY (id);


--
-- Name: family_links family_links_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_links
    ADD CONSTRAINT family_links_pkey PRIMARY KEY (id);


--
-- Name: family_links family_links_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_links
    ADD CONSTRAINT family_links_unique UNIQUE (user_id, related_id, type);


--
-- Name: family_nodes family_nodes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_nodes
    ADD CONSTRAINT family_nodes_pkey PRIMARY KEY (id);


--
-- Name: file_assets file_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.file_assets
    ADD CONSTRAINT file_assets_pkey PRIMARY KEY (id);


--
-- Name: financial_accounts financial_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.financial_accounts
    ADD CONSTRAINT financial_accounts_pkey PRIMARY KEY (id);


--
-- Name: financial_periods financial_periods_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.financial_periods
    ADD CONSTRAINT financial_periods_pkey PRIMARY KEY (id);


--
-- Name: grant_allocations grant_allocations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grant_allocations
    ADD CONSTRAINT grant_allocations_pkey PRIMARY KEY (id);


--
-- Name: grant_milestones grant_milestones_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grant_milestones
    ADD CONSTRAINT grant_milestones_pkey PRIMARY KEY (id);


--
-- Name: grants grants_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grants
    ADD CONSTRAINT grants_pkey PRIMARY KEY (id);


--
-- Name: guidance_assignments guidance_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guidance_assignments
    ADD CONSTRAINT guidance_assignments_pkey PRIMARY KEY (id);


--
-- Name: guidance_sessions guidance_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guidance_sessions
    ADD CONSTRAINT guidance_sessions_pkey PRIMARY KEY (id);


--
-- Name: guidance_assignments guidance_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guidance_assignments
    ADD CONSTRAINT guidance_unique UNIQUE (guide_id, student_id, assignment_type);


--
-- Name: journal_entries journal_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_entries
    ADD CONSTRAINT journal_entries_pkey PRIMARY KEY (id);


--
-- Name: journal_lines journal_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_lines
    ADD CONSTRAINT journal_lines_pkey PRIMARY KEY (id);


--
-- Name: learning_curve_steps learning_curve_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.learning_curve_steps
    ADD CONSTRAINT learning_curve_steps_pkey PRIMARY KEY (id);


--
-- Name: learning_curves learning_curves_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.learning_curves
    ADD CONSTRAINT learning_curves_pkey PRIMARY KEY (id);


--
-- Name: ledger_snapshots ledger_snapshot_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ledger_snapshots
    ADD CONSTRAINT ledger_snapshot_unique UNIQUE (account_id, period_id);


--
-- Name: ledger_snapshots ledger_snapshots_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ledger_snapshots
    ADD CONSTRAINT ledger_snapshots_pkey PRIMARY KEY (id);


--
-- Name: legal_documents legal_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.legal_documents
    ADD CONSTRAINT legal_documents_pkey PRIMARY KEY (id);


--
-- Name: library_downloads library_downloads_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_downloads
    ADD CONSTRAINT library_downloads_pkey PRIMARY KEY (id);


--
-- Name: library_items library_items_file_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_file_id_key UNIQUE (file_id);


--
-- Name: library_items library_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_pkey PRIMARY KEY (id);


--
-- Name: library_items library_items_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_slug_key UNIQUE (slug);


--
-- Name: library_versions library_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_versions
    ADD CONSTRAINT library_versions_pkey PRIMARY KEY (id);


--
-- Name: node_relations node_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.node_relations
    ADD CONSTRAINT node_relations_pkey PRIMARY KEY (id);


--
-- Name: node_tags node_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.node_tags
    ADD CONSTRAINT node_tags_pkey PRIMARY KEY (node_id, tag_id);


--
-- Name: nodes nodes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT nodes_pkey PRIMARY KEY (id);


--
-- Name: org_members org_members_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.org_members
    ADD CONSTRAINT org_members_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: partner_organizations partner_organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partner_organizations
    ADD CONSTRAINT partner_organizations_pkey PRIMARY KEY (id);


--
-- Name: partner_report_versions partner_report_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partner_report_versions
    ADD CONSTRAINT partner_report_versions_pkey PRIMARY KEY (id);


--
-- Name: partner_reports partner_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partner_reports
    ADD CONSTRAINT partner_reports_pkey PRIMARY KEY (id);


--
-- Name: partnerships partnerships_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partnerships
    ADD CONSTRAINT partnerships_pkey PRIMARY KEY (id);


--
-- Name: payment_records payment_records_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payment_records
    ADD CONSTRAINT payment_records_pkey PRIMARY KEY (id);


--
-- Name: payment_records payment_records_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payment_records
    ADD CONSTRAINT payment_records_transaction_id_key UNIQUE (transaction_id);


--
-- Name: payroll_records payroll_records_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_pkey PRIMARY KEY (id);


--
-- Name: physical_assets physical_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.physical_assets
    ADD CONSTRAINT physical_assets_pkey PRIMARY KEY (id);


--
-- Name: physical_assets physical_assets_qr_code_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.physical_assets
    ADD CONSTRAINT physical_assets_qr_code_key UNIQUE (qr_code);


--
-- Name: project_budget_lines project_budget_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.project_budget_lines
    ADD CONSTRAINT project_budget_lines_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: secure_share_link_documents secure_share_link_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.secure_share_link_documents
    ADD CONSTRAINT secure_share_link_documents_pkey PRIMARY KEY (link_id, document_id);


--
-- Name: secure_share_links secure_share_links_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.secure_share_links
    ADD CONSTRAINT secure_share_links_pkey PRIMARY KEY (id);


--
-- Name: secure_share_links secure_share_links_token_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.secure_share_links
    ADD CONSTRAINT secure_share_links_token_key UNIQUE (token);


--
-- Name: shastras shastras_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.shastras
    ADD CONSTRAINT shastras_pkey PRIMARY KEY (id);


--
-- Name: shastras shastras_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.shastras
    ADD CONSTRAINT shastras_slug_key UNIQUE (slug);


--
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- Name: spiritual_profiles spiritual_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.spiritual_profiles
    ADD CONSTRAINT spiritual_profiles_pkey PRIMARY KEY (user_id);


--
-- Name: spiritual_vows spiritual_vows_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.spiritual_vows
    ADD CONSTRAINT spiritual_vows_pkey PRIMARY KEY (id);


--
-- Name: learning_curve_steps step_order_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.learning_curve_steps
    ADD CONSTRAINT step_order_unique UNIQUE (curve_id, step_order);


--
-- Name: subscription_tiers subscription_tiers_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscription_tiers
    ADD CONSTRAINT subscription_tiers_pkey PRIMARY KEY (id);


--
-- Name: support_tickets support_tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_pkey PRIMARY KEY (id);


--
-- Name: synonyms synonyms_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.synonyms
    ADD CONSTRAINT synonyms_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tags tags_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_slug_key UNIQUE (slug);


--
-- Name: text_embeddings text_embeddings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.text_embeddings
    ADD CONSTRAINT text_embeddings_pkey PRIMARY KEY (text_id);


--
-- Name: text_metadata text_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.text_metadata
    ADD CONSTRAINT text_metadata_pkey PRIMARY KEY (text_id);


--
-- Name: text_versions text_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.text_versions
    ADD CONSTRAINT text_versions_pkey PRIMARY KEY (id);


--
-- Name: texts texts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT texts_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_curve_progress user_curve_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_pkey PRIMARY KEY (id);


--
-- Name: user_curve_progress user_curve_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_unique UNIQUE (user_id, curve_id);


--
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_pkey PRIMARY KEY (user_id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (user_id);


--
-- Name: user_statistics user_statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_statistics
    ADD CONSTRAINT user_statistics_pkey PRIMARY KEY (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: utilization_certificates utilization_certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.utilization_certificates
    ADD CONSTRAINT utilization_certificates_pkey PRIMARY KEY (id);


--
-- Name: vedic_events vedic_events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vedic_events
    ADD CONSTRAINT vedic_events_pkey PRIMARY KEY (id);


--
-- Name: webhook_events webhook_events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.webhook_events
    ADD CONSTRAINT webhook_events_pkey PRIMARY KEY (id);


--
-- Name: idx_asset_qr; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_asset_qr ON public.physical_assets USING btree (qr_code);


--
-- Name: idx_budget_project; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_budget_project ON public.project_budget_lines USING btree (project_id);


--
-- Name: idx_causes_path; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_causes_path ON public.donation_causes USING gist (path);


--
-- Name: idx_family_path; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_family_path ON public.family_nodes USING gist (path);


--
-- Name: idx_milestones_due; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_milestones_due ON public.grant_milestones USING btree (due_date) WHERE (status = 'PENDING'::public.milestone_status_enum);


--
-- Name: idx_node_rel_from; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_node_rel_from ON public.node_relations USING btree (from_node_id);


--
-- Name: idx_node_rel_to; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_node_rel_to ON public.node_relations USING btree (to_node_id);


--
-- Name: idx_node_tags_node; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_node_tags_node ON public.node_tags USING btree (node_id);


--
-- Name: idx_node_tags_tag; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_node_tags_tag ON public.node_tags USING btree (tag_id);


--
-- Name: idx_nodes_path; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_nodes_path ON public.nodes USING gist (path);


--
-- Name: idx_transactions_cause; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_transactions_cause ON public.transactions USING btree (cause_id);


--
-- Name: idx_transactions_grant; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_transactions_grant ON public.transactions USING btree (grant_id) WHERE (grant_id IS NOT NULL);


--
-- Name: idx_users_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_users_active ON public.users USING btree (id) WHERE ((status = 'ACTIVE'::public.user_status_enum) AND (deleted_at IS NULL));


--
-- Name: transactions trigger_immutable_ledger; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER trigger_immutable_ledger BEFORE DELETE OR UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.protect_immutable_ledger();


--
-- Name: journal_entries trigger_journal_balance_check; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER trigger_journal_balance_check BEFORE UPDATE ON public.journal_entries FOR EACH ROW EXECUTE FUNCTION public.verify_journal_approval();


--
-- Name: grant_milestones trigger_milestone_disbursal; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER trigger_milestone_disbursal AFTER UPDATE ON public.grant_milestones FOR EACH ROW EXECUTE FUNCTION public.handle_milestone_completion();


--
-- Name: transactions trigger_period_lock; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER trigger_period_lock BEFORE INSERT OR DELETE OR UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.protect_closed_periods();


--
-- Name: transactions trigger_transaction_audit; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER trigger_transaction_audit AFTER UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.log_transaction_change();


--
-- Name: _CommunicationCampaignToLibraryItem _CommunicationCampaignToLibraryItem_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_CommunicationCampaignToLibraryItem"
    ADD CONSTRAINT "_CommunicationCampaignToLibraryItem_A_fkey" FOREIGN KEY ("A") REFERENCES public.communication_campaigns(id) ON DELETE CASCADE;


--
-- Name: _CommunicationCampaignToLibraryItem _CommunicationCampaignToLibraryItem_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_CommunicationCampaignToLibraryItem"
    ADD CONSTRAINT "_CommunicationCampaignToLibraryItem_B_fkey" FOREIGN KEY ("B") REFERENCES public.library_items(id) ON DELETE CASCADE;


--
-- Name: activity_logs activity_logs_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: activity_logs activity_logs_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_performed_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_performed_by_id_fkey FOREIGN KEY (performed_by_id) REFERENCES public.users(id);


--
-- Name: audit_logs audit_logs_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE SET NULL;


--
-- Name: circle_members circle_members_circle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circle_members
    ADD CONSTRAINT circle_members_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circles(id) ON DELETE CASCADE;


--
-- Name: circle_members circle_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circle_members
    ADD CONSTRAINT circle_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: circle_posts circle_posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circle_posts
    ADD CONSTRAINT circle_posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: circle_posts circle_posts_circle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circle_posts
    ADD CONSTRAINT circle_posts_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circles(id) ON DELETE CASCADE;


--
-- Name: circles circles_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: communication_campaigns communication_campaigns_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: communication_campaigns communication_campaigns_target_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_target_org_id_fkey FOREIGN KEY (target_org_id) REFERENCES public.organizations(id);


--
-- Name: communication_campaigns communication_campaigns_target_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_target_partner_id_fkey FOREIGN KEY (target_partner_id) REFERENCES public.partner_organizations(id);


--
-- Name: communication_campaigns communication_campaigns_target_tier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_target_tier_id_fkey FOREIGN KEY (target_tier_id) REFERENCES public.subscription_tiers(id) ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.communication_campaigns(id) ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partner_organizations(id) ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: compliance_tasks compliance_tasks_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.compliance_tasks
    ADD CONSTRAINT compliance_tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: compliance_tasks compliance_tasks_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.compliance_tasks
    ADD CONSTRAINT compliance_tasks_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: contributions contributions_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id);


--
-- Name: contributions contributions_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: contributions contributions_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;


--
-- Name: contributions contributions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: document_versions document_versions_created_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES public.users(id);


--
-- Name: document_versions document_versions_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.legal_documents(id) ON DELETE CASCADE;


--
-- Name: donation_cause_options donation_cause_options_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_cause_options
    ADD CONSTRAINT donation_cause_options_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id) ON DELETE CASCADE;


--
-- Name: donation_causes donation_causes_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_causes
    ADD CONSTRAINT donation_causes_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id);


--
-- Name: donation_causes donation_causes_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_causes
    ADD CONSTRAINT donation_causes_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.donation_causes(id);


--
-- Name: donation_receipts donation_receipts_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file_assets(id);


--
-- Name: donation_receipts donation_receipts_issued_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_issued_by_id_fkey FOREIGN KEY (issued_by_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: donation_receipts donation_receipts_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON DELETE SET NULL;


--
-- Name: donation_receipts donation_receipts_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;


--
-- Name: donation_receipts donation_receipts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: event_registrations event_registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.vedic_events(id) ON DELETE CASCADE;


--
-- Name: event_registrations event_registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: external_integrations external_integrations_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.external_integrations
    ADD CONSTRAINT external_integrations_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE SET NULL;


--
-- Name: family_links family_links_related_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_links
    ADD CONSTRAINT family_links_related_id_fkey FOREIGN KEY (related_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: family_links family_links_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_links
    ADD CONSTRAINT family_links_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: family_nodes family_nodes_family_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_nodes
    ADD CONSTRAINT family_nodes_family_group_id_fkey FOREIGN KEY (family_group_id) REFERENCES public.family_groups(id) ON DELETE CASCADE;


--
-- Name: family_nodes family_nodes_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_nodes
    ADD CONSTRAINT family_nodes_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.family_nodes(id) ON DELETE SET NULL;


--
-- Name: family_nodes family_nodes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.family_nodes
    ADD CONSTRAINT family_nodes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: file_assets file_assets_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.file_assets
    ADD CONSTRAINT file_assets_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: file_assets file_assets_uploaded_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.file_assets
    ADD CONSTRAINT file_assets_uploaded_by_id_fkey FOREIGN KEY (uploaded_by_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: financial_accounts financial_accounts_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.financial_accounts
    ADD CONSTRAINT financial_accounts_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: financial_periods financial_periods_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.financial_periods
    ADD CONSTRAINT financial_periods_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id);


--
-- Name: partnerships fk_agreement_file; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partnerships
    ADD CONSTRAINT fk_agreement_file FOREIGN KEY (agreement_file_id) REFERENCES public.file_assets(id);


--
-- Name: grant_milestones fk_report_file; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grant_milestones
    ADD CONSTRAINT fk_report_file FOREIGN KEY (completion_report_id) REFERENCES public.file_assets(id);


--
-- Name: utilization_certificates fk_uc_file; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.utilization_certificates
    ADD CONSTRAINT fk_uc_file FOREIGN KEY (file_id) REFERENCES public.file_assets(id);


--
-- Name: grant_allocations grant_allocations_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grant_allocations
    ADD CONSTRAINT grant_allocations_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id);


--
-- Name: grant_allocations grant_allocations_grant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grant_allocations
    ADD CONSTRAINT grant_allocations_grant_id_fkey FOREIGN KEY (grant_id) REFERENCES public.grants(id);


--
-- Name: grant_allocations grant_allocations_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grant_allocations
    ADD CONSTRAINT grant_allocations_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: grant_milestones grant_milestones_grant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grant_milestones
    ADD CONSTRAINT grant_milestones_grant_id_fkey FOREIGN KEY (grant_id) REFERENCES public.grants(id);


--
-- Name: grants grants_partnership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.grants
    ADD CONSTRAINT grants_partnership_id_fkey FOREIGN KEY (partnership_id) REFERENCES public.partnerships(id);


--
-- Name: guidance_assignments guidance_assignments_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guidance_assignments
    ADD CONSTRAINT guidance_assignments_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.users(id);


--
-- Name: guidance_assignments guidance_assignments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guidance_assignments
    ADD CONSTRAINT guidance_assignments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: guidance_sessions guidance_sessions_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guidance_sessions
    ADD CONSTRAINT guidance_sessions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.guidance_assignments(id) ON DELETE CASCADE;


--
-- Name: journal_entries journal_entries_approved_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_entries
    ADD CONSTRAINT journal_entries_approved_by_id_fkey FOREIGN KEY (approved_by_id) REFERENCES public.users(id);


--
-- Name: journal_entries journal_entries_created_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_entries
    ADD CONSTRAINT journal_entries_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES public.users(id);


--
-- Name: journal_entries journal_entries_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_entries
    ADD CONSTRAINT journal_entries_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id);


--
-- Name: journal_entries journal_entries_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_entries
    ADD CONSTRAINT journal_entries_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);


--
-- Name: journal_lines journal_lines_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_lines
    ADD CONSTRAINT journal_lines_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.financial_accounts(id);


--
-- Name: journal_lines journal_lines_journal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.journal_lines
    ADD CONSTRAINT journal_lines_journal_id_fkey FOREIGN KEY (journal_id) REFERENCES public.journal_entries(id) ON DELETE CASCADE;


--
-- Name: learning_curve_steps learning_curve_steps_curve_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.learning_curve_steps
    ADD CONSTRAINT learning_curve_steps_curve_id_fkey FOREIGN KEY (curve_id) REFERENCES public.learning_curves(id) ON DELETE CASCADE;


--
-- Name: learning_curve_steps learning_curve_steps_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.learning_curve_steps
    ADD CONSTRAINT learning_curve_steps_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id) ON DELETE SET NULL;


--
-- Name: ledger_snapshots ledger_snapshots_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ledger_snapshots
    ADD CONSTRAINT ledger_snapshots_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.financial_accounts(id);


--
-- Name: ledger_snapshots ledger_snapshots_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ledger_snapshots
    ADD CONSTRAINT ledger_snapshots_period_id_fkey FOREIGN KEY (period_id) REFERENCES public.financial_periods(id);


--
-- Name: legal_documents legal_documents_created_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.legal_documents
    ADD CONSTRAINT legal_documents_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES public.users(id);


--
-- Name: legal_documents legal_documents_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.legal_documents
    ADD CONSTRAINT legal_documents_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: library_downloads library_downloads_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_downloads
    ADD CONSTRAINT library_downloads_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON DELETE CASCADE;


--
-- Name: library_downloads library_downloads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_downloads
    ADD CONSTRAINT library_downloads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: library_items library_items_created_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES public.users(id);


--
-- Name: library_items library_items_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file_assets(id);


--
-- Name: library_items library_items_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id);


--
-- Name: library_items library_items_required_tier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_required_tier_fkey FOREIGN KEY (required_tier) REFERENCES public.subscription_tiers(id);


--
-- Name: library_versions library_versions_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_versions
    ADD CONSTRAINT library_versions_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file_assets(id);


--
-- Name: library_versions library_versions_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.library_versions
    ADD CONSTRAINT library_versions_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON DELETE CASCADE;


--
-- Name: node_relations node_relations_from_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.node_relations
    ADD CONSTRAINT node_relations_from_node_id_fkey FOREIGN KEY (from_node_id) REFERENCES public.nodes(id);


--
-- Name: node_relations node_relations_to_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.node_relations
    ADD CONSTRAINT node_relations_to_node_id_fkey FOREIGN KEY (to_node_id) REFERENCES public.nodes(id);


--
-- Name: node_tags node_tags_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.node_tags
    ADD CONSTRAINT node_tags_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id);


--
-- Name: node_tags node_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.node_tags
    ADD CONSTRAINT node_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- Name: nodes nodes_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT nodes_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.nodes(id);


--
-- Name: nodes nodes_shastra_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT nodes_shastra_id_fkey FOREIGN KEY (shastra_id) REFERENCES public.shastras(id);


--
-- Name: org_members org_members_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.org_members
    ADD CONSTRAINT org_members_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: org_members org_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.org_members
    ADD CONSTRAINT org_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: organizations organizations_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.organizations(id);


--
-- Name: partner_report_versions partner_report_versions_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partner_report_versions
    ADD CONSTRAINT partner_report_versions_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file_assets(id);


--
-- Name: partner_report_versions partner_report_versions_report_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partner_report_versions
    ADD CONSTRAINT partner_report_versions_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.partner_reports(id) ON DELETE CASCADE;


--
-- Name: partner_reports partner_reports_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partner_reports
    ADD CONSTRAINT partner_reports_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file_assets(id);


--
-- Name: partner_reports partner_reports_partnership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partner_reports
    ADD CONSTRAINT partner_reports_partnership_id_fkey FOREIGN KEY (partnership_id) REFERENCES public.partnerships(id) ON DELETE CASCADE;


--
-- Name: partnerships partnerships_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partnerships
    ADD CONSTRAINT partnerships_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id);


--
-- Name: partnerships partnerships_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.partnerships
    ADD CONSTRAINT partnerships_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partner_organizations(id);


--
-- Name: payment_records payment_records_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payment_records
    ADD CONSTRAINT payment_records_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE SET NULL;


--
-- Name: payroll_records payroll_records_org_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_org_member_id_fkey FOREIGN KEY (org_member_id) REFERENCES public.org_members(id) ON DELETE CASCADE;


--
-- Name: payroll_records payroll_records_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_period_id_fkey FOREIGN KEY (period_id) REFERENCES public.financial_periods(id);


--
-- Name: payroll_records payroll_records_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payroll_records
    ADD CONSTRAINT payroll_records_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);


--
-- Name: physical_assets physical_assets_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.physical_assets
    ADD CONSTRAINT physical_assets_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: project_budget_lines project_budget_lines_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.project_budget_lines
    ADD CONSTRAINT project_budget_lines_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: projects projects_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id);


--
-- Name: projects projects_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: secure_share_link_documents secure_share_link_documents_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.secure_share_link_documents
    ADD CONSTRAINT secure_share_link_documents_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.legal_documents(id);


--
-- Name: secure_share_link_documents secure_share_link_documents_link_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.secure_share_link_documents
    ADD CONSTRAINT secure_share_link_documents_link_id_fkey FOREIGN KEY (link_id) REFERENCES public.secure_share_links(id) ON DELETE CASCADE;


--
-- Name: secure_share_links secure_share_links_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.secure_share_links
    ADD CONSTRAINT secure_share_links_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id);


--
-- Name: spiritual_profiles spiritual_profiles_subscription_tier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.spiritual_profiles
    ADD CONSTRAINT spiritual_profiles_subscription_tier_id_fkey FOREIGN KEY (subscription_tier_id) REFERENCES public.subscription_tiers(id) ON DELETE SET NULL;


--
-- Name: spiritual_profiles spiritual_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.spiritual_profiles
    ADD CONSTRAINT spiritual_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: spiritual_vows spiritual_vows_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.spiritual_vows
    ADD CONSTRAINT spiritual_vows_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: subscription_tiers subscription_tiers_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscription_tiers
    ADD CONSTRAINT subscription_tiers_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: support_tickets support_tickets_assigned_to_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_assigned_to_id_fkey FOREIGN KEY (assigned_to_id) REFERENCES public.users(id);


--
-- Name: support_tickets support_tickets_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: support_tickets support_tickets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: synonyms synonyms_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.synonyms
    ADD CONSTRAINT synonyms_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id);


--
-- Name: tags tags_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.tags(id);


--
-- Name: text_embeddings text_embeddings_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.text_embeddings
    ADD CONSTRAINT text_embeddings_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON DELETE CASCADE;


--
-- Name: text_metadata text_metadata_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.text_metadata
    ADD CONSTRAINT text_metadata_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON DELETE CASCADE;


--
-- Name: text_versions text_versions_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.text_versions
    ADD CONSTRAINT text_versions_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON DELETE CASCADE;


--
-- Name: texts texts_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT texts_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id);


--
-- Name: texts texts_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT texts_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id) ON DELETE SET NULL;


--
-- Name: transactions transactions_approved_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_approved_by_id_fkey FOREIGN KEY (approved_by_id) REFERENCES public.users(id);


--
-- Name: transactions transactions_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id);


--
-- Name: transactions transactions_destination_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_destination_account_id_fkey FOREIGN KEY (destination_account_id) REFERENCES public.financial_accounts(id);


--
-- Name: transactions transactions_grant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_grant_id_fkey FOREIGN KEY (grant_id) REFERENCES public.grants(id);


--
-- Name: transactions transactions_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: transactions transactions_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: transactions transactions_recorded_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_recorded_by_id_fkey FOREIGN KEY (recorded_by_id) REFERENCES public.users(id);


--
-- Name: transactions transactions_source_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_source_account_id_fkey FOREIGN KEY (source_account_id) REFERENCES public.financial_accounts(id);


--
-- Name: user_curve_progress user_curve_progress_current_step_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_current_step_id_fkey FOREIGN KEY (current_step_id) REFERENCES public.learning_curve_steps(id) ON DELETE SET NULL;


--
-- Name: user_curve_progress user_curve_progress_curve_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_curve_id_fkey FOREIGN KEY (curve_id) REFERENCES public.learning_curves(id) ON DELETE CASCADE;


--
-- Name: user_curve_progress user_curve_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_preferences user_preferences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_statistics user_statistics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_statistics
    ADD CONSTRAINT user_statistics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: utilization_certificates utilization_certificates_grant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.utilization_certificates
    ADD CONSTRAINT utilization_certificates_grant_id_fkey FOREIGN KEY (grant_id) REFERENCES public.grants(id) ON DELETE CASCADE;


--
-- Name: vedic_events vedic_events_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vedic_events
    ADD CONSTRAINT vedic_events_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.users(id);


--
-- Name: contributions; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

--
-- Name: grants; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.grants ENABLE ROW LEVEL SECURITY;

--
-- Name: legal_documents; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;

--
-- Name: partnerships; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

--
-- Name: payroll_records; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.payroll_records ENABLE ROW LEVEL SECURITY;

--
-- Name: physical_assets; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.physical_assets ENABLE ROW LEVEL SECURITY;

--
-- Name: transactions; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

--
-- Name: user_profiles; Type: ROW SECURITY; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: neondb_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict szKrLg0NH3G2uOaikPGl0qVYgLsySyQke8heoonkajEjzRpxy0xouXDirChyn5B

