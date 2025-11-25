import { ensureProfile } from '@/server/upsertProfile'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import ReelFeed from '@/components/reels/ReelFeed'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { Reel } from '@/types/post'
import Link from 'next/link'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function getUnseenReels(userId: string): Promise<Reel[]> {
    const { data: seenVotes } = await supabase
        .from('user_votes')
        .select('reel_id')
        .eq('user_id', userId)

    const seenReelIds = seenVotes?.map((vote) => vote.reel_id) || []

    let query = supabase.from('reels').select('*')

    if (seenReelIds.length > 0) {
        query = query.not('id', 'in', `(${seenReelIds.join(',')})`)
    }

    const { data: reelsData, error: reelsError } = await query
        .order('sort_order', { ascending: false })
        .limit(30)

    if (reelsError) {
        console.error('Błąd pobierania Reelów:', reelsError)
        return []
    }

    const shuffledReels = (reelsData || []).sort(() => Math.random() - 0.5)
    return shuffledReels as Reel[]
}

export default async function Discover() {
    const { userId } = await auth()

    let reelsData: Reel[] = []
    if (userId) {
        await ensureProfile()
        reelsData = await getUnseenReels(userId)
    }

    return (
        <section className="relative overflow-hidden">
            <SignedOut>
                <main className="mx-auto flex min-h-[100dvh] max-w-3xl items-center justify-center px-4">
                    <div className="text-center">
                        <div className="mb-6 text-6xl">🎬</div>
                        <h1 className="text-3xl font-bold text-primary">
                            Odkryj niesamowite treści
                        </h1>
                        <p className="mt-4 text-lg text-slate-900">
                            Zaloguj się, aby przeglądać i oceniać reelsy
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/sign-in?redirect_url=/discover"
                                className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90"
                            >
                                Zaloguj się
                            </Link>
                            <Link
                                href="/sign-up?redirect_url=/discover"
                                className="rounded-lg border border-slate-600 px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
                            >
                                Załóż konto
                            </Link>
                        </div>
                    </div>
                </main>
            </SignedOut>

            <SignedIn>
                {reelsData.length === 0 ? (
                    <main className="mx-auto flex min-h-[100dvh] max-w-3xl items-center justify-center px-4">
                        <div className="text-center">
                            <div className="mb-6 text-6xl">🎉</div>
                            <h1 className="text-3xl font-bold text-white">Gratulacje!</h1>
                            <p className="mt-4 text-lg text-slate-300">
                                Obejrzałeś wszystkie dostępne reelsy!
                            </p>
                            <p className="mt-2 text-sm text-slate-400">
                                Wróć później, gdy pojawią się nowe treści do oceny.
                            </p>
                        </div>
                    </main>
                ) : (
                    <ReelFeed items={reelsData} userId={userId!} />
                )}
            </SignedIn>
        </section>
    )
}
