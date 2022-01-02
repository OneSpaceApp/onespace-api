import { Schema } from 'mongoose'
import { ReactionType } from './types/reaction.type'

export const ReactionSchema = new Schema<ReactionType>({
    type: {
        type: String,
        required: true,
        enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
    },
    user: { type: String, required: true },
})
