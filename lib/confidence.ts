// Confidence Scoring System
// Based on: confidence-system.md

export type DataSource = {
    type: 'validated_receipt' | 'manual_entry' | 'partial_ocr'
}

export type Product = {
    id: string
    name: string
    normalized?: string
    store: string
    date: string
    price: number
    quantity: number
    purchases?: number // Historical purchase count
}

export type ConfidenceBadge = {
    type: 'HIGH' | 'MEDIUM' | 'LOW'
    label: string
    icon: string
    color: string
}

// ============================================
// 1️⃣ MATCH SCORE (peso alto)
// ============================================

/**
 * Normalizes product name for matching
 * Removes brand names, sizes, and common variations
 */
export function normalizeProductName(name: string): string {
    return name
        .toLowerCase()
        .replace(/\b(oz|lb|kg|g|ml|l)\b/gi, '') // Remove units
        .replace(/\b\d+(\.\d+)?\b/g, '') // Remove numbers
        .replace(/[^a-z\s]/g, '') // Remove special chars
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim()
}

/**
 * Calculate semantic similarity between two product names
 * Simple token-based similarity (in production, use embeddings)
 */
function calculateSemanticSimilarity(name1: string, name2: string): number {
    const tokens1 = new Set(normalizeProductName(name1).split(' '))
    const tokens2 = new Set(normalizeProductName(name2).split(' '))

    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)))
    const union = new Set([...tokens1, ...tokens2])

    return intersection.size / union.size // Jaccard similarity
}

/**
 * Check if product name is too generic
 */
function isGenericName(name: string): boolean {
    const genericTerms = ['milk', 'bread', 'eggs', 'water', 'juice']
    const normalized = normalizeProductName(name)
    return genericTerms.some(term => normalized === term)
}

/**
 * Calculate match score based on name similarity and history
 */
export function calculateMatchScore(item: Product, history: Product[]): number {
    const normalized = normalizeProductName(item.name)

    // Check for exact normalized match with strong history
    const historicalMatch = history.find(h =>
        normalizeProductName(h.name) === normalized && (h.purchases || 0) > 3
    )

    if (historicalMatch) {
        return 0.40 // Strong match
    }

    // Check semantic similarity
    const similarities = history.map(h =>
        calculateSemanticSimilarity(item.name, h.name)
    )
    const maxSimilarity = Math.max(...similarities, 0)

    if (maxSimilarity > 0.7) {
        return 0.20 // Medium match
    }

    // Penalize generic names
    if (isGenericName(item.name)) {
        return -0.20
    }

    return 0.0
}

// ============================================
// 2️⃣ TIME SCORE (continuidade temporal)
// ============================================

/**
 * Calculate days between two dates
 */
