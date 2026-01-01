'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data - será substituído por dados reais depois
const mockProducts = [
    {
        id: '1',
        name: 'OTTAVIO EXTRA VIRGIN OLIVE OIL',
        store: 'Costco',
        date: 'Dec 15',
        price: 10.79,
        quantity: 1,
        status: 'available',
        confidence: 0.92 // HIGH - strong historical match
    },
    {
        id: '2',
        name: 'GREENMADE STORAGE TOTES',
        store: 'Costco',
        date: 'Dec 15',
        price: 9.99,
        quantity: 1,
        status: 'available',
        confidence: 0.68 // MEDIUM - needs confirmation
    },
    {
        id: '3',
        name: 'STARBUCKS HOT COCOA MIX',
        store: 'Costco',
        date: 'Dec 15',
        price: 12.99,
        quantity: 2,
        status: 'available',
        confidence: 0.45 // LOW - review needed
    },
]

// Confidence badge helper
type BadgeType = 'HIGH' | 'MEDIUM' | 'LOW' | null

function getConfidenceBadge(confidence: number): { type: BadgeType; label: string; icon: string } | null {
    if (confidence >= 0.85) {
        return { type: 'HIGH', label: 'HIGH', icon: '✓' }
    }
    if (confidence >= 0.60) {
        return { type: 'MEDIUM', label: 'MEDIUM', icon: '⚠' }
    }
    if (confidence >= 0.40) {
        return { type: 'LOW', label: 'REVIEW NEEDED', icon: '⚠' }
    }
    return null
}

export default function StockPage() {
    const [products, setProducts] = useState(mockProducts)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleOpenModal = (product: typeof mockProducts[0]) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedProduct(null)
    }

    const handleUpdateProduct = () => {
        if (selectedProduct) {
            setProducts(products.map(p =>
                p.id === selectedProduct.id ? selectedProduct : p
            ))
            handleCloseModal()
        }
    }

    const handleDeleteProduct = () => {
        if (selectedProduct) {
            setProducts(products.filter(p => p.id !== selectedProduct.id))
            handleCloseModal()
        }
    }

    const handleMarkAsFinished = (productId: string) => {
        setProducts(products.filter(p => p.id !== productId))
    }

    const handleQuantityChange = (productId: string, delta: number) => {
        setProducts(products.map(p =>
            p.id === productId
                ? { ...p, quantity: Math.max(0, p.quantity + delta) }
                : p
        ))
    }

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">SmartPantry</h1>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Inventory Intel</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/scan" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105">
                                Quick Scan
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Tabs Navigation */}
            <div className="fixed top-[73px] left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-8">
                        <button className="py-4 text-sm font-medium text-white border-b-2 border-blue-500">
                            📦 Stock
                        </button>
                        <Link href="/rebuy" className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            🛒 Rebuy
                        </Link>
                        <Link href="/markets" className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            🏪 Markets
                        </Link>
                        <button className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            ⚙️ Gear
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-[145px] pb-24 px-6">
                <div className="container mx-auto max-w-4xl">

                    {/* Search Bar */}
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                        />
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">📦</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {searchQuery ? 'No products found' : 'Empty stock. Scan a receipt.'}
                            </h3>
                            <p className="text-gray-400 mb-8">
                                {searchQuery
                                    ? 'Try a different search term'
                                    : 'Start by scanning your first grocery receipt'}
                            </p>
                            {!searchQuery && (
                                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all hover:scale-105">
                                    Scan Receipt
                                </button>
                            )}
                        </div>
                    )}

                    {/* Product List */}
                    <div className="space-y-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleOpenModal(product)}
                                className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            {(() => {
                                                const badge = getConfidenceBadge(product.confidence)
                                                if (!badge) return null

                                                const badgeStyles = {
                                                    HIGH: 'bg-green-600/20 text-green-400 border-green-500/30',
                                                    MEDIUM: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
                                                    LOW: 'bg-red-600/20 text-red-400 border-red-500/30'
                                                }

                                                return (
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeStyles[badge.type!]}`}>
                                                        {badge.icon} {badge.label}
                                                    </span>
                                                )
                                            })()}
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            {product.store} • {product.date}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">${product.price}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => handleQuantityChange(product.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                                            {product.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(product.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Finished Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleMarkAsFinished(product.id)
                                        }}
                                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-all"
                                    >
                                        FINISHED
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 shadow-2xl animate-scale-in">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">REVIEW ITEM</h2>
                            <button
                                onClick={handleCloseModal}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Item Name */}
                        <div className="mb-6">
                            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                Item Name
                            </label>
                            <input
                                type="text"
                                value={selectedProduct.name}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                            />
                        </div>

                        {/* Quantity and Price */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {/* Quantity */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-3 bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                                    <button
                                        onClick={() => setSelectedProduct({ ...selectedProduct, quantity: Math.max(1, selectedProduct.quantity - 1) })}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl font-bold flex-1 text-center">
                                        {selectedProduct.quantity}
                                    </span>
                                    <button
                                        onClick={() => setSelectedProduct({ ...selectedProduct, quantity: selectedProduct.quantity + 1 })}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={selectedProduct.price}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-2xl font-bold text-center focus:outline-none focus:border-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handleUpdateProduct}
                                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all hover:scale-105"
                            >
                                CONFIRM & LEARN
                            </button>
                            <button
                                onClick={handleDeleteProduct}
                                className="w-full px-8 py-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300 rounded-full font-semibold transition-all"
                            >
                                DELETE ITEM
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <Link href="/scan" className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl shadow-blue-600/50 flex items-center justify-center transition-all hover:scale-110 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
            </Link>
        </main>
    )
}
