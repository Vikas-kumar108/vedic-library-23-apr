-- PHASE 2: Sync
-- Entity: users (DELETE → Soft Delete)
-- Responsibility: Mirror deletion as soft delete

CREATE OR REPLACE FUNCTION public.fn_sync_user_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent recursion
    IF pg_trigger_depth() > 1 THEN
        RETURN OLD;
    END IF;

    UPDATE identity.users
    SET
        deleted_at = NOW(),
        is_anonymized = TRUE,
        updated_at = NOW()
    WHERE id = OLD.id;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_delete ON public.users;

CREATE TRIGGER trg_sync_user_delete
AFTER DELETE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_delete();