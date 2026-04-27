Generate PHASE 2: sync scripts using PostgreSQL triggers.

Location:
database/migrations/identity/sync/

Files:

1. 001__sync__users_insert.sql
2. 002__sync__users_update.sql
3. 003__sync__users_delete.sql

---

STRICT REQUIREMENTS:

1. Source table: public.users

2. Target table: identity.users

3. Must handle:

   * INSERT
   * UPDATE
   * DELETE

4. MUST prevent infinite recursion

5. MUST preserve UUID

6. MUST handle enum casting safely

7. Use:

   * CREATE OR REPLACE FUNCTION
   * CREATE TRIGGER

8. Must be idempotent

---

OUTPUT:

* One file at a time
* SQL + short explanation

DO NOT skip recursion handling
