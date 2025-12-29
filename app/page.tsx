import Link from 'next/link'

export default function HomePage() {
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
                        <div className="flex items-center gap-4">
                            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                Sign In
                            </button>
                            <Link href="/stock" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full mb-8">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-blue-400">AI-Powered Price Intelligence</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                            Never Overpay for
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                Groceries Again
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            The first app powered by real physical store prices through crowdsourced receipt data.
                            Every scan makes the system smarter for everyone.
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <Link href="/stock" className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-600/50">
                                Start Saving Now
                                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 transition-all">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">$127</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">Avg Monthly Savings</div>
                        </div>
                        <div className="text-center border-x border-white/5">
                            <div className="text-4xl font-bold text-white mb-2">50K+</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">Receipts Scanned</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">98%</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">OCR Accuracy</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-950/10">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Intelligent Features</h2>
                        <p className="text-gray-400">Everything you need to save money on groceries</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <div className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/10">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                                <span className="text-2xl">📸</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Smart Scanning</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                AI-powered OCR extracts every detail from your receipts instantly
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/10">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Live Inventory</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Track what you have at home and when items run out
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/10">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Price Intel</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Real-time price tracking from actual store receipts
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-600/10">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                                <span className="text-2xl">🏪</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Market Compare</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Find the best deals across all stores near you
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-gray-400">Three simple steps to start saving</p>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                                1
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">Scan Your Receipt</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Take a photo of your grocery receipt. Our AI extracts all items, prices, and store information automatically.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                                2
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">Track Your Inventory</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Items are automatically added to your digital pantry. Mark items as finished when they run out.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                                3
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">Get Smart Recommendations</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    See if prices went up or down, where to buy for the best deal, and how much you&apos;ll save.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="relative overflow-hidden p-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                        <div className="relative text-center">
                            <h2 className="text-4xl font-bold mb-4">Ready to Save Money?</h2>
                            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                                Join thousands of smart shoppers already saving on groceries with AI-powered price intelligence
                            </p>
                            <Link href="/stock" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-2xl">
                                Get Started - It&apos;s Free
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-1">SmartPantry</h3>
                            <p className="text-sm text-gray-500">Inventory Intel</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-400">In Development - MVP Coming Soon</span>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
                        Built with ❤️ for smarter grocery shopping
                    </div>
                </div>
            </footer>
        </main>
    )
}
