'use server'

import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function ensureProfile() {
    const user = await currentUser()
    if (!user) {
        console.warn('[ensureProfile] no currentUser')
        return
    }

    const id = user.id
    const email = user.emailAddresses[0]?.emailAddress ?? null
    const name = user.firstName || user.username || email || 'user'

    const { error } = await supabaseAdmin
        .from('profiles')
        .upsert({ id, email, name, updated_at: new Date().toISOString() }, { onConflict: 'id' })

    if (error) {
        console.error('[ensureProfile] upsert error:', error)
    } else {
        console.log('[ensureProfile] upsert OK for', id)
    }
}
