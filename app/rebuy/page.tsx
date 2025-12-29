'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data - produtos que acabaram com comparação de preços
const mockRebuyItems = [
    {
        id: '1',
        name: 'Ottavio Extra Virgin Oil',
        lastStore: 'Costco',
        lastPurchaseDate: 'Dec 15',
        lastPrice: 10.79,
        currentPrice: 9.99,
        priceChange: -7.4, // percentage
        status: 'cheaper', // cheaper | expensive | stable
        bestStore: 'Walmart',
        bestStorePrice: 9.99,
        lastSeenDate: '2 days ago',
        quantity: 1
    },
    {
        id: '2',
        name: 'Starbucks Hot Cocoa Mix',
        lastStore: 'Costco',
        lastPurchaseDate: 'Dec 15',
        lastPrice: 12.99,
        currentPrice: 14.49,
        priceChange: 11.5,
        status: 'expensive',
        bestStore: 'Target',
        bestStorePrice: 13.29,
        lastSeenDate: '1 day ago',
        quantity: 2
    },
    {
        id: '3',
        name: 'Greenmade Storage Totes',
        lastStore: 'Costco',
        lastPurchaseDate: 'Dec 15',
        lastPrice: 9.99,
        currentPrice: 10.19,
        priceChange: 2.0,
        status: 'stable',
        bestStore: 'Costco',
        bestStorePrice: 10.19,
        lastSeenDate: '3 days ago',
        quantity: 1
    },
]

export default function RebuyPage() {
    const [items, setItems] = useState(mockRebuyItems)
    const [filter, setFilter] = useState<'all' | 'cheaper' | 'expensive' | 'stable'>('all')

    const filteredItems = filter === 'all'
        ? items
        : items.filter(item => item.status === filter)

    const handleMarkAsPurchased = (itemId: string) => {
        setItems(items.filter(item => item.id !== itemId))
    }

    const totalSavings = items.reduce((acc, item) => {
        const savings = (item.lastPrice - item.currentPrice) * item.quantity
        return acc + savings
    }, 0)

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'cheaper': return '🟢'
            case 'expensive': return '🔴'
            case 'stable': return '🟡'
            default: return '⚪'
        }
    }

    const getStatusText = (status: string, change: number) => {
        switch (status) {
            case 'cheaper': return `${Math.abs(change).toFixed(1)}% cheaper`
            case 'expensive': return `${Math.abs(change).toFixed(1)}% more expensive`
            case 'stable': return 'Price stable'
            default: return 'No data'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'cheaper': return 'text-green-400'
            case 'expensive': return 'text-red-400'
            case 'stable': return 'text-yellow-400'
            default: return 'text-gray-400'
        }
    }

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <div className="cursor-pointer">
                                <h1 className="text-2xl font-bold tracking-tight">SmartStock</h1>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Inventory Intel</p>
                            </div>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Link href="/stock" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105">
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
                        <Link href="/stock" className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            📦 Stock
                        </Link>
                        <button className="py-4 text-sm font-medium text-white border-b-2 border-blue-500">
                            🛒 Rebuy
                            {items.length > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-xs rounded-full">{items.length}</span>
                            )}
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

                    {/* Header Stats */}
                    <div className="mb-8 p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Shopping List</h2>
                                <p className="text-sm text-gray-400">
                                    {items.length} {items.length === 1 ? 'item' : 'items'} to rebuy
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">
                                    {totalSavings >= 0 ? (
                                        <span className="text-green-400">-${Math.abs(totalSavings).toFixed(2)}</span>
                                    ) : (
                                        <span className="text-red-400">+${Math.abs(totalSavings).toFixed(2)}</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider">
                                    {totalSavings >= 0 ? 'Potential Savings' : 'Price Increase'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex items-center gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            All ({items.length})
                        </button>
                        <button
                            onClick={() => setFilter('cheaper')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'cheaper'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            🟢 Cheaper ({items.filter(i => i.status === 'cheaper').length})
                        </button>
                        <button
                            onClick={() => setFilter('expensive')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'expensive'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            🔴 More Expensive ({items.filter(i => i.status === 'expensive').length})
                        </button>
                        <button
                            onClick={() => setFilter('stable')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'stable'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            🟡 Stable ({items.filter(i => i.status === 'stable').length})
                        </button>
                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🛒</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {filter === 'all' ? 'Shopping list is empty' : `No ${filter} items`}
                            </h3>
                            <p className="text-gray-400 mb-8">
                                {filter === 'all'
                                    ? 'Mark items as finished in your stock to add them here'
                                    : `Try selecting a different filter`}
                            </p>
                            <Link href="/stock" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all hover:scale-105 inline-block">
                                Go to Stock
                            </Link>
                        </div>
                    )}

                    {/* Product List */}
                    <div className="space-y-4">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
                            >
                                {/* Product Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <span className="text-xl">{getStatusIcon(item.status)}</span>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Last bought at {item.lastStore} • {item.lastPurchaseDate}
                                        </p>
                                    </div>
                                </div>

                                {/* Price Comparison */}
                                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-black/30 rounded-xl">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Last Paid</p>
                                        <p className="text-2xl font-bold">${item.lastPrice.toFixed(2)}</p>
                                        <p className="text-xs text-gray-400">{item.lastStore}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Price</p>
                                        <p className="text-2xl font-bold">${item.currentPrice.toFixed(2)}</p>
                                        <p className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                                            {getStatusText(item.status, item.priceChange)}
                                        </p>
                                    </div>
                                </div>

                                {/* Best Store Recommendation */}
                                {item.bestStore !== item.lastStore && (
                                    <div className="mb-4 p-3 bg-blue-600/10 border border-blue-500/30 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">💡</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-blue-400">Better price found</p>
                                                <p className="text-xs text-gray-400">
                                                    ${item.bestStorePrice.toFixed(2)} at {item.bestStore} •
                                                    Save ${(item.currentPrice - item.bestStorePrice).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-400">
                                        Qty: {item.quantity} • Updated {item.lastSeenDate}
                                    </div>
                                    <button
                                        onClick={() => handleMarkAsPurchased(item.id)}
                                        className="px-6 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-full text-sm font-medium text-green-400 hover:text-green-300 transition-all"
                                    >
                                        ✓ Mark as Purchased
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <Link href="/stock" className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl shadow-blue-600/50 flex items-center justify-center transition-all hover:scale-110 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">📦</span>
            </Link>
        </main>
    )
}
