import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export class Middlewares {
    private app: express.Application
    private corsConfig: cors.CorsOptions

    constructor(app: express.Application) {
        this.app = app
        this.corsConfig = {
            origin: '*',
        }
    }

    public apply() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(morgan('dev'))
        this.app.use(cors(this.corsConfig))
    }
}
