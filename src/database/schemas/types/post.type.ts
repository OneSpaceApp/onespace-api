import { CommentType } from './comment.type'
import { ReactionType } from './reaction.type'
import { ReportType } from './report.type'

enum Privacy {
    Public = 'public',
    Private = 'private',
}

export interface SharedPostType {
    author: string
    privacy: Privacy
    content: string
    censored: boolean
    censoredText: string
    sensitive: boolean
    created?: DateConstructor
    edited: boolean
    reactions: ReactionType[]
    comments: CommentType[]
    reports: ReportType[]
    mentions: string[]
    tags: string[]
    shares: string[]
    style: {
        font: string
        textColor: string
        backgroundColor: string
    }
    allowComments: boolean
    allowSharing: boolean
    allowReactions: boolean
}

export type PostType = SharedPostType & {
    images?: string[]
    videos?: string[]
    link?: string
}
