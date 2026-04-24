🧱 1. CORE TECHNOLOGIES (ARCHITECTURE)
Frontend + Backend Framework:
- Next.js (App Router)          # Fullstack React framework (UI + API)

UI / Styling:
- React                         # Component-based UI
- Tailwind CSS                  # Utility-first styling

Backend Logic:
- Node.js                       # Runtime (via Next.js API routes)

Database:
- MongoDB                       # NoSQL database
- Mongoose                      # ODM for MongoDB

Authentication:
- NextAuth.js (Auth.js)         # Login, session, role-based auth

Deployment:
- Vercel                        # Hosting + serverless + cron jobs

Communication:
- Resend                        # Email sending service
- MSG91                         # SMS service (India-friendly)

PDF Generation:
- pdf-lib                       # Generate 80G receipts

Security:
- bcryptjs                      # Password hashing

HTTP Client:
- axios                         # External API calls (SMS)

Automation:
- Vercel Cron Jobs              # Membership reminders

Environment Management:
- dotenv (.env.local)           # Secrets/config handling
📦 2. NPM DEPENDENCIES (INSTALL LIST)

You can install everything with:

npm install mongoose next-auth bcryptjs resend axios pdf-lib
📚 Detailed Dependency List
mongoose        # MongoDB ORM (schemas, queries)
next-auth       # Authentication system (login/session)
bcryptjs        # Password hashing (secure auth)
resend          # Email sending (transactional emails)
axios           # HTTP client (SMS API calls)
pdf-lib         # PDF generation (80G receipts)
🎨 3. DEV DEPENDENCIES
npm install -D tailwindcss postcss autoprefixer typescript
Explanation
tailwindcss     # Styling framework
postcss         # CSS processing
autoprefixer    # Browser compatibility
typescript      # Type safety
⚙️ 4. NEXT.JS BUILT-IN FEATURES USED
- App Router (app/)             # Modern routing system
- Server Components             # Faster rendering
- API Routes                    # Backend endpoints
- Middleware                    # Route protection
- Server Actions (optional)     # Future enhancement
- Static + Dynamic rendering    # Performance optimization
🔐 5. AUTHENTICATION STACK
NextAuth.js (Auth.js)
│
├── Credentials Provider        # Email + password login
├── JWT Sessions                # Stateless session handling
├── Middleware protection       # Admin/user route control
└── Role-based access           # Admin vs User
🧾 6. PAYMENT / DONATION APPROACH
Manual Payment System:
- UPI QR Code                  # Primary payment method
- Bank Transfer               # Secondary method

(No gateway initially)
- No Razorpay (yet)
- No Stripe

Future Upgrade:
- Razorpay subscriptions      # Auto recurring payments
📡 7. COMMUNICATION STACK
Email:
- Resend API                  # Transactional emails (receipts, confirmation)

SMS:
- MSG91 API                   # India SMS delivery

Trigger Points:
- Donation created
- Membership reminder
- Receipt generated
🧠 8. DATA ARCHITECTURE
Collections:
- users
- donations
- memberships
- receipts
- counters (for receipt numbering)

Relationships:
- User → Donations (1:N)
- User → Membership (1:1)
- Donation → Receipt (1:1)
⏰ 9. AUTOMATION STACK
Vercel Cron Jobs
│
└── /api/cron/membership-reminder
    → Runs daily
    → Checks due memberships
    → Sends SMS + Email reminders
🧾 10. DOCUMENT GENERATION STACK
pdf-lib
│
├── Dynamic PDF creation
├── Text rendering
├── Logo embedding
└── Base64 export (for email/download)
🔐 11. SECURITY STACK
bcryptjs           # Password hashing
JWT (NextAuth)     # Session security
Middleware         # Route protection
.env.local         # Secret management
🌿 FINAL STACK SUMMARY (ONE VIEW)
Frontend:
- Next.js + React + Tailwind

Backend:
- Next.js API Routes (Node.js)

Database:
- MongoDB + Mongoose

Auth:
- NextAuth.js + bcrypt

Communication:
- Resend (Email)
- MSG91 (SMS)

PDF:
- pdf-lib

Deployment:
- Vercel

Automation:
- Vercel Cron Jobs
