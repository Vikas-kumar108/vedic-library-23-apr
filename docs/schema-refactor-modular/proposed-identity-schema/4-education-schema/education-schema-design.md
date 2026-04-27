# Production-Grade Schema Design: Education Domain (`education`)

This document outlines the architectural design for the `education` PostgreSQL schema. This domain acts as the **Learning Management System (LMS)** layer of the Vedic Skills Institute.

---

## 1. Schema Overview

The `education` schema governs how users interact with the Vedic knowledge base over time. 

**Core Architectural Rule:** This domain **does not store original texts**. It relies on referencing the immutable `knowledge.nodes` to create curriculums. By using a recursive "Step" structure instead of rigid tables (like `modules` vs `lessons`), the system can support arbitrarily deep courses while remaining highly scalable.

---

## 2. Table-by-Table Definition

### 2.1. Curriculum Structure
*   **`courses` (Replaces `learning_curves`)**: The top-level learning pathway.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `slug`, `title`, `description`, `target_life_stages` (array of `identity.life_stage_enum`), `status` (`course_status_enum`).
    *   **Relationships:** Standalone parent.
*   **`course_steps` (Replaces `learning_curve_steps`)**: A recursive table defining the actual hierarchy (Module ➔ Lesson ➔ Topic).
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `step_type` (`step_type_enum`), `order_index`, `title`, `description`, `unlock_requirement` (JSONB).
    *   **Relationships:** 
        *   FK `course_id` to `courses.id`.
        *   Recursive FK `parent_step_id` to `course_steps.id`.
        *   **Cross-Domain FK:** `content_node_id` points outward to `knowledge.nodes(id)` (Linking a lesson directly to a Shastra verse/section without duplicating the text).

### 2.2. Student Progression
*   **`enrollments` (Replaces base of `user_curve_progress`)**: Tracks a user's overarching access to a course.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `status` (`enrollment_status_enum`), `started_at`, `completed_at`.
    *   **Relationships:** 
        *   FK `course_id` to `courses.id`.
        *   **Cross-Domain FK:** `user_id` points outward to `identity.users(id)`.
*   **`step_progress` (New addition for granularity)**: Tracks progress on individual modules/lessons.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `status` (`progress_status_enum`), `last_accessed_at`, `completed_at`.
    *   **Relationships:** FK `enrollment_id` to `enrollments.id`, FK `step_id` to `course_steps.id`.

### 2.3. Mentorship & Guidance
*   **`guidance_assignments`**: Links a student to a specific guide/mentor.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `assignment_type` (`assignment_type_enum`), `subject`, `status` (`guidance_status_enum`).
    *   **Relationships:** 
        *   **Cross-Domain FK:** `guide_user_id` ➔ `identity.users(id)`
        *   **Cross-Domain FK:** `student_user_id` ➔ `identity.users(id)`
*   **`guidance_sessions`**: Log of interactions between guide and student.
    *   **Primary Key:** `id` (UUID)
    *   **Key Fields:** `topic`, `summary_notes`, `session_date`.
    *   **Relationships:** FK `assignment_id` to `guidance_assignments.id`.

---

## 3. Mapping from Existing Schema (`public` ➔ `education`)

| Current `public` Table | Decision | Migration Action |
| :--- | :--- | :--- |
| `learning_curves` | **MOVE/RENAME** | Rename to `education.courses`. Map `is_published` boolean to `status` enum. |
| `learning_curve_steps` | **MOVE/RENAME** | Rename to `education.course_steps`. Introduce `parent_step_id` for recursive modules/lessons. |
| `user_curve_progress` | **SPLIT** | Split into `education.enrollments` (course level) and `education.step_progress` (granular step level) to allow tracking exact lesson completion. |
| `guidance_assignments` | **MOVE** | Direct migration to `education.guidance_assignments`. |
| `guidance_sessions` | **MOVE** | Direct migration to `education.guidance_sessions`. |

---

## 4. Enum Strategy

The following `TYPE ... AS ENUM` definitions establish the business rules for education:

1.  **`course_status_enum` (New)**: (`DRAFT`, `PUBLISHED`, `ARCHIVED`). Replaces the fragile boolean `is_published`.
2.  **`step_type_enum` (New)**: (`MODULE`, `LESSON`, `TOPIC`, `QUIZ`). Allows the recursive `course_steps` table to know what level of the hierarchy it represents.
3.  **`enrollment_status_enum` (New)**: (`ACTIVE`, `COMPLETED`, `DROPPED`, `PAUSED`).
4.  **`progress_status_enum` (New)**: (`NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`).
5.  **`assignment_type_enum` (Existing)**: (`mentor`, `teacher`, `coordinator`).
6.  **`guidance_status_enum` (Existing)**: (`ACTIVE`, `COMPLETED`, `ON_HOLD`, `TERMINATED`).

---

## 5. Boundaries & Separation

### What Strictly Belongs
All curriculum structuring (packaging knowledge into courses), student enrollments, granular progress tracking, and mentorship assignments.

