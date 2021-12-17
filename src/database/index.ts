import mongoose from 'mongoose'
import { schemas } from './schemas'
import { models } from './models'
import { Schemas, Models } from './types'
import { errorMessage, infoMessage, warningMessage } from '../lib'

export default class Database {
    public schemas: Schemas
    public models: Models

    private devUri: string
    private dev?: boolean

    constructor(dev?: boolean) {
        this.devUri = 'mongodb://localhost/spaces-io'

        this.schemas = schemas
        this.models = models
        this.dev = dev
    }

    async init() {
        try {
            await mongoose.connect(
                this.dev ? this.devUri : process.env.MONGO_URL || this.devUri
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
