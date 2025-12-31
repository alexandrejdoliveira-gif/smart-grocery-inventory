'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type ScanStep = 'upload' | 'processing' | 'review' | 'duplicate'

// Mock database of previously scanned receipts
// In production, this would come from the database
const mockScannedReceipts = [
    {
        id: '1',
        store: 'Costco',
        date: '2024-12-29',
        total: 45.67,
        scannedAt: '2024-12-29T10:30:00'
    },
    {
        id: '2',
        store: 'Walmart',
        date: '2024-12-28',
        total: 32.15,
        scannedAt: '2024-12-28T15:45:00'
    }
]

// Mock extracted data from receipt
// In production, this data would be automatically extracted by OCR/AI:
// - Store name: extracted from receipt header
// - Date: extracted from receipt timestamp
// - Items: extracted line by line with prices
const mockExtractedData = {
    store: 'Costco',  // Auto-extracted from receipt
    date: '2024-12-29',  // Auto-extracted from receipt
    total: 45.67,
    items: [
        { name: 'Organic Bananas', price: 3.99, quantity: 1 },
        { name: 'Whole Milk 1 Gallon', price: 4.29, quantity: 2 },
        { name: 'Bread Whole Wheat', price: 2.99, quantity: 1 },
        { name: 'Chicken Breast 2lb', price: 12.99, quantity: 1 },
        { name: 'Eggs Large 12ct', price: 5.49, quantity: 1 },
    ]
}

