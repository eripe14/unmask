'use client'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import OAuthButtons from '@/components/auth/OAuthButtons'

export default function SignUpClient() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState<string | null>(null)

    const [isPending, setIsPending] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const router = useRouter()
    const params = useSearchParams()
    const redirectTo = params.get('redirect_url') || '/discover'

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!isLoaded || isPending) return

        setError(null)
        setSuccessMessage(null)
        setIsPending(true)

        try {
            await signUp.create({ emailAddress: email, password: pass })
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setVerifying(true)
            setSuccessMessage('Kod weryfikacyjny został wysłany na Twój adres e-mail.')
        } catch (err) {
            const errorMessage =
                (err as { errors?: { message: string }[] })?.errors?.[0]?.message ||
                'Błąd rejestracji'
            setError(errorMessage)
            setVerifying(false)
        } finally {
            setIsPending(false)
        }
    }

    async function verify(code: string) {
        if (!isLoaded || isPending) return

        setError(null)
        setSuccessMessage(null)
        setIsPending(true)

        try {
            const res = await signUp.attemptEmailAddressVerification({ code })
            if (res.status === 'complete') {
                await setActive({ session: res.createdSessionId })
                router.push(redirectTo)
            }
        } catch (err) {
            const errorMessage =
                (err as { errors?: { message: string }[] })?.errors?.[0]?.message || 'Błędny kod'
            setError(errorMessage)
            setVerifying(true)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <main className="mx-auto max-w-md p-6">
            <h1 className="text-2xl font-bold">Załóż konto</h1>

            {successMessage && (
                <p className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-600">
                    {successMessage}
                </p>
            )}
            {error && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </p>
            )}

            {verifying ? (
                <VerifyPane onVerify={verify} isPending={isPending} />
            ) : (
                <>
                    <form onSubmit={onSubmit} className="mt-6 space-y-3">
                        <input
                            className="w-full rounded-xl border px-3 py-2"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isPending}
                        />
                        <input
                            className="w-full rounded-xl border px-3 py-2"
                            placeholder="hasło"
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            disabled={isPending}
                        />

                        <button
                            className="rounded-xl bg-primary px-4 py-2 font-semibold text-white disabled:bg-opacity-70"
                            disabled={isPending}
                        >
                            {isPending ? 'Rejestrowanie...' : 'Zarejestruj'}
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
                </>
            )}
        </main>
    )
}

function VerifyPane({
    onVerify,
    isPending,
}: {
    onVerify: (code: string) => Promise<void>
    isPending: boolean
}) {
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
                    disabled={isPending}
                />
                <button
                    onClick={() => onVerify(code)}
                    className="rounded-xl border px-3 py-2 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? 'Potwierdzanie...' : 'Potwierdź'}
                </button>
            </div>
        </div>
    )
}
