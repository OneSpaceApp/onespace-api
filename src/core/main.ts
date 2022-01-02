import express from 'express'
import { Server } from 'http'
import Database from '../database'
import { infoMessage, warningMessage } from '../lib/coloredMessages'
import Config from './config'

export default class ServerApp {
    private app: express.Application

    private server: Server

    private dev?: boolean

    constructor(dev?: boolean) {
        this.app = express()
        this.server = new Server(this.app)
        this.dev = dev
    }

    public start() {
        const config = new Config(this.app, this.dev)
        config.apply()

        new Database(this.dev).init()

        if (this.dev) {
            warningMessage('Server is running in development mode')
        }

        this.server.listen(config.port, () => {
            infoMessage(`Server is running on port ${config.port}`)
        })

        // new SocketConn.init(this.server)
    }
}
