# VedicSkills - Complete File Reference

## Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `next.config.mjs` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.mjs` | PostCSS configuration |

---

## `/app` - Pages & API Routes

### Public Pages

| File | URL | Purpose |
|------|-----|---------|
| `page.tsx` | `/` | Home - redirects to /donate |
| `donate/page.tsx` | `/donate` | Main donation page with payment tabs |
| `membership/page.tsx` | `/membership` | Membership tier selection |
| `about/page.tsx` | `/about` | Organization information |
| `transparency/page.tsx` | `/transparency` | Public donation statistics |

### Auth Pages

| File | URL | Purpose |
|------|-----|---------|
| `auth/login/page.tsx` | `/auth/login` | User login form |
| `auth/register/page.tsx` | `/auth/register` | User registration form |
| `auth/error/page.tsx` | `/auth/error` | Auth error display |

### User Dashboard

| File | URL | Purpose |
|------|-----|---------|
| `dashboard/page.tsx` | `/dashboard` | User's donation history |
| `dashboard/layout.tsx` | - | Protected layout wrapper |
| `dashboard/receipts/page.tsx` | `/dashboard/receipts` | Download receipts |

### Admin Dashboard

| File | URL | Purpose |
|------|-----|---------|
| `admin/page.tsx` | `/admin` | Admin overview with stats |
| `admin/layout.tsx` | - | Admin layout with sidebar |
| `admin/donations/page.tsx` | `/admin/donations` | Manage donations |
| `admin/users/page.tsx` | `/admin/users` | View users |
| `admin/analytics/page.tsx` | `/admin/analytics` | Charts and reports |

### API Routes - Authentication

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `api/auth/[...nextauth]/route.ts` | `/api/auth/*` | Various | NextAuth handlers |
| `api/auth/register/route.ts` | `/api/auth/register` | POST | User registration |

### API Routes - Donations

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `api/donations/route.ts` | `/api/donations` | GET | List donations |
| `api/donations/route.ts` | `/api/donations` | POST | Create donation |
| `api/donations/[id]/route.ts` | `/api/donations/:id` | GET | Get single donation |
| `api/donations/[id]/confirm/route.ts` | `/api/donations/:id/confirm` | POST | Confirm donation |

### API Routes - Razorpay

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `api/razorpay/create-order/route.ts` | `/api/razorpay/create-order` | POST | Create payment order |
| `api/razorpay/verify-payment/route.ts` | `/api/razorpay/verify-payment` | POST | Verify payment |
| `api/razorpay/webhook/route.ts` | `/api/razorpay/webhook` | POST | Razorpay webhooks |

### API Routes - Admin

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `api/admin/seed/route.ts` | `/api/admin/seed` | POST | Create admin user |
| `api/admin/stats/route.ts` | `/api/admin/stats` | GET | Dashboard statistics |
| `api/admin/analytics/route.ts` | `/api/admin/analytics` | GET | Analytics data |
| `api/admin/generate-receipt/route.ts` | `/api/admin/generate-receipt` | POST | Manual receipt |

### API Routes - Other

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `api/memberships/route.ts` | `/api/memberships` | GET/POST | Membership CRUD |
| `api/receipts/[id]/route.ts` | `/api/receipts/:id` | GET | Download receipt PDF |
| `api/users/route.ts` | `/api/users` | GET | List users (admin) |
| `api/upload/route.ts` | `/api/upload` | POST | File upload |
| `api/file/route.ts` | `/api/file` | GET | Serve private files |
| `api/transparency/route.ts` | `/api/transparency` | GET | Public stats |
| `api/test/email/route.ts` | `/api/test/email` | POST | Test email sending |
| `api/debug/status/route.ts` | `/api/debug/status` | GET | Check integrations |

### Layout Files

| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout with providers, fonts, metadata |
| `globals.css` | Global styles, Vedic theme colors |

---

## `/components` - React Components

### Feature Components

