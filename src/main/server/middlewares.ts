import { Express, json } from 'express'

export function setMiddlewares(expressServer: Express): void {
  expressServer.use(json())
}
