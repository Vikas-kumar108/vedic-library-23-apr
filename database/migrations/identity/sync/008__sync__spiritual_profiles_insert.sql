-- PHASE 2: Sync
-- Entity: spiritual_profiles (INSERT)
-- Responsibility: Mirror new spiritual profiles

CREATE OR REPLACE FUNCTION public.fn_sync_spiritual_profiles_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    INSERT INTO identity.spiritual_profiles (
        user_id,
        age_group,
        life_stage,
        eligibility_level,
        primary_focus,
        inner_state,
        nature,
        created_at,
        updated_at
    )
    VALUES (
        NEW.user_id,
        CASE WHEN NEW.age_group IS NOT NULL THEN NEW.age_group::text::identity.age_group_enum ELSE NULL END,
        CASE WHEN NEW.life_stage IS NOT NULL THEN NEW.life_stage::text::identity.life_stage_enum ELSE NULL END,
        NEW.eligibility_level,
        CASE WHEN NEW.primary_focus IS NOT NULL THEN NEW.primary_focus::text::identity.purushartha_enum ELSE NULL END,
        CASE WHEN NEW.inner_state IS NOT NULL THEN NEW.inner_state::text::identity.inner_state_enum ELSE NULL END,
        CASE WHEN NEW.nature IS NOT NULL THEN NEW.nature::text::identity.svabhava_enum ELSE NULL END,
        NEW.created_at,
        NEW.updated_at
    )
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_spiritual_profiles_insert ON public.spiritual_profiles;

CREATE TRIGGER trg_sync_spiritual_profiles_insert
AFTER INSERT ON public.spiritual_profiles
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_spiritual_profiles_insert();