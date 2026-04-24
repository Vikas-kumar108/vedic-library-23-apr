# VedicSkills Donation System - Credentials & API Keys Guide

Complete guide for obtaining all required credentials, API keys, and authentication details.

---

## Quick Reference - All Environment Variables

```env
# Required (System won't work without these)
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=http://localhost:3000

# Email (Required for notifications)
RESEND_API_KEY=re_...
FROM_EMAIL=VedicSkills <noreply@yourdomain.com>

# Payment Gateway (Required for online payments)
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# File Storage (Auto-configured by Vercel)
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# SMS (Optional)
MSG91_AUTH_KEY=...
MSG91_SENDER_ID=VEDSKL
MSG91_TEMPLATE_ID=...
```

---

## 1. MongoDB Atlas (Database)

### What It Is
Cloud-hosted MongoDB database for storing all application data.

### Pricing
| Plan | Price | Limits |
|------|-------|--------|
| **M0 Shared** | FREE Forever | 512MB storage, shared resources |
| M2 | $9/month | 2GB storage |
| M5 | $25/month | 5GB storage |

**Recommendation**: Start with FREE M0 tier, upgrade when needed.

### How to Get

1. **Create Account**
   - Go to: https://www.mongodb.com/atlas
   - Click "Try Free" → Sign up with email/Google

2. **Create Cluster**
   - Select "M0 FREE" tier
   - Choose region closest to your users (Mumbai for India)
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" → Add New Database User
   - Username: `vedicskills_admin`
   - Password: Generate secure password (save it!)
   - Role: "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access" → Add IP Address
   - Click "Allow Access from Anywhere" (for Vercel)
   - Or add specific IPs for security

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

```
MONGODB_URI=mongodb+srv://vedicskills_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/vedicskills?retryWrites=true&w=majority
```

---

## 2. NextAuth Secret

### What It Is
A random string used to encrypt session tokens.

### Pricing
FREE - You generate this yourself.

### How to Generate

**Option 1: Using OpenSSL (Mac/Linux)**
```bash
openssl rand -base64 32
```

**Option 2: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Online Generator**
- Go to: https://generate-secret.vercel.app/32
- Copy the generated string

```
NEXTAUTH_SECRET=K7gN3xYz...your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

**For Production**: Change `NEXTAUTH_URL` to your actual domain.

---

## 3. Resend (Email Service)

### What It Is
Email API for sending donation confirmations, receipts, and notifications.

### Pricing
| Plan | Price | Limits |
|------|-------|--------|
| **Free** | FREE | 3,000 emails/month, 100/day |
| Pro | $20/month | 50,000 emails/month |
| Enterprise | Custom | Unlimited |

**Recommendation**: FREE tier is sufficient for most small-medium organizations.

### How to Get

1. **Create Account**
   - Go to: https://resend.com
   - Sign up with email/GitHub

2. **Get API Key**
   - Go to "API Keys" in dashboard
   - Click "Create API Key"
   - Name: `vedicskills-production`
   - Permission: "Full access"
   - Copy the key (starts with `re_`)

```
RESEND_API_KEY=re_123abc...
```

3. **Setup Domain (Optional but Recommended)**
   - Go to "Domains" → Add Domain
   - Add your domain (e.g., `vedicskills.org`)
   - Add the DNS records shown to your domain
   - Wait for verification (usually 24-48 hours)

```
FROM_EMAIL=VedicSkills <noreply@vedicskills.org>
```

**Without Domain Verification**: Use Resend's test domain
```
FROM_EMAIL=VedicSkills <onboarding@resend.dev>
```
Note: Test domain only sends to the email you signed up with.

---

## 4. Razorpay (Payment Gateway)

### What It Is
Indian payment gateway for accepting online donations via UPI, cards, netbanking.

### Pricing
| Type | Fee |
|------|-----|
| **Signup** | FREE |
| Transaction Fee | 2% per transaction |
| No monthly charges | - |

### How to Get

1. **Create Account**
   - Go to: https://razorpay.com
   - Click "Sign Up" → Fill business details

2. **Documents Required** (for Indian NGO)
   - PAN Card of organization
   - 80G Certificate (if applicable)
   - Registration Certificate
   - Bank Account Details
   - Authorized Signatory ID

3. **Get Test Keys (Immediate)**
   - Go to Dashboard → Settings → API Keys
   - Switch to "Test Mode" (toggle at top)
   - Generate Key ID and Secret

```
RAZORPAY_KEY_ID=rzp_test_ABC123...
RAZORPAY_KEY_SECRET=xyz789...
```

4. **Get Live Keys (After KYC)**
   - Complete KYC verification (2-3 business days)
   - Switch to "Live Mode"
   - Generate Live Key ID and Secret

5. **Setup Webhook**
   - Go to Settings → Webhooks
   - Add new webhook
   - URL: `https://yourdomain.com/api/razorpay/webhook`
   - Events: Select "payment.captured", "payment.failed"
   - Copy webhook secret

