Edited output-5.md
Edited 001__backfill__users.sql
Edited 002__backfill__user_profiles.sql
Edited 003__backfill__user_preferences.sql
Edited 004__backfill__spiritual_profiles.sql
Edited 005__backfill__user_statistics.sql
Edited prompt-6.md
Viewed prompt-6.md:1-47

I am generating the **PHASE 2: Sync** scripts. These triggers will ensure that every change made to the legacy `public.users` table is immediately and atomically mirrored to the new `identity.users` table.

### 📂 `database/migrations/identity/sync/`

#### 001__sync__users_insert.sql
```sql
-- PHASE 2: Sync
-- Entity: users (INSERT)
-- Responsibility: Ensure new users created in public are mirrored to identity

CREATE OR REPLACE FUNCTION public.fn_sync_user_insert()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent infinite recursion
    -- This ensures that if a trigger on identity.users eventually syncs back to public,
    -- we don't enter a loop.
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    INSERT INTO identity.users (
        id, 
        email, 
        password, 
        is_online, 
        email_verified, 
        roles, 
        status, 
        failed_login_attempts, 
        account_locked_until, 
        verification_token, 
        reset_token, 
        reset_token_expires, 
        deleted_at, 
        is_anonymized, 
        anonymized_at, 
        created_at, 
        updated_at, 
        last_active
    )
    VALUES (
        NEW.id, 
        NEW.email, 
        NEW.password, 
        NEW.is_online, 
        NEW.email_verified, 
        NEW.roles::text[]::identity.user_role_enum[], 
        NEW.status::text::identity.user_status_enum, 
        NEW.failed_login_attempts, 
        NEW.account_locked_until, 
        NEW.verification_token, 
        NEW.reset_token, 
        NEW.reset_token_expires, 
        NEW.deleted_at, 
        NEW.is_anonymized, 
        NEW.anonymized_at, 
        NEW.created_at, 
        NEW.updated_at, 
        NEW.last_active
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Idempotent trigger creation
DROP TRIGGER IF EXISTS trg_sync_user_insert ON public.users;

CREATE TRIGGER trg_sync_user_insert
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.fn_sync_user_insert();
```
*Creates an `AFTER INSERT` trigger on the legacy table. It uses `pg_trigger_depth()` to guard against recursion and performs safe cross-schema enum casting to maintain parity.*

---

**Standing by for your signal to provide the `UPDATE` and `DELETE` sync scripts.**