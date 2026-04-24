--
-- PostgreSQL database dump
--

\restrict ziAzpOmrAchyGiqCaU4bRtNdZwBR7DsYPN8Hn7pYYyxDmae2c3dnqmzQmY5wDFJ

-- Dumped from database version 17.9 (Homebrew)
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
-- Name: public; Type: SCHEMA; Schema: -; Owner: ppublications
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO ppublications;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ppublications
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
-- Name: LibraryType; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public."LibraryType" AS ENUM (
    'BOOK',
    'BOOKLET',
    'ARTICLE',
    'NEWSLETTER'
);


ALTER TYPE public."LibraryType" OWNER TO ppublications;

--
-- Name: age_group_enum; Type: TYPE; Schema: public; Owner: ppublications
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


ALTER TYPE public.age_group_enum OWNER TO ppublications;

--
-- Name: assignment_type_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.assignment_type_enum AS ENUM (
    'mentor',
    'teacher',
    'coordinator'
);


ALTER TYPE public.assignment_type_enum OWNER TO ppublications;

--
-- Name: authority_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.authority_status_enum AS ENUM (
    'guardian',
    'dependant',
    'karta',
    'shakha_head'
);


ALTER TYPE public.authority_status_enum OWNER TO ppublications;

--
-- Name: campaign_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.campaign_status_enum AS ENUM (
    'DRAFT',
    'SCHEDULED',
    'SENT',
    'FAILED',
    'CANCELLED'
);


ALTER TYPE public.campaign_status_enum OWNER TO ppublications;

--
-- Name: circle_role_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.circle_role_enum AS ENUM (
    'MEMBER',
    'MODERATOR',
    'MENTOR'
);


ALTER TYPE public.circle_role_enum OWNER TO ppublications;

--
-- Name: circle_type_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.circle_type_enum AS ENUM (
    'REGIONAL',
    'STUDY_GROUP',
    'MENTOR_CIRCLE'
);


ALTER TYPE public.circle_type_enum OWNER TO ppublications;

--
-- Name: communication_channel_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.communication_channel_enum AS ENUM (
    'EMAIL',
    'SMS',
    'WHATSAPP',
    'PUSH',
    'IN_APP'
);


ALTER TYPE public.communication_channel_enum OWNER TO ppublications;

--
-- Name: communication_status_enum; Type: TYPE; Schema: public; Owner: ppublications
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


ALTER TYPE public.communication_status_enum OWNER TO ppublications;

--
-- Name: compliance_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.compliance_status_enum AS ENUM (
    'UPCOMING',
    'IN_PROGRESS',
    'COMPLETED',
    'OVERDUE',
    'DELAYED'
);


ALTER TYPE public.compliance_status_enum OWNER TO ppublications;

--
-- Name: content_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.content_status_enum AS ENUM (
    'DRAFT',
    'ACTIVE',
    'ARCHIVED',
    'DELETED'
);


ALTER TYPE public.content_status_enum OWNER TO ppublications;

--
-- Name: content_type_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.content_type_enum AS ENUM (
    'sutra',
    'translation',
    'commentary',
    'purport',
    'title',
    'subtitle',
    'colophon'
);


ALTER TYPE public.content_type_enum OWNER TO ppublications;

--
-- Name: contribution_type_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.contribution_type_enum AS ENUM (
    'FINANCIAL',
    'IN_KIND',
    'SERVICE'
);


ALTER TYPE public.contribution_type_enum OWNER TO ppublications;

--
-- Name: document_permission_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.document_permission_enum AS ENUM (
    'READ',
    'WRITE',
    'DELETE',
    'SHARE'
);


ALTER TYPE public.document_permission_enum OWNER TO ppublications;

--
-- Name: event_type_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.event_type_enum AS ENUM (
    'LIVE_SATSANG',
    'WORKSHOP',
    'GROUP_MEDITATION'
);


ALTER TYPE public.event_type_enum OWNER TO ppublications;

--
-- Name: file_category_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.file_category_enum AS ENUM (
    'RECEIPT',
    'INVOICE',
    'MEDIA',
    'DOCUMENT',
    'AVATAR',
    'SHASTRA_SCAN'
);


ALTER TYPE public.file_category_enum OWNER TO ppublications;

--
-- Name: gender_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.gender_enum AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.gender_enum OWNER TO ppublications;

--
-- Name: guidance_level_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.guidance_level_enum AS ENUM (
    'beginner',
    'intermediate',
    'advanced',
    'teacher'
);


ALTER TYPE public.guidance_level_enum OWNER TO ppublications;

--
-- Name: guidance_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.guidance_status_enum AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'ON_HOLD',
    'TERMINATED'
);


ALTER TYPE public.guidance_status_enum OWNER TO ppublications;

--
-- Name: inner_state_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.inner_state_enum AS ENUM (
    'confused',
    'seeking',
    'stable',
    'disturbed',
    'detached'
);


ALTER TYPE public.inner_state_enum OWNER TO ppublications;

--
-- Name: integration_service_enum; Type: TYPE; Schema: public; Owner: ppublications
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


ALTER TYPE public.integration_service_enum OWNER TO ppublications;

--
-- Name: language_enum; Type: TYPE; Schema: public; Owner: ppublications
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


ALTER TYPE public.language_enum OWNER TO ppublications;

--
-- Name: legal_document_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.legal_document_status_enum AS ENUM (
    'DRAFT',
    'ACTIVE',
    'ARCHIVED',
    'EXPIRED',
    'REVOKED'
);


ALTER TYPE public.legal_document_status_enum OWNER TO ppublications;

--
-- Name: life_stage_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.life_stage_enum AS ENUM (
    'student',
    'unmarried',
    'married',
    'parent',
    'vanaprastha',
    'renunciate'
);


ALTER TYPE public.life_stage_enum OWNER TO ppublications;

--
-- Name: payment_method_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.payment_method_enum AS ENUM (
    'UPI',
    'CASH',
    'BANK_TRANSFER'
);


ALTER TYPE public.payment_method_enum OWNER TO ppublications;

--
-- Name: post_category_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.post_category_enum AS ENUM (
    'REALIZATION',
    'QUESTION',
    'ANNOUNCEMENT'
);


ALTER TYPE public.post_category_enum OWNER TO ppublications;

--
-- Name: project_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.project_status_enum AS ENUM (
    'PROPOSED',
    'ACTIVE',
    'COMPLETED',
    'ON_HOLD',
    'CANCELLED'
);


ALTER TYPE public.project_status_enum OWNER TO ppublications;

