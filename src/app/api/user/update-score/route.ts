// app/api/user/update-score/route.ts
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
        const { userId } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'Brak ID użytkownika.' }, { status: 400 })
        }

        console.log('Inkrementuję wynik dla:', userId)

        // Użyj funkcji postgreSQL do atomowej inkrementacji
        const { data, error } = await supabaseAdmin.rpc('increment_correct_answers', {
            user_id_to_increment: userId,
        })

        if (error) {
            console.error('Błąd RPC przy inkrementacji wyniku:', error)
            return NextResponse.json(
                { error: 'Nie udało się zaktualizować wyniku.', details: error.message },
                { status: 500 },
            )
        }

        console.log('✓ Nowy wynik:', data)
        return NextResponse.json({ success: true, new_score: data })
    } catch (error) {
        console.error('Wewnętrzny błąd serwera:', error)
        return NextResponse.json({ error: 'Błąd przetwarzania żądania.' }, { status: 500 })
    }
}
