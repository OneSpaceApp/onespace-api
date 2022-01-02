import express from 'express'
import jsonwebtoken from 'jsonwebtoken'

export type TokenizedRequest = express.Request & {
    token: string | jsonwebtoken.JwtPayload
}

export function Jwt() {
    return (
        req: any,
        res: express.Response,
        next: express.NextFunction
    ) => {
        let token = req.header('Authorization')
        token = token?.split(' ')[1]

        if (!token)
            return res.status(401).json({
                message: 'No token, authorization denied',
                status: 401,
            })

        try {
            jsonwebtoken.verify(token, process.env.SECRET as string)
            req.token = token
            next()
        } catch (err) {
            return res
                .status(401)
                .json({ message: 'Token is not valid', status: 401 })
        }
    }
}
