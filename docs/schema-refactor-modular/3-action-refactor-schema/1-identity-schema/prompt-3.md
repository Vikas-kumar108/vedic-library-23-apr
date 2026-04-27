The Prisma schema has now been stabilized.

Current state:

* prisma.users → public.users (active system)
* prisma.identity_users → identity.users (unused)
* All application flows are working correctly

---

Important:

* identity schema is currently empty / not in use
* public schema is still the source of truth

---

Task:

Design a SAFE migration strategy from public.users → identity.users.

Do NOT assume migration has started.

---

Provide:

1. Data migration approach:

   * One-time migration vs phased migration
   * Handling existing relations (foreign keys across many tables)

2. Read/Write strategy:

   * When to start writing to identity.users
   * Whether to use dual-write or cutover

3. Handling user_id consistency:

   * UUID preservation
   * Referential integrity

4. Impact on:

   * JWT tokens
   * AuthService
   * RBAC

5. Rollback strategy:

   * If migration fails

---

Constraints:

* Zero downtime
* No data loss
* No breaking existing APIs

---

Focus on real-world, production-safe migration planning — not theoretical.
