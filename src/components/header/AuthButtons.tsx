'use client'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'

export function AuthButtons() {
    const { signOut } = useClerk()
    return (
        <div className="flex items-center gap-3">
            <SignedOut>
                <a className="rounded-xl border px-3.5 py-2" href="/sign-in?redirect_url=/discover">
                    Zaloguj
                </a>
                <a
                    className="rounded-xl bg-primary px-3.5 py-2 text-white"
                    href="/sign-up?redirect_url=/discover"
                >
                    Załóż konto
                </a>
            </SignedOut>
            <SignedIn>
                <a className="rounded-xl bg-primary px-3.5 py-2 text-white" href="/discover">
                    Dashboard
                </a>
                <button onClick={() => signOut()} className="rounded-xl border px-3.5 py-2">
                    Wyloguj
                </button>
            </SignedIn>
        </div>
    )
}
