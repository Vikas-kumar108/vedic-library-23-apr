import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/api'

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get('vedic_token')?.value

  if (token) {
    try {
      await apiFetch('/auth/logout', {
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