function daysBetween(date1: string, date2: string): number {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Calculate average interval between purchases
 */
function calculateAverageInterval(history: Product[]): number {
    if (history.length < 2) return 30 // Default to 30 days

    const intervals: number[] = []
    for (let i = 1; i < history.length; i++) {
        intervals.push(daysBetween(history[i - 1].date, history[i].date))
    }

    return intervals.reduce((a, b) => a + b, 0) / intervals.length
}

/**
 * Calculate time score based on purchase patterns
 */
export function calculateTimeScore(item: Product, history: Product[]): number {
    if (history.length === 0) return 0.0

    const lastPurchase = history[0]
    const daysSinceLastPurchase = daysBetween(lastPurchase.date, item.date)
    const expectedInterval = calculateAverageInterval(history)

    let score = 0.0

    // Same store bonus
    if (item.store === lastPurchase.store) {
        score += 0.15
    }

    // Interval check
    const deviation = Math.abs(daysSinceLastPurchase - expectedInterval)

    if (deviation < expectedInterval * 0.3) {
        score += 0.10 // Within expected range
    } else if (deviation > expectedInterval * 2) {
        score -= 0.15 // Way off pattern
    }

    return score
}

// ============================================
// 3️⃣ QUANTITY SCORE (padrão de consumo)
// ============================================

/**
 * Calculate average of numbers
 */
function average(numbers: number[]): number {
    if (numbers.length === 0) return 0
    return numbers.reduce((a, b) => a + b, 0) / numbers.length
}

/**
 * Calculate standard deviation
 */
function standardDeviation(numbers: number[]): number {
    if (numbers.length === 0) return 0
    const avg = average(numbers)
    const squareDiffs = numbers.map(n => Math.pow(n - avg, 2))
    return Math.sqrt(average(squareDiffs))
}

/**
 * Calculate quantity score based on historical patterns
 */
export function calculateQuantityScore(item: Product, history: Product[]): number {
    if (history.length === 0) return 0.0

    const quantities = history.map(h => h.quantity)
    const avgQuantity = average(quantities)
    const stdDev = standardDeviation(quantities)

    // Exact match
    if (item.quantity === Math.round(avgQuantity)) {
        return 0.15
    }

    // Within normal range
    if (Math.abs(item.quantity - avgQuantity) <= stdDev) {
        return 0.05
    }

    // Absurd quantity
    if (item.quantity > avgQuantity * 5 || item.quantity === 0) {
        return -0.30
    }

    return 0.0
}

// ============================================
// 4️⃣ PRICE SCORE (sanity check)
// ============================================

/**
 * Calculate price score based on historical price range
 */
export function calculatePriceScore(item: Product, history: Product[]): number {
    // Invalid price
    if (item.price <= 0) {
        return -0.30
    }

    if (history.length === 0) return 0.0

    const prices = history.map(h => h.price)
    const avgPrice = average(prices)
    const stdDev = standardDeviation(prices)

    // Within expected range
    if (Math.abs(item.price - avgPrice) <= stdDev) {
        return 0.10
    }

    // Price anomaly
    if (Math.abs(item.price - avgPrice) > stdDev * 2) {
        return -0.10
    }

    return 0.0
}

// ============================================
// 5️⃣ SOURCE SCORE (origem da informação)
// ============================================

/**
 * Calculate source score based on data origin
 */
export function calculateSourceScore(source: DataSource): number {
    switch (source.type) {
        case 'validated_receipt':
            return 0.20
        case 'manual_entry':
            return 0.05
        case 'partial_ocr':
            return -0.10
        default:
            return 0.0
    }
}

// ============================================
// 🧮 FINAL CONFIDENCE CALCULATION
// ============================================

/**
 * Calculate overall confidence score
 * Returns a value between 0 and 1
 */
export function calculateConfidence(
    item: Product,
    history: Product[],
    source: DataSource
): number {
    let confidence = 0.0

    confidence += calculateMatchScore(item, history)
    confidence += calculateTimeScore(item, history)
    confidence += calculateQuantityScore(item, history)
    confidence += calculatePriceScore(item, history)
    confidence += calculateSourceScore(source)

    // Clamp between 0 and 1
    return Math.max(0, Math.min(1, confidence))
}

// ============================================
// 🎯 BADGE MAPPING
// ============================================

/**
 * Get badge information based on confidence score
 */
export function getConfidenceBadge(confidence: number): ConfidenceBadge | null {
    if (confidence >= 0.85) {
        return {
            type: 'HIGH',
            label: 'HIGH',
            icon: '✓',
            color: 'green'
        }
    }

    if (confidence >= 0.60) {
        return {
            type: 'MEDIUM',
            label: 'MEDIUM',
            icon: '⚠',
            color: 'yellow'
        }
    }

    if (confidence >= 0.40) {
        return {
            type: 'LOW',
            label: 'REVIEW NEEDED',
            icon: '⚠',
            color: 'red'
        }
    }

    return null // Too low - reject
}

// ============================================
// 🧠 LEARNING & ADJUSTMENT
// ============================================

/**
 * Boost confidence after user confirmation
 */
export function applyUserConfirmationBoost(confidence: number): number {
    return Math.min(1, confidence + 0.15)
}

/**
 * Boost confidence after repeated confirmations
 */
export function applyRepetitionBoost(confidence: number, confirmations: number): number {
    if (confirmations >= 3) {
        return Math.min(1, confidence + 0.10)
    }
    return confidence
}

/**
 * Check if item should be auto-approved
 */
export function shouldAutoApprove(confidence: number): boolean {
    return confidence >= 0.85
}

/**
 * Check if item needs user confirmation
 */
export function needsConfirmation(confidence: number): boolean {
    return confidence >= 0.40 && confidence < 0.85
}

/**
 * Check if item should be rejected
 */
export function shouldReject(confidence: number): boolean {
    return confidence < 0.40
}
