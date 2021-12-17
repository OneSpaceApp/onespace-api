import {
    NextFunction,
    Request,
    Response,
    Router as ExpressRouter,
} from 'express'

type methods = 'get' | 'post' | 'put' | 'delete'

export function Router() {
    return {
        router: ExpressRouter(),
        route<bodyType>(path: string, method: methods, middlewares?: any) {
            return (target: any, key: string, descriptor: any) => {
                const originalMethod = descriptor.value
                this.router[method](
                    path,
                    ...(middlewares || []),
                    (req: Request, res: Response, next?: NextFunction) => {
                        originalMethod.apply(target, [
                            req,
                            res,
                            { body: req.body as bodyType, next },
                        ])
                    }
                )
            }
        },
    }
}
