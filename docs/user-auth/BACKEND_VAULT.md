# Backend Implementation: The Identity Vault

The backend is built as a robust **API Gateway** using Fastify and Zod. It acts as the "Source of Truth" for all identity and authorization logic.

## 📁 Key Files
1. `apps/api-gateway/src/services/auth.service.ts` (Core Logic)
2. `apps/api-gateway/src/routes/auth.ts` (API Routes)
3. `apps/api-gateway/src/index.ts` (Plugin Registration)

---

## 1. The AuthService (The Brain)
**File Path**: `apps/api-gateway/src/services/auth.service.ts`
**Responsibility**: Identity orchestration, password hashing, token generation, and session rotation.

```typescript
// [Full Code Snippet]
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

const JWT_SECRET = process.env.JWT_SECRET || 'vedic-secret-key-108'

export class AuthService {
  async register(details: any) {
    // 1. Hash Password
    const passwordHash = await bcrypt.hash(details.password, 10)
    // 2. Create User in Prisma
    const user = await this.prisma.user.create({ ... })
    // 3. Send Verification Email via Resend
    await this.sendVerificationEmail(user)
    return user
  }

  async login(email, password) {
    // 1. Find User & Check Lockout
    // 2. Compare Password (bcrypt)
    // 3. Create Session in DB
    // 4. Generate Access Token (15m) & Refresh Token (7d)
    const accessToken = jwt.sign({ userId, roles }, JWT_SECRET, { expiresIn: '15m' })
    const refreshToken = nanoid(64)
    await this.prisma.session.create({ ... })
    return { accessToken, refreshToken, user }
  }

  async refreshToken(token) {
    // 1. Validate Refresh Token against DB
    // 2. Rotate with New Refresh Token (Security)
    // 3. Issue New Access Token
  }
}
```

## 2. The Auth Routes (The Gates)
**File Path**: `apps/api-gateway/src/routes/auth.ts`
**Responsibility**: Defining endpoints and validating inputs using Zod.

```typescript
// [Full Code Snippet]
export default async function authRoutes(fastify) {
  fastify.post('/login', async (req, res) => {
    // Zod validation here
    const result = await authService.login(req.body)
    return res.send(result)
  })

  fastify.post('/refresh', async (req, res) => {
    const result = await authService.refreshToken(req.body.token)
    return res.send(result)
  })
}
```

## 🛡️ Security Hardening
- **Password Hashing**: Using `bcryptjs` with 10 salt rounds.
- **Account Lockout**: Automatically locks for 30 minutes after 5 failed attempts.
- **Audit Logging**: Every sensitive action creates an `AuditLog` entry in the database.
- **Rate Limiting**: Global throttle of 100 requests per minute via `@fastify/rate-limit`.
