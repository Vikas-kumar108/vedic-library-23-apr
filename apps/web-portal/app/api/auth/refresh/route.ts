import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/api'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('vedic_refresh')?.value

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
    }

    const response = await apiFetch('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ token: refreshToken }),
    })

    const data = await response.json()

    if (response.ok && data.accessToken) {
      // Rotate cookies
      cookieStore.set('vedic_token', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      })

      cookieStore.set('vedic_refresh', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Refresh failed' }, { status: 401 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
