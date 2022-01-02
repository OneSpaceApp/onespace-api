import { anyObj, Reject } from '../../router/types/router'
import { CommentDTO } from '../../router/feed/types/comment'

export function createCommentValidator(body: anyObj, reject: Reject) {
    // verify if the properties of PostDTO are equal to the body
    const { author, content } = body as unknown as CommentDTO

    if (author === undefined || content === undefined) {
        reject(
            {
                message: 'Missing fields',
            },
            400
        )
    }
}
