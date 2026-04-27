I need a comprehensive analysis of all user authentication and user-related components in my current system. This is strictly an audit and mapping task—no changes should be made.

Scope of Analysis

Please identify and list everything related to:

1. Database Layer
All Prisma models related to:
User authentication
User profiles / user data
Sessions, tokens, roles, permissions, etc.
All corresponding PostgreSQL tables:
In the public schema (or any other existing schema)
That are directly or indirectly linked to user authentication and user information
2. Codebase Layer

Identify all files involved in:

Authentication flows:
Login
Signup
Password reset / recovery
Session handling
User data handling:
Profile management
Roles / permissions

Include:

API routes / endpoints
Controllers
Services
Repositories / data access layer
Prisma queries / DB interaction files
Type definitions / interfaces
Middleware (auth guards, JWT handling, etc.)
Important Constraints (Strict)

🚫 Do NOT:

Modify any code
Suggest UI/UX changes
Refactor anything
Change APIs, services, repositories, controllers, or types

✅ Only:

Analyze
Identify
Map dependencies
Expected Output Format

Please provide a structured report with:

Prisma Models
List + short description of each model’s role
Database Tables
Table name + purpose
Relationships (if relevant)
File-Level Mapping
File path → responsibility
Grouped by:
Auth flows
User data handling
Dependency Overview
How these components are interconnected
Key entry points (e.g., login API → service → DB)
Goal
Achieve full visibility of all user/auth-related components
Prepare for safe refactoring later, without missing any dependencies

===============================



# User Authentication & Identity Mapping Report

This is a comprehensive audit of all user authentication and user-related components within the Vedic Skills Institute monorepo. This report details the database schema, codebase routing, and dependency structures related to identity and access management.

## 1. Database Layer (Prisma Models & PostgreSQL Tables)

### Core User Identity & Authentication Models
These models manage the fundamental identity, credentials, and lifecycle of a user.

*   **`users`**
    *   **Purpose:** The central identity record. Manages core authentication (email, password), system roles, account status, and tokens for password resets and email verification.
    *   **Key Fields:** `id`, `email`, `password`, `roles` (Enum), `status`, `verification_token`, `reset_token`, `failed_login_attempts`.
    *   **Relationships:** Acts as the root node linked to almost every other user-centric table (profiles, logs, transactions, support tickets).
*   **`audit_logs`**
    *   **Purpose:** Tracks actions performed by users within the system for security and compliance.
    *   **Relationships:** Linked to `users` via `performed_by_id`.

### User Profile & Metadata Models
These models store supplementary data about the user beyond core authentication.

*   **`user_profiles`**
    *   **Purpose:** Stores demographic and contact information (Name, Phone, WhatsApp, Avatar, Gender, Address details).
    *   **Relationships:** 1:1 relation with `users` (`user_id`).
*   **`user_preferences`**
    *   **Purpose:** Stores application settings and notification preferences (e.g., SMS, Email, WhatsApp opt-ins).
    *   **Relationships:** 1:1 relation with `users` (`user_id`).
*   **`spiritual_profiles`**
    *   **Purpose:** Context-specific metadata for the user's journey within the institution (Age group, life stage, inner state, spiritual focus, subscription tier).
    *   **Relationships:** 1:1 relation with `users` (`user_id`), N:1 with `subscription_tiers`.
*   **`user_statistics`**
    *   **Purpose:** Tracks gamification and usage metrics (Nodes read, courses completed, contribution points).
    *   **Relationships:** 1:1 relation with `users` (`user_id`).
*   **`user_curve_progress`**
    *   **Purpose:** Tracks a user's progress through educational/spiritual "learning curves".
    *   **Relationships:** N:1 relation with `users` (`user_id`), N:1 with `learning_curves`.

---

## 2. Codebase Layer

### Authentication Flows

**Web Portal Frontend Endpoints (`apps/web-portal/app/api/auth/`)**
These endpoints act as a proxy bridging the Next.js frontend to the backend API Gateway.
*   `login/route.ts`: Forwards login requests to Gateway, sets `vedic_token` and `vedic_refresh` cookies upon success.
*   `register/route.ts`: Forwards registration requests.
*   `refresh/route.ts`: Handles silent token refreshing.
*   `logout/route.ts`: Clears cookies and calls Gateway logout.
*   `me/route.ts`: Retrieves current logged-in user context.
*   `forgot-password/route.ts` & `reset-password/route.ts`: Password recovery flow.
*   `verify-email/request/route.ts`: Email verification flow.

