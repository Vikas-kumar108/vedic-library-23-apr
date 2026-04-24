# Deployment Guide

Complete guide for deploying VedicSkills Donation System to production.

---

## Deployment Options

| Platform | Difficulty | Cost | Recommended For |
|----------|------------|------|-----------------|
| **Vercel** | Easy | Free-$20/mo | Best choice, built for Next.js |
| **Netlify** | Easy | Free-$19/mo | Alternative to Vercel |
| **Railway** | Medium | $5+/mo | Full control with simplicity |
| **DigitalOcean** | Medium | $5+/mo | VPS with more control |
| **AWS** | Hard | Variable | Enterprise scale |

---

## Option 1: Vercel Deployment (Recommended)

### Step 1: Prepare Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/vedicskills-donations.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Next.js settings

### Step 3: Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app
RESEND_API_KEY=re_xxxxx
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site is live at `your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your domain (e.g., `donate.vedicskills.org`)
3. Update DNS records as instructed
4. SSL is automatic

### Step 6: Update NEXTAUTH_URL

After adding custom domain, update:
```
NEXTAUTH_URL=https://donate.vedicskills.org
```

---

## Option 2: Self-Hosted (VPS)

### Requirements
- Ubuntu 20.04+ server
- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### Step 2: Clone and Build

```bash
# Clone repository
git clone https://github.com/yourusername/vedicskills-donations.git
cd vedicskills-donations

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
nano .env.local  # Edit with your values

# Build for production
npm run build
```

### Step 3: Configure PM2

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'vedicskills',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Start the application:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Auto-start on reboot
```

### Step 4: Configure Nginx

Create `/etc/nginx/sites-available/vedicskills`:
```nginx
server {
    listen 80;
    server_name donate.vedicskills.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and start:
```bash
sudo ln -s /etc/nginx/sites-available/vedicskills /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d donate.vedicskills.org

# Auto-renewal is configured automatically
```

---

## Pre-Deployment Checklist

### Security
- [ ] Generate strong NEXTAUTH_SECRET (32+ characters)
- [ ] Use production MongoDB URI (not test cluster)
- [ ] Use Razorpay Live keys (not Test keys)
- [ ] Remove or protect `/api/admin/seed` endpoint
- [ ] Remove `/api/debug/status` endpoint
- [ ] Remove `/api/test/email` endpoint

### Configuration
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Configure FROM_EMAIL with verified domain in Resend
- [ ] Set up Razorpay webhook URL in dashboard
- [ ] Configure proper CORS if needed

### Database
- [ ] Create production MongoDB cluster
- [ ] Enable MongoDB authentication
- [ ] Set up IP whitelist (or allow from anywhere for Vercel)
- [ ] Create database indexes for performance

### Monitoring
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure uptime monitoring
- [ ] Set up backup strategy for MongoDB

---

## Post-Deployment Tasks

### 1. Create Super Admin

```bash
# Option 1: Use seed endpoint (then delete it!)
curl -X POST https://your-domain.com/api/admin/seed

# Option 2: Direct MongoDB update
# In MongoDB Compass or shell:
db.users.updateOne(
  { email: "your-email@domain.com" },
  { $set: { role: "super_admin" } }
)
```

### 2. Test All Features

Follow `TESTING_GUIDE.md` to verify:
- [ ] User registration
- [ ] User login
- [ ] Donation submission (UPI/Bank)
- [ ] Donation submission (Razorpay)
- [ ] Email notifications
- [ ] Admin panel access
- [ ] Donation confirmation
- [ ] Receipt generation
- [ ] Receipt download

### 3. Configure Razorpay Webhooks

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://your-domain.com/api/razorpay/webhook`
3. Select events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
4. Copy webhook secret to environment variables

### 4. Verify Email Delivery

1. Send test email via API
2. Check spam folder
3. If issues, verify domain in Resend dashboard
4. Add SPF, DKIM, DMARC records for better deliverability

---

## Updating Production

### Vercel
Push to main branch - auto deploys.

### Self-Hosted
```bash
cd vedicskills-donations
git pull origin main
npm install
npm run build
pm2 restart vedicskills
```

---

## Rollback

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Self-Hosted
```bash
git log --oneline  # Find previous commit
git checkout <commit-hash>
npm run build
pm2 restart vedicskills
```

---

## Scaling Considerations

### When to Scale
- Response time > 2 seconds
- Error rate > 1%
- Server CPU > 80%
- Memory usage > 80%

### How to Scale

**Vercel**: Automatic scaling included

**Self-Hosted**:
1. Upgrade server (more CPU/RAM)
2. Add load balancer
3. Multiple application instances
4. Database read replicas

### MongoDB Scaling
1. Upgrade cluster tier
2. Enable sharding for large datasets
3. Add read replicas for analytics queries
