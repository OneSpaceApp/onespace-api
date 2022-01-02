import { anyObj, Reject } from '../../router/types/router'

export function loginValidator(body: anyObj, reject: Reject) {
    if (
        !body.email ||
        !body.password
    ) {
        console.log(body)
        reject({ error: 'Missing fields' }, 400)
    }
}
