import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Smart Grocery Inventory - AI-Powered Price Intelligence',
    description: 'Track your grocery inventory and never overpay again. Powered by crowdsourced real-world pricing data.',
    keywords: ['grocery', 'inventory', 'price tracking', 'shopping list', 'savings', 'PWA'],
    authors: [{ name: 'Smart Grocery Team' }],
    creator: 'Smart Grocery Team',
    publisher: 'Smart Grocery Team',
    manifest: '/manifest.json',
    themeColor: '#0ea5e9',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
        userScalable: true,
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Grocery AI',
    },
    icons: {
        icon: '/icons/icon-192x192.png',
        apple: '/icons/icon-192x192.png',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://smart-grocery-inventory.vercel.app',
        title: 'Smart Grocery Inventory - AI-Powered Price Intelligence',
        description: 'Track your grocery inventory and never overpay again.',
        siteName: 'Smart Grocery Inventory',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Smart Grocery Inventory',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Smart Grocery Inventory',
        description: 'Track your grocery inventory and never overpay again.',
        images: ['/og-image.png'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="icon" href="/icons/icon-192x192.png" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            </head>
            <body className="antialiased min-h-screen">
                {children}
            </body>
        </html>
    )
}
