import morganMiddleware from 'morgan'
import { requestMessage } from '../lib/coloredMessages'

export function morgan() {
    return morganMiddleware('dev', {
        stream: {
            write: (message: string) => {
                requestMessage(message)
            },
        },
    })
}
