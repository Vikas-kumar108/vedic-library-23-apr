# Data Access Guide

## Where Is Your Data Stored?

All data is stored in **MongoDB Atlas** - a cloud database. Your data is:
- Secure (encrypted at rest and in transit)
- Backed up automatically
- Accessible from anywhere
- Exportable in multiple formats

---

## Data Collections Overview

| Collection | What It Stores | Key Data Points |
|------------|----------------|-----------------|
| `users` | All registered users | name, email, phone, role, address |
| `donations` | All donation records | donor info, amount, status, date, 80G request |
| `receipts` | Generated receipts | receipt number, PDF, issue date |
| `memberships` | Membership enrollments | tier, dates, payment history |

---

## How to Access Your Data

### Method 1: MongoDB Atlas Web Interface (Easiest)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign in with your account
3. Click on your cluster → "Browse Collections"
4. You can view, edit, and export data directly

**Export Options:**
- Click "Export Collection" → Choose JSON or CSV
- Filter data before exporting
- Download directly to your computer

### Method 2: MongoDB Compass (Desktop App)

1. Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Connect using your `MONGODB_URI`
3. Visual interface to browse, query, and export data

### Method 3: Admin Dashboard (Built-in)

Access via `/admin` after logging in as admin/director/super_admin:
- View all donations
- Filter by status, date, amount
- Export functionality (to be added in Phase 3)

### Method 4: API Endpoints (For Developers/Scripts)

```bash
# Get all donations (requires auth)
curl http://localhost:3000/api/donations \
  -H "Cookie: next-auth.session-token=YOUR_SESSION"

# Get stats
curl http://localhost:3000/api/admin/stats

# Get transparency data (public)
curl http://localhost:3000/api/transparency
```

---

## Accessing Data with Python Scripts

### Setup Python Environment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install pymongo pandas python-dotenv
```

### Basic Connection Script

Create `scripts/db_connect.py`:

```python
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))
db = client['vedicskills']  # Your database name

# Access collections
users = db['users']
donations = db['donations']
receipts = db['receipts']
memberships = db['memberships']

print(f"Connected! Found {donations.count_documents({})} donations")
```

### Export All Donations to CSV

Create `scripts/export_donations.py`:

```python
import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

client = MongoClient(os.getenv('MONGODB_URI'))
db = client['vedicskills']

# Fetch all confirmed donations
donations = list(db['donations'].find({'status': 'confirmed'}))

# Convert to DataFrame
df = pd.DataFrame(donations)

# Select columns for report
report_df = df[[
    'donorName', 'donorEmail', 'donorPhone', 
    'amount', 'method', 'createdAt', 'confirmedAt'
]]

# Export to CSV
filename = f"donations_export_{datetime.now().strftime('%Y%m%d')}.csv"
report_df.to_csv(filename, index=False)
print(f"Exported {len(report_df)} donations to {filename}")
```

### Get Donors by Amount Range

```python
# High-value donors (donated > ₹10,000 total)
pipeline = [
    {'$match': {'status': 'confirmed'}},
    {'$group': {
        '_id': '$donorEmail',
        'totalAmount': {'$sum': '$amount'},
        'donorName': {'$first': '$donorName'},
        'donorPhone': {'$first': '$donorPhone'},
        'donationCount': {'$sum': 1}
    }},
    {'$match': {'totalAmount': {'$gte': 10000}}},
    {'$sort': {'totalAmount': -1}}
]

high_value_donors = list(db['donations'].aggregate(pipeline))
```

### Get Donors by Date Range

```python
from datetime import datetime, timedelta

# Donations in last 30 days
thirty_days_ago = datetime.now() - timedelta(days=30)

recent_donations = list(db['donations'].find({
    'status': 'confirmed',
    'confirmedAt': {'$gte': thirty_days_ago}
}))
```

---

## User Segmentation for Communications

### Segment: First-Time Donors

```python
# Users who donated only once
pipeline = [
    {'$match': {'status': 'confirmed'}},
    {'$group': {
        '_id': '$donorEmail',
        'count': {'$sum': 1},
        'name': {'$first': '$donorName'},
        'email': {'$first': '$donorEmail'}
    }},
    {'$match': {'count': 1}}
]
first_time_donors = list(db['donations'].aggregate(pipeline))
```

### Segment: Repeat Donors

```python
# Users who donated more than once
pipeline = [
    {'$match': {'status': 'confirmed'}},
    {'$group': {
        '_id': '$donorEmail',
        'count': {'$sum': 1},
        'totalAmount': {'$sum': '$amount'},
        'name': {'$first': '$donorName'},
        'email': {'$first': '$donorEmail'}
    }},
    {'$match': {'count': {'$gt': 1}}}
]
repeat_donors = list(db['donations'].aggregate(pipeline))
```

### Segment: Members by Tier

```python
# Active Sevak members
sevak_members = list(db['memberships'].find({
    'tier': 'sevak',
    'status': 'active'
}))

