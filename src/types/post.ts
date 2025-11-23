export type VerdictType = 'Prawda' | 'Manipulacja' | 'Fałsz / AI' | 'Niezweryfikowane'
export type UserDecisionType = 'Prawda' | 'Manipulacja' | 'Fake / AI' | 'Nie wiem'
export type ReelContentType = 'video' | 'image' | 'text'

export type Reel = {
    id: string
    type: ReelContentType
    src: string | null
    title: string
    body: string | null
    source: string | null

    verdict: VerdictType
    explanation_summary: string | null
    source_link: string | null

    created_at: string // timestamptz
    sort_order: number
}

export type UserVote = {
    id: string
    user_id: string
    reel_id: string

    decision: UserDecisionType

    created_at: string // timestamptz
}

export type ReelWithVote = Reel & {
    user_votes: UserVote[] | null
}
