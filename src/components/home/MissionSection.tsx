'use client'
import { motion } from 'framer-motion'

export function MissionSection() {
    return (
        <section id="mission" className="relative overflow-hidden pt-8">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Nasz cel: <span className="text-primary">świadome społeczeństwo</span>
                </h2>

                <div className="mt-12 grid grid-cols-1">
                    <motion.article
                        key="mission"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
                        className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl ring-0 transition-transform duration-200 will-change-transform before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[radial-gradient(60%_60%_at_50%_40%,rgba(225,29,72,0.14),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-200 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-primary/60 hover:shadow-xl hover:ring-1 hover:ring-primary/30 group-hover:before:opacity-100 md:p-6"
                    >
                        <h3 className="mt-4 text-lg font-semibold text-slate-900 md:text-xl">
                            Dlaczego to robimy?
                        </h3>
                        <p className="text-md mt-2 text-justify leading-relaxed text-slate-700">
                            Celem <span className="text-primary">Unmask</span> jest uodpornienie
                            społeczeństwa na cyfrowe zagrożenia. Chcemy, aby użytkownicy tacy jak Ty
                            potrafili krytycznie oceniać to, co widzą w sieci. Dzięki temu możemy
                            wspólnie uniknąć przyszłych oszustw, zapobiegać szerzeniu się
                            dezinformacji i budować bardziej przejrzyste środowisko online.
                            Weryfikuj rzeczywistość razem z nami!
                        </p>

                        <div className="mt-5 h-0.5 w-full bg-gradient-to-r from-transparent via-primary/75 to-transparent" />
                    </motion.article>
                </div>
            </div>

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
