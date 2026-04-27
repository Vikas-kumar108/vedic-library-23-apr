# Production-Grade Schema Design: Interactions Domain (`interactions`)

This document outlines the architectural design for the `interactions` PostgreSQL schema. This domain acts as the **Communication and Outreach Layer** of the Vedic Skills Institute.

---

## 1. Schema Overview

The `interactions` schema governs all asynchronous workflows, notifications, user support, marketing campaigns, and lead tracking. 

**Core Architectural Rule:** This domain acts as the operational nervous system. It handles high-volume insert-heavy data (logs, messages, tracking). It must be cleanly separated from the `identity` and `institution` schemas so that a flood of notification records does not impact core transactional queries or authentication loads.

---

## 2. Table-by-Table Definition

### 2.1. Messaging & Support Subdomain
*   **`conversations` (New)**: A generic wrapper for any thread.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `topic`, `type` (`conversation_type_enum`: 'P2P', 'GROUP', 'SUPPORT'), `status`, `created_at`.
*   **`conversation_participants` (New)**: Links users to a conversation.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `conversation_id` (FK), `user_id` (Cross-schema FK to `identity.users`), `joined_at`.
*   **`messages` (New)**: The actual content.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `conversation_id` (FK), `sender_id` (Cross-schema FK to `identity`), `content`, `message_type` ('TEXT', 'SYSTEM', 'ATTACHMENT').
*   **`support_tickets` (Migrated)**: Represents a structured support request that wraps around a conversation thread.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `subject`, `description`, `status` (`ticket_status_enum`), `priority`, `conversation_id` (FK), `user_id` (Cross-schema FK).

### 2.2. Campaigns & Notifications Subdomain
*   **`notifications` (New)**: In-app user notifications.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `user_id` (Cross-schema FK), `type`, `title`, `message`, `action_url`, `is_read`, `created_at`.
*   **`campaigns` (Rename of `communication_campaigns`)**: Outbound marketing/email blasts.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `title`, `content`, `status` (`campaign_status_enum`), `scheduled_at`, `sent_at`.
*   **`communication_logs` (Migrated)**: The ledger of every email, SMS, or Push sent by the system.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `campaign_id` (FK), `channel` (`communication_channel_enum`), `recipient`, `status` (`communication_status_enum`), `external_provider_id` (e.g., SendGrid ID).

### 2.3. Leads & Outreach Subdomain (New)
*   **`leads` (New)**: Contacts who are not yet authenticated users (e.g., event prospects).
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `email`, `phone`, `first_name`, `last_name`, `status` (`lead_status_enum`), `source`.
*   **`subscribers` (New)**: Users who opt into newsletters.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `email`, `is_active`, `subscribed_at`.
*   **`engagement_logs` (New)**: Tracks opens, clicks, and replies for analytics.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `communication_log_id` (FK), `engagement_type` (`engagement_type_enum`), `timestamp`.

---

## 3. Mapping from Existing Schema (`public` ➔ `interactions`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `support_tickets` | **MOVE/EXTEND** | Move to `interactions`. Tie to new `conversations` table so replies aren't hardcoded into a single text block. |
| `communication_campaigns` | **RENAME** | Rename to `interactions.campaigns`. |
| `communication_logs` | **MOVE** | Direct migration to `interactions.communication_logs`. |
| *(None)* | **CREATE** | Create `conversations`, `messages`, `notifications`, `leads`, `subscribers`, `engagement_logs`. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions establish the business rules for communication:

