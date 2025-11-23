'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function AuthButtons() {
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
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: 'size-10',
                        },
                    }}
                >
                    <UserButton.MenuItems>
                        <UserButton.Link
                            label="Statystyki"
                            labelIcon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M3 3v18h18" />
                                    <path d="m19 9-5 5-4-4-3 3" />
                                </svg>
                            }
                            href="/stats"
                        />
                        <UserButton.Action label="manageAccount" />
                        <UserButton.Action label="signOut" />
                    </UserButton.MenuItems>
                </UserButton>
            </SignedIn>
        </div>
    )
}
