'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { BarChart3 } from 'lucide-react'
import React from 'react'

type Props = {
    variant?: 'desktop' | 'mobile'
    onAfterAction?: () => void
}

export function AuthButtons({ variant = 'desktop', onAfterAction }: Props) {
    const linkBase = 'w-full rounded-xl border px-3.5 py-2 text-center'

    return (
        <div className={variant === 'desktop' ? 'flex items-center gap-3' : 'flex flex-col gap-2'}>
            <SignedOut>
                <a
                    className={variant === 'desktop' ? 'rounded-xl border px-3.5 py-2' : linkBase}
                    href="/sign-in?redirect_url=/discover"
                    onClick={onAfterAction}
                >
                    Zaloguj
                </a>
                <a
                    className={
                        variant === 'desktop'
                            ? 'rounded-xl bg-primary px-3.5 py-2 text-white'
                            : 'w-full rounded-xl bg-primary px-3.5 py-2 text-center text-white'
                    }
                    href="/sign-up?redirect_url=/discover"
                    onClick={onAfterAction}
                >
                    Załóż konto
                </a>
            </SignedOut>

            <SignedIn>
                <UserButton
                    appearance={{
                        elements: {
                            userButtonPopoverFooter: 'hidden',
                            userButtonPopoverCard: 'border border-slate-200 shadow-lg',
                            userButtonActionButtonIcon: 'text-primary',
                            userButtonActionButtonText: 'text-slate-900',
                            userButtonPopoverActionButton: 'hover:bg-primary/5',
                            userButtonPopoverActionButtonIconBox: 'text-primary',
                            userButtonPopoverCustomItemButton: 'hover:bg-primary/5',
                            avatarBox: 'size-10',
                        },
                    }}
                >
                    <UserButton.MenuItems>
                        <UserButton.Link
                            label="Statystyki"
                            href="/stats"
                            labelIcon={<BarChart3 className="size-4 text-primary" />}
                        />
                        <UserButton.Action label="manageAccount" />
                        <UserButton.Action label="signOut" />
                    </UserButton.MenuItems>
                </UserButton>
            </SignedIn>
        </div>
    )
}
