-- PHASE 2: Sync
-- Entity: user_profiles (INSERT)
-- Responsibility: Mirror new profiles to identity schema

CREATE OR REPLACE FUNCTION public.fn_sync_user_profiles_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    INSERT INTO identity.user_profiles (
        user_id,
        full_name,
        phone_number,
        whatsapp_number,
        avatar_url,
        gender,
        date_of_birth,
        village,
        city,
        state,
        pin_code,
        created_at,
        updated_at
    )
    VALUES (
        NEW.user_id,
        NEW.full_name,
        NEW.phone_number,
        NEW.whatsapp_number,
        NEW.avatar_url,
        NEW.gender::text::identity.gender_enum,
        NEW.date_of_birth,
        NEW.village,
        NEW.city,
        NEW.state,
        NEW.pin_code,
        NEW.created_at,
        NEW.updated_at
    )
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_profiles_insert ON public.user_profiles;

CREATE TRIGGER trg_sync_user_profiles_insert
AFTER INSERT ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_profiles_insert();