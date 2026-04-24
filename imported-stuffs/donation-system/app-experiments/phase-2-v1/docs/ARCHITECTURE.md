# VedicSkills Donation System - Architecture Documentation

## Project Structure Overview

```
vedicskills-donation/
├── app/                    # Next.js App Router pages and API routes
│   ├── about/             # About page
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes (backend)
│   ├── auth/              # Auth pages (login, register)
│   ├── dashboard/         # User dashboard
│   ├── donate/            # Donation page
│   ├── membership/        # Membership tiers page
│   ├── transparency/      # Public transparency page
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page (redirects to /donate)
├── components/            # React components
│   ├── providers/         # Context providers
│   ├── ui/                # shadcn/ui components
│   └── *.tsx              # Feature components
├── docs/                  # Documentation files
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and business logic
│   ├── models/            # Mongoose models
│   ├── auth.ts            # NextAuth configuration
│   ├── db.ts              # MongoDB connection
│   ├── email.ts           # Email sending (Resend)
│   ├── pdf.ts             # PDF receipt generation
│   ├── razorpay.ts        # Razorpay integration
│   ├── sms.ts             # SMS sending (MSG91)
│   └── utils.ts           # Utility functions
├── public/                # Static assets
├── scripts/               # Utility scripts
├── types/                 # TypeScript type definitions
└── v0_plans/              # Development planning docs
```

---

## Directory Details

### `/app` - Pages and API Routes

#### Pages (Frontend)

| Path | File | Description |
|------|------|-------------|
| `/` | `page.tsx` | Home - redirects to /donate |
| `/donate` | `donate/page.tsx` | Main donation page with UPI/Bank and Razorpay tabs |
| `/membership` | `membership/page.tsx` | Membership tiers selection |
| `/about` | `about/page.tsx` | Organization information |
| `/transparency` | `transparency/page.tsx` | Public donation transparency |
| `/auth/login` | `auth/login/page.tsx` | User login |
| `/auth/register` | `auth/register/page.tsx` | User registration |
| `/dashboard` | `dashboard/page.tsx` | User's donation history |
| `/dashboard/receipts` | `dashboard/receipts/page.tsx` | Download receipts |
| `/admin` | `admin/page.tsx` | Admin dashboard overview |
| `/admin/donations` | `admin/donations/page.tsx` | Manage donations |
| `/admin/users` | `admin/users/page.tsx` | View users |
| `/admin/analytics` | `admin/analytics/page.tsx` | Charts and reports |

#### API Routes (Backend)

| Endpoint | File | Purpose |
|----------|------|---------|
| `/api/auth/*` | `api/auth/` | NextAuth authentication |
| `/api/auth/register` | `api/auth/register/route.ts` | User registration |
| `/api/donations` | `api/donations/route.ts` | Create/list donations |
| `/api/donations/[id]` | `api/donations/[id]/route.ts` | Get/update single donation |
| `/api/donations/[id]/confirm` | `api/donations/[id]/confirm/route.ts` | Confirm donation (admin) |
| `/api/razorpay/*` | `api/razorpay/` | Razorpay payment integration |
| `/api/memberships` | `api/memberships/route.ts` | Membership CRUD |
| `/api/receipts/[id]` | `api/receipts/[id]/route.ts` | Download receipt PDF |
| `/api/admin/*` | `api/admin/` | Admin-only endpoints |
| `/api/upload` | `api/upload/route.ts` | File upload (screenshots) |
| `/api/file` | `api/file/route.ts` | Serve private files |
| `/api/transparency` | `api/transparency/route.ts` | Public donation stats |
| `/api/test/email` | `api/test/email/route.ts` | Test email sending |
| `/api/debug/status` | `api/debug/status/route.ts` | Check integrations |

---

### `/components` - React Components

#### Feature Components

| Component | File | Description |
|-----------|------|-------------|
| `DonationForm` | `donation-form.tsx` | UPI/Bank transfer donation form |
| `RazorpayCheckout` | `razorpay-checkout.tsx` | Online payment form with Razorpay |
| `PaymentInfoCard` | `payment-info-card.tsx` | UPI QR code and bank details display |
| `ScreenshotUpload` | `screenshot-upload.tsx` | Drag-drop file upload component |
| `SiteHeader` | `site-header.tsx` | Navigation header with user menu |
| `DonationTable` | `donation-table.tsx` | Admin donations list with actions |
| `StatsCards` | `stats-cards.tsx` | Dashboard statistics cards |
| `SessionProvider` | `providers/session-provider.tsx` | NextAuth session context |
| `ThemeProvider` | `theme-provider.tsx` | Dark/light theme context |

#### UI Components (shadcn/ui)

Located in `/components/ui/`, includes: Button, Card, Input, Tabs, Dialog, Dropdown, Table, Checkbox, Toast, etc.

---

### `/lib` - Business Logic

#### Database

| File | Purpose |
|------|---------|
| `db.ts` | MongoDB connection singleton with retry logic |

