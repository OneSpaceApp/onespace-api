import {Model, model} from 'mongoose';
import { schemas } from '../schemas';
import { CommentType } from '../schemas/types/comment.type';

export const CommentModel: Model<CommentType> = model<CommentType>('Comment', schemas.CommentSchema);
