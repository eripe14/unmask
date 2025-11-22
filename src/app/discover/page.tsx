import { ensureProfile } from '@/server/upsertProfile'
import { Navbar } from '@/components/header/Navbar'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Reel } from '@/types/post'
import ReelFeed from '@/components/reels/ReelFeed'
import { auth } from '@clerk/nextjs/server'

const REELS: Reel[] = [
    {
        id: 'r1',
        type: 'video',
        src: '/video.mkv',
        title: 'Nagranie z drona: zamknięta ulica po rzekomym wybuchu',
        body: 'Czy to nagranie jest prawdziwe? Oceń wiarygodność materiału.',
        source: '@citywatch',
        postedAt: '3 min temu',
    },
    {
        id: 'r2',
        type: 'image',
        src: 'https://picsum.photos/id/1011/1200/800',
        title: 'Zdjęcie z protestu – podpis sugeruje 2024, ale czy na pewno?',
        body: 'Zwróć uwagę na detale: banery, sezon, oznaczenia.',
        source: '@streetlens',
        postedAt: '12 min temu',
    },
    {
        id: 'r3',
        type: 'text',
        title: 'PILNE: Miasto wyłącza wszystkie światła dziś o 18:00!',
        body: 'Udostępnij zanim usuną! (czyli klasyczny clickbait – oceń to)',
        source: 'Anon news',
        postedAt: '27 min temu',
    },
]

export default async function Discover() {
    const userId = auth()
    if (!userId) return null

    await ensureProfile()

    return (
        <section className="relative overflow-hidden">
            <Navbar />
            <SignedOut>
                <main className="mx-auto max-w-3xl px-4 py-10">
                    <h1 className="text-2xl text-primary">Zaloguj się, aby przeglądać treści</h1>
                </main>
            </SignedOut>

            <SignedIn>
                <ReelFeed items={REELS} />
            </SignedIn>
        </section>
    )
}
