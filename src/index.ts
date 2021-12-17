import ServerApp from './core/main'
import dotenv from 'dotenv'

dotenv.config()

function startServer() {
    const dev = 'development'
    const node_env = process.env.NODE_ENV || dev

    const server = new ServerApp(node_env === dev)
    server.start()
}

startServer()
