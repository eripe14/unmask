import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
    matcher: [
        '/discover(.*)', // chronimy tylko dashboard
        '/((?!_next|.*\\..*).*)',
    ],
}
