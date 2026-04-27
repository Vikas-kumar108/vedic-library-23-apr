-- PHASE 2: Sync
-- Entity: user_profiles (UPDATE)
-- Responsibility: Mirror profile updates to identity schema

CREATE OR REPLACE FUNCTION public.fn_sync_user_profiles_update()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    UPDATE identity.user_profiles
    SET
        full_name = NEW.full_name,
        phone_number = NEW.phone_number,
        whatsapp_number = NEW.whatsapp_number,
        avatar_url = NEW.avatar_url,
        gender = NEW.gender::text::identity.gender_enum,
        date_of_birth = NEW.date_of_birth,
        village = NEW.village,
        city = NEW.city,
        state = NEW.state,
        pin_code = NEW.pin_code,
        updated_at = NEW.updated_at
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_profiles_update ON public.user_profiles;

CREATE TRIGGER trg_sync_user_profiles_update
AFTER UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_profiles_update();