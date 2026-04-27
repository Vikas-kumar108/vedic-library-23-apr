# Production-Grade Schema Design: Community Domain (`community`)

This document outlines the architectural design for the `community` PostgreSQL schema. This domain acts as the **Social Engine** of the Vedic Skills Institute, governing forums, circles, discussions, and moderation.

---

## 1. Schema Overview

The `community` schema manages user-generated content (UGC) and social structures. 

**Core Architectural Rule:** This domain is highly read-heavy (loading feeds) and moderately write-heavy (posting, liking). It relies entirely on outward pointers (`user_id`) to the `identity` schema. It must never store official canon (which belongs in `knowledge`) but can reference canonical nodes to facilitate scriptural discussions.

---

## 2. Table-by-Table Definition

### 2.1. Communities & Memberships
*   **`communities` (Rename of `circles`)**: The logical grouping of users.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `name`, `slug`, `description`, `type` (`community_type_enum`: 'REGIONAL', 'STUDY_GROUP', 'MENTOR_CIRCLE'), `is_private`.
    *   **Relationships:** **Cross-Domain FK:** `mentor_id` ➔ `identity.users(id)`.
*   **`memberships` (Rename of `circle_members`)**: Link between a user and a community.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `community_id` (FK), `role` (`community_role_enum`: 'MEMBER', 'MODERATOR', 'ADMIN'), `joined_at`.
    *   **Relationships:** **Cross-Domain FK:** `user_id` ➔ `identity.users(id)`.

