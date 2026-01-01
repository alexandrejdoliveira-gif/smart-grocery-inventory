import { NextRequest, NextResponse } from 'next/server'
import vision from '@google-cloud/vision'
import { parseReceiptText, calculateOCRConfidence, generateReceiptHash } from '@/lib/receipt-parser'

// Initialize Vision client
// Note: Credentials will be loaded from environment variables
let client: vision.ImageAnnotatorClient | null = null

function getVisionClient() {
    if (client) return client

    try {
        // For Vercel deployment: use base64 encoded credentials
        if (process.env.GOOGLE_CREDENTIALS_BASE64) {
            const credentials = JSON.parse(
                Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString()
            )
            client = new vision.ImageAnnotatorClient({ credentials })
        }
        // For local development: use credentials file
        else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            client = new vision.ImageAnnotatorClient()
        }
        else {
            throw new Error('Google Cloud credentials not configured')
        }

        return client
    } catch (error) {
        console.error('Vision client initialization error:', error)
        throw error
    }
}

export async function POST(request: NextRequest) {
    try {
        const { imageData, receiptId } = await request.json()

        if (!imageData) {
            return NextResponse.json({ error: 'No image data provided' }, { status: 400 })
        }

        // Get Vision client
        const visionClient = getVisionClient()

        // Perform OCR with text detection
        const [result] = await visionClient.textDetection({
            image: { content: imageData }
        })

        const textAnnotations = result.textAnnotations || []

        if (textAnnotations.length === 0) {
            return NextResponse.json({
                error: 'No text detected in image',
                suggestion: 'Please ensure the receipt is clearly visible and well-lit'
            }, { status: 400 })
        }

        // Full text is in first annotation
        const fullText = textAnnotations[0]?.description || ''

        // Parse receipt data
        const parsedData = parseReceiptText(fullText)

        // Calculate OCR confidence
        const ocrConfidence = calculateOCRConfidence(textAnnotations)

        // Generate hash for duplicate detection
        const receiptHash = generateReceiptHash(
            parsedData.store,
            parsedData.date,
            parsedData.total
        )

        return NextResponse.json({
            success: true,
            receiptId,
            receiptHash,
            rawText: fullText,
            parsed: parsedData,
            ocrConfidence,
            itemsCount: parsedData.items.length,
            metadata: {
                detectedLanguage: result.textAnnotations?.[0]?.locale || 'en',
                processingTime: Date.now()
            }
        })
    } catch (error) {
        console.error('OCR processing error:', error)

        // Check if it's a credentials error
        if (error instanceof Error && error.message.includes('credentials')) {
            return NextResponse.json({
                error: 'OCR service not configured',
                details: 'Google Cloud Vision API credentials are missing. Please configure GOOGLE_CREDENTIALS_BASE64 environment variable.'
            }, { status: 503 })
        }

        return NextResponse.json({
            error: 'OCR processing failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
