/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    NextFunction,
    Request,
    Response,
    Router as ExpressRouter,
} from 'express'
import { TokenizedRequest } from '../../middlewares/jwt'

type methods = 'get' | 'post' | 'put' | 'delete'

export function Router(prefix: string) {
    prefix = '/api' + prefix
    return {
        conf: ExpressRouter(),
        route<bodyType>(path: string, method: methods, ...middlewares: any[]) {
            return (target: any, key: string, descriptor: any) => {
                const originalMethod = descriptor.value
                this.conf[method](
                    prefix + path,
                    ...middlewares,
                    (
                        req: Request | TokenizedRequest,
                        res: Response,
                        next?: NextFunction
                    ) => {
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

export interface anyObj {
    [key: string]: unknown
}

export type Reject = (body: anyObj, status: number) => void

export function validate(validator: (body: anyObj, reject: Reject) => void) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const original = descriptor.value
        descriptor.value = function (...args: any[]) {
            const body = args[0].body

            validator(body, (body: anyObj, status: number) => {
                body.status = status
                args[1].status(status).json(body)
            })

            return original.apply(this, args)
        }
    }
}
