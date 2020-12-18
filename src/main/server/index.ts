import express, { Express } from 'express'
import { setMiddlewares } from './middlewares'
import { setRoutes } from './routes'
import { env } from '../env'

export class ExpressServer {
  expressServer: Express

  constructor() {
    this.expressServer = express()
    setMiddlewares(this.expressServer)
    setRoutes(this.expressServer)
  }

  listen(): void {
    this.expressServer.listen(env.serverPort, () =>
      console.log(`Servidor iniciado na porta ${env.serverPort}`)
    )
  }
}
