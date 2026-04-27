import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * 🛰️ tRPC Gateway Proxy
 * Responsibility: Forward tRPC requests to the API Gateway with institutional credentials.
 */
export async function GET(request: Request) {
  return handleProxy(request)
}

export async function POST(request: Request) {
  return handleProxy(request)
}

async function handleProxy(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('vedic_token')?.value
    const baseUrl = process.env.API_GATEWAY_URL || 'http://localhost:4444'
    
    const url = new URL(request.url)
    const gatewayUrl = `${baseUrl}/trpc${url.pathname.replace('/api/trpc', '')}${url.search}`

    const options: RequestInit = {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    }

    if (request.method === 'POST') {
      options.body = await request.text()
    }

    const response = await fetch(gatewayUrl, options)
    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
