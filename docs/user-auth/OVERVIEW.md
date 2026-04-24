# User Authentication: The Identity Vault

This document provides a high-level overview of the **Institutional Identity System** built for the Vedic Operating System. We have moved from a simple client-side storage model to a secure, professional, **Cookie-Based DIY Authentication** architecture.

## 🏛️ Architectural Philosophy: "One Responsibility per File"

To ensure maintainability and security, the system follows a strict separation of concerns:

| Layer | Responsibility | Primary File |
| :--- | :--- | :--- |
| **Identity Service** | Core business logic, password hashing, and token generation. | `apps/api-gateway/src/services/auth.service.ts` |
| **API Transport** | Defining endpoints, input validation (Zod), and HTTP responses. | `apps/api-gateway/src/routes/auth.ts` |
| **Dharma Protector** | Global route guarding and JWT signature verification at the edge. | `apps/web-portal/middleware.ts` |
| **Session Orchestrator** | Managing internal API proxies and secure httpOnly cookies. | `apps/web-portal/app/api/auth/*` |
| **Seeker Interface** | High-fidelity UI forms and visual feedback for the user. | `apps/web-portal/features/auth/components/*` |
| **Identity Hook** | Single source of truth for frontend state and auth actions. | `apps/web-portal/features/auth/hooks/useAuth.ts` |

## 🔄 The Authentication Flow

### 1. The Initiation (Signup)
- Seeker enters details in the **Signup Form**.
- Frontend proxies to `/api/auth/register` -> Gateway `/auth/register`.
- Seeker is redirected to the **Verification Sanctuary** (`/auth/verify-email`).
- An email is sent via **Resend** with a secure token.

### 2. The Recognition (Login)
- Seeker enters credentials in the **Login Form**.
- Gateway verifies identity and creates a **DB-backed Session**.
- Gateway returns a **Short-lived Access Token (15m)** and a **Long-lived Refresh Token (7d)**.
- Web Portal sets these as **httpOnly, Secure Cookies**.

### 3. The Protection (Middleware)
- On every request to `/dashboard` or `/profile`, the **Dharma Protector** verifies the JWT signature.
- If the access token is expired but a refresh token exists, the middleware performs a **Silent Refresh Rotation** to extend the session without interruption.

### 4. The Restoration (Recovery)
- If a password is forgotten, a secure, time-limited token (15m) is sent to the seeker's email.
- The seeker restores their path via the **Reset Password** page.

---

*Continue reading:*
- [Backend Implementation](BACKEND_VAULT.md)
- [Frontend Architecture](FRONTEND_SANCTUARY.md)
- [API Reference Catalog](API_REFERENCE.md)
