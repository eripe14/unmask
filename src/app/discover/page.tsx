import { ensureProfile } from '@/server/upsertProfile'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import ReelFeed from '@/components/reels/ReelFeed'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { Reel } from '@/types/post'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function getUnseenReels(userId: string): Promise<Reel[]> {
    // Pobierz reelsy które użytkownik już ocenił
    const { data: seenVotes } = await supabase
        .from('user_votes')
        .select('reel_id')
        .eq('user_id', userId)

    const seenReelIds = seenVotes?.map((vote) => vote.reel_id) || []

    // Pobierz reelsy których użytkownik jeszcze NIE ocenił
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

    return (reelsData || []) as Reel[]
}

export default async function Discover() {
    const { userId } = await auth()
    if (!userId) return null

    await ensureProfile()

    const reelsData = await getUnseenReels(userId)

    return (
        <section className="relative overflow-hidden">
            <SignedOut>
                <main className="mx-auto max-w-3xl px-4 py-10">
                    <h1 className="text-2xl text-primary">Zaloguj się, aby przeglądać treści</h1>
                </main>
            </SignedOut>

            <SignedIn>
                {reelsData.length === 0 ? (
                    <main className="mx-auto flex min-h-[100dvh] max-w-3xl items-center justify-center px-4">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white">🎉 Gratulacje!</h1>
                            <p className="mt-2 text-lg text-slate-300">
                                Obejrzałeś wszystkie dostępne reelsy!
                            </p>
                            <p className="mt-4 text-sm text-slate-400">
                                Wróć później, gdy pojawią się nowe treści do oceny.
                            </p>
                        </div>
                    </main>
                ) : (
                    <ReelFeed items={reelsData} userId={userId} />
                )}
            </SignedIn>
        </section>
    )
}
