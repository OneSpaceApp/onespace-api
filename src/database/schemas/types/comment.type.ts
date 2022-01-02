import { ReactionType } from './reaction.type'
import { ReportType } from './report.type'

export interface SubCommentType {
    content: string
    created?: DateConstructor
    edited: boolean
    reactions: ReactionType[]
    reports: ReportType[]
    author: string
}

export type CommentType = SubCommentType & { replies: SubCommentType[] }