export default function ScanPage() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [step, setStep] = useState<ScanStep>('upload')
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [extractedData, setExtractedData] = useState(mockExtractedData)
    const [processingProgress, setProcessingProgress] = useState(0)
    const [duplicateReceipt, setDuplicateReceipt] = useState<typeof mockScannedReceipts[0] | null>(null)

    // Check for duplicate receipt
    const checkDuplicate = (data: typeof mockExtractedData) => {
        const duplicate = mockScannedReceipts.find(
            receipt =>
                receipt.store === data.store &&
                receipt.date === data.date &&
                Math.abs(receipt.total - data.total) < 0.01 // Allow for small rounding differences
        )
        return duplicate || null
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string)
                startProcessing()
            }
            reader.readAsDataURL(file)
        }
    }

    const startProcessing = () => {
        setStep('processing')
        setProcessingProgress(0)

        // Simulate AI processing with progress
        const interval = setInterval(() => {
            setProcessingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        // Check for duplicate after processing
                        const duplicate = checkDuplicate(mockExtractedData)
                        if (duplicate) {
                            setDuplicateReceipt(duplicate)
                            setStep('duplicate')
                        } else {
                            setStep('review')
                        }
                    }, 500)
                    return 100
                }
                return prev + 10
            })
        }, 300)
    }

    const handleSaveToInventory = () => {
        // In real app, this would save to database
        router.push('/stock')
    }

    const handleProceedAnyway = () => {
        // User acknowledges duplicate but wants to proceed
        setStep('review')
    }

    const handleItemEdit = (index: number, field: string, value: string | number) => {
        const newItems = [...extractedData.items]
        newItems[index] = { ...newItems[index], [field]: value }
        setExtractedData({ ...extractedData, items: newItems })
    }

    const handleRemoveItem = (index: number) => {
        const newItems = extractedData.items.filter((_, i) => i !== index)
        setExtractedData({ ...extractedData, items: newItems })
    }

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <div className="cursor-pointer">
                                <h1 className="text-2xl font-bold tracking-tight">SmartPantry</h1>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Inventory Intel</p>
                            </div>
                        </Link>
                        <Link href="/stock" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Cancel
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-[73px] pb-24 px-6">
                <div className="container mx-auto max-w-4xl">

                    {/* Upload Step */}
                    {step === 'upload' && (
                        <div className="py-20 animate-fade-in">
                            <div className="text-center mb-12">
                                <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-5xl">📸</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4">Scan Receipt</h2>
                                <p className="text-gray-400 text-lg">
                                    Upload a photo of your grocery receipt
                                </p>
                            </div>

                            {/* Upload Area */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group relative p-12 bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-2xl cursor-pointer transition-all"
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <span className="text-3xl">📄</span>
                                    </div>
                                    <p className="text-lg font-semibold mb-2">Click to upload or take photo</p>
                                    <p className="text-sm text-gray-400">
                                        Supports JPG, PNG • Max 10MB
                                    </p>
                                </div>
                            </div>

                            {/* Quick Tips */}
                            <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span>💡</span> Tips for best results
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• Ensure good lighting</li>
                                    <li>• Keep receipt flat and straight</li>
                                    <li>• Capture entire receipt in frame</li>
                                    <li>• Avoid shadows and glare</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Processing Step */}
                    {step === 'processing' && (
                        <div className="py-20 animate-fade-in">
                            <div className="text-center">
                                {/* Animated Receipt Icon */}
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-ping"></div>
                                    <div className="relative w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-6xl animate-pulse">📄</span>
                                    </div>
                                </div>

                                <h2 className="text-3xl font-bold mb-3">Scanning Receipt...</h2>
                                <p className="text-blue-400 text-lg font-medium mb-8">
                                    GEMINI AI PROCESSING
                                </p>

                                {/* Progress Bar */}
                                <div className="max-w-md mx-auto mb-8">
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                                            style={{ width: `${processingProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">{processingProgress}% complete</p>
                                </div>

                                {/* Processing Steps */}
                                <div className="max-w-md mx-auto space-y-3 text-left">
                                    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${processingProgress >= 30 ? 'bg-green-600/20 border border-green-500/30' : 'bg-white/5'}`}>
                                        <span className="text-xl">{processingProgress >= 30 ? '✓' : '⏳'}</span>
                                        <span className="text-sm">Extracting items...</span>
                                    </div>
                                    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${processingProgress >= 60 ? 'bg-green-600/20 border border-green-500/30' : 'bg-white/5'}`}>
                                        <span className="text-xl">{processingProgress >= 60 ? '✓' : '⏳'}</span>
                                        <span className="text-sm">Normalizing names...</span>
                                    </div>
                                    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${processingProgress >= 90 ? 'bg-green-600/20 border border-green-500/30' : 'bg-white/5'}`}>
                                        <span className="text-xl">{processingProgress >= 90 ? '✓' : '⏳'}</span>
                                        <span className="text-sm">Detecting duplicates...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Duplicate Detection Step */}
                    {step === 'duplicate' && duplicateReceipt && (
                        <div className="py-20 animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="w-24 h-24 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-6xl">⚠️</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-3 text-yellow-400">Duplicate Receipt Detected</h2>
                                <p className="text-gray-400 text-lg">
                                    This receipt appears to have been scanned before
                                </p>
                            </div>

                            {/* Duplicate Details */}
                            <div className="max-w-md mx-auto mb-8 p-6 bg-yellow-600/10 border border-yellow-500/30 rounded-2xl">
                                <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                                    Previously Scanned Receipt
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Store:</span>
                                        <span className="font-medium">{duplicateReceipt.store}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Date:</span>
                                        <span className="font-medium">
                                            {new Date(duplicateReceipt.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Total:</span>
                                        <span className="font-medium">${duplicateReceipt.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-yellow-500/30">
                                        <span className="text-gray-400">Scanned:</span>
                                        <span className="font-medium">
                                            {new Date(duplicateReceipt.scannedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })} at {new Date(duplicateReceipt.scannedAt).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Warning Message */}
                            <div className="max-w-md mx-auto mb-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                                <p className="text-sm text-gray-300 text-center">
                                    💡 Scanning the same receipt twice will create duplicate entries in your inventory.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="max-w-md mx-auto flex flex-col gap-3">
                                <button
                                    onClick={() => setStep('upload')}
                                    className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all hover:scale-105"
                                >
                                    Scan Different Receipt
                                </button>
                                <button
                                    onClick={handleProceedAnyway}
                                    className="w-full px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold transition-all"
                                >
                                    Proceed Anyway
                                </button>
                                <Link
                                    href="/stock"
                                    className="w-full px-8 py-4 text-center text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Review Step */}
                    {step === 'review' && (
                        <div className="py-12 animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">✓</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-2">Review & Confirm</h2>
                                <p className="text-gray-400">
                                    Verify the extracted data before saving
                                </p>
                            </div>

                            {/* Store & Date Info */}
                            <div className="mb-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                            Store
                                        </label>
                                        <input
                                            type="text"
                                            value={extractedData.store}
                                            onChange={(e) => setExtractedData({ ...extractedData, store: e.target.value })}
                                            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={extractedData.date}
                                            onChange={(e) => setExtractedData({ ...extractedData, date: e.target.value })}
                                            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Items ({extractedData.items.length})
                                </h3>
                                <div className="space-y-3">
                                    {extractedData.items.map((item, index) => (
                                        <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-1 grid grid-cols-3 gap-3">
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        onChange={(e) => handleItemEdit(index, 'name', e.target.value)}
                                                        className="col-span-2 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50"
                                                        placeholder="Item name"
                                                    />
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={item.price}
                                                        onChange={(e) => handleItemEdit(index, 'price', parseFloat(e.target.value))}
                                                        className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50"
                                                        placeholder="Price"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(index)}
                                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded-lg transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="mb-8 p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold">Total</span>
                                    <span className="text-3xl font-bold">
                                        ${extractedData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep('upload')}
                                    className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold transition-all"
                                >
                                    Scan Again
                                </button>
                                <button
                                    onClick={handleSaveToInventory}
                                    className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all hover:scale-105"
                                >
                                    Save to Inventory
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
