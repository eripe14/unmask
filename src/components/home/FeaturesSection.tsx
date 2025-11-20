'use client'
import { motion } from 'framer-motion'

const features = [
    {
        label: 'resources',
        title: 'Gromadzenie i monitorowanie treści',
        description:
            'Nasz system nieustannie przeszukuje publicznie dostępne zasoby internetu – od postów w mediach społecznościowych, przez artykuły, aż po materiały wideo. Skupiamy się na treściach generowanych przez użytkowników, przy użyciu AI, aby zrozumieć, co aktualnie zyskuje na popularności i jakie techniki AI są wykorzystywane.',
    },
    {
        label: 'filtering',
        title: 'Zaawansowana analiza i filtrowanie',
        description:
            'Zebrane materiały przechodzą przez złożony proces weryfikacji, aby sprawdzić ich rzetelność. Program analizuje treści pod kątem wzorców i anomalii charakterystycznych dla sztucznej inteligencji. Potrafimy odróżnić materiały stworzone w całości przez AI (np. deepfake wideo, tekst wygenerowany przez model językowy) od tych, które zostały przez nią jedynie subtelnie zmanipulowane (np. retusz zdjęć, modyfikacje dźwięku). Treści są następnie klasyfikowane jako autentyczne (stworzone przez człowieka) lub zakłamane (stworzone lub zmienione przez AI).',
    },
    {
        label: 'education',
        title: 'Edukacja przez doświadczenie',
        description:
            'Samo wykrycie to za mało – kluczowa jest edukacja. Zidentyfikowane przez nas przykłady manipulacji AI prezentujemy Wam w przystępnej i angażującej formie, zbliżonej do popularnych "Reelsów" czy TikToków. ' +
            'Wierzymy, że taka forma jest najskuteczniejszym sposobem na budowanie zbiorowej świadomości. Zamiast czytać suche raporty, widzisz konkretny przykład i od razu uczysz się, na co zwracać uwagę. ',
    },
]

export function FeaturesSection() {
    return (
        <section id="features" className="relative overflow-hidden pt-8">
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
                            className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-lg ring-0 transition-transform duration-200 will-change-transform before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[radial-gradient(60%_60%_at_50%_40%,rgba(225,29,72,0.14),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-200 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-primary/60 hover:shadow-xl hover:ring-1 hover:ring-primary/30 group-hover:before:opacity-100 md:p-6"
                        >
                            <h3 className="mt-4 text-lg font-semibold text-slate-900 md:text-xl">
                                {f.title}
                            </h3>
                            <p className="mt-2 text-justify text-sm leading-relaxed text-slate-700">
                                {f.description}
                            </p>

                            <div className="mt-5 h-0.5 w-full bg-gradient-to-r from-transparent via-primary/75 to-transparent" />
                        </motion.article>
                    ))}
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