# Expiring memberships (within 30 days)
expiring = list(db['memberships'].find({
    'status': 'active',
    'endDate': {
        '$gte': datetime.now(),
        '$lte': datetime.now() + timedelta(days=30)
    }
}))
```

### Segment: By Location (if address available)

```python
# Donors from specific city
delhi_donors = list(db['donations'].find({
    'donorAddress': {'$regex': 'delhi', '$options': 'i'}
}))
```

### Segment: 80G Receipt Requesters

```python
# Donors who requested 80G receipts
tax_receipt_donors = list(db['donations'].find({
    'needs80G': True,
    'status': 'confirmed'
}))
```

---

## Email Automation with Python

### Install Email Dependencies

```bash
pip install resend jinja2
```

### Send Personalized Newsletter

Create `scripts/send_newsletter.py`:

```python
import os
import resend
from pymongo import MongoClient
from dotenv import load_dotenv
from jinja2 import Template

load_dotenv()

resend.api_key = os.getenv('RESEND_API_KEY')
client = MongoClient(os.getenv('MONGODB_URI'))
db = client['vedicskills']

# Email template
newsletter_template = Template('''
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .header { background: #FF9933; color: white; padding: 20px; }
        .content { padding: 20px; }
        .footer { background: #f5f5f5; padding: 15px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>VedicSkills Newsletter</h1>
    </div>
    <div class="content">
        <p>Namaste {{ name }},</p>
        
        <p>Thank you for being a valued supporter of VedicSkills. 
        Your {{ donation_type }} contributions of ₹{{ total_amount }} have helped us 
        reach thousands of students worldwide.</p>
        
        <h2>This Month's Highlights</h2>
        <ul>
            <li>New course on Vedic Mathematics launched</li>
            <li>500+ students completed Sanskrit Basics</li>
            <li>Community event in Delhi - Photos attached</li>
        </ul>
        
        <p>With gratitude,<br>VedicSkills Team</p>
    </div>
    <div class="footer">
        <p>You're receiving this because you donated to VedicSkills.</p>
        <p><a href="#">Unsubscribe</a></p>
    </div>
</body>
</html>
''')

def get_donor_stats(email):
    """Get donation statistics for a donor"""
    pipeline = [
        {'$match': {'donorEmail': email, 'status': 'confirmed'}},
        {'$group': {
            '_id': '$donorEmail',
            'totalAmount': {'$sum': '$amount'},
            'count': {'$sum': 1}
        }}
    ]
    result = list(db['donations'].aggregate(pipeline))
    if result:
        return result[0]
    return {'totalAmount': 0, 'count': 0}

def send_newsletter(donor):
    """Send newsletter to a single donor"""
    stats = get_donor_stats(donor['donorEmail'])
    
    # Determine donation type based on count
    donation_type = "generous" if stats['count'] > 1 else "kind"
    
    html = newsletter_template.render(
        name=donor['donorName'],
        total_amount=f"{stats['totalAmount']:,.0f}",
        donation_type=donation_type
    )
    
    try:
        resend.Emails.send({
            "from": "VedicSkills <newsletter@vedicskills.org>",
            "to": donor['donorEmail'],
            "subject": "VedicSkills Monthly Newsletter - March 2026",
            "html": html
        })
        print(f"Sent to {donor['donorEmail']}")
        return True
    except Exception as e:
        print(f"Failed for {donor['donorEmail']}: {e}")
        return False

# Get all confirmed donors
donors = db['donations'].aggregate([
    {'$match': {'status': 'confirmed'}},
    {'$group': {
        '_id': '$donorEmail',
        'donorName': {'$first': '$donorName'},
        'donorEmail': {'$first': '$donorEmail'}
    }}
])

# Send to all donors
for donor in donors:
    send_newsletter(donor)
```

### Send Birthday Greetings

```python
from datetime import datetime

def send_birthday_greeting(user):
    """Send birthday greeting email"""
    html = f'''
    <div style="text-align: center; padding: 40px;">
        <h1 style="color: #FF9933;">🎂 Happy Birthday, {user['name']}!</h1>
        <p>Wishing you a blessed year ahead filled with wisdom and joy.</p>
        <p>As a token of our appreciation, enjoy <strong>20% off</strong> 
        on any course this month!</p>
        <p>Use code: <strong>BIRTHDAY20</strong></p>
    </div>
    '''
    
    resend.Emails.send({
        "from": "VedicSkills <greetings@vedicskills.org>",
        "to": user['email'],
        "subject": f"🎂 Happy Birthday from VedicSkills!",
        "html": html
    })

