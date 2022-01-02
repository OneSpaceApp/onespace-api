enum Notification {
    post = 'post',
    comment = 'comment',
    reaction = 'reaction',
    sharedPost = 'sharedPost',
    newFeature = 'newFeature',
}

export interface NotificationType {
    type: Notification
    title: string
    description: string
    link: string
    date: Date
}
