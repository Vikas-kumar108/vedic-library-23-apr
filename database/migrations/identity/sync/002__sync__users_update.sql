-- PHASE 2: Sync
-- Entity: users (UPDATE)
-- Responsibility: Mirror updates from public.users → identity.users

CREATE OR REPLACE FUNCTION public.fn_sync_user_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent recursion
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    UPDATE identity.users
    SET
        email = NEW.email,
        password = NEW.password,
        is_online = NEW.is_online,
        email_verified = NEW.email_verified,
        roles = NEW.roles::text[]::identity.user_role_enum[],
        status = NEW.status::text::identity.user_status_enum,
        failed_login_attempts = NEW.failed_login_attempts,
        account_locked_until = NEW.account_locked_until,
        verification_token = NEW.verification_token,
        reset_token = NEW.reset_token,
        reset_token_expires = NEW.reset_token_expires,
        deleted_at = NEW.deleted_at,
        is_anonymized = NEW.is_anonymized,
        anonymized_at = NEW.anonymized_at,
        updated_at = NEW.updated_at,
        last_active = NEW.last_active
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_update ON public.users;

CREATE TRIGGER trg_sync_user_update
AFTER UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_update();