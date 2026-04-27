# DEPLOYMENT STRATEGY

## Platform
Vercel

## Build Strategy
- Root: repository root
- Build command:
  cd frontend && npm install && npm run build
- Output:
  frontend/.next

## Runtime
Server-side rendering enabled.

## Data Access
File-system based.
Data directory exists at repo root.

Loader resolves root dynamically to support:
- Local dev (frontend cwd)
- Production (repo root cwd)

## Future
Supabase will be added for:
- User preferences
- Bookmarking
- Notes
- Authentication
