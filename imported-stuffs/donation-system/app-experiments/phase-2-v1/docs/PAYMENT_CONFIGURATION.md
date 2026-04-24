# Payment & Organization Configuration Guide

This document explains exactly where to update your QR code, bank details, and organization information.

---

## Quick Summary

| What to Update | File | Location |
|----------------|------|----------|
| UPI QR Code Image | `public/images/upi-qr-placeholder.png` | Replace the file |
| Bank Details | `components/payment-info-card.tsx` | Lines 21-27 |
| UPI ID | `components/payment-info-card.tsx` | Line 29 |
| Organization Name | Environment variable | `ORG_NAME` |
| Organization Address | Environment variable | `ORG_ADDRESS` |
| Organization PAN | Environment variable | `ORG_PAN` |
| 80G Registration | Environment variable | `ORG_80G_REG` |
| 80G Validity | Environment variable | `ORG_80G_VALIDITY` |

---

## 1. UPI QR Code

### Replace the QR Code Image

**File:** `public/images/upi-qr-placeholder.png`

**Steps:**
1. Generate your UPI QR code from your bank app or payment service
2. Save the QR code image as PNG format
3. Replace the file at `public/images/upi-qr-placeholder.png`
4. Recommended size: 400x400 pixels (will be displayed at 192x192)

**How to Generate UPI QR:**
- **Google Pay**: Open app → Profile → QR Code → Save
- **PhonePe**: Open app → Receive → QR Code → Save
- **Paytm**: Open app → QR Code → Save
- **Bank Apps**: Most bank apps have a "Generate QR" option

---

## 2. UPI ID

**File:** `components/payment-info-card.tsx`

**Find this line (around line 29):**
```typescript
const UPI_ID = "vedicskills@upi"
```

**Replace with your actual UPI ID:**
```typescript
const UPI_ID = "yourorganization@okicici"  // or @oksbi, @ybl, etc.
```

---

## 3. Bank Account Details

**File:** `components/payment-info-card.tsx`

**Find this section (lines 21-27):**
```typescript
const BANK_DETAILS = {
  accountName: "VedicSkills Foundation",
  accountNumber: "XXXX XXXX XXXX 1234",
  ifscCode: "ABCD0001234",
  bankName: "Sample Bank",
  branch: "Main Branch, City",
}
```

**Replace with your actual bank details:**
```typescript
const BANK_DETAILS = {
  accountName: "Your Organization Name",
  accountNumber: "1234567890123456",
  ifscCode: "SBIN0001234",
  bankName: "State Bank of India",
  branch: "MG Road Branch, Bangalore",
}
```

---

## 4. Organization Details (for 80G Receipts)

These are configured via **environment variables** so you can change them without modifying code.

### Environment Variables to Set

| Variable | Description | Example |
|----------|-------------|---------|
| `ORG_NAME` | Organization name | `VedicSkills Foundation` |
| `ORG_ADDRESS` | Full address | `123 Spiritual Lane, Rishikesh, Uttarakhand 249201` |
| `ORG_PAN` | Organization PAN | `AAATV1234X` |
| `ORG_80G_REG` | 80G registration number | `80G/REG/2024/12345` |
| `ORG_80G_VALIDITY` | 80G validity period | `Valid from 01-04-2024 to 31-03-2029` |

### For Local Development

Add to `.env.local`:
```bash
ORG_NAME="VedicSkills Foundation"
ORG_ADDRESS="123 Spiritual Lane, Rishikesh, Uttarakhand 249201"
ORG_PAN="AAATV1234X"
ORG_80G_REG="80G/REG/2024/12345"
ORG_80G_VALIDITY="Valid from 01-04-2024 to 31-03-2029"
```

### For Vercel Deployment

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable with its value
3. Redeploy for changes to take effect

---

## 5. Email Sender Configuration

**File:** Environment variable (not code)

| Variable | Description | Example |
|----------|-------------|---------|
| `FROM_EMAIL` | Email sender address | `VedicSkills <donations@vedicskills.org>` |

**Note:** For Resend, you need a verified domain. During testing, use their default domain:
```bash
FROM_EMAIL="VedicSkills <onboarding@resend.dev>"
```

---

## 6. About Page Details

**File:** `app/about/page.tsx`

You may want to update:
- Mission statement
- Organization history
- Team members
- Contact information
- Statistics

This file contains placeholder content that should be replaced with your actual organization details.

---

## Complete Example: All Environment Variables

Create `.env.local` with all your configuration:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vedicskills

# Authentication
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL="VedicSkills <donations@vedicskills.org>"

# Organization Details (for 80G receipts)
ORG_NAME="VedicSkills Foundation"
ORG_ADDRESS="123 Spiritual Lane, Rishikesh, Uttarakhand 249201, India"
ORG_PAN="AAATV1234X"
ORG_80G_REG="80G/REG/2024/12345"
ORG_80G_VALIDITY="Valid from 01-04-2024 to 31-03-2029"

# Razorpay (for online payments)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxx

# SMS (optional)
MSG91_AUTH_KEY=xxxxxxxxxxxxxxxxxxxxx
MSG91_SENDER_ID=VEDSKL
MSG91_TEMPLATE_ID=xxxxxxxxxxxxxxxxxxxxx
```

---

## Files Summary

| File | What It Contains |
|------|------------------|
| `public/images/upi-qr-placeholder.png` | UPI QR code image |
| `components/payment-info-card.tsx` | Bank details, UPI ID |
| `lib/pdf.ts` | Organization details for receipts (uses env vars) |
| `lib/email.ts` | Email sender configuration (uses env vars) |
| `app/about/page.tsx` | About page content |

---

## Verification Checklist

After updating, verify:

- [ ] QR code displays correctly on donation page
- [ ] UPI ID is correct and copyable
- [ ] Bank details show your actual account
- [ ] Create a test donation and check the 80G receipt PDF
- [ ] Verify organization name appears correctly on receipt
- [ ] Test email sending with your Resend configuration

---

## Need Help?

- **Resend Setup**: See `docs/CREDENTIALS_GUIDE.md`
- **Testing**: See `docs/TESTING_GUIDE.md`
- **Troubleshooting**: See `docs/TROUBLESHOOTING.md`
