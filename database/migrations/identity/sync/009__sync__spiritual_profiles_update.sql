-- PHASE 2: Sync
-- Entity: spiritual_profiles (UPDATE)
-- Responsibility: Mirror updates safely

CREATE OR REPLACE FUNCTION public.fn_sync_spiritual_profiles_update()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    UPDATE identity.spiritual_profiles
    SET
        age_group = CASE WHEN NEW.age_group IS NOT NULL THEN NEW.age_group::text::identity.age_group_enum ELSE NULL END,
        life_stage = CASE WHEN NEW.life_stage IS NOT NULL THEN NEW.life_stage::text::identity.life_stage_enum ELSE NULL END,
        eligibility_level = NEW.eligibility_level,
        primary_focus = CASE WHEN NEW.primary_focus IS NOT NULL THEN NEW.primary_focus::text::identity.purushartha_enum ELSE NULL END,
        inner_state = CASE WHEN NEW.inner_state IS NOT NULL THEN NEW.inner_state::text::identity.inner_state_enum ELSE NULL END,
        nature = CASE WHEN NEW.nature IS NOT NULL THEN NEW.nature::text::identity.svabhava_enum ELSE NULL END,
        updated_at = NEW.updated_at
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_spiritual_profiles_update ON public.spiritual_profiles;

CREATE TRIGGER trg_sync_spiritual_profiles_update
AFTER UPDATE ON public.spiritual_profiles
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_spiritual_profiles_update();