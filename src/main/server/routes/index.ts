import { Express, Router } from 'express'
import { signUpRoute } from './signUp'

export function setRoutes(expressServer: Express): void {
  const router = Router()

  signUpRoute(router)

  expressServer.use(router)
}
