'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReelCard from './ReelCard'
import { Reel, UserDecisionType } from '@/types/post'
import { Check, Sparkles, TriangleAlert, X } from 'lucide-react'

type FeedbackType = 'correct' | 'incorrect' | null

export default function ReelFeed({ items, userId }: { items: Reel[]; userId: string }) {
    const [index, setIndex] = useState(0)
    const [feedback, setFeedback] = useState<FeedbackType>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hiddenReelIds, setHiddenReelIds] = useState<Set<string>>(new Set())
    const containerRef = useRef<HTMLDivElement | null>(null)
    const touchStartY = useRef<number | null>(null)

    const availableReels = items.filter((reel) => !hiddenReelIds.has(reel.id))
    const current = availableReels[index]
    const maxIndex = availableReels.length - 1

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    if (!current || availableReels.length === 0) {
        return (
            <div className="flex min-h-[100dvh] items-center justify-center bg-black">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">🎉 Obejrzałeś wszystko!</h2>
                    <p className="mt-2 text-slate-300">Wróć później po nowe treści</p>
                    <a
                        href="/stats"
                        className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-white"
                    >
                        Zobacz statystyki
                    </a>
                </div>
            </div>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (isSubmitting || feedback) return

            if (['1', '2', '3', '4', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key))
                e.preventDefault()

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                setIndex((i) => (i === maxIndex ? 0 : i + 1))
            }

            if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                setIndex((i) => (i === 0 ? maxIndex : i - 1))
            }

            if (e.key === '1') decide('Prawda')
            if (e.key === '2') decide('Manipulacja')
            if (e.key === '3') decide('Fake / AI')
            if (e.key === '4') decide('Nie wiem')
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isSubmitting, feedback, maxIndex])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        let timeout: NodeJS.Timeout | null = null

        const throttledWheel = (e: WheelEvent) => {
            e.preventDefault()
            if (timeout || isSubmitting || feedback) return

            const dir = e.deltaY > 0 ? 1 : -1

            if (dir > 0) {
                setIndex((i) => (i === maxIndex ? 0 : i + 1))
            } else {
                setIndex((i) => (i === 0 ? maxIndex : i - 1))
            }

            timeout = setTimeout(() => {
                timeout = null
            }, 650)
        }

        el.addEventListener('wheel', throttledWheel, { passive: false })
        return () => {
            el.removeEventListener('wheel', throttledWheel as any)
            if (timeout) clearTimeout(timeout)
        }
    }, [isSubmitting, feedback, maxIndex])

    const onTouchStart = (e: React.TouchEvent) => {
        if (isSubmitting || feedback) return
        touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: React.TouchEvent) => {
        if (isSubmitting || feedback) return
        const start = touchStartY.current
        if (start == null) return
        const end = e.changedTouches[0].clientY
        const diff = start - end
        const threshold = 60
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                setIndex((i) => (i === maxIndex ? 0 : i + 1))
            } else {
                setIndex((i) => (i === 0 ? maxIndex : i - 1))
            }
        }
        touchStartY.current = null
    }

    function closeFeedback() {
        setHiddenReelIds((prev) => new Set([...prev, current.id]))
        setFeedback(null)
        setIsSubmitting(false)

        const newMaxIndex = availableReels.length - 2
        if (index > newMaxIndex) {
            setIndex(0)
        }
    }

    const updateScore = async (isCorrect: boolean) => {
        if (!isCorrect) return

        const response = await fetch('/api/user/update-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        })

        if (!response.ok) {
            console.error('Błąd aktualizacji wyniku:', await response.json())
        }
    }

    async function decide(label: UserDecisionType) {
        if (!current?.id || isSubmitting || feedback) return

        setIsSubmitting(true)

        try {
            const voteResponse = await fetch('/api/user/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    reelId: current.id,
                    decision: label,
                }),
            })

            if (!voteResponse.ok) {
                const errorData = await voteResponse.json()
                console.error('Błąd zapisu głosu:', errorData)
                alert('Nie udało się zapisać głosu: ' + (errorData.error || 'Nieznany błąd'))
                setIsSubmitting(false)
                return
            }

            if (current.verdict && current.verdict !== 'Niezweryfikowane') {
                const decisionForComparison = (
                    label === 'Fake / AI' ? 'Fałsz / AI' : label
                ) as Reel['verdict']

                const isCorrect = current.verdict === decisionForComparison
                setFeedback(isCorrect ? 'correct' : 'incorrect')

                if (isCorrect) {
                    await updateScore(true)
                }
            } else {
                setHiddenReelIds((prev) => new Set([...prev, current.id]))
                setIsSubmitting(false)

                const newMaxIndex = availableReels.length - 2
                if (index > newMaxIndex) {
                    setIndex(0)
                }
            }
        } catch (error) {
            alert('Wystąpił błąd: ' + error)
            setIsSubmitting(false)
        }
    }

    return (
        <section
            ref={containerRef}
            className="relative mx-auto flex h-[100dvh] max-w-full flex-col overflow-hidden bg-black"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className="fixed left-4 top-4 z-30 rounded-full bg-black/70 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm sm:left-6 sm:top-6 sm:px-4 sm:py-2">
                Rolka {index + 1}/{availableReels.length}
            </div>

            <div className="relative h-full w-full overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={current?.id || 'empty'}
                        initial={{ opacity: 0, y: 24, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -24, scale: 0.99 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="h-full w-full"
                    >
                        <ReelCard reel={current} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 20 }}
                            className="relative mx-4 max-w-lg rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8"
                        >
                            {feedback === 'correct' ? (
                                <React.Fragment>
                                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100">
                                        <Check className="size-8 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Świetnie! 🎉
                                    </h2>
                                    <p className="mt-2 text-slate-600">
                                        Twoja odpowiedź jest poprawna!
                                    </p>
                                    {current?.source && (
                                        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-left">
                                            <p className="text-sm font-semibold leading-relaxed text-slate-700">
                                                Źródło: {current.source}
                                            </p>
                                        </div>
                                    )}
                                    <button
                                        onClick={closeFeedback}
                                        className="mt-6 w-full rounded-xl bg-emerald-500 px-6 py-3 text-white transition hover:bg-emerald-600"
                                    >
                                        Dalej
                                    </button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-100">
                                        <X className="size-8 text-red-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">Niedobrze</h2>
                                    <p className="mt-2 font-semibold text-slate-700">
                                        Poprawna odpowiedź: {current?.verdict}
                                    </p>
                                    {current?.explanation_summary && (
                                        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-left">
                                            <p className="text-sm leading-relaxed text-slate-700">
                                                {current.explanation_summary}
                                            </p>
                                        </div>
                                    )}
                                    {current?.source && (
                                        <p className="mt-2 text-sm font-semibold text-slate-700">
                                            Źródło: {current.source}
                                        </p>
                                    )}
                                    {current?.source_link && (
                                        <a
                                            href={current.source_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-block text-sm text-blue-600 hover:underline"
                                        >
                                            Sprawdź link →
                                        </a>
                                    )}
                                    <button
                                        onClick={closeFeedback}
                                        className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
                                    >
                                        Rozumiem, dalej
                                    </button>
                                </React.Fragment>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-24 right-4 z-20 flex flex-col gap-3 sm:bottom-32 sm:right-6">
                <button
                    onClick={() => decide('Prawda')}
                    disabled={isSubmitting || !!feedback}
                    className="group flex size-14 flex-col items-center justify-center gap-0.5 rounded-full bg-emerald-500 text-white shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50 sm:size-16"
                    title="Prawda (klawisz 1)"
                >
                    <Check className="size-5 sm:size-6" />
                    <span className="text-[9px] font-semibold sm:text-[10px]">Prawda</span>
                </button>

                <button
                    onClick={() => decide('Manipulacja')}
                    disabled={isSubmitting || !!feedback}
                    className="group flex size-14 flex-col items-center justify-center gap-0.5 rounded-full bg-amber-500 text-white shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50 sm:size-16"
                    title="Manipulacja (klawisz 2)"
                >
                    <TriangleAlert className="size-5 sm:size-6" />
                    <span className="text-[9px] font-semibold sm:text-[10px]">Manipul.</span>
                </button>

                <button
                    onClick={() => decide('Fake / AI')}
                    disabled={isSubmitting || !!feedback}
                    className="group flex size-14 flex-col items-center justify-center gap-0.5 rounded-full bg-red-500 text-white shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50 sm:size-16"
                    title="Fake / AI (klawisz 3)"
                >
                    <X className="size-5 sm:size-6" />
                    <span className="text-[9px] font-semibold sm:text-[10px]">Fake</span>
                </button>

                <button
                    onClick={() => decide('Nie wiem')}
                    disabled={isSubmitting || !!feedback}
                    className="group flex size-14 flex-col items-center justify-center gap-0.5 rounded-full bg-slate-600 text-white shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50 sm:size-16"
                    title="Nie wiem (klawisz 4)"
                >
                    <Sparkles className="size-5 sm:size-6" />
                    <span className="text-[9px] font-semibold sm:text-[10px]">Nie wiem</span>
                </button>
            </div>

            <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20">
                <div className="mx-auto max-w-fit rounded-full bg-black/70 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <p className="text-center text-[11px] leading-tight text-white sm:text-xs">
                        Gesty: przesuń w górę/dół • Klawiatura: 1–4, PgUp/PgDn
                    </p>
                </div>
            </div>
        </section>
    )
}
