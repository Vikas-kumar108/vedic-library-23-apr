# VIOS System Documentation: User & Identity Module

## 1. OVERVIEW
The **User & Identity Module** is the foundational core of the Vedic Institutional Operating System (VIOS). Its purpose is to provide a unified, secure, and intelligent gateway for seekers to manage their identity and progress through the shastric curriculum. 

In the overall architecture, it acts as the **Identity Provider (IdP)** and **Spiritual Progression Engine**, decoupling raw user data from high-fidelity seekers' states while enabling personalized, guided discovery of Vedic knowledge.

---

## 2. DATABASE DESIGN
The module operates across two primary schemas: `public` (legacy/shared) and `identity` (new/isolated).

### Core Models
- **`identity.users`**: Root identity record. Stores credentials (hashed), roles, and verification status.
- **`identity.user_profiles`**: Personal data (full name, contact info) decoupled from the root user.
- **`identity.user_preferences`**: Seeker-specific UI/UX settings (e.g., script, language, themes).
- **`identity.spiritual_profiles`**: **The Seeker's Heart.** Stores `eligibility_level`, `inner_state`, `life_stage`, and the **Guided Path State** (`current_focus`, `current_primary_node_id`, `last_guided_at`).
- **`identity.user_statistics`**: Aggregated metrics (e.g., `nodes_read_count`) used for personalization.
- **`audit_logs`**: Centralized event stream with unique indexing on `(performed_by_id, record_id, action)` for race-condition safety.

### User Creation Lifecycle
1. **Request**: `/auth/register` payload received.
2. **Identity Creation**: Record inserted into `identity.users`.
3. **Shadow Propagation**: Related records created in `profiles`, `preferences`, `spiritual_profiles`, and `statistics`.
4. **Initiation**: Verification email dispatched via `Resend`.
5. **Activation**: Email verified → Account unlocked.

---

## 3. AUTHENTICATION FLOW
The system uses a **BFF (Backend-for-Frontend)** proxy pattern:

1. **Register**: Creates records and generates a verification token.
2. **Login**: Validates credentials → Generates short-lived **Access Token** (JWT) and **Refresh Token**.
3. **Refresh**: Exchanges a valid Refresh Token for a new Access Token without re-authenticating.
4. **Logout**: Invalidates the session and logs the event in `audit_logs`.
5. **/me**: Returns the full validated identity and profile context for the current session.

---

## 4. IDENTITY MIGRATION ARCHITECTURE
To ensure zero-downtime migration, the system uses a **Dynamic Store Pattern**:

- **Schema Toggle**: Controlled by the `IDENTITY_SCHEMA_ENABLED` environment variable.
- **Store Getters**: `AuthService` and `DiscoveryRepository` use dynamic getters (e.g., `userStore`) that resolve to either `prisma.users` or `prisma.identity_users`.
- **Shadow Reads/Writes**: During the transition, the system performs "Shadow Reads" to verify data consistency between schemas.
- **Final Lock-In**: Once validation is 100%, the `public` user tables are decommissioned, and the `identity` schema becomes the permanent source of truth.

---

## 5. AUTHORIZATION SYSTEM (RBAC)
- **Roles**: Hierarchy includes `student`, `moderator`, `admin`, and `overseer`.
- **Middleware**: 
  - **API Gateway**: Role-based guards protect routes (e.g., `mustHaveRole('admin')`).
  - **Web Portal**: Next.js Middleware intercepts requests, verifies JWT cookies, and enforces RBAC before rendering.

---

## 6. GUIDED PATH SYSTEM
The system transforms raw recommendations into a **Structured Progression Path**.

### Logic Layer
- **Eligibility Mapping**: Seeker's level (1-10) determines the content sensitivity they can access.
- **Focus Derivation**: Maps `inner_state` and level to a path: `FOUNDATION`, `STABILITY`, `CLARITY`, or `DEPTH`.
- **Anti-Repetition Memory**: Queries `audit_logs` for the last 20 read nodes and excludes them from the query pool.
- **Primary Guide**: Deterministically selects **ONE** node as the "Next Step" and locks it for 24 hours.

### Persistence & completion
- **Stability**: The `current_primary_node_id` is saved to the DB. It only refreshes if completed or if 24 hours pass.
- **Completion Trigger**: Reading the primary node (`READ_NODE` event) atomically clears the `current_primary_node_id` in the database, allowing the next progression step to generate.

---

## 7. OBSERVABILITY
Traceability is handled via the `audit_logs` table.

### Key Event Types
- **`PRIMARY_ASSIGNED`**: A new "Next Step" has been bookmarked for the seeker.
- **`PRIMARY_COMPLETED`**: Seeker successfully read their guided node.
- **`PATH_REFRESHED`**: Stale path (24h+) was reset.
- **`READ_NODE`**: General consumption event.

### Metadata Structure (`new_data`)
```json
{
  "focus": "STABILITY",
  "eligibility_level": 4,
  "action_context": "guided_discovery"
}
```

---

## 8. FILE STRUCTURE
- **`auth.service.ts`**: Identity lifecycle, JWT management, and schema-toggled writes.
- **`discovery.service.ts`**: High-level search and recommendation orchestration.
- **`recommendation.service.ts`**: **The Engine.** Implements tier weighting, focus derivation, and path persistence.
- **`library.repository.ts`**: Low-level node retrieval and the **Atomic Completion Trigger**.
- **`middleware.ts`**: JWT validation and RBAC enforcement.
- **`routes/*.routes.ts`**: Secured API endpoints using the Identity Security Layer.

---

## 9. SYSTEM FLOW (END-TO-END)
1. **Onboarding**: User registers as a seeker → Level 1 `FOUNDATION` focus assigned.
2. **Engagement**: Seeker views the "Discovery" tab → `recommendation.service` computes a "Primary Guide" (e.g., *Intro to Gita*).
3. **Persistence**: `current_primary_node_id` is saved. The seeker sees the same "Next Step" across all devices.
4. **Progression**: Seeker reads the node → `recordNodeView` triggers atomic completion → Progress is cleared.
5. **Discovery**: Next refresh generates Level 2 content or shifts to `STABILITY` if `inner_state` changes.

---

## 10. INTEGRATION MAP
- **Discovery**: Uses Identity stats to filter wisdom.
- **Library**: Reports reading events back to Identity.
- **Academy**: Checks `eligibility_level` before allowing course enrollment.
- **Broadcast**: Targets messages based on `life_stage` and `inner_state`.

---

## 11. DESIGN PRINCIPLES
- **Idempotency**: Logging and completion triggers can be called multiple times without side effects.
- **Determinism**: The same seeker state always results in the same recommendation pool (until progress is made).
- **Non-Blocking**: Observability and logging never block the seeker's retrieval of wisdom.
- **Schema Isolation**: Identity data is strictly separated from business domain data (Courses, Finances).
