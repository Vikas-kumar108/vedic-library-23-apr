I now need a comprehensive analysis and mapping of the “Interactions, Communications & Outreach” domain in my system—following the same depth and structure as the previous reports for:

User & Authentication
Library / Knowledge Layer
Institution-Level Systems
Learning / Education

This is strictly an analysis-only task. No modifications or refactoring should be performed.

Scope of Analysis

Focus on all components related to:

User interactions and engagement
Communication systems
Messaging (internal/external)
Notifications (email, in-app, push, etc.)
Community or social features (if any)
Marketing and outreach systems
Campaigns, leads, and engagement tracking
What Needs to Be Identified
1. Database Layer
All Prisma models related to:
Messages / chats / conversations
Notifications / alerts
Campaigns / outreach / marketing
Leads / contacts / subscribers
Engagement tracking (opens, clicks, responses, etc.)
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

Messaging systems
Notification delivery
Communication workflows
Marketing campaigns and outreach logic
User engagement tracking

Include:

API routes / endpoints
Controllers
Services
Repositories / data access layer
Prisma queries / DB interaction
Type definitions
Middleware (e.g., notification triggers, auth guards if linked)
Integration points (email services, SMS, third-party APIs if present)
3. Interaction Flow Mapping

Clearly map:

How communication flows:
User → system
System → user
User ↔ user (if applicable)
Campaign lifecycle:
Creation → targeting → delivery → tracking
Notification lifecycle:
Trigger → processing → delivery → status
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
Interaction & Communication Flow Overview
Messaging flow
Notification flow
Campaign/outreach flow
Dependency Overview
How components interact
Key entry points (e.g., API → service → DB → delivery system)
Goal
Achieve complete visibility of all interaction, communication, and outreach systems
Ensure no model, table, enum, or file is missed
Prepare for future modularization and system refactoring

==============================================

# Interactions, Communications & Outreach Audit Report

This report maps the comprehensive "Interactions, Communications & Outreach" domain of the Vedic Skills Institute. It details the database models, enums, files, and interaction flows governing user engagement, marketing campaigns, email notifications, and social study circles. This is strictly an analysis report; no codebase modifications were made.

---

## 1. Database Layer (Prisma Models & PostgreSQL Tables)

### Marketing, Outreach & Tracking Models
*   **`communication_campaigns`**
    *   **Purpose:** The central model defining targeted outreach initiatives (newsletters, announcements, promotions).
    *   **Relationships:** Targets specific `organizations`, `partner_organizations`, or `subscription_tiers`. Has many `communication_logs`.
*   **`communication_logs`**
    *   **Purpose:** The granular ledger for every single message sent out of the system (Email, SMS, Push). Used to track engagement.
    *   **Relationships:** Belongs to a `communication_campaign`, targets a specific `user` or `partner_organization`, and optionally links to a `library_item` being shared.
*   **`webhook_events`**
    *   **Purpose:** Captures incoming webhooks from external providers (e.g., Mailgun, Resend, Twilio) to asynchronously update the delivery status (Opened, Clicked, Bounced) in `communication_logs`.

### Social, Community & Messaging Models
*   **`circles`**
    *   **Purpose:** Represents community groups, study sangas, or regional chapters.
    *   **Relationships:** Managed by a `mentor_id` (User), contains many `circle_members` and `circle_posts`.
*   **`circle_posts`**
    *   **Purpose:** The internal messaging/forum system where users share realizations or ask questions within a circle.
    *   **Relationships:** Authored by a `user`, belongs to a `circle`.
*   **`support_tickets`**
    *   **Purpose:** Direct 1-on-1 operational messaging between a user and the institutional administration.

### Enums
*   **`campaign_status_enum`**
    *   **Values:** `DRAFT`, `SCHEDULED`, `SENT`, `FAILED`, `CANCELLED`
    *   **Where Used:** In `communication_campaigns.status` to govern the broadcast lifecycle.
*   **`communication_channel_enum`**
    *   **Values:** `EMAIL`, `SMS`, `WHATSAPP`, `PUSH`, `IN_APP`
    *   **Where Used:** In `communication_logs.channel` to identify the delivery medium.