| File | Purpose | Used In |
|------|---------|---------|
| `donation-form.tsx` | UPI/Bank transfer form | `/donate` |
| `razorpay-checkout.tsx` | Online payment form | `/donate` |
| `payment-info-card.tsx` | QR code + bank details | `/donate` |
| `screenshot-upload.tsx` | Drag-drop file upload | `/donate` |
| `site-header.tsx` | Navigation bar | All pages |
| `donation-table.tsx` | Admin donations list | `/admin/donations` |
| `stats-cards.tsx` | Statistics display | Dashboard, Admin |
| `theme-provider.tsx` | Dark/light theme | Root layout |

### Provider Components

| File | Purpose |
|------|---------|
| `providers/session-provider.tsx` | NextAuth session context |

### UI Components (`/components/ui`)

shadcn/ui components - Button, Card, Input, Tabs, Dialog, Table, Checkbox, etc.

---

## `/lib` - Business Logic

### Core Utilities

| File | Purpose | Dependencies |
|------|---------|--------------|
| `db.ts` | MongoDB connection | mongoose |
| `auth.ts` | NextAuth configuration | next-auth, bcryptjs |
| `utils.ts` | Helper functions (cn) | clsx, tailwind-merge |

### Integration Utilities

| File | Purpose | Env Var Required |
|------|---------|------------------|
| `email.ts` | Resend email sending | `RESEND_API_KEY` |
| `sms.ts` | MSG91 SMS sending | `MSG91_AUTH_KEY` |
| `razorpay.ts` | Payment processing | `RAZORPAY_KEY_ID` |
| `pdf.ts` | Receipt PDF generation | None |

### Database Models (`/lib/models`)

| File | Model | Key Fields |
|------|-------|------------|
| `user.ts` | User | name, email, password, role |
| `donation.ts` | Donation | amount, status, method, donorName |
| `receipt.ts` | Receipt | receiptNumber, donationId, pdfBase64 |
| `membership.ts` | Membership | userId, tier, status, dates |
| `counter.ts` | Counter | type, value (for sequential IDs) |
| `index.ts` | - | Re-exports all models |

---

## `/types` - TypeScript Definitions

| File | Purpose |
|------|---------|
| `next-auth.d.ts` | Extends NextAuth User type with role |

---

## `/hooks` - Custom React Hooks

| File | Purpose |
|------|---------|
| `use-mobile.ts` | Detect mobile viewport |
| `use-toast.ts` | Toast notification hook |

---

## `/public` - Static Assets

| Folder/File | Purpose |
|-------------|---------|
| `images/` | Static images |

---

## `/docs` - Documentation

| File | Purpose |
|------|---------|
| `QUICK_START.md` | Step-by-step testing guide |
| `TESTING_GUIDE.md` | Comprehensive test documentation |
| `ARCHITECTURE.md` | System architecture overview |
| `FILE_REFERENCE.md` | This file - all files listed |
| `PHASE_1_COMPLETE.md` | Phase 1 implementation details |
| `PHASE_2_COMPLETE.md` | Phase 2 implementation details |
| `PHASE_3_4_PLAN.md` | Future phase planning |

---

## `/scripts` - Utility Scripts

| File | Purpose | How to Use |
|------|---------|------------|
| `seed-admin.ts` | Create admin user (standalone) | `npx ts-node scripts/seed-admin.ts` |

---

## Data Flow Summary

```
User → /donate → POST /api/donations → MongoDB
                         ↓
                    Send Email
                         ↓
Admin → /admin/donations → POST /api/donations/:id/confirm
                                    ↓
                              Generate PDF
                              Create Receipt
                              Send Email + SMS
```

---

## Integration Points

| Integration | Files | Env Vars |
|-------------|-------|----------|
| MongoDB | `lib/db.ts`, `lib/models/*` | `MONGODB_URI` |
| NextAuth | `lib/auth.ts`, `api/auth/*` | `NEXTAUTH_SECRET` |
| Resend | `lib/email.ts` | `RESEND_API_KEY` |
| MSG91 | `lib/sms.ts` | `MSG91_*` |
| Razorpay | `lib/razorpay.ts`, `api/razorpay/*` | `RAZORPAY_*` |
| Vercel Blob | `api/upload/route.ts` | `BLOB_READ_WRITE_TOKEN` |
