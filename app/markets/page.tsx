'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data - histórico de compras por loja
const mockStores = [
    {
        id: '1',
        name: 'Costco',
        totalSpent: 194.23,
        visits: 3,
        lastVisit: 'Dec 15',
        avgBasket: 64.74,
        items: [
            { name: 'Ottavio Extra Virgin Oil', price: 10.79, avgPrice: 11.29, purchases: 2 },
            { name: 'Greenmade Storage Totes', price: 9.99, avgPrice: 10.49, purchases: 1 },
            { name: 'Starbucks Hot Cocoa Mix', price: 12.99, avgPrice: 12.99, purchases: 1 },
        ],
        trend: 'up' // up | down | stable
    },
    {
        id: '2',
        name: 'Walmart',
        totalSpent: 87.45,
        visits: 2,
        lastVisit: 'Dec 10',
        avgBasket: 43.73,
        items: [
            { name: 'Ottavio Extra Virgin Oil', price: 9.99, avgPrice: 10.29, purchases: 1 },
            { name: 'Milk 2%', price: 3.49, avgPrice: 3.49, purchases: 2 },
        ],
        trend: 'stable'
    },
    {
        id: '3',
        name: 'Target',
        totalSpent: 156.78,
        visits: 4,
        lastVisit: 'Dec 12',
        avgBasket: 39.20,
        items: [
            { name: 'Starbucks Hot Cocoa Mix', price: 13.29, avgPrice: 13.49, purchases: 2 },
            { name: 'Paper Towels', price: 8.99, avgPrice: 9.29, purchases: 3 },
        ],
        trend: 'down'
    },
]

