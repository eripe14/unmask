import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            persistSession: false,
        },
    },
)

export async function POST(request: Request) {
    try {
        const { userId, reelId, decision } = await request.json()

        if (!userId || !reelId || !decision) {
            return NextResponse.json(
                { error: 'Brak wymaganych danych: userId, reelId, decision' },
                { status: 400 },
            )
        }

        const { data, error } = await supabaseAdmin
            .from('user_votes')
            .upsert(
                {
                    user_id: userId,
                    reel_id: reelId,
                    decision: decision,
                },
                {
                    onConflict: 'user_id,reel_id',
                    ignoreDuplicates: false,
                },
            )
            .select()
            .single()

        if (error) {
            return NextResponse.json(
                { error: 'Nie udało się zapisać głosu', details: error.message },
                { status: 500 },
            )
        }

        return NextResponse.json({ success: true, vote: data })
    } catch (error) {
        console.error('Wewnętrzny błąd serwera:', error)
        return NextResponse.json({ error: 'Błąd przetwarzania żądania' }, { status: 500 })
    }
}
