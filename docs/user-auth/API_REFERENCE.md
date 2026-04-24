# API Reference: The 12 Pillars of Identity

The system implements 12+ APIs to cover every edge case of authentication and recovery.

## 1. Identity APIs
| Path | Method | Purpose |
| :--- | :--- | :--- |
| `/api/auth/signup` | POST | Creates a new user and sends verification email. |
| `/api/auth/login` | POST | Verifies credentials and sets `vedic_token` and `vedic_refresh` cookies. |
| `/api/auth/logout` | POST | Clears all secure cookies. |
| `/api/auth/me` | GET | Fetches the current seeker's profile using the session cookie. |
| `/api/auth/refresh` | POST | Rotates the refresh token and issues a new access token. |

## 2. Recovery & Verification APIs
| Path | Method | Purpose |
| :--- | :--- | :--- |
| `/api/auth/verify-email/request` | POST | Resends the verification email. |
| `/api/auth/verify-email/confirm` | POST | Validates the token and activates the account. |
| `/api/auth/forgot-password` | POST | Sends a password reset link to the email. |
| `/api/auth/reset-password` | POST | Validates the reset token and updates the password. |

## 3. Gateway Internal APIs (Institutional Layer)
| Path | Method | Purpose |
| :--- | :--- | :--- |
| `/auth/register` | POST | Low-level user creation in Prisma. |
| `/auth/login` | POST | Bcrypt verification and JWT generation. |
| `/auth/me` | GET | Direct profile lookup via Bearer token. |
| `/auth/refresh` | POST | Session rotation in the database. |

---

## 📋 Input/Output Examples

### Signup Request
**Endpoint**: `POST /api/auth/signup`
**Payload**:
```json
{
  "name": "Arjuna",
  "email": "arjuna@vedic.org",
  "password": "SecurePassword108"
}
```
**Success Response (200)**:
```json
{
  "message": "Registration successful. Please verify your email."
}
```
