Generate PHASE 1: backfill scripts.

Location:
database/migrations/identity/backfill/

Files to generate:

1. 001__backfill__users.sql
2. 002__backfill__user_profiles.sql
3. 003__backfill__user_preferences.sql
4. 004__backfill__spiritual_profiles.sql
5. 005__backfill__user_statistics.sql

---

STRICT REQUIREMENTS:

1. Copy data from:
   public.* → identity.*

2. Preserve UUIDs EXACTLY (no transformations)

3. Maintain column-level accuracy:

   * Only include columns that exist in BOTH schemas
   * Do NOT assume identical structure
   * Explicitly list columns (no SELECT *)

4. Idempotency:

   * Use ON CONFLICT (PRIMARY KEY) DO NOTHING

5. Ordering:

   * users must be inserted FIRST
   * dependent tables follow

6. Safety:

   * No table locks that block writes
   * No TRUNCATE
   * No DELETE

7. Observability:

   * Each script must include a SELECT COUNT(*) check after insert

---

OUTPUT FORMAT:

For each file:

* File name as heading
* SQL script
* Short explanation (1–2 lines max)

Do not merge files.
Do not skip any table.
