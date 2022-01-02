export enum Reaction {
    LIKE = 'like',
    LOVE = 'love',
    HAHA = 'haha',
    WOW = 'wow',
    SAD = 'sad',
    ANGRY = 'angry',
}

export interface ReactionType {
    user: string
    type: Reaction
}