#### Models (`/lib/models`)

| Model | File | Fields |
|-------|------|--------|
| User | `user.ts` | name, email, password, role, phone, etc. |
| Donation | `donation.ts` | donorName, amount, status, method, etc. |
| Receipt | `receipt.ts` | donationId, receiptNumber, pdfBase64 |
| Membership | `membership.ts` | userId, tier, status, dates |
| Counter | `counter.ts` | For generating sequential receipt numbers |

#### Integrations

| File | Integration | Purpose |
|------|-------------|---------|
| `auth.ts` | NextAuth v5 | User authentication with credentials |
| `email.ts` | Resend | Transactional emails |
| `sms.ts` | MSG91 | SMS notifications |
| `razorpay.ts` | Razorpay | Online payments |
| `pdf.ts` | pdf-lib | 80G receipt PDF generation |

---

### `/types` - TypeScript Definitions

| File | Purpose |
|------|---------|
| `next-auth.d.ts` | Extends NextAuth types for custom user fields (role, canAccessAdmin) |

---

## Data Flow

### Donation Flow (UPI/Bank)

```
User fills form → POST /api/donations
  → Validate data
  → Create donation (status: pending)
  → Send email notification
  → Return success

Admin confirms → POST /api/donations/[id]/confirm
  → Update status to confirmed
  → Generate receipt number
  → Generate PDF
  → Save receipt to DB
  → Send receipt email
  → Return success
```

### Donation Flow (Razorpay)

```
User fills form → POST /api/razorpay/create-order
  → Create donation (status: pending)
  → Create Razorpay order
  → Return order details

User completes payment → Razorpay calls handler
  → POST /api/razorpay/verify-payment
  → Verify signature
  → Update donation (status: confirmed)
  → Generate receipt
  → Send receipt email
  → Return success
```

### Authentication Flow

```
Register → POST /api/auth/register
  → Validate data
  → Hash password
  → Create user
  → Send welcome email
  → Return success

Login → NextAuth credentials provider
  → Find user by email
  → Verify password
  → Create session
  → Return user with role
```

---

## Role-Based Access Control

### Role Hierarchy

| Role | Description | Permissions |
|------|-------------|-------------|
| `donor` | Individual donor | View own donations |
| `auditor` | External auditor | Read-only access to all |
| `csr_partner` | CSR partner | Add CSR donations, view all |
| `ca` | Chartered Accountant | Confirm, export, receipts |
| `director` | Organization director | Full access except user mgmt |
| `super_admin` | Super administrator | Complete system access |

### Access Matrix

| Feature | donor | auditor | csr_partner | ca | director | super_admin |
|---------|-------|---------|-------------|-----|----------|-------------|
| View own donations | Yes | Yes | Yes | Yes | Yes | Yes |
| View all donations | No | Yes | Yes | Yes | Yes | Yes |
| Add donations | Yes | No | Yes | Yes | Yes | Yes |
| Confirm donations | No | No | No | Yes | Yes | Yes |
| Generate receipts | No | No | No | Yes | Yes | Yes |
| Admin panel access | No | Yes | Yes | Yes | Yes | Yes |
| User management | No | No | No | No | No | Yes |

---

## External Integrations

### MongoDB Atlas
- **Purpose:** Primary database
- **Connection:** Via Mongoose ODM
- **Config:** `MONGODB_URI` environment variable

### NextAuth.js v5
- **Purpose:** Authentication
- **Provider:** Credentials (email/password)
- **Session:** JWT-based
- **Config:** `NEXTAUTH_SECRET` environment variable

### Resend
- **Purpose:** Transactional emails
- **Emails sent:** Welcome, donation acknowledgment, receipt
- **Config:** `RESEND_API_KEY` environment variable
- **Fallback:** Logs to console if not configured

### Razorpay
- **Purpose:** Online payments
- **Features:** UPI, Cards, NetBanking, Wallets
- **Config:** `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- **Fallback:** Mock mode for testing

### MSG91
- **Purpose:** SMS notifications
- **Config:** `MSG91_AUTH_KEY`, `MSG91_SENDER_ID`, `MSG91_TEMPLATE_ID`
- **Fallback:** Logs to console if not configured

### Vercel Blob
- **Purpose:** File storage (screenshots)
- **Access:** Private (authenticated serving)
- **Config:** `BLOB_READ_WRITE_TOKEN`

---

## Security Measures

1. **Password Hashing:** bcryptjs with salt rounds
2. **Session Security:** HTTP-only cookies, JWT
3. **Input Validation:** Zod schemas on all APIs
4. **Role Checks:** Middleware on protected routes
5. **PAN Storage:** Uppercase normalization
6. **File Uploads:** Private blob storage

---

## Error Handling

- API routes return consistent JSON errors
- Frontend uses toast notifications (Sonner)
- Database errors logged server-side
- Graceful fallbacks for missing integrations
