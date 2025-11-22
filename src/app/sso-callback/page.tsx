'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export default function SSOCallbackPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <AuthenticateWithRedirectCallback />
            <p className="text-xl text-slate-700">Trwa weryfikacja uwierzytelnienia...</p>
        </div>
    )
}
