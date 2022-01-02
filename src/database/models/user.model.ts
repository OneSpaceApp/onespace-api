import { Model, model } from 'mongoose'
import { schemas } from '../schemas'
import { UserType } from '../schemas/types/user.type'

export const UserModel: Model<UserType> = model<UserType>(
    'User',
    schemas.UserSchema
)
