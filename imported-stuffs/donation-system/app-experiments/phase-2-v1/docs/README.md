# VedicSkills Donation System - Documentation Index

Complete documentation for the VedicSkills Donation System.

---

## Quick Links

| I want to... | Read this |
|--------------|-----------|
| Get started quickly | [QUICK_START.md](./QUICK_START.md) |
| Test all features | [TESTING_GUIDE.md](./TESTING_GUIDE.md) |
| Set up API keys | [CREDENTIALS_GUIDE.md](./CREDENTIALS_GUIDE.md) |
| **Set up QR code & bank details** | [PAYMENT_CONFIGURATION.md](./PAYMENT_CONFIGURATION.md) |
| Deploy to production | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| Fix an issue | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Understand the code | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Access/export data | [DATA_ACCESS_GUIDE.md](./DATA_ACCESS_GUIDE.md) |
| Automate emails/reports | [DATA_ACCESS_GUIDE.md](./DATA_ACCESS_GUIDE.md) |

---

## Complete Documentation List

### Getting Started
| Document | Description |
|----------|-------------|
| [QUICK_START.md](./QUICK_START.md) | Step-by-step guide to run and test the system |
| [CREDENTIALS_GUIDE.md](./CREDENTIALS_GUIDE.md) | How to get all API keys and credentials |
| [PAYMENT_CONFIGURATION.md](./PAYMENT_CONFIGURATION.md) | Set up QR code, bank details, org info |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Test every feature with expected results |

### Technical Reference
| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture and data flow |
| [FILE_REFERENCE.md](./FILE_REFERENCE.md) | All files and their purposes |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API endpoint reference |
| [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) | MongoDB collections and schemas |
| [MOBILE_RESPONSIVENESS.md](./MOBILE_RESPONSIVENESS.md) | Mobile-first design and breakpoints |

### Operations
| Document | Description |
|----------|-------------|
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Deploy to Vercel or self-host |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common issues and solutions |
| [SECURITY_GUIDE.md](./SECURITY_GUIDE.md) | Security best practices |
| [DATA_ACCESS_GUIDE.md](./DATA_ACCESS_GUIDE.md) | Access data, Python scripts, email automation |

### Project Status
| Document | Description |
|----------|-------------|
| [PHASE_1_COMPLETE.md](./PHASE_1_COMPLETE.md) | Phase 1 features and status |
| [PHASE_2_COMPLETE.md](./PHASE_2_COMPLETE.md) | Phase 2 features and status |
| [PHASE_3_4_PLAN.md](./PHASE_3_4_PLAN.md) | Upcoming features roadmap |

---

## Reading Order (Recommended)

### For First-Time Setup
1. **[QUICK_START.md](./QUICK_START.md)** - Get the system running
2. **[CREDENTIALS_GUIDE.md](./CREDENTIALS_GUIDE.md)** - Set up external services
3. **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Verify everything works

### For Developers
1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Understand the system
2. **[FILE_REFERENCE.md](./FILE_REFERENCE.md)** - Know what each file does
3. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference
4. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Data structures

### For Deployment
1. **[SECURITY_GUIDE.md](./SECURITY_GUIDE.md)** - Security checklist
2. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deploy step-by-step
3. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - If things go wrong

---

## Environment Variables Summary

| Variable | Required | Where to Get |
|----------|----------|--------------|
| MONGODB_URI | Yes | [MongoDB Atlas](https://mongodb.com/atlas) - FREE |
| NEXTAUTH_SECRET | Yes | Generate: `openssl rand -base64 32` |
| NEXTAUTH_URL | Yes | Your domain URL |
| RESEND_API_KEY | Yes | [Resend](https://resend.com) - FREE |
| RAZORPAY_KEY_ID | For payments | [Razorpay](https://razorpay.com) |
| RAZORPAY_KEY_SECRET | For payments | Razorpay Dashboard |
| BLOB_READ_WRITE_TOKEN | For uploads | Vercel Dashboard |
| MSG91_AUTH_KEY | Optional | [MSG91](https://msg91.com) |

See [CREDENTIALS_GUIDE.md](./CREDENTIALS_GUIDE.md) for detailed setup instructions.

---

## Feature Status

### Working (Phase 1 & 2)
- User registration and authentication
- Multi-role access control
- Donation submission (UPI/Bank/Razorpay)
- Admin dashboard
- Donation confirmation
- 80G receipt generation
- Email notifications (with Resend)
- Screenshot upload
- Transparency page
- About page

### Planned (Phase 3 & 4)
- Personal donor wall
- Campaign system
- Recurring donations
- Hindi language support
- CSV export
- Enhanced security

See [PHASE_3_4_PLAN.md](./PHASE_3_4_PLAN.md) for details.

---

## Support

### Common Issues
Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions.

### Getting Help
1. Search this documentation first
2. Check browser console for errors
3. Check server logs
4. Review API documentation

---

## Document Versions

| Document | Last Updated | Phase |
|----------|--------------|-------|
| All documents | March 2026 | Phase 2 |

Documents will be updated at the end of each phase.
