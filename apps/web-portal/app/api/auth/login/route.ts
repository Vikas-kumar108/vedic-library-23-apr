import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('🌉 BRIDGE: ATTEMPTING GATEWAY LOGIN', { url: 'http://localhost:4444/auth/login', bodySize: JSON.stringify(body).length })
    const response = await fetch(`http://localhost:4444/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    console.log('🌉 BRIDGE: GATEWAY RESPONSE', { status: response.status, data: JSON.stringify(data).substring(0, 50) })

    if (response.ok && data.accessToken) {
      const cookieStore = await cookies()
      
      // Access Token (15 min)
      cookieStore.set('vedic_token', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60, 
      })

      // Refresh Token (7 days)
      cookieStore.set('vedic_refresh', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      })

      // Remove tokens from client response
      const { accessToken, refreshToken, ...user } = data
      return NextResponse.json(user, { status: 200 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error('Login Route Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
