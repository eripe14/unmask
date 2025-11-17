'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReelCard from './ReelCard'
import { Reel } from '@/types/post'
import { Check, Sparkles, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/cn'

function DecideBtn({
    label,
    icon,
    tone,
    onClick,
}: {
    label: string
    icon: React.ReactNode
    tone: 'success' | 'warn' | 'danger' | 'neutral'
    onClick: () => void
}) {
    const tones: Record<string, string> = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
        warn: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
        danger: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15',
        neutral: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100',
    }
    return (
        <button
            onClick={onClick}
            className={cn(
                'inline-flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition',
                tones[tone],
            )}
        >
            {icon}
            {label}
        </button>
    )
}

function useStepWheel(delayMs = 700) {
    const lock = useRef(false)
    return (deltaY: number, step: (dir: 1 | -1) => void) => {
        if (lock.current) return
        const dir = deltaY > 0 ? 1 : -1
        step(dir)
        lock.current = true
        setTimeout(() => (lock.current = false), delayMs)
    }
}

export default function ReelFeed({ items }: { items: Reel[] }) {
    const [index, setIndex] = useState(0)
    const current = items[index]
    const containerRef = useRef<HTMLDivElement | null>(null)
    const touchStartY = useRef<number | null>(null)
    const handleWheel = useStepWheel(650)

    // key shortcuts
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (['1', '2', '3', '4', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key))
                e.preventDefault()
            if (e.key === 'ArrowDown' || e.key === 'PageDown') next()
            if (e.key === 'ArrowUp' || e.key === 'PageUp') prev()
            if (e.key === '1') decide('Prawda')
            if (e.key === '2') decide('Manipulacja')
            if (e.key === '3') decide('Fake / AI')
            if (e.key === '4') decide('Nie wiem')
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    // prevent page scroll while over feed
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            handleWheel(e.deltaY, (dir) => (dir > 0 ? next() : prev()))
        }
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel as any)
    }, [handleWheel])

    // touch swipe (mobile)
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: React.TouchEvent) => {
        const start = touchStartY.current
        if (start == null) return
        const end = e.changedTouches[0].clientY
        const diff = start - end // >0 = swipe up
        const threshold = 60
        if (Math.abs(diff) > threshold) {
            diff > 0 ? next() : prev()
        }
        touchStartY.current = null
    }

    function next() {
        setIndex((i) => Math.min(i + 1, items.length - 1))
    }

    function prev() {
        setIndex((i) => Math.max(i - 1, 0))
    }

    function decide(_label: 'Prawda' | 'Manipulacja' | 'Fake / AI' | 'Nie wiem') {
        // tu można wysłać wynik do backendu / Supabase
        next()
    }

    return (
        <section
            ref={containerRef}
            className="relative mx-auto min-h-[100dvh] max-w-full overflow-hidden bg-white pb-28" /* miejsce na stały pasek */
            // onTouchStart/onTouchEnd + useEffect wheel – jak miałeś
            onTouchStart={(e) => {
                touchStartY.current = e.touches[0].clientY
            }}
            onTouchEnd={(e) => {
                const s = touchStartY.current
                if (s == null) return
                const d = s - e.changedTouches[0].clientY
                const t = 60
                if (Math.abs(d) > t) {
                    d > 0 ? next() : prev()
                }
                touchStartY.current = null
            }}
        >
            {/* topbar */}
            <div className="sticky top-0 z-10 mx-auto flex h-14 max-w-[560px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 text-sm backdrop-blur supports-[backdrop-filter]:bg-white/70">
                <div className="font-semibold text-slate-900">Reels • Oceń treści</div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-slate-700">
                    {index + 1} / {items.length}
                </div>
            </div>

            {/* karta */}
            <div className="relative mx-auto max-w-[560px] py-6">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 24, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -24, scale: 0.99 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="active group"
                    >
                        <ReelCard reel={current} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* stały pasek decyzji — zawsze widoczny */}
            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
                <div className="mx-auto max-w-[560px] px-3 py-3 sm:px-4">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <DecideBtn
                            label="Prawda"
                            icon={<Check className="size-4" />}
                            tone="success"
                            onClick={() => decide('Prawda')}
                        />
                        <DecideBtn
                            label="Manipulacja"
                            icon={<TriangleAlert className="size-4" />}
                            tone="warn"
                            onClick={() => decide('Manipulacja')}
                        />
                        <DecideBtn
                            label="Fake / AI"
                            icon={<X className="size-4" />}
                            tone="danger"
                            onClick={() => decide('Fake / AI')}
                        />
                        <DecideBtn
                            label="Nie wiem"
                            icon={<Sparkles className="size-4" />}
                            tone="neutral"
                            onClick={() => decide('Nie wiem')}
                        />
                    </div>
                    <p className="mt-2 text-center text-[11px] text-slate-500">
                        Gesty: przesuń w górę/dół • Klawiatura: 1–4, PgUp/PgDn • Scroll: 1 post
                    </p>
                </div>
            </div>
        </section>
    )
}
