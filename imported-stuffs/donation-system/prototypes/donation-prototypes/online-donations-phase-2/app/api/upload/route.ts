import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const donationId = formData.get('donationId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and PDFs are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const userId = session?.user?.id || 'anonymous'
    const extension = file.name.split('.').pop()
    const filename = `payment-screenshots/${userId}/${donationId || 'temp'}_${timestamp}.${extension}`

    // Upload to Vercel Blob (private storage)
    const blob = await put(filename, file, {
      access: 'private',
    })

    return NextResponse.json({
      success: true,
      pathname: blob.pathname,
      downloadUrl: blob.downloadUrl,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
