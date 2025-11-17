'use client'


import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, Play, TriangleAlert, Check, X, Sparkles } from 'lucide-react'
import type { Post } from '@/types/post'
import { DecideButton } from '@/components/ui/DecideButton'
import React from "react";


export function ReelCard({ reel, onDecide }: { reel: Post; onDecide: (label: string) => void }) {
    return (
        <motion.article
            layout
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{type: 'spring', stiffness: 120, damping: 14}}
            className="relative rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
            <header className="flex items-center justify-between px-4 sm:px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className="size-9 grid place-items-center rounded-xl bg-primary/10">
                        {reel.type === 'video' ? (
                            <Play className="size-4 text-primary"/>
                        ) : reel.type === 'image' ? (
                            <ImageIcon className="size-4 text-primary"/>
                        ) : (
                            <FileText className="size-4 text-primary"/>
                        )}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-slate-900 line-clamp-1">{reel.title}</div>
                        <div className="text-xs text-slate-500">{reel.source} • {reel.postedAt}</div>
                    </div>
                </div>
                <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium tracking-wide bg-primary/5 text-primary border border-primary/20">Oceń wpis</span>
            </header>

            <div className="relative">
                {reel.type === 'video' && (
                    <video src={reel.payload_url} controls className="w-full aspect-[9/16] object-cover bg-slate-100"/>
                )}
                {reel.type === 'image' && (
                    <img src={reel.payload_url} alt={reel.title}
                         className="w-full aspect-[9/16] object-cover bg-slate-100"/>
                )}
                {reel.type === 'text' && (
                    <div className="w-full aspect-[9/16] bg-gradient-to-b from-slate-50 to-slate-100 p-6">
                        <p className="text-slate-800 text-lg leading-relaxed">{reel.body}</p>
                    </div>
                )}
            </div>
            
            {reel.type !== 'text' && (
                <div className="px-4 sm:px-5 py-3">
                    <p className="text-slate-700 text-sm leading-relaxed">{reel.body}</p>
                </div>
            )}

            <div className="px-3 sm:px-4 pb-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <DecideButton label="Prawda" icon={<Check className="size-4"/>} tone="success"
                                  onClick={() => onDecide('Prawda')}/>
                    <DecideButton label="Manipulacja" icon={<TriangleAlert className="size-4"/>} tone="warn"
                                  onClick={() => onDecide('Manipulacja')}/>
                    <DecideButton label="Fake / AI" icon={<X className="size-4"/>} tone="danger"
                                  onClick={() => onDecide('Fake / AI')}/>
                    <DecideButton label="Nie wiem" icon={<Sparkles className="size-4"/>} tone="neutral"
                                  onClick={() => onDecide('Nie wiem')}/>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                    Skróty: <kbd className="px-1.5 py-0.5 rounded border">1</kbd> Prawda • <kbd
                    className="px-1.5 py-0.5 rounded border">2</kbd> Manipulacja • <kbd
                    className="px-1.5 py-0.5 rounded border">3</kbd> Fake/AI • <kbd
                    className="px-1.5 py-0.5 rounded border">4</kbd> Nie wiem
                </p>
            </div>
        </motion.article>
    )
}