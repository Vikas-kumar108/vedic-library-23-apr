# Database Schema Documentation

Complete MongoDB schema reference for the VedicSkills Donation System.

---

## Overview

| Collection | Purpose | Records Expected |
|------------|---------|------------------|
| users | Registered users and admins | Thousands |
| donations | All donation records | Thousands to millions |
| receipts | Generated 80G receipts | One per confirmed donation |
| memberships | Membership subscriptions | Hundreds |
| counters | Auto-increment counters | Few (for receipt numbers) |

---

## Users Collection

### Schema Definition
```typescript
{
  _id: ObjectId,
  name: String,           // Required, min 2 chars
  email: String,          // Required, unique, lowercase
  password: String,       // Required, bcrypt hashed
  phone: String,          // Optional
  role: String,           // Enum, default "donor"
  isActive: Boolean,      // Default true
  totalDonations: Number, // Auto-calculated
  createdAt: Date,
  updatedAt: Date
}
```

### Roles Enum
```typescript
"donor" | "auditor" | "csr_partner" | "ca" | "director" | "super_admin"
```

### Indexes
```javascript
{ email: 1 }        // Unique
{ role: 1 }         // For role-based queries
{ createdAt: -1 }   // For recent users
```

### Example Document
```json
{
  "_id": "65f5a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$xxxxx...",
  "phone": "+919876543210",
  "role": "donor",
  "isActive": true,
  "totalDonations": 5000,
  "createdAt": "2026-03-15T10:30:00Z",
  "updatedAt": "2026-03-23T14:20:00Z"
}
```

---

## Donations Collection

### Schema Definition
```typescript
{
  _id: ObjectId,
  userId: ObjectId,       // Optional, ref to users
  donorName: String,      // Required
  donorEmail: String,     // Required
  donorPhone: String,     // Optional
  donorAddress: String,   // For 80G receipts
  donorPAN: String,       // For 80G receipts
  amount: Number,         // Required, min 1
  currency: String,       // Default "INR"
  method: String,         // "UPI" | "Bank" | "Razorpay"
  paymentMethod: String,  // Detailed method
  status: String,         // "pending" | "confirmed" | "rejected"
  transactionRef: String, // UPI ref or bank ref
  razorpayOrderId: String,
  razorpayPaymentId: String,
  screenshotPath: String, // Blob path
  isPublic: Boolean,      // Show on transparency page
  needs80G: Boolean,      // Request 80G receipt
  message: String,        // Donor message
  purpose: String,        // Donation purpose
  isRecurring: Boolean,   // Default false
  membershipId: ObjectId, // If membership payment
  createdAt: Date,
  updatedAt: Date,
  confirmedAt: Date       // When confirmed
}
```

### Status Enum
```typescript
"pending" | "confirmed" | "rejected"
```

### Method Enum
```typescript
"UPI" | "Bank" | "Razorpay" | "pending"
```

### Indexes
```javascript
{ status: 1 }                    // Filter by status
{ userId: 1 }                    // User's donations
{ createdAt: -1 }                // Recent donations
{ donorEmail: 1 }                // Search by email
{ razorpayOrderId: 1 }           // Payment lookup
{ status: 1, createdAt: -1 }     // Dashboard queries
```

### Example Document
```json
{
  "_id": "65f5a1b2c3d4e5f6a7b8c9d1",
  "userId": "65f5a1b2c3d4e5f6a7b8c9d0",
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "donorPhone": "+919876543210",
  "donorAddress": "123 Main St, City - 110001",
  "donorPAN": "ABCDE1234F",
  "amount": 5000,
  "currency": "INR",
  "method": "UPI",
  "status": "confirmed",
  "transactionRef": "UPI123456789012",
  "isPublic": true,
  "needs80G": true,
  "message": "For education of underprivileged children",
  "isRecurring": false,
  "createdAt": "2026-03-23T10:00:00Z",
  "updatedAt": "2026-03-23T11:30:00Z",
  "confirmedAt": "2026-03-23T11:30:00Z"
}
```

---

## Receipts Collection

### Schema Definition
```typescript
{
  _id: ObjectId,
  donationId: ObjectId,   // Required, ref to donations
  receiptNumber: String,  // Format: VS/YYYY-YY/NNNN
  issuedDate: Date,       // Default now
  pdfBase64: String,      // Generated PDF
  createdAt: Date,
  updatedAt: Date
}
```

### Receipt Number Format
```
VS/2026-27/0001
│  │       │
│  │       └── Sequential number (0001, 0002, ...)
│  └────────── Financial year (April to March)
└───────────── Organization prefix
```

### Indexes
```javascript
{ donationId: 1 }        // Unique, one receipt per donation
{ receiptNumber: 1 }     // Unique
{ issuedDate: -1 }       // Recent receipts
```

