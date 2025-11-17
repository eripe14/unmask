import React from 'react'
import { Hero } from '@/components/home/hero/Hero'
import { Navbar } from '@/components/header/Navbar'
import { FeaturesSection } from '@/components/home/features/FeaturesSection'

export function Home() {
    return (
        <section className="relative overflow-hidden">
            <Navbar />
            <Hero />
            <FeaturesSection />
        </section>
    )
}
