# API Documentation

Complete reference for all API endpoints in the VedicSkills Donation System.

---

## Base URL

- **Local**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

---

## Authentication

Most endpoints require authentication via NextAuth session cookies.

### Public Endpoints (No Auth Required)
- `POST /api/auth/register`
- `POST /api/donations` (for anonymous donations)
- `GET /api/transparency`

### Protected Endpoints (Login Required)
- All `/api/donations/*` GET requests
- All `/api/admin/*` endpoints
- All `/api/memberships/*` endpoints

---

## Auth Endpoints

### POST /api/auth/register
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+919876543210"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

**Errors:**
- `400` - Validation failed
- `409` - Email already registered
- `500` - Server error

---

### POST /api/auth/[...nextauth]
NextAuth.js authentication endpoints (handled automatically).

- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

---

## Donation Endpoints

### POST /api/donations
Create a new donation record.

**Request Body:**
```json
{
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "donorPhone": "+919876543210",
  "donorAddress": "123 Main St, City",
  "donorPAN": "ABCDE1234F",
  "amount": 1000,
  "method": "UPI",
  "transactionRef": "UPI123456789",
  "screenshotPath": "uploads/screenshot.jpg",
  "isPublic": true,
  "message": "For a good cause",
  "needs80G": true
}
```

**Response (201):**
```json
{
  "success": true,
  "donationId": "donation_id",
  "message": "Donation recorded successfully"
}
```

---

### GET /api/donations
Get donations list.

**Query Parameters:**
- `status` - Filter by status: `pending`, `confirmed`, `rejected`
- `limit` - Number of records (default: 50)
- `skip` - Offset for pagination

**Response (200):**
```json
{
  "donations": [
    {
      "id": "donation_id",
      "donorName": "John Doe",
      "amount": 1000,
      "status": "pending",
      "method": "UPI",
      "createdAt": "2026-03-23T10:00:00Z"
    }
  ],
  "total": 100
}
```

**Access Control:**
- `donor`: Only sees own donations
- `auditor/csr_partner/ca/director/super_admin`: Sees all donations

---

### GET /api/donations/[id]
Get single donation details.

**Response (200):**
```json
{
  "id": "donation_id",
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "amount": 1000,
  "status": "confirmed",
  "method": "UPI",
  "transactionRef": "UPI123456789",
  "receiptNumber": "VS/2026-27/0001",
  "createdAt": "2026-03-23T10:00:00Z",
  "confirmedAt": "2026-03-23T11:00:00Z"
}
```

---

### POST /api/donations/[id]/confirm
Confirm a pending donation.

**Required Roles:** `ca`, `director`, `super_admin`

**Request Body:**
```json
{
  "transactionRef": "VERIFIED_REF_123"
}
```

**Response (200):**
```json
{
  "success": true,
  "receiptNumber": "VS/2026-27/0001",
  "message": "Donation confirmed and receipt generated"
}
```

---

## Razorpay Endpoints

### POST /api/razorpay/create-order
Create a Razorpay payment order.

**Request Body:**
```json
{
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "donorPhone": "+919876543210",
  "amount": 1000,
  "needs80G": true
}
```

**Response (200):**
```json
{
  "orderId": "order_abc123",
  "donationId": "donation_id",
  "amount": 100000,
  "currency": "INR",
  "key": "rzp_test_xxxxx"
}
```

---

### POST /api/razorpay/verify-payment
Verify Razorpay payment signature.

**Request Body:**
```json
{
  "razorpay_order_id": "order_abc123",
  "razorpay_payment_id": "pay_xyz789",
  "razorpay_signature": "signature_string",
  "donationId": "donation_id"
}
```

**Response (200):**
```json
{
  "success": true,
  "donation": {
    "id": "donation_id",
    "status": "confirmed",
    "receiptNumber": "VS/2026-27/0001"
  }
}
```

---

### POST /api/razorpay/webhook
Razorpay webhook handler (called by Razorpay).

**Headers Required:**
- `x-razorpay-signature`: Webhook signature

---

## Admin Endpoints

### GET /api/admin/stats
Get dashboard statistics.

**Required Roles:** `auditor`, `csr_partner`, `ca`, `director`, `super_admin`

**Response (200):**
```json
{
  "totalDonations": 150,
  "totalAmount": 500000,
  "pendingDonations": 10,
  "confirmedDonations": 140,
  "totalUsers": 200,
  "todayDonations": 5,
  "todayAmount": 15000
}
```

---

### GET /api/admin/analytics
Get detailed analytics data.

**Response (200):**
```json
{
  "monthlyData": [
    { "month": "Jan", "amount": 50000, "count": 20 }
  ],
  "methodBreakdown": [
    { "method": "UPI", "amount": 300000, "count": 100 }
  ],
  "topDonors": [
    { "name": "John Doe", "total": 50000, "count": 5 }
  ]
}
```

---

### POST /api/admin/seed
Create default admin user (development only).

**Response (200):**
```json
{
  "success": true,
  "message": "Admin user created",
  "credentials": {
    "email": "admin@vedicskills.org",
    "password": "admin123"
  }
}
```

---

### POST /api/admin/generate-receipt
Manually generate receipt for a donation.

**Required Roles:** `ca`, `director`, `super_admin`

**Request Body:**
```json
{
  "donationId": "donation_id"
}
```

---

## Membership Endpoints

### GET /api/memberships
Get user's memberships.

**Response (200):**
```json
{
  "memberships": [
    {
      "id": "membership_id",
      "tier": "supporter",
      "status": "active",
      "startDate": "2026-03-01",
      "endDate": "2027-03-01"
    }
  ]
}
```

---

### POST /api/memberships
Create new membership.

**Request Body:**
```json
{
  "tier": "patron",
  "paymentFrequency": "yearly",
  "donorName": "John Doe",
  "donorEmail": "john@example.com"
}
```

---

## Receipt Endpoints

### GET /api/receipts/[id]
Download receipt PDF.

**Response:** PDF file download

---

## File Upload Endpoints

### POST /api/upload
Upload a file (screenshot).

**Request:** `multipart/form-data` with `file` field

**Response (200):**
```json
{
  "pathname": "uploads/filename.jpg"
}
```

---

### GET /api/file?pathname=xxx
Serve uploaded file.

**Query Parameters:**
- `pathname`: File path from upload response

---

## Transparency Endpoint

### GET /api/transparency
Get public transparency data.

**Response (200):**
```json
{
  "totalDonations": 500000,
  "totalDonors": 150,
  "recentDonations": [
    {
      "name": "Anonymous",
      "amount": 1000,
      "date": "2026-03-23"
    }
  ],
  "fundUsage": {
    "education": 60,
    "operations": 20,
    "outreach": 15,
    "admin": 5
  }
}
```

---

## Test Endpoints

### GET /api/debug/status
Check system configuration status.

**Response (200):**
```json
{
  "mongodb": true,
  "resend": true,
  "razorpay": false,
  "msg91": false,
  "blob": true
}
```

---

### POST /api/test/email
Send test email.

**Request Body:**
```json
{
  "type": "donation",
  "email": "test@example.com",
  "name": "Test User"
}
```

---

## Error Response Format

All errors follow this format:

```json
{
  "error": "Error message description",
  "details": "Optional additional details"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error