```
RAZORPAY_WEBHOOK_SECRET=whsec_...
```

### Test Card Numbers
```
Card: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
OTP: 1234
```

---

## 5. Vercel Blob (File Storage)

### What It Is
Cloud storage for payment screenshots and documents.

### Pricing
| Plan | Price | Limits |
|------|-------|--------|
| **Hobby** | FREE | 1GB storage |
| Pro | $20/month | 100GB storage |

### How to Get

**Automatic Setup via v0/Vercel:**
1. When you deploy to Vercel, go to project settings
2. Click "Integrations" → "Browse Marketplace"
3. Add "Vercel Blob"
4. Token is auto-configured

**Manual Setup:**
1. Go to Vercel Dashboard → Storage
2. Create new Blob store
3. Copy the read-write token

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

---

## 6. MSG91 (SMS Service) - Optional

### What It Is
SMS API for sending donation confirmations via SMS.

### Pricing
| Plan | Price | SMS |
|------|-------|-----|
| **Trial** | FREE | 100 SMS |
| Prepaid | ₹0.12-0.25/SMS | Based on volume |

### How to Get

1. **Create Account**
   - Go to: https://msg91.com
   - Sign up with mobile number

2. **Complete KYC**
   - Submit business documents
   - Entity Letter (for DLT registration)

3. **Register DLT Template**
   - Register sender ID (e.g., VEDSKL)
   - Create message templates
   - Get approval (24-48 hours)

4. **Get API Key**
   - Go to Dashboard → API Keys
   - Create new key

```
MSG91_AUTH_KEY=123456AbcDef...
MSG91_SENDER_ID=VEDSKL
MSG91_TEMPLATE_ID=60a1b2c3d4e5f6...
```

**Note**: SMS in India requires DLT registration which can take 1-2 weeks.

---

## 7. Vercel (Hosting) - Optional but Recommended

### What It Is
Platform for deploying and hosting the application.

### Pricing
| Plan | Price | Features |
|------|-------|----------|
| **Hobby** | FREE | Personal projects |
| Pro | $20/month | Team features, more bandwidth |

### How to Get

1. **Create Account**
   - Go to: https://vercel.com
   - Sign up with GitHub

2. **Deploy Project**
   - Import from GitHub or upload
   - Environment variables are set in project settings

---

## Quick Setup Checklist

### Minimum Required (Free)
- [ ] MongoDB Atlas (M0 Free)
- [ ] NextAuth Secret (Generate yourself)
- [ ] Resend API Key (Free tier)

### For Online Payments
- [ ] Razorpay Test Keys (Free)
- [ ] Razorpay Live Keys (After KYC)

### For File Uploads
- [ ] Vercel Blob (Auto with Vercel deployment)

### Optional
- [ ] MSG91 for SMS (Paid per SMS)
- [ ] Custom domain for emails

---

## Environment Variables by Feature

| Feature | Required Variables |
|---------|-------------------|
| **User Registration/Login** | MONGODB_URI, NEXTAUTH_SECRET |
| **Donations (Manual)** | MONGODB_URI |
| **Donations (Online)** | RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET |
| **Email Notifications** | RESEND_API_KEY |
| **SMS Notifications** | MSG91_AUTH_KEY, MSG91_SENDER_ID, MSG91_TEMPLATE_ID |
| **Screenshot Upload** | BLOB_READ_WRITE_TOKEN |
| **80G Receipts** | No additional keys (uses PDF generation) |

---

