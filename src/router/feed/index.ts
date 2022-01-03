import { Request, Response, Router as ExpressRouter } from 'express'
import { errorMessage } from '../../lib/coloredMessages'
import { signUpValidator } from '../../validator/auth/signUp'
import { Endpoints, RouterController } from '../types/route'
import { Router, validate } from '../types/router'
import { FeedService } from './feed.service'
import { docs } from './docs'
import { Jwt, TokenizedRequest } from '../../middlewares/jwt'
import { createPostValidator } from '../../validator/feed/createPostValidator'
import { createCommentValidator } from '../../validator/feed/createCommentValidator'

const router = Router('/feed')
router.conf.use(Jwt())

export default class FeedRouter
    extends FeedService
    implements RouterController
{
    endpoints: Endpoints = docs

    getRouter(): ExpressRouter {
        return router.conf
    }

    getEndpoints(): Endpoints {
        return this.endpoints
    }

    // Convert the Docs to real Endpoints

    @router.route('/create-post', 'post')
    @validate(createPostValidator)
    async createPost(req: TokenizedRequest, res: Response) {
        try {
            const { token, body } = req
            const post = await this.CreatePost(body, token as string)
            res.json({ post })
        } catch (error) {
            errorMessage((error as Error).message)
            res.status(500).json({ error })
        }
    }

    @router.route('/get-posts', 'get')
    async getPosts(req: Request, res: Response) {
        const posts = await this.GetPosts()
        res.json({ posts })
    }

    @router.route('/get-user-posts/:userId', 'get')
    async getUserPosts(req: Request, res: Response) {
        const { userId } = req.params
        const posts = await this.GetUserPosts(userId)
        res.json({ posts })
    }

    @router.route('/get-post/:postId', 'get')
    async getPost(req: Request, res: Response) {
        const { postId } = req.params
        const post = await this.GetPost(postId)
        res.json({ post })
    }

    @router.route('/delete-post/:postId', 'post')
    async deletePost(req: TokenizedRequest, res: Response) {
        const {
            body: { postId },
            token,
        } = req

        const post = await this.DeletePost(postId, token as string)
        res.json({ post })
    }

    @router.route('/update-post/:postId', 'put')
    @validate(createPostValidator)
    async updatePost(req: TokenizedRequest, res: Response) {
        const {
            token,
            body,
            params: { postId },
        } = req

        const post = await this.UpdatePost(postId, body, token as string)
        res.json({ post })
    }

    @router.route('/get-post-comments/:postId', 'get')
    async getPostComments(req: Request, res: Response) {
        const { postId } = req.params
        const comments = await this.GetPostComments(postId)
        res.json({ comments })
    }

    @router.route('/get-post-reactions/:postId', 'get')
    async getPostReactions(req: Request, res: Response) {
        const { postId } = req.params
        const reactions = await this.GetPostReactions(postId)
        res.json({ reactions })
    }

    @router.route('/get-post-shares/:postId', 'get')
    async getPostShares(req: Request, res: Response) {
        const { postId } = req.params
        const shares = await this.GetPostShares(postId)
        res.json({ shares })
    }

    @router.route('/add-comment/:postId', 'post')
    @validate(createCommentValidator)
    async addComment(req: TokenizedRequest, res: Response) {
        const {
            body: { comment },
            token,
            params: { postId },
        } = req

        const post = await this.AddComment(postId, comment, token as string)
        res.json({ post })
    }

    @router.route('/delete-comment/:commentId', 'post')
    async deleteComment(req: TokenizedRequest, res: Response) {
        const {
            body: { commentId },
            token,
        } = req

        const comment = await this.DeleteComment(commentId, token as string)
        res.json({ comment })
    }

    @router.route('/update-comment/:commentId', 'put')
    @validate(createCommentValidator)
    async updateComment(req: TokenizedRequest, res: Response) {
        const {
            body: { newComment },
            token,
            params: { commentId },
        } = req

        const updatedComment = await this.UpdateComment(
            commentId,
            newComment,
            token as string
        )
        res.json({ updatedComment })
    }

    @router.route('/add-post-reaction/:postId', 'post')
    async addPostReaction(req: TokenizedRequest, res: Response) {
        const {
            body: { reaction },
            token,
            params: { postId },
        } = req

        const post = await this.AddPostReaction(
            postId,
            reaction,
            token as string
        )
        res.json({ post })
    }

    @router.route('/delete-post-reaction/:postId', 'post')
    async deletePostReaction(req: TokenizedRequest, res: Response) {
        const {
            body: { reaction },
            params: { postId },
        } = req

        const post = await this.DeletePostReaction(postId, reaction)
        res.json({ post })
    }

    @router.route('/add-comment-reaction/:commentId', 'post')
    async addCommentReaction(req: TokenizedRequest, res: Response) {
        const {
            body: { reaction },
            token,
            params: { commentId },
        } = req

        const comment = await this.AddCommentReaction(
            commentId,
            reaction,
            token as string
        )
        res.json({ comment })
    }

    @router.route('/delete-comment-reaction/:commentId', 'post')
    async deleteCommentReaction(req: TokenizedRequest, res: Response) {
        const {
            body: { reaction },
            params: { commentId },
        } = req

        const comment = await this.DeleteCommentReaction(commentId, reaction)
        res.json({ comment })
    }
}
