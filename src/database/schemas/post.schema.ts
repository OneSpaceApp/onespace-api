import mongoose from 'mongoose'
import { PostType } from './types/post.type'

export const PostSchema = new mongoose.Schema<PostType>({
    author: { type: String, required: true },
    privacy: { type: String, enum: ['public', 'private'], required: true },
    allowComments: { type: Boolean, default: true },
    allowReactions: { type: Boolean, default: true },
    allowSharing: { type: Boolean, default: true },
    censored: { type: Boolean, default: false },
    content: { type: String, required: true },
    shares: [{ type: String }],
    censoredText: { type: String, default: '' },
    created: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    mentions: [{ type: String }],
    sensitive: { type: Boolean, default: false },
    style: {
        backgroundColor: { type: String, default: '#ffffff' },
        font: { type: String, default: 'default' },
        textColor: { type: String, default: '#ffffff' }
    },
    tags: [{ type: String }],
    link: { type: String, default: '' },
    
    // Default
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})