Viewed schema.prisma:1639-1691

This is a high-stakes migration. In a production environment with zero tolerance for downtime or data loss, we must treat the transition from `public` to `identity` not as a "switch" but as a **Sync-and-Pivot** lifecycle.

I have designed the **Identity Domain Migration Strategy** below.

---

### 1. Data Migration Approach: The "Live Mirror"
We will use a **Synchronization-First** approach. This allows us to populate the new schema while the system is under load without locking tables.

*   **Initial Backfill:** A one-time SQL operation to copy existing records.
    *   `INSERT INTO identity.users SELECT * FROM public.users;`
    *   This must include all related tables: `user_profiles`, `user_preferences`, etc.
*   **Real-Time Parity (Triggers over App Logic):** To ensure zero data loss during the transition, we will implement **PostgreSQL Triggers** on the `public` tables. 
    *   **Why Triggers?** They are atomic, transparent to Prisma, and capture changes from any source (BFF, Admin Panel, or manual DB patches).
    *   Every `INSERT`, `UPDATE`, or `DELETE` on `public.users` will be immediately mirrored to `identity.users`.

### 2. Read/Write Strategy: Stage-Gate Cutover
We will move through three distinct stages:

| Stage | Write Target | Read Source | Risk Level |
| :--- | :--- | :--- | :--- |
| **Stage 1: Mirroring** | `public` (Primary) + `identity` (Shadow) | `public` | Zero |
| **Stage 2: Canary Read** | `public` (Primary) + `identity` (Shadow) | `identity` | Medium |
| **Stage 3: Decommission** | `identity` (Primary) | `identity` | Low |

*   **Dual-Write Phase:** During Stages 1 and 2, the system writes to both. This ensures that if we find a bug in the `identity` logic, we can revert to `public` immediately without missing a single password change or profile update.

### 3. Handling User ID & Referential Integrity
*   **UUID Preservation (The Golden Rule):** We **must** preserve the exact `id` (UUID) of every user.
    *   Since your other domains (Education, Community, etc.) use raw UUIDs to reference users, keeping the ID identical means those 4,000 lines of legacy code **do not need to be updated** to maintain referential integrity.
*   **Foreign Key Constraints:** 
    *   The `public.users` table likely has hundreds of incoming FKs from other `public` tables.
    *   The `identity.users` table will have **zero** incoming FKs from other schemas (per our Zero-FK policy).
    *   This "Logical Integrity" approach allows us to delete `public.users` eventually without triggering a cascade that wipes out your entire database.

### 4. Impact on Identity Layers
*   **AuthService:** This is the only component that requires significant code changes. It must be refactored to use `prisma.identity_users`.
*   **JWT Tokens:** Because the `id` (sub) is preserved, all existing JWTs in seekers' browsers will remain valid. The transition will be invisible to the user.
*   **RBAC:** We must handle the Enum Type mismatch. While the values (`admin`, `student`) are the same, Prisma sees `user_role_enum` and `identity_user_role_enum` as different. The `AuthService` will act as a "Type Bridge" during the transition.

### 5. Rollback Strategy: The "Instant Pivot"
Our rollback strategy relies on the **Stage 2 Dual-Write state**.

*   **The Pivot Toggle:** We introduce an environment variable: `IDENTITY_SCHEMA_ENABLED=true`.
*   **Emergency Reversion:** If Stage 2 shows increased error rates in `AuthService`, we flip the toggle to `false`. 
*   **Zero Data Loss:** Because we continued writing to `public.users` even while reading from `identity`, the legacy table is a perfect, up-to-the-millisecond replica of the identity state. We can fall back instantly with zero data loss.

---

### Strategic Recommendation: The "Shadow Audit"
Before moving to **Stage 2 (Read Identity)**, I recommend a 24-hour "Shadow Audit" where the `AuthService` fetches from `public.users` but performs a background comparison against `identity.users`. Any mismatch is logged to Sentry. Once mismatches hit 0% for 24 hours, we proceed to Stage 2.

**Would you like me to prepare the PostgreSQL Trigger scripts and the `AuthService` refactor plan to begin Phase 1?**.   

