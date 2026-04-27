We are implementing a production-grade identity migration.

You must strictly follow this migration structure:

Directory:
database/migrations/identity/

Phases:

1. backfill/
2. sync/
3. validation/
4. pre_switch/
5. post_switch/
6. decommission/

---

Naming Convention (MANDATORY):

[ORDER]**[PHASE]**[ACTION]__[ENTITY].sql

Example:
001__backfill__users.sql

---

Rules:

1. One file = one responsibility
2. All scripts must be idempotent
3. No mixing of phases
4. No assumptions outside given schema
5. No application code — only SQL

---

Wait for my instruction before generating scripts.

Do not generate anything yet.