# Find users with birthday today (requires dateOfBirth field)
today = datetime.now()
birthday_users = db['users'].find({
    '$expr': {
        '$and': [
            {'$eq': [{'$dayOfMonth': '$dateOfBirth'}, today.day]},
            {'$eq': [{'$month': '$dateOfBirth'}, today.month]}
        ]
    }
})
```

### Send Festival Greetings

```python
def send_festival_greeting(festival_name, message, image_url=None):
    """Send festival greeting to all donors"""
    
    donors = db['donations'].aggregate([
        {'$match': {'status': 'confirmed'}},
        {'$group': {'_id': '$donorEmail', 'name': {'$first': '$donorName'}}}
    ])
    
    for donor in donors:
        html = f'''
        <div style="text-align: center; padding: 40px; background: #FFF5E6;">
            <h1 style="color: #FF9933;">🙏 {festival_name} Greetings!</h1>
            {"<img src='" + image_url + "' style='max-width: 400px;'/>" if image_url else ""}
            <p>Dear {donor['name']},</p>
            <p>{message}</p>
            <p>With warm regards,<br>VedicSkills Family</p>
        </div>
        '''
        
        resend.Emails.send({
            "from": "VedicSkills <greetings@vedicskills.org>",
            "to": donor['_id'],
            "subject": f"🙏 {festival_name} Greetings from VedicSkills",
            "html": html
        })

# Example: Diwali greetings
send_festival_greeting(
    "Diwali",
    "May the festival of lights bring wisdom, prosperity, and happiness to you and your family.",
    "https://example.com/diwali-image.jpg"
)
```

---

## Generate PDF Reports with Python

### Install PDF Dependencies

```bash
pip install reportlab fpdf2
```

### Monthly Donation Report

Create `scripts/generate_monthly_report.py`:

```python
from fpdf import FPDF
from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv('MONGODB_URI'))
db = client['vedicskills']

class DonationReport(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 16)
        self.set_text_color(255, 153, 51)  # Saffron
        self.cell(0, 10, 'VedicSkills Donation Report', 0, 1, 'C')
        self.ln(5)
    
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_monthly_report(year, month):
    """Generate PDF report for a specific month"""
    
    # Date range
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year + 1, 1, 1)
    else:
        end_date = datetime(year, month + 1, 1)
    
    # Fetch data
    donations = list(db['donations'].find({
        'status': 'confirmed',
        'confirmedAt': {'$gte': start_date, '$lt': end_date}
    }))
    
    # Calculate stats
    total_amount = sum(d['amount'] for d in donations)
    total_count = len(donations)
    avg_amount = total_amount / total_count if total_count > 0 else 0
    
    # Payment method breakdown
    method_breakdown = {}
    for d in donations:
        method = d.get('method', 'Unknown')
        method_breakdown[method] = method_breakdown.get(method, 0) + d['amount']
    
    # Create PDF
    pdf = DonationReport()
    pdf.add_page()
    
    # Report title
    pdf.set_font('Arial', 'B', 14)
    month_name = start_date.strftime('%B %Y')
    pdf.cell(0, 10, f'Monthly Report - {month_name}', 0, 1)
    pdf.ln(5)
    
    # Summary stats
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 8, 'Summary Statistics', 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.cell(0, 6, f'Total Donations: {total_count}', 0, 1)
    pdf.cell(0, 6, f'Total Amount: Rs. {total_amount:,.2f}', 0, 1)
    pdf.cell(0, 6, f'Average Donation: Rs. {avg_amount:,.2f}', 0, 1)
    pdf.ln(5)
    
    # Payment method breakdown
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 8, 'Payment Method Breakdown', 0, 1)
    pdf.set_font('Arial', '', 11)
    for method, amount in method_breakdown.items():
        pdf.cell(0, 6, f'{method}: Rs. {amount:,.2f}', 0, 1)
    pdf.ln(5)
    
    # Top donors
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 8, 'Top 10 Donors', 0, 1)
    pdf.set_font('Arial', '', 10)
    
    top_donors = sorted(donations, key=lambda x: x['amount'], reverse=True)[:10]
    for i, donor in enumerate(top_donors, 1):
        pdf.cell(0, 5, f"{i}. {donor['donorName']} - Rs. {donor['amount']:,.2f}", 0, 1)
    
    # Save
    filename = f"donation_report_{year}_{month:02d}.pdf"
    pdf.output(filename)
    print(f"Report saved: {filename}")
    return filename

