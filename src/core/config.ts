import express from 'express'
import { AppRouter } from '../router'
import Middlewares from './middlewares'

export default class Config {
    private app: express.Application
    private dev?: boolean
    public port: string | number

    constructor(app: express.Application, dev?: boolean) {
        this.app = app
        this.dev = dev

        this.port = process.env.PORT || 4000
    }

    public apply() {
        new Middlewares(this.app, this.dev).apply()

        const router = new AppRouter()
        this.app.use(router.getRouter())
    }
}
