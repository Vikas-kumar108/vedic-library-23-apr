# Security Guide

Security best practices and checklist for the VedicSkills Donation System.

---

## Sensitive Data Inventory

### High Sensitivity (Must Protect)
| Data | Location | Protection |
|------|----------|------------|
| Passwords | MongoDB `users.password` | Bcrypt hashed |
| PAN Numbers | MongoDB `donations.donorPAN` | Stored plain (encrypt in Phase 4) |
| Payment credentials | Environment variables | Never commit to code |
| Session secrets | Environment variables | Never expose |

### Medium Sensitivity
| Data | Location | Protection |
|------|----------|------------|
| Email addresses | MongoDB | Access controlled |
| Phone numbers | MongoDB | Access controlled |
| Donation amounts | MongoDB | Role-based access |

### Low Sensitivity
| Data | Location |
|------|----------|
| Names (public donors) | Public transparency page |
| Receipt numbers | Public to donor |

---

## Environment Variables Security

### Never Commit Secrets
Add to `.gitignore`:
```gitignore
.env
.env.local
.env.production
*.pem
*.key
```

### Rotate Secrets Regularly
| Secret | Rotation Frequency |
|--------|-------------------|
| NEXTAUTH_SECRET | Every 6 months |
| Database password | Every 6 months |
| API keys | When compromised or annually |

### Strong Secret Generation
```bash
# Generate secure random string
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Authentication Security

### Password Requirements (Current)
- Minimum 8 characters
- Bcrypt hashing with salt

### Recommended Improvements (Phase 4)
- [ ] Add password strength meter
- [ ] Require uppercase + number + special character
- [ ] Implement account lockout after failed attempts
- [ ] Add two-factor authentication
- [ ] Password history (prevent reuse)

### Session Security
Current implementation:
- HTTP-only cookies
- Secure flag on HTTPS
- Session expiry after inactivity

---

## Role-Based Access Control

### Current Roles and Permissions

| Role | View Donations | Confirm | Manage Users | System Settings |
|------|----------------|---------|--------------|-----------------|
| donor | Own only | No | No | No |
| auditor | All | No | No | No |
| csr_partner | All | No | No | No |
| ca | All | Yes | No | No |
| director | All | Yes | Yes | No |
| super_admin | All | Yes | Yes | Yes |

### API Endpoint Protection

| Endpoint Pattern | Required Auth | Required Role |
|-----------------|---------------|---------------|
| `/api/auth/*` | Public | None |
| `/api/donations` POST | Public | None |
| `/api/donations` GET | Logged in | Any |
| `/api/admin/*` | Logged in | Admin roles |
| `/api/admin/seed` | Public | None (REMOVE IN PROD) |

---

## Production Security Checklist

### Before Going Live

**Code Changes**:
- [ ] Remove `/api/admin/seed` endpoint
- [ ] Remove `/api/debug/status` endpoint
- [ ] Remove `/api/test/email` endpoint
- [ ] Enable strict TypeScript checks
- [ ] Review all console.log statements

**Environment**:
- [ ] Use production MongoDB (not test cluster)
- [ ] Use Razorpay live keys (not test)
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Configure proper NEXTAUTH_URL
- [ ] Enable HTTPS only

**Database**:
- [ ] Create dedicated database user
- [ ] Enable authentication
- [ ] Restrict network access
- [ ] Enable audit logging
- [ ] Set up regular backups

**Monitoring**:
- [ ] Set up error tracking (Sentry)
- [ ] Configure log aggregation
- [ ] Set up uptime monitoring
- [ ] Enable security alerts

---

## API Security

### Input Validation
All inputs are validated using Zod schemas:
- Email format validation
- Phone number format
- Amount minimum/maximum
- String length limits
- PAN number format

### Rate Limiting (Recommended - Phase 4)
```typescript
// Add to API routes
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
})
```

### SQL/NoSQL Injection Prevention
- All database queries use Mongoose ODM
- User input never directly interpolated
- Schema validation before database operations

---

## Payment Security

### Razorpay Security
- Never store full card numbers
- Signature verification on all payments
- Webhook signature validation
- Use HTTPS for all communication

### Data We Store
| We Store | We Don't Store |
|----------|----------------|
| Payment ID | Card numbers |
| Order ID | CVV |
| Amount | Bank account passwords |
| Status | OTP |

---

## File Upload Security

### Current Protections
- File type validation (images only)
- File size limit (5MB)
- Unique filenames generated
- Private Blob storage

### Recommended (Phase 4)
- [ ] Virus scanning
- [ ] Image metadata stripping
- [ ] Content validation (actual file type)

---

## Data Encryption

### Current State
| Data | Encrypted at Rest | Encrypted in Transit |
|------|-------------------|---------------------|
| Database | MongoDB Atlas (Yes) | TLS (Yes) |
| Passwords | Bcrypt (Yes) | TLS (Yes) |
| PAN Numbers | No | TLS (Yes) |
| Files | Blob (Yes) | HTTPS (Yes) |

### Phase 4 Improvements
- [ ] Encrypt PAN numbers at application level
- [ ] Implement field-level encryption for sensitive data

---

## Audit Trail

### Currently Logged
- User registration (who, when)
- Donations (all details)
- Receipt generation (linked to donation)
- Donation confirmation (who confirmed, when)

### Recommended (Phase 4)
- [ ] Admin actions log
- [ ] Login/logout events
- [ ] Failed login attempts
- [ ] Data export events
- [ ] User role changes

---

## Backup & Recovery

### Database Backups
MongoDB Atlas provides:
- Continuous backups
- Point-in-time recovery
- Snapshot backups

### Backup Frequency
| Data | Backup Type | Frequency |
|------|-------------|-----------|
| Donations | Full | Daily |
| Users | Full | Daily |
| Receipts | Full | Daily |

### Recovery Time Objectives
- Database: 1 hour
- Application: 15 minutes (redeploy)
- Files: 1 hour (Blob restore)

---

## Incident Response

### If Credentials Are Compromised

1. **Immediately**:
   - Revoke/rotate compromised credentials
   - Update environment variables
   - Redeploy application

2. **Within 1 hour**:
   - Review access logs
   - Identify affected data
   - Document timeline

3. **Within 24 hours**:
   - Notify affected users (if applicable)
   - Update security measures
   - Post-mortem analysis

### Emergency Contacts
Document these for your organization:
- Database admin
- Hosting admin
- Payment gateway contact
- Legal/compliance contact

---

## Compliance Considerations

### For Indian Donations
- 80G receipt generation (implemented)
- PAN collection for 80G (implemented)
- IT Act compliance
- GST exemption documentation

### Data Protection
- Collect only necessary data
- Allow users to request data deletion
- Retain data as per legal requirements
- Clear privacy policy recommended

---

## Security Updates

### Keep Updated
Regularly update:
- Node.js version
- npm packages
- Next.js version
- MongoDB version

### Check for Vulnerabilities
```bash
# Check npm packages
npm audit

# Fix automatically
npm audit fix

# Check for outdated packages
npm outdated
```

---

## Security Testing

### Manual Testing
- [ ] Test SQL/NoSQL injection attempts
- [ ] Test XSS in form fields
- [ ] Test CSRF protection
- [ ] Test unauthorized access to APIs
- [ ] Test role escalation

### Automated Testing (Recommended)
- OWASP ZAP for vulnerability scanning
- npm audit for dependency vulnerabilities
- Snyk for continuous monitoring
