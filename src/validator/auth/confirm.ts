import { anyObj, Reject } from '../../router/types/router'

export function confirmValidator(body: anyObj, reject: Reject) {
    if (!body.token || !body.code) {
        reject({ error: 'Missing fields' }, 400)
    }
}
