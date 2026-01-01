import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('receipt') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
        }

        // Convert to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Optimize image with sharp
        const optimizedImage = await sharp(buffer)
            .resize(2000, 2000, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality: 90,
                progressive: true
            })
            .toBuffer()

        // Generate unique ID
        const receiptId = crypto.randomUUID()
        const imageHash = crypto.createHash('sha256').update(optimizedImage).digest('hex')

        // Convert to base64 for OCR processing
        const base64Image = optimizedImage.toString('base64')

        return NextResponse.json({
            success: true,
            receiptId,
            imageHash,
            imageData: base64Image,
            size: optimizedImage.length,
            originalSize: buffer.length,
            compressionRatio: ((1 - optimizedImage.length / buffer.length) * 100).toFixed(2) + '%'
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({
            error: 'Upload failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
