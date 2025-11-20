'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { HeroImage } from '@/components/home/hero/HeroImage'

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div>
                        <h1 className="mt-4 text-justify text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                            Wykrywaj <span className="text-primary">manipulacje</span>, filtruj{' '}
                            <span className="text-primary">fake newsy</span>, ucz się myśleć
                            krytycznie.
                        </h1>

                        <p className="mt-6 pb-4 text-justify text-lg leading-relaxed text-slate-600">
                            Unmask to edukacyjna platforma w formie „reelsów”. Przewijaj karty z
                            filmami, zdjęciami i wpisami, a następnie oceń:
                            <strong> Prawda</strong>, <strong>Manipulacja</strong>, czy{' '}
                            <strong>Fake/AI</strong>. Dostajesz natychmiastowe wyjaśnienia i porady.
                        </p>

                        <Button label={'Zacznij przeglądać'} onClick={() => {}} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <HeroImage />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
