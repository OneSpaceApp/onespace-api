import { Schema } from 'mongoose'
import { CommentType } from './types/comment.type'

export const CommentSchema = new Schema<CommentType>({
    author: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
    reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
})

/* 
author: 61c3a93ba036ff4fc672d681
content: "test"
created: 2020-06-18T15:00:00.000Z
edited: false
replies: []
reactions: []
reports: []
*/
