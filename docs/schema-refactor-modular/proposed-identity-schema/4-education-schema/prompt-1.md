You are acting as a senior system architect working within this codebase.

Context
This is a monorepo application using:
React / Next.js (frontend)
Node.js (backend APIs)
PostgreSQL (database)
Current state:
Entire database exists in a single public schema (~4,000 lines)
APIs, business logic, and frontend are already implemented
Data is minimal, but existing logic must remain stable
Refactoring goal:
Move from public → domain-driven schemas
Current focus: Education Domain (education)
Scope of Education Domain

This domain includes:

Courses and curriculum structure
Modules, lessons, topics
Learning pathways and sequencing
Enrollment and participation
Progress tracking and completion
Assessments (if applicable: quizzes, evaluations)
Task

Design a production-grade PostgreSQL education schema.

Requirements
1. Schema Design
Define all tables with:
Clear responsibilities
Proper normalization
Logical hierarchy (course → module → lesson → topic)
Ensure:
Flexibility for different course structures
Support for progression tracking
Extensibility for future features (assessments, certifications)
2. Enum Strategy
Define all required enums, such as:
Course status (draft, published, archived)
Enrollment status
Progress status
Content type (video, text, quiz, etc.)
Specify:
Enum values
Where and how they are used
3. Relationships
Define:
Course hierarchy relationships
User ↔ enrollment ↔ progress (via identity domain)
Links to knowledge/content domain (if applicable)
Include foreign keys and constraints
4. Mapping from Existing Schema
Based on current public schema:
Identify relevant tables
Suggest:
Move / Split / Merge / Remove
5. Boundaries
Clearly define:
What belongs in education
What should NOT be included (e.g., raw knowledge texts, user authentication)
6. Migration Awareness (Design-Level Only)
Ensure the design supports:
Smooth migration from public
Minimal disruption to existing APIs and frontend
Constraints
Do NOT modify application code
Do NOT generate migration scripts
Do NOT refactor APIs

Focus only on:

Schema design
Structure
Clarity
Output Format

Provide:

Schema Overview
Table-by-Table Definitions
Enum Definitions
Relationship Mapping
Mapping from Current Schema
Key Design Decisions
Goal

Produce a clean, scalable, and migration-safe education schema that supports:

Structured learning systems
User progression and engagement
Future extensibility