## Security Best Practices

1. **Never commit credentials to Git**
   - Use `.env.local` for local development
   - Add `.env*` to `.gitignore`

2. **Use different keys for test/production**
   - Test keys for development
   - Live keys only in production

3. **Rotate keys periodically**
   - Change API keys every 6-12 months
   - Immediately rotate if compromised

4. **Limit access**
   - Only give API keys to necessary team members
   - Use read-only keys where possible

5. **Monitor usage**
   - Set up alerts for unusual activity
   - Review API logs regularly

---

## Troubleshooting

### "Invalid MongoDB URI"
- Check if password contains special characters (encode them)
- Verify IP whitelist includes your server

### "Email not sending"
- Verify RESEND_API_KEY is correct
- Check if FROM_EMAIL domain is verified
- Use `onboarding@resend.dev` for testing

### "Razorpay payment failed"
- Use test card numbers in test mode
- Verify key ID matches mode (test/live)

### "Blob upload failed"
- Check BLOB_READ_WRITE_TOKEN is set
- Verify Vercel Blob is enabled in project

---

---

## Files That Use Each Credential

This section lists exactly which files read each environment variable, so you know what functionality depends on each credential.

### MONGODB_URI
| File | Purpose |
|------|---------|
| `lib/db.ts` | Database connection |

**Used by**: All API routes that access the database

### NEXTAUTH_SECRET & NEXTAUTH_URL
| File | Purpose |
|------|---------|
| `lib/auth.ts` | Session encryption, redirect URLs |

### RESEND_API_KEY & FROM_EMAIL
| File | Purpose |
|------|---------|
| `lib/email.ts` | Email sending configuration |

**Called from**:
- `app/api/donations/route.ts` - Sends donation confirmation
- `app/api/donations/[id]/confirm/route.ts` - Sends receipt email
- `app/api/auth/register/route.ts` - Sends welcome email
- `app/api/test/email/route.ts` - Test endpoint

### RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET
| File | Purpose |
|------|---------|
| `lib/razorpay.ts` | Razorpay SDK initialization |

**Called from**:
- `app/api/razorpay/create-order/route.ts` - Creates payment orders
- `app/api/razorpay/verify-payment/route.ts` - Verifies signatures

### RAZORPAY_WEBHOOK_SECRET
| File | Purpose |
|------|---------|
| `app/api/razorpay/webhook/route.ts` | Webhook signature verification |

### BLOB_READ_WRITE_TOKEN
| File | Purpose |
|------|---------|
| `app/api/upload/route.ts` | File uploads |
| `app/api/file/route.ts` | File serving |

### MSG91_AUTH_KEY, MSG91_SENDER_ID, MSG91_TEMPLATE_ID
| File | Purpose |
|------|---------|
| `lib/sms.ts` | SMS sending configuration |

**Called from**:
- `app/api/donations/route.ts` - Sends SMS confirmation
- `app/api/donations/[id]/confirm/route.ts` - Sends receipt SMS

---

## No Credentials Needed (Works Offline)

These files/features work without any external credentials:

| Feature | Files |
|---------|-------|
| PDF Receipt Generation | `lib/pdf.ts` |
| UI Components | All `components/*.tsx` files |
| Static Pages | `app/about/page.tsx`, etc. |
| Amount Formatting | `lib/utils.ts` |

---

## Manual File Updates Required

**You do NOT need to edit any code files.** All credentials are read from environment variables.

### For Local Development
Create `.env.local` file in project root:
```bash
# Copy this and fill in your values
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### For Vercel Deployment
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable with its value
3. Redeploy for changes to take effect

### For Other Hosting (VPS, AWS, etc.)
Set environment variables using your platform's method:
```bash
# Linux/Mac
export MONGODB_URI="your_mongodb_uri"
export NEXTAUTH_SECRET="your_secret"
# ... etc

# Or use a .env file with your process manager
```

---

## Support Links

| Service | Support URL |
|---------|-------------|
| MongoDB Atlas | https://www.mongodb.com/docs/atlas/ |
| Resend | https://resend.com/docs |
| Razorpay | https://razorpay.com/docs/ |
| Vercel | https://vercel.com/docs |
| MSG91 | https://docs.msg91.com/
