'use client'

import { useState } from 'react'
import { Home } from '@/components/home/Home'

export default function Page() {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <div>
            <Home />
        </div>
    )
}
