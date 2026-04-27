# Master Architecture Overview: Vedic Skills Institute

This document serves as the final, consolidated architectural summary of the Vedic Skills Institute system. It synthesizes the findings from the comprehensive audit of all 10 major domains, providing a unified perspective of the data flow, structural layering, and interconnectivity of the application.

---

## 1. High-Level Architecture Overview

The system operates on a **Monolithic Database, Service-Oriented Backend** pattern. It separates the presentation layer from the business logic through a Backend-For-Frontend (BFF) proxy architecture.

*   **Database Engine:** A highly normalized PostgreSQL database serving as the single source of truth. It aggressively utilizes advanced, native Postgres features such as `ltree` (for hierarchical data like scriptural trees and family lineages), `vector` (for AI semantic search via `pgvector`), and `FOR UPDATE SKIP LOCKED` (for atomic background job processing).
*   **Data Access Layer (`packages/data-access`):** Prisma ORM acts as the bridge. It defines 66 models and 43 strongly-typed Enums, strictly governing data integrity before it reaches the DB.
*   **API Gateway (`apps/api-gateway`):** A Fastify-based backend application. It enforces Zod validation, handles JSON Web Token (JWT) authorization via middleware, and encapsulates business logic into distinct Domain Services (e.g., `LibraryService`, `InstitutionalService`, `BroadcastService`).
*   **Web Portal (`apps/web-portal`):** A Next.js frontend providing the UI. It relies on a global Zustand store for state management and proxy routes requests to the API Gateway. Edge middleware handles initial JWT validation to protect administrative routes.

---

## 2. Domain Interaction Map

The system is remarkably cohesive. Instead of maintaining siloed data for different features, the architecture relies on deep, cross-domain foreign keys.

*   **Identity ↔ All Domains:** The `users` table is the universal anchor. Every action—whether it is an `audit_log`, a financial `contribution`, a `circle_post`, or a `library_download`—resolves back to a specific `user_id`.
*   **Knowledge ↔ Education:** The Learning domain (`learning_curves`) does not duplicate content. Instead, its `learning_curve_steps` link directly to `node_id`s in the Knowledge domain. A syllabus is effectively a curated playlist of existing scriptural entities.
*   **Knowledge ↔ AI Discovery:** The Search domain (`text_embeddings`) is completely parasitic to the Knowledge layer, maintaining parallel vector representations of the `texts` table for semantic querying.
*   **Institution ↔ Finance ↔ Donations:** The `transactions` table is the nexus. A donation creates a `contribution` record, which requires a `transaction` record. This transaction subsequently generates a `donation_receipt` (linked to Media/DAM via `file_assets`) and optionally triggers double-entry `journal_entries`.
*   **Infrastructure ↔ Communications:** The `webhook_events` table captures incoming delivery statuses (e.g., from Sendgrid or Twilio), and the `TaskOrchestrator` async background worker processes them to update the `communication_logs`.

---

## 3. Data Flow Overview

To illustrate the architecture in motion, here are four critical end-to-end data flows:

### A. The Seeker Journey (Signup & Profile)
1.  **Registration:** The user submits credentials.
2.  **Identity Creation:** The system creates a `users` record (assigning `user_role_enum`) and a `user_profiles` record.
3.  **Spiritual Mapping:** A `spiritual_profiles` record is generated to track the user's `inner_state_enum`, `svabhava_enum`, and `purushartha_enum`.
4.  **Community Placement:** The user is dynamically assigned to `circles` (study groups) based on geographic or topical data.

### B. The Educational Flow (Course Progress)
1.  **Enrollment:** A user opts into a course, generating a `user_curve_progress` record pointing to a `learning_curves` ID.
2.  **Syllabus Traversal:** The UI requests the current module (`learning_curve_steps`).
3.  **Content Retrieval:** Because the step maps to a `node_id`, the API fetches the underlying Shastra via the `LibraryService`.
4.  **Completion:** Once read, the progress pointer increments, and the user's `user_statistics.courses_completed` integer is atomically bumped.

