import { NextResponse } from 'next/server'
import { apiFetch } from '@/lib/api'

export async function GET() {
  try {
    const res = await apiFetch('/library/tree', {
      cache: 'no-store',
    })

    const raw = await res.text()

    console.log('--- LIBRARY TREE DEBUG ---')
    console.log('STATUS:', res.status)
    console.log('RAW:', raw)

    if (!res.ok) {
      return NextResponse.json(
        {
          error: 'Gateway Error',
          status: res.status,
          raw,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(JSON.parse(raw))
  } catch (error: any) {
    console.error('Error fetching library tree from gateway:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
