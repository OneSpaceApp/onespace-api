import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Middlewares } from './middlewares'

export class Config {
    private app: express.Application

    constructor(app: express.Application) {
        this.app = app
    }

    public apply() {
        new Middlewares(this.app).apply()
    }
}
