-- PHASE 2: Sync
-- Entity: users (INSERT)
-- Responsibility: Mirror new users from public → identity safely

CREATE OR REPLACE FUNCTION public.fn_sync_user_insert()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent infinite recursion
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

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
    VALUES (
        NEW.id, 
        NEW.email, 
        NEW.password, 
        NEW.is_online, 
        NEW.email_verified, 

        -- SAFE ARRAY ENUM CAST
        CASE 
            WHEN NEW.roles IS NOT NULL THEN ARRAY(
                SELECT r::text::identity.user_role_enum
                FROM unnest(NEW.roles) AS r
            )
            ELSE NULL
        END,

        -- SAFE STATUS CAST
        CASE 
            WHEN NEW.status IS NOT NULL 
            THEN NEW.status::text::identity.user_status_enum
            ELSE NULL
        END,

        NEW.failed_login_attempts, 
        NEW.account_locked_until, 
        NEW.verification_token, 
        NEW.reset_token, 
        NEW.reset_token_expires, 
        NEW.deleted_at, 
        NEW.is_anonymized, 
        NEW.anonymized_at, 
        NEW.created_at, 
        NEW.updated_at, 
        NEW.last_active
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Idempotent trigger setup
DROP TRIGGER IF EXISTS trg_sync_user_insert ON public.users;

CREATE TRIGGER trg_sync_user_insert
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_insert();