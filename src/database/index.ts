import mongoose from 'mongoose'
import {
    errorMessage,
    infoMessage,
    warningMessage,
} from '../lib/coloredMessages'
import { models } from './models'

export default class Database {
    private devUri: string
    private dev?: boolean
    public models = models

    constructor(dev?: boolean) {
        this.devUri = 'mongodb://localhost/spaces-io'

        this.dev = dev
    }

    async init() {
        try {
            await mongoose.connect(
                this.dev ? this.devUri : process.env.DATABASE || this.devUri
            )

            if (this.dev) {
                warningMessage(
                    `MongoDB is connected to a local database (${this.devUri})`
                )
            }

            infoMessage('Database connection established')
        } catch (error) {
            const err = error as Error
            errorMessage(err.message)
        }
    }
}
