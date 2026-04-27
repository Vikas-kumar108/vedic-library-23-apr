# VEDIC LIBRARY – INFRASTRUCTURE RECORD v1

Status: Production Active  
Primary URL: https://library.vedicskills.com  
Platform: Vercel  
DNS: Hostinger  
Registrar: GoDaddy  

---

## Hosting Architecture

Layer 1 – Domain Registrar  
GoDaddy  
Domain ownership maintained externally.

Layer 2 – DNS Manager  
Hostinger  
DNS records configured here.

Layer 3 – Hosting Platform  
Vercel  
Next.js server runtime (NOT static export)

Layer 4 – Application
Repository: vedic-library-v1.0  
App location: /frontend  
Data location: /data  

---

## DNS Configuration

Subdomain: library.vedicskills.com  
Type: CNAME  
Target: <vercel-assigned-dns>  
SSL: Automatically provisioned by Vercel  

---

## Runtime Model

- Server-side rendering enabled
- File system access required
- Canonical spine loaded dynamically
- No static export
- No edge-only mode

---

## Repository Structure Snapshot

Root
├── data
├── backend
├── frontend
├── docs_src

Frontend:
- Next.js App Router
- Atomic component system
- Scripture engine in /features/scripture
- Canonical + derivative separation

---

## Stability Decisions Locked

- UID globally unique across corpus
- Canonical spine immutable
- Derivatives attach as layers
- Mode system presentation-only
- Server deployment only (no static)

---

## Next Infrastructure Phase

- Supabase integration
- Authentication
- Bookmark persistence
- User notes
- Donation system
