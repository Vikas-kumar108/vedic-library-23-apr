-- PHASE 2: Sync
-- Entity: user_preferences (UPDATE)
-- Responsibility: Mirror updates to identity schema

CREATE OR REPLACE FUNCTION public.fn_sync_user_preferences_update()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    UPDATE identity.user_preferences
    SET
        notification_prefs = NEW.notification_prefs,
        metadata = NEW.metadata,
        notes = NEW.notes,
        updated_at = NEW.updated_at
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_preferences_update ON public.user_preferences;

CREATE TRIGGER trg_sync_user_preferences_update
AFTER UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_preferences_update();