'use client'

import { useState } from 'react'

// Mock data - será substituído por dados reais depois
const mockProducts = [
    {
        id: '1',
        name: 'OTTAVIO EXTRA VIRGIN OLIVE OIL',
        store: 'Costco',
        date: 'Dec 15',
        price: 10.79,
        quantity: 1,
        status: 'available'
    },
    {
        id: '2',
        name: 'GREENMADE STORAGE TOTES',
        store: 'Costco',
        date: 'Dec 15',
        price: 9.99,
        quantity: 1,
        status: 'available'
    },
    {
        id: '3',
        name: 'STARBUCKS HOT COCOA MIX',
        store: 'Costco',
        date: 'Dec 15',
        price: 12.99,
        quantity: 2,
        status: 'available'
    },
]

export default function StockPage() {
    const [products, setProducts] = useState(mockProducts)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                            <h1 className="text-2xl font-bold tracking-tight">SmartStock</h1>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Inventory Intel</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105">
                                Quick Scan
                            </button>
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
                        <button className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            🛒 Rebuy
                        </button>
                        <button className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            🏪 Markets
                        </button>
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
                                className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
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
                                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2">
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
                                        onClick={() => handleMarkAsFinished(product.id)}
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

            {/* Floating Action Button */}
            <button className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl shadow-blue-600/50 flex items-center justify-center transition-all hover:scale-110 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
            </button>
        </main>
    )
}
