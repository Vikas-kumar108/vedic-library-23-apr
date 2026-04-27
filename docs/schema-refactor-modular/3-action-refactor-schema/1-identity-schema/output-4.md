Edited output-3.md
Edited prompt-1.md
Edited output-1.md
Edited output-2.md
Viewed prompt-3.md:1-53

I have fully understood and internalized the strict migration structure and naming conventions for the **Vedic Institutional Operating System (VIOS)** identity migration.

I will adhere to the following directory and file architecture:

### 📂 `database/migrations/identity/`

| Phase | Directory | Responsibility |
| :--- | :--- | :--- |
| **1** | `backfill/` | Initial data population from `public` to `identity`. |
| **2** | `sync/` | Real-time synchronization (Triggers/Functions) for parity. |
| **3** | `validation/` | Verification scripts to ensure data consistency. |
| **4** | `pre_switch/` | Final preparations before shifting application traffic. |
| **5** | `post_switch/` | Verification and logging after switching to the new schema. |
| **6** | `decommission/` | Cleanup of legacy `public` identity tables. |

### 🛠️ Naming & Governance Rules:
*   **Convention:** `[ORDER]__[PHASE]__[ACTION]__[ENTITY].sql` (e.g., `001__backfill__users.sql`).
*   **Idempotency:** All scripts will use `IF NOT EXISTS`, `CREATE OR REPLACE`, or check-guards to ensure they can be run multiple times safely.
*   **Atomicity:** One file will handle exactly one responsibility (one table or one trigger).
*   **SQL-Only:** No application-level logic; strictly native PostgreSQL DDL/DML.

**I am standing by for your instruction to begin generating Phase 1: Backfill.**