### What Must Be Excluded (The "Leaky Abstractions")
*   **`knowledge.nodes` & `knowledge.texts`**: As noted, the raw scriptural text remains in the Knowledge domain. Education simply creates a "playlist" of pointers to those nodes.
*   **Course Payments/Subscriptions**: Tracking whether a user *paid* for a course belongs in `institution.user_subscriptions` or `institution.transactions`. The `education` schema only cares that an `enrollment` record exists.
*   **User Demographics**: Student ages or spiritual levels belong in `identity.spiritual_profiles`, not in the enrollment table.

---

## 6. Migration Awareness (Design-Level)

*   **Translating Linear to Recursive:** The current `learning_curve_steps` is a flat list (`step_order`). During migration, these can be safely ported directly into `course_steps` by simply assigning them all the `step_type = 'LESSON'`, ensuring backwards compatibility. The UI can later begin utilizing the `parent_step_id` to group them into `MODULE`s without breaking the old flat lists.
*   **Decoupled State:** Splitting `user_curve_progress` into `enrollments` and `step_progress` solves a major scalability issue: you can now query a user's overall course status without having to `SUM()` or loop over every single lesson they've clicked on.

> [!IMPORTANT]  
> **Review Requested:** Please review the schema design, specifically the decision to use a recursive `course_steps` table (with `step_type_enum`) instead of rigid, hardcoded tables for modules, lessons, and topics. Does this align with your architectural goals?



Edited institution-schema-implementation.md
Edited institution-schema-design.md
Edited knowledge-schema-design.md
Edited identity-schema-design.md
Edited prompt-1.md
Viewed prompt-1.md:46-93
Searched for "CREATE TABLE public\.(courses|learning_curves|user_curve_progress|learning_modules|lessons|assessments|quizzes|enrollments|student_enrollments)"
Viewed schema.sql:1425-1460
Viewed schema.sql:2088-2112
Searched for "CREATE TABLE public\.curve_steps"
Searched for "CREATE TABLE public\.[a-z_]+"
Viewed schema.sql:1330-1425
Searched for "CREATE TYPE public\.(assignment_type_enum|guidance_status_enum)"
Viewed schema.sql:115-388
Created education_schema_design.md

I have completed the production-grade PostgreSQL schema design for the **Education Domain** based on your existing `public` schema.

You can review the full schema definition and architectural decisions here: [education_schema_design.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/education_schema_design.md).

### Key Architectural Highlights:
1. **Recursive Curriculum over Rigid Tables:** Instead of creating hardcoded `modules`, `lessons`, and `topics` tables, I have designed a recursive `course_steps` table. By combining a `parent_step_id` with a new `step_type_enum`, you gain infinite flexibility in structuring courses while keeping the database extremely lean.
2. **Decoupled Progression Tracking:** I have split your existing `user_curve_progress` into two normalized tables: `enrollments` (tracking overall course access) and `step_progress` (tracking granular completion of individual lessons/modules). This resolves performance bottlenecks by eliminating the need to scan an entire course just to check if a user is enrolled.
3. **Pointers, Not Content:** The `education` schema strictly maintains the rule that it does not store raw scripture text. The `course_steps` table holds an outbound UUID reference (`content_node_id`) pointing directly to `knowledge.nodes`. 
4. **New Strong Enums:** To replace fragile booleans like `is_published` or `is_completed`, I have introduced `course_status_enum`, `enrollment_status_enum`, and `progress_status_enum` to provide proper state machines for the learning process.

As requested, this report focuses purely on design, structure, and boundaries without altering any code. Please review the proposal—specifically the decision to adopt the recursive `course_steps` table pattern. If this design aligns perfectly with your goals, we can proceed to generate the raw DDL implementation script for this schema.


Edited education-schema-design.md
Viewed prompt-2.md:1-24
Edited prompt-2.md
Created education_schema_implementation.md

I have generated the final, implementation-ready PostgreSQL schema design for the **Education Domain**.

You can review the complete schema definition (DDL) here: [education_schema_implementation.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/education_schema_implementation.md).

### Design Summary:
1. **The Recursive Hierarchy Constraint:** I implemented a strict `parent_step_id` within the `course_steps` table. To maintain clean database integrity and ensure sibling items (like modules inside a course) are properly ordered, I added a unique constraint: `idx_course_steps_order`. This prevents two steps from accidentally sharing the same sequence index under the same parent.
2. **Normalized Progress Tracking:** The DDL successfully partitions `user_curve_progress` into the `enrollments` table (tracking the overall relationship between a user and a course) and `step_progress` (tracking granular completion of every lesson/quiz). This directly optimizes reads for the user dashboard.
3. **Cross-Schema Pointers:** As established in our architectural rules, the `education` schema references `identity` (via `user_id`) and `knowledge` (via `content_node_id`) using raw `uuid` data types instead of hard PostgreSQL `REFERENCES` constraints. This ensures the LMS layer remains perfectly decoupled and will not trigger locking issues across schema boundaries.
4. **Strong Typing via Enums:** The creation of 6 dedicated enum types (like `step_type_enum` and `course_status_enum`) fully eliminates the reliance on generic booleans or hardcoded strings from the legacy schema, bringing type safety to the database level.

This DDL locks in the **Learning Management System (LMS)** layer of your architecture, allowing courses to point to canonical Shastras without duplicating content. 

If this execution accurately reflects your requirements, we are ready to proceed to the schema design phase for **Module 5: Interactions, Communications & Outreach**.