--
-- Name: purushartha_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.purushartha_enum AS ENUM (
    'dharma',
    'artha',
    'kama',
    'moksha'
);


ALTER TYPE public.purushartha_enum OWNER TO ppublications;

--
-- Name: relationship_type_enum; Type: TYPE; Schema: public; Owner: ppublications
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


ALTER TYPE public.relationship_type_enum OWNER TO ppublications;

--
-- Name: script_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.script_enum AS ENUM (
    'devanagari',
    'latin',
    'bengali',
    'tamil',
    'oriya'
);


ALTER TYPE public.script_enum OWNER TO ppublications;

--
-- Name: storage_provider_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.storage_provider_enum AS ENUM (
    'S3',
    'R2',
    'GCS',
    'LOCAL'
);


ALTER TYPE public.storage_provider_enum OWNER TO ppublications;

--
-- Name: svabhava_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.svabhava_enum AS ENUM (
    'intellectual',
    'administrative',
    'creative',
    'practical'
);


ALTER TYPE public.svabhava_enum OWNER TO ppublications;

--
-- Name: transaction_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.transaction_status_enum AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'FAILED'
);


ALTER TYPE public.transaction_status_enum OWNER TO ppublications;

--
-- Name: transaction_type_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.transaction_type_enum AS ENUM (
    'INCOME',
    'EXPENSE',
    'TRANSFER',
    'ADJUSTMENT'
);


ALTER TYPE public.transaction_type_enum OWNER TO ppublications;

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: ppublications
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
    'outreach_lead'
);


ALTER TYPE public.user_role_enum OWNER TO ppublications;

--
-- Name: user_status_enum; Type: TYPE; Schema: public; Owner: ppublications
--

CREATE TYPE public.user_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED',
    'DELETED',
    'ANONYMIZED'
);


ALTER TYPE public.user_status_enum OWNER TO ppublications;

--
-- Name: log_transaction_change(); Type: FUNCTION; Schema: public; Owner: ppublications
--

CREATE FUNCTION public.log_transaction_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO "audit_logs" (
        "id", "transaction_id", "action", "performed_by_id", "old_data", "new_data", "timestamp"
    ) VALUES (
        uuid_generate_v4(), OLD.id, TG_OP, NEW.recorded_by_id, row_to_json(OLD), row_to_json(NEW), CURRENT_TIMESTAMP
    );
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.log_transaction_change() OWNER TO ppublications;

--
-- Name: protect_immutable_ledger(); Type: FUNCTION; Schema: public; Owner: ppublications
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


ALTER FUNCTION public.protect_immutable_ledger() OWNER TO ppublications;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _CommunicationCampaignToLibraryItem; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public."_CommunicationCampaignToLibraryItem" (
    "A" uuid NOT NULL,
    "B" uuid NOT NULL
);


ALTER TABLE public."_CommunicationCampaignToLibraryItem" OWNER TO ppublications;

--
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.activity_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    images text[] DEFAULT ARRAY[]::text[],
    project_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.activity_logs OWNER TO ppublications;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.audit_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    transaction_id uuid,
    action text NOT NULL,
    performed_by_id uuid NOT NULL,
    old_data jsonb,
    new_data jsonb,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO ppublications;

