'use client'

import { FileText, Image as ImageIcon, Play } from 'lucide-react'
import { Reel } from '@/types/post'

export default function ReelCard({ reel }: { reel: Reel }) {
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
                    <video
                        key={reel.src}
                        src={reel.src ?? ''}
                        controls={false}
                        className="h-full w-auto max-w-full object-contain"
                        loop
                        autoPlay={true}
                        playsInline
                    />
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
