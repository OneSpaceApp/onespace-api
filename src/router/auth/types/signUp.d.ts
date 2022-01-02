import { schemas } from '../../../database/schemas'

export interface SignUpDTO {
    email: string
    password: string
    name: string
    surname: string
    username: string
    birthdate: string
}