1.  **`ticket_status_enum` (Existing)**: (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`).
2.  **`campaign_status_enum` (Existing)**: (`DRAFT`, `SCHEDULED`, `SENT`, `FAILED`, `CANCELLED`).
3.  **`communication_channel_enum` (Existing)**: (`EMAIL`, `SMS`, `WHATSAPP`, `PUSH`, `IN_APP`).
4.  **`communication_status_enum` (Existing)**: (`DRAFT`, `QUEUED`, `SENT`, `DELIVERED`, `FAILED`, `OPENED`, `CLICKED`).
5.  **`conversation_type_enum` (New)**: (`P2P`, `GROUP`, `SUPPORT`).
6.  **`lead_status_enum` (New)**: (`NEW`, `CONTACTED`, `QUALIFIED`, `CONVERTED`, `LOST`).
7.  **`engagement_type_enum` (New)**: (`OPEN`, `CLICK`, `REPLY`, `UNSUBSCRIBE`).

---

## 5. Boundaries & Separation

### What Strictly Belongs
All system-generated emails, marketing leads, support desk operations, chat threads, and notification tracking.

### What Must Be Excluded (The "Leaky Abstractions")
*   **Authentication (Identity)**: A user's encrypted password and session data belong in `identity`. `interactions.leads` holds *prospects*—if a lead registers, they become an `identity.user`, and the lead record is marked 'CONVERTED'.
*   **Core Content (Knowledge)**: If a message references a Shastra verse, it stores the `node_id` UUID, but never the text of the verse itself.
*   **Payments (Institution)**: If a support ticket is about a failed donation, it holds the `transaction_id` UUID, but does not execute the refund. The refund happens in `institution`.

---

## 6. Migration Awareness (Design-Level)

*   **Support Ticket Transformation:** The existing `support_tickets` table holds the request description but lacked a native thread/reply system. By introducing `conversations` and `messages`, a migration script can easily port the initial ticket `description` into the first `messages` record linked to the ticket's conversation.
*   **Decoupled High-Volume Data:** Moving `communication_logs` and `engagement_logs` into this schema ensures that when a marketing campaign sends 10,000 emails, the massive influx of DB writes doesn't lock tables used by the core Learning or Financial schemas.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design. In particular, note the introduction of the `conversations` and `messages` tables to modernize `support_tickets` into a proper thread, as well as the new `leads` tables. Does this structure meet your goals for the Interactions domain?


Edited education-schema-design.md
Edited education-schema-implementation.md
Edited prompt-1.md
Viewed prompt-1.md:49-95
Searched for "CREATE TABLE public\.(messages|notifications|campaigns|leads|subscribers|support_tickets|support_ticket_messages|communication_templates)"
Searched for "CREATE TABLE public\.(communication_[a-z_]+|support_[a-z_]+|notification[a-z_]*|lead[a-z_]*|subscriber[a-z_]*)"
Viewed schema.sql:955-1005
Viewed schema.sql:1925-1950
Searched for "CREATE TABLE public\.[a-z_]*lead[a-z_]*"
Searched for "CREATE TABLE public\.[a-z_]*ticket[a-z_]*"
Created interactions_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **Interactions Domain** based on your existing `public` schema.

You can review the full schema definition and architectural decisions here: [interactions_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/interactions_schema_design.md).

### Key Architectural Highlights:
1. **Modernizing Support Tickets:** The existing `support_tickets` table held a simple description string but lacked thread/reply capabilities. I have introduced the `conversations` and `messages` tables to modernize this. A `support_ticket` now acts as a metadata wrapper around a standard `conversation` thread, allowing for proper back-and-forth messaging.
2. **Dedicated Leads/Outreach Subdomain:** I have introduced `leads` and `subscribers` tables. This ensures that marketing prospects and newsletter signups do not pollute the core `identity.users` table until they officially convert and register.
3. **High-Volume Separation:** Moving `communication_logs` and introducing `engagement_logs` (opens, clicks, etc.) into this isolated schema is critical. Marketing blasts often generate millions of log rows; isolating them here prevents database locking on your core Educational or Financial queries.
4. **Virtual Schema Independence:** Cross-schema references (like the sender of a message or the recipient of a notification) are tracked via raw `user_id` UUIDs pointing to the `identity` schema without rigid PostgreSQL `REFERENCES` constraints, maintaining perfect micro-schema independence.

As requested, this report focuses purely on design, structure, and boundaries without altering any code. Please review the proposal—specifically the introduction of the `conversations` system and the `leads` table. If this design perfectly meets your system requirements, we can proceed to generate the raw DDL implementation script for this schema.




Edited interactions-schema-design.md
Edited prompt-2.md
Viewed prompt-1.md:49-95
Created interactions_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Interactions Domain**.

You can review the complete schema definition (DDL) here: [interactions_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/interactions_schema_implementation.md).

### Design Summary:
1. **The unified `conversations` core:** Rather than siloing "messages" and "tickets," the new architecture centers around a unified `conversations` table. A `support_ticket` now operates seamlessly as a metadata layer pointing to an underlying conversation thread.
2. **High-Volume Isolation:** By moving `communication_logs` and introducing `engagement_logs` to this schema, we protect the transactional integrity of `institution` and `education`. Millions of marketing click-tracking logs can now be written here without locking your core learning or financial tables.
3. **Outreach & Prospect Funnel:** The introduction of `leads` and `subscribers` explicitly protects the `identity.users` table from being polluted by unverified marketing prospects.
4. **Virtual Schema Independence:** As with all other domains, cross-schema references (like `sender_id`, `user_id`, or `attachment_file_id`) are implemented as standard `uuid` columns. There are no hard PostgreSQL foreign key constraints spanning schemas, allowing this domain to scale, backup, or migrate independently.

This DDL successfully isolates your communications and outreach infrastructure. 

If this execution accurately reflects your requirements, we are ready to proceed to the architectural planning for **Module 6: System / Infrastructure Layer**.