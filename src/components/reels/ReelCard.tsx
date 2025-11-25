'use client'

import { FileText, Pause, Play } from 'lucide-react'
import { Reel } from '@/types/post'
import React, { useEffect, useRef, useState } from 'react'
import FloatingParticles from '@/components/ui/FloatingParticles'

export default function ReelCard({ reel }: { reel: Reel }) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false)

    const togglePlay = () => {
        const videoElement = videoRef.current
        if (videoElement) {
            if (videoElement.paused || videoElement.ended) {
                videoElement.play()
                setIsPlaying(true)
                setIsBlocked(false)
            } else {
                videoElement.pause()
                setIsPlaying(false)
            }
        }
    }

    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement || reel.type !== 'video' || !reel.src) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsPlaying(false)
            setIsBlocked(false)
            return
        }

        setIsPlaying(false)
        setIsBlocked(false)

        const attemptPlay = () => {
            videoElement.pause()

            const playPromise = videoElement.play()

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true)
                        setIsBlocked(false)
                    })
                    .catch(() => {
                        setIsPlaying(false)
                        setIsBlocked(true)
                    })
            }
        }

        videoElement.addEventListener('loadedmetadata', attemptPlay)

        attemptPlay()

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)

        videoElement.addEventListener('play', handlePlay)
        videoElement.addEventListener('pause', handlePause)

        return () => {
            videoElement.removeEventListener('loadedmetadata', attemptPlay)
            videoElement.removeEventListener('play', handlePlay)
            videoElement.removeEventListener('pause', handlePause)
        }
    }, [reel.id, reel.type, reel.src])

    return (
        <article className="relative flex h-full w-full flex-col overflow-hidden bg-white">
            <header className="absolute left-0 right-0 top-0 z-10 flex shrink-0 items-center justify-between px-4 py-3 sm:px-5">
                <div className="flex flex-grow items-center justify-center gap-3">
                    <div className="grid size-9 place-items-center rounded-xl text-white backdrop-blur-sm">
                        {(!reel.type || (reel.type !== 'video' && reel.type !== 'image')) && (
                            <FileText className="size-8 text-primary" />
                        )}
                    </div>
                    {(!reel.type || (reel.type !== 'video' && reel.type !== 'image')) && (
                        <div className="line-clamp-1 text-xl font-semibold text-slate-900 drop-shadow-md md:text-3xl">
                            {reel.title ?? 'Treść do oceny'}
                        </div>
                    )}
                </div>
            </header>

            <div className="relative flex h-full w-full items-center justify-center">
                {reel.type === 'video' && (
                    <div className="relative h-full">
                        <video
                            ref={videoRef}
                            key={reel.id}
                            src={reel.src ?? ''}
                            controls={false}
                            className="h-full w-auto max-w-full object-contain"
                            loop
                            playsInline
                            onClick={togglePlay}
                        />

                        {isBlocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <button
                                    onClick={togglePlay}
                                    className="flex size-16 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-sm transition hover:bg-white/50"
                                    title="Odtwórz wideo"
                                >
                                    <Play className="size-8 fill-white" />
                                </button>
                            </div>
                        )}

                        {!isPlaying && !isBlocked && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <Pause className="size-10 fill-white/80 opacity-70 transition-opacity duration-300" />
                            </div>
                        )}
                    </div>
                )}
                {reel.type === 'image' && (
                    <img
                        key={reel.src ?? ''}
                        src={reel.src ?? ''}
                        alt={reel.title ?? ''}
                        className="h-full w-auto max-w-full object-contain"
                    />
                )}
                {reel.type === 'text' && (
                    <div className="mx-auto flex h-full w-full items-center justify-center bg-white p-6 sm:p-8">
                        <FloatingParticles />
                        <div className="relative">
                            <div
                                className="max-w-96 rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                                style={{
                                    boxShadow:
                                        '0 0 0 4px #e11d48, 0 0 30px 10px rgba(225, 28, 72, 0.7)',
                                }}
                            >
                                <p className="text-justify text-xl font-medium leading-relaxed text-slate-800">
                                    {reel.body}
                                </p>
                                {reel.author && (
                                    <p className="mt-4 text-sm font-semibold text-primary">
                                        - {reel.author}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {reel.type !== 'text' && reel.body && (
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-4 pb-20 pt-12 sm:px-5 sm:pb-24">
                    <p className="text-sm leading-relaxed text-white drop-shadow-lg">{reel.body}</p>
                </div>
            )}
        </article>
    )
}
