You are acting as a senior system architect working within this codebase.

Context
This is a monorepo application using:
React / Next.js (frontend)
Node.js (backend APIs)
PostgreSQL (database)
Current state:
All database tables and enums exist in a single public schema
Schema size is large (~4,000 lines)
APIs, business logic, and frontend are already implemented
Data is minimal, but existing logic must remain stable
Refactoring goal:
Move from public schema → domain-driven schemas
Currently focusing on: identity schema
Task

Design a production-grade PostgreSQL identity schema based on the existing system.

Requirements
1. Schema Design

Propose a complete identity schema including:

Tables for:
Users
Authentication credentials (password, OAuth, etc.)
Sessions / tokens
Roles / permissions
User profiles / metadata
For each table:
Purpose
Key fields
Relationships (FKs)
2. Enum Strategy
Identify required enums
Define:
Enum name
Values
Where they should live (schema-level vs table-level usage)
3. Mapping from Existing Schema
Based on current public schema:
Identify which tables belong to identity
Suggest:
Keep / Move / Split / Remove decisions
4. Boundaries
Clearly define:
What belongs in identity
What should NOT be included (even if currently present)
5. Migration Awareness (Design-Level Only)
Ensure design supports:
Smooth migration from public → identity
Minimal disruption to existing APIs and frontend
6. Constraints
Do NOT modify any code
Do NOT refactor APIs
Do NOT generate migration scripts yet

Focus only on:

Schema design
Structure
Clarity
Output Format
Schema overview
Table-by-table definition
Enum definitions
Mapping from current schema
Key design decisions
Goal

Produce a clean, scalable, and migration-safe identity schema design that can be implemented in later phases.