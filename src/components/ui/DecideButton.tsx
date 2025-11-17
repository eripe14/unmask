'use client'

import { cn } from '@/lib/cn'
import React from "react";

export function DecideButton({ label, icon, tone = 'neutral', onClick }:{ label:string; icon:React.ReactNode; tone?: 'success'|'warn'|'danger'|'neutral'; onClick: ()=>void }){
    const tones: Record<string, string> = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
        warn: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
        danger: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15',
        neutral: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100',
    }
    return (
        <button onClick={onClick} className={cn('w-full inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition border', tones[tone])}>
            {icon}{label}
        </button>
    )
}