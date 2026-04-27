Refined Prompt

Now that we have completed the roadmap and architectural guidance for the first four domains, I want to proceed to the fifth module in the same structured and disciplined manner.

Important Constraint

🚫 Do NOT:

Take any action
Suggest code changes
Begin implementation

✅ Only:

Provide strategic, architectural, and conceptual guidance
Focus Area

👉 Proceed with Module 5: Interactions, Communications & Outreach

This includes:

Messaging systems (user ↔ system, user ↔ user if applicable)
Notifications (in-app, email, push, etc.)
Communication workflows
Community or engagement features
Marketing and outreach systems
Campaigns, leads, subscriber management
Engagement tracking (opens, clicks, responses, etc.)
What I Need From You

Please follow the same depth and structure as previous modules:

1. High-Level Roadmap (Conceptual Only)
How should this domain be approached for refactoring?
What is the ideal conceptual sequence of steps?
2. Schema Design Thinking
How should the interactions/communications schema be structured?
How to organize:
Messages / conversations
Notifications
Campaigns and outreach
Leads / contacts
Engagement tracking
How to handle:
Event-driven flows
Real-time vs async communication
3. Boundaries & Separation
What should strictly belong in this domain?
What should be excluded (even if currently present in public)?
4. Dependencies & Interactions
How this domain interacts with:
Identity (users, roles)
Learning (notifications, engagement)
Institution (donations, campaigns)
System layer (jobs, integrations)
Direction of dependencies
5. Risks & Design Pitfalls
Common mistakes in communication systems
Overlapping responsibilities with other modules
Notification overload / poor design
Event handling complexity
Things to avoid
Goal
Maintain architectural consistency across modules
Design a scalable and flexible communication system
Ensure clarity before any implementation begins

============================



# Architectural Strategy: Domain 5 - Interactions, Communications & Outreach

This document provides architectural guidance and conceptual roadmap planning for transitioning the **Interactions, Communications & Outreach** domain into a modular PostgreSQL schema. No code changes will occur until this strategy is approved.

---

## 1. High-Level Roadmap (Conceptual Only)

This domain is the "Voice" and "Ear" of the Vedic Skills Institute. It manages how the system speaks to users and how users speak to each other. It should be refactored once the foundational **Identity** and **Product (Knowledge/Education)** domains are settled.

1.  **Consolidate the Interaction Ledger:** Bring disparate "Circles," "Broadcasts," and "Support Tickets" into a single schema to ensure a 360-degree view of user engagement.
2.  **Define Bounded Context:** Isolate the *delivery* of messages from the *logic* that triggers them.
3.  **Database-Level Migration:** Create the `interactions` (or `comms`) schema. Issue `ALTER TABLE ... SET SCHEMA` for community tables, notification logs, and marketing lead tracking.
4.  **Async Preparation:** Conceptualize the transition of the `communication_logs` into a high-throughput, potentially partitioned structure, as this will eventually be the largest table in the system.
5.  **ORM Mapping:** Tag the communication models with `@@schema("interactions")` in Prisma and regenerate the client.

---

## 2. Schema Design Thinking

The Interactions schema governs the **Engagement Lifecycle**, from a lead seeing a campaign to a student discussing a verse in a circle.

*   **Community Core (`circles`, `circle_posts`, `circle_comments`):** Represents the internal social graph. It is essentially a multi-tenant forum structure where `circles` act as the security boundary.
*   **The Communication Ledger (`communication_logs`, `broadcasts`):** This is an immutable audit trail of every automated message sent by the system. It must track `delivery_status` and `provider_reference` (e.g., SendGrid/Twilio IDs) to allow for webhook-driven updates.
*   **Outreach & CRM (`marketing_campaigns`, `campaign_leads`):** Tracks top-of-funnel engagement. `leads` represent potential seekers who do not yet have a full `users` record.
*   **Support & Feedback (`support_tickets`, `ticket_replies`):** A centralized interaction point for seeker assistance, separate from academic mentorship (`guidance`).
*   **Notification Engine (`notifications`):** High-velocity, transient data for in-app alerts.

### Event-Driven Flow
The schema must support an **Async Feedback Loop**:
1.  **Trigger:** An event occurs in another schema (e.g., `institution.transactions` is created).
2.  **Entry:** A row is added to `interactions.communication_logs` (Status: `PENDING`).
3.  **Action:** The `BroadcastService` sends the email.
4.  **Update:** A webhook hits the system, updating the log (Status: `DELIVERED`).

---

## 3. Boundaries & Separation

This schema represents *interaction*. It should not contain *business logic* or *raw content*.

### What STRICTLY Belongs Here:
*   `circles`, `circle_members`
*   `circle_posts`, `circle_comments`
*   `communication_logs`, `broadcast_recipients`
*   `marketing_campaigns`, `campaign_leads`, `lead_status_history`
*   `support_tickets`, `ticket_replies`
*   `notifications`, `user_notification_settings`
*   **Enums:** `communication_channel_enum`, `delivery_status_enum`, `lead_source_enum`, `ticket_status_enum`.

### What Must Be STRICTLY EXCLUDED:
*   🚫 `users`: Seeker data belongs in **Identity**. This schema only references the `user_id`.
*   🚫 `learning_curves`: Course data belongs in **Education**. A campaign may point to a course ID, but the course metadata stays put.
*   🚫 `background_tasks`: The infrastructure for *how* a message is enqueued belongs in the **System/Infrastructure** schema. This schema only records the *result* of the communication.
*   🚫 `file_assets`: Attachments to tickets or posts belong in **Media/DAM**.

---

## 4. Dependencies & Interaction

The Interactions domain is a **Service Domain**.

*   **Direction of Dependency:** It has a "Radial" dependency pattern.
*   **Outbound Dependencies:**
    *   **Identity:** Crucial for knowing *who* to notify. Points to `identity.users.id`.
    *   **Media/DAM:** Posts and tickets point to `media.file_assets.id` for images/documents.
*   **Inbound Dependencies (Extreme):**
    *   **Every Domain:** Almost every action in the system (Donation, Enrollment, Shastra Correction) will eventually trigger a row in `communication_logs` or `notifications`.
*   **Direction:** Interactions depends on Identity and Media, while the entire system depends on Interactions for visibility into user engagement.

---

## 5. Risks & Design Pitfalls

When architecting a high-volume communication system, avoid these common mistakes:

1.  **Notification Overload:** Designing the schema without a robust `user_notification_settings` table. Users must have granular control over *what* they receive and *where* (Email vs. Push).
2.  **PII Leakage in Logs:** Storing the full raw HTML of every email in `communication_logs`. This causes massive DB bloat and risks exposing sensitive data. Use template IDs and dynamic data blobs instead.
3.  **Conflating Leads and Users:** Trying to force "Leads" into the `users` table. Leads are often anonymous or partially identified (just an email). Keep them in `campaign_leads` until they formally register, then link them.
4.  **Synchronous Bottlenecks:** Designing the API so that "sending an email" is part of the database transaction. Communication must be fire-and-forget (write to log -> process in background).

> [!IMPORTANT]  
> **User Review Required:** Do you approve of the "Communication Ledger" approach and the clear separation between Leads and Users? If approved, I will proceed to **Domain 6: System / Infrastructure Layer**.
