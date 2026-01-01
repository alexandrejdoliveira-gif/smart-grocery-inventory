// Receipt Parser - Extracts structured data from OCR text
// Based on: ocr_implementation_plan.md

export interface ParsedReceipt {
    store: string
    date: string
    total: number
    items: Array<{
        name: string
        price: number
        quantity: number
    }>
    paymentMethod?: string
    receiptNumber?: string
}

export function parseReceiptText(text: string): ParsedReceipt {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

    return {
        store: extractStoreName(lines),
        date: extractDate(lines),
        total: extractTotal(lines),
        items: extractItems(lines),
        paymentMethod: extractPaymentMethod(lines),
        receiptNumber: extractReceiptNumber(lines)
    }
}

// ============================================
// STORE NAME EXTRACTION
// ============================================

function extractStoreName(lines: string[]): string {
    // Common US grocery store patterns
    const storePatterns = [
        /^(PUBLIX|WALMART|TARGET|COSTCO|KROGER|WHOLE FOODS)/i,
        /^(TRADER JOE'S|ALDI|SAFEWAY|ALBERTSONS|WEGMANS)/i,
        /^(FOOD LION|GIANT|STOP \& SHOP|HARRIS TEETER)/i,
        /^(SPROUTS|FRESH MARKET|LIDL|WINCO)/i
    ]

    // Check first 10 lines for store name
    for (const line of lines.slice(0, 10)) {
        for (const pattern of storePatterns) {
            const match = line.match(pattern)
            if (match) {
                return normalizeStoreName(match[1])
            }
        }
    }

    // Fallback: use first non-empty line
    return lines[0] || 'Unknown Store'
}

function normalizeStoreName(name: string): string {
    const normalized = name.toUpperCase().trim()

    // Standardize common variations
    const storeMap: Record<string, string> = {
        'TRADER JOE\'S': 'Trader Joe\'s',
        'WHOLE FOODS': 'Whole Foods Market',
        'STOP & SHOP': 'Stop & Shop',
        'HARRIS TEETER': 'Harris Teeter',
        'FRESH MARKET': 'The Fresh Market'
    }

    return storeMap[normalized] || normalized
}

// ============================================
// DATE EXTRACTION
// ============================================

function extractDate(lines: string[]): string {
    const datePatterns = [
        /(\d{1,2}\/\d{1,2}\/\d{2,4})/,  // MM/DD/YYYY or DD/MM/YYYY
        /(\d{1,2}-\d{1,2}-\d{2,4})/,   // MM-DD-YYYY
        /(\d{4}-\d{2}-\d{2})/,         // YYYY-MM-DD
        /(\d{2}\/\d{2}\/\d{4})/        // DD/MM/YYYY
    ]

    for (const line of lines) {
        for (const pattern of datePatterns) {
            const match = line.match(pattern)
            if (match) {
                return normalizeDate(match[1])
            }
        }
    }

    // Fallback to today's date
    return new Date().toISOString().split('T')[0]
}

function normalizeDate(dateStr: string): string {
    // Convert to YYYY-MM-DD format
    const separators = /[\/\-]/
    const parts = dateStr.split(separators)

    if (parts[0].length === 4) {
        // Already YYYY-MM-DD
        return dateStr.replace(/\//g, '-')
    }

    // Assume MM/DD/YYYY (US format)
    let [month, day, year] = parts

    // Handle 2-digit years
    if (year.length === 2) {
        const currentYear = new Date().getFullYear()
        const century = Math.floor(currentYear / 100) * 100
        year = String(century + parseInt(year))
    }

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

// ============================================
// TOTAL EXTRACTION
// ============================================

function extractTotal(lines: string[]): number {
    const totalPatterns = [
        /TOTAL\s*[\$]?\s*([\d,]+\.?\d{0,2})/i,
        /AMOUNT\s*DUE\s*[\$]?\s*([\d,]+\.?\d{0,2})/i,
        /BALANCE\s*[\$]?\s*([\d,]+\.?\d{0,2})/i,
        /GRAND\s*TOTAL\s*[\$]?\s*([\d,]+\.?\d{0,2})/i
    ]

    // Search from bottom up (totals usually at end)
    for (const line of [...lines].reverse()) {
        for (const pattern of totalPatterns) {
            const match = line.match(pattern)
            if (match) {
                const amount = parseFloat(match[1].replace(/,/g, ''))
                // Sanity check: total should be reasonable
                if (amount > 0 && amount < 10000) {
                    return amount
                }
            }
        }
    }

    return 0
}

// ============================================
// ITEMS EXTRACTION
// ============================================

function extractItems(lines: string[]): Array<{ name: string; price: number; quantity: number }> {
    const items: Array<{ name: string; price: number; quantity: number }> = []

    // Pattern: item name followed by price
    // Examples:
    // "ORGANIC BANANAS 3.99"
    // "MILK WHOLE GAL $4.29"
    // "2 X BREAD 5.98"
    const itemPatterns = [
        /^(.+?)\s+[\$]?([\d,]+\.?\d{2})$/,           // Name + Price
        /^(\d+)\s*X\s*(.+?)\s+[\$]?([\d,]+\.?\d{2})$/, // Qty X Name + Price
    ]

    for (const line of lines) {
        // Try quantity pattern first
        let match = line.match(itemPatterns[1])
        if (match) {
            const quantity = parseInt(match[1])
            const name = match[2].trim()
            const price = parseFloat(match[3].replace(/,/g, ''))

            if (isProductLine(name, price)) {
                items.push({
                    name: cleanProductName(name),
                    price: price / quantity, // Unit price
                    quantity
                })
                continue
            }
        }

        // Try simple pattern
        match = line.match(itemPatterns[0])
        if (match) {
            const name = match[1].trim()
            const price = parseFloat(match[2].replace(/,/g, ''))

            if (isProductLine(name, price)) {
                items.push({
                    name: cleanProductName(name),
                    price,
                    quantity: 1
                })
            }
        }
    }

    return items
}

function isProductLine(name: string, price: number): boolean {
    // Filter out common non-product lines
    const excludePatterns = [
        /^(SUBTOTAL|TAX|TOTAL|CHANGE|CASH|CREDIT|DEBIT)/i,
        /^(THANK YOU|VISIT|SAVE|MEMBER|CARD|ACCOUNT)/i,
        /^(BALANCE|TENDER|PAYMENT|REFUND)/i,
        /^(DATE|TIME|STORE|CASHIER|REGISTER)/i
    ]

    for (const pattern of excludePatterns) {
        if (pattern.test(name)) return false
    }

    // Name should have reasonable length
    if (name.length < 2 || name.length > 100) return false

    // Price should be reasonable for grocery items
    return price > 0 && price < 1000
}

function cleanProductName(name: string): string {
    return name
        .replace(/^\d+\s*X?\s*/i, '') // Remove quantity prefix
        .replace(/\s+/g, ' ')         // Normalize spaces
        .replace(/[^\w\s\-\']/g, '')  // Remove special chars except dash and apostrophe
        .trim()
        .toUpperCase()
}

// ============================================
// PAYMENT METHOD EXTRACTION
// ============================================

function extractPaymentMethod(lines: string[]): string | undefined {
    const paymentPatterns = [
        { pattern: /VISA\s*CREDIT/i, method: 'VISA' },
        { pattern: /MASTERCARD/i, method: 'MASTERCARD' },
        { pattern: /AMEX|AMERICAN EXPRESS/i, method: 'AMEX' },
        { pattern: /DISCOVER/i, method: 'DISCOVER' },
        { pattern: /DEBIT/i, method: 'DEBIT' },
        { pattern: /EBT/i, method: 'EBT' },
        { pattern: /CASH/i, method: 'CASH' }
    ]

    for (const line of lines) {
        for (const { pattern, method } of paymentPatterns) {
            if (pattern.test(line)) {
                return method
            }
        }
    }

    return undefined
}

// ============================================
// RECEIPT NUMBER EXTRACTION
// ============================================

function extractReceiptNumber(lines: string[]): string | undefined {
    const receiptPatterns = [
        /(?:RECEIPT|TRANS|TRANSACTION)\s*#?\s*:?\s*(\d+)/i,
        /(?:ORDER|INVOICE)\s*#?\s*:?\s*(\d+)/i,
        /#\s*(\d{4,})/  // Generic number pattern
    ]

    for (const line of lines) {
        for (const pattern of receiptPatterns) {
            const match = line.match(pattern)
            if (match) return match[1]
        }
    }

    return undefined
}

// ============================================
// DUPLICATE DETECTION
// ============================================

export function generateReceiptHash(store: string, date: string, total: number): string {
    const crypto = require('crypto')
    const data = `${store.toLowerCase()}|${date}|${total.toFixed(2)}`
    return crypto.createHash('sha256').update(data).digest('hex')
}

// ============================================
// CONFIDENCE CALCULATION
// ============================================

export function calculateOCRConfidence(textAnnotations: any[]): number {
    if (!textAnnotations || textAnnotations.length === 0) return 0

    // Google Vision returns confidence scores for each word
    // Calculate average confidence
    const confidences = textAnnotations
        .slice(1) // Skip first element (full text)
        .map(annotation => annotation.confidence || 0)
        .filter(c => c > 0)

    if (confidences.length === 0) return 0.5

    const avgConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length
    return avgConfidence
}