**Backend API Gateway Routes & Services (`apps/api-gateway/`)**
The source of truth for auth business logic.
*   `src/routes/auth.ts`: Exposes Fastify endpoints (`/register`, `/login`, `/refresh`, `/logout`, `/me`, `/forgot-password`, `/reset-password`, `/verify-email`).
*   `src/services/auth.service.ts`: Contains the core business logic (hashing passwords, validating credentials, generating JWTs, interacting with Prisma `users` model).

**Middleware & Protection Layers**
*   **Web Portal Guard:** `apps/web-portal/middleware.ts` 
    *   **Responsibility:** Next.js Edge middleware that acts as the "Dharma Protector". Checks for the `vedic_token` cookie using `jose` (`jwtVerify`), attempts silent refresh if expired, and redirects unauthorized users away from protected routes (`/dashboard`, `/profile`, `/library`).
*   **Web Portal RBAC:** `apps/web-portal/lib/rbac.ts`
    *   **Responsibility:** Enforces role-based access control based on the `UserRole` enum. Contains `checkRole` and `protectAction` utilities.
*   **API Gateway Auth Middleware:** `apps/api-gateway/src/middlewares/auth/auth.middleware.ts`
    *   **Responsibility:** Protects backend endpoints by validating incoming Bearer tokens.
*   **API Gateway RBAC Middleware:** `apps/api-gateway/src/middlewares/authorization/role.middleware.ts`
    *   **Responsibility:** Validates that the decoded user token has the required roles for specific backend actions.

### User Data Handling

*   **Web Portal UI:**
    *   `apps/web-portal/app/profile/*`: Frontend views for managing user data.
    *   `apps/web-portal/app/admin/users/*`: Admin dashboard views for user management.
*   **API Gateway User Endpoints:**
    *   User-specific data updates (profile, preferences) are typically handled in context-specific routes (e.g., `src/routes/system.routes.ts`, `src/routes/institutional.routes.ts`, or via `auth.ts` `/me` endpoint depending on implementation). 

---

## 3. Dependency Overview & Integration Map

### High-Level Interconnection
The architecture follows a decoupled **BFF (Backend-For-Frontend)** proxy pattern for authentication:

1.  **Client Application (Browser):** Submits credentials to Next.js API Routes.
2.  **Next.js BFF (`apps/web-portal/app/api/auth/*`):** Receives credentials, forwards them via HTTP to the internal API Gateway.
3.  **API Gateway Controller (`src/routes/auth.ts`):** Parses and validates the request payload using Zod.
4.  **Auth Service (`src/services/auth.service.ts`):** 
    *   Queries Prisma (`rawDb` / `syncDb`) to check/create the `users` record.
    *   Uses `bcrypt` (or similar) to compare password hashes.
    *   Generates short-lived Access Tokens and long-lived Refresh Tokens.
    *   Triggers side effects (e.g., `IntegrationRegistry.getEmailService()` for welcome/verification emails).
5.  **Next.js BFF:** Receives tokens from Gateway. Removes them from the JSON payload and sets them as `httpOnly` secure cookies (`vedic_token`, `vedic_refresh`). Returns clean user object to Client.
6.  **Subsequent Requests:** Client requests protected pages. `apps/web-portal/middleware.ts` intercepts, reads the cookie, verifies the JWT signature directly, and either allows access, triggers a refresh, or redirects to login.

### Key Points of Coupling (For Future Refactoring)
*   **Cookie Management:** Tightly coupled to Next.js API routes and Middleware. Changing token strategy requires updating Next.js logic.
*   **Token Secret (`JWT_SECRET`):** Shared between `apps/api-gateway` (for signing) and `apps/web-portal` (for verifying in middleware).
*   **Prisma Dependency:** `AuthService` relies directly on the Prisma client structure. If the `users` model changes, the service must be updated.
*   **Roles System:** The `UserRole` enum is heavily relied upon in `apps/web-portal/lib/rbac.ts` and `apps/api-gateway/src/middlewares/authorization/role.middleware.ts`. Any structural changes to permissions must update these guards.
