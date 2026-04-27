# Production-Grade Schema Design: Community Domain (`community`)

This document outlines the architectural design for the `community` PostgreSQL schema. This domain acts as the **Social Engine** of the Vedic Skills Institute, governing forums, event gatherings, family ancestry tracking, and moderation.

---

## 1. Schema Overview

The `community` schema manages all forms of user-to-user interconnection. Following your request, the scope of this domain has been expanded beyond standard discussion circles to explicitly include **Ancestral Genealogy (Family Graph)** and **Institutional Events**. 

**Core Architectural Rule:** This domain is highly read-heavy (loading feeds, trees, calendars). It relies entirely on outward pointers (`user_id`) to the `identity` schema. It must never store official canon (which belongs in `knowledge`) but references it to facilitate scriptural discussions.

---

## 2. Table-by-Table Definition

### 2.1. Communities & Memberships
*   **`communities` (Rename of `circles`)**: The logical grouping of users.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `name`, `slug`, `description`, `type` (`community_type_enum`), `is_private`.
    *   **Relationships:** **Cross-Domain FK:** `mentor_id` ➔ `identity.users(id)`.
*   **`memberships` (Rename of `circle_members`)**: Link between a user and a community.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `community_id` (FK), `role` (`community_role_enum`), `joined_at`.
    *   **Relationships:** **Cross-Domain FK:** `user_id` ➔ `identity.users(id)`.

### 2.2. Discussions & User-Generated Content
*   **`posts` (Rename/Extend of `circle_posts`)**: A unified table for threads, comments, and replies using an Adjacency List pattern.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `community_id` (FK), `content`, `category` (`post_category_enum`), `is_pinned`.
    *   **Relationships:** 
        *   Recursive FK `parent_post_id` ➔ `posts.id` (Enables infinite reply threads).
        *   **Cross-Domain FK:** `author_id` ➔ `identity.users(id)`.
        *   **Cross-Domain FK (Optional):** `reference_node_id` ➔ `knowledge.nodes(id)` (If discussing a specific verse).

### 2.3. Family & Genealogy Graph
*   **`family_groups`**: Represents a distinct family unit or gotra.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `name`, `origin_place`, `description`.
*   **`family_nodes`**: The hierarchical structure of a family tree.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `path` (`ltree` extension for infinite-depth traversal), `level`.
    *   **Relationships:** 
        *   FK `family_group_id` ➔ `family_groups.id`
        *   Recursive FK `parent_id` ➔ `family_nodes.id`
        *   **Cross-Domain FK:** `user_id` ➔ `identity.users(id)`.
*   **`family_links`**: Peer-to-peer relationships between two specific users (e.g., marriage, siblings).
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `type` (`relationship_type_enum`), `notes`.
    *   **Relationships:** 
        *   **Cross-Domain FKs:** `user_id` & `related_id` ➔ `identity.users(id)`.

### 2.4. Events & Gatherings
*   **`events` (Rename of `vedic_events`)**: Manages the scheduling of physical or digital gatherings.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `title`, `description`, `start_time`, `end_time`, `type` (`event_type_enum`).
    *   **Relationships:** 
        *   **Cross-Domain FK:** `host_id` ➔ `identity.users(id)`.
*   **`event_registrations`**: Tracks user RSVPs and attendance.
    *   **Primary Key:** `id` (UUID) -- Note: Will require adding a PK if one didn't exist natively.
    *   **Relationships:** 
        *   FK `event_id` ➔ `events.id`.
        *   **Cross-Domain FK:** `user_id` ➔ `identity.users(id)`.

### 2.5. Engagement & Moderation
*   **`reactions` (New)**: Replaces hardcoded `likes` integer counters.
    *   **Key Fields:** `post_id` (FK), `reaction_type` (`reaction_type_enum`).
*   **`follows` (New)**: Allows users to subscribe to communities or threads.
    *   **Key Fields:** `target_id`, `target_type` ('COMMUNITY', 'POST').
*   **`moderation_reports` (New)**: Tracks flagged content.
    *   **Key Fields:** `post_id` (FK), `reason` (`report_reason_enum`), `status` (`report_status_enum`).

---

## 3. Mapping from Existing Schema (`public` ➔ `community`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `circles`, `circle_members` | **MOVE/RENAME** | Rename to `community.communities` and `community.memberships`. |
| `circle_posts` | **MOVE/EXTEND** | Move to `community.posts`. Add `parent_post_id` to support nested replies natively. |
| `family_groups`, `family_nodes`, `family_links` | **MOVE** | Direct migration to `community`. Ensure `ltree` extension is accessible. |
| `vedic_events`, `event_registrations` | **MOVE/RENAME** | Move to `community`. Rename `vedic_events` to simply `events`. |
| *(None)* | **CREATE** | Create `reactions`, `follows`, `moderation_reports` to mature the forum features. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions establish the business rules for the community:

