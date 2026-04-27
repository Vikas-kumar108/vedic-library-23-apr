I now need a comprehensive analysis and mapping of the “System / Infrastructure Layer” in my application—following the same depth and structure as the previous reports for:

User & Authentication
Library / Knowledge Layer
Institution-Level Systems
Learning / Education
Interactions, Communications & Outreach

This is strictly an analysis-only task. No modifications or refactoring should be performed.

Scope of Analysis

Focus on all components related to core system infrastructure and operational controls, including:

Audit logs and activity tracking
Permissions and access control systems
Feature flags and toggles
Configuration management (system-wide settings)
Background jobs / workers / schedulers
Webhooks (incoming/outgoing)
External integrations (third-party services, APIs)
What Needs to Be Identified
1. Database Layer
All Prisma models related to:
Audit logs / event tracking
Roles, permissions, access control
Feature flags / toggles
System configurations / settings
Job queues / task tracking
Webhook logs / event deliveries
Integration metadata
All corresponding PostgreSQL tables:
Across existing schema(s), especially public
Including partially used or legacy tables
⚠️ Important Addition:
Identify and list all enums referenced:
In Prisma schema
In database (if applicable)
Explain where and how each enum is used
2. Codebase Layer

Identify all files involved in:

Logging and audit tracking
Authorization / permission checks
Feature flag evaluation
Configuration loading and usage
Background job processing (queues, cron jobs, workers)
Webhook handling (incoming/outgoing)
Third-party integrations

Include:

API routes / endpoints
Controllers
Services
Repositories / data access layer
Prisma queries / DB interaction
Type definitions
Middleware (auth guards, logging interceptors, etc.)
Integration clients (external SDKs, API wrappers)
3. System Flow Mapping

Clearly map:

Audit flow:
Action → logging → storage → retrieval
Permission flow:
Request → validation → access decision
Feature flag flow:
Evaluation → conditional execution
Background job lifecycle:
Trigger → queue → processing → completion/failure
Webhook lifecycle:
Event → dispatch → delivery → response tracking
Integration flow:
Internal system ↔ external services
Important Constraints (Strict)

🚫 Do NOT:

Modify any code
Suggest UI/UX changes
Refactor anything
Change APIs or architecture

✅ Only:

Analyze
Identify
Map
Expected Output Format

Please provide a structured report with:

Prisma Models
Model name + role
Database Tables
Table name + purpose
Relationships
Enums
Enum name
Values
Where used (models / code)
File-Level Mapping
File path → responsibility
System Flow Overview
Audit flow
Permission flow
Feature flag flow
Job processing flow
Webhook flow
Integration flow
Dependency Overview
How components interact
Key entry points (e.g., API → service → DB → external system)
Goal
Achieve complete visibility of system-level infrastructure
Ensure no model, table, enum, or file is missed
Prepare for robust, modular, and scalable system architecture

============================================




# System & Infrastructure Layer Audit Report

This report maps the comprehensive "System / Infrastructure Layer" of the Vedic Skills Institute. It details the underlying operational machinery—including background jobs, webhooks, audit logging, role-based access control, and external API integrations. This is strictly an analysis report; no codebase modifications were made.

---

## 1. Database Layer (Prisma Models & PostgreSQL Tables)

### Audit & Activity Tracking Models
*   **`audit_logs`**
    *   **Purpose:** Immutable ledger for critical system-level data mutations. Tracks `table_name`, `action`, `old_data`, `new_data`, and `ip_address`.
    *   **Relationships:** Linked to the `users` table (`performed_by_id`) and `transactions` (`transaction_id`) to maintain strict financial and operational accountability.
*   **`activity_logs`**
    *   **Purpose:** Higher-level, human-readable timeline tracking for organizational milestones and events.
    *   **Relationships:** Linked to `organizations` and `projects`.

### Integration & Webhook Models
*   **`external_integrations`**
    *   **Purpose:** Stores configuration metadata and status for connected third-party platforms (e.g., payment gateways, storage providers).
    *   **Relationships:** Optionally linked to `organizations` for multi-tenant integration setups.
*   **`webhook_events`**
    *   **Purpose:** Idempotent capture table for incoming external events. Ensures payloads are securely written before asynchronous processing.
    *   **Relationships:** Standalone queue-like table.

