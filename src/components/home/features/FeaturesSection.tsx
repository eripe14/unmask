'use client'
import { motion } from 'framer-motion'

const features = [
    {
        label: 'awareness',
        title: 'Zwiększenie świadomości społecznej',
        description:
            'Unmask pomaga odróżniać rzetelne informacje od fake newsów i treści generowanych przez AI.',
    },
    {
        label: 'interactive-education',
        title: 'Edukacja poprzez interakcję',
        description: 'Interaktywne materiały angażują użytkowników w naukę krytycznego myślenia.',
    },
    {
        label: 'improved-critical-thinking',
        title: 'Natychmiastowe wyjaśnienia',
        description:
            'Po każdej ocenie treści dostajesz krótkie wyjaśnienie i praktyczne wskazówki.',
    },
]

export function FeaturesSection() {
    return (
        <section id="features" className="relative overflow-hidden pt-20">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Funkcje i możliwości <span className="text-primary">Unmask</span>
                </h2>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
                    {features.map((f, i) => (
                        <motion.article
                            key={f.label}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.35, delay: i * 0.05, ease: 'easeOut' }}
                            className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-0 transition-transform duration-200 will-change-transform before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[radial-gradient(60%_60%_at_50%_40%,rgba(225,29,72,0.14),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-200 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-primary/60 hover:shadow-xl hover:ring-1 hover:ring-primary/30 group-hover:before:opacity-100 md:p-6"
                        >
                            <div className="flex items-center justify-between">
                                <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
                                    {f.label}
                                </span>
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-slate-900 md:text-xl">
                                {f.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                {f.description}
                            </p>

                            <div className="mt-5 h-0.5 w-full bg-gradient-to-r from-transparent via-primary/75 to-transparent" />
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* prefer-reduced-motion: wyłącza lifty/scale na hover */}
            <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                    .group {
                        transition: none !important;
                        transform: none !important;
                    }

                    .group:hover {
                        transform: none !important;
                    }
                }
            `}</style>
        </section>
    )
}