*   **`communication_status_enum`**
    *   **Values:** `DRAFT`, `QUEUED`, `SENT`, `DELIVERED`, `FAILED`, `OPENED`, `CLICKED`
    *   **Where Used:** In `communication_logs.status` for high-fidelity engagement tracking.
*   **`circle_type_enum`**
    *   **Values:** `REGIONAL`, `STUDY_GROUP`, `MENTOR_CIRCLE`
    *   **Where Used:** In `circles.type` to define the nature of the community group.
*   **`post_category_enum`**
    *   **Values:** `REALIZATION`, `QUESTION`, `ANNOUNCEMENT`
    *   **Where Used:** In `circle_posts.category` to functionally classify messages.
*   **`webhook_status_enum`**
    *   **Values:** `PENDING`, `PROCESSED`, `FAILED`
    *   **Where Used:** In `webhook_events.status` to ensure reliable background processing.

---

## 2. Codebase Layer

### APIs & Services
*   **`apps/api-gateway/src/routes/broadcast.ts`**
    *   **Responsibility:** Exposes the `POST /broadcast` endpoint. Parses targeting criteria (roles, stages, specific users) and triggers the campaign.
*   **`apps/api-gateway/src/services/broadcast.service.ts`**
    *   **Responsibility:** The core communication engine. It performs the dynamic DB query to build the audience list based on `BroadcastCriteria`. It then formats the HTML email (injecting the Shastra content) and maps over the audience using `InstitutionalEmailService`.

### Integration Layer
*   **`IntegrationRegistry` (`apps/api-gateway/src/integrations/registry`)**
    *   **Responsibility:** Acts as the adapter factory, exposing `getEmailService()` to decouple the broadcast logic from specific providers (e.g., Resend, AWS SES).

### User Interface & Management
*   **`apps/web-portal/app/admin/communication/page.tsx`**
    *   **Responsibility:** The Admin UI for architecting campaigns, drafting content, and viewing engagement analytics.
*   **`apps/web-portal/app/admin/community/page.tsx`**
    *   **Responsibility:** The Admin UI for overseeing community `circles` and moderating `circle_posts`.

---

## 3. Interaction & Communication Flow Overview

### Campaign & Outreach Flow (System → User)
1.  **Creation:** An Admin drafts a new campaign in the `/admin/communication` UI, selecting a specific piece of Knowledge (e.g., a Shastra verse) to broadcast.
2.  **Targeting:** The Admin defines the audience (e.g., "All users in the 'student' life stage" or "All members of a specific circle").
3.  **Delivery:** The UI hits the API Gateway `POST /broadcast`. The `BroadcastService` dynamically fetches the audience list from Prisma, formats a branded HTML email, and dispatches the payload via the `IntegrationRegistry`.
4.  **Tracking:** The external email provider triggers webhooks upon email delivery, open, and click events. These are caught in `webhook_events`, processed, and mapped back to the `communication_status_enum` in `communication_logs`.

### Community Social Flow (User ↔ User)
1.  **Grouping:** Users are organized into `circles` (regional or topical).
2.  **Interaction:** A user authors a `circle_post`. Based on the `post_category_enum`, this could be a "QUESTION" directed at a mentor, or a "REALIZATION" shared with peers.
3.  **Engagement:** Peers can interact with the post (tracking `likes` and `replies`).

### Direct Support Flow (User ↔ System)
1.  **Initiation:** A user facing an issue creates a `support_ticket`.
2.  **Resolution:** An institutional staff member is assigned (`assigned_to_id`), and they progress the `ticket_status_enum` from `OPEN` to `RESOLVED` through direct communication.

---

## 4. Dependency Overview

*   **Reliance on Identity Schema:** The communication system cannot function without the `users` table. Audience targeting explicitly relies on user properties (roles, ashrama stages, circle memberships).
*   **Reliance on Knowledge Schema:** Campaigns often wrap around educational content. The `broadcast.ts` flow currently explicitly accepts a `contentId` to fetch library items/shastra content to send to seekers.
*   **Asynchronous Bottleneck:** High-volume engagement tracking relies on the proper processing of `webhook_events` into `communication_logs`. If the webhook processing fails, engagement data (`OPENED`, `CLICKED`) will become stale.