### 2.2. Discussions & User-Generated Content
*   **`posts` (Rename/Extend of `circle_posts`)**: A unified table for threads, comments, and replies using an Adjacency List pattern.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `community_id` (FK), `content`, `category` (`post_category_enum`), `is_pinned`.
    *   **Relationships:** 
        *   Recursive FK `parent_post_id` ➔ `posts.id` (Enables infinite reply threads. If null, it's a top-level thread).
        *   **Cross-Domain FK:** `author_id` ➔ `identity.users(id)`.
        *   **Cross-Domain FK (Optional):** `reference_node_id` ➔ `knowledge.nodes(id)` (If the post is discussing a specific verse).

### 2.3. Engagement (New Subdomain)
*   **`reactions` (New)**: Replaces the hardcoded `likes` integer counter to allow exact tracking and different emoji types.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `post_id` (FK), `reaction_type` (`reaction_type_enum`: 'LIKE', 'HEART', 'INSIGHTFUL').
    *   **Relationships:** **Cross-Domain FK:** `user_id` ➔ `identity.users(id)`.
*   **`follows` (New)**: Allows users to subscribe to communities or specific threads for notifications.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `target_id` (UUID), `target_type` ('COMMUNITY', 'POST').
    *   **Relationships:** **Cross-Domain FK:** `user_id` ➔ `identity.users(id)`.

### 2.4. Moderation (New Subdomain)
*   **`moderation_reports` (New)**: Tracks flagged content.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `post_id` (FK), `reason` (`report_reason_enum`), `status` (`report_status_enum`), `notes`.
    *   **Relationships:** 
        *   **Cross-Domain FK:** `reporter_id` ➔ `identity.users(id)`.
        *   **Cross-Domain FK:** `resolved_by_id` ➔ `identity.users(id)`.

---

## 3. Mapping from Existing Schema (`public` ➔ `community`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `circles` | **MOVE/RENAME** | Rename to `community.communities`. |
| `circle_members` | **MOVE/RENAME** | Rename to `community.memberships`. Add surrogate PK `id`. |
| `circle_posts` | **MOVE/EXTEND** | Move to `community.posts`. Add `parent_post_id` to natively support comments and replies instead of just an integer counter. |
| *(None)* | **CREATE** | Create `reactions`, `follows`, `moderation_reports` to mature the community feature set. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions establish the business rules for the community:

1.  **`community_type_enum` (Rename of `circle_type_enum`)**: (`REGIONAL`, `STUDY_GROUP`, `MENTOR_CIRCLE`).
2.  **`community_role_enum` (Rename of `circle_role_enum`)**: (`MEMBER`, `MODERATOR`, `ADMIN`).
3.  **`post_category_enum` (Existing)**: (`REALIZATION`, `QUESTION`, `ANNOUNCEMENT`).
4.  **`reaction_type_enum` (New)**: (`LIKE`, 'HEART', 'INSIGHTFUL'). Replaces integer counters.
5.  **`report_reason_enum` (New)**: (`SPAM`, `HARASSMENT`, `INAPPROPRIATE`, `OTHER`).
6.  **`report_status_enum` (New)**: (`PENDING`, `REVIEWED`, `DISMISSED`, `ACTION_TAKEN`).

---

## 5. Boundaries & Separation

### What Strictly Belongs
All public/semi-public user discussions, group hierarchies, user-generated content (posts), likes, and moderation flagging.

### What Must Be Excluded (The "Leaky Abstractions")
*   **Direct Messages:** P2P messaging belongs in the `interactions` schema. The `community` schema is explicitly for multi-user forum-style or feed-style content.
*   **Support Tickets:** Complaints about the platform go to `interactions.support_tickets`. Complaints about a user's *post* go to `community.moderation_reports`.
*   **Official Purports / Annotations:** If a verified Acharya adds a purport to a verse, that goes to `knowledge.texts`. If a student discusses that verse, it goes to `community.posts`.

---

## 6. Migration Awareness (Design-Level)

*   **Handling Legacy Counters:** The current `circle_posts` table uses integer fields (`likes`, `replies`). During migration, the integer data will be maintained for historical context, but going forward, the backend should perform `COUNT()` aggregations on the new `reactions` and recursive `posts` tables to calculate these numbers dynamically.
*   **Thread Normalization:** By adding `parent_post_id` to the `posts` table, we avoid needing separate `comments` and `replies` tables. A post with a `null` parent is a thread. A post with a `parent_post_id` is a comment/reply.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design. In particular, note the decision to use a recursive `posts` table (via `parent_post_id`) instead of separate tables for comments, as well as the deprecation of integer `like` counters in favor of a normalized `reactions` table. Does this align with your architectural goals?


Edited interactions-schema-design.md
Viewed interactions-schema-implementation.md:230-265
Edited interactions-schema-implementation.md
Searched for "CREATE TABLE public\.(circles|circle_members|circle_posts|threads|posts|comments|replies|moderation|reports|reactions|likes|community[a-z_]*)"
Viewed schema.sql:900-960
Searched for "CREATE TYPE public\.post_category_enum"
Viewed schema.sql:532-544
Created community_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **Community Domain** based on your existing `public` schema.

You can review the full schema definition and architectural decisions here: [community_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/community_schema_design.md).

### Key Architectural Highlights:
1. **Adjacency List for Infinite Threads:** The current `circle_posts` table tracks "replies" as a simple integer. I have redesigned the `posts` table to include a `parent_post_id` self-referencing foreign key. This allows for infinitely nested comment threads (like Reddit or Twitter) natively within a single table, eliminating the need for separate `comments` or `replies` tables.
2. **Normalized Engagement Analytics:** The current system tracks `likes` as an integer on the post. I have introduced a dedicated `reactions` table. This allows the system to support multiple emoji types (e.g., HEART, INSIGHTFUL), prevents duplicate likes by the same user, and scales perfectly for engagement analytics.
3. **Dedicated Moderation Infrastructure:** I introduced a `moderation_reports` table specifically to handle flagged User-Generated Content (UGC), creating a clear boundary between platform support (Interactions) and content policing (Community).
4. **Renaming for Clarity:** The legacy tables (`circles`, `circle_members`, `circle_posts`) have been semantically modernized to `communities`, `memberships`, and `posts` to align with standard community architectures.

As requested, this report focuses purely on design, structure, and boundaries without altering any code. Please review the proposal—specifically the decision to transition from integer counters to normalized `reactions`, and the recursive `posts` thread structure. If this design perfectly meets your system requirements, we can proceed to generate the raw DDL implementation script for this schema.