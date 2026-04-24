# Phase 3 & 4: Planned Features

## Current Completion Status

| Phase | Status | Features |
|-------|--------|----------|
| Phase 1 | Complete | Database, Auth, Donations, Email, SMS, PDF, Dashboards |
| Phase 2 | Complete | Razorpay, About, Uploads, Transparency, Analytics |

---

## Phase 3: Role Features & Export

### 3.1 Personal Donor Wall
Each donor gets a public profile page.

**URL:** `/donors/[userId]`

**Features:**
- Total amount donated
- Number of donations
- Public messages shared
- Member since date
- Privacy toggle in user settings
- Shareable profile link

### 3.2 Role-Based Dashboards
Different views based on user role.

| Role | Dashboard Features |
|------|-------------------|
| Auditor | Read-only audit trail, full export |
| CA | Receipt generation, bulk export, confirm |
| CSR Partner | CSR-specific donations, partner reports |
| Director | Approval workflows, all features |

### 3.3 Export & Reports
**Features:**
- CSV export of donations
- Date range filtering
- Filter by status (pending/confirmed)
- Bulk receipt download (ZIP)

### 3.4 Admin User Management
**Features:**
- View all users with roles
- Change user roles (super_admin only)
- Deactivate users
- View user donation history

---

## Phase 4: Localization & Advanced

### 4.1 Hindi Language Support
- All UI text in Hindi
- Hindi email templates
- Hindi PDF receipts
- Language switcher in header

### 4.2 Recurring Donations
Using Razorpay Subscriptions:
- Monthly auto-debit plans
- Subscription management
- Failed payment handling
- Cancellation flow

### 4.3 Campaign System
Time-limited fundraising:
- Create campaigns with goals
- Campaign landing pages
- Progress tracking
- Campaign-specific analytics

### 4.4 Security Enhancements
- API rate limiting
- PAN encryption at rest
- Admin audit logs
- Two-factor authentication

### 4.5 Public Donor Hall
- `/donors` page showing all public donors
- Recognition tiers (Bronze/Silver/Gold)
- Monthly/yearly leaderboards
- Social sharing

---

## NOT Planned (Removed Per Request)

- Membership reminder cron jobs
- Donation follow-up reminders
- Sanskrit language support
- Auto-notification systems

---

## Priority Order for Implementation

1. Export functionality (CSV)
2. Personal donor wall
3. Admin user management
4. Hindi support
5. Campaign system
6. Recurring donations
7. Security enhancements

---

## Admin User Creation (Reference)

```bash
# Create super_admin user
curl -X POST http://localhost:3000/api/admin/seed

# Credentials created:
# Email: admin@vedicskills.org
# Password: admin123
```

---

*Plan updated: March 2026*
