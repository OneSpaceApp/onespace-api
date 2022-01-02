interface ChatRoomUser { 
    user: string
    admin: boolean
    muted: boolean
}

interface ChatMessageType {
    author: string
    content: string
    created: DateConstructor
    edited: boolean
    image?: string
    video?: string
    link?: string
}

export interface ChatRoomType {
    title: string
    description: string
    created: DateConstructor
    creator: string
    messages: ChatMessageType[]
    users: ChatRoomUser[]
    password: string
    color: string
    avatar: string
}
