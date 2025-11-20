'use client'

import { useState } from 'react'
import { Home } from '@/components/home/Home'
import { Navbar } from '@/components/header/Navbar'
import { Footer } from '@/components/footer/Footer'

export default function Page() {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    )
}
