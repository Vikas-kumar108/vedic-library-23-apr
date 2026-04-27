
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
Current focus: Interactions Domain (interactions)
Scope of Interactions Domain

This domain includes:

Messaging systems (user ↔ user, user ↔ system)
Notifications (in-app, email, push, etc.)
Communication workflows
Campaigns and outreach
Leads / contacts / subscribers
Engagement tracking (opens, clicks, responses, etc.)
Task

Design a production-grade PostgreSQL interactions schema.

Requirements
1. Schema Design
Define all tables with:
Clear responsibilities
Proper normalization
Logical grouping (messaging, notifications, campaigns, engagement)
Ensure:
Support for async/event-driven flows
Scalability for high-volume communication
Flexibility for multiple channels (email, push, in-app)
2. Enum Strategy
Define all required enums, such as:
Message type
Notification type and status
Campaign status
Engagement type
Specify:
Enum values
Where and how they are used
3. Relationships
Define:
Conversations ↔ messages
Notifications ↔ users (via identity domain)
Campaigns ↔ recipients ↔ engagement logs
Leads ↔ communication history
Include foreign keys and constraints
4. Mapping from Existing Schema
Based on current public schema:
Identify relevant tables
Suggest:
Move / Split / Merge / Remove
5. Boundaries
Clearly define:
What belongs in interactions
What should NOT be included (e.g., user authentication, core content, learning structures)
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

Produce a clean, scalable, and migration-safe interactions schema that supports:

Communication systems
User engagement
Marketing and outreach workflows