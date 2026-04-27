import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/api'
import { User } from '@dharma/contracts'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('vedic_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error, status } = await apiFetch<User>('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (error) {
      return NextResponse.json({ error }, { status })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
