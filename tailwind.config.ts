import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/app/**/*.{ts,tsx}',
        './src/pages/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--primary) / <alpha-value>)',
            },
        },
    },
    plugins: [],
}
export default config
