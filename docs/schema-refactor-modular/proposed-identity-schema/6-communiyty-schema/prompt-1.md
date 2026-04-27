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
Current focus: Community Domain (community)
Scope of Community Domain

This domain includes:

Communities / groups / circles
Membership and roles within communities
Discussions (threads, posts, comments, replies)
User-generated content and participation
Moderation systems (flags, reports, approvals)
Community engagement (likes, reactions, follows, subscriptions)
Task

Design a production-grade PostgreSQL community schema.

Requirements
1. Schema Design
Define all tables with:
Clear responsibilities
Proper normalization
Logical grouping (communities, memberships, discussions, moderation, engagement)
Ensure:
Support for scalable discussions (threaded or hierarchical)
Flexible membership models (roles, permissions per community)
Extensibility for future features (subscriptions, events, etc.)
2. Enum Strategy
Define all required enums, such as:
Membership roles
Post types
Moderation status
Reaction types
Specify:
Enum values
Where and how they are used
3. Relationships
Define:
Communities ↔ members
Threads ↔ posts ↔ comments (hierarchical)
Moderation entities ↔ content
Reactions ↔ users ↔ content
Include foreign keys and constraints
4. Mapping from Existing Schema
Based on current public schema:
Identify relevant tables
Suggest:
Move / Split / Merge / Remove
5. Boundaries
Clearly define:
What belongs in community
What should NOT be included (e.g., direct messaging, authentication, learning systems)
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

Produce a clean, scalable, and migration-safe community schema that supports:

Community building and participation
Discussion systems
Moderation and engagement