# VedicSkills Donation System - Quick Start Guide

## Step 1: Check System Status

```bash
curl http://localhost:3000/api/debug/status
```

**Response shows which integrations are ready:**
```json
{
  "mongodb": true,      // Required - must be true
  "resend": false,      // Optional - emails logged if false
  "razorpay": false,    // Optional - mock mode if false
  "msg91": false,       // Optional - SMS logged if false
  "blob": true          // Optional - uploads fail if false
}
```

---

## Step 2: Create Admin User

```bash
curl -X POST http://localhost:3000/api/admin/seed
```

**Response:**
```json
{
  "message": "Admin user created successfully",
  "credentials": {
    "email": "admin@vedicskills.org",
    "password": "admin123"
  }
}
```

**Important:** Change password after first login!

---

## Step 3: Test User Registration

1. Go to: http://localhost:3000/auth/register
2. Fill in: Name, Email, Password (min 6 characters)
3. Click "Create Account"

**Expected:** Success message, redirect to login

---

## Step 4: Test User Login

1. Go to: http://localhost:3000/auth/login
2. Enter email and password
3. Click "Sign In"

**Expected:** Redirect to dashboard

---

## Step 5: Test Donation (UPI/Bank)

1. Go to: http://localhost:3000/donate
2. Click "UPI / Bank Transfer" tab
3. Select amount (e.g., ₹500)
4. Fill: Name, Email
5. Optional: Check "80G Receipt" → Enter PAN (ABCDE1234F format)
6. Click "I Have Donated"

**Expected:** Success message, donation created as "pending"

---

## Step 6: Test Donation (Online/Razorpay)

1. Go to: http://localhost:3000/donate
2. Stay on "Pay Online" tab (default)
3. Select amount
4. Fill: Name, Email
5. Click "Pay Securely"

**Without Razorpay keys (Test Mode):**
- Toast: "Test Mode - Razorpay not configured"
- Payment auto-confirms
- Success screen with receipt number

**With Razorpay keys:**
- Razorpay checkout opens
- Use test card: 4111 1111 1111 1111
- Complete payment

---

## Step 7: Access Admin Panel

1. Login as admin: admin@vedicskills.org / admin123
2. Click your name/avatar in top-right
3. Click "Admin Panel"

**Admin Panel Sections:**
- Dashboard: Overview stats
- Donations: List and manage
- Users: View registered users
- Analytics: Charts and reports

---

## Step 8: Confirm a Donation

1. Go to Admin Panel > Donations
2. Find a "pending" donation
3. Click "Confirm" button

**What happens:**
- Status changes to "confirmed"
- Receipt number generated (VS/202603/00001)
- PDF receipt created
- Email with receipt sent (if Resend configured)

---

## Step 9: Test Email Sending

```bash
curl -X POST http://localhost:3000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "donation",
    "email": "your@email.com",
    "name": "Test User"
  }'
```

**Email types:** `donation`, `receipt`, `welcome`

**With RESEND_API_KEY:** Email sent to address
**Without RESEND_API_KEY:** Logs what would be sent

---

## Step 10: Check Other Pages

| Page | URL | Auth Required |
|------|-----|---------------|
| Home | `/` | No (redirects to /donate) |
| Donate | `/donate` | No |
| Membership | `/membership` | No |
| About | `/about` | No |
| Transparency | `/transparency` | No |
| Dashboard | `/dashboard` | Yes (any user) |
| Admin | `/admin` | Yes (admin roles) |

---

## Environment Variables Reference

### Required
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
NEXTAUTH_SECRET=any-random-string-32-chars-min
```

### Optional (with fallbacks)
```env
# Email - falls back to console logging
RESEND_API_KEY=re_xxxx

# Payments - falls back to mock mode
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=xxxx

# SMS - falls back to console logging
MSG91_AUTH_KEY=xxxx
MSG91_SENDER_ID=VSKILL
MSG91_TEMPLATE_ID=xxxx

# File uploads - auto-configured by Vercel
BLOB_READ_WRITE_TOKEN=xxxx
```

---

## User Roles

| Role | Can Access Admin | Can Confirm |
|------|-----------------|-------------|
| donor | No | No |
| auditor | Yes (read-only) | No |
| csr_partner | Yes | No |
| ca | Yes | Yes |
| director | Yes | Yes |
| super_admin | Yes | Yes |

---

## Troubleshooting

### "Unexpected token '<'" Error
MongoDB not connected. Check `MONGODB_URI`.

### Registration Failed
Check MongoDB connection with `/api/debug/status`.

### Emails Not Arriving
Check if `resend: true` in status. If false, emails are logged to server console.

### Admin Panel Not Visible
Login with admin role. Create admin with `/api/admin/seed`.

### 80G Fields Not Showing
Click the checkbox "I need an 80G Tax Exemption Receipt".

---

## Complete Test Checklist

- [ ] `/api/debug/status` returns mongodb: true
- [ ] `/api/admin/seed` creates admin user
- [ ] Register a new user
- [ ] Login with new user
- [ ] Make UPI donation
- [ ] Make Razorpay donation (test mode OK)
- [ ] Login as admin
- [ ] Access admin panel
- [ ] Confirm a pending donation
- [ ] Check dashboard shows donation history
- [ ] Check transparency page shows stats
- [ ] Test email endpoint works
