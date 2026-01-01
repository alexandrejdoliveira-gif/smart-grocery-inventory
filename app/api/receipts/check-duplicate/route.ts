import { NextRequest, NextResponse } from 'next/server'

// Mock database for now - will be replaced with Supabase
const mockScannedReceipts = [
    {
        id: '1',
        hash: 'abc123',
        store: 'Costco',
        date: '2024-12-29',
        total: 45.67,
        scannedAt: '2024-12-29T10:30:00Z',
        userId: 'user1'
    }
]

export async function POST(request: NextRequest) {
    try {
        const { receiptHash, store, date, total } = await request.json()

        if (!receiptHash) {
            return NextResponse.json({ error: 'Receipt hash required' }, { status: 400 })
        }

        // Check for exact hash match
        const exactMatch = mockScannedReceipts.find(r => r.hash === receiptHash)

        if (exactMatch) {
            return NextResponse.json({
                isDuplicate: true,
                matchType: 'exact',
                existingReceipt: {
                    id: exactMatch.id,
                    store: exactMatch.store,
                    date: exactMatch.date,
                    total: exactMatch.total,
                    scannedAt: exactMatch.scannedAt
                },
                message: 'This exact receipt has already been scanned'
            })
        }

        // Check for similar receipts (same store, date, and similar total)
        const similarMatches = mockScannedReceipts.filter(r =>
            r.store.toLowerCase() === store.toLowerCase() &&
            r.date === date &&
            Math.abs(r.total - total) < 0.50 // Within 50 cents
        )

        if (similarMatches.length > 0) {
            return NextResponse.json({
                isDuplicate: true,
                matchType: 'similar',
                existingReceipt: {
                    id: similarMatches[0].id,
                    store: similarMatches[0].store,
                    date: similarMatches[0].date,
                    total: similarMatches[0].total,
                    scannedAt: similarMatches[0].scannedAt
                },
                message: 'A very similar receipt was found',
                confidence: 0.85
            })
        }

        // No duplicate found
        return NextResponse.json({
            isDuplicate: false,
            message: 'No duplicate detected'
        })

    } catch (error) {
        console.error('Duplicate check error:', error)
        return NextResponse.json({
            error: 'Duplicate check failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

// Helper function for future database integration
async function checkDatabaseForDuplicate(hash: string, userId: string) {
    // TODO: Implement Supabase query
    // const { data, error } = await supabase
    //   .from('receipts')
    //   .select('*')
    //   .eq('hash', hash)
    //   .eq('user_id', userId)
    //   .single()

    return null
}
