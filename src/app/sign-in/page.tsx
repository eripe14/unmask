'use client'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/header/Navbar'
import OAuthButtons from '@/components/auth/OAuthButtons'

export default function SignInPage() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const params = useSearchParams()
    const redirectTo = params.get('redirect_url') || '/discover'

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!isLoaded) return
        setError(null)
        try {
            const res = await signIn.create({
                identifier: email,
                password: pass,
            })
            if (res.status === 'complete') {
                await setActive({ session: res.createdSessionId })
                router.push(redirectTo)
            } else {
                setError('Wymagana dodatkowa weryfikacja.')
            }
        } catch (err) {
            const errorMessage =
                (err as { errors?: { message: string }[] })?.errors?.[0]?.message ||
                'Błąd logowania'
            setError(errorMessage)
            return
        }
    }

    return (
        <section className="relative overflow-hidden">
            <Navbar />
            <main className="mx-auto max-w-md p-6">
                <h1 className="text-2xl font-bold">Zaloguj się</h1>
                <form onSubmit={onSubmit} className="mt-6 space-y-3">
                    <input
                        className="w-full rounded-xl border px-3 py-2"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full rounded-xl border px-3 py-2"
                        placeholder="hasło"
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button className="rounded-xl bg-primary px-4 py-2 font-semibold text-white">
                        Zaloguj
                    </button>
                </form>
                <p className="mt-3 text-sm">
                    Nie masz konta?{' '}
                    <a href="/sign-up?redirect_url=/discover" className="text-primary">
                        Zarejestruj się
                    </a>
                </p>

                <div className="mt-6">
                    <div className="relative my-4">
                        <div className="h-px bg-slate-200" />
                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-500">
                            lub szybciej
                        </span>
                    </div>
                    <OAuthButtons />
                </div>
            </main>
        </section>
    )
}
