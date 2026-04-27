-- PHASE 2: Sync
-- Entity: user_preferences (INSERT)
-- Responsibility: Mirror new preferences to identity schema

CREATE OR REPLACE FUNCTION public.fn_sync_user_preferences_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    INSERT INTO identity.user_preferences (
        user_id,
        notification_prefs,
        metadata,
        notes,
        created_at,
        updated_at
    )
    VALUES (
        NEW.user_id,
        NEW.notification_prefs,
        NEW.metadata,
        NEW.notes,
        NEW.created_at,
        NEW.updated_at
    )
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_preferences_insert ON public.user_preferences;

CREATE TRIGGER trg_sync_user_preferences_insert
AFTER INSERT ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_preferences_insert();