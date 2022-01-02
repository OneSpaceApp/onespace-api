import { Model, model } from 'mongoose'
import { ReactionSchema } from '../schemas/reaction.schema'
import { ReactionType } from '../schemas/types/reaction.type'

export const ReactionModel: Model<ReactionType> = model<ReactionType>(
    'Reaction',
    ReactionSchema
)