1.  **`community_type_enum`**: (`REGIONAL`, `STUDY_GROUP`, `MENTOR_CIRCLE`).
2.  **`community_role_enum`**: (`MEMBER`, `MODERATOR`, `ADMIN`).
3.  **`post_category_enum`**: (`REALIZATION`, `QUESTION`, `ANNOUNCEMENT`).
4.  **`relationship_type_enum` (Existing)**: (`pitara`, `matara`, `vaivahika`, `sahodara`, `guru`, `shishya`).
5.  **`event_type_enum` (Existing)**: (`LIVE_SATSANG`, `WORKSHOP`, `GROUP_MEDITATION`).
6.  **`reaction_type_enum` (New)**: (`LIKE`, 'HEART', 'INSIGHTFUL').
7.  **`report_reason_enum` (New)**: (`SPAM`, `HARASSMENT`, `INAPPROPRIATE`, `OTHER`).
8.  **`report_status_enum` (New)**: (`PENDING`, `REVIEWED`, `DISMISSED`, `ACTION_TAKEN`).

---

## 5. Boundaries & Separation

### What Strictly Belongs
All public/semi-public user discussions, group hierarchies, user-generated content (posts), likes, moderation flagging, ancestral family trees, and scheduled community events.

### What Must Be Excluded (The "Leaky Abstractions")
*   **Direct Messages:** P2P messaging belongs in the `interactions` schema.
*   **Support Tickets:** Complaints about the platform go to `interactions.support_tickets`. Complaints about a user's *post* go to `community.moderation_reports`.

---

## 6. Migration Awareness (Design-Level)

*   **The Second `ltree` Usage:** Similar to the `knowledge` schema, the `family_nodes` table uses `ltree` for `path`. It is perfectly safe to use `ltree` in two different schemas, provided the DB configures the extension at the `public` level and references it explicitly (e.g., `public.ltree`).
*   **Thread Normalization:** By adding `parent_post_id` to the `posts` table, we avoid needing separate `comments` and `replies` tables. A post with a `null` parent is a thread. A post with a `parent_post_id` is a comment/reply.

> [!IMPORTANT]  
> **Review Requested:** I have incorporated the Family Graph and Events/Calendar system into the Community domain design as requested. This logically bundles all user-to-user sociology into one module. Does this integrated architecture align with your final vision for the Community Domain?



Viewed old-misc-report.md:105-141
Searched for "CREATE TABLE public\.[a-z_]*event[a-z_]*"
Viewed schema.sql:2200-2230
Viewed schema.sql:1150-1210
Edited community_schema_design.md

I have redesigned the **Community Domain** schema to fully incorporate the Family & Genealogy Graph and the Events & Calendar System, as you requested.

You can review the updated architectural design here: [community_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/community_schema_design.md).

### Key Architectural Updates:
1. **Ancestral Integration (`family_groups`, `family_nodes`, `family_links`):** The `community` schema now officially houses the family graph. Since `family_nodes` relies on the same `ltree` infinite-depth structure as your `knowledge` schema, I have ensured the design safely references the globally accessible `public.ltree` extension.
2. **Events & Calendar (`events`, `event_registrations`):** The legacy `vedic_events` and its registration structures have been successfully migrated in. Placing them within the `community` schema makes logical sense, as events are primarily mechanisms for community gathering (whether physical or digital).
3. **Sociological Consolidation:** By pulling Forums (circles), Ancestry (gotras/families), and Gatherings (events) into this single schema, we have essentially constructed the entire sociological framework of the Vedic Skills Institute in one domain, completely separated from transactions, e-learning progress, and raw canonical texts.

Please review the updated design document. If grouping the Family Graph and Events strictly within the `community` schema aligns with your final architectural vision, we can proceed to generate the raw DDL implementation script for this domain.


Edited community-schema-design-1.md
Edited community-schema-design-2.md
Edited prompt-2.md
Viewed community-schema-design-2.md:116-138
Created community_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Community Domain**.

You can review the complete schema definition (DDL) here: [community_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/community_schema_implementation.md).

### Design Summary:
1. **Ltree Safely Configured:** In the DDL, I explicitly defined `CREATE EXTENSION IF NOT EXISTS ltree SCHEMA public;`. This ensures that both the `knowledge` schema and the new `community` schema can safely use the `ltree` extension for their hierarchical structures (`family_nodes.path`) without causing cross-schema permission issues.
2. **Unified Engagement:** All social gatherings (`events`), ancestral linkages (`family_nodes`), and discussions (`posts`) now exist perfectly inside the `community` schema, fulfilling your vision of a consolidated sociological graph.
3. **Optimized Threading:** The `posts` table uses an adjacency list (`parent_post_id`), entirely removing the need for separate tables to handle threaded discussions and nested comments.
4. **Virtual Schema Independence:** Like the other domains, all links pointing outward (e.g., `user_id` in `reactions` or `host_id` in `events`) are standard UUID columns. This guarantees that your core `identity` schema is protected from the high write-volume common to forums and engagement modules.

This concludes the architectural planning and schema generation for the **Community Domain**. 

If this DDL accurately reflects your requirements, we can proceed to the next module in your checklist: **Module 6: System / Infrastructure Layer**.