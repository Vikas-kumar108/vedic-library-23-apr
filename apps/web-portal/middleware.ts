import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'vedic-secret-key-108'

/**
 * Middleware: The "Dharma Protector"
 * Responsibility: Guard the sacred routes and ensure identity integrity.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('vedic_token')?.value
  const { pathname } = request.nextUrl

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/profile') ||
                          pathname.startsWith('/library') ||
                          pathname.startsWith('/institutional')

  // Define auth routes (where logged-in users shouldn't go)
  const isAuthRoute = pathname.startsWith('/auth/login') || 
                     pathname.startsWith('/auth/signup')

  if (isProtectedRoute) {
    if (!token) {
      // 1. Attempt silent refresh if refresh token exists
      const refreshToken = request.cookies.get('vedic_refresh')?.value
      if (refreshToken) {
        try {
          // Internal call to our own refresh route
          const refreshRes = await fetch(new URL('/api/auth/refresh', request.url), { method: 'POST' })
          if (refreshRes.ok) {
            return NextResponse.next()
          }
        } catch (err) {
          console.error('Silent refresh failed in middleware', err)
        }
      }

      const url = new URL('/auth/login', request.url)
      url.searchParams.set('callbackUrl', encodeURI(pathname))
      return NextResponse.redirect(url)
    }

    try {
      // Robust verification for Edge Runtime
      const secret = new TextEncoder().encode(JWT_SECRET)
      await jwtVerify(token, secret)
    } catch (err) {
      // Token is invalid or expired - try refresh here too
      const refreshToken = request.cookies.get('vedic_refresh')?.value
      if (refreshToken) {
        try {
          const refreshRes = await fetch(new URL('/api/auth/refresh', request.url), { method: 'POST' })
          if (refreshRes.ok) {
            return NextResponse.next()
          }
        } catch (rerr) {
          // Refresh failed
        }
      }

      const response = NextResponse.redirect(new URL('/auth/login', request.url))
      response.cookies.delete('vedic_token')
      return response
    }
  }

  if (isAuthRoute && token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET)
      await jwtVerify(token, secret)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (err) {
      // Token is invalid, let them stay on login
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/library/:path*',
    '/institutional/:path*',
    '/auth/login',
    '/auth/signup',
  ],
}
