import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Verse, Commentary, LanguageKey } from '@/lib/types'
import { apiFetch } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Missing verse ID' }, { status: 400 })
  }

  try {
    const authHeader = request.headers.get('authorization')
    
    const res = await apiFetch(`/library/verse/${id}`, { 
      cache: 'no-store',
      headers: authHeader ? { 'Authorization': authHeader } : {}
    })
    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Gateway Error' }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching verse from gateway:', error)
    return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 })
  }
}
