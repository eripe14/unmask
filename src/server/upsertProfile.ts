'use server'

import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function ensureProfile() {
    const user = await currentUser()
    if (!user) return

    const id = user.id
    const email = user.emailAddresses[0]?.emailAddress ?? null
    const name = user.firstName || user.username || email || 'user'

    await supabaseAdmin
        .from('profiles')
        .upsert({ id, email, name, updated_at: new Date().toISOString() }, { onConflict: 'id' })
}
