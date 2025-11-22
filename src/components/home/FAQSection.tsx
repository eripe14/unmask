'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// --- Dane FAQ ---
const faqItems = [
    {
        question: 'Czym dokładnie jest Unmask?',
        answer: 'Unmask to platforma dedykowana walce z cyfrową dezinformacją i treściami zmanipulowanymi lub generowanymi przez sztuczną inteligencję (AI). Naszą misją jest edukowanie społeczeństwa i dostarczanie narzędzi do weryfikacji autentyczności treści online.',
    },
    {
        question: 'Jak Unmask wykrywa treści generowane przez AI?',
        answer: 'TODO',
    },
    {
        question: 'Czy mogę używać Unmask za darmo?',
        answer: 'Tak, podstawowe funkcje edukacyjne i dostęp do wybranych analiz są darmowe. Oferujemy również plany premium z zaawansowanymi narzędziami do weryfikacji i nieograniczonym dostępem do naszej bazy danych treści.',
    },
    {
        question: 'Czym jest "deepfake" i czy Unmask to wykrywa?',
        answer: 'Deepfake to rodzaj fałszerstwa stworzonego przez AI, które łączy i nakłada istniejące obrazy i materiały wideo, aby stworzyć fałszywe wideo lub audio. Tak, wykrywanie deepfake’ów w wideo i audio jest jedną z kluczowych funkcji naszej platformy.',
    },
    {
        question: 'W jaki sposób Unmask mnie edukuje?',
        answer: 'Zamiast suchych raportów, prezentujemy zidentyfikowane przykłady manipulacji w formie krótkich, angażujących klipów (podobnych do Reels/TikTok), zdjęć czy wpisów, które pokazują krok po kroku, na co zwracać uwagę. To edukacja przez doświadczenie, która buduje Twoją osobistą odporność na fałsz.',
    },
]

const FAQItem = ({
    question,
    answer,
    index,
}: {
    question: string
    answer: string
    index: number
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
            <button
                className="flex w-full items-center justify-between p-5 text-left md:p-6"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="pr-4 text-lg font-semibold text-slate-900">{question}</h3>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="size-6 text-primary transition-colors duration-300" />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="text-md border-t border-slate-100 px-5 pb-5 pt-4 text-justify leading-relaxed text-slate-700 md:px-6 md:pb-6">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export function FAQSection() {
    return (
        <section id="faq" className="relative overflow-hidden bg-white py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold uppercase tracking-wide text-primary">
                        Masz pytania?
                    </h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Najczęściej zadawane pytania
                    </p>
                    <p className="mt-4 text-xl text-slate-600">
                        Szybkie odpowiedzi na Twoje najważniejsze pytania dotyczące{' '}
                        <span className="text-primary">Unmask</span>.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-3xl space-y-4">
                    {faqItems.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Dodatkowy element wizualny (glowing spot) pasujący do kolorystyki */}
            <div className="absolute right-0 top-0 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        </section>
    )
}
