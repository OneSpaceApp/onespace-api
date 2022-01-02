import { NotificationType } from './notification.type';
import { PostType, SharedPostType } from './post.type'

enum Relationship {
    single = 'single',
    inARelationship = 'in a relationship',
    engaged = 'engaged',
    married = 'married',
    complicated = 'complicated',
    openRelationship = 'open relationship',
    widowed = 'widowed',
    separated = 'separated',
    divorced = 'divorced',
}

export interface UserType {
    email: string
    password: string
    name: string
    surname: string
    username: string
    birthdate: Date
    joined?: Date
    posts: PostType[]
    sharedPosts: SharedPostType[]
    friends: string[]
    blocked: string[]
    chatRooms: string[]
    userInfo: {
        location: string
        bio: string
        avatar: string
        cover: string
        website: string
        relationship: Relationship
        relationshipWith: string
        work: string
        education: string
        languages: string
        interests: string
        pinnedSong: string
        gender: string
        nickname: string
        link: string
    }
    ban: {
        banned: boolean
        bannedReason: string
        bannedUntil: Date
        bannedTimes: string[]
    }
    notifications: NotificationType[]
    videos: string[]
    shorts: string[]
    books: string[]
    events: string[]
    music: string[]
    podcasts: string[]
    pages: string[]
    groupsOwner: string[]
    groupsInvited: string[]
    groupsJoined: string[]
    marketProducts: string[]
    voiceRoomId: string
    companies: string
    allowCustomAds: boolean
    customAdsSettings: {
        interests: string[]
    }
}
