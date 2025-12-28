export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Smart Grocery Inventory
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
                        Never overpay for groceries again
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        The first app powered by <span className="font-semibold text-blue-600 dark:text-blue-400">real physical store prices</span> through crowdsourced receipt data. Every scan makes the system smarter for everyone.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Feature 1 */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up">
                        <div className="text-4xl mb-4">📸</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            OCR Receipt Scanning
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Automatically extract data from grocery receipts with AI-powered OCR
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            Digital Inventory
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track what you have at home and when items run out
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            Price Intelligence
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Know if prices went up or down with crowdsourced data
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="text-4xl mb-4">🏪</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            Multi-Store Comparison
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Find the best deals at stores near you
                        </p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                        How It Works
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">Scan Your Receipt</h3>
                                <p className="text-gray-600 dark:text-gray-400">Take a photo of your grocery receipt and our AI extracts all the data</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">Track Your Inventory</h3>
                                <p className="text-gray-600 dark:text-gray-400">Items are automatically added to your digital pantry</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">Get Smart Recommendations</h3>
                                <p className="text-gray-600 dark:text-gray-400">When items run out, see if prices went up or down and where to buy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-white shadow-2xl">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Save Money?
                    </h2>
                    <p className="text-lg mb-8 opacity-90">
                        Join thousands of smart shoppers already saving on groceries
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                        Get Started - It&apos;s Free
                    </button>
                </div>

                {/* Footer */}
                <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                        🚀 <strong>Status:</strong> In Development - MVP Coming Soon
                    </p>
                    <p className="text-sm">
                        Built with ❤️ for smarter grocery shopping
                    </p>
                </footer>
            </div>
        </main>
    )
}
