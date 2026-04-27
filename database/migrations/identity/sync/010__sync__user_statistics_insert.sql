-- PHASE 2: Sync
-- Entity: user_statistics (INSERT)
-- Responsibility: Mirror stats creation

CREATE OR REPLACE FUNCTION public.fn_sync_user_statistics_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    INSERT INTO identity.user_statistics (
        user_id,
        nodes_read_count,
        courses_completed,
        contribution_points,
        updated_at
    )
    VALUES (
        NEW.user_id,
        NEW.nodes_read_count,
        NEW.courses_completed,
        NEW.contribution_points,
        NEW.updated_at
    )
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_statistics_insert ON public.user_statistics;

CREATE TRIGGER trg_sync_user_statistics_insert
AFTER INSERT ON public.user_statistics
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_statistics_insert();