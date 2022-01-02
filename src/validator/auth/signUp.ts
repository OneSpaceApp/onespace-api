import { anyObj, Reject } from '../../router/types/router'

export function signUpValidator(body: anyObj, reject: Reject) {
    if (
        !body.name ||
        !body.surname ||
        !body.username ||
        !body.birthdate ||
        !body.email ||
        !body.password
    )
        reject({ error: 'Missing fields' }, 400)

    const emailRegex =
        /^[a-zA-Z0-9_!#$%&‘*=+/?^{|}~]+([.-]?[a-zA-Z0-9_!#$%&‘*=+/?^{|}~]+)*@\w+([.-]?\w+)*(\.\w{2,50})+$/
    if (!emailRegex.test(body.email as string))
        reject({ error: 'Invalid email' }, 400)

    if ((body.password as string).length < 8)
        reject({ error: 'Password must be at least 8 characters long' }, 400)
    if ((body.password as string).length > 100)
        reject({ error: 'Password must be less than 100 characters long' }, 400)

    if ((body.name as string).length < 2)
        reject({ error: 'Name must be at least 2 characters long' }, 400)
    if ((body.name as string).length > 100)
        reject({ error: 'Name must be less than 100 characters long' }, 400)

    if ((body.surname as string).length < 2)
        reject({ error: 'Surname must be at least 2 characters long' }, 400)
    if ((body.surname as string).length > 100)
        reject({ error: 'Surname must be less than 100 characters long' }, 400)

    const usernameRegex = /^[a-zA-Z0-9_]{6,100}$/

    if (!usernameRegex.test(body.username as string))
        reject({ error: 'Invalid username' }, 400)

    const birthdate = new Date(body.birthdate as string)
    const age = new Date().getFullYear() - birthdate.getFullYear()
    if (age < 14) reject({ error: 'You must be at least 14 years old' }, 400)

    if (age > 120) reject({ error: 'You must be less than 120 years old' }, 400)
}
