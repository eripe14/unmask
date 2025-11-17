'use client'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/header/Navbar'
import OAuthButtons from '@/components/auth/OAuthButtons'

export default function SignUpPage() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!isLoaded) return
        setError(null)
        try {
            await signUp.create({ emailAddress: email, password: pass })
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        } catch (err) {
            const errorMessage =
                (err as { errors?: { message: string }[] })?.errors?.[0]?.message ||
                'Błąd rejestracji'
            setError(errorMessage)
            return
        }
    }

    async function verify(code: string) {
        if (!isLoaded) return
        try {
            const res = await signUp.attemptEmailAddressVerification({ code })
            if (res.status === 'complete') {
                await setActive({ session: res.createdSessionId })
                router.push('/discover')
            }
        } catch (err) {
            const errorMessage =
                (err as { errors?: { message: string }[] })?.errors?.[0]?.message ||
                'Błąd rejestracji'
            setError(errorMessage)
            return
        }
    }

    return (
        <section className="relative overflow-hidden">
            <Navbar />
            <main className="mx-auto max-w-md p-6">
                <h1 className="text-2xl font-bold">Załóż konto</h1>
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
                    {error && <p className="text-sm text-primary">{error}</p>}
                    <button className="rounded-xl bg-primary px-4 py-2 font-semibold text-white">
                        Zarejestruj
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative my-4">
                        <div className="h-px bg-slate-200" />
                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-500">
                            lub szybciej
                        </span>
                    </div>
                    <OAuthButtons />
                </div>
                <VerifyPane onVerify={verify} />
            </main>
        </section>
    )
}

function VerifyPane({ onVerify }: { onVerify: (code: string) => Promise<void> }) {
    const [code, setCode] = useState('')
    return (
        <div className="mt-6 space-y-2">
            <p className="text-sm text-slate-600">Wpisz kod z e-maila:</p>
            <div className="flex gap-2">
                <input
                    className="w-full rounded-xl border px-3 py-2"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                />
                <button onClick={() => onVerify(code)} className="rounded-xl border px-3 py-2">
                    Potwierdź
                </button>
            </div>
        </div>
    )
}
