'use client'

import { APP } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { ScanEye } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AuthButtons } from '@/components/header/AuthButtons'

export function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const sheetRef = useRef<HTMLDivElement | null>(null)

    const navigation = [
        { name: 'O nas', sectionId: 'about', href: '/' },
        { name: 'Nasz cel', sectionId: 'mission', href: '/' },
        { name: 'Funkcje', sectionId: 'features', href: '/' },
        { name: 'Przeglądaj treści', sectionId: '', href: '/discover' },
        { name: 'FAQ', sectionId: 'faq', href: '/' },
    ] as const

    function handleNavClick(item: (typeof navigation)[number]) {
        if (item.href && !item.sectionId) {
            router.push(item.href)
            setOpen(false)
            return
        }
        if (item.sectionId) {
            if (pathname !== '/') {
                router.push(`/#${item.sectionId}`)
                setOpen(false)
                return
            }
            document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' })
            setOpen(false)
        }
    }

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
        const onClick = (e: MouseEvent) => {
            if (!open) return
            if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) setOpen(false)
        }
        window.addEventListener('keydown', onKey)
        window.addEventListener('click', onClick)
        return () => {
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('click', onClick)
        }
    }, [open])

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
                            onClick={() => handleNavClick(item)}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <AuthButtons />
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-50 md:hidden"
                    aria-label="Otwórz menu"
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen((v) => !v)
                    }}
                >
                    <span className="sr-only">Menu</span>
                    <div className="relative h-4 w-5">
                        <span
                            className={cn(
                                'absolute left-0 top-0 block h-[2px] w-full bg-slate-700 transition-transform',
                                open && 'translate-y-[6px] rotate-45',
                            )}
                        />
                        <span
                            className={cn(
                                'absolute left-0 top-[6px] block h-[2px] w-full bg-slate-700 transition-opacity',
                                open && 'opacity-0',
                            )}
                        />
                        <span
                            className={cn(
                                'absolute left-0 top-[12px] block h-[2px] w-full bg-slate-700 transition-transform',
                                open && '-translate-y-[6px] -rotate-45',
                            )}
                        />
                    </div>
                </button>
            </div>

            <div
                id="mobile-menu"
                className={cn(
                    'fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden',
                    open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
            >
                <div
                    ref={sheetRef}
                    className={cn(
                        'absolute right-0 top-0 h-full w-[85%] max-w-[360px]',
                        'bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80',
                        'border-l border-slate-200 shadow-2xl',
                        'before:absolute before:left-0 before:top-0 before:h-full before:w-px',
                        'before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent',
                        'transition-transform duration-300',
                        open ? 'translate-x-0' : 'translate-x-full',
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <div className="grid size-8 place-items-center rounded-lg bg-primary">
                                <ScanEye className="size-4 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{APP.name}</span>
                        </div>
                        <button
                            className="rounded-lg border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50"
                            onClick={() => setOpen(false)}
                        >
                            Zamknij
                        </button>
                    </div>

                    <nav className="flex flex-col gap-1 bg-white px-3 py-3">
                        {navigation.map((item) => (
                            <button
                                key={item.name}
                                className="w-full rounded-xl px-3 py-2 text-left text-[15px] text-slate-800 hover:bg-slate-50"
                                onClick={() => handleNavClick(item)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto border-t border-primary bg-white p-3">
                        <AuthButtons variant="mobile" onAfterAction={() => setOpen(false)} />
                    </div>
                </div>
            </div>
        </header>
    )
}
