import { Express, Router } from 'express'

export function setRoutes(expressServer: Express): void {
  const router = Router()

  expressServer.use(router)
}
