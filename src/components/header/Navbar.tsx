'use client'

import { APP } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { ScanEye } from 'lucide-react'
import React from 'react'
import { AuthButtons } from '@/components/header/AuthButtons'
import Link from 'next/link'

export function Navbar() {
    const navigation = [
        {
            name: 'Funkcje',
            sectionId: 'features',
            href: '/',
        },
        {
            name: 'Jak to działa',
            sectionId: 'how',
            href: '/',
        },
        {
            name: 'Przeglądaj treści',
            sectionId: '',
            href: '/discover',
        },
        {
            name: 'FAQ',
            sectionId: 'faq',
        },
    ]

    return (
        <header className="glass sticky top-0 z-50 border-b border-slate-200">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link className="flex items-center gap-3" href="/">
                    <div className={cn('grid size-9 place-items-center rounded-xl bg-primary')}>
                        <ScanEye className="size-5 text-white" />
                    </div>
                    <div className="leading-tight">
                        <div className="text-lg font-bold tracking-tight text-slate-900">
                            {APP.name}
                        </div>
                        <div className="text-xs text-slate-500">{APP.tagline}</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            className="transition-all duration-300 hover:scale-110 hover:text-slate-900"
                            onClick={() => {
                                if (item.href && item.href !== '/') {
                                    window.location.href = item.href
                                    return
                                }

                                document
                                    .getElementById(item.sectionId)
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <AuthButtons />
                </div>
            </div>
        </header>
    )
}
