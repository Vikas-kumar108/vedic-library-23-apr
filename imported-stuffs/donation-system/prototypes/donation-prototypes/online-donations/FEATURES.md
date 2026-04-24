# FEATURES.md

--------------------------------------------------
1. OVERVIEW
--------------------------------------------------
This document defines all core features of the Vedic Skills Donation & Membership System.

Each feature includes:
- Purpose
- Flow
- Key components

--------------------------------------------------
2. DONATION SYSTEM
--------------------------------------------------

Purpose:
Allow users to contribute via UPI QR or bank transfer.

Flow:
Landing Page →
Donate Page →
User scans QR / transfers →
Clicks "I Have Donated" →
Data stored in DB →
Admin confirms donation

Key Components:
- QR Code display
- Bank details
- Donation form (name, email, phone)
- Donation API
- Donation database

--------------------------------------------------
3. EMAIL & SMS COMMUNICATION
--------------------------------------------------

Purpose:
Instantly acknowledge donor contribution and build trust.

Flow:
Donation created →
Trigger email + SMS →
User receives confirmation

Key Components:
- Email (Resend)
- SMS (MSG91)
- Templates (thank you, receipt)

--------------------------------------------------
4. ADMIN DASHBOARD
--------------------------------------------------

Purpose:
Allow administrators to manage the system efficiently.

Features:
- View donations
- Confirm donations
- Generate receipts
- View users
- View memberships

Key Components:
- Admin pages (/admin)
- Protected routes
- Admin APIs

--------------------------------------------------
5. RECEIPT SYSTEM (80G)
--------------------------------------------------

Purpose:
Provide legal donation receipts.

Flow:
Admin confirms donation →
Generate receipt number →
Create PDF →
Send email with attachment

Key Components:
- PDF generator (pdf-lib)
- Receipt model
- Email attachment system

--------------------------------------------------
6. MEMBERSHIP SYSTEM
--------------------------------------------------

Purpose:
Enable recurring monthly contributions.

Tiers:
- Sevak (₹100)
- Yajman (₹500)
- Patron (₹1000)

Flow:
User selects tier →
Makes payment →
Membership created →
System tracks next due date →
Cron sends reminders

Key Components:
- Membership model
- Reminder system
- Tier logic

--------------------------------------------------
7. TRANSPARENCY PAGE
--------------------------------------------------

Purpose:
Build public trust through accountability.

Features:
- Total donations
- Monthly summary
- Recent contributions
- Optional anonymity

Key Components:
- Public API
- UI display
- Privacy control

--------------------------------------------------
8. USER DASHBOARD
--------------------------------------------------

Purpose:
Allow users to track their contributions.

Features:
- Donation history
- Total contributions
- Membership status
- Receipt downloads

Key Components:
- Protected route
- User-specific API
- Dashboard UI

--------------------------------------------------
9. AUTHENTICATION SYSTEM
--------------------------------------------------

Purpose:
Secure access for users and admins.

Features:
- Registration
- Login (email + password)
- Role-based access

Key Components:
- NextAuth.js
- JWT sessions
- Middleware protection

--------------------------------------------------
10. AUTOMATION SYSTEM
--------------------------------------------------

Purpose:
Handle recurring membership reminders.

Flow:
Daily cron job →
Check due memberships →
Send email + SMS reminders

Key Components:
- Vercel cron
- Reminder API

--------------------------------------------------
END OF FILE
--------------------------------------------------