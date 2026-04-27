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
Current focus: Institution Domain (institution)
Scope of Institution Domain

This domain includes:

Organization
Entities, hierarchy, departments, roles (organizational, not user auth)
Finance
Accounts, ledgers, transactions
Donations
Contributions, donor records, receipts
Grants
Partnerships, funding sources, allocations
Compliances
Legal records, audits, regulatory tracking
Task

Design a production-grade PostgreSQL institution schema.

Requirements
1. Schema Design
Define all tables with:
Clear responsibilities
Proper normalization
Logical grouping (organization, finance, donations, grants, compliance)
Ensure:
Clean separation between subdomains
Ability to scale independently
2. Enum Strategy
Define all required enums, such as:
Transaction types
Donation types
Grant statuses
Compliance statuses
Specify:
Enum values
Where and how they are used
3. Relationships
Define:
Financial relationships (accounts ↔ transactions)
Donation ↔ donor ↔ receipts
Grants ↔ funding sources
Compliance ↔ audits ↔ records
Include foreign keys and constraints
4. Mapping from Existing Schema
Based on current public schema:
Identify relevant tables
Suggest:
Move / Split / Merge / Remove
5. Boundaries
Clearly define:
What belongs in institution
What should NOT be included (e.g., user authentication, learning content)
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

Produce a clean, scalable, and migration-safe institution schema that supports:

Organizational structure
Financial systems
Donations and grants
Compliance and audit tracking