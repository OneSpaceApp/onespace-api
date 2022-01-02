import express from 'express'
import cors from 'cors'
import { morgan } from '../middlewares/morgan'
import path from 'path'

export default class Middlewares {
    private app: express.Application

    private dev?: boolean

    constructor(app: express.Application, dev?: boolean) {
        this.app = app
        this.dev = dev
    }

    public apply() {
        this.app.use(
            cors({
                origin: '*',
            })
        )

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        if (this.dev) {
            this.app.use(morgan())
            this.app.use(express.static(path.join(__dirname, '../docs')))
        }
    }
}
