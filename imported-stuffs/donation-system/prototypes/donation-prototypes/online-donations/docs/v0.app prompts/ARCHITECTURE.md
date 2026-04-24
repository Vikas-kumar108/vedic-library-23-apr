vedic-skills/
│
├── app/                                # Next.js App Router (main application)
│   │
│   ├── page.tsx                        # Homepage (landing + donate button)
│   ├── layout.tsx                      # Global layout (navbar, footer, styling)
│
│   ├── donate/
│   │   └── page.tsx                    # Donation page (QR, bank details, confirm)
│
│   ├── login/
│   │   └── page.tsx                    # Login UI (NextAuth credentials login)
│
│   ├── dashboard/
│   │   └── page.tsx                    # User dashboard (donations, receipts, membership)
│
│   ├── transparency/
│   │   └── page.tsx                    # Public transparency page (trust building)
│
│   ├── admin/                          # Admin panel (protected)
│   │   ├── page.tsx                    # Admin dashboard (stats overview)
│   │   ├── donations/
│   │   │   └── page.tsx                # Manage donations (confirm + receipt)
│   │   ├── users/
│   │   │   └── page.tsx                # View all users
│   │   └── memberships/
│   │       └── page.tsx                # Manage memberships
│
│   ├── api/                            # Backend API routes (Node.js logic)
│       │
│       ├── auth/
│       │   ├── [...nextauth]/route.ts  # NextAuth config (login/session/roles)
│       │   └── register/route.ts       # User registration API
│       │
│       ├── donation/
│       │   ├── create/route.ts         # Create donation + send email/SMS
│       │   └── confirm/route.ts        # Admin confirms donation
│       │
│       ├── admin/
│       │   ├── stats/route.ts          # Dashboard stats (total, users, pending)
│       │   ├── donations/route.ts      # Fetch all donations (admin view)
│       │   ├── users/route.ts          # Fetch all users
│       │   └── generate-receipt/route.ts # Generate 80G PDF + email
│       │
│       ├── membership/
│       │   └── create/route.ts         # Create membership (recurring system)
│       │
│       ├── user/
│       │   └── dashboard/route.ts      # Fetch user-specific dashboard data
│       │
│       ├── transparency/
│       │   └── route.ts                # Public donation stats + recent donors
│       │
│       └── cron/
│           └── membership-reminder/route.ts # Cron job (send renewal reminders)
│
│
├── lib/                                # Core utilities (business logic helpers)
│   │
│   ├── mongodb.ts                      # MongoDB connection handler (singleton)
│   ├── email.ts                        # Email sending (Resend integration)
│   ├── sms.ts                          # SMS sending (MSG91 integration)
│   ├── pdf.ts                          # PDF generator (80G receipt design)
│   └── receipt.ts                      # Receipt number generator (unique IDs)
│
│
├── models/                             # Mongoose schemas (database structure)
│   │
│   ├── User.ts                         # User model (auth + donor identity)
│   ├── Donation.ts                     # Donation model (transactions)
│   ├── Membership.ts                   # Membership model (recurring system)
│   ├── Receipt.ts                      # Receipt model (PDF tracking)
│   └── Counter.ts                      # Counter model (sequential receipt numbers)
│
│
├── middleware.ts                       # Route protection (auth + admin roles)
│
├── public/                             # Static assets
│   ├── qr-code.png                     # Donation QR code image
│   ├── logo.png                        # Trust logo (used in receipts + UI)
│   └── favicon.ico                     # Website favicon
│
├── styles/
│   └── globals.css                     # Tailwind global styles
│
├── .env.local                          # Environment variables (secrets)
│   # MONGODB_URI=                      # Database connection
│   # RESEND_API_KEY=                   # Email service
│   # MSG91_API_KEY=                    # SMS service
│   # MSG91_FLOW_ID=                    # SMS template flow
│   # NEXTAUTH_SECRET=                  # Auth security
│   # ADMIN_SECRET=                     # Admin protection (optional legacy)
│
├── package.json                        # Dependencies + scripts
├── tailwind.config.js                  # Tailwind CSS config
├── tsconfig.json                       # TypeScript config
└── next.config.js                      # Next.js config
