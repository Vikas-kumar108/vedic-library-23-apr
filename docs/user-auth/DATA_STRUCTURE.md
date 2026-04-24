# Data Structure: Schema & Sessions

The system uses **Prisma** to manage data persistence. The schema is designed to support session tracking, email verification, and security auditing.

## 1. The User Model
Stores core identity data and security state.

```prisma
model User {
  id                   String     @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  email                String     @unique
  password             String?    // Hashed with Bcrypt
  emailVerified        Boolean    @default(false) @map("email_verified")
  verificationToken    String?    @map("verification_token")
  
  // Security Hardening
  failedLoginAttempts  Int?       @default(0) @map("failed_login_attempts")
  accountLockedUntil   DateTime?  @map("account_locked_until")
  
  sessions             Session[]
  profile              Profile?
}
```

## 2. The Session Model
Used for **Refresh Token Rotation**. When a user logs in, a session is created. When the access token expires, the refresh token is rotated within this session.

```prisma
model Session {
  id               String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId           String   @map("user_id") @db.Uuid
  refreshTokenHash String   @unique @map("refresh_token_hash") // Hashed
  expiresAt        DateTime @map("expires_at")
  lastActive       DateTime @default(now()) @map("last_active")
  
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## 3. The Audit Log
Tracks sensitive security events for institutional compliance.

```prisma
model AuditLog {
  id            String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  action        String   // e.g., "LOGIN_SUCCESS", "PASSWORD_RESET"
  performedById String   @map("performed_by_id") @db.Uuid
  module        String   // "AUTH"
  timestamp     DateTime @default(now())
}
```

---

## 🔒 Token Security Implementation
- **Access Tokens**: Short-lived (15 min). Signed with HS256.
- **Refresh Tokens**: Long-lived (7 days). Never stored in plaintext (hashed in DB).
- **Rotation**: On every refresh, the old token is invalidated and a new one is issued. This prevents **Replay Attacks**.
