import express from 'express'
import cors from 'cors'
import { docs } from '../middlewares/docs'
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
        this.app.get('/', (req, res) => {
            res.status(404).json({ error: 'not found', status: 404 })
        })
        this.app.get('/index.html', (req, res) => {
            res.status(404).json({ error: 'not found', status: 404 })
        })
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        // res.status(404).json({error: 'not found', status: 404})

        // create a middleware to customize the error response

        this.app.use((req, res, next) => {
            const statusCode = res.statusCode

            switch (statusCode) {
                case 404:
                    res.status(404).json({ error: 'not found', status: 404 })
                    break
                case 500:
                    res.status(500).json({
                        error: 'internal server error',
                        status: 500,
                    })
                    break
                default:
                    next()
            }
        })

        if (this.dev) {
            this.app.use(docs())
            this.app.use(morgan())
            this.app.use(express.static(path.join(__dirname, '../docs/build')))
        }
    }
}
