'use client'

import { APP } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { ScanEye } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function Footer() {
    const handleScrollToSection = (sectionId?: string, href?: string) => {
        if (href && href !== '/') {
            window.location.assign(href)
            return
        }

        if (sectionId) {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const navigation = [
        {
            title: 'Platforma',
            items: [
                { name: 'O nas', href: '/', section: 'about' },
                { name: 'Nasza Misja', href: '/', section: 'mission' },
                { name: 'Funkcje', href: '/', section: 'features' },
                { name: 'FAQ', href: '/', section: 'faq' },
            ],
        },
        {
            title: 'Prawne',
            items: [
                { name: 'Regulamin', href: '/terms', section: undefined },
                { name: 'Polityka Prywatności', href: '/privacy-and-policy', section: undefined },
                { name: 'Licencje', href: '/licenses', section: undefined },
            ],
        },
    ]

    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    <div className="col-span-2 lg:col-span-2">
                        <Link className="flex items-center gap-3" href="/">
                            <div
                                className={cn(
                                    'grid size-10 place-items-center rounded-xl bg-primary',
                                )}
                            >
                                <ScanEye className="size-6 text-white" />
                            </div>
                            <div className="leading-tight">
                                <div className="text-xl font-bold tracking-tight text-slate-900">
                                    {APP.name}
                                </div>
                                <div className="text-sm text-slate-500">{APP.tagline}</div>
                            </div>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm text-slate-600">
                            Twoje narzędzie do weryfikacji cyfrowej rzeczywistości. Budujemy
                            świadome społeczeństwo odporne na AI-manipulacje.
                        </p>
                    </div>

                    {navigation.map((section) => (
                        <div key={section.title} className="text-sm">
                            <h3 className="mb-3 font-semibold uppercase tracking-wider text-slate-900">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.items.map((item) => (
                                    <li key={item.name}>
                                        <button
                                            onClick={() =>
                                                handleScrollToSection(item.section, item.href)
                                            }
                                            className="text-slate-600 transition-colors duration-200 hover:text-primary"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col items-center justify-between border-t border-slate-100 pt-8 md:flex-row">
                    <p className="order-2 mt-4 text-sm text-slate-500 md:order-1 md:mt-0">
                        &copy; {new Date().getFullYear()} {APP.name}. Wszelkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </footer>
    )
}
