import { Express, json } from 'express'
import cors from 'cors'

export function setMiddlewares(expressServer: Express): void {
  expressServer.use(json())
  expressServer.use(cors())
}
