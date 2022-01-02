import { Endpoints, methods } from '../types/route'

export const docs: Endpoints = {
    title: 'Feed',
    prefix: '/feed',
    endpoints: [
        {
            title: 'Create post',
            path: '/create-post',
            method: methods.POST,
            description: 'Create a new post, and return the post data',
            body: {},
            response: {
                post: 'The post data',
            },
        }, // Create post
        {
            title: 'Get posts',
            path: '/get-posts',
            method: methods.GET,
            description: 'Get all posts',
            response: {
                posts: 'The posts data',
            },
        }, // Get posts
        {
            title: 'Get user posts',
            path: '/get-user-posts/:userId',
            method: methods.GET,
            description: 'Get all posts by user id',
            response: {
                posts: 'The posts data',
            },
        }, // Get user posts
        {
            title: 'Get post',
            path: '/get-post/:postId',
            method: methods.POST,
            description: 'Get a post by post id',
            response: {
                post: 'The post data',
            },
        }, // Get post
        {
            title: 'Delete post',
            path: '/delete-post/:postId',
            method: methods.POST,
            description: 'Delete a post by post id',
            response: {
                post: 'The post data',
            },
        }, // Delete post
        {
            title: 'Update post',
            path: '/update-post/:postId',
            method: methods.PUT,
            description: 'Update a post by post id',
            body: {
                postId: 'The post id',
                post: 'The post data',
            },
            response: {
                post: 'The post data',
            },
        }, // Update post
        {
            title: 'Get post comments',
            path: '/get-post-comments/:postId',
            method: methods.GET,
            description: 'Get all comments by post id',
            response: {
                comments: 'The comments data',
            },
        }, // Get post comments
        {
            title: 'Get post reactions',
            path: '/get-post-reactions/:postId',
            method: methods.GET,
            description: 'Get all reactions by post id',
            response: {
                reactions: 'The reactions data',
            },
        }, // Get post reactions
        {
            title: 'Get post shares',
            path: '/get-post-shares/:postId',
            method: methods.POST,
            description: 'Get all shares by post id',
            response: {
                shares: 'The shares data',
            },
        }, // Get post shares
        {
            title: 'Add comment',
            path: '/add-comment',
            method: methods.POST,
            description: 'Add a comment to a post',
            body: {
                postId: 'The post id',
                commentBody: 'The comment data',
            },
            response: {
                comment: 'The comment data',
            },
        }, // Add comment
        {
            title: 'Delete comment',
            path: '/delete-comment/:commentId',
            method: methods.DELETE,
            description: 'Delete a comment by comment id',
            response: {
                comment: 'The comment data',
            },
        }, // Delete comment
        {
            title: 'Update comment',
            path: '/update-comment',
            method: methods.PUT,
            description: 'Update a comment by comment id',
            body: {
                commentId: 'The comment id',
                comment: 'The comment data',
            },
            response: {
                comment: 'The comment data',
            },
        }, // Update comment
        {
            title: 'Add post reaction',
            path: '/add-post-reaction',
            method: methods.POST,
            description: 'Add a reaction to a post',
            body: {
                postId: 'The post id',
                reaction: 'The reaction data',
            },
            response: {
                reaction: 'The reaction data',
            },
        }, // Add reaction
        {
            title: 'Delete post reaction',
            path: '/delete-post-reaction/:reactionId',
            method: methods.POST,
            description: 'Delete a reaction by reaction id',
            body: {
                postId: 'The reaction id',
            },
            response: {
                reaction: 'The reaction data',
            },
        }, // Delete reaction
        {
            title: 'Add comment reaction',
            path: '/add-comment-reaction',
            method: methods.POST,
            description: 'Add a reaction to a comment',
            body: {
                commentId: 'The comment id',
                reaction: 'The reaction data',
            },
            response: {
                reaction: 'The reaction data',
            },
        }, // Add comment reaction
        {
            title: 'Delete comment reaction',
            path: '/delete-comment-reaction/:reactionId',
            method: methods.POST,
            description: 'Delete a reaction by reaction id',
            body: {
                commentId: 'The reaction id',
            },
            response: {
                reaction: 'The reaction data',
            },
        }, // Delete comment reaction
    ],
}
