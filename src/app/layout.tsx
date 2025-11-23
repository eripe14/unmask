import '@/styles/globals.css'
import type { Metadata } from 'next'
import { APP } from '@/lib/constants'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Navbar } from '@/components/header/Navbar'

export const metadata: Metadata = {
    title: APP.name,
    description: 'Reels-like verification of truth / manipulation / fake-AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="pl">
                <body className="relative min-h-dvh bg-white text-slate-900 antialiased">
                    <div className={'relative z-10'}>
                        <Navbar />
                        <main>{children}</main>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
