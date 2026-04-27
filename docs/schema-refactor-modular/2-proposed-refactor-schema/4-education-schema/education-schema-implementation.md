# Implementation-Ready Schema: Education Domain (`education`)

This document provides the complete, production-grade PostgreSQL Data Definition Language (DDL) for the newly isolated `education` schema. 

This schema serves as the **Learning Management System (LMS)** layer. It uses a highly scalable recursive hierarchy for courses and completely decouples from raw scripture content, pointing instead to the `knowledge` schema.

---

## 1. Schema Initialization

```sql
-- Create the dedicated schema for Education
CREATE SCHEMA IF NOT EXISTS education;
```

---

## 2. Enum Definitions

These custom PostgreSQL types establish strict state machines for the learning process.

```sql
-- Course Structure Enums
CREATE TYPE education.course_status_enum AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);

CREATE TYPE education.step_type_enum AS ENUM (
    'MODULE',
    'LESSON',
    'TOPIC',
    'QUIZ'
);

-- Student Progression Enums
CREATE TYPE education.enrollment_status_enum AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'DROPPED',
    'PAUSED'
);

CREATE TYPE education.progress_status_enum AS ENUM (
    'NOT_STARTED',
    'IN_PROGRESS',
    'COMPLETED'
);

-- Mentorship & Guidance Enums
CREATE TYPE education.assignment_type_enum AS ENUM (
    'mentor',
    'teacher',
    'coordinator'
);

CREATE TYPE education.guidance_status_enum AS ENUM (
    'ACTIVE',
    'COMPLETED',
    'ON_HOLD',
    'TERMINATED'
);
```

---

## 3. Curriculum Structure

### 3.1. `courses`
```sql
CREATE TABLE education.courses (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    description text,
    
    -- Target audience mapping (e.g., ['STUDENT', 'HOUSEHOLDER'])
    target_life_stages text[], 
    
    status education.course_status_enum DEFAULT 'DRAFT'::education.course_status_enum,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 3.2. `course_steps` (Recursive Hierarchy)
```sql
CREATE TABLE education.course_steps (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES education.courses(id) ON DELETE CASCADE,
    
    -- Recursive Parent ID for nested Modules -> Lessons -> Topics
    parent_step_id uuid REFERENCES education.course_steps(id) ON DELETE CASCADE,
    
    step_type education.step_type_enum NOT NULL,
    order_index integer NOT NULL,
    
    title text NOT NULL,
    description text,
    
    -- Cross-Domain Reference to Knowledge Schema
    -- (Points to knowledge.nodes but enforced logically by the application)
    content_node_id uuid,
    
    -- Complex prerequisites or completion criteria
    unlock_requirement jsonb,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Ensure ordering logic is enforced per parent layer
CREATE UNIQUE INDEX idx_course_steps_order ON education.course_steps (course_id, COALESCE(parent_step_id, '00000000-0000-0000-0000-000000000000'::uuid), order_index);
```

---

## 4. Student Progression

### 4.1. `enrollments`
```sql
CREATE TABLE education.enrollments (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES education.courses(id) ON DELETE CASCADE,
    
    -- Cross-Domain Reference to Identity Schema
    user_id uuid NOT NULL,
    
    status education.enrollment_status_enum DEFAULT 'ACTIVE'::education.enrollment_status_enum,
    
    started_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at timestamp(3) without time zone,
    
    -- Ensure a user can only have one active enrollment per course
    CONSTRAINT uq_enrollment_user_course UNIQUE (user_id, course_id)
);
```

### 4.2. `step_progress`
```sql
CREATE TABLE education.step_progress (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    enrollment_id uuid NOT NULL REFERENCES education.enrollments(id) ON DELETE CASCADE,
    step_id uuid NOT NULL REFERENCES education.course_steps(id) ON DELETE CASCADE,
    
    status education.progress_status_enum DEFAULT 'NOT_STARTED'::education.progress_status_enum,
    
    last_accessed_at timestamp(3) without time zone,
    completed_at timestamp(3) without time zone,
    
    CONSTRAINT uq_step_progress UNIQUE (enrollment_id, step_id)
);
```

---

## 5. Mentorship & Guidance

### 5.1. `guidance_assignments`
```sql
CREATE TABLE education.guidance_assignments (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    
    -- Cross-Domain References to Identity Schema
    guide_user_id uuid NOT NULL,
    student_user_id uuid NOT NULL,
    
    assignment_type education.assignment_type_enum NOT NULL,
    subject text,
    status education.guidance_status_enum DEFAULT 'ACTIVE'::education.guidance_status_enum,
    
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

### 5.2. `guidance_sessions`
```sql
CREATE TABLE education.guidance_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    assignment_id uuid NOT NULL REFERENCES education.guidance_assignments(id) ON DELETE CASCADE,
    
    topic text,
    summary_notes text,
    session_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Summary of Key Decisions

*   **Scalable Recursion:** The `course_steps` table implements an Adjacency List model (`parent_step_id`) ensuring courses can be nested infinitely (e.g., Course -> Part -> Module -> Lesson -> Topic) without needing altering database tables.
*   **Decoupled Progression Model:** Separating `enrollments` from `step_progress` vastly improves read performance. A user's dashboard can quickly load `enrollments` without needing to scan through 50 rows of individual `step_progress` entries.
*   **Virtual Dependencies:** Just like in previous domains, `content_node_id` (pointing to `knowledge.nodes`) and `user_id` (pointing to `identity.users`) are standard `uuid` columns. There are no hard PostgreSQL foreign key constraints spanning across schemas. The application layer (Prisma ORM) will resolve these joins virtually, guaranteeing that the `education` schema can be migrated or restored entirely independent of `identity` or `knowledge`.
