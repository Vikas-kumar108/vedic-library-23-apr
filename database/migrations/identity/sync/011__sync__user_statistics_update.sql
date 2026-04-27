-- PHASE 2: Sync
-- Entity: user_statistics (UPDATE)
-- Responsibility: Mirror stat updates

CREATE OR REPLACE FUNCTION public.fn_sync_user_statistics_update()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    UPDATE identity.user_statistics
    SET
        nodes_read_count = NEW.nodes_read_count,
        courses_completed = NEW.courses_completed,
        contribution_points = NEW.contribution_points,
        updated_at = NEW.updated_at
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_statistics_update ON public.user_statistics;

CREATE TRIGGER trg_sync_user_statistics_update
AFTER UPDATE ON public.user_statistics
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_statistics_update();