### C. The Knowledge Retrieval Flow (Reading Shastra)
1.  **Request:** The user navigates to `/library/gita/chapter-1/verse-1`.
2.  **Database Query:** The API Gateway queries the `nodes` table, heavily joining the `texts`, `sources`, and `node_relations` tables.
3.  **Transformation:** The `LibraryService` takes the flat rows (where `content_type_enum` delineates `mula`, `anuvada`, `bhashya`) and constructs a rich, nested JSON payload separated by language, author, and analytical depth.
4.  **Rendering:** The frontend consumes the payload, applying typography and layouts suitable for a distraction-free "Spiritual UX."

### D. The Institutional Flow (Donation & Compliance)
1.  **Payment Intent:** User donates via Razorpay.
2.  **Webhook Capture:** Razorpay POSTs to `/integrations/webhook`. The gateway blindly inserts a `PENDING` `webhook_events` record to prevent timeout.
3.  **Processing:** A background task picks up the webhook, verifies the signature, and generates a `transaction`.
4.  **Compliance:** The system generates an 80G tax document, saves it to an S3 bucket, logs the `file_assets` URL, attaches it to a `donation_receipts` record, and triggers the `BroadcastService` to email the donor.

---

## 4. Structural Summary

*   **Database:** 66 Prisma models, 43 Enums. Highly normalized. Uses raw SQL heavily in specific optimization paths (e.g., `TaskOrchestrator` queue locking, `spiritual_vows` insertion).
*   **Codebase Hierarchy:**
    *   `/packages/data-access`: Prisma Schema, generated client.
    *   `/apps/api-gateway/src/routes`: Expressive Fastify endpoint definitions with Zod schemas.
    *   `/apps/api-gateway/src/services`: Core business logic (transforms DB data, orchestrates integrations).
    *   `/apps/api-gateway/src/integrations`: Abstracted third-party clients (e.g., `InstitutionalEmailService`).
    *   `/apps/web-portal/app`: Next.js App Router providing both public views and the secure `/admin` dashboard.

---

## 5. Key Observations

Based on the comprehensive audit, the following architectural strengths, complexities, and risks were observed:

### Strengths
*   **Uncompromising Data Integrity:** The system does not duplicate data. Utilizing the Knowledge Graph (`nodes`) as the foundation for the Education Syllabus (`learning_curve_steps`) is a highly efficient design pattern.
*   **Strict RBAC:** The Identity layer leverages `user_role_enum` directly in the BFF's `rbac.ts` and the Gateway's `role.middleware.ts`, establishing a robust, zero-trust security posture.
*   **Advanced Database Utilization:** Relying on `ltree` for the Vedas and Family lineages prevents the N+1 query problem associated with recursive queries, and `pgvector` natively integrates AI without requiring a separate vector database (like Pinecone).

### Areas of Complexity
*   **The Translation Pipeline:** The `LibraryService` must perform extensive mapping to convert flattened relational rows (`texts` filtered by `content_type_enum`) into a hierarchical JSON object. As the corpus grows, these massive `JOIN` operations may require sophisticated caching layers (e.g., Redis).
*   **The Transaction Nexus:** The `transactions` table is the lynchpin of the Institution. Any schema changes to transactions will cascade across donations, payroll, accounting ledgers, and grant allocations.

### Potential Risks & Bottlenecks
1.  **Enum Disconnects (Critical):** As identified, the `LibraryService` explicitly checks for `vivarana` and `shabdartha`, which are completely absent from the `content_type_enum` schema. This represents a silent failure point where analytical data cannot be saved or retrieved.
2.  **Raw SQL Escapes:** Services like `TaskOrchestrator` and `AcademyService` bypass the Prisma client to execute raw SQL (`INSERT INTO ... VALUES ('ACTIVE')`). This circumvents TypeScript's compile-time safety and relies on hardcoded strings that may drift from the actual DB `TYPE AS ENUM` definitions.
3.  **Asynchronous Fragility:** High-volume operations (tracking email opens, generating receipts) rely entirely on `webhook_events` and the `background_tasks` queue. If the `TaskOrchestrator` loop fails or hangs, critical business functions (like sending tax documents) will bottleneck in a `PENDING` state.
