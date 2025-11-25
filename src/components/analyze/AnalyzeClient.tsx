'use client'

import React, { useMemo, useState } from 'react'
import { Brain, FileText, Info, RefreshCw, Sparkles, Target } from 'lucide-react'

type Metric = { label: string; value: number; hint: string; color: string }

export default function AnalyzeClient() {
    const [text, setText] = useState('')
    const [busy, setBusy] = useState(false)
    const [score, setScore] = useState<number | null>(null)
    const [metrics, setMetrics] = useState<Metric[]>([])
    const [reasons, setReasons] = useState<string[]>([])

    const disabled = text.trim().length < 40 || busy

    async function analyze() {
        setBusy(true)
        try {
            const r = analyzeLocally(text)
            setScore(r.score)
            setMetrics(r.metrics)
            setReasons(r.reasons)
        } finally {
            setBusy(false)
        }
    }

    function reset() {
        setText('')
        setScore(null)
        setMetrics([])
        setReasons([])
    }

    const counters = useMemo(() => {
        const words = text.trim().split(/\s+/).filter(Boolean)
        const sentences = text.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0)
        return {
            chars: text.length,
            words: words.length,
            sentences: sentences.length,
        }
    }, [text])

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Sprawdź treść</h1>
                    <p className="mt-2 max-w-2xl text-slate-600">
                        Wklej tekst, a pokażemy na ile <span className="font-medium">może</span>{' '}
                        przypominać treść generowaną przez AI oraz dlaczego tak sądzimy. To{' '}
                        <span className="font-medium">nie</span> jest dowód – tylko wskazówka oparta
                        na prostych cechach językowych.
                    </p>
                </div>
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 sm:flex">
                    <Info className="size-4 text-primary" />
                    Funkcja w wersji demo - wyniki mogą być niedokładne.
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-800">
                            <FileText className="size-5" />
                            <span className="font-semibold">Wklej tekst</span>
                        </div>
                        <div className="text-xs text-slate-500">
                            {counters.words} słów • {counters.sentences} zdań • {counters.chars}{' '}
                            znaków
                        </div>
                    </div>

                    <textarea
                        className="h-64 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none ring-primary/20 focus:ring-4"
                        placeholder="Wklej tu treść do analizy…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="mt-4 flex items-center gap-3">
                        <button
                            onClick={analyze}
                            disabled={disabled}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Brain className="size-4" />
                            Przeanalizuj
                        </button>
                        <button
                            onClick={reset}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-slate-800 hover:bg-slate-50"
                        >
                            <RefreshCw className="size-4" />
                            Wyczyść
                        </button>
                        <span className="text-xs text-slate-500">min. 40 znaków</span>
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-slate-800">
                        <Target className="size-5" />
                        <span className="font-bold">Wynik</span>
                    </div>

                    {score == null ? (
                        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
                            Wklej tekst i kliknij{' '}
                            <span className="font-semibold text-slate-700">Przeanalizuj</span>.
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <p className="text-sm text-slate-600">
                                    Prawdopodobieństwo „AI-lookalike”
                                </p>
                                <div className="mt-1 flex items-end gap-3">
                                    <div className="text-4xl font-extrabold text-slate-900">
                                        {score}%
                                    </div>
                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700">
                                        demo heurystyczne
                                    </span>
                                </div>
                                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                                    Cechy tekstu
                                </h3>
                                <div className="space-y-4">
                                    {metrics.map((m) => (
                                        <div key={m.label}>
                                            <div className="mb-1 flex items-center justify-between text-sm">
                                                <span className="font-medium text-slate-700">
                                                    {m.label}
                                                </span>
                                                <span className="text-slate-600">{m.value}%</span>
                                            </div>
                                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className={`h-full ${m.color} transition-all duration-500`}
                                                    style={{ width: `${m.value}%` }}
                                                    title={m.hint}
                                                />
                                            </div>
                                            <p className="mt-1 text-[11px] text-slate-500">
                                                {m.hint}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                                    <Sparkles className="size-4 text-primary" />
                                    Dlaczego taki wynik?
                                </h3>
                                <ul className="space-y-2">
                                    {reasons.map((r, i) => (
                                        <li
                                            key={i}
                                            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                                        >
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function analyzeLocally(text: string) {
    const clean = text.replace(/\s+/g, ' ').trim()
    if (!clean) return { score: 0, metrics: [], reasons: [] }

    const words = clean.split(/\s+/)
    const chunks: string[] = []
    let buf: string[] = []
    for (const w of words) {
        buf.push(w)
        if (buf.length >= 200) {
            chunks.push(buf.join(' '))
            buf = []
        }
    }
    if (buf.length) chunks.push(buf.join(' '))

    const parts = chunks.map(scorePLChunk)
    const raws = parts.map((p) => p.raw)
    const p75 = percentile(raws, 0.75)

    // kalibracja
    const CAL_K = 7
    const CAL_B = 0.28
    const logistic = (x: number) => 1 / (1 + Math.exp(-CAL_K * (x - CAL_B)))
    const final = Math.round(logistic(p75) * 100)

    const avg = (k: keyof ReturnType<typeof scorePLChunk>['features']) =>
        Math.round(mean(parts.map((p) => p.features[k])) * 100)

    const metrics = [
        {
            label: 'Jednorodność długości zdań',
            value: avg('sentVarLow'),
            color: 'bg-red-500',
            hint: 'Mała rozpiętość długości zdań często wskazuje na styl generatywny.',
        },
        {
            label: 'Niski TTR (różnorodność słów)',
            value: avg('ttrLow'),
            color: 'bg-rose-500',
            hint: 'Niewielka liczba unikatowych słów względem długości tekstu.',
        },
        {
            label: 'Powtarzalność n-gramów (2–4)',
            value: avg('ngramRep'),
            color: 'bg-amber-500',
            hint: 'Częste powtórzenia krótkich fraz (2–4 słowa).',
        },
        {
            label: 'Wariancja Stop-Słów',
            value: avg('stopSharePenalty'),
            color: 'bg-orange-500',
            hint: 'Proporcja stop-słów jest zbyt spójna lub ekstremalna – oznaka maszynowej generacji.',
        },
        {
            label: 'Frazy szablonowe PL',
            value: avg('templateHits'),
            color: 'bg-blue-500',
            hint: 'Utarte formuły typu „podsumowując”, „warto zauważyć, że”.',
        },
        {
            label: 'Niska „przecinkowość”',
            value: avg('commaLow'),
            color: 'bg-purple-500',
            hint: 'Zbyt mało przecinków jak na polski styl składniowy.',
        },
    ]

    const worst = parts[argmax(raws)]
    const reasons = worst.topReasons

    return { score: final, metrics, reasons }
}

function scorePLChunk(txt: string) {
    const t = txt.toLowerCase().replace(/\s+/g, ' ').trim()
    const words = t.split(' ').filter(Boolean)
    const sentences = t
        .split(/[.!?]+(?:\s|$)/)
        .map((s) => s.trim())
        .filter(Boolean)
    const onlyLetters = t.replace(/[^a-ząćęłńóśżź]/g, '')

    const ttr = words.length ? new Set(words).size / words.length : 0
    const ttrThreshold = 0.55
    const ttrLow = clamp01((ttrThreshold - Math.min(ttr, ttrThreshold)) / ttrThreshold)

    const sl = sentences.map((s) => s.split(' ').filter(Boolean).length)
    const sMean = mean(sl)
    const sStd = stddev(sl, sMean)
    const sCV = sMean ? sStd / sMean : 0
    const sentVarLow = clamp01(1 - Math.min(sCV / 0.8, 1))

    const nrep = maxNgramRepeat(words, 2, 4)
    const ngramRep = clamp01(nrep / 5)

    const commas = txt.match(/,/g)?.length ?? 0
    const commaPerSent = sentences.length ? commas / sentences.length : 0
    const commaLow = clamp01((0.35 - Math.min(commaPerSent, 0.35)) / 0.35)

    let tpl = 0
    for (const phr of TEMPLATES_PL) if (t.includes(phr)) tpl++
    for (const phr of DISCOURSE_PL) if (t.includes(phr)) tpl++
    const templateHits = clamp01(tpl / 6)

    const diacritics = onlyLetters.match(/[ąćęłńóśżź]/g)?.length ?? 0
    const diaShare = onlyLetters.length ? diacritics / onlyLetters.length : 0
    const diaPenalty = clamp01(Math.max(0, 0.015 - diaShare) / 0.015) * 0.1

    const stopCount = words.filter((w) => STOP_PL.has(w)).length
    const stopShare = words.length ? stopCount / words.length : 0

    const stopSharePenalty = clamp01(
        Math.max(0, 0.35 - stopShare) / 0.35 + Math.max(0, stopShare - 0.6) / 0.4,
    )

    const weights = {
        sentVarLow: 0.15,
        ngramRep: 0.4,
        ttrLow: 0.3,
        commaLow: 0.05,
        templateHits: 0.05,
        stopSharePenalty: 0.05,
    }

    let raw =
        weights.sentVarLow * sentVarLow +
        weights.ngramRep * ngramRep +
        weights.ttrLow * ttrLow +
        weights.commaLow * commaLow +
        weights.templateHits * templateHits +
        weights.stopSharePenalty * stopSharePenalty

    raw = clamp01(raw + diaPenalty)

    const features = { sentVarLow, ngramRep, ttrLow, commaLow, templateHits, stopSharePenalty }
    const topReasons = Object.entries(features)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([k, v]) => `${plLabel(k)} – ${Math.round(v * 100)}% (${plHint(k)})`)

    return { raw, features, topReasons }
}

function plLabel(k: string) {
    switch (k) {
        case 'sentVarLow':
            return 'Jednorodność długości zdań'
        case 'ngramRep':
            return 'Powtarzalność n-gramów'
        case 'ttrLow':
            return 'Niski TTR'
        case 'commaLow':
            return 'Niska „przecinkowość”'
        case 'templateHits':
            return 'Frazy szablonowe PL'
        case 'stopSharePenalty':
            return 'Wariancja Stop-Słów'
        default:
            return k
    }
}

function plHint(k: string) {
    switch (k) {
        case 'sentVarLow':
            return 'Mała rozpiętość długości zdań'
        case 'ngramRep':
            return 'Częste 2–4-gramy'
        case 'ttrLow':
            return 'Mała różnorodność słownictwa'
        case 'commaLow':
            return 'Mało przecinków jak na polski styl'
        case 'templateHits':
            return 'Utarte formuły/markery dyskursywne'
        case 'stopSharePenalty':
            return 'Nieprzewidywalna proporcja stop-słów'
        default:
            return ''
    }
}

function mean(a: number[]) {
    return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0
}

function stddev(a: number[], m: number) {
    if (!a.length) return 0
    const v = a.reduce((s, x) => s + (x - m) * (x - m), 0) / a.length
    return Math.sqrt(v)
}

function clamp01(x: number) {
    return Math.max(0, Math.min(1, x))
}

function argmax(a: number[]) {
    return a.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)
}

function percentile(a: number[], p: number) {
    if (!a.length) return 0
    const b = [...a].sort((x, y) => x - y)
    const idx = Math.min(b.length - 1, Math.max(0, Math.round(p * (b.length - 1))))
    return b[idx]
}

function maxNgramRepeat(words: string[], minN: number, maxN: number) {
    let mx = 0
    for (let n = minN; n <= maxN; n++) {
        const map: Record<string, number> = {}
        for (let i = 0; i <= words.length - n; i++) {
            const g = words.slice(i, i + n).join(' ')
            map[g] = (map[g] || 0) + 1
            if (map[g] > mx) mx = map[g]
        }
    }
    return mx
}

// — polskie listy —
const TEMPLATES_PL = [
    'w niniejszym artykule',
    'w niniejszym tekście',
    'w niniejszej pracy',
    'podsumowując',
    'na zakończenie',
    'reasumując',
    'konkludując',
    'warto zauważyć, że',
    'należy podkreślić, że',
    'co więcej',
    'ponadto',
    'po pierwsze',
    'po drugie',
    'z drugiej strony',
    'z jednej strony',
    'nie ulega wątpliwości, że',
]
const DISCOURSE_PL = [
    'przede wszystkim',
    'w rezultacie',
    'w konsekwencji',
    'w związku z tym',
    'tym samym',
    'jak również',
    'między innymi',
    'zatem',
    'dlatego też',
    'innymi słowy',
    'mówiąc inaczej',
]

const STOP_PL = new Set([
    'i',
    'oraz',
    'a',
    'ale',
    'lecz',
    'lub',
    'albo',
    'czy',
    'ani',
    'zarówno',
    'jak',
    'jak i',
    'że',
    'to',
    'żeby',
    'aby',
    'bo',
    'więc',
    'zatem',
    'dlatego',
    'ponieważ',
    'gdyż',
    'o',
    'do',
    'od',
    'na',
    'w',
    'we',
    'z',
    'ze',
    'po',
    'przez',
    'dla',
    'pod',
    'nad',
    'u',
    'za',
    'między',
    'spod',
    'znad',
    'spośród',
    'ten',
    'ta',
    'to',
    'ci',
    'te',
    'tamten',
    'taki',
    'taka',
    'takie',
    'jest',
    'być',
    'są',
    'było',
    'była',
    'byli',
    'będzie',
    'będą',
    'był',
    'byłam',
    'bym',
    'byśmy',
    'się',
    'nie',
    'tak',
    'jak',
    'który',
    'która',
    'które',
    'którym',
    'którą',
    'którzy',
    'jestem',
    'jesteś',
    'jest',
    'jesteśmy',
    'jesteście',
    'są',
    'mam',
    'masz',
    'ma',
    'mamy',
    'macie',
    'mają',
    'mnie',
    'mi',
    'mną',
    'ty',
    'wy',
    'my',
    'oni',
    'one',
    'on',
    'ona',
    'ono',
    'ich',
    'jej',
    'go',
    'ją',
    'jego',
    'jej',
    'twoje',
    'moje',
    'nasze',
    'wasze',
    'tu',
    'tam',
    'tutaj',
    'stąd',
    'potem',
    'następnie',
    'teraz',
])
