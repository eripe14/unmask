import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import StatsClient from '@/components/stats/StatsClient'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function getUserStats(userId: string) {
    const { data: profile } = await supabase
        .from('profiles')
        .select('correct_answers, name, email')
        .eq('id', userId)
        .single()

    const { data: votes } = await supabase
        .from('user_votes')
        .select('decision, created_at, reel_id, reels(verdict)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    return {
        profile: profile || { correct_answers: 0, name: null, email: null },
        votes: votes || [],
    }
}

export default async function StatsPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in?redirect_url=/stats')
    }

    const stats = await getUserStats(userId)

    return <StatsClient stats={stats} />
}
