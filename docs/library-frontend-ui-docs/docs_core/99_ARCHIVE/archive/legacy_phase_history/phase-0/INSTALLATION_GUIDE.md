# 🛠 Installation Guide – Vedic Library

This document lists **all required software** to begin work on the **Vedic Library** project.

Follow the steps **in order**.  
Do not skip steps.  
Do not install extra tools unless mentioned here.

This guide assumes:
- You are starting fresh
- You are a beginner
- You want long-term stability, not shortcuts

---

## 0. Basic Understanding (Please Read Once)

The Vedic Library project has **two main worlds**:

1. **Frontend world**
   - Next.js
   - React
   - Runs with Node.js

2. **Backend / Data world**
   - Python
   - JSON processing
   - AI translation
   - FastAPI (later)

These worlds are **separate but cooperative**.

---

## 1. Operating System Requirements

Supported:
- Windows 10 / 11
- macOS
- Linux (Ubuntu recommended)

Ensure:
- At least 8 GB RAM (recommended)
- Stable internet connection

---

## 2. Install Node.js (Mandatory)

### Why Node.js?
- Required to run **Next.js**
- Required to use **React**
- Required for frontend development

### What to Install
- **Node.js LTS (Long Term Support)**

### Steps
1. Visit: https://nodejs.org
2. Download **LTS version**
3. Run installer
4. Accept all default options

### Important (Windows)
✔ Ensure **“Add Node.js to PATH”** is checked

### Verify Installation
Open terminal / command prompt and run:

```bash
node -v
npm -v
You should see version numbers.

3. Install Git (Mandatory)
Why Git?
Version control

GitHub integration

Safe history of your work

Steps
Visit: https://git-scm.com

Download Git

Install with default options

Verify
bash
Copy code
git --version
4. Create GitHub Account (Mandatory)
Why GitHub?
Code backup

Collaboration

Publishing (later)

Steps
Visit: https://github.com

Create a free account

Remember your username and email

No repositories needed yet.

5. Install Python (Mandatory)
Why Python?
JSON normalization

UID generation

AI translation (Gemini APIs)

Backend logic (FastAPI later)

Version Required
Python 3.10 or higher

Steps
Visit: https://www.python.org

Download latest Python 3.x

Run installer

CRITICAL (Windows Only)
✔ Check “Add Python to PATH”

Verify
bash
Copy code
python --version
or

bash
Copy code
python3 --version
6. Install VS Code (Strongly Recommended)
Why VS Code?
Clean interface

Excellent support for JS & Python

Extensions ecosystem

Steps
Visit: https://code.visualstudio.com

Download and install

Recommended Extensions (Install Later)
Python

ES7+ React Snippets

Prettier (optional)

Do not install extensions yet if you feel overwhelmed.

7. Install a Web Browser
Recommended:

Google Chrome

Mozilla Firefox

Used for:

Viewing Next.js app

Debugging UI

8. Folder Creation (Very Important)
Root Folder
Create this folder manually:

text
Copy code
P Publications/
└── vedic-library/
This is your project root.

9. Initial Project Folder Structure
Inside vedic-library/, create:

text
Copy code
vedic-library/
├── docs/
├── data/
├── frontend/
├── backend/
├── scripts/
└── README.md
Do NOT create any Next.js or Python apps yet.

10. What You Should NOT Install Now
❌ Docker
❌ PostgreSQL
❌ Supabase CLI
❌ Firebase SDK
❌ Cloud services
❌ Vercel CLI

These will be introduced only when needed.

11. Optional but Helpful Tools (Later)
Install only when instructed:

Postman (API testing)

pgAdmin (PostgreSQL UI)
