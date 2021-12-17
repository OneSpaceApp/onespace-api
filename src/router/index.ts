import { Request, Response, Router as ExpressRouter } from 'express'
import { Router } from './types/router'

const router = Router()

export class AppRouter {
    @router.route('/', 'get')
    public getRoot(req: Request, res: Response) {
        res.send('Hello World!')
    }

    public getRouter(): ExpressRouter {
        return router.router
    }
}
