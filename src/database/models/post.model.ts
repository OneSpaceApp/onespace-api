import { Model, model } from 'mongoose'
import { schemas } from '../schemas'
import { PostType } from '../schemas/types/post.type'

export const PostModel: Model<PostType> = model<PostType>(
    'posts',
    schemas.PostSchema
)
