'use client'
import { useSignIn } from '@clerk/nextjs'

export default function OAuthButtons() {
    const { isLoaded, signIn } = useSignIn()

    async function oauth(provider: 'oauth_google' | 'oauth_apple') {
        if (!isLoaded) return
        await signIn?.authenticateWithRedirect({
            strategy: provider,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/discover',
        })
    }

    return (
        <div className="mt-4 grid grid-cols-1 gap-2">
            <button
                type="button"
                onClick={() => oauth('oauth_google')}
                className="w-full rounded-xl border px-3 py-2 font-semibold hover:bg-slate-50"
            >
                Zaloguj z Google
            </button>
            <button
                type="button"
                onClick={() => oauth('oauth_apple')}
                className="w-full rounded-xl border px-3 py-2 font-semibold hover:bg-slate-50"
            >
                Zaloguj z Apple
            </button>
        </div>
    )
}
