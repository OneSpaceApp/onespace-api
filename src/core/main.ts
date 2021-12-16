import express from 'express'
import { Server } from 'http'
import { Config } from './config'

export class ServerApp {
  private app: express.Application
  private server: Server
  private dev?: boolean

  constructor(dev?: boolean) {
    this.app = express()
    this.server = new Server(this.app)
    this.dev = dev
  }

  public start() {
    new Config(this.app, this.dev).apply()

    this.server.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
    
    // new SocketConn.init(this.server)
  }
}