# Build Fixes Log

This document records all build errors encountered during Vercel deployment and their fixes.

---

## Build Error #1: authOptions Export Not Found

**Date**: Phase 2 Deployment

**Error Message**:
```
Export authOptions doesn't exist in target module
import { authOptions } from '@/lib/auth'
The export authOptions was not found in module [project]/lib/auth.ts
Did you mean to import auth?
```

**Affected Files**:
- `app/api/upload/route.ts`
- `app/api/file/route.ts`
- `app/api/memberships/route.ts`

**Root Cause**:
NextAuth v5 uses a different export pattern than v4. In v5, the auth configuration exports `auth` directly instead of `authOptions`. The pattern changes from:
```typescript
// NextAuth v4 (OLD)
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
const session = await getServerSession(authOptions)

// NextAuth v5 (NEW)
import { auth } from '@/lib/auth'
const session = await auth()
```

**Fix Applied**:
Updated all three files to use the NextAuth v5 pattern:
1. Changed import from `import { authOptions } from '@/lib/auth'` to `import { auth } from '@/lib/auth'`
2. Changed session call from `await getServerSession(authOptions)` to `await auth()`
3. Removed unused `import { getServerSession } from 'next-auth'`

---

## Build Error #2: connectDB vs connectToDatabase

**Date**: Phase 2 Deployment

**Error Message**:
```
Export connectDB doesn't exist in target module
```

**Affected Files**:
- `app/api/memberships/route.ts`

**Root Cause**:
The database connection function is exported as `connectToDatabase` not `connectDB`.

**Fix Applied**:
Changed import to use alias:
```typescript
import { connectToDatabase as connectDB } from '@/lib/db'
```

---

## Build Error #3: Email Function Name Mismatch

**Date**: Phase 2 Deployment

**Error Message**:
```
Export sendDonationConfirmationEmail doesn't exist in target module
```

**Affected Files**:
- `app/api/memberships/route.ts`

**Root Cause**:
The email function is named `sendDonationCreatedEmail` not `sendDonationConfirmationEmail`.

**Fix Applied**:
1. Changed import to `import { sendDonationCreatedEmail } from '@/lib/email'`
2. Updated function call parameters to match the expected interface

---

## Build Error #4: Unnecessary Package Dependencies

**Date**: Phase 2 Deployment

**Issue**:
The `crypto` package was listed in dependencies, but Node.js has this built-in. This can cause conflicts.

**Affected Files**:
- `package.json`

**Fix Applied**:
1. Removed `"crypto": "^1.0.1"` from dependencies
2. Moved `@types/bcryptjs` from dependencies to devDependencies

---

## Build Error #5: generateReceipt Function Name

**Date**: Phase 2 Deployment (Second Attempt)

**Error Message**:
```
Export generateReceipt doesn't exist in target module
import { generateReceipt } from "@/lib/pdf"
Did you mean to import generateReceiptPDF?
```

**Affected Files**:
- `app/api/razorpay/verify-payment/route.ts`

**Root Cause**:
The PDF generation function is exported as `generateReceiptPDF` not `generateReceipt`.

**Fix Applied**:
1. Changed import to `import { generateReceiptPDF } from "@/lib/pdf"`
2. Updated function call and parameters to match the expected interface

---

## Prevention Guidelines

To avoid similar issues in future:

1. **Use consistent imports**: Always check the actual export names in source files
2. **Follow NextAuth v5 patterns**: Use `auth()` directly, not `getServerSession(authOptions)`
3. **Don't add Node.js built-in packages**: `crypto`, `fs`, `path` etc. are built-in
4. **Type definitions in devDependencies**: `@types/*` packages should be in devDependencies

---

## Verification

After applying fixes, run:
```bash
pnpm build
```

All routes should compile without errors.
