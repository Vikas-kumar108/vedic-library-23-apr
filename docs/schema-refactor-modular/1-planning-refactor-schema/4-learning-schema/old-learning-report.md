I now need a comprehensive analysis and mapping of the “Learning / Education” domain in my system—following the exact same depth and structure as the previous reports for:

User & Authentication
Library / Knowledge Layer
Institution-Level Systems

This is strictly an analysis-only task. No modifications or refactoring should be performed.

Scope of Analysis

Focus on all components related to:

Learning systems
Courses and curriculum structure
Modules, lessons, topics
Educational flow and progression
Student interaction with learning content
What Needs to Be Identified
1. Database Layer
All Prisma models related to:
Courses
Modules / lessons / topics
Enrollments / progress tracking
Educational structures and hierarchies
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

Course creation and management
Learning delivery (content rendering, navigation)
Progress tracking and user interaction
Educational workflows

Include:

API routes / endpoints
Controllers
Services
Repositories / data access layer
Prisma queries / DB interaction
Type definitions
Middleware (if applicable)
3. Structural Mapping

Clearly map:

Course → Module → Lesson → Topic relationships
Any hierarchy or dependency between entities
How learning flow is structured in code and database
Important Constraints (Strict)

🚫 Do NOT:

Modify any code
Suggest UI/UX changes
Refactor anything
Change APIs or structure

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
Learning Structure Overview
Hierarchy and flow (course → module → lesson → topic)
Dependency Overview
How components interact
Key entry points (e.g., course API → service → DB)
Goal
Achieve complete visibility of the learning/education system
Ensure no model, table, enum, or file is missed
Prepare for future modular schema design and refactoring

==========================================


# Learning & Education Systems Audit Report

This report maps the comprehensive "Learning / Education" domain of the Vedic Skills Institute. It details the models, tables, enums, and codebase routing responsible for course management, learning curves, progress tracking, and mentorship. This is strictly an analysis report; no codebase modifications were made.

---

## 1. Database Layer (Prisma Models & PostgreSQL Tables)

### Course & Curriculum Models
*   **`learning_curves`**
    *   **Purpose:** The top-level entity representing a full course or educational trajectory (e.g., "Bhakti Sastri", "Foundations of Dharma").
    *   **Relationships:** Has many `learning_curve_steps` and `user_curve_progress`.
*   **`learning_curve_steps`**
    *   **Purpose:** The individual modules, lessons, or topics within a curve. These are ordered sequentially.
    *   **Relationships:** Belongs to a `learning_curve`. Crucially, it links to `node_id` (from the Knowledge Layer), allowing a lesson to be a direct wrapper around a scriptural text or chapter.
    
### Enrollment & Mentorship Models
*   **`user_curve_progress`**
    *   **Purpose:** Tracks a user's enrollment and current status within a course.
    *   **Relationships:** Links a `user_id` to a `curve_id` and tracks the `current_step_id`.
*   **`guidance_assignments`**
    *   **Purpose:** Establishes a formal educational relationship (mentor-mentee, teacher-student) between two users.
    *   **Relationships:** Links a `guide_id` (User) to a `student_id` (User). Has many `guidance_sessions`.
*   **`guidance_sessions`**
    *   **Purpose:** Logs individual classes, meetings, or check-ins between a guide and a student.
    *   **Relationships:** Belongs to a `guidance_assignment`.

### Enums
*   **`life_stage_enum`**
    *   **Values:** `student`, `unmarried`, `married`, `parent`, `vanaprastha`, `renunciate`
    *   **Where Used:** Used in the `learning_curves` model (`target_life_stages`) to filter or recommend courses based on a user's current ashrama or demographic.
*   **`assignment_type_enum`**
    *   **Values:** `mentor`, `teacher`, `coordinator`
    *   **Where Used:** Used in the `guidance_assignments` model (`assignment_type`) to define the exact nature of the relationship.
*   **`guidance_status_enum`**
    *   **Values:** `ACTIVE`, `COMPLETED`, `ON_HOLD`, `TERMINATED`
    *   **Where Used:** Used in the `guidance_assignments` model (`status`) to track if the mentorship is currently ongoing.

---

## 2. Codebase Layer

### Application Routing & Services
*   **`apps/api-gateway/src/routes/academy.routes.ts`**
    *   **Responsibility:** The primary Fastify endpoints for the education domain (`/courses`, `/pulse`, `/seeker/:userId`, `/mentor/:id`).
*   **`apps/api-gateway/src/services/academy.service.ts`**
    *   **Responsibility:** The core business logic for education. Features methods like `getLearningCurves()`, `getSeekerProfile()` (which fetches `curveProgress` and `assignmentsAsGuide`), and `getCommunityPulse()`.

### Admin UI & Content Delivery
*   **`apps/web-portal/app/admin/content/courses/new/page.tsx`**
    *   **Responsibility:** The Course Builder UI prototype ("Course Forge"). 
    *   **Current State:** It is currently a purely frontend interactive prototype using hardcoded React state (`availableLessons`, `modules`) and does not yet mutate the `learning_curves` database tables.
*   **`apps/web-portal/app/admin/community/` & `apps/web-portal/app/admin/users/`**
    *   **Responsibility:** Interfaces that likely consume the mentor/seeker profiles and display course progress alongside user data.

---

## 3. Structural Mapping & Dependency Overview

### Learning Structure Overview
The educational flow is structured elegantly to reuse the existing Knowledge Graph rather than reinventing a separate content management system:

1.  **Course (`learning_curves`)**: The outer container defining the syllabus and target audience.
2.  **Module / Lesson / Topic (`learning_curve_steps`)**: The sequential steps. Because a step points to a `node_id`, a course is essentially a curated playlist of existing Shastric nodes (e.g., Step 1: Read Bhagavad Gita Chapter 2, Step 2: Read specific Sutra).
3.  **Progress (`user_curve_progress`)**: A pointer that moves along the sequential steps for a specific user, recording start and completion timestamps.

### Dependency Overview
The Learning Domain acts as a bridge uniting Identity and Knowledge:

*   **Dependency on Knowledge Layer:** `learning_curve_steps` cannot exist meaningfully without the `nodes` table. An educational syllabus is fundamentally bound to the library tree.
*   **Dependency on Identity Layer:** Both `user_curve_progress` and `guidance_assignments` are strictly dependent on the `users` table. The `AcademyService` heavily joins `user_profiles` and `spiritual_profiles` when rendering a Seeker or Mentor dashboard.