# Generate report for current month
today = datetime.now()
generate_monthly_report(today.year, today.month)
```

### Donor Certificate PDF

```python
def generate_donor_certificate(donor_email, year):
    """Generate annual donor appreciation certificate"""
    
    # Get donor's total contribution for the year
    pipeline = [
        {
            '$match': {
                'donorEmail': donor_email,
                'status': 'confirmed',
                'confirmedAt': {
                    '$gte': datetime(year, 1, 1),
                    '$lt': datetime(year + 1, 1, 1)
                }
            }
        },
        {
            '$group': {
                '_id': '$donorEmail',
                'name': {'$first': '$donorName'},
                'totalAmount': {'$sum': '$amount'},
                'count': {'$sum': 1}
            }
        }
    ]
    
    result = list(db['donations'].aggregate(pipeline))
    if not result:
        print(f"No donations found for {donor_email} in {year}")
        return None
    
    donor = result[0]
    
    pdf = FPDF('L', 'mm', 'A4')  # Landscape
    pdf.add_page()
    
    # Border
    pdf.set_draw_color(255, 153, 51)
    pdf.set_line_width(3)
    pdf.rect(10, 10, 277, 190)
    
    # Title
    pdf.set_font('Arial', 'B', 28)
    pdf.set_text_color(255, 153, 51)
    pdf.set_y(40)
    pdf.cell(0, 15, 'Certificate of Appreciation', 0, 1, 'C')
    
    # Content
    pdf.set_font('Arial', '', 16)
    pdf.set_text_color(0, 0, 0)
    pdf.set_y(70)
    pdf.cell(0, 10, 'This is to certify that', 0, 1, 'C')
    
    pdf.set_font('Arial', 'B', 24)
    pdf.set_text_color(139, 69, 19)
    pdf.cell(0, 15, donor['name'], 0, 1, 'C')
    
    pdf.set_font('Arial', '', 14)
    pdf.set_text_color(0, 0, 0)
    pdf.multi_cell(0, 8, f'''
has generously contributed Rs. {donor['totalAmount']:,.2f} through {donor['count']} donation(s)
to VedicSkills during the year {year}, supporting our mission to spread Vedic wisdom globally.
    ''', 0, 'C')
    
    pdf.set_y(140)
    pdf.cell(0, 8, 'We express our heartfelt gratitude for your continued support.', 0, 1, 'C')
    
    # Date and signature
    pdf.set_y(170)
    pdf.set_font('Arial', 'I', 12)
    pdf.cell(140, 8, f'Issued on: {datetime.now().strftime("%B %d, %Y")}', 0, 0, 'L')
    pdf.cell(0, 8, 'Director, VedicSkills', 0, 1, 'R')
    
    filename = f"certificate_{donor['name'].replace(' ', '_')}_{year}.pdf"
    pdf.output(filename)
    print(f"Certificate saved: {filename}")
    return filename
```

---

## Scheduled Automation

### Using Cron (Linux/Mac)

```bash
# Edit crontab
crontab -e

# Add these lines:

# Send monthly newsletter on 1st of every month at 10 AM
0 10 1 * * cd /path/to/project && python scripts/send_newsletter.py

# Generate monthly report on last day of month
0 23 28-31 * * [ "$(date +\%d -d tomorrow)" = "01" ] && cd /path/to/project && python scripts/generate_monthly_report.py

# Check birthdays daily at 9 AM
0 9 * * * cd /path/to/project && python scripts/send_birthday_greetings.py
```

### Using Vercel Cron (Production)

Create `app/api/cron/newsletter/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5 minutes

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Your newsletter logic here
  // ...
  
  return NextResponse.json({ success: true })
}
```

Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/newsletter",
      "schedule": "0 10 1 * *"
    }
  ]
}
```

---

## Data Backup Best Practices

### Automatic Backup (MongoDB Atlas)

MongoDB Atlas includes automatic daily backups. To restore:
1. Go to Atlas → Cluster → Backup
2. Choose a snapshot
3. Click "Restore"

### Manual Export

```bash
# Export entire database
mongodump --uri="your_mongodb_uri" --out=./backup_$(date +%Y%m%d)

# Export specific collection
mongoexport --uri="your_mongodb_uri" --collection=donations --out=donations.json
```

### Python Backup Script

```python
import subprocess
from datetime import datetime
import os

def backup_database():
    backup_dir = f"backups/backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    os.makedirs(backup_dir, exist_ok=True)
    
    subprocess.run([
        'mongodump',
        f'--uri={os.getenv("MONGODB_URI")}',
        f'--out={backup_dir}'
    ])
    
    print(f"Backup created: {backup_dir}")

backup_database()
```

---

## Summary

| Task | Method | Difficulty |
|------|--------|------------|
| View data | MongoDB Atlas UI | Easy |
| Export CSV | Python + pandas | Easy |
| Send emails | Python + Resend | Medium |
| Generate PDFs | Python + fpdf2 | Medium |
| Automated tasks | Cron / Vercel Cron | Medium |
| Complex reports | Python + MongoDB aggregation | Advanced |

All scripts should be placed in the `scripts/` folder and can be run independently of the web application.
