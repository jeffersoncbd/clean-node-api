import express from 'express'
import { setMiddlewares } from './middlewares'

const expressServer = express()

setMiddlewares(expressServer)

export { expressServer }
