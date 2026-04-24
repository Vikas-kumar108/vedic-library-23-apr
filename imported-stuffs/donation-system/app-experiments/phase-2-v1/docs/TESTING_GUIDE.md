# VedicSkills Donation System - Complete Testing Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Feature Testing](#feature-testing)
4. [API Reference](#api-reference)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Environment Variables
| Variable | Required | Description | Test Without |
|----------|----------|-------------|--------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string | No - System won't start |
| `NEXTAUTH_SECRET` | Yes | Auth session secret (any random string) | No - Auth won't work |
| `RESEND_API_KEY` | Optional | Resend email API key | Yes - Emails logged to console |
| `RAZORPAY_KEY_ID` | Optional | Razorpay Key ID | Yes - Mock payments enabled |
| `RAZORPAY_KEY_SECRET` | Optional | Razorpay Key Secret | Yes - Mock payments enabled |
| `MSG91_AUTH_KEY` | Optional | MSG91 SMS auth key | Yes - SMS logged to console |
| `BLOB_READ_WRITE_TOKEN` | Optional | Vercel Blob token | Yes - Screenshots won't upload |

---

## Feature Testing

### 1. Create Admin User (FIRST STEP)

**Why:** You need an admin user to access the admin panel and confirm donations.

**API Call:**
```bash
curl -X POST http://localhost:3000/api/admin/seed
```

**Response:**
```json
{
  "message": "Admin user created successfully",
  "user": {
    "email": "admin@vedicskills.org",
    "role": "super_admin"
  },
  "credentials": {
    "email": "admin@vedicskills.org",
    "password": "admin123"
  }
}
```

**What it does:** Creates a super_admin user you can use to:
- Access admin panel at `/admin`
- Confirm donations
- View all donations
- Manage users

---

### 2. User Registration

**URL:** http://localhost:3000/auth/register

**Test Steps:**
1. Go to registration page
2. Fill in: Name, Email, Password (min 6 chars)
3. Click "Create Account"

**Expected Result:**
- Success message appears
- Redirect to login page
- User created in database with role "donor"

**If Email is Configured (RESEND_API_KEY set):**
- Welcome email sent to user

**If Email NOT Configured:**
- Console shows: `[Email] Resend not configured. Would send welcome email to: user@email.com`

---

### 3. User Login

**URL:** http://localhost:3000/auth/login

**Test Steps:**
1. Enter email and password
2. Click "Sign In"

**Admin Login:**
- Email: `admin@vedicskills.org`
- Password: `admin123`

**Expected Result:**
- Redirect to dashboard
- User dropdown shows name and role

---

### 4. UPI/Bank Transfer Donation

**URL:** http://localhost:3000/donate

**Test Steps:**
1. Click "UPI / Bank Transfer" tab
2. Make note of UPI ID or Bank details (copy buttons work)
3. Select amount (₹100, ₹500, ₹1000, ₹2100, ₹5000) or enter custom
4. Fill donor details: Name, Email
5. (Optional) Enter Transaction Reference
6. (Optional) Upload payment screenshot
7. (Optional) Check "I need an 80G Tax Exemption Receipt" - expands PAN and Address fields
8. Click "I Have Donated"

**Expected Result:**
- Success message appears
- Donation created with status "pending"
- Email sent (if configured) OR logged to console

---

### 5. Online Payment (Razorpay)

**URL:** http://localhost:3000/donate

**With Razorpay Keys NOT Configured (Test Mode):**
1. Click "Pay Online" tab (default)
2. Select amount
3. Fill details
4. Click "Pay Securely"

**Expected Result (Test Mode):**
- Toast: "Test Mode - Razorpay is not configured"
- Mock payment processed
- Success screen with receipt number
- Donation auto-confirmed in database

**With Razorpay Keys Configured (Production):**
- Razorpay checkout popup opens
- Complete payment using test card: 4111 1111 1111 1111
- Payment verified and donation confirmed

---

### 6. 80G Receipt Checkbox

**Test Steps:**
1. On donation form, check "I need an 80G Tax Exemption Receipt"
2. PAN Number and Address fields should appear
3. Enter valid PAN (format: ABCDE1234F)
4. Enter address
5. Submit donation

**Expected Result:**
- PAN and Address stored with donation
- When admin confirms, 80G receipt generated with these details

---

### 7. Admin Panel Access

**URL:** http://localhost:3000/admin

**Access Requirements:** Must be logged in with one of these roles:
- `super_admin`
- `director`
- `ca`
- `auditor`
- `csr_partner`

**Test Steps:**
1. Login as admin (admin@vedicskills.org / admin123)
2. Click user avatar in top right
3. Click "Admin Panel"

**Admin Panel Sections:**
- **Dashboard** (`/admin`): Overview stats
- **Donations** (`/admin/donations`): List and manage donations
- **Users** (`/admin/users`): View users
- **Analytics** (`/admin/analytics`): Charts and reports

---

### 8. Confirm Donation (Admin)

**URL:** http://localhost:3000/admin/donations

**Test Steps:**
1. Login as admin
2. Go to Admin Panel → Donations
3. Find a "pending" donation
4. Click "Confirm" button

**Expected Result:**
- Donation status changes to "confirmed"
- Receipt number generated (format: VS/202603/00001)
- PDF receipt generated
- Email with receipt sent (if configured)
- SMS sent (if configured)

**Roles that can confirm:** super_admin, director, ca

---

### 9. Email Testing

**Test Email API:**
```bash
curl -X POST http://localhost:3000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{"type": "donation", "email": "your@email.com", "name": "Test User"}'
```

**Available types:**
- `donation` - Donation acknowledgment email
- `receipt` - Receipt confirmation email
- `welcome` - Welcome email

**Expected Result (with RESEND_API_KEY):**
- Email received at specified address

**Expected Result (without RESEND_API_KEY):**
```json
{
  "message": "Email would be sent (no API key configured)",
  "type": "donation",
  "to": "your@email.com"
}
```

---

### 10. Check System Status

**API Call:**
```bash
curl http://localhost:3000/api/debug/status
```

**Response:**
```json
{
  "mongodb": true,
  "resend": true,
  "razorpay": false,
  "msg91": false,
  "blob": true
}
```

Shows which integrations are configured.

---

### 11. Membership Page

**URL:** http://localhost:3000/membership

**Test Steps:**
1. View membership tiers (Patron, Supporter, Benefactor)
2. Click "Choose" on any tier
3. Redirects to donate page with amount pre-selected

---

### 12. Transparency Page

**URL:** http://localhost:3000/transparency

**Shows:**
- Total confirmed donations
- Number of donors
- Recent public donations (where isPublic=true)
- Fund usage breakdown (placeholder data for now)

**Note:** Shows zeros if no confirmed donations exist.

---

### 13. User Dashboard

**URL:** http://localhost:3000/dashboard

**Shows:**
- User's donation history
- Total amount donated
- Download receipts (for confirmed donations)

---

### 14. About Page

**URL:** http://localhost:3000/about

Shows organization information, mission, values, and team.

---

## API Reference

### Authentication APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth endpoints |

### Donation APIs

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/donations` | POST | No | Create donation |
| `/api/donations` | GET | Yes | List donations |
| `/api/donations/[id]` | GET | Yes | Get single donation |
| `/api/donations/[id]/confirm` | POST | Admin | Confirm donation |

### Admin APIs

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/admin/seed` | POST | No | Create admin user |
| `/api/admin/stats` | GET | Admin | Dashboard stats |
| `/api/admin/analytics` | GET | Admin | Analytics data |
| `/api/admin/generate-receipt` | POST | Admin | Generate receipt |

### Razorpay APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/razorpay/create-order` | POST | Create Razorpay order |
| `/api/razorpay/verify-payment` | POST | Verify payment |
| `/api/razorpay/webhook` | POST | Razorpay webhooks |

### Utility APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload screenshot |
| `/api/file` | GET | Serve uploaded file |
| `/api/test/email` | POST | Test email sending |
| `/api/debug/status` | GET | Check integrations |
| `/api/transparency` | GET | Public donation stats |

---

## User Roles

| Role | Access Level |
|------|-------------|
| `donor` | Own donations only |
| `auditor` | Read-only access to all data |
| `csr_partner` | Add CSR donations, view all |
| `ca` | Confirm donations, export, receipts |
| `director` | Full access except user management |
| `super_admin` | Complete system access |

---

## Troubleshooting

### "Unexpected token '<'" Error
- **Cause:** API returning HTML error page instead of JSON
- **Fix:** Check MONGODB_URI is set correctly

### Registration Failed
- **Check:** MongoDB connection (MONGODB_URI)
- **Check:** Network connectivity to MongoDB Atlas
- **Test:** `curl http://localhost:3000/api/debug/status`

### Emails Not Sending
- **Without RESEND_API_KEY:** Check console for log messages
- **With RESEND_API_KEY:** 
  - Ensure using Resend's test domain OR
  - Verify your domain in Resend dashboard
  - Check Resend dashboard for delivery logs

### Razorpay Not Opening
- **Without keys:** Works in test mode (auto-confirms)
- **With keys:** Check console for errors

### Admin Panel Not Showing
- **Check:** You're logged in
- **Check:** User role is one of: super_admin, director, ca, auditor, csr_partner
- **Fix:** Call `/api/admin/seed` to create super_admin user

### 80G Fields Not Appearing
- **Check:** Click/check the checkbox "I need an 80G Tax Exemption Receipt"
- Fields only show when checkbox is checked

---

## Quick Test Checklist

- [ ] Call `/api/admin/seed` to create admin
- [ ] Call `/api/debug/status` to verify connections
- [ ] Register a new user
- [ ] Login with new user
- [ ] Make a donation (UPI tab)
- [ ] Login as admin
- [ ] Go to Admin Panel
- [ ] Confirm the donation
- [ ] Check user dashboard for receipt
- [ ] Test Razorpay (Pay Online tab)
- [ ] Check transparency page
