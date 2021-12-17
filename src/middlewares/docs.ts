import { NextFunction, Request, Response } from 'express'
import path from 'path'

export function docs() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.path.startsWith('/docs')) {
            res.sendFile(path.join(__dirname, '../docs/build/index.html'))
        } else {
            next()
        }
    }
}
