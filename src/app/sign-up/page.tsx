import { Suspense } from 'react'
import { Navbar } from '@/components/header/Navbar'
import SignUpClient from './SignUpClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default function Page() {
    return (
        <section className="relative overflow-hidden">
            <Navbar />
            <Suspense fallback={<div className="mx-auto max-w-md p-6">Ładowanie…</div>}>
                <SignUpClient />
            </Suspense>
        </section>
    )
}
