import { Request, Response, Router as ExpressRouter } from 'express'
import AuthRouter from './auth'
import FeedRouter from './feed'
import { Router } from './types/router'

const router = Router('')

const routers = [new AuthRouter(), new FeedRouter()]
const endpoints = routers.map((router) => router.getEndpoints())
export class AppRouter {
    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        for (const apiRouter of routers) {
            router.conf.use(apiRouter.getRouter())
        }
    }

    public getRouter(): ExpressRouter {
        return router.conf
    }

    @router.route('/endpoints', 'get')
    public getEndpoints(req: Request, res: Response) {
        res.status(200).json({
            endpoints,
            status: 200,
        })
    }
}
