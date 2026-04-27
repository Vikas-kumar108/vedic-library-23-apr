Based on the same approach used for "Production-Grade Schema Design: Identity Domain (identity)", design the complete PostgreSQL schema for the Knowledge Domain (knowledge).

Context
This is part of a monorepo application with:
React / Next.js (frontend)
Node.js (backend APIs)
PostgreSQL (database)
Current state:
All tables and enums are inside a single public schema (~4,000 lines)
APIs, business logic, and frontend are already implemented
Data is minimal, but existing logic must remain stable
Refactoring goal:
Move from public → domain-driven schemas
Current focus: Knowledge / Library layer
Scope of Knowledge Domain

Include all structures related to:

Scriptural and textual content
e.g., works like Bhagavad Gita and similar texts
Text hierarchy:
Text → Book → Chapter → Section → Verse (or equivalent structures)
Commentaries / annotations
Translations / multiple versions
Metadata (authors, sources, classifications, tags)
Indexing / referencing
Task

Design a production-grade PostgreSQL knowledge schema.

Requirements
1. Schema Design
Define all tables with:
Clear responsibilities
Proper normalization
Scalable structure
Cover:
Core text hierarchy
Content storage
Commentary / annotation systems
Metadata and classification
2. Enum Strategy
Define all required enums:
Content types
Language types
Source types
Annotation types, etc.
Specify:
Enum values
Usage across tables
3. Relationships
Define:
Parent-child hierarchies
Cross-references
Foreign key relationships
4. Mapping from Existing Schema
Based on current public schema:
Identify relevant tables
Suggest:
Move / Split / Merge / Remove
5. Boundaries
Clearly define:
What belongs in knowledge
What should NOT be included (e.g., learning progress, user data)
6. Migration Awareness (Design-Level Only)
Ensure schema supports:
Smooth migration from public
Minimal disruption to existing APIs and frontend
Constraints
Do NOT modify any code
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

Produce a clean, scalable, and migration-safe knowledge schema that can serve as the foundation for all scriptural and textual content systems.