# API_SPEC.md

--------------------------------------------------
1. OVERVIEW
--------------------------------------------------
This document defines all API endpoints used in the system.

Base:
Next.js App Router API (app/api)

--------------------------------------------------
2. AUTH APIs
--------------------------------------------------

POST /api/auth/register

Purpose:
Register a new user

Input:
{
  name,
  email,
  password
}

Output:
{
  success,
  user
}

--------------------------------------------------

POST /api/auth/[...nextauth]

Purpose:
Handle login/session

--------------------------------------------------
3. DONATION APIs
--------------------------------------------------

POST /api/donation/create

Purpose:
Create donation and trigger communication

Input:
{
  name,
  email,
  phone,
  amount
}

Output:
{
  success,
  donation
}

--------------------------------------------------

POST /api/donation/confirm

Purpose:
Admin confirms donation

Input:
{
  donationId
}

Output:
{
  success,
  donation
}

--------------------------------------------------
4. ADMIN APIs
--------------------------------------------------

GET /api/admin/stats

Purpose:
Get dashboard statistics

Output:
{
  totalAmount,
  totalUsers,
  pending
}

--------------------------------------------------

GET /api/admin/donations

Purpose:
Fetch all donations

--------------------------------------------------

GET /api/admin/users

Purpose:
Fetch all users

--------------------------------------------------

POST /api/admin/generate-receipt

Purpose:
Generate 80G receipt

Input:
{
  donationId
}

Output:
{
  success,
  receipt
}

--------------------------------------------------
5. MEMBERSHIP APIs
--------------------------------------------------

POST /api/membership/create

Purpose:
Create membership

Input:
{
  name,
  email,
  phone,
  tier,
  amount
}

Output:
{
  success,
  membership
}

--------------------------------------------------
6. USER APIs
--------------------------------------------------

GET /api/user/dashboard

Purpose:
Fetch user dashboard data

Output:
{
  user,
  donations,
  membership,
  receipts
}

--------------------------------------------------
7. TRANSPARENCY API
--------------------------------------------------

GET /api/transparency

Purpose:
Public donation data

Output:
{
  totalAmount,
  totalDonors,
  thisMonth,
  recent
}

--------------------------------------------------
8. CRON API
--------------------------------------------------

GET /api/cron/membership-reminder

Purpose:
Send membership reminders

--------------------------------------------------
END OF FILE
--------------------------------------------------