import { anyObj, Reject } from '../../router/types/router'
import { PostDTO } from '../../router/feed/types/post'

export function createPostValidator(body: anyObj, reject: Reject) {
    // verify if the properties of PostDTO are equal to the body
    const {
        allowComments,
        sensitive,
        mentions,
        link,
        images,
        censoredText,
        allowReactions,
        privacy,
        tags,
        censored,
        allowSharing,
        content,
        style,
        videos,
    } = body as unknown as PostDTO

    if (
        allowComments === undefined ||
        sensitive === undefined ||
        mentions === undefined ||
        link === undefined ||
        images === undefined ||
        censoredText === undefined ||
        allowReactions === undefined ||
        privacy === undefined ||
        tags === undefined ||
        censored === undefined ||
        allowSharing === undefined ||
        content === undefined ||
        style === undefined ||
        videos === undefined
    ) {
        reject(
            {
                message: 'Missing fields',
            },
            400
        )
    }
}
