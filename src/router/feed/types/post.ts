export enum privacy {
    Public = 'public',
    Private = 'private',
}

export interface PostDTO {
    privacy: privacy
    allowComments: boolean
    allowReactions: boolean
    allowSharing: boolean
    censored: boolean
    content: string
    censoredText: string
    images: string[]
    videos: string[]
    mentions: string[]
    sensitive: boolean
    style: {
        backgroundColor: string
        font: string
        textColor: string
    }
    tags: string[]
    link: string
}
