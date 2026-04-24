import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get('vedic_token')?.value

  if (token) {
    try {
      await fetch(`${process.env.API_GATEWAY_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444'}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (err) {
      console.error('Gateway logout notification failed', err)
    }
  }

  cookieStore.delete('vedic_token')
  cookieStore.delete('vedic_refresh')
  
  return NextResponse.json({ message: 'Logged out successfully' })
}
