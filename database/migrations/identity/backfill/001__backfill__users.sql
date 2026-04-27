-- PHASE 1: Backfill
-- Entity: users
-- Responsibility: Copy base user credentials and status safely

INSERT INTO identity.users (
    id, 
    email, 
    password, 
    is_online, 
    email_verified, 
    roles, 
    status, 
    failed_login_attempts, 
    account_locked_until, 
    verification_token, 
    reset_token, 
    reset_token_expires, 
    deleted_at, 
    is_anonymized, 
    anonymized_at, 
    created_at, 
    updated_at, 
    last_active
)
SELECT 
    u.id, 
    u.email, 
    u.password, 
    u.is_online, 
    u.email_verified, 

    -- SAFE ARRAY ENUM CAST
    CASE 
        WHEN u.roles IS NOT NULL THEN ARRAY(
            SELECT r::text::identity.user_role_enum
            FROM unnest(u.roles) AS r
        )
        ELSE NULL
    END,

    -- SAFE STATUS CAST
    CASE 
        WHEN u.status IS NOT NULL THEN u.status::text::identity.user_status_enum
        ELSE NULL
    END,

    u.failed_login_attempts, 
    u.account_locked_until, 
    u.verification_token, 
    u.reset_token, 
    u.reset_token_expires, 
    u.deleted_at, 
    u.is_anonymized, 
    u.anonymized_at, 
    u.created_at, 
    u.updated_at, 
    u.last_active

FROM public.users u

ON CONFLICT (id) DO NOTHING;

-- Observability Check (Critical)
SELECT 
    (SELECT COUNT(*) FROM public.users)   AS public_count,
    (SELECT COUNT(*) FROM identity.users) AS identity_count;