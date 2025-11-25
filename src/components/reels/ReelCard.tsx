'use client'

import { FileText, Image as ImageIcon, Pause, Play } from 'lucide-react'
import { Reel } from '@/types/post'
import React, { useEffect, useRef, useState } from 'react'

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
        <article className="relative flex h-full w-full flex-col overflow-hidden bg-black">
            <header className="absolute left-0 right-0 top-0 z-10 flex shrink-0 items-center justify-between bg-gradient-to-b from-black/60 via-black/30 to-transparent px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                        {reel.type === 'video' ? (
                            <Play className="size-4" />
                        ) : reel.type === 'image' ? (
                            <ImageIcon className="size-4" />
                        ) : (
                            <FileText className="size-4" />
                        )}
                    </div>
                    <div>
                        <div className="line-clamp-1 text-sm font-semibold text-white drop-shadow-md">
                            {reel.title ?? 'Treść do oceny'}
                        </div>
                    </div>
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
                    <div className="mx-auto h-full w-full max-w-md overflow-auto bg-gradient-to-b from-slate-50 to-slate-100 p-6">
                        <p className="text-lg leading-relaxed text-slate-800">{reel.body}</p>
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
