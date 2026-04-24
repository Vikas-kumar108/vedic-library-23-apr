PROJECT: VEDIC SKILLS DONATION & MEMBERSHIP SYSTEM

--------------------------------------------------
1. PROJECT OVERVIEW
--------------------------------------------------
This is a full-stack web application built to manage donations,
membership, and donor relationships for a spiritual mission.

The system is not just transactional—it is designed to facilitate
"Seva" (service), with emphasis on trust, transparency, and connection.

--------------------------------------------------
2. CORE PHILOSOPHY
--------------------------------------------------
- Donations are "Seva", not transactions
- UX should feel spiritual, warm, and respectful
- System must build long-term trust and relationships
- Transparency and accountability are essential
- Simplicity over complexity (especially for first-time users)

Tone:
- Non-commercial
- Devotional
- Grateful and respectful

--------------------------------------------------
3. TECH STACK
--------------------------------------------------
Frontend + Backend:
- Next.js (App Router)

UI:
- React + Tailwind CSS

Backend Logic:
- Node.js (via Next.js API routes)

Database:
- MongoDB + Mongoose

Authentication:
- NextAuth.js (Credentials + JWT)

Email:
- Resend API

SMS:
- MSG91 (India)

PDF:
- pdf-lib (for 80G receipts)

Deployment:
- Vercel (with Cron Jobs)

--------------------------------------------------
4. CORE FEATURES
--------------------------------------------------

(A) Donation System:
- QR code + bank transfer (manual payments)
- User submits donation confirmation
- Donation stored in database
- Admin confirms donation

(B) Communication:
- Email sent on donation
- SMS sent on donation
- Receipt email sent after confirmation

(C) Admin Dashboard:
- View all donations
- Confirm donations
- Generate receipts
- View users and memberships

(D) Receipt System:
- Generate 80G-compliant PDF
- Sequential receipt numbering
- Attach PDF in email

(E) Membership System:
- Monthly contribution tiers:
  - Sevak (₹100)
  - Yajman (₹500)
  - Patron (₹1000)
- Recurring via reminder (manual system)
- Cron job sends reminders

(F) Transparency Page:
- Public display of total donations
- Monthly summary
- Recent contributions (with privacy option)

(G) User Dashboard:
- View donation history
- Download receipts
- View membership status
- See total contribution

(H) Authentication:
- User registration/login
- Role-based access (admin/user)
- Protected routes

--------------------------------------------------
5. DATABASE STRUCTURE
--------------------------------------------------

Collections:
- users
- donations
- memberships
- receipts
- counters (for receipt numbers)

Relationships:
- User → Donations (1:N)
- User → Membership (1:1)
- Donation → Receipt (1:1)

--------------------------------------------------
6. USER EXPERIENCE FLOW
--------------------------------------------------

Landing Page →
Donate Button →
Donation Page →
Payment (QR/Bank) →
"I Have Donated" →
Thank You Screen →
Email/SMS →
User Dashboard (optional)

--------------------------------------------------
7. UX DESIGN PRINCIPLES
--------------------------------------------------

- Minimal steps to donate
- Mobile-first design
- Clear call-to-action
- Emotional reinforcement after donation
- No forced login before donation
- Respect user privacy (anonymous option)

Language:
- Use "Seva", "Contribution"
- Avoid "transaction", "payment"

--------------------------------------------------
8. ADMIN EXPERIENCE
--------------------------------------------------

- Simple dashboard with stats
- Fast actions (confirm, generate receipt)
- No unnecessary complexity
- Clear tables and controls

--------------------------------------------------
9. SECURITY & TRUST
--------------------------------------------------

- Password hashing (bcrypt)
- JWT sessions (NextAuth)
- Middleware route protection
- Environment variables for secrets

Trust Indicators:
- 80G eligibility
- Receipt generation
- Transparency page

--------------------------------------------------
10. AUTOMATION
--------------------------------------------------

- Cron job checks memberships daily
- Sends reminders via email + SMS
- Updates membership cycle manually upon payment

--------------------------------------------------
11. FUTURE EXTENSIONS
--------------------------------------------------

- Razorpay subscription integration (auto recurring)
- OTP login (India-friendly)
- Cloud storage for PDFs (S3)
- Mobile app (React Native / PWA)
- AI-based donor engagement
- Public verification of receipts

--------------------------------------------------
12. DESIGN DIRECTION
--------------------------------------------------

Visual:
- Clean, minimal
- Soft spiritual tone
- Avoid corporate feel

UX:
- One-column layout (mobile-first)
- Large buttons
- Clear hierarchy

Emotional Flow:
- Intention → Ease → Gratitude → Connection

--------------------------------------------------
13. FINAL OBJECTIVE
--------------------------------------------------

To build a complete digital infrastructure that:
- Enables donations
- Builds trust
- Maintains transparency
- Supports long-term community relationships
- Scales into a full spiritual institution system

--------------------------------------------------
END OF PROMPT
--------------------------------------------------
