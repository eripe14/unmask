export type ReelType = 'video' | 'image' | 'text'

export interface Reel {
    id: string
    type: ReelType
    src?: string
    title?: string
    body?: string
    source?: string
    postedAt?: string
}