### Example Document
```json
{
  "_id": "65f5a1b2c3d4e5f6a7b8c9d2",
  "donationId": "65f5a1b2c3d4e5f6a7b8c9d1",
  "receiptNumber": "VS/2026-27/0001",
  "issuedDate": "2026-03-23T11:30:00Z",
  "pdfBase64": "JVBERi0xLjQKJeLjz9M...",
  "createdAt": "2026-03-23T11:30:00Z",
  "updatedAt": "2026-03-23T11:30:00Z"
}
```

---

## Memberships Collection

### Schema Definition
```typescript
{
  _id: ObjectId,
  userId: ObjectId,       // Required, ref to users
  tier: String,           // Membership tier
  status: String,         // "active" | "expired" | "cancelled"
  paymentFrequency: String,
  amount: Number,
  startDate: Date,
  endDate: Date,
  lastPaymentDate: Date,
  nextPaymentDate: Date,
  autoRenew: Boolean,     // Default false
  razorpaySubscriptionId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Tier Enum
```typescript
"supporter" | "patron" | "benefactor" | "visionary" | "guardian"
```

### Tier Amounts
| Tier | Monthly | Yearly |
|------|---------|--------|
| supporter | ₹500 | ₹5,000 |
| patron | ₹1,000 | ₹10,000 |
| benefactor | ₹2,500 | ₹25,000 |
| visionary | ₹5,000 | ₹50,000 |
| guardian | ₹10,000 | ₹1,00,000 |

### Status Enum
```typescript
"active" | "expired" | "cancelled" | "pending"
```

### Indexes
```javascript
{ userId: 1 }                    // User's memberships
{ status: 1 }                    // Active memberships
{ endDate: 1 }                   // Expiring soon
{ razorpaySubscriptionId: 1 }    // Subscription lookup
```

### Example Document
```json
{
  "_id": "65f5a1b2c3d4e5f6a7b8c9d3",
  "userId": "65f5a1b2c3d4e5f6a7b8c9d0",
  "tier": "patron",
  "status": "active",
  "paymentFrequency": "yearly",
  "amount": 10000,
  "startDate": "2026-03-01T00:00:00Z",
  "endDate": "2027-03-01T00:00:00Z",
  "lastPaymentDate": "2026-03-01T10:00:00Z",
  "nextPaymentDate": "2027-03-01T00:00:00Z",
  "autoRenew": false,
  "createdAt": "2026-03-01T10:00:00Z",
  "updatedAt": "2026-03-01T10:00:00Z"
}
```

---

## Counters Collection

### Schema Definition
```typescript
{
  _id: String,            // Counter name
  seq: Number             // Current sequence
}
```

### Purpose
Used for generating sequential receipt numbers per financial year.

### Example Documents
```json
[
  { "_id": "receipt_2025-26", "seq": 150 },
  { "_id": "receipt_2026-27", "seq": 5 }
]
```

---

## Relationships

```
users (1) ──────< (many) donations
  │
  └──────< (many) memberships

donations (1) ──── (1) receipts

memberships (1) ──< (many) donations (when paying membership fee)
```

---

## Common Queries

### Get User's Donations
```javascript
db.donations.find({ userId: ObjectId("...") }).sort({ createdAt: -1 })
```

### Get Pending Donations
```javascript
db.donations.find({ status: "pending" }).sort({ createdAt: -1 })
```

### Get Today's Donations
```javascript
db.donations.find({
  createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) }
})
```

### Get Total Confirmed Amount
```javascript
db.donations.aggregate([
  { $match: { status: "confirmed" } },
  { $group: { _id: null, total: { $sum: "$amount" } } }
])
```

### Get Monthly Statistics
```javascript
db.donations.aggregate([
  { $match: { status: "confirmed" } },
  { $group: {
    _id: { $month: "$createdAt" },
    total: { $sum: "$amount" },
    count: { $sum: 1 }
  }}
])
```

### Get Top Donors
```javascript
db.donations.aggregate([
  { $match: { status: "confirmed" } },
  { $group: {
    _id: "$donorEmail",
    name: { $first: "$donorName" },
    total: { $sum: "$amount" },
    count: { $sum: 1 }
  }},
  { $sort: { total: -1 } },
  { $limit: 10 }
])
```

---

## Data Migration

### Export Data
```bash
mongodump --uri="mongodb+srv://..." --out=backup/
```

### Import Data
```bash
mongorestore --uri="mongodb+srv://..." backup/
```

### Backup Script
```javascript
// Run monthly
const backup = {
  donations: db.donations.find().toArray(),
  users: db.users.find({}, { password: 0 }).toArray(),
  receipts: db.receipts.find().toArray()
}
// Store to secure location
```

---

## Performance Considerations

### Index Usage
Always create indexes for:
- Fields used in `find()` queries
- Fields used in `sort()` operations
- Fields used in `$match` aggregation stages

### Query Optimization
- Use projections to limit returned fields
- Use `limit()` for paginated queries
- Use compound indexes for multi-field queries

### Monitoring
- Watch for slow queries (>100ms)
- Monitor collection sizes
- Check index usage with `explain()`
