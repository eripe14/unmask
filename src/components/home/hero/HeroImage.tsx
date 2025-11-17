import React from 'react'

export function HeroImage() {
    return (
        <div
            className="duration-400 relative hidden transition-all hover:scale-110 md:block lg:max-w-[36rem]"
            aria-hidden="true"
        >
            <img
                src="/hero.svg"
                alt=""
                className="h-auto max-h-[520px] w-full object-contain"
                loading="lazy"
            />
        </div>
    )
}
