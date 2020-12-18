import express from 'express'
import { setMiddlewares } from './middlewares'
import { setRoutes } from './routes'

const expressServer = express()

setMiddlewares(expressServer)
setRoutes(expressServer)

export { expressServer }