--
-- Name: benefits; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.benefits (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    type text NOT NULL,
    description text,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.benefits OWNER TO ppublications;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.bookmarks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    node_id uuid NOT NULL,
    folder_name text DEFAULT 'Main'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bookmarks OWNER TO ppublications;

--
-- Name: circle_members; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.circle_members (
    user_id uuid NOT NULL,
    circle_id uuid NOT NULL,
    role public.circle_role_enum DEFAULT 'MEMBER'::public.circle_role_enum NOT NULL,
    joined_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.circle_members OWNER TO ppublications;

--
-- Name: circle_posts; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.circle_posts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    circle_id uuid NOT NULL,
    author_id uuid NOT NULL,
    content text NOT NULL,
    category public.post_category_enum DEFAULT 'REALIZATION'::public.post_category_enum NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    replies integer DEFAULT 0 NOT NULL,
    is_pinned boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.circle_posts OWNER TO ppublications;

--
-- Name: circles; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.circles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    avatar text,
    type public.circle_type_enum DEFAULT 'REGIONAL'::public.circle_type_enum NOT NULL,
    location text,
    member_count integer DEFAULT 0 NOT NULL,
    mentor_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.circles OWNER TO ppublications;

--
-- Name: communication_campaigns; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.communication_campaigns (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    type text NOT NULL,
    status public.campaign_status_enum DEFAULT 'DRAFT'::public.campaign_status_enum NOT NULL,
    target_tier_id uuid,
    language public.language_enum,
    scheduled_at timestamp(3) without time zone,
    sent_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.communication_campaigns OWNER TO ppublications;

--
-- Name: communication_logs; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.communication_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    org_id uuid,
    channel public.communication_channel_enum NOT NULL,
    template_id uuid,
    campaign_id uuid,
    recipient text NOT NULL,
    subject text,
    message text,
    status public.communication_status_enum NOT NULL,
    provider text,
    external_id text,
    retry_count integer DEFAULT 0 NOT NULL,
    max_retries integer DEFAULT 3 NOT NULL,
    next_retry_at timestamp(3) without time zone,
    sent_at timestamp(3) without time zone,
    delivered_at timestamp(3) without time zone,
    error_message text,
    library_item_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.communication_logs OWNER TO ppublications;

--
-- Name: communication_templates; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.communication_templates (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    channel public.communication_channel_enum NOT NULL,
    subject text,
    content text NOT NULL,
    variables jsonb DEFAULT '[]'::jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.communication_templates OWNER TO ppublications;

--
-- Name: compliance_records; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.compliance_records (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    frequency text NOT NULL,
    due_date timestamp(3) without time zone NOT NULL,
    status public.compliance_status_enum DEFAULT 'UPCOMING'::public.compliance_status_enum NOT NULL,
    responsible_id uuid,
    supervisor_id uuid,
    notes text,
    created_by_id uuid,
    updated_by_id uuid,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.compliance_records OWNER TO ppublications;

--
-- Name: content_access_rules; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.content_access_rules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    node_id uuid NOT NULL,
    allowed_roles public.user_role_enum[],
    allowed_life_stages public.life_stage_enum[],
    allowed_guidance_levels public.guidance_level_enum[],
    is_restricted boolean DEFAULT true NOT NULL,
    message_if_locked text
);


ALTER TABLE public.content_access_rules OWNER TO ppublications;

--
-- Name: contributions; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.contributions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    user_id uuid NOT NULL,
    transaction_id uuid,
    amount numeric(65,30),
    type public.contribution_type_enum NOT NULL,
    item text,
    quantity numeric(65,30),
    unit text,
    purpose text,
    project_id uuid,
    cause_id uuid,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    CONSTRAINT contributions_amount_positive CHECK (((amount > (0)::numeric) OR (amount IS NULL)))
);


ALTER TABLE public.contributions OWNER TO ppublications;

--
-- Name: document_access; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.document_access (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    document_id uuid NOT NULL,
    role_id text NOT NULL,
    permission public.document_permission_enum DEFAULT 'READ'::public.document_permission_enum NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.document_access OWNER TO ppublications;

--
-- Name: document_versions; Type: TABLE; Schema: public; Owner: ppublications
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


ALTER TABLE public.document_versions OWNER TO ppublications;

--
-- Name: donation_cause_options; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.donation_cause_options (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cause_id uuid NOT NULL,
    name text NOT NULL,
    suggested_amount numeric(65,30),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT donation_cause_options_amount_positive CHECK ((suggested_amount > (0)::numeric))
);


ALTER TABLE public.donation_cause_options OWNER TO ppublications;

--
-- Name: donation_causes; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.donation_causes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    parent_id uuid,
    name text NOT NULL,
    slug text,
    description text,
    level integer DEFAULT 0 NOT NULL,
    path public.ltree,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.donation_causes OWNER TO ppublications;

--
-- Name: donation_receipts; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.donation_receipts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    transaction_id uuid NOT NULL,
    user_id uuid NOT NULL,
    receipt_number text NOT NULL,
    issued_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount numeric(65,30) NOT NULL,
    currency text DEFAULT 'INR'::text NOT NULL,
    pan_number text,
    donor_name text,
    is_80g_applicable boolean DEFAULT true NOT NULL,
    file_id uuid,
    status text DEFAULT 'GENERATED'::text NOT NULL,
    created_by_id uuid,
    issued_by_id uuid,
    cancelled_at timestamp(3) without time zone,
    library_item_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    CONSTRAINT donation_receipts_amount_positive CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.donation_receipts OWNER TO ppublications;

--
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.event_registrations (
    user_id uuid NOT NULL,
    event_id uuid NOT NULL,
    joined_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.event_registrations OWNER TO ppublications;

--
-- Name: external_integrations; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.external_integrations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid,
    service public.integration_service_enum NOT NULL,
    api_key_ref text,
    config jsonb DEFAULT '{}'::jsonb,
    status text DEFAULT 'ACTIVE'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.external_integrations OWNER TO ppublications;

--
-- Name: external_references; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.external_references (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    entity_type text NOT NULL,
    entity_id uuid NOT NULL,
    provider text NOT NULL,
    external_id text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.external_references OWNER TO ppublications;

--
-- Name: family_links; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.family_links (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    related_id uuid NOT NULL,
    type public.relationship_type_enum NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.family_links OWNER TO ppublications;

--
-- Name: family_nodes; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.family_nodes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    parent_id uuid,
    family_group_id uuid,
    path public.ltree,
    level integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.family_nodes OWNER TO ppublications;

--
-- Name: file_assets; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.file_assets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    uploaded_by_id uuid,
    file_name text NOT NULL,
    file_type text,
    mime_type text,
    storage_provider public.storage_provider_enum NOT NULL,
    bucket_name text,
    object_key text NOT NULL,
    file_url text NOT NULL,
    file_size bigint,
    checksum text,
    category public.file_category_enum NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    security_level text DEFAULT 'RESTRICTED'::text NOT NULL,
    related_entity text,
    related_id uuid,
    transaction_id uuid,
    is_private boolean DEFAULT true NOT NULL,
    status text DEFAULT 'ACTIVE'::text NOT NULL,
    deleted_at timestamp(3) without time zone,
    expires_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.file_assets OWNER TO ppublications;

--
-- Name: financial_accounts; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.financial_accounts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    balance numeric(65,30) DEFAULT 0 NOT NULL,
    currency text DEFAULT 'INR'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.financial_accounts OWNER TO ppublications;

--
-- Name: guidance_assignments; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.guidance_assignments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    guide_id uuid NOT NULL,
    student_id uuid NOT NULL,
    assignment_type public.assignment_type_enum NOT NULL,
    subject text,
    status public.guidance_status_enum DEFAULT 'ACTIVE'::public.guidance_status_enum NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.guidance_assignments OWNER TO ppublications;

--
-- Name: guidance_sessions; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.guidance_sessions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    assignment_id uuid NOT NULL,
    topic text,
    summary_notes text,
    session_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    duration_minutes integer
);


ALTER TABLE public.guidance_sessions OWNER TO ppublications;

--
-- Name: highlights; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.highlights (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    text_id uuid NOT NULL,
    selection_range text,
    note text,
    color_code text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.highlights OWNER TO ppublications;

--
-- Name: learning_curve_steps; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.learning_curve_steps (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    curve_id uuid NOT NULL,
    step_order integer NOT NULL,
    title text NOT NULL,
    node_id uuid,
    unlock_requirement jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.learning_curve_steps OWNER TO ppublications;

--
-- Name: learning_curves; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.learning_curves (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text,
    target_life_stages public.life_stage_enum[],
    is_published boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.learning_curves OWNER TO ppublications;

--
-- Name: legal_documents; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.legal_documents (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    file_url text NOT NULL,
    issuing_authority text,
    issue_date timestamp(3) without time zone,
    expiry_date timestamp(3) without time zone,
    sensitivity text DEFAULT 'RESTRICTED'::text NOT NULL,
    status public.legal_document_status_enum DEFAULT 'ACTIVE'::public.legal_document_status_enum NOT NULL,
    created_by_id uuid,
    updated_by_id uuid,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.legal_documents OWNER TO ppublications;

--
-- Name: library_downloads; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.library_downloads (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    library_item_id uuid NOT NULL,
    downloaded_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.library_downloads OWNER TO ppublications;

--
-- Name: library_items; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.library_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    title text NOT NULL,
    slug text,
    description text,
    type public."LibraryType" NOT NULL,
    language public.language_enum,
    author text,
    published_at timestamp(3) without time zone,
    file_id uuid NOT NULL,
    thumbnail_url text,
    is_public boolean DEFAULT true NOT NULL,
    is_downloadable boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.library_items OWNER TO ppublications;

--
-- Name: library_versions; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.library_versions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    library_item_id uuid NOT NULL,
    file_id uuid NOT NULL,
    version_number integer NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.library_versions OWNER TO ppublications;

--
-- Name: life_journey_stages; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.life_journey_stages (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    stage_number integer NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    min_age integer,
    max_age integer,
    authority text,
    focus text,
    dominant_purushartha public.purushartha_enum NOT NULL,
    description text,
    key_problems text[]
);


ALTER TABLE public.life_journey_stages OWNER TO ppublications;

--
-- Name: node_relations; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.node_relations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    from_node_id uuid NOT NULL,
    to_node_id uuid NOT NULL,
    relation_type text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.node_relations OWNER TO ppublications;

--
-- Name: node_tags; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.node_tags (
    node_id uuid NOT NULL,
    tag_id uuid NOT NULL
);


ALTER TABLE public.node_tags OWNER TO ppublications;

--
-- Name: nodes; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.nodes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    shastra_id uuid NOT NULL,
    parent_id uuid,
    level text NOT NULL,
    slug text,
    sensitivity integer DEFAULT 1 NOT NULL,
    min_age integer,
    order_index integer DEFAULT 0 NOT NULL,
    canonical_ref text,
    path public.ltree,
    status public.content_status_enum DEFAULT 'ACTIVE'::public.content_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nodes OWNER TO ppublications;

--
-- Name: org_members; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.org_members (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role text NOT NULL,
    start_date timestamp(3) without time zone,
    end_date timestamp(3) without time zone
);


ALTER TABLE public.org_members OWNER TO ppublications;

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.organizations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    registration_no text,
    pan text,
    tan text,
    address text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.organizations OWNER TO ppublications;

--
-- Name: payment_records; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.payment_records (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    transaction_id uuid,
    provider text NOT NULL,
    payment_id text,
    order_id text,
    status text NOT NULL,
    amount numeric(65,30) NOT NULL,
    raw_response jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.payment_records OWNER TO ppublications;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.projects (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    total_budget numeric(65,30) NOT NULL,
    status public.project_status_enum DEFAULT 'ACTIVE'::public.project_status_enum NOT NULL,
    cause_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.projects OWNER TO ppublications;

--
-- Name: secure_share_link_documents; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.secure_share_link_documents (
    link_id uuid NOT NULL,
    document_id uuid NOT NULL,
    accessed_at timestamp(3) without time zone,
    access_level public.document_permission_enum DEFAULT 'READ'::public.document_permission_enum NOT NULL
);


ALTER TABLE public.secure_share_link_documents OWNER TO ppublications;

--
-- Name: secure_share_links; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.secure_share_links (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    token text NOT NULL,
    purpose text,
    expires_at timestamp(3) without time zone NOT NULL,
    access_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.secure_share_links OWNER TO ppublications;

--
-- Name: shastras; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.shastras (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    structure_type text NOT NULL,
    status public.content_status_enum DEFAULT 'ACTIVE'::public.content_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.shastras OWNER TO ppublications;

--
-- Name: sources; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.sources (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    role text,
    description text,
    year_approx integer,
    era text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.sources OWNER TO ppublications;

--
-- Name: spiritual_profiles; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.spiritual_profiles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    age_group public.age_group_enum,
    life_stage public.life_stage_enum,
    eligibility_level integer DEFAULT 1 NOT NULL,
    primary_focus public.purushartha_enum,
    inner_state public.inner_state_enum,
    nature public.svabhava_enum,
    journey_stage_id uuid,
    subscription_tier_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.spiritual_profiles OWNER TO ppublications;

--
-- Name: subscription_tiers; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.subscription_tiers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    level integer DEFAULT 1 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.subscription_tiers OWNER TO ppublications;

--
-- Name: synonyms; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.synonyms (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text_id uuid NOT NULL,
    word text NOT NULL,
    meaning text,
    language public.language_enum,
    order_index integer
);


ALTER TABLE public.synonyms OWNER TO ppublications;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.tags (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    slug text NOT NULL,
    name text,
    description text,
    keywords text[],
    type text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    parent_id uuid,
    sanskrit_name text,
    "libraryItemId" uuid
);


ALTER TABLE public.tags OWNER TO ppublications;

--
-- Name: text_embeddings; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.text_embeddings (
    text_id uuid NOT NULL,
    embedding public.vector(384) NOT NULL,
    model text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.text_embeddings OWNER TO ppublications;

--
-- Name: text_metadata; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.text_metadata (
    text_id uuid NOT NULL,
    life_stages public.life_stage_enum[],
    guidance_levels public.guidance_level_enum[],
    is_sensitive boolean DEFAULT false NOT NULL
);


ALTER TABLE public.text_metadata OWNER TO ppublications;

--
-- Name: text_versions; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.text_versions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text_id uuid NOT NULL,
    content text,
    content_type public.content_type_enum,
    language public.language_enum,
    script public.script_enum,
    source_id uuid,
    version_number integer,
    updated_by text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.text_versions OWNER TO ppublications;

--
-- Name: texts; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.texts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    node_id uuid NOT NULL,
    content_type public.content_type_enum NOT NULL,
    language public.language_enum NOT NULL,
    script public.script_enum NOT NULL,
    content text NOT NULL,
    source_id uuid,
    is_primary boolean DEFAULT false NOT NULL,
    anchor_word text,
    segment_order integer,
    status public.content_status_enum DEFAULT 'ACTIVE'::public.content_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.texts OWNER TO ppublications;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    org_id uuid NOT NULL,
    amount numeric(65,30) NOT NULL,
    type public.transaction_type_enum NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    source_account_id uuid,
    destination_account_id uuid,
    category text NOT NULL,
    purpose text NOT NULL,
    program_id uuid,
    "paymentMethod" public.payment_method_enum NOT NULL,
    recorded_by_id uuid NOT NULL,
    approved_by_id uuid,
    status public.transaction_status_enum DEFAULT 'PENDING'::public.transaction_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    CONSTRAINT transactions_amount_positive CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.transactions OWNER TO ppublications;

--
-- Name: user_curve_progress; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.user_curve_progress (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    curve_id uuid NOT NULL,
    current_step_id uuid,
    is_completed boolean DEFAULT false NOT NULL,
    started_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at timestamp(3) without time zone
);


ALTER TABLE public.user_curve_progress OWNER TO ppublications;

--
-- Name: user_node_progress; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.user_node_progress (
    user_id uuid NOT NULL,
    node_id uuid NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    last_accessed timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_node_progress OWNER TO ppublications;

--
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.user_preferences (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    "notificationPrefs" jsonb DEFAULT '{"sms": false, "email": true, "whatsapp": false}'::jsonb,
    metadata jsonb DEFAULT '{}'::jsonb,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.user_preferences OWNER TO ppublications;

--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.user_profiles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    full_name text,
    phone_number text,
    whatsapp_number text,
    alternate_phone text,
    emergency_contact text,
    avatar_url text,
    gender public.gender_enum,
    date_of_birth timestamp(3) without time zone,
    marital_status text,
    education text,
    occupation text,
    skills text[] DEFAULT ARRAY[]::text[],
    interests text[] DEFAULT ARRAY[]::text[],
    native_place text,
    address_line1 text,
    address_line2 text,
    village text,
    city text,
    state text,
    pin_code text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.user_profiles OWNER TO ppublications;

--
-- Name: user_statistics; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.user_statistics (
    user_id uuid NOT NULL,
    nodes_read_count integer DEFAULT 0 NOT NULL,
    courses_completed integer DEFAULT 0 NOT NULL,
    contribution_points integer DEFAULT 0 NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_statistics OWNER TO ppublications;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    password text,
    is_online boolean DEFAULT true NOT NULL,
    email_verified timestamp(3) without time zone,
    verification_token text,
    reset_token text,
    reset_token_expires timestamp(3) without time zone,
    roles public.user_role_enum[] DEFAULT ARRAY['student'::public.user_role_enum],
    status public.user_status_enum DEFAULT 'ACTIVE'::public.user_status_enum NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_anonymized boolean DEFAULT false NOT NULL,
    anonymized_at timestamp(3) without time zone,
    failed_login_attempts integer DEFAULT 0 NOT NULL,
    account_locked_until timestamp(3) without time zone,
    created_by_id uuid,
    updated_by_id uuid,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_active timestamp(3) without time zone
);


ALTER TABLE public.users OWNER TO ppublications;

--
-- Name: vedic_events; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.vedic_events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text,
    host_id uuid NOT NULL,
    start_time timestamp(3) without time zone NOT NULL,
    end_time timestamp(3) without time zone NOT NULL,
    type public.event_type_enum DEFAULT 'LIVE_SATSANG'::public.event_type_enum NOT NULL,
    category text,
    platform text DEFAULT 'ZOOM'::text NOT NULL,
    link text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.vedic_events OWNER TO ppublications;

--
-- Name: webhook_events; Type: TABLE; Schema: public; Owner: ppublications
--

CREATE TABLE public.webhook_events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    provider text NOT NULL,
    event_type text NOT NULL,
    external_id text,
    payload jsonb,
    processed boolean DEFAULT false NOT NULL,
    processed_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.webhook_events OWNER TO ppublications;

--
-- Name: _CommunicationCampaignToLibraryItem _CommunicationCampaignToLibraryItem_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public."_CommunicationCampaignToLibraryItem"
    ADD CONSTRAINT "_CommunicationCampaignToLibraryItem_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: benefits benefits_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.benefits
    ADD CONSTRAINT benefits_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id);


--
-- Name: circle_members circle_members_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circle_members
    ADD CONSTRAINT circle_members_pkey PRIMARY KEY (user_id, circle_id);


--
-- Name: circle_posts circle_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circle_posts
    ADD CONSTRAINT circle_posts_pkey PRIMARY KEY (id);


--
-- Name: circles circles_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_pkey PRIMARY KEY (id);


--
-- Name: communication_campaigns communication_campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_pkey PRIMARY KEY (id);


--
-- Name: communication_logs communication_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_pkey PRIMARY KEY (id);


--
-- Name: communication_templates communication_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_templates
    ADD CONSTRAINT communication_templates_pkey PRIMARY KEY (id);


--
-- Name: compliance_records compliance_records_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.compliance_records
    ADD CONSTRAINT compliance_records_pkey PRIMARY KEY (id);


--
-- Name: content_access_rules content_access_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.content_access_rules
    ADD CONSTRAINT content_access_rules_pkey PRIMARY KEY (id);


--
-- Name: contributions contributions_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_pkey PRIMARY KEY (id);


--
-- Name: document_access document_access_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.document_access
    ADD CONSTRAINT document_access_pkey PRIMARY KEY (id);


--
-- Name: document_versions document_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_pkey PRIMARY KEY (id);


--
-- Name: donation_cause_options donation_cause_options_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_cause_options
    ADD CONSTRAINT donation_cause_options_pkey PRIMARY KEY (id);


--
-- Name: donation_causes donation_causes_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_causes
    ADD CONSTRAINT donation_causes_pkey PRIMARY KEY (id);


--
-- Name: donation_receipts donation_receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_pkey PRIMARY KEY (id);


--
-- Name: event_registrations event_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (user_id, event_id);


--
-- Name: external_integrations external_integrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.external_integrations
    ADD CONSTRAINT external_integrations_pkey PRIMARY KEY (id);


--
-- Name: external_references external_references_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.external_references
    ADD CONSTRAINT external_references_pkey PRIMARY KEY (id);


--
-- Name: family_links family_links_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.family_links
    ADD CONSTRAINT family_links_pkey PRIMARY KEY (id);


--
-- Name: family_nodes family_nodes_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.family_nodes
    ADD CONSTRAINT family_nodes_pkey PRIMARY KEY (id);


--
-- Name: file_assets file_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.file_assets
    ADD CONSTRAINT file_assets_pkey PRIMARY KEY (id);


--
-- Name: financial_accounts financial_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.financial_accounts
    ADD CONSTRAINT financial_accounts_pkey PRIMARY KEY (id);


--
-- Name: guidance_assignments guidance_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.guidance_assignments
    ADD CONSTRAINT guidance_assignments_pkey PRIMARY KEY (id);


--
-- Name: guidance_sessions guidance_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.guidance_sessions
    ADD CONSTRAINT guidance_sessions_pkey PRIMARY KEY (id);


--
-- Name: highlights highlights_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.highlights
    ADD CONSTRAINT highlights_pkey PRIMARY KEY (id);


--
-- Name: learning_curve_steps learning_curve_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.learning_curve_steps
    ADD CONSTRAINT learning_curve_steps_pkey PRIMARY KEY (id);


--
-- Name: learning_curves learning_curves_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.learning_curves
    ADD CONSTRAINT learning_curves_pkey PRIMARY KEY (id);


--
-- Name: legal_documents legal_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.legal_documents
    ADD CONSTRAINT legal_documents_pkey PRIMARY KEY (id);


--
-- Name: library_downloads library_downloads_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_downloads
    ADD CONSTRAINT library_downloads_pkey PRIMARY KEY (id);


--
-- Name: library_items library_items_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_pkey PRIMARY KEY (id);


--
-- Name: library_versions library_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_versions
    ADD CONSTRAINT library_versions_pkey PRIMARY KEY (id);


--
-- Name: life_journey_stages life_journey_stages_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.life_journey_stages
    ADD CONSTRAINT life_journey_stages_pkey PRIMARY KEY (id);


--
-- Name: node_relations node_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.node_relations
    ADD CONSTRAINT node_relations_pkey PRIMARY KEY (id);


--
-- Name: node_tags node_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.node_tags
    ADD CONSTRAINT node_tags_pkey PRIMARY KEY (node_id, tag_id);


--
-- Name: nodes nodes_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT nodes_pkey PRIMARY KEY (id);


--
-- Name: org_members org_members_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.org_members
    ADD CONSTRAINT org_members_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: payment_records payment_records_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.payment_records
    ADD CONSTRAINT payment_records_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: secure_share_link_documents secure_share_link_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.secure_share_link_documents
    ADD CONSTRAINT secure_share_link_documents_pkey PRIMARY KEY (link_id, document_id);


--
-- Name: secure_share_links secure_share_links_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.secure_share_links
    ADD CONSTRAINT secure_share_links_pkey PRIMARY KEY (id);


--
-- Name: shastras shastras_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.shastras
    ADD CONSTRAINT shastras_pkey PRIMARY KEY (id);


--
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- Name: spiritual_profiles spiritual_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.spiritual_profiles
    ADD CONSTRAINT spiritual_profiles_pkey PRIMARY KEY (id);


--
-- Name: subscription_tiers subscription_tiers_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.subscription_tiers
    ADD CONSTRAINT subscription_tiers_pkey PRIMARY KEY (id);


--
-- Name: synonyms synonyms_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.synonyms
    ADD CONSTRAINT synonyms_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: text_embeddings text_embeddings_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.text_embeddings
    ADD CONSTRAINT text_embeddings_pkey PRIMARY KEY (text_id);


--
-- Name: text_metadata text_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.text_metadata
    ADD CONSTRAINT text_metadata_pkey PRIMARY KEY (text_id);


--
-- Name: text_versions text_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.text_versions
    ADD CONSTRAINT text_versions_pkey PRIMARY KEY (id);


--
-- Name: texts texts_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT texts_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_curve_progress user_curve_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_pkey PRIMARY KEY (id);


--
-- Name: user_node_progress user_node_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_node_progress
    ADD CONSTRAINT user_node_progress_pkey PRIMARY KEY (user_id, node_id);


--
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: user_statistics user_statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_statistics
    ADD CONSTRAINT user_statistics_pkey PRIMARY KEY (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vedic_events vedic_events_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.vedic_events
    ADD CONSTRAINT vedic_events_pkey PRIMARY KEY (id);


--
-- Name: webhook_events webhook_events_pkey; Type: CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.webhook_events
    ADD CONSTRAINT webhook_events_pkey PRIMARY KEY (id);


--
-- Name: _CommunicationCampaignToLibraryItem_B_index; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX "_CommunicationCampaignToLibraryItem_B_index" ON public."_CommunicationCampaignToLibraryItem" USING btree ("B");


--
-- Name: circles_slug_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX circles_slug_key ON public.circles USING btree (slug);


--
-- Name: communication_logs_org_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX communication_logs_org_id_idx ON public.communication_logs USING btree (org_id);


--
-- Name: communication_logs_user_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX communication_logs_user_id_idx ON public.communication_logs USING btree (user_id);


--
-- Name: compliance_records_org_id_status_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX compliance_records_org_id_status_idx ON public.compliance_records USING btree (org_id, status);


--
-- Name: contributions_transaction_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX contributions_transaction_id_key ON public.contributions USING btree (transaction_id);


--
-- Name: donation_causes_org_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX donation_causes_org_id_idx ON public.donation_causes USING btree (org_id);


--
-- Name: donation_causes_path_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX donation_causes_path_idx ON public.donation_causes USING btree (path);


--
-- Name: donation_receipts_file_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX donation_receipts_file_id_key ON public.donation_receipts USING btree (file_id);


--
-- Name: donation_receipts_receipt_number_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX donation_receipts_receipt_number_key ON public.donation_receipts USING btree (receipt_number);


--
-- Name: donation_receipts_transaction_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX donation_receipts_transaction_id_key ON public.donation_receipts USING btree (transaction_id);


--
-- Name: external_references_entity_type_entity_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX external_references_entity_type_entity_id_idx ON public.external_references USING btree (entity_type, entity_id);


--
-- Name: external_references_provider_external_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX external_references_provider_external_id_idx ON public.external_references USING btree (provider, external_id);


--
-- Name: family_links_user_id_related_id_type_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX family_links_user_id_related_id_type_key ON public.family_links USING btree (user_id, related_id, type);


--
-- Name: family_nodes_family_group_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX family_nodes_family_group_id_idx ON public.family_nodes USING btree (family_group_id);


--
-- Name: family_nodes_path_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX family_nodes_path_idx ON public.family_nodes USING btree (path);


--
-- Name: file_assets_org_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX file_assets_org_id_idx ON public.file_assets USING btree (org_id);


--
-- Name: file_assets_related_entity_related_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX file_assets_related_entity_related_id_idx ON public.file_assets USING btree (related_entity, related_id);


--
-- Name: guidance_assignments_guide_id_student_id_assignment_type_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX guidance_assignments_guide_id_student_id_assignment_type_key ON public.guidance_assignments USING btree (guide_id, student_id, assignment_type);


--
-- Name: idx_comm_lib; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX idx_comm_lib ON public.communication_logs USING btree (library_item_id);


--
-- Name: idx_lib_downloads; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX idx_lib_downloads ON public.library_downloads USING btree (library_item_id, user_id);


--
-- Name: idx_lib_type; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX idx_lib_type ON public.library_items USING btree (type, language);


--
-- Name: idx_nodes_active; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX idx_nodes_active ON public.nodes USING btree (id) WHERE (deleted_at IS NULL);


--
-- Name: idx_shastras_active; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX idx_shastras_active ON public.shastras USING btree (id) WHERE (deleted_at IS NULL);


--
-- Name: idx_users_active; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX idx_users_active ON public.users USING btree (id) WHERE (deleted_at IS NULL);


--
-- Name: learning_curve_steps_curve_id_step_order_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX learning_curve_steps_curve_id_step_order_key ON public.learning_curve_steps USING btree (curve_id, step_order);


--
-- Name: library_downloads_library_item_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX library_downloads_library_item_id_idx ON public.library_downloads USING btree (library_item_id);


--
-- Name: library_items_file_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX library_items_file_id_key ON public.library_items USING btree (file_id);


--
-- Name: library_items_org_id_type_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX library_items_org_id_type_idx ON public.library_items USING btree (org_id, type);


--
-- Name: library_items_slug_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX library_items_slug_key ON public.library_items USING btree (slug);


--
-- Name: life_journey_stages_slug_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX life_journey_stages_slug_key ON public.life_journey_stages USING btree (slug);


--
-- Name: life_journey_stages_stage_number_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX life_journey_stages_stage_number_key ON public.life_journey_stages USING btree (stage_number);


--
-- Name: nodes_path_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX nodes_path_idx ON public.nodes USING gist (path);


--
-- Name: payment_records_transaction_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX payment_records_transaction_id_key ON public.payment_records USING btree (transaction_id);


--
-- Name: secure_share_links_token_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX secure_share_links_token_key ON public.secure_share_links USING btree (token);


--
-- Name: shastras_slug_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX shastras_slug_key ON public.shastras USING btree (slug);


--
-- Name: spiritual_profiles_user_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX spiritual_profiles_user_id_key ON public.spiritual_profiles USING btree (user_id);


--
-- Name: tags_slug_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX tags_slug_key ON public.tags USING btree (slug);


--
-- Name: texts_node_id_content_type_language_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX texts_node_id_content_type_language_idx ON public.texts USING btree (node_id, content_type, language);


--
-- Name: texts_node_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX texts_node_id_idx ON public.texts USING btree (node_id);


--
-- Name: transactions_approved_by_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX transactions_approved_by_id_idx ON public.transactions USING btree (approved_by_id);


--
-- Name: transactions_org_id_date_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX transactions_org_id_date_idx ON public.transactions USING btree (org_id, date);


--
-- Name: transactions_recorded_by_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX transactions_recorded_by_id_idx ON public.transactions USING btree (recorded_by_id);


--
-- Name: user_curve_progress_user_id_curve_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX user_curve_progress_user_id_curve_id_key ON public.user_curve_progress USING btree (user_id, curve_id);


--
-- Name: user_preferences_user_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX user_preferences_user_id_key ON public.user_preferences USING btree (user_id);


--
-- Name: user_profiles_user_id_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX user_profiles_user_id_key ON public.user_profiles USING btree (user_id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: webhook_events_external_id_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX webhook_events_external_id_idx ON public.webhook_events USING btree (external_id);


--
-- Name: webhook_events_provider_event_type_idx; Type: INDEX; Schema: public; Owner: ppublications
--

CREATE INDEX webhook_events_provider_event_type_idx ON public.webhook_events USING btree (provider, event_type);


--
-- Name: transactions trigger_immutable_ledger; Type: TRIGGER; Schema: public; Owner: ppublications
--

CREATE TRIGGER trigger_immutable_ledger BEFORE DELETE OR UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.protect_immutable_ledger();


--
-- Name: transactions trigger_transaction_audit; Type: TRIGGER; Schema: public; Owner: ppublications
--

CREATE TRIGGER trigger_transaction_audit AFTER UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.log_transaction_change();


--
-- Name: _CommunicationCampaignToLibraryItem _CommunicationCampaignToLibraryItem_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public."_CommunicationCampaignToLibraryItem"
    ADD CONSTRAINT "_CommunicationCampaignToLibraryItem_A_fkey" FOREIGN KEY ("A") REFERENCES public.communication_campaigns(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CommunicationCampaignToLibraryItem _CommunicationCampaignToLibraryItem_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public."_CommunicationCampaignToLibraryItem"
    ADD CONSTRAINT "_CommunicationCampaignToLibraryItem_B_fkey" FOREIGN KEY ("B") REFERENCES public.library_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity_logs activity_logs_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity_logs activity_logs_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_performed_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_performed_by_id_fkey FOREIGN KEY (performed_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: audit_logs audit_logs_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: benefits benefits_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.benefits
    ADD CONSTRAINT benefits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bookmarks bookmarks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: circle_members circle_members_circle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circle_members
    ADD CONSTRAINT circle_members_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: circle_members circle_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circle_members
    ADD CONSTRAINT circle_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: circle_posts circle_posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circle_posts
    ADD CONSTRAINT circle_posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: circle_posts circle_posts_circle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circle_posts
    ADD CONSTRAINT circle_posts_circle_id_fkey FOREIGN KEY (circle_id) REFERENCES public.circles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: circles circles_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.circles
    ADD CONSTRAINT circles_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: communication_campaigns communication_campaigns_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: communication_campaigns communication_campaigns_target_tier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_campaigns
    ADD CONSTRAINT communication_campaigns_target_tier_id_fkey FOREIGN KEY (target_tier_id) REFERENCES public.subscription_tiers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.communication_campaigns(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.communication_templates(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: communication_logs communication_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.communication_logs
    ADD CONSTRAINT communication_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: compliance_records compliance_records_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.compliance_records
    ADD CONSTRAINT compliance_records_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: compliance_records compliance_records_responsible_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.compliance_records
    ADD CONSTRAINT compliance_records_responsible_id_fkey FOREIGN KEY (responsible_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: compliance_records compliance_records_supervisor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.compliance_records
    ADD CONSTRAINT compliance_records_supervisor_id_fkey FOREIGN KEY (supervisor_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: content_access_rules content_access_rules_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.content_access_rules
    ADD CONSTRAINT content_access_rules_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contributions contributions_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: contributions contributions_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contributions contributions_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: contributions contributions_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contributions contributions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: document_access document_access_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.document_access
    ADD CONSTRAINT document_access_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.legal_documents(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: document_versions document_versions_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.legal_documents(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: donation_cause_options donation_cause_options_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_cause_options
    ADD CONSTRAINT donation_cause_options_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: donation_causes donation_causes_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_causes
    ADD CONSTRAINT donation_causes_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: donation_causes donation_causes_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_causes
    ADD CONSTRAINT donation_causes_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.donation_causes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: donation_receipts donation_receipts_issued_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_issued_by_id_fkey FOREIGN KEY (issued_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: donation_receipts donation_receipts_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: donation_receipts donation_receipts_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: donation_receipts donation_receipts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.donation_receipts
    ADD CONSTRAINT donation_receipts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: event_registrations event_registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.vedic_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_registrations event_registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: external_integrations external_integrations_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.external_integrations
    ADD CONSTRAINT external_integrations_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: family_links family_links_related_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.family_links
    ADD CONSTRAINT family_links_related_id_fkey FOREIGN KEY (related_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: family_links family_links_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.family_links
    ADD CONSTRAINT family_links_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: family_nodes family_nodes_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.family_nodes
    ADD CONSTRAINT family_nodes_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.family_nodes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: family_nodes family_nodes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.family_nodes
    ADD CONSTRAINT family_nodes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: file_assets file_assets_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.file_assets
    ADD CONSTRAINT file_assets_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: file_assets file_assets_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.file_assets
    ADD CONSTRAINT file_assets_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: file_assets file_assets_uploaded_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.file_assets
    ADD CONSTRAINT file_assets_uploaded_by_id_fkey FOREIGN KEY (uploaded_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: financial_accounts financial_accounts_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.financial_accounts
    ADD CONSTRAINT financial_accounts_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: guidance_assignments guidance_assignments_guide_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.guidance_assignments
    ADD CONSTRAINT guidance_assignments_guide_id_fkey FOREIGN KEY (guide_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: guidance_assignments guidance_assignments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.guidance_assignments
    ADD CONSTRAINT guidance_assignments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: guidance_sessions guidance_sessions_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.guidance_sessions
    ADD CONSTRAINT guidance_sessions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.guidance_assignments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: highlights highlights_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.highlights
    ADD CONSTRAINT highlights_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: highlights highlights_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.highlights
    ADD CONSTRAINT highlights_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: learning_curve_steps learning_curve_steps_curve_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.learning_curve_steps
    ADD CONSTRAINT learning_curve_steps_curve_id_fkey FOREIGN KEY (curve_id) REFERENCES public.learning_curves(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: learning_curve_steps learning_curve_steps_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.learning_curve_steps
    ADD CONSTRAINT learning_curve_steps_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: legal_documents legal_documents_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.legal_documents
    ADD CONSTRAINT legal_documents_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: library_downloads library_downloads_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_downloads
    ADD CONSTRAINT library_downloads_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: library_downloads library_downloads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_downloads
    ADD CONSTRAINT library_downloads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: library_items library_items_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_items
    ADD CONSTRAINT library_items_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file_assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: library_versions library_versions_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_versions
    ADD CONSTRAINT library_versions_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file_assets(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: library_versions library_versions_library_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.library_versions
    ADD CONSTRAINT library_versions_library_item_id_fkey FOREIGN KEY (library_item_id) REFERENCES public.library_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: node_relations node_relations_from_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.node_relations
    ADD CONSTRAINT node_relations_from_node_id_fkey FOREIGN KEY (from_node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: node_relations node_relations_to_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.node_relations
    ADD CONSTRAINT node_relations_to_node_id_fkey FOREIGN KEY (to_node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: node_tags node_tags_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.node_tags
    ADD CONSTRAINT node_tags_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: node_tags node_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.node_tags
    ADD CONSTRAINT node_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nodes nodes_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT nodes_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nodes nodes_shastra_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT nodes_shastra_id_fkey FOREIGN KEY (shastra_id) REFERENCES public.shastras(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: org_members org_members_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.org_members
    ADD CONSTRAINT org_members_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: org_members org_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.org_members
    ADD CONSTRAINT org_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: payment_records payment_records_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.payment_records
    ADD CONSTRAINT payment_records_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: projects projects_cause_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_cause_id_fkey FOREIGN KEY (cause_id) REFERENCES public.donation_causes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: projects projects_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: secure_share_link_documents secure_share_link_documents_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.secure_share_link_documents
    ADD CONSTRAINT secure_share_link_documents_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.legal_documents(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: secure_share_link_documents secure_share_link_documents_link_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.secure_share_link_documents
    ADD CONSTRAINT secure_share_link_documents_link_id_fkey FOREIGN KEY (link_id) REFERENCES public.secure_share_links(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: spiritual_profiles spiritual_profiles_journey_stage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.spiritual_profiles
    ADD CONSTRAINT spiritual_profiles_journey_stage_id_fkey FOREIGN KEY (journey_stage_id) REFERENCES public.life_journey_stages(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: spiritual_profiles spiritual_profiles_subscription_tier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.spiritual_profiles
    ADD CONSTRAINT spiritual_profiles_subscription_tier_id_fkey FOREIGN KEY (subscription_tier_id) REFERENCES public.subscription_tiers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: spiritual_profiles spiritual_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.spiritual_profiles
    ADD CONSTRAINT spiritual_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subscription_tiers subscription_tiers_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.subscription_tiers
    ADD CONSTRAINT subscription_tiers_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: synonyms synonyms_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.synonyms
    ADD CONSTRAINT synonyms_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tags tags_libraryItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "tags_libraryItemId_fkey" FOREIGN KEY ("libraryItemId") REFERENCES public.library_items(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tags tags_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: text_embeddings text_embeddings_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.text_embeddings
    ADD CONSTRAINT text_embeddings_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: text_metadata text_metadata_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.text_metadata
    ADD CONSTRAINT text_metadata_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: text_versions text_versions_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.text_versions
    ADD CONSTRAINT text_versions_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: text_versions text_versions_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.text_versions
    ADD CONSTRAINT text_versions_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.texts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: texts texts_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT texts_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: texts texts_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT texts_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.sources(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_approved_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_approved_by_id_fkey FOREIGN KEY (approved_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_destination_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_destination_account_id_fkey FOREIGN KEY (destination_account_id) REFERENCES public.financial_accounts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transactions transactions_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_recorded_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_recorded_by_id_fkey FOREIGN KEY (recorded_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: transactions transactions_source_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_source_account_id_fkey FOREIGN KEY (source_account_id) REFERENCES public.financial_accounts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_curve_progress user_curve_progress_current_step_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_current_step_id_fkey FOREIGN KEY (current_step_id) REFERENCES public.learning_curve_steps(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_curve_progress user_curve_progress_curve_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_curve_id_fkey FOREIGN KEY (curve_id) REFERENCES public.learning_curves(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_curve_progress user_curve_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_curve_progress
    ADD CONSTRAINT user_curve_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_node_progress user_node_progress_node_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_node_progress
    ADD CONSTRAINT user_node_progress_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.nodes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_node_progress user_node_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_node_progress
    ADD CONSTRAINT user_node_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_preferences user_preferences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_statistics user_statistics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.user_statistics
    ADD CONSTRAINT user_statistics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vedic_events vedic_events_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ppublications
--

ALTER TABLE ONLY public.vedic_events
    ADD CONSTRAINT vedic_events_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ppublications
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict ziAzpOmrAchyGiqCaU4bRtNdZwBR7DsYPN8Hn7pYYyxDmae2c3dnqmzQmY5wDFJ

