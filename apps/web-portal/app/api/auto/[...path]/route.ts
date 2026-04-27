import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/api'

/**
 * 🛰️ Institutional Auto-Route Proxy
 * Responsibility: Securely proxy requests to the API Gateway's auto-CRUD layer.
 */
export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  return handleProxy(request, params, 'GET')
}

export async function POST(request: Request, { params }: { params: { path: string[] } }) {
  return handleProxy(request, params, 'POST')
}

export async function PATCH(request: Request, { params }: { params: { path: string[] } }) {
  return handleProxy(request, params, 'PATCH')
}

export async function DELETE(request: Request, { params }: { params: { path: string[] } }) {
  return handleProxy(request, params, 'DELETE')
}

async function handleProxy(request: Request, params: { path: string[] }, method: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('vedic_token')?.value
    
    // Construct the gateway path
    const gatewayPath = `/v1/auto/${params.path.join('/')}`
    
    // Get search params from request URL
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const finalPath = queryString ? `${gatewayPath}?${queryString}` : gatewayPath

    const options: RequestInit = {
      method,
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    }

    if (['POST', 'PATCH'].includes(method)) {
      options.body = JSON.stringify(await request.json())
    }

    const { data, error, status } = await apiFetch(finalPath, options)

    if (error) {
      return NextResponse.json({ error }, { status })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
