import { Request, Response, Router as ExpressRouter } from 'express'
import { errorMessage } from '../../lib/coloredMessages'
import { confirmValidator } from '../../validator/auth/confirm'
import { signUpValidator } from '../../validator/auth/signUp'
import { loginValidator } from '../../validator/auth/login'
import { Endpoints, RouterController } from '../types/route'
import { Router, validate } from '../types/router'
import { AuthService } from './auth.service'
import { docs } from './docs'
import { SignUpDTO } from './types/signUp'

const router = Router('/auth')
export default class AuthRouter
    extends AuthService
    implements RouterController
{
    endpoints: Endpoints = docs

    getRouter(): ExpressRouter {
        return router.conf
    }

    getEndpoints(): Endpoints {
        return this.endpoints
    }

    @router.route('/signup', 'post')
    @validate(signUpValidator)
    public async signUp(req: Request, res: Response) {
        try {
            const token = await this.SignUp(req.body as SignUpDTO)

            res.status(200).json({ token, status: 200 })
        } catch (error) {
            const err = error as Error
            errorMessage(err as unknown as string)
            res.status(500).json({ error: err.message, status: 500 })
        }
    }

    @router.route('/confirm', 'post')
    @validate(confirmValidator)
    public async confirm(req: Request, res: Response) {
        try {
            const token = await this.Confirm(req.body.token, req.body.code)

            res.status(200).json({ token, status: 200 })
        } catch (error) {
            const err = error as Error
            errorMessage(err as unknown as string)
            res.status(500).json({ error: err.message, status: 500 })
        }
    }

    @router.route('/login', 'post')
    @validate(loginValidator)
    public async login(req: Request, res: Response) {
        try {
            const token = await this.Login(req.body.email, req.body.password)

            res.status(200).json({ token, status: 200 })
        } catch (error) {
            const err = error as Error
            errorMessage(err as unknown as string)
            res.status(500).json({ error: err.message, status: 500 })
        }
    }

}
