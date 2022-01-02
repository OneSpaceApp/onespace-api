import { SignUpDTO } from './types/signUp'
import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import Database from '../../database'
import { ConfirmTemplate, ConfirmText } from '../../mail/confirm.template'
import { SendMail } from '../../lib/mailer'
import { Compare, Hash } from '../../lib/hasher'

const db = new Database().models.UserModel

export class AuthService {
    public async SignUp(signUpData: SignUpDTO): Promise<string> {
        const user = await db.findOne({ email: signUpData.email })
        if (user) throw new Error('User already exists')

        signUpData.password = await Hash(signUpData.password)

        const code = crypto.randomBytes(4).toString('hex')
        SendMail(
            signUpData.email,
            'Confirm your email for One Space',
            ConfirmText(code),
            ConfirmTemplate(code)
        )

        const newUser = { ...signUpData, code }

        return await jsonwebtoken.sign(
            JSON.stringify(newUser),
            process.env.SECRET as string
        )
    }

    public async Confirm(token: string, code: string): Promise<string> {
        const decoded = jsonwebtoken.decode(token) as SignUpDTO & {
            code: string
        }

        if (decoded.code !== code) throw new Error('Invalid code')

        const user = await db.findOne({ email: decoded.email })
        if (user) throw new Error('User already exists')

        const userData = {
            email: decoded.email,
            password: decoded.password,
            name: decoded.name,
            surname: decoded.surname,
            username: decoded.username,
            birthdate: decoded.birthdate,
        }

        const newUser = new db(userData)
        await newUser.save()

        return jsonwebtoken.sign(
            JSON.stringify(newUser),
            process.env.SECRET as string
        )
    }

    public async Login(email: string, password: string): Promise<string> {
        const user = await db.findOne({ email })
        if (!user) throw new Error('User does not exist')

        const areEqual = await Compare(password, user.password)

        if (!areEqual) throw new Error('Invalid password')

        return jsonwebtoken.sign(
            JSON.stringify(user),
            process.env.SECRET as string
        )
    }
}
