# Architectural Strategy: Domain 6 - System / Infrastructure Layer

This document provides architectural guidance and conceptual roadmap planning for transitioning the **System / Infrastructure Layer** into a modular PostgreSQL schema. No code changes will occur until this strategy is approved.

---

## 1. High-Level Roadmap (Conceptual Only)

The System Layer is the "Plumbing" of the Vedic Skills Institute. It manages background processes, audit trails, and external integrations. It should be refactored last, as it supports every other domain.

1.  **Define the Foundation Bounded Context:** Separate operational logs (what happened) from system state (how it should behave).
2.  **Audit Trail Strategy:** Conceptualize a partitioning strategy for `audit_logs`, as this table will eventually contain millions of rows across every domain.
3.  **Database-Level Migration:** Create the `system` (or `infra`) schema. Issue `ALTER TABLE ... SET SCHEMA` for background tasks, webhook events, and configuration tables.
4.  **Integration Registry Consolidation:** Bring all third-party metadata (Razorpay, Sendgrid, Twilio settings) into a unified `external_integrations` registry within this schema.
5.  **ORM Mapping:** Tag the infrastructure models with `@@schema("system")` in Prisma and regenerate the client.

---

## 2. Schema Design Thinking

The System schema governs the **Operational Stability** and **Security Auditability** of the platform.

*   **Audit Engine (`audit_logs`):** An immutable, append-only ledger of every mutation in the system. It should track the `actor_id`, `domain`, `action`, and a `payload` JSONB of what changed.
*   **Job Orchestration (`background_tasks`):** Manages the lifecycle of asynchronous work (Status: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`). It utilizes the atomic `FOR UPDATE SKIP LOCKED` database pattern for high-concurrency worker safety.
*   **Integration Handshake (`external_integrations`, `webhook_events`):** 
    *   `external_integrations` acts as a registry for third-party services.
    *   `webhook_events` provides a high-fidelity log of incoming data from external providers, allowing for manual retries and reconciliation if a domain service fails to process a payload.
*   **Dynamic Configuration (`system_settings`):** Stores platform-wide toggles (e.g., "Maintenance Mode," "Global Discount %," "New Enrollment Open").
*   **Access Control Extension (`api_keys`, `rbac_permissions`):** If the system moves beyond simple role arrays, detailed granular permissions belong in this foundational layer.

---

## 3. Boundaries & Separation

This schema represents the *infrastructure* that makes the application run. It should have zero knowledge of Shastra content, student progress, or financial totals.

### What STRICTLY Belongs Here:
*   `audit_logs`
*   `background_tasks`
*   `webhook_events`
*   `external_integrations` (Config metadata, NOT secrets)
*   `system_settings`
*   `api_keys`
*   **Enums:** `task_status_enum`, `integration_type_enum`, `audit_action_enum`.

### What Must Be STRICTLY EXCLUDED:
*   🚫 `communication_logs`: These track user engagement and belong in **Interactions**. The system layer tracks the *task* that sent the email, but the *email record* itself is a communication asset.
*   🚫 `transactions`: Financial records belong in **Institution**. The system layer tracks the *audit log* of who changed a transaction, but the money data is institutional.
*   🚫 `file_assets`: Binary metadata belongs in **Media/DAM**.
*   🚫 **Secrets/Passwords:** Database credentials, API keys for providers, and private certificates should **NEVER** be stored in the schema. They must remain in `.env` variables or a dedicated Secrets Vault. This schema only stores the *registry* of which service is active.

---

## 4. Dependencies & Interaction

The System domain is a **Foundation Domain**.

*   **Direction of Dependency:** Like Identity, the flow of dependency is strictly **inbound**.
*   **Outbound Dependencies (Near Zero):**
    *   **Identity:** `audit_logs` point to `identity.users.id` for the `actor_id`.
*   **Inbound Dependencies (Universal):**
    *   **EVERY Domain:** When a verse is updated in **Knowledge**, an `audit_log` is written. When a course is completed in **Education**, a `background_task` is enqueued to generate a certificate. When a payment hits from **Institution**, a `webhook_event` is recorded.
*   **Direction:** The entire application depends on the System layer for operational reliability and compliance.

---

## 5. Risks & Design Pitfalls

When architecting foundational infrastructure, avoid these critical mistakes:

1.  **The "Logging Black Hole":** Designing `audit_logs` without a retention or partitioning policy. A database that grows by 1GB of logs per month will eventually slow down core application queries. Plan for log rotation or archival.
2.  **Synchronous System Calls:** Hard-coding a system setting check into every single database query. Use a caching layer (e.g., Redis or in-memory singleton) in the API Gateway to prevent `system_settings` from becoming a database bottleneck.
3.  **Storing PII in Audit Logs:** Recording sensitive user data (like passwords or addresses) in the `audit_logs` JSONB payload. Audit logs should track *that* a change happened, not necessarily the sensitive values themselves.
4.  **Conflating Webhooks with Business Logic:** Processing the business logic of a payment *inside* the `webhook_events` insertion. Always insert the event first (Status: `RECEIVED`), then process it asynchronously via a `background_task`.

> [!IMPORTANT]  
> **User Review Required:** Do you approve of the separation between communication logs (Interactions) and operational logs (System), and the exclusion of sensitive secrets from the integration registry? If approved, we have successfully mapped the core 6 domains for refactoring. Shall we proceed to the **Extended Domains (Media/DAM, Family, Events, Search/AI)**?
