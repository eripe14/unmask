import { Award, BarChart3, Target, TrendingUp } from 'lucide-react'
import { JSX } from 'react'

export default function StatsClient({
    stats,
}: {
    stats: {
        profile: { correct_answers: number }
        votes: { decision: string; created_at: string }[]
    }
}) {
    const { profile, votes } = stats

    const totalVotes = votes.length
    const correctAnswers = profile.correct_answers || 0
    const accuracy = totalVotes > 0 ? Math.round((correctAnswers / totalVotes) * 100) : 0

    const votesByDecision = votes.reduce(
        (acc: Record<string, number>, vote: { decision: string }) => {
            acc[vote.decision] = (acc[vote.decision] || 0) + 1
            return acc
        },
        {},
    )

    const decisions = [
        { label: 'Prawda', count: votesByDecision['Prawda'] || 0, color: 'bg-emerald-500' },
        {
            label: 'Manipulacja',
            count: votesByDecision['Manipulacja'] || 0,
            color: 'bg-amber-500',
        },
        { label: 'Fake / AI', count: votesByDecision['Fake / AI'] || 0, color: 'bg-red-500' },
        { label: 'Nie wiem', count: votesByDecision['Nie wiem'] || 0, color: 'bg-slate-500' },
    ]

    const maxCount = Math.max(...decisions.map((d) => d.count), 1)

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Twoje Statystyki</h1>
                    <p className="mt-2 text-slate-600">
                        Przeglądaj swoje wyniki i śledź postępy w rozpoznawaniu dezinformacji
                    </p>
                </div>

                {/* Karty statystyk */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={<Target className="size-6" />}
                        label="Łącznie ocen"
                        value={totalVotes}
                        color="bg-blue-500"
                    />
                    <StatCard
                        icon={<Award className="size-6" />}
                        label="Poprawne odpowiedzi"
                        value={correctAnswers}
                        color="bg-emerald-500"
                    />
                    <StatCard
                        icon={<TrendingUp className="size-6" />}
                        label="Celność"
                        value={`${accuracy}%`}
                        color="bg-purple-500"
                    />
                    <StatCard
                        icon={<BarChart3 className="size-6" />}
                        label="Poziom"
                        value={getLevelName(correctAnswers)}
                        color="bg-amber-500"
                        isText
                    />
                </div>

                {/* Wykres rozkładu decyzji */}
                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-slate-900">
                        Rozkład Twoich odpowiedzi
                    </h2>
                    <div className="space-y-4">
                        {decisions.map((decision) => (
                            <div key={decision.label}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700">
                                        {decision.label}
                                    </span>
                                    <span className="text-slate-600">
                                        {decision.count} (
                                        {totalVotes > 0
                                            ? Math.round((decision.count / totalVotes) * 100)
                                            : 0}
                                        %)
                                    </span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`h-full ${decision.color} transition-all duration-500`}
                                        style={{
                                            width: `${totalVotes > 0 ? (decision.count / totalVotes) * 100 : 0}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wykres kołowy (prosty) */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-slate-900">
                            Podział odpowiedzi
                        </h2>
                        <div className="flex items-center justify-center">
                            <div className="relative size-48">
                                <svg viewBox="0 0 100 100" className="rotate-[-90deg]">
                                    {decisions.map((decision, i) => {
                                        const total = decisions.reduce((sum, d) => sum + d.count, 0)
                                        const percentage =
                                            total > 0 ? (decision.count / total) * 100 : 0
                                        const offset = decisions
                                            .slice(0, i)
                                            .reduce(
                                                (sum, d) =>
                                                    sum + (total > 0 ? (d.count / total) * 100 : 0),
                                                0,
                                            )
                                        const radius = 40
                                        const circumference = 2 * Math.PI * radius
                                        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
                                        const strokeDashoffset = -((offset / 100) * circumference)

                                        return (
                                            <circle
                                                key={decision.label}
                                                cx="50"
                                                cy="50"
                                                r={radius}
                                                fill="none"
                                                stroke={
                                                    decision.color === 'bg-emerald-500'
                                                        ? '#10b981'
                                                        : decision.color === 'bg-amber-500'
                                                          ? '#f59e0b'
                                                          : decision.color === 'bg-red-500'
                                                            ? '#ef4444'
                                                            : '#64748b'
                                                }
                                                strokeWidth="20"
                                                strokeDasharray={strokeDasharray}
                                                strokeDashoffset={strokeDashoffset}
                                            />
                                        )
                                    })}
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">
                                            {totalVotes}
                                        </div>
                                        <div className="text-xs text-slate-600">głosów</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {decisions.map((decision) => (
                                <div key={decision.label} className="flex items-center gap-2">
                                    <div className={`size-3 rounded-full ${decision.color}`} />
                                    <span className="text-sm text-slate-700">{decision.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ostatnia aktywność */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-slate-900">
                            Ostatnia aktywność
                        </h2>
                        <div className="space-y-3">
                            {votes.slice(0, 8).map((vote, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`size-2 rounded-full ${
                                                vote.decision === 'Prawda'
                                                    ? 'bg-emerald-500'
                                                    : vote.decision === 'Manipulacja'
                                                      ? 'bg-amber-500'
                                                      : vote.decision === 'Fake / AI'
                                                        ? 'bg-red-500'
                                                        : 'bg-slate-500'
                                            }`}
                                        />
                                        <span className="text-sm font-medium text-slate-700">
                                            {vote.decision}
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        {new Date(vote.created_at).toLocaleDateString('pl-PL', {
                                            day: 'numeric',
                                            month: 'short',
                                        })}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {votes.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-slate-500">Brak aktywności</p>
                                <a
                                    href="/discover"
                                    className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
                                >
                                    Zacznij oceniać treści
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({
    icon,
    label,
    value,
    color,
    isText = false,
}: {
    icon: JSX.Element
    label: string
    value: string | number
    color: string
    isText?: boolean
}) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`${color} rounded-xl p-3 text-white`}>{icon}</div>
                <div>
                    <div className={`${isText ? 'text-xl' : 'text-3xl'} font-bold text-slate-900`}>
                        {value}
                    </div>
                    <div className="text-sm text-slate-600">{label}</div>
                </div>
            </div>
        </div>
    )
}

function getLevelName(score: number) {
    if (score < 10) return 'Nowicjusz'
    if (score < 25) return 'Uczeń'
    if (score < 50) return 'Adept'
    if (score < 100) return 'Ekspert'
    return 'Mistrz'
}