### Background Job Models (Raw SQL)
*   **`background_tasks` (Table only)**
    *   **Purpose:** A robust job queue. Interestingly, this table does not appear as a strictly mapped Prisma model but is actively utilized via raw SQL queries in the `TaskOrchestrator` service.
    *   **Key Fields:** `id`, `task_type`, `payload`, `status` (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`), `error_log`.

### Enums
*   **`user_role_enum`**
    *   **Values:** `student`, `mentor`, `teacher`, `coordinator`, `admin`, `donor`, `director`, `village_member`, `city_member`, `outreach_lead`, `volunteer`, `staff`
    *   **Where Used:** Used within the `users` model (`roles` array) to form the foundation of the RBAC system.
*   **`integration_service_enum`**
    *   **Values:** `S3`, `R2`, `TWILIO`, `SENDGRID`, `RAZORPAY`, `STRIPE`, `GITA_API`, `TRANSLATION_ENGINE`
    *   **Where Used:** In `external_integrations.service` to strongly type the expected external provider.
*   **`webhook_status_enum`**
    *   **Values:** `PENDING`, `PROCESSED`, `FAILED`
    *   **Where Used:** In `webhook_events.status` to track lifecycle states of incoming HTTP webhooks.

> **Note on Feature Flags:** A dedicated Prisma model or table for dynamic "Feature Flags" or "Toggles" does not currently exist. Configuration is likely driven by environment variables (`.env`) or static code constants.

---

## 2. Codebase Layer

### Application Routing
*   **`apps/api-gateway/src/routes/system.routes.ts`**
    *   **Responsibility:** Exposes diagnostic and triggering endpoints for infrastructure (`/tasks`, `/tasks/trigger`, `/proclaim`).

### Core Infrastructure Services
*   **`apps/api-gateway/src/services/task-orchestrator.service.ts`**
    *   **Responsibility:** Custom background job processor. Implements `enqueue()` and `processNextTask()` using advanced PostgreSQL atomic locking (`FOR UPDATE SKIP LOCKED`) to ensure exactly-once processing of `background_tasks`.
*   **`apps/api-gateway/src/services/integration.service.ts`**
    *   **Responsibility:** Orchestrates webhooks and external API states. Manages `external_integrations` configuration mapping.
*   **`apps/api-gateway/src/integrations/registry.ts`**
    *   **Responsibility:** The `IntegrationRegistry` acts as a Dependency Injection factory, returning initialized external service adapters (e.g., `InstitutionalEmailService`).

### Middleware & Access Control
*   **`apps/web-portal/lib/rbac.ts`**
    *   **Responsibility:** Frontend/BFF utility providing functions like `checkRole` based on `user_role_enum`.
*   **`apps/web-portal/middleware.ts`**
    *   **Responsibility:** Edge-level route guarding. Uses JWT validation to reject unauthorized requests before they hit internal application code.
*   **`apps/api-gateway/src/middlewares/authorization/role.middleware.ts`**
    *   **Responsibility:** Fastify-level protection ensuring the decoded JWT contains the necessary roles to mutate backend resources.

---

## 3. System Flow Overview

### Audit Flow
1.  **Action:** A user performs a mutation via the API (e.g., updating a financial ledger).
2.  **Logging:** The corresponding service invokes an audit helper (often passing the Prisma transaction client).
3.  **Storage:** A record is inserted into `audit_logs` storing the serialized `old_data` and `new_data`.

### Permission Flow
1.  **Request:** A client requests a protected endpoint (e.g., `/admin/finance`).
2.  **Edge Validation:** `web-portal/middleware.ts` verifies the `vedic_token` cookie signature.
3.  **Route Validation:** `rbac.ts` asserts the decoded token contains an authorized role (e.g., `admin`, `director`).
4.  **Backend Verification:** API Gateway receives the proxy request and executes `role.middleware.ts` as a secondary zero-trust check before executing DB logic.

### Background Job Processing Flow
1.  **Trigger:** An endpoint (e.g., `/tasks/trigger`) or scheduled CRON job calls `TaskOrchestrator.enqueue()`.
2.  **Queue:** The job is safely written to the PostgreSQL `background_tasks` table as `PENDING`.
3.  **Processing:** A worker loop calls `processNextTask()`, which atomically locks the row (`PROCESSING`), executes the async payload logic, and writes back `COMPLETED` or `FAILED`.

### Webhook & Integration Flow
1.  **Event:** A third-party service (e.g., Razorpay, Sendgrid) sends an HTTP POST.
2.  **Capture:** The gateway blindly accepts the payload, inserting it into `webhook_events` as `PENDING`, and immediately returns a `200 OK` to the provider to prevent timeouts.
3.  **Processing:** A background worker picks up the webhook, updates the requisite internal models (e.g., marking a `communication_log` as delivered), and updates the event to `PROCESSED`.

---

## 4. Dependency Overview

*   **Reliance on PostgreSQL Concurrency:** The entire background job queuing system is decoupled from Redis/RabbitMQ and strictly relies on native PostgreSQL locking features (`SKIP LOCKED`). This keeps infrastructure simple but intimately ties task processing performance to DB health.
*   **JWT as the Core Trust Token:** Both frontend caching and backend API routing implicitly trust the stateless JSON Web Token for RBAC. The DB `users.roles` array is mapped into the JWT at login time.
*   **Decoupled Side-Effects:** Extensive use of the `TaskOrchestrator` means many heavy operations (like Shastra reconciliation or webhook broadcasting) run completely asynchronously, shielding the core API event loop from latency spikes introduced by external `integration_service_enum` providers.