export default function MarketsPage() {
    const [selectedStore, setSelectedStore] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid')

    const totalSpent = mockStores.reduce((acc, store) => acc + store.totalSpent, 0)
    const totalVisits = mockStores.reduce((acc, store) => acc + store.visits, 0)

    const selectedStoreData = selectedStore
        ? mockStores.find(s => s.id === selectedStore)
        : null

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return '📈'
            case 'down': return '📉'
            case 'stable': return '➡️'
            default: return '➡️'
        }
    }

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case 'up': return 'text-red-400'
            case 'down': return 'text-green-400'
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
                                <h1 className="text-2xl font-bold tracking-tight">SmartPantry</h1>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Inventory Intel</p>
                            </div>
                        </Link>
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
                        <Link href="/stock" className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            📦 Stock
                        </Link>
                        <Link href="/rebuy" className="py-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            🛒 Rebuy
                        </Link>
                        <button className="py-4 text-sm font-medium text-white border-b-2 border-blue-500">
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
                <div className="container mx-auto max-w-6xl">

                    {/* Header Stats */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Total Spent</p>
                            <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Total Visits</p>
                            <p className="text-3xl font-bold">{totalVisits}</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Stores Tracked</p>
                            <p className="text-3xl font-bold">{mockStores.length}</p>
                        </div>
                    </div>

                    {/* View Toggle */}
                    {selectedStore && (
                        <div className="mb-6">
                            <button
                                onClick={() => {
                                    setSelectedStore(null)
                                    setViewMode('grid')
                                }}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                <span>←</span> Back to all stores
                            </button>
                        </div>
                    )}

                    {/* Grid View - All Stores */}
                    {!selectedStore && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockStores.map((store) => (
                                <div
                                    key={store.id}
                                    onClick={() => setSelectedStore(store.id)}
                                    className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all cursor-pointer hover:scale-105"
                                >
                                    {/* Store Header */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-2xl font-bold">{store.name}</h3>
                                            <span className="text-2xl">{getTrendIcon(store.trend)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                                            Historical Intel
                                        </p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="p-3 bg-black/30 rounded-xl">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</p>
                                            <p className="text-xl font-bold">${store.totalSpent.toFixed(0)}</p>
                                        </div>
                                        <div className="p-3 bg-black/30 rounded-xl">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Visits</p>
                                            <p className="text-xl font-bold">{store.visits}</p>
                                        </div>
                                    </div>

                                    {/* Last Visit */}
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-sm text-gray-400">
                                            Last visit: <span className="text-white font-medium">{store.lastVisit}</span>
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Avg basket: <span className="text-white font-medium">${store.avgBasket.toFixed(2)}</span>
                                        </p>
                                    </div>

                                    {/* Hover Arrow */}
                                    <div className="mt-4 flex items-center justify-end text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-sm font-medium">View details</span>
                                        <span className="ml-2">→</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Detail View - Single Store */}
                    {selectedStore && selectedStoreData && (
                        <div className="space-y-6">
                            {/* Store Header */}
                            <div className="p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-4xl font-bold mb-2">{selectedStoreData.name}</h2>
                                        <p className="text-sm text-gray-400 uppercase tracking-wider">
                                            Historical Intel
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-5xl mb-2">{getTrendIcon(selectedStoreData.trend)}</div>
                                        <p className={`text-sm font-medium ${getTrendColor(selectedStoreData.trend)}`}>
                                            {selectedStoreData.trend === 'up' && 'Spending increasing'}
                                            {selectedStoreData.trend === 'down' && 'Spending decreasing'}
                                            {selectedStoreData.trend === 'stable' && 'Spending stable'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Total Spent</p>
                                        <p className="text-3xl font-bold">${selectedStoreData.totalSpent.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Visits</p>
                                        <p className="text-3xl font-bold">{selectedStoreData.visits}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Avg Basket</p>
                                        <p className="text-3xl font-bold">${selectedStoreData.avgBasket.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Spending Trend */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <h3 className="text-xl font-semibold mb-4">Spending Trend</h3>
                                <div className="h-32 bg-black/30 rounded-xl flex items-end justify-around p-4">
                                    {/* Simple bar chart visualization */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 bg-blue-600 rounded-t" style={{ height: '60%' }}></div>
                                        <p className="text-xs text-gray-500">Nov</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 bg-blue-600 rounded-t" style={{ height: '80%' }}></div>
                                        <p className="text-xs text-gray-500">Dec</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
                                        <p className="text-xs text-white font-medium">Jan</p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Comparison by Item */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <h3 className="text-xl font-semibold mb-4">Price Comparison by Item</h3>
                                <p className="text-sm text-gray-400 mb-6">
                                    {selectedStoreData.items.length} total purchases here
                                </p>

                                <div className="space-y-4">
                                    {selectedStoreData.items.map((item, index) => {
                                        const priceDiff = item.price - item.avgPrice
                                        const isGoodDeal = priceDiff < 0

                                        return (
                                            <div key={index} className="p-4 bg-black/30 rounded-xl">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold mb-1">{item.name}</h4>
                                                        <p className="text-xs text-gray-400">
                                                            {item.purchases} {item.purchases === 1 ? 'purchase' : 'purchases'} here
                                                        </p>
                                                    </div>
                                                    {isGoodDeal ? (
                                                        <span className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-xs font-medium text-green-400">
                                                            Good Deal
                                                        </span>
                                                    ) : priceDiff > 0 ? (
                                                        <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-xs font-medium text-red-400">
                                                            Above Avg
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-yellow-600/20 border border-yellow-500/30 rounded-full text-xs font-medium text-yellow-400">
                                                            Average
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                            Last Price
                                                        </p>
                                                        <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                            Local Avg
                                                        </p>
                                                        <p className="text-2xl font-bold text-gray-400">
                                                            ${item.avgPrice.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {priceDiff !== 0 && (
                                                    <p className={`text-sm mt-2 ${isGoodDeal ? 'text-green-400' : 'text-red-400'}`}>
                                                        {isGoodDeal ? '↓' : '↑'} ${Math.abs(priceDiff).toFixed(2)} vs local average
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Wipe Market Intelligence */}
                            <div className="p-6 bg-red-600/10 border border-red-500/30 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-red-400 mb-1">
                                            Wipe Market Intelligence
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Remove all purchase history and data for this store
                                        </p>
                                    </div>
                                    <button className="px-6 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-full text-sm font-medium text-red-400 hover:text-red-300 transition-all">
                                        Wipe Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Action Button */}
            <Link href="/stock" className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl shadow-blue-600/50 flex items-center justify-center transition-all hover:scale-110 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">📦</span>
            </Link>
        </main>
    )
}
