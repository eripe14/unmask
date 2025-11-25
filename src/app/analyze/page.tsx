import AnalyzeClient from '@/components/analyze/AnalyzeClient'
import { Footer } from '@/components/footer/Footer'

export const dynamic = 'force-dynamic'

export default function Page() {
    return (
        <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
            <AnalyzeClient />
            <Footer />
        </section>
    )
}
