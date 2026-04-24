# Frontend Architecture: The Sanctuary

The frontend is built with **Next.js 15+** and provides a secure, reactive interface for authentication. It utilizes a proxy-based approach where all requests go through internal Next.js API routes to handle secure `httpOnly` cookies.

## 📁 Key Files
1. `apps/web-portal/middleware.ts` (The Dharma Protector)
2. `apps/web-portal/features/auth/hooks/useAuth.ts` (Identity Hook)
3. `apps/web-portal/app/api/auth/*` (Cookie Orchestrators)
4. `apps/web-portal/features/auth/components/*` (UI Form Components)

---

## 1. The Dharma Protector (Middleware)
**File Path**: `apps/web-portal/middleware.ts`
**Responsibility**: Signature verification and silent session refreshing.

```typescript
// [Key Logic]
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('vedic_token')?.value
  
  if (isProtectedRoute && !token) {
    // Attempt SILENT REFRESH if refresh token exists
    const refreshToken = request.cookies.get('vedic_refresh')?.value
    if (refreshToken) {
      const res = await fetch('/api/auth/refresh', { method: 'POST' })
      if (res.ok) return NextResponse.next()
    }
    return NextResponse.redirect('/auth/login')
  }
}
```

## 2. The Identity Hook (useAuth)
**File Path**: `apps/web-portal/features/auth/hooks/useAuth.ts`
**Responsibility**: Centralizing authentication state and actions.

```typescript
export function useAuth() {
  const [user, setUser] = useState(null)
  
  const login = async (credentials) => {
    const res = await fetch('/api/auth/login', { ... })
    if (res.ok) {
      const data = await res.json()
      setUser(data.user)
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }
}
```

## 3. Cookie Management (The Bridge)
**File Path**: `apps/web-portal/app/api/auth/login/route.ts`
**Responsibility**: Setting the secure cookies on the client browser.

```typescript
export async function POST(request: Request) {
  const response = await fetch(GATEWAY_URL + '/auth/login', { ... })
  const data = await response.json()
  
  if (response.ok) {
    const cookieStore = await cookies()
    cookieStore.set('vedic_token', data.accessToken, { httpOnly: true, secure: true })
    cookieStore.set('vedic_refresh', data.refreshToken, { httpOnly: true, secure: true })
  }
}
```

---

## 🏗️ Window Connectivity (Navigation Flow)
The application ensures a logical, spiritual progression:
1. **Signup Page** (`/auth/signup`) -> Redirects to **Verify Page** (`/auth/verify-email`).
2. **Verification Link** -> Redirects to **Login Page** (`/auth/login`).
3. **Login Page** -> Redirects to **Dashboard** (`/dashboard`).
4. **Middleware** -> Prevents "Flash of Unauthenticated Content" by redirecting before the page renders.
