import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TreeNode } from '@/lib/types'

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444'
    const res = await fetch(`${apiUrl}/library/tree`, { cache: 'no-store' })
    const data = await res.json()
    
    if (!res.ok) throw new Error(data.error || 'Gateway Error')

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching library tree from gateway:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

