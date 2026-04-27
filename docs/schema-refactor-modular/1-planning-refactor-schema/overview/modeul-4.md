Now that we have completed the roadmap and architectural guidance for the first three domains, I want to proceed to the fourth module in the same structured and disciplined manner.

Important Constraint

🚫 Do NOT:

Take any action
Suggest code changes
Begin implementation

✅ Only:

Provide strategic, architectural, and conceptual guidance
Focus Area

👉 Proceed with Module 4: Learning / Education

This includes:

Courses and curriculum structure
Modules, lessons, topics
Learning pathways and progression
Enrollment and participation
Progress tracking and completion
What I Need From You

Please follow the same depth and structure as previous modules:

1. High-Level Roadmap (Conceptual Only)
How should this domain be approached for refactoring?
What is the ideal conceptual sequence of steps?
2. Schema Design Thinking
How should the learning schema be structured?
How to organize:
Courses
Modules
Lessons
Topics
Enrollment and progress
How to handle:
Hierarchies and relationships
Versioning or updates (if needed)
3. Boundaries & Separation
What should strictly belong in this domain?
What should be excluded (even if currently present in public)?
4. Dependencies & Interactions
How this domain interacts with:
Identity (users, roles, access)
Knowledge layer (content sources)
Institution (if applicable)
Direction of dependencies
5. Risks & Design Pitfalls
Common mistakes in designing learning systems
Over-complex hierarchy vs simplicity trade-offs
Progress tracking challenges
Things to avoid
Goal
Maintain consistency across all modules
Build a clear and scalable learning architecture
Ensure strong conceptual clarity before execution

=========================================================================


# Architectural Strategy: Domain 4 - Learning / Education

This document provides architectural guidance and conceptual roadmap planning for transitioning the **Learning / Education** domain into a modular PostgreSQL schema. No code changes will occur until this strategy is approved.

---

## 1. High-Level Roadmap (Conceptual Only)

The Learning domain is the functional bridge between the **Identity** (who is learning) and **Knowledge** (what is being learned). It should be refactored after these two core foundations are solidified.

1.  **Establish the Bridge Policy:** Confirm that the Education layer *references* the Knowledge layer rather than duplicating it. 
2.  **Define Bounded Context:** Isolate curriculum structure and user progress from the raw scriptural data.
3.  **Database-Level Migration:** Create the `academy` (or `learning`) schema. Issue `ALTER TABLE ... SET SCHEMA` for course structures, enrollment records, and mentorship assignments.
4.  **Mentorship Integration:** Ensure the `guidance` sub-domain (mentors/seekers) is correctly nested within the Education schema as it represents the "Human Progress" aspect of the curriculum.
5.  **ORM Mapping:** Tag the learning models with `@@schema("academy")` in Prisma and regenerate the client.

---

## 2. Schema Design Thinking

The Learning schema governs the journey from seeker to scholar. It must be designed as a **Stateful Curriculum Layer** sitting atop the Knowledge Layer.

*   **Curriculum Structure (`learning_curves`, `learning_curve_steps`):** 
    *   `learning_curves` represents the "Course" (e.g., "Gita Fundamentals").
    *   `learning_curve_steps` represents a unified, hierarchical entity for Modules, Lessons, and Topics. Instead of separate tables for each, a parent-child recursive structure (or a sequence-based list) allows for flexible curricula that can be as shallow as 1 level or as deep as 5.
*   **Content Pointers:** Each `learning_curve_step` acts as a "Pointer" or "Reference" to a `knowledge.node_id`. This keeps the educational flow decoupled from the shastra's structural updates.
*   **User Progression (`user_curve_progress`, `spiritual_vows`):**
    *   `user_curve_progress` tracks the specific state (Active, Completed, Percent) of a seeker in a curriculum.
    *   `spiritual_vows` tracks participation commitments, which serve as the qualitative markers of completion in a Vedic context.
*   **Mentorship Engine (`guidance_assignments`, `guidance_sessions`):** Manages the teacher-student relationship specific to the learning context.

---

## 3. Boundaries & Separation

This schema represents the *process* of education. It should not contain the *substance* of the education or the *metadata* of the participants.

### What STRICTLY Belongs Here:
*   `learning_curves`
*   `learning_curve_steps`
*   `user_curve_progress`
*   `spiritual_vows`
*   `guidance_assignments`
*   `guidance_sessions`
*   **Enums:** `guidance_level_enum`, `guidance_status_enum`, `vow_status_enum`.

### What Must Be STRICTLY EXCLUDED:
*   🚫 `nodes` / `texts`: Scriptural content belongs in **Knowledge**. If a lesson needs a verse, it points to the Knowledge ID.
*   🚫 `users` / `spiritual_profiles`: Seeker data belongs in **Identity**. The Education schema only stores the `user_id`.
*   🚫 `file_assets`: Course PDFs or completion certificates belong in **Media/DAM**.
*   🚫 `support_tickets`: Even if they are "academic questions," they belong in the **Communications / Community** schema to preserve a unified interaction ledger.

---

## 4. Dependencies & Interaction

The Learning domain is a **Coordinating Domain**.

*   **Direction of Dependency:** The flow is almost entirely **outbound**.
*   **Outbound Dependencies (Critical):**
    *   **Identity:** Every enrollment and vow points to `identity.users.id`.
    *   **Knowledge:** Every step points to `knowledge.nodes.id`.
*   **Inbound Dependencies:**
    *   **Communications:** The `BroadcastService` may query enrollment states to send specific "lesson reminders."
    *   **Analytics:** Future systems will query progress to calculate platform-wide "seeker engagement."
*   **Direction:** Education depends on *both* Identity and Knowledge.

---

## 5. Risks & Design Pitfalls

When architecting educational systems atop a knowledge graph, avoid these common mistakes:

1.  **Content Replication:** Copying shastra text into `learning_curve_steps` to "save a JOIN." This creates a synchronization nightmare where scriptural corrections are never reflected in the course. Always JOIN to the Knowledge schema.
2.  **Rigid Hierarchy:** Creating a schema that *only* allows "Course -> Module -> Lesson." Vedic learning is often non-linear or deeply recursive. Using a generic `step` table with a `parent_id` is far more scalable.
3.  **Fragile Versioning:** If a `learning_curve_step` is deleted from a course, what happens to a user's "80% Complete" status? Designing for "soft-deletes" or immutable course snapshots is critical for long-term data integrity.
4.  **Ignoring the Mentorship Loop:** Treating "Online Progress" as the only metric. In this system, the `guidance_sessions` are as critical as the automated step-tracking. They must be first-class citizens in the Education schema.

> [!IMPORTANT]  
> **User Review Required:** Do you agree with the recursive "Step" structure and the strict "Reference-only" content policy for the Education Layer? If approved, I will proceed to **Domain 5: Interactions, Communications & Outreach**.


