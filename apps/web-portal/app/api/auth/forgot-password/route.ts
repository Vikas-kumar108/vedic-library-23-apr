import { NextResponse } from 'next/server'
import { apiFetch } from '@/lib/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error('Forgot Password Route Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
