import React from 'react'
import { Hero } from '@/components/home/hero/Hero'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { MissionSection } from '@/components/home/MissionSection'
import { AboutSection } from '@/components/home/AboutSection'
import { FAQSection } from '@/components/home/FAQSection'

export function Home() {
    return (
        <section className="relative overflow-hidden">
            <Hero />
            <AboutSection />
            <MissionSection />
            <FeaturesSection />
            <FAQSection />
        </section>
    )
}
