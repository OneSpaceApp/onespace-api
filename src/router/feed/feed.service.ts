import Database from '../../database'
import jsonwebtoken from 'jsonwebtoken'
import { PostDTO } from './types/post'
import { UserType } from '../../database/schemas/types/user.type'
import { Document } from 'mongoose'
import { PostType } from '../../database/schemas/types/post.type'
import { CommentDTO } from './types/comment'
import { Reaction } from '../../database/schemas/types/reaction.type'
import { CommentType } from '../../database/schemas/types/comment.type'

const db = new Database().models.PostModel
const users = new Database().models.UserModel
const comments = new Database().models.CommentModel
const reactions = new Database().models.ReactionModel

export class FeedService {
    public async CreatePost(post: PostDTO, token: string) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const user = (await users.findById(decoded._id)) as UserType & Document

        if (!user) {
            throw new Error('User not found')
        }

        const newPost = new db(post)
        newPost.author = decoded._id

        const postCreated = await newPost.save()
        const userPosts = user.posts

        userPosts.push(postCreated)

        await users.findByIdAndUpdate(decoded._id, { posts: userPosts })

        return postCreated
    }

    public async GetPosts() {
        return await db.find()
    }

    public async GetUserPosts(userId: string) {
        return await db.find({ author: userId })
    }

    public async GetPost(postId: string) {
        return await db.findById(postId)
    }

    public async GeletePost(postId: string) {
        return await db.findByIdAndDelete(postId)
    }

    public async UpdatePost(postId: string, post: PostDTO, token: string) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const postToUpdate = (await db.findById(postId)) as PostType & Document

        if (postToUpdate.author.toString() !== decoded._id.toString()) {
            throw new Error('You are not the author of this post')
        }

        return await db.findByIdAndUpdate(postId, post)
    }

    public async GetPostComments(postId: string) {
        const post = (await db.findById(postId)) as PostType & Document

        const commentsIds = post.comments

        const postComments = []

        for (const commentId of commentsIds) {
            const _comment = await comments.findById(commentId)
            postComments.push(_comment)
        }

        return comments
    }

    public async GetPostReactions(postId: string) {
        return await db.findById(postId).populate('reactions')
    }

    public async GetPostShares(postId: string) {
        const post = (await db.findById(postId)) as PostType & Document

        return post.shares
    }

    public async AddComment(
        postId: string,
        commentBody: CommentDTO,
        token: string
    ) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const post = (await db.findById(postId)) as PostType & Document

        const newComment = new comments(commentBody)
        newComment.author = decoded._id

        const commentCreated = await newComment.save()

        const postComments = post.comments
        postComments.push(commentCreated)

        await db.findByIdAndUpdate(postId, { comments: postComments })

        return commentCreated
    }

    public async DeleteComment(commentId: string, token: string) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const comment = (await comments.findById(commentId)) as CommentType &
            Document

        if (comment.author.toString() !== decoded._id.toString()) {
            throw new Error('You are not the author of this comment')
        }

        return await comments.findByIdAndDelete(commentId)
    }

    public async DeletePost(postId: string, token: string) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const post = (await db.findById(postId)) as PostType & Document

        if (post.author.toString() !== decoded._id.toString()) {
            throw new Error('You are not the author of this post')
        }

        return await db.findByIdAndDelete(postId)
    }

    public async UpdateComment(
        commentId: string,
        newComment: CommentDTO,
        token: string
    ) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const comment = (await comments.findById(commentId)) as CommentType &
            Document

        if (comment.author.toString() !== decoded._id.toString()) {
            throw new Error('You are not the author of this comment')
        }

        return await comments.findByIdAndUpdate(commentId, newComment)
    }

    public async AddPostReaction(
        postId: string,
        reaction: Reaction,
        token: string
    ) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const post = (await db.findById(postId)) as PostType & Document

        const newReaction = new reactions({ user: decoded._id, type: reaction })

        const reactionCreated = await newReaction.save()
        const postReactions = post.reactions
        postReactions.push(reactionCreated)
        await db.findByIdAndUpdate(postId, { reactions: postReactions })

        return reactionCreated
    }

    public async DeletePostReaction(postId: string, reactionId: string) {
        const post = (await db.findById(postId)) as PostType & Document
        const postReactions = post.reactions as unknown as Document[]

        const reaction = postReactions.find(
            (reaction) => reaction._id.toString() === reactionId
        ) as Document

        postReactions.splice(postReactions.indexOf(reaction), 1)

        await db.findByIdAndUpdate(postId, { reactions: postReactions })

        return await reactions.findByIdAndDelete(reactionId)
    }

    public async AddCommentReaction(
        commentId: string,
        reaction: Reaction,
        token: string
    ) {
        const decoded = (await jsonwebtoken.decode(token)) as UserType &
            Document
        const comment = (await comments.findById(commentId)) as CommentType &
            Document

        const newReaction = new reactions({ user: decoded._id, type: reaction })

        const reactionCreated = await newReaction.save()
        const commentReactions = comment.reactions
        commentReactions.push(reactionCreated)
        await comments.findByIdAndUpdate(commentId, {
            reactions: commentReactions,
        })

        return reactionCreated
    }

    public async DeleteCommentReaction(commentId: string, reactionId: string) {
        const comment = (await comments.findById(commentId)) as CommentType &
            Document
        const commentReactions = comment.reactions as unknown as Document[]

        const reaction = commentReactions.find(
            (reaction) => reaction._id.toString() === reactionId
        ) as Document

        commentReactions.splice(commentReactions.indexOf(reaction), 1)

        await comments.findByIdAndUpdate(commentId, {
            reactions: commentReactions,
        })

        return await reactions.findByIdAndDelete(reactionId)
    }
}
