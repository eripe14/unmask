'use client'

import { FileText, Image as ImageIcon, Play } from 'lucide-react'
import { Reel } from '@/types/post'

export default function ReelCard({ reel }: { reel: Reel }) {
    return (
        <article className="relative mx-auto grid max-h-[calc(100dvh-140px)] w-full max-w-[520px] grid-rows-[auto,1fr,auto] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <header className="flex items-center justify-between px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                        {reel.type === 'video' ? (
                            <Play className="size-4" />
                        ) : reel.type === 'image' ? (
                            <ImageIcon className="size-4" />
                        ) : (
                            <FileText className="size-4" />
                        )}
                    </div>
                    <div>
                        <div className="line-clamp-1 text-sm font-semibold text-slate-900">
                            {reel.title ?? 'Treść do oceny'}
                        </div>
                        <div className="text-xs text-slate-500">{reel.source ?? '@source'}</div>
                    </div>
                </div>
            </header>

            <div className="relative px-0">
                {reel.type === 'video' && (
                    <video
                        src={reel.src}
                        controls
                        className="mx-auto block aspect-[9/16] max-h-[70dvh] w-full max-w-[520px] bg-slate-100 object-contain"
                    />
                )}
                {reel.type === 'image' && (
                    <img
                        src={reel.src}
                        alt={reel.title ?? ''}
                        className="mx-auto block aspect-[9/16] max-h-[70dvh] w-full max-w-[520px] bg-slate-100 object-contain"
                    />
                )}
                {reel.type === 'text' && (
                    <div className="mx-auto aspect-[9/16] max-h-[70dvh] w-full max-w-[520px] overflow-auto bg-gradient-to-b from-slate-50 to-slate-100 p-6">
                        <p className="text-lg leading-relaxed text-slate-800">{reel.body}</p>
                    </div>
                )}
            </div>

            {/* description */}
            {reel.type !== 'text' && reel.body && (
                <div className="px-4 py-3 sm:px-5">
                    <p className="text-sm leading-relaxed text-slate-700">{reel.body}</p>
                </div>
            )}
        </article>
    )
}
