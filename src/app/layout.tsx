import '@/styles/globals.css'
import type { Metadata } from 'next'
import { APP } from '@/lib/constants'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

export const metadata: Metadata = {
    title: APP.name,
    description: 'Reels-like verification of truth / manipulation / fake-AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="pl">
                <body className="min-h-dvh bg-white text-slate-900 antialiased">{children}</body>
            </html>
        </ClerkProvider>
    